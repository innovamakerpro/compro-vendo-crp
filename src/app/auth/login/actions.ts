"use server";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

interface LoginState {
  error?: string;
}

/**
 * Cookie personalizada que indica si el usuario quiere que la sesión
 * persista al cerrar el navegador. Si no está marcada, la cookie de
 * sesión de Supabase se tratará como cookie de sesión (se borra al cerrar).
 */
const REMEMBER_COOKIE = "crp-remember-session";

export async function loginAction(
  _prevState: LoginState | null,
  formData: FormData
): Promise<LoginState> {
  const email = (formData.get("email") as string)?.trim();
  const password = formData.get("password") as string;
  const redirectTo = formData.get("redirectTo") as string;
  const remember = formData.get("remember") === "on";

  if (!email || !password) {
    return { error: "Introduce el email y la contraseña." };
  }

  const supabase = await createClient();
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });

  if (error || !data.user) {
    return { error: "Email o contraseña incorrectos. Verifica tus datos." };
  }

  // Gestionar la persistencia de sesión
  const cookieStore = await cookies();
  if (remember) {
    // Guardar cookie con expiración larga (30 días) para recordar sesión
    cookieStore.set(REMEMBER_COOKIE, "true", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 30, // 30 días
      path: "/",
    });
  } else {
    // Sin recordar: borrar la cookie de persistencia
    // La sesión de Supabase caducará cuando se cierre el navegador
    cookieStore.delete(REMEMBER_COOKIE);
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
