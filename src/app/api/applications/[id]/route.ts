import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { getApplication } from "@/lib/applications/queries";
import { applicationIdSchema } from "@/lib/applications/schemas";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { id } = await params;
    const parsed = applicationIdSchema.safeParse({ id });
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid ID", details: parsed.error.flatten() },
        { status: 400 },
      );
    }

    const application = await getApplication(supabase, parsed.data.id);
    return NextResponse.json(application);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Internal error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
