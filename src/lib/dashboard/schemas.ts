import { z } from "zod";
import type { ApplicationStage } from "@/contracts/db/enums";

/**
 * Dashboard query params — currently no required filters.
 * Zod-validated at the API boundary even though empty,
 * to be forward-compatible with future filter additions.
 */
export const dashboardParamsSchema = z.object({});
export type DashboardParams = z.infer<typeof dashboardParamsSchema>;

/** Exact response shape per spec */
export interface DashboardResponse {
  pipeline: {
    total: number;
    byStage: Record<ApplicationStage, number>;
    aging: {
      over7Days: number;
      over14Days: number;
      over30Days: number;
    };
  };
  bench: {
    total: number;
    remarketing: number;
    avgDaysOnBench: number;
  };
  assignments: {
    active: number;
    endingSoon: number;
  };
  placements: {
    startedThisWeek: number;
    upcomingStarts: number;
  };
}
