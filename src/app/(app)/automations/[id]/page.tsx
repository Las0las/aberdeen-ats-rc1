import { createClient } from "@/lib/supabase/server";
import { redirect, notFound } from "next/navigation";
import { getRule } from "@/lib/automations/queries";
import { RuleDetail } from "@/components/automations/RuleDetail";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function AutomationRuleDetailPage({ params }: Props) {
  const { id } = await params;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  let rule;
  try {
    rule = await getRule(supabase, id);
  } catch {
    rule = null;
  }

  if (!rule) notFound();

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <a
          href="/automations"
          className="text-xs text-blue-600 hover:underline"
        >
          ← All Rules
        </a>
        <h1 className="mt-1 text-lg font-semibold text-gray-900">
          {rule.name}
        </h1>
        {rule.description && (
          <p className="text-sm text-gray-500">{rule.description}</p>
        )}
      </div>

      <RuleDetail rule={rule} />
    </div>
  );
}
