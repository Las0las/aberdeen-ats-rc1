import type { SupabaseClient } from "@supabase/supabase-js";
import type { CompaniesRow } from "@/contracts/db/tables";

// List: lean set, exclude billing_address, tags, deleted_*, audit fields
const LIST_FIELDS = [
  "id",
  "organization_id",
  "name",
  "type",
  "industry",
  "website",
  "status",
  "employee_count",
  "headquarters",
  "created_at",
  "updated_at",
].join(",");

// Detail: fuller set, still exclude deleted_by/created_by/updated_by
const DETAIL_FIELDS = [
  "id",
  "organization_id",
  "name",
  "type",
  "industry",
  "website",
  "linkedin_url",
  "phone",
  "email",
  "status",
  "employee_count",
  "annual_revenue",
  "headquarters",
  "payment_terms",
  "default_bill_rate",
  "default_markup",
  "notes",
  "is_marketplace_enabled",
  "preferred_fee_percentage",
  "auto_post_to_marketplace",
  "created_at",
  "updated_at",
].join(",");

async function resolveOrgId(supabase: SupabaseClient): Promise<string> {
  const { data, error } = await supabase.rpc("current_org_id");
  if (error || !data) throw new Error("Unable to resolve organization");
  return data as string;
}

export async function listCompanies(
  supabase: SupabaseClient,
  opts: { status?: string; search?: string; page: number; limit: number },
) {
  const orgId = await resolveOrgId(supabase);
  const from = (opts.page - 1) * opts.limit;
  const to = from + opts.limit - 1;

  let query = supabase
    .from("companies")
    .select(LIST_FIELDS, { count: "exact" })
    .eq("organization_id", orgId)
    .is("deleted_at", null) // soft-delete filter
    .order("name", { ascending: true })
    .range(from, to);

  if (opts.status) query = query.eq("status", opts.status);
  if (opts.search) query = query.ilike("name", `%${opts.search}%`);

  const { data, error, count } = await query;
  if (error) throw error;
  return { companies: (data ?? []) as unknown as CompaniesRow[], total: count ?? 0 };
}

export async function getCompany(
  supabase: SupabaseClient,
  id: string,
): Promise<CompaniesRow> {
  const orgId = await resolveOrgId(supabase);
  const { data, error } = await supabase
    .from("companies")
    .select(DETAIL_FIELDS)
    .eq("organization_id", orgId)
    .is("deleted_at", null)
    .eq("id", id)
    .single();
  if (error) throw error;
  return data as unknown as CompaniesRow;
}
