import type { OrgSettingsResponse } from "@/lib/settings/schemas";

interface Props {
  workspaces: OrgSettingsResponse["workspaces"];
}

export function WorkspacesCard({ workspaces }: Props) {
  return (
    <section className="rounded-lg border bg-white">
      <div className="border-b px-5 py-3">
        <h2 className="text-sm font-semibold text-gray-800">Workspaces</h2>
      </div>
      <div className="px-5 py-4">
        {workspaces.length === 0 ? (
          <p className="text-sm text-gray-500">
            No workspaces found for this organization.
          </p>
        ) : (
          <div className="space-y-3">
            {workspaces.map((ws) => (
              <div
                key={ws.id}
                className="flex items-center justify-between rounded-md border px-4 py-3"
              >
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-gray-800">
                    {ws.name}
                  </p>
                  <p className="truncate text-xs text-gray-400">
                    {ws.slug}
                    {ws.description ? ` — ${ws.description}` : ""}
                  </p>
                </div>
                <span
                  className={`ml-3 shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${
                    ws.memberRole
                      ? "bg-blue-50 text-blue-700"
                      : "bg-gray-100 text-gray-500"
                  }`}
                >
                  {ws.memberRole ?? "not a member"}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
