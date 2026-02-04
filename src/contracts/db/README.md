# Database Contract Layer

> **Contract-locked.** These files are auto-generated from the immutable database schema contract.
> Do NOT edit manually. Regenerate from the contract inputs if needed.

## File Structure

```
src/contracts/db/
├── index.ts      # Barrel re-export
├── enums.ts      # TypeScript union types for all DB enums
├── tables.ts     # Row / Insert / Update interfaces for every table
├── zod.ts        # Zod validation schemas for Insert / Update payloads
├── rpcs.ts       # Typed RPC wrappers for all app-relevant Supabase RPCs
├── storage.ts    # Typed helpers for storage bucket operations
└── README.md     # This file
```

## Usage

### 1. Typed table operations

```ts
import type { SubmissionsRow, SubmissionsInsert } from "@/contracts/db";
import { submissionsInsertSchema } from "@/contracts/db/zod";

// Type-safe insert
const payload: SubmissionsInsert = {
  organization_id: orgId,
  candidate_id: candidateId,
  job_id: jobId,
  status: "draft",
};

// Runtime validation
const validated = submissionsInsertSchema.parse(payload);

// Supabase insert
const { data, error } = await supabase
  .from("submissions")
  .insert(validated)
  .select()
  .single();

// data is typed as SubmissionsRow
```

### 2. Calling RPCs

```ts
import { rpcBenchMatchJobsV1 } from "@/contracts/db";

const results = await rpcBenchMatchJobsV1(supabase, {
  p_bench_id: benchId,
  p_limit: 10,
  p_include_explainability: true,
  p_write_cache: false,
});

// results is typed as RpcBenchMatchJobsV1Result[]
// Each result has: job_id (string), score (number), explainability (Record<string, unknown>)
```

### 3. Storage operations

```ts
import {
  STORAGE_BUCKETS,
  uploadToBucket,
  getSignedUrl,
  getPublicUrl,
} from "@/contracts/db";

// Upload to private artifacts bucket
const { path } = await uploadToBucket(supabase, STORAGE_BUCKETS.ARTIFACTS, {
  path: `${orgId}/resumes/${candidateId}.pdf`,
  file: pdfBlob,
  contentType: "application/pdf",
  upsert: true,
});

// Get signed URL (private buckets)
const url = await getSignedUrl(supabase, STORAGE_BUCKETS.ARTIFACTS, path, 3600);

// Get public URL (public buckets only)
const publicUrl = getPublicUrl(supabase, STORAGE_BUCKETS.DOCUMENTS, docPath);
```

### 4. Using enums

```ts
import {
  ApplicationStageValues,
  type ApplicationStage,
  SubmittalStateValues,
  type SubmittalState,
} from "@/contracts/db";

// Type-safe enum usage
const stage: ApplicationStage = "SCREENING";

// Runtime validation
if (!ApplicationStageValues.includes(input as ApplicationStage)) {
  throw new Error(`Invalid application stage: ${input}`);
}

// Iterate over valid values
for (const s of SubmittalStateValues) {
  console.log(s); // "DRAFT" | "AI_GENERATED" | ...
}
```

### 5. Server Actions / API Routes

```ts
// app/api/submissions/route.ts
import { NextResponse } from "next/server";
import { submissionsInsertSchema } from "@/contracts/db/zod";
import { createClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  const body = await request.json();
  const parsed = submissionsInsertSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.flatten() },
      { status: 400 },
    );
  }

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("submissions")
    .insert(parsed.data)
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data, { status: 201 });
}
```

## Contract Rules

1. **Never modify the database schema.** All types are derived from the locked contract.
2. **Handle gaps defensively.** Some tables may be views with all-nullable columns — treat them accordingly in the app layer.
3. **Use Zod for runtime validation.** TypeScript types alone don't protect at runtime boundaries (API routes, form submissions).
4. **Enums are strict.** Use the `*Values` arrays for runtime validation and the union types for compile-time safety.
