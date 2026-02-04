import { z } from "zod";
import { OfferStateValues } from "@/contracts/db/enums";

// ── GET /api/offers ────────────────────────────────────────────────

export const offersListParamsSchema = z.object({
  status: z.enum(OfferStateValues).optional(),
  search: z.string().max(200).optional(),
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(25),
});
export type OffersListParams = z.infer<typeof offersListParamsSchema>;

// ── GET /api/offers/[id] ───────────────────────────────────────────

export const offerIdSchema = z.object({
  id: z.string().uuid(),
});
