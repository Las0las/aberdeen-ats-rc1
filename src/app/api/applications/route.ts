import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { listApplications } from "@/lib/applications/queries";
import { applicationsListParamsSchema } from "@/lib/applications/schemas";

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const url = request.nextUrl;
    const parsed = applicationsListParamsSchema.safeParse({
      stage: url.searchParams.get("stage") ?? undefined,
      status: url.searchParams.get("status") ?? undefined,
      candidate_id: url.searchParams.get("candidate_id") ?? undefined,
      job_id: url.searchParams.get("job_id") ?? undefined,
      search: url.searchParams.get("search") ?? undefined,
      page: url.searchParams.get("page") ?? undefined,
      limit: url.searchParams.get("limit") ?? undefined,
    });

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid params", details: parsed.error.flatten() },
        { status: 400 },
      );
    }

    const result = await listApplications(supabase, parsed.data);
    return NextResponse.json(result);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Internal error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
