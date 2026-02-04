import { redirect, notFound } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { getOffer } from "@/lib/offers/queries";
import { StateBadge } from "@/components/ui/badge";
import { formatName } from "@/lib/utils";
import { EntitySidebar } from "@/components/entity/entity-sidebar";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function OfferDetailPage({ params }: Props) {
  const { id } = await params;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  let offer: Awaited<ReturnType<typeof getOffer>>;
  try {
    offer = await getOffer(supabase, id);
  } catch {
    notFound();
  }

  const candidateName = formatName(
    offer.submittals?.candidates?.first_name,
    offer.submittals?.candidates?.last_name,
  );
  const salary = `${offer.salary_currency ?? "$"}${offer.salary_amount.toLocaleString()}`;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <Link
            href="/offers"
            className="text-xs text-gray-400 hover:text-gray-600"
          >
            ← Offers
          </Link>
          <h1 className="mt-1 text-lg font-semibold text-gray-900">
            Offer — {candidateName}
          </h1>
          <p className="text-sm text-gray-500">
            {offer.submittals?.candidates?.current_title ?? "—"}
            {offer.submittals?.jobs?.title
              ? ` → ${offer.submittals.jobs.title}`
              : ""}
          </p>
        </div>
        {offer.status && <StateBadge state={offer.status} />}
      </div>

      {/* Summary cards */}
      <div className="grid gap-4 sm:grid-cols-4">
        <Card label="Salary" value={salary} />
        <Card
          label="Equity"
          value={
            offer.equity_percentage != null
              ? `${offer.equity_percentage}%`
              : "—"
          }
        />
        <Card
          label="Start Date"
          value={
            offer.start_date
              ? new Date(offer.start_date).toLocaleDateString()
              : "—"
          }
        />
        <Card
          label="Created"
          value={
            offer.created_at
              ? new Date(offer.created_at).toLocaleDateString()
              : "—"
          }
        />
      </div>

      {/* Lifecycle */}
      <section className="rounded-lg border bg-white p-4 space-y-3">
        <h2 className="text-sm font-semibold text-gray-800">
          Offer Lifecycle
        </h2>
        <div className="grid gap-4 sm:grid-cols-3">
          <LifecycleStep
            label="Sent"
            date={offer.sent_at}
            color="bg-blue-500"
          />
          <LifecycleStep
            label="Accepted"
            date={offer.accepted_at}
            color="bg-green-500"
          />
          <LifecycleStep
            label="Declined"
            date={offer.declined_at}
            color="bg-red-500"
          />
        </div>
      </section>

      {/* Candidate */}
      <Section title="Candidate">
        <DL label="Name" value={candidateName} />
        <DL label="Email" value={offer.submittals?.candidates?.email} />
        <DL
          label="Title"
          value={offer.submittals?.candidates?.current_title}
        />
      </Section>

      {/* Job */}
      <Section title="Job">
        <DL label="Title" value={offer.submittals?.jobs?.title} />
        <DL label="Department" value={offer.submittals?.jobs?.department} />
        <DL label="Location" value={offer.submittals?.jobs?.location} />
      </Section>

      {/* Offer Letter */}
      {offer.offer_letter_url && (
        <section className="rounded-lg border bg-white p-4 space-y-2">
          <h2 className="text-sm font-semibold text-gray-800">
            Offer Letter
          </h2>
          <a
            href={offer.offer_letter_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-blue-600 hover:underline"
          >
            {offer.offer_letter_url}
          </a>
        </section>
      )}

      {/* Notes */}
      {offer.notes && (
        <section className="rounded-lg border bg-white p-4 space-y-2">
          <h2 className="text-sm font-semibold text-gray-800">Notes</h2>
          <p className="whitespace-pre-wrap text-sm text-gray-700">
            {offer.notes}
          </p>
        </section>
      )}

      {/* Activity */}
      <EntitySidebar entityType="offer" entityId={id} />
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

function LifecycleStep({
  label,
  date,
  color,
}: {
  label: string;
  date: string | null;
  color: string;
}) {
  const active = date != null;
  return (
    <div
      className={`flex items-center gap-3 rounded border p-3 ${active ? "bg-white" : "bg-gray-50 opacity-50"}`}
    >
      <span
        className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold text-white ${active ? color : "bg-gray-300"}`}
      >
        {active ? "✓" : "—"}
      </span>
      <div>
        <p className="text-xs font-medium text-gray-700">{label}</p>
        {active && (
          <p className="text-[10px] text-gray-400">
            {new Date(date!).toLocaleString()}
          </p>
        )}
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
