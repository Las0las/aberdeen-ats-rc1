import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createLogger } from "@/lib/logger";
import { sinceDaysSchema, REPORTING_ROLES } from "@/lib/reporting/types";
import { fetchPipelineIntelligence } from "@/lib/reporting/queries";

const log = createLogger("api:reporting:pipeline");

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { data: role, error: roleErr } = await supabase.rpc("current_user_role");
    if (roleErr || !role || !REPORTING_ROLES.has(role as string)) {
      return NextResponse.json(
        { error: "Forbidden: insufficient role" },
        { status: 403 },
      );
    }

    const raw: Record<string, string> = {};
    request.nextUrl.searchParams.forEach((v, k) => {
      raw[k] = v;
    });
    const parsed = sinceDaysSchema.safeParse(raw);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid params", details: parsed.error.flatten() },
        { status: 400 },
      );
    }

    const result = await fetchPipelineIntelligence(supabase, parsed.data.sinceDays);
    return NextResponse.json(result);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Internal error";
    log.error("pipeline handler failed", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
