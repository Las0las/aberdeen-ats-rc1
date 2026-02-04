// AUTO-GENERATED — DO NOT EDIT
// Source: enums_public.json (contract-locked)
// Generated: 2026-02-03T20:20:16.233Z

export const ApplicationStageValues = ["NEW", "OUTREACH", "SCREENING", "SUBMISSION", "INTERVIEW", "OFFER", "HIRED", "REJECTED", "WITHDRAWN"] as const;
export type ApplicationStage = (typeof ApplicationStageValues)[number];

export const AssignmentStateValues = ["PROPOSED", "ACTIVE", "EXTENDED", "ENDED", "TERMINATED"] as const;
export type AssignmentState = (typeof AssignmentStateValues)[number];

export const BenchStateValues = ["ON_BENCH", "REMARKETING", "IN_PROCESS", "PLACED", "EXITED"] as const;
export type BenchState = (typeof BenchStateValues)[number];

export const ClientChannelValues = ["EMAIL", "LINK"] as const;
export type ClientChannel = (typeof ClientChannelValues)[number];

export const CompUnitValues = ["hourly", "daily", "salary"] as const;
export type CompUnit = (typeof CompUnitValues)[number];

export const EmploymentTypeValues = ["W2", "C2C", "1099", "FTE"] as const;
export type EmploymentType = (typeof EmploymentTypeValues)[number];

export const InterviewStateValues = ["SCHEDULED", "COMPLETED", "NO_SHOW", "CANCELLED"] as const;
export type InterviewState = (typeof InterviewStateValues)[number];

export const JobStatusValues = ["DRAFT", "ACTIVE", "PAUSED", "CLOSED", "ARCHIVED"] as const;
export type JobStatus = (typeof JobStatusValues)[number];

export const OfferStateValues = ["DRAFT", "PENDING_APPROVAL", "SENT", "ACCEPTED", "DECLINED", "RESCINDED"] as const;
export type OfferState = (typeof OfferStateValues)[number];

export const StartStateValues = ["PLANNED", "CONFIRMED", "STARTED", "DELAYED", "CANCELLED"] as const;
export type StartState = (typeof StartStateValues)[number];

export const SubmittalStateValues = ["DRAFT", "AI_GENERATED", "RECRUITER_REVIEWED", "SUBMITTED", "VIEWED", "CLIENT_FEEDBACK", "INTERVIEW", "OFFER", "START", "REJECTED", "WITHDRAWN"] as const;
export type SubmittalState = (typeof SubmittalStateValues)[number];

/** All enum types keyed by DB enum name */
export interface DbEnums {
  application_stage: ApplicationStage;
  assignment_state: AssignmentState;
  bench_state: BenchState;
  client_channel: ClientChannel;
  comp_unit: CompUnit;
  employment_type: EmploymentType;
  interview_state: InterviewState;
  job_status: JobStatus;
  offer_state: OfferState;
  start_state: StartState;
  submittal_state: SubmittalState;
}
