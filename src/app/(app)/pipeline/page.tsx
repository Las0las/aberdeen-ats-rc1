"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import { StateBadge } from "@/components/ui/badge";
import type { PipelineResponse, PipelineCard } from "@/lib/pipeline/schemas";

/* ── Feature flag (build-time public env) ── */
const DND_ENABLED = process.env.NEXT_PUBLIC_PIPELINE_DND === "true";

/* ── DND-eligible roles ── */
const DND_ROLES = new Set(["admin", "recruiter"]);

/* ── Time-range presets ── */
const TIME_OPTIONS = [
  { label: "7d", value: 7 },
  { label: "30d", value: 30 },
  { label: "90d", value: 90 },
  { label: "All", value: 365 },
] as const;

/* ── Stage header color accents (matches existing Badge colorMap) ── */
const STAGE_HEADER_COLOR: Record<string, string> = {
  NEW: "border-t-sky-400",
  OUTREACH: "border-t-indigo-400",
  SCREENING: "border-t-violet-400",
  SUBMISSION: "border-t-blue-400",
  INTERVIEW: "border-t-purple-400",
  OFFER: "border-t-amber-400",
  HIRED: "border-t-green-400",
  REJECTED: "border-t-red-400",
  WITHDRAWN: "border-t-gray-400",
};

