import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { getMeData } from "@/lib/settings/queries";

export async function GET() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const me = await getMeData(supabase);
    return NextResponse.json(me);
  } catch {
    return NextResponse.json(
      { error: "Failed to load user context" },
      { status: 500 },
    );
  }
}
