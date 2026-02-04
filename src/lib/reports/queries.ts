import type { SupabaseClient } from "@supabase/supabase-js";
import type { ApplicationStage } from "@/contracts/db/enums";
import {
  ApplicationStageValues,
  BenchStateValues,
} from "@/contracts/db/enums";
import type {
  ReportsResponse,
  FunnelReport,
  PipelineReport,
  BenchReport,
  ActivityReport,
  StageAgeBucket,
  ActorActivity,
  ReportType,
} from "./schemas";

// ── Helpers ──────────────────────────────────────────────────────

async function resolveOrgId(supabase: SupabaseClient): Promise<string> {
  const { data, error } = await supabase.rpc("current_org_id");
  if (error || !data) throw new Error("Unable to resolve organization");
  return data as string;
}

function sinceDate(days: number): string {
  return new Date(Date.now() - days * 86_400_000).toISOString();
}

function daysBetween(from: Date, to: Date): number {
  return Math.max(0, Math.floor((to.getTime() - from.getTime()) / 86_400_000));
}

function pct(numerator: number, denominator: number): number {
  if (denominator === 0) return 0;
  return Math.round((numerator / denominator) * 1000) / 10; // one decimal
}

// ── 1. Funnel ────────────────────────────────────────────────────

async function fetchFunnel(
  supabase: SupabaseClient,
  orgId: string,
  sinceDays: number,
): Promise<FunnelReport> {
  const since = sinceDate(sinceDays);

  // Parallel count queries — lean: only `id` selected to minimize payload
  const [apps, subs, intv, offers, starts] = await Promise.all([
    supabase
      .from("applications")
      .select("id", { count: "exact", head: true })
      .eq("organization_id", orgId)
      .gte("created_at", since),
    supabase
      .from("submittals")
      .select("id", { count: "exact", head: true })
      .eq("organization_id", orgId)
      .gte("created_at", since),
    supabase
      .from("interviews")
      .select("id", { count: "exact", head: true })
      .eq("organization_id", orgId)
      .gte("created_at", since),
    supabase
      .from("offers")
      .select("id", { count: "exact", head: true })
      .eq("organization_id", orgId)
      .gte("created_at", since),
    supabase
      .from("starts")
      .select("id", { count: "exact", head: true })
      .eq("organization_id", orgId)
      .gte("created_at", since),
  ]);

  const counts = {
    applications: apps.count ?? 0,
    submittals: subs.count ?? 0,
    interviews: intv.count ?? 0,
    offers: offers.count ?? 0,
    starts: starts.count ?? 0,
  };

  return {
    steps: [
      { label: "Applications", count: counts.applications },
      { label: "Submittals", count: counts.submittals },
      { label: "Interviews", count: counts.interviews },
      { label: "Offers", count: counts.offers },
      { label: "Starts", count: counts.starts },
    ],
    conversions: [
      { from: "Applications", to: "Submittals", rate: pct(counts.submittals, counts.applications) },
      { from: "Submittals", to: "Interviews", rate: pct(counts.interviews, counts.submittals) },
      { from: "Interviews", to: "Offers", rate: pct(counts.offers, counts.interviews) },
      { from: "Offers", to: "Starts", rate: pct(counts.starts, counts.offers) },
    ],
    sinceDays,
  };
}

// ── 2. Pipeline Distribution + Age Buckets ───────────────────────

interface PipelineRow {
  stage: string | null;
  applied_date: string | null;
  date_applied: string | null;
}

