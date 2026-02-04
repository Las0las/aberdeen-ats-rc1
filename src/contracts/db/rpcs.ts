// AUTO-GENERATED — DO NOT EDIT
// Source: rpc_signatures_public.json (contract-locked)
// Generated: 2026-02-03T20:20:16.253Z

import type { SupabaseClient } from "@supabase/supabase-js";
import type {
  BackgroundChecksRow,
  EmailLogsRow,
  IntegrationConnectionsRow,
  SubmissionPackagesRow,
  SubmittalsRow,
  WebhookLogsRow,
} from "./tables";
import type {
  AssignmentState,
  BenchState,
  ClientChannel,
  InterviewState,
  OfferState,
  SubmittalState,
} from "./enums";

export interface ActivitiesAppendEventInput {
  p_workspace_id: string;
  p_user_id: string;
  p_user_email: string;
  p_action_type: string;
  p_entity_type: string;
  p_entity_id: string;
  p_candidate_id: string;
  p_job_id: string;
  p_application_id: string;
  p_metadata: Record<string, unknown>;
  p_description: string;
}

export async function activitiesAppendEvent(
  supabase: SupabaseClient,
  params: ActivitiesAppendEventInput,
): Promise<string> {
  const { data, error } = await supabase.rpc("activities_append_event", { ...params });
  if (error) throw error;
  return data as string;
}

export interface ApplicationsTransitionStageInput {
  p_application_id: string;
  p_to_stage: string;
  p_actor_id: string;
}

export async function applicationsTransitionStage(
  supabase: SupabaseClient,
  params: ApplicationsTransitionStageInput,
): Promise<Record<string, unknown>> {
  const { data, error } = await supabase.rpc("applications_transition_stage", { ...params });
  if (error) throw error;
  return data as Record<string, unknown>;
}

export interface AssertEventEmittedV1Input {
  expected_event: string;
  aggregate_id: string;
  payload_entity_key: string;
}

export async function assertEventEmittedv1(
  supabase: SupabaseClient,
  params: AssertEventEmittedV1Input,
): Promise<void> {
  const { data, error } = await supabase.rpc("assert_event_emitted", { ...params });
  if (error) throw error;
  return;
}

export interface AssertEventEmittedV2Input {
  expected_event: string;
  entity_id: string;
}

export async function assertEventEmittedv2(
  supabase: SupabaseClient,
  params: AssertEventEmittedV2Input,
): Promise<void> {
  const { data, error } = await supabase.rpc("assert_event_emitted", { ...params });
  if (error) throw error;
  return;
}

export interface AssignmentsEndInput {
  p_assignment_id: string;
  p_actor_id: string;
}

export async function assignmentsEnd(
  supabase: SupabaseClient,
  params: AssignmentsEndInput,
): Promise<Record<string, unknown>> {
  const { data, error } = await supabase.rpc("assignments_end", { ...params });
  if (error) throw error;
  return data as Record<string, unknown>;
}

export interface AssignmentsEndAndAutoBenchInput {
  p_assignment_id: string;
  p_end_date: string;
  p_actor: string;
  p_reason: string;
}

export interface AssignmentsEndAndAutoBenchResult {
  assignment_id: string;
  prev_state: AssignmentState;
  next_state: AssignmentState;
  prev_end_date: string;
  new_end_date: string;
  engagement_type: string;
  bench_entry_id: string;
  benched: boolean;
}

export async function assignmentsEndAndAutoBench(
  supabase: SupabaseClient,
  params: AssignmentsEndAndAutoBenchInput,
): Promise<AssignmentsEndAndAutoBenchResult[]> {
  const { data, error } = await supabase.rpc("assignments_end_and_auto_bench", { ...params });
  if (error) throw error;
  return data as AssignmentsEndAndAutoBenchResult[];
}

export interface AssignmentsExtendInput {
  p_assignment_id: string;
  p_new_end_date: string;
  p_actor: string;
}

export interface AssignmentsExtendResult {
  id: string;
  from_end_date: string;
  to_end_date: string;
  state: AssignmentState;
}

export async function assignmentsExtend(
  supabase: SupabaseClient,
  params: AssignmentsExtendInput,
): Promise<AssignmentsExtendResult[]> {
  const { data, error } = await supabase.rpc("assignments_extend", { ...params });
  if (error) throw error;
  return data as AssignmentsExtendResult[];
}

export interface AssignmentsExtendContractInput {
  p_assignment_id: string;
  p_new_end_date: string;
  p_actor: string;
  p_actor_email: string;
  p_reason: string;
  p_metadata: Record<string, unknown>;
}

export interface AssignmentsExtendContractResult {
  assignment_id: string;
  prev_end_date: string;
  new_end_date: string;
  workspace_id: string;
  candidate_id: string;
  job_id: string;
  extension_id: string;
  activity_id: string;
}

export async function assignmentsExtendContract(
  supabase: SupabaseClient,
  params: AssignmentsExtendContractInput,
): Promise<AssignmentsExtendContractResult[]> {
  const { data, error } = await supabase.rpc("assignments_extend_contract", { ...params });
  if (error) throw error;
  return data as AssignmentsExtendContractResult[];
}

export interface AutomationRulesCreateInput {
  input: Record<string, unknown>;
}

export async function automationRulesCreate(
  supabase: SupabaseClient,
  params: AutomationRulesCreateInput,
): Promise<Record<string, unknown>> {
  const { data, error } = await supabase.rpc("automation_rules_create", { ...params });
  if (error) throw error;
  return data as Record<string, unknown>;
}

export interface AutomationRulesToggleInput {
  rule_id: string;
  enabled: boolean;
}

export async function automationRulesToggle(
  supabase: SupabaseClient,
  params: AutomationRulesToggleInput,
): Promise<Record<string, unknown>> {
  const { data, error } = await supabase.rpc("automation_rules_toggle", { ...params });
  if (error) throw error;
  return data as Record<string, unknown>;
}

export interface AwardViralRewardInput {
  p_recipient_id: string;
  p_recipient_type: string;
  p_reward_type: string;
  p_reward_amount: number;
  p_reward_description: string;
  p_source_type: string;
  p_source_id: string;
}

export async function awardViralReward(
  supabase: SupabaseClient,
  params: AwardViralRewardInput,
): Promise<string> {
  const { data, error } = await supabase.rpc("award_viral_reward", { ...params });
  if (error) throw error;
  return data as string;
}

export interface BenchPlaceAndCloseInput {
  p_bench_entry_id: string;
  p_new_assignment_id: string;
  p_actor: string;
  p_notes: string;
}

export interface BenchPlaceAndCloseResult {
  bench_entry_id: string;
  assignment_id: string;
  prev_state: BenchState;
  next_state: BenchState;
}

export async function benchPlaceAndClose(
  supabase: SupabaseClient,
  params: BenchPlaceAndCloseInput,
): Promise<BenchPlaceAndCloseResult[]> {
  const { data, error } = await supabase.rpc("bench_place_and_close", { ...params });
  if (error) throw error;
  return data as BenchPlaceAndCloseResult[];
}

export interface BenchTransitionStateInput {
  p_bench_entry_id: string;
  p_next_state: BenchState;
  p_actor: string;
  p_notes: string;
}

export interface BenchTransitionStateResult {
  bench_entry_id: string;
  prev_state: BenchState;
  next_state: BenchState;
}

