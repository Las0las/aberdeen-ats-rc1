import { redirect } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { listCompanies } from "@/lib/companies/queries";
import { companiesListParamsSchema } from "@/lib/companies/schemas";
import { StateBadge } from "@/components/ui/badge";

interface Props {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export default async function CompaniesListPage({ searchParams }: Props) {
  const sp = await searchParams;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const parsed = companiesListParamsSchema.safeParse({
    status: sp.status ?? undefined,
    search: sp.search ?? undefined,
    page: sp.page ?? undefined,
    limit: sp.limit ?? undefined,
  });
  const opts = parsed.success ? parsed.data : { page: 1, limit: 25 };

  let result: Awaited<ReturnType<typeof listCompanies>>;
  try {
    result = await listCompanies(supabase, opts);
  } catch {
    result = { companies: [], total: 0 };
  }

  const fmt = (n: number | null | undefined) =>
    n != null ? n.toLocaleString() : "—";

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold text-gray-900">Companies</h1>
        <span className="text-xs text-gray-400">{result.total} total</span>
      </div>

      <form className="flex flex-wrap items-end gap-3">
        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1">
            Status
          </label>
          <input
            name="status"
            defaultValue={(sp.status as string) ?? ""}
            placeholder="e.g. active, prospect…"
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
            placeholder="Company name…"
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

      <div className="overflow-x-auto rounded-lg border bg-white">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="border-b bg-gray-50 text-left text-xs font-medium uppercase text-gray-500">
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Type</th>
              <th className="px-4 py-2">Industry</th>
              <th className="px-4 py-2">HQ</th>
              <th className="px-4 py-2">Employees</th>
              <th className="px-4 py-2">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {result.companies.length === 0 ? (
              <tr>
                <td
                  colSpan={6}
                  className="px-4 py-6 text-center text-gray-400"
                >
                  No companies found.
                </td>
              </tr>
            ) : (
              result.companies.map((c) => (
                <tr key={c.id} className="hover:bg-gray-50">
                  <td className="px-4 py-2">
                    <Link
                      href={`/companies/${c.id}`}
                      className="font-medium text-blue-600 hover:underline"
                    >
                      {c.name}
                    </Link>
                  </td>
                  <td className="px-4 py-2 text-gray-600">
                    {c.type ?? "—"}
                  </td>
                  <td className="px-4 py-2 text-gray-600">
                    {c.industry ?? "—"}
                  </td>
                  <td className="px-4 py-2 text-gray-600">
                    {c.headquarters ?? "—"}
                  </td>
                  <td className="px-4 py-2 text-gray-600">
                    {fmt(c.employee_count)}
                  </td>
                  <td className="px-4 py-2">
                    {c.status ? <StateBadge state={c.status} /> : "—"}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
