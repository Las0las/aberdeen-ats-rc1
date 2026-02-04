import type { MeResponse, OrgSettingsResponse } from "@/lib/settings/schemas";

interface Props {
  org: MeResponse["org"];
  membership: OrgSettingsResponse["membership"];
}

export function OrgCard({ org, membership }: Props) {
  if (!org.id) {
    return (
      <section className="rounded-lg border bg-white">
        <div className="border-b px-5 py-3">
          <h2 className="text-sm font-semibold text-gray-800">Organization</h2>
        </div>
        <div className="px-5 py-4">
          <p className="text-sm text-gray-500">
            No organization associated with this account.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="rounded-lg border bg-white">
      <div className="border-b px-5 py-3">
        <h2 className="text-sm font-semibold text-gray-800">Organization</h2>
      </div>
      <div className="grid gap-4 px-5 py-4 sm:grid-cols-2">
        <Field label="Name" value={org.name ?? "—"} />
        <Field label="Slug" value={org.slug ?? "—"} />
        <Field label="Org ID" value={org.id} mono />
        {membership && (
          <>
            <Field label="Membership Role" value={membership.role} />
            <Field
              label="Joined"
              value={new Date(membership.joinedAt).toLocaleDateString()}
            />
          </>
        )}
      </div>
    </section>
  );
}

function Field({
  label,
  value,
  mono,
}: {
  label: string;
  value: string;
  mono?: boolean;
}) {
  return (
    <div>
      <p className="text-[11px] font-medium uppercase tracking-wider text-gray-400">
        {label}
      </p>
      <p
        className={`mt-0.5 truncate text-sm text-gray-800 ${
          mono ? "font-mono text-xs" : ""
        }`}
      >
        {value}
      </p>
    </div>
  );
}
