import type { SupabaseClient } from "@supabase/supabase-js";
import type { OffersRow } from "@/contracts/db/tables";

// ── Safe fields ────────────────────────────────────────────────────
// Excludes: metadata (opaque blob)
// Note: salary_amount is core to offers, not excluded

const OFFER_FIELDS = [
  "id",
  "organization_id",
  "submission_id",
  "salary_amount",
  "salary_currency",
  "equity_percentage",
  "start_date",
  "offer_letter_url",
  "status",
  "sent_at",
  "accepted_at",
  "declined_at",
  "notes",
  "created_at",
  "updated_at",
].join(",");

// Join through submittals to reach candidate + job
const SUBMITTAL_JOIN =
  "submittals(id,candidate_id,job_id,candidates(id,first_name,last_name,current_title,email),jobs(id,title,department,location))";

export interface OfferWithRelations extends OffersRow {
  submittals: {
    id: string;
    candidate_id: string | null;
    job_id: string | null;
    candidates: {
      id: string;
      first_name: string | null;
      last_name: string | null;
      current_title: string | null;
      email: string | null;
    } | null;
    jobs: {
      id: string;
      title: string;
      department: string | null;
      location: string | null;
    } | null;
  } | null;
}

async function resolveOrgId(supabase: SupabaseClient): Promise<string> {
  const { data, error } = await supabase.rpc("current_org_id");
  if (error || !data) throw new Error("Unable to resolve organization");
  return data as string;
}

// ── List ───────────────────────────────────────────────────────────

export async function listOffers(
  supabase: SupabaseClient,
  opts: {
    status?: string;
    search?: string;
    page: number;
    limit: number;
  },
) {
  const orgId = await resolveOrgId(supabase);
  const from = (opts.page - 1) * opts.limit;
  const to = from + opts.limit - 1;

  let query = supabase
    .from("offers")
    .select(`${OFFER_FIELDS}, ${SUBMITTAL_JOIN}`, { count: "exact" })
    .eq("organization_id", orgId)
    .order("created_at", { ascending: false })
    .range(from, to);

  if (opts.status) {
    query = query.eq("status", opts.status);
  }

  const { data, error, count } = await query;
  if (error) throw error;

  let results = (data ?? []) as unknown as OfferWithRelations[];

  if (opts.search) {
    const term = opts.search.toLowerCase();
    results = results.filter((r) => {
      const cName = [
        r.submittals?.candidates?.first_name,
        r.submittals?.candidates?.last_name,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();
      const jTitle =
        r.submittals?.jobs?.title?.toLowerCase() ?? "";
      return cName.includes(term) || jTitle.includes(term);
    });
  }

  return { offers: results, total: count ?? 0 };
}

// ── Get by ID ──────────────────────────────────────────────────────

export async function getOffer(
  supabase: SupabaseClient,
  id: string,
): Promise<OfferWithRelations> {
  const orgId = await resolveOrgId(supabase);

  const { data, error } = await supabase
    .from("offers")
    .select(`${OFFER_FIELDS}, ${SUBMITTAL_JOIN}`)
    .eq("organization_id", orgId)
    .eq("id", id)
    .single();

  if (error) throw error;
  return data as unknown as OfferWithRelations;
}
