import { z } from "zod";
import { ApplicationStageValues } from "@/contracts/db/enums";

/** GET /api/candidates query params */
export const candidateListParamsSchema = z.object({
  stage: z.enum(ApplicationStageValues).optional(),
  search: z.string().max(200).optional(),
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(25),
});
export type CandidateListParams = z.infer<typeof candidateListParamsSchema>;
