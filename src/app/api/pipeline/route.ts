import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { pipelineParamsSchema } from "@/lib/pipeline/schemas";
import { getPipeline } from "@/lib/pipeline/queries";

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const url = request.nextUrl;
    const parsed = pipelineParamsSchema.safeParse({
      search: url.searchParams.get("search") ?? undefined,
      sinceDays: url.searchParams.get("sinceDays") ?? undefined,
      limitPerStage: url.searchParams.get("limitPerStage") ?? undefined,
    });

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid params", details: parsed.error.flatten() },
        { status: 400 },
      );
    }

    const result = await getPipeline(supabase, parsed.data);
    return NextResponse.json(result);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Internal error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
