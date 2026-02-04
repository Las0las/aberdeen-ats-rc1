import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { getSettingsPageData } from "@/lib/settings/queries";
import { ProfileCard } from "@/components/settings/ProfileCard";
import { OrgCard } from "@/components/settings/OrgCard";
import { WorkspacesCard } from "@/components/settings/WorkspacesCard";
import { SecurityCard } from "@/components/settings/SecurityCard";

export default async function SettingsPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  let data;
  try {
    data = await getSettingsPageData(supabase);
  } catch {
    return (
      <div className="space-y-4">
        <h1 className="text-lg font-semibold text-gray-900">Settings</h1>
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
          Unable to load settings. Please try again.
        </div>
      </div>
    );
  }

  const { me, orgSettings } = data;

  return (
    <div className="space-y-8 max-w-3xl">
      <div>
        <h1 className="text-lg font-semibold text-gray-900">Settings</h1>
        <p className="text-sm text-gray-500">
          Account, organization, and workspace details
        </p>
      </div>

      <ProfileCard user={me.user} role={me.role} />
      <OrgCard org={me.org} membership={orgSettings?.membership ?? null} />
      <WorkspacesCard workspaces={orgSettings?.workspaces ?? []} />
      <SecurityCard />
    </div>
  );
}
