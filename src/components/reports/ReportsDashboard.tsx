"use client";

import { useState } from "react";
import Link from "next/link";
import { StateBadge } from "@/components/ui/badge";
import { ApplicationStageValues } from "@/contracts/db/enums";
import type {
  ReportsResponse,
  FunnelReport,
  PipelineReport,
  BenchReport,
  ActivityReport,
  ReportType,
} from "@/lib/reports/schemas";
import { REPORT_TYPES } from "@/lib/reports/schemas";

/* ─── Primitives ──────────────────────────────────────────────── */

function Stat({ label, value, sub }: { label: string; value: string | number; sub?: string }) {
  return (
    <div className="rounded-lg border bg-white px-5 py-4 space-y-1">
      <p className="text-[11px] font-medium uppercase tracking-wider text-gray-400">{label}</p>
      <p className="text-2xl font-semibold tabular-nums text-gray-900">{value}</p>
      {sub && <p className="text-xs text-gray-500">{sub}</p>}
    </div>
  );
}

function BarInline({ value, max, label }: { value: number; max: number; label: string }) {
  const width = max > 0 ? Math.max(1, Math.round((value / max) * 100)) : 0;
  return (
    <div className="flex items-center gap-3">
      <span className="w-28 text-xs text-gray-600 shrink-0 truncate">{label}</span>
      <div className="flex-1 h-5 bg-gray-100 rounded-full overflow-hidden">
        <div
          className="h-full bg-blue-400 rounded-full transition-all"
          style={{ width: `${width}%` }}
        />
      </div>
      <span className="w-12 text-right text-xs font-semibold tabular-nums text-gray-700">
        {value}
      </span>
    </div>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-400">{children}</h3>;
}

/* ─── Tabs ────────────────────────────────────────────────────── */

const TAB_LABELS: Record<ReportType, string> = {
  funnel: "Funnel",
  pipeline: "Pipeline",
  bench: "Bench",
  activity: "Activity",
};

/* ─── Funnel Section ──────────────────────────────────────────── */

function FunnelSection({ data }: { data: FunnelReport }) {
  const maxCount = Math.max(...data.steps.map((s) => s.count), 1);
  return (
    <div className="space-y-5">
      <SectionTitle>Recruiting Funnel ({data.sinceDays}d)</SectionTitle>

      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        {data.steps.map((s) => (
          <Stat key={s.label} label={s.label} value={s.count} />
        ))}
      </div>

      <div className="rounded-lg border bg-white p-4 space-y-2">
        <SectionTitle>Volume</SectionTitle>
        {data.steps.map((s) => (
          <BarInline key={s.label} label={s.label} value={s.count} max={maxCount} />
        ))}
      </div>

      {data.conversions.length > 0 && (
        <div className="rounded-lg border bg-white p-4">
          <SectionTitle>Conversion Rates</SectionTitle>
          <div className="mt-3 space-y-2">
            {data.conversions.map((c) => (
              <div key={c.from + c.to} className="flex items-center gap-2">
                <span className="text-xs text-gray-600 w-40 shrink-0">
                  {c.from} → {c.to}
                </span>
                <div className="flex-1 h-4 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full bg-emerald-400 transition-all"
                    style={{ width: `${Math.min(c.rate, 100)}%` }}
                  />
                </div>
                <span className="w-14 text-right text-xs font-semibold tabular-nums text-gray-700">
                  {c.rate}%
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

/* ─── Pipeline Section ────────────────────────────────────────── */

function PipelineSection({ data }: { data: PipelineReport }) {
  const maxStage = Math.max(...data.byStage.map((s) => s.count), 1);
  return (
    <div className="space-y-5">
      <SectionTitle>Pipeline Distribution ({data.sinceDays}d)</SectionTitle>

      <Stat label="Total Applications" value={data.total} />

      <div className="rounded-lg border bg-white p-4 space-y-2">
        <SectionTitle>By Stage</SectionTitle>
        {data.byStage.map((s) => (
          <div key={s.stage} className="flex items-center gap-2">
            <span className="w-28 shrink-0">
              <StateBadge state={s.stage} />
            </span>
            <div className="flex-1 h-4 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-indigo-400 rounded-full transition-all"
                style={{ width: `${maxStage > 0 ? Math.max(1, Math.round((s.count / maxStage) * 100)) : 0}%` }}
              />
            </div>
            <span className="w-12 text-right text-xs font-semibold tabular-nums text-gray-700">
              {s.count}
            </span>
          </div>
        ))}
      </div>

      <div className="rounded-lg border bg-white p-4 overflow-x-auto">
        <SectionTitle>Time-in-Stage (Age Buckets)</SectionTitle>
        <table className="mt-3 w-full text-xs">
          <thead>
            <tr className="text-left text-gray-400">
              <th className="py-1 pr-3 font-medium">Stage</th>
              <th className="py-1 px-3 font-medium text-right">0-7d</th>
              <th className="py-1 px-3 font-medium text-right">8-14d</th>
              <th className="py-1 px-3 font-medium text-right">15-30d</th>
              <th className="py-1 px-3 font-medium text-right">30+d</th>
            </tr>
          </thead>
          <tbody>
            {data.ageBuckets.map((b) => (
              <tr key={b.stage} className="border-t border-gray-50">
                <td className="py-1.5 pr-3">
                  <StateBadge state={b.stage} />
                </td>
                <td className="py-1.5 px-3 text-right tabular-nums text-gray-700">{b["0-7"]}</td>
                <td className="py-1.5 px-3 text-right tabular-nums text-gray-700">{b["8-14"]}</td>
                <td className="py-1.5 px-3 text-right tabular-nums text-gray-700">{b["15-30"]}</td>
                <td className="py-1.5 px-3 text-right tabular-nums font-semibold text-red-600">
                  {b["30+"]}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ─── Bench Section ───────────────────────────────────────────── */

function BenchSection({ data }: { data: BenchReport }) {
  return (
    <div className="space-y-5">
      <SectionTitle>Bench Efficiency</SectionTitle>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        <Stat label="Active on Bench" value={data.active} />
        <Stat label="Avg Days on Bench" value={data.avgDaysOnBench} sub="days" />
        <Stat
          label="Remarketing"
          value={data.byState.find((s) => s.state === "REMARKETING")?.count ?? 0}
        />
      </div>

      <div className="rounded-lg border bg-white p-4 space-y-2">
        <SectionTitle>By State</SectionTitle>
        {data.byState.map((s) => (
          <div key={s.state} className="flex items-center gap-2">
            <span className="w-28 shrink-0">
              <StateBadge state={s.state} />
            </span>
            <span className="text-xs font-semibold tabular-nums text-gray-700">{s.count}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Activity Section ────────────────────────────────────────── */

function ActivitySection({ data }: { data: ActivityReport }) {
  return (
    <div className="space-y-5">
      <SectionTitle>Recruiter Activity ({data.sinceDays}d)</SectionTitle>

      <Stat label="Total Activities" value={data.totalActivities} />

      {data.topActors.length === 0 ? (
        <p className="text-xs text-gray-400">No activity recorded in this period.</p>
      ) : (
        <div className="rounded-lg border bg-white p-4 overflow-x-auto">
          <SectionTitle>Top Actors</SectionTitle>
          <table className="mt-3 w-full text-xs">
            <thead>
              <tr className="text-left text-gray-400">
                <th className="py-1 pr-3 font-medium">Actor</th>
                <th className="py-1 px-3 font-medium text-right">Total</th>
                <th className="py-1 px-3 font-medium">Categories</th>
              </tr>
            </thead>
            <tbody>
              {data.topActors.slice(0, 15).map((a) => (
                <tr key={a.actorName} className="border-t border-gray-50">
                  <td className="py-1.5 pr-3 font-medium text-gray-800 truncate max-w-[200px]">
                    {a.actorName}
                  </td>
                  <td className="py-1.5 px-3 text-right tabular-nums font-semibold text-gray-700">
                    {a.total}
                  </td>
                  <td className="py-1.5 px-3">
                    <div className="flex flex-wrap gap-1">
                      {Object.entries(a.byCategory)
                        .sort(([, a], [, b]) => b - a)
                        .slice(0, 5)
                        .map(([cat, cnt]) => (
                          <span
                            key={cat}
                            className="inline-flex items-center rounded bg-gray-100 px-1.5 py-0.5 text-[10px] text-gray-600"
                          >
                            {cat}:{cnt}
                          </span>
                        ))}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

/* ─── Main Dashboard Component ────────────────────────────────── */

const TIME_PRESETS = [
  { label: "7d", days: 7 },
  { label: "30d", days: 30 },
  { label: "90d", days: 90 },
  { label: "All", days: 365 },
];

export function ReportsDashboard({
  data,
  sinceDays,
}: {
  data: ReportsResponse;
  sinceDays: number;
}) {
  const [activeTab, setActiveTab] = useState<ReportType>("funnel");

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-lg font-semibold text-gray-900">Reports</h1>
        <p className="text-sm text-gray-500">
          Executive reporting suite — read-only metrics
        </p>
      </div>

      {/* Controls: time presets + export */}
      <div className="flex flex-wrap items-center gap-3">
        <span className="text-xs text-gray-400 uppercase tracking-wider">Time Range</span>
        <div className="flex gap-1">
          {TIME_PRESETS.map((p) => (
            <Link
              key={p.days}
              href={`/reports?sinceDays=${p.days}`}
              className={`rounded px-3 py-1 text-xs font-medium transition-colors ${
                sinceDays === p.days
                  ? "bg-gray-900 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {p.label}
            </Link>
          ))}
        </div>

        <span className="text-gray-200">|</span>

        <a
          href={`/api/reports/export?type=${activeTab}&sinceDays=${sinceDays}`}
          className="rounded border px-3 py-1 text-xs font-medium text-gray-600 hover:bg-gray-50 transition-colors"
          download
        >
          Export {TAB_LABELS[activeTab]} CSV ↓
        </a>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 border-b">
        {REPORT_TYPES.map((t) => (
          <button
            key={t}
            onClick={() => setActiveTab(t)}
            className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
              activeTab === t
                ? "border-gray-900 text-gray-900"
                : "border-transparent text-gray-400 hover:text-gray-600"
            }`}
          >
            {TAB_LABELS[t]}
          </button>
        ))}
      </div>

      {/* Tab content */}
      {activeTab === "funnel" && <FunnelSection data={data.funnel} />}
      {activeTab === "pipeline" && <PipelineSection data={data.pipeline} />}
      {activeTab === "bench" && <BenchSection data={data.bench} />}
      {activeTab === "activity" && <ActivitySection data={data.activity} />}
    </div>
  );
}
