import { redirect } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { listJobs } from "@/lib/jobs/queries";
import { jobListParamsSchema } from "@/lib/jobs/schemas";
import { JobStatusValues } from "@/contracts/db/enums";
import { StateBadge } from "@/components/ui/badge";

interface Props {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export default async function JobsListPage({ searchParams }: Props) {
  const sp = await searchParams;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const parsed = jobListParamsSchema.safeParse({
    status: sp.status ?? undefined,
    search: sp.search ?? undefined,
    page: sp.page ?? undefined,
    limit: sp.limit ?? undefined,
  });

  const filters = parsed.success ? parsed.data : { page: 1, limit: 25 };

  let result: Awaited<ReturnType<typeof listJobs>> = { jobs: [], total: 0 };
  let fetchError: string | null = null;

  try {
    result = await listJobs(supabase, filters);
  } catch (err: unknown) {
    fetchError = err instanceof Error ? err.message : "Failed to load jobs";
  }

  return (
    <div className="space-y-4">
      <h1 className="text-lg font-semibold text-gray-900">Jobs</h1>

      {/* Filters */}
      <form className="flex flex-wrap items-end gap-3">
        <label className="block text-sm">
          <span className="text-xs font-medium text-gray-500">Status</span>
          <select
            name="status"
            defaultValue={(sp.status as string) ?? ""}
            className="mt-1 block rounded border px-2 py-1.5 text-sm"
          >
            <option value="">All</option>
            {JobStatusValues.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </label>

        <label className="block text-sm">
          <span className="text-xs font-medium text-gray-500">Search</span>
          <input
            name="search"
            type="text"
            defaultValue={(sp.search as string) ?? ""}
            placeholder="Title, department, location…"
            className="mt-1 block rounded border px-2 py-1.5 text-sm"
          />
        </label>

        <button
          type="submit"
          className="rounded bg-gray-900 px-3 py-1.5 text-sm font-medium text-white hover:bg-gray-800"
        >
          Filter
        </button>
      </form>

      {fetchError ? (
        <div className="rounded border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {fetchError}
        </div>
      ) : result.jobs.length === 0 ? (
        <div className="rounded-lg border bg-white p-8 text-center text-sm text-gray-500">
          No jobs found.
        </div>
      ) : (
        <div className="overflow-hidden rounded-lg border bg-white">
          <table className="min-w-full divide-y text-sm">
            <thead className="bg-gray-50 text-left text-xs font-medium uppercase text-gray-500">
              <tr>
                <th className="px-4 py-3">Title</th>
                <th className="px-4 py-3">Department</th>
                <th className="px-4 py-3">Location</th>
                <th className="px-4 py-3">Type</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-right">Openings</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {result.jobs.map((j) => (
                <tr key={j.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium text-gray-900">
                    <Link
                      href={`/jobs/${j.id}`}
                      className="hover:text-blue-600 hover:underline"
                    >
                      {j.title}
                    </Link>
                  </td>
                  <td className="px-4 py-3 text-gray-600">
                    {j.department ?? "—"}
                  </td>
                  <td className="px-4 py-3 text-gray-500">
                    {j.location ?? "—"}
                  </td>
                  <td className="px-4 py-3 text-xs text-gray-500">
                    {j.employment_type ?? "—"}
                  </td>
                  <td className="px-4 py-3">
                    {j.status ? (
                      <StateBadge state={j.status} />
                    ) : (
                      <span className="text-xs text-gray-400">—</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-right tabular-nums text-gray-700">
                    {j.openings ?? "—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="border-t px-4 py-2 text-xs text-gray-400">
            {result.total} total jobs
          </div>
        </div>
      )}
    </div>
  );
}
