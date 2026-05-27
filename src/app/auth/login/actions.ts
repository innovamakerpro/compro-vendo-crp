"use server";

import { createClient } from "@/lib/supabase/server";
import { createClient as createBrowserClient } from "@supabase/supabase-js";
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

  // 1. Login con el server client (establece cookies para futuras requests)
  const supabase = await createClient();
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });

  if (error || !data.session) {
    return { error: "Email o contraseña incorrectos. Verifica tus datos." };
  }

  // 2. Crear un cliente temporal con el access_token recién obtenido
  //    para hacer queries RLS en esta misma request
  const authClient = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      global: {
        headers: {
          Authorization: `Bearer ${data.session.access_token}`,
        },
      },
    }
  );

  // 3. Consultar el rol con el token autenticado
  const { data: profile } = await authClient
    .from("profiles")
    .select("rol")
    .eq("id", data.user.id)
    .single();

  const rol = profile?.rol ?? "cliente";

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
