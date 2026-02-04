import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { getReportsData } from "@/lib/reports/queries";
import type { ReportsResponse } from "@/lib/reports/schemas";
import { ReportsDashboard } from "@/components/reports/ReportsDashboard";

export default async function ReportsPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const params = await searchParams;
  const sinceDaysRaw = typeof params.sinceDays === "string" ? parseInt(params.sinceDays, 10) : 30;
  const sinceDays =
    Number.isFinite(sinceDaysRaw) && sinceDaysRaw >= 1 && sinceDaysRaw <= 365
      ? sinceDaysRaw
      : 30;

  let data: ReportsResponse;
  try {
    data = await getReportsData(supabase, sinceDays);
  } catch {
    return (
      <div className="space-y-4">
        <h1 className="text-lg font-semibold text-gray-900">Reports</h1>
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
          Unable to load reports. Please try again.
        </div>
      </div>
    );
  }

  return <ReportsDashboard data={data} sinceDays={sinceDays} />;
}
