import { redirect } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { listSubmittals } from "@/lib/submittals/queries";
import { submittalListParamsSchema } from "@/lib/submittals/schemas";
import { SubmittalStateValues } from "@/contracts/db/enums";
import { StateBadge, ScoreBadge } from "@/components/ui/badge";
import { formatName } from "@/lib/utils";

interface Props {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export default async function SubmittalsListPage({ searchParams }: Props) {
  const sp = await searchParams;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const parsed = submittalListParamsSchema.safeParse({
    state: sp.state ?? undefined,
    search: sp.search ?? undefined,
    page: sp.page ?? undefined,
    limit: sp.limit ?? undefined,
  });

  const filters = parsed.success ? parsed.data : { page: 1, limit: 25 };

  let result: Awaited<ReturnType<typeof listSubmittals>> = {
    submittals: [],
    total: 0,
  };
  let fetchError: string | null = null;

  try {
    result = await listSubmittals(supabase, filters);
  } catch (err: unknown) {
    fetchError = err instanceof Error ? err.message : "Failed to load submittals";
  }

  return (
    <div className="space-y-4">
      <h1 className="text-lg font-semibold text-gray-900">Submittals</h1>

      {/* Filters */}
      <form className="flex flex-wrap items-end gap-3">
        <label className="block text-sm">
          <span className="text-xs font-medium text-gray-500">State</span>
          <select
            name="state"
            defaultValue={(sp.state as string) ?? ""}
            className="mt-1 block rounded border px-2 py-1.5 text-sm"
          >
            <option value="">All</option>
            {SubmittalStateValues.map((s) => (
              <option key={s} value={s}>
                {s.replace(/_/g, " ")}
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
            placeholder="Candidate or job…"
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
      ) : result.submittals.length === 0 ? (
        <div className="rounded-lg border bg-white p-8 text-center text-sm text-gray-500">
          No submittals found.
        </div>
      ) : (
        <div className="overflow-hidden rounded-lg border bg-white">
          <table className="min-w-full divide-y text-sm">
            <thead className="bg-gray-50 text-left text-xs font-medium uppercase text-gray-500">
              <tr>
                <th className="px-4 py-3">Candidate</th>
                <th className="px-4 py-3">Job</th>
                <th className="px-4 py-3">State</th>
                <th className="px-4 py-3">Confidence</th>
                <th className="px-4 py-3">Channel</th>
                <th className="px-4 py-3">Updated</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {result.submittals.map((s) => (
                <tr key={s.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium text-gray-900">
                    <Link
                      href={`/submittals/${s.id}`}
                      className="hover:text-blue-600 hover:underline"
                    >
                      {formatName(
                        s.candidates?.first_name,
                        s.candidates?.last_name,
                      )}
                    </Link>
                  </td>
                  <td className="px-4 py-3 text-gray-600">
                    {s.jobs?.title ?? "—"}
                  </td>
                  <td className="px-4 py-3">
                    <StateBadge state={s.state} />
                  </td>
                  <td className="px-4 py-3">
                    {s.confidence_score != null ? (
                      <ScoreBadge score={s.confidence_score} />
                    ) : (
                      <span className="text-xs text-gray-400">—</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-xs text-gray-500">
                    {s.client_channel}
                  </td>
                  <td className="px-4 py-3 text-xs text-gray-400">
                    {new Date(s.updated_at).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="border-t px-4 py-2 text-xs text-gray-400">
            {result.total} total submittals
          </div>
        </div>
      )}
    </div>
  );
}
