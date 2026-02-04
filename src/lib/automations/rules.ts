import type { RuleTemplate } from "./schemas";

/**
 * V1 rule templates — used to seed automation_rules and as
 * fallback definitions when no DB rules exist yet.
 *
 * CONTRACT NOTE: The automation_rules table stores trigger_type
 * and trigger_config as the canonical source of truth. These
 * templates provide defaults only.
 */
export const RULE_TEMPLATES: RuleTemplate[] = [
  {
    id: "tpl_stale_stage",
    name: "Stale Pipeline Stage",
    description:
      "Fires when an application has been in the same stage for longer than the window (days since applied_date).",
    severity: "warning",
    entityType: "application",
    condition: "stale_stage",
    defaultWindowDays: 14,
  },
  {
    id: "tpl_bench_aging",
    name: "Bench Aging",
    description:
      "Fires when a bench entry has been active (no bench_ended_at) for longer than the window.",
    severity: "warning",
    entityType: "bench_entry",
    condition: "bench_aging",
    defaultWindowDays: 30,
  },
  {
    id: "tpl_no_followup_submittal",
    name: "No Next Step After Submittal",
    description:
      "Fires when a submittal was created but no interview exists for the same candidate+job within the window.",
    severity: "info",
    entityType: "submittal",
    condition: "no_followup_after_submittal",
    defaultWindowDays: 7,
  },
  {
    id: "tpl_interview_no_feedback",
    name: "Interview — No Feedback",
    description:
      "Fires when an interview was scheduled and has passed but no feedback record exists within the window.",
    severity: "warning",
    entityType: "interview",
    condition: "interview_no_feedback",
    defaultWindowDays: 3,
  },
  {
    id: "tpl_offer_no_response",
    name: "Offer Sent — No Response",
    description:
      "Fires when an offer was sent but has not been accepted or declined within the window.",
    severity: "critical",
    entityType: "offer",
    condition: "offer_no_response",
    defaultWindowDays: 5,
  },
];

export function getTemplateByCondition(
  condition: string,
): RuleTemplate | undefined {
  return RULE_TEMPLATES.find((t) => t.condition === condition);
}