export async function benchTransitionState(
  supabase: SupabaseClient,
  params: BenchTransitionStateInput,
): Promise<BenchTransitionStateResult[]> {
  const { data, error } = await supabase.rpc("bench_transition_state", { ...params });
  if (error) throw error;
  return data as BenchTransitionStateResult[];
}

export interface BillingActivateInput {
  billing_id: string;
}

export async function billingActivate(
  supabase: SupabaseClient,
  params: BillingActivateInput,
): Promise<Record<string, unknown>> {
  const { data, error } = await supabase.rpc("billing_activate", { ...params });
  if (error) throw error;
  return data as Record<string, unknown>;
}

export interface BillingCancelInput {
  billing_id: string;
  reason: string;
}

export async function billingCancel(
  supabase: SupabaseClient,
  params: BillingCancelInput,
): Promise<Record<string, unknown>> {
  const { data, error } = await supabase.rpc("billing_cancel", { ...params });
  if (error) throw error;
  return data as Record<string, unknown>;
}

export interface BillingCreateInput {
  input: Record<string, unknown>;
}

export async function billingCreate(
  supabase: SupabaseClient,
  params: BillingCreateInput,
): Promise<Record<string, unknown>> {
  const { data, error } = await supabase.rpc("billing_create", { ...params });
  if (error) throw error;
  return data as Record<string, unknown>;
}

export interface CalculateAberdeenCommissionInput {
  p_placement_fee: number;
  p_commission_rate: number;
}

export interface CalculateAberdeenCommissionResult {
  aberdeen_commission: number;
  agency_payout: number;
}

export async function calculateAberdeenCommission(
  supabase: SupabaseClient,
  params: CalculateAberdeenCommissionInput,
): Promise<CalculateAberdeenCommissionResult[]> {
  const { data, error } = await supabase.rpc("calculate_aberdeen_commission", { ...params });
  if (error) throw error;
  return data as CalculateAberdeenCommissionResult[];
}

export interface CalculateCustomerLtvInput {
  p_subscriber_id: string;
}

export async function calculateCustomerLtv(
  supabase: SupabaseClient,
  params: CalculateCustomerLtvInput,
): Promise<number> {
  const { data, error } = await supabase.rpc("calculate_customer_ltv", { ...params });
  if (error) throw error;
  return data as number;
}

export interface CalculateViralCoefficientInput {
  p_time_period: string;
}

export async function calculateViralCoefficient(
  supabase: SupabaseClient,
  params: CalculateViralCoefficientInput,
): Promise<number> {
  const { data, error } = await supabase.rpc("calculate_viral_coefficient", { ...params });
  if (error) throw error;
  return data as number;
}

export interface CanAdminOrgInput {
  p_organization_id: string;
}

export async function canAdminOrg(
  supabase: SupabaseClient,
  params: CanAdminOrgInput,
): Promise<boolean> {
  const { data, error } = await supabase.rpc("can_admin_org", { ...params });
  if (error) throw error;
  return data as boolean;
}

export interface CandidatesCreateInput {
  input: Record<string, unknown>;
}

export async function candidatesCreate(
  supabase: SupabaseClient,
  params: CandidatesCreateInput,
): Promise<Record<string, unknown>> {
  const { data, error } = await supabase.rpc("candidates_create", { ...params });
  if (error) throw error;
  return data as Record<string, unknown>;
}

export interface CandidatesDeleteInput {
  candidate_id: string;
}

export async function candidatesDelete(
  supabase: SupabaseClient,
  params: CandidatesDeleteInput,
): Promise<Record<string, unknown>> {
  const { data, error } = await supabase.rpc("candidates_delete", { ...params });
  if (error) throw error;
  return data as Record<string, unknown>;
}

export interface CandidatesUpdateInput {
  candidate_id: string;
  input: Record<string, unknown>;
}

export async function candidatesUpdate(
  supabase: SupabaseClient,
  params: CandidatesUpdateInput,
): Promise<Record<string, unknown>> {
  const { data, error } = await supabase.rpc("candidates_update", { ...params });
  if (error) throw error;
  return data as Record<string, unknown>;
}

export interface CheckUserPermissionInput {
  p_user_id: string;
  p_resource: string;
  p_action: string;
}

export async function checkUserPermission(
  supabase: SupabaseClient,
  params: CheckUserPermissionInput,
): Promise<boolean> {
  const { data, error } = await supabase.rpc("check_user_permission", { ...params });
  if (error) throw error;
  return data as boolean;
}

export interface ClaimEventInput {
  p_event_id: string;
}

export async function claimEvent(
  supabase: SupabaseClient,
  params: ClaimEventInput,
): Promise<boolean> {
  const { data, error } = await supabase.rpc("claim_event", { ...params });
  if (error) throw error;
  return data as boolean;
}

export interface ClientsCreateInput {
  input: Record<string, unknown>;
}

export async function clientsCreate(
  supabase: SupabaseClient,
  params: ClientsCreateInput,
): Promise<Record<string, unknown>> {
  const { data, error } = await supabase.rpc("clients_create", { ...params });
  if (error) throw error;
  return data as Record<string, unknown>;
}

export interface ClientsUpdateInput {
  client_id: string;
  input: Record<string, unknown>;
}

export async function clientsUpdate(
  supabase: SupabaseClient,
  params: ClientsUpdateInput,
): Promise<Record<string, unknown>> {
  const { data, error } = await supabase.rpc("clients_update", { ...params });
  if (error) throw error;
  return data as Record<string, unknown>;
}

export interface CompaniesCreateInput {
  input: Record<string, unknown>;
}

export async function companiesCreate(
  supabase: SupabaseClient,
  params: CompaniesCreateInput,
): Promise<Record<string, unknown>> {
  const { data, error } = await supabase.rpc("companies_create", { ...params });
  if (error) throw error;
  return data as Record<string, unknown>;
}

export interface CompaniesUpdateInput {
  company_id: string;
  input: Record<string, unknown>;
}

export async function companiesUpdate(
  supabase: SupabaseClient,
  params: CompaniesUpdateInput,
): Promise<Record<string, unknown>> {
  const { data, error } = await supabase.rpc("companies_update", { ...params });
  if (error) throw error;
  return data as Record<string, unknown>;
}

export interface ComplianceCreateInput {
  input: Record<string, unknown>;
}

export async function complianceCreate(
  supabase: SupabaseClient,
  params: ComplianceCreateInput,
): Promise<Record<string, unknown>> {
  const { data, error } = await supabase.rpc("compliance_create", { ...params });
  if (error) throw error;
  return data as Record<string, unknown>;
}

export interface ContactsCreateInput {
  input: Record<string, unknown>;
}

export async function contactsCreate(
  supabase: SupabaseClient,
  params: ContactsCreateInput,
): Promise<Record<string, unknown>> {
  const { data, error } = await supabase.rpc("contacts_create", { ...params });
  if (error) throw error;
  return data as Record<string, unknown>;
}

export interface ContactsUpdateInput {
  contact_id: string;
  input: Record<string, unknown>;
}

export async function contactsUpdate(
  supabase: SupabaseClient,
  params: ContactsUpdateInput,
): Promise<Record<string, unknown>> {
  const { data, error } = await supabase.rpc("contacts_update", { ...params });
  if (error) throw error;
  return data as Record<string, unknown>;
}

export interface ContractsCreateInput {
  input: Record<string, unknown>;
}

export async function contractsCreate(
  supabase: SupabaseClient,
  params: ContractsCreateInput,
): Promise<Record<string, unknown>> {
  const { data, error } = await supabase.rpc("contracts_create", { ...params });
  if (error) throw error;
  return data as Record<string, unknown>;
}

