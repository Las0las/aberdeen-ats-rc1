import type { SupabaseClient } from "@supabase/supabase-js";
import type { SearchEntity, SearchResult } from "./schemas";

const PER_ENTITY_CAP = 10;

async function resolveOrgId(supabase: SupabaseClient): Promise<string> {
  const { data, error } = await supabase.rpc("current_org_id");
  if (error || !data) throw new Error("Unable to resolve organization");
  return data as string;
}

/* ── ilike OR filter builder ── */
function orIlike(columns: string[], term: string): string {
  const escaped = term.replace(/%/g, "\\%").replace(/_/g, "\\_");
  return columns.map((c) => `${c}.ilike.%${escaped}%`).join(",");
}

/* ── Scoring heuristic ── */
function score(title: string, q: string): number {
  const t = title.toLowerCase();
  const query = q.toLowerCase();
  if (t === query) return 100;
  if (t.startsWith(query)) return 80;
  if (t.includes(query)) return 60;
  return 40; // matched on a non-title field
}

/* ── Per-entity searchers ── */

async function searchCandidates(
  supabase: SupabaseClient,
  orgId: string,
  q: string,
): Promise<SearchResult[]> {
  const { data } = await supabase
    .from("candidates")
    .select("id, first_name, last_name, email, current_title, current_company, status, stage, location, updated_at")
    .eq("organization_id", orgId)
    .is("deleted_at", null)
    .or(orIlike(["first_name", "last_name", "email", "current_title", "current_company"], q))
    .order("updated_at", { ascending: false })
    .limit(PER_ENTITY_CAP);

  return (data ?? []).map((r) => {
    const name = [r.first_name, r.last_name].filter(Boolean).join(" ") || r.email || "Unknown";
    return {
      entityType: "candidate" as const,
      id: r.id,
      title: name,
      subtitle: [r.current_title, r.current_company].filter(Boolean).join(" at ") || undefined,
      meta: { status: r.status ?? undefined, stage: r.stage ?? undefined, location: r.location ?? undefined, updated_at: r.updated_at ?? undefined },
      href: `/candidates/${r.id}`,
      _score: score(name, q),
    };
  });
}

async function searchJobs(
  supabase: SupabaseClient,
  orgId: string,
  q: string,
): Promise<SearchResult[]> {
  const { data } = await supabase
    .from("jobs")
    .select("id, title, department, location, status, hiring_project_title, updated_at")
    .eq("organization_id", orgId)
    .or(orIlike(["title", "department", "location", "hiring_project_title"], q))
    .order("updated_at", { ascending: false })
    .limit(PER_ENTITY_CAP);

  return (data ?? []).map((r) => ({
    entityType: "job" as const,
    id: r.id,
    title: r.title ?? "Untitled Job",
    subtitle: [r.department, r.location].filter(Boolean).join(" · ") || undefined,
    meta: { status: r.status ?? undefined, location: r.location ?? undefined, updated_at: r.updated_at ?? undefined },
    href: `/jobs/${r.id}`,
    _score: score(r.title ?? "", q),
  }));
}

async function searchApplications(
  supabase: SupabaseClient,
  orgId: string,
  q: string,
): Promise<SearchResult[]> {
  const { data } = await supabase
    .from("applications")
    .select("id, candidate_email, stage, status, updated_at, candidates(id, first_name, last_name)")
    .eq("organization_id", orgId)
    .or(orIlike(["candidate_email", "stage", "status"], q))
    .order("updated_at", { ascending: false })
    .limit(PER_ENTITY_CAP);

  return (data ?? []).map((r: Record<string, unknown>) => {
    const c = r.candidates as { first_name?: string; last_name?: string } | null;
    const cName = c ? [c.first_name, c.last_name].filter(Boolean).join(" ") : null;
    const title = cName || (r.candidate_email as string) || "Application";
    return {
      entityType: "application" as const,
      id: r.id as string,
      title,
      subtitle: [(r.stage as string), (r.status as string)].filter(Boolean).join(" · ") || undefined,
      meta: { stage: (r.stage as string) ?? undefined, status: (r.status as string) ?? undefined, updated_at: (r.updated_at as string) ?? undefined },
      href: `/applications/${r.id}`,
      _score: score(title, q),
    };
  });
}

