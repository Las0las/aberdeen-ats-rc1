import type { AutomationRule } from "@/lib/automations/schemas";

interface Props {
  rules: AutomationRule[];
}

export function RulesTable({ rules }: Props) {
  return (
    <div className="overflow-x-auto rounded-lg border bg-white">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b bg-gray-50 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
            <th className="px-4 py-3">Name</th>
            <th className="px-4 py-3">Trigger</th>
            <th className="px-4 py-3">Severity</th>
            <th className="px-4 py-3">Window</th>
            <th className="px-4 py-3">Status</th>
            <th className="px-4 py-3">Created</th>
          </tr>
        </thead>
        <tbody>
          {rules.map((rule) => {
            const cfg = rule.triggerConfig ?? {};
            const severity = (cfg.severity as string) ?? "warning";
            const windowDays = (cfg.windowDays as number) ?? 30;

            return (
              <tr
                key={rule.id}
                className="border-b last:border-b-0 hover:bg-gray-50"
              >
                <td className="px-4 py-3">
                  <a
                    href={`/automations/${rule.id}`}
                    className="font-medium text-blue-600 hover:underline"
                  >
                    {rule.name}
                  </a>
                  {rule.description && (
                    <p className="mt-0.5 truncate text-xs text-gray-400 max-w-xs">
                      {rule.description}
                    </p>
                  )}
                </td>
                <td className="px-4 py-3 text-gray-700">
                  <code className="rounded bg-gray-100 px-1.5 py-0.5 text-xs">
                    {rule.triggerType ?? "—"}
                  </code>
                </td>
                <td className="px-4 py-3">
                  <SeverityBadge severity={severity} />
                </td>
                <td className="px-4 py-3 text-gray-600 tabular-nums">
                  {windowDays}d
                </td>
                <td className="px-4 py-3">
                  <StatusBadge status={rule.status} />
                </td>
                <td className="px-4 py-3 text-xs text-gray-400 tabular-nums">
                  {rule.createdAt
                    ? new Date(rule.createdAt).toLocaleDateString()
                    : "—"}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

function SeverityBadge({ severity }: { severity: string }) {
  const styles: Record<string, string> = {
    critical: "bg-red-50 text-red-700",
    warning: "bg-amber-50 text-amber-700",
    info: "bg-blue-50 text-blue-700",
  };
  return (
    <span
      className={`rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${
        styles[severity] ?? "bg-gray-100 text-gray-600"
      }`}
    >
      {severity}
    </span>
  );
}

function StatusBadge({ status }: { status: string | null }) {
  const isActive = status === "active";
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${
        isActive ? "bg-green-50 text-green-700" : "bg-gray-100 text-gray-500"
      }`}
    >
      <span
        className={`h-1.5 w-1.5 rounded-full ${
          isActive ? "bg-green-500" : "bg-gray-400"
        }`}
      />
      {status ?? "unknown"}
    </span>
  );
}
