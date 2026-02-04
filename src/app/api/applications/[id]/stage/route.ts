import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { applicationIdSchema } from "@/lib/applications/schemas";
import { stageChangeBodySchema } from "@/lib/applications/stage-schemas";
import { updateApplicationStage } from "@/lib/applications/stage-queries";
import { createLogger } from "@/lib/logger";

const log = createLogger("api:applications:stage");

/** Roles permitted to mutate application stage via pipeline board */
const STAGE_CHANGE_ROLES = new Set(["admin", "recruiter"]);

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const supabase = await createClient();

    // 1. Auth gate
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // 1b. RBAC gate — server-side enforcement
    const { data: role, error: roleErr } = await supabase.rpc("current_user_role");
    if (roleErr || !role || !STAGE_CHANGE_ROLES.has(role as string)) {
      return NextResponse.json(
        { error: "Forbidden: insufficient role" },
        { status: 403 },
      );
    }

    // 2. Validate path param
    const { id } = await params;
    const idParsed = applicationIdSchema.safeParse({ id });
    if (!idParsed.success) {
      return NextResponse.json(
        { error: "Invalid application ID", details: idParsed.error.flatten() },
        { status: 400 },
      );
    }

    // 3. Validate body
    const body = await request.json().catch(() => null);
    if (!body) {
      return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
    }

    const bodyParsed = stageChangeBodySchema.safeParse(body);
    if (!bodyParsed.success) {
      return NextResponse.json(
        { error: "Validation failed", details: bodyParsed.error.flatten() },
        { status: 400 },
      );
    }

    // 4. Execute stage change (org-scoped inside)
    const result = await updateApplicationStage(
      supabase,
      idParsed.data.id,
      bodyParsed.data.stage,
      {
        reason: bodyParsed.data.reason,
        userEmail: user.email ?? null,
        userId: user.id,
      },
    );

    return NextResponse.json(result);
  } catch (err: unknown) {
    // Typed status from stage-queries
    if (err instanceof Error && (err as Error & { status?: number }).status === 404) {
      return NextResponse.json({ error: err.message }, { status: 404 });
    }
    const message = err instanceof Error ? err.message : "Internal error";
    log.error("unhandled", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
