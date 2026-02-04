import { z } from "zod";
import { ApplicationStageValues } from "@/contracts/db/enums";

export const applicationsListParamsSchema = z.object({
  stage: z.enum(ApplicationStageValues).optional(),
  status: z.string().max(50).optional(),
  candidate_id: z.string().uuid().optional(),
  job_id: z.string().uuid().optional(),
  search: z.string().max(200).optional(),
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(25),
});
export type ApplicationsListParams = z.infer<typeof applicationsListParamsSchema>;

export const applicationIdSchema = z.object({
  id: z.string().uuid(),
});
