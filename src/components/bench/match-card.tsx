"use client";

import { ScoreBadge } from "@/components/ui/badge";
import { JsonViewer } from "@/components/bench/json-viewer";
import { useState } from "react";

interface JobInfo {
  id: string;
  title: string;
  department: string | null;
  location: string | null;
  employment_type: string | null;
  status: string | null;
}

interface MatchResult {
  job_id: string;
  score: number;
  explainability: Record<string, unknown>;
}

interface Props {
  match: MatchResult;
  job: JobInfo | null;
  benchId: string;
  userId: string;
}

export function MatchCard({ match, job, benchId, userId }: Props) {
  const [loading, setLoading] = useState(false);
  const [draftResult, setDraftResult] = useState<unknown>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleGenerateDraft() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/bench/${benchId}/submission-draft`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          job_id: match.job_id,
          submitted_by: userId,
          state: "draft",
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Failed");
      setDraftResult(data.result);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="rounded-lg border bg-white p-4 space-y-3">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <p className="font-medium text-gray-900 truncate">
            {job?.title ?? match.job_id}
          </p>
          <p className="text-xs text-gray-500">
            {[job?.department, job?.location, job?.employment_type]
              .filter(Boolean)
              .join(" · ") || "—"}
          </p>
        </div>
        <ScoreBadge score={match.score} />
      </div>

      <JsonViewer data={match.explainability} label="Explainability" />

      {draftResult ? (
        <JsonViewer data={draftResult} label="Draft Result" defaultOpen />
      ) : (
        <button
          type="button"
          onClick={handleGenerateDraft}
          disabled={loading}
          className="rounded bg-blue-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "Generating…" : "Generate Draft"}
        </button>
      )}

      {error && <p className="text-xs text-red-600">{error}</p>}
    </div>
  );
}
