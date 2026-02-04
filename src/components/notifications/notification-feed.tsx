"use client";

import { useState, useEffect, useCallback } from "react";
import { NotificationRow } from "./notification-row";
import type {
  NotificationItem,
  NotificationListResponse,
} from "@/lib/notifications/schemas";
import { ENTITY_TYPES } from "@/lib/notes/schemas";

/* ── Time filter presets ── */
const TIME_FILTERS = [
  { label: "24h", hours: 24 },
  { label: "7d", hours: 168 },
  { label: "30d", hours: 720 },
  { label: "All", hours: 0 },
] as const;

const ENTITY_FILTER_OPTIONS = [
  { value: "", label: "All" },
  ...ENTITY_TYPES.map((t) => ({
    value: t,
    label: t.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
  })),
];

/* ── Day grouping ── */
function dayLabel(dateStr: string): string {
  const date = new Date(dateStr);
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const yesterday = new Date(today.getTime() - 86_400_000);
  const day = new Date(date.getFullYear(), date.getMonth(), date.getDate());

  if (day.getTime() === today.getTime()) return "Today";
  if (day.getTime() === yesterday.getTime()) return "Yesterday";
  return date.toLocaleDateString("en-US", {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function groupByDay(
  items: NotificationItem[],
): { day: string; entries: NotificationItem[] }[] {
  const map = new Map<string, NotificationItem[]>();
  for (const item of items) {
    const day = dayLabel(item.created_at);
    const bucket = map.get(day);
    if (bucket) bucket.push(item);
    else map.set(day, [item]);
  }
  return Array.from(map.entries()).map(([day, entries]) => ({ day, entries }));
}

export function NotificationFeed() {
  const [entityFilter, setEntityFilter] = useState("");
  const [timeFilter, setTimeFilter] = useState(0); // hours, 0 = all
  const [page, setPage] = useState(1);
  const [data, setData] = useState<NotificationListResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const limit = 50;

  const fetchFeed = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams({
        page: String(page),
        limit: String(limit),
      });
      if (entityFilter) params.set("entity_type", entityFilter);
      if (timeFilter > 0) {
        const since = new Date(Date.now() - timeFilter * 3_600_000);
        params.set("since", since.toISOString());
      }
      const res = await fetch(`/api/notifications?${params.toString()}`);
      if (!res.ok) throw new Error(`Request failed (${res.status})`);
      const json: NotificationListResponse = await res.json();
      setData(json);
    } catch (err: unknown) {
      setError(
        err instanceof Error ? err.message : "Failed to load notifications",
      );
    } finally {
      setLoading(false);
    }
  }, [entityFilter, timeFilter, page]);

  useEffect(() => {
    fetchFeed();
  }, [fetchFeed]);

  // Reset page when filters change
  useEffect(() => {
    setPage(1);
  }, [entityFilter, timeFilter]);

  const totalPages = data ? Math.ceil(data.total / limit) : 0;
  const groups = data ? groupByDay(data.items) : [];

  return (
    <div className="space-y-4">
      {/* ── Filters ── */}
      <div className="flex flex-wrap items-center gap-3">
        {/* Entity type pills */}
        <div className="flex flex-wrap gap-1.5">
          {ENTITY_FILTER_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              onClick={() => setEntityFilter(opt.value)}
              className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                entityFilter === opt.value
                  ? "bg-gray-900 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>

        {/* Time range pills */}
        <div className="flex gap-1.5 border-l pl-3">
          {TIME_FILTERS.map((tf) => (
            <button
              key={tf.label}
              onClick={() => setTimeFilter(tf.hours)}
              className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                timeFilter === tf.hours
                  ? "bg-gray-900 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {tf.label}
            </button>
          ))}
        </div>
      </div>

      {/* ── Loading ── */}
      {loading && (
        <p className="text-sm text-gray-400">Loading notifications…</p>
      )}

      {/* ── Error ── */}
      {error && <p className="text-sm text-red-500">{error}</p>}

      {/* ── Empty state ── */}
      {!loading && data && data.items.length === 0 && (
        <div className="rounded-lg border bg-white px-6 py-12 text-center">
          <p className="text-sm font-medium text-gray-600">
            No notifications found
          </p>
          <p className="mt-1 text-xs text-gray-400">
            {entityFilter || timeFilter > 0
              ? "Try broadening your filters to see more activity."
              : "Activity will appear here as your team works on candidates, jobs, submittals, and more."}
          </p>
        </div>
      )}

      {/* ── Feed grouped by day ── */}
      {groups.length > 0 && (
        <div className="space-y-6">
          {groups.map((group) => (
            <section key={group.day}>
              <h2 className="mb-1 text-xs font-semibold uppercase tracking-wider text-gray-400">
                {group.day}
              </h2>
              <div className="overflow-hidden rounded-lg border bg-white divide-y">
                {group.entries.map((item) => (
                  <NotificationRow key={item.id} item={item} />
                ))}
              </div>
            </section>
          ))}
        </div>
      )}

      {/* ── Pagination ── */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between pt-2">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page <= 1}
            className="rounded border px-3 py-1 text-xs font-medium text-gray-600 disabled:opacity-40"
          >
            Previous
          </button>
          <span className="text-xs text-gray-400">
            Page {page} of {totalPages} · {data?.total ?? 0} total
          </span>
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page >= totalPages}
            className="rounded border px-3 py-1 text-xs font-medium text-gray-600 disabled:opacity-40"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
