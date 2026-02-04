import type { SupabaseClient } from "@supabase/supabase-js";
import type {
  Alert,
  AutomationRule,
  EvaluationResult,
  RuleCondition,
  RuleEntityType,
  RuleSeverity,
  RunResult,
} from "./schemas";
import {
  fetchStaleApplications,
  fetchAgingBench,
  fetchSubmittalsWithoutFollowup,
  fetchInterviewsWithoutFeedback,
  fetchOffersWithoutResponse,
  writeAlert,
} from "./queries";

/* ─── Helpers ──────────────────────────────────────────── */

function daysSince(dateStr: string): number {
  const ms = Date.now() - new Date(dateStr).getTime();
  return Math.floor(ms / 86_400_000);
}

function extractConfig(rule: AutomationRule) {
  const cfg = rule.triggerConfig ?? {};
  const windowDays = cfg.windowDays ?? 30;
  const severity: RuleSeverity = (cfg.severity as RuleSeverity) ?? "warning";
  const entityType: RuleEntityType =
    (cfg.entityType as RuleEntityType) ?? "application";
  return { windowDays, severity, entityType };
}

/* ─── Per-condition evaluators ─────────────────────────── */

async function evalStaleStage(
  supabase: SupabaseClient,
  orgId: string,
  rule: AutomationRule,
  windowDays: number,
): Promise<{ alerts: Alert[]; rowsScanned: number }> {
  const severity = extractConfig(rule).severity;
  const rows = await fetchStaleApplications(supabase, orgId, windowDays);

  const alerts: Alert[] = rows.map((r) => {
    const dateStr = r.applied_date ?? r.date_applied ?? r.created_at;
    const age = daysSince(dateStr);
    return {
      ruleId: rule.id,
      ruleName: rule.name,
      severity,
      entityType: "application",
      entityId: r.id,
      entityLabel: `Application ${r.id.slice(0, 8)}… (stage: ${r.current_stage})`,
      message: `Application stuck in "${r.current_stage}" for ${age} days (threshold: ${windowDays}d).`,
      ageDays: age,
      detectedAt: new Date().toISOString(),
    };
  });

  return { alerts, rowsScanned: rows.length };
}

async function evalBenchAging(
  supabase: SupabaseClient,
  orgId: string,
  rule: AutomationRule,
  windowDays: number,
): Promise<{ alerts: Alert[]; rowsScanned: number }> {
  const severity = extractConfig(rule).severity;
  const rows = await fetchAgingBench(supabase, orgId, windowDays);

  const alerts: Alert[] = rows.map((r) => {
    const age = daysSince(r.bench_started_at);
    return {
      ruleId: rule.id,
      ruleName: rule.name,
      severity,
      entityType: "bench_entry",
      entityId: r.id,
      entityLabel: `Bench ${r.id.slice(0, 8)}… (state: ${r.state})`,
      message: `Bench entry active for ${age} days without placement (threshold: ${windowDays}d).`,
      ageDays: age,
      detectedAt: new Date().toISOString(),
    };
  });

  return { alerts, rowsScanned: rows.length };
}

async function evalNoFollowupSubmittal(
  supabase: SupabaseClient,
  orgId: string,
  rule: AutomationRule,
  windowDays: number,
): Promise<{ alerts: Alert[]; rowsScanned: number }> {
  const severity = extractConfig(rule).severity;
  const rows = await fetchSubmittalsWithoutFollowup(supabase, orgId, windowDays);

  const alerts: Alert[] = rows.map((r) => {
    const age = daysSince(r.created_at);
    return {
      ruleId: rule.id,
      ruleName: rule.name,
      severity,
      entityType: "submittal",
      entityId: r.id,
      entityLabel: `Submittal ${r.id.slice(0, 8)}… (state: ${r.state})`,
      message: `Submittal created ${age} days ago with no interview scheduled (threshold: ${windowDays}d).`,
      ageDays: age,
      detectedAt: new Date().toISOString(),
    };
  });

  return { alerts, rowsScanned: rows.length };
}

async function evalInterviewNoFeedback(
  supabase: SupabaseClient,
  orgId: string,
  rule: AutomationRule,
  windowDays: number,
): Promise<{ alerts: Alert[]; rowsScanned: number }> {
  const severity = extractConfig(rule).severity;
  const rows = await fetchInterviewsWithoutFeedback(supabase, orgId, windowDays);

  const alerts: Alert[] = rows.map((r) => {
    const schedDate = r.scheduled_start_at ?? r.created_at;
    const age = schedDate ? daysSince(schedDate) : 0;
    return {
      ruleId: rule.id,
      ruleName: rule.name,
      severity,
      entityType: "interview",
      entityId: r.id,
      entityLabel: `Interview ${r.id.slice(0, 8)}… (status: ${r.status ?? "unknown"})`,
      message: `Interview occurred ${age} days ago with no feedback submitted (threshold: ${windowDays}d).`,
      ageDays: age,
      detectedAt: new Date().toISOString(),
    };
  });

  return { alerts, rowsScanned: rows.length };
}

