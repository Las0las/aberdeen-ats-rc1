import { z } from "zod";
import { AssignmentStateValues } from "@/contracts/db/enums";

export const assignmentsListParamsSchema = z.object({
  state: z.enum(AssignmentStateValues).optional(),
  candidate_id: z.string().uuid().optional(),
  job_id: z.string().uuid().optional(),
  search: z.string().max(200).optional(),
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(25),
});
export type AssignmentsListParams = z.infer<typeof assignmentsListParamsSchema>;

export const assignmentIdSchema = z.object({
  id: z.string().uuid(),
});
