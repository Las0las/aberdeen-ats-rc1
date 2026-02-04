import type { SupabaseClient } from "@supabase/supabase-js";
import type { PlacementsRow, StartsRow } from "@/contracts/db/tables";

// ── Placement fields ───────────────────────────────────────────────
// All fields are safe to expose (no PII beyond what candidate join provides)

const PLACEMENT_FIELDS = [
  "id",
  "organization_id",
  "offer_id",
  "candidate_id",
  "job_id",
  "start_date",
  "end_date",
  "placement_fee",
  "fee_currency",
  "guarantee_days",
  "status",
  "notes",
  "created_at",
  "updated_at",
  "is_marketplace_placement",
  "agency_id",
].join(",");

const CANDIDATE_JOIN =
  "candidates(id,first_name,last_name,current_title,email)";
const JOB_JOIN = "jobs(id,title,department,location)";

export interface PlacementWithRelations extends PlacementsRow {
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

// ── Start fields ───────────────────────────────────────────────────

const START_FIELDS = [
  "id",
  "organization_id",
  "offer_id",
  "candidate_id",
  "job_id",
  "start_date",
  "employment_type",
  "status",
  "created_at",
].join(",");

export interface StartWithRelations extends StartsRow {
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

// ── Placements — List ──────────────────────────────────────────────

export async function listPlacements(
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
    .from("placements")
    .select(`${PLACEMENT_FIELDS}, ${CANDIDATE_JOIN}, ${JOB_JOIN}`, {
      count: "exact",
    })
    .eq("organization_id", orgId)
    .order("start_date", { ascending: false })
    .range(from, to);

  if (opts.status) {
    query = query.eq("status", opts.status);
  }

  const { data, error, count } = await query;
  if (error) throw error;

  let results = (data ?? []) as unknown as PlacementWithRelations[];

  if (opts.search) {
    const term = opts.search.toLowerCase();
    results = results.filter((r) => {
      const cName = [r.candidates?.first_name, r.candidates?.last_name]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();
      const jTitle = r.jobs?.title?.toLowerCase() ?? "";
      return cName.includes(term) || jTitle.includes(term);
    });
  }

  return { placements: results, total: count ?? 0 };
}

// ── Placements — Get ───────────────────────────────────────────────

export async function getPlacement(
  supabase: SupabaseClient,
  id: string,
): Promise<PlacementWithRelations> {
  const orgId = await resolveOrgId(supabase);

  const { data, error } = await supabase
    .from("placements")
    .select(`${PLACEMENT_FIELDS}, ${CANDIDATE_JOIN}, ${JOB_JOIN}`)
    .eq("organization_id", orgId)
    .eq("id", id)
    .single();

  if (error) throw error;
  return data as unknown as PlacementWithRelations;
}

// ── Starts — List for a placement's candidate ──────────────────────

export async function listStartsForPlacement(
  supabase: SupabaseClient,
  opts: {
    candidateId: string;
    status?: string;
    page: number;
    limit: number;
  },
) {
  const orgId = await resolveOrgId(supabase);
  const from = (opts.page - 1) * opts.limit;
  const to = from + opts.limit - 1;

  let query = supabase
    .from("starts")
    .select(`${START_FIELDS}, ${CANDIDATE_JOIN}, ${JOB_JOIN}`, {
      count: "exact",
    })
    .eq("organization_id", orgId)
    .eq("candidate_id", opts.candidateId)
    .order("start_date", { ascending: false })
    .range(from, to);

  if (opts.status) {
    query = query.eq("status", opts.status);
  }

  const { data, error, count } = await query;
  if (error) throw error;

  return {
    starts: (data ?? []) as unknown as StartWithRelations[],
    total: count ?? 0,
  };
}

// ── Start Readiness (computed, no schema invention) ────────────────

export interface ReadinessCheck {
  label: string;
  passed: boolean;
  detail: string;
}

/**
 * Computes start-readiness from existing contract fields.
 * No invented columns — all derived from real data.
 */
export function computeReadiness(
  placement: PlacementWithRelations,
  starts: StartWithRelations[],
): ReadinessCheck[] {
  const checks: ReadinessCheck[] = [];

  // 1. Placement exists and is active
  checks.push({
    label: "Placement recorded",
    passed: true,
    detail: `ID: ${placement.id.slice(0, 8)}…`,
  });

  // 2. Candidate assigned
  checks.push({
    label: "Candidate assigned",
    passed: placement.candidate_id != null,
    detail: placement.candidate_id
      ? `${placement.candidates?.first_name ?? ""} ${placement.candidates?.last_name ?? ""}`.trim() || placement.candidate_id.slice(0, 8)
      : "No candidate linked",
  });

  // 3. Job assigned
  checks.push({
    label: "Job assigned",
    passed: placement.job_id != null,
    detail: placement.jobs?.title ?? "No job linked",
  });

  // 4. Offer linked
  checks.push({
    label: "Offer linked",
    passed: placement.offer_id != null,
    detail: placement.offer_id
      ? `Offer ${placement.offer_id.slice(0, 8)}…`
      : "No offer linked",
  });

  // 5. Start date set
  checks.push({
    label: "Start date confirmed",
    passed: placement.start_date != null,
    detail: placement.start_date
      ? new Date(placement.start_date).toLocaleDateString()
      : "No start date",
  });

  // 6. Start record exists
  const hasStart = starts.length > 0;
  checks.push({
    label: "Start record created",
    passed: hasStart,
    detail: hasStart
      ? `${starts.length} start record(s), latest: ${starts[0].status}`
      : "No start records",
  });

  // 7. Start confirmed or started
  const confirmedStart = starts.some(
    (s) => s.status === "CONFIRMED" || s.status === "STARTED",
  );
  checks.push({
    label: "Start confirmed/active",
    passed: confirmedStart,
    detail: confirmedStart
      ? `Status: ${starts.find((s) => s.status === "CONFIRMED" || s.status === "STARTED")?.status}`
      : hasStart
        ? `Current: ${starts[0].status}`
        : "No start records",
  });

  // 8. Guarantee period
  checks.push({
    label: "Guarantee period set",
    passed: placement.guarantee_days != null && placement.guarantee_days > 0,
    detail:
      placement.guarantee_days != null
        ? `${placement.guarantee_days} days`
        : "Not specified",
  });

  return checks;
}
