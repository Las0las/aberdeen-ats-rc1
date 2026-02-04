import { z } from "zod";
import { ApplicationStageValues } from "@/contracts/db/enums";

export const pipelineParamsSchema = z.object({
  search: z.string().max(200).optional(),
  sinceDays: z.coerce.number().int().min(1).max(365).default(30),
  limitPerStage: z.coerce.number().int().min(1).max(100).default(25),
});
export type PipelineParams = z.infer<typeof pipelineParamsSchema>;

/** Lean card shape — no jsonb, no comp, no PII beyond email */
export interface PipelineCard {
  id: string;
  stage: string | null;
  status: string | null;
  updated_at: string;
  candidate_id: string | null;
  candidate_email: string | null;
  candidate_first_name: string | null;
  candidate_last_name: string | null;
  job_id: string | null;
  job_title: string | null;
}

export interface PipelineStage {
  stage: string;
  count: number;
  items: PipelineCard[];
}

export interface PipelineResponse {
  stages: PipelineStage[];
  totals: { all: number };
  meta: { sinceDays: number; limitPerStage: number };
}

/** Ordered stages — canonical pipeline order */
export const PIPELINE_STAGES = [...ApplicationStageValues] as string[];
