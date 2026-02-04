import { z } from "zod";

export const SearchEntityValues = [
  "candidate",
  "job",
  "application",
  "submittal",
  "placement",
  "assignment",
  "client",
  "company",
  "contact",
] as const;
export type SearchEntity = (typeof SearchEntityValues)[number];

export const searchParamsSchema = z.object({
  q: z.string().min(2).max(200),
  entity: z.enum(SearchEntityValues).optional(),
  page: z.coerce.number().int().min(1).default(1),
  pageSize: z.coerce.number().int().min(1).max(50).default(20),
});
export type SearchParams = z.infer<typeof searchParamsSchema>;

export interface SearchResult {
  entityType: SearchEntity;
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

export interface SearchResponse {
  items: SearchResult[];
  total: number;
  page: number;
  pageSize: number;
  perEntityCounts: Record<string, number>;
}
