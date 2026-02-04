import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { reportsParamsSchema } from "@/lib/reports/schemas";
import { getReportsData } from "@/lib/reports/queries";

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    // Parse + validate query params
    const raw: Record<string, string> = {};
    request.nextUrl.searchParams.forEach((v, k) => {
      raw[k] = v;
    });
    const parsed = reportsParamsSchema.safeParse(raw);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid params", details: parsed.error.flatten() },
        { status: 400 },
      );
    }

    const result = await getReportsData(supabase, parsed.data.sinceDays);
    return NextResponse.json(result);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Internal error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
