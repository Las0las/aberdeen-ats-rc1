import type { SupabaseClient } from "@supabase/supabase-js";
import type { InterviewsRow } from "@/contracts/db/tables";

// ── Safe field selection ───────────────────────────────────────────
// Excludes: meeting_password, internal_notes, recording_url,
//           transcript_url, custom_fields, attachments (blobs), metadata

const INTERVIEW_FIELDS = [
  "id",
  "organization_id",
  "candidate_id",
  "job_id",
  "submission_id",
  "interview_type",
  "interview_stage",
  "interview_round",
  "scheduled_date",
  "scheduled_time",
  "scheduled_start_at",
  "scheduled_end_at",
  "duration_minutes",
  "timezone",
  "meeting_platform",
  "meeting_link",
  "meeting_id",
  "location",
  "interviewer_names",
  "candidate_confirmed",
  "interviewers_confirmed",
  "status",
  "overall_rating",
  "technical_score",
  "cultural_fit_score",
  "communication_score",
  "strengths",
  "weaknesses",
  "feedback_notes",
  "interviewer_notes",
  "recommendation",
  "recommendation_notes",
  "next_steps",
  "follow_up_required",
  "follow_up_date",
  "cancelled_at",
  "cancellation_reason",
  "completed_at",
  "scheduled_at",
  "created_at",
  "updated_at",
].join(",");

const CANDIDATE_JOIN =
  "candidates(id,first_name,last_name,current_title,email)";
const JOB_JOIN = "jobs(id,title,department,location)";

export interface InterviewWithRelations extends InterviewsRow {
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

// ── List ───────────────────────────────────────────────────────────

export async function listInterviews(
  supabase: SupabaseClient,
  opts: {
    status?: string;
    search?: string;
    page: number;
    limit: number;
  },
) {
  const orgId = await resolveOrgId(supabase);
  const from = (opts.page - 1) * opts.limit;
  const to = from + opts.limit - 1;

  let query = supabase
    .from("interviews")
    .select(`${INTERVIEW_FIELDS}, ${CANDIDATE_JOIN}, ${JOB_JOIN}`, {
      count: "exact",
    })
    .eq("organization_id", orgId)
    .order("scheduled_start_at", { ascending: false, nullsFirst: false })
    .range(from, to);

  if (opts.status) {
    query = query.eq("status", opts.status);
  }

  const { data, error, count } = await query;
  if (error) throw error;

  let results = (data ?? []) as unknown as InterviewWithRelations[];

  // Client-side search across candidate name / job title (v1 pragmatic)
  if (opts.search) {
    const term = opts.search.toLowerCase();
    results = results.filter((r) => {
      const cName = [
        r.candidates?.first_name,
        r.candidates?.last_name,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();
      const jTitle = r.jobs?.title?.toLowerCase() ?? "";
      const iType = r.interview_type?.toLowerCase() ?? "";
      return (
        cName.includes(term) || jTitle.includes(term) || iType.includes(term)
      );
    });
  }

  return { interviews: results, total: count ?? 0 };
}

// ── Get by ID ──────────────────────────────────────────────────────

export async function getInterview(
  supabase: SupabaseClient,
  id: string,
): Promise<InterviewWithRelations> {
  const orgId = await resolveOrgId(supabase);

  const { data, error } = await supabase
    .from("interviews")
    .select(`${INTERVIEW_FIELDS}, ${CANDIDATE_JOIN}, ${JOB_JOIN}`)
    .eq("organization_id", orgId)
    .eq("id", id)
    .single();

  if (error) throw error;
  return data as unknown as InterviewWithRelations;
}
