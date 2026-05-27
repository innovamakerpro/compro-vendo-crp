"use server";

import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { redirect } from "next/navigation";

interface LoginState {
  error?: string;
}

export async function loginAction(
  _prevState: LoginState | null,
  formData: FormData
): Promise<LoginState> {
  const email = (formData.get("email") as string)?.trim();
  const password = formData.get("password") as string;
  const redirectTo = formData.get("redirectTo") as string;

  if (!email || !password) {
    return { error: "Introduce el email y la contraseña." };
  }

  const supabase = await createClient();
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    return { error: "Email o contraseña incorrectos. Verifica tus datos." };
  }

  // SIEMPRE consultar el rol primero (usando admin client para saltar RLS)
  let rol = "cliente";
  try {
    const adminClient = createAdminClient();
    const { data: profile, error: profileError } = await adminClient
      .from("profiles")
      .select("rol")
      .eq("id", data.user.id)
      .single();

    if (profile && !profileError) {
      rol = profile.rol;
    }
  } catch (e) {
    // Si falla la consulta, asumir cliente
    console.error("Error consultando perfil:", e);
  }

  // Admin SIEMPRE va a /admin, sin excepciones
  if (rol === "admin") {
    redirect("/admin");
  }

  // Para clientes: usar redirectTo si existe, si no ir a /cliente
  if (redirectTo && redirectTo.startsWith("/")) {
    redirect(redirectTo);
  }

  redirect("/cliente");
}
