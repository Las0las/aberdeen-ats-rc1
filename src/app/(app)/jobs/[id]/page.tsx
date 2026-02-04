import { redirect, notFound } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { getJob } from "@/lib/jobs/queries";
import { StateBadge } from "@/components/ui/badge";
import { EntitySidebar } from "@/components/entity/entity-sidebar";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function JobDetailPage({ params }: Props) {
  const { id } = await params;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  let job: Awaited<ReturnType<typeof getJob>>;
  try {
    job = await getJob(supabase, id);
  } catch {
    notFound();
  }

  const salary =
    job.salary_min != null || job.salary_max != null
      ? [
          job.salary_min != null ? `${job.salary_currency ?? "$"}${job.salary_min.toLocaleString()}` : "—",
          job.salary_max != null ? `${job.salary_currency ?? "$"}${job.salary_max.toLocaleString()}` : "—",
        ].join(" – ")
      : "—";

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <Link
            href="/jobs"
            className="text-xs text-gray-400 hover:text-gray-600"
          >
            ← Jobs
          </Link>
          <h1 className="mt-1 text-lg font-semibold text-gray-900">
            {job.title}
          </h1>
          <p className="text-sm text-gray-500">
            {[job.department, job.location, job.employment_type]
              .filter(Boolean)
              .join(" · ") || "—"}
          </p>
        </div>
        {job.status && <StateBadge state={job.status} />}
      </div>

      {/* Summary cards */}
      <div className="grid gap-4 sm:grid-cols-4">
        <Card label="Openings" value={job.openings != null ? String(job.openings) : "—"} />
        <Card label="Salary Range" value={salary} />
        <Card label="Priority" value={job.priority ?? "—"} />
        <Card label="Experience" value={job.experience_level ?? "—"} />
      </div>

      {/* Description */}
      {job.description && (
        <Section title="Description">
          <div className="prose prose-sm max-w-none text-gray-700 whitespace-pre-wrap">
            {job.description}
          </div>
        </Section>
      )}

      {/* Requirements */}
      {job.requirements && (
        <Section title="Requirements">
          <div className="prose prose-sm max-w-none text-gray-700 whitespace-pre-wrap">
            {job.requirements}
          </div>
        </Section>
      )}

      {/* Benefits */}
      {job.benefits && (
        <Section title="Benefits">
          <div className="prose prose-sm max-w-none text-gray-700 whitespace-pre-wrap">
            {job.benefits}
          </div>
        </Section>
      )}

      {/* Metadata */}
      <section className="rounded-lg border bg-white p-4 space-y-3">
        <h2 className="text-sm font-semibold text-gray-800">Details</h2>
        <dl className="grid gap-x-6 gap-y-2 text-sm sm:grid-cols-2">
          <DL label="ATS Job ID" value={job.ats_job_id} />
          <DL label="Source" value={job.source} />
          <DL label="URL" value={job.url} />
          <DL label="Created" value={job.created_at ? new Date(job.created_at).toLocaleDateString() : null} />
          <DL label="Updated" value={job.updated_at ? new Date(job.updated_at).toLocaleDateString() : null} />
        </dl>
      </section>

      {/* Notes & Activity */}
      <EntitySidebar entityType="job" entityId={id} />
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
      {children}
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
