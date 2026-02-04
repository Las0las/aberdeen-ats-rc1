import type { SupabaseClient } from "@supabase/supabase-js";
import type { JobsRow } from "@/contracts/db/tables";
import type { JobStatus } from "@/contracts/db/enums";

const JOB_FIELDS = [
  "id",
  "organization_id",
  "client_id",
  "title",
  "department",
  "location",
  "employment_type",
  "experience_level",
  "salary_min",
  "salary_max",
  "salary_currency",
  "description",
  "requirements",
  "benefits",
  "status",
  "priority",
  "openings",
  "created_at",
  "updated_at",
  "ats_job_id",
  "url",
  "source",
  "currency",
].join(",");

async function resolveOrgId(supabase: SupabaseClient): Promise<string> {
  const { data, error } = await supabase.rpc("current_org_id");
  if (error || !data) throw new Error("Unable to resolve organization");
  return data as string;
}

export async function listJobs(
  supabase: SupabaseClient,
  opts: { status?: JobStatus; search?: string; page: number; limit: number },
) {
  const orgId = await resolveOrgId(supabase);
  const from = (opts.page - 1) * opts.limit;
  const to = from + opts.limit - 1;

  let query = supabase
    .from("jobs")
    .select(JOB_FIELDS, { count: "exact" })
    .eq("organization_id", orgId)
    .order("updated_at", { ascending: false })
    .range(from, to);

  if (opts.status) {
    query = query.eq("status", opts.status);
  }

  if (opts.search) {
    const term = `%${opts.search}%`;
    query = query.or(
      `title.ilike.${term},department.ilike.${term},location.ilike.${term}`,
    );
  }

  const { data, error, count } = await query;
  if (error) throw error;

  return { jobs: (data ?? []) as unknown as JobsRow[], total: count ?? 0 };
}

export async function getJob(supabase: SupabaseClient, id: string) {
  const orgId = await resolveOrgId(supabase);

  const { data, error } = await supabase
    .from("jobs")
    .select(JOB_FIELDS)
    .eq("id", id)
    .eq("organization_id", orgId)
    .single();

  if (error) throw error;
  return data as unknown as JobsRow;
}
