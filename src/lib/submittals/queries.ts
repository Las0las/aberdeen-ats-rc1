import type { SupabaseClient } from "@supabase/supabase-js";
import type { SubmittalsRow } from "@/contracts/db/tables";
import type { SubmittalState } from "@/contracts/db/enums";

// Safe fields — excludes comp_value, hourly internals
const SUBMITTAL_FIELDS = [
  "id",
  "workspace_id",
  "candidate_id",
  "job_id",
  "application_id",
  "recruiter_id",
  "linkedin_url",
  "phone",
  "email",
  "location_text",
  "employment_type",
  "comp_unit",
  "currency_code",
  "interview_availability",
  "start_availability",
  "ai_summary",
  "final_summary",
  "score_snapshot",
  "risk_flags",
  "confidence_score",
  "state",
  "created_at",
  "updated_at",
  "client_channel",
  "organization_id",
].join(",");

const CANDIDATE_JOIN = "candidates(id,first_name,last_name,current_title,email)";
const JOB_JOIN = "jobs(id,title,department,location)";

export interface SubmittalWithRelations extends SubmittalsRow {
  candidates: {
    id: string;
    first_name: string | null;
    last_name: string | null;
    current_title: string | null;
    email: string | null;
  } | null;
  jobs: {
    id: string;
    title: string;
    department: string | null;
    location: string | null;
  } | null;
}

async function resolveOrgId(supabase: SupabaseClient): Promise<string> {
  const { data, error } = await supabase.rpc("current_org_id");
  if (error || !data) throw new Error("Unable to resolve organization");
  return data as string;
}

export async function listSubmittals(
  supabase: SupabaseClient,
  opts: { state?: SubmittalState; search?: string; page: number; limit: number },
) {
  const orgId = await resolveOrgId(supabase);
  const from = (opts.page - 1) * opts.limit;
  const to = from + opts.limit - 1;

  let query = supabase
    .from("submittals")
    .select(`${SUBMITTAL_FIELDS}, ${CANDIDATE_JOIN}, ${JOB_JOIN}`, {
      count: "exact",
    })
    .eq("organization_id", orgId)
    .order("updated_at", { ascending: false })
    .range(from, to);

  if (opts.state) {
    query = query.eq("state", opts.state);
  }

  const { data, error, count } = await query;
  if (error) throw error;

  let entries = (data ?? []) as unknown as SubmittalWithRelations[];

  // Client-side search across candidate name / job title
  if (opts.search) {
    const term = opts.search.toLowerCase();
    entries = entries.filter((e) => {
      const cName = [e.candidates?.first_name, e.candidates?.last_name]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();
      const jTitle = (e.jobs?.title ?? "").toLowerCase();
      return cName.includes(term) || jTitle.includes(term);
    });
  }

  return { submittals: entries, total: count ?? 0 };
}

export async function getSubmittal(supabase: SupabaseClient, id: string) {
  const orgId = await resolveOrgId(supabase);

  const { data, error } = await supabase
    .from("submittals")
    .select(`${SUBMITTAL_FIELDS}, ${CANDIDATE_JOIN}, ${JOB_JOIN}`)
    .eq("id", id)
    .eq("organization_id", orgId)
    .single();

  if (error) throw error;
  return data as unknown as SubmittalWithRelations;
}
