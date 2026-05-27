import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { NextResponse } from "next/server";

export async function GET() {
  const results: Record<string, unknown> = {};

  // 1. Verificar variables de entorno
  results.env = {
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL ? "✅ SET" : "❌ MISSING",
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? "✅ SET" : "❌ MISSING",
    SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY ? "✅ SET" : "❌ MISSING",
  };

  // 2. Verificar sesión del usuario
  try {
    const supabase = await createClient();
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    results.session = {
      loggedIn: !!user,
      userId: user?.id ?? null,
      email: user?.email ?? null,
      error: userError?.message ?? null,
    };

    // 3. Intentar leer perfil con el cliente normal (puede fallar por RLS)
    if (user) {
      const { data: profileNormal, error: rlsError } = await supabase
        .from("profiles")
        .select("rol, email")
        .eq("id", user.id)
        .single();

      results.profileViaRLS = {
        data: profileNormal,
        error: rlsError?.message ?? null,
      };
    }
  } catch (e) {
    results.session = { error: String(e) };
  }

  // 4. Intentar leer perfil con admin client (salta RLS)
  try {
    const adminClient = createAdminClient();
    const { data: allProfiles, error: adminError } = await adminClient
      .from("profiles")
      .select("id, email, rol");

    results.profileViaAdmin = {
      data: allProfiles,
      error: adminError?.message ?? null,
    };
  } catch (e) {
    results.profileViaAdmin = { error: String(e) };
  }

  return NextResponse.json(results, { status: 200 });
}