export interface ContractsSignInput {
  contract_id: string;
  signed_by: string;
}

export async function contractsSign(
  supabase: SupabaseClient,
  params: ContractsSignInput,
): Promise<Record<string, unknown>> {
  const { data, error } = await supabase.rpc("contracts_sign", { ...params });
  if (error) throw error;
  return data as Record<string, unknown>;
}

export interface ContractsTerminateInput {
  contract_id: string;
  reason: string;
}

export async function contractsTerminate(
  supabase: SupabaseClient,
  params: ContractsTerminateInput,
): Promise<Record<string, unknown>> {
  const { data, error } = await supabase.rpc("contracts_terminate", { ...params });
  if (error) throw error;
  return data as Record<string, unknown>;
}

export interface ContractsUpdateInput {
  contract_id: string;
  input: Record<string, unknown>;
}

export async function contractsUpdate(
  supabase: SupabaseClient,
  params: ContractsUpdateInput,
): Promise<Record<string, unknown>> {
  const { data, error } = await supabase.rpc("contracts_update", { ...params });
  if (error) throw error;
  return data as Record<string, unknown>;
}

export interface CreateIntegrationConnectionV1Input {
  p_organization_id: string;
  p_provider: string;
  p_category: string;
  p_external_id: string;
  p_settings: Record<string, unknown>;
}

export async function createIntegrationConnectionV1(
  supabase: SupabaseClient,
  params: CreateIntegrationConnectionV1Input,
): Promise<IntegrationConnectionsRow> {
  const { data, error } = await supabase.rpc("create_integration_connection_v1", { ...params });
  if (error) throw error;
  return data as IntegrationConnectionsRow;
}

export async function currentOrg(
  supabase: SupabaseClient,
): Promise<string> {
  const { data, error } = await supabase.rpc("current_org");
  if (error) throw error;
  return data as string;
}

export async function currentOrgId(
  supabase: SupabaseClient,
): Promise<string> {
  const { data, error } = await supabase.rpc("current_org_id");
  if (error) throw error;
  return data as string;
}

export async function currentOrganizationId(
  supabase: SupabaseClient,
): Promise<string> {
  const { data, error } = await supabase.rpc("current_organization_id");
  if (error) throw error;
  return data as string;
}

export async function currentUserRole(
  supabase: SupabaseClient,
): Promise<string> {
  const { data, error } = await supabase.rpc("current_user_role");
  if (error) throw error;
  return data as string;
}

export interface DashboardsCreateInput {
  input: Record<string, unknown>;
}

export async function dashboardsCreate(
  supabase: SupabaseClient,
  params: DashboardsCreateInput,
): Promise<Record<string, unknown>> {
  const { data, error } = await supabase.rpc("dashboards_create", { ...params });
  if (error) throw error;
  return data as Record<string, unknown>;
}

export interface DisconnectIntegrationV1Input {
  p_organization_id: string;
  p_provider: string;
}

export async function disconnectIntegrationV1(
  supabase: SupabaseClient,
  params: DisconnectIntegrationV1Input,
): Promise<IntegrationConnectionsRow> {
  const { data, error } = await supabase.rpc("disconnect_integration_v1", { ...params });
  if (error) throw error;
  return data as IntegrationConnectionsRow;
}

export interface DocumentsCreateInput {
  input: Record<string, unknown>;
}

export async function documentsCreate(
  supabase: SupabaseClient,
  params: DocumentsCreateInput,
): Promise<Record<string, unknown>> {
  const { data, error } = await supabase.rpc("documents_create", { ...params });
  if (error) throw error;
  return data as Record<string, unknown>;
}

export interface EmitEventInput {
  p_event_type: string;
  p_entity_type: string;
  p_entity_id: string;
  p_payload: Record<string, unknown>;
  p_metadata: Record<string, unknown>;
  p_organization_id: string;
}

export async function emitEvent(
  supabase: SupabaseClient,
  params: EmitEventInput,
): Promise<string> {
  const { data, error } = await supabase.rpc("emit_event", { ...params });
  if (error) throw error;
  return data as string;
}

export interface EmitEventV1V1Input {
  p_event_type: string;
  p_entity_type: string;
  p_entity_id: string;
  p_organization_id: string;
  p_payload: Record<string, unknown>;
  p_source: string;
}

export async function emitEventV1v1(
  supabase: SupabaseClient,
  params: EmitEventV1V1Input,
): Promise<string> {
  const { data, error } = await supabase.rpc("emit_event_v1", { ...params });
  if (error) throw error;
  return data as string;
}

export interface EmitEventV1V2Input {
  p_organization_id: string;
  p_event_type: string;
  p_aggregate_type: string;
  p_aggregate_id: string;
  p_payload: Record<string, unknown>;
  p_metadata: Record<string, unknown>;
}

export async function emitEventV1v2(
  supabase: SupabaseClient,
  params: EmitEventV1V2Input,
): Promise<string> {
  const { data, error } = await supabase.rpc("emit_event_v1", { ...params });
  if (error) throw error;
  return data as string;
}

export interface EmitEventV1V3Input {
  p_tenant_id: string;
  p_topic: string;
  p_aggregate_type: string;
  p_aggregate_id: string;
  p_payload: Record<string, unknown>;
}

export async function emitEventV1v3(
  supabase: SupabaseClient,
  params: EmitEventV1V3Input,
): Promise<string> {
  const { data, error } = await supabase.rpc("emit_event_v1", { ...params });
  if (error) throw error;
  return data as string;
}

export interface EnforceActionInput {
  p_action_key: string;
  p_entity_id: string;
  p_actor_id: string;
}

export async function enforceAction(
  supabase: SupabaseClient,
  params: EnforceActionInput,
): Promise<Record<string, unknown>> {
  const { data, error } = await supabase.rpc("enforce_action", { ...params });
  if (error) throw error;
  return data as Record<string, unknown>;
}

export interface ExpensesApproveInput {
  expense_id: string;
  approved_by: string;
}

export async function expensesApprove(
  supabase: SupabaseClient,
  params: ExpensesApproveInput,
): Promise<Record<string, unknown>> {
  const { data, error } = await supabase.rpc("expenses_approve", { ...params });
  if (error) throw error;
  return data as Record<string, unknown>;
}

export interface ExpensesCreateInput {
  input: Record<string, unknown>;
}

export async function expensesCreate(
  supabase: SupabaseClient,
  params: ExpensesCreateInput,
): Promise<Record<string, unknown>> {
  const { data, error } = await supabase.rpc("expenses_create", { ...params });
  if (error) throw error;
  return data as Record<string, unknown>;
}

export interface FetchPendingEventsInput {
  p_limit: number;
}

export interface FetchPendingEventsResult {
  id: string;
  organization_id: string;
  event_type: string;
  aggregate_type: string;
  aggregate_id: string;
  payload: Record<string, unknown>;
  metadata: Record<string, unknown>;
  attempts: number;
  created_at: string;
}

export async function fetchPendingEvents(
  supabase: SupabaseClient,
  params: FetchPendingEventsInput,
): Promise<FetchPendingEventsResult[]> {
  const { data, error } = await supabase.rpc("fetch_pending_events", { ...params });
  if (error) throw error;
  return data as FetchPendingEventsResult[];
}

export interface ForecastsCompleteInput {
  forecast_id: string;
  actual_value: number;
}

