import type { SupabaseClient } from "@supabase/supabase-js";
import { ApplicationStageValues } from "@/contracts/db/enums";
import { createLogger } from "@/lib/logger";
import type {
  PipelineIntelligenceResponse,
  StageTimingRow,
  StageConversionRow,
  AgingBucketRow,
  StuckApplicationRow,
  VelocityResponse,
  RollingMetricRow,
  WowDeltaRow,
  Direction,
  DimensionResponse,
  DimensionRow,
  StageCount,
  AutomationEffectivenessResponse,
  AutomationEffectivenessRow,
} from "./types";
import {
  STUCK_THRESHOLD_DAYS,
  ROW_CAP,
  ACK_WINDOW_DAYS,
  WOW_FLAT_BAND,
  DIMENSION_LIMIT,
  TERMINAL_STAGES,
} from "./types";

const log = createLogger("reporting-v2");

// ── Shared Helpers ───────────────────────────────────────────────

async function resolveOrgId(supabase: SupabaseClient): Promise<string> {
  const { data, error } = await supabase.rpc("current_org_id");
  if (error || !data) throw new Error("Unable to resolve organization");
  return data as string;
}

function isoAgo(days: number): string {
  return new Date(Date.now() - days * 86_400_000).toISOString();
}

function daysBetween(from: Date, to: Date): number {
  return Math.max(0, (to.getTime() - from.getTime()) / 86_400_000);
}

function pct(num: number, den: number): number {
  if (den === 0) return 0;
  return Math.round((num / den) * 1000) / 10;
}

function percentile(sorted: number[], p: number): number {
  if (sorted.length === 0) return 0;
  const idx = (sorted.length - 1) * p;
  const lo = Math.floor(idx);
  const hi = Math.ceil(idx);
  if (lo === hi) return Math.round(sorted[lo] * 10) / 10;
  return Math.round((sorted[lo] + (sorted[hi] - sorted[lo]) * (idx - lo)) * 10) / 10;
}

function direction(currentWeek: number, previousWeek: number): Direction {
  if (previousWeek === 0) return currentWeek > 0 ? "up" : "flat";
  const delta = ((currentWeek - previousWeek) / previousWeek) * 100;
  if (delta > WOW_FLAT_BAND) return "up";
  if (delta < -WOW_FLAT_BAND) return "down";
  return "flat";
}

function deltaPct(current: number, previous: number): number | null {
  if (previous === 0) return current > 0 ? null : null;
  return Math.round(((current - previous) / previous) * 1000) / 10;
}

function safeStage(val: unknown): string | null {
  if (val && typeof val === "object" && "stage" in val) {
    const s = (val as Record<string, unknown>).stage;
    if (typeof s === "string" && s.length > 0) return s;
  }
  return null;
}

// ── Raw Row Types (DB shapes) ────────────────────────────────────

interface ActivityTransitionRow {
  entity_id: string;
  previous_value: unknown;
  new_value: unknown;
  created_at: string;
}

interface ApplicationSnapshotRow {
  id: string;
  current_stage: string;
  job_id: string | null;
  assigned_to: string | null;
  applied_date: string | null;
  date_applied: string | null;
  updated_at: string;
}

interface CountableRow {
  created_at: string;
}

interface AppDimensionRow {
  id: string;
  current_stage: string;
  assigned_to: string | null;
  job_id: string | null;
  created_at: string;
}

interface UserLabelRow {
  id: string;
  full_name: string | null;
}

interface JobLabelRow {
  id: string;
  title: string;
}

interface AutoAlertRow {
  id: string;
  entity_id: string;
  source: string;
  created_at: string;
}

interface FollowupRow {
  entity_id: string;
  created_at: string;
}

interface RuleRow {
  id: string;
  name: string;
}

// ═════════════════════════════════════════════════════════════════
// MODULE 1 — Pipeline Intelligence
// ═════════════════════════════════════════════════════════════════

