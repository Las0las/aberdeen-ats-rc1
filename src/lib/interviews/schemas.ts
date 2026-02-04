import { z } from "zod";
import { InterviewStateValues } from "@/contracts/db/enums";

// ── GET /api/interviews ────────────────────────────────────────────

export const interviewsListParamsSchema = z.object({
  status: z.enum(InterviewStateValues).optional(),
  search: z.string().max(200).optional(),
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(25),
});
export type InterviewsListParams = z.infer<typeof interviewsListParamsSchema>;

// ── GET /api/interviews/[id] ───────────────────────────────────────

export const interviewIdSchema = z.object({
  id: z.string().uuid(),
});