export async function forecastsComplete(
  supabase: SupabaseClient,
  params: ForecastsCompleteInput,
): Promise<Record<string, unknown>> {
  const { data, error } = await supabase.rpc("forecasts_complete", { ...params });
  if (error) throw error;
  return data as Record<string, unknown>;
}

export interface ForecastsCreateInput {
  input: Record<string, unknown>;
}

export async function forecastsCreate(
  supabase: SupabaseClient,
  params: ForecastsCreateInput,
): Promise<Record<string, unknown>> {
  const { data, error } = await supabase.rpc("forecasts_create", { ...params });
  if (error) throw error;
  return data as Record<string, unknown>;
}

export interface GdprDeleteCandidateInput {
  p_candidate_id: string;
}

export async function gdprDeleteCandidate(
  supabase: SupabaseClient,
  params: GdprDeleteCandidateInput,
): Promise<void> {
  const { data, error } = await supabase.rpc("gdpr_delete_candidate", { ...params });
  if (error) throw error;
  return;
}

export interface GenerateWorkspaceSlugInput {
  p_name: string;
}

export async function generateWorkspaceSlug(
  supabase: SupabaseClient,
  params: GenerateWorkspaceSlugInput,
): Promise<string> {
  const { data, error } = await supabase.rpc("generate_workspace_slug", { ...params });
  if (error) throw error;
  return data as string;
}

export interface GetBackgroundCheckV1Input {
  p_check_id: string;
}

export async function getBackgroundCheckV1(
  supabase: SupabaseClient,
  params: GetBackgroundCheckV1Input,
): Promise<BackgroundChecksRow> {
  const { data, error } = await supabase.rpc("get_background_check_v1", { ...params });
  if (error) throw error;
  return data as BackgroundChecksRow;
}

export interface GetCandidateByEmailInput {
  p_workspace_id: string;
  p_email: string;
}

export async function getCandidateByEmail(
  supabase: SupabaseClient,
  params: GetCandidateByEmailInput,
): Promise<string> {
  const { data, error } = await supabase.rpc("get_candidate_by_email", { ...params });
  if (error) throw error;
  return data as string;
}

export interface GetOrgBillingContextInput {
  p_organization_id: string;
}

export interface GetOrgBillingContextResult {
  organization_id: string;
  tenant_id: string;
  tenant_name: string;
  tenant_slug: string;
  domain: string;
  logo_url: string;
  subscription_tier: string;
  subscription_status: string;
  features: Record<string, unknown>;
}

export async function getOrgBillingContext(
  supabase: SupabaseClient,
  params: GetOrgBillingContextInput,
): Promise<GetOrgBillingContextResult[]> {
  const { data, error } = await supabase.rpc("get_org_billing_context", { ...params });
  if (error) throw error;
  return data as GetOrgBillingContextResult[];
}

export async function getUserDefaultOrganization(
  supabase: SupabaseClient,
): Promise<string> {
  const { data, error } = await supabase.rpc("get_user_default_organization");
  if (error) throw error;
  return data as string;
}

export async function getUserOrganizationId(
  supabase: SupabaseClient,
): Promise<string> {
  const { data, error } = await supabase.rpc("get_user_organization_id");
  if (error) throw error;
  return data as string;
}

export interface GetWorkspaceRoleInput {
  workspace_uuid: string;
}

export async function getWorkspaceRole(
  supabase: SupabaseClient,
  params: GetWorkspaceRoleInput,
): Promise<string> {
  const { data, error } = await supabase.rpc("get_workspace_role", { ...params });
  if (error) throw error;
  return data as string;
}

export interface IdempotencyCompleteV1Input {
  p_tenant_id: string;
  p_key: string;
  p_response: Record<string, unknown>;
}

export async function idempotencyCompleteV1(
  supabase: SupabaseClient,
  params: IdempotencyCompleteV1Input,
): Promise<void> {
  const { data, error } = await supabase.rpc("idempotency_complete_v1", { ...params });
  if (error) throw error;
  return;
}

export interface IdempotencyStartV1Input {
  p_tenant_id: string;
  p_key: string;
  p_request_hash: string;
}

export async function idempotencyStartV1(
  supabase: SupabaseClient,
  params: IdempotencyStartV1Input,
): Promise<Record<string, unknown>> {
  const { data, error } = await supabase.rpc("idempotency_start_v1", { ...params });
  if (error) throw error;
  return data as Record<string, unknown>;
}

export interface InitiateBackgroundCheckV1Input {
  p_candidate_id: string;
  p_organization_id: string;
  p_package_id: string;
  p_provider: string;
  p_application_id: string;
}

export async function initiateBackgroundCheckV1(
  supabase: SupabaseClient,
  params: InitiateBackgroundCheckV1Input,
): Promise<BackgroundChecksRow> {
  const { data, error } = await supabase.rpc("initiate_background_check_v1", { ...params });
  if (error) throw error;
  return data as BackgroundChecksRow;
}

export interface IntegrationsCreateInput {
  input: Record<string, unknown>;
}

export async function integrationsCreate(
  supabase: SupabaseClient,
  params: IntegrationsCreateInput,
): Promise<Record<string, unknown>> {
  const { data, error } = await supabase.rpc("integrations_create", { ...params });
  if (error) throw error;
  return data as Record<string, unknown>;
}

export interface IntegrationsSyncInput {
  integration_id: string;
}

export async function integrationsSync(
  supabase: SupabaseClient,
  params: IntegrationsSyncInput,
): Promise<Record<string, unknown>> {
  const { data, error } = await supabase.rpc("integrations_sync", { ...params });
  if (error) throw error;
  return data as Record<string, unknown>;
}

export interface InterviewsCanTransitionInput {
  p_prev: InterviewState;
  p_next: InterviewState;
}

export async function interviewsCanTransition(
  supabase: SupabaseClient,
  params: InterviewsCanTransitionInput,
): Promise<boolean> {
  const { data, error } = await supabase.rpc("interviews_can_transition", { ...params });
  if (error) throw error;
  return data as boolean;
}

export interface InterviewsCompleteInput {
  p_interview_id: string;
  p_actor_id: string;
}

export async function interviewsComplete(
  supabase: SupabaseClient,
  params: InterviewsCompleteInput,
): Promise<Record<string, unknown>> {
  const { data, error } = await supabase.rpc("interviews_complete", { ...params });
  if (error) throw error;
  return data as Record<string, unknown>;
}

export interface InterviewsScheduleInput {
  p_interview_id: string;
  p_scheduled_start_at: string;
  p_actor_id: string;
}

export async function interviewsSchedule(
  supabase: SupabaseClient,
  params: InterviewsScheduleInput,
): Promise<Record<string, unknown>> {
  const { data, error } = await supabase.rpc("interviews_schedule", { ...params });
  if (error) throw error;
  return data as Record<string, unknown>;
}

export interface InterviewsTransitionStateV1Input {
  p_interview_id: string;
  p_next_state: InterviewState;
  p_actor: string;
  p_reason: string;
}

export interface InterviewsTransitionStateV1Result {
  interview_id: string;
  prev_state: InterviewState;
  next_state: InterviewState;
}

export async function interviewsTransitionStateV1(
  supabase: SupabaseClient,
  params: InterviewsTransitionStateV1Input,
): Promise<InterviewsTransitionStateV1Result[]> {
  const { data, error } = await supabase.rpc("interviews_transition_state_v1", { ...params });
  if (error) throw error;
  return data as InterviewsTransitionStateV1Result[];
}

