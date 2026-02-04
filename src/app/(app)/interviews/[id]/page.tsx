import { redirect, notFound } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { getInterview } from "@/lib/interviews/queries";
import { StateBadge } from "@/components/ui/badge";
import { formatName } from "@/lib/utils";
import { EntitySidebar } from "@/components/entity/entity-sidebar";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function InterviewDetailPage({ params }: Props) {
  const { id } = await params;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  let iv: Awaited<ReturnType<typeof getInterview>>;
  try {
    iv = await getInterview(supabase, id);
  } catch {
    notFound();
  }

  const candidateName = formatName(
    iv.candidates?.first_name,
    iv.candidates?.last_name,
  );

  const scheduledDisplay = iv.scheduled_start_at
    ? new Date(iv.scheduled_start_at).toLocaleString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : iv.scheduled_date ?? "Not scheduled";

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <Link
            href="/interviews"
            className="text-xs text-gray-400 hover:text-gray-600"
          >
            ← Interviews
          </Link>
          <h1 className="mt-1 text-lg font-semibold text-gray-900">
            {candidateName}
          </h1>
          <p className="text-sm text-gray-500">
            {iv.interview_type ?? "Interview"}
            {iv.interview_stage ? ` · ${iv.interview_stage}` : ""}
            {iv.interview_round != null ? ` · Round ${iv.interview_round}` : ""}
            {iv.jobs?.title ? ` → ${iv.jobs.title}` : ""}
          </p>
        </div>
        {iv.status && <StateBadge state={iv.status} />}
      </div>

      {/* Summary cards */}
      <div className="grid gap-4 sm:grid-cols-4">
        <Card label="Scheduled" value={scheduledDisplay} />
        <Card
          label="Duration"
          value={iv.duration_minutes ? `${iv.duration_minutes} min` : "—"}
        />
        <Card label="Platform" value={iv.meeting_platform ?? "—"} />
        <Card
          label="Overall Rating"
          value={iv.overall_rating != null ? `${iv.overall_rating}/5` : "—"}
        />
      </div>

      {/* Schedule & Location */}
      <Section title="Schedule & Location">
        <DL label="Date" value={iv.scheduled_date} />
        <DL label="Time" value={iv.scheduled_time} />
        <DL label="Timezone" value={iv.timezone} />
        <DL label="Location" value={iv.location} />
        <DL label="Meeting Link" value={iv.meeting_link} />
        <DL label="Meeting ID" value={iv.meeting_id} />
        <DL
          label="Completed At"
          value={iv.completed_at ? new Date(iv.completed_at).toLocaleString() : null}
        />
      </Section>

      {/* Participants */}
      <Section title="Participants">
        <DL
          label="Interviewers"
          value={iv.interviewer_names?.join(", ") ?? null}
        />
        <DL
          label="Candidate Confirmed"
          value={iv.candidate_confirmed != null ? (iv.candidate_confirmed ? "Yes" : "No") : null}
        />
        <DL
          label="Interviewers Confirmed"
          value={iv.interviewers_confirmed != null ? (iv.interviewers_confirmed ? "Yes" : "No") : null}
        />
      </Section>

      {/* Candidate + Job links */}
      <Section title="Related Entities">
        <DL
          label="Candidate"
          value={candidateName}
        />
        <DL label="Email" value={iv.candidates?.email} />
        <DL label="Job" value={iv.jobs?.title} />
        <DL label="Department" value={iv.jobs?.department} />
      </Section>

      {/* Scores */}
      {(iv.overall_rating != null ||
        iv.technical_score != null ||
        iv.cultural_fit_score != null ||
        iv.communication_score != null) && (
        <section className="rounded-lg border bg-white p-4 space-y-3">
          <h2 className="text-sm font-semibold text-gray-800">Scores</h2>
          <div className="grid gap-3 sm:grid-cols-4">
            <ScoreCard label="Overall" value={iv.overall_rating} />
            <ScoreCard label="Technical" value={iv.technical_score} />
            <ScoreCard label="Cultural Fit" value={iv.cultural_fit_score} />
            <ScoreCard label="Communication" value={iv.communication_score} />
          </div>
        </section>
      )}

      {/* Feedback */}
      {(iv.strengths || iv.weaknesses || iv.feedback_notes) && (
        <section className="rounded-lg border bg-white p-4 space-y-3">
          <h2 className="text-sm font-semibold text-gray-800">Feedback</h2>
          {iv.strengths && (
            <div>
              <p className="text-xs font-medium text-gray-400">Strengths</p>
              <p className="mt-0.5 whitespace-pre-wrap text-sm text-gray-700">
                {iv.strengths}
              </p>
            </div>
          )}
          {iv.weaknesses && (
            <div>
              <p className="text-xs font-medium text-gray-400">Weaknesses</p>
              <p className="mt-0.5 whitespace-pre-wrap text-sm text-gray-700">
                {iv.weaknesses}
              </p>
            </div>
          )}
          {iv.feedback_notes && (
            <div>
              <p className="text-xs font-medium text-gray-400">Notes</p>
              <p className="mt-0.5 whitespace-pre-wrap text-sm text-gray-700">
                {iv.feedback_notes}
              </p>
            </div>
          )}
        </section>
      )}

      {/* Recommendation */}
      {(iv.recommendation || iv.next_steps) && (
        <Section title="Recommendation & Next Steps">
          <DL label="Recommendation" value={iv.recommendation} />
          <DL label="Notes" value={iv.recommendation_notes} />
          <DL label="Next Steps" value={iv.next_steps} />
          <DL
            label="Follow-up Required"
            value={
              iv.follow_up_required != null
                ? iv.follow_up_required
                  ? `Yes${iv.follow_up_date ? ` (${new Date(iv.follow_up_date).toLocaleDateString()})` : ""}`
                  : "No"
                : null
            }
          />
        </Section>
      )}

      {/* Cancellation */}
      {iv.cancelled_at && (
        <section className="rounded-lg border border-red-200 bg-red-50 p-4 space-y-2">
          <h2 className="text-sm font-semibold text-red-700">Cancelled</h2>
          <p className="text-sm text-red-600">
            {new Date(iv.cancelled_at).toLocaleString()}
          </p>
          {iv.cancellation_reason && (
            <p className="text-sm text-red-600">{iv.cancellation_reason}</p>
          )}
        </section>
      )}

      {/* Activity Timeline */}
      <EntitySidebar entityType="interview" entityId={id} />
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

function ScoreCard({ label, value }: { label: string; value: number | null }) {
  if (value == null) return null;
  const color =
    value >= 4
      ? "text-green-700"
      : value >= 3
        ? "text-amber-700"
        : "text-red-600";
  return (
    <div className="rounded border bg-gray-50 p-3 text-center">
      <p className="text-xs text-gray-400">{label}</p>
      <p className={`mt-1 text-lg font-semibold tabular-nums ${color}`}>
        {value}<span className="text-xs text-gray-400">/5</span>
      </p>
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