async function fetchPipeline(
  supabase: SupabaseClient,
  orgId: string,
  sinceDays: number,
): Promise<PipelineReport> {
  const query = supabase
    .from("applications")
    .select("stage,applied_date,date_applied")
    .eq("organization_id", orgId);

  // sinceDays < 365 => filter; otherwise all
  if (sinceDays < 365) {
    query.gte("created_at", sinceDate(sinceDays));
  }

  const { data, error } = await query;
  if (error) throw error;
  const rows = (data ?? []) as PipelineRow[];

  // Stage counts
  const stageCounts = new Map<ApplicationStage, number>();
  for (const s of ApplicationStageValues) stageCounts.set(s, 0);

  // Age buckets per stage
  const ageBucketMap = new Map<ApplicationStage, StageAgeBucket>();
  for (const s of ApplicationStageValues) {
    ageBucketMap.set(s, { stage: s, "0-7": 0, "8-14": 0, "15-30": 0, "30+": 0 });
  }

  const now = new Date();

  for (const row of rows) {
    const stage = (row.stage ?? "NEW") as ApplicationStage;
    if (!stageCounts.has(stage)) continue; // unknown stage, skip

    stageCounts.set(stage, (stageCounts.get(stage) ?? 0) + 1);

    // Age bucket
    const dateStr = row.applied_date ?? row.date_applied;
    if (dateStr) {
      const age = daysBetween(new Date(dateStr), now);
      const bucket = ageBucketMap.get(stage)!;
      if (age <= 7) bucket["0-7"] += 1;
      else if (age <= 14) bucket["8-14"] += 1;
      else if (age <= 30) bucket["15-30"] += 1;
      else bucket["30+"] += 1;
    }
  }

  return {
    total: rows.length,
    byStage: ApplicationStageValues.map((s) => ({
      stage: s,
      count: stageCounts.get(s) ?? 0,
    })),
    ageBuckets: ApplicationStageValues.map((s) => ageBucketMap.get(s)!),
    sinceDays,
  };
}

// ── 3. Bench ─────────────────────────────────────────────────────

interface BenchRow {
  state: string;
  bench_started_at: string;
}

async function fetchBench(
  supabase: SupabaseClient,
  orgId: string,
): Promise<BenchReport> {
  const { data, error } = await supabase
    .from("bench_entries")
    .select("state,bench_started_at")
    .eq("organization_id", orgId)
    .is("bench_ended_at", null);

  if (error) throw error;
  const rows = (data ?? []) as BenchRow[];

  const now = new Date();
  let totalDays = 0;

  // Count by state
  const stateMap = new Map<string, number>();
  for (const s of BenchStateValues) stateMap.set(s, 0);

  for (const row of rows) {
    totalDays += daysBetween(new Date(row.bench_started_at), now);
    stateMap.set(row.state, (stateMap.get(row.state) ?? 0) + 1);
  }

  return {
    active: rows.length,
    avgDaysOnBench: rows.length > 0 ? Math.round(totalDays / rows.length) : 0,
    byState: [...stateMap.entries()].map(([state, count]) => ({ state, count })),
  };
}

// ── 4. Activity ──────────────────────────────────────────────────

interface ActivityRow {
  actor_name: string | null;
  action_category: string | null;
}

async function fetchActivity(
  supabase: SupabaseClient,
  orgId: string,
  sinceDays: number,
): Promise<ActivityReport> {
  // Lean select: only actor_name + action_category. No jsonb, no ip_address/user_agent.
  const { data, error } = await supabase
    .from("activities")
    .select("actor_name,action_category")
    .eq("organization_id", orgId)
    .gte("created_at", sinceDate(sinceDays))
    .limit(5000); // cap to avoid huge payloads

  if (error) throw error;
  const rows = (data ?? []) as ActivityRow[];

  // Aggregate by actor
  const actorMap = new Map<string, Map<string, number>>();

  for (const row of rows) {
    const name = row.actor_name ?? "Unknown";
    const cat = row.action_category ?? "other";
    if (!actorMap.has(name)) actorMap.set(name, new Map());
    const catMap = actorMap.get(name)!;
    catMap.set(cat, (catMap.get(cat) ?? 0) + 1);
  }

  // Build top actors (sorted by total desc, top 20)
  const actors: ActorActivity[] = [];
  for (const [actorName, catMap] of actorMap) {
    let total = 0;
    const byCategory: Record<string, number> = {};
    for (const [cat, cnt] of catMap) {
      byCategory[cat] = cnt;
      total += cnt;
    }
    actors.push({ actorName, total, byCategory });
  }
  actors.sort((a, b) => b.total - a.total);

  return {
    topActors: actors.slice(0, 20),
    totalActivities: rows.length,
    sinceDays,
  };
}

