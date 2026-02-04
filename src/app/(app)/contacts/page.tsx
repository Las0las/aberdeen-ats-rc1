import { redirect } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { listContacts } from "@/lib/contacts/queries";
import { contactsListParamsSchema } from "@/lib/contacts/schemas";
import { StateBadge } from "@/components/ui/badge";

interface Props {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export default async function ContactsListPage({ searchParams }: Props) {
  const sp = await searchParams;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const parsed = contactsListParamsSchema.safeParse({
    status: sp.status ?? undefined,
    client_id: sp.client_id ?? undefined,
    search: sp.search ?? undefined,
    page: sp.page ?? undefined,
    limit: sp.limit ?? undefined,
  });
  const opts = parsed.success ? parsed.data : { page: 1, limit: 25 };

  let result: Awaited<ReturnType<typeof listContacts>>;
  try {
    result = await listContacts(supabase, opts);
  } catch {
    result = { contacts: [], total: 0 };
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold text-gray-900">Contacts</h1>
        <span className="text-xs text-gray-400">{result.total} total</span>
      </div>

      <form className="flex flex-wrap items-end gap-3">
        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1">
            Status
          </label>
          <input
            name="status"
            defaultValue={(sp.status as string) ?? ""}
            placeholder="e.g. active…"
            className="rounded border px-2 py-1.5 text-sm w-36"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1">
            Search
          </label>
          <input
            name="search"
            defaultValue={(sp.search as string) ?? ""}
            placeholder="Name, email, client…"
            className="rounded border px-2 py-1.5 text-sm w-56"
          />
        </div>
        <button
          type="submit"
          className="rounded bg-gray-900 px-3 py-1.5 text-xs font-medium text-white hover:bg-gray-800"
        >
          Filter
        </button>
      </form>

      <div className="overflow-x-auto rounded-lg border bg-white">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="border-b bg-gray-50 text-left text-xs font-medium uppercase text-gray-500">
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Title</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Phone</th>
              <th className="px-4 py-2">Client</th>
              <th className="px-4 py-2">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {result.contacts.length === 0 ? (
              <tr>
                <td
                  colSpan={6}
                  className="px-4 py-6 text-center text-gray-400"
                >
                  No contacts found.
                </td>
              </tr>
            ) : (
              result.contacts.map((c) => {
                const name =
                  [c.first_name, c.last_name].filter(Boolean).join(" ") || "—";
                return (
                  <tr key={c.id} className="hover:bg-gray-50">
                    <td className="px-4 py-2">
                      <Link
                        href={`/contacts/${c.id}`}
                        className="font-medium text-blue-600 hover:underline"
                      >
                        {name}
                      </Link>
                    </td>
                    <td className="px-4 py-2 text-gray-600">
                      {c.title ?? "—"}
                    </td>
                    <td className="px-4 py-2 text-gray-600">
                      {c.email ?? "—"}
                    </td>
                    <td className="px-4 py-2 text-gray-600">
                      {c.phone ?? "—"}
                    </td>
                    <td className="px-4 py-2 text-gray-600">
                      {c.clients?.name ? (
                        <Link
                          href={`/clients/${c.client_id}`}
                          className="text-blue-600 hover:underline"
                        >
                          {c.clients.name}
                        </Link>
                      ) : (
                        "—"
                      )}
                    </td>
                    <td className="px-4 py-2">
                      {c.status ? <StateBadge state={c.status} /> : "—"}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
