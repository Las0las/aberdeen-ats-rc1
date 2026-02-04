# Reporting v2 — Build Report

## Files Added (6)

| File | Purpose |
|------|---------|
| `src/lib/reporting/types.ts` | Result row types, Zod input validators, constants |
| `src/lib/reporting/queries.ts` | 4 exported query functions (read-only, org-scoped) |
| `src/app/api/reporting/pipeline/route.ts` | `GET /api/reporting/pipeline?sinceDays=90` |
| `src/app/api/reporting/velocity/route.ts` | `GET /api/reporting/velocity` |
| `src/app/api/reporting/dimensions/route.ts` | `GET /api/reporting/dimensions?dimension=recruiter&sinceDays=30` |
| `src/app/api/reporting/automation/route.ts` | `GET /api/reporting/automation?sinceDays=30` |

## Files Modified (0)

No existing files were changed.

## API Routes

| Endpoint | Params | Module |
|----------|--------|--------|
| `GET /api/reporting/pipeline` | `sinceDays` (1-365, default 90) | Pipeline Intelligence |
| `GET /api/reporting/velocity` | None (fixed 7/30/90d windows) | Velocity & Trends |
| `GET /api/reporting/dimensions` | `dimension` (recruiter/job/stage), `sinceDays` (1-365, default 30) | Dimensional Breakdowns |
| `GET /api/reporting/automation` | `sinceDays` (1-365, default 90) | Automation Effectiveness |

## Metrics Implemented

### Pipeline Intelligence
- Stage timing: avg/p50/p90 days (attributed to **to_stage**)
- Stage-to-stage conversion rates
- Aging buckets: 0-7d, 8-14d, 15-30d, 30+d (from last `stage_changed` activity, fallback `updated_at`)
- Stuck detection: 30-day threshold, excludes terminal stages

### Velocity & Trends
- Rolling counts: 7d/30d/90d for applications, interviews, offers, stage_changes
- WoW deltas: current vs prior 7d, ±5% flat band, directional indicator

### Dimensional Breakdowns
- By recruiter (`assigned_to` → `users.full_name`), job (`job_id` → `jobs.title`), or stage
- Dynamic stage grouping (never hard-coded)
- Per-dimension: total count, % of total, stage distribution
- Capped at top 50

### Automation Effectiveness
- Alerts fired per rule (from `action_category='automation'`, `source='rule:{id}'`)
- Acknowledgment rate (non-automation activity on same entity within 7 days)
- No-op detection (fired > 0, acknowledged = 0)

## Constraint Compliance

| Constraint | Status |
|------------|--------|
| Schema changes | ✅ Zero |
| Write operations (insert/update/delete) | ✅ Zero |
| `service_role` usage | ✅ Zero |
| Raw `console.*` outside logger | ✅ Zero |
| New dependencies | ✅ Zero |
| All queries org-scoped (`current_org_id()`) | ✅ Yes |
| All queries bounded (ROW_CAP=5000, LIMIT) | ✅ Yes |
| RBAC enforced (admin, recruiter) | ✅ Yes |
| `tsc --noEmit` | ✅ Pass |
| `npm run build` (compile + routes) | ✅ Pass |

## Corrections Applied

1. ✅ Stage duration attributed to `to_stage` (not `from_stage`)
2. ✅ Aging/stuck based on last `stage_changed` activity, fallback `applications.updated_at`
3. ✅ `STUCK_THRESHOLD_DAYS = 30` constant
4. ✅ Velocity is event-based (`created_at` on each table)
5. ✅ Stage enums never hard-coded in dimensional breakdowns — grouped dynamically
