import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { getRule } from "@/lib/automations/queries";
import { evaluateRule } from "@/lib/automations/evaluator";
import { writeAlert } from "@/lib/automations/queries";
import { rulePreviewBodySchema } from "@/lib/automations/schemas";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    body = {};
  }

  const parsed = rulePreviewBodySchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  try {
    const rule = await getRule(supabase, id);
    if (!rule) {
      return NextResponse.json({ error: "Rule not found" }, { status: 404 });
    }

    const { data: orgData, error: orgErr } = await supabase.rpc("current_org_id");
    if (orgErr || !orgData) {
      return NextResponse.json({ error: "Cannot resolve organization" }, { status: 500 });
    }
    const orgId = orgData as string;

    const result = await evaluateRule(
      supabase,
      orgId,
      rule,
      parsed.data.windowDays,
    );

    let alertsWritten = 0;
    if (parsed.data.write && result.alerts.length > 0) {
      const toWrite = result.alerts.slice(0, 100);
      for (const alert of toWrite) {
        const ok = await writeAlert(supabase, orgId, {
          entityType: alert.entityType,
          entityId: alert.entityId,
          message: alert.message,
          ruleId: alert.ruleId,
          severity: alert.severity,
        });
        if (ok) alertsWritten++;
      }
    }

    return NextResponse.json({
      ...result,
      alertsWritten,
      writeEnabled: parsed.data.write,
    });
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Evaluation failed";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
