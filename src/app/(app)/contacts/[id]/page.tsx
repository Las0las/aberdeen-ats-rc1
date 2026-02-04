import { redirect, notFound } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { getContact } from "@/lib/contacts/queries";
import { StateBadge } from "@/components/ui/badge";
import { EntitySidebar } from "@/components/entity/entity-sidebar";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function ContactDetailPage({ params }: Props) {
  const { id } = await params;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  let contact: Awaited<ReturnType<typeof getContact>>;
  try {
    contact = await getContact(supabase, id);
  } catch {
    notFound();
  }

  const name =
    [contact.first_name, contact.last_name].filter(Boolean).join(" ") ||
    "Unnamed Contact";

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <Link
            href="/contacts"
            className="text-xs text-gray-400 hover:text-gray-600"
          >
            ← Contacts
          </Link>
          <h1 className="mt-1 text-lg font-semibold text-gray-900">{name}</h1>
          <p className="text-sm text-gray-500">{contact.title ?? "No title"}</p>
        </div>
        {contact.status && <StateBadge state={contact.status} />}
      </div>

      {/* Summary cards */}
      <div className="grid gap-4 sm:grid-cols-3">
        <Card label="Email" value={contact.email ?? "—"} />
        <Card label="Phone" value={contact.phone ?? "—"} />
        <Card label="Title" value={contact.title ?? "—"} />
      </div>

      {/* Client link */}
      <section className="rounded-lg border bg-white p-4 space-y-3">
        <h2 className="text-sm font-semibold text-gray-800">Client</h2>
        {contact.clients ? (
          <dl className="grid gap-x-6 gap-y-2 text-sm sm:grid-cols-2">
            <div>
              <dt className="text-xs text-gray-400">Name</dt>
              <dd>
                <Link
                  href={`/clients/${contact.client_id}`}
                  className="text-blue-600 hover:underline"
                >
                  {contact.clients.name}
                </Link>
              </dd>
            </div>
            <div>
              <dt className="text-xs text-gray-400">Industry</dt>
              <dd className="text-gray-700">
                {contact.clients.industry ?? "—"}
              </dd>
            </div>
            <div>
              <dt className="text-xs text-gray-400">Tier</dt>
              <dd className="text-gray-700">{contact.clients.tier ?? "—"}</dd>
            </div>
          </dl>
        ) : (
          <p className="text-sm text-gray-400">No client linked</p>
        )}
      </section>

      {/* Record details */}
      <section className="rounded-lg border bg-white p-4 space-y-3">
        <h2 className="text-sm font-semibold text-gray-800">Record Details</h2>
        <dl className="grid gap-x-6 gap-y-2 text-sm sm:grid-cols-2">
          <div>
            <dt className="text-xs text-gray-400">Created</dt>
            <dd className="text-gray-700">
              {contact.created_at
                ? new Date(contact.created_at).toLocaleDateString()
                : "—"}
            </dd>
          </div>
          <div>
            <dt className="text-xs text-gray-400">Updated</dt>
            <dd className="text-gray-700">
              {contact.updated_at
                ? new Date(contact.updated_at).toLocaleDateString()
                : "—"}
            </dd>
          </div>
        </dl>
      </section>

      {/* Activity */}
      <EntitySidebar entityType="contact" entityId={id} />
    </div>
  );
}

function Card({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border bg-white p-4">
      <p className="text-xs font-medium uppercase text-gray-400">{label}</p>
      <p className="mt-1 truncate text-sm text-gray-800">{value}</p>
    </div>
  );
}
