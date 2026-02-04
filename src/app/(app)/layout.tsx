import { redirect } from "next/navigation";
import { getOrgId } from "@/lib/org";
import { createClient } from "@/lib/supabase/server";

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const orgId = await getOrgId();

  return (
    <div className="flex h-screen bg-gray-50">
      {/* ── Sidebar ── */}
      <aside className="flex w-56 flex-col border-r bg-white">
        <div className="flex h-14 items-center border-b px-4">
          <span className="text-sm font-semibold text-gray-900">ATS</span>
        </div>

        <nav className="flex-1 space-y-1 p-3 text-sm">
          <SidebarLink href="/dashboard" label="Dashboard" />
          <SidebarLink href="/search" label="Search" />
          <SidebarLink href="/notifications" label="Notifications" />
          <SidebarLink href="/reports" label="Reports" />
          <SidebarLink href="/automations" label="Automations" />
          <SidebarLink href="/jobs" label="Jobs" />
          <SidebarLink href="/candidates" label="Candidates" />
          <SidebarLink href="/submittals" label="Submittals" />
          <SidebarLink href="/applications" label="Applications" />
          <SidebarLink href="/pipeline" label="Pipeline" />
          <SidebarLink href="/interviews" label="Interviews" />
          <SidebarLink href="/offers" label="Offers" />
          <SidebarLink href="/placements" label="Placements" />
          <SidebarLink href="/assignments" label="Assignments" />
          <SidebarLink href="/bench" label="Bench" />

          <div className="pt-3 pb-1">
            <span className="px-3 text-[10px] font-semibold uppercase tracking-wider text-gray-400">
              CRM
            </span>
          </div>
          <SidebarLink href="/clients" label="Clients" />
          <SidebarLink href="/companies" label="Companies" />
          <SidebarLink href="/contacts" label="Contacts" />

          <div className="pt-3 pb-1">
            <span className="px-3 text-[10px] font-semibold uppercase tracking-wider text-gray-400">
              Account
            </span>
          </div>
          <SidebarLink href="/settings" label="Settings" />
        </nav>

        <div className="border-t px-4 py-3">
          <p className="truncate text-xs text-gray-500">{user.email}</p>
          {orgId && (
            <p className="truncate text-[10px] text-gray-400">
              org:{orgId.slice(0, 8)}
            </p>
          )}
        </div>
      </aside>

      {/* ── Main ── */}
      <div className="flex flex-1 flex-col overflow-hidden">
        <header className="flex h-14 items-center border-b bg-white px-6">
          <h2 className="text-sm font-medium text-gray-700">
            {orgId ? "Workspace" : "No organization"}
          </h2>
        </header>

        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
}

function SidebarLink({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      className="block rounded px-3 py-2 text-gray-600 hover:bg-gray-100 hover:text-gray-900"
    >
      {label}
    </a>
  );
}
