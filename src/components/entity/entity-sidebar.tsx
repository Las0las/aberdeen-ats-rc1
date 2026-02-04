"use client";

import { useState } from "react";
import type { EntityType } from "@/lib/notes/schemas";
import { NotesPanel } from "@/components/notes/notes-panel";
import { ActivityTimeline } from "@/components/activity/activity-timeline";

interface EntitySidebarProps {
  entityType: EntityType;
  entityId: string;
  /** When present, NotesPanel will show notes for this candidate instead of the entity itself. */
  candidateId?: string | null;
}

type Tab = "activity" | "notes";

export function EntitySidebar({ entityType, entityId, candidateId }: EntitySidebarProps) {
  const [activeTab, setActiveTab] = useState<Tab>("activity");

  const tabs: { key: Tab; label: string }[] = [
    { key: "activity", label: "Activity" },
    { key: "notes", label: "Notes" },
  ];

  return (
    <section className="rounded-lg border bg-white">
      {/* Tab bar */}
      <div className="flex border-b">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`flex-1 px-4 py-2.5 text-xs font-medium transition-colors ${
              activeTab === tab.key
                ? "border-b-2 border-gray-900 text-gray-900"
                : "text-gray-400 hover:text-gray-600"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="p-4">
        {activeTab === "activity" && (
          <ActivityTimeline entityType={entityType} entityId={entityId} />
        )}
        {activeTab === "notes" && (
          candidateId ? (
            <NotesPanel entityType="candidate" entityId={candidateId} />
          ) : (
            <NotesPanel entityType={entityType} entityId={entityId} />
          )
        )}
      </div>
    </section>
  );
}
