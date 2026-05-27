import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function GET() {
  const results: Record<string, unknown> = {};

  try {
    const supabase = await createClient();
    const { data: { user }, error } = await supabase.auth.getUser();

    if (user) {
      results.logged_in = true;
      results.email = user.email;
      results.user_id = user.id;
      results.app_metadata = user.app_metadata;
      results.role_from_metadata = user.app_metadata?.role ?? "NO TIENE role EN app_metadata";
    } else {
      results.logged_in = false;
      results.error = error?.message;
      results.instrucciones = "Inicia sesion primero y luego visita esta URL";
    }
  } catch (e) {
    results.crash = String(e);
  }

  return NextResponse.json(results, { status: 200 });
}
