"use client";

import { useState, useEffect, useCallback } from "react";
import type { EntityType } from "@/lib/notes/schemas";
import { AddNoteForm } from "@/components/notes/add-note-form";

interface NoteItem {
  id: string;
  title: string | null;
  content: string;
  note_type: string | null;
  is_internal: boolean | null;
  created_by: string;
  created_at: string;
}

interface NotesResponse {
  notes: NoteItem[];
  total: number;
  _notice?: string;
}

interface NotesPanelProps {
  entityType: EntityType;
  entityId: string;
}

export function NotesPanel({ entityType, entityId }: NotesPanelProps) {
  const [data, setData] = useState<NotesResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchNotes = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams({
        entity_type: entityType,
        entity_id: entityId,
      });
      const res = await fetch(`/api/notes?${params}`);
      if (!res.ok) throw new Error(`Failed (${res.status})`);
      const json = (await res.json()) as NotesResponse;
      setData(json);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to load notes");
    } finally {
      setLoading(false);
    }
  }, [entityType, entityId]);

  useEffect(() => {
    fetchNotes();
  }, [fetchNotes]);

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-semibold text-gray-800">Notes</h3>

      {/* Add form */}
      <AddNoteForm
        entityType={entityType}
        entityId={entityId}
        onCreated={fetchNotes}
      />

      {/* List */}
      {loading ? (
        <p className="text-xs text-gray-400">Loading notes…</p>
      ) : error ? (
        <p className="text-xs text-red-600">{error}</p>
      ) : data && data._notice ? (
        <p className="text-xs text-gray-400 italic">{data._notice}</p>
      ) : data && data.notes.length === 0 ? (
        <p className="text-xs text-gray-400">No notes yet.</p>
      ) : (
        <ul className="space-y-3">
          {data?.notes.map((note) => (
            <li
              key={note.id}
              className="rounded border bg-white p-3 space-y-1"
            >
              <div className="flex items-center justify-between">
                {note.title && (
                  <span className="text-xs font-medium text-gray-700">
                    {note.title}
                  </span>
                )}
                <div className="ml-auto flex items-center gap-2">
                  {note.is_internal && (
                    <span className="rounded bg-amber-100 px-1.5 py-0.5 text-[10px] font-medium text-amber-700">
                      Internal
                    </span>
                  )}
                  {note.note_type && (
                    <span className="text-[10px] text-gray-400">
                      {note.note_type}
                    </span>
                  )}
                </div>
              </div>
              <p className="whitespace-pre-wrap text-sm text-gray-700 leading-relaxed">
                {note.content}
              </p>
              <p className="text-[10px] text-gray-400">
                {new Date(note.created_at).toLocaleString()}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