export interface InterviewsTransitionStateV2Input {
  p_interview_id: string;
  p_next_state: InterviewState;
  p_actor: string;
  p_notes: string;
}

export interface InterviewsTransitionStateV2Result {
  interview_id: string;
  prev_state: InterviewState;
  next_state: InterviewState;
  changed: boolean;
}

export async function interviewsTransitionStateV2(
  supabase: SupabaseClient,
  params: InterviewsTransitionStateV2Input,
): Promise<InterviewsTransitionStateV2Result[]> {
  const { data, error } = await supabase.rpc("interviews_transition_state_v2", { ...params });
  if (error) throw error;
  return data as InterviewsTransitionStateV2Result[];
}

export interface InvoicesCreateInput {
  input: Record<string, unknown>;
}

export async function invoicesCreate(
  supabase: SupabaseClient,
  params: InvoicesCreateInput,
): Promise<Record<string, unknown>> {
  const { data, error } = await supabase.rpc("invoices_create", { ...params });
  if (error) throw error;
  return data as Record<string, unknown>;
}

export interface InvoicesMarkPaidInput {
  invoice_id: string;
  paid_date: string;
}

export async function invoicesMarkPaid(
  supabase: SupabaseClient,
  params: InvoicesMarkPaidInput,
): Promise<Record<string, unknown>> {
  const { data, error } = await supabase.rpc("invoices_mark_paid", { ...params });
  if (error) throw error;
  return data as Record<string, unknown>;
}

export interface InvoicesSendInput {
  invoice_id: string;
}

export async function invoicesSend(
  supabase: SupabaseClient,
  params: InvoicesSendInput,
): Promise<Record<string, unknown>> {
  const { data, error } = await supabase.rpc("invoices_send", { ...params });
  if (error) throw error;
  return data as Record<string, unknown>;
}

export interface InvoicesUpdateInput {
  invoice_id: string;
  input: Record<string, unknown>;
}

export async function invoicesUpdate(
  supabase: SupabaseClient,
  params: InvoicesUpdateInput,
): Promise<Record<string, unknown>> {
  const { data, error } = await supabase.rpc("invoices_update", { ...params });
  if (error) throw error;
  return data as Record<string, unknown>;
}

export interface InvoicesVoidInput {
  invoice_id: string;
  reason: string;
}

export async function invoicesVoid(
  supabase: SupabaseClient,
  params: InvoicesVoidInput,
): Promise<Record<string, unknown>> {
  const { data, error } = await supabase.rpc("invoices_void", { ...params });
  if (error) throw error;
  return data as Record<string, unknown>;
}

export async function isCompliance(
  supabase: SupabaseClient,
): Promise<boolean> {
  const { data, error } = await supabase.rpc("is_compliance");
  if (error) throw error;
  return data as boolean;
}

export async function isOrgAdmin(
  supabase: SupabaseClient,
): Promise<boolean> {
  const { data, error } = await supabase.rpc("is_org_admin");
  if (error) throw error;
  return data as boolean;
}

export interface IsOrgMemberInput {
  p_org_id: string;
}

export async function isOrgMember(
  supabase: SupabaseClient,
  params: IsOrgMemberInput,
): Promise<boolean> {
  const { data, error } = await supabase.rpc("is_org_member", { ...params });
  if (error) throw error;
  return data as boolean;
}

export interface IsWorkspaceMemberV1Input {
  p_workspace_id: string;
  p_user_id: string;
}

export async function isWorkspaceMemberv1(
  supabase: SupabaseClient,
  params: IsWorkspaceMemberV1Input,
): Promise<boolean> {
  const { data, error } = await supabase.rpc("is_workspace_member", { ...params });
  if (error) throw error;
  return data as boolean;
}

export interface IsWorkspaceMemberV2Input {
  workspace_uuid: string;
}

export async function isWorkspaceMemberv2(
  supabase: SupabaseClient,
  params: IsWorkspaceMemberV2Input,
): Promise<boolean> {
  const { data, error } = await supabase.rpc("is_workspace_member", { ...params });
  if (error) throw error;
  return data as boolean;
}

export interface JobsCloseInput {
  job_id: string;
}

export async function jobsClose(
  supabase: SupabaseClient,
  params: JobsCloseInput,
): Promise<Record<string, unknown>> {
  const { data, error } = await supabase.rpc("jobs_close", { ...params });
  if (error) throw error;
  return data as Record<string, unknown>;
}

export interface JobsCreateInput {
  input: Record<string, unknown>;
}

export async function jobsCreate(
  supabase: SupabaseClient,
  params: JobsCreateInput,
): Promise<Record<string, unknown>> {
  const { data, error } = await supabase.rpc("jobs_create", { ...params });
  if (error) throw error;
  return data as Record<string, unknown>;
}

export interface JobsPublishInput {
  job_id: string;
}

export async function jobsPublish(
  supabase: SupabaseClient,
  params: JobsPublishInput,
): Promise<Record<string, unknown>> {
  const { data, error } = await supabase.rpc("jobs_publish", { ...params });
  if (error) throw error;
  return data as Record<string, unknown>;
}

export interface JobsUpdateInput {
  job_id: string;
  input: Record<string, unknown>;
}

export async function jobsUpdate(
  supabase: SupabaseClient,
  params: JobsUpdateInput,
): Promise<Record<string, unknown>> {
  const { data, error } = await supabase.rpc("jobs_update", { ...params });
  if (error) throw error;
  return data as Record<string, unknown>;
}

export interface LogApiUsageInput {
  p_api_key_id: string;
  p_endpoint: string;
  p_method: string;
  p_status_code: number;
  p_response_time_ms: number;
}

export async function logApiUsage(
  supabase: SupabaseClient,
  params: LogApiUsageInput,
): Promise<void> {
  const { data, error } = await supabase.rpc("log_api_usage", { ...params });
  if (error) throw error;
  return;
}

export interface LogEmailSentV1Input {
  p_organization_id: string;
  p_resend_id: string;
  p_template: string;
  p_recipient_email: string;
  p_subject: string;
  p_recipient_type: string;
  p_recipient_id: string;
  p_application_id: string;
  p_interview_id: string;
  p_offer_id: string;
}

export async function logEmailSentV1(
  supabase: SupabaseClient,
  params: LogEmailSentV1Input,
): Promise<EmailLogsRow> {
  const { data, error } = await supabase.rpc("log_email_sent_v1", { ...params });
  if (error) throw error;
  return data as EmailLogsRow;
}

export interface LogUserActivityInput {
  p_user_id: string;
  p_action: string;
  p_resource_type: string;
  p_resource_id: string;
  p_metadata: Record<string, unknown>;
}

export async function logUserActivity(
  supabase: SupabaseClient,
  params: LogUserActivityInput,
): Promise<string> {
  const { data, error } = await supabase.rpc("log_user_activity", { ...params });
  if (error) throw error;
  return data as string;
}

export interface LogWebhookV1Input {
  p_provider: string;
  p_event_type: string;
  p_payload: Record<string, unknown>;
  p_external_id: string;
  p_organization_id: string;
  p_headers: Record<string, unknown>;
}

export async function logWebhookV1(
  supabase: SupabaseClient,
  params: LogWebhookV1Input,
): Promise<WebhookLogsRow> {
  const { data, error } = await supabase.rpc("log_webhook_v1", { ...params });
  if (error) throw error;
  return data as WebhookLogsRow;
}

