import { z } from "zod";
import type { ApplicationStage, BenchState } from "@/contracts/db/enums";

// ── Query Params ─────────────────────────────────────────────────

export const reportsParamsSchema = z.object({
  sinceDays: z.coerce.number().int().min(1).max(365).optional().default(30),
});
export type ReportsParams = z.infer<typeof reportsParamsSchema>;

export const REPORT_TYPES = ["funnel", "pipeline", "bench", "activity"] as const;
export type ReportType = (typeof REPORT_TYPES)[number];

export const exportParamsSchema = z.object({
  sinceDays: z.coerce.number().int().min(1).max(365).optional().default(30),
  type: z.enum(REPORT_TYPES),
});
export type ExportParams = z.infer<typeof exportParamsSchema>;

// ── 1. Funnel Report ─────────────────────────────────────────────

export interface FunnelStep {
  label: string;
  count: number;
}

export interface FunnelConversion {
  from: string;
  to: string;
  rate: number; // 0-100 percentage
}

export interface FunnelReport {
  steps: FunnelStep[];
  conversions: FunnelConversion[];
  sinceDays: number;
}

// ── 2. Pipeline Report ───────────────────────────────────────────

export interface PipelineStageCount {
  stage: ApplicationStage;
  count: number;
}

/** Age buckets for applications in each stage (days since applied) */
export interface StageAgeBucket {
  stage: ApplicationStage;
  "0-7": number;
  "8-14": number;
  "15-30": number;
  "30+": number;
}

export interface PipelineReport {
  total: number;
  byStage: PipelineStageCount[];
  ageBuckets: StageAgeBucket[];
  sinceDays: number;
}

// ── 3. Bench Report ──────────────────────────────────────────────

export interface BenchStateCount {
  state: string;
  count: number;
}

export interface BenchReport {
  active: number;
  avgDaysOnBench: number;
  byState: BenchStateCount[];
}

// ── 4. Activity Report ───────────────────────────────────────────

export interface ActorActivity {
  actorName: string;
  total: number;
  byCategory: Record<string, number>;
}

export interface ActivityReport {
  topActors: ActorActivity[];
  totalActivities: number;
  sinceDays: number;
}

// ── Composite Response ───────────────────────────────────────────

export interface ReportsResponse {
  funnel: FunnelReport;
  pipeline: PipelineReport;
  bench: BenchReport;
  activity: ActivityReport;
}
