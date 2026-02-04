import { z } from "zod";
import { StartStateValues } from "@/contracts/db/enums";

/**
 * Contract note: `placements.status` is freeform string (no dedicated enum).
 * `starts.status` uses StartState enum (PLANNED, CONFIRMED, STARTED, DELAYED, CANCELLED).
 * We accept both for filtering.
 */

// ── GET /api/placements ────────────────────────────────────────────

export const placementsListParamsSchema = z.object({
  status: z.string().max(50).optional(),
  search: z.string().max(200).optional(),
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(25),
});
export type PlacementsListParams = z.infer<typeof placementsListParamsSchema>;

// ── GET /api/placements/[id] ───────────────────────────────────────

export const placementIdSchema = z.object({
  id: z.string().uuid(),
});

// ── GET /api/placements/[id]/starts ────────────────────────────────

export const startsListParamsSchema = z.object({
  status: z.enum(StartStateValues).optional(),
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(50),
});
export type StartsListParams = z.infer<typeof startsListParamsSchema>;
