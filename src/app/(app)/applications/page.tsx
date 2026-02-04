import { redirect } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { listApplications } from "@/lib/applications/queries";
import { applicationsListParamsSchema } from "@/lib/applications/schemas";
import { ApplicationStageValues } from "@/contracts/db/enums";
import { StateBadge } from "@/components/ui/badge";

interface Props {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export default async function ApplicationsListPage({ searchParams }: Props) {
  const sp = await searchParams;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const parsed = applicationsListParamsSchema.safeParse({
    stage: sp.stage ?? undefined,
    status: sp.status ?? undefined,
    search: sp.search ?? undefined,
    page: sp.page ?? undefined,
    limit: sp.limit ?? undefined,
  });
  const opts = parsed.success ? parsed.data : { page: 1, limit: 25 };

  let result: Awaited<ReturnType<typeof listApplications>>;
  try {
    result = await listApplications(supabase, opts);
  } catch {
    result = { applications: [], total: 0 };
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold text-gray-900">Applications</h1>
        <span className="text-xs text-gray-400">{result.total} total</span>
      </div>

      {/* Filters */}
      <form className="flex flex-wrap items-end gap-3">
        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1">
            Stage
          </label>
          <select
            name="stage"
            defaultValue={(sp.stage as string) ?? ""}
            className="rounded border px-2 py-1.5 text-sm w-44"
          >
            <option value="">All stages</option>
            {ApplicationStageValues.map((s) => (
              <option key={s} value={s}>
                {s}
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
            placeholder="Candidate, job, email…"
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
              <th className="px-4 py-2">Stage</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Applied</th>
              <th className="px-4 py-2">Updated</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {result.applications.length === 0 ? (
              <tr>
                <td
                  colSpan={6}
                  className="px-4 py-6 text-center text-gray-400"
                >
                  No applications found.
                </td>
              </tr>
            ) : (
              result.applications.map((a) => {
                const cName =
                  [a.candidates?.first_name, a.candidates?.last_name]
                    .filter(Boolean)
                    .join(" ") || a.candidate_email || "—";
                const jTitle = a.jobs?.title ?? "—";
                const appliedDate =
                  a.applied_date ?? a.date_applied ?? null;

                return (
                  <tr key={a.id} className="hover:bg-gray-50">
                    <td className="px-4 py-2">
                      <Link
                        href={`/applications/${a.id}`}
                        className="font-medium text-blue-600 hover:underline"
                      >
                        {cName}
                      </Link>
                    </td>
                    <td className="px-4 py-2 text-gray-600">
                      {a.jobs?.id ? (
                        <Link
                          href={`/jobs/${a.jobs.id}`}
                          className="text-blue-600 hover:underline"
                        >
                          {jTitle}
                        </Link>
                      ) : (
                        jTitle
                      )}
                    </td>
                    <td className="px-4 py-2">
                      {a.stage ? (
                        <StateBadge state={a.stage} />
                      ) : a.current_stage ? (
                        <StateBadge state={a.current_stage} />
                      ) : (
                        "—"
                      )}
                    </td>
                    <td className="px-4 py-2">
                      {a.status ? (
                        <StateBadge state={a.status} />
                      ) : (
                        "—"
                      )}
                    </td>
                    <td className="px-4 py-2 text-gray-500">
                      {appliedDate
                        ? new Date(appliedDate).toLocaleDateString()
                        : "—"}
                    </td>
                    <td className="px-4 py-2 text-gray-500">
                      {new Date(a.updated_at).toLocaleDateString()}
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
