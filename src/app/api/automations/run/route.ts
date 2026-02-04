import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { listRules } from "@/lib/automations/queries";
import { evaluateAllRules } from "@/lib/automations/evaluator";
import { runBodySchema } from "@/lib/automations/schemas";

export async function POST(req: NextRequest) {
  // 1. Check env var exists
  const runnerKey = process.env.AUTOMATION_RUNNER_KEY;
  if (!runnerKey) {
    return NextResponse.json(
      {
        error: "Automation runner not configured",
        detail: "Set AUTOMATION_RUNNER_KEY environment variable to enable.",
      },
      { status: 501 },
    );
  }

  // 2. Validate shared secret header
  const headerKey = req.headers.get("x-automation-key");
  if (headerKey !== runnerKey) {
    return NextResponse.json(
      { error: "Invalid or missing X-AUTOMATION-KEY header" },
      { status: 403 },
    );
  }

  // 3. Auth session required
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // 4. Parse body
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    body = {};
  }

  const parsed = runBodySchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  // 5. Execute
  try {
    const rules = await listRules(supabase, "active");
    const result = await evaluateAllRules(
      supabase,
      rules,
      parsed.data.windowDays,
      parsed.data.write,
    );
    return NextResponse.json(result);
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Run failed";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
