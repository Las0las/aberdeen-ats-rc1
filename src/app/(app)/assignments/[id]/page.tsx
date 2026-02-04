import { redirect, notFound } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { getAssignment } from "@/lib/assignments/queries";
import { StateBadge } from "@/components/ui/badge";
import { EntitySidebar } from "@/components/entity/entity-sidebar";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function AssignmentDetailPage({ params }: Props) {
  const { id } = await params;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  let assignment: Awaited<ReturnType<typeof getAssignment>>;
  try {
    assignment = await getAssignment(supabase, id);
  } catch {
    notFound();
  }

  const candidateName =
    [assignment.candidates?.first_name, assignment.candidates?.last_name]
      .filter(Boolean)
      .join(" ") || "Unknown Consultant";

  const jobTitle = assignment.jobs?.title ?? "No Job Linked";

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <Link
            href="/assignments"
            className="text-xs text-gray-400 hover:text-gray-600"
          >
            ← Assignments
          </Link>
          <h1 className="mt-1 text-lg font-semibold text-gray-900">
            {candidateName}
          </h1>
          <p className="text-sm text-gray-500">
            {assignment.candidates?.current_title
              ? `${assignment.candidates.current_title} · `
              : ""}
            Assigned to{" "}
            {assignment.jobs?.id ? (
              <Link
                href={`/jobs/${assignment.jobs.id}`}
                className="text-blue-600 hover:underline"
              >
                {jobTitle}
              </Link>
            ) : (
              <span className="text-gray-400">{jobTitle}</span>
            )}
            {assignment.client_name && (
              <span className="text-gray-400">
                {" "}
                at {assignment.client_name}
              </span>
            )}
          </p>
        </div>
        <StateBadge state={assignment.state} />
      </div>

      {/* Summary cards */}
      <div className="grid gap-4 sm:grid-cols-4">
        <Card label="State" value={assignment.state} badge />
        <Card
          label="Engagement"
          value={assignment.engagement_type ?? "—"}
        />
        <Card
          label="Start Date"
          value={
            assignment.start_date
              ? new Date(assignment.start_date).toLocaleDateString()
              : "—"
          }
        />
        <Card
          label="End Date"
          value={
            assignment.current_end_date
              ? new Date(assignment.current_end_date).toLocaleDateString()
              : "—"
          }
        />
      </div>

      {/* Candidate context */}
      <Section title="Consultant">
        <DL label="Name" value={candidateName} />
        <DL label="Email" value={assignment.candidates?.email} />
        <DL label="Title" value={assignment.candidates?.current_title} />
        <DL label="Profile">
          <Link
            href={`/candidates/${assignment.candidate_id}`}
            className="text-blue-600 hover:underline text-sm"
          >
            View candidate →
          </Link>
        </DL>
      </Section>

      {/* Job context */}
      <Section title="Job">
        <DL label="Title" value={assignment.jobs?.title} />
        <DL label="Department" value={assignment.jobs?.department} />
        <DL label="Location" value={assignment.jobs?.location} />
        <DL label="Client" value={assignment.client_name} />
        <DL label="Listing">
          <Link
            href={`/jobs/${assignment.job_id}`}
            className="text-blue-600 hover:underline text-sm"
          >
            View job →
          </Link>
        </DL>
      </Section>

      {/* Details */}
      <Section title="Details">
        <DL label="Created By" value={assignment.created_by} />
        {assignment.application_id && (
          <DL label="Application">
            <Link
              href={`/applications/${assignment.application_id}`}
              className="text-blue-600 hover:underline text-sm"
            >
              View application →
            </Link>
          </DL>
        )}
      </Section>

      {/* Notes */}
      {assignment.notes && (
        <section className="rounded-lg border bg-white p-4 space-y-2">
          <h2 className="text-sm font-semibold text-gray-800">Notes</h2>
          <p className="whitespace-pre-wrap text-sm text-gray-700 leading-relaxed">
            {assignment.notes}
          </p>
        </section>
      )}

      {/* Record metadata */}
      <Section title="Record">
        <DL
          label="Created"
          value={new Date(assignment.created_at).toLocaleDateString()}
        />
        <DL
          label="Updated"
          value={new Date(assignment.updated_at).toLocaleDateString()}
        />
      </Section>

      {/* Activity + Notes sidebar — pass candidateId so NotesPanel shows candidate notes */}
      <EntitySidebar
        entityType="assignment"
        entityId={id}
        candidateId={assignment.candidate_id}
      />
    </div>
  );
}

/* ── Helper components ── */

function Card({
  label,
  value,
  badge,
}: {
  label: string;
  value: string;
  badge?: boolean;
}) {
  return (
    <div className="rounded-lg border bg-white p-4">
      <p className="text-xs font-medium uppercase text-gray-400">{label}</p>
      {badge && value !== "—" ? (
        <div className="mt-1">
          <StateBadge state={value} />
        </div>
      ) : (
        <p className="mt-1 truncate text-sm text-gray-800">{value}</p>
      )}
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
  children,
}: {
  label: string;
  value?: string | null;
  children?: React.ReactNode;
}) {
  return (
    <div>
      <dt className="text-xs text-gray-400">{label}</dt>
      <dd className="text-gray-700">{children ?? value ?? "—"}</dd>
    </div>
  );
}
