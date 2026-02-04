import { z } from "zod";
import { BenchStateValues } from "@/contracts/db/enums";

/** GET /api/bench query params */
export const benchListParamsSchema = z.object({
  state: z.enum(BenchStateValues).optional(),
  search: z.string().max(200).optional(),
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(25),
});
export type BenchListParams = z.infer<typeof benchListParamsSchema>;

/** POST /api/bench/[id]/matches body */
export const benchMatchBodySchema = z.object({
  limit: z.number().int().min(1).max(50).default(10),
  include_explainability: z.boolean().default(true),
  write_cache: z.boolean().default(false),
});
export type BenchMatchBody = z.infer<typeof benchMatchBodySchema>;

/** POST /api/bench/[id]/submission-draft body */
export const benchSubmissionDraftBodySchema = z.object({
  job_id: z.string().uuid(),
  submitted_by: z.string().uuid(),
  state: z.string().min(1).default("draft"),
});
export type BenchSubmissionDraftBody = z.infer<typeof benchSubmissionDraftBodySchema>;
