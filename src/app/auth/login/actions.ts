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

  if (error) {
    return { error: "Email o contraseña incorrectos. Verifica tus datos." };
  }

  // Si viene un redirect explícito (ej: /cliente/favoritos), usarlo directamente
  if (redirectTo && redirectTo.startsWith("/") && redirectTo !== "/admin") {
    redirect(redirectTo);
  }

  // Si no, redirigir según el rol del usuario
  const { data: profile } = await supabase
    .from("profiles")
    .select("rol")
    .eq("id", data.user.id)
    .single();

  const rol = profile?.rol ?? "cliente";
  const destino = rol === "admin" ? "/admin" : "/cliente";
  redirect(destino);
}
