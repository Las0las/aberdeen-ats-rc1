import { redirect } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { listPlacements } from "@/lib/placements/queries";
import { placementsListParamsSchema } from "@/lib/placements/schemas";
import { StateBadge } from "@/components/ui/badge";
import { formatName } from "@/lib/utils";

interface Props {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export default async function PlacementsListPage({ searchParams }: Props) {
  const sp = await searchParams;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const parsed = placementsListParamsSchema.safeParse({
    status: sp.status ?? undefined,
    search: sp.search ?? undefined,
    page: sp.page ?? undefined,
    limit: sp.limit ?? undefined,
  });

  const opts = parsed.success ? parsed.data : { page: 1, limit: 25 };

  let placements: Awaited<ReturnType<typeof listPlacements>>;
  try {
    placements = await listPlacements(supabase, opts);
  } catch {
    placements = { placements: [], total: 0 };
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold text-gray-900">Placements</h1>
        <span className="text-xs text-gray-400">
          {placements.total} total
        </span>
      </div>

      {/* Filters */}
      <form className="flex flex-wrap items-end gap-3">
        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1">
            Status
          </label>
          <input
            name="status"
            defaultValue={(sp.status as string) ?? ""}
            placeholder="e.g. active, completed…"
            className="rounded border px-2 py-1.5 text-sm w-40"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1">
            Search
          </label>
          <input
            name="search"
            defaultValue={(sp.search as string) ?? ""}
            placeholder="Candidate, job…"
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
              <th className="px-4 py-2">Start</th>
              <th className="px-4 py-2">End</th>
              <th className="px-4 py-2">Fee</th>
              <th className="px-4 py-2">Guarantee</th>
              <th className="px-4 py-2">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {placements.placements.length === 0 ? (
              <tr>
                <td
                  colSpan={7}
                  className="px-4 py-6 text-center text-gray-400"
                >
                  No placements found.
                </td>
              </tr>
            ) : (
              placements.placements.map((p) => {
                const cName = formatName(
                  p.candidates?.first_name,
                  p.candidates?.last_name,
                );
                const fee =
                  p.placement_fee != null
                    ? `${p.fee_currency ?? "$"}${p.placement_fee.toLocaleString()}`
                    : "—";
                return (
                  <tr key={p.id} className="hover:bg-gray-50">
                    <td className="px-4 py-2">
                      <Link
                        href={`/placements/${p.id}`}
                        className="font-medium text-blue-600 hover:underline"
                      >
                        {cName}
                      </Link>
                    </td>
                    <td className="px-4 py-2 text-gray-600">
                      {p.jobs?.title ?? "—"}
                    </td>
                    <td className="px-4 py-2 text-gray-600">
                      {new Date(p.start_date).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-2 text-gray-600">
                      {p.end_date
                        ? new Date(p.end_date).toLocaleDateString()
                        : "—"}
                    </td>
                    <td className="px-4 py-2 font-mono text-gray-700">
                      {fee}
                    </td>
                    <td className="px-4 py-2 text-gray-600">
                      {p.guarantee_days != null
                        ? `${p.guarantee_days}d`
                        : "—"}
                    </td>
                    <td className="px-4 py-2">
                      {p.status ? <StateBadge state={p.status} /> : "—"}
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
