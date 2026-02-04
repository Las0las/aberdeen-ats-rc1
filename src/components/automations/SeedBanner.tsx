"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { RuleTemplate } from "@/lib/automations/schemas";

interface Props {
  templates: RuleTemplate[];
}

export function SeedBanner({ templates }: Props) {
  const router = useRouter();
  const [seeding, setSeeding] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSeed() {
    setSeeding(true);
    setError(null);

    try {
      // Fetch existing rules to avoid duplicates (idempotent seed)
      const existing = await fetch("/api/automations/rules").then((r) =>
        r.ok ? r.json() : { rules: [] },
      );
      const existingTriggers = new Set(
        ((existing as { rules: Array<{ triggerType?: string | null }> }).rules ?? []).map(
          (r: { triggerType?: string | null }) => r.triggerType,
        ),
      );

      let created = 0;
      for (const tpl of templates) {
        if (existingTriggers.has(tpl.condition)) continue; // skip existing
        const res = await fetch("/api/automations/rules", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: tpl.name,
            description: tpl.description,
            triggerType: tpl.condition,
            severity: tpl.severity,
            entityType: tpl.entityType,
            windowDays: tpl.defaultWindowDays,
            actionType: "alert",
          }),
        });
        if (!res.ok) {
          const data = await res.json().catch(() => ({}));
          throw new Error(
            (data as { error?: string }).error ?? `Failed to create "${tpl.name}"`,
          );
        }
        created++;
      }
      if (created === 0) {
        setError("All rules already exist — nothing to seed.");
      }
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Seeding failed");
    } finally {
      setSeeding(false);
    }
  }

  return (
    <div className="rounded-lg border border-dashed border-gray-300 bg-gray-50 px-6 py-8 text-center">
      <h3 className="text-sm font-semibold text-gray-700">
        No automation rules yet
      </h3>
      <p className="mt-1 text-xs text-gray-500">
        Seed {templates.length} built-in alert templates to get started.
      </p>
      <div className="mt-3 space-y-1 text-left max-w-sm mx-auto">
        {templates.map((t) => (
          <p key={t.id} className="text-xs text-gray-600">
            • {t.name}{" "}
            <span className="text-gray-400">({t.defaultWindowDays}d)</span>
          </p>
        ))}
      </div>

      {error && (
        <p className="mt-3 text-xs text-red-600">{error}</p>
      )}

      <button
        onClick={handleSeed}
        disabled={seeding}
        className="mt-4 rounded-md bg-blue-600 px-4 py-2 text-xs font-medium text-white transition-colors hover:bg-blue-700 disabled:opacity-50"
      >
        {seeding ? "Creating rules…" : "Seed Default Rules"}
      </button>
    </div>
  );
}
