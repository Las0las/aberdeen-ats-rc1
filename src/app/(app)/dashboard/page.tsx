import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { getDashboardData } from "@/lib/dashboard/queries";
import { StateBadge } from "@/components/ui/badge";
import { ApplicationStageValues } from "@/contracts/db/enums";
import type { DashboardResponse } from "@/lib/dashboard/schemas";

/* ─── Server Page ─────────────────────────────────────────────── */

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  let data: DashboardResponse;
  try {
    data = await getDashboardData(supabase);
  } catch {
    return (
      <div className="space-y-4">
        <h1 className="text-lg font-semibold text-gray-900">Dashboard</h1>
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
          Unable to load dashboard data. Please try again.
        </div>
      </div>
    );
  }

  const { pipeline, bench, assignments, placements } = data;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-lg font-semibold text-gray-900">Dashboard</h1>
        <p className="text-sm text-gray-500">
          Operational overview for daily standups
        </p>
      </div>

      {/* ── 1. Pipeline Overview ── */}
      <section className="space-y-3">
        <SectionHeader
          title="Pipeline Overview"
          href="/pipeline"
          linkLabel="Open board"
        />

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <StatCard
            label="Total Applications"
            value={pipeline.total}
            href="/applications"
          />
          <StatCard
            label="In Interview"
            value={pipeline.byStage.INTERVIEW}
            href="/pipeline"
          />
          <StatCard
            label="Offers"
            value={pipeline.byStage.OFFER}
            href="/pipeline"
          />
          <StatCard
            label="Hired"
            value={pipeline.byStage.HIRED}
            href="/pipeline"
          />
        </div>

        {/* Stage breakdown */}
        <div className="rounded-lg border bg-white p-4">
          <p className="text-[11px] font-medium uppercase tracking-wider text-gray-400 mb-3">
            By Stage
          </p>
          <div className="flex flex-wrap gap-2">
            {ApplicationStageValues.map((stage) => (
              <div key={stage} className="flex items-center gap-1.5">
                <StateBadge state={stage} />
                <span className="text-xs font-semibold tabular-nums text-gray-700">
                  {pipeline.byStage[stage]}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Aging */}
        <div className="rounded-lg border bg-white p-4 space-y-2">
          <p className="text-[11px] font-medium uppercase tracking-wider text-gray-400 mb-1">
            Application Aging
          </p>
          <AgingRow label="7+ days" count={pipeline.aging.over7Days} color="bg-amber-400" />
          <AgingRow label="14+ days" count={pipeline.aging.over14Days} color="bg-orange-400" />
          <AgingRow label="30+ days" count={pipeline.aging.over30Days} color="bg-red-400" />
        </div>
      </section>

      {/* ── 2. Bench Health ── */}
      <section className="space-y-3">
        <SectionHeader
          title="Bench Health"
          href="/bench"
          linkLabel="View bench"
        />

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          <StatCard label="On Bench" value={bench.total} href="/bench" />
          <StatCard
            label="Remarketing"
            value={bench.remarketing}
            sub={
              bench.total > 0
                ? `${Math.round((bench.remarketing / bench.total) * 100)}% of bench`
                : undefined
            }
          />
          <StatCard
            label="Avg Days on Bench"
            value={bench.avgDaysOnBench}
            sub="days"
          />
        </div>
      </section>

      {/* ── 3. Assignments ── */}
      <section className="space-y-3">
        <SectionHeader
          title="Assignments"
          href="/assignments"
          linkLabel="View all"
        />

        <div className="grid grid-cols-2 gap-3">
          <StatCard
            label="Active Assignments"
            value={assignments.active}
            href="/assignments"
          />
          <StatCard
            label="Ending in 30 Days"
            value={assignments.endingSoon}
            sub={
              assignments.endingSoon > 0
                ? "Action needed"
                : "None ending soon"
            }
          />
        </div>
      </section>

      {/* ── 4. Starts & Placements ── */}
      <section className="space-y-3">
        <SectionHeader
          title="Starts & Placements"
          href="/placements"
          linkLabel="View placements"
        />

        <div className="grid grid-cols-2 gap-3">
          <StatCard
            label="Started This Week"
            value={placements.startedThisWeek}
            href="/placements"
          />
          <StatCard
            label="Upcoming (14 Days)"
            value={placements.upcomingStarts}
            sub={
              placements.upcomingStarts > 0
                ? "Starts coming up"
                : "No upcoming starts"
            }
          />
        </div>
      </section>
    </div>
  );
}

/* ─── Sub-components (server-only, no "use client") ──────────── */

function StatCard({
  label,
  value,
  sub,
  href,
}: {
  label: string;
  value: number | string;
  sub?: string;
  href?: string;
}) {
  const inner = (
    <div className="rounded-lg border bg-white px-5 py-4 space-y-1">
      <p className="text-[11px] font-medium uppercase tracking-wider text-gray-400">
        {label}
      </p>
      <p className="text-2xl font-semibold tabular-nums text-gray-900">
        {value}
      </p>
      {sub && <p className="text-xs text-gray-500">{sub}</p>}
    </div>
  );
  if (href) {
    return (
      <Link
        href={href}
        className="block rounded-lg transition-shadow hover:shadow-md"
      >
        {inner}
      </Link>
    );
  }
  return inner;
}

function SectionHeader({
  title,
  href,
  linkLabel,
}: {
  title: string;
  href: string;
  linkLabel: string;
}) {
  return (
    <div className="flex items-center justify-between">
      <h2 className="text-sm font-semibold text-gray-800">{title}</h2>
      <Link
        href={href}
        className="text-xs text-gray-400 transition-colors hover:text-gray-600"
      >
        {linkLabel} →
      </Link>
    </div>
  );
}

function AgingRow({
  label,
  count,
  color,
}: {
  label: string;
  count: number;
  color: string;
}) {
  return (
    <div className="flex items-center gap-2">
      <span className={`h-2 w-2 rounded-full ${color}`} />
      <span className="text-xs text-gray-600 flex-1">{label}</span>
      <span className="text-xs font-semibold tabular-nums text-gray-700">
        {count}
      </span>
    </div>
  );
}
