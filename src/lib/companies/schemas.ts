import { z } from "zod";

export const companiesListParamsSchema = z.object({
  status: z.string().max(50).optional(),
  search: z.string().max(200).optional(),
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(25),
});
export type CompaniesListParams = z.infer<typeof companiesListParamsSchema>;

export const companyIdSchema = z.object({
  id: z.string().uuid(),
});
