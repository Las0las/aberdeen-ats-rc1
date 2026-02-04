import type { SupabaseClient } from "@supabase/supabase-js";
import type { ApplicationStage } from "@/contracts/db/enums";
import { ApplicationStageValues } from "@/contracts/db/enums";
import type { DashboardResponse } from "./schemas";

// ── Helpers ──────────────────────────────────────────────────────

async function resolveOrgId(supabase: SupabaseClient): Promise<string> {
  const { data, error } = await supabase.rpc("current_org_id");
  if (error || !data) throw new Error("Unable to resolve organization");
  return data as string;
}

function daysBetween(from: Date, to: Date): number {
  return Math.floor((to.getTime() - from.getTime()) / 86_400_000);
}

/** Monday 00:00 of the current week (local server time) */
function startOfWeek(): Date {
  const now = new Date();
  const day = now.getDay(); // 0=Sun
  const diff = day === 0 ? 6 : day - 1; // shift so Monday=0
  const monday = new Date(now.getFullYear(), now.getMonth(), now.getDate() - diff);
  return monday;
}

// ── Pipeline ─────────────────────────────────────────────────────

interface PipelineRow {
  stage: string | null;
  applied_date: string | null;
  date_applied: string | null;
}

async function fetchPipeline(
  supabase: SupabaseClient,
  orgId: string,
): Promise<DashboardResponse["pipeline"]> {
  // Lean select: only the 3 fields we aggregate on
  const { data, error } = await supabase
    .from("applications")
    .select("stage,applied_date,date_applied")
    .eq("organization_id", orgId);

  if (error) throw error;
  const rows = (data ?? []) as PipelineRow[];

  // Initialize counts
  const byStage = {} as Record<ApplicationStage, number>;
  for (const s of ApplicationStageValues) {
    byStage[s] = 0;
  }

  const now = new Date();
  let over7 = 0;
  let over14 = 0;
  let over30 = 0;

  for (const row of rows) {
    // Stage bucketing
    const stage = row.stage as ApplicationStage | null;
    if (stage && stage in byStage) {
      byStage[stage] += 1;
    }

    // Aging: prefer applied_date, fallback date_applied, skip if both null
    const dateStr = row.applied_date ?? row.date_applied;
    if (dateStr) {
      const applied = new Date(dateStr);
      const age = daysBetween(applied, now);
      if (age > 30) over30 += 1;
      else if (age > 14) over14 += 1;
      else if (age > 7) over7 += 1;
    }
  }

  return {
    total: rows.length,
    byStage,
    aging: {
      over7Days: over7,
      over14Days: over14,
      over30Days: over30,
    },
  };
}

// ── Bench ────────────────────────────────────────────────────────

interface BenchRow {
  state: string;
  bench_started_at: string;
}

async function fetchBench(
  supabase: SupabaseClient,
  orgId: string,
): Promise<DashboardResponse["bench"]> {
  // Only active bench entries (not ended)
  const { data, error } = await supabase
    .from("bench_entries")
    .select("state,bench_started_at")
    .eq("organization_id", orgId)
    .is("bench_ended_at", null);

  if (error) throw error;
  const rows = (data ?? []) as BenchRow[];

  const now = new Date();
  let remarketing = 0;
  let totalDays = 0;

  for (const row of rows) {
    if (row.state === "REMARKETING") remarketing += 1;
    totalDays += daysBetween(new Date(row.bench_started_at), now);
  }

  return {
    total: rows.length,
    remarketing,
    avgDaysOnBench: rows.length > 0 ? Math.round(totalDays / rows.length) : 0,
  };
}

// ── Assignments ──────────────────────────────────────────────────

interface AssignmentRow {
  state: string;
  current_end_date: string | null;
}

async function fetchAssignments(
  supabase: SupabaseClient,
  orgId: string,
): Promise<DashboardResponse["assignments"]> {
  // Active = ACTIVE or EXTENDED
  const { data, error } = await supabase
    .from("assignments")
    .select("state,current_end_date")
    .eq("organization_id", orgId)
    .in("state", ["ACTIVE", "EXTENDED"]);

  if (error) throw error;
  const rows = (data ?? []) as AssignmentRow[];

  const now = new Date();
  const threshold = new Date(now.getTime() + 30 * 86_400_000);
  let endingSoon = 0;

  for (const row of rows) {
    if (row.current_end_date) {
      const endDate = new Date(row.current_end_date);
      if (endDate >= now && endDate <= threshold) {
        endingSoon += 1;
      }
    }
  }

  return {
    active: rows.length,
    endingSoon,
  };
}

// ── Placements ───────────────────────────────────────────────────

interface PlacementRow {
  start_date: string;
}

async function fetchPlacements(
  supabase: SupabaseClient,
  orgId: string,
): Promise<DashboardResponse["placements"]> {
  // Fetch placements with start_date in a reasonable window:
  // past 7 days to future 14 days
  const weekStart = startOfWeek();
  const futureEnd = new Date(Date.now() + 14 * 86_400_000);

  const { data, error } = await supabase
    .from("placements")
    .select("start_date")
    .eq("organization_id", orgId)
    .gte("start_date", weekStart.toISOString())
    .lte("start_date", futureEnd.toISOString());

  if (error) throw error;
  const rows = (data ?? []) as PlacementRow[];

  const now = new Date();
  const todayStr = now.toISOString().slice(0, 10);
  let startedThisWeek = 0;
  let upcomingStarts = 0;

  for (const row of rows) {
    const startDay = row.start_date.slice(0, 10);
    if (startDay <= todayStr) {
      startedThisWeek += 1;
    } else {
      upcomingStarts += 1;
    }
  }

  return {
    startedThisWeek,
    upcomingStarts,
  };
}

// ── Composite ────────────────────────────────────────────────────

export async function getDashboardData(
  supabase: SupabaseClient,
): Promise<DashboardResponse> {
  const orgId = await resolveOrgId(supabase);

  // Run all 4 in parallel for speed
  const [pipelineResult, benchResult, assignmentsResult, placementsResult] =
    await Promise.allSettled([
      fetchPipeline(supabase, orgId),
      fetchBench(supabase, orgId),
      fetchAssignments(supabase, orgId),
      fetchPlacements(supabase, orgId),
    ]);

  // Resilient defaults — if one section fails, others still render
  const emptyByStage = Object.fromEntries(
    ApplicationStageValues.map((s) => [s, 0]),
  ) as Record<ApplicationStage, number>;

  return {
    pipeline:
      pipelineResult.status === "fulfilled"
        ? pipelineResult.value
        : { total: 0, byStage: emptyByStage, aging: { over7Days: 0, over14Days: 0, over30Days: 0 } },
    bench:
      benchResult.status === "fulfilled"
        ? benchResult.value
        : { total: 0, remarketing: 0, avgDaysOnBench: 0 },
    assignments:
      assignmentsResult.status === "fulfilled"
        ? assignmentsResult.value
        : { active: 0, endingSoon: 0 },
    placements:
      placementsResult.status === "fulfilled"
        ? placementsResult.value
        : { startedThisWeek: 0, upcomingStarts: 0 },
  };
}
