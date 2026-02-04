import type { SupabaseClient } from "@supabase/supabase-js";
import type { NotesRow } from "@/contracts/db/tables";

// Safe fields — no template internals
const NOTES_FIELDS = [
  "id",
  "workspace_id",
  "candidate_id",
  "application_id",
  "title",
  "content",
  "note_type",
  "is_internal",
  "created_by",
  "created_at",
  "updated_at",
  "organization_id",
].join(",");

async function resolveOrgId(supabase: SupabaseClient): Promise<string> {
  const { data, error } = await supabase.rpc("current_org_id");
  if (error || !data) throw new Error("Unable to resolve organization");
  return data as string;
}

/**
 * Resolve the default workspace_id for the org.
 * Notes require workspace_id (NOT NULL). We pick the first workspace
 * belonging to the org. This is safe for single-workspace orgs
 * and defensible for multi-workspace (picks default).
 */
async function resolveWorkspaceId(
  supabase: SupabaseClient,
  orgId: string,
): Promise<string> {
  const { data, error } = await supabase
    .from("workspaces")
    .select("id")
    .eq("organization_id", orgId)
    .order("created_at", { ascending: true })
    .limit(1)
    .single();

  if (error || !data) throw new Error("No workspace found for organization");
  return (data as { id: string }).id;
}

// ── List ───────────────────────────────────────────────────────────

export async function listNotes(
  supabase: SupabaseClient,
  opts: {
    candidateId: string;
    includeInternal: boolean;
    page: number;
    limit: number;
  },
) {
  const orgId = await resolveOrgId(supabase);
  const from = (opts.page - 1) * opts.limit;
  const to = from + opts.limit - 1;

  let query = supabase
    .from("notes")
    .select(NOTES_FIELDS, { count: "exact" })
    .eq("organization_id", orgId)
    .eq("candidate_id", opts.candidateId)
    .order("created_at", { ascending: false })
    .range(from, to);

  if (!opts.includeInternal) {
    query = query.or("is_internal.is.null,is_internal.eq.false");
  }

  const { data, error, count } = await query;
  if (error) throw error;

  return { notes: (data ?? []) as unknown as NotesRow[], total: count ?? 0 };
}

// ── Create ─────────────────────────────────────────────────────────

export interface CreateNoteInput {
  candidateId: string;
  content: string;
  title?: string;
  noteType?: string;
  isInternal: boolean;
  userId: string;
}

export async function createNote(
  supabase: SupabaseClient,
  input: CreateNoteInput,
): Promise<NotesRow> {
  const orgId = await resolveOrgId(supabase);
  const workspaceId = await resolveWorkspaceId(supabase, orgId);

  const { data, error } = await supabase
    .from("notes")
    .insert({
      workspace_id: workspaceId,
      candidate_id: input.candidateId,
      content: input.content,
      title: input.title ?? null,
      note_type: input.noteType ?? null,
      is_internal: input.isInternal,
      created_by: input.userId,
      organization_id: orgId,
    })
    .select(NOTES_FIELDS)
    .single();

  if (error) throw error;
  return data as unknown as NotesRow;
}
