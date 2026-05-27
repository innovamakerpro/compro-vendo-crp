"use server";

import { createClient } from "@/lib/supabase/server";
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

  if (error || !data.user) {
    return { error: "Email o contraseña incorrectos. Verifica tus datos." };
  }

  // Leer el rol directamente del JWT (app_metadata) — no necesita query a profiles
  const rol = data.user.app_metadata?.role ?? "cliente";

  // Admin SIEMPRE va a /admin
  if (rol === "admin") {
    redirect("/admin");
  }

  // Para clientes: usar redirectTo si existe, si no ir a /cliente
  if (redirectTo && redirectTo.startsWith("/")) {
    redirect(redirectTo);
  }

  redirect("/cliente");
}
