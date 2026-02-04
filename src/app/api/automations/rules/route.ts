import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { listRules, createRule } from "@/lib/automations/queries";
import { rulesListParamsSchema, createRuleBodySchema } from "@/lib/automations/schemas";

export async function GET(req: NextRequest) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const params = rulesListParamsSchema.safeParse(
    Object.fromEntries(req.nextUrl.searchParams),
  );
  if (!params.success) {
    return NextResponse.json({ error: params.error.flatten() }, { status: 400 });
  }

  try {
    const rules = await listRules(supabase, params.data.status);
    return NextResponse.json({ rules });
  } catch {
    return NextResponse.json({ error: "Failed to load rules" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = createRuleBodySchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  try {
    const rule = await createRule(supabase, {
      name: parsed.data.name,
      description: parsed.data.description ?? "",
      triggerType: parsed.data.triggerType,
      severity: parsed.data.severity,
      entityType: parsed.data.entityType,
      windowDays: parsed.data.windowDays,
      actionType: parsed.data.actionType,
    });
    return NextResponse.json({ rule }, { status: 201 });
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Failed to create rule";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
