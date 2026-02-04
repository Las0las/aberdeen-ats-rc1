"use client";

import { useState, useEffect, useCallback } from "react";
import type { EntityType } from "@/lib/notes/schemas";

interface ActivityItem {
  id: string;
  action_type: string;
  action_category: string | null;
  description: string | null;
  actor_id: string | null;
  actor_type: string | null;
  actor_name: string | null;
  source: string | null;
  metadata: Record<string, unknown> | null;
  changes: Record<string, unknown> | null;
  created_at: string;
}

interface ActivitiesResponse {
  activities: ActivityItem[];
  total: number;
}

interface ActivityTimelineProps {
  entityType: EntityType;
  entityId: string;
}

/** Group activities by calendar day (local timezone) */
function groupByDay(
  items: ActivityItem[],
): { date: string; entries: ActivityItem[] }[] {
  const map = new Map<string, ActivityItem[]>();

  for (const item of items) {
    const day = new Date(item.created_at).toLocaleDateString("en-US", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    });
    const bucket = map.get(day);
    if (bucket) {
      bucket.push(item);
    } else {
      map.set(day, [item]);
    }
  }

  return Array.from(map.entries()).map(([date, entries]) => ({
    date,
    entries,
  }));
}

/** Action type → human-readable icon/color */
function actionMeta(actionType: string): {
  icon: string;
  color: string;
} {
  const lower = actionType.toLowerCase();
  if (lower.includes("create") || lower.includes("add"))
    return { icon: "+", color: "bg-green-500" };
  if (lower.includes("update") || lower.includes("edit") || lower.includes("change"))
    return { icon: "~", color: "bg-blue-500" };
  if (lower.includes("delete") || lower.includes("remove"))
    return { icon: "×", color: "bg-red-500" };
  if (lower.includes("submit"))
    return { icon: "→", color: "bg-purple-500" };
  if (lower.includes("match") || lower.includes("ai"))
    return { icon: "★", color: "bg-cyan-500" };
  return { icon: "•", color: "bg-gray-400" };
}

export function ActivityTimeline({
  entityType,
  entityId,
}: ActivityTimelineProps) {
  const [data, setData] = useState<ActivitiesResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchActivities = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams({
        entity_type: entityType,
        entity_id: entityId,
        limit: "100",
      });
      const res = await fetch(`/api/activity?${params}`);
      if (!res.ok) throw new Error(`Failed (${res.status})`);
      const json = (await res.json()) as ActivitiesResponse;
      setData(json);
    } catch (err: unknown) {
      setError(
        err instanceof Error ? err.message : "Failed to load activity",
      );
    } finally {
      setLoading(false);
    }
  }, [entityType, entityId]);

  useEffect(() => {
    fetchActivities();
  }, [fetchActivities]);

  if (loading) {
    return (
      <div className="space-y-2">
        <h3 className="text-sm font-semibold text-gray-800">Activity</h3>
        <p className="text-xs text-gray-400">Loading activity…</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-2">
        <h3 className="text-sm font-semibold text-gray-800">Activity</h3>
        <p className="text-xs text-red-600">{error}</p>
      </div>
    );
  }

  const groups = groupByDay(data?.activities ?? []);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-gray-800">Activity</h3>
        {data && (
          <span className="text-[10px] text-gray-400">
            {data.total} event{data.total !== 1 ? "s" : ""}
          </span>
        )}
      </div>

      {groups.length === 0 ? (
        <p className="text-xs text-gray-400">No activity recorded.</p>
      ) : (
        <div className="space-y-4">
          {groups.map((group) => (
            <div key={group.date}>
              <p className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-gray-400">
                {group.date}
              </p>
              <div className="relative ml-3 border-l border-gray-200 pl-4 space-y-3">
                {group.entries.map((entry) => {
                  const meta = actionMeta(entry.action_type);
                  return (
                    <div key={entry.id} className="relative">
                      {/* Timeline dot */}
                      <span
                        className={`absolute -left-[22px] top-1 flex h-3 w-3 items-center justify-center rounded-full text-[8px] font-bold text-white ${meta.color}`}
                      >
                        {meta.icon}
                      </span>

                      <div className="space-y-0.5">
                        <p className="text-sm text-gray-700">
                          {entry.description ??
                            formatActionType(entry.action_type)}
                        </p>
                        <div className="flex items-center gap-2 text-[10px] text-gray-400">
                          {entry.actor_name && (
                            <span>{entry.actor_name}</span>
                          )}
                          {entry.actor_type &&
                            !entry.actor_name && (
                              <span className="capitalize">
                                {entry.actor_type}
                              </span>
                            )}
                          <span>
                            {new Date(entry.created_at).toLocaleTimeString(
                              "en-US",
                              {
                                hour: "2-digit",
                                minute: "2-digit",
                              },
                            )}
                          </span>
                          {entry.source && (
                            <span className="rounded bg-gray-100 px-1 py-0.5">
                              {entry.source}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/** Convert ACTION_TYPE to readable text */
function formatActionType(action: string): string {
  return action
    .replace(/_/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}
