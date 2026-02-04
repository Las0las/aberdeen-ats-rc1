import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { dashboardParamsSchema } from "@/lib/dashboard/schemas";
import { getDashboardData } from "@/lib/dashboard/queries";

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    // Zod-validate params (currently none required; forward-compatible)
    const url = request.nextUrl;
    const raw: Record<string, string> = {};
    url.searchParams.forEach((v, k) => {
      raw[k] = v;
    });
    const parsed = dashboardParamsSchema.safeParse(raw);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid params", details: parsed.error.flatten() },
        { status: 400 },
      );
    }

    const result = await getDashboardData(supabase);
    return NextResponse.json(result);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Internal error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
