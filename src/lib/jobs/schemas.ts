import { z } from "zod";
import { JobStatusValues } from "@/contracts/db/enums";

/** GET /api/jobs query params */
export const jobListParamsSchema = z.object({
  status: z.enum(JobStatusValues).optional(),
  search: z.string().max(200).optional(),
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(25),
});
export type JobListParams = z.infer<typeof jobListParamsSchema>;