export async function makeShareToken(
  supabase: SupabaseClient,
): Promise<string> {
  const { data, error } = await supabase.rpc("make_share_token");
  if (error) throw error;
  return data as string;
}

export interface MarkEventFailedInput {
  p_event_id: string;
  p_error: string;
}

export async function markEventFailed(
  supabase: SupabaseClient,
  params: MarkEventFailedInput,
): Promise<boolean> {
  const { data, error } = await supabase.rpc("mark_event_failed", { ...params });
  if (error) throw error;
  return data as boolean;
}

export interface MarkEventProcessedInput {
  p_event_id: string;
}

export async function markEventProcessed(
  supabase: SupabaseClient,
  params: MarkEventProcessedInput,
): Promise<boolean> {
  const { data, error } = await supabase.rpc("mark_event_processed", { ...params });
  if (error) throw error;
  return data as boolean;
}

export interface MessagesCreateInput {
  input: Record<string, unknown>;
}

export async function messagesCreate(
  supabase: SupabaseClient,
  params: MessagesCreateInput,
): Promise<Record<string, unknown>> {
  const { data, error } = await supabase.rpc("messages_create", { ...params });
  if (error) throw error;
  return data as Record<string, unknown>;
}

export interface MessagesSendInput {
  message_id: string;
}

export async function messagesSend(
  supabase: SupabaseClient,
  params: MessagesSendInput,
): Promise<Record<string, unknown>> {
  const { data, error } = await supabase.rpc("messages_send", { ...params });
  if (error) throw error;
  return data as Record<string, unknown>;
}

export interface NotificationsCreateInput {
  input: Record<string, unknown>;
}

export async function notificationsCreate(
  supabase: SupabaseClient,
  params: NotificationsCreateInput,
): Promise<Record<string, unknown>> {
  const { data, error } = await supabase.rpc("notifications_create", { ...params });
  if (error) throw error;
  return data as Record<string, unknown>;
}

export interface OfferCanCreateAssignmentInput {
  p_offer_id: string;
  p_actor: string;
}

export interface OfferCanCreateAssignmentResult {
  ok: boolean;
  reason: string;
  offer_id: string;
  offer_state: OfferState;
  application_id: string;
  candidate_id: string;
  job_id: string;
  workspace_id: string;
}

export async function offerCanCreateAssignment(
  supabase: SupabaseClient,
  params: OfferCanCreateAssignmentInput,
): Promise<OfferCanCreateAssignmentResult[]> {
  const { data, error } = await supabase.rpc("offer_can_create_assignment", { ...params });
  if (error) throw error;
  return data as OfferCanCreateAssignmentResult[];
}

export interface OffersAcceptInput {
  p_offer_id: string;
  p_actor_id: string;
}

export async function offersAccept(
  supabase: SupabaseClient,
  params: OffersAcceptInput,
): Promise<Record<string, unknown>> {
  const { data, error } = await supabase.rpc("offers_accept", { ...params });
  if (error) throw error;
  return data as Record<string, unknown>;
}

export interface OffersCreateAssignmentFromOfferInput {
  p_offer_id: string;
  p_start_date: string;
  p_end_date: string;
  p_engagement_type: string;
  p_actor: string;
  p_client_name: string;
}

export interface OffersCreateAssignmentFromOfferResult {
  assignment_id: string;
  offer_id: string;
  application_id: string;
  candidate_id: string;
  job_id: string;
  state: AssignmentState;
  start_date: string;
  current_end_date: string;
  engagement_type: string;
}

export async function offersCreateAssignmentFromOffer(
  supabase: SupabaseClient,
  params: OffersCreateAssignmentFromOfferInput,
): Promise<OffersCreateAssignmentFromOfferResult[]> {
  const { data, error } = await supabase.rpc("offers_create_assignment_from_offer", { ...params });
  if (error) throw error;
  return data as OffersCreateAssignmentFromOfferResult[];
}

export interface OffersTransitionStateInput {
  p_offer_id: string;
  p_next_state: OfferState;
  p_actor: string;
}

export interface OffersTransitionStateResult {
  id: string;
  prev_state: OfferState;
  next_state: OfferState;
}

export async function offersTransitionState(
  supabase: SupabaseClient,
  params: OffersTransitionStateInput,
): Promise<OffersTransitionStateResult[]> {
  const { data, error } = await supabase.rpc("offers_transition_state", { ...params });
  if (error) throw error;
  return data as OffersTransitionStateResult[];
}

export interface PipelinesCreateInput {
  input: Record<string, unknown>;
}

export async function pipelinesCreate(
  supabase: SupabaseClient,
  params: PipelinesCreateInput,
): Promise<Record<string, unknown>> {
  const { data, error } = await supabase.rpc("pipelines_create", { ...params });
  if (error) throw error;
  return data as Record<string, unknown>;
}

export interface ReportsCreateInput {
  input: Record<string, unknown>;
}

export async function reportsCreate(
  supabase: SupabaseClient,
  params: ReportsCreateInput,
): Promise<Record<string, unknown>> {
  const { data, error } = await supabase.rpc("reports_create", { ...params });
  if (error) throw error;
  return data as Record<string, unknown>;
}

export interface ReportsRunInput {
  report_id: string;
}

export async function reportsRun(
  supabase: SupabaseClient,
  params: ReportsRunInput,
): Promise<Record<string, unknown>> {
  const { data, error } = await supabase.rpc("reports_run", { ...params });
  if (error) throw error;
  return data as Record<string, unknown>;
}

export interface ResolveActivityOrgIdInput {
  p_entity_type: string;
  p_new: Record<string, unknown>;
  p_old: Record<string, unknown>;
}

export async function resolveActivityOrgId(
  supabase: SupabaseClient,
  params: ResolveActivityOrgIdInput,
): Promise<string> {
  const { data, error } = await supabase.rpc("resolve_activity_org_id", { ...params });
  if (error) throw error;
  return data as string;
}

export interface RolesCreateInput {
  input: Record<string, unknown>;
}

export async function rolesCreate(
  supabase: SupabaseClient,
  params: RolesCreateInput,
): Promise<Record<string, unknown>> {
  const { data, error } = await supabase.rpc("roles_create", { ...params });
  if (error) throw error;
  return data as Record<string, unknown>;
}

export interface RpcBenchGenerateSubmissionDraftInput {
  p_bench_id: string;
  p_job_id: string;
}

export async function rpcBenchGenerateSubmissionDraft(
  supabase: SupabaseClient,
  params: RpcBenchGenerateSubmissionDraftInput,
): Promise<string> {
  const { data, error } = await supabase.rpc("rpc_bench_generate_submission_draft", { ...params });
  if (error) throw error;
  return data as string;
}

export interface RpcBenchGenerateSubmissionDraftV1Input {
  p_bench_id: string;
  p_job_id: string;
  p_submitted_by: string;
  p_state: string;
}

export interface RpcBenchGenerateSubmissionDraftV1Result {
  submission_id: string;
  submission_status: string;
  ai_match_score: number;
  ai_analysis: Record<string, unknown>;
  candidate_id: string;
  job_id: string;
  organization_id: string;
}

export async function rpcBenchGenerateSubmissionDraftV1(
  supabase: SupabaseClient,
  params: RpcBenchGenerateSubmissionDraftV1Input,
): Promise<RpcBenchGenerateSubmissionDraftV1Result[]> {
  const { data, error } = await supabase.rpc("rpc_bench_generate_submission_draft_v1", { ...params });
  if (error) throw error;
  return data as RpcBenchGenerateSubmissionDraftV1Result[];
}