// ── Composite ────────────────────────────────────────────────────

export async function getReportsData(
  supabase: SupabaseClient,
  sinceDays: number,
): Promise<ReportsResponse> {
  const orgId = await resolveOrgId(supabase);

  const [funnelRes, pipelineRes, benchRes, activityRes] =
    await Promise.allSettled([
      fetchFunnel(supabase, orgId, sinceDays),
      fetchPipeline(supabase, orgId, sinceDays),
      fetchBench(supabase, orgId),
      fetchActivity(supabase, orgId, sinceDays),
    ]);

  // Resilient defaults
  const emptyByStage = ApplicationStageValues.map((s) => ({ stage: s, count: 0 }));
  const emptyBuckets = ApplicationStageValues.map((s) => ({
    stage: s,
    "0-7": 0,
    "8-14": 0,
    "15-30": 0,
    "30+": 0,
  }));

  return {
    funnel:
      funnelRes.status === "fulfilled"
        ? funnelRes.value
        : {
            steps: [],
            conversions: [],
            sinceDays,
          },
    pipeline:
      pipelineRes.status === "fulfilled"
        ? pipelineRes.value
        : { total: 0, byStage: emptyByStage, ageBuckets: emptyBuckets, sinceDays },
    bench:
      benchRes.status === "fulfilled"
        ? benchRes.value
        : { active: 0, avgDaysOnBench: 0, byState: [] },
    activity:
      activityRes.status === "fulfilled"
        ? activityRes.value
        : { topActors: [], totalActivities: 0, sinceDays },
  };
}

// ── CSV Export ────────────────────────────────────────────────────

function escCsv(val: string | number): string {
  const s = String(val);
  if (s.includes(",") || s.includes('"') || s.includes("\n")) {
    return `"${s.replace(/"/g, '""')}"`;
  }
  return s;
}

export async function getReportCsv(
  supabase: SupabaseClient,
  sinceDays: number,
  type: ReportType,
): Promise<string> {
  const orgId = await resolveOrgId(supabase);

  switch (type) {
    case "funnel": {
      const data = await fetchFunnel(supabase, orgId, sinceDays);
      const lines = ["Stage,Count"];
      for (const s of data.steps) lines.push(`${escCsv(s.label)},${s.count}`);
      lines.push("");
      lines.push("From,To,Conversion Rate %");
      for (const c of data.conversions)
        lines.push(`${escCsv(c.from)},${escCsv(c.to)},${c.rate}`);
      return lines.join("\n");
    }
    case "pipeline": {
      const data = await fetchPipeline(supabase, orgId, sinceDays);
      const lines = ["Stage,Count,0-7 Days,8-14 Days,15-30 Days,30+ Days"];
      for (let i = 0; i < data.byStage.length; i++) {
        const s = data.byStage[i];
        const b = data.ageBuckets[i];
        lines.push(
          `${escCsv(s.stage)},${s.count},${b["0-7"]},${b["8-14"]},${b["15-30"]},${b["30+"]}`,
        );
      }
      return lines.join("\n");
    }
    case "bench": {
      const data = await fetchBench(supabase, orgId);
      const lines = [
        `Active Bench Entries,${data.active}`,
        `Avg Days on Bench,${data.avgDaysOnBench}`,
        "",
        "State,Count",
      ];
      for (const s of data.byState) lines.push(`${escCsv(s.state)},${s.count}`);
      return lines.join("\n");
    }
    case "activity": {
      const data = await fetchActivity(supabase, orgId, sinceDays);
      // Collect all categories
      const cats = new Set<string>();
      for (const a of data.topActors) {
        for (const c of Object.keys(a.byCategory)) cats.add(c);
      }
      const catArr = [...cats].sort();
      const header = ["Actor", "Total", ...catArr.map(escCsv)].join(",");
      const lines = [header];
      for (const a of data.topActors) {
        const row = [
          escCsv(a.actorName),
          String(a.total),
          ...catArr.map((c) => String(a.byCategory[c] ?? 0)),
        ];
        lines.push(row.join(","));
      }
      return lines.join("\n");
    }
  }
}