async function searchSubmittals(
  supabase: SupabaseClient,
  orgId: string,
  q: string,
): Promise<SearchResult[]> {
  const { data } = await supabase
    .from("submittals")
    .select("id, email, location_text, state, updated_at, candidates(id, first_name, last_name)")
    .eq("organization_id", orgId)
    .or(orIlike(["email", "location_text"], q))
    .order("updated_at", { ascending: false })
    .limit(PER_ENTITY_CAP);

  return (data ?? []).map((r: Record<string, unknown>) => {
    const c = r.candidates as { first_name?: string; last_name?: string } | null;
    const cName = c ? [c.first_name, c.last_name].filter(Boolean).join(" ") : null;
    const title = cName || (r.email as string) || "Submittal";
    return {
      entityType: "submittal" as const,
      id: r.id as string,
      title,
      subtitle: (r.location_text as string) ?? undefined,
      meta: { state: (r.state as string) ?? undefined, updated_at: (r.updated_at as string) ?? undefined },
      href: `/submittals/${r.id}`,
      _score: score(title, q),
    };
  });
}

async function searchPlacements(
  supabase: SupabaseClient,
  orgId: string,
  q: string,
): Promise<SearchResult[]> {
  const { data } = await supabase
    .from("placements")
    .select("id, status, start_date, updated_at, candidates(id, first_name, last_name), jobs(id, title)")
    .eq("organization_id", orgId)
    .or(orIlike(["status"], q))
    .order("updated_at", { ascending: false })
    .limit(PER_ENTITY_CAP);

  return (data ?? []).map((r: Record<string, unknown>) => {
    const c = r.candidates as { first_name?: string; last_name?: string } | null;
    const j = r.jobs as { title?: string } | null;
    const cName = c ? [c.first_name, c.last_name].filter(Boolean).join(" ") : null;
    const title = cName || "Placement";
    return {
      entityType: "placement" as const,
      id: r.id as string,
      title,
      subtitle: j?.title ?? undefined,
      meta: { status: (r.status as string) ?? undefined, updated_at: (r.updated_at as string) ?? undefined },
      href: `/placements/${r.id}`,
      _score: score(title, q),
    };
  });
}

async function searchAssignments(
  supabase: SupabaseClient,
  orgId: string,
  q: string,
): Promise<SearchResult[]> {
  const { data } = await supabase
    .from("assignments")
    .select("id, client_name, engagement_type, state, updated_at, candidates(id, first_name, last_name), jobs(id, title)")
    .eq("organization_id", orgId)
    .or(orIlike(["client_name", "engagement_type"], q))
    .order("updated_at", { ascending: false })
    .limit(PER_ENTITY_CAP);

  return (data ?? []).map((r: Record<string, unknown>) => {
    const c = r.candidates as { first_name?: string; last_name?: string } | null;
    const j = r.jobs as { title?: string } | null;
    const cName = c ? [c.first_name, c.last_name].filter(Boolean).join(" ") : null;
    const title = cName || (r.client_name as string) || "Assignment";
    return {
      entityType: "assignment" as const,
      id: r.id as string,
      title,
      subtitle: [j?.title, r.client_name as string].filter(Boolean).join(" · ") || undefined,
      meta: { state: (r.state as string) ?? undefined, updated_at: (r.updated_at as string) ?? undefined },
      href: `/assignments/${r.id}`,
      _score: score(title, q),
    };
  });
}

async function searchClients(
  supabase: SupabaseClient,
  orgId: string,
  q: string,
): Promise<SearchResult[]> {
  const { data } = await supabase
    .from("clients")
    .select("id, name, industry, contact_name, contact_email, status, tier, updated_at")
    .eq("organization_id", orgId)
    .or(orIlike(["name", "industry", "contact_name", "contact_email"], q))
    .order("updated_at", { ascending: false })
    .limit(PER_ENTITY_CAP);

  return (data ?? []).map((r) => ({
    entityType: "client" as const,
    id: r.id,
    title: r.name ?? "Unknown Client",
    subtitle: [r.industry, r.contact_name].filter(Boolean).join(" · ") || undefined,
    meta: { status: r.status ?? undefined, updated_at: r.updated_at ?? undefined },
    href: `/clients/${r.id}`,
    _score: score(r.name ?? "", q),
  }));
}

