import { redirect } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { listOffers } from "@/lib/offers/queries";
import { offersListParamsSchema } from "@/lib/offers/schemas";
import { OfferStateValues } from "@/contracts/db/enums";
import { StateBadge } from "@/components/ui/badge";
import { formatName } from "@/lib/utils";

interface Props {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export default async function OffersListPage({ searchParams }: Props) {
  const sp = await searchParams;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const parsed = offersListParamsSchema.safeParse({
    status: sp.status ?? undefined,
    search: sp.search ?? undefined,
    page: sp.page ?? undefined,
    limit: sp.limit ?? undefined,
  });

  const opts = parsed.success ? parsed.data : { page: 1, limit: 25 };

  let offers: Awaited<ReturnType<typeof listOffers>>;
  try {
    offers = await listOffers(supabase, opts);
  } catch {
    offers = { offers: [], total: 0 };
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold text-gray-900">Offers</h1>
        <span className="text-xs text-gray-400">{offers.total} total</span>
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
            {OfferStateValues.map((s) => (
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
              <th className="px-4 py-2">Salary</th>
              <th className="px-4 py-2">Equity</th>
              <th className="px-4 py-2">Start Date</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Sent</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {offers.offers.length === 0 ? (
              <tr>
                <td
                  colSpan={7}
                  className="px-4 py-6 text-center text-gray-400"
                >
                  No offers found.
                </td>
              </tr>
            ) : (
              offers.offers.map((o) => {
                const cName = formatName(
                  o.submittals?.candidates?.first_name,
                  o.submittals?.candidates?.last_name,
                );
                const salary = `${o.salary_currency ?? "$"}${o.salary_amount.toLocaleString()}`;
                return (
                  <tr key={o.id} className="hover:bg-gray-50">
                    <td className="px-4 py-2">
                      <Link
                        href={`/offers/${o.id}`}
                        className="font-medium text-blue-600 hover:underline"
                      >
                        {cName}
                      </Link>
                    </td>
                    <td className="px-4 py-2 text-gray-600">
                      {o.submittals?.jobs?.title ?? "—"}
                    </td>
                    <td className="px-4 py-2 font-mono text-gray-700">
                      {salary}
                    </td>
                    <td className="px-4 py-2 text-gray-600">
                      {o.equity_percentage != null
                        ? `${o.equity_percentage}%`
                        : "—"}
                    </td>
                    <td className="px-4 py-2 text-gray-600">
                      {o.start_date
                        ? new Date(o.start_date).toLocaleDateString()
                        : "—"}
                    </td>
                    <td className="px-4 py-2">
                      {o.status ? <StateBadge state={o.status} /> : "—"}
                    </td>
                    <td className="px-4 py-2 text-gray-600">
                      {o.sent_at
                        ? new Date(o.sent_at).toLocaleDateString()
                        : "—"}
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
