// AUTO-GENERATED — DO NOT EDIT
// Source: db_contract_public_schema.json (contract-locked)
// Generated: 2026-02-03T20:20:16.234Z

/** JSON-compatible type for jsonb columns */
export type Json = string | number | boolean | null | Json[] | { [key: string]: Json | undefined };

// ────────────────────────────────────────────
// action_registry
// ────────────────────────────────────────────
export interface ActionRegistryRow {
  action_key: string;
  entity_name: string;
  rpc_name: string;
  valid_states_ref: string | null;
  emits_events: string[];
  is_idempotent: boolean;
  requires_organization_id: boolean;
  created_at: string;
  updated_at: string;
}

export interface ActionRegistryInsert {
  action_key: string;
  entity_name: string;
  rpc_name: string;
  valid_states_ref?: string | null;
  emits_events?: string[];
  is_idempotent?: boolean;
  requires_organization_id?: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface ActionRegistryUpdate {
  action_key?: string;
  entity_name?: string;
  rpc_name?: string;
  valid_states_ref?: string | null;
  emits_events?: string[];
  is_idempotent?: boolean;
  requires_organization_id?: boolean;
  created_at?: string;
  updated_at?: string;
}

// ────────────────────────────────────────────
// activities
// ────────────────────────────────────────────
export interface ActivitiesRow {
  id: string;
  entity_type: string;
  entity_id: string;
  action_type: string;
  action_category: string | null;
  description: string | null;
  actor_id: string | null;
  actor_type: string | null;
  actor_name: string | null;
  previous_value: Json | null;
  new_value: Json | null;
  changes: Json | null;
  metadata: Json | null;
  organization_id: string;
  ip_address: string | null;
  user_agent: string | null;
  source: string | null;
  created_at: string;
}

export interface ActivitiesInsert {
  id?: string;
  entity_type: string;
  entity_id: string;
  action_type: string;
  action_category?: string | null;
  description?: string | null;
  actor_id?: string | null;
  actor_type?: string | null;
  actor_name?: string | null;
  previous_value?: Json | null;
  new_value?: Json | null;
  changes?: Json | null;
  metadata?: Json | null;
  organization_id: string;
  ip_address?: string | null;
  user_agent?: string | null;
  source?: string | null;
  created_at?: string;
}

export interface ActivitiesUpdate {
  id?: string;
  entity_type?: string;
  entity_id?: string;
  action_type?: string;
  action_category?: string | null;
  description?: string | null;
  actor_id?: string | null;
  actor_type?: string | null;
  actor_name?: string | null;
  previous_value?: Json | null;
  new_value?: Json | null;
  changes?: Json | null;
  metadata?: Json | null;
  organization_id?: string;
  ip_address?: string | null;
  user_agent?: string | null;
  source?: string | null;
  created_at?: string;
}

// ────────────────────────────────────────────
// activity
// ────────────────────────────────────────────
export interface ActivityRow {
  id: string | null;
  entity_type: string | null;
  entity_id: string | null;
  action_type: string | null;
  action_category: string | null;
  description: string | null;
  actor_id: string | null;
  actor_type: string | null;
  actor_name: string | null;
  previous_value: Json | null;
  new_value: Json | null;
  changes: Json | null;
  metadata: Json | null;
  organization_id: string | null;
  ip_address: string | null;
  user_agent: string | null;
  source: string | null;
  created_at: string | null;
}

export interface ActivityInsert {
  id?: string | null;
  entity_type?: string | null;
  entity_id?: string | null;
  action_type?: string | null;
  action_category?: string | null;
  description?: string | null;
  actor_id?: string | null;
  actor_type?: string | null;
  actor_name?: string | null;
  previous_value?: Json | null;
  new_value?: Json | null;
  changes?: Json | null;
  metadata?: Json | null;
  organization_id?: string | null;
  ip_address?: string | null;
  user_agent?: string | null;
  source?: string | null;
  created_at?: string | null;
}

export interface ActivityUpdate {
  id?: string | null;
  entity_type?: string | null;
  entity_id?: string | null;
  action_type?: string | null;
  action_category?: string | null;
  description?: string | null;
  actor_id?: string | null;
  actor_type?: string | null;
  actor_name?: string | null;
  previous_value?: Json | null;
  new_value?: Json | null;
  changes?: Json | null;
  metadata?: Json | null;
  organization_id?: string | null;
  ip_address?: string | null;
  user_agent?: string | null;
  source?: string | null;
  created_at?: string | null;
}

// ────────────────────────────────────────────
// activity_feed
// ────────────────────────────────────────────
export interface ActivityFeedRow {
  id: string | null;
  organization_id: string | null;
  entity_type: string | null;
  entity_id: string | null;
  action_type: string | null;
  action_category: string | null;
  description: string | null;
  actor_id: string | null;
  actor_type: string | null;
  actor_name: string | null;
  previous_value: Json | null;
  new_value: Json | null;
  changes: Json | null;
  metadata: Json | null;
  source: string | null;
  ip_address: string | null;
  user_agent: string | null;
  created_at: string | null;
}

export interface ActivityFeedInsert {
  id?: string | null;
  organization_id?: string | null;
  entity_type?: string | null;
  entity_id?: string | null;
  action_type?: string | null;
  action_category?: string | null;
  description?: string | null;
  actor_id?: string | null;
  actor_type?: string | null;
  actor_name?: string | null;
  previous_value?: Json | null;
  new_value?: Json | null;
  changes?: Json | null;
  metadata?: Json | null;
  source?: string | null;
  ip_address?: string | null;
  user_agent?: string | null;
  created_at?: string | null;
}

export interface ActivityFeedUpdate {
  id?: string | null;
  organization_id?: string | null;
  entity_type?: string | null;
  entity_id?: string | null;
  action_type?: string | null;
  action_category?: string | null;
  description?: string | null;
  actor_id?: string | null;
  actor_type?: string | null;
  actor_name?: string | null;
  previous_value?: Json | null;
  new_value?: Json | null;
  changes?: Json | null;
  metadata?: Json | null;
  source?: string | null;
  ip_address?: string | null;
  user_agent?: string | null;
  created_at?: string | null;
}

// ────────────────────────────────────────────
// advertising_orders
// ────────────────────────────────────────────
export interface AdvertisingOrdersRow {
  id: string;
  organization_id: string;
  company_id: string | null;
  job_id: string | null;
  product_id: string;
  product_name: string;
  product_type: string;
  price: number;
  currency: string | null;
  duration_days: number;
  starts_at: string;
  ends_at: string;
  status: string | null;
  impressions: number | null;
  clicks: number | null;
  applications: number | null;
  ctr: number | null;
  conversion_rate: number | null;
  stripe_payment_intent_id: string | null;
  paid_at: string | null;
  created_at: string | null;
  updated_at: string | null;
}

export interface AdvertisingOrdersInsert {
  id?: string;
  organization_id: string;
  company_id?: string | null;
  job_id?: string | null;
  product_id: string;
  product_name: string;
  product_type: string;
  price: number;
  currency?: string | null;
  duration_days: number;
  starts_at: string;
  ends_at: string;
  status?: string | null;
  impressions?: number | null;
  clicks?: number | null;
  applications?: number | null;
  ctr?: number | null;
  conversion_rate?: number | null;
  stripe_payment_intent_id?: string | null;
  paid_at?: string | null;
  created_at?: string | null;
  updated_at?: string | null;
}

export interface AdvertisingOrdersUpdate {
  id?: string;
  organization_id?: string;
  company_id?: string | null;
  job_id?: string | null;
  product_id?: string;
  product_name?: string;
  product_type?: string;
  price?: number;
  currency?: string | null;
  duration_days?: number;
  starts_at?: string;
  ends_at?: string;
  status?: string | null;
  impressions?: number | null;
  clicks?: number | null;
  applications?: number | null;
  ctr?: number | null;
  conversion_rate?: number | null;
  stripe_payment_intent_id?: string | null;
  paid_at?: string | null;
  created_at?: string | null;
  updated_at?: string | null;
}

// ────────────────────────────────────────────
// agency_verifications
// ────────────────────────────────────────────
export interface AgencyVerificationsRow {
  id: string;
  organization_id: string;
  agency_id: string;
  verified_by: string | null;
  verification_date: string | null;
  expiry_date: string | null;
  documents: Json | null;
  verification_type: string | null;
  status: string | null;
  notes: string | null;
  created_at: string | null;
  updated_at: string | null;
}

export interface AgencyVerificationsInsert {
  id?: string;
  organization_id: string;
  agency_id: string;
  verified_by?: string | null;
  verification_date?: string | null;
  expiry_date?: string | null;
  documents?: Json | null;
  verification_type?: string | null;
  status?: string | null;
  notes?: string | null;
  created_at?: string | null;
  updated_at?: string | null;
}

export interface AgencyVerificationsUpdate {
  id?: string;
  organization_id?: string;
  agency_id?: string;
  verified_by?: string | null;
  verification_date?: string | null;
  expiry_date?: string | null;
  documents?: Json | null;
  verification_type?: string | null;
  status?: string | null;
  notes?: string | null;
  created_at?: string | null;
  updated_at?: string | null;
}

// ────────────────────────────────────────────
// ai_agents
// ────────────────────────────────────────────
export interface AiAgentsRow {
  id: string;
  organization_id: string;
  agent_name: string;
  agent_type: string;
  description: string | null;
  provider: string | null;
  model_id: string | null;
  temperature: number | null;
  max_tokens: number | null;
  system_prompt: string | null;
  configuration: Json | null;
  is_active: boolean | null;
  created_at: string | null;
  updated_at: string | null;
}

export interface AiAgentsInsert {
  id?: string;
  organization_id: string;
  agent_name: string;
  agent_type: string;
  description?: string | null;
  provider?: string | null;
  model_id?: string | null;
  temperature?: number | null;
  max_tokens?: number | null;
  system_prompt?: string | null;
  configuration?: Json | null;
  is_active?: boolean | null;
  created_at?: string | null;
  updated_at?: string | null;
}

export interface AiAgentsUpdate {
  id?: string;
  organization_id?: string;
  agent_name?: string;
  agent_type?: string;
  description?: string | null;
  provider?: string | null;
  model_id?: string | null;
  temperature?: number | null;
  max_tokens?: number | null;
  system_prompt?: string | null;
  configuration?: Json | null;
  is_active?: boolean | null;
  created_at?: string | null;
  updated_at?: string | null;
}

// ────────────────────────────────────────────
// ai_executions
// ────────────────────────────────────────────
export interface AiExecutionsRow {
  id: string;
  organization_id: string | null;
  agent_id: string | null;
  template_id: string | null;
  entity_type: string | null;
  entity_id: string | null;
  input_data: Json | null;
  output_data: Json | null;
  model_used: string | null;
  tokens_used: number | null;
  cost_usd: number | null;
  duration_ms: number | null;
  status: string | null;
  error_message: string | null;
  created_at: string | null;
}

export interface AiExecutionsInsert {
  id?: string;
  organization_id?: string | null;
  agent_id?: string | null;
  template_id?: string | null;
  entity_type?: string | null;
  entity_id?: string | null;
  input_data?: Json | null;
  output_data?: Json | null;
  model_used?: string | null;
  tokens_used?: number | null;
  cost_usd?: number | null;
  duration_ms?: number | null;
  status?: string | null;
  error_message?: string | null;
  created_at?: string | null;
}

export interface AiExecutionsUpdate {
  id?: string;
  organization_id?: string | null;
  agent_id?: string | null;
  template_id?: string | null;
  entity_type?: string | null;
  entity_id?: string | null;
  input_data?: Json | null;
  output_data?: Json | null;
  model_used?: string | null;
  tokens_used?: number | null;
  cost_usd?: number | null;
  duration_ms?: number | null;
  status?: string | null;
  error_message?: string | null;
  created_at?: string | null;
}

// ────────────────────────────────────────────
// ai_match_explanations
// ────────────────────────────────────────────
export interface AiMatchExplanationsRow {
  id: string;
  organization_id: string;
  match_score_id: string;
  candidate_id: string;
  job_id: string;
  explanation_text: string | null;
  factors: Json | null;
  strengths: Json | null;
  gaps: Json | null;
  recommendations: Json | null;
  confidence_score: number | null;
  model_version: string | null;
  created_at: string | null;
}

export interface AiMatchExplanationsInsert {
  id?: string;
  organization_id: string;
  match_score_id: string;
  candidate_id: string;
  job_id: string;
  explanation_text?: string | null;
  factors?: Json | null;
  strengths?: Json | null;
  gaps?: Json | null;
  recommendations?: Json | null;
  confidence_score?: number | null;
  model_version?: string | null;
  created_at?: string | null;
}

export interface AiMatchExplanationsUpdate {
  id?: string;
  organization_id?: string;
  match_score_id?: string;
  candidate_id?: string;
  job_id?: string;
  explanation_text?: string | null;
  factors?: Json | null;
  strengths?: Json | null;
  gaps?: Json | null;
  recommendations?: Json | null;
  confidence_score?: number | null;
  model_version?: string | null;
  created_at?: string | null;
}

// ────────────────────────────────────────────
// ai_prompts
// ────────────────────────────────────────────
export interface AiPromptsRow {
  id: string;
  workspace_id: string;
  name: string;
  version: number;
  purpose: string;
  template: string;
  model: string | null;
  parameters: Json;
  output_schema: Json | null;
  is_active: boolean;
  created_by: string;
  created_at: string;
  organization_id: string;
}

export interface AiPromptsInsert {
  id?: string;
  workspace_id: string;
  name: string;
  version: number;
  purpose: string;
  template: string;
  model?: string | null;
  parameters?: Json;
  output_schema?: Json | null;
  is_active?: boolean;
  created_by: string;
  created_at?: string;
  organization_id: string;
}

export interface AiPromptsUpdate {
  id?: string;
  workspace_id?: string;
  name?: string;
  version?: number;
  purpose?: string;
  template?: string;
  model?: string | null;
  parameters?: Json;
  output_schema?: Json | null;
  is_active?: boolean;
  created_by?: string;
  created_at?: string;
  organization_id?: string;
}

// ────────────────────────────────────────────
// analytics_orders
// ────────────────────────────────────────────
export interface AnalyticsOrdersRow {
  id: string;
  organization_id: string;
  company_id: string | null;
  purchaser_email: string | null;
  product_id: string;
  product_name: string;
  product_type: string;
  price: number;
  interval: string | null;
  currency: string | null;
  access_granted_at: string | null;
  access_expires_at: string | null;
  report_generated: boolean | null;
  report_url: string | null;
  report_generated_at: string | null;
  status: string | null;
  stripe_payment_intent_id: string | null;
  paid_at: string | null;
  created_at: string | null;
  updated_at: string | null;
}

export interface AnalyticsOrdersInsert {
  id?: string;
  organization_id: string;
  company_id?: string | null;
  purchaser_email?: string | null;
  product_id: string;
  product_name: string;
  product_type: string;
  price: number;
  interval?: string | null;
  currency?: string | null;
  access_granted_at?: string | null;
  access_expires_at?: string | null;
  report_generated?: boolean | null;
  report_url?: string | null;
  report_generated_at?: string | null;
  status?: string | null;
  stripe_payment_intent_id?: string | null;
  paid_at?: string | null;
  created_at?: string | null;
  updated_at?: string | null;
}

export interface AnalyticsOrdersUpdate {
  id?: string;
  organization_id?: string;
  company_id?: string | null;
  purchaser_email?: string | null;
  product_id?: string;
  product_name?: string;
  product_type?: string;
  price?: number;
  interval?: string | null;
  currency?: string | null;
  access_granted_at?: string | null;
  access_expires_at?: string | null;
  report_generated?: boolean | null;
  report_url?: string | null;
  report_generated_at?: string | null;
  status?: string | null;
  stripe_payment_intent_id?: string | null;
  paid_at?: string | null;
  created_at?: string | null;
  updated_at?: string | null;
}

// ────────────────────────────────────────────
// analytics_reports
// ────────────────────────────────────────────
export interface AnalyticsReportsRow {
  id: string;
  organization_id: string;
  name: string;
  description: string | null;
  query: Json | null;
  results: Json | null;
  status: string | null;
  created_at: string | null;
  updated_at: string | null;
  created_by: string | null;
  published_at: string | null;
}

export interface AnalyticsReportsInsert {
  id?: string;
  organization_id: string;
  name: string;
  description?: string | null;
  query?: Json | null;
  results?: Json | null;
  status?: string | null;
  created_at?: string | null;
  updated_at?: string | null;
  created_by?: string | null;
  published_at?: string | null;
}

export interface AnalyticsReportsUpdate {
  id?: string;
  organization_id?: string;
  name?: string;
  description?: string | null;
  query?: Json | null;
  results?: Json | null;
  status?: string | null;
  created_at?: string | null;
  updated_at?: string | null;
  created_by?: string | null;
  published_at?: string | null;
}

// ────────────────────────────────────────────
// api_keys
// ────────────────────────────────────────────
export interface ApiKeysRow {
  id: string;
  organization_id: string;
  owner_id: string;
  owner_type: string;
  subscription_id: string | null;
  key_hash: string;
  key_prefix: string;
  name: string | null;
  description: string | null;
  scopes: string[] | null;
  rate_limit_per_second: number | null;
  rate_limit_per_month: number | null;
  total_requests: number | null;
  last_used_at: string | null;
  is_active: boolean | null;
  expires_at: string | null;
  created_at: string | null;
  revoked_at: string | null;
}

export interface ApiKeysInsert {
  id?: string;
  organization_id: string;
  owner_id: string;
  owner_type: string;
  subscription_id?: string | null;
  key_hash: string;
  key_prefix: string;
  name?: string | null;
  description?: string | null;
  scopes?: string[] | null;
  rate_limit_per_second?: number | null;
  rate_limit_per_month?: number | null;
  total_requests?: number | null;
  last_used_at?: string | null;
  is_active?: boolean | null;
  expires_at?: string | null;
  created_at?: string | null;
  revoked_at?: string | null;
}

export interface ApiKeysUpdate {
  id?: string;
  organization_id?: string;
  owner_id?: string;
  owner_type?: string;
  subscription_id?: string | null;
  key_hash?: string;
  key_prefix?: string;
  name?: string | null;
  description?: string | null;
  scopes?: string[] | null;
  rate_limit_per_second?: number | null;
  rate_limit_per_month?: number | null;
  total_requests?: number | null;
  last_used_at?: string | null;
  is_active?: boolean | null;
  expires_at?: string | null;
  created_at?: string | null;
  revoked_at?: string | null;
}

// ────────────────────────────────────────────
// api_usage_logs
// ────────────────────────────────────────────
export interface ApiUsageLogsRow {
  id: string;
  organization_id: string;
  api_key_id: string | null;
  endpoint: string;
  method: string;
  status_code: number | null;
  response_time_ms: number | null;
  ip_address: string | null;
  user_agent: string | null;
  created_at: string | null;
}

export interface ApiUsageLogsInsert {
  id?: string;
  organization_id: string;
  api_key_id?: string | null;
  endpoint: string;
  method: string;
  status_code?: number | null;
  response_time_ms?: number | null;
  ip_address?: string | null;
  user_agent?: string | null;
  created_at?: string | null;
}

export interface ApiUsageLogsUpdate {
  id?: string;
  organization_id?: string;
  api_key_id?: string | null;
  endpoint?: string;
  method?: string;
  status_code?: number | null;
  response_time_ms?: number | null;
  ip_address?: string | null;
  user_agent?: string | null;
  created_at?: string | null;
}

// ────────────────────────────────────────────
// app_users
// ────────────────────────────────────────────
export interface AppUsersRow {
  id: string;
  tenant_id: string;
  role: string | null;
  status: string | null;
  permissions: Json | null;
  preferences: Json | null;
  created_at: string | null;
  updated_at: string | null;
}

export interface AppUsersInsert {
  id: string;
  tenant_id: string;
  role?: string | null;
  status?: string | null;
  permissions?: Json | null;
  preferences?: Json | null;
  created_at?: string | null;
  updated_at?: string | null;
}

export interface AppUsersUpdate {
  id?: string;
  tenant_id?: string;
  role?: string | null;
  status?: string | null;
  permissions?: Json | null;
  preferences?: Json | null;
  created_at?: string | null;
  updated_at?: string | null;
}

// ────────────────────────────────────────────
// applications
// ────────────────────────────────────────────
export interface ApplicationsRow {
  id: string;
  workspace_id: string;
  candidate_id: string | null;
  job_id: string | null;
  current_stage_text_old: string;
  stage_history: Json | null;
  date_applied: string | null;
  linkedin_application_status: string | null;
  screening_questions: Json | null;
  is_favorite: boolean | null;
  is_archived: boolean | null;
  assigned_to: string | null;
  created_at: string;
  updated_at: string;
  current_stage: string;
  applied_date: string | null;
  candidate_email: string | null;
  job_external_id: number | null;
  screening_data: Json | null;
  stage: string | null;
  status: string | null;
  organization_id: string;
}

export interface ApplicationsInsert {
  id?: string;
  workspace_id?: string;
  candidate_id?: string | null;
  job_id?: string | null;
  current_stage_text_old?: string;
  stage_history?: Json | null;
  date_applied?: string | null;
  linkedin_application_status?: string | null;
  screening_questions?: Json | null;
  is_favorite?: boolean | null;
  is_archived?: boolean | null;
  assigned_to?: string | null;
  created_at?: string;
  updated_at?: string;
  current_stage?: string;
  applied_date?: string | null;
  candidate_email?: string | null;
  job_external_id?: number | null;
  screening_data?: Json | null;
  stage?: string | null;
  status?: string | null;
  organization_id: string;
}

export interface ApplicationsUpdate {
  id?: string;
  workspace_id?: string;
  candidate_id?: string | null;
  job_id?: string | null;
  current_stage_text_old?: string;
  stage_history?: Json | null;
  date_applied?: string | null;
  linkedin_application_status?: string | null;
  screening_questions?: Json | null;
  is_favorite?: boolean | null;
  is_archived?: boolean | null;
  assigned_to?: string | null;
  created_at?: string;
  updated_at?: string;
  current_stage?: string;
  applied_date?: string | null;
  candidate_email?: string | null;
  job_external_id?: number | null;
  screening_data?: Json | null;
  stage?: string | null;
  status?: string | null;
  organization_id?: string;
}

// ────────────────────────────────────────────
// assignment_extensions
// ────────────────────────────────────────────
export interface AssignmentExtensionsRow {
  id: string;
  workspace_id: string;
  assignment_id: string;
  prev_end_date: string | null;
  new_end_date: string;
  reason: string | null;
  metadata: Json;
  extended_by: string | null;
  created_at: string;
  organization_id: string;
}

export interface AssignmentExtensionsInsert {
  id?: string;
  workspace_id: string;
  assignment_id: string;
  prev_end_date?: string | null;
  new_end_date: string;
  reason?: string | null;
  metadata?: Json;
  extended_by?: string | null;
  created_at?: string;
  organization_id: string;
}

export interface AssignmentExtensionsUpdate {
  id?: string;
  workspace_id?: string;
  assignment_id?: string;
  prev_end_date?: string | null;
  new_end_date?: string;
  reason?: string | null;
  metadata?: Json;
  extended_by?: string | null;
  created_at?: string;
  organization_id?: string;
}

// ────────────────────────────────────────────
// assignments
// ────────────────────────────────────────────
export interface AssignmentsRow {
  id: string;
  workspace_id: string;
  application_id: string | null;
  candidate_id: string;
  job_id: string;
  state: string;
  start_date: string | null;
  current_end_date: string | null;
  client_name: string | null;
  notes: string | null;
  created_by: string | null;
  created_at: string;
  updated_at: string;
  engagement_type: string | null;
  organization_id: string;
}

export interface AssignmentsInsert {
  id?: string;
  workspace_id: string;
  application_id?: string | null;
  candidate_id: string;
  job_id: string;
  state?: string;
  start_date?: string | null;
  current_end_date?: string | null;
  client_name?: string | null;
  notes?: string | null;
  created_by?: string | null;
  created_at?: string;
  updated_at?: string;
  engagement_type?: string | null;
  organization_id: string;
}

export interface AssignmentsUpdate {
  id?: string;
  workspace_id?: string;
  application_id?: string | null;
  candidate_id?: string;
  job_id?: string;
  state?: string;
  start_date?: string | null;
  current_end_date?: string | null;
  client_name?: string | null;
  notes?: string | null;
  created_by?: string | null;
  created_at?: string;
  updated_at?: string;
  engagement_type?: string | null;
  organization_id?: string;
}

// ────────────────────────────────────────────
// assistant_conversations
// ────────────────────────────────────────────
export interface AssistantConversationsRow {
  id: string;
  organization_id: string;
  user_id: string;
  session_id: string | null;
  messages: Json;
  context: Json | null;
  metadata: Json | null;
  tokens_used: number | null;
  started_at: string | null;
  ended_at: string | null;
  status: string | null;
  created_at: string | null;
  updated_at: string | null;
}

export interface AssistantConversationsInsert {
  id?: string;
  organization_id: string;
  user_id: string;
  session_id?: string | null;
  messages?: Json;
  context?: Json | null;
  metadata?: Json | null;
  tokens_used?: number | null;
  started_at?: string | null;
  ended_at?: string | null;
  status?: string | null;
  created_at?: string | null;
  updated_at?: string | null;
}

export interface AssistantConversationsUpdate {
  id?: string;
  organization_id?: string;
  user_id?: string;
  session_id?: string | null;
  messages?: Json;
  context?: Json | null;
  metadata?: Json | null;
  tokens_used?: number | null;
  started_at?: string | null;
  ended_at?: string | null;
  status?: string | null;
  created_at?: string | null;
  updated_at?: string | null;
}

// ────────────────────────────────────────────
// attachments
// ────────────────────────────────────────────
export interface AttachmentsRow {
  id: string;
  organization_id: string;
  entity_type: string;
  entity_id: string;
  file_name: string | null;
  file_type: string | null;
  file_size: number | null;
  mime_type: string | null;
  storage_path: string | null;
  storage_bucket: string | null;
  uploaded_by: string | null;
  metadata: Json | null;
  created_at: string | null;
  updated_at: string | null;
}

export interface AttachmentsInsert {
  id?: string;
  organization_id: string;
  entity_type: string;
  entity_id: string;
  file_name?: string | null;
  file_type?: string | null;
  file_size?: number | null;
  mime_type?: string | null;
  storage_path?: string | null;
  storage_bucket?: string | null;
  uploaded_by?: string | null;
  metadata?: Json | null;
  created_at?: string | null;
  updated_at?: string | null;
}

export interface AttachmentsUpdate {
  id?: string;
  organization_id?: string;
  entity_type?: string;
  entity_id?: string;
  file_name?: string | null;
  file_type?: string | null;
  file_size?: number | null;
  mime_type?: string | null;
  storage_path?: string | null;
  storage_bucket?: string | null;
  uploaded_by?: string | null;
  metadata?: Json | null;
  created_at?: string | null;
  updated_at?: string | null;
}

// ────────────────────────────────────────────
// audit_log
// ────────────────────────────────────────────
export interface AuditLogRow {
  id: string;
  organization_id: string | null;
  user_id: string | null;
  action: string;
  table_name: string;
  record_id: string | null;
  old_data: Json | null;
  new_data: Json | null;
  ip_address: string | null;
  user_agent: string | null;
  created_at: string | null;
}

export interface AuditLogInsert {
  id?: string;
  organization_id?: string | null;
  user_id?: string | null;
  action: string;
  table_name: string;
  record_id?: string | null;
  old_data?: Json | null;
  new_data?: Json | null;
  ip_address?: string | null;
  user_agent?: string | null;
  created_at?: string | null;
}

export interface AuditLogUpdate {
  id?: string;
  organization_id?: string | null;
  user_id?: string | null;
  action?: string;
  table_name?: string;
  record_id?: string | null;
  old_data?: Json | null;
  new_data?: Json | null;
  ip_address?: string | null;
  user_agent?: string | null;
  created_at?: string | null;
}

// ────────────────────────────────────────────
// audit_logs
// ────────────────────────────────────────────
export interface AuditLogsRow {
  id: string;
  organization_id: string;
  user_id: string | null;
  entity_type: string | null;
  entity_id: string | null;
  action: string | null;
  changes: Json | null;
  ip_address: string | null;
  user_agent: string | null;
  status: string | null;
  created_at: string | null;
}

export interface AuditLogsInsert {
  id?: string;
  organization_id: string;
  user_id?: string | null;
  entity_type?: string | null;
  entity_id?: string | null;
  action?: string | null;
  changes?: Json | null;
  ip_address?: string | null;
  user_agent?: string | null;
  status?: string | null;
  created_at?: string | null;
}

export interface AuditLogsUpdate {
  id?: string;
  organization_id?: string;
  user_id?: string | null;
  entity_type?: string | null;
  entity_id?: string | null;
  action?: string | null;
  changes?: Json | null;
  ip_address?: string | null;
  user_agent?: string | null;
  status?: string | null;
  created_at?: string | null;
}

// ────────────────────────────────────────────
// automation_rules
// ────────────────────────────────────────────
export interface AutomationRulesRow {
  id: string;
  organization_id: string;
  name: string;
  description: string | null;
  trigger_type: string | null;
  trigger_config: Json | null;
  action_type: string | null;
  action_config: Json | null;
  status: string | null;
  created_at: string | null;
  updated_at: string | null;
  created_by: string | null;
}

export interface AutomationRulesInsert {
  id?: string;
  organization_id: string;
  name: string;
  description?: string | null;
  trigger_type?: string | null;
  trigger_config?: Json | null;
  action_type?: string | null;
  action_config?: Json | null;
  status?: string | null;
  created_at?: string | null;
  updated_at?: string | null;
  created_by?: string | null;
}

export interface AutomationRulesUpdate {
  id?: string;
  organization_id?: string;
  name?: string;
  description?: string | null;
  trigger_type?: string | null;
  trigger_config?: Json | null;
  action_type?: string | null;
  action_config?: Json | null;
  status?: string | null;
  created_at?: string | null;
  updated_at?: string | null;
  created_by?: string | null;
}

// ────────────────────────────────────────────
// availability_windows
// ────────────────────────────────────────────
export interface AvailabilityWindowsRow {
  id: string;
  organization_id: string;
  user_id: string;
  start_time: string;
  end_time: string;
  is_available: boolean;
  created_at: string;
}

export interface AvailabilityWindowsInsert {
  id?: string;
  organization_id: string;
  user_id: string;
  start_time: string;
  end_time: string;
  is_available?: boolean;
  created_at?: string;
}

export interface AvailabilityWindowsUpdate {
  id?: string;
  organization_id?: string;
  user_id?: string;
  start_time?: string;
  end_time?: string;
  is_available?: boolean;
  created_at?: string;
}

// ────────────────────────────────────────────
// background_checks
// ────────────────────────────────────────────
export interface BackgroundChecksRow {
  id: string;
  organization_id: string;
  candidate_id: string;
  application_id: string | null;
  provider: string;
  external_id: string;
  package_id: string;
  status: string;
  result: string | null;
  adjudication: string | null;
  report_url: string | null;
  turnaround_time: number | null;
  initiated_at: string;
  completed_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface BackgroundChecksInsert {
  id?: string;
  organization_id: string;
  candidate_id: string;
  application_id?: string | null;
  provider: string;
  external_id: string;
  package_id: string;
  status?: string;
  result?: string | null;
  adjudication?: string | null;
  report_url?: string | null;
  turnaround_time?: number | null;
  initiated_at?: string;
  completed_at?: string | null;
  created_at?: string;
  updated_at?: string;
}

export interface BackgroundChecksUpdate {
  id?: string;
  organization_id?: string;
  candidate_id?: string;
  application_id?: string | null;
  provider?: string;
  external_id?: string;
  package_id?: string;
  status?: string;
  result?: string | null;
  adjudication?: string | null;
  report_url?: string | null;
  turnaround_time?: number | null;
  initiated_at?: string;
  completed_at?: string | null;
  created_at?: string;
  updated_at?: string;
}

// ────────────────────────────────────────────
// bench
// ────────────────────────────────────────────
export interface BenchRow {
  id: string;
  organization_id: string;
  consultant_id: string | null;
  availability_date: string | null;
  status: string | null;
  created_at: string | null;
  updated_at: string | null;
  created_by: string | null;
  updated_by: string | null;
}

export interface BenchInsert {
  id?: string;
  organization_id: string;
  consultant_id?: string | null;
  availability_date?: string | null;
  status?: string | null;
  created_at?: string | null;
  updated_at?: string | null;
  created_by?: string | null;
  updated_by?: string | null;
}

export interface BenchUpdate {
  id?: string;
  organization_id?: string;
  consultant_id?: string | null;
  availability_date?: string | null;
  status?: string | null;
  created_at?: string | null;
  updated_at?: string | null;
  created_by?: string | null;
  updated_by?: string | null;
}

// ────────────────────────────────────────────
// bench_entries
// ────────────────────────────────────────────
export interface BenchEntriesRow {
  id: string;
  workspace_id: string;
  candidate_id: string;
  application_id: string | null;
  job_id: string | null;
  assignment_id: string | null;
  state: string;
  reason: string | null;
  notes: string | null;
  bench_started_at: string;
  bench_ended_at: string | null;
  created_by: string | null;
  created_at: string;
  updated_at: string;
  organization_id: string;
}

export interface BenchEntriesInsert {
  id?: string;
  workspace_id: string;
  candidate_id: string;
  application_id?: string | null;
  job_id?: string | null;
  assignment_id?: string | null;
  state?: string;
  reason?: string | null;
  notes?: string | null;
  bench_started_at?: string;
  bench_ended_at?: string | null;
  created_by?: string | null;
  created_at?: string;
  updated_at?: string;
  organization_id: string;
}

export interface BenchEntriesUpdate {
  id?: string;
  workspace_id?: string;
  candidate_id?: string;
  application_id?: string | null;
  job_id?: string | null;
  assignment_id?: string | null;
  state?: string;
  reason?: string | null;
  notes?: string | null;
  bench_started_at?: string;
  bench_ended_at?: string | null;
  created_by?: string | null;
  created_at?: string;
  updated_at?: string;
  organization_id?: string;
}

// ────────────────────────────────────────────
// bench_resources
// ────────────────────────────────────────────
export interface BenchResourcesRow {
  id: string;
  organization_id: string;
  candidate_id: string;
  state: string;
  owner_id: string | null;
  available_from: string | null;
  capacity_hours_per_week: number | null;
  timezone: string | null;
  employment_type: string | null;
  comp_unit: string | null;
  salary_expectation_min: number | null;
  salary_expectation_max: number | null;
  hourly_floor: number | null;
  profile_json: Json;
  created_at: string;
  updated_at: string;
}

export interface BenchResourcesInsert {
  id?: string;
  organization_id: string;
  candidate_id: string;
  state?: string;
  owner_id?: string | null;
  available_from?: string | null;
  capacity_hours_per_week?: number | null;
  timezone?: string | null;
  employment_type?: string | null;
  comp_unit?: string | null;
  salary_expectation_min?: number | null;
  salary_expectation_max?: number | null;
  hourly_floor?: number | null;
  profile_json?: Json;
  created_at?: string;
  updated_at?: string;
}

export interface BenchResourcesUpdate {
  id?: string;
  organization_id?: string;
  candidate_id?: string;
  state?: string;
  owner_id?: string | null;
  available_from?: string | null;
  capacity_hours_per_week?: number | null;
  timezone?: string | null;
  employment_type?: string | null;
  comp_unit?: string | null;
  salary_expectation_min?: number | null;
  salary_expectation_max?: number | null;
  hourly_floor?: number | null;
  profile_json?: Json;
  created_at?: string;
  updated_at?: string;
}

// ────────────────────────────────────────────
// billing
// ────────────────────────────────────────────
export interface BillingRow {
  id: string;
  organization_id: string;
  customer_id: string | null;
  customer_name: string;
  customer_email: string | null;
  billing_type: string;
  plan_name: string;
  plan_description: string | null;
  amount: number;
  currency: string;
  billing_cycle: string;
  status: string;
  subscription_start: string | null;
  subscription_end: string | null;
  trial_end_date: string | null;
  next_billing_date: string | null;
  last_billing_date: string | null;
  last_payment_date: string | null;
  payment_method: string | null;
  payment_method_details: Json | null;
  total_revenue: number;
  outstanding_balance: number;
  payments_count: number;
  last_invoice_id: string | null;
  next_invoice_id: string | null;
  auto_renew: boolean;
  cancel_at_period_end: boolean;
  canceled_at: string | null;
  cancellation_reason: string | null;
  usage_data: Json | null;
  tags: string[] | null;
  metadata: Json | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
  created_by: string | null;
  updated_by: string | null;
}

export interface BillingInsert {
  id?: string;
  organization_id: string;
  customer_id?: string | null;
  customer_name: string;
  customer_email?: string | null;
  billing_type: string;
  plan_name: string;
  plan_description?: string | null;
  amount: number;
  currency?: string;
  billing_cycle: string;
  status?: string;
  subscription_start?: string | null;
  subscription_end?: string | null;
  trial_end_date?: string | null;
  next_billing_date?: string | null;
  last_billing_date?: string | null;
  last_payment_date?: string | null;
  payment_method?: string | null;
  payment_method_details?: Json | null;
  total_revenue?: number;
  outstanding_balance?: number;
  payments_count?: number;
  last_invoice_id?: string | null;
  next_invoice_id?: string | null;
  auto_renew?: boolean;
  cancel_at_period_end?: boolean;
  canceled_at?: string | null;
  cancellation_reason?: string | null;
  usage_data?: Json | null;
  tags?: string[] | null;
  metadata?: Json | null;
  notes?: string | null;
  created_at?: string;
  updated_at?: string;
  created_by?: string | null;
  updated_by?: string | null;
}

export interface BillingUpdate {
  id?: string;
  organization_id?: string;
  customer_id?: string | null;
  customer_name?: string;
  customer_email?: string | null;
  billing_type?: string;
  plan_name?: string;
  plan_description?: string | null;
  amount?: number;
  currency?: string;
  billing_cycle?: string;
  status?: string;
  subscription_start?: string | null;
  subscription_end?: string | null;
  trial_end_date?: string | null;
  next_billing_date?: string | null;
  last_billing_date?: string | null;
  last_payment_date?: string | null;
  payment_method?: string | null;
  payment_method_details?: Json | null;
  total_revenue?: number;
  outstanding_balance?: number;
  payments_count?: number;
  last_invoice_id?: string | null;
  next_invoice_id?: string | null;
  auto_renew?: boolean;
  cancel_at_period_end?: boolean;
  canceled_at?: string | null;
  cancellation_reason?: string | null;
  usage_data?: Json | null;
  tags?: string[] | null;
  metadata?: Json | null;
  notes?: string | null;
  created_at?: string;
  updated_at?: string;
  created_by?: string | null;
  updated_by?: string | null;
}

// ────────────────────────────────────────────
// bulk_jobs
// ────────────────────────────────────────────
export interface BulkJobsRow {
  id: string;
  organization_id: string;
  operation: string;
  total_items: number;
  processed_items: number;
  successful_items: number;
  failed_items: number;
  status: string;
  params: Json | null;
  results: Json | null;
  created_by_user_id: string | null;
  created_at: string;
  started_at: string | null;
  completed_at: string | null;
}

export interface BulkJobsInsert {
  id?: string;
  organization_id: string;
  operation: string;
  total_items?: number;
  processed_items?: number;
  successful_items?: number;
  failed_items?: number;
  status?: string;
  params?: Json | null;
  results?: Json | null;
  created_by_user_id?: string | null;
  created_at?: string;
  started_at?: string | null;
  completed_at?: string | null;
}

export interface BulkJobsUpdate {
  id?: string;
  organization_id?: string;
  operation?: string;
  total_items?: number;
  processed_items?: number;
  successful_items?: number;
  failed_items?: number;
  status?: string;
  params?: Json | null;
  results?: Json | null;
  created_by_user_id?: string | null;
  created_at?: string;
  started_at?: string | null;
  completed_at?: string | null;
}

// ────────────────────────────────────────────
// business_rules
// ────────────────────────────────────────────
export interface BusinessRulesRow {
  id: string;
  organization_id: string;
  rule_name: string;
  rule_type: string;
  conditions: Json;
  actions: Json;
  priority: number | null;
  is_active: boolean | null;
  created_by: string | null;
  created_at: string | null;
  updated_at: string | null;
}

export interface BusinessRulesInsert {
  id?: string;
  organization_id: string;
  rule_name: string;
  rule_type: string;
  conditions: Json;
  actions: Json;
  priority?: number | null;
  is_active?: boolean | null;
  created_by?: string | null;
  created_at?: string | null;
  updated_at?: string | null;
}

export interface BusinessRulesUpdate {
  id?: string;
  organization_id?: string;
  rule_name?: string;
  rule_type?: string;
  conditions?: Json;
  actions?: Json;
  priority?: number | null;
  is_active?: boolean | null;
  created_by?: string | null;
  created_at?: string | null;
  updated_at?: string | null;
}

// ────────────────────────────────────────────
// calendar_connections
// ────────────────────────────────────────────
export interface CalendarConnectionsRow {
  id: string;
  organization_id: string;
  user_id: string;
  provider: string | null;
  provider_account_id: string | null;
  access_token_encrypted: string | null;
  refresh_token_encrypted: string | null;
  token_expires_at: string | null;
  calendar_ids: Json | null;
  sync_enabled: boolean | null;
  last_sync_at: string | null;
  status: string | null;
  created_at: string | null;
  updated_at: string | null;
}

export interface CalendarConnectionsInsert {
  id?: string;
  organization_id: string;
  user_id: string;
  provider?: string | null;
  provider_account_id?: string | null;
  access_token_encrypted?: string | null;
  refresh_token_encrypted?: string | null;
  token_expires_at?: string | null;
  calendar_ids?: Json | null;
  sync_enabled?: boolean | null;
  last_sync_at?: string | null;
  status?: string | null;
  created_at?: string | null;
  updated_at?: string | null;
}

export interface CalendarConnectionsUpdate {
  id?: string;
  organization_id?: string;
  user_id?: string;
  provider?: string | null;
  provider_account_id?: string | null;
  access_token_encrypted?: string | null;
  refresh_token_encrypted?: string | null;
  token_expires_at?: string | null;
  calendar_ids?: Json | null;
  sync_enabled?: boolean | null;
  last_sync_at?: string | null;
  status?: string | null;
  created_at?: string | null;
  updated_at?: string | null;
}

// ────────────────────────────────────────────
// calendar_events
// ────────────────────────────────────────────
export interface CalendarEventsRow {
  id: string;
  organization_id: string;
  connection_id: string;
  meeting_id: string | null;
  provider_event_id: string | null;
  title: string | null;
  description: string | null;
  start_time: string;
  end_time: string;
  timezone: string | null;
  location: string | null;
  attendees: Json | null;
  recurrence: Json | null;
  status: string | null;
  last_synced_at: string | null;
  created_at: string | null;
  updated_at: string | null;
}

export interface CalendarEventsInsert {
  id?: string;
  organization_id: string;
  connection_id: string;
  meeting_id?: string | null;
  provider_event_id?: string | null;
  title?: string | null;
  description?: string | null;
  start_time: string;
  end_time: string;
  timezone?: string | null;
  location?: string | null;
  attendees?: Json | null;
  recurrence?: Json | null;
  status?: string | null;
  last_synced_at?: string | null;
  created_at?: string | null;
  updated_at?: string | null;
}

export interface CalendarEventsUpdate {
  id?: string;
  organization_id?: string;
  connection_id?: string;
  meeting_id?: string | null;
  provider_event_id?: string | null;
  title?: string | null;
  description?: string | null;
  start_time?: string;
  end_time?: string;
  timezone?: string | null;
  location?: string | null;
  attendees?: Json | null;
  recurrence?: Json | null;
  status?: string | null;
  last_synced_at?: string | null;
  created_at?: string | null;
  updated_at?: string | null;
}

// ────────────────────────────────────────────
// campaign_enrollments
// ────────────────────────────────────────────
export interface CampaignEnrollmentsRow {
  id: string;
  organization_id: string;
  sequence_id: string;
  candidate_id: string;
  status: string;
  current_step: number;
  enrolled_at: string;
  stopped_at: string | null;
  metadata: Json | null;
}

export interface CampaignEnrollmentsInsert {
  id?: string;
  organization_id: string;
  sequence_id: string;
  candidate_id: string;
  status?: string;
  current_step?: number;
  enrolled_at?: string;
  stopped_at?: string | null;
  metadata?: Json | null;
}

export interface CampaignEnrollmentsUpdate {
  id?: string;
  organization_id?: string;
  sequence_id?: string;
  candidate_id?: string;
  status?: string;
  current_step?: number;
  enrolled_at?: string;
  stopped_at?: string | null;
  metadata?: Json | null;
}

// ────────────────────────────────────────────
// campaign_sequences
// ────────────────────────────────────────────
export interface CampaignSequencesRow {
  id: string;
  organization_id: string;
  name: string;
  description: string | null;
  steps: Json;
  is_active: boolean;
  created_at: string;
}

export interface CampaignSequencesInsert {
  id?: string;
  organization_id: string;
  name: string;
  description?: string | null;
  steps: Json;
  is_active?: boolean;
  created_at?: string;
}

export interface CampaignSequencesUpdate {
  id?: string;
  organization_id?: string;
  name?: string;
  description?: string | null;
  steps?: Json;
  is_active?: boolean;
  created_at?: string;
}

// ────────────────────────────────────────────
// candidate_consents
// ────────────────────────────────────────────
export interface CandidateConsentsRow {
  id: string;
  organization_id: string;
  candidate_id: string;
  consent_type: string;
  consent_status: string;
  consent_source: string | null;
  consent_text: string | null;
  consent_date: string;
  expiry_date: string | null;
  withdrawal_date: string | null;
  ip_address: string | null;
  user_agent: string | null;
  recorded_by: string | null;
  notes: string | null;
  metadata: Json | null;
  created_at: string | null;
  updated_at: string | null;
}

export interface CandidateConsentsInsert {
  id?: string;
  organization_id: string;
  candidate_id: string;
  consent_type: string;
  consent_status: string;
  consent_source?: string | null;
  consent_text?: string | null;
  consent_date?: string;
  expiry_date?: string | null;
  withdrawal_date?: string | null;
  ip_address?: string | null;
  user_agent?: string | null;
  recorded_by?: string | null;
  notes?: string | null;
  metadata?: Json | null;
  created_at?: string | null;
  updated_at?: string | null;
}

export interface CandidateConsentsUpdate {
  id?: string;
  organization_id?: string;
  candidate_id?: string;
  consent_type?: string;
  consent_status?: string;
  consent_source?: string | null;
  consent_text?: string | null;
  consent_date?: string;
  expiry_date?: string | null;
  withdrawal_date?: string | null;
  ip_address?: string | null;
  user_agent?: string | null;
  recorded_by?: string | null;
  notes?: string | null;
  metadata?: Json | null;
  created_at?: string | null;
  updated_at?: string | null;
}

// ────────────────────────────────────────────
// candidate_documents
// ────────────────────────────────────────────
export interface CandidateDocumentsRow {
  id: string;
  organization_id: string | null;
  candidate_id: string | null;
  document_type: string;
  file_name: string;
  file_path: string | null;
  file_size: number | null;
  mime_type: string | null;
  parsed_data: Json | null;
  parsing_status: string | null;
  parsed_at: string | null;
  parser_version: string | null;
  is_primary: boolean | null;
  version: number | null;
  uploaded_by: string | null;
  created_at: string | null;
  updated_at: string | null;
}

export interface CandidateDocumentsInsert {
  id?: string;
  organization_id?: string | null;
  candidate_id?: string | null;
  document_type: string;
  file_name: string;
  file_path?: string | null;
  file_size?: number | null;
  mime_type?: string | null;
  parsed_data?: Json | null;
  parsing_status?: string | null;
  parsed_at?: string | null;
  parser_version?: string | null;
  is_primary?: boolean | null;
  version?: number | null;
  uploaded_by?: string | null;
  created_at?: string | null;
  updated_at?: string | null;
}

export interface CandidateDocumentsUpdate {
  id?: string;
  organization_id?: string | null;
  candidate_id?: string | null;
  document_type?: string;
  file_name?: string;
  file_path?: string | null;
  file_size?: number | null;
  mime_type?: string | null;
  parsed_data?: Json | null;
  parsing_status?: string | null;
  parsed_at?: string | null;
  parser_version?: string | null;
  is_primary?: boolean | null;
  version?: number | null;
  uploaded_by?: string | null;
  created_at?: string | null;
  updated_at?: string | null;
}

// ────────────────────────────────────────────
// candidate_education
// ────────────────────────────────────────────
export interface CandidateEducationRow {
  id: string;
  organization_id: string | null;
  candidate_id: string | null;
  institution: string;
  degree: string | null;
  field_of_study: string | null;
  location: string | null;
  start_date: string | null;
  end_date: string | null;
  graduated: boolean | null;
  gpa: number | null;
  honors: string[] | null;
  activities: string[] | null;
  source: string | null;
  created_at: string | null;
  updated_at: string | null;
}

export interface CandidateEducationInsert {
  id?: string;
  organization_id?: string | null;
  candidate_id?: string | null;
  institution: string;
  degree?: string | null;
  field_of_study?: string | null;
  location?: string | null;
  start_date?: string | null;
  end_date?: string | null;
  graduated?: boolean | null;
  gpa?: number | null;
  honors?: string[] | null;
  activities?: string[] | null;
  source?: string | null;
  created_at?: string | null;
  updated_at?: string | null;
}

export interface CandidateEducationUpdate {
  id?: string;
  organization_id?: string | null;
  candidate_id?: string | null;
  institution?: string;
  degree?: string | null;
  field_of_study?: string | null;
  location?: string | null;
  start_date?: string | null;
  end_date?: string | null;
  graduated?: boolean | null;
  gpa?: number | null;
  honors?: string[] | null;
  activities?: string[] | null;
  source?: string | null;
  created_at?: string | null;
  updated_at?: string | null;
}

// ────────────────────────────────────────────
// candidate_embeddings
// ────────────────────────────────────────────
export interface CandidateEmbeddingsRow {
  id: string;
  candidate_id: string;
  embedding: string;
  content_snapshot: string | null;
  model_name: string;
  generated_at: string;
  organization_id: string;
}

export interface CandidateEmbeddingsInsert {
  id?: string;
  candidate_id: string;
  embedding: string;
  content_snapshot?: string | null;
  model_name?: string;
  generated_at?: string;
  organization_id: string;
}

export interface CandidateEmbeddingsUpdate {
  id?: string;
  candidate_id?: string;
  embedding?: string;
  content_snapshot?: string | null;
  model_name?: string;
  generated_at?: string;
  organization_id?: string;
}

// ────────────────────────────────────────────
// candidate_identities
// ────────────────────────────────────────────
export interface CandidateIdentitiesRow {
  id: string;
  organization_id: string;
  candidate_id: string;
  identity_type: string;
  identity_value: string;
  is_primary: boolean | null;
  verified: boolean | null;
  verified_at: string | null;
  verified_by: string | null;
  source: string | null;
  created_at: string | null;
  updated_at: string | null;
}

export interface CandidateIdentitiesInsert {
  id?: string;
  organization_id: string;
  candidate_id: string;
  identity_type: string;
  identity_value: string;
  is_primary?: boolean | null;
  verified?: boolean | null;
  verified_at?: string | null;
  verified_by?: string | null;
  source?: string | null;
  created_at?: string | null;
  updated_at?: string | null;
}

export interface CandidateIdentitiesUpdate {
  id?: string;
  organization_id?: string;
  candidate_id?: string;
  identity_type?: string;
  identity_value?: string;
  is_primary?: boolean | null;
  verified?: boolean | null;
  verified_at?: string | null;
  verified_by?: string | null;
  source?: string | null;
  created_at?: string | null;
  updated_at?: string | null;
}

// ────────────────────────────────────────────
// candidate_notes
// ────────────────────────────────────────────
export interface CandidateNotesRow {
  id: string;
  organization_id: string | null;
  candidate_id: string | null;
  note_type: string;
  content: string;
  is_private: boolean | null;
  visible_to: string[] | null;
  created_by: string | null;
  created_at: string | null;
  updated_at: string | null;
}

export interface CandidateNotesInsert {
  id?: string;
  organization_id?: string | null;
  candidate_id?: string | null;
  note_type: string;
  content: string;
  is_private?: boolean | null;
  visible_to?: string[] | null;
  created_by?: string | null;
  created_at?: string | null;
  updated_at?: string | null;
}

export interface CandidateNotesUpdate {
  id?: string;
  organization_id?: string | null;
  candidate_id?: string | null;
  note_type?: string;
  content?: string;
  is_private?: boolean | null;
  visible_to?: string[] | null;
  created_by?: string | null;
  created_at?: string | null;
  updated_at?: string | null;
}

// ────────────────────────────────────────────
// candidate_portal_access
// ────────────────────────────────────────────
export interface CandidatePortalAccessRow {
  id: string;
  organization_id: string;
  candidate_id: string;
  access_token_hash: string | null;
  email: string | null;
  permissions: Json | null;
  last_login_at: string | null;
  login_count: number | null;
  expires_at: string | null;
  revoked_at: string | null;
  revoked_by: string | null;
  status: string | null;
  created_at: string | null;
  updated_at: string | null;
}

export interface CandidatePortalAccessInsert {
  id?: string;
  organization_id: string;
  candidate_id: string;
  access_token_hash?: string | null;
  email?: string | null;
  permissions?: Json | null;
  last_login_at?: string | null;
  login_count?: number | null;
  expires_at?: string | null;
  revoked_at?: string | null;
  revoked_by?: string | null;
  status?: string | null;
  created_at?: string | null;
  updated_at?: string | null;
}

export interface CandidatePortalAccessUpdate {
  id?: string;
  organization_id?: string;
  candidate_id?: string;
  access_token_hash?: string | null;
  email?: string | null;
  permissions?: Json | null;
  last_login_at?: string | null;
  login_count?: number | null;
  expires_at?: string | null;
  revoked_at?: string | null;
  revoked_by?: string | null;
  status?: string | null;
  created_at?: string | null;
  updated_at?: string | null;
}

// ────────────────────────────────────────────
// candidate_skills
// ────────────────────────────────────────────
export interface CandidateSkillsRow {
  id: string;
  organization_id: string;
  candidate_id: string | null;
  skill_id: string | null;
  skill_name: string;
  proficiency_level: string | null;
  years_experience: number | null;
  last_used: string | null;
  is_primary: boolean | null;
  source: string | null;
  confidence_score: number | null;
  verified: boolean | null;
  verified_by: string | null;
  verified_at: string | null;
  created_at: string | null;
  updated_at: string | null;
}

export interface CandidateSkillsInsert {
  id?: string;
  organization_id: string;
  candidate_id?: string | null;
  skill_id?: string | null;
  skill_name: string;
  proficiency_level?: string | null;
  years_experience?: number | null;
  last_used?: string | null;
  is_primary?: boolean | null;
  source?: string | null;
  confidence_score?: number | null;
  verified?: boolean | null;
  verified_by?: string | null;
  verified_at?: string | null;
  created_at?: string | null;
  updated_at?: string | null;
}

export interface CandidateSkillsUpdate {
  id?: string;
  organization_id?: string;
  candidate_id?: string | null;
  skill_id?: string | null;
  skill_name?: string;
  proficiency_level?: string | null;
  years_experience?: number | null;
  last_used?: string | null;
  is_primary?: boolean | null;
  source?: string | null;
  confidence_score?: number | null;
  verified?: boolean | null;
  verified_by?: string | null;
  verified_at?: string | null;
  created_at?: string | null;
  updated_at?: string | null;
}

// ────────────────────────────────────────────
// candidate_work_history
// ────────────────────────────────────────────
export interface CandidateWorkHistoryRow {
  id: string;
  organization_id: string | null;
  candidate_id: string | null;
  company_name: string;
  title: string | null;
  location: string | null;
  employment_type: string | null;
  start_date: string | null;
  end_date: string | null;
  is_current: boolean | null;
  description: string | null;
  achievements: string[] | null;
  technologies_used: string[] | null;
  source: string | null;
  created_at: string | null;
  updated_at: string | null;
}

export interface CandidateWorkHistoryInsert {
  id?: string;
  organization_id?: string | null;
  candidate_id?: string | null;
  company_name: string;
  title?: string | null;
  location?: string | null;
  employment_type?: string | null;
  start_date?: string | null;
  end_date?: string | null;
  is_current?: boolean | null;
  description?: string | null;
  achievements?: string[] | null;
  technologies_used?: string[] | null;
  source?: string | null;
  created_at?: string | null;
  updated_at?: string | null;
}

export interface CandidateWorkHistoryUpdate {
  id?: string;
  organization_id?: string | null;
  candidate_id?: string | null;
  company_name?: string;
  title?: string | null;
  location?: string | null;
  employment_type?: string | null;
  start_date?: string | null;
  end_date?: string | null;
  is_current?: boolean | null;
  description?: string | null;
  achievements?: string[] | null;
  technologies_used?: string[] | null;
  source?: string | null;
  created_at?: string | null;
  updated_at?: string | null;
}

// ────────────────────────────────────────────
// candidates
// ────────────────────────────────────────────
export interface CandidatesRow {
  id: string;
  organization_id: string;
  first_name: string | null;
  last_name: string | null;
  email: string | null;
  phone: string | null;
  linkedin_url: string | null;
  location: string | null;
  timezone: string | null;
  current_title: string | null;
  current_company: string | null;
  years_experience: number | null;
  desired_roles: string[] | null;
  skills: string[] | null;
  resume_url: string | null;
  status: string | null;
  source: string | null;
  notes: string | null;
  metadata: Json | null;
  created_at: string | null;
  updated_at: string | null;
  education_degree: string | null;
  education_institution: string | null;
  experience_years: number | null;
  headline: string | null;
  zip_code: string | null;
  stage: string | null;
  location_normalized: string | null;
  city: string | null;
  state: string | null;
  country: string | null;
  metro_area: string | null;
  tags: Json | null;
  rating: number | null;
  preferred_locations: Json | null;
  work_authorization: string | null;
  willing_to_relocate: boolean | null;
  deleted_at: string | null;
  deleted_by: string | null;
  created_by: string | null;
  updated_by: string | null;
  skills_json: Json | null;
  desired_roles_json: Json | null;
  current_title_id: string | null;
  target_title_id: string | null;
  clearance_level: string | null;
  diversity_metadata: Json | null;
  compensation_expectation: Json | null;
  last_contact_date: string | null;
  last_contact_type: string | null;
  last_contact_by: string | null;
  duplicate_of: string | null;
  merge_date: string | null;
  merged_by: string | null;
  is_do_not_contact: boolean | null;
  do_not_contact_reason: string | null;
  do_not_contact_until: string | null;
  data_retention_date: string | null;
  gdpr_consent_status: string | null;
  sms_opt_out: boolean;
}

export interface CandidatesInsert {
  id?: string;
  organization_id: string;
  first_name?: string | null;
  last_name?: string | null;
  email?: string | null;
  phone?: string | null;
  linkedin_url?: string | null;
  location?: string | null;
  timezone?: string | null;
  current_title?: string | null;
  current_company?: string | null;
  years_experience?: number | null;
  desired_roles?: string[] | null;
  skills?: string[] | null;
  resume_url?: string | null;
  status?: string | null;
  source?: string | null;
  notes?: string | null;
  metadata?: Json | null;
  created_at?: string | null;
  updated_at?: string | null;
  education_degree?: string | null;
  education_institution?: string | null;
  experience_years?: number | null;
  headline?: string | null;
  zip_code?: string | null;
  stage?: string | null;
  location_normalized?: string | null;
  city?: string | null;
  state?: string | null;
  country?: string | null;
  metro_area?: string | null;
  tags?: Json | null;
  rating?: number | null;
  preferred_locations?: Json | null;
  work_authorization?: string | null;
  willing_to_relocate?: boolean | null;
  deleted_at?: string | null;
  deleted_by?: string | null;
  created_by?: string | null;
  updated_by?: string | null;
  skills_json?: Json | null;
  desired_roles_json?: Json | null;
  current_title_id?: string | null;
  target_title_id?: string | null;
  clearance_level?: string | null;
  diversity_metadata?: Json | null;
  compensation_expectation?: Json | null;
  last_contact_date?: string | null;
  last_contact_type?: string | null;
  last_contact_by?: string | null;
  duplicate_of?: string | null;
  merge_date?: string | null;
  merged_by?: string | null;
  is_do_not_contact?: boolean | null;
  do_not_contact_reason?: string | null;
  do_not_contact_until?: string | null;
  data_retention_date?: string | null;
  gdpr_consent_status?: string | null;
  sms_opt_out?: boolean;
}

export interface CandidatesUpdate {
  id?: string;
  organization_id?: string;
  first_name?: string | null;
  last_name?: string | null;
  email?: string | null;
  phone?: string | null;
  linkedin_url?: string | null;
  location?: string | null;
  timezone?: string | null;
  current_title?: string | null;
  current_company?: string | null;
  years_experience?: number | null;
  desired_roles?: string[] | null;
  skills?: string[] | null;
  resume_url?: string | null;
  status?: string | null;
  source?: string | null;
  notes?: string | null;
  metadata?: Json | null;
  created_at?: string | null;
  updated_at?: string | null;
  education_degree?: string | null;
  education_institution?: string | null;
  experience_years?: number | null;
  headline?: string | null;
  zip_code?: string | null;
  stage?: string | null;
  location_normalized?: string | null;
  city?: string | null;
  state?: string | null;
  country?: string | null;
  metro_area?: string | null;
  tags?: Json | null;
  rating?: number | null;
  preferred_locations?: Json | null;
  work_authorization?: string | null;
  willing_to_relocate?: boolean | null;
  deleted_at?: string | null;
  deleted_by?: string | null;
  created_by?: string | null;
  updated_by?: string | null;
  skills_json?: Json | null;
  desired_roles_json?: Json | null;
  current_title_id?: string | null;
  target_title_id?: string | null;
  clearance_level?: string | null;
  diversity_metadata?: Json | null;
  compensation_expectation?: Json | null;
  last_contact_date?: string | null;
  last_contact_type?: string | null;
  last_contact_by?: string | null;
  duplicate_of?: string | null;
  merge_date?: string | null;
  merged_by?: string | null;
  is_do_not_contact?: boolean | null;
  do_not_contact_reason?: string | null;
  do_not_contact_until?: string | null;
  data_retention_date?: string | null;
  gdpr_consent_status?: string | null;
  sms_opt_out?: boolean;
}

// ────────────────────────────────────────────
// candidates_v
// ────────────────────────────────────────────
export interface CandidatesVRow {
  id: string | null;
  organization_id: string | null;
  first_name: string | null;
  last_name: string | null;
  current_title: string | null;
  current_company: string | null;
  status: string | null;
  created_at: string | null;
}

export interface CandidatesVInsert {
  id?: string | null;
  organization_id?: string | null;
  first_name?: string | null;
  last_name?: string | null;
  current_title?: string | null;
  current_company?: string | null;
  status?: string | null;
  created_at?: string | null;
}

export interface CandidatesVUpdate {
  id?: string | null;
  organization_id?: string | null;
  first_name?: string | null;
  last_name?: string | null;
  current_title?: string | null;
  current_company?: string | null;
  status?: string | null;
  created_at?: string | null;
}

// ────────────────────────────────────────────
// client_contacts
// ────────────────────────────────────────────
export interface ClientContactsRow {
  id: string;
  organization_id: string | null;
  client_id: string | null;
  first_name: string | null;
  last_name: string | null;
  email: string | null;
  phone: string | null;
  mobile: string | null;
  title: string | null;
  department: string | null;
  is_primary: boolean | null;
  is_decision_maker: boolean | null;
  is_hiring_manager: boolean | null;
  preferred_contact_method: string | null;
  timezone: string | null;
  is_active: boolean | null;
  linkedin_url: string | null;
  notes: string | null;
  created_at: string | null;
  updated_at: string | null;
}

export interface ClientContactsInsert {
  id?: string;
  organization_id?: string | null;
  client_id?: string | null;
  first_name?: string | null;
  last_name?: string | null;
  email?: string | null;
  phone?: string | null;
  mobile?: string | null;
  title?: string | null;
  department?: string | null;
  is_primary?: boolean | null;
  is_decision_maker?: boolean | null;
  is_hiring_manager?: boolean | null;
  preferred_contact_method?: string | null;
  timezone?: string | null;
  is_active?: boolean | null;
  linkedin_url?: string | null;
  notes?: string | null;
  created_at?: string | null;
  updated_at?: string | null;
}

export interface ClientContactsUpdate {
  id?: string;
  organization_id?: string | null;
  client_id?: string | null;
  first_name?: string | null;
  last_name?: string | null;
  email?: string | null;
  phone?: string | null;
  mobile?: string | null;
  title?: string | null;
  department?: string | null;
  is_primary?: boolean | null;
  is_decision_maker?: boolean | null;
  is_hiring_manager?: boolean | null;
  preferred_contact_method?: string | null;
  timezone?: string | null;
  is_active?: boolean | null;
  linkedin_url?: string | null;
  notes?: string | null;
  created_at?: string | null;
  updated_at?: string | null;
}

// ────────────────────────────────────────────
// client_contracts
// ────────────────────────────────────────────
export interface ClientContractsRow {
  id: string;
  organization_id: string | null;
  client_id: string | null;
  contract_number: string | null;
  contract_type: string | null;
  title: string | null;
  description: string | null;
  start_date: string;
  end_date: string | null;
  auto_renew: boolean | null;
  payment_terms: string | null;
  billing_frequency: string | null;
  currency: string | null;
  standard_markup_percent: number | null;
  standard_fee_percent: number | null;
  volume_discounts: Json | null;
  document_path: string | null;
  signed_document_path: string | null;
  status: string | null;
  signed_by: string | null;
  signed_at: string | null;
  created_by: string | null;
  created_at: string | null;
  updated_at: string | null;
}

export interface ClientContractsInsert {
  id?: string;
  organization_id?: string | null;
  client_id?: string | null;
  contract_number?: string | null;
  contract_type?: string | null;
  title?: string | null;
  description?: string | null;
  start_date: string;
  end_date?: string | null;
  auto_renew?: boolean | null;
  payment_terms?: string | null;
  billing_frequency?: string | null;
  currency?: string | null;
  standard_markup_percent?: number | null;
  standard_fee_percent?: number | null;
  volume_discounts?: Json | null;
  document_path?: string | null;
  signed_document_path?: string | null;
  status?: string | null;
  signed_by?: string | null;
  signed_at?: string | null;
  created_by?: string | null;
  created_at?: string | null;
  updated_at?: string | null;
}

export interface ClientContractsUpdate {
  id?: string;
  organization_id?: string | null;
  client_id?: string | null;
  contract_number?: string | null;
  contract_type?: string | null;
  title?: string | null;
  description?: string | null;
  start_date?: string;
  end_date?: string | null;
  auto_renew?: boolean | null;
  payment_terms?: string | null;
  billing_frequency?: string | null;
  currency?: string | null;
  standard_markup_percent?: number | null;
  standard_fee_percent?: number | null;
  volume_discounts?: Json | null;
  document_path?: string | null;
  signed_document_path?: string | null;
  status?: string | null;
  signed_by?: string | null;
  signed_at?: string | null;
  created_by?: string | null;
  created_at?: string | null;
  updated_at?: string | null;
}

// ────────────────────────────────────────────
// client_portal_access
// ────────────────────────────────────────────
export interface ClientPortalAccessRow {
  id: string;
  organization_id: string;
  client_id: string;
  contact_id: string | null;
  access_token_hash: string | null;
  email: string | null;
  permissions: Json | null;
  job_ids: Json | null;
  last_login_at: string | null;
  login_count: number | null;
  expires_at: string | null;
  revoked_at: string | null;
  revoked_by: string | null;
  status: string | null;
  created_at: string | null;
  updated_at: string | null;
}

export interface ClientPortalAccessInsert {
  id?: string;
  organization_id: string;
  client_id: string;
  contact_id?: string | null;
  access_token_hash?: string | null;
  email?: string | null;
  permissions?: Json | null;
  job_ids?: Json | null;
  last_login_at?: string | null;
  login_count?: number | null;
  expires_at?: string | null;
  revoked_at?: string | null;
  revoked_by?: string | null;
  status?: string | null;
  created_at?: string | null;
  updated_at?: string | null;
}

export interface ClientPortalAccessUpdate {
  id?: string;
  organization_id?: string;
  client_id?: string;
  contact_id?: string | null;
  access_token_hash?: string | null;
  email?: string | null;
  permissions?: Json | null;
  job_ids?: Json | null;
  last_login_at?: string | null;
  login_count?: number | null;
  expires_at?: string | null;
  revoked_at?: string | null;
  revoked_by?: string | null;
  status?: string | null;
  created_at?: string | null;
  updated_at?: string | null;
}

// ────────────────────────────────────────────
// client_projects
// ────────────────────────────────────────────
export interface ClientProjectsRow {
  id: string;
  organization_id: string | null;
  client_id: string | null;
  contract_id: string | null;
  project_code: string | null;
  name: string;
  description: string | null;
  hiring_manager_contact_id: string | null;
  billing_code: string | null;
  po_number: string | null;
  status: string | null;
  start_date: string | null;
  end_date: string | null;
  created_at: string | null;
  updated_at: string | null;
}

export interface ClientProjectsInsert {
  id?: string;
  organization_id?: string | null;
  client_id?: string | null;
  contract_id?: string | null;
  project_code?: string | null;
  name: string;
  description?: string | null;
  hiring_manager_contact_id?: string | null;
  billing_code?: string | null;
  po_number?: string | null;
  status?: string | null;
  start_date?: string | null;
  end_date?: string | null;
  created_at?: string | null;
  updated_at?: string | null;
}

export interface ClientProjectsUpdate {
  id?: string;
  organization_id?: string | null;
  client_id?: string | null;
  contract_id?: string | null;
  project_code?: string | null;
  name?: string;
  description?: string | null;
  hiring_manager_contact_id?: string | null;
  billing_code?: string | null;
  po_number?: string | null;
  status?: string | null;
  start_date?: string | null;
  end_date?: string | null;
  created_at?: string | null;
  updated_at?: string | null;
}

// ────────────────────────────────────────────
// clients
// ────────────────────────────────────────────
export interface ClientsRow {
  id: string;
  organization_id: string;
  name: string;
  industry: string | null;
  website: string | null;
  tier: string | null;
  status: string | null;
  contact_name: string | null;
  contact_email: string | null;
  contact_phone: string | null;
  billing_info: Json | null;
  created_at: string | null;
  updated_at: string | null;
}

export interface ClientsInsert {
  id?: string;
  organization_id: string;
  name: string;
  industry?: string | null;
  website?: string | null;
  tier?: string | null;
  status?: string | null;
  contact_name?: string | null;
  contact_email?: string | null;
  contact_phone?: string | null;
  billing_info?: Json | null;
  created_at?: string | null;
  updated_at?: string | null;
}

export interface ClientsUpdate {
  id?: string;
  organization_id?: string;
  name?: string;
  industry?: string | null;
  website?: string | null;
  tier?: string | null;
  status?: string | null;
  contact_name?: string | null;
  contact_email?: string | null;
  contact_phone?: string | null;
  billing_info?: Json | null;
  created_at?: string | null;
  updated_at?: string | null;
}

// ────────────────────────────────────────────
// communications
// ────────────────────────────────────────────
export interface CommunicationsRow {
  id: string;
  candidate_id: string | null;
  sender_id: string | null;
  sender_type: string | null;
  channel: string | null;
  direction: string | null;
  subject: string | null;
  body: string | null;
  template_id: string | null;
  template_variables: Json | null;
  status: string | null;
  sent_at: string | null;
  delivered_at: string | null;
  opened_at: string | null;
  external_id: string | null;
  tracking_data: Json | null;
  created_at: string | null;
  organization_id: string;
}

export interface CommunicationsInsert {
  id?: string;
  candidate_id?: string | null;
  sender_id?: string | null;
  sender_type?: string | null;
  channel?: string | null;
  direction?: string | null;
  subject?: string | null;
  body?: string | null;
  template_id?: string | null;
  template_variables?: Json | null;
  status?: string | null;
  sent_at?: string | null;
  delivered_at?: string | null;
  opened_at?: string | null;
  external_id?: string | null;
  tracking_data?: Json | null;
  created_at?: string | null;
  organization_id: string;
}

export interface CommunicationsUpdate {
  id?: string;
  candidate_id?: string | null;
  sender_id?: string | null;
  sender_type?: string | null;
  channel?: string | null;
  direction?: string | null;
  subject?: string | null;
  body?: string | null;
  template_id?: string | null;
  template_variables?: Json | null;
  status?: string | null;
  sent_at?: string | null;
  delivered_at?: string | null;
  opened_at?: string | null;
  external_id?: string | null;
  tracking_data?: Json | null;
  created_at?: string | null;
  organization_id?: string;
}

// ────────────────────────────────────────────
// comp_bands
// ────────────────────────────────────────────
export interface CompBandsRow {
  id: string;
  organization_id: string;
  job_id: string | null;
  role_title: string | null;
  location: string | null;
  employment_type: string;
  currency: string;
  min_amount: number;
  mid_amount: number | null;
  max_amount: number;
  unit: string;
  effective_from: string;
  effective_to: string | null;
  approvals_required: Json | null;
  created_at: string;
}

export interface CompBandsInsert {
  id?: string;
  organization_id: string;
  job_id?: string | null;
  role_title?: string | null;
  location?: string | null;
  employment_type: string;
  currency?: string;
  min_amount: number;
  mid_amount?: number | null;
  max_amount: number;
  unit: string;
  effective_from?: string;
  effective_to?: string | null;
  approvals_required?: Json | null;
  created_at?: string;
}

export interface CompBandsUpdate {
  id?: string;
  organization_id?: string;
  job_id?: string | null;
  role_title?: string | null;
  location?: string | null;
  employment_type?: string;
  currency?: string;
  min_amount?: number;
  mid_amount?: number | null;
  max_amount?: number;
  unit?: string;
  effective_from?: string;
  effective_to?: string | null;
  approvals_required?: Json | null;
  created_at?: string;
}

// ────────────────────────────────────────────
// companies
// ────────────────────────────────────────────
export interface CompaniesRow {
  id: string;
  organization_id: string;
  name: string;
  type: string | null;
  industry: string | null;
  website: string | null;
  linkedin_url: string | null;
  phone: string | null;
  email: string | null;
  status: string | null;
  employee_count: number | null;
  annual_revenue: number | null;
  headquarters: string | null;
  billing_address: Json | null;
  payment_terms: string | null;
  default_bill_rate: number | null;
  default_markup: number | null;
  notes: string | null;
  tags: Json | null;
  created_at: string | null;
  updated_at: string | null;
  deleted_at: string | null;
  deleted_by: string | null;
  created_by: string | null;
  updated_by: string | null;
  is_marketplace_enabled: boolean | null;
  preferred_fee_percentage: number | null;
  auto_post_to_marketplace: boolean | null;
}

export interface CompaniesInsert {
  id?: string;
  organization_id: string;
  name: string;
  type?: string | null;
  industry?: string | null;
  website?: string | null;
  linkedin_url?: string | null;
  phone?: string | null;
  email?: string | null;
  status?: string | null;
  employee_count?: number | null;
  annual_revenue?: number | null;
  headquarters?: string | null;
  billing_address?: Json | null;
  payment_terms?: string | null;
  default_bill_rate?: number | null;
  default_markup?: number | null;
  notes?: string | null;
  tags?: Json | null;
  created_at?: string | null;
  updated_at?: string | null;
  deleted_at?: string | null;
  deleted_by?: string | null;
  created_by?: string | null;
  updated_by?: string | null;
  is_marketplace_enabled?: boolean | null;
  preferred_fee_percentage?: number | null;
  auto_post_to_marketplace?: boolean | null;
}

export interface CompaniesUpdate {
  id?: string;
  organization_id?: string;
  name?: string;
  type?: string | null;
  industry?: string | null;
  website?: string | null;
  linkedin_url?: string | null;
  phone?: string | null;
  email?: string | null;
  status?: string | null;
  employee_count?: number | null;
  annual_revenue?: number | null;
  headquarters?: string | null;
  billing_address?: Json | null;
  payment_terms?: string | null;
  default_bill_rate?: number | null;
  default_markup?: number | null;
  notes?: string | null;
  tags?: Json | null;
  created_at?: string | null;
  updated_at?: string | null;
  deleted_at?: string | null;
  deleted_by?: string | null;
  created_by?: string | null;
  updated_by?: string | null;
  is_marketplace_enabled?: boolean | null;
  preferred_fee_percentage?: number | null;
  auto_post_to_marketplace?: boolean | null;
}

// ────────────────────────────────────────────
// compliance
// ────────────────────────────────────────────
export interface ComplianceRow {
  id: string;
  organization_id: string;
  entity_type: string | null;
  entity_id: string | null;
  compliance_type: string;
  requirement: string | null;
  status: string | null;
  due_date: string | null;
  completed_date: string | null;
  verified_by: string | null;
  notes: string | null;
  created_at: string | null;
  updated_at: string | null;
  created_by: string | null;
}

export interface ComplianceInsert {
  id?: string;
  organization_id: string;
  entity_type?: string | null;
  entity_id?: string | null;
  compliance_type: string;
  requirement?: string | null;
  status?: string | null;
  due_date?: string | null;
  completed_date?: string | null;
  verified_by?: string | null;
  notes?: string | null;
  created_at?: string | null;
  updated_at?: string | null;
  created_by?: string | null;
}

export interface ComplianceUpdate {
  id?: string;
  organization_id?: string;
  entity_type?: string | null;
  entity_id?: string | null;
  compliance_type?: string;
  requirement?: string | null;
  status?: string | null;
  due_date?: string | null;
  completed_date?: string | null;
  verified_by?: string | null;
  notes?: string | null;
  created_at?: string | null;
  updated_at?: string | null;
  created_by?: string | null;
}

// ────────────────────────────────────────────
// consultants
// ────────────────────────────────────────────
export interface ConsultantsRow {
  id: string;
  organization_id: string | null;
  candidate_id: string | null;
  status: string | null;
  performance_rating: number | null;
  availability_date: string | null;
  preferred_locations: string[] | null;
  preferred_roles: string[] | null;
  preferred_rate_min: number | null;
  preferred_rate_max: number | null;
  notes: string | null;
  created_at: string | null;
  updated_at: string | null;
}

export interface ConsultantsInsert {
  id?: string;
  organization_id?: string | null;
  candidate_id?: string | null;
  status?: string | null;
  performance_rating?: number | null;
  availability_date?: string | null;
  preferred_locations?: string[] | null;
  preferred_roles?: string[] | null;
  preferred_rate_min?: number | null;
  preferred_rate_max?: number | null;
  notes?: string | null;
  created_at?: string | null;
  updated_at?: string | null;
}

export interface ConsultantsUpdate {
  id?: string;
  organization_id?: string | null;
  candidate_id?: string | null;
  status?: string | null;
  performance_rating?: number | null;
  availability_date?: string | null;
  preferred_locations?: string[] | null;
  preferred_roles?: string[] | null;
  preferred_rate_min?: number | null;
  preferred_rate_max?: number | null;
  notes?: string | null;
  created_at?: string | null;
  updated_at?: string | null;
}

// ────────────────────────────────────────────
// contact_points
// ────────────────────────────────────────────
export interface ContactPointsRow {
  id: string;
  organization_id: string;
  candidate_id: string;
  type: string;
  value: string;
  is_primary: boolean;
  is_dnc: boolean;
  normalized_value: string | null;
  created_at: string;
}

export interface ContactPointsInsert {
  id?: string;
  organization_id: string;
  candidate_id: string;
  type: string;
  value: string;
  is_primary?: boolean;
  is_dnc?: boolean;
  normalized_value?: string | null;
  created_at?: string;
}

export interface ContactPointsUpdate {
  id?: string;
  organization_id?: string;
  candidate_id?: string;
  type?: string;
  value?: string;
  is_primary?: boolean;
  is_dnc?: boolean;
  normalized_value?: string | null;
  created_at?: string;
}

// ────────────────────────────────────────────
// contacts
// ────────────────────────────────────────────
export interface ContactsRow {
  id: string;
  organization_id: string;
  client_id: string | null;
  first_name: string | null;
  last_name: string | null;
  email: string | null;
  phone: string | null;
  title: string | null;
  status: string | null;
  created_at: string | null;
  updated_at: string | null;
}

export interface ContactsInsert {
  id?: string;
  organization_id: string;
  client_id?: string | null;
  first_name?: string | null;
  last_name?: string | null;
  email?: string | null;
  phone?: string | null;
  title?: string | null;
  status?: string | null;
  created_at?: string | null;
  updated_at?: string | null;
}

export interface ContactsUpdate {
  id?: string;
  organization_id?: string;
  client_id?: string | null;
  first_name?: string | null;
  last_name?: string | null;
  email?: string | null;
  phone?: string | null;
  title?: string | null;
  status?: string | null;
  created_at?: string | null;
  updated_at?: string | null;
}

// ────────────────────────────────────────────
// contracts
// ────────────────────────────────────────────
export interface ContractsRow {
  id: string;
  organization_id: string;
  contract_number: string | null;
  client_id: string | null;
  candidate_id: string | null;
  contract_type: string | null;
  start_date: string | null;
  end_date: string | null;
  status: string | null;
  terms: Json | null;
  created_at: string | null;
  updated_at: string | null;
  created_by: string | null;
}

export interface ContractsInsert {
  id?: string;
  organization_id: string;
  contract_number?: string | null;
  client_id?: string | null;
  candidate_id?: string | null;
  contract_type?: string | null;
  start_date?: string | null;
  end_date?: string | null;
  status?: string | null;
  terms?: Json | null;
  created_at?: string | null;
  updated_at?: string | null;
  created_by?: string | null;
}

export interface ContractsUpdate {
  id?: string;
  organization_id?: string;
  contract_number?: string | null;
  client_id?: string | null;
  candidate_id?: string | null;
  contract_type?: string | null;
  start_date?: string | null;
  end_date?: string | null;
  status?: string | null;
  terms?: Json | null;
  created_at?: string | null;
  updated_at?: string | null;
  created_by?: string | null;
}

// ────────────────────────────────────────────
// conversations
// ────────────────────────────────────────────
export interface ConversationsRow {
  id: string;
  organization_id: string;
  candidate_id: string;
  channel: string;
  status: string;
  last_message_at: string | null;
  message_count: number;
  metadata: Json | null;
  created_at: string;
}

export interface ConversationsInsert {
  id?: string;
  organization_id: string;
  candidate_id: string;
  channel: string;
  status?: string;
  last_message_at?: string | null;
  message_count?: number;
  metadata?: Json | null;
  created_at?: string;
}

export interface ConversationsUpdate {
  id?: string;
  organization_id?: string;
  candidate_id?: string;
  channel?: string;
  status?: string;
  last_message_at?: string | null;
  message_count?: number;
  metadata?: Json | null;
  created_at?: string;
}

// ────────────────────────────────────────────
// dashboards
// ────────────────────────────────────────────
export interface DashboardsRow {
  id: string;
  organization_id: string;
  name: string;
  description: string | null;
  layout: Json | null;
  widgets: Json | null;
  status: string | null;
  created_at: string | null;
  updated_at: string | null;
  created_by: string | null;
}

export interface DashboardsInsert {
  id?: string;
  organization_id: string;
  name: string;
  description?: string | null;
  layout?: Json | null;
  widgets?: Json | null;
  status?: string | null;
  created_at?: string | null;
  updated_at?: string | null;
  created_by?: string | null;
}

export interface DashboardsUpdate {
  id?: string;
  organization_id?: string;
  name?: string;
  description?: string | null;
  layout?: Json | null;
  widgets?: Json | null;
  status?: string | null;
  created_at?: string | null;
  updated_at?: string | null;
  created_by?: string | null;
}

// ────────────────────────────────────────────
// decision_packets
// ────────────────────────────────────────────
export interface DecisionPacketsRow {
  id: string;
  organization_id: string;
  interview_plan_id: string;
  candidate_id: string;
  job_id: string | null;
  status: string;
  packet: Json | null;
  ai_summary: string | null;
  ai_risks: Json | null;
  ai_recommendation: string | null;
  created_at: string;
}

export interface DecisionPacketsInsert {
  id?: string;
  organization_id: string;
  interview_plan_id: string;
  candidate_id: string;
  job_id?: string | null;
  status?: string;
  packet?: Json | null;
  ai_summary?: string | null;
  ai_risks?: Json | null;
  ai_recommendation?: string | null;
  created_at?: string;
}

export interface DecisionPacketsUpdate {
  id?: string;
  organization_id?: string;
  interview_plan_id?: string;
  candidate_id?: string;
  job_id?: string | null;
  status?: string;
  packet?: Json | null;
  ai_summary?: string | null;
  ai_risks?: Json | null;
  ai_recommendation?: string | null;
  created_at?: string;
}

// ────────────────────────────────────────────
// documents
// ────────────────────────────────────────────
export interface DocumentsRow {
  id: string;
  workspace_id: string;
  candidate_id: string;
  file_name: string;
  file_type: string | null;
  mime_type: string | null;
  file_size_bytes: number | null;
  storage_path: string;
  storage_bucket: string | null;
  parsed_text: string | null;
  parsed_data: Json | null;
  uploaded_by: string;
  uploaded_at: string;
  organization_id: string | null;
  status: string | null;
}

export interface DocumentsInsert {
  id?: string;
  workspace_id: string;
  candidate_id: string;
  file_name: string;
  file_type?: string | null;
  mime_type?: string | null;
  file_size_bytes?: number | null;
  storage_path: string;
  storage_bucket?: string | null;
  parsed_text?: string | null;
  parsed_data?: Json | null;
  uploaded_by: string;
  uploaded_at?: string;
  organization_id?: string | null;
  status?: string | null;
}

export interface DocumentsUpdate {
  id?: string;
  workspace_id?: string;
  candidate_id?: string;
  file_name?: string;
  file_type?: string | null;
  mime_type?: string | null;
  file_size_bytes?: number | null;
  storage_path?: string;
  storage_bucket?: string | null;
  parsed_text?: string | null;
  parsed_data?: Json | null;
  uploaded_by?: string;
  uploaded_at?: string;
  organization_id?: string | null;
  status?: string | null;
}

// ────────────────────────────────────────────
// eeo_data
// ────────────────────────────────────────────
export interface EeoDataRow {
  id: string;
  candidate_id: string | null;
  gender: string | null;
  race_ethnicity: string | null;
  veteran_status: string | null;
  disability_status: string | null;
  collected_at: string | null;
  collection_method: string | null;
  consent_given: boolean | null;
  organization_id: string;
}

export interface EeoDataInsert {
  id?: string;
  candidate_id?: string | null;
  gender?: string | null;
  race_ethnicity?: string | null;
  veteran_status?: string | null;
  disability_status?: string | null;
  collected_at?: string | null;
  collection_method?: string | null;
  consent_given?: boolean | null;
  organization_id: string;
}

export interface EeoDataUpdate {
  id?: string;
  candidate_id?: string | null;
  gender?: string | null;
  race_ethnicity?: string | null;
  veteran_status?: string | null;
  disability_status?: string | null;
  collected_at?: string | null;
  collection_method?: string | null;
  consent_given?: boolean | null;
  organization_id?: string;
}

// ────────────────────────────────────────────
// email_logs
// ────────────────────────────────────────────
export interface EmailLogsRow {
  id: string;
  organization_id: string;
  resend_id: string | null;
  template: string;
  recipient_email: string;
  recipient_type: string | null;
  recipient_id: string | null;
  subject: string;
  application_id: string | null;
  interview_id: string | null;
  offer_id: string | null;
  status: string;
  sent_at: string;
  delivered_at: string | null;
  bounced_at: string | null;
  opened_at: string | null;
  clicked_at: string | null;
  error_message: string | null;
  bounce_type: string | null;
  created_at: string;
  updated_at: string;
}

export interface EmailLogsInsert {
  id?: string;
  organization_id: string;
  resend_id?: string | null;
  template: string;
  recipient_email: string;
  recipient_type?: string | null;
  recipient_id?: string | null;
  subject: string;
  application_id?: string | null;
  interview_id?: string | null;
  offer_id?: string | null;
  status?: string;
  sent_at?: string;
  delivered_at?: string | null;
  bounced_at?: string | null;
  opened_at?: string | null;
  clicked_at?: string | null;
  error_message?: string | null;
  bounce_type?: string | null;
  created_at?: string;
  updated_at?: string;
}

export interface EmailLogsUpdate {
  id?: string;
  organization_id?: string;
  resend_id?: string | null;
  template?: string;
  recipient_email?: string;
  recipient_type?: string | null;
  recipient_id?: string | null;
  subject?: string;
  application_id?: string | null;
  interview_id?: string | null;
  offer_id?: string | null;
  status?: string;
  sent_at?: string;
  delivered_at?: string | null;
  bounced_at?: string | null;
  opened_at?: string | null;
  clicked_at?: string | null;
  error_message?: string | null;
  bounce_type?: string | null;
  created_at?: string;
  updated_at?: string;
}

// ────────────────────────────────────────────
// email_parser_configs
// ────────────────────────────────────────────
export interface EmailParserConfigsRow {
  id: string;
  organization_id: string;
  name: string | null;
  source_type: string | null;
  rules: Json | null;
  field_mappings: Json | null;
  filters: Json | null;
  is_active: boolean | null;
  priority: number | null;
  created_by: string | null;
  created_at: string | null;
  updated_at: string | null;
}

export interface EmailParserConfigsInsert {
  id?: string;
  organization_id: string;
  name?: string | null;
  source_type?: string | null;
  rules?: Json | null;
  field_mappings?: Json | null;
  filters?: Json | null;
  is_active?: boolean | null;
  priority?: number | null;
  created_by?: string | null;
  created_at?: string | null;
  updated_at?: string | null;
}

export interface EmailParserConfigsUpdate {
  id?: string;
  organization_id?: string;
  name?: string | null;
  source_type?: string | null;
  rules?: Json | null;
  field_mappings?: Json | null;
  filters?: Json | null;
  is_active?: boolean | null;
  priority?: number | null;
  created_by?: string | null;
  created_at?: string | null;
  updated_at?: string | null;
}

// ────────────────────────────────────────────
// entity_tags
// ────────────────────────────────────────────
export interface EntityTagsRow {
  id: string;
  entity_type: string;
  entity_id: string;
  tag_id: string;
  created_at: string | null;
  organization_id: string;
}

export interface EntityTagsInsert {
  id?: string;
  entity_type: string;
  entity_id: string;
  tag_id: string;
  created_at?: string | null;
  organization_id: string;
}

export interface EntityTagsUpdate {
  id?: string;
  entity_type?: string;
  entity_id?: string;
  tag_id?: string;
  created_at?: string | null;
  organization_id?: string;
}

// ────────────────────────────────────────────
// entity_timeline
// ────────────────────────────────────────────
export interface EntityTimelineRow {
  item_type: string | null;
  id: string | null;
  organization_id: string | null;
  entity_type: string | null;
  entity_id: string | null;
  activity_type: string | null;
  title: string | null;
  message: string | null;
  payload: Json | null;
  source: string | null;
  actor_id: string | null;
  created_at: string | null;
}

export interface EntityTimelineInsert {
  item_type?: string | null;
  id?: string | null;
  organization_id?: string | null;
  entity_type?: string | null;
  entity_id?: string | null;
  activity_type?: string | null;
  title?: string | null;
  message?: string | null;
  payload?: Json | null;
  source?: string | null;
  actor_id?: string | null;
  created_at?: string | null;
}

export interface EntityTimelineUpdate {
  item_type?: string | null;
  id?: string | null;
  organization_id?: string | null;
  entity_type?: string | null;
  entity_id?: string | null;
  activity_type?: string | null;
  title?: string | null;
  message?: string | null;
  payload?: Json | null;
  source?: string | null;
  actor_id?: string | null;
  created_at?: string | null;
}

// ────────────────────────────────────────────
// esign_envelopes
// ────────────────────────────────────────────
export interface EsignEnvelopesRow {
  id: string;
  organization_id: string;
  offer_id: string;
  provider: string;
  provider_envelope_id: string | null;
  status: string;
  signing_url: string | null;
  signed_at: string | null;
  metadata: Json | null;
  created_at: string;
}

export interface EsignEnvelopesInsert {
  id?: string;
  organization_id: string;
  offer_id: string;
  provider: string;
  provider_envelope_id?: string | null;
  status?: string;
  signing_url?: string | null;
  signed_at?: string | null;
  metadata?: Json | null;
  created_at?: string;
}

export interface EsignEnvelopesUpdate {
  id?: string;
  organization_id?: string;
  offer_id?: string;
  provider?: string;
  provider_envelope_id?: string | null;
  status?: string;
  signing_url?: string | null;
  signed_at?: string | null;
  metadata?: Json | null;
  created_at?: string;
}

// ────────────────────────────────────────────
// event_outbox
// ────────────────────────────────────────────
export interface EventOutboxRow {
  id: string;
  organization_id: string;
  event_type: string;
  aggregate_type: string;
  aggregate_id: string;
  payload: Json;
  metadata: Json | null;
  status: string;
  attempts: number | null;
  max_attempts: number | null;
  last_error: string | null;
  created_at: string | null;
  processed_at: string | null;
  scheduled_for: string | null;
}

export interface EventOutboxInsert {
  id?: string;
  organization_id: string;
  event_type: string;
  aggregate_type: string;
  aggregate_id: string;
  payload: Json;
  metadata?: Json | null;
  status?: string;
  attempts?: number | null;
  max_attempts?: number | null;
  last_error?: string | null;
  created_at?: string | null;
  processed_at?: string | null;
  scheduled_for?: string | null;
}

export interface EventOutboxUpdate {
  id?: string;
  organization_id?: string;
  event_type?: string;
  aggregate_type?: string;
  aggregate_id?: string;
  payload?: Json;
  metadata?: Json | null;
  status?: string;
  attempts?: number | null;
  max_attempts?: number | null;
  last_error?: string | null;
  created_at?: string | null;
  processed_at?: string | null;
  scheduled_for?: string | null;
}

// ────────────────────────────────────────────
// expenses
// ────────────────────────────────────────────
export interface ExpensesRow {
  id: string;
  organization_id: string;
  employee_id: string | null;
  expense_type: string | null;
  amount: number | null;
  currency: string | null;
  description: string | null;
  receipt_path: string | null;
  status: string | null;
  submitted_at: string | null;
  approved_at: string | null;
  approved_by: string | null;
  reimbursed_at: string | null;
  created_at: string | null;
  updated_at: string | null;
}

export interface ExpensesInsert {
  id?: string;
  organization_id: string;
  employee_id?: string | null;
  expense_type?: string | null;
  amount?: number | null;
  currency?: string | null;
  description?: string | null;
  receipt_path?: string | null;
  status?: string | null;
  submitted_at?: string | null;
  approved_at?: string | null;
  approved_by?: string | null;
  reimbursed_at?: string | null;
  created_at?: string | null;
  updated_at?: string | null;
}

export interface ExpensesUpdate {
  id?: string;
  organization_id?: string;
  employee_id?: string | null;
  expense_type?: string | null;
  amount?: number | null;
  currency?: string | null;
  description?: string | null;
  receipt_path?: string | null;
  status?: string | null;
  submitted_at?: string | null;
  approved_at?: string | null;
  approved_by?: string | null;
  reimbursed_at?: string | null;
  created_at?: string | null;
  updated_at?: string | null;
}

// ────────────────────────────────────────────
// forecasts
// ────────────────────────────────────────────
export interface ForecastsRow {
  id: string;
  organization_id: string;
  name: string;
  description: string | null;
  forecast_type: string;
  period_type: string;
  period_start: string;
  period_end: string;
  predicted_value: number;
  confidence_level: number;
  actual_value: number | null;
  variance: number | null;
  variance_percent: number | null;
  accuracy_score: number | null;
  status: string;
  methodology: string | null;
  assumptions: Json | null;
  owner_id: string | null;
  owner_name: string | null;
  tags: string[] | null;
  metadata: Json | null;
  created_at: string;
  updated_at: string;
  created_by: string | null;
  updated_by: string | null;
}

export interface ForecastsInsert {
  id?: string;
  organization_id: string;
  name: string;
  description?: string | null;
  forecast_type: string;
  period_type: string;
  period_start: string;
  period_end: string;
  predicted_value: number;
  confidence_level?: number;
  actual_value?: number | null;
  variance?: number | null;
  variance_percent?: number | null;
  accuracy_score?: number | null;
  status?: string;
  methodology?: string | null;
  assumptions?: Json | null;
  owner_id?: string | null;
  owner_name?: string | null;
  tags?: string[] | null;
  metadata?: Json | null;
  created_at?: string;
  updated_at?: string;
  created_by?: string | null;
  updated_by?: string | null;
}

export interface ForecastsUpdate {
  id?: string;
  organization_id?: string;
  name?: string;
  description?: string | null;
  forecast_type?: string;
  period_type?: string;
  period_start?: string;
  period_end?: string;
  predicted_value?: number;
  confidence_level?: number;
  actual_value?: number | null;
  variance?: number | null;
  variance_percent?: number | null;
  accuracy_score?: number | null;
  status?: string;
  methodology?: string | null;
  assumptions?: Json | null;
  owner_id?: string | null;
  owner_name?: string | null;
  tags?: string[] | null;
  metadata?: Json | null;
  created_at?: string;
  updated_at?: string;
  created_by?: string | null;
  updated_by?: string | null;
}

// ────────────────────────────────────────────
// idempotency_keys
// ────────────────────────────────────────────
export interface IdempotencyKeysRow {
  id: string;
  organization_id: string;
  key: string;
  request_hash: string;
  response: Json | null;
  created_at: string;
  expires_at: string;
}

export interface IdempotencyKeysInsert {
  id?: string;
  organization_id: string;
  key: string;
  request_hash: string;
  response?: Json | null;
  created_at?: string;
  expires_at?: string;
}

export interface IdempotencyKeysUpdate {
  id?: string;
  organization_id?: string;
  key?: string;
  request_hash?: string;
  response?: Json | null;
  created_at?: string;
  expires_at?: string;
}

// ────────────────────────────────────────────
// import_conflicts
// ────────────────────────────────────────────
export interface ImportConflictsRow {
  id: string;
  import_run_id: string;
  workspace_id: string;
  conflict_type: string;
  confidence_score: number | null;
  existing_candidate_id: string;
  incoming_data: Json;
  resolution: string | null;
  resolved_by: string | null;
  resolved_at: string | null;
  detected_at: string;
}

export interface ImportConflictsInsert {
  id?: string;
  import_run_id: string;
  workspace_id: string;
  conflict_type: string;
  confidence_score?: number | null;
  existing_candidate_id: string;
  incoming_data: Json;
  resolution?: string | null;
  resolved_by?: string | null;
  resolved_at?: string | null;
  detected_at?: string;
}

export interface ImportConflictsUpdate {
  id?: string;
  import_run_id?: string;
  workspace_id?: string;
  conflict_type?: string;
  confidence_score?: number | null;
  existing_candidate_id?: string;
  incoming_data?: Json;
  resolution?: string | null;
  resolved_by?: string | null;
  resolved_at?: string | null;
  detected_at?: string;
}

// ────────────────────────────────────────────
// import_jobs
// ────────────────────────────────────────────
export interface ImportJobsRow {
  id: string;
  workspace_id: string;
  filename: string;
  file_size: number | null;
  source: string | null;
  status: string | null;
  total_rows: number | null;
  processed_rows: number | null;
  created_count: number | null;
  updated_count: number | null;
  skipped_count: number | null;
  error_count: number | null;
  errors: Json | null;
  warnings: Json | null;
  summary: Json | null;
  imported_by: string;
  started_at: string | null;
  completed_at: string | null;
  created_at: string | null;
}

export interface ImportJobsInsert {
  id?: string;
  workspace_id: string;
  filename: string;
  file_size?: number | null;
  source?: string | null;
  status?: string | null;
  total_rows?: number | null;
  processed_rows?: number | null;
  created_count?: number | null;
  updated_count?: number | null;
  skipped_count?: number | null;
  error_count?: number | null;
  errors?: Json | null;
  warnings?: Json | null;
  summary?: Json | null;
  imported_by: string;
  started_at?: string | null;
  completed_at?: string | null;
  created_at?: string | null;
}

export interface ImportJobsUpdate {
  id?: string;
  workspace_id?: string;
  filename?: string;
  file_size?: number | null;
  source?: string | null;
  status?: string | null;
  total_rows?: number | null;
  processed_rows?: number | null;
  created_count?: number | null;
  updated_count?: number | null;
  skipped_count?: number | null;
  error_count?: number | null;
  errors?: Json | null;
  warnings?: Json | null;
  summary?: Json | null;
  imported_by?: string;
  started_at?: string | null;
  completed_at?: string | null;
  created_at?: string | null;
}

// ────────────────────────────────────────────
// import_runs
// ────────────────────────────────────────────
export interface ImportRunsRow {
  id: string;
  workspace_id: string;
  file_name: string;
  file_size_bytes: number | null;
  storage_path: string | null;
  job_id: string | null;
  status: string;
  total_rows: number | null;
  rows_processed: number | null;
  candidates_created: number | null;
  candidates_updated: number | null;
  candidates_skipped: number | null;
  conflicts_detected: number | null;
  errors_count: number | null;
  error_log: Json | null;
  uploaded_by: string;
  started_at: string;
  completed_at: string | null;
}

export interface ImportRunsInsert {
  id?: string;
  workspace_id: string;
  file_name: string;
  file_size_bytes?: number | null;
  storage_path?: string | null;
  job_id?: string | null;
  status?: string;
  total_rows?: number | null;
  rows_processed?: number | null;
  candidates_created?: number | null;
  candidates_updated?: number | null;
  candidates_skipped?: number | null;
  conflicts_detected?: number | null;
  errors_count?: number | null;
  error_log?: Json | null;
  uploaded_by: string;
  started_at?: string;
  completed_at?: string | null;
}

export interface ImportRunsUpdate {
  id?: string;
  workspace_id?: string;
  file_name?: string;
  file_size_bytes?: number | null;
  storage_path?: string | null;
  job_id?: string | null;
  status?: string;
  total_rows?: number | null;
  rows_processed?: number | null;
  candidates_created?: number | null;
  candidates_updated?: number | null;
  candidates_skipped?: number | null;
  conflicts_detected?: number | null;
  errors_count?: number | null;
  error_log?: Json | null;
  uploaded_by?: string;
  started_at?: string;
  completed_at?: string | null;
}

// ────────────────────────────────────────────
// inbound_messages
// ────────────────────────────────────────────
export interface InboundMessagesRow {
  id: string;
  organization_id: string;
  provider: string;
  provider_message_id: string | null;
  from_address: string;
  to_address: string | null;
  subject: string | null;
  body: string | null;
  received_at: string;
  processed_at: string | null;
  candidate_id: string | null;
  conversation_id: string | null;
  intent: string | null;
  metadata: Json | null;
  created_at: string;
}

export interface InboundMessagesInsert {
  id?: string;
  organization_id: string;
  provider: string;
  provider_message_id?: string | null;
  from_address: string;
  to_address?: string | null;
  subject?: string | null;
  body?: string | null;
  received_at: string;
  processed_at?: string | null;
  candidate_id?: string | null;
  conversation_id?: string | null;
  intent?: string | null;
  metadata?: Json | null;
  created_at?: string;
}

export interface InboundMessagesUpdate {
  id?: string;
  organization_id?: string;
  provider?: string;
  provider_message_id?: string | null;
  from_address?: string;
  to_address?: string | null;
  subject?: string | null;
  body?: string | null;
  received_at?: string;
  processed_at?: string | null;
  candidate_id?: string | null;
  conversation_id?: string | null;
  intent?: string | null;
  metadata?: Json | null;
  created_at?: string;
}

// ────────────────────────────────────────────
// integration_connections
// ────────────────────────────────────────────
export interface IntegrationConnectionsRow {
  id: string;
  organization_id: string;
  provider: string;
  category: string;
  external_id: string | null;
  status: string;
  credentials_ref: string | null;
  last_sync_at: string | null;
  last_sync_status: string | null;
  last_error: string | null;
  settings: Json | null;
  created_at: string;
  updated_at: string;
}

export interface IntegrationConnectionsInsert {
  id?: string;
  organization_id: string;
  provider: string;
  category: string;
  external_id?: string | null;
  status?: string;
  credentials_ref?: string | null;
  last_sync_at?: string | null;
  last_sync_status?: string | null;
  last_error?: string | null;
  settings?: Json | null;
  created_at?: string;
  updated_at?: string;
}

export interface IntegrationConnectionsUpdate {
  id?: string;
  organization_id?: string;
  provider?: string;
  category?: string;
  external_id?: string | null;
  status?: string;
  credentials_ref?: string | null;
  last_sync_at?: string | null;
  last_sync_status?: string | null;
  last_error?: string | null;
  settings?: Json | null;
  created_at?: string;
  updated_at?: string;
}

// ────────────────────────────────────────────
// integrations
// ────────────────────────────────────────────
export interface IntegrationsRow {
  id: string;
  organization_id: string;
  name: string;
  integration_type: string | null;
  config: Json | null;
  credentials: Json | null;
  status: string | null;
  last_sync_at: string | null;
  created_at: string | null;
  updated_at: string | null;
}

export interface IntegrationsInsert {
  id?: string;
  organization_id: string;
  name: string;
  integration_type?: string | null;
  config?: Json | null;
  credentials?: Json | null;
  status?: string | null;
  last_sync_at?: string | null;
  created_at?: string | null;
  updated_at?: string | null;
}

export interface IntegrationsUpdate {
  id?: string;
  organization_id?: string;
  name?: string;
  integration_type?: string | null;
  config?: Json | null;
  credentials?: Json | null;
  status?: string | null;
  last_sync_at?: string | null;
  created_at?: string | null;
  updated_at?: string | null;
}

// ────────────────────────────────────────────
// interview_feedback
// ────────────────────────────────────────────
export interface InterviewFeedbackRow {
  id: string;
  organization_id: string | null;
  interview_id: string | null;
  interviewer_id: string | null;
  interviewer_name: string | null;
  overall_rating: number | null;
  recommendation: string | null;
  strengths: string[] | null;
  concerns: string[] | null;
  notes: string | null;
  scorecard: Json | null;
  submitted_at: string | null;
  created_at: string | null;
  updated_at: string | null;
}

export interface InterviewFeedbackInsert {
  id?: string;
  organization_id?: string | null;
  interview_id?: string | null;
  interviewer_id?: string | null;
  interviewer_name?: string | null;
  overall_rating?: number | null;
  recommendation?: string | null;
  strengths?: string[] | null;
  concerns?: string[] | null;
  notes?: string | null;
  scorecard?: Json | null;
  submitted_at?: string | null;
  created_at?: string | null;
  updated_at?: string | null;
}

export interface InterviewFeedbackUpdate {
  id?: string;
  organization_id?: string | null;
  interview_id?: string | null;
  interviewer_id?: string | null;
  interviewer_name?: string | null;
  overall_rating?: number | null;
  recommendation?: string | null;
  strengths?: string[] | null;
  concerns?: string[] | null;
  notes?: string | null;
  scorecard?: Json | null;
  submitted_at?: string | null;
  created_at?: string | null;
  updated_at?: string | null;
}

// ────────────────────────────────────────────
// interview_intelligence
// ────────────────────────────────────────────
export interface InterviewIntelligenceRow {
  id: string;
  organization_id: string;
  interview_id: string;
  candidate_id: string;
  job_id: string;
  transcript_id: string | null;
  summary: string | null;
  key_points: Json | null;
  sentiment_analysis: Json | null;
  skill_assessments: Json | null;
  red_flags: Json | null;
  follow_up_questions: Json | null;
  hiring_recommendation: string | null;
  confidence_score: number | null;
  model_version: string | null;
  processing_duration_ms: number | null;
  created_at: string | null;
}

export interface InterviewIntelligenceInsert {
  id?: string;
  organization_id: string;
  interview_id: string;
  candidate_id: string;
  job_id: string;
  transcript_id?: string | null;
  summary?: string | null;
  key_points?: Json | null;
  sentiment_analysis?: Json | null;
  skill_assessments?: Json | null;
  red_flags?: Json | null;
  follow_up_questions?: Json | null;
  hiring_recommendation?: string | null;
  confidence_score?: number | null;
  model_version?: string | null;
  processing_duration_ms?: number | null;
  created_at?: string | null;
}

export interface InterviewIntelligenceUpdate {
  id?: string;
  organization_id?: string;
  interview_id?: string;
  candidate_id?: string;
  job_id?: string;
  transcript_id?: string | null;
  summary?: string | null;
  key_points?: Json | null;
  sentiment_analysis?: Json | null;
  skill_assessments?: Json | null;
  red_flags?: Json | null;
  follow_up_questions?: Json | null;
  hiring_recommendation?: string | null;
  confidence_score?: number | null;
  model_version?: string | null;
  processing_duration_ms?: number | null;
  created_at?: string | null;
}

// ────────────────────────────────────────────
// interview_plans
// ────────────────────────────────────────────
export interface InterviewPlansRow {
  id: string;
  organization_id: string;
  candidate_id: string;
  job_id: string | null;
  owner_user_id: string | null;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface InterviewPlansInsert {
  id?: string;
  organization_id: string;
  candidate_id: string;
  job_id?: string | null;
  owner_user_id?: string | null;
  status?: string;
  created_at?: string;
  updated_at?: string;
}

export interface InterviewPlansUpdate {
  id?: string;
  organization_id?: string;
  candidate_id?: string;
  job_id?: string | null;
  owner_user_id?: string | null;
  status?: string;
  created_at?: string;
  updated_at?: string;
}

// ────────────────────────────────────────────
// interview_reschedule_requests
// ────────────────────────────────────────────
export interface InterviewRescheduleRequestsRow {
  id: string;
  organization_id: string;
  interview_id: string;
  requested_by: string | null;
  requested_by_type: string | null;
  original_start_time: string | null;
  original_end_time: string | null;
  proposed_times: Json | null;
  selected_time: string | null;
  reason: string | null;
  approved_by: string | null;
  approved_at: string | null;
  status: string | null;
  created_at: string | null;
  updated_at: string | null;
}

export interface InterviewRescheduleRequestsInsert {
  id?: string;
  organization_id: string;
  interview_id: string;
  requested_by?: string | null;
  requested_by_type?: string | null;
  original_start_time?: string | null;
  original_end_time?: string | null;
  proposed_times?: Json | null;
  selected_time?: string | null;
  reason?: string | null;
  approved_by?: string | null;
  approved_at?: string | null;
  status?: string | null;
  created_at?: string | null;
  updated_at?: string | null;
}

export interface InterviewRescheduleRequestsUpdate {
  id?: string;
  organization_id?: string;
  interview_id?: string;
  requested_by?: string | null;
  requested_by_type?: string | null;
  original_start_time?: string | null;
  original_end_time?: string | null;
  proposed_times?: Json | null;
  selected_time?: string | null;
  reason?: string | null;
  approved_by?: string | null;
  approved_at?: string | null;
  status?: string | null;
  created_at?: string | null;
  updated_at?: string | null;
}

// ────────────────────────────────────────────
// interview_rounds
// ────────────────────────────────────────────
export interface InterviewRoundsRow {
  id: string;
  organization_id: string;
  interview_plan_id: string;
  meeting_id: string | null;
  round_order: number;
  round_name: string;
  round_type: string;
  status: string;
  created_at: string;
}

export interface InterviewRoundsInsert {
  id?: string;
  organization_id: string;
  interview_plan_id: string;
  meeting_id?: string | null;
  round_order: number;
  round_name: string;
  round_type: string;
  status?: string;
  created_at?: string;
}

export interface InterviewRoundsUpdate {
  id?: string;
  organization_id?: string;
  interview_plan_id?: string;
  meeting_id?: string | null;
  round_order?: number;
  round_name?: string;
  round_type?: string;
  status?: string;
  created_at?: string;
}

// ────────────────────────────────────────────
// interviews
// ────────────────────────────────────────────
export interface InterviewsRow {
  id: string;
  created_at: string | null;
  updated_at: string | null;
  candidate_id: string | null;
  job_id: string | null;
  submission_id: string | null;
  interview_type: string | null;
  interview_stage: string | null;
  interview_round: number | null;
  scheduled_date: string | null;
  scheduled_time: string | null;
  scheduled_start_at: string | null;
  scheduled_end_at: string | null;
  duration_minutes: number | null;
  timezone: string | null;
  meeting_platform: string | null;
  meeting_link: string | null;
  meeting_id: string | null;
  meeting_password: string | null;
  location: string | null;
  interviewers: Json | null;
  interviewer_names: string[] | null;
  candidate_confirmed: boolean | null;
  interviewers_confirmed: boolean | null;
  status: string | null;
  overall_rating: number | null;
  technical_score: number | null;
  cultural_fit_score: number | null;
  communication_score: number | null;
  strengths: string | null;
  weaknesses: string | null;
  feedback_notes: string | null;
  interviewer_notes: string | null;
  internal_notes: string | null;
  recommendation: string | null;
  recommendation_notes: string | null;
  next_steps: string | null;
  follow_up_required: boolean | null;
  follow_up_date: string | null;
  recording_url: string | null;
  transcript_url: string | null;
  attachments: Json | null;
  cancelled_at: string | null;
  cancelled_by: string | null;
  cancellation_reason: string | null;
  completed_at: string | null;
  custom_fields: Json | null;
  metadata: Json | null;
  scheduled_at: string | null;
  organization_id: string;
}

export interface InterviewsInsert {
  id?: string;
  created_at?: string | null;
  updated_at?: string | null;
  candidate_id?: string | null;
  job_id?: string | null;
  submission_id?: string | null;
  interview_type?: string | null;
  interview_stage?: string | null;
  interview_round?: number | null;
  scheduled_date?: string | null;
  scheduled_time?: string | null;
  scheduled_start_at?: string | null;
  scheduled_end_at?: string | null;
  duration_minutes?: number | null;
  timezone?: string | null;
  meeting_platform?: string | null;
  meeting_link?: string | null;
  meeting_id?: string | null;
  meeting_password?: string | null;
  location?: string | null;
  interviewers?: Json | null;
  interviewer_names?: string[] | null;
  candidate_confirmed?: boolean | null;
  interviewers_confirmed?: boolean | null;
  status?: string | null;
  overall_rating?: number | null;
  technical_score?: number | null;
  cultural_fit_score?: number | null;
  communication_score?: number | null;
  strengths?: string | null;
  weaknesses?: string | null;
  feedback_notes?: string | null;
  interviewer_notes?: string | null;
  internal_notes?: string | null;
  recommendation?: string | null;
  recommendation_notes?: string | null;
  next_steps?: string | null;
  follow_up_required?: boolean | null;
  follow_up_date?: string | null;
  recording_url?: string | null;
  transcript_url?: string | null;
  attachments?: Json | null;
  cancelled_at?: string | null;
  cancelled_by?: string | null;
  cancellation_reason?: string | null;
  completed_at?: string | null;
  custom_fields?: Json | null;
  metadata?: Json | null;
  scheduled_at?: string | null;
  organization_id: string;
}

export interface InterviewsUpdate {
  id?: string;
  created_at?: string | null;
  updated_at?: string | null;
  candidate_id?: string | null;
  job_id?: string | null;
  submission_id?: string | null;
  interview_type?: string | null;
  interview_stage?: string | null;
  interview_round?: number | null;
  scheduled_date?: string | null;
  scheduled_time?: string | null;
  scheduled_start_at?: string | null;
  scheduled_end_at?: string | null;
  duration_minutes?: number | null;
  timezone?: string | null;
  meeting_platform?: string | null;
  meeting_link?: string | null;
  meeting_id?: string | null;
  meeting_password?: string | null;
  location?: string | null;
  interviewers?: Json | null;
  interviewer_names?: string[] | null;
  candidate_confirmed?: boolean | null;
  interviewers_confirmed?: boolean | null;
  status?: string | null;
  overall_rating?: number | null;
  technical_score?: number | null;
  cultural_fit_score?: number | null;
  communication_score?: number | null;
  strengths?: string | null;
  weaknesses?: string | null;
  feedback_notes?: string | null;
  interviewer_notes?: string | null;
  internal_notes?: string | null;
  recommendation?: string | null;
  recommendation_notes?: string | null;
  next_steps?: string | null;
  follow_up_required?: boolean | null;
  follow_up_date?: string | null;
  recording_url?: string | null;
  transcript_url?: string | null;
  attachments?: Json | null;
  cancelled_at?: string | null;
  cancelled_by?: string | null;
  cancellation_reason?: string | null;
  completed_at?: string | null;
  custom_fields?: Json | null;
  metadata?: Json | null;
  scheduled_at?: string | null;
  organization_id?: string;
}

// ────────────────────────────────────────────
// invoices
// ────────────────────────────────────────────
export interface InvoicesRow {
  id: string;
  organization_id: string;
  invoice_number: string | null;
  client_id: string | null;
  placement_id: string | null;
  amount: number | null;
  line_items: Json | null;
  status: string | null;
  due_date: string | null;
  paid_date: string | null;
  created_at: string | null;
  updated_at: string | null;
  created_by: string | null;
}

export interface InvoicesInsert {
  id?: string;
  organization_id: string;
  invoice_number?: string | null;
  client_id?: string | null;
  placement_id?: string | null;
  amount?: number | null;
  line_items?: Json | null;
  status?: string | null;
  due_date?: string | null;
  paid_date?: string | null;
  created_at?: string | null;
  updated_at?: string | null;
  created_by?: string | null;
}

export interface InvoicesUpdate {
  id?: string;
  organization_id?: string;
  invoice_number?: string | null;
  client_id?: string | null;
  placement_id?: string | null;
  amount?: number | null;
  line_items?: Json | null;
  status?: string | null;
  due_date?: string | null;
  paid_date?: string | null;
  created_at?: string | null;
  updated_at?: string | null;
  created_by?: string | null;
}

// ────────────────────────────────────────────
// job_bias_analysis
// ────────────────────────────────────────────
export interface JobBiasAnalysisRow {
  id: string;
  organization_id: string;
  job_id: string;
  analyzed_content: string | null;
  bias_score: number | null;
  bias_categories: Json | null;
  flagged_phrases: Json | null;
  suggestions: Json | null;
  inclusive_alternatives: Json | null;
  readability_score: number | null;
  model_version: string | null;
  analyzed_at: string | null;
  created_at: string | null;
}

export interface JobBiasAnalysisInsert {
  id?: string;
  organization_id: string;
  job_id: string;
  analyzed_content?: string | null;
  bias_score?: number | null;
  bias_categories?: Json | null;
  flagged_phrases?: Json | null;
  suggestions?: Json | null;
  inclusive_alternatives?: Json | null;
  readability_score?: number | null;
  model_version?: string | null;
  analyzed_at?: string | null;
  created_at?: string | null;
}

export interface JobBiasAnalysisUpdate {
  id?: string;
  organization_id?: string;
  job_id?: string;
  analyzed_content?: string | null;
  bias_score?: number | null;
  bias_categories?: Json | null;
  flagged_phrases?: Json | null;
  suggestions?: Json | null;
  inclusive_alternatives?: Json | null;
  readability_score?: number | null;
  model_version?: string | null;
  analyzed_at?: string | null;
  created_at?: string | null;
}

// ────────────────────────────────────────────
// job_board_mappings
// ────────────────────────────────────────────
export interface JobBoardMappingsRow {
  id: string;
  organization_id: string;
  job_id: string;
  provider: string;
  external_job_id: string;
  external_url: string | null;
  status: string;
  posted_at: string | null;
  expires_at: string | null;
  last_sync_at: string | null;
  views_count: number | null;
  applications_count: number | null;
  created_at: string;
  updated_at: string;
}

export interface JobBoardMappingsInsert {
  id?: string;
  organization_id: string;
  job_id: string;
  provider: string;
  external_job_id: string;
  external_url?: string | null;
  status?: string;
  posted_at?: string | null;
  expires_at?: string | null;
  last_sync_at?: string | null;
  views_count?: number | null;
  applications_count?: number | null;
  created_at?: string;
  updated_at?: string;
}

export interface JobBoardMappingsUpdate {
  id?: string;
  organization_id?: string;
  job_id?: string;
  provider?: string;
  external_job_id?: string;
  external_url?: string | null;
  status?: string;
  posted_at?: string | null;
  expires_at?: string | null;
  last_sync_at?: string | null;
  views_count?: number | null;
  applications_count?: number | null;
  created_at?: string;
  updated_at?: string;
}

// ────────────────────────────────────────────
// job_embeddings
// ────────────────────────────────────────────
export interface JobEmbeddingsRow {
  id: string;
  job_id: string;
  embedding: string;
  content_snapshot: string | null;
  model_name: string;
  generated_at: string;
  organization_id: string;
  model: string;
  dims: number | null;
  content_sha256: string | null;
  created_at: string | null;
  updated_at: string | null;
}

export interface JobEmbeddingsInsert {
  id?: string;
  job_id: string;
  embedding: string;
  content_snapshot?: string | null;
  model_name?: string;
  generated_at?: string;
  organization_id: string;
  model: string;
  dims?: number | null;
  content_sha256?: string | null;
  created_at?: string | null;
  updated_at?: string | null;
}

export interface JobEmbeddingsUpdate {
  id?: string;
  job_id?: string;
  embedding?: string;
  content_snapshot?: string | null;
  model_name?: string;
  generated_at?: string;
  organization_id?: string;
  model?: string;
  dims?: number | null;
  content_sha256?: string | null;
  created_at?: string | null;
  updated_at?: string | null;
}

// ────────────────────────────────────────────
// job_skills
// ────────────────────────────────────────────
export interface JobSkillsRow {
  id: string;
  organization_id: string;
  job_id: string | null;
  skill_id: string | null;
  skill_name: string;
  requirement_type: string;
  proficiency_level: string | null;
  years_experience: number | null;
  weight: number | null;
  created_at: string | null;
}

export interface JobSkillsInsert {
  id?: string;
  organization_id: string;
  job_id?: string | null;
  skill_id?: string | null;
  skill_name: string;
  requirement_type: string;
  proficiency_level?: string | null;
  years_experience?: number | null;
  weight?: number | null;
  created_at?: string | null;
}

export interface JobSkillsUpdate {
  id?: string;
  organization_id?: string;
  job_id?: string | null;
  skill_id?: string | null;
  skill_name?: string;
  requirement_type?: string;
  proficiency_level?: string | null;
  years_experience?: number | null;
  weight?: number | null;
  created_at?: string | null;
}

// ────────────────────────────────────────────
// jobs
// ────────────────────────────────────────────
export interface JobsRow {
  id: string;
  organization_id: string;
  client_id: string | null;
  title: string;
  department: string | null;
  location: string | null;
  employment_type: string | null;
  experience_level: string | null;
  salary_min: number | null;
  salary_max: number | null;
  salary_currency: string | null;
  description: string | null;
  requirements: string | null;
  benefits: string | null;
  status: string | null;
  priority: string | null;
  openings: number | null;
  metadata: Json | null;
  created_at: string | null;
  updated_at: string | null;
  ats_job_id: string | null;
  external_id: number | null;
  hiring_project_id: number | null;
  hiring_project_title: string | null;
  url: string | null;
  source: string | null;
  currency: string | null;
  ai: Json;
  job_search_text: string | null;
  search_text: string | null;
}

export interface JobsInsert {
  id?: string;
  organization_id: string;
  client_id?: string | null;
  title: string;
  department?: string | null;
  location?: string | null;
  employment_type?: string | null;
  experience_level?: string | null;
  salary_min?: number | null;
  salary_max?: number | null;
  salary_currency?: string | null;
  description?: string | null;
  requirements?: string | null;
  benefits?: string | null;
  status?: string | null;
  priority?: string | null;
  openings?: number | null;
  metadata?: Json | null;
  created_at?: string | null;
  updated_at?: string | null;
  ats_job_id?: string | null;
  external_id?: number | null;
  hiring_project_id?: number | null;
  hiring_project_title?: string | null;
  url?: string | null;
  source?: string | null;
  currency?: string | null;
  ai?: Json;
  job_search_text?: string | null;
  search_text?: string | null;
}

export interface JobsUpdate {
  id?: string;
  organization_id?: string;
  client_id?: string | null;
  title?: string;
  department?: string | null;
  location?: string | null;
  employment_type?: string | null;
  experience_level?: string | null;
  salary_min?: number | null;
  salary_max?: number | null;
  salary_currency?: string | null;
  description?: string | null;
  requirements?: string | null;
  benefits?: string | null;
  status?: string | null;
  priority?: string | null;
  openings?: number | null;
  metadata?: Json | null;
  created_at?: string | null;
  updated_at?: string | null;
  ats_job_id?: string | null;
  external_id?: number | null;
  hiring_project_id?: number | null;
  hiring_project_title?: string | null;
  url?: string | null;
  source?: string | null;
  currency?: string | null;
  ai?: Json;
  job_search_text?: string | null;
  search_text?: string | null;
}

// ────────────────────────────────────────────
// marketplace_activities
// ────────────────────────────────────────────
export interface MarketplaceActivitiesRow {
  id: string;
  organization_id: string;
  job_id: string | null;
  agency_id: string | null;
  company_id: string | null;
  activity_type: string;
  activity_data: Json | null;
  created_at: string | null;
}

export interface MarketplaceActivitiesInsert {
  id?: string;
  organization_id: string;
  job_id?: string | null;
  agency_id?: string | null;
  company_id?: string | null;
  activity_type: string;
  activity_data?: Json | null;
  created_at?: string | null;
}

export interface MarketplaceActivitiesUpdate {
  id?: string;
  organization_id?: string;
  job_id?: string | null;
  agency_id?: string | null;
  company_id?: string | null;
  activity_type?: string;
  activity_data?: Json | null;
  created_at?: string | null;
}

// ────────────────────────────────────────────
// marketplace_agencies
// ────────────────────────────────────────────
export interface MarketplaceAgenciesRow {
  id: string;
  organization_id: string;
  name: string;
  description: string | null;
  logo_url: string | null;
  website_url: string | null;
  specializations: string[] | null;
  locations: string[] | null;
  industries: string[] | null;
  total_placements: number | null;
  success_rate: number | null;
  avg_time_to_fill: number | null;
  avg_candidate_rating: number | null;
  client_satisfaction: number | null;
  standard_fee_percentage: number | null;
  minimum_fee: number | null;
  willing_to_negotiate: boolean | null;
  reputation_score: number | null;
  total_reviews: number | null;
  badges: string[] | null;
  auto_claim_enabled: boolean | null;
  auto_claim_criteria: Json | null;
  is_active: boolean | null;
  is_verified: boolean | null;
  joined_at: string | null;
  created_at: string | null;
  updated_at: string | null;
}

export interface MarketplaceAgenciesInsert {
  id?: string;
  organization_id: string;
  name: string;
  description?: string | null;
  logo_url?: string | null;
  website_url?: string | null;
  specializations?: string[] | null;
  locations?: string[] | null;
  industries?: string[] | null;
  total_placements?: number | null;
  success_rate?: number | null;
  avg_time_to_fill?: number | null;
  avg_candidate_rating?: number | null;
  client_satisfaction?: number | null;
  standard_fee_percentage?: number | null;
  minimum_fee?: number | null;
  willing_to_negotiate?: boolean | null;
  reputation_score?: number | null;
  total_reviews?: number | null;
  badges?: string[] | null;
  auto_claim_enabled?: boolean | null;
  auto_claim_criteria?: Json | null;
  is_active?: boolean | null;
  is_verified?: boolean | null;
  joined_at?: string | null;
  created_at?: string | null;
  updated_at?: string | null;
}

export interface MarketplaceAgenciesUpdate {
  id?: string;
  organization_id?: string;
  name?: string;
  description?: string | null;
  logo_url?: string | null;
  website_url?: string | null;
  specializations?: string[] | null;
  locations?: string[] | null;
  industries?: string[] | null;
  total_placements?: number | null;
  success_rate?: number | null;
  avg_time_to_fill?: number | null;
  avg_candidate_rating?: number | null;
  client_satisfaction?: number | null;
  standard_fee_percentage?: number | null;
  minimum_fee?: number | null;
  willing_to_negotiate?: boolean | null;
  reputation_score?: number | null;
  total_reviews?: number | null;
  badges?: string[] | null;
  auto_claim_enabled?: boolean | null;
  auto_claim_criteria?: Json | null;
  is_active?: boolean | null;
  is_verified?: boolean | null;
  joined_at?: string | null;
  created_at?: string | null;
  updated_at?: string | null;
}

// ────────────────────────────────────────────
// marketplace_agency_leaderboard
// ────────────────────────────────────────────
export interface MarketplaceAgencyLeaderboardRow {
  id: string | null;
  name: string | null;
  total_placements: number | null;
  success_rate: number | null;
  avg_time_to_fill: number | null;
  reputation_score: number | null;
  active_jobs: number | null;
  transactions_30d: number | null;
  earnings_30d: number | null;
  rank: number | null;
}

export interface MarketplaceAgencyLeaderboardInsert {
  id?: string | null;
  name?: string | null;
  total_placements?: number | null;
  success_rate?: number | null;
  avg_time_to_fill?: number | null;
  reputation_score?: number | null;
  active_jobs?: number | null;
  transactions_30d?: number | null;
  earnings_30d?: number | null;
  rank?: number | null;
}

export interface MarketplaceAgencyLeaderboardUpdate {
  id?: string | null;
  name?: string | null;
  total_placements?: number | null;
  success_rate?: number | null;
  avg_time_to_fill?: number | null;
  reputation_score?: number | null;
  active_jobs?: number | null;
  transactions_30d?: number | null;
  earnings_30d?: number | null;
  rank?: number | null;
}

// ────────────────────────────────────────────
// marketplace_agency_submissions
// ────────────────────────────────────────────
export interface MarketplaceAgencySubmissionsRow {
  id: string;
  organization_id: string;
  job_id: string;
  agency_id: string;
  batch_name: string | null;
  total_candidates: number | null;
  candidates_shortlisted: number | null;
  candidates_interviewing: number | null;
  candidates_rejected: number | null;
  submission_notes: string | null;
  agency_contact_id: string | null;
  status: string | null;
  response_time_hours: number | null;
  quality_score: number | null;
  application_ids: string[] | null;
  metadata: Json | null;
  created_at: string | null;
  updated_at: string | null;
  completed_at: string | null;
}

export interface MarketplaceAgencySubmissionsInsert {
  id?: string;
  organization_id: string;
  job_id: string;
  agency_id: string;
  batch_name?: string | null;
  total_candidates?: number | null;
  candidates_shortlisted?: number | null;
  candidates_interviewing?: number | null;
  candidates_rejected?: number | null;
  submission_notes?: string | null;
  agency_contact_id?: string | null;
  status?: string | null;
  response_time_hours?: number | null;
  quality_score?: number | null;
  application_ids?: string[] | null;
  metadata?: Json | null;
  created_at?: string | null;
  updated_at?: string | null;
  completed_at?: string | null;
}

export interface MarketplaceAgencySubmissionsUpdate {
  id?: string;
  organization_id?: string;
  job_id?: string;
  agency_id?: string;
  batch_name?: string | null;
  total_candidates?: number | null;
  candidates_shortlisted?: number | null;
  candidates_interviewing?: number | null;
  candidates_rejected?: number | null;
  submission_notes?: string | null;
  agency_contact_id?: string | null;
  status?: string | null;
  response_time_hours?: number | null;
  quality_score?: number | null;
  application_ids?: string[] | null;
  metadata?: Json | null;
  created_at?: string | null;
  updated_at?: string | null;
  completed_at?: string | null;
}

// ────────────────────────────────────────────
// marketplace_bids
// ────────────────────────────────────────────
export interface MarketplaceBidsRow {
  id: string;
  organization_id: string;
  job_id: string;
  agency_id: string;
  fee_amount: number | null;
  fee_percentage: number | null;
  proposal: string | null;
  guarantees: string[] | null;
  estimated_time_to_fill: number | null;
  status: string | null;
  company_response: string | null;
  responded_at: string | null;
  submitted_at: string | null;
  created_at: string | null;
}

export interface MarketplaceBidsInsert {
  id?: string;
  organization_id: string;
  job_id: string;
  agency_id: string;
  fee_amount?: number | null;
  fee_percentage?: number | null;
  proposal?: string | null;
  guarantees?: string[] | null;
  estimated_time_to_fill?: number | null;
  status?: string | null;
  company_response?: string | null;
  responded_at?: string | null;
  submitted_at?: string | null;
  created_at?: string | null;
}

export interface MarketplaceBidsUpdate {
  id?: string;
  organization_id?: string;
  job_id?: string;
  agency_id?: string;
  fee_amount?: number | null;
  fee_percentage?: number | null;
  proposal?: string | null;
  guarantees?: string[] | null;
  estimated_time_to_fill?: number | null;
  status?: string | null;
  company_response?: string | null;
  responded_at?: string | null;
  submitted_at?: string | null;
  created_at?: string | null;
}

// ────────────────────────────────────────────
// marketplace_job_applications
// ────────────────────────────────────────────
export interface MarketplaceJobApplicationsRow {
  id: string;
  organization_id: string;
  job_id: string;
  agency_id: string;
  candidate_id: string;
  submitted_by: string | null;
  pitch_message: string | null;
  candidate_summary: string | null;
  resume_url: string | null;
  portfolio_url: string | null;
  status: string | null;
  company_feedback: string | null;
  rejection_reason: string | null;
  reviewed_by: string | null;
  reviewed_at: string | null;
  interview_count: number | null;
  last_interview_at: string | null;
  metadata: Json | null;
  created_at: string | null;
  updated_at: string | null;
}

export interface MarketplaceJobApplicationsInsert {
  id?: string;
  organization_id: string;
  job_id: string;
  agency_id: string;
  candidate_id: string;
  submitted_by?: string | null;
  pitch_message?: string | null;
  candidate_summary?: string | null;
  resume_url?: string | null;
  portfolio_url?: string | null;
  status?: string | null;
  company_feedback?: string | null;
  rejection_reason?: string | null;
  reviewed_by?: string | null;
  reviewed_at?: string | null;
  interview_count?: number | null;
  last_interview_at?: string | null;
  metadata?: Json | null;
  created_at?: string | null;
  updated_at?: string | null;
}

export interface MarketplaceJobApplicationsUpdate {
  id?: string;
  organization_id?: string;
  job_id?: string;
  agency_id?: string;
  candidate_id?: string;
  submitted_by?: string | null;
  pitch_message?: string | null;
  candidate_summary?: string | null;
  resume_url?: string | null;
  portfolio_url?: string | null;
  status?: string | null;
  company_feedback?: string | null;
  rejection_reason?: string | null;
  reviewed_by?: string | null;
  reviewed_at?: string | null;
  interview_count?: number | null;
  last_interview_at?: string | null;
  metadata?: Json | null;
  created_at?: string | null;
  updated_at?: string | null;
}

// ────────────────────────────────────────────
// marketplace_jobs
// ────────────────────────────────────────────
export interface MarketplaceJobsRow {
  id: string;
  organization_id: string;
  company_id: string;
  job_id: string | null;
  title: string;
  description: string | null;
  requirements: string[] | null;
  location: string | null;
  work_mode: string | null;
  salary_min: number | null;
  salary_max: number | null;
  placement_fee: number;
  fee_type: string;
  fee_percentage: number | null;
  is_marketplace: boolean | null;
  invited_agencies: string[] | null;
  max_agencies: number | null;
  exclusivity_period: number | null;
  allow_bidding: boolean | null;
  minimum_fee: number | null;
  status: string | null;
  claimed_by: string[] | null;
  filled_by: string | null;
  view_count: number | null;
  application_count: number | null;
  agency_count: number | null;
  posted_at: string | null;
  expires_at: string | null;
  filled_at: string | null;
  created_at: string | null;
  updated_at: string | null;
}

export interface MarketplaceJobsInsert {
  id?: string;
  organization_id: string;
  company_id: string;
  job_id?: string | null;
  title: string;
  description?: string | null;
  requirements?: string[] | null;
  location?: string | null;
  work_mode?: string | null;
  salary_min?: number | null;
  salary_max?: number | null;
  placement_fee: number;
  fee_type: string;
  fee_percentage?: number | null;
  is_marketplace?: boolean | null;
  invited_agencies?: string[] | null;
  max_agencies?: number | null;
  exclusivity_period?: number | null;
  allow_bidding?: boolean | null;
  minimum_fee?: number | null;
  status?: string | null;
  claimed_by?: string[] | null;
  filled_by?: string | null;
  view_count?: number | null;
  application_count?: number | null;
  agency_count?: number | null;
  posted_at?: string | null;
  expires_at?: string | null;
  filled_at?: string | null;
  created_at?: string | null;
  updated_at?: string | null;
}

export interface MarketplaceJobsUpdate {
  id?: string;
  organization_id?: string;
  company_id?: string;
  job_id?: string | null;
  title?: string;
  description?: string | null;
  requirements?: string[] | null;
  location?: string | null;
  work_mode?: string | null;
  salary_min?: number | null;
  salary_max?: number | null;
  placement_fee?: number;
  fee_type?: string;
  fee_percentage?: number | null;
  is_marketplace?: boolean | null;
  invited_agencies?: string[] | null;
  max_agencies?: number | null;
  exclusivity_period?: number | null;
  allow_bidding?: boolean | null;
  minimum_fee?: number | null;
  status?: string | null;
  claimed_by?: string[] | null;
  filled_by?: string | null;
  view_count?: number | null;
  application_count?: number | null;
  agency_count?: number | null;
  posted_at?: string | null;
  expires_at?: string | null;
  filled_at?: string | null;
  created_at?: string | null;
  updated_at?: string | null;
}

// ────────────────────────────────────────────
// marketplace_metrics_summary
// ────────────────────────────────────────────
export interface MarketplaceMetricsSummaryRow {
  total_jobs: number | null;
  active_jobs: number | null;
  filled_jobs: number | null;
  total_companies: number | null;
  active_agencies: number | null;
  total_gmv: number | null;
  total_revenue: number | null;
  avg_transaction_size: number | null;
  avg_commission_rate: number | null;
  avg_time_to_fill_days: number | null;
  fill_rate_percentage: number | null;
}

export interface MarketplaceMetricsSummaryInsert {
  total_jobs?: number | null;
  active_jobs?: number | null;
  filled_jobs?: number | null;
  total_companies?: number | null;
  active_agencies?: number | null;
  total_gmv?: number | null;
  total_revenue?: number | null;
  avg_transaction_size?: number | null;
  avg_commission_rate?: number | null;
  avg_time_to_fill_days?: number | null;
  fill_rate_percentage?: number | null;
}

export interface MarketplaceMetricsSummaryUpdate {
  total_jobs?: number | null;
  active_jobs?: number | null;
  filled_jobs?: number | null;
  total_companies?: number | null;
  active_agencies?: number | null;
  total_gmv?: number | null;
  total_revenue?: number | null;
  avg_transaction_size?: number | null;
  avg_commission_rate?: number | null;
  avg_time_to_fill_days?: number | null;
  fill_rate_percentage?: number | null;
}

// ────────────────────────────────────────────
// marketplace_reviews
// ────────────────────────────────────────────
export interface MarketplaceReviewsRow {
  id: string;
  organization_id: string;
  agency_id: string;
  company_id: string;
  job_id: string | null;
  transaction_id: string | null;
  reviewer_id: string | null;
  reviewer_name: string | null;
  reviewer_title: string | null;
  rating: number;
  title: string | null;
  review_text: string;
  quality_rating: number | null;
  speed_rating: number | null;
  communication_rating: number | null;
  professionalism_rating: number | null;
  would_work_again: boolean | null;
  agency_response: string | null;
  agency_responded_at: string | null;
  is_verified: boolean | null;
  verified_placement: boolean | null;
  status: string | null;
  helpful_count: number | null;
  not_helpful_count: number | null;
  created_at: string | null;
  updated_at: string | null;
  published_at: string | null;
}

export interface MarketplaceReviewsInsert {
  id?: string;
  organization_id: string;
  agency_id: string;
  company_id: string;
  job_id?: string | null;
  transaction_id?: string | null;
  reviewer_id?: string | null;
  reviewer_name?: string | null;
  reviewer_title?: string | null;
  rating: number;
  title?: string | null;
  review_text: string;
  quality_rating?: number | null;
  speed_rating?: number | null;
  communication_rating?: number | null;
  professionalism_rating?: number | null;
  would_work_again?: boolean | null;
  agency_response?: string | null;
  agency_responded_at?: string | null;
  is_verified?: boolean | null;
  verified_placement?: boolean | null;
  status?: string | null;
  helpful_count?: number | null;
  not_helpful_count?: number | null;
  created_at?: string | null;
  updated_at?: string | null;
  published_at?: string | null;
}

export interface MarketplaceReviewsUpdate {
  id?: string;
  organization_id?: string;
  agency_id?: string;
  company_id?: string;
  job_id?: string | null;
  transaction_id?: string | null;
  reviewer_id?: string | null;
  reviewer_name?: string | null;
  reviewer_title?: string | null;
  rating?: number;
  title?: string | null;
  review_text?: string;
  quality_rating?: number | null;
  speed_rating?: number | null;
  communication_rating?: number | null;
  professionalism_rating?: number | null;
  would_work_again?: boolean | null;
  agency_response?: string | null;
  agency_responded_at?: string | null;
  is_verified?: boolean | null;
  verified_placement?: boolean | null;
  status?: string | null;
  helpful_count?: number | null;
  not_helpful_count?: number | null;
  created_at?: string | null;
  updated_at?: string | null;
  published_at?: string | null;
}

// ────────────────────────────────────────────
// marketplace_transactions
// ────────────────────────────────────────────
export interface MarketplaceTransactionsRow {
  id: string;
  organization_id: string;
  company_id: string;
  agency_id: string;
  candidate_id: string;
  job_id: string;
  placement_fee: number;
  aberdeen_commission: number;
  aberdeen_commission_rate: number;
  agency_payout: number;
  payment_status: string | null;
  payment_method: string | null;
  payment_due_date: string | null;
  payment_received_date: string | null;
  guarantee_period: number | null;
  guarantee_expires_at: string | null;
  guarantee_status: string | null;
  stripe_payment_intent_id: string | null;
  stripe_transfer_id: string | null;
  created_at: string | null;
  completed_at: string | null;
  updated_at: string | null;
}

export interface MarketplaceTransactionsInsert {
  id?: string;
  organization_id: string;
  company_id: string;
  agency_id: string;
  candidate_id: string;
  job_id: string;
  placement_fee: number;
  aberdeen_commission: number;
  aberdeen_commission_rate: number;
  agency_payout: number;
  payment_status?: string | null;
  payment_method?: string | null;
  payment_due_date?: string | null;
  payment_received_date?: string | null;
  guarantee_period?: number | null;
  guarantee_expires_at?: string | null;
  guarantee_status?: string | null;
  stripe_payment_intent_id?: string | null;
  stripe_transfer_id?: string | null;
  created_at?: string | null;
  completed_at?: string | null;
  updated_at?: string | null;
}

export interface MarketplaceTransactionsUpdate {
  id?: string;
  organization_id?: string;
  company_id?: string;
  agency_id?: string;
  candidate_id?: string;
  job_id?: string;
  placement_fee?: number;
  aberdeen_commission?: number;
  aberdeen_commission_rate?: number;
  agency_payout?: number;
  payment_status?: string | null;
  payment_method?: string | null;
  payment_due_date?: string | null;
  payment_received_date?: string | null;
  guarantee_period?: number | null;
  guarantee_expires_at?: string | null;
  guarantee_status?: string | null;
  stripe_payment_intent_id?: string | null;
  stripe_transfer_id?: string | null;
  created_at?: string | null;
  completed_at?: string | null;
  updated_at?: string | null;
}

// ────────────────────────────────────────────
// match_analytics_daily_secure
// ────────────────────────────────────────────
export interface MatchAnalyticsDailySecureRow {
  organization_id: string | null;
  activity_date: string | null;
  total_matches: number | null;
  avg_overall_score: number | null;
}

export interface MatchAnalyticsDailySecureInsert {
  organization_id?: string | null;
  activity_date?: string | null;
  total_matches?: number | null;
  avg_overall_score?: number | null;
}

export interface MatchAnalyticsDailySecureUpdate {
  organization_id?: string | null;
  activity_date?: string | null;
  total_matches?: number | null;
  avg_overall_score?: number | null;
}

// ────────────────────────────────────────────
// match_bias_monitoring
// ────────────────────────────────────────────
export interface MatchBiasMonitoringRow {
  id: string;
  organization_id: string;
  monitoring_period_start: string;
  monitoring_period_end: string;
  total_matches_analyzed: number | null;
  demographic_distribution: Json | null;
  score_distribution_by_group: Json | null;
  statistical_parity_diff: number | null;
  disparate_impact_ratio: number | null;
  equal_opportunity_diff: number | null;
  flags: Json | null;
  recommendations: Json | null;
  model_version: string | null;
  created_at: string | null;
}

export interface MatchBiasMonitoringInsert {
  id?: string;
  organization_id: string;
  monitoring_period_start: string;
  monitoring_period_end: string;
  total_matches_analyzed?: number | null;
  demographic_distribution?: Json | null;
  score_distribution_by_group?: Json | null;
  statistical_parity_diff?: number | null;
  disparate_impact_ratio?: number | null;
  equal_opportunity_diff?: number | null;
  flags?: Json | null;
  recommendations?: Json | null;
  model_version?: string | null;
  created_at?: string | null;
}

export interface MatchBiasMonitoringUpdate {
  id?: string;
  organization_id?: string;
  monitoring_period_start?: string;
  monitoring_period_end?: string;
  total_matches_analyzed?: number | null;
  demographic_distribution?: Json | null;
  score_distribution_by_group?: Json | null;
  statistical_parity_diff?: number | null;
  disparate_impact_ratio?: number | null;
  equal_opportunity_diff?: number | null;
  flags?: Json | null;
  recommendations?: Json | null;
  model_version?: string | null;
  created_at?: string | null;
}

// ────────────────────────────────────────────
// match_feedback
// ────────────────────────────────────────────
export interface MatchFeedbackRow {
  id: string;
  organization_id: string;
  match_score_id: string;
  candidate_id: string;
  job_id: string;
  user_id: string;
  feedback_type: string | null;
  rating: number | null;
  accuracy_assessment: string | null;
  comments: string | null;
  suggested_score: number | null;
  factors_disputed: Json | null;
  outcome: string | null;
  created_at: string | null;
}

export interface MatchFeedbackInsert {
  id?: string;
  organization_id: string;
  match_score_id: string;
  candidate_id: string;
  job_id: string;
  user_id: string;
  feedback_type?: string | null;
  rating?: number | null;
  accuracy_assessment?: string | null;
  comments?: string | null;
  suggested_score?: number | null;
  factors_disputed?: Json | null;
  outcome?: string | null;
  created_at?: string | null;
}

export interface MatchFeedbackUpdate {
  id?: string;
  organization_id?: string;
  match_score_id?: string;
  candidate_id?: string;
  job_id?: string;
  user_id?: string;
  feedback_type?: string | null;
  rating?: number | null;
  accuracy_assessment?: string | null;
  comments?: string | null;
  suggested_score?: number | null;
  factors_disputed?: Json | null;
  outcome?: string | null;
  created_at?: string | null;
}

// ────────────────────────────────────────────
// match_scores
// ────────────────────────────────────────────
export interface MatchScoresRow {
  id: string;
  candidate_id: string | null;
  job_id: string | null;
  overall_score: number | null;
  skills_score: number | null;
  experience_score: number | null;
  certification_score: number | null;
  location_score: number | null;
  compensation_score: number | null;
  culture_score: number | null;
  recency_score: number | null;
  adjustments: Json | null;
  threshold_result: string | null;
  override_by: string | null;
  override_reason: string | null;
  model_version: string | null;
  scoring_weights: Json | null;
  created_at: string | null;
  updated_at: string | null;
  organization_id: string;
}

export interface MatchScoresInsert {
  id?: string;
  candidate_id?: string | null;
  job_id?: string | null;
  overall_score?: number | null;
  skills_score?: number | null;
  experience_score?: number | null;
  certification_score?: number | null;
  location_score?: number | null;
  compensation_score?: number | null;
  culture_score?: number | null;
  recency_score?: number | null;
  adjustments?: Json | null;
  threshold_result?: string | null;
  override_by?: string | null;
  override_reason?: string | null;
  model_version?: string | null;
  scoring_weights?: Json | null;
  created_at?: string | null;
  updated_at?: string | null;
  organization_id: string;
}

export interface MatchScoresUpdate {
  id?: string;
  candidate_id?: string | null;
  job_id?: string | null;
  overall_score?: number | null;
  skills_score?: number | null;
  experience_score?: number | null;
  certification_score?: number | null;
  location_score?: number | null;
  compensation_score?: number | null;
  culture_score?: number | null;
  recency_score?: number | null;
  adjustments?: Json | null;
  threshold_result?: string | null;
  override_by?: string | null;
  override_reason?: string | null;
  model_version?: string | null;
  scoring_weights?: Json | null;
  created_at?: string | null;
  updated_at?: string | null;
  organization_id?: string;
}

// ────────────────────────────────────────────
// matches
// ────────────────────────────────────────────
export interface MatchesRow {
  id: string | null;
  candidate_id: string | null;
  job_id: string | null;
  overall_score: number | null;
  skills_score: number | null;
  experience_score: number | null;
  certification_score: number | null;
  location_score: number | null;
  compensation_score: number | null;
  culture_score: number | null;
  recency_score: number | null;
  adjustments: Json | null;
  threshold_result: string | null;
  override_by: string | null;
  override_reason: string | null;
  model_version: string | null;
  scoring_weights: Json | null;
  created_at: string | null;
  updated_at: string | null;
  organization_id: string | null;
}

export interface MatchesInsert {
  id?: string | null;
  candidate_id?: string | null;
  job_id?: string | null;
  overall_score?: number | null;
  skills_score?: number | null;
  experience_score?: number | null;
  certification_score?: number | null;
  location_score?: number | null;
  compensation_score?: number | null;
  culture_score?: number | null;
  recency_score?: number | null;
  adjustments?: Json | null;
  threshold_result?: string | null;
  override_by?: string | null;
  override_reason?: string | null;
  model_version?: string | null;
  scoring_weights?: Json | null;
  created_at?: string | null;
  updated_at?: string | null;
  organization_id?: string | null;
}

export interface MatchesUpdate {
  id?: string | null;
  candidate_id?: string | null;
  job_id?: string | null;
  overall_score?: number | null;
  skills_score?: number | null;
  experience_score?: number | null;
  certification_score?: number | null;
  location_score?: number | null;
  compensation_score?: number | null;
  culture_score?: number | null;
  recency_score?: number | null;
  adjustments?: Json | null;
  threshold_result?: string | null;
  override_by?: string | null;
  override_reason?: string | null;
  model_version?: string | null;
  scoring_weights?: Json | null;
  created_at?: string | null;
  updated_at?: string | null;
  organization_id?: string | null;
}

// ────────────────────────────────────────────
// meeting_participants
// ────────────────────────────────────────────
export interface MeetingParticipantsRow {
  id: string;
  meeting_id: string;
  user_id: string | null;
  email: string;
  name: string | null;
  role: string;
  status: string;
  organization_id: string;
}

export interface MeetingParticipantsInsert {
  id?: string;
  meeting_id: string;
  user_id?: string | null;
  email: string;
  name?: string | null;
  role?: string;
  status?: string;
  organization_id: string;
}

export interface MeetingParticipantsUpdate {
  id?: string;
  meeting_id?: string;
  user_id?: string | null;
  email?: string;
  name?: string | null;
  role?: string;
  status?: string;
  organization_id?: string;
}

// ────────────────────────────────────────────
// meetings
// ────────────────────────────────────────────
export interface MeetingsRow {
  id: string;
  tenant_id: string;
  candidate_id: string;
  job_id: string | null;
  title: string;
  start_time: string;
  end_time: string;
  timezone: string;
  location: string | null;
  meeting_url: string | null;
  status: string;
  calendar_event_id: string | null;
  provider: string | null;
  metadata: Json | null;
  created_at: string;
  organization_id: string | null;
}

export interface MeetingsInsert {
  id?: string;
  tenant_id: string;
  candidate_id: string;
  job_id?: string | null;
  title: string;
  start_time: string;
  end_time: string;
  timezone: string;
  location?: string | null;
  meeting_url?: string | null;
  status?: string;
  calendar_event_id?: string | null;
  provider?: string | null;
  metadata?: Json | null;
  created_at?: string;
  organization_id?: string | null;
}

export interface MeetingsUpdate {
  id?: string;
  tenant_id?: string;
  candidate_id?: string;
  job_id?: string | null;
  title?: string;
  start_time?: string;
  end_time?: string;
  timezone?: string;
  location?: string | null;
  meeting_url?: string | null;
  status?: string;
  calendar_event_id?: string | null;
  provider?: string | null;
  metadata?: Json | null;
  created_at?: string;
  organization_id?: string | null;
}

// ────────────────────────────────────────────
// message_templates
// ────────────────────────────────────────────
export interface MessageTemplatesRow {
  id: string;
  organization_id: string;
  name: string;
  channel: string;
  subject: string | null;
  body: string;
  variables: Json | null;
  created_at: string;
}

export interface MessageTemplatesInsert {
  id?: string;
  organization_id: string;
  name: string;
  channel: string;
  subject?: string | null;
  body: string;
  variables?: Json | null;
  created_at?: string;
}

export interface MessageTemplatesUpdate {
  id?: string;
  organization_id?: string;
  name?: string;
  channel?: string;
  subject?: string | null;
  body?: string;
  variables?: Json | null;
  created_at?: string;
}

// ────────────────────────────────────────────
// messages
// ────────────────────────────────────────────
export interface MessagesRow {
  id: string;
  tenant_id: string;
  candidate_id: string;
  enrollment_id: string | null;
  channel: string;
  direction: string;
  subject: string | null;
  body: string;
  status: string;
  provider: string | null;
  provider_message_id: string | null;
  sent_at: string | null;
  delivered_at: string | null;
  failed_at: string | null;
  error_message: string | null;
  metadata: Json | null;
  created_at: string;
  organization_id: string;
}

export interface MessagesInsert {
  id?: string;
  tenant_id: string;
  candidate_id: string;
  enrollment_id?: string | null;
  channel: string;
  direction?: string;
  subject?: string | null;
  body: string;
  status?: string;
  provider?: string | null;
  provider_message_id?: string | null;
  sent_at?: string | null;
  delivered_at?: string | null;
  failed_at?: string | null;
  error_message?: string | null;
  metadata?: Json | null;
  created_at?: string;
  organization_id: string;
}

export interface MessagesUpdate {
  id?: string;
  tenant_id?: string;
  candidate_id?: string;
  enrollment_id?: string | null;
  channel?: string;
  direction?: string;
  subject?: string | null;
  body?: string;
  status?: string;
  provider?: string | null;
  provider_message_id?: string | null;
  sent_at?: string | null;
  delivered_at?: string | null;
  failed_at?: string | null;
  error_message?: string | null;
  metadata?: Json | null;
  created_at?: string;
  organization_id?: string;
}

// ────────────────────────────────────────────
// note_templates
// ────────────────────────────────────────────
export interface NoteTemplatesRow {
  id: string;
  workspace_id: string;
  name: string;
  description: string | null;
  template_content: string;
  fields: Json | null;
  category: string | null;
  created_by: string;
  created_at: string;
  updated_at: string;
  organization_id: string;
}

export interface NoteTemplatesInsert {
  id?: string;
  workspace_id: string;
  name: string;
  description?: string | null;
  template_content: string;
  fields?: Json | null;
  category?: string | null;
  created_by: string;
  created_at?: string;
  updated_at?: string;
  organization_id: string;
}

export interface NoteTemplatesUpdate {
  id?: string;
  workspace_id?: string;
  name?: string;
  description?: string | null;
  template_content?: string;
  fields?: Json | null;
  category?: string | null;
  created_by?: string;
  created_at?: string;
  updated_at?: string;
  organization_id?: string;
}

// ────────────────────────────────────────────
// notes
// ────────────────────────────────────────────
export interface NotesRow {
  id: string;
  workspace_id: string;
  candidate_id: string;
  application_id: string | null;
  title: string | null;
  content: string;
  template_id: string | null;
  note_type: string | null;
  is_internal: boolean | null;
  created_by: string;
  created_at: string;
  updated_at: string;
  organization_id: string;
}

export interface NotesInsert {
  id?: string;
  workspace_id: string;
  candidate_id: string;
  application_id?: string | null;
  title?: string | null;
  content: string;
  template_id?: string | null;
  note_type?: string | null;
  is_internal?: boolean | null;
  created_by: string;
  created_at?: string;
  updated_at?: string;
  organization_id: string;
}

export interface NotesUpdate {
  id?: string;
  workspace_id?: string;
  candidate_id?: string;
  application_id?: string | null;
  title?: string | null;
  content?: string;
  template_id?: string | null;
  note_type?: string | null;
  is_internal?: boolean | null;
  created_by?: string;
  created_at?: string;
  updated_at?: string;
  organization_id?: string;
}

// ────────────────────────────────────────────
// notification_preferences
// ────────────────────────────────────────────
export interface NotificationPreferencesRow {
  id: string;
  organization_id: string;
  user_id: string | null;
  notification_type: string;
  status: string | null;
  created_at: string | null;
  updated_at: string | null;
}

export interface NotificationPreferencesInsert {
  id?: string;
  organization_id: string;
  user_id?: string | null;
  notification_type: string;
  status?: string | null;
  created_at?: string | null;
  updated_at?: string | null;
}

export interface NotificationPreferencesUpdate {
  id?: string;
  organization_id?: string;
  user_id?: string | null;
  notification_type?: string;
  status?: string | null;
  created_at?: string | null;
  updated_at?: string | null;
}

// ────────────────────────────────────────────
// notifications
// ────────────────────────────────────────────
export interface NotificationsRow {
  id: string;
  organization_id: string;
  user_id: string;
  channel: string;
  topic: string;
  subject: string | null;
  body: string;
  status: string;
  metadata: Json | null;
  created_at: string;
  sent_at: string | null;
}

export interface NotificationsInsert {
  id?: string;
  organization_id: string;
  user_id: string;
  channel: string;
  topic: string;
  subject?: string | null;
  body: string;
  status?: string;
  metadata?: Json | null;
  created_at?: string;
  sent_at?: string | null;
}

export interface NotificationsUpdate {
  id?: string;
  organization_id?: string;
  user_id?: string;
  channel?: string;
  topic?: string;
  subject?: string | null;
  body?: string;
  status?: string;
  metadata?: Json | null;
  created_at?: string;
  sent_at?: string | null;
}

// ────────────────────────────────────────────
// offer_approvals
// ────────────────────────────────────────────
export interface OfferApprovalsRow {
  id: string;
  organization_id: string;
  offer_id: string;
  step_order: number;
  approver_user_id: string;
  status: string;
  decided_at: string | null;
  decision_note: string | null;
  created_at: string;
}

export interface OfferApprovalsInsert {
  id?: string;
  organization_id: string;
  offer_id: string;
  step_order: number;
  approver_user_id: string;
  status?: string;
  decided_at?: string | null;
  decision_note?: string | null;
  created_at?: string;
}

export interface OfferApprovalsUpdate {
  id?: string;
  organization_id?: string;
  offer_id?: string;
  step_order?: number;
  approver_user_id?: string;
  status?: string;
  decided_at?: string | null;
  decision_note?: string | null;
  created_at?: string;
}

// ────────────────────────────────────────────
// offer_documents
// ────────────────────────────────────────────
export interface OfferDocumentsRow {
  id: string;
  organization_id: string;
  offer_id: string;
  doc_type: string;
  status: string;
  storage_key: string | null;
  url: string | null;
  metadata: Json | null;
  created_at: string;
}

export interface OfferDocumentsInsert {
  id?: string;
  organization_id: string;
  offer_id: string;
  doc_type: string;
  status?: string;
  storage_key?: string | null;
  url?: string | null;
  metadata?: Json | null;
  created_at?: string;
}

export interface OfferDocumentsUpdate {
  id?: string;
  organization_id?: string;
  offer_id?: string;
  doc_type?: string;
  status?: string;
  storage_key?: string | null;
  url?: string | null;
  metadata?: Json | null;
  created_at?: string;
}

// ────────────────────────────────────────────
// offer_intelligence
// ────────────────────────────────────────────
export interface OfferIntelligenceRow {
  id: string;
  organization_id: string;
  offer_id: string;
  candidate_id: string;
  job_id: string;
  market_benchmark: Json | null;
  percentile_position: number | null;
  acceptance_probability: number | null;
  risk_factors: Json | null;
  negotiation_likelihood: number | null;
  counter_offer_prediction: Json | null;
  recommended_adjustments: Json | null;
  competitive_analysis: Json | null;
  model_version: string | null;
  created_at: string | null;
}

export interface OfferIntelligenceInsert {
  id?: string;
  organization_id: string;
  offer_id: string;
  candidate_id: string;
  job_id: string;
  market_benchmark?: Json | null;
  percentile_position?: number | null;
  acceptance_probability?: number | null;
  risk_factors?: Json | null;
  negotiation_likelihood?: number | null;
  counter_offer_prediction?: Json | null;
  recommended_adjustments?: Json | null;
  competitive_analysis?: Json | null;
  model_version?: string | null;
  created_at?: string | null;
}

export interface OfferIntelligenceUpdate {
  id?: string;
  organization_id?: string;
  offer_id?: string;
  candidate_id?: string;
  job_id?: string;
  market_benchmark?: Json | null;
  percentile_position?: number | null;
  acceptance_probability?: number | null;
  risk_factors?: Json | null;
  negotiation_likelihood?: number | null;
  counter_offer_prediction?: Json | null;
  recommended_adjustments?: Json | null;
  competitive_analysis?: Json | null;
  model_version?: string | null;
  created_at?: string | null;
}

// ────────────────────────────────────────────
// offer_negotiations
// ────────────────────────────────────────────
export interface OfferNegotiationsRow {
  id: string;
  organization_id: string;
  offer_id: string;
  round_number: number;
  initiated_by: string | null;
  previous_salary: number | null;
  proposed_salary: number | null;
  previous_equity: number | null;
  proposed_equity: number | null;
  previous_start_date: string | null;
  proposed_start_date: string | null;
  other_terms: Json | null;
  candidate_response: string | null;
  internal_notes: string | null;
  responded_at: string | null;
  status: string | null;
  created_at: string | null;
  updated_at: string | null;
}

export interface OfferNegotiationsInsert {
  id?: string;
  organization_id: string;
  offer_id: string;
  round_number?: number;
  initiated_by?: string | null;
  previous_salary?: number | null;
  proposed_salary?: number | null;
  previous_equity?: number | null;
  proposed_equity?: number | null;
  previous_start_date?: string | null;
  proposed_start_date?: string | null;
  other_terms?: Json | null;
  candidate_response?: string | null;
  internal_notes?: string | null;
  responded_at?: string | null;
  status?: string | null;
  created_at?: string | null;
  updated_at?: string | null;
}

export interface OfferNegotiationsUpdate {
  id?: string;
  organization_id?: string;
  offer_id?: string;
  round_number?: number;
  initiated_by?: string | null;
  previous_salary?: number | null;
  proposed_salary?: number | null;
  previous_equity?: number | null;
  proposed_equity?: number | null;
  previous_start_date?: string | null;
  proposed_start_date?: string | null;
  other_terms?: Json | null;
  candidate_response?: string | null;
  internal_notes?: string | null;
  responded_at?: string | null;
  status?: string | null;
  created_at?: string | null;
  updated_at?: string | null;
}

// ────────────────────────────────────────────
// offers
// ────────────────────────────────────────────
export interface OffersRow {
  id: string;
  organization_id: string;
  submission_id: string | null;
  salary_amount: number;
  salary_currency: string | null;
  equity_percentage: number | null;
  start_date: string | null;
  offer_letter_url: string | null;
  status: string | null;
  sent_at: string | null;
  accepted_at: string | null;
  declined_at: string | null;
  notes: string | null;
  metadata: Json | null;
  created_at: string | null;
  updated_at: string | null;
}

export interface OffersInsert {
  id?: string;
  organization_id: string;
  submission_id?: string | null;
  salary_amount: number;
  salary_currency?: string | null;
  equity_percentage?: number | null;
  start_date?: string | null;
  offer_letter_url?: string | null;
  status?: string | null;
  sent_at?: string | null;
  accepted_at?: string | null;
  declined_at?: string | null;
  notes?: string | null;
  metadata?: Json | null;
  created_at?: string | null;
  updated_at?: string | null;
}

export interface OffersUpdate {
  id?: string;
  organization_id?: string;
  submission_id?: string | null;
  salary_amount?: number;
  salary_currency?: string | null;
  equity_percentage?: number | null;
  start_date?: string | null;
  offer_letter_url?: string | null;
  status?: string | null;
  sent_at?: string | null;
  accepted_at?: string | null;
  declined_at?: string | null;
  notes?: string | null;
  metadata?: Json | null;
  created_at?: string | null;
  updated_at?: string | null;
}

// ────────────────────────────────────────────
// onboarding
// ────────────────────────────────────────────
export interface OnboardingRow {
  id: string;
  organization_id: string;
  candidate_id: string | null;
  placement_id: string | null;
  checklist: Json | null;
  status: string | null;
  start_date: string | null;
  completion_date: string | null;
  created_at: string | null;
  updated_at: string | null;
  created_by: string | null;
}

export interface OnboardingInsert {
  id?: string;
  organization_id: string;
  candidate_id?: string | null;
  placement_id?: string | null;
  checklist?: Json | null;
  status?: string | null;
  start_date?: string | null;
  completion_date?: string | null;
  created_at?: string | null;
  updated_at?: string | null;
  created_by?: string | null;
}

export interface OnboardingUpdate {
  id?: string;
  organization_id?: string;
  candidate_id?: string | null;
  placement_id?: string | null;
  checklist?: Json | null;
  status?: string | null;
  start_date?: string | null;
  completion_date?: string | null;
  created_at?: string | null;
  updated_at?: string | null;
  created_by?: string | null;
}

// ────────────────────────────────────────────
// onboarding_packets
// ────────────────────────────────────────────
export interface OnboardingPacketsRow {
  id: string;
  organization_id: string;
  start_id: string;
  candidate_id: string;
  status: string;
  packet: Json | null;
  last_error: string | null;
  created_at: string;
}

export interface OnboardingPacketsInsert {
  id?: string;
  organization_id: string;
  start_id: string;
  candidate_id: string;
  status?: string;
  packet?: Json | null;
  last_error?: string | null;
  created_at?: string;
}

export interface OnboardingPacketsUpdate {
  id?: string;
  organization_id?: string;
  start_id?: string;
  candidate_id?: string;
  status?: string;
  packet?: Json | null;
  last_error?: string | null;
  created_at?: string;
}

// ────────────────────────────────────────────
// org_memberships
// ────────────────────────────────────────────
export interface OrgMembershipsRow {
  org_id: string;
  user_id: string;
  role: string;
  created_at: string;
}

export interface OrgMembershipsInsert {
  org_id: string;
  user_id: string;
  role?: string;
  created_at?: string;
}

export interface OrgMembershipsUpdate {
  org_id?: string;
  user_id?: string;
  role?: string;
  created_at?: string;
}

// ────────────────────────────────────────────
// organization_tenants
// ────────────────────────────────────────────
export interface OrganizationTenantsRow {
  id: string;
  organization_id: string;
  tenant_id: string;
  is_primary: boolean;
  created_at: string;
  updated_at: string;
}

export interface OrganizationTenantsInsert {
  id?: string;
  organization_id: string;
  tenant_id: string;
  is_primary?: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface OrganizationTenantsUpdate {
  id?: string;
  organization_id?: string;
  tenant_id?: string;
  is_primary?: boolean;
  created_at?: string;
  updated_at?: string;
}

// ────────────────────────────────────────────
// organizations
// ────────────────────────────────────────────
export interface OrganizationsRow {
  id: string;
  name: string;
  slug: string;
  settings: Json | null;
  created_at: string | null;
  updated_at: string | null;
}

export interface OrganizationsInsert {
  id?: string;
  name: string;
  slug: string;
  settings?: Json | null;
  created_at?: string | null;
  updated_at?: string | null;
}

export interface OrganizationsUpdate {
  id?: string;
  name?: string;
  slug?: string;
  settings?: Json | null;
  created_at?: string | null;
  updated_at?: string | null;
}

// ────────────────────────────────────────────
// parsed_resumes
// ────────────────────────────────────────────
export interface ParsedResumesRow {
  id: string;
  candidate_id: string | null;
  source_document_id: string | null;
  parse_timestamp: string | null;
  parser_version: string | null;
  overall_confidence: number | null;
  contact_info: Json | null;
  work_experience: Json | null;
  education: Json | null;
  skills: Json | null;
  certifications: Json | null;
  parse_duration_ms: number | null;
  fields_requiring_review: string[] | null;
  raw_text: string | null;
  created_at: string | null;
  updated_at: string | null;
  organization_id: string;
}

export interface ParsedResumesInsert {
  id?: string;
  candidate_id?: string | null;
  source_document_id?: string | null;
  parse_timestamp?: string | null;
  parser_version?: string | null;
  overall_confidence?: number | null;
  contact_info?: Json | null;
  work_experience?: Json | null;
  education?: Json | null;
  skills?: Json | null;
  certifications?: Json | null;
  parse_duration_ms?: number | null;
  fields_requiring_review?: string[] | null;
  raw_text?: string | null;
  created_at?: string | null;
  updated_at?: string | null;
  organization_id: string;
}

export interface ParsedResumesUpdate {
  id?: string;
  candidate_id?: string | null;
  source_document_id?: string | null;
  parse_timestamp?: string | null;
  parser_version?: string | null;
  overall_confidence?: number | null;
  contact_info?: Json | null;
  work_experience?: Json | null;
  education?: Json | null;
  skills?: Json | null;
  certifications?: Json | null;
  parse_duration_ms?: number | null;
  fields_requiring_review?: string[] | null;
  raw_text?: string | null;
  created_at?: string | null;
  updated_at?: string | null;
  organization_id?: string;
}

// ────────────────────────────────────────────
// performance_reviews
// ────────────────────────────────────────────
export interface PerformanceReviewsRow {
  id: string;
  organization_id: string;
  employee_id: string | null;
  reviewer_id: string | null;
  review_period_start: string | null;
  review_period_end: string | null;
  status: string | null;
  ratings: Json | null;
  comments: string | null;
  goals: Json | null;
  created_at: string | null;
  updated_at: string | null;
  completed_at: string | null;
}

export interface PerformanceReviewsInsert {
  id?: string;
  organization_id: string;
  employee_id?: string | null;
  reviewer_id?: string | null;
  review_period_start?: string | null;
  review_period_end?: string | null;
  status?: string | null;
  ratings?: Json | null;
  comments?: string | null;
  goals?: Json | null;
  created_at?: string | null;
  updated_at?: string | null;
  completed_at?: string | null;
}

export interface PerformanceReviewsUpdate {
  id?: string;
  organization_id?: string;
  employee_id?: string | null;
  reviewer_id?: string | null;
  review_period_start?: string | null;
  review_period_end?: string | null;
  status?: string | null;
  ratings?: Json | null;
  comments?: string | null;
  goals?: Json | null;
  created_at?: string | null;
  updated_at?: string | null;
  completed_at?: string | null;
}

// ────────────────────────────────────────────
// pipeline
// ────────────────────────────────────────────
export interface PipelineRow {
  id: string;
  organization_id: string | null;
  submission_id: string | null;
  stage: string;
  status: string | null;
  notes: string | null;
  moved_by: string | null;
  moved_at: string | null;
  created_at: string | null;
  updated_at: string | null;
}

export interface PipelineInsert {
  id?: string;
  organization_id?: string | null;
  submission_id?: string | null;
  stage: string;
  status?: string | null;
  notes?: string | null;
  moved_by?: string | null;
  moved_at?: string | null;
  created_at?: string | null;
  updated_at?: string | null;
}

export interface PipelineUpdate {
  id?: string;
  organization_id?: string | null;
  submission_id?: string | null;
  stage?: string;
  status?: string | null;
  notes?: string | null;
  moved_by?: string | null;
  moved_at?: string | null;
  created_at?: string | null;
  updated_at?: string | null;
}

// ────────────────────────────────────────────
// placement_falloffs
// ────────────────────────────────────────────
export interface PlacementFalloffsRow {
  id: string;
  organization_id: string;
  placement_id: string;
  candidate_id: string;
  job_id: string;
  client_id: string;
  falloff_date: string;
  days_employed: number | null;
  within_guarantee: boolean | null;
  reason_category: string | null;
  reason_detail: string | null;
  initiated_by: string | null;
  refund_required: boolean | null;
  refund_amount: number | null;
  refund_status: string | null;
  replacement_required: boolean | null;
  replacement_candidate_id: string | null;
  exit_interview_notes: string | null;
  created_by: string | null;
  created_at: string | null;
  updated_at: string | null;
}

export interface PlacementFalloffsInsert {
  id?: string;
  organization_id: string;
  placement_id: string;
  candidate_id: string;
  job_id: string;
  client_id: string;
  falloff_date: string;
  days_employed?: number | null;
  within_guarantee?: boolean | null;
  reason_category?: string | null;
  reason_detail?: string | null;
  initiated_by?: string | null;
  refund_required?: boolean | null;
  refund_amount?: number | null;
  refund_status?: string | null;
  replacement_required?: boolean | null;
  replacement_candidate_id?: string | null;
  exit_interview_notes?: string | null;
  created_by?: string | null;
  created_at?: string | null;
  updated_at?: string | null;
}

export interface PlacementFalloffsUpdate {
  id?: string;
  organization_id?: string;
  placement_id?: string;
  candidate_id?: string;
  job_id?: string;
  client_id?: string;
  falloff_date?: string;
  days_employed?: number | null;
  within_guarantee?: boolean | null;
  reason_category?: string | null;
  reason_detail?: string | null;
  initiated_by?: string | null;
  refund_required?: boolean | null;
  refund_amount?: number | null;
  refund_status?: string | null;
  replacement_required?: boolean | null;
  replacement_candidate_id?: string | null;
  exit_interview_notes?: string | null;
  created_by?: string | null;
  created_at?: string | null;
  updated_at?: string | null;
}

// ────────────────────────────────────────────
// placements
// ────────────────────────────────────────────
export interface PlacementsRow {
  id: string;
  organization_id: string;
  offer_id: string | null;
  candidate_id: string | null;
  job_id: string | null;
  start_date: string;
  end_date: string | null;
  placement_fee: number | null;
  fee_currency: string | null;
  guarantee_days: number | null;
  status: string | null;
  notes: string | null;
  created_at: string | null;
  updated_at: string | null;
  is_marketplace_placement: boolean | null;
  agency_id: string | null;
}

export interface PlacementsInsert {
  id?: string;
  organization_id: string;
  offer_id?: string | null;
  candidate_id?: string | null;
  job_id?: string | null;
  start_date: string;
  end_date?: string | null;
  placement_fee?: number | null;
  fee_currency?: string | null;
  guarantee_days?: number | null;
  status?: string | null;
  notes?: string | null;
  created_at?: string | null;
  updated_at?: string | null;
  is_marketplace_placement?: boolean | null;
  agency_id?: string | null;
}

export interface PlacementsUpdate {
  id?: string;
  organization_id?: string;
  offer_id?: string | null;
  candidate_id?: string | null;
  job_id?: string | null;
  start_date?: string;
  end_date?: string | null;
  placement_fee?: number | null;
  fee_currency?: string | null;
  guarantee_days?: number | null;
  status?: string | null;
  notes?: string | null;
  created_at?: string | null;
  updated_at?: string | null;
  is_marketplace_placement?: boolean | null;
  agency_id?: string | null;
}

// ────────────────────────────────────────────
// portal_access_tokens
// ────────────────────────────────────────────
export interface PortalAccessTokensRow {
  id: string;
  organization_id: string;
  portal_type: string;
  entity_type: string;
  entity_id: string;
  token_hash: string;
  permissions: Json | null;
  issued_at: string | null;
  expires_at: string | null;
  last_used_at: string | null;
  revoked_at: string | null;
  revoked_by: string | null;
  ip_restrictions: Json | null;
  status: string | null;
  created_at: string | null;
}

export interface PortalAccessTokensInsert {
  id?: string;
  organization_id: string;
  portal_type: string;
  entity_type: string;
  entity_id: string;
  token_hash: string;
  permissions?: Json | null;
  issued_at?: string | null;
  expires_at?: string | null;
  last_used_at?: string | null;
  revoked_at?: string | null;
  revoked_by?: string | null;
  ip_restrictions?: Json | null;
  status?: string | null;
  created_at?: string | null;
}

export interface PortalAccessTokensUpdate {
  id?: string;
  organization_id?: string;
  portal_type?: string;
  entity_type?: string;
  entity_id?: string;
  token_hash?: string;
  permissions?: Json | null;
  issued_at?: string | null;
  expires_at?: string | null;
  last_used_at?: string | null;
  revoked_at?: string | null;
  revoked_by?: string | null;
  ip_restrictions?: Json | null;
  status?: string | null;
  created_at?: string | null;
}

// ────────────────────────────────────────────
// prompt_templates
// ────────────────────────────────────────────
export interface PromptTemplatesRow {
  id: string;
  organization_id: string;
  template_name: string;
  category: string | null;
  agent_name: string | null;
  prompt_text: string;
  variables: Json | null;
  example_output: string | null;
  use_case: string | null;
  version: number | null;
  is_active: boolean | null;
  usage_count: number | null;
  avg_rating: number | null;
  created_by: string | null;
  created_at: string | null;
  updated_at: string | null;
}

export interface PromptTemplatesInsert {
  id?: string;
  organization_id: string;
  template_name: string;
  category?: string | null;
  agent_name?: string | null;
  prompt_text: string;
  variables?: Json | null;
  example_output?: string | null;
  use_case?: string | null;
  version?: number | null;
  is_active?: boolean | null;
  usage_count?: number | null;
  avg_rating?: number | null;
  created_by?: string | null;
  created_at?: string | null;
  updated_at?: string | null;
}

export interface PromptTemplatesUpdate {
  id?: string;
  organization_id?: string;
  template_name?: string;
  category?: string | null;
  agent_name?: string | null;
  prompt_text?: string;
  variables?: Json | null;
  example_output?: string | null;
  use_case?: string | null;
  version?: number | null;
  is_active?: boolean | null;
  usage_count?: number | null;
  avg_rating?: number | null;
  created_by?: string | null;
  created_at?: string | null;
  updated_at?: string | null;
}

// ────────────────────────────────────────────
// recording_assets
// ────────────────────────────────────────────
export interface RecordingAssetsRow {
  id: string;
  organization_id: string;
  meeting_id: string | null;
  provider: string;
  provider_asset_id: string | null;
  url: string | null;
  asset_type: string;
  status: string;
  metadata: Json | null;
  created_at: string;
}

export interface RecordingAssetsInsert {
  id?: string;
  organization_id: string;
  meeting_id?: string | null;
  provider: string;
  provider_asset_id?: string | null;
  url?: string | null;
  asset_type: string;
  status?: string;
  metadata?: Json | null;
  created_at?: string;
}

export interface RecordingAssetsUpdate {
  id?: string;
  organization_id?: string;
  meeting_id?: string | null;
  provider?: string;
  provider_asset_id?: string | null;
  url?: string | null;
  asset_type?: string;
  status?: string;
  metadata?: Json | null;
  created_at?: string;
}

// ────────────────────────────────────────────
// recruiting_metrics
// ────────────────────────────────────────────
export interface RecruitingMetricsRow {
  id: string;
  metric_date: string | null;
  metric_type: string | null;
  dimension: string | null;
  dimension_value: string | null;
  applications: number | null;
  screens: number | null;
  submittals: number | null;
  interviews: number | null;
  offers: number | null;
  placements: number | null;
  screen_rate: number | null;
  submittal_rate: number | null;
  interview_rate: number | null;
  offer_rate: number | null;
  placement_rate: number | null;
  avg_time_to_screen: number | null;
  avg_time_to_submittal: number | null;
  avg_time_to_interview: number | null;
  avg_time_to_offer: number | null;
  avg_time_to_placement: number | null;
  created_at: string | null;
  organization_id: string;
}

export interface RecruitingMetricsInsert {
  id?: string;
  metric_date?: string | null;
  metric_type?: string | null;
  dimension?: string | null;
  dimension_value?: string | null;
  applications?: number | null;
  screens?: number | null;
  submittals?: number | null;
  interviews?: number | null;
  offers?: number | null;
  placements?: number | null;
  screen_rate?: number | null;
  submittal_rate?: number | null;
  interview_rate?: number | null;
  offer_rate?: number | null;
  placement_rate?: number | null;
  avg_time_to_screen?: number | null;
  avg_time_to_submittal?: number | null;
  avg_time_to_interview?: number | null;
  avg_time_to_offer?: number | null;
  avg_time_to_placement?: number | null;
  created_at?: string | null;
  organization_id: string;
}

export interface RecruitingMetricsUpdate {
  id?: string;
  metric_date?: string | null;
  metric_type?: string | null;
  dimension?: string | null;
  dimension_value?: string | null;
  applications?: number | null;
  screens?: number | null;
  submittals?: number | null;
  interviews?: number | null;
  offers?: number | null;
  placements?: number | null;
  screen_rate?: number | null;
  submittal_rate?: number | null;
  interview_rate?: number | null;
  offer_rate?: number | null;
  placement_rate?: number | null;
  avg_time_to_screen?: number | null;
  avg_time_to_submittal?: number | null;
  avg_time_to_interview?: number | null;
  avg_time_to_offer?: number | null;
  avg_time_to_placement?: number | null;
  created_at?: string | null;
  organization_id?: string;
}

// ────────────────────────────────────────────
// redeploy_pipelines
// ────────────────────────────────────────────
export interface RedeployPipelinesRow {
  id: string;
  organization_id: string;
  bench_id: string;
  candidate_id: string;
  job_id: string | null;
  submission_id: string | null;
  stage: string;
  stage_reason: string | null;
  stage_changed_at: string;
  owner_id: string | null;
  metadata: Json;
  created_at: string;
  updated_at: string;
}

export interface RedeployPipelinesInsert {
  id?: string;
  organization_id: string;
  bench_id: string;
  candidate_id: string;
  job_id?: string | null;
  submission_id?: string | null;
  stage?: string;
  stage_reason?: string | null;
  stage_changed_at?: string;
  owner_id?: string | null;
  metadata?: Json;
  created_at?: string;
  updated_at?: string;
}

export interface RedeployPipelinesUpdate {
  id?: string;
  organization_id?: string;
  bench_id?: string;
  candidate_id?: string;
  job_id?: string | null;
  submission_id?: string | null;
  stage?: string;
  stage_reason?: string | null;
  stage_changed_at?: string;
  owner_id?: string | null;
  metadata?: Json;
  created_at?: string;
  updated_at?: string;
}

// ────────────────────────────────────────────
// redeploy_recommendations
// ────────────────────────────────────────────
export interface RedeployRecommendationsRow {
  id: string;
  organization_id: string;
  bench_id: string;
  job_id: string;
  score: number;
  explainability: Json;
  created_at: string;
}

export interface RedeployRecommendationsInsert {
  id?: string;
  organization_id: string;
  bench_id: string;
  job_id: string;
  score: number;
  explainability?: Json;
  created_at?: string;
}

export interface RedeployRecommendationsUpdate {
  id?: string;
  organization_id?: string;
  bench_id?: string;
  job_id?: string;
  score?: number;
  explainability?: Json;
  created_at?: string;
}

// ────────────────────────────────────────────
// reference_checks
// ────────────────────────────────────────────
export interface ReferenceChecksRow {
  id: string;
  organization_id: string;
  candidate_id: string;
  application_id: string | null;
  reference_name: string | null;
  reference_title: string | null;
  reference_company: string | null;
  reference_email: string | null;
  reference_phone: string | null;
  relationship: string | null;
  years_known: number | null;
  request_sent_at: string | null;
  completed_at: string | null;
  responses: Json | null;
  overall_rating: number | null;
  would_rehire: boolean | null;
  strengths: string | null;
  areas_for_improvement: string | null;
  additional_comments: string | null;
  verified: boolean | null;
  verified_by: string | null;
  status: string | null;
  created_at: string | null;
  updated_at: string | null;
}

export interface ReferenceChecksInsert {
  id?: string;
  organization_id: string;
  candidate_id: string;
  application_id?: string | null;
  reference_name?: string | null;
  reference_title?: string | null;
  reference_company?: string | null;
  reference_email?: string | null;
  reference_phone?: string | null;
  relationship?: string | null;
  years_known?: number | null;
  request_sent_at?: string | null;
  completed_at?: string | null;
  responses?: Json | null;
  overall_rating?: number | null;
  would_rehire?: boolean | null;
  strengths?: string | null;
  areas_for_improvement?: string | null;
  additional_comments?: string | null;
  verified?: boolean | null;
  verified_by?: string | null;
  status?: string | null;
  created_at?: string | null;
  updated_at?: string | null;
}

export interface ReferenceChecksUpdate {
  id?: string;
  organization_id?: string;
  candidate_id?: string;
  application_id?: string | null;
  reference_name?: string | null;
  reference_title?: string | null;
  reference_company?: string | null;
  reference_email?: string | null;
  reference_phone?: string | null;
  relationship?: string | null;
  years_known?: number | null;
  request_sent_at?: string | null;
  completed_at?: string | null;
  responses?: Json | null;
  overall_rating?: number | null;
  would_rehire?: boolean | null;
  strengths?: string | null;
  areas_for_improvement?: string | null;
  additional_comments?: string | null;
  verified?: boolean | null;
  verified_by?: string | null;
  status?: string | null;
  created_at?: string | null;
  updated_at?: string | null;
}

// ────────────────────────────────────────────
// referrals
// ────────────────────────────────────────────
export interface ReferralsRow {
  id: string;
  organization_id: string | null;
  candidate_id: string | null;
  referred_by_type: string;
  referred_by_id: string | null;
  referral_source: string | null;
  referral_fee_amount: number | null;
  referral_fee_paid: boolean | null;
  referral_fee_paid_at: string | null;
  notes: string | null;
  created_at: string | null;
  updated_at: string | null;
}

export interface ReferralsInsert {
  id?: string;
  organization_id?: string | null;
  candidate_id?: string | null;
  referred_by_type: string;
  referred_by_id?: string | null;
  referral_source?: string | null;
  referral_fee_amount?: number | null;
  referral_fee_paid?: boolean | null;
  referral_fee_paid_at?: string | null;
  notes?: string | null;
  created_at?: string | null;
  updated_at?: string | null;
}

export interface ReferralsUpdate {
  id?: string;
  organization_id?: string | null;
  candidate_id?: string | null;
  referred_by_type?: string;
  referred_by_id?: string | null;
  referral_source?: string | null;
  referral_fee_amount?: number | null;
  referral_fee_paid?: boolean | null;
  referral_fee_paid_at?: string | null;
  notes?: string | null;
  created_at?: string | null;
  updated_at?: string | null;
}

// ────────────────────────────────────────────
// registry_actions
// ────────────────────────────────────────────
export interface RegistryActionsRow {
  action_key: string;
  definition: Json;
  created_at: string | null;
}

export interface RegistryActionsInsert {
  action_key: string;
  definition: Json;
  created_at?: string | null;
}

export interface RegistryActionsUpdate {
  action_key?: string;
  definition?: Json;
  created_at?: string | null;
}

// ────────────────────────────────────────────
// reports
// ────────────────────────────────────────────
export interface ReportsRow {
  id: string;
  organization_id: string;
  name: string;
  description: string | null;
  report_type: string | null;
  config: Json | null;
  schedule: string | null;
  status: string | null;
  created_at: string | null;
  updated_at: string | null;
  created_by: string | null;
  last_run_at: string | null;
}

export interface ReportsInsert {
  id?: string;
  organization_id: string;
  name: string;
  description?: string | null;
  report_type?: string | null;
  config?: Json | null;
  schedule?: string | null;
  status?: string | null;
  created_at?: string | null;
  updated_at?: string | null;
  created_by?: string | null;
  last_run_at?: string | null;
}

export interface ReportsUpdate {
  id?: string;
  organization_id?: string;
  name?: string;
  description?: string | null;
  report_type?: string | null;
  config?: Json | null;
  schedule?: string | null;
  status?: string | null;
  created_at?: string | null;
  updated_at?: string | null;
  created_by?: string | null;
  last_run_at?: string | null;
}

// ────────────────────────────────────────────
// requirements
// ────────────────────────────────────────────
export interface RequirementsRow {
  id: string;
  organization_id: string;
  client_id: string | null;
  job_id: string | null;
  title: string;
  description: string | null;
  required_skills: Json | null;
  preferred_skills: Json | null;
  status: string | null;
  priority: string | null;
  deadline: string | null;
  created_at: string | null;
  updated_at: string | null;
  created_by: string | null;
}

export interface RequirementsInsert {
  id?: string;
  organization_id: string;
  client_id?: string | null;
  job_id?: string | null;
  title: string;
  description?: string | null;
  required_skills?: Json | null;
  preferred_skills?: Json | null;
  status?: string | null;
  priority?: string | null;
  deadline?: string | null;
  created_at?: string | null;
  updated_at?: string | null;
  created_by?: string | null;
}

export interface RequirementsUpdate {
  id?: string;
  organization_id?: string;
  client_id?: string | null;
  job_id?: string | null;
  title?: string;
  description?: string | null;
  required_skills?: Json | null;
  preferred_skills?: Json | null;
  status?: string | null;
  priority?: string | null;
  deadline?: string | null;
  created_at?: string | null;
  updated_at?: string | null;
  created_by?: string | null;
}

// ────────────────────────────────────────────
// revenue_by_stream
// ────────────────────────────────────────────
export interface RevenueByStreamRow {
  stream_name: string | null;
  revenue: number | null;
  transactions: number | null;
  stream_type: string | null;
}

export interface RevenueByStreamInsert {
  stream_name?: string | null;
  revenue?: number | null;
  transactions?: number | null;
  stream_type?: string | null;
}

export interface RevenueByStreamUpdate {
  stream_name?: string | null;
  revenue?: number | null;
  transactions?: number | null;
  stream_type?: string | null;
}

// ────────────────────────────────────────────
// revenue_dashboard
// ────────────────────────────────────────────
export interface RevenueDashboardRow {
  total_revenue: number | null;
  active_streams: number | null;
  top_stream_revenue: number | null;
  concentration_percentage: number | null;
  diversification_score: number | null;
}

export interface RevenueDashboardInsert {
  total_revenue?: number | null;
  active_streams?: number | null;
  top_stream_revenue?: number | null;
  concentration_percentage?: number | null;
  diversification_score?: number | null;
}

export interface RevenueDashboardUpdate {
  total_revenue?: number | null;
  active_streams?: number | null;
  top_stream_revenue?: number | null;
  concentration_percentage?: number | null;
  diversification_score?: number | null;
}

// ────────────────────────────────────────────
// reviews
// ────────────────────────────────────────────
export interface ReviewsRow {
  id: string;
  organization_id: string;
  entity_type: string | null;
  entity_id: string | null;
  reviewer_id: string | null;
  rating: number | null;
  review_text: string | null;
  status: string | null;
  created_at: string | null;
  updated_at: string | null;
  published_at: string | null;
}

export interface ReviewsInsert {
  id?: string;
  organization_id: string;
  entity_type?: string | null;
  entity_id?: string | null;
  reviewer_id?: string | null;
  rating?: number | null;
  review_text?: string | null;
  status?: string | null;
  created_at?: string | null;
  updated_at?: string | null;
  published_at?: string | null;
}

export interface ReviewsUpdate {
  id?: string;
  organization_id?: string;
  entity_type?: string | null;
  entity_id?: string | null;
  reviewer_id?: string | null;
  rating?: number | null;
  review_text?: string | null;
  status?: string | null;
  created_at?: string | null;
  updated_at?: string | null;
  published_at?: string | null;
}

// ────────────────────────────────────────────
// roles
// ────────────────────────────────────────────
export interface RolesRow {
  id: string;
  organization_id: string;
  name: string;
  description: string | null;
  permissions: Json | null;
  status: string | null;
  created_at: string | null;
  updated_at: string | null;
  created_by: string | null;
  updated_by: string | null;
}

export interface RolesInsert {
  id?: string;
  organization_id: string;
  name: string;
  description?: string | null;
  permissions?: Json | null;
  status?: string | null;
  created_at?: string | null;
  updated_at?: string | null;
  created_by?: string | null;
  updated_by?: string | null;
}

export interface RolesUpdate {
  id?: string;
  organization_id?: string;
  name?: string;
  description?: string | null;
  permissions?: Json | null;
  status?: string | null;
  created_at?: string | null;
  updated_at?: string | null;
  created_by?: string | null;
  updated_by?: string | null;
}

// ────────────────────────────────────────────
// saved_searches
// ────────────────────────────────────────────
export interface SavedSearchesRow {
  id: string;
  name: string;
  entity_type: string;
  filters: Json;
  user_id: string | null;
  created_at: string | null;
  updated_at: string | null;
  organization_id: string;
}

export interface SavedSearchesInsert {
  id?: string;
  name: string;
  entity_type?: string;
  filters?: Json;
  user_id?: string | null;
  created_at?: string | null;
  updated_at?: string | null;
  organization_id: string;
}

export interface SavedSearchesUpdate {
  id?: string;
  name?: string;
  entity_type?: string;
  filters?: Json;
  user_id?: string | null;
  created_at?: string | null;
  updated_at?: string | null;
  organization_id?: string;
}

// ────────────────────────────────────────────
// scheduling_links
// ────────────────────────────────────────────
export interface SchedulingLinksRow {
  id: string;
  organization_id: string;
  user_id: string;
  name: string | null;
  slug: string;
  link_type: string | null;
  duration_minutes: number;
  buffer_before: number | null;
  buffer_after: number | null;
  availability_rules: Json | null;
  booking_window_days: number | null;
  min_notice_hours: number | null;
  questions: Json | null;
  confirmation_message: string | null;
  reminder_settings: Json | null;
  calendar_connection_id: string | null;
  meeting_location: string | null;
  meeting_provider: string | null;
  is_active: boolean | null;
  bookings_count: number | null;
  created_at: string | null;
  updated_at: string | null;
}

export interface SchedulingLinksInsert {
  id?: string;
  organization_id: string;
  user_id: string;
  name?: string | null;
  slug: string;
  link_type?: string | null;
  duration_minutes?: number;
  buffer_before?: number | null;
  buffer_after?: number | null;
  availability_rules?: Json | null;
  booking_window_days?: number | null;
  min_notice_hours?: number | null;
  questions?: Json | null;
  confirmation_message?: string | null;
  reminder_settings?: Json | null;
  calendar_connection_id?: string | null;
  meeting_location?: string | null;
  meeting_provider?: string | null;
  is_active?: boolean | null;
  bookings_count?: number | null;
  created_at?: string | null;
  updated_at?: string | null;
}

export interface SchedulingLinksUpdate {
  id?: string;
  organization_id?: string;
  user_id?: string;
  name?: string | null;
  slug?: string;
  link_type?: string | null;
  duration_minutes?: number;
  buffer_before?: number | null;
  buffer_after?: number | null;
  availability_rules?: Json | null;
  booking_window_days?: number | null;
  min_notice_hours?: number | null;
  questions?: Json | null;
  confirmation_message?: string | null;
  reminder_settings?: Json | null;
  calendar_connection_id?: string | null;
  meeting_location?: string | null;
  meeting_provider?: string | null;
  is_active?: boolean | null;
  bookings_count?: number | null;
  created_at?: string | null;
  updated_at?: string | null;
}

// ────────────────────────────────────────────
// scorecard_aggregations
// ────────────────────────────────────────────
export interface ScorecardAggregationsRow {
  organization_id: string | null;
  interview_round_id: string | null;
  scorecard_instance_id: string | null;
  template_id: string | null;
  interviewer_user_id: string | null;
  status: string | null;
  submitted_at: string | null;
  response_count: number | null;
  last_response_at: string | null;
}

export interface ScorecardAggregationsInsert {
  organization_id?: string | null;
  interview_round_id?: string | null;
  scorecard_instance_id?: string | null;
  template_id?: string | null;
  interviewer_user_id?: string | null;
  status?: string | null;
  submitted_at?: string | null;
  response_count?: number | null;
  last_response_at?: string | null;
}

export interface ScorecardAggregationsUpdate {
  organization_id?: string | null;
  interview_round_id?: string | null;
  scorecard_instance_id?: string | null;
  template_id?: string | null;
  interviewer_user_id?: string | null;
  status?: string | null;
  submitted_at?: string | null;
  response_count?: number | null;
  last_response_at?: string | null;
}

// ────────────────────────────────────────────
// scorecard_instances
// ────────────────────────────────────────────
export interface ScorecardInstancesRow {
  id: string;
  organization_id: string;
  interview_round_id: string;
  template_id: string;
  interviewer_user_id: string;
  due_at: string | null;
  lock_at: string | null;
  status: string;
  submitted_at: string | null;
  created_at: string;
}

export interface ScorecardInstancesInsert {
  id?: string;
  organization_id: string;
  interview_round_id: string;
  template_id: string;
  interviewer_user_id: string;
  due_at?: string | null;
  lock_at?: string | null;
  status?: string;
  submitted_at?: string | null;
  created_at?: string;
}

export interface ScorecardInstancesUpdate {
  id?: string;
  organization_id?: string;
  interview_round_id?: string;
  template_id?: string;
  interviewer_user_id?: string;
  due_at?: string | null;
  lock_at?: string | null;
  status?: string;
  submitted_at?: string | null;
  created_at?: string;
}

// ────────────────────────────────────────────
// scorecard_responses
// ────────────────────────────────────────────
export interface ScorecardResponsesRow {
  id: string;
  organization_id: string;
  scorecard_instance_id: string;
  responses: Json;
  created_by_user_id: string;
  created_at: string;
}

export interface ScorecardResponsesInsert {
  id?: string;
  organization_id: string;
  scorecard_instance_id: string;
  responses: Json;
  created_by_user_id: string;
  created_at?: string;
}

export interface ScorecardResponsesUpdate {
  id?: string;
  organization_id?: string;
  scorecard_instance_id?: string;
  responses?: Json;
  created_by_user_id?: string;
  created_at?: string;
}

// ────────────────────────────────────────────
// scorecard_templates
// ────────────────────────────────────────────
export interface ScorecardTemplatesRow {
  id: string;
  organization_id: string;
  name: string;
  schema: Json;
  rubric_version: number;
  is_active: boolean;
  created_at: string;
}

export interface ScorecardTemplatesInsert {
  id?: string;
  organization_id: string;
  name: string;
  schema: Json;
  rubric_version?: number;
  is_active?: boolean;
  created_at?: string;
}

export interface ScorecardTemplatesUpdate {
  id?: string;
  organization_id?: string;
  name?: string;
  schema?: Json;
  rubric_version?: number;
  is_active?: boolean;
  created_at?: string;
}

// ────────────────────────────────────────────
// scorecards
// ────────────────────────────────────────────
export interface ScorecardsRow {
  id: string | null;
  organization_id: string | null;
  interview_round_id: string | null;
  template_id: string | null;
  interviewer_user_id: string | null;
  due_at: string | null;
  lock_at: string | null;
  status: string | null;
  submitted_at: string | null;
  created_at: string | null;
}

export interface ScorecardsInsert {
  id?: string | null;
  organization_id?: string | null;
  interview_round_id?: string | null;
  template_id?: string | null;
  interviewer_user_id?: string | null;
  due_at?: string | null;
  lock_at?: string | null;
  status?: string | null;
  submitted_at?: string | null;
  created_at?: string | null;
}

export interface ScorecardsUpdate {
  id?: string | null;
  organization_id?: string | null;
  interview_round_id?: string | null;
  template_id?: string | null;
  interviewer_user_id?: string | null;
  due_at?: string | null;
  lock_at?: string | null;
  status?: string | null;
  submitted_at?: string | null;
  created_at?: string | null;
}

// ────────────────────────────────────────────
// search_history
// ────────────────────────────────────────────
export interface SearchHistoryRow {
  id: string;
  organization_id: string;
  user_id: string;
  search_type: string | null;
  query_text: string | null;
  filters: Json | null;
  results_count: number | null;
  clicked_results: Json | null;
  search_duration_ms: number | null;
  created_at: string | null;
}

export interface SearchHistoryInsert {
  id?: string;
  organization_id: string;
  user_id: string;
  search_type?: string | null;
  query_text?: string | null;
  filters?: Json | null;
  results_count?: number | null;
  clicked_results?: Json | null;
  search_duration_ms?: number | null;
  created_at?: string | null;
}

export interface SearchHistoryUpdate {
  id?: string;
  organization_id?: string;
  user_id?: string;
  search_type?: string | null;
  query_text?: string | null;
  filters?: Json | null;
  results_count?: number | null;
  clicked_results?: Json | null;
  search_duration_ms?: number | null;
  created_at?: string | null;
}

// ────────────────────────────────────────────
// settings
// ────────────────────────────────────────────
export interface SettingsRow {
  id: string;
  organization_id: string;
  key: string;
  value: Json | null;
  status: string | null;
  created_at: string | null;
  updated_at: string | null;
  created_by: string | null;
  updated_by: string | null;
}

export interface SettingsInsert {
  id?: string;
  organization_id: string;
  key: string;
  value?: Json | null;
  status?: string | null;
  created_at?: string | null;
  updated_at?: string | null;
  created_by?: string | null;
  updated_by?: string | null;
}

export interface SettingsUpdate {
  id?: string;
  organization_id?: string;
  key?: string;
  value?: Json | null;
  status?: string | null;
  created_at?: string | null;
  updated_at?: string | null;
  created_by?: string | null;
  updated_by?: string | null;
}

// ────────────────────────────────────────────
// skill_profiles
// ────────────────────────────────────────────
export interface SkillProfilesRow {
  id: string;
  profile_name: string;
  role_title: string | null;
  seniority_level: string | null;
  industry: string | null;
  required_skills: Json | null;
  preferred_skills: Json | null;
  years_experience_min: number | null;
  years_experience_max: number | null;
  compensation_benchmark: Json | null;
  demand_index: number | null;
  last_updated: string | null;
  metadata: Json | null;
  created_at: string | null;
}

export interface SkillProfilesInsert {
  id?: string;
  profile_name: string;
  role_title?: string | null;
  seniority_level?: string | null;
  industry?: string | null;
  required_skills?: Json | null;
  preferred_skills?: Json | null;
  years_experience_min?: number | null;
  years_experience_max?: number | null;
  compensation_benchmark?: Json | null;
  demand_index?: number | null;
  last_updated?: string | null;
  metadata?: Json | null;
  created_at?: string | null;
}

export interface SkillProfilesUpdate {
  id?: string;
  profile_name?: string;
  role_title?: string | null;
  seniority_level?: string | null;
  industry?: string | null;
  required_skills?: Json | null;
  preferred_skills?: Json | null;
  years_experience_min?: number | null;
  years_experience_max?: number | null;
  compensation_benchmark?: Json | null;
  demand_index?: number | null;
  last_updated?: string | null;
  metadata?: Json | null;
  created_at?: string | null;
}

// ────────────────────────────────────────────
// skills_taxonomy
// ────────────────────────────────────────────
export interface SkillsTaxonomyRow {
  id: string;
  skill_name: string;
  skill_category: string | null;
  skill_subcategory: string | null;
  linkedin_skill_id: string | null;
  synonyms: string[] | null;
  related_skills: string[] | null;
  proficiency_levels: string[] | null;
  demand_score: number | null;
  growth_rate: number | null;
  avg_years_to_master: number | null;
  certifications: string[] | null;
  is_active: boolean | null;
  metadata: Json | null;
  created_at: string | null;
  updated_at: string | null;
}

export interface SkillsTaxonomyInsert {
  id?: string;
  skill_name: string;
  skill_category?: string | null;
  skill_subcategory?: string | null;
  linkedin_skill_id?: string | null;
  synonyms?: string[] | null;
  related_skills?: string[] | null;
  proficiency_levels?: string[] | null;
  demand_score?: number | null;
  growth_rate?: number | null;
  avg_years_to_master?: number | null;
  certifications?: string[] | null;
  is_active?: boolean | null;
  metadata?: Json | null;
  created_at?: string | null;
  updated_at?: string | null;
}

export interface SkillsTaxonomyUpdate {
  id?: string;
  skill_name?: string;
  skill_category?: string | null;
  skill_subcategory?: string | null;
  linkedin_skill_id?: string | null;
  synonyms?: string[] | null;
  related_skills?: string[] | null;
  proficiency_levels?: string[] | null;
  demand_score?: number | null;
  growth_rate?: number | null;
  avg_years_to_master?: number | null;
  certifications?: string[] | null;
  is_active?: boolean | null;
  metadata?: Json | null;
  created_at?: string | null;
  updated_at?: string | null;
}

// ────────────────────────────────────────────
// sms_campaign_recipients
// ────────────────────────────────────────────
export interface SmsCampaignRecipientsRow {
  id: string;
  campaign_id: string;
  candidate_id: string | null;
  candidate_name: string;
  phone_number: string;
  status: string;
  twilio_message_sid: string | null;
  sent_at: string | null;
  delivered_at: string | null;
  failed_at: string | null;
  error_code: string | null;
  error_message: string | null;
  created_at: string;
  updated_at: string;
}

export interface SmsCampaignRecipientsInsert {
  id?: string;
  campaign_id: string;
  candidate_id?: string | null;
  candidate_name: string;
  phone_number: string;
  status?: string;
  twilio_message_sid?: string | null;
  sent_at?: string | null;
  delivered_at?: string | null;
  failed_at?: string | null;
  error_code?: string | null;
  error_message?: string | null;
  created_at?: string;
  updated_at?: string;
}

export interface SmsCampaignRecipientsUpdate {
  id?: string;
  campaign_id?: string;
  candidate_id?: string | null;
  candidate_name?: string;
  phone_number?: string;
  status?: string;
  twilio_message_sid?: string | null;
  sent_at?: string | null;
  delivered_at?: string | null;
  failed_at?: string | null;
  error_code?: string | null;
  error_message?: string | null;
  created_at?: string;
  updated_at?: string;
}

// ────────────────────────────────────────────
// sms_campaigns
// ────────────────────────────────────────────
export interface SmsCampaignsRow {
  id: string;
  name: string;
  message: string;
  status: string;
  scheduled_at: string | null;
  timezone: string | null;
  organization_id: string;
  created_by: string | null;
  created_at: string;
  updated_at: string;
}

export interface SmsCampaignsInsert {
  id?: string;
  name: string;
  message: string;
  status?: string;
  scheduled_at?: string | null;
  timezone?: string | null;
  organization_id: string;
  created_by?: string | null;
  created_at?: string;
  updated_at?: string;
}

export interface SmsCampaignsUpdate {
  id?: string;
  name?: string;
  message?: string;
  status?: string;
  scheduled_at?: string | null;
  timezone?: string | null;
  organization_id?: string;
  created_by?: string | null;
  created_at?: string;
  updated_at?: string;
}

// ────────────────────────────────────────────
// sms_recipients
// ────────────────────────────────────────────
export interface SmsRecipientsRow {
  id: string;
  campaign_id: string;
  candidate_id: string | null;
  phone_number: string;
  candidate_name: string | null;
  personalized_message: string | null;
  status: string | null;
  message_sid: string | null;
  sent_at: string | null;
  delivered_at: string | null;
  failed_at: string | null;
  error_code: string | null;
  error_message: string | null;
  metadata: Json | null;
  created_at: string | null;
  updated_at: string | null;
}

export interface SmsRecipientsInsert {
  id?: string;
  campaign_id: string;
  candidate_id?: string | null;
  phone_number: string;
  candidate_name?: string | null;
  personalized_message?: string | null;
  status?: string | null;
  message_sid?: string | null;
  sent_at?: string | null;
  delivered_at?: string | null;
  failed_at?: string | null;
  error_code?: string | null;
  error_message?: string | null;
  metadata?: Json | null;
  created_at?: string | null;
  updated_at?: string | null;
}

export interface SmsRecipientsUpdate {
  id?: string;
  campaign_id?: string;
  candidate_id?: string | null;
  phone_number?: string;
  candidate_name?: string | null;
  personalized_message?: string | null;
  status?: string | null;
  message_sid?: string | null;
  sent_at?: string | null;
  delivered_at?: string | null;
  failed_at?: string | null;
  error_code?: string | null;
  error_message?: string | null;
  metadata?: Json | null;
  created_at?: string | null;
  updated_at?: string | null;
}

// ────────────────────────────────────────────
// sms_templates
// ────────────────────────────────────────────
export interface SmsTemplatesRow {
  id: string;
  name: string;
  content: string;
  description: string | null;
  category: string;
  variables: Json | null;
  usage_count: number;
  last_used_at: string | null;
  is_system: boolean;
  organization_id: string;
  created_by: string;
  created_at: string;
  updated_at: string;
}

export interface SmsTemplatesInsert {
  id?: string;
  name: string;
  content: string;
  description?: string | null;
  category?: string;
  variables?: Json | null;
  usage_count?: number;
  last_used_at?: string | null;
  is_system?: boolean;
  organization_id: string;
  created_by: string;
  created_at?: string;
  updated_at?: string;
}

export interface SmsTemplatesUpdate {
  id?: string;
  name?: string;
  content?: string;
  description?: string | null;
  category?: string;
  variables?: Json | null;
  usage_count?: number;
  last_used_at?: string | null;
  is_system?: boolean;
  organization_id?: string;
  created_by?: string;
  created_at?: string;
  updated_at?: string;
}

// ────────────────────────────────────────────
// social_shares
// ────────────────────────────────────────────
export interface SocialSharesRow {
  id: string;
  organization_id: string;
  shared_by: string;
  shared_by_type: string | null;
  content_type: string;
  content_id: string;
  platform: string;
  tracking_code: string;
  share_url: string;
  share_text: string | null;
  views: number | null;
  clicks: number | null;
  conversions: number | null;
  created_at: string | null;
}

export interface SocialSharesInsert {
  id?: string;
  organization_id: string;
  shared_by: string;
  shared_by_type?: string | null;
  content_type: string;
  content_id: string;
  platform: string;
  tracking_code: string;
  share_url: string;
  share_text?: string | null;
  views?: number | null;
  clicks?: number | null;
  conversions?: number | null;
  created_at?: string | null;
}

export interface SocialSharesUpdate {
  id?: string;
  organization_id?: string;
  shared_by?: string;
  shared_by_type?: string | null;
  content_type?: string;
  content_id?: string;
  platform?: string;
  tracking_code?: string;
  share_url?: string;
  share_text?: string | null;
  views?: number | null;
  clicks?: number | null;
  conversions?: number | null;
  created_at?: string | null;
}

// ────────────────────────────────────────────
// starts
// ────────────────────────────────────────────
export interface StartsRow {
  id: string;
  organization_id: string;
  offer_id: string | null;
  candidate_id: string;
  job_id: string | null;
  start_date: string;
  employment_type: string;
  status: string;
  created_at: string;
}

export interface StartsInsert {
  id?: string;
  organization_id: string;
  offer_id?: string | null;
  candidate_id: string;
  job_id?: string | null;
  start_date: string;
  employment_type: string;
  status?: string;
  created_at?: string;
}

export interface StartsUpdate {
  id?: string;
  organization_id?: string;
  offer_id?: string | null;
  candidate_id?: string;
  job_id?: string | null;
  start_date?: string;
  employment_type?: string;
  status?: string;
  created_at?: string;
}

// ────────────────────────────────────────────
// submission_packages
// ────────────────────────────────────────────
export interface SubmissionPackagesRow {
  id: string;
  workspace_id: string;
  title: string;
  description: string | null;
  candidate_ids: string[];
  job_id: string | null;
  submission_data: Json;
  redact_email: boolean | null;
  redact_phone: boolean | null;
  redact_full_name: boolean | null;
  redact_address: boolean | null;
  share_token: string | null;
  share_password_hash: string | null;
  share_expires_at: string | null;
  share_view_count: number | null;
  status: string;
  created_by: string;
  created_at: string;
  updated_at: string;
  submitted_at: string | null;
  submittal_id: string | null;
  organization_id: string;
}

export interface SubmissionPackagesInsert {
  id?: string;
  workspace_id: string;
  title: string;
  description?: string | null;
  candidate_ids: string[];
  job_id?: string | null;
  submission_data: Json;
  redact_email?: boolean | null;
  redact_phone?: boolean | null;
  redact_full_name?: boolean | null;
  redact_address?: boolean | null;
  share_token?: string | null;
  share_password_hash?: string | null;
  share_expires_at?: string | null;
  share_view_count?: number | null;
  status?: string;
  created_by: string;
  created_at?: string;
  updated_at?: string;
  submitted_at?: string | null;
  submittal_id?: string | null;
  organization_id: string;
}

export interface SubmissionPackagesUpdate {
  id?: string;
  workspace_id?: string;
  title?: string;
  description?: string | null;
  candidate_ids?: string[];
  job_id?: string | null;
  submission_data?: Json;
  redact_email?: boolean | null;
  redact_phone?: boolean | null;
  redact_full_name?: boolean | null;
  redact_address?: boolean | null;
  share_token?: string | null;
  share_password_hash?: string | null;
  share_expires_at?: string | null;
  share_view_count?: number | null;
  status?: string;
  created_by?: string;
  created_at?: string;
  updated_at?: string;
  submitted_at?: string | null;
  submittal_id?: string | null;
  organization_id?: string;
}

// ────────────────────────────────────────────
// submissions
// ────────────────────────────────────────────
export interface SubmissionsRow {
  id: string;
  organization_id: string;
  candidate_id: string | null;
  job_id: string | null;
  submitted_by: string | null;
  status: string | null;
  cover_letter: string | null;
  ai_match_score: number | null;
  ai_analysis: Json | null;
  submitted_at: string | null;
  created_at: string | null;
  updated_at: string | null;
  rejection_reason: string | null;
  withdrawal_reason: string | null;
  is_marketplace_submission: boolean | null;
  agency_id: string | null;
  pitch_message: string | null;
}

export interface SubmissionsInsert {
  id?: string;
  organization_id: string;
  candidate_id?: string | null;
  job_id?: string | null;
  submitted_by?: string | null;
  status?: string | null;
  cover_letter?: string | null;
  ai_match_score?: number | null;
  ai_analysis?: Json | null;
  submitted_at?: string | null;
  created_at?: string | null;
  updated_at?: string | null;
  rejection_reason?: string | null;
  withdrawal_reason?: string | null;
  is_marketplace_submission?: boolean | null;
  agency_id?: string | null;
  pitch_message?: string | null;
}

export interface SubmissionsUpdate {
  id?: string;
  organization_id?: string;
  candidate_id?: string | null;
  job_id?: string | null;
  submitted_by?: string | null;
  status?: string | null;
  cover_letter?: string | null;
  ai_match_score?: number | null;
  ai_analysis?: Json | null;
  submitted_at?: string | null;
  created_at?: string | null;
  updated_at?: string | null;
  rejection_reason?: string | null;
  withdrawal_reason?: string | null;
  is_marketplace_submission?: boolean | null;
  agency_id?: string | null;
  pitch_message?: string | null;
}

// ────────────────────────────────────────────
// submittals
// ────────────────────────────────────────────
export interface SubmittalsRow {
  id: string;
  workspace_id: string;
  candidate_id: string;
  job_id: string;
  application_id: string | null;
  recruiter_id: string;
  linkedin_url: string | null;
  phone: string | null;
  email: string | null;
  location_text: string | null;
  employment_type: string;
  comp_unit: string;
  comp_value: number | null;
  currency_code: string;
  interview_availability: Json | null;
  start_availability: string | null;
  ai_summary: string | null;
  final_summary: string | null;
  recruiter_edits_delta: Json | null;
  resume_document_id: string | null;
  score_snapshot: Json | null;
  risk_flags: Json;
  confidence_score: number | null;
  state: string;
  created_at: string;
  updated_at: string;
  client_channel: string;
  organization_id: string;
}

export interface SubmittalsInsert {
  id?: string;
  workspace_id: string;
  candidate_id: string;
  job_id: string;
  application_id?: string | null;
  recruiter_id: string;
  linkedin_url?: string | null;
  phone?: string | null;
  email?: string | null;
  location_text?: string | null;
  employment_type: string;
  comp_unit: string;
  comp_value?: number | null;
  currency_code?: string;
  interview_availability?: Json | null;
  start_availability?: string | null;
  ai_summary?: string | null;
  final_summary?: string | null;
  recruiter_edits_delta?: Json | null;
  resume_document_id?: string | null;
  score_snapshot?: Json | null;
  risk_flags?: Json;
  confidence_score?: number | null;
  state?: string;
  created_at?: string;
  updated_at?: string;
  client_channel?: string;
  organization_id: string;
}

export interface SubmittalsUpdate {
  id?: string;
  workspace_id?: string;
  candidate_id?: string;
  job_id?: string;
  application_id?: string | null;
  recruiter_id?: string;
  linkedin_url?: string | null;
  phone?: string | null;
  email?: string | null;
  location_text?: string | null;
  employment_type?: string;
  comp_unit?: string;
  comp_value?: number | null;
  currency_code?: string;
  interview_availability?: Json | null;
  start_availability?: string | null;
  ai_summary?: string | null;
  final_summary?: string | null;
  recruiter_edits_delta?: Json | null;
  resume_document_id?: string | null;
  score_snapshot?: Json | null;
  risk_flags?: Json;
  confidence_score?: number | null;
  state?: string;
  created_at?: string;
  updated_at?: string;
  client_channel?: string;
  organization_id?: string;
}

// ────────────────────────────────────────────
// subscription_metrics
// ────────────────────────────────────────────
export interface SubscriptionMetricsRow {
  product_type: string | null;
  tier: string | null;
  active_subscriptions: number | null;
  mrr: number | null;
  arr: number | null;
  avg_price: number | null;
  trials: number | null;
  churning: number | null;
}

export interface SubscriptionMetricsInsert {
  product_type?: string | null;
  tier?: string | null;
  active_subscriptions?: number | null;
  mrr?: number | null;
  arr?: number | null;
  avg_price?: number | null;
  trials?: number | null;
  churning?: number | null;
}

export interface SubscriptionMetricsUpdate {
  product_type?: string | null;
  tier?: string | null;
  active_subscriptions?: number | null;
  mrr?: number | null;
  arr?: number | null;
  avg_price?: number | null;
  trials?: number | null;
  churning?: number | null;
}

// ────────────────────────────────────────────
// subscriptions
// ────────────────────────────────────────────
export interface SubscriptionsRow {
  id: string;
  organization_id: string;
  subscriber_id: string;
  subscriber_type: string;
  subscriber_email: string | null;
  plan_id: string;
  plan_name: string;
  tier: string;
  product_type: string;
  price: number;
  interval: string;
  currency: string | null;
  status: string | null;
  trial_ends_at: string | null;
  current_period_start: string;
  current_period_end: string;
  cancel_at_period_end: boolean | null;
  canceled_at: string | null;
  stripe_subscription_id: string | null;
  stripe_customer_id: string | null;
  stripe_price_id: string | null;
  usage: Json | null;
  limits: Json;
  created_at: string | null;
  updated_at: string | null;
}

export interface SubscriptionsInsert {
  id?: string;
  organization_id: string;
  subscriber_id: string;
  subscriber_type: string;
  subscriber_email?: string | null;
  plan_id: string;
  plan_name: string;
  tier: string;
  product_type: string;
  price: number;
  interval: string;
  currency?: string | null;
  status?: string | null;
  trial_ends_at?: string | null;
  current_period_start: string;
  current_period_end: string;
  cancel_at_period_end?: boolean | null;
  canceled_at?: string | null;
  stripe_subscription_id?: string | null;
  stripe_customer_id?: string | null;
  stripe_price_id?: string | null;
  usage?: Json | null;
  limits?: Json;
  created_at?: string | null;
  updated_at?: string | null;
}

export interface SubscriptionsUpdate {
  id?: string;
  organization_id?: string;
  subscriber_id?: string;
  subscriber_type?: string;
  subscriber_email?: string | null;
  plan_id?: string;
  plan_name?: string;
  tier?: string;
  product_type?: string;
  price?: number;
  interval?: string;
  currency?: string | null;
  status?: string | null;
  trial_ends_at?: string | null;
  current_period_start?: string;
  current_period_end?: string;
  cancel_at_period_end?: boolean | null;
  canceled_at?: string | null;
  stripe_subscription_id?: string | null;
  stripe_customer_id?: string | null;
  stripe_price_id?: string | null;
  usage?: Json | null;
  limits?: Json;
  created_at?: string | null;
  updated_at?: string | null;
}

// ────────────────────────────────────────────
// tags
// ────────────────────────────────────────────
export interface TagsRow {
  id: string;
  workspace_id: string;
  name: string;
  color: string | null;
  description: string | null;
  tag_type: string | null;
  created_at: string;
  organization_id: string;
}

export interface TagsInsert {
  id?: string;
  workspace_id: string;
  name: string;
  color?: string | null;
  description?: string | null;
  tag_type?: string | null;
  created_at?: string;
  organization_id: string;
}

export interface TagsUpdate {
  id?: string;
  workspace_id?: string;
  name?: string;
  color?: string | null;
  description?: string | null;
  tag_type?: string | null;
  created_at?: string;
  organization_id?: string;
}

// ────────────────────────────────────────────
// talent_pool_members
// ────────────────────────────────────────────
export interface TalentPoolMembersRow {
  id: string;
  pool_id: string;
  candidate_id: string;
  added_at: string | null;
  organization_id: string;
}

export interface TalentPoolMembersInsert {
  id?: string;
  pool_id: string;
  candidate_id: string;
  added_at?: string | null;
  organization_id: string;
}

export interface TalentPoolMembersUpdate {
  id?: string;
  pool_id?: string;
  candidate_id?: string;
  added_at?: string | null;
  organization_id?: string;
}

// ────────────────────────────────────────────
// talent_pools
// ────────────────────────────────────────────
export interface TalentPoolsRow {
  id: string;
  name: string;
  description: string | null;
  color: string | null;
  created_at: string | null;
  updated_at: string | null;
  organization_id: string;
}

export interface TalentPoolsInsert {
  id?: string;
  name: string;
  description?: string | null;
  color?: string | null;
  created_at?: string | null;
  updated_at?: string | null;
  organization_id: string;
}

export interface TalentPoolsUpdate {
  id?: string;
  name?: string;
  description?: string | null;
  color?: string | null;
  created_at?: string | null;
  updated_at?: string | null;
  organization_id?: string;
}

// ────────────────────────────────────────────
// task_rules
// ────────────────────────────────────────────
export interface TaskRulesRow {
  id: string;
  organization_id: string;
  name: string;
  event_topic: string;
  conditions: Json | null;
  actions: Json;
  priority: number;
  is_active: boolean;
  created_at: string;
}

export interface TaskRulesInsert {
  id?: string;
  organization_id: string;
  name: string;
  event_topic: string;
  conditions?: Json | null;
  actions: Json;
  priority?: number;
  is_active?: boolean;
  created_at?: string;
}

export interface TaskRulesUpdate {
  id?: string;
  organization_id?: string;
  name?: string;
  event_topic?: string;
  conditions?: Json | null;
  actions?: Json;
  priority?: number;
  is_active?: boolean;
  created_at?: string;
}

// ────────────────────────────────────────────
// tasks
// ────────────────────────────────────────────
export interface TasksRow {
  id: string;
  tenant_id: string;
  title: string;
  description: string | null;
  task_type: string;
  priority: string;
  status: string;
  assigned_to_user_id: string | null;
  related_entity_type: string | null;
  related_entity_id: string | null;
  due_at: string | null;
  sla_at: string | null;
  completed_at: string | null;
  metadata: Json | null;
  created_at: string;
  updated_at: string;
  organization_id: string;
}

export interface TasksInsert {
  id?: string;
  tenant_id: string;
  title: string;
  description?: string | null;
  task_type: string;
  priority?: string;
  status?: string;
  assigned_to_user_id?: string | null;
  related_entity_type?: string | null;
  related_entity_id?: string | null;
  due_at?: string | null;
  sla_at?: string | null;
  completed_at?: string | null;
  metadata?: Json | null;
  created_at?: string;
  updated_at?: string;
  organization_id: string;
}

export interface TasksUpdate {
  id?: string;
  tenant_id?: string;
  title?: string;
  description?: string | null;
  task_type?: string;
  priority?: string;
  status?: string;
  assigned_to_user_id?: string | null;
  related_entity_type?: string | null;
  related_entity_id?: string | null;
  due_at?: string | null;
  sla_at?: string | null;
  completed_at?: string | null;
  metadata?: Json | null;
  created_at?: string;
  updated_at?: string;
  organization_id?: string;
}

// ────────────────────────────────────────────
// team_invitations
// ────────────────────────────────────────────
export interface TeamInvitationsRow {
  id: string;
  organization_id: string;
  company_id: string;
  invited_by: string | null;
  email: string;
  name: string | null;
  role: string;
  invitation_code: string;
  status: string | null;
  accepted_by: string | null;
  accepted_at: string | null;
  created_at: string | null;
  expires_at: string | null;
}

export interface TeamInvitationsInsert {
  id?: string;
  organization_id: string;
  company_id: string;
  invited_by?: string | null;
  email: string;
  name?: string | null;
  role: string;
  invitation_code: string;
  status?: string | null;
  accepted_by?: string | null;
  accepted_at?: string | null;
  created_at?: string | null;
  expires_at?: string | null;
}

export interface TeamInvitationsUpdate {
  id?: string;
  organization_id?: string;
  company_id?: string;
  invited_by?: string | null;
  email?: string;
  name?: string | null;
  role?: string;
  invitation_code?: string;
  status?: string | null;
  accepted_by?: string | null;
  accepted_at?: string | null;
  created_at?: string | null;
  expires_at?: string | null;
}

// ────────────────────────────────────────────
// teams
// ────────────────────────────────────────────
export interface TeamsRow {
  id: string;
  organization_id: string;
  name: string;
  description: string | null;
  status: string | null;
  created_at: string | null;
  updated_at: string | null;
  created_by: string | null;
  updated_by: string | null;
}

export interface TeamsInsert {
  id?: string;
  organization_id: string;
  name: string;
  description?: string | null;
  status?: string | null;
  created_at?: string | null;
  updated_at?: string | null;
  created_by?: string | null;
  updated_by?: string | null;
}

export interface TeamsUpdate {
  id?: string;
  organization_id?: string;
  name?: string;
  description?: string | null;
  status?: string | null;
  created_at?: string | null;
  updated_at?: string | null;
  created_by?: string | null;
  updated_by?: string | null;
}

// ────────────────────────────────────────────
// templates
// ────────────────────────────────────────────
export interface TemplatesRow {
  id: string;
  organization_id: string;
  name: string;
  description: string | null;
  template_type: string;
  category: string | null;
  content: string;
  subject: string | null;
  variables: string[] | null;
  is_active: boolean;
  is_default: boolean;
  usage_count: number;
  last_used_at: string | null;
  owner_id: string | null;
  owner_name: string | null;
  tags: string[] | null;
  metadata: Json | null;
  created_at: string;
  updated_at: string;
  created_by: string | null;
  updated_by: string | null;
}

export interface TemplatesInsert {
  id?: string;
  organization_id: string;
  name: string;
  description?: string | null;
  template_type: string;
  category?: string | null;
  content: string;
  subject?: string | null;
  variables?: string[] | null;
  is_active?: boolean;
  is_default?: boolean;
  usage_count?: number;
  last_used_at?: string | null;
  owner_id?: string | null;
  owner_name?: string | null;
  tags?: string[] | null;
  metadata?: Json | null;
  created_at?: string;
  updated_at?: string;
  created_by?: string | null;
  updated_by?: string | null;
}

export interface TemplatesUpdate {
  id?: string;
  organization_id?: string;
  name?: string;
  description?: string | null;
  template_type?: string;
  category?: string | null;
  content?: string;
  subject?: string | null;
  variables?: string[] | null;
  is_active?: boolean;
  is_default?: boolean;
  usage_count?: number;
  last_used_at?: string | null;
  owner_id?: string | null;
  owner_name?: string | null;
  tags?: string[] | null;
  metadata?: Json | null;
  created_at?: string;
  updated_at?: string;
  created_by?: string | null;
  updated_by?: string | null;
}

// ────────────────────────────────────────────
// tenants
// ────────────────────────────────────────────
export interface TenantsRow {
  id: string;
  name: string;
  slug: string;
  domain: string | null;
  logo_url: string | null;
  settings: Json | null;
  features: Json | null;
  subscription_tier: string | null;
  subscription_status: string | null;
  billing_email: string | null;
  created_at: string | null;
  updated_at: string | null;
  deleted_at: string | null;
}

export interface TenantsInsert {
  id?: string;
  name: string;
  slug: string;
  domain?: string | null;
  logo_url?: string | null;
  settings?: Json | null;
  features?: Json | null;
  subscription_tier?: string | null;
  subscription_status?: string | null;
  billing_email?: string | null;
  created_at?: string | null;
  updated_at?: string | null;
  deleted_at?: string | null;
}

export interface TenantsUpdate {
  id?: string;
  name?: string;
  slug?: string;
  domain?: string | null;
  logo_url?: string | null;
  settings?: Json | null;
  features?: Json | null;
  subscription_tier?: string | null;
  subscription_status?: string | null;
  billing_email?: string | null;
  created_at?: string | null;
  updated_at?: string | null;
  deleted_at?: string | null;
}

// ────────────────────────────────────────────
// timesheets
// ────────────────────────────────────────────
export interface TimesheetsRow {
  id: string;
  organization_id: string;
  assignment_id: string | null;
  consultant_id: string | null;
  client_id: string | null;
  week_start_date: string;
  week_end_date: string;
  total_hours: number;
  regular_hours: number;
  overtime_hours: number;
  billable_hours: number;
  non_billable_hours: number;
  status: string;
  hourly_rate: number | null;
  total_amount: number | null;
  submitted_at: string | null;
  submitted_by: string | null;
  approved_at: string | null;
  approved_by: string | null;
  rejected_at: string | null;
  rejected_by: string | null;
  rejection_reason: string | null;
  notes: string | null;
  attachments: Json | null;
  time_entries: Json | null;
  tags: string[] | null;
  metadata: Json | null;
  created_at: string;
  updated_at: string;
  created_by: string | null;
  updated_by: string | null;
}

export interface TimesheetsInsert {
  id?: string;
  organization_id: string;
  assignment_id?: string | null;
  consultant_id?: string | null;
  client_id?: string | null;
  week_start_date: string;
  week_end_date: string;
  total_hours?: number;
  regular_hours?: number;
  overtime_hours?: number;
  billable_hours?: number;
  non_billable_hours?: number;
  status?: string;
  hourly_rate?: number | null;
  total_amount?: number | null;
  submitted_at?: string | null;
  submitted_by?: string | null;
  approved_at?: string | null;
  approved_by?: string | null;
  rejected_at?: string | null;
  rejected_by?: string | null;
  rejection_reason?: string | null;
  notes?: string | null;
  attachments?: Json | null;
  time_entries?: Json | null;
  tags?: string[] | null;
  metadata?: Json | null;
  created_at?: string;
  updated_at?: string;
  created_by?: string | null;
  updated_by?: string | null;
}

export interface TimesheetsUpdate {
  id?: string;
  organization_id?: string;
  assignment_id?: string | null;
  consultant_id?: string | null;
  client_id?: string | null;
  week_start_date?: string;
  week_end_date?: string;
  total_hours?: number;
  regular_hours?: number;
  overtime_hours?: number;
  billable_hours?: number;
  non_billable_hours?: number;
  status?: string;
  hourly_rate?: number | null;
  total_amount?: number | null;
  submitted_at?: string | null;
  submitted_by?: string | null;
  approved_at?: string | null;
  approved_by?: string | null;
  rejected_at?: string | null;
  rejected_by?: string | null;
  rejection_reason?: string | null;
  notes?: string | null;
  attachments?: Json | null;
  time_entries?: Json | null;
  tags?: string[] | null;
  metadata?: Json | null;
  created_at?: string;
  updated_at?: string;
  created_by?: string | null;
  updated_by?: string | null;
}

// ────────────────────────────────────────────
// top_viral_ambassadors
// ────────────────────────────────────────────
export interface TopViralAmbassadorsRow {
  user_id: string | null;
  user_type: string | null;
  total_viral_actions: number | null;
  successful_conversions: number | null;
  referrals_made: number | null;
  referrals_converted: number | null;
  shares_made: number | null;
  total_rewards_earned: number | null;
}

export interface TopViralAmbassadorsInsert {
  user_id?: string | null;
  user_type?: string | null;
  total_viral_actions?: number | null;
  successful_conversions?: number | null;
  referrals_made?: number | null;
  referrals_converted?: number | null;
  shares_made?: number | null;
  total_rewards_earned?: number | null;
}

export interface TopViralAmbassadorsUpdate {
  user_id?: string | null;
  user_type?: string | null;
  total_viral_actions?: number | null;
  successful_conversions?: number | null;
  referrals_made?: number | null;
  referrals_converted?: number | null;
  shares_made?: number | null;
  total_rewards_earned?: number | null;
}

// ────────────────────────────────────────────
// transcripts
// ────────────────────────────────────────────
export interface TranscriptsRow {
  id: string;
  organization_id: string;
  recording_asset_id: string;
  provider: string;
  status: string;
  transcript_text: string | null;
  transcript_json: Json | null;
  created_at: string;
}

export interface TranscriptsInsert {
  id?: string;
  organization_id: string;
  recording_asset_id: string;
  provider: string;
  status?: string;
  transcript_text?: string | null;
  transcript_json?: Json | null;
  created_at?: string;
}

export interface TranscriptsUpdate {
  id?: string;
  organization_id?: string;
  recording_asset_id?: string;
  provider?: string;
  status?: string;
  transcript_text?: string | null;
  transcript_json?: Json | null;
  created_at?: string;
}

// ────────────────────────────────────────────
// user_audit_log
// ────────────────────────────────────────────
export interface UserAuditLogRow {
  id: string;
  user_id: string | null;
  action: string;
  resource_type: string | null;
  resource_id: string | null;
  ip_address: string | null;
  user_agent: string | null;
  metadata: Json | null;
  created_at: string | null;
  organization_id: string;
}

export interface UserAuditLogInsert {
  id?: string;
  user_id?: string | null;
  action: string;
  resource_type?: string | null;
  resource_id?: string | null;
  ip_address?: string | null;
  user_agent?: string | null;
  metadata?: Json | null;
  created_at?: string | null;
  organization_id: string;
}

export interface UserAuditLogUpdate {
  id?: string;
  user_id?: string | null;
  action?: string;
  resource_type?: string | null;
  resource_id?: string | null;
  ip_address?: string | null;
  user_agent?: string | null;
  metadata?: Json | null;
  created_at?: string | null;
  organization_id?: string;
}

// ────────────────────────────────────────────
// user_organizations
// ────────────────────────────────────────────
export interface UserOrganizationsRow {
  id: string;
  user_id: string;
  organization_id: string;
  role: string;
  created_at: string;
  updated_at: string;
}

export interface UserOrganizationsInsert {
  id?: string;
  user_id: string;
  organization_id: string;
  role?: string;
  created_at?: string;
  updated_at?: string;
}

export interface UserOrganizationsUpdate {
  id?: string;
  user_id?: string;
  organization_id?: string;
  role?: string;
  created_at?: string;
  updated_at?: string;
}

// ────────────────────────────────────────────
// user_preferences
// ────────────────────────────────────────────
export interface UserPreferencesRow {
  id: string;
  organization_id: string;
  user_id: string;
  theme: string | null;
  language: string | null;
  timezone: string | null;
  date_format: string | null;
  time_format: string | null;
  dashboard_layout: Json | null;
  sidebar_collapsed: boolean | null;
  default_views: Json | null;
  keyboard_shortcuts_enabled: boolean | null;
  email_signature: string | null;
  out_of_office: Json | null;
  created_at: string | null;
  updated_at: string | null;
}

export interface UserPreferencesInsert {
  id?: string;
  organization_id: string;
  user_id: string;
  theme?: string | null;
  language?: string | null;
  timezone?: string | null;
  date_format?: string | null;
  time_format?: string | null;
  dashboard_layout?: Json | null;
  sidebar_collapsed?: boolean | null;
  default_views?: Json | null;
  keyboard_shortcuts_enabled?: boolean | null;
  email_signature?: string | null;
  out_of_office?: Json | null;
  created_at?: string | null;
  updated_at?: string | null;
}

export interface UserPreferencesUpdate {
  id?: string;
  organization_id?: string;
  user_id?: string;
  theme?: string | null;
  language?: string | null;
  timezone?: string | null;
  date_format?: string | null;
  time_format?: string | null;
  dashboard_layout?: Json | null;
  sidebar_collapsed?: boolean | null;
  default_views?: Json | null;
  keyboard_shortcuts_enabled?: boolean | null;
  email_signature?: string | null;
  out_of_office?: Json | null;
  created_at?: string | null;
  updated_at?: string | null;
}

// ────────────────────────────────────────────
// user_sessions
// ────────────────────────────────────────────
export interface UserSessionsRow {
  id: string;
  user_id: string;
  session_token: string;
  ip_address: string | null;
  user_agent: string | null;
  expires_at: string;
  created_at: string | null;
  organization_id: string;
}

export interface UserSessionsInsert {
  id?: string;
  user_id: string;
  session_token: string;
  ip_address?: string | null;
  user_agent?: string | null;
  expires_at: string;
  created_at?: string | null;
  organization_id: string;
}

export interface UserSessionsUpdate {
  id?: string;
  user_id?: string;
  session_token?: string;
  ip_address?: string | null;
  user_agent?: string | null;
  expires_at?: string;
  created_at?: string | null;
  organization_id?: string;
}

// ────────────────────────────────────────────
// users
// ────────────────────────────────────────────
export interface UsersRow {
  id: string;
  organization_id: string;
  email: string;
  full_name: string | null;
  role: string | null;
  is_active: boolean | null;
  created_at: string | null;
  updated_at: string | null;
  password_hash: string | null;
  avatar_url: string | null;
  last_login_at: string | null;
  metadata: Json | null;
  status: string | null;
  name: string | null;
  phone: string | null;
  permissions: Json | null;
}

export interface UsersInsert {
  id?: string;
  organization_id: string;
  email: string;
  full_name?: string | null;
  role?: string | null;
  is_active?: boolean | null;
  created_at?: string | null;
  updated_at?: string | null;
  password_hash?: string | null;
  avatar_url?: string | null;
  last_login_at?: string | null;
  metadata?: Json | null;
  status?: string | null;
  name?: string | null;
  phone?: string | null;
  permissions?: Json | null;
}

export interface UsersUpdate {
  id?: string;
  organization_id?: string;
  email?: string;
  full_name?: string | null;
  role?: string | null;
  is_active?: boolean | null;
  created_at?: string | null;
  updated_at?: string | null;
  password_hash?: string | null;
  avatar_url?: string | null;
  last_login_at?: string | null;
  metadata?: Json | null;
  status?: string | null;
  name?: string | null;
  phone?: string | null;
  permissions?: Json | null;
}

// ────────────────────────────────────────────
// v_assignment_current
// ────────────────────────────────────────────
export interface VAssignmentCurrentRow {
  assignment_id: string | null;
  workspace_id: string | null;
  state: string | null;
  start_date: string | null;
  current_end_date: string | null;
  updated_at: string | null;
}

export interface VAssignmentCurrentInsert {
  assignment_id?: string | null;
  workspace_id?: string | null;
  state?: string | null;
  start_date?: string | null;
  current_end_date?: string | null;
  updated_at?: string | null;
}

export interface VAssignmentCurrentUpdate {
  assignment_id?: string | null;
  workspace_id?: string | null;
  state?: string | null;
  start_date?: string | null;
  current_end_date?: string | null;
  updated_at?: string | null;
}

// ────────────────────────────────────────────
// v_jobs
// ────────────────────────────────────────────
export interface VJobsRow {
  id: string | null;
  organization_id: string | null;
  client_id: string | null;
  title: string | null;
  department: string | null;
  location: string | null;
  employment_type: string | null;
  experience_level: string | null;
  salary_min: number | null;
  salary_max: number | null;
  salary_currency: string | null;
  description: string | null;
  requirements: string | null;
  benefits: string | null;
  status: string | null;
  priority: string | null;
  openings: number | null;
  metadata: Json | null;
  created_at: string | null;
  updated_at: string | null;
  ats_job_id: string | null;
  external_id: number | null;
  hiring_project_id: number | null;
  hiring_project_title: string | null;
  url: string | null;
  source: string | null;
  currency: string | null;
  ai: Json | null;
}

export interface VJobsInsert {
  id?: string | null;
  organization_id?: string | null;
  client_id?: string | null;
  title?: string | null;
  department?: string | null;
  location?: string | null;
  employment_type?: string | null;
  experience_level?: string | null;
  salary_min?: number | null;
  salary_max?: number | null;
  salary_currency?: string | null;
  description?: string | null;
  requirements?: string | null;
  benefits?: string | null;
  status?: string | null;
  priority?: string | null;
  openings?: number | null;
  metadata?: Json | null;
  created_at?: string | null;
  updated_at?: string | null;
  ats_job_id?: string | null;
  external_id?: number | null;
  hiring_project_id?: number | null;
  hiring_project_title?: string | null;
  url?: string | null;
  source?: string | null;
  currency?: string | null;
  ai?: Json | null;
}

export interface VJobsUpdate {
  id?: string | null;
  organization_id?: string | null;
  client_id?: string | null;
  title?: string | null;
  department?: string | null;
  location?: string | null;
  employment_type?: string | null;
  experience_level?: string | null;
  salary_min?: number | null;
  salary_max?: number | null;
  salary_currency?: string | null;
  description?: string | null;
  requirements?: string | null;
  benefits?: string | null;
  status?: string | null;
  priority?: string | null;
  openings?: number | null;
  metadata?: Json | null;
  created_at?: string | null;
  updated_at?: string | null;
  ats_job_id?: string | null;
  external_id?: number | null;
  hiring_project_id?: number | null;
  hiring_project_title?: string | null;
  url?: string | null;
  source?: string | null;
  currency?: string | null;
  ai?: Json | null;
}

// ────────────────────────────────────────────
// v_organization_primary_tenant
// ────────────────────────────────────────────
export interface VOrganizationPrimaryTenantRow {
  organization_id: string | null;
  tenant_id: string | null;
  tenant_name: string | null;
  tenant_slug: string | null;
  domain: string | null;
  logo_url: string | null;
  subscription_tier: string | null;
  subscription_status: string | null;
  features: Json | null;
  settings: Json | null;
}

export interface VOrganizationPrimaryTenantInsert {
  organization_id?: string | null;
  tenant_id?: string | null;
  tenant_name?: string | null;
  tenant_slug?: string | null;
  domain?: string | null;
  logo_url?: string | null;
  subscription_tier?: string | null;
  subscription_status?: string | null;
  features?: Json | null;
  settings?: Json | null;
}

export interface VOrganizationPrimaryTenantUpdate {
  organization_id?: string | null;
  tenant_id?: string | null;
  tenant_name?: string | null;
  tenant_slug?: string | null;
  domain?: string | null;
  logo_url?: string | null;
  subscription_tier?: string | null;
  subscription_status?: string | null;
  features?: Json | null;
  settings?: Json | null;
}

// ────────────────────────────────────────────
// viral_events
// ────────────────────────────────────────────
export interface ViralEventsRow {
  id: string;
  organization_id: string;
  loop_type: string;
  user_id: string;
  user_type: string | null;
  action: string;
  metadata: Json | null;
  resulted_in_conversion: boolean | null;
  conversion_user_id: string | null;
  conversion_at: string | null;
  created_at: string | null;
}

export interface ViralEventsInsert {
  id?: string;
  organization_id: string;
  loop_type: string;
  user_id: string;
  user_type?: string | null;
  action: string;
  metadata?: Json | null;
  resulted_in_conversion?: boolean | null;
  conversion_user_id?: string | null;
  conversion_at?: string | null;
  created_at?: string | null;
}

export interface ViralEventsUpdate {
  id?: string;
  organization_id?: string;
  loop_type?: string;
  user_id?: string;
  user_type?: string | null;
  action?: string;
  metadata?: Json | null;
  resulted_in_conversion?: boolean | null;
  conversion_user_id?: string | null;
  conversion_at?: string | null;
  created_at?: string | null;
}

// ────────────────────────────────────────────
// viral_growth_funnel
// ────────────────────────────────────────────
export interface ViralGrowthFunnelRow {
  date: string | null;
  referrals_sent: number | null;
  shares_generated: number | null;
  invitations_sent: number | null;
  conversions: number | null;
  overall_conversion_rate: number | null;
}

export interface ViralGrowthFunnelInsert {
  date?: string | null;
  referrals_sent?: number | null;
  shares_generated?: number | null;
  invitations_sent?: number | null;
  conversions?: number | null;
  overall_conversion_rate?: number | null;
}

export interface ViralGrowthFunnelUpdate {
  date?: string | null;
  referrals_sent?: number | null;
  shares_generated?: number | null;
  invitations_sent?: number | null;
  conversions?: number | null;
  overall_conversion_rate?: number | null;
}

// ────────────────────────────────────────────
// viral_loop_performance
// ────────────────────────────────────────────
export interface ViralLoopPerformanceRow {
  loop_type: string | null;
  total_triggers: number | null;
  conversions: number | null;
  conversion_rate: number | null;
  viral_coefficient: number | null;
}

export interface ViralLoopPerformanceInsert {
  loop_type?: string | null;
  total_triggers?: number | null;
  conversions?: number | null;
  conversion_rate?: number | null;
  viral_coefficient?: number | null;
}

export interface ViralLoopPerformanceUpdate {
  loop_type?: string | null;
  total_triggers?: number | null;
  conversions?: number | null;
  conversion_rate?: number | null;
  viral_coefficient?: number | null;
}

// ────────────────────────────────────────────
// viral_referrals
// ────────────────────────────────────────────
export interface ViralReferralsRow {
  id: string;
  organization_id: string;
  referrer_id: string;
  referrer_type: string;
  referee_id: string | null;
  referee_name: string;
  referee_email: string;
  referee_phone: string | null;
  referral_code: string;
  personal_message: string | null;
  status: string | null;
  converted_at: string | null;
  first_activity_at: string | null;
  referrer_reward_type: string | null;
  referrer_reward_amount: number | null;
  referrer_reward_paid: boolean | null;
  referee_reward_type: string | null;
  referee_reward_amount: number | null;
  referee_reward_paid: boolean | null;
  created_at: string | null;
  expires_at: string | null;
}

export interface ViralReferralsInsert {
  id?: string;
  organization_id: string;
  referrer_id: string;
  referrer_type: string;
  referee_id?: string | null;
  referee_name: string;
  referee_email: string;
  referee_phone?: string | null;
  referral_code: string;
  personal_message?: string | null;
  status?: string | null;
  converted_at?: string | null;
  first_activity_at?: string | null;
  referrer_reward_type?: string | null;
  referrer_reward_amount?: number | null;
  referrer_reward_paid?: boolean | null;
  referee_reward_type?: string | null;
  referee_reward_amount?: number | null;
  referee_reward_paid?: boolean | null;
  created_at?: string | null;
  expires_at?: string | null;
}

export interface ViralReferralsUpdate {
  id?: string;
  organization_id?: string;
  referrer_id?: string;
  referrer_type?: string;
  referee_id?: string | null;
  referee_name?: string;
  referee_email?: string;
  referee_phone?: string | null;
  referral_code?: string;
  personal_message?: string | null;
  status?: string | null;
  converted_at?: string | null;
  first_activity_at?: string | null;
  referrer_reward_type?: string | null;
  referrer_reward_amount?: number | null;
  referrer_reward_paid?: boolean | null;
  referee_reward_type?: string | null;
  referee_reward_amount?: number | null;
  referee_reward_paid?: boolean | null;
  created_at?: string | null;
  expires_at?: string | null;
}

// ────────────────────────────────────────────
// viral_rewards
// ────────────────────────────────────────────
export interface ViralRewardsRow {
  id: string;
  organization_id: string;
  recipient_id: string;
  recipient_type: string | null;
  reward_type: string;
  reward_amount: number | null;
  reward_description: string;
  source_type: string;
  source_id: string | null;
  status: string | null;
  paid_at: string | null;
  payment_method: string | null;
  payment_reference: string | null;
  created_at: string | null;
  expires_at: string | null;
}

export interface ViralRewardsInsert {
  id?: string;
  organization_id: string;
  recipient_id: string;
  recipient_type?: string | null;
  reward_type: string;
  reward_amount?: number | null;
  reward_description: string;
  source_type: string;
  source_id?: string | null;
  status?: string | null;
  paid_at?: string | null;
  payment_method?: string | null;
  payment_reference?: string | null;
  created_at?: string | null;
  expires_at?: string | null;
}

export interface ViralRewardsUpdate {
  id?: string;
  organization_id?: string;
  recipient_id?: string;
  recipient_type?: string | null;
  reward_type?: string;
  reward_amount?: number | null;
  reward_description?: string;
  source_type?: string;
  source_id?: string | null;
  status?: string | null;
  paid_at?: string | null;
  payment_method?: string | null;
  payment_reference?: string | null;
  created_at?: string | null;
  expires_at?: string | null;
}

// ────────────────────────────────────────────
// webhook_deliveries
// ────────────────────────────────────────────
export interface WebhookDeliveriesRow {
  id: string;
  subscription_id: string;
  event_id: string;
  status: string;
  attempts: number;
  last_attempt_at: string | null;
  next_retry_at: string | null;
  response_code: number | null;
  response_body: string | null;
  created_at: string;
  organization_id: string;
}

export interface WebhookDeliveriesInsert {
  id?: string;
  subscription_id: string;
  event_id: string;
  status?: string;
  attempts?: number;
  last_attempt_at?: string | null;
  next_retry_at?: string | null;
  response_code?: number | null;
  response_body?: string | null;
  created_at?: string;
  organization_id: string;
}

export interface WebhookDeliveriesUpdate {
  id?: string;
  subscription_id?: string;
  event_id?: string;
  status?: string;
  attempts?: number;
  last_attempt_at?: string | null;
  next_retry_at?: string | null;
  response_code?: number | null;
  response_body?: string | null;
  created_at?: string;
  organization_id?: string;
}

// ────────────────────────────────────────────
// webhook_logs
// ────────────────────────────────────────────
export interface WebhookLogsRow {
  id: string;
  organization_id: string | null;
  provider: string;
  event_type: string;
  external_id: string | null;
  payload: Json;
  headers: Json | null;
  status: string;
  processed_at: string | null;
  error_message: string | null;
  retry_count: number | null;
  received_at: string;
  created_at: string;
}

export interface WebhookLogsInsert {
  id?: string;
  organization_id?: string | null;
  provider: string;
  event_type: string;
  external_id?: string | null;
  payload: Json;
  headers?: Json | null;
  status?: string;
  processed_at?: string | null;
  error_message?: string | null;
  retry_count?: number | null;
  received_at?: string;
  created_at?: string;
}

export interface WebhookLogsUpdate {
  id?: string;
  organization_id?: string | null;
  provider?: string;
  event_type?: string;
  external_id?: string | null;
  payload?: Json;
  headers?: Json | null;
  status?: string;
  processed_at?: string | null;
  error_message?: string | null;
  retry_count?: number | null;
  received_at?: string;
  created_at?: string;
}

// ────────────────────────────────────────────
// webhook_subscriptions
// ────────────────────────────────────────────
export interface WebhookSubscriptionsRow {
  id: string;
  tenant_id: string;
  url: string;
  secret: string;
  events: string[];
  is_active: boolean;
  created_at: string;
  organization_id: string;
  name: string | null;
  retry_strategy: Json | null;
  headers: Json | null;
  created_by: string | null;
  updated_at: string | null;
  last_triggered_at: string | null;
  failure_count: number | null;
}

export interface WebhookSubscriptionsInsert {
  id?: string;
  tenant_id: string;
  url: string;
  secret: string;
  events: string[];
  is_active?: boolean;
  created_at?: string;
  organization_id: string;
  name?: string | null;
  retry_strategy?: Json | null;
  headers?: Json | null;
  created_by?: string | null;
  updated_at?: string | null;
  last_triggered_at?: string | null;
  failure_count?: number | null;
}

export interface WebhookSubscriptionsUpdate {
  id?: string;
  tenant_id?: string;
  url?: string;
  secret?: string;
  events?: string[];
  is_active?: boolean;
  created_at?: string;
  organization_id?: string;
  name?: string | null;
  retry_strategy?: Json | null;
  headers?: Json | null;
  created_by?: string | null;
  updated_at?: string | null;
  last_triggered_at?: string | null;
  failure_count?: number | null;
}

// ────────────────────────────────────────────
// white_label_licenses
// ────────────────────────────────────────────
export interface WhiteLabelLicensesRow {
  id: string;
  organization_id: string;
  licensee_id: string;
  licensee_type: string | null;
  licensee_name: string;
  licensee_email: string;
  license_tier: string;
  can_customize_branding: boolean | null;
  can_use_custom_domain: boolean | null;
  can_customize_features: boolean | null;
  can_access_source_code: boolean | null;
  minimum_monthly_fee: number;
  revenue_share_percentage: number;
  currency: string | null;
  max_users: number | null;
  max_jobs_per_month: number | null;
  max_candidates: number | null;
  status: string | null;
  activated_at: string | null;
  licensee_revenue_this_month: number | null;
  licensee_revenue_total: number | null;
  our_share_this_month: number | null;
  our_share_total: number | null;
  stripe_subscription_id: string | null;
  created_at: string | null;
  updated_at: string | null;
}

export interface WhiteLabelLicensesInsert {
  id?: string;
  organization_id: string;
  licensee_id: string;
  licensee_type?: string | null;
  licensee_name: string;
  licensee_email: string;
  license_tier: string;
  can_customize_branding?: boolean | null;
  can_use_custom_domain?: boolean | null;
  can_customize_features?: boolean | null;
  can_access_source_code?: boolean | null;
  minimum_monthly_fee: number;
  revenue_share_percentage: number;
  currency?: string | null;
  max_users?: number | null;
  max_jobs_per_month?: number | null;
  max_candidates?: number | null;
  status?: string | null;
  activated_at?: string | null;
  licensee_revenue_this_month?: number | null;
  licensee_revenue_total?: number | null;
  our_share_this_month?: number | null;
  our_share_total?: number | null;
  stripe_subscription_id?: string | null;
  created_at?: string | null;
  updated_at?: string | null;
}

export interface WhiteLabelLicensesUpdate {
  id?: string;
  organization_id?: string;
  licensee_id?: string;
  licensee_type?: string | null;
  licensee_name?: string;
  licensee_email?: string;
  license_tier?: string;
  can_customize_branding?: boolean | null;
  can_use_custom_domain?: boolean | null;
  can_customize_features?: boolean | null;
  can_access_source_code?: boolean | null;
  minimum_monthly_fee?: number;
  revenue_share_percentage?: number;
  currency?: string | null;
  max_users?: number | null;
  max_jobs_per_month?: number | null;
  max_candidates?: number | null;
  status?: string | null;
  activated_at?: string | null;
  licensee_revenue_this_month?: number | null;
  licensee_revenue_total?: number | null;
  our_share_this_month?: number | null;
  our_share_total?: number | null;
  stripe_subscription_id?: string | null;
  created_at?: string | null;
  updated_at?: string | null;
}

// ────────────────────────────────────────────
// workflow_instances
// ────────────────────────────────────────────
export interface WorkflowInstancesRow {
  id: string;
  organization_id: string | null;
  workflow_id: string | null;
  entity_type: string;
  entity_id: string;
  current_stage: string | null;
  status: string | null;
  started_at: string | null;
  completed_at: string | null;
  metadata: Json | null;
  created_at: string | null;
  updated_at: string | null;
}

export interface WorkflowInstancesInsert {
  id?: string;
  organization_id?: string | null;
  workflow_id?: string | null;
  entity_type: string;
  entity_id: string;
  current_stage?: string | null;
  status?: string | null;
  started_at?: string | null;
  completed_at?: string | null;
  metadata?: Json | null;
  created_at?: string | null;
  updated_at?: string | null;
}

export interface WorkflowInstancesUpdate {
  id?: string;
  organization_id?: string | null;
  workflow_id?: string | null;
  entity_type?: string;
  entity_id?: string;
  current_stage?: string | null;
  status?: string | null;
  started_at?: string | null;
  completed_at?: string | null;
  metadata?: Json | null;
  created_at?: string | null;
  updated_at?: string | null;
}

// ────────────────────────────────────────────
// workflows
// ────────────────────────────────────────────
export interface WorkflowsRow {
  id: string;
  organization_id: string;
  workflow_name: string;
  workflow_type: string;
  description: string | null;
  trigger_event: string | null;
  stages: Json;
  is_active: boolean | null;
  created_by: string | null;
  created_at: string | null;
  updated_at: string | null;
}

export interface WorkflowsInsert {
  id?: string;
  organization_id: string;
  workflow_name: string;
  workflow_type: string;
  description?: string | null;
  trigger_event?: string | null;
  stages: Json;
  is_active?: boolean | null;
  created_by?: string | null;
  created_at?: string | null;
  updated_at?: string | null;
}

export interface WorkflowsUpdate {
  id?: string;
  organization_id?: string;
  workflow_name?: string;
  workflow_type?: string;
  description?: string | null;
  trigger_event?: string | null;
  stages?: Json;
  is_active?: boolean | null;
  created_by?: string | null;
  created_at?: string | null;
  updated_at?: string | null;
}

// ────────────────────────────────────────────
// workspace_members
// ────────────────────────────────────────────
export interface WorkspaceMembersRow {
  id: string;
  workspace_id: string;
  user_id: string;
  role: string;
  joined_at: string;
}

export interface WorkspaceMembersInsert {
  id?: string;
  workspace_id: string;
  user_id: string;
  role?: string;
  joined_at?: string;
}

export interface WorkspaceMembersUpdate {
  id?: string;
  workspace_id?: string;
  user_id?: string;
  role?: string;
  joined_at?: string;
}

// ────────────────────────────────────────────
// workspaces
// ────────────────────────────────────────────
export interface WorkspacesRow {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  settings: Json | null;
  created_by: string;
  created_at: string;
  updated_at: string;
  organization_id: string;
}

export interface WorkspacesInsert {
  id?: string;
  name: string;
  slug: string;
  description?: string | null;
  settings?: Json | null;
  created_by: string;
  created_at?: string;
  updated_at?: string;
  organization_id: string;
}

export interface WorkspacesUpdate {
  id?: string;
  name?: string;
  slug?: string;
  description?: string | null;
  settings?: Json | null;
  created_by?: string;
  created_at?: string;
  updated_at?: string;
  organization_id?: string;
}

/** Aggregate database table types */
export interface Database {
  public: {
    Tables: {
      action_registry: {
        Row: ActionRegistryRow;
        Insert: ActionRegistryInsert;
        Update: ActionRegistryUpdate;
      };
      activities: {
        Row: ActivitiesRow;
        Insert: ActivitiesInsert;
        Update: ActivitiesUpdate;
      };
      activity: {
        Row: ActivityRow;
        Insert: ActivityInsert;
        Update: ActivityUpdate;
      };
      activity_feed: {
        Row: ActivityFeedRow;
        Insert: ActivityFeedInsert;
        Update: ActivityFeedUpdate;
      };
      advertising_orders: {
        Row: AdvertisingOrdersRow;
        Insert: AdvertisingOrdersInsert;
        Update: AdvertisingOrdersUpdate;
      };
      agency_verifications: {
        Row: AgencyVerificationsRow;
        Insert: AgencyVerificationsInsert;
        Update: AgencyVerificationsUpdate;
      };
      ai_agents: {
        Row: AiAgentsRow;
        Insert: AiAgentsInsert;
        Update: AiAgentsUpdate;
      };
      ai_executions: {
        Row: AiExecutionsRow;
        Insert: AiExecutionsInsert;
        Update: AiExecutionsUpdate;
      };
      ai_match_explanations: {
        Row: AiMatchExplanationsRow;
        Insert: AiMatchExplanationsInsert;
        Update: AiMatchExplanationsUpdate;
      };
      ai_prompts: {
        Row: AiPromptsRow;
        Insert: AiPromptsInsert;
        Update: AiPromptsUpdate;
      };
      analytics_orders: {
        Row: AnalyticsOrdersRow;
        Insert: AnalyticsOrdersInsert;
        Update: AnalyticsOrdersUpdate;
      };
      analytics_reports: {
        Row: AnalyticsReportsRow;
        Insert: AnalyticsReportsInsert;
        Update: AnalyticsReportsUpdate;
      };
      api_keys: {
        Row: ApiKeysRow;
        Insert: ApiKeysInsert;
        Update: ApiKeysUpdate;
      };
      api_usage_logs: {
        Row: ApiUsageLogsRow;
        Insert: ApiUsageLogsInsert;
        Update: ApiUsageLogsUpdate;
      };
      app_users: {
        Row: AppUsersRow;
        Insert: AppUsersInsert;
        Update: AppUsersUpdate;
      };
      applications: {
        Row: ApplicationsRow;
        Insert: ApplicationsInsert;
        Update: ApplicationsUpdate;
      };
      assignment_extensions: {
        Row: AssignmentExtensionsRow;
        Insert: AssignmentExtensionsInsert;
        Update: AssignmentExtensionsUpdate;
      };
      assignments: {
        Row: AssignmentsRow;
        Insert: AssignmentsInsert;
        Update: AssignmentsUpdate;
      };
      assistant_conversations: {
        Row: AssistantConversationsRow;
        Insert: AssistantConversationsInsert;
        Update: AssistantConversationsUpdate;
      };
      attachments: {
        Row: AttachmentsRow;
        Insert: AttachmentsInsert;
        Update: AttachmentsUpdate;
      };
      audit_log: {
        Row: AuditLogRow;
        Insert: AuditLogInsert;
        Update: AuditLogUpdate;
      };
      audit_logs: {
        Row: AuditLogsRow;
        Insert: AuditLogsInsert;
        Update: AuditLogsUpdate;
      };
      automation_rules: {
        Row: AutomationRulesRow;
        Insert: AutomationRulesInsert;
        Update: AutomationRulesUpdate;
      };
      availability_windows: {
        Row: AvailabilityWindowsRow;
        Insert: AvailabilityWindowsInsert;
        Update: AvailabilityWindowsUpdate;
      };
      background_checks: {
        Row: BackgroundChecksRow;
        Insert: BackgroundChecksInsert;
        Update: BackgroundChecksUpdate;
      };
      bench: {
        Row: BenchRow;
        Insert: BenchInsert;
        Update: BenchUpdate;
      };
      bench_entries: {
        Row: BenchEntriesRow;
        Insert: BenchEntriesInsert;
        Update: BenchEntriesUpdate;
      };
      bench_resources: {
        Row: BenchResourcesRow;
        Insert: BenchResourcesInsert;
        Update: BenchResourcesUpdate;
      };
      billing: {
        Row: BillingRow;
        Insert: BillingInsert;
        Update: BillingUpdate;
      };
      bulk_jobs: {
        Row: BulkJobsRow;
        Insert: BulkJobsInsert;
        Update: BulkJobsUpdate;
      };
      business_rules: {
        Row: BusinessRulesRow;
        Insert: BusinessRulesInsert;
        Update: BusinessRulesUpdate;
      };
      calendar_connections: {
        Row: CalendarConnectionsRow;
        Insert: CalendarConnectionsInsert;
        Update: CalendarConnectionsUpdate;
      };
      calendar_events: {
        Row: CalendarEventsRow;
        Insert: CalendarEventsInsert;
        Update: CalendarEventsUpdate;
      };
      campaign_enrollments: {
        Row: CampaignEnrollmentsRow;
        Insert: CampaignEnrollmentsInsert;
        Update: CampaignEnrollmentsUpdate;
      };
      campaign_sequences: {
        Row: CampaignSequencesRow;
        Insert: CampaignSequencesInsert;
        Update: CampaignSequencesUpdate;
      };
      candidate_consents: {
        Row: CandidateConsentsRow;
        Insert: CandidateConsentsInsert;
        Update: CandidateConsentsUpdate;
      };
      candidate_documents: {
        Row: CandidateDocumentsRow;
        Insert: CandidateDocumentsInsert;
        Update: CandidateDocumentsUpdate;
      };
      candidate_education: {
        Row: CandidateEducationRow;
        Insert: CandidateEducationInsert;
        Update: CandidateEducationUpdate;
      };
      candidate_embeddings: {
        Row: CandidateEmbeddingsRow;
        Insert: CandidateEmbeddingsInsert;
        Update: CandidateEmbeddingsUpdate;
      };
      candidate_identities: {
        Row: CandidateIdentitiesRow;
        Insert: CandidateIdentitiesInsert;
        Update: CandidateIdentitiesUpdate;
      };
      candidate_notes: {
        Row: CandidateNotesRow;
        Insert: CandidateNotesInsert;
        Update: CandidateNotesUpdate;
      };
      candidate_portal_access: {
        Row: CandidatePortalAccessRow;
        Insert: CandidatePortalAccessInsert;
        Update: CandidatePortalAccessUpdate;
      };
      candidate_skills: {
        Row: CandidateSkillsRow;
        Insert: CandidateSkillsInsert;
        Update: CandidateSkillsUpdate;
      };
      candidate_work_history: {
        Row: CandidateWorkHistoryRow;
        Insert: CandidateWorkHistoryInsert;
        Update: CandidateWorkHistoryUpdate;
      };
      candidates: {
        Row: CandidatesRow;
        Insert: CandidatesInsert;
        Update: CandidatesUpdate;
      };
      candidates_v: {
        Row: CandidatesVRow;
        Insert: CandidatesVInsert;
        Update: CandidatesVUpdate;
      };
      client_contacts: {
        Row: ClientContactsRow;
        Insert: ClientContactsInsert;
        Update: ClientContactsUpdate;
      };
      client_contracts: {
        Row: ClientContractsRow;
        Insert: ClientContractsInsert;
        Update: ClientContractsUpdate;
      };
      client_portal_access: {
        Row: ClientPortalAccessRow;
        Insert: ClientPortalAccessInsert;
        Update: ClientPortalAccessUpdate;
      };
      client_projects: {
        Row: ClientProjectsRow;
        Insert: ClientProjectsInsert;
        Update: ClientProjectsUpdate;
      };
      clients: {
        Row: ClientsRow;
        Insert: ClientsInsert;
        Update: ClientsUpdate;
      };
      communications: {
        Row: CommunicationsRow;
        Insert: CommunicationsInsert;
        Update: CommunicationsUpdate;
      };
      comp_bands: {
        Row: CompBandsRow;
        Insert: CompBandsInsert;
        Update: CompBandsUpdate;
      };
      companies: {
        Row: CompaniesRow;
        Insert: CompaniesInsert;
        Update: CompaniesUpdate;
      };
      compliance: {
        Row: ComplianceRow;
        Insert: ComplianceInsert;
        Update: ComplianceUpdate;
      };
      consultants: {
        Row: ConsultantsRow;
        Insert: ConsultantsInsert;
        Update: ConsultantsUpdate;
      };
      contact_points: {
        Row: ContactPointsRow;
        Insert: ContactPointsInsert;
        Update: ContactPointsUpdate;
      };
      contacts: {
        Row: ContactsRow;
        Insert: ContactsInsert;
        Update: ContactsUpdate;
      };
      contracts: {
        Row: ContractsRow;
        Insert: ContractsInsert;
        Update: ContractsUpdate;
      };
      conversations: {
        Row: ConversationsRow;
        Insert: ConversationsInsert;
        Update: ConversationsUpdate;
      };
      dashboards: {
        Row: DashboardsRow;
        Insert: DashboardsInsert;
        Update: DashboardsUpdate;
      };
      decision_packets: {
        Row: DecisionPacketsRow;
        Insert: DecisionPacketsInsert;
        Update: DecisionPacketsUpdate;
      };
      documents: {
        Row: DocumentsRow;
        Insert: DocumentsInsert;
        Update: DocumentsUpdate;
      };
      eeo_data: {
        Row: EeoDataRow;
        Insert: EeoDataInsert;
        Update: EeoDataUpdate;
      };
      email_logs: {
        Row: EmailLogsRow;
        Insert: EmailLogsInsert;
        Update: EmailLogsUpdate;
      };
      email_parser_configs: {
        Row: EmailParserConfigsRow;
        Insert: EmailParserConfigsInsert;
        Update: EmailParserConfigsUpdate;
      };
      entity_tags: {
        Row: EntityTagsRow;
        Insert: EntityTagsInsert;
        Update: EntityTagsUpdate;
      };
      entity_timeline: {
        Row: EntityTimelineRow;
        Insert: EntityTimelineInsert;
        Update: EntityTimelineUpdate;
      };
      esign_envelopes: {
        Row: EsignEnvelopesRow;
        Insert: EsignEnvelopesInsert;
        Update: EsignEnvelopesUpdate;
      };
      event_outbox: {
        Row: EventOutboxRow;
        Insert: EventOutboxInsert;
        Update: EventOutboxUpdate;
      };
      expenses: {
        Row: ExpensesRow;
        Insert: ExpensesInsert;
        Update: ExpensesUpdate;
      };
      forecasts: {
        Row: ForecastsRow;
        Insert: ForecastsInsert;
        Update: ForecastsUpdate;
      };
      idempotency_keys: {
        Row: IdempotencyKeysRow;
        Insert: IdempotencyKeysInsert;
        Update: IdempotencyKeysUpdate;
      };
      import_conflicts: {
        Row: ImportConflictsRow;
        Insert: ImportConflictsInsert;
        Update: ImportConflictsUpdate;
      };
      import_jobs: {
        Row: ImportJobsRow;
        Insert: ImportJobsInsert;
        Update: ImportJobsUpdate;
      };
      import_runs: {
        Row: ImportRunsRow;
        Insert: ImportRunsInsert;
        Update: ImportRunsUpdate;
      };
      inbound_messages: {
        Row: InboundMessagesRow;
        Insert: InboundMessagesInsert;
        Update: InboundMessagesUpdate;
      };
      integration_connections: {
        Row: IntegrationConnectionsRow;
        Insert: IntegrationConnectionsInsert;
        Update: IntegrationConnectionsUpdate;
      };
      integrations: {
        Row: IntegrationsRow;
        Insert: IntegrationsInsert;
        Update: IntegrationsUpdate;
      };
      interview_feedback: {
        Row: InterviewFeedbackRow;
        Insert: InterviewFeedbackInsert;
        Update: InterviewFeedbackUpdate;
      };
      interview_intelligence: {
        Row: InterviewIntelligenceRow;
        Insert: InterviewIntelligenceInsert;
        Update: InterviewIntelligenceUpdate;
      };
      interview_plans: {
        Row: InterviewPlansRow;
        Insert: InterviewPlansInsert;
        Update: InterviewPlansUpdate;
      };
      interview_reschedule_requests: {
        Row: InterviewRescheduleRequestsRow;
        Insert: InterviewRescheduleRequestsInsert;
        Update: InterviewRescheduleRequestsUpdate;
      };
      interview_rounds: {
        Row: InterviewRoundsRow;
        Insert: InterviewRoundsInsert;
        Update: InterviewRoundsUpdate;
      };
      interviews: {
        Row: InterviewsRow;
        Insert: InterviewsInsert;
        Update: InterviewsUpdate;
      };
      invoices: {
        Row: InvoicesRow;
        Insert: InvoicesInsert;
        Update: InvoicesUpdate;
      };
      job_bias_analysis: {
        Row: JobBiasAnalysisRow;
        Insert: JobBiasAnalysisInsert;
        Update: JobBiasAnalysisUpdate;
      };
      job_board_mappings: {
        Row: JobBoardMappingsRow;
        Insert: JobBoardMappingsInsert;
        Update: JobBoardMappingsUpdate;
      };
      job_embeddings: {
        Row: JobEmbeddingsRow;
        Insert: JobEmbeddingsInsert;
        Update: JobEmbeddingsUpdate;
      };
      job_skills: {
        Row: JobSkillsRow;
        Insert: JobSkillsInsert;
        Update: JobSkillsUpdate;
      };
      jobs: {
        Row: JobsRow;
        Insert: JobsInsert;
        Update: JobsUpdate;
      };
      marketplace_activities: {
        Row: MarketplaceActivitiesRow;
        Insert: MarketplaceActivitiesInsert;
        Update: MarketplaceActivitiesUpdate;
      };
      marketplace_agencies: {
        Row: MarketplaceAgenciesRow;
        Insert: MarketplaceAgenciesInsert;
        Update: MarketplaceAgenciesUpdate;
      };
      marketplace_agency_leaderboard: {
        Row: MarketplaceAgencyLeaderboardRow;
        Insert: MarketplaceAgencyLeaderboardInsert;
        Update: MarketplaceAgencyLeaderboardUpdate;
      };
      marketplace_agency_submissions: {
        Row: MarketplaceAgencySubmissionsRow;
        Insert: MarketplaceAgencySubmissionsInsert;
        Update: MarketplaceAgencySubmissionsUpdate;
      };
      marketplace_bids: {
        Row: MarketplaceBidsRow;
        Insert: MarketplaceBidsInsert;
        Update: MarketplaceBidsUpdate;
      };
      marketplace_job_applications: {
        Row: MarketplaceJobApplicationsRow;
        Insert: MarketplaceJobApplicationsInsert;
        Update: MarketplaceJobApplicationsUpdate;
      };
      marketplace_jobs: {
        Row: MarketplaceJobsRow;
        Insert: MarketplaceJobsInsert;
        Update: MarketplaceJobsUpdate;
      };
      marketplace_metrics_summary: {
        Row: MarketplaceMetricsSummaryRow;
        Insert: MarketplaceMetricsSummaryInsert;
        Update: MarketplaceMetricsSummaryUpdate;
      };
      marketplace_reviews: {
        Row: MarketplaceReviewsRow;
        Insert: MarketplaceReviewsInsert;
        Update: MarketplaceReviewsUpdate;
      };
      marketplace_transactions: {
        Row: MarketplaceTransactionsRow;
        Insert: MarketplaceTransactionsInsert;
        Update: MarketplaceTransactionsUpdate;
      };
      match_analytics_daily_secure: {
        Row: MatchAnalyticsDailySecureRow;
        Insert: MatchAnalyticsDailySecureInsert;
        Update: MatchAnalyticsDailySecureUpdate;
      };
      match_bias_monitoring: {
        Row: MatchBiasMonitoringRow;
        Insert: MatchBiasMonitoringInsert;
        Update: MatchBiasMonitoringUpdate;
      };
      match_feedback: {
        Row: MatchFeedbackRow;
        Insert: MatchFeedbackInsert;
        Update: MatchFeedbackUpdate;
      };
      match_scores: {
        Row: MatchScoresRow;
        Insert: MatchScoresInsert;
        Update: MatchScoresUpdate;
      };
      matches: {
        Row: MatchesRow;
        Insert: MatchesInsert;
        Update: MatchesUpdate;
      };
      meeting_participants: {
        Row: MeetingParticipantsRow;
        Insert: MeetingParticipantsInsert;
        Update: MeetingParticipantsUpdate;
      };
      meetings: {
        Row: MeetingsRow;
        Insert: MeetingsInsert;
        Update: MeetingsUpdate;
      };
      message_templates: {
        Row: MessageTemplatesRow;
        Insert: MessageTemplatesInsert;
        Update: MessageTemplatesUpdate;
      };
      messages: {
        Row: MessagesRow;
        Insert: MessagesInsert;
        Update: MessagesUpdate;
      };
      note_templates: {
        Row: NoteTemplatesRow;
        Insert: NoteTemplatesInsert;
        Update: NoteTemplatesUpdate;
      };
      notes: {
        Row: NotesRow;
        Insert: NotesInsert;
        Update: NotesUpdate;
      };
      notification_preferences: {
        Row: NotificationPreferencesRow;
        Insert: NotificationPreferencesInsert;
        Update: NotificationPreferencesUpdate;
      };
      notifications: {
        Row: NotificationsRow;
        Insert: NotificationsInsert;
        Update: NotificationsUpdate;
      };
      offer_approvals: {
        Row: OfferApprovalsRow;
        Insert: OfferApprovalsInsert;
        Update: OfferApprovalsUpdate;
      };
      offer_documents: {
        Row: OfferDocumentsRow;
        Insert: OfferDocumentsInsert;
        Update: OfferDocumentsUpdate;
      };
      offer_intelligence: {
        Row: OfferIntelligenceRow;
        Insert: OfferIntelligenceInsert;
        Update: OfferIntelligenceUpdate;
      };
      offer_negotiations: {
        Row: OfferNegotiationsRow;
        Insert: OfferNegotiationsInsert;
        Update: OfferNegotiationsUpdate;
      };
      offers: {
        Row: OffersRow;
        Insert: OffersInsert;
        Update: OffersUpdate;
      };
      onboarding: {
        Row: OnboardingRow;
        Insert: OnboardingInsert;
        Update: OnboardingUpdate;
      };
      onboarding_packets: {
        Row: OnboardingPacketsRow;
        Insert: OnboardingPacketsInsert;
        Update: OnboardingPacketsUpdate;
      };
      org_memberships: {
        Row: OrgMembershipsRow;
        Insert: OrgMembershipsInsert;
        Update: OrgMembershipsUpdate;
      };
      organization_tenants: {
        Row: OrganizationTenantsRow;
        Insert: OrganizationTenantsInsert;
        Update: OrganizationTenantsUpdate;
      };
      organizations: {
        Row: OrganizationsRow;
        Insert: OrganizationsInsert;
        Update: OrganizationsUpdate;
      };
      parsed_resumes: {
        Row: ParsedResumesRow;
        Insert: ParsedResumesInsert;
        Update: ParsedResumesUpdate;
      };
      performance_reviews: {
        Row: PerformanceReviewsRow;
        Insert: PerformanceReviewsInsert;
        Update: PerformanceReviewsUpdate;
      };
      pipeline: {
        Row: PipelineRow;
        Insert: PipelineInsert;
        Update: PipelineUpdate;
      };
      placement_falloffs: {
        Row: PlacementFalloffsRow;
        Insert: PlacementFalloffsInsert;
        Update: PlacementFalloffsUpdate;
      };
      placements: {
        Row: PlacementsRow;
        Insert: PlacementsInsert;
        Update: PlacementsUpdate;
      };
      portal_access_tokens: {
        Row: PortalAccessTokensRow;
        Insert: PortalAccessTokensInsert;
        Update: PortalAccessTokensUpdate;
      };
      prompt_templates: {
        Row: PromptTemplatesRow;
        Insert: PromptTemplatesInsert;
        Update: PromptTemplatesUpdate;
      };
      recording_assets: {
        Row: RecordingAssetsRow;
        Insert: RecordingAssetsInsert;
        Update: RecordingAssetsUpdate;
      };
      recruiting_metrics: {
        Row: RecruitingMetricsRow;
        Insert: RecruitingMetricsInsert;
        Update: RecruitingMetricsUpdate;
      };
      redeploy_pipelines: {
        Row: RedeployPipelinesRow;
        Insert: RedeployPipelinesInsert;
        Update: RedeployPipelinesUpdate;
      };
      redeploy_recommendations: {
        Row: RedeployRecommendationsRow;
        Insert: RedeployRecommendationsInsert;
        Update: RedeployRecommendationsUpdate;
      };
      reference_checks: {
        Row: ReferenceChecksRow;
        Insert: ReferenceChecksInsert;
        Update: ReferenceChecksUpdate;
      };
      referrals: {
        Row: ReferralsRow;
        Insert: ReferralsInsert;
        Update: ReferralsUpdate;
      };
      registry_actions: {
        Row: RegistryActionsRow;
        Insert: RegistryActionsInsert;
        Update: RegistryActionsUpdate;
      };
      reports: {
        Row: ReportsRow;
        Insert: ReportsInsert;
        Update: ReportsUpdate;
      };
      requirements: {
        Row: RequirementsRow;
        Insert: RequirementsInsert;
        Update: RequirementsUpdate;
      };
      revenue_by_stream: {
        Row: RevenueByStreamRow;
        Insert: RevenueByStreamInsert;
        Update: RevenueByStreamUpdate;
      };
      revenue_dashboard: {
        Row: RevenueDashboardRow;
        Insert: RevenueDashboardInsert;
        Update: RevenueDashboardUpdate;
      };
      reviews: {
        Row: ReviewsRow;
        Insert: ReviewsInsert;
        Update: ReviewsUpdate;
      };
      roles: {
        Row: RolesRow;
        Insert: RolesInsert;
        Update: RolesUpdate;
      };
      saved_searches: {
        Row: SavedSearchesRow;
        Insert: SavedSearchesInsert;
        Update: SavedSearchesUpdate;
      };
      scheduling_links: {
        Row: SchedulingLinksRow;
        Insert: SchedulingLinksInsert;
        Update: SchedulingLinksUpdate;
      };
      scorecard_aggregations: {
        Row: ScorecardAggregationsRow;
        Insert: ScorecardAggregationsInsert;
        Update: ScorecardAggregationsUpdate;
      };
      scorecard_instances: {
        Row: ScorecardInstancesRow;
        Insert: ScorecardInstancesInsert;
        Update: ScorecardInstancesUpdate;
      };
      scorecard_responses: {
        Row: ScorecardResponsesRow;
        Insert: ScorecardResponsesInsert;
        Update: ScorecardResponsesUpdate;
      };
      scorecard_templates: {
        Row: ScorecardTemplatesRow;
        Insert: ScorecardTemplatesInsert;
        Update: ScorecardTemplatesUpdate;
      };
      scorecards: {
        Row: ScorecardsRow;
        Insert: ScorecardsInsert;
        Update: ScorecardsUpdate;
      };
      search_history: {
        Row: SearchHistoryRow;
        Insert: SearchHistoryInsert;
        Update: SearchHistoryUpdate;
      };
      settings: {
        Row: SettingsRow;
        Insert: SettingsInsert;
        Update: SettingsUpdate;
      };
      skill_profiles: {
        Row: SkillProfilesRow;
        Insert: SkillProfilesInsert;
        Update: SkillProfilesUpdate;
      };
      skills_taxonomy: {
        Row: SkillsTaxonomyRow;
        Insert: SkillsTaxonomyInsert;
        Update: SkillsTaxonomyUpdate;
      };
      sms_campaign_recipients: {
        Row: SmsCampaignRecipientsRow;
        Insert: SmsCampaignRecipientsInsert;
        Update: SmsCampaignRecipientsUpdate;
      };
      sms_campaigns: {
        Row: SmsCampaignsRow;
        Insert: SmsCampaignsInsert;
        Update: SmsCampaignsUpdate;
      };
      sms_recipients: {
        Row: SmsRecipientsRow;
        Insert: SmsRecipientsInsert;
        Update: SmsRecipientsUpdate;
      };
      sms_templates: {
        Row: SmsTemplatesRow;
        Insert: SmsTemplatesInsert;
        Update: SmsTemplatesUpdate;
      };
      social_shares: {
        Row: SocialSharesRow;
        Insert: SocialSharesInsert;
        Update: SocialSharesUpdate;
      };
      starts: {
        Row: StartsRow;
        Insert: StartsInsert;
        Update: StartsUpdate;
      };
      submission_packages: {
        Row: SubmissionPackagesRow;
        Insert: SubmissionPackagesInsert;
        Update: SubmissionPackagesUpdate;
      };
      submissions: {
        Row: SubmissionsRow;
        Insert: SubmissionsInsert;
        Update: SubmissionsUpdate;
      };
      submittals: {
        Row: SubmittalsRow;
        Insert: SubmittalsInsert;
        Update: SubmittalsUpdate;
      };
      subscription_metrics: {
        Row: SubscriptionMetricsRow;
        Insert: SubscriptionMetricsInsert;
        Update: SubscriptionMetricsUpdate;
      };
      subscriptions: {
        Row: SubscriptionsRow;
        Insert: SubscriptionsInsert;
        Update: SubscriptionsUpdate;
      };
      tags: {
        Row: TagsRow;
        Insert: TagsInsert;
        Update: TagsUpdate;
      };
      talent_pool_members: {
        Row: TalentPoolMembersRow;
        Insert: TalentPoolMembersInsert;
        Update: TalentPoolMembersUpdate;
      };
      talent_pools: {
        Row: TalentPoolsRow;
        Insert: TalentPoolsInsert;
        Update: TalentPoolsUpdate;
      };
      task_rules: {
        Row: TaskRulesRow;
        Insert: TaskRulesInsert;
        Update: TaskRulesUpdate;
      };
      tasks: {
        Row: TasksRow;
        Insert: TasksInsert;
        Update: TasksUpdate;
      };
      team_invitations: {
        Row: TeamInvitationsRow;
        Insert: TeamInvitationsInsert;
        Update: TeamInvitationsUpdate;
      };
      teams: {
        Row: TeamsRow;
        Insert: TeamsInsert;
        Update: TeamsUpdate;
      };
      templates: {
        Row: TemplatesRow;
        Insert: TemplatesInsert;
        Update: TemplatesUpdate;
      };
      tenants: {
        Row: TenantsRow;
        Insert: TenantsInsert;
        Update: TenantsUpdate;
      };
      timesheets: {
        Row: TimesheetsRow;
        Insert: TimesheetsInsert;
        Update: TimesheetsUpdate;
      };
      top_viral_ambassadors: {
        Row: TopViralAmbassadorsRow;
        Insert: TopViralAmbassadorsInsert;
        Update: TopViralAmbassadorsUpdate;
      };
      transcripts: {
        Row: TranscriptsRow;
        Insert: TranscriptsInsert;
        Update: TranscriptsUpdate;
      };
      user_audit_log: {
        Row: UserAuditLogRow;
        Insert: UserAuditLogInsert;
        Update: UserAuditLogUpdate;
      };
      user_organizations: {
        Row: UserOrganizationsRow;
        Insert: UserOrganizationsInsert;
        Update: UserOrganizationsUpdate;
      };
      user_preferences: {
        Row: UserPreferencesRow;
        Insert: UserPreferencesInsert;
        Update: UserPreferencesUpdate;
      };
      user_sessions: {
        Row: UserSessionsRow;
        Insert: UserSessionsInsert;
        Update: UserSessionsUpdate;
      };
      users: {
        Row: UsersRow;
        Insert: UsersInsert;
        Update: UsersUpdate;
      };
      v_assignment_current: {
        Row: VAssignmentCurrentRow;
        Insert: VAssignmentCurrentInsert;
        Update: VAssignmentCurrentUpdate;
      };
      v_jobs: {
        Row: VJobsRow;
        Insert: VJobsInsert;
        Update: VJobsUpdate;
      };
      v_organization_primary_tenant: {
        Row: VOrganizationPrimaryTenantRow;
        Insert: VOrganizationPrimaryTenantInsert;
        Update: VOrganizationPrimaryTenantUpdate;
      };
      viral_events: {
        Row: ViralEventsRow;
        Insert: ViralEventsInsert;
        Update: ViralEventsUpdate;
      };
      viral_growth_funnel: {
        Row: ViralGrowthFunnelRow;
        Insert: ViralGrowthFunnelInsert;
        Update: ViralGrowthFunnelUpdate;
      };
      viral_loop_performance: {
        Row: ViralLoopPerformanceRow;
        Insert: ViralLoopPerformanceInsert;
        Update: ViralLoopPerformanceUpdate;
      };
      viral_referrals: {
        Row: ViralReferralsRow;
        Insert: ViralReferralsInsert;
        Update: ViralReferralsUpdate;
      };
      viral_rewards: {
        Row: ViralRewardsRow;
        Insert: ViralRewardsInsert;
        Update: ViralRewardsUpdate;
      };
      webhook_deliveries: {
        Row: WebhookDeliveriesRow;
        Insert: WebhookDeliveriesInsert;
        Update: WebhookDeliveriesUpdate;
      };
      webhook_logs: {
        Row: WebhookLogsRow;
        Insert: WebhookLogsInsert;
        Update: WebhookLogsUpdate;
      };
      webhook_subscriptions: {
        Row: WebhookSubscriptionsRow;
        Insert: WebhookSubscriptionsInsert;
        Update: WebhookSubscriptionsUpdate;
      };
      white_label_licenses: {
        Row: WhiteLabelLicensesRow;
        Insert: WhiteLabelLicensesInsert;
        Update: WhiteLabelLicensesUpdate;
      };
      workflow_instances: {
        Row: WorkflowInstancesRow;
        Insert: WorkflowInstancesInsert;
        Update: WorkflowInstancesUpdate;
      };
      workflows: {
        Row: WorkflowsRow;
        Insert: WorkflowsInsert;
        Update: WorkflowsUpdate;
      };
      workspace_members: {
        Row: WorkspaceMembersRow;
        Insert: WorkspaceMembersInsert;
        Update: WorkspaceMembersUpdate;
      };
      workspaces: {
        Row: WorkspacesRow;
        Insert: WorkspacesInsert;
        Update: WorkspacesUpdate;
      };
    };
  };
}
