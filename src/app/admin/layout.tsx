import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import AdminShell from "./AdminShell";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth/login");
  }

  // Verificar que el usuario sea admin (desde app_metadata del JWT)
  const rol = user.app_metadata?.role ?? "cliente";
  if (rol !== "admin") {
    redirect("/");
  }

  return (
    <AdminShell userEmail={user.email ?? ""}>
      {children}
    </AdminShell>
  );
}