async function evalOfferNoResponse(
  supabase: SupabaseClient,
  orgId: string,
  rule: AutomationRule,
  windowDays: number,
): Promise<{ alerts: Alert[]; rowsScanned: number }> {
  const severity = extractConfig(rule).severity;
  const rows = await fetchOffersWithoutResponse(supabase, orgId, windowDays);

  const alerts: Alert[] = rows.map((r) => {
    const sentDate = r.sent_at ?? r.created_at;
    const age = sentDate ? daysSince(sentDate) : 0;
    return {
      ruleId: rule.id,
      ruleName: rule.name,
      severity,
      entityType: "offer",
      entityId: r.id,
      entityLabel: `Offer ${r.id.slice(0, 8)}… (status: ${r.status ?? "pending"})`,
      message: `Offer sent ${age} days ago with no response (threshold: ${windowDays}d).`,
      ageDays: age,
      detectedAt: new Date().toISOString(),
    };
  });

  return { alerts, rowsScanned: rows.length };
}

/* ─── Dispatcher ───────────────────────────────────────── */

const EVALUATORS: Record<
  RuleCondition,
  (
    supabase: SupabaseClient,
    orgId: string,
    rule: AutomationRule,
    windowDays: number,
  ) => Promise<{ alerts: Alert[]; rowsScanned: number }>
> = {
  stale_stage: evalStaleStage,
  bench_aging: evalBenchAging,
  no_followup_after_submittal: evalNoFollowupSubmittal,
  interview_no_feedback: evalInterviewNoFeedback,
  offer_no_response: evalOfferNoResponse,
};

/* ─── Evaluate single rule ─────────────────────────────── */

export async function evaluateRule(
  supabase: SupabaseClient,
  orgId: string,
  rule: AutomationRule,
  windowDaysOverride?: number,
): Promise<EvaluationResult> {
  const condition = rule.triggerType as RuleCondition;
  const evaluator = EVALUATORS[condition];
  const cfg = extractConfig(rule);
  const windowDays = windowDaysOverride ?? cfg.windowDays;

  const start = Date.now();

  if (!evaluator) {
    return {
      ruleId: rule.id,
      ruleName: rule.name,
      condition: condition ?? "unknown",
      alerts: [],
      totalMatched: 0,
      rowsScanned: 0,
      durationMs: Date.now() - start,
    };
  }

  const { alerts, rowsScanned } = await evaluator(
    supabase,
    orgId,
    rule,
    windowDays,
  );

  // Cap response payload — preserve totalMatched for reporting
  const RESPONSE_CAP = 500;

  return {
    ruleId: rule.id,
    ruleName: rule.name,
    condition,
    alerts: alerts.slice(0, RESPONSE_CAP),
    totalMatched: alerts.length,
    rowsScanned,
    durationMs: Date.now() - start,
  };
}

/* ─── Evaluate all enabled rules + optional write ──────── */

export async function evaluateAllRules(
  supabase: SupabaseClient,
  rules: AutomationRule[],
  windowDays: number,
  writeAlerts: boolean,
): Promise<RunResult> {
  const { data, error } = await supabase.rpc("current_org_id");
  if (error || !data) throw new Error("Cannot resolve organization");
  const orgId = data as string;

  const enabledRules = rules.filter((r) => r.status === "active");

  const results: EvaluationResult[] = [];
  let totalAlerts = 0;
  let alertsWritten = 0;

  // Evaluate sequentially to avoid overwhelming DB
  for (const rule of enabledRules) {
    const result = await evaluateRule(supabase, orgId, rule, windowDays);
    results.push(result);
    totalAlerts += result.totalMatched;

    if (writeAlerts && result.totalMatched > 0) {
      // Write alerts (max 100 per rule to avoid flooding)
      const toWrite = result.alerts.slice(0, 100);
      for (const alert of toWrite) {
        const ok = await writeAlert(supabase, orgId, {
          entityType: alert.entityType,
          entityId: alert.entityId,
          message: alert.message,
          ruleId: alert.ruleId,
          severity: alert.severity,
        });
        if (ok) alertsWritten++;
      }
    }
  }

  return {
    ranAt: new Date().toISOString(),
    rulesEvaluated: enabledRules.length,
    totalAlerts,
    alertsWritten,
    results,
  };
}