export async function fetchPipelineIntelligence(
  supabase: SupabaseClient,
  sinceDays: number,
): Promise<PipelineIntelligenceResponse> {
  const orgId = await resolveOrgId(supabase);
  const since = isoAgo(sinceDays);

  // ── Parallel fetches ───────────────────────────────────────
  const [transitionsRes, snapshotRes] = await Promise.all([
    supabase
      .from("activities")
      .select("entity_id,previous_value,new_value,created_at")
      .eq("organization_id", orgId)
      .eq("action_type", "stage_changed")
      .eq("action_category", "pipeline")
      .gte("created_at", since)
      .order("created_at", { ascending: true })
      .limit(ROW_CAP),
    supabase
      .from("applications")
      .select("id,current_stage,job_id,assigned_to,applied_date,date_applied,updated_at")
      .eq("organization_id", orgId)
      .limit(ROW_CAP),
  ]);

  if (transitionsRes.error) {
    log.error("activities fetch failed", transitionsRes.error.message);
    throw transitionsRes.error;
  }
  if (snapshotRes.error) {
    log.error("applications fetch failed", snapshotRes.error.message);
    throw snapshotRes.error;
  }

  const transitions = (transitionsRes.data ?? []) as ActivityTransitionRow[];
  const snapshot = (snapshotRes.data ?? []) as ApplicationSnapshotRow[];

  // ── Build per-application transition timeline ──────────────
  const byApp = new Map<string, ActivityTransitionRow[]>();
  for (const t of transitions) {
    const list = byApp.get(t.entity_id);
    if (list) list.push(t);
    else byApp.set(t.entity_id, [t]);
  }

  // ── Stage durations (attributed to to_stage per correction #1) ─
  const durationsByStage = new Map<string, number[]>();

  for (const [, events] of byApp) {
    for (let i = 0; i < events.length; i++) {
      const toStage = safeStage(events[i].new_value);
      if (!toStage) continue;

      const enteredAt = new Date(events[i].created_at);
      const exitedAt =
        i + 1 < events.length
          ? new Date(events[i + 1].created_at)
          : null; // still in stage — exclude from timing

      if (!exitedAt) continue;

      const days = daysBetween(enteredAt, exitedAt);
      const arr = durationsByStage.get(toStage);
      if (arr) arr.push(days);
      else durationsByStage.set(toStage, [days]);
    }
  }

  const timing: StageTimingRow[] = [];
  for (const [stage, durations] of durationsByStage) {
    durations.sort((a, b) => a - b);
    const sum = durations.reduce((a, b) => a + b, 0);
    timing.push({
      stage,
      transitions: durations.length,
      avgDays: Math.round((sum / durations.length) * 10) / 10,
      p50Days: percentile(durations, 0.5),
      p90Days: percentile(durations, 0.9),
    });
  }
  timing.sort((a, b) => {
    const ai = ApplicationStageValues.indexOf(a.stage as (typeof ApplicationStageValues)[number]);
    const bi = ApplicationStageValues.indexOf(b.stage as (typeof ApplicationStageValues)[number]);
    return (ai === -1 ? 99 : ai) - (bi === -1 ? 99 : bi);
  });

  // ── Stage-to-stage conversions ─────────────────────────────
  // Track the highest stage ordinal each application reached
  const stageOrder = new Map<string, number>();
  for (let i = 0; i < ApplicationStageValues.length; i++) {
    stageOrder.set(ApplicationStageValues[i], i);
  }

  const maxStageByApp = new Map<string, number>();
  for (const [appId, events] of byApp) {
    let max = -1;
    for (const e of events) {
      const s = safeStage(e.new_value);
      if (s) {
        const ord = stageOrder.get(s) ?? -1;
        if (ord > max) max = ord;
      }
      const ps = safeStage(e.previous_value);
      if (ps) {
        const pord = stageOrder.get(ps) ?? -1;
        if (pord > max) max = pord;
      }
    }
    if (max >= 0) maxStageByApp.set(appId, max);
  }

  // Also include apps with no transitions based on current_stage
  for (const app of snapshot) {
    if (!maxStageByApp.has(app.id)) {
      const ord = stageOrder.get(app.current_stage) ?? 0;
      maxStageByApp.set(app.id, ord);
    }
  }

  const conversions: StageConversionRow[] = [];
  for (let i = 0; i < ApplicationStageValues.length - 1; i++) {
    const fromStage = ApplicationStageValues[i];
    const toStage = ApplicationStageValues[i + 1];
    const entered = [...maxStageByApp.values()].filter((m) => m >= i).length;
    const advanced = [...maxStageByApp.values()].filter((m) => m >= i + 1).length;
    conversions.push({
      fromStage,
      toStage,
      entered,
      advanced,
      ratePct: pct(advanced, entered),
    });
  }

  // ── Aging buckets (correction #2: based on last stage_changed, fallback updated_at) ─
  const lastActivityByApp = new Map<string, Date>();
  for (const [appId, events] of byApp) {
    const last = events[events.length - 1];
    if (last) lastActivityByApp.set(appId, new Date(last.created_at));
  }

  const now = new Date();
  const agingMap = new Map<string, { d0_7: number; d8_14: number; d15_30: number; d30plus: number }>();

  for (const app of snapshot) {
    if (TERMINAL_STAGES.has(app.current_stage)) continue;

    const referenceDate = lastActivityByApp.get(app.id) ?? new Date(app.updated_at);
    const age = daysBetween(referenceDate, now);

    let bucket = agingMap.get(app.current_stage);
    if (!bucket) {
      bucket = { d0_7: 0, d8_14: 0, d15_30: 0, d30plus: 0 };
      agingMap.set(app.current_stage, bucket);
    }

    if (age <= 7) bucket.d0_7++;
    else if (age <= 14) bucket.d8_14++;
    else if (age <= 30) bucket.d15_30++;
    else bucket.d30plus++;
  }

  const aging: AgingBucketRow[] = [...agingMap.entries()]
    .map(([stage, b]) => ({ stage, ...b }))
    .sort((a, b) => {
      const ai = ApplicationStageValues.indexOf(a.stage as (typeof ApplicationStageValues)[number]);
      const bi = ApplicationStageValues.indexOf(b.stage as (typeof ApplicationStageValues)[number]);
      return (ai === -1 ? 99 : ai) - (bi === -1 ? 99 : bi);
    });

  // ── Stuck detection (correction #2 + #3) ───────────────────
  const stuck: StuckApplicationRow[] = [];

  for (const app of snapshot) {
    if (TERMINAL_STAGES.has(app.current_stage)) continue;

    const lastChange = lastActivityByApp.get(app.id) ?? new Date(app.updated_at);
    const days = daysBetween(lastChange, now);

    if (days >= STUCK_THRESHOLD_DAYS) {
      stuck.push({
        applicationId: app.id,
        currentStage: app.current_stage,
        daysSinceLastChange: Math.round(days),
        jobId: app.job_id,
        assignedTo: app.assigned_to,
      });
    }
  }
  stuck.sort((a, b) => b.daysSinceLastChange - a.daysSinceLastChange);

  return { timing, conversions, aging, stuck, sinceDays };
}

