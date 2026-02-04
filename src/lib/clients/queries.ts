import type { SupabaseClient } from "@supabase/supabase-js";
import type { ClientsRow } from "@/contracts/db/tables";

const LIST_FIELDS = [
  "id",
  "organization_id",
  "name",
  "industry",
  "website",
  "tier",
  "status",
  "contact_name",
  "contact_email",
  "contact_phone",
  "created_at",
  "updated_at",
].join(",");

const DETAIL_FIELDS = `${LIST_FIELDS},billing_info`;

async function resolveOrgId(supabase: SupabaseClient): Promise<string> {
  const { data, error } = await supabase.rpc("current_org_id");
  if (error || !data) throw new Error("Unable to resolve organization");
  return data as string;
}

export async function listClients(
  supabase: SupabaseClient,
  opts: { status?: string; search?: string; page: number; limit: number },
) {
  const orgId = await resolveOrgId(supabase);
  const from = (opts.page - 1) * opts.limit;
  const to = from + opts.limit - 1;

  let query = supabase
    .from("clients")
    .select(LIST_FIELDS, { count: "exact" })
    .eq("organization_id", orgId)
    .order("name", { ascending: true })
    .range(from, to);

  if (opts.status) query = query.eq("status", opts.status);
  if (opts.search) query = query.ilike("name", `%${opts.search}%`);

  const { data, error, count } = await query;
  if (error) throw error;
  return { clients: (data ?? []) as unknown as ClientsRow[], total: count ?? 0 };
}

export async function getClient(
  supabase: SupabaseClient,
  id: string,
): Promise<ClientsRow> {
  const orgId = await resolveOrgId(supabase);
  const { data, error } = await supabase
    .from("clients")
    .select(DETAIL_FIELDS)
    .eq("organization_id", orgId)
    .eq("id", id)
    .single();
  if (error) throw error;
  return data as unknown as ClientsRow;
}
