import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { benchMatchBodySchema } from "@/lib/bench/schemas";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id: benchId } = await params;
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    // Org guard
    const { data: orgId, error: orgErr } = await supabase.rpc("current_org_id");
    if (orgErr || !orgId) {
      return NextResponse.json({ error: "Unable to resolve org" }, { status: 403 });
    }

    const body = await request.json();
    const parsed = benchMatchBodySchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid body", details: parsed.error.flatten() },
        { status: 400 },
      );
    }

    const { data, error } = await supabase.rpc("rpc_bench_match_jobs_v1", {
      p_bench_id: benchId,
      p_limit: parsed.data.limit,
      p_include_explainability: parsed.data.include_explainability,
      p_write_cache: parsed.data.write_cache,
    });

    if (error) throw error;

    return NextResponse.json({ matches: data ?? [] });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Internal error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