// ═════════════════════════════════════════════════════════════════
// MODULE 2 — Velocity & Trends
// ═════════════════════════════════════════════════════════════════

export async function fetchVelocity(
  supabase: SupabaseClient,
): Promise<VelocityResponse> {
  const orgId = await resolveOrgId(supabase);
  const since90 = isoAgo(90);
  const since14 = isoAgo(14);

  // ── Parallel fetches — lean: created_at only ───────────────
  const [appsRes, interviewsRes, offersRes, stageChangesRes] = await Promise.all([
    supabase
      .from("applications")
      .select("created_at")
      .eq("organization_id", orgId)
      .gte("created_at", since90)
      .limit(ROW_CAP),
    supabase
      .from("interviews")
      .select("created_at")
      .eq("organization_id", orgId)
      .gte("created_at", since90)
      .limit(ROW_CAP),
    supabase
      .from("offers")
      .select("created_at")
      .eq("organization_id", orgId)
      .gte("created_at", since90)
      .limit(ROW_CAP),
    supabase
      .from("activities")
      .select("created_at")
      .eq("organization_id", orgId)
      .eq("action_type", "stage_changed")
      .eq("action_category", "pipeline")
      .gte("created_at", since90)
      .limit(ROW_CAP),
  ]);

  // Defensive: continue with empty arrays on partial failure
  const appsRows = (appsRes.data ?? []) as CountableRow[];
  const interviewRows = (interviewsRes.data ?? []) as CountableRow[];
  const offerRows = (offersRes.data ?? []) as CountableRow[];
  const stageRows = (stageChangesRes.data ?? []) as CountableRow[];

  if (appsRes.error) log.warn("velocity: applications fetch failed", appsRes.error.message);
  if (interviewsRes.error) log.warn("velocity: interviews fetch failed", interviewsRes.error.message);
  if (offersRes.error) log.warn("velocity: offers fetch failed", offersRes.error.message);
  if (stageChangesRes.error) log.warn("velocity: stage_changes fetch failed", stageChangesRes.error.message);

  const now = Date.now();
  const d7 = now - 7 * 86_400_000;
  const d14 = now - 14 * 86_400_000;
  const d30 = now - 30 * 86_400_000;
  const d90 = now - 90 * 86_400_000;

  function countWindows(rows: CountableRow[]): {
    c7: number; c30: number; c90: number; cw: number; pw: number;
  } {
    let c7 = 0, c30 = 0, c90 = 0, cw = 0, pw = 0;
    for (const r of rows) {
      const ts = new Date(r.created_at).getTime();
      if (ts >= d90) c90++;
      if (ts >= d30) c30++;
      if (ts >= d7) { c7++; cw++; }
      else if (ts >= d14) pw++;
    }
    return { c7, c30, c90, cw, pw };
  }

  const datasets: { label: string; rows: CountableRow[] }[] = [
    { label: "applications", rows: appsRows },
    { label: "interviews", rows: interviewRows },
    { label: "offers", rows: offerRows },
    { label: "stage_changes", rows: stageRows },
  ];

  const rolling: RollingMetricRow[] = [];
  const wow: WowDeltaRow[] = [];

  for (const { label, rows } of datasets) {
    const w = countWindows(rows);
    rolling.push({
      metric: label,
      count7d: w.c7,
      count30d: w.c30,
      count90d: w.c90,
    });
    wow.push({
      metric: label,
      currentWeek: w.cw,
      previousWeek: w.pw,
      deltaPct: deltaPct(w.cw, w.pw),
      direction: direction(w.cw, w.pw),
    });
  }

  return { rolling, wow };
}

