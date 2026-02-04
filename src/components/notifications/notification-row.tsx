"use client";

import Link from "next/link";
import { entityDetailHref, entityLabel } from "@/lib/activity/entityRoutes";
import type { NotificationItem } from "@/lib/notifications/schemas";

/** Action type → dot color (reuses logic from activity-timeline) */
function actionColor(actionType: string): string {
  const lower = actionType.toLowerCase();
  if (lower.includes("create") || lower.includes("add"))
    return "bg-green-500";
  if (lower.includes("update") || lower.includes("edit") || lower.includes("change"))
    return "bg-blue-500";
  if (lower.includes("delete") || lower.includes("remove"))
    return "bg-red-500";
  if (lower.includes("submit"))
    return "bg-purple-500";
  if (lower.includes("match") || lower.includes("ai"))
    return "bg-cyan-500";
  return "bg-gray-400";
}

/** Convert ACTION_TYPE to readable text */
function formatAction(action: string): string {
  return action.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

interface NotificationRowProps {
  item: NotificationItem;
}

export function NotificationRow({ item }: NotificationRowProps) {
  const href = entityDetailHref(item.entity_type, item.entity_id);
  const time = new Date(item.created_at).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="flex items-start gap-3 px-4 py-3">
      {/* Action dot */}
      <span
        className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${actionColor(item.action_type)}`}
      />

      {/* Content */}
      <div className="min-w-0 flex-1 space-y-0.5">
        <p className="text-sm text-gray-700">
          {item.description ?? formatAction(item.action_type)}
        </p>

        <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-[11px] text-gray-400">
          {/* Entity chip */}
          {href ? (
            <Link
              href={href}
              className="rounded bg-gray-100 px-1.5 py-0.5 font-medium text-gray-600 hover:bg-gray-200 transition-colors"
            >
              {entityLabel(item.entity_type)}
            </Link>
          ) : (
            <span className="rounded bg-gray-100 px-1.5 py-0.5 font-medium text-gray-500">
              {entityLabel(item.entity_type)}
            </span>
          )}

          {/* Category / action type badge */}
          {item.action_category && (
            <span className="rounded bg-indigo-50 px-1.5 py-0.5 text-indigo-600">
              {item.action_category}
            </span>
          )}

          {/* Actor */}
          {item.actor_name && <span>{item.actor_name}</span>}

          {/* Source */}
          {item.source && (
            <span className="rounded bg-gray-50 px-1 py-0.5">
              {item.source}
            </span>
          )}

          {/* Time */}
          <span>{time}</span>
        </div>
      </div>
    </div>
  );
}
