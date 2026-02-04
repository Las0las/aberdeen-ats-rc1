import type { SupabaseClient } from "@supabase/supabase-js";
import type { AutomationRule } from "./schemas";

/* ─── Org resolver ─────────────────────────────────────── */

async function resolveOrgId(supabase: SupabaseClient): Promise<string> {
  const { data, error } = await supabase.rpc("current_org_id");
  if (error || !data) throw new Error("Cannot resolve organization");
  return data as string;
}

/* ─── Row → domain mapper ──────────────────────────────── */

function mapRow(r: Record<string, unknown>): AutomationRule {
  return {
    id: r.id as string,
    organizationId: r.organization_id as string,
    name: r.name as string,
    description: (r.description as string) ?? null,
    triggerType: (r.trigger_type as string) ?? null,
    triggerConfig: (r.trigger_config as AutomationRule["triggerConfig"]) ?? null,
    actionType: (r.action_type as string) ?? null,
    actionConfig: (r.action_config as Record<string, unknown>) ?? null,
    status: (r.status as string) ?? null,
    createdAt: (r.created_at as string) ?? null,
    updatedAt: (r.updated_at as string) ?? null,
    createdBy: (r.created_by as string) ?? null,
  };
}

/* ─── List rules ───────────────────────────────────────── */

export async function listRules(
  supabase: SupabaseClient,
  statusFilter: "active" | "disabled" | "all" = "all",
): Promise<AutomationRule[]> {
  const orgId = await resolveOrgId(supabase);

  let query = supabase
    .from("automation_rules")
    .select(
      "id, organization_id, name, description, trigger_type, trigger_config, action_type, action_config, status, created_at, updated_at, created_by",
    )
    .eq("organization_id", orgId)
    .order("created_at", { ascending: false })
    .limit(200);

  if (statusFilter !== "all") {
    query = query.eq("status", statusFilter);
  }

  const { data, error } = await query;
  if (error) throw error;
  return (data ?? []).map(mapRow);
}

/* ─── Get single rule ──────────────────────────────────── */

export async function getRule(
  supabase: SupabaseClient,
  ruleId: string,
): Promise<AutomationRule | null> {
  const orgId = await resolveOrgId(supabase);

  const { data, error } = await supabase
    .from("automation_rules")
    .select(
      "id, organization_id, name, description, trigger_type, trigger_config, action_type, action_config, status, created_at, updated_at, created_by",
    )
    .eq("id", ruleId)
    .eq("organization_id", orgId)
    .maybeSingle();

  if (error) throw error;
  return data ? mapRow(data) : null;
}

/* ─── Create rule via RPC ──────────────────────────────── */

export async function createRule(
  supabase: SupabaseClient,
  input: {
    name: string;
    description: string;
    triggerType: string;
    severity: string;
    entityType: string;
    windowDays: number;
    actionType: string;
  },
): Promise<AutomationRule> {
  const orgId = await resolveOrgId(supabase);
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data, error } = await supabase.rpc("automation_rules_create", {
    input: {
      organization_id: orgId,
      name: input.name,
      description: input.description,
      trigger_type: input.triggerType,
      trigger_config: {
        windowDays: input.windowDays,
        severity: input.severity,
        entityType: input.entityType,
      },
      action_type: input.actionType,
      action_config: {},
      status: "active",
      created_by: user?.id ?? null,
    },
  });

  if (error) throw error;
  // RPC may return the row or an id — handle defensively
  if (data && typeof data === "object" && "id" in (data as Record<string, unknown>)) {
    return mapRow(data as Record<string, unknown>);
  }
  // Fallback: re-fetch latest rule by name
  const rules = await listRules(supabase, "all");
  const found = rules.find((r) => r.name === input.name);
  if (!found) throw new Error("Rule created but could not be retrieved");
  return found;
}

/* ─── Toggle rule via RPC ──────────────────────────────── */

export async function toggleRule(
  supabase: SupabaseClient,
  ruleId: string,
  enabled: boolean,
): Promise<void> {
  // Verify ownership first
  await getRule(supabase, ruleId);

  const { error } = await supabase.rpc("automation_rules_toggle", {
    rule_id: ruleId,
    enabled,
  });
  if (error) throw error;
}

/* ─── Data fetchers for evaluation (bounded) ───────────── */

const ROW_CAP = 5000;

export async function fetchStaleApplications(
  supabase: SupabaseClient,
  orgId: string,
  windowDays: number,
) {
  const cutoff = new Date();
  cutoff.setDate(cutoff.getDate() - windowDays);

  const { data, error } = await supabase
    .from("applications")
    .select("id, candidate_id, job_id, current_stage, applied_date, date_applied, created_at")
    .eq("organization_id", orgId)
    .limit(ROW_CAP);

  if (error) throw error;

  // Filter in-code: rows where the effective applied date is older than window
  return (data ?? []).filter((r) => {
    const dateStr = r.applied_date ?? r.date_applied ?? r.created_at;
    if (!dateStr) return false;
    return new Date(dateStr) < cutoff;
  });
}

