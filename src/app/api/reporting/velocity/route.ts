import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createLogger } from "@/lib/logger";
import { REPORTING_ROLES } from "@/lib/reporting/types";
import { fetchVelocity } from "@/lib/reporting/queries";

const log = createLogger("api:reporting:velocity");

export async function GET() {
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

    const result = await fetchVelocity(supabase);
    return NextResponse.json(result);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Internal error";
    log.error("velocity handler failed", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
