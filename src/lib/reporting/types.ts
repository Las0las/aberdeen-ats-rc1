import { z } from "zod";

// ── Constants ────────────────────────────────────────────────────

export const STUCK_THRESHOLD_DAYS = 30;
export const ROW_CAP = 5_000;
export const ACK_WINDOW_DAYS = 7;
export const WOW_FLAT_BAND = 5; // ±5%
export const DIMENSION_LIMIT = 50;
export const TERMINAL_STAGES = new Set(["HIRED", "REJECTED", "WITHDRAWN"]);

// ── Input Validators ─────────────────────────────────────────────

export const sinceDaysSchema = z.object({
  sinceDays: z.coerce.number().int().min(1).max(365).optional().default(90),
});
export type SinceDaysInput = z.infer<typeof sinceDaysSchema>;

export const dimensionParamSchema = z.object({
  sinceDays: z.coerce.number().int().min(1).max(365).optional().default(30),
  dimension: z.enum(["recruiter", "job", "stage"]),
});
export type DimensionInput = z.infer<typeof dimensionParamSchema>;

// ── RBAC ─────────────────────────────────────────────────────────

export const REPORTING_ROLES = new Set(["admin", "recruiter"]);

// ── Module 1: Pipeline Intelligence ──────────────────────────────

export interface StageTimingRow {
  stage: string;
  transitions: number;
  avgDays: number;
  p50Days: number;
  p90Days: number;
}

export interface StageConversionRow {
  fromStage: string;
  toStage: string;
  entered: number;
  advanced: number;
  ratePct: number;
}

export interface AgingBucketRow {
  stage: string;
  d0_7: number;
  d8_14: number;
  d15_30: number;
  d30plus: number;
}

export interface StuckApplicationRow {
  applicationId: string;
  currentStage: string;
  daysSinceLastChange: number;
  jobId: string | null;
  assignedTo: string | null;
}

export interface PipelineIntelligenceResponse {
  timing: StageTimingRow[];
  conversions: StageConversionRow[];
  aging: AgingBucketRow[];
  stuck: StuckApplicationRow[];
  sinceDays: number;
}

// ── Module 2: Velocity & Trends ──────────────────────────────────

export interface RollingMetricRow {
  metric: string;
  count7d: number;
  count30d: number;
  count90d: number;
}

export type Direction = "up" | "down" | "flat";

export interface WowDeltaRow {
  metric: string;
  currentWeek: number;
  previousWeek: number;
  deltaPct: number | null;
  direction: Direction;
}

export interface VelocityResponse {
  rolling: RollingMetricRow[];
  wow: WowDeltaRow[];
}

// ── Module 3: Dimensional Breakdowns ─────────────────────────────

export interface StageCount {
  stage: string;
  count: number;
}

export interface DimensionRow {
  dimensionId: string | null;
  label: string;
  total: number;
  pctOfTotal: number;
  byStage: StageCount[];
}

export interface DimensionResponse {
  dimension: string;
  rows: DimensionRow[];
  sinceDays: number;
}

// ── Module 4: Automation Effectiveness ───────────────────────────

export interface AutomationEffectivenessRow {
  ruleId: string;
  ruleName: string;
  alertsFired: number;
  alertsAcknowledged: number;
  ackRatePct: number;
  isNoop: boolean;
}

export interface AutomationEffectivenessResponse {
  rules: AutomationEffectivenessRow[];
  sinceDays: number;
}
