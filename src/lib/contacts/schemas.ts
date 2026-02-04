import { z } from "zod";

export const contactsListParamsSchema = z.object({
  status: z.string().max(50).optional(),
  client_id: z.string().uuid().optional(),
  search: z.string().max(200).optional(),
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(25),
});
export type ContactsListParams = z.infer<typeof contactsListParamsSchema>;

export const contactIdSchema = z.object({
  id: z.string().uuid(),
});
