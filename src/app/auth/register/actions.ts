"use server";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export interface RegisterState {
  error?: string;
  success?: boolean;
}

export async function registerAction(
  _prev: RegisterState | null,
  formData: FormData
): Promise<RegisterState> {
  const nombre    = (formData.get("nombre") as string)?.trim();
  const apellidos = (formData.get("apellidos") as string)?.trim();
  const telefono  = (formData.get("telefono") as string)?.trim();
  const email     = (formData.get("email") as string)?.trim();
  const password  = formData.get("password") as string;
  const confirm   = formData.get("confirm") as string;
  const privacy   = formData.get("privacy");

  // ── Validaciones ──
  if (!nombre || !apellidos || !email || !password || !confirm) {
    return { error: "Todos los campos obligatorios deben estar rellenos." };
  }

  if (password.length < 6) {
    return { error: "La contraseña debe tener al menos 6 caracteres." };
  }

  if (password !== confirm) {
    return { error: "Las contraseñas no coinciden." };
  }

  if (!privacy) {
    return { error: "Debes aceptar la política de privacidad." };
  }

  // ── Registro en Supabase Auth ──
  const supabase = await createClient();

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        nombre,
        apellidos,
        telefono: telefono || null,
      },
    },
  });

  if (error) {
    // Mensajes de error comunes
    if (error.message.includes("already registered")) {
      return { error: "Este email ya está registrado. Prueba a iniciar sesión." };
    }
    return { error: error.message };
  }

  // Si Supabase requiere confirmación de email, el usuario no se loguea automáticamente.
  // Detectamos esto verificando si la sesión se creó.
  const tieneSession = !!data.session;

  if (tieneSession) {
    // Sin confirmación por email → el usuario ya está logueado
    // Crear perfil de cliente
    await supabase.from("profiles").upsert({
      id: data.user!.id,
      email,
      nombre,
      apellidos,
      telefono: telefono || null,
      rol: "cliente",
    });

    redirect("/cliente");
  }

  // Con confirmación por email → mostrar mensaje de éxito
  return { success: true };
}
