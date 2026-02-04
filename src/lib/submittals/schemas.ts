import { z } from "zod";
import { SubmittalStateValues } from "@/contracts/db/enums";

/** GET /api/submittals query params */
export const submittalListParamsSchema = z.object({
  state: z.enum(SubmittalStateValues).optional(),
  search: z.string().max(200).optional(),
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(25),
});
export type SubmittalListParams = z.infer<typeof submittalListParamsSchema>;
