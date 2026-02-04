import { redirect, notFound } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { getSubmittal } from "@/lib/submittals/queries";
import { StateBadge, ScoreBadge } from "@/components/ui/badge";
import { JsonViewer } from "@/components/bench/json-viewer";
import { formatName } from "@/lib/utils";
import { EntitySidebar } from "@/components/entity/entity-sidebar";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function SubmittalDetailPage({ params }: Props) {
  const { id } = await params;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  let submittal: Awaited<ReturnType<typeof getSubmittal>>;
  try {
    submittal = await getSubmittal(supabase, id);
  } catch {
    notFound();
  }

  const candidateName = formatName(
    submittal.candidates?.first_name,
    submittal.candidates?.last_name,
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <Link
            href="/submittals"
            className="text-xs text-gray-400 hover:text-gray-600"
          >
            ← Submittals
          </Link>
          <h1 className="mt-1 text-lg font-semibold text-gray-900">
            {candidateName}
          </h1>
          <p className="text-sm text-gray-500">
            {submittal.candidates?.current_title ?? "No title"} →{" "}
            {submittal.jobs?.title ?? "Unknown Job"}
          </p>
        </div>
        <StateBadge state={submittal.state} />
      </div>

      {/* Summary cards */}
      <div className="grid gap-4 sm:grid-cols-4">
        <Card
          label="Confidence"
          value={
            submittal.confidence_score != null
              ? `${Math.round(submittal.confidence_score * 100)}%`
              : "—"
          }
        />
        <Card label="Employment" value={submittal.employment_type} />
        <Card label="Channel" value={submittal.client_channel} />
        <Card
          label="Updated"
          value={new Date(submittal.updated_at).toLocaleDateString()}
        />
      </div>

      {/* Candidate info */}
      <Section title="Candidate">
        <DL label="Name" value={candidateName} />
        <DL label="Email" value={submittal.email ?? submittal.candidates?.email} />
        <DL label="Phone" value={submittal.phone} />
        <DL label="LinkedIn" value={submittal.linkedin_url} />
        <DL label="Location" value={submittal.location_text} />
      </Section>

      {/* Job info */}
      <Section title="Job">
        <DL label="Title" value={submittal.jobs?.title} />
        <DL label="Department" value={submittal.jobs?.department} />
        <DL label="Location" value={submittal.jobs?.location} />
      </Section>

      {/* AI Summary */}
      {submittal.ai_summary && (
        <section className="rounded-lg border bg-white p-4 space-y-2">
          <h2 className="text-sm font-semibold text-gray-800">AI Summary</h2>
          <p className="whitespace-pre-wrap text-sm text-gray-700">
            {submittal.ai_summary}
          </p>
        </section>
      )}

      {/* Final Summary */}
      {submittal.final_summary && (
        <section className="rounded-lg border bg-white p-4 space-y-2">
          <h2 className="text-sm font-semibold text-gray-800">
            Final Summary (Recruiter Edited)
          </h2>
          <p className="whitespace-pre-wrap text-sm text-gray-700">
            {submittal.final_summary}
          </p>
        </section>
      )}

      {/* AI Analysis — Score Snapshot */}
      {submittal.score_snapshot && (
        <section className="rounded-lg border bg-white p-4 space-y-2">
          <h2 className="text-sm font-semibold text-gray-800">
            Score Snapshot (AI Analysis)
          </h2>
          <JsonViewer
            data={submittal.score_snapshot}
            label="Score Details"
            defaultOpen
          />
        </section>
      )}

      {/* Risk Flags */}
      {submittal.risk_flags && (
        <section className="rounded-lg border bg-white p-4 space-y-2">
          <h2 className="text-sm font-semibold text-gray-800">Risk Flags</h2>
          <JsonViewer data={submittal.risk_flags} label="Flags" defaultOpen />
        </section>
      )}

      {/* Availability */}
      <Section title="Availability">
        <DL label="Start Availability" value={submittal.start_availability} />
        <DL
          label="Interview Availability"
          value={
            submittal.interview_availability
              ? JSON.stringify(submittal.interview_availability)
              : null
          }
        />
        <DL label="Comp Unit" value={submittal.comp_unit} />
        <DL label="Currency" value={submittal.currency_code} />
      </Section>

      {/* Notes & Activity */}
      <EntitySidebar entityType="submittal" entityId={id} />
    </div>
  );
}

function Card({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border bg-white p-4">
      <p className="text-xs font-medium uppercase text-gray-400">{label}</p>
      <p className="mt-1 text-sm text-gray-800">{value}</p>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-lg border bg-white p-4 space-y-3">
      <h2 className="text-sm font-semibold text-gray-800">{title}</h2>
      <dl className="grid gap-x-6 gap-y-2 text-sm sm:grid-cols-2">
        {children}
      </dl>
    </section>
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
