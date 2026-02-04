"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { StateBadge } from "@/components/ui/badge";

/* ── Types (mirror server schema) ── */
interface SearchResult {
  entityType: string;
  id: string;
  title: string;
  subtitle?: string;
  meta?: {
    status?: string;
    stage?: string;
    state?: string;
    location?: string;
    updated_at?: string;
  };
  href: string;
}

interface SearchResponse {
  items: SearchResult[];
  total: number;
  page: number;
  pageSize: number;
  perEntityCounts: Record<string, number>;
}

const ENTITY_FILTERS = [
  { value: "", label: "All" },
  { value: "candidate", label: "Candidates" },
  { value: "job", label: "Jobs" },
  { value: "application", label: "Applications" },
  { value: "submittal", label: "Submittals" },
  { value: "placement", label: "Placements" },
  { value: "assignment", label: "Assignments" },
  { value: "client", label: "Clients" },
  { value: "company", label: "Companies" },
  { value: "contact", label: "Contacts" },
] as const;

const ENTITY_LABELS: Record<string, string> = {
  candidate: "Candidates",
  job: "Jobs",
  application: "Applications",
  submittal: "Submittals",
  placement: "Placements",
  assignment: "Assignments",
  client: "Clients",
  company: "Companies",
  contact: "Contacts",
};

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [entity, setEntity] = useState("");
  const [results, setResults] = useState<SearchResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const doSearch = useCallback(
    async (q: string, ent: string) => {
      if (q.length < 2) {
        setResults(null);
        return;
      }
      setLoading(true);
      setError(null);
      try {
        const params = new URLSearchParams({ q, pageSize: "50" });
        if (ent) params.set("entity", ent);
        const res = await fetch(`/api/search?${params.toString()}`);
        if (!res.ok) throw new Error("Search failed");
        const data: SearchResponse = await res.json();
        setResults(data);
      } catch {
        setError("Search failed. Please try again.");
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  // Debounced search on query change
  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => doSearch(query, entity), 300);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [query, entity, doSearch]);

  // Group results by entityType
  const grouped: Record<string, SearchResult[]> = {};
  if (results) {
    for (const item of results.items) {
      if (!grouped[item.entityType]) grouped[item.entityType] = [];
      grouped[item.entityType].push(item);
    }
  }

  return (
    <div className="space-y-4">
      <h1 className="text-lg font-semibold text-gray-900">Search</h1>

      {/* Search input */}
      <div>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search candidates, jobs, clients, companies…"
          className="w-full rounded-lg border px-4 py-2.5 text-sm shadow-sm focus:border-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-300"
          autoFocus
        />
      </div>

      {/* Entity filter pills */}
      <div className="flex flex-wrap gap-1.5">
        {ENTITY_FILTERS.map((f) => (
          <button
            key={f.value}
            onClick={() => setEntity(f.value)}
            className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
              entity === f.value
                ? "bg-gray-900 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {f.label}
            {results && f.value && results.perEntityCounts[f.value] != null && (
              <span className="ml-1 opacity-70">
                ({results.perEntityCounts[f.value]})
              </span>
            )}
          </button>
        ))}
      </div>

      {/* States */}
      {loading && (
        <p className="text-sm text-gray-400">Searching…</p>
      )}
      {error && (
        <p className="text-sm text-red-500">{error}</p>
      )}
      {query.length > 0 && query.length < 2 && (
        <p className="text-sm text-gray-400">Type at least 2 characters to search.</p>
      )}
      {results && results.items.length === 0 && !loading && (
        <p className="text-sm text-gray-400">No results found for &ldquo;{query}&rdquo;</p>
      )}

      {/* Grouped results */}
      {Object.keys(grouped).length > 0 && (
        <div className="space-y-6">
          {Object.entries(grouped).map(([entityType, items]) => (
            <section key={entityType}>
              <h2 className="mb-2 text-xs font-semibold uppercase text-gray-400">
                {ENTITY_LABELS[entityType] ?? entityType}{" "}
                <span className="text-gray-300">({items.length})</span>
              </h2>
              <div className="overflow-hidden rounded-lg border bg-white divide-y">
                {items.map((item) => (
                  <Link
                    key={`${item.entityType}-${item.id}`}
                    href={item.href}
                    className="flex items-center justify-between px-4 py-3 hover:bg-gray-50 transition-colors"
                  >
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {item.title}
                      </p>
                      {item.subtitle && (
                        <p className="text-xs text-gray-500 truncate">
                          {item.subtitle}
                        </p>
                      )}
                    </div>
                    <div className="ml-4 flex shrink-0 items-center gap-2">
                      {item.meta?.state && <StateBadge state={item.meta.state} />}
                      {item.meta?.stage && !item.meta?.state && (
                        <StateBadge state={item.meta.stage} />
                      )}
                      {item.meta?.status &&
                        !item.meta?.state &&
                        !item.meta?.stage && (
                          <StateBadge state={item.meta.status} />
                        )}
                      {item.meta?.location && (
                        <span className="hidden text-xs text-gray-400 sm:inline">
                          {item.meta.location}
                        </span>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          ))}
        </div>
      )}

      {/* Empty initial state */}
      {!results && !loading && query.length === 0 && (
        <div className="py-12 text-center">
          <p className="text-sm text-gray-400">
            Search across all entities — candidates, jobs, clients, companies, and more.
          </p>
        </div>
      )}
    </div>
  );
}
