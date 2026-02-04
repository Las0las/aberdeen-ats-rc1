import type { SupabaseClient } from "@supabase/supabase-js";
import type {
  MeResponse,
  OrgSettingsResponse,
  SettingsPageData,
} from "./schemas";

/* ─── Helpers ──────────────────────────────────────────── */

async function resolveOrgId(
  supabase: SupabaseClient,
): Promise<string | null> {
  const { data, error } = await supabase.rpc("current_org_id");
  if (error) {
    console.error("[settings] current_org_id failed:", error.message);
    return null;
  }
  return (data as string) ?? null;
}

async function resolveUserRole(
  supabase: SupabaseClient,
): Promise<string | null> {
  const { data, error } = await supabase.rpc("current_user_role");
  if (error) return null;
  return (data as string) ?? null;
}

/* ─── GET /api/me data ─────────────────────────────────── */

export async function getMeData(
  supabase: SupabaseClient,
): Promise<MeResponse> {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("Unauthenticated");

  const [orgId, role] = await Promise.all([
    resolveOrgId(supabase),
    resolveUserRole(supabase),
  ]);

  // If we have an org, fetch its display fields
  let orgName: string | null = null;
  let orgSlug: string | null = null;

  if (orgId) {
    const { data: orgRow } = await supabase
      .from("organizations")
      .select("name, slug")
      .eq("id", orgId)
      .maybeSingle();

    if (orgRow) {
      orgName = orgRow.name ?? null;
      orgSlug = orgRow.slug ?? null;
    }
  }

  return {
    user: {
      id: user.id,
      email: user.email ?? "",
      lastSignIn: user.last_sign_in_at ?? null,
      createdAt: user.created_at ?? null,
    },
    org: {
      id: orgId,
      name: orgName,
      slug: orgSlug,
    },
    role,
  };
}

/* ─── GET /api/settings/org data ───────────────────────── */

export async function getOrgSettingsData(
  supabase: SupabaseClient,
): Promise<OrgSettingsResponse | null> {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  const orgId = await resolveOrgId(supabase);
  if (!orgId) return null;

  // Parallel: org row, membership, workspaces for this org
  const [orgResult, memberResult, wsResult] = await Promise.allSettled([
    supabase
      .from("organizations")
      .select("id, name, slug, created_at, updated_at")
      .eq("id", orgId)
      .maybeSingle(),
    supabase
      .from("org_memberships")
      .select("role, created_at")
      .eq("org_id", orgId)
      .eq("user_id", user.id)
      .maybeSingle(),
    supabase
      .from("workspaces")
      .select("id, name, slug, description")
      .eq("organization_id", orgId)
      .order("name")
      .limit(50),
  ]);

  const orgRow =
    orgResult.status === "fulfilled" ? orgResult.value.data : null;
  if (!orgRow) return null;

  const memberRow =
    memberResult.status === "fulfilled" ? memberResult.value.data : null;

  const workspaceRows =
    wsResult.status === "fulfilled" ? (wsResult.value.data ?? []) : [];

  // For each workspace, check if user is a member (best-effort)
  let memberRoles: Record<string, string> = {};
  if (workspaceRows.length > 0) {
    const wsIds = workspaceRows.map(
      (w: { id: string }) => w.id,
    );
    const { data: wmRows } = await supabase
      .from("workspace_members")
      .select("workspace_id, role")
      .eq("user_id", user.id)
      .in("workspace_id", wsIds);

    if (wmRows) {
      memberRoles = Object.fromEntries(
        wmRows.map((r: { workspace_id: string; role: string }) => [
          r.workspace_id,
          r.role,
        ]),
      );
    }
  }

  return {
    org: {
      id: orgRow.id,
      name: orgRow.name,
      slug: orgRow.slug,
      createdAt: orgRow.created_at ?? null,
      updatedAt: orgRow.updated_at ?? null,
    },
    membership: memberRow
      ? { role: memberRow.role, joinedAt: memberRow.created_at }
      : null,
    workspaces: workspaceRows.map(
      (w: { id: string; name: string; slug: string; description: string | null }) => ({
        id: w.id,
        name: w.name,
        slug: w.slug,
        description: w.description,
        memberRole: memberRoles[w.id] ?? null,
      }),
    ),
  };
}

/* ─── Composite for server page ────────────────────────── */

export async function getSettingsPageData(
  supabase: SupabaseClient,
): Promise<SettingsPageData> {
  const [me, orgSettings] = await Promise.all([
    getMeData(supabase),
    getOrgSettingsData(supabase).catch(() => null),
  ]);
  return { me, orgSettings };
}
