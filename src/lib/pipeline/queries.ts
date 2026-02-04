import type { SupabaseClient } from "@supabase/supabase-js";
import type { PipelineCard, PipelineResponse, PipelineParams } from "./schemas";
import { PIPELINE_STAGES } from "./schemas";

/**
 * Lean select — only scalar display fields + FK joins for names.
 * Excludes ALL jsonb blobs: stage_history, screening_questions, screening_data
 * Excludes operational: workspace_id, current_stage_text_old, linkedin_application_status,
 *   job_external_id, assigned_to, is_favorite, is_archived, date_applied, applied_date
 */
const PIPELINE_FIELDS = [
  "id",
  "stage",
  "status",
  "updated_at",
  "candidate_id",
  "candidate_email",
].join(",");

const CANDIDATE_JOIN = "candidates(first_name,last_name)";
const JOB_JOIN = "jobs(title)";

interface RawRow {
  id: string;
  stage: string | null;
  status: string | null;
  updated_at: string;
  candidate_id: string | null;
  candidate_email: string | null;
  candidates: { first_name: string | null; last_name: string | null } | null;
  jobs: { title: string | null } | null;
}

async function resolveOrgId(supabase: SupabaseClient): Promise<string> {
  const { data, error } = await supabase.rpc("current_org_id");
  if (error || !data) throw new Error("Unable to resolve organization");
  return data as string;
}

/**
 * Fetch all pipeline data in a SINGLE query, then group in memory.
 *
 * Strategy: fetch up to limitPerStage * 9 rows ordered by updated_at desc,
 * filtered to sinceDays window, then bucket into stages.
 * This is more efficient than 9 separate queries, and Supabase row limits
 * keep the payload bounded.
 */
export async function getPipeline(
  supabase: SupabaseClient,
  params: PipelineParams,
): Promise<PipelineResponse> {
  const orgId = await resolveOrgId(supabase);

  // Max rows we'll fetch — bounded by all stages × per-stage limit
  const maxRows = params.limitPerStage * PIPELINE_STAGES.length;

  let query = supabase
    .from("applications")
    .select(`${PIPELINE_FIELDS}, ${CANDIDATE_JOIN}, ${JOB_JOIN}`, {
      count: "exact",
    })
    .eq("organization_id", orgId)
    .order("updated_at", { ascending: false })
    .limit(maxRows);

  // sinceDays filter
  if (params.sinceDays) {
    const since = new Date(
      Date.now() - params.sinceDays * 24 * 60 * 60 * 1000,
    );
    query = query.gte("updated_at", since.toISOString());
  }

  const { data, error, count } = await query;
  if (error) throw error;

  const rows = (data ?? []) as unknown as RawRow[];

  // Build stage buckets
  const buckets = new Map<string, { cards: PipelineCard[]; total: number }>();
  for (const stage of PIPELINE_STAGES) {
    buckets.set(stage, { cards: [], total: 0 });
  }

  // Client-side search filter (applied before bucketing)
  const searchTerm = params.search?.toLowerCase().trim();

  for (const row of rows) {
    const stageKey = row.stage ?? "NEW"; // default unknown to NEW
    const bucket = buckets.get(stageKey);
    if (!bucket) continue; // skip rows with unexpected stage values

    // Build card
    const card: PipelineCard = {
      id: row.id,
      stage: row.stage,
      status: row.status,
      updated_at: row.updated_at,
      candidate_id: row.candidate_id,
      candidate_email: row.candidate_email,
      candidate_first_name: row.candidates?.first_name ?? null,
      candidate_last_name: row.candidates?.last_name ?? null,
      job_id: null, // jobs FK is nullable — job_id not in our lean select
      job_title: row.jobs?.title ?? null,
    };

    // Apply search filter
    if (searchTerm) {
      const candidateName = [card.candidate_first_name, card.candidate_last_name]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();
      const email = card.candidate_email?.toLowerCase() ?? "";
      const jobTitle = card.job_title?.toLowerCase() ?? "";
      if (
        !candidateName.includes(searchTerm) &&
        !email.includes(searchTerm) &&
        !jobTitle.includes(searchTerm)
      ) {
        continue; // skip non-matching
      }
    }

    bucket.total += 1;
    if (bucket.cards.length < params.limitPerStage) {
      bucket.cards.push(card);
    }
  }

  // Build ordered response
  const stages = PIPELINE_STAGES.map((stage) => {
    const bucket = buckets.get(stage)!;
    return {
      stage,
      count: bucket.total,
      items: bucket.cards,
    };
  });

  const allTotal = stages.reduce((sum, s) => sum + s.count, 0);

  return {
    stages,
    totals: { all: allTotal },
    meta: {
      sinceDays: params.sinceDays,
      limitPerStage: params.limitPerStage,
    },
  };
}
