import { z } from "zod";

export const clientsListParamsSchema = z.object({
  status: z.string().max(50).optional(),
  search: z.string().max(200).optional(),
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(25),
});
export type ClientsListParams = z.infer<typeof clientsListParamsSchema>;

export const clientIdSchema = z.object({
  id: z.string().uuid(),
});
