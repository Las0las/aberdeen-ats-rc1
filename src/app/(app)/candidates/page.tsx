import { redirect } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { listCandidates } from "@/lib/candidates/queries";
import { candidateListParamsSchema } from "@/lib/candidates/schemas";
import { ApplicationStageValues } from "@/contracts/db/enums";
import { StateBadge } from "@/components/ui/badge";
import { formatName } from "@/lib/utils";

interface Props {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export default async function CandidatesListPage({ searchParams }: Props) {
  const sp = await searchParams;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const parsed = candidateListParamsSchema.safeParse({
    stage: sp.stage ?? undefined,
    search: sp.search ?? undefined,
    page: sp.page ?? undefined,
    limit: sp.limit ?? undefined,
  });

  const filters = parsed.success ? parsed.data : { page: 1, limit: 25 };

  let result: Awaited<ReturnType<typeof listCandidates>> = {
    candidates: [],
    total: 0,
  };
  let fetchError: string | null = null;

  try {
    result = await listCandidates(supabase, filters);
  } catch (err: unknown) {
    fetchError = err instanceof Error ? err.message : "Failed to load candidates";
  }

  return (
    <div className="space-y-4">
      <h1 className="text-lg font-semibold text-gray-900">Candidates</h1>

      {/* Filters */}
      <form className="flex flex-wrap items-end gap-3">
        <label className="block text-sm">
          <span className="text-xs font-medium text-gray-500">Stage</span>
          <select
            name="stage"
            defaultValue={(sp.stage as string) ?? ""}
            className="mt-1 block rounded border px-2 py-1.5 text-sm"
          >
            <option value="">All</option>
            {ApplicationStageValues.map((s) => (
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
            placeholder="Name, title, email…"
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
      ) : result.candidates.length === 0 ? (
        <div className="rounded-lg border bg-white p-8 text-center text-sm text-gray-500">
          No candidates found.
        </div>
      ) : (
        <div className="overflow-hidden rounded-lg border bg-white">
          <table className="min-w-full divide-y text-sm">
            <thead className="bg-gray-50 text-left text-xs font-medium uppercase text-gray-500">
              <tr>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Title</th>
                <th className="px-4 py-3">Location</th>
                <th className="px-4 py-3">Stage</th>
                <th className="px-4 py-3">Source</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {result.candidates.map((c) => (
                <tr key={c.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium text-gray-900">
                    <Link
                      href={`/candidates/${c.id}`}
                      className="hover:text-blue-600 hover:underline"
                    >
                      {formatName(c.first_name, c.last_name)}
                    </Link>
                    {c.email && (
                      <p className="text-xs text-gray-400">{c.email}</p>
                    )}
                  </td>
                  <td className="px-4 py-3 text-gray-600">
                    {c.current_title ?? "—"}
                  </td>
                  <td className="px-4 py-3 text-gray-500">
                    {c.location ?? c.city ?? "—"}
                  </td>
                  <td className="px-4 py-3">
                    {c.stage ? (
                      <StateBadge state={c.stage} />
                    ) : (
                      <span className="text-xs text-gray-400">—</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-gray-500 text-xs">
                    {c.source ?? "—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="border-t px-4 py-2 text-xs text-gray-400">
            {result.total} total candidates
          </div>
        </div>
      )}
    </div>
  );
}