// ═════════════════════════════════════════════════════════════════
// MODULE 3 — Dimensional Breakdowns
// ═════════════════════════════════════════════════════════════════

export async function fetchDimensions(
  supabase: SupabaseClient,
  dim: "recruiter" | "job" | "stage",
  sinceDays: number,
): Promise<DimensionResponse> {
  const orgId = await resolveOrgId(supabase);
  const since = isoAgo(sinceDays);

  // ── Fetch applications (lean) ──────────────────────────────
  const { data: rawApps, error: appsErr } = await supabase
    .from("applications")
    .select("id,current_stage,assigned_to,job_id,created_at")
    .eq("organization_id", orgId)
    .gte("created_at", since)
    .limit(ROW_CAP);

  if (appsErr) {
    log.error("dimensions: applications fetch failed", appsErr.message);
    throw appsErr;
  }

  const apps = (rawApps ?? []) as AppDimensionRow[];
  if (apps.length === 0) {
    return { dimension: dim, rows: [], sinceDays };
  }

  // ── Group by dimension key ─────────────────────────────────
  // Correction #5: stages grouped dynamically, never hard-coded
  type GroupAccum = { total: number; stages: Map<string, number> };
  const groups = new Map<string | null, GroupAccum>();

  function getKey(app: AppDimensionRow): string | null {
    switch (dim) {
      case "recruiter": return app.assigned_to;
      case "job": return app.job_id;
      case "stage": return app.current_stage;
    }
  }

  for (const app of apps) {
    const key = getKey(app);
    let g = groups.get(key);
    if (!g) {
      g = { total: 0, stages: new Map() };
      groups.set(key, g);
    }
    g.total++;
    g.stages.set(app.current_stage, (g.stages.get(app.current_stage) ?? 0) + 1);
  }

  // ── Resolve labels ─────────────────────────────────────────
  const labelMap = new Map<string, string>();

  if (dim === "recruiter") {
    const ids = [...groups.keys()].filter((k): k is string => k !== null);
    if (ids.length > 0) {
      const { data: users } = await supabase
        .from("users")
        .select("id,full_name")
        .in("id", ids);
      for (const u of (users ?? []) as UserLabelRow[]) {
        if (u.full_name) labelMap.set(u.id, u.full_name);
      }
    }
  } else if (dim === "job") {
    const ids = [...groups.keys()].filter((k): k is string => k !== null);
    if (ids.length > 0) {
      const { data: jobs } = await supabase
        .from("jobs")
        .select("id,title")
        .in("id", ids);
      for (const j of (jobs ?? []) as JobLabelRow[]) {
        labelMap.set(j.id, j.title);
      }
    }
  }
  // dim === "stage" → label is the key itself

  function resolveLabel(key: string | null): string {
    if (key === null) {
      return dim === "recruiter" ? "Unassigned" : dim === "job" ? "No Job" : "Unknown";
    }
    if (dim === "stage") return key;
    return labelMap.get(key) ?? key; // fallback to raw ID
  }

  // ── Build result rows ──────────────────────────────────────
  const grandTotal = apps.length;
  const unsorted: DimensionRow[] = [];

  for (const [key, g] of groups) {
    const byStage: StageCount[] = [...g.stages.entries()]
      .map(([stage, count]) => ({ stage, count }))
      .sort((a, b) => b.count - a.count);

    unsorted.push({
      dimensionId: key,
      label: resolveLabel(key),
      total: g.total,
      pctOfTotal: pct(g.total, grandTotal),
      byStage,
    });
  }

  unsorted.sort((a, b) => b.total - a.total);

  return {
    dimension: dim,
    rows: unsorted.slice(0, DIMENSION_LIMIT),
    sinceDays,
  };
}

