import { redirect, notFound } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { getClient } from "@/lib/clients/queries";
import { listContacts } from "@/lib/contacts/queries";
import { StateBadge } from "@/components/ui/badge";
import { EntitySidebar } from "@/components/entity/entity-sidebar";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function ClientDetailPage({ params }: Props) {
  const { id } = await params;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  let client: Awaited<ReturnType<typeof getClient>>;
  try {
    client = await getClient(supabase, id);
  } catch {
    notFound();
  }

  // Fetch contacts for this client
  let contacts: Awaited<ReturnType<typeof listContacts>> = {
    contacts: [],
    total: 0,
  };
  try {
    contacts = await listContacts(supabase, {
      client_id: id,
      page: 1,
      limit: 50,
    });
  } catch {
    // non-fatal
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <Link
            href="/clients"
            className="text-xs text-gray-400 hover:text-gray-600"
          >
            ← Clients
          </Link>
          <h1 className="mt-1 text-lg font-semibold text-gray-900">
            {client.name}
          </h1>
          <p className="text-sm text-gray-500">
            {client.industry ?? "No industry"}
            {client.tier ? ` · Tier ${client.tier}` : ""}
          </p>
        </div>
        {client.status && <StateBadge state={client.status} />}
      </div>

      {/* Summary */}
      <div className="grid gap-4 sm:grid-cols-4">
        <Card label="Industry" value={client.industry ?? "—"} />
        <Card label="Tier" value={client.tier ?? "—"} />
        <Card
          label="Website"
          value={client.website ?? "—"}
          href={client.website}
        />
        <Card
          label="Created"
          value={
            client.created_at
              ? new Date(client.created_at).toLocaleDateString()
              : "—"
          }
        />
      </div>

      {/* Primary Contact */}
      <Section title="Primary Contact">
        <DL label="Name" value={client.contact_name} />
        <DL label="Email" value={client.contact_email} />
        <DL label="Phone" value={client.contact_phone} />
      </Section>

      {/* Contacts list */}
      {contacts.contacts.length > 0 && (
        <section className="rounded-lg border bg-white p-4 space-y-3">
          <h2 className="text-sm font-semibold text-gray-800">
            Contacts ({contacts.total})
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="border-b bg-gray-50 text-left text-xs font-medium uppercase text-gray-500">
                  <th className="px-3 py-1.5">Name</th>
                  <th className="px-3 py-1.5">Title</th>
                  <th className="px-3 py-1.5">Email</th>
                  <th className="px-3 py-1.5">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {contacts.contacts.map((ct) => (
                  <tr key={ct.id} className="hover:bg-gray-50">
                    <td className="px-3 py-1.5">
                      <Link
                        href={`/contacts/${ct.id}`}
                        className="font-medium text-blue-600 hover:underline"
                      >
                        {[ct.first_name, ct.last_name]
                          .filter(Boolean)
                          .join(" ") || "—"}
                      </Link>
                    </td>
                    <td className="px-3 py-1.5 text-gray-600">
                      {ct.title ?? "—"}
                    </td>
                    <td className="px-3 py-1.5 text-gray-600">
                      {ct.email ?? "—"}
                    </td>
                    <td className="px-3 py-1.5">
                      {ct.status ? <StateBadge state={ct.status} /> : "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* Activity */}
      <EntitySidebar entityType="client" entityId={id} />
    </div>
  );
}

function Card({
  label,
  value,
  href,
}: {
  label: string;
  value: string;
  href?: string | null;
}) {
  return (
    <div className="rounded-lg border bg-white p-4">
      <p className="text-xs font-medium uppercase text-gray-400">{label}</p>
      {href ? (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-1 block truncate text-sm text-blue-600 hover:underline"
        >
          {value}
        </a>
      ) : (
        <p className="mt-1 truncate text-sm text-gray-800">{value}</p>
      )}
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-lg border bg-white p-4 space-y-3">
      <h2 className="text-sm font-semibold text-gray-800">{title}</h2>
      <dl className="grid gap-x-6 gap-y-2 text-sm sm:grid-cols-2">
        {children}
      </dl>
    </section>
  );
}

function DL({
  label,
  value,
}: {
  label: string;
  value: string | null | undefined;
}) {
  return (
    <div>
      <dt className="text-xs text-gray-400">{label}</dt>
      <dd className="text-gray-700">{value ?? "—"}</dd>
    </div>
  );
}
