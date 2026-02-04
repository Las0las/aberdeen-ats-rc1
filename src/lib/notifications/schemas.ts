import { z } from "zod";
import { ENTITY_TYPES } from "@/lib/notes/schemas";

export const notificationListParamsSchema = z.object({
  entity_type: z.enum(ENTITY_TYPES).optional(),
  entity_id: z.string().uuid().optional(),
  category: z.string().max(100).optional(),
  since: z.coerce.date().optional(),
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(200).default(50),
});
export type NotificationListParams = z.infer<typeof notificationListParamsSchema>;

/** Lean shape returned from the notifications API (no jsonb, no PII). */
export interface NotificationItem {
  id: string;
  entity_type: string;
  entity_id: string;
  action_type: string;
  action_category: string | null;
  description: string | null;
  actor_name: string | null;
  source: string | null;
  created_at: string;
}

export interface NotificationListResponse {
  items: NotificationItem[];
  total: number;
  page: number;
  limit: number;
}