export async function fetchAgingBench(
  supabase: SupabaseClient,
  orgId: string,
  windowDays: number,
) {
  const cutoff = new Date();
  cutoff.setDate(cutoff.getDate() - windowDays);

  const { data, error } = await supabase
    .from("bench_entries")
    .select("id, candidate_id, state, bench_started_at, bench_ended_at")
    .eq("organization_id", orgId)
    .is("bench_ended_at", null)
    .limit(ROW_CAP);

  if (error) throw error;

  return (data ?? []).filter((r) => {
    if (!r.bench_started_at) return false;
    return new Date(r.bench_started_at) < cutoff;
  });
}

export async function fetchSubmittalsWithoutFollowup(
  supabase: SupabaseClient,
  orgId: string,
  windowDays: number,
) {
  const cutoff = new Date();
  cutoff.setDate(cutoff.getDate() - windowDays);

  // Fetch submittals older than window
  const { data: subs, error: se } = await supabase
    .from("submittals")
    .select("id, candidate_id, job_id, state, created_at")
    .eq("organization_id", orgId)
    .limit(ROW_CAP);
  if (se) throw se;

  const eligible = (subs ?? []).filter(
    (s) => s.created_at && new Date(s.created_at) < cutoff,
  );
  if (eligible.length === 0) return [];

  // Fetch interviews for same org to check for follow-up
  const { data: interviews, error: ie } = await supabase
    .from("interviews")
    .select("candidate_id, job_id")
    .eq("organization_id", orgId)
    .limit(ROW_CAP);
  if (ie) throw ie;

  const interviewSet = new Set(
    (interviews ?? []).map((i) => `${i.candidate_id}:${i.job_id}`),
  );

  return eligible.filter(
    (s) => !interviewSet.has(`${s.candidate_id}:${s.job_id}`),
  );
}

export async function fetchInterviewsWithoutFeedback(
  supabase: SupabaseClient,
  orgId: string,
  windowDays: number,
) {
  const cutoff = new Date();
  cutoff.setDate(cutoff.getDate() - windowDays);

  const { data: interviews, error: ie } = await supabase
    .from("interviews")
    .select("id, candidate_id, job_id, status, scheduled_start_at, created_at")
    .eq("organization_id", orgId)
    .limit(ROW_CAP);
  if (ie) throw ie;

  // Only interviews that happened (scheduled_start_at in the past) and older than window
  const now = new Date();
  const eligible = (interviews ?? []).filter((i) => {
    const schedDate = i.scheduled_start_at ?? i.created_at;
    if (!schedDate) return false;
    const d = new Date(schedDate);
    return d < cutoff && d < now;
  });

  if (eligible.length === 0) return [];

  // Check for feedback
  const interviewIds = eligible.map((i) => i.id);
  const { data: feedback, error: fe } = await supabase
    .from("interview_feedback")
    .select("interview_id")
    .eq("organization_id", orgId)
    .in("interview_id", interviewIds.slice(0, ROW_CAP));
  if (fe) throw fe;

  const fbSet = new Set((feedback ?? []).map((f) => f.interview_id));
  return eligible.filter((i) => !fbSet.has(i.id));
}

export async function fetchOffersWithoutResponse(
  supabase: SupabaseClient,
  orgId: string,
  windowDays: number,
) {
  const cutoff = new Date();
  cutoff.setDate(cutoff.getDate() - windowDays);

  const { data, error } = await supabase
    .from("offers")
    .select("id, submission_id, status, sent_at, accepted_at, created_at")
    .eq("organization_id", orgId)
    .is("accepted_at", null)
    .limit(ROW_CAP);
  if (error) throw error;

  return (data ?? []).filter((o) => {
    const sentDate = o.sent_at ?? o.created_at;
    if (!sentDate) return false;
    // Only offers that have a sent_at and are awaiting response
    if (!o.sent_at) return false;
    return new Date(sentDate) < cutoff;
  });
}

/* ─── Write alert to activities table ──────────────────── */

export async function writeAlert(
  supabase: SupabaseClient,
  orgId: string,
  alert: {
    entityType: string;
    entityId: string;
    message: string;
    ruleId: string;
    severity: string;
  },
): Promise<boolean> {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { error } = await supabase.from("activities").insert({
    entity_type: alert.entityType,
    entity_id: alert.entityId,
    action_type: `automation_${alert.severity}`,
    action_category: "automation",
    description: alert.message,
    actor_id: user?.id ?? null,
    actor_type: "system",
    actor_name: "Automation Engine",
    organization_id: orgId,
    source: `rule:${alert.ruleId}`,
  });

  if (error) {
    console.error("[automations] write alert failed:", error.message);
    return false;
  }
  return true;
}
