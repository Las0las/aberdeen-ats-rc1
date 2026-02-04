"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { AutomationRule, Alert, EvaluationResult } from "@/lib/automations/schemas";

interface Props {
  rule: AutomationRule;
}

export function RuleDetail({ rule }: Props) {
  const router = useRouter();
  const cfg = rule.triggerConfig ?? {};
  const severity = (cfg.severity as string) ?? "warning";
  const windowDays = (cfg.windowDays as number) ?? 30;
  const entityType = (cfg.entityType as string) ?? rule.triggerType ?? "—";

  const [toggling, setToggling] = useState(false);
  const [previewing, setPreviewing] = useState(false);
  const [previewWindow, setPreviewWindow] = useState(windowDays);
  const [result, setResult] = useState<
    (EvaluationResult & { alertsWritten: number; writeEnabled: boolean }) | null
  >(null);
  const [error, setError] = useState<string | null>(null);

  async function handleToggle() {
    setToggling(true);
    try {
      const res = await fetch(`/api/automations/rules/${rule.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ enabled: rule.status !== "active" }),
      });
      if (!res.ok) throw new Error("Toggle failed");
      router.refresh();
    } catch {
      setError("Failed to toggle rule");
    } finally {
      setToggling(false);
    }
  }

  async function handlePreview() {
    setPreviewing(true);
    setError(null);
    setResult(null);

    try {
      const res = await fetch(`/api/automations/rules/${rule.id}/preview`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ windowDays: previewWindow, write: false }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error((data as { error?: string }).error ?? "Preview failed");
      }
      const data = await res.json();
      setResult(data as EvaluationResult & { alertsWritten: number; writeEnabled: boolean });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Preview failed");
    } finally {
      setPreviewing(false);
    }
  }

  return (
    <div className="space-y-6">
      {/* Rule metadata */}
      <section className="rounded-lg border bg-white">
        <div className="border-b px-5 py-3 flex items-center justify-between">
          <h2 className="text-sm font-semibold text-gray-800">
            Rule Configuration
          </h2>
          <button
            onClick={handleToggle}
            disabled={toggling}
            className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors disabled:opacity-50 ${
              rule.status === "active"
                ? "border border-red-200 bg-red-50 text-red-700 hover:bg-red-100"
                : "border border-green-200 bg-green-50 text-green-700 hover:bg-green-100"
            }`}
          >
            {toggling
              ? "Updating…"
              : rule.status === "active"
                ? "Disable Rule"
                : "Enable Rule"}
          </button>
        </div>
        <div className="grid gap-4 px-5 py-4 sm:grid-cols-3">
          <Field label="Trigger" value={rule.triggerType ?? "—"} />
          <Field label="Entity Type" value={entityType} />
          <Field label="Severity" value={severity} />
          <Field label="Window" value={`${windowDays} days`} />
          <Field label="Action" value={rule.actionType ?? "alert"} />
          <Field
            label="Status"
            value={rule.status ?? "unknown"}
          />
          <Field label="Rule ID" value={rule.id} mono />
          <Field
            label="Created"
            value={
              rule.createdAt
                ? new Date(rule.createdAt).toLocaleString()
                : "—"
            }
          />
        </div>
      </section>

      {/* Preview runner */}
      <section className="rounded-lg border bg-white">
        <div className="border-b px-5 py-3">
          <h2 className="text-sm font-semibold text-gray-800">
            Run Preview
          </h2>
          <p className="text-xs text-gray-500">
            Evaluate this rule against live data without writing alerts.
          </p>
        </div>
        <div className="flex items-center gap-3 px-5 py-4">
          <label className="text-xs text-gray-600">
            Window (days):
            <input
              type="number"
              min={1}
              max={365}
              value={previewWindow}
              onChange={(e) =>
                setPreviewWindow(
                  Math.max(1, Math.min(365, Number(e.target.value) || 30)),
                )
              }
              className="ml-2 w-20 rounded-md border px-2 py-1 text-sm tabular-nums"
            />
          </label>
          <button
            onClick={handlePreview}
            disabled={previewing}
            className="rounded-md bg-blue-600 px-4 py-2 text-xs font-medium text-white transition-colors hover:bg-blue-700 disabled:opacity-50"
          >
            {previewing ? "Evaluating…" : "Run Preview"}
          </button>
        </div>

        {error && (
          <div className="mx-5 mb-4 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-600">
            {error}
          </div>
        )}

        {result && (
          <div className="border-t px-5 py-4 space-y-3">
            <div className="flex gap-6 text-xs text-gray-600">
              <span>
                Rows scanned:{" "}
                <strong className="text-gray-900">{result.rowsScanned}</strong>
              </span>
              <span>
                Alerts:{" "}
                <strong className="text-gray-900">
                  {result.totalMatched}
                </strong>
              </span>
              <span>
                Duration:{" "}
                <strong className="text-gray-900">{result.durationMs}ms</strong>
              </span>
              <span className="text-gray-400">
                (write: {result.writeEnabled ? "on" : "off"})
              </span>
            </div>

            {result.totalMatched === 0 ? (
              <p className="text-xs text-gray-500">
                No alerts triggered for this window.
              </p>
            ) : (
              <AlertsTable alerts={result.alerts} />
            )}
          </div>
        )}
      </section>
    </div>
  );
}

/* ─── Alerts table ─────────────────────────────────────── */

function AlertsTable({ alerts }: { alerts: Alert[] }) {
  const capped = alerts.slice(0, 50);
  return (
    <div className="overflow-x-auto rounded-md border">
      <table className="w-full text-xs">
        <thead>
          <tr className="bg-gray-50 text-left text-[10px] font-medium uppercase tracking-wider text-gray-500">
            <th className="px-3 py-2">Entity</th>
            <th className="px-3 py-2">Message</th>
            <th className="px-3 py-2">Age</th>
            <th className="px-3 py-2">Severity</th>
          </tr>
        </thead>
        <tbody>
          {capped.map((a, i) => (
            <tr key={i} className="border-t hover:bg-gray-50">
              <td className="px-3 py-2 text-gray-700 max-w-[160px] truncate">
                {a.entityLabel}
              </td>
              <td className="px-3 py-2 text-gray-600 max-w-xs">
                {a.message}
              </td>
              <td className="px-3 py-2 tabular-nums text-gray-600">
                {a.ageDays}d
              </td>
              <td className="px-3 py-2">
                <SeverityDot severity={a.severity} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {alerts.length > 50 && (
        <p className="px-3 py-2 text-[10px] text-gray-400">
          Showing 50 of {alerts.length} alerts
        </p>
      )}
    </div>
  );
}

function SeverityDot({ severity }: { severity: string }) {
  const colors: Record<string, string> = {
    critical: "bg-red-500",
    warning: "bg-amber-500",
    info: "bg-blue-500",
  };
  return (
    <span className="flex items-center gap-1">
      <span
        className={`h-2 w-2 rounded-full ${colors[severity] ?? "bg-gray-400"}`}
      />
      <span className="text-gray-600">{severity}</span>
    </span>
  );
}

/* ─── Reusable field ───────────────────────────────────── */

function Field({
  label,
  value,
  mono,
}: {
  label: string;
  value: string;
  mono?: boolean;
}) {
  return (
    <div>
      <p className="text-[11px] font-medium uppercase tracking-wider text-gray-400">
        {label}
      </p>
      <p
        className={`mt-0.5 truncate text-sm text-gray-800 ${
          mono ? "font-mono text-xs" : ""
        }`}
      >
        {value}
      </p>
    </div>
  );
}
