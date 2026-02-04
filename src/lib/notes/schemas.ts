import { z } from "zod";

/**
 * Entity types that the notes/activity system recognises.
 * Derived from real table names used in `activities.entity_type`
 * and `attachments.entity_type` across the contract schema.
 * NOT an invented enum — these are the entities the platform operates on.
 */
export const ENTITY_TYPES = [
  "candidate",
  "job",
  "submittal",
  "bench_entry",
  "application",
  "interview",
  "offer",
  "placement",
  "assignment",
  "client",
  "company",
  "contact",
] as const;

export type EntityType = (typeof ENTITY_TYPES)[number];

/**
 * The `notes` table is structurally keyed to `candidate_id` (NOT NULL).
 * Only candidates can have notes in the current schema.
 * This constant makes the constraint explicit for runtime checks.
 */
export const NOTES_SUPPORTED_ENTITIES = ["candidate"] as const;
export type NotesSupportedEntity = (typeof NOTES_SUPPORTED_ENTITIES)[number];

// ── GET /api/notes ────────────────────────────────────────────────

export const notesListParamsSchema = z.object({
  entity_type: z.enum(ENTITY_TYPES),
  entity_id: z.string().uuid(),
  include_internal: z.coerce.boolean().default(false),
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(50),
});
export type NotesListParams = z.infer<typeof notesListParamsSchema>;

// ── POST /api/notes ───────────────────────────────────────────────

export const createNoteBodySchema = z.object({
  entity_type: z.enum(NOTES_SUPPORTED_ENTITIES, {
    errorMap: () => ({
      message: "Notes are only supported for candidates in the current schema",
    }),
  }),
  entity_id: z.string().uuid(),
  content: z.string().min(1).max(10_000),
  title: z.string().max(500).optional(),
  note_type: z.string().max(100).optional(),
  is_internal: z.boolean().default(false),
});
export type CreateNoteBody = z.infer<typeof createNoteBodySchema>;

// ── GET /api/activity ─────────────────────────────────────────────

export const activityListParamsSchema = z.object({
  entity_type: z.enum(ENTITY_TYPES),
  entity_id: z.string().uuid(),
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(200).default(50),
});
export type ActivityListParams = z.infer<typeof activityListParamsSchema>;
