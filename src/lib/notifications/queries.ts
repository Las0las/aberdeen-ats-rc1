import type { SupabaseClient } from "@supabase/supabase-js";
import type { NotificationItem, NotificationListParams } from "./schemas";

/**
 * Lean field selection for the notification feed.
 * Excludes ALL jsonb blobs (previous_value, new_value, changes, metadata)
 * and GDPR-sensitive fields (ip_address, user_agent, actor_id).
 */
const NOTIFICATION_FIELDS = [
  "id",
  "entity_type",
  "entity_id",
  "action_type",
  "action_category",
  "description",
  "actor_name",
  "source",
  "created_at",
].join(",");

async function resolveOrgId(supabase: SupabaseClient): Promise<string> {
  const { data, error } = await supabase.rpc("current_org_id");
  if (error || !data) throw new Error("Unable to resolve organization");
  return data as string;
}

export async function listNotifications(
  supabase: SupabaseClient,
  params: NotificationListParams,
) {
  const orgId = await resolveOrgId(supabase);

  const from = (params.page - 1) * params.limit;
  const to = from + params.limit - 1;

  let query = supabase
    .from("activities")
    .select(NOTIFICATION_FIELDS, { count: "exact" })
    .eq("organization_id", orgId)
    .order("created_at", { ascending: false })
    .range(from, to);

  // Optional filters — each applied only when present
  if (params.entity_type) {
    query = query.eq("entity_type", params.entity_type);
  }
  if (params.entity_id) {
    query = query.eq("entity_id", params.entity_id);
  }
  if (params.category) {
    query = query.eq("action_category", params.category);
  }
  if (params.since) {
    query = query.gte("created_at", params.since.toISOString());
  }

  const { data, error, count } = await query;

  if (error) throw error;

  return {
    items: (data ?? []) as unknown as NotificationItem[],
    total: count ?? 0,
    page: params.page,
    limit: params.limit,
  };
}
