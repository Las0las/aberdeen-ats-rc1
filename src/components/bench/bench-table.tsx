import Link from "next/link";
import { StateBadge } from "@/components/ui/badge";
import { daysBetween, formatName } from "@/lib/utils";
import type { BenchEntryWithCandidate } from "@/lib/bench/queries";

interface Props {
  entries: BenchEntryWithCandidate[];
  total: number;
}

export function BenchTable({ entries, total }: Props) {
  if (entries.length === 0) {
    return (
      <div className="rounded-lg border bg-white p-8 text-center text-sm text-gray-500">
        No bench entries found.
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-lg border bg-white">
      <table className="min-w-full divide-y text-sm">
        <thead className="bg-gray-50 text-left text-xs font-medium uppercase text-gray-500">
          <tr>
            <th className="px-4 py-3">Candidate</th>
            <th className="px-4 py-3">Title</th>
            <th className="px-4 py-3">State</th>
            <th className="px-4 py-3">Benched</th>
            <th className="px-4 py-3 text-right">Days</th>
          </tr>
        </thead>
        <tbody className="divide-y">
          {entries.map((e) => {
            const c = e.candidates;
            return (
              <tr key={e.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 font-medium text-gray-900">
                  <Link
                    href={`/bench/${e.id}`}
                    className="hover:text-blue-600 hover:underline"
                  >
                    {formatName(c?.first_name, c?.last_name)}
                  </Link>
                </td>
                <td className="px-4 py-3 text-gray-600">
                  {c?.current_title ?? "—"}
                </td>
                <td className="px-4 py-3">
                  <StateBadge state={e.state} />
                </td>
                <td className="px-4 py-3 text-gray-500">
                  {new Date(e.bench_started_at).toLocaleDateString()}
                </td>
                <td className="px-4 py-3 text-right tabular-nums text-gray-700">
                  {daysBetween(e.bench_started_at, e.bench_ended_at)}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="border-t px-4 py-2 text-xs text-gray-400">
        {total} total entries
      </div>
    </div>
  );
}
