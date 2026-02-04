import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { listNotes, createNote } from "@/lib/notes/queries";
import {
  notesListParamsSchema,
  createNoteBodySchema,
  NOTES_SUPPORTED_ENTITIES,
} from "@/lib/notes/schemas";

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const url = request.nextUrl;
    const parsed = notesListParamsSchema.safeParse({
      entity_type: url.searchParams.get("entity_type") ?? undefined,
      entity_id: url.searchParams.get("entity_id") ?? undefined,
      include_internal:
        url.searchParams.get("include_internal") ?? undefined,
      page: url.searchParams.get("page") ?? undefined,
      limit: url.searchParams.get("limit") ?? undefined,
    });

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid params", details: parsed.error.flatten() },
        { status: 400 },
      );
    }

    const { entity_type, entity_id, include_internal, page, limit } =
      parsed.data;

    // Notes table only supports candidates — return empty for other entities
    if (
      !(NOTES_SUPPORTED_ENTITIES as readonly string[]).includes(entity_type)
    ) {
      return NextResponse.json({
        notes: [],
        total: 0,
        _notice: `Notes are not supported for entity_type="${entity_type}" in the current schema`,
      });
    }

    const result = await listNotes(supabase, {
      candidateId: entity_id,
      includeInternal: include_internal,
      page,
      limit,
    });

    return NextResponse.json(result);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Internal error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await request.json();
    const parsed = createNoteBodySchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid body", details: parsed.error.flatten() },
        { status: 400 },
      );
    }

    const note = await createNote(supabase, {
      candidateId: parsed.data.entity_id,
      content: parsed.data.content,
      title: parsed.data.title,
      noteType: parsed.data.note_type,
      isInternal: parsed.data.is_internal,
      userId: user.id,
    });

    return NextResponse.json(note, { status: 201 });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Internal error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
