import type { SupabaseClient } from "@supabase/supabase-js";
import type { BenchEntriesRow } from "@/contracts/db/tables";
import type { BenchState } from "@/contracts/db/enums";

// ── Safe field lists (no internal financials) ──────────────────────

const BENCH_ENTRY_FIELDS =
  "id,workspace_id,candidate_id,application_id,job_id,assignment_id,state,reason,notes,bench_started_at,bench_ended_at,created_by,created_at,updated_at,organization_id" as const;

const CANDIDATE_SELECT =
  "id,first_name,last_name,email,current_title,current_company,location,skills,headline" as const;

const JOB_SELECT =
  "id,title,department,location,employment_type,status,client_id" as const;

// ── Types ──────────────────────────────────────────────────────────

export interface BenchEntryWithCandidate extends BenchEntriesRow {
  candidates: {
    id: string;
    first_name: string | null;
    last_name: string | null;
    email: string | null;
    current_title: string | null;
    current_company: string | null;
    location: string | null;
    skills: string[] | null;
    headline: string | null;
  } | null;
}

// ── Helpers ────────────────────────────────────────────────────────

async function resolveOrgId(supabase: SupabaseClient): Promise<string> {
  const { data, error } = await supabase.rpc("current_org_id");
  if (error || !data) throw new Error("Unable to resolve organization");
  return data as string;
}

// ── Queries ────────────────────────────────────────────────────────

export async function listBenchEntries(
  supabase: SupabaseClient,
  opts: { state?: BenchState; search?: string; page: number; limit: number },
) {
  const orgId = await resolveOrgId(supabase);
  const from = (opts.page - 1) * opts.limit;
  const to = from + opts.limit - 1;

  let query = supabase
    .from("bench_entries")
    .select(`${BENCH_ENTRY_FIELDS}, candidates(${CANDIDATE_SELECT})`, {
      count: "exact",
    })
    .eq("organization_id", orgId)
    .order("bench_started_at", { ascending: false })
    .range(from, to);

  if (opts.state) {
    query = query.eq("state", opts.state);
  }

  if (opts.search) {
    // Search on joined candidate name — use ilike on candidates table via textSearch
    // PostgREST doesn't support cross-table ilike; filter client-side after fetch
    // We fetch a wider window, then trim. Acceptable for v1.
  }

  const { data, error, count } = await query;
  if (error) throw error;

  let entries = (data ?? []) as unknown as BenchEntryWithCandidate[];

  // Client-side name filter (v1 pragmatic approach)
  if (opts.search) {
    const term = opts.search.toLowerCase();
    entries = entries.filter((e) => {
      const c = e.candidates;
      if (!c) return false;
      const full = [c.first_name, c.last_name, c.current_title, c.headline]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();
      return full.includes(term);
    });
  }

  return { entries, total: count ?? 0 };
}

export async function getBenchEntry(supabase: SupabaseClient, id: string) {
  const orgId = await resolveOrgId(supabase);

  const { data, error } = await supabase
    .from("bench_entries")
    .select(`${BENCH_ENTRY_FIELDS}, candidates(${CANDIDATE_SELECT})`)
    .eq("id", id)
    .eq("organization_id", orgId)
    .single();

  if (error) throw error;
  return data as unknown as BenchEntryWithCandidate;
}

export async function getJobsByIds(supabase: SupabaseClient, ids: string[]) {
  if (ids.length === 0) return [];
  const orgId = await resolveOrgId(supabase);

  const { data, error } = await supabase
    .from("jobs")
    .select(JOB_SELECT)
    .eq("organization_id", orgId)
    .in("id", ids);

  if (error) throw error;
  return data ?? [];
}
