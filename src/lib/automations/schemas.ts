import { z } from "zod";

/* ─── Enums ────────────────────────────────────────────── */

export const RuleSeverity = ["info", "warning", "critical"] as const;
export type RuleSeverity = (typeof RuleSeverity)[number];

export const RuleEntityType = [
  "application",
  "bench_entry",
  "submittal",
  "interview",
  "offer",
] as const;
export type RuleEntityType = (typeof RuleEntityType)[number];

export const RuleCondition = [
  "stale_stage",
  "bench_aging",
  "no_followup_after_submittal",
  "interview_no_feedback",
  "offer_no_response",
] as const;
export type RuleCondition = (typeof RuleCondition)[number];

/* ─── Rule definition (in-code template shape) ─────────── */

export interface RuleTemplate {
  id: string;
  name: string;
  description: string;
  severity: RuleSeverity;
  entityType: RuleEntityType;
  condition: RuleCondition;
  defaultWindowDays: number;
}

/* ─── DB-backed rule (from automation_rules table) ─────── */

export interface AutomationRule {
  id: string;
  organizationId: string;
  name: string;
  description: string | null;
  triggerType: string | null;       // maps to RuleCondition
  triggerConfig: {
    windowDays?: number;
    severity?: RuleSeverity;
    entityType?: RuleEntityType;
  } | null;
  actionType: string | null;       // "alert" for v1
  actionConfig: Record<string, unknown> | null;
  status: string | null;           // "active" | "disabled"
  createdAt: string | null;
  updatedAt: string | null;
  createdBy: string | null;
}

/* ─── Alert (evaluation output) ────────────────────────── */

export interface Alert {
  ruleId: string;
  ruleName: string;
  severity: RuleSeverity;
  entityType: RuleEntityType;
  entityId: string;
  entityLabel: string;
  message: string;
  ageDays: number;
  detectedAt: string;
}

export interface EvaluationResult {
  ruleId: string;
  ruleName: string;
  condition: string;
  alerts: Alert[];
  totalMatched: number;
  rowsScanned: number;
  durationMs: number;
}

export interface RunResult {
  ranAt: string;
  rulesEvaluated: number;
  totalAlerts: number;
  alertsWritten: number;
  results: EvaluationResult[];
}

/* ─── Zod schemas ──────────────────────────────────────── */

export const rulesListParamsSchema = z.object({
  status: z.enum(["active", "disabled", "all"]).optional().default("all"),
});

export const rulePreviewBodySchema = z.object({
  windowDays: z.coerce.number().int().min(1).max(365).optional().default(30),
  write: z.boolean().optional().default(false),
});

export const runBodySchema = z.object({
  windowDays: z.coerce.number().int().min(1).max(365).optional().default(30),
  write: z.boolean().optional().default(false),
});

export const createRuleBodySchema = z.object({
  name: z.string().min(1).max(200),
  description: z.string().max(1000).optional().default(""),
  triggerType: z.enum(RuleCondition),
  severity: z.enum(RuleSeverity).optional().default("warning"),
  entityType: z.enum(RuleEntityType),
  windowDays: z.coerce.number().int().min(1).max(365).optional().default(30),
  actionType: z.string().optional().default("alert"),
});

export const toggleRuleBodySchema = z.object({
  enabled: z.boolean(),
});
