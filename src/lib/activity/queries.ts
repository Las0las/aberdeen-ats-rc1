import type { SupabaseClient } from "@supabase/supabase-js";
import type { ActivitiesRow } from "@/contracts/db/tables";

// Safe fields — excludes ip_address, user_agent (PII/operational)
const ACTIVITY_FIELDS = [
  "id",
  "entity_type",
  "entity_id",
  "action_type",
  "action_category",
  "description",
  "actor_id",
  "actor_type",
  "actor_name",
  "previous_value",
  "new_value",
  "changes",
  "metadata",
  "organization_id",
  "source",
  "created_at",
].join(",");

async function resolveOrgId(supabase: SupabaseClient): Promise<string> {
  const { data, error } = await supabase.rpc("current_org_id");
  if (error || !data) throw new Error("Unable to resolve organization");
  return data as string;
}

export async function listActivities(
  supabase: SupabaseClient,
  opts: {
    entityType: string;
    entityId: string;
    page: number;
    limit: number;
  },
) {
  const orgId = await resolveOrgId(supabase);
  const from = (opts.page - 1) * opts.limit;
  const to = from + opts.limit - 1;

  const { data, error, count } = await supabase
    .from("activities")
    .select(ACTIVITY_FIELDS, { count: "exact" })
    .eq("organization_id", orgId)
    .eq("entity_type", opts.entityType)
    .eq("entity_id", opts.entityId)
    .order("created_at", { ascending: false })
    .range(from, to);

  if (error) throw error;

  return {
    activities: (data ?? []) as unknown as ActivitiesRow[],
    total: count ?? 0,
  };
}