export interface RpcBenchMatchJobsV1Input {
  p_bench_id: string;
  p_limit: number;
  p_include_explainability: boolean;
  p_write_cache: boolean;
}

export interface RpcBenchMatchJobsV1Result {
  job_id: string;
  score: number;
  explainability: Record<string, unknown>;
}

export async function rpcBenchMatchJobsV1(
  supabase: SupabaseClient,
  params: RpcBenchMatchJobsV1Input,
): Promise<RpcBenchMatchJobsV1Result[]> {
  const { data, error } = await supabase.rpc("rpc_bench_match_jobs_v1", { ...params });
  if (error) throw error;
  return data as RpcBenchMatchJobsV1Result[];
}

export async function setAppContext(
  supabase: SupabaseClient,
): Promise<void> {
  const { data, error } = await supabase.rpc("set_app_context");
  if (error) throw error;
  return;
}

export interface SetAppCurrentOrgInput {
  p_org: string;
}

export async function setAppCurrentOrg(
  supabase: SupabaseClient,
  params: SetAppCurrentOrgInput,
): Promise<void> {
  const { data, error } = await supabase.rpc("set_app_current_org", { ...params });
  if (error) throw error;
  return;
}

export interface SetAppCurrentOrganizationIdInput {
  org_id: string;
}

export async function setAppCurrentOrganizationId(
  supabase: SupabaseClient,
  params: SetAppCurrentOrganizationIdInput,
): Promise<void> {
  const { data, error } = await supabase.rpc("set_app_current_organization_id", { ...params });
  if (error) throw error;
  return;
}

export interface SettingsUpsertInput {
  input: Record<string, unknown>;
}

export async function settingsUpsert(
  supabase: SupabaseClient,
  params: SettingsUpsertInput,
): Promise<Record<string, unknown>> {
  const { data, error } = await supabase.rpc("settings_upsert", { ...params });
  if (error) throw error;
  return data as Record<string, unknown>;
}

export interface SubmissionPackagesCreateShareV1Input {
  p_workspace_id: string;
  p_job_id: string;
  p_candidate_ids: string[];
  p_actor: string;
  p_client_email: string;
  p_client_name: string;
  p_notes: string;
  p_expires_in_days: number;
}

export interface SubmissionPackagesCreateShareV1Result {
  package_id: string;
  workspace_id: string;
  job_id: string;
  candidate_ids: string[];
  status: string;
  share_token: string;
  share_expires_at: string;
  share_view_count: number;
  created_at: string;
  updated_at: string;
  email_subject: string;
  email_body: string;
}

export async function submissionPackagesCreateShareV1(
  supabase: SupabaseClient,
  params: SubmissionPackagesCreateShareV1Input,
): Promise<SubmissionPackagesCreateShareV1Result[]> {
  const { data, error } = await supabase.rpc("submission_packages_create_share_v1", { ...params });
  if (error) throw error;
  return data as SubmissionPackagesCreateShareV1Result[];
}

export interface SubmissionPackagesMarkViewedV1Input {
  p_share_token: string;
}

export interface SubmissionPackagesMarkViewedV1Result {
  submission_package_id: string;
  submittal_id: string;
  workspace_id: string;
}

export async function submissionPackagesMarkViewedV1(
  supabase: SupabaseClient,
  params: SubmissionPackagesMarkViewedV1Input,
): Promise<SubmissionPackagesMarkViewedV1Result[]> {
  const { data, error } = await supabase.rpc("submission_packages_mark_viewed_v1", { ...params });
  if (error) throw error;
  return data as SubmissionPackagesMarkViewedV1Result[];
}

export interface SubmissionShareResolveInput {
  p_share_token: string;
}

export interface SubmissionShareResolveResult {
  id: string;
  workspace_id: string;
  title: string;
  description: string;
  job_id: string;
  candidate_ids: string[];
  submission_data: Record<string, unknown>;
  status: string;
  share_view_count: number;
  share_expires_at: string;
}

export async function submissionShareResolve(
  supabase: SupabaseClient,
  params: SubmissionShareResolveInput,
): Promise<SubmissionShareResolveResult[]> {
  const { data, error } = await supabase.rpc("submission_share_resolve", { ...params });
  if (error) throw error;
  return data as SubmissionShareResolveResult[];
}

export interface SubmissionShareResolveV2Input {
  p_token: string;
}

export async function submissionShareResolveV2(
  supabase: SupabaseClient,
  params: SubmissionShareResolveV2Input,
): Promise<SubmissionPackagesRow> {
  const { data, error } = await supabase.rpc("submission_share_resolve_v2", { ...params });
  if (error) throw error;
  return data as SubmissionPackagesRow;
}

export interface SubmissionShareResolveV3Input {
  p_token: string;
}

export async function submissionShareResolveV3(
  supabase: SupabaseClient,
  params: SubmissionShareResolveV3Input,
): Promise<SubmissionPackagesRow> {
  const { data, error } = await supabase.rpc("submission_share_resolve_v3", { ...params });
  if (error) throw error;
  return data as SubmissionPackagesRow;
}

export interface SubmissionShareResolveV4Input {
  p_share_token: string;
}

export interface SubmissionShareResolveV4Result {
  package_id: string;
  workspace_id: string;
  job_id: string;
  candidate_ids: string[];
  submission_data: Record<string, unknown>;
  status: string;
  share_token: string;
  share_expires_at: string;
  share_view_count: number;
  created_at: string;
  updated_at: string;
}

export async function submissionShareResolveV4(
  supabase: SupabaseClient,
  params: SubmissionShareResolveV4Input,
): Promise<SubmissionShareResolveV4Result[]> {
  const { data, error } = await supabase.rpc("submission_share_resolve_v4", { ...params });
  if (error) throw error;
  return data as SubmissionShareResolveV4Result[];
}

export interface SubmittalsCanTransitionInput {
  from_state: SubmittalState;
  to_state: SubmittalState;
}

export async function submittalsCanTransition(
  supabase: SupabaseClient,
  params: SubmittalsCanTransitionInput,
): Promise<boolean> {
  const { data, error } = await supabase.rpc("submittals_can_transition", { ...params });
  if (error) throw error;
  return data as boolean;
}

export interface SubmittalsSubmitV2Input {
  p_submittal_id: string;
  p_actor: string;
  p_channel: ClientChannel;
}

export interface SubmittalsSubmitV2Result {
  submittal_id: string;
  prev_state: SubmittalState;
  next_state: SubmittalState;
  workspace_id: string;
  candidate_id: string;
  job_id: string;
  application_id: string;
  submission_package_id: string;
  share_token: string;
}

export async function submittalsSubmitV2(
  supabase: SupabaseClient,
  params: SubmittalsSubmitV2Input,
): Promise<SubmittalsSubmitV2Result[]> {
  const { data, error } = await supabase.rpc("submittals_submit_v2", { ...params });
  if (error) throw error;
  return data as SubmittalsSubmitV2Result[];
}

export interface SubmittalsTransitionStateInput {
  p_submittal_id: string;
  p_next_state: SubmittalState;
  p_actor: string;
}

export async function submittalsTransitionState(
  supabase: SupabaseClient,
  params: SubmittalsTransitionStateInput,
): Promise<SubmittalsRow> {
  const { data, error } = await supabase.rpc("submittals_transition_state", { ...params });
  if (error) throw error;
  return data as SubmittalsRow;
}

