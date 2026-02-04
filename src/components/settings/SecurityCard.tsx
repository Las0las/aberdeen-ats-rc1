"use client";

import { useRouter } from "next/navigation";
import { createBrowserClient } from "@supabase/ssr";
import { useState } from "react";

export function SecurityCard() {
  const router = useRouter();
  const [signingOut, setSigningOut] = useState(false);

  async function handleSignOut() {
    setSigningOut(true);
    try {
      const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      );
      await supabase.auth.signOut();
      router.push("/login");
      router.refresh();
    } catch {
      setSigningOut(false);
    }
  }

  return (
    <section className="rounded-lg border bg-white">
      <div className="border-b px-5 py-3">
        <h2 className="text-sm font-semibold text-gray-800">Security</h2>
      </div>
      <div className="flex items-center justify-between px-5 py-4">
        <div>
          <p className="text-sm text-gray-800">Session</p>
          <p className="text-xs text-gray-500">
            You are currently signed in. Sign out to end your session.
          </p>
        </div>
        <button
          onClick={handleSignOut}
          disabled={signingOut}
          className="shrink-0 rounded-md border border-red-200 bg-red-50 px-4 py-2 text-xs font-medium text-red-700 transition-colors hover:bg-red-100 disabled:opacity-50"
        >
          {signingOut ? "Signing out…" : "Sign out"}
        </button>
      </div>
    </section>
  );
}
