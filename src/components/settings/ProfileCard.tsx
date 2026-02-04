import type { MeResponse } from "@/lib/settings/schemas";

interface Props {
  user: MeResponse["user"];
  role: string | null;
}

export function ProfileCard({ user, role }: Props) {
  return (
    <section className="rounded-lg border bg-white">
      <div className="border-b px-5 py-3">
        <h2 className="text-sm font-semibold text-gray-800">My Profile</h2>
      </div>
      <div className="grid gap-4 px-5 py-4 sm:grid-cols-2">
        <Field label="Email" value={user.email} />
        <Field label="User ID" value={user.id} mono />
        <Field label="Role" value={role ?? "—"} />
        <Field
          label="Last Sign-In"
          value={
            user.lastSignIn
              ? new Date(user.lastSignIn).toLocaleString()
              : "—"
          }
        />
        <Field
          label="Account Created"
          value={
            user.createdAt
              ? new Date(user.createdAt).toLocaleDateString()
              : "—"
          }
        />
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
