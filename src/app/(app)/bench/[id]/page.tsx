import { redirect, notFound } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { getBenchEntry } from "@/lib/bench/queries";
import { StateBadge } from "@/components/ui/badge";
import { daysBetween, formatName } from "@/lib/utils";
import { EntitySidebar } from "@/components/entity/entity-sidebar";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function BenchDetailPage({ params }: Props) {
  const { id } = await params;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  let entry: Awaited<ReturnType<typeof getBenchEntry>>;
  try {
    entry = await getBenchEntry(supabase, id);
  } catch {
    notFound();
  }

  const c = entry.candidates;
  const name = formatName(c?.first_name, c?.last_name);
  const days = daysBetween(entry.bench_started_at, entry.bench_ended_at);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <Link
            href="/bench"
            className="text-xs text-gray-400 hover:text-gray-600"
          >
            ← Bench
          </Link>
          <h1 className="mt-1 text-lg font-semibold text-gray-900">{name}</h1>
          <p className="text-sm text-gray-500">
            {c?.current_title ?? "No title"}{" "}
            {c?.current_company ? `@ ${c.current_company}` : ""}
          </p>
        </div>
        <StateBadge state={entry.state} />
      </div>

      {/* Summary cards */}
      <div className="grid gap-4 sm:grid-cols-3">
        <Card label="Days on Bench" value={String(days)} />
        <Card
          label="Bench Started"
          value={new Date(entry.bench_started_at).toLocaleDateString()}
        />
        <Card label="Location" value={c?.location ?? "—"} />
      </div>

      {/* Candidate details */}
      <section className="rounded-lg border bg-white p-4 space-y-3">
        <h2 className="text-sm font-semibold text-gray-800">Candidate Info</h2>
        <dl className="grid gap-x-6 gap-y-2 text-sm sm:grid-cols-2">
          <DL label="Email" value={c?.email} />
          <DL label="Headline" value={c?.headline} />
          <DL
            label="Skills"
            value={c?.skills?.join(", ") ?? null}
          />
        </dl>
      </section>

      {/* Bench entry metadata */}
      <section className="rounded-lg border bg-white p-4 space-y-3">
        <h2 className="text-sm font-semibold text-gray-800">Bench Entry</h2>
        <dl className="grid gap-x-6 gap-y-2 text-sm sm:grid-cols-2">
          <DL label="Reason" value={entry.reason} />
          <DL label="Notes" value={entry.notes} />
          <DL label="Entry ID" value={entry.id} />
        </dl>
      </section>

      {/* Notes & Activity */}
      <EntitySidebar entityType="bench_entry" entityId={id} />

      {/* Quick actions */}
      <div className="flex gap-3">
        <Link
          href={`/bench/${id}/matches`}
          className="rounded bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
        >
          Run Match
        </Link>
      </div>
    </div>
  );
}

function Card({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border bg-white p-4">
      <p className="text-xs font-medium uppercase text-gray-400">{label}</p>
      <p className="mt-1 text-sm font-mono text-gray-800">{value}</p>
    </div>
  );
}

function DL({ label, value }: { label: string; value: string | null | undefined }) {
  return (
    <div>
      <dt className="text-xs text-gray-400">{label}</dt>
      <dd className="text-gray-700">{value ?? "—"}</dd>
    </div>
  );
}
