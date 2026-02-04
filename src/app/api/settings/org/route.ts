import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { getOrgSettingsData } from "@/lib/settings/queries";

export async function GET() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const data = await getOrgSettingsData(supabase);
    if (!data) {
      return NextResponse.json(
        { error: "No organization found" },
        { status: 404 },
      );
    }
    return NextResponse.json(data);
  } catch {
    return NextResponse.json(
      { error: "Failed to load org settings" },
      { status: 500 },
    );
  }
}
