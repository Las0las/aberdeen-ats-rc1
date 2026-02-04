import { z } from "zod";
import { ApplicationStageValues } from "@/contracts/db/enums";

export const stageChangeBodySchema = z.object({
  stage: z.enum(ApplicationStageValues),
  reason: z.string().max(500).optional(),
});
export type StageChangeBody = z.infer<typeof stageChangeBodySchema>;

/** Lean response — no jsonb, no blobs */
export interface StageChangeResponse {
  id: string;
  oldStage: string | null;
  newStage: string;
  updatedAt: string;
}
