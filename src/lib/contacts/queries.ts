import type { SupabaseClient } from "@supabase/supabase-js";
import type { ContactsRow } from "@/contracts/db/tables";

const CONTACT_FIELDS = [
  "id",
  "organization_id",
  "client_id",
  "first_name",
  "last_name",
  "email",
  "phone",
  "title",
  "status",
  "created_at",
  "updated_at",
].join(",");

const CLIENT_JOIN = "clients(id,name,industry,tier)";

export interface ContactWithClient extends ContactsRow {
  clients: {
    id: string;
    name: string;
    industry: string | null;
    tier: string | null;
  } | null;
}

async function resolveOrgId(supabase: SupabaseClient): Promise<string> {
  const { data, error } = await supabase.rpc("current_org_id");
  if (error || !data) throw new Error("Unable to resolve organization");
  return data as string;
}

export async function listContacts(
  supabase: SupabaseClient,
  opts: {
    status?: string;
    client_id?: string;
    search?: string;
    page: number;
    limit: number;
  },
) {
  const orgId = await resolveOrgId(supabase);
  const from = (opts.page - 1) * opts.limit;
  const to = from + opts.limit - 1;

  let query = supabase
    .from("contacts")
    .select(`${CONTACT_FIELDS}, ${CLIENT_JOIN}`, { count: "exact" })
    .eq("organization_id", orgId)
    .order("last_name", { ascending: true })
    .range(from, to);

  if (opts.status) query = query.eq("status", opts.status);
  if (opts.client_id) query = query.eq("client_id", opts.client_id);

  const { data, error, count } = await query;
  if (error) throw error;

  let results = (data ?? []) as unknown as ContactWithClient[];

  if (opts.search) {
    const term = opts.search.toLowerCase();
    results = results.filter((c) => {
      const name = [c.first_name, c.last_name]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();
      const em = c.email?.toLowerCase() ?? "";
      const cl = c.clients?.name?.toLowerCase() ?? "";
      return name.includes(term) || em.includes(term) || cl.includes(term);
    });
  }

  return { contacts: results, total: count ?? 0 };
}

export async function getContact(
  supabase: SupabaseClient,
  id: string,
): Promise<ContactWithClient> {
  const orgId = await resolveOrgId(supabase);
  const { data, error } = await supabase
    .from("contacts")
    .select(`${CONTACT_FIELDS}, ${CLIENT_JOIN}`)
    .eq("organization_id", orgId)
    .eq("id", id)
    .single();
  if (error) throw error;
  return data as unknown as ContactWithClient;
}
