import type { SupabaseClient } from "@supabase/supabase-js";
import type { ApplicationsRow } from "@/contracts/db/tables";

// List: lean — exclude jsonb blobs (stage_history, screening_questions, screening_data)
const LIST_FIELDS = [
  "id",
  "organization_id",
  "candidate_id",
  "job_id",
  "stage",
  "status",
  "current_stage",
  "is_favorite",
  "is_archived",
  "applied_date",
  "date_applied",
  "candidate_email",
  "assigned_to",
  "created_at",
  "updated_at",
].join(",");

// Detail: fuller set — adds jsonb for workbench rendering
const DETAIL_FIELDS = [
  LIST_FIELDS,
  "workspace_id",
  "current_stage_text_old",
  "stage_history",
  "linkedin_application_status",
  "screening_questions",
  "screening_data",
  "job_external_id",
].join(",");

const CANDIDATE_JOIN = "candidates(id,first_name,last_name,current_title,email)";
const JOB_JOIN = "jobs(id,title,department,location)";

export interface ApplicationWithRelations extends ApplicationsRow {
  candidates: {
    id: string;
    first_name: string | null;
    last_name: string | null;
    current_title: string | null;
    email: string | null;
  } | null;
  jobs: {
    id: string;
    title: string | null;
    department: string | null;
    location: string | null;
  } | null;
}

async function resolveOrgId(supabase: SupabaseClient): Promise<string> {
  const { data, error } = await supabase.rpc("current_org_id");
  if (error || !data) throw new Error("Unable to resolve organization");
  return data as string;
}

export async function listApplications(
  supabase: SupabaseClient,
  opts: {
    stage?: string;
    status?: string;
    candidate_id?: string;
    job_id?: string;
    search?: string;
    page: number;
    limit: number;
  },
) {
  const orgId = await resolveOrgId(supabase);
  const from = (opts.page - 1) * opts.limit;
  const to = from + opts.limit - 1;

  let query = supabase
    .from("applications")
    .select(`${LIST_FIELDS}, ${CANDIDATE_JOIN}, ${JOB_JOIN}`, { count: "exact" })
    .eq("organization_id", orgId)
    .order("updated_at", { ascending: false })
    .range(from, to);

  if (opts.stage) query = query.eq("stage", opts.stage);
  if (opts.status) query = query.eq("status", opts.status);
  if (opts.candidate_id) query = query.eq("candidate_id", opts.candidate_id);
  if (opts.job_id) query = query.eq("job_id", opts.job_id);

  const { data, error, count } = await query;
  if (error) throw error;

  let results = (data ?? []) as unknown as ApplicationWithRelations[];

  // Client-side search across candidate name, job title, candidate email
  if (opts.search) {
    const term = opts.search.toLowerCase();
    results = results.filter((a) => {
      const cName = [a.candidates?.first_name, a.candidates?.last_name]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();
      const jTitle = a.jobs?.title?.toLowerCase() ?? "";
      const email = a.candidate_email?.toLowerCase() ?? "";
      return cName.includes(term) || jTitle.includes(term) || email.includes(term);
    });
  }

  return { applications: results, total: count ?? 0 };
}

export async function getApplication(
  supabase: SupabaseClient,
  id: string,
): Promise<ApplicationWithRelations> {
  const orgId = await resolveOrgId(supabase);
  const { data, error } = await supabase
    .from("applications")
    .select(`${DETAIL_FIELDS}, ${CANDIDATE_JOIN}, ${JOB_JOIN}`)
    .eq("organization_id", orgId)
    .eq("id", id)
    .single();
  if (error) throw error;
  return data as unknown as ApplicationWithRelations;
}
