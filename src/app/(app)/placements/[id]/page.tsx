import { redirect, notFound } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import {
  getPlacement,
  listStartsForPlacement,
  computeReadiness,
} from "@/lib/placements/queries";
import type { ReadinessCheck } from "@/lib/placements/queries";
import { StateBadge } from "@/components/ui/badge";
import { formatName } from "@/lib/utils";
import { EntitySidebar } from "@/components/entity/entity-sidebar";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function PlacementDetailPage({ params }: Props) {
  const { id } = await params;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  let placement: Awaited<ReturnType<typeof getPlacement>>;
  try {
    placement = await getPlacement(supabase, id);
  } catch {
    notFound();
  }

  // Fetch starts for this placement's candidate (if candidate exists)
  let starts: Awaited<ReturnType<typeof listStartsForPlacement>> = {
    starts: [],
    total: 0,
  };
  if (placement.candidate_id) {
    try {
      starts = await listStartsForPlacement(supabase, {
        candidateId: placement.candidate_id,
        page: 1,
        limit: 50,
      });
    } catch {
      // Non-fatal: starts may not exist yet
    }
  }

  const readiness = computeReadiness(placement, starts.starts);
  const passedCount = readiness.filter((c) => c.passed).length;

  const candidateName = formatName(
    placement.candidates?.first_name,
    placement.candidates?.last_name,
  );

  const fee =
    placement.placement_fee != null
      ? `${placement.fee_currency ?? "$"}${placement.placement_fee.toLocaleString()}`
      : "—";

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <Link
            href="/placements"
            className="text-xs text-gray-400 hover:text-gray-600"
          >
            ← Placements
          </Link>
          <h1 className="mt-1 text-lg font-semibold text-gray-900">
            Placement — {candidateName}
          </h1>
          <p className="text-sm text-gray-500">
            {placement.jobs?.title ?? "No job linked"}
            {placement.jobs?.department
              ? ` · ${placement.jobs.department}`
              : ""}
          </p>
        </div>
        {placement.status && <StateBadge state={placement.status} />}
      </div>

      {/* Summary cards */}
      <div className="grid gap-4 sm:grid-cols-4">
        <Card
          label="Start Date"
          value={new Date(placement.start_date).toLocaleDateString()}
        />
        <Card
          label="End Date"
          value={
            placement.end_date
              ? new Date(placement.end_date).toLocaleDateString()
              : "—"
          }
        />
        <Card label="Placement Fee" value={fee} />
        <Card
          label="Guarantee"
          value={
            placement.guarantee_days != null
              ? `${placement.guarantee_days} days`
              : "—"
          }
        />
      </div>

      {/* Readiness Panel */}
      <section className="rounded-lg border bg-white p-4 space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold text-gray-800">
            Start Readiness
          </h2>
          <span
            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
              passedCount === readiness.length
                ? "bg-green-100 text-green-700"
                : passedCount >= readiness.length - 2
                  ? "bg-amber-100 text-amber-700"
                  : "bg-red-100 text-red-600"
            }`}
          >
            {passedCount}/{readiness.length} gates
          </span>
        </div>
        <div className="space-y-1.5">
          {readiness.map((check, i) => (
            <ReadinessRow key={i} check={check} />
          ))}
        </div>
      </section>

      {/* Candidate */}
      <Section title="Candidate">
        <DL label="Name" value={candidateName} />
        <DL label="Email" value={placement.candidates?.email} />
        <DL label="Title" value={placement.candidates?.current_title} />
      </Section>

      {/* Job */}
      <Section title="Job">
        <DL label="Title" value={placement.jobs?.title} />
        <DL label="Department" value={placement.jobs?.department} />
        <DL label="Location" value={placement.jobs?.location} />
      </Section>

      {/* Placement Details */}
      <Section title="Placement Details">
        <DL label="Offer ID" value={placement.offer_id?.slice(0, 12)} />
        <DL label="Agency ID" value={placement.agency_id?.slice(0, 12)} />
        <DL
          label="Marketplace"
          value={
            placement.is_marketplace_placement != null
              ? placement.is_marketplace_placement
                ? "Yes"
                : "No"
              : null
          }
        />
        <DL
          label="Created"
          value={
            placement.created_at
              ? new Date(placement.created_at).toLocaleDateString()
              : null
          }
        />
      </Section>

      {/* Notes (inline from placement record, not the notes table) */}
      {placement.notes && (
        <section className="rounded-lg border bg-white p-4 space-y-2">
          <h2 className="text-sm font-semibold text-gray-800">Notes</h2>
          <p className="whitespace-pre-wrap text-sm text-gray-700">
            {placement.notes}
          </p>
        </section>
      )}

      {/* Starts Records */}
      {starts.starts.length > 0 && (
        <section className="rounded-lg border bg-white p-4 space-y-3">
          <h2 className="text-sm font-semibold text-gray-800">
            Start Records ({starts.total})
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="border-b bg-gray-50 text-left text-xs font-medium uppercase text-gray-500">
                  <th className="px-3 py-1.5">Start Date</th>
                  <th className="px-3 py-1.5">Employment</th>
                  <th className="px-3 py-1.5">Status</th>
                  <th className="px-3 py-1.5">Created</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {starts.starts.map((s) => (
                  <tr key={s.id} className="hover:bg-gray-50">
                    <td className="px-3 py-1.5 text-gray-700">
                      {new Date(s.start_date).toLocaleDateString()}
                    </td>
                    <td className="px-3 py-1.5 text-gray-600">
                      {s.employment_type}
                    </td>
                    <td className="px-3 py-1.5">
                      <StateBadge state={s.status} />
                    </td>
                    <td className="px-3 py-1.5 text-gray-400 text-xs">
                      {new Date(s.created_at).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* Activity Timeline */}
      <EntitySidebar entityType="placement" entityId={id} />
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

function ReadinessRow({ check }: { check: ReadinessCheck }) {
  return (
    <div className="flex items-center gap-3 rounded border px-3 py-2">
      <span
        className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white ${
          check.passed ? "bg-green-500" : "bg-gray-300"
        }`}
      >
        {check.passed ? "✓" : "—"}
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium text-gray-700">{check.label}</p>
        <p className="truncate text-xs text-gray-400">{check.detail}</p>
      </div>
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-lg border bg-white p-4 space-y-3">
      <h2 className="text-sm font-semibold text-gray-800">{title}</h2>
      <dl className="grid gap-x-6 gap-y-2 text-sm sm:grid-cols-2">
        {children}
      </dl>
    </section>
  );
}

function DL({
  label,
  value,
}: {
  label: string;
  value: string | null | undefined;
}) {
  return (
    <div>
      <dt className="text-xs text-gray-400">{label}</dt>
      <dd className="text-gray-700">{value ?? "—"}</dd>
    </div>
  );
}