/* ── Relative time helper ── */
function relativeTime(dateStr: string): string {
  const now = Date.now();
  const then = new Date(dateStr).getTime();
  const diffMs = now - then;
  const mins = Math.floor(diffMs / 60_000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days}d ago`;
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}

/* ── Toast notification component ── */
function Toast({
  message,
  type,
  undoAction,
  onDismiss,
}: {
  message: string;
  type: "success" | "error" | "info";
  undoAction?: () => void;
  onDismiss: () => void;
}) {
  useEffect(() => {
    const timer = setTimeout(onDismiss, 5000);
    return () => clearTimeout(timer);
  }, [onDismiss]);

  const colors = {
    success: "bg-green-50 border-green-200 text-green-700",
    error: "bg-red-50 border-red-200 text-red-700",
    info: "bg-blue-50 border-blue-200 text-blue-700",
  };

  return (
    <div
      className={`fixed bottom-4 right-4 z-50 flex items-center gap-3 rounded-lg border px-4 py-3 shadow-lg ${colors[type]}`}
    >
      <span className="text-sm">{message}</span>
      {undoAction && (
        <button
          onClick={undoAction}
          className="text-sm font-semibold underline hover:no-underline"
        >
          Undo
        </button>
      )}
      <button onClick={onDismiss} className="ml-1 text-sm opacity-60 hover:opacity-100">
        ✕
      </button>
    </div>
  );
}

/* ── Moving overlay for a card ── */
function MovingOverlay() {
  return (
    <div className="absolute inset-0 z-10 flex items-center justify-center rounded-lg bg-white/80">
      <span className="text-xs font-medium text-gray-500 animate-pulse">Moving…</span>
    </div>
  );
}

/* ── Card component ── */
function PipelineCardComponent({
  card,
  dndActive,
  isMoving,
}: {
  card: PipelineCard;
  dndActive: boolean;
  isMoving: boolean;
}) {
  const candidateName = [card.candidate_first_name, card.candidate_last_name]
    .filter(Boolean)
    .join(" ");
  const displayName = candidateName || card.candidate_email || "Unknown";
  const jobTitle = card.job_title || "(No job)";

  const handleDragStart = (e: React.DragEvent) => {
    if (!dndActive || isMoving) {
      e.preventDefault();
      return;
    }
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/plain", card.id);
  };

  return (
    <div className="relative">
      {isMoving && <MovingOverlay />}
      <Link
        href={`/applications/${card.id}`}
        draggable={dndActive && !isMoving}
        onDragStart={handleDragStart}
        className={`block rounded-lg border bg-white p-3 shadow-sm transition-shadow hover:shadow-md ${
          dndActive && !isMoving ? "cursor-grab active:cursor-grabbing" : ""
        } ${isMoving ? "opacity-50 pointer-events-none" : ""}`}
        onClick={(e) => {
          if (isMoving) e.preventDefault();
        }}
      >
        <div className="space-y-1.5">
          <p className="text-sm font-medium text-gray-900 truncate" title={displayName}>
            {displayName}
          </p>
          <p className="text-xs text-gray-500 truncate" title={jobTitle}>
            {jobTitle}
          </p>
          <div className="flex items-center justify-between gap-2">
            {card.status ? (
              <StateBadge state={card.status} />
            ) : (
              <span className="text-[10px] text-gray-400">—</span>
            )}
            <span className="text-[10px] text-gray-400 shrink-0">
              {relativeTime(card.updated_at)}
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
}

/* ── Column component ── */
function StageColumn({
  stage,
  count,
  items,
  dndActive,
  movingCardId,
  onDrop,
}: {
  stage: string;
  count: number;
  items: PipelineCard[];
  dndActive: boolean;
  movingCardId: string | null;
  onDrop?: (cardId: string, targetStage: string) => void;
}) {
  const [dragOver, setDragOver] = useState(false);
  const accent = STAGE_HEADER_COLOR[stage] ?? "border-t-gray-300";

  const handleDragOver = (e: React.DragEvent) => {
    if (!dndActive || movingCardId) return;
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    setDragOver(true);
  };

  const handleDragLeave = () => setDragOver(false);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    if (!dndActive || movingCardId) return;
    const cardId = e.dataTransfer.getData("text/plain");
    if (cardId) onDrop?.(cardId, stage);
  };

  return (
    <div
      className={`flex flex-col rounded-lg border border-t-4 bg-gray-50 ${accent} ${
        dragOver ? "ring-2 ring-blue-300 bg-blue-50/30" : ""
      }`}
      style={{ minWidth: 240, maxWidth: 300 }}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {/* Column header */}
      <div className="flex items-center justify-between px-3 py-2 border-b bg-white rounded-t-lg">
        <span className="text-xs font-semibold text-gray-700">
          {stage.replace(/_/g, " ")}
        </span>
        <span className="rounded-full bg-gray-200 px-2 py-0.5 text-[10px] font-semibold text-gray-600 tabular-nums">
          {count}
        </span>
      </div>

      {/* Scrollable card list */}
      <div
        className="flex-1 overflow-y-auto p-2 space-y-2"
        style={{ maxHeight: "calc(100vh - 230px)" }}
      >
        {items.length === 0 ? (
          <p className="px-2 py-4 text-center text-xs text-gray-400">
            No applications
          </p>
        ) : (
          items.map((card) => (
            <PipelineCardComponent
              key={card.id}
              card={card}
              dndActive={dndActive}
              isMoving={movingCardId === card.id}
            />
          ))
        )}
        {count > items.length && (
          <p className="text-center text-[10px] text-gray-400 py-1">
            +{count - items.length} more
          </p>
        )}
      </div>
    </div>
  );
}

/* ── Main page ── */
export default function PipelinePage() {
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");
  const [sinceDays, setSinceDays] = useState(30);
  const [data, setData] = useState<PipelineResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // DND state
  const [userRole, setUserRole] = useState<string | null>(null);
  const [movingCardId, setMovingCardId] = useState<string | null>(null);
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error" | "info";
    undoAction?: () => void;
  } | null>(null);
  const undoTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Compute effective DND state
  const dndActive = DND_ENABLED && DND_ROLES.has(userRole ?? "");

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => setSearch(searchInput), 300);
    return () => clearTimeout(timer);
  }, [searchInput]);

  // Fetch role for DND gate (only if feature flag is on)
  useEffect(() => {
    if (!DND_ENABLED) return;
    fetch("/api/me")
      .then((res) => (res.ok ? res.json() : null))
      .then((me) => {
        if (me?.role) setUserRole(me.role);
      })
      .catch(() => {
        // Silent — DND just stays disabled
      });
  }, []);

  const fetchPipeline = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams({
        sinceDays: String(sinceDays),
      });
      if (search) params.set("search", search);
      const res = await fetch(`/api/pipeline?${params.toString()}`);
      if (!res.ok) throw new Error(`Request failed (${res.status})`);
      const json: PipelineResponse = await res.json();
      setData(json);
    } catch (err: unknown) {
      setError(
        err instanceof Error ? err.message : "Failed to load pipeline",
      );
    } finally {
      setLoading(false);
    }
  }, [search, sinceDays]);

  useEffect(() => {
    fetchPipeline();
  }, [fetchPipeline]);

  // Cleanup undo timer on unmount
  useEffect(() => {
    return () => {
      if (undoTimerRef.current) clearTimeout(undoTimerRef.current);
    };
  }, []);

  /**
   * Pessimistic stage change via drag/drop.
   *
   * 1. Show "Moving…" overlay on the card
   * 2. Call PATCH /api/applications/[id]/stage
   * 3. On success → refresh board, show toast with 5s undo link
   * 4. On failure → clear moving state, show error toast, card stays put
   *
   * Rate safety: movingCardId acts as a lock — drops are ignored while
   * a request is in flight.
   *
   * Concurrency note: No row versioning is available in the contract.
   * If the application was updated between the board fetch and this call,
   * the stage change still applies (last-write-wins). This is an accepted
   * limitation documented in the build report.
   */
  const handleStageDrop = useCallback(
    async (cardId: string, targetStage: string) => {
      if (!data || movingCardId) return;

      // Find the card's current stage to prevent no-op drops
      let sourceStage: string | null = null;
      for (const col of data.stages) {
        if (col.items.some((c) => c.id === cardId)) {
          sourceStage = col.stage;
          break;
        }
      }

      if (!sourceStage || sourceStage === targetStage) return;

      setMovingCardId(cardId);
      setToast(null);

      try {
        const res = await fetch(`/api/applications/${cardId}/stage`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ stage: targetStage }),
        });

        if (!res.ok) {
          const body = await res.json().catch(() => ({ error: "Request failed" }));
          throw new Error(body.error || `Stage update failed (${res.status})`);
        }

        const result: { id: string; oldStage: string | null; newStage: string } =
          await res.json();

        // Refresh board data
        await fetchPipeline();

        // Capture for undo closure
        const revertStage = result.oldStage ?? sourceStage;

        setToast({
          message: `Moved to ${targetStage.replace(/_/g, " ")}`,
          type: "success",
          undoAction: () => {
            setToast(null);
            handleStageUndo(cardId, revertStage);
          },
        });
      } catch (err: unknown) {
        setToast({
          message: err instanceof Error ? err.message : "Failed to move application",
          type: "error",
        });
      } finally {
        setMovingCardId(null);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [data, movingCardId, fetchPipeline],
  );

  /** Undo — calls the same endpoint to revert to old stage. */
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleStageUndo = useCallback(
    async (cardId: string, oldStage: string) => {
      setMovingCardId(cardId);
      setToast({ message: "Reverting…", type: "info" });

      try {
        const res = await fetch(`/api/applications/${cardId}/stage`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            stage: oldStage,
            reason: "Undo from pipeline board",
          }),
        });

        if (!res.ok) {
          const body = await res.json().catch(() => ({ error: "Undo failed" }));
          throw new Error(body.error || "Undo failed");
        }

        await fetchPipeline();
        setToast({ message: "Stage change undone", type: "success" });
      } catch (err: unknown) {
        setToast({
          message: err instanceof Error ? err.message : "Undo failed",
          type: "error",
        });
      } finally {
        setMovingCardId(null);
      }
    },
    [fetchPipeline],
  );

  return (
    <div className="flex flex-col h-full">
      {/* ── Top bar ── */}
      <div className="flex flex-wrap items-center gap-3 pb-4">
        <div>
          <h1 className="text-lg font-semibold text-gray-900">Pipeline</h1>
          <p className="text-xs text-gray-500">
            {dndActive ? "Drag cards to change stage" : "Read-only Kanban"} —{" "}
            {data?.totals.all ?? 0} applications
          </p>
        </div>

        <div className="flex-1" />

        {/* Search */}
        <input
          type="text"
          placeholder="Search candidates, jobs…"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          className="w-60 rounded-lg border px-3 py-1.5 text-sm text-gray-700 placeholder:text-gray-400 focus:border-gray-400 focus:outline-none"
        />

        {/* Time range pills */}
        <div className="flex gap-1">
          {TIME_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              onClick={() => setSinceDays(opt.value)}
              className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                sinceDays === opt.value
                  ? "bg-gray-900 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* ── Error ── */}
      {error && (
        <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}
        </div>
      )}

      {/* ── Loading ── */}
      {loading && !data && (
        <p className="text-sm text-gray-400">Loading pipeline…</p>
      )}

      {/* ── Kanban board ── */}
      {data && (
        <div className="flex-1 overflow-x-auto pb-4">
          <div className="inline-flex gap-3" style={{ minWidth: "max-content" }}>
            {data.stages.map((col) => (
              <StageColumn
                key={col.stage}
                stage={col.stage}
                count={col.count}
                items={col.items}
                dndActive={dndActive}
                movingCardId={movingCardId}
                onDrop={handleStageDrop}
              />
            ))}
          </div>
        </div>
      )}

      {/* ── Empty state ── */}
      {data && data.totals.all === 0 && !loading && (
        <div className="rounded-lg border bg-white px-6 py-12 text-center">
          <p className="text-sm font-medium text-gray-600">
            No applications in pipeline
          </p>
          <p className="mt-1 text-xs text-gray-400">
            {search
              ? "Try broadening your search or adjusting the time range."
              : "Applications will appear here as candidates move through stages."}
          </p>
        </div>
      )}

      {/* ── Toast ── */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          undoAction={toast.undoAction}
          onDismiss={() => setToast(null)}
        />
      )}
    </div>
  );
}
