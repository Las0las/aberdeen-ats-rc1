import { redirect, notFound } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { getCandidate } from "@/lib/candidates/queries";
import { StateBadge } from "@/components/ui/badge";
import { formatName } from "@/lib/utils";
import { EntitySidebar } from "@/components/entity/entity-sidebar";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function CandidateDetailPage({ params }: Props) {
  const { id } = await params;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  let candidate: Awaited<ReturnType<typeof getCandidate>>;
  try {
    candidate = await getCandidate(supabase, id);
  } catch {
    notFound();
  }

  const name = formatName(candidate.first_name, candidate.last_name);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <Link
            href="/candidates"
            className="text-xs text-gray-400 hover:text-gray-600"
          >
            ← Candidates
          </Link>
          <h1 className="mt-1 text-lg font-semibold text-gray-900">{name}</h1>
          <p className="text-sm text-gray-500">
            {candidate.current_title ?? "No title"}
            {candidate.current_company ? ` @ ${candidate.current_company}` : ""}
          </p>
        </div>
        {candidate.stage && <StateBadge state={candidate.stage} />}
      </div>

      {/* Summary cards */}
      <div className="grid gap-4 sm:grid-cols-3">
        <Card label="Location" value={candidate.location ?? candidate.city ?? "—"} />
        <Card label="Experience" value={candidate.years_experience != null ? `${candidate.years_experience} yrs` : "—"} />
        <Card label="Source" value={candidate.source ?? "—"} />
      </div>

      {/* Contact */}
      <Section title="Contact">
        <DL label="Email" value={candidate.email} />
        <DL label="Phone" value={candidate.phone} />
        <DL label="LinkedIn" value={candidate.linkedin_url} />
        <DL label="Timezone" value={candidate.timezone} />
      </Section>

      {/* Professional */}
      <Section title="Professional">
        <DL label="Headline" value={candidate.headline} />
        <DL label="Skills" value={candidate.skills?.join(", ") ?? null} />
        <DL label="Desired Roles" value={candidate.desired_roles?.join(", ") ?? null} />
        <DL label="Work Authorization" value={candidate.work_authorization} />
        <DL label="Open to Relocate" value={candidate.willing_to_relocate != null ? (candidate.willing_to_relocate ? "Yes" : "No") : null} />
      </Section>

      {/* Education */}
      <Section title="Education">
        <DL label="Degree" value={candidate.education_degree} />
        <DL label="Institution" value={candidate.education_institution} />
      </Section>

      {/* Notes & Activity */}
      <EntitySidebar entityType="candidate" entityId={id} />
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
