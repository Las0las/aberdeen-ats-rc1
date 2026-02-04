import type { SupabaseClient } from "@supabase/supabase-js";
import type { StageChangeResponse } from "./stage-schemas";
import { createLogger } from "@/lib/logger";

const log = createLogger("stage-change");

async function resolveOrgId(supabase: SupabaseClient): Promise<string> {
  const { data, error } = await supabase.rpc("current_org_id");
  if (error || !data) throw new Error("Unable to resolve organization");
  return data as string;
}

/**
 * Update an application's stage with full audit trail.
 *
 * Updates BOTH `stage` (varchar, used by pipeline board) and `current_stage`
 * (enum, canonical) to keep them in sync. Both are existing contract columns.
 *
 * Concurrency note: no row versioning is available. If the application was
 * updated between board fetch and this call, the stage change still applies.
 * This is documented as an accepted limitation — last-write-wins.
 */
export async function updateApplicationStage(
  supabase: SupabaseClient,
  applicationId: string,
  newStage: string,
  opts: {
    reason?: string;
    userEmail?: string | null;
    userId?: string | null;
  } = {},
): Promise<StageChangeResponse> {
  const orgId = await resolveOrgId(supabase);

  // 1. Fetch current application — org-scoped, lean select
  const { data: app, error: fetchErr } = await supabase
    .from("applications")
    .select("id, stage, current_stage, updated_at")
    .eq("organization_id", orgId)
    .eq("id", applicationId)
    .single();

  if (fetchErr || !app) {
    const err = new Error("Application not found in this organization");
    (err as Error & { status?: number }).status = 404;
    throw err;
  }

  const oldStage = (app.stage as string | null) ?? (app.current_stage as string | null);

  // 2. Update both stage columns + updated_at
  const { data: updated, error: updateErr } = await supabase
    .from("applications")
    .update({
      stage: newStage,
      current_stage: newStage,
      updated_at: new Date().toISOString(),
    })
    .eq("organization_id", orgId)
    .eq("id", applicationId)
    .select("id, stage, updated_at")
    .single();

  if (updateErr) throw updateErr;

  // 3. Write activity audit trail — non-blocking (errors logged, not thrown)
  const description = opts.reason
    ? `Stage changed: ${oldStage ?? "NONE"} → ${newStage} (${opts.reason})`
    : `Stage changed: ${oldStage ?? "NONE"} → ${newStage}`;

  const { error: activityErr } = await supabase.from("activities").insert({
    entity_type: "application",
    entity_id: applicationId,
    action_type: "stage_changed",
    action_category: "pipeline",
    description,
    actor_id: opts.userId ?? null,
    actor_type: "user",
    actor_name: opts.userEmail ?? null,
    previous_value: oldStage ? { stage: oldStage } : null,
    new_value: { stage: newStage },
    organization_id: orgId,
    source: "pipeline_board",
  });

  if (activityErr) {
    log.error("activity write failed:", activityErr.message);
    // Non-fatal: stage was already updated successfully
  }

  return {
    id: updated.id as string,
    oldStage: oldStage ?? null,
    newStage,
    updatedAt: updated.updated_at as string,
  };
}