export interface SubmittalsTransitionStateV2Input {
  p_submittal_id: string;
  p_next_state: SubmittalState;
  p_actor: string;
}

export interface SubmittalsTransitionStateV2Result {
  id: string;
  prev_state: SubmittalState;
  next_state: SubmittalState;
  candidate_id: string;
  job_id: string;
  application_id: string;
}

export async function submittalsTransitionStateV2(
  supabase: SupabaseClient,
  params: SubmittalsTransitionStateV2Input,
): Promise<SubmittalsTransitionStateV2Result[]> {
  const { data, error } = await supabase.rpc("submittals_transition_state_v2", { ...params });
  if (error) throw error;
  return data as SubmittalsTransitionStateV2Result[];
}

export interface TasksTransitionStateInput {
  task_id: string;
  new_status: string;
}

export async function tasksTransitionState(
  supabase: SupabaseClient,
  params: TasksTransitionStateInput,
): Promise<void> {
  const { data, error } = await supabase.rpc("tasks_transition_state", { ...params });
  if (error) throw error;
  return;
}

export interface TemplatesActivateInput {
  template_id: string;
}

export async function templatesActivate(
  supabase: SupabaseClient,
  params: TemplatesActivateInput,
): Promise<Record<string, unknown>> {
  const { data, error } = await supabase.rpc("templates_activate", { ...params });
  if (error) throw error;
  return data as Record<string, unknown>;
}

export interface TemplatesCreateInput {
  input: Record<string, unknown>;
}

export async function templatesCreate(
  supabase: SupabaseClient,
  params: TemplatesCreateInput,
): Promise<Record<string, unknown>> {
  const { data, error } = await supabase.rpc("templates_create", { ...params });
  if (error) throw error;
  return data as Record<string, unknown>;
}

export interface TemplatesUpdateInput {
  template_id: string;
  input: Record<string, unknown>;
}

export async function templatesUpdate(
  supabase: SupabaseClient,
  params: TemplatesUpdateInput,
): Promise<Record<string, unknown>> {
  const { data, error } = await supabase.rpc("templates_update", { ...params });
  if (error) throw error;
  return data as Record<string, unknown>;
}

export interface TimesheetsApproveInput {
  timesheet_id: string;
  approved_by: string;
}

export async function timesheetsApprove(
  supabase: SupabaseClient,
  params: TimesheetsApproveInput,
): Promise<Record<string, unknown>> {
  const { data, error } = await supabase.rpc("timesheets_approve", { ...params });
  if (error) throw error;
  return data as Record<string, unknown>;
}

export interface TimesheetsCreateInput {
  input: Record<string, unknown>;
}

export async function timesheetsCreate(
  supabase: SupabaseClient,
  params: TimesheetsCreateInput,
): Promise<Record<string, unknown>> {
  const { data, error } = await supabase.rpc("timesheets_create", { ...params });
  if (error) throw error;
  return data as Record<string, unknown>;
}

export interface TimesheetsDeleteInput {
  timesheet_id: string;
}

export async function timesheetsDelete(
  supabase: SupabaseClient,
  params: TimesheetsDeleteInput,
): Promise<Record<string, unknown>> {
  const { data, error } = await supabase.rpc("timesheets_delete", { ...params });
  if (error) throw error;
  return data as Record<string, unknown>;
}

export interface TimesheetsMarkPaidInput {
  timesheet_id: string;
}

export async function timesheetsMarkPaid(
  supabase: SupabaseClient,
  params: TimesheetsMarkPaidInput,
): Promise<Record<string, unknown>> {
  const { data, error } = await supabase.rpc("timesheets_mark_paid", { ...params });
  if (error) throw error;
  return data as Record<string, unknown>;
}

export interface TimesheetsRejectInput {
  timesheet_id: string;
  rejected_by: string;
  rejection_reason: string;
}

export async function timesheetsReject(
  supabase: SupabaseClient,
  params: TimesheetsRejectInput,
): Promise<Record<string, unknown>> {
  const { data, error } = await supabase.rpc("timesheets_reject", { ...params });
  if (error) throw error;
  return data as Record<string, unknown>;
}

export interface TimesheetsSubmitInput {
  timesheet_id: string;
  submitted_by: string;
}

export async function timesheetsSubmit(
  supabase: SupabaseClient,
  params: TimesheetsSubmitInput,
): Promise<Record<string, unknown>> {
  const { data, error } = await supabase.rpc("timesheets_submit", { ...params });
  if (error) throw error;
  return data as Record<string, unknown>;
}

export interface TimesheetsUpdateInput {
  timesheet_id: string;
  input: Record<string, unknown>;
}

export async function timesheetsUpdate(
  supabase: SupabaseClient,
  params: TimesheetsUpdateInput,
): Promise<Record<string, unknown>> {
  const { data, error } = await supabase.rpc("timesheets_update", { ...params });
  if (error) throw error;
  return data as Record<string, unknown>;
}

export interface UpdateAgencyMetricsInput {
  p_agency_id: string;
}

export async function updateAgencyMetrics(
  supabase: SupabaseClient,
  params: UpdateAgencyMetricsInput,
): Promise<void> {
  const { data, error } = await supabase.rpc("update_agency_metrics", { ...params });
  if (error) throw error;
  return;
}

export interface UpdateBackgroundCheckStatusV1Input {
  p_external_id: string;
  p_status: string;
  p_result: string;
  p_adjudication: string;
  p_report_url: string;
  p_turnaround_time: number;
}

export async function updateBackgroundCheckStatusV1(
  supabase: SupabaseClient,
  params: UpdateBackgroundCheckStatusV1Input,
): Promise<BackgroundChecksRow> {
  const { data, error } = await supabase.rpc("update_background_check_status_v1", { ...params });
  if (error) throw error;
  return data as BackgroundChecksRow;
}

export interface UpdateEmailStatusV1Input {
  p_resend_id: string;
  p_status: string;
  p_error_message: string;
  p_bounce_type: string;
}

export async function updateEmailStatusV1(
  supabase: SupabaseClient,
  params: UpdateEmailStatusV1Input,
): Promise<EmailLogsRow> {
  const { data, error } = await supabase.rpc("update_email_status_v1", { ...params });
  if (error) throw error;
  return data as EmailLogsRow;
}

export interface UpdateWebhookStatusV1Input {
  p_webhook_id: string;
  p_status: string;
  p_error_message: string;
}

export async function updateWebhookStatusV1(
  supabase: SupabaseClient,
  params: UpdateWebhookStatusV1Input,
): Promise<WebhookLogsRow> {
  const { data, error } = await supabase.rpc("update_webhook_status_v1", { ...params });
  if (error) throw error;
  return data as WebhookLogsRow;
}

export interface ValidateEventEmissionInput {
  p_action_key: string;
  p_emitted_events: string[];
}

export async function validateEventEmission(
  supabase: SupabaseClient,
  params: ValidateEventEmissionInput,
): Promise<boolean> {
  const { data, error } = await supabase.rpc("validate_event_emission", { ...params });
  if (error) throw error;
  return data as boolean;
}

export interface ValidateStateTransitionInput {
  p_state_machine: string;
  p_current_state: string;
  p_next_state: string;
}

export async function validateStateTransition(
  supabase: SupabaseClient,
  params: ValidateStateTransitionInput,
): Promise<boolean> {
  const { data, error } = await supabase.rpc("validate_state_transition", { ...params });
  if (error) throw error;
  return data as boolean;
}

