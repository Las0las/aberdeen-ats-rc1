import { redirect, notFound } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { getApplication } from "@/lib/applications/queries";
import { StateBadge } from "@/components/ui/badge";
import { JsonViewer } from "@/components/bench/json-viewer";
import { EntitySidebar } from "@/components/entity/entity-sidebar";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function ApplicationDetailPage({ params }: Props) {
  const { id } = await params;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  let application: Awaited<ReturnType<typeof getApplication>>;
  try {
    application = await getApplication(supabase, id);
  } catch {
    notFound();
  }

  const candidateName =
    [application.candidates?.first_name, application.candidates?.last_name]
      .filter(Boolean)
      .join(" ") || application.candidate_email || "Unknown Candidate";

  const jobTitle = application.jobs?.title ?? "No Job Linked";

  const appliedDate = application.applied_date ?? application.date_applied ?? null;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <Link
            href="/applications"
            className="text-xs text-gray-400 hover:text-gray-600"
          >
            ← Applications
          </Link>
          <h1 className="mt-1 text-lg font-semibold text-gray-900">
            {candidateName}
          </h1>
          <p className="text-sm text-gray-500">
            {application.candidates?.current_title
              ? `${application.candidates.current_title} · `
              : ""}
            Applying for{" "}
            {application.jobs?.id ? (
              <Link
                href={`/jobs/${application.jobs.id}`}
                className="text-blue-600 hover:underline"
              >
                {jobTitle}
              </Link>
            ) : (
              <span className="text-gray-400">{jobTitle}</span>
            )}
          </p>
        </div>
        <div className="flex items-center gap-2">
          {application.stage && <StateBadge state={application.stage} />}
          {application.status && application.status !== application.stage && (
            <StateBadge state={application.status} />
          )}
        </div>
      </div>

      {/* Summary cards */}
      <div className="grid gap-4 sm:grid-cols-4">
        <Card
          label="Stage"
          value={application.stage ?? application.current_stage ?? "—"}
          badge
        />
        <Card label="Status" value={application.status ?? "—"} badge />
        <Card
          label="Applied"
          value={appliedDate ? new Date(appliedDate).toLocaleDateString() : "—"}
        />
        <Card
          label="Updated"
          value={new Date(application.updated_at).toLocaleDateString()}
        />
      </div>

      {/* Candidate context */}
      <Section title="Candidate">
        <DL label="Name" value={candidateName} />
        <DL label="Email" value={application.candidates?.email ?? application.candidate_email ?? "—"} />
        <DL label="Title" value={application.candidates?.current_title} />
        {application.candidate_id && (
          <DL label="Profile">
            <Link
              href={`/candidates/${application.candidate_id}`}
              className="text-blue-600 hover:underline text-sm"
            >
              View candidate →
            </Link>
          </DL>
        )}
      </Section>

      {/* Job context */}
      <Section title="Job">
        <DL label="Title" value={application.jobs?.title} />
        <DL label="Department" value={application.jobs?.department} />
        <DL label="Location" value={application.jobs?.location} />
        {application.job_id && (
          <DL label="Listing">
            <Link
              href={`/jobs/${application.job_id}`}
              className="text-blue-600 hover:underline text-sm"
            >
              View job →
            </Link>
          </DL>
        )}
      </Section>

      {/* Application details */}
      <Section title="Details">
        <DL
          label="Favorite"
          value={
            application.is_favorite == null
              ? "—"
              : application.is_favorite
                ? "★ Yes"
                : "No"
          }
        />
        <DL
          label="Archived"
          value={
            application.is_archived == null
              ? "—"
              : application.is_archived
                ? "Yes"
                : "No"
          }
        />
        <DL label="Assigned To" value={application.assigned_to} />
        <DL label="LinkedIn Status" value={application.linkedin_application_status} />
        <DL
          label="Legacy Stage"
          value={application.current_stage_text_old || null}
        />
        <DL
          label="External Job ID"
          value={
            application.job_external_id != null
              ? String(application.job_external_id)
              : null
          }
        />
      </Section>

      {/* Record metadata */}
      <Section title="Record">
        <DL
          label="Created"
          value={new Date(application.created_at).toLocaleDateString()}
        />
        <DL
          label="Updated"
          value={new Date(application.updated_at).toLocaleDateString()}
        />
      </Section>

      {/* JSON viewers for explainability data */}
      {application.stage_history && (
        <JsonViewer data={application.stage_history} label="Stage History" />
      )}
      {application.screening_questions && (
        <JsonViewer
          data={application.screening_questions}
          label="Screening Questions"
        />
      )}
      {application.screening_data && (
        <JsonViewer data={application.screening_data} label="Screening Data" />
      )}

      {/* Activity + Notes sidebar — pass candidateId so NotesPanel works */}
      <EntitySidebar
        entityType="application"
        entityId={id}
        candidateId={application.candidate_id}
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
