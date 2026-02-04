"use client";

import { useEffect, useState, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import { MatchCard } from "@/components/bench/match-card";
import Link from "next/link";

interface MatchResult {
  job_id: string;
  score: number;
  explainability: Record<string, unknown>;
}

interface JobInfo {
  id: string;
  title: string;
  department: string | null;
  location: string | null;
  employment_type: string | null;
  status: string | null;
}

export default function BenchMatchesPage() {
  const { id } = useParams<{ id: string }>();
  const [matches, setMatches] = useState<MatchResult[]>([]);
  const [jobs, setJobs] = useState<Record<string, JobInfo>>({});
  const [userId, setUserId] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [ran, setRan] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch current user id on mount for submission-draft calls
  useEffect(() => {
    fetch("/api/me")
      .then((r) => r.json())
      .then((d) => { if (d.id) setUserId(d.id); })
      .catch(() => null);
  }, []);

  const runMatch = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/bench/${id}/matches`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          limit: 10,
          include_explainability: true,
          write_cache: false,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Match failed");

      const matchList: MatchResult[] = data.matches ?? [];
      setMatches(matchList);
      setRan(true);

      // Hydrate job info for matched job_ids
      if (matchList.length > 0) {
        const jobIds = matchList.map((m) => m.job_id);
        // Fetch jobs via bench detail endpoint is not ideal; use a lightweight lookup
        // For v1, we store job info returned if the API enriches it, otherwise display IDs
        // We'll make individual fetches tolerable for ≤10 results
        const jobMap: Record<string, JobInfo> = {};
        // batch not available client-side without a dedicated endpoint; leave as IDs for v1
        setJobs(jobMap);
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  }, [id]);

  return (
    <div className="space-y-4">
      <div>
        <Link
          href={`/bench/${id}`}
          className="text-xs text-gray-400 hover:text-gray-600"
        >
          ← Back to entry
        </Link>
        <h1 className="mt-1 text-lg font-semibold text-gray-900">
          Job Matches
        </h1>
      </div>

      <button
        type="button"
        onClick={runMatch}
        disabled={loading}
        className="rounded bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? "Matching…" : ran ? "Re-run Match" : "Run Match"}
      </button>

      {error && (
        <div className="rounded border border-red-200 bg-red-50 p-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {ran && matches.length === 0 && !loading && (
        <p className="text-sm text-gray-500">
          No matching jobs found for this bench entry.
        </p>
      )}

      <div className="space-y-3">
        {matches.map((m) => (
          <MatchCard
            key={m.job_id}
            match={m}
            job={jobs[m.job_id] ?? null}
            benchId={id}
            userId={userId}
          />
        ))}
      </div>
    </div>
  );
}
