import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { listRules } from "@/lib/automations/queries";
import { RULE_TEMPLATES } from "@/lib/automations/rules";
import { RulesTable } from "@/components/automations/RulesTable";
import { SeedBanner } from "@/components/automations/SeedBanner";

export default async function AutomationsPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  let rules: Awaited<ReturnType<typeof listRules>>;
  let loadError = false;
  try {
    rules = await listRules(supabase, "all");
  } catch {
    rules = [];
    loadError = true;
  }

  const hasRules = rules.length > 0;

  return (
    <div className="space-y-6 max-w-5xl">
      <div>
        <h1 className="text-lg font-semibold text-gray-900">
          Automation Rules
        </h1>
        <p className="text-sm text-gray-500">
          Alerts and reminders that fire when pipeline conditions are met.
        </p>
      </div>

      {loadError && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
          Unable to load rules. Please try again.
        </div>
      )}

      {!hasRules && !loadError && (
        <SeedBanner templates={RULE_TEMPLATES} />
      )}

      {hasRules && <RulesTable rules={rules} />}
    </div>
  );
}
