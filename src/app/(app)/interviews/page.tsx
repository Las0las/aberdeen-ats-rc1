import { redirect } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { listInterviews } from "@/lib/interviews/queries";
import { interviewsListParamsSchema } from "@/lib/interviews/schemas";
import { InterviewStateValues } from "@/contracts/db/enums";
import { StateBadge } from "@/components/ui/badge";
import { formatName } from "@/lib/utils";

interface Props {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export default async function InterviewsListPage({ searchParams }: Props) {
  const sp = await searchParams;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const parsed = interviewsListParamsSchema.safeParse({
    status: sp.status ?? undefined,
    search: sp.search ?? undefined,
    page: sp.page ?? undefined,
    limit: sp.limit ?? undefined,
  });

  const opts = parsed.success
    ? parsed.data
    : { page: 1, limit: 25 };

  let interviews: Awaited<ReturnType<typeof listInterviews>>;
  try {
    interviews = await listInterviews(supabase, opts);
  } catch {
    interviews = { interviews: [], total: 0 };
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold text-gray-900">Interviews</h1>
        <span className="text-xs text-gray-400">
          {interviews.total} total
        </span>
      </div>

      {/* Filters */}
      <form className="flex flex-wrap items-end gap-3">
        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1">
            Status
          </label>
          <select
            name="status"
            defaultValue={(sp.status as string) ?? ""}
            className="rounded border px-2 py-1.5 text-sm"
          >
            <option value="">All statuses</option>
            {InterviewStateValues.map((s) => (
              <option key={s} value={s}>
                {s.replace(/_/g, " ")}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1">
            Search
          </label>
          <input
            name="search"
            defaultValue={(sp.search as string) ?? ""}
            placeholder="Candidate, job, type…"
            className="rounded border px-2 py-1.5 text-sm w-56"
          />
        </div>
        <button
          type="submit"
          className="rounded bg-gray-900 px-3 py-1.5 text-xs font-medium text-white hover:bg-gray-800"
        >
          Filter
        </button>
      </form>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg border bg-white">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="border-b bg-gray-50 text-left text-xs font-medium uppercase text-gray-500">
              <th className="px-4 py-2">Candidate</th>
              <th className="px-4 py-2">Job</th>
              <th className="px-4 py-2">Type</th>
              <th className="px-4 py-2">Scheduled</th>
              <th className="px-4 py-2">Duration</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Rating</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {interviews.interviews.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-4 py-6 text-center text-gray-400">
                  No interviews found.
                </td>
              </tr>
            ) : (
              interviews.interviews.map((iv) => {
                const cName = formatName(
                  iv.candidates?.first_name,
                  iv.candidates?.last_name,
                );
                const scheduled = iv.scheduled_start_at
                  ? new Date(iv.scheduled_start_at).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })
                  : iv.scheduled_date ?? "—";
                return (
                  <tr key={iv.id} className="hover:bg-gray-50">
                    <td className="px-4 py-2">
                      <Link
                        href={`/interviews/${iv.id}`}
                        className="font-medium text-blue-600 hover:underline"
                      >
                        {cName}
                      </Link>
                    </td>
                    <td className="px-4 py-2 text-gray-600">
                      {iv.jobs?.title ?? "—"}
                    </td>
                    <td className="px-4 py-2 text-gray-600">
                      {iv.interview_type ?? "—"}
                    </td>
                    <td className="px-4 py-2 text-gray-600">{scheduled}</td>
                    <td className="px-4 py-2 text-gray-600">
                      {iv.duration_minutes ? `${iv.duration_minutes}m` : "—"}
                    </td>
                    <td className="px-4 py-2">
                      {iv.status ? <StateBadge state={iv.status} /> : "—"}
                    </td>
                    <td className="px-4 py-2 text-gray-600">
                      {iv.overall_rating != null ? `${iv.overall_rating}/5` : "—"}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
