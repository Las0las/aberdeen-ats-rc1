# Pipeline Board v2 — Build Report

**Date:** 2026-02-04
**Baseline:** ats-platform-rc1.zip (v14 + RC1 hardening)
**Scope:** Controlled drag/drop for pipeline board stage changes

---

## Files Changed (5 files, 1 new route)

| File | Action | Lines |
|---|---|---|
| `src/lib/applications/stage-schemas.ts` | **NEW** | 17 |
| `src/lib/applications/stage-queries.ts` | **NEW** | 85 |
| `src/app/api/applications/[id]/stage/route.ts` | **NEW** | 60 |
| `src/app/(app)/pipeline/page.tsx` | **MODIFIED** | 380 |
| `.env.local` | **MODIFIED** | added `NEXT_PUBLIC_PIPELINE_DND` |

**Route count:** 40 → 41 (+1: PATCH /api/applications/[id]/stage)
**Page count:** 49 → 49 (unchanged)
**New dependencies:** 0

---

## A. New API Endpoint

**PATCH /api/applications/[id]/stage**

| Step | Detail |
|---|---|
| Auth | `supabase.auth.getUser()` → 401 if missing |
| Path validation | `applicationIdSchema` (Zod UUID) → 400 |
| Body validation | `stageChangeBodySchema` (enum + optional reason) → 400 |
| Org resolve | `rpc("current_org_id")` → org-scoped |
| Fetch current | `.eq("organization_id", orgId).eq("id", id)` → 404 |
| Update | Sets `stage` (varchar) + `current_stage` (enum) + `updated_at` |
| Activity | Inserts audit trail with entity_type=application, action_type=stage_changed, source=pipeline_board |
| Response | `{ id, oldStage, newStage, updatedAt }` — lean, no jsonb |

**Column update decision:** Both `stage` (varchar, nullable, read by pipeline queries) and
`current_stage` (enum, NOT NULL, canonical) are updated to keep them in sync. Both are
existing contract columns — no schema changes.

**Activity insert:** Non-blocking. If activity write fails, the stage update still succeeds
(logged to console). Fields used: entity_type, entity_id, action_type, action_category,
description, actor_id, actor_type, actor_name, previous_value, new_value, organization_id,
source. No ip_address, user_agent, or metadata blobs.

---

## B. Pipeline Board UI

### Feature Flag + Role Gate

DND is controlled by TWO independent gates:

1. **Feature flag:** `process.env.NEXT_PUBLIC_PIPELINE_DND === "true"` (build-time)
2. **Role gate:** `current_user_role()` via `/api/me` must return `"admin"` or `"recruiter"`

When either gate is closed → v1 read-only behavior preserved exactly.

### Drag/Drop Behavior

- **HTML5 Drag API** — no new dependencies
- **Pessimistic updates** (NOT optimistic):
  1. Card shows "Moving…" overlay
  2. PATCH request fires
  3. On success → board refetches, toast with 5s undo link appears
  4. On failure → card stays put, error toast shown
- **Rate safety:** `movingCardId` state acts as a mutex — all drops ignored while request is in flight
- **Undo:** 5-second window after success. Calls same PATCH endpoint with old stage + reason "Undo from pipeline board"
- **Visual feedback:** Drop target columns get `ring-2 ring-blue-300` highlight during hover
- **Same-stage noop:** Dropping a card on its current column is silently ignored

---

## C. Reliability

### Concurrency (documented limitation)

No row versioning is available in the contract. If the application was modified between the
board fetch and the stage-change call, the update still applies (last-write-wins). This is
an accepted trade-off — adding optimistic locking would require schema changes.

### Rate Safety

The `movingCardId` state variable serves as an in-flight lock. While any stage-change request
is pending, all drag/drop interactions are suppressed:
- `onDragStart` is prevented
- `onDrop` handlers early-return
- Cards show `pointer-events-none` + reduced opacity

---

## D. Contract Compliance

| Constraint | Status |
|---|---|
| No schema changes | ✅ 0 migrations, 0 new tables/columns |
| No service_role | ✅ 0 hits in grep |
| Org-scoped access | ✅ `rpc("current_org_id")` + `.eq("organization_id")` |
| Zod validation | ✅ Path param + body both validated |
| No new dependencies | ✅ package.json unchanged |
| Lean payloads | ✅ No jsonb blobs in API response or card data |

## E. Quality Gates

| Gate | Result |
|---|---|
| `next build` | ✅ Compiled successfully, 49 pages |
| `tsc --noEmit` | ✅ 0 novel errors (pre-existing TS7026/TS2307 only) |
| service_role grep | ✅ 0 hits |
| Schema change grep | ✅ 0 contract files modified |

---

## F. Activation

To enable drag/drop in production:

```bash
NEXT_PUBLIC_PIPELINE_DND=true
```

Set this environment variable and redeploy. Without it, the pipeline board
behaves identically to v1 (read-only Kanban).
