import { createClient } from "@/lib/supabase/server";

/**
 * Returns the org UUID for the current authenticated user.
 * Calls the contract-locked `current_org_id()` RPC.
 * Returns `null` if the user has no org or is unauthenticated.
 */
export async function getOrgId(): Promise<string | null> {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  const { data, error } = await supabase.rpc("current_org_id");

  if (error) {
    console.error("[org] current_org_id failed:", error.message);
    return null;
  }

  return (data as string) ?? null;
}