async function searchCompanies(
  supabase: SupabaseClient,
  orgId: string,
  q: string,
): Promise<SearchResult[]> {
  const { data } = await supabase
    .from("companies")
    .select("id, name, industry, headquarters, status, updated_at")
    .eq("organization_id", orgId)
    .is("deleted_at", null)
    .or(orIlike(["name", "industry", "headquarters"], q))
    .order("updated_at", { ascending: false })
    .limit(PER_ENTITY_CAP);

  return (data ?? []).map((r) => ({
    entityType: "company" as const,
    id: r.id,
    title: r.name ?? "Unknown Company",
    subtitle: [r.industry, r.headquarters].filter(Boolean).join(" · ") || undefined,
    meta: { status: r.status ?? undefined, updated_at: r.updated_at ?? undefined },
    href: `/companies/${r.id}`,
    _score: score(r.name ?? "", q),
  }));
}

async function searchContacts(
  supabase: SupabaseClient,
  orgId: string,
  q: string,
): Promise<SearchResult[]> {
  const { data } = await supabase
    .from("contacts")
    .select("id, first_name, last_name, email, title, status, updated_at")
    .eq("organization_id", orgId)
    .or(orIlike(["first_name", "last_name", "email", "title"], q))
    .order("updated_at", { ascending: false })
    .limit(PER_ENTITY_CAP);

  return (data ?? []).map((r) => {
    const name = [r.first_name, r.last_name].filter(Boolean).join(" ") || r.email || "Unknown";
    return {
      entityType: "contact" as const,
      id: r.id,
      title: name,
      subtitle: r.title ?? undefined,
      meta: { status: r.status ?? undefined, updated_at: r.updated_at ?? undefined },
      href: `/contacts/${r.id}`,
      _score: score(name, q),
    };
  });
}

/* ── Entity-to-searcher map ── */
const SEARCHERS: Record<SearchEntity, (s: SupabaseClient, o: string, q: string) => Promise<SearchResult[]>> = {
  candidate: searchCandidates,
  job: searchJobs,
  application: searchApplications,
  submittal: searchSubmittals,
  placement: searchPlacements,
  assignment: searchAssignments,
  client: searchClients,
  company: searchCompanies,
  contact: searchContacts,
};

type ScoredResult = SearchResult & { _score?: number };

/* ── Main search orchestrator ── */
export async function globalSearch(
  supabase: SupabaseClient,
  opts: { q: string; entity?: SearchEntity; page: number; pageSize: number },
) {
  const orgId = await resolveOrgId(supabase);

  const entitiesToSearch: SearchEntity[] = opts.entity
    ? [opts.entity]
    : (Object.keys(SEARCHERS) as SearchEntity[]);

  // Parallel search across selected entities
  const settled = await Promise.allSettled(
    entitiesToSearch.map((e) => SEARCHERS[e](supabase, orgId, opts.q)),
  );

  const perEntityCounts: Record<string, number> = {};
  let allResults: ScoredResult[] = [];

  for (let i = 0; i < entitiesToSearch.length; i++) {
    const entity = entitiesToSearch[i];
    const result = settled[i];
    if (result.status === "fulfilled") {
      perEntityCounts[entity] = result.value.length;
      allResults = allResults.concat(result.value as ScoredResult[]);
    } else {
      perEntityCounts[entity] = 0;
    }
  }

  // Sort: score desc, then updated_at desc
  allResults.sort((a, b) => {
    const sa = a._score ?? 40;
    const sb = b._score ?? 40;
    if (sb !== sa) return sb - sa;
    const da = a.meta?.updated_at ?? "";
    const db = b.meta?.updated_at ?? "";
    return db.localeCompare(da);
  });

  // Strip internal _score before returning
  const cleaned: SearchResult[] = allResults.map(({ _score, ...rest }) => rest);

  // Paginate
  const total = cleaned.length;
  const from = (opts.page - 1) * opts.pageSize;
  const items = cleaned.slice(from, from + opts.pageSize);

  return { items, total, page: opts.page, pageSize: opts.pageSize, perEntityCounts };
}
