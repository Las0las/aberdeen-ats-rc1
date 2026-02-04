import { z } from "zod";

/* ─── API /api/me response ─────────────────────────────── */

export interface MeResponse {
  user: {
    id: string;
    email: string;
    lastSignIn: string | null;
    createdAt: string | null;
  };
  org: {
    id: string | null;
    name: string | null;
    slug: string | null;
  };
  role: string | null;
}

/* ─── API /api/settings/org response ───────────────────── */

export interface OrgSettingsResponse {
  org: {
    id: string;
    name: string;
    slug: string;
    createdAt: string | null;
    updatedAt: string | null;
  };
  membership: {
    role: string;
    joinedAt: string;
  } | null;
  workspaces: Array<{
    id: string;
    name: string;
    slug: string;
    description: string | null;
    memberRole: string | null;
  }>;
}

/* ─── Settings page composite ──────────────────────────── */

export interface SettingsPageData {
  me: MeResponse;
  orgSettings: OrgSettingsResponse | null;
}

/* ─── Zod (placeholder for future preference updates) ──── */

export const userPreferencesUpdateSchema = z.object({
  theme: z.enum(["light", "dark", "system"]).optional(),
  language: z.string().max(10).optional(),
  timezone: z.string().max(64).optional(),
  sidebarCollapsed: z.boolean().optional(),
});

export type UserPreferencesUpdate = z.infer<typeof userPreferencesUpdateSchema>;
