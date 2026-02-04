/**
 * Maps activities.entity_type values to the corresponding app detail routes.
 * Conservative: only entity types with existing /[id] pages are included.
 * Unknown types return null (renders as non-clickable chip).
 */
const ENTITY_ROUTE_MAP: Record<string, string> = {
  candidate: "/candidates",
  job: "/jobs",
  submittal: "/submittals",
  application: "/applications",
  interview: "/interviews",
  offer: "/offers",
  placement: "/placements",
  assignment: "/assignments",
  bench_entry: "/bench",
  client: "/clients",
  company: "/companies",
  contact: "/contacts",
};

/**
 * Resolve a detail page href for a given entity_type + entity_id.
 * Returns null if the entity_type is not mapped (unknown / unmapped).
 */
export function entityDetailHref(
  entityType: string,
  entityId: string,
): string | null {
  const base = ENTITY_ROUTE_MAP[entityType];
  if (!base) return null;
  return `${base}/${entityId}`;
}

/** Human-readable label for an entity_type value */
const ENTITY_LABEL_MAP: Record<string, string> = {
  candidate: "Candidate",
  job: "Job",
  submittal: "Submittal",
  application: "Application",
  interview: "Interview",
  offer: "Offer",
  placement: "Placement",
  assignment: "Assignment",
  bench_entry: "Bench",
  client: "Client",
  company: "Company",
  contact: "Contact",
};

export function entityLabel(entityType: string): string {
  return ENTITY_LABEL_MAP[entityType] ?? entityType;
}
