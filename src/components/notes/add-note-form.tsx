"use client";

import { useState, useCallback } from "react";
import type { EntityType, NotesSupportedEntity } from "@/lib/notes/schemas";
import { NOTES_SUPPORTED_ENTITIES } from "@/lib/notes/schemas";

interface AddNoteFormProps {
  entityType: EntityType;
  entityId: string;
  onCreated: () => void;
}

function isNotesSupported(t: string): t is NotesSupportedEntity {
  return (NOTES_SUPPORTED_ENTITIES as readonly string[]).includes(t);
}

export function AddNoteForm({
  entityType,
  entityId,
  onCreated,
}: AddNoteFormProps) {
  const [content, setContent] = useState("");
  const [isInternal, setIsInternal] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const supported = isNotesSupported(entityType);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (!content.trim() || !supported) return;

      setSubmitting(true);
      setError(null);

      try {
        const res = await fetch("/api/notes", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            entity_type: entityType,
            entity_id: entityId,
            content: content.trim(),
            is_internal: isInternal,
          }),
        });

        if (!res.ok) {
          const body = await res.json().catch(() => ({}));
          throw new Error(
            (body as { error?: string }).error ?? `Failed (${res.status})`,
          );
        }

        setContent("");
        setIsInternal(false);
        onCreated();
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : "Failed to save note");
      } finally {
        setSubmitting(false);
      }
    },
    [content, isInternal, entityType, entityId, supported, onCreated],
  );

  if (!supported) {
    return (
      <p className="text-xs text-gray-400 italic">
        Notes are only available for candidates in the current schema.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Add a note…"
        rows={3}
        maxLength={10_000}
        className="w-full rounded border px-3 py-2 text-sm text-gray-800 placeholder-gray-400 focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-400"
        disabled={submitting}
      />
      <div className="flex items-center justify-between">
        <label className="flex items-center gap-1.5 text-xs text-gray-500">
          <input
            type="checkbox"
            checked={isInternal}
            onChange={(e) => setIsInternal(e.target.checked)}
            disabled={submitting}
            className="rounded border-gray-300"
          />
          Internal only
        </label>
        <button
          type="submit"
          disabled={submitting || !content.trim()}
          className="rounded bg-gray-900 px-3 py-1.5 text-xs font-medium text-white hover:bg-gray-800 disabled:opacity-40"
        >
          {submitting ? "Saving…" : "Add Note"}
        </button>
      </div>
      {error && (
        <p className="text-xs text-red-600">{error}</p>
      )}
    </form>
  );
}
