import { cn } from "@/lib/utils";
import type { BenchState } from "@/contracts/db/enums";

const colorMap: Record<string, string> = {
  // Bench states
  ON_BENCH: "bg-blue-100 text-blue-700",
  REMARKETING: "bg-amber-100 text-amber-700",
  IN_PROCESS: "bg-purple-100 text-purple-700",
  PLACED: "bg-green-100 text-green-700",
  EXITED: "bg-gray-100 text-gray-500",
  // Application stages
  NEW: "bg-sky-100 text-sky-700",
  OUTREACH: "bg-indigo-100 text-indigo-700",
  SCREENING: "bg-violet-100 text-violet-700",
  SUBMISSION: "bg-blue-100 text-blue-700",
  INTERVIEW: "bg-purple-100 text-purple-700",
  OFFER: "bg-amber-100 text-amber-700",
  HIRED: "bg-green-100 text-green-700",
  REJECTED: "bg-red-100 text-red-600",
  WITHDRAWN: "bg-gray-100 text-gray-500",
  // Job statuses
  DRAFT: "bg-gray-100 text-gray-600",
  ACTIVE: "bg-green-100 text-green-700",
  PAUSED: "bg-amber-100 text-amber-700",
  CLOSED: "bg-red-100 text-red-600",
  ARCHIVED: "bg-gray-100 text-gray-400",
  // Submittal states
  AI_GENERATED: "bg-cyan-100 text-cyan-700",
  RECRUITER_REVIEWED: "bg-indigo-100 text-indigo-700",
  SUBMITTED: "bg-blue-100 text-blue-700",
  VIEWED: "bg-purple-100 text-purple-700",
  CLIENT_FEEDBACK: "bg-amber-100 text-amber-700",
  START: "bg-green-100 text-green-700",
  // Interview states
  SCHEDULED: "bg-blue-100 text-blue-700",
  COMPLETED: "bg-green-100 text-green-700",
  NO_SHOW: "bg-red-100 text-red-600",
  CANCELLED: "bg-gray-100 text-gray-500",
  // Offer states
  PENDING_APPROVAL: "bg-amber-100 text-amber-700",
  SENT: "bg-blue-100 text-blue-700",
  ACCEPTED: "bg-green-100 text-green-700",
  DECLINED: "bg-red-100 text-red-600",
  RESCINDED: "bg-red-100 text-red-500",
  // Start states
  PLANNED: "bg-sky-100 text-sky-700",
  CONFIRMED: "bg-blue-100 text-blue-700",
  STARTED: "bg-green-100 text-green-700",
  DELAYED: "bg-amber-100 text-amber-700",
  // Assignment states
  PROPOSED: "bg-sky-100 text-sky-700",
  EXTENDED: "bg-indigo-100 text-indigo-700",
  ENDED: "bg-gray-100 text-gray-500",
  TERMINATED: "bg-red-100 text-red-600",
};

export function StateBadge({ state }: { state: string }) {
  const colors = colorMap[state] ?? "bg-gray-100 text-gray-600";
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
        colors,
      )}
    >
      {state.replace(/_/g, " ")}
    </span>
  );
}

export function ScoreBadge({ score }: { score: number }) {
  const pct = Math.round(score * 100);
  const color =
    pct >= 80
      ? "bg-green-100 text-green-700"
      : pct >= 50
        ? "bg-amber-100 text-amber-700"
        : "bg-red-100 text-red-600";
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold tabular-nums",
        color,
      )}
    >
      {pct}%
    </span>
  );
}
