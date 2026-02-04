import { redirect } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { listAssignments } from "@/lib/assignments/queries";
import { assignmentsListParamsSchema } from "@/lib/assignments/schemas";
import { AssignmentStateValues } from "@/contracts/db/enums";
import { StateBadge } from "@/components/ui/badge";

interface Props {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export default async function AssignmentsListPage({ searchParams }: Props) {
  const sp = await searchParams;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const parsed = assignmentsListParamsSchema.safeParse({
    state: sp.state ?? undefined,
    search: sp.search ?? undefined,
    page: sp.page ?? undefined,
    limit: sp.limit ?? undefined,
  });
  const opts = parsed.success ? parsed.data : { page: 1, limit: 25 };

  let result: Awaited<ReturnType<typeof listAssignments>>;
  try {
    result = await listAssignments(supabase, opts);
  } catch {
    result = { assignments: [], total: 0 };
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold text-gray-900">Assignments</h1>
        <span className="text-xs text-gray-400">{result.total} total</span>
      </div>

      {/* Filters */}
      <form className="flex flex-wrap items-end gap-3">
        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1">
            State
          </label>
          <select
            name="state"
            defaultValue={(sp.state as string) ?? ""}
            className="rounded border px-2 py-1.5 text-sm w-44"
          >
            <option value="">All states</option>
            {AssignmentStateValues.map((s) => (
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
            placeholder="Candidate, job, client…"
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
              <th className="px-4 py-2">Consultant</th>
              <th className="px-4 py-2">Job / Client</th>
              <th className="px-4 py-2">State</th>
              <th className="px-4 py-2">Type</th>
              <th className="px-4 py-2">Start</th>
              <th className="px-4 py-2">End</th>
              <th className="px-4 py-2">Updated</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {result.assignments.length === 0 ? (
              <tr>
                <td
                  colSpan={7}
                  className="px-4 py-6 text-center text-gray-400"
                >
                  No assignments found.
                </td>
              </tr>
            ) : (
              result.assignments.map((a) => {
                const cName =
                  [a.candidates?.first_name, a.candidates?.last_name]
                    .filter(Boolean)
                    .join(" ") || "—";
                const jTitle = a.jobs?.title ?? "—";

                return (
                  <tr key={a.id} className="hover:bg-gray-50">
                    <td className="px-4 py-2">
                      <Link
                        href={`/assignments/${a.id}`}
                        className="font-medium text-blue-600 hover:underline"
                      >
                        {cName}
                      </Link>
                    </td>
                    <td className="px-4 py-2 text-gray-600">
                      <div>
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
                      </div>
                      {a.client_name && (
                        <div className="text-xs text-gray-400">
                          {a.client_name}
                        </div>
                      )}
                    </td>
                    <td className="px-4 py-2">
                      <StateBadge state={a.state} />
                    </td>
                    <td className="px-4 py-2 text-gray-500">
                      {a.engagement_type ?? "—"}
                    </td>
                    <td className="px-4 py-2 text-gray-500">
                      {a.start_date
                        ? new Date(a.start_date).toLocaleDateString()
                        : "—"}
                    </td>
                    <td className="px-4 py-2 text-gray-500">
                      {a.current_end_date
                        ? new Date(a.current_end_date).toLocaleDateString()
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