// ═════════════════════════════════════════════════════════════════
// MODULE 4 — Automation Effectiveness
// ═════════════════════════════════════════════════════════════════

const RULE_SOURCE_RE = /^rule:(.+)$/;

export async function fetchAutomationEffectiveness(
  supabase: SupabaseClient,
  sinceDays: number,
): Promise<AutomationEffectivenessResponse> {
  const orgId = await resolveOrgId(supabase);
  const since = isoAgo(sinceDays);

  // ── Fetch automation alerts ────────────────────────────────
  const { data: rawAlerts, error: alertsErr } = await supabase
    .from("activities")
    .select("id,entity_id,source,created_at")
    .eq("organization_id", orgId)
    .eq("action_category", "automation")
    .gte("created_at", since)
    .not("source", "is", null)
    .limit(ROW_CAP);

  if (alertsErr) {
    log.error("automation: alerts fetch failed", alertsErr.message);
    throw alertsErr;
  }

  const rawRows = (rawAlerts ?? []) as AutoAlertRow[];

  // Parse rule IDs, skip malformed
  interface ParsedAlert {
    id: string;
    entityId: string;
    ruleId: string;
    firedAt: Date;
  }
  const alerts: ParsedAlert[] = [];
  const ruleIds = new Set<string>();

  for (const r of rawRows) {
    const match = RULE_SOURCE_RE.exec(r.source ?? "");
    if (!match) continue;
    const ruleId = match[1];
    alerts.push({
      id: r.id,
      entityId: r.entity_id,
      ruleId,
      firedAt: new Date(r.created_at),
    });
    ruleIds.add(ruleId);
  }

  if (alerts.length === 0) {
    return { rules: [], sinceDays };
  }

  // ── Fetch rule names ───────────────────────────────────────
  const ruleIdArr = [...ruleIds];
  const { data: rulesData } = await supabase
    .from("automation_rules")
    .select("id,name")
    .in("id", ruleIdArr);

  const ruleNameMap = new Map<string, string>();
  for (const r of (rulesData ?? []) as RuleRow[]) {
    ruleNameMap.set(r.id, r.name);
  }

  // ── Fetch non-automation followup activities ───────────────
  // Scoped to entities that had automation alerts, within +7 day window
  const entityIds = [...new Set(alerts.map((a) => a.entityId))];
  const { data: followups } = await supabase
    .from("activities")
    .select("entity_id,created_at")
    .eq("organization_id", orgId)
    .neq("action_category", "automation")
    .in("entity_id", entityIds)
    .gte("created_at", since)
    .limit(ROW_CAP);

  const followupRows = (followups ?? []) as FollowupRow[];

  // Index followups by entity
  const followupsByEntity = new Map<string, Date[]>();
  for (const f of followupRows) {
    const list = followupsByEntity.get(f.entity_id);
    const d = new Date(f.created_at);
    if (list) list.push(d);
    else followupsByEntity.set(f.entity_id, [d]);
  }

  // ── Compute per-rule stats ─────────────────────────────────
  interface RuleAccum {
    fired: number;
    acked: number;
  }
  const ruleStats = new Map<string, RuleAccum>();

  for (const alert of alerts) {
    let s = ruleStats.get(alert.ruleId);
    if (!s) {
      s = { fired: 0, acked: 0 };
      ruleStats.set(alert.ruleId, s);
    }
    s.fired++;

    // Check for acknowledgment: any non-automation activity on same entity
    // within ACK_WINDOW_DAYS after alert fired
    const entityFollowups = followupsByEntity.get(alert.entityId);
    if (entityFollowups) {
      const ackDeadline = alert.firedAt.getTime() + ACK_WINDOW_DAYS * 86_400_000;
      const acked = entityFollowups.some(
        (d) => d.getTime() > alert.firedAt.getTime() && d.getTime() <= ackDeadline,
      );
      if (acked) s.acked++;
    }
  }

  // ── Build response ─────────────────────────────────────────
  const rules: AutomationEffectivenessRow[] = [];
  for (const [ruleId, s] of ruleStats) {
    rules.push({
      ruleId,
      ruleName: ruleNameMap.get(ruleId) ?? `Unknown Rule (${ruleId.slice(0, 8)})`,
      alertsFired: s.fired,
      alertsAcknowledged: s.acked,
      ackRatePct: pct(s.acked, s.fired),
      isNoop: s.fired > 0 && s.acked === 0,
    });
  }
  rules.sort((a, b) => b.alertsFired - a.alertsFired);

  return { rules, sinceDays };
}
