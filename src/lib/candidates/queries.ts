import type { SupabaseClient } from "@supabase/supabase-js";
import type { CandidatesRow } from "@/contracts/db/tables";
import type { ApplicationStage } from "@/contracts/db/enums";

// Safe field list — excludes diversity_metadata, compensation_expectation, GDPR/DNC internals
const CANDIDATE_FIELDS = [
  "id",
  "organization_id",
  "first_name",
  "last_name",
  "email",
  "phone",
  "linkedin_url",
  "location",
  "timezone",
  "current_title",
  "current_company",
  "years_experience",
  "experience_years",
  "desired_roles",
  "skills",
  "resume_url",
  "status",
  "source",
  "notes",
  "headline",
  "stage",
  "city",
  "state",
  "country",
  "metro_area",
  "tags",
  "rating",
  "work_authorization",
  "willing_to_relocate",
  "education_degree",
  "education_institution",
  "created_at",
  "updated_at",
].join(",");

async function resolveOrgId(supabase: SupabaseClient): Promise<string> {
  const { data, error } = await supabase.rpc("current_org_id");
  if (error || !data) throw new Error("Unable to resolve organization");
  return data as string;
}

export async function listCandidates(
  supabase: SupabaseClient,
  opts: { stage?: ApplicationStage; search?: string; page: number; limit: number },
) {
  const orgId = await resolveOrgId(supabase);
  const from = (opts.page - 1) * opts.limit;
  const to = from + opts.limit - 1;

  let query = supabase
    .from("candidates")
    .select(CANDIDATE_FIELDS, { count: "exact" })
    .eq("organization_id", orgId)
    .is("deleted_at", null)
    .order("updated_at", { ascending: false })
    .range(from, to);

  if (opts.stage) {
    query = query.eq("stage", opts.stage);
  }

  if (opts.search) {
    // PostgREST or-filter across name/title/email
    const term = `%${opts.search}%`;
    query = query.or(
      `first_name.ilike.${term},last_name.ilike.${term},current_title.ilike.${term},email.ilike.${term}`,
    );
  }

  const { data, error, count } = await query;
  if (error) throw error;

  return { candidates: (data ?? []) as unknown as CandidatesRow[], total: count ?? 0 };
}

export async function getCandidate(supabase: SupabaseClient, id: string) {
  const orgId = await resolveOrgId(supabase);

  const { data, error } = await supabase
    .from("candidates")
    .select(CANDIDATE_FIELDS)
    .eq("id", id)
    .eq("organization_id", orgId)
    .is("deleted_at", null)
    .single();

  if (error) throw error;
  return data as unknown as CandidatesRow;
}
