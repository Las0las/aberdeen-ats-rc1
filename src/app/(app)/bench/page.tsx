import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { listBenchEntries } from "@/lib/bench/queries";
import { benchListParamsSchema } from "@/lib/bench/schemas";
import { BenchTable } from "@/components/bench/bench-table";
import { BenchStateValues } from "@/contracts/db/enums";

interface Props {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export default async function BenchListPage({ searchParams }: Props) {
  const sp = await searchParams;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const parsed = benchListParamsSchema.safeParse({
    state: sp.state ?? undefined,
    search: sp.search ?? undefined,
    page: sp.page ?? undefined,
    limit: sp.limit ?? undefined,
  });

  const filters = parsed.success
    ? parsed.data
    : { page: 1, limit: 25 };

  let entries: Awaited<ReturnType<typeof listBenchEntries>> = {
    entries: [],
    total: 0,
  };
  let fetchError: string | null = null;

  try {
    entries = await listBenchEntries(supabase, filters);
  } catch (err: unknown) {
    fetchError = err instanceof Error ? err.message : "Failed to load bench entries";
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold text-gray-900">Bench</h1>
      </div>

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
            {BenchStateValues.map((s) => (
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
            placeholder="Name or title…"
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
      ) : (
        <BenchTable entries={entries.entries} total={entries.total} />
      )}
    </div>
  );
}
