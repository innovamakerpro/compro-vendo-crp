import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { getAdminClient } from "@/lib/supabase/admin";
import { redirect } from "next/navigation";
import LogoutButton from "./LogoutButton";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth/login");
  }

  // Verificar que el usuario sea admin (usando admin client para saltar RLS)
  const adminClient = getAdminClient();
  const { data: profile } = await adminClient
    .from("profiles")
    .select("rol")
    .eq("id", user.id)
    .single();

  if (profile?.rol !== "admin") {
    redirect("/");
  }

  return (
    <div className="min-h-screen flex bg-[var(--color-negro)]">
      {/* Sidebar */}
      <aside className="w-64 shrink-0 bg-[var(--color-negro-2)] border-r border-[var(--color-borde)] flex flex-col">
        {/* Logo */}
        <div className="p-6 border-b border-[var(--color-borde)]">
          <Link href="/admin" className="block">
            <span className="text-xs text-[var(--color-gris)] uppercase tracking-widest block mb-1">Panel admin</span>
            <span className="font-bold font-[family-name:var(--font-heading)] text-[var(--color-dorado)]">
              Compro y Vendo CRP
            </span>
          </Link>
        </div>

        {/* Navegación */}
        <nav className="flex-1 p-4 space-y-1">
          <NavItem href="/admin" icon="dashboard" label="Dashboard" exact />
          <NavItem href="/admin/vehiculos" icon="car" label="Vehículos" />
        </nav>

        {/* Footer del sidebar */}
        <div className="p-4 border-t border-[var(--color-borde)]">
          <div className="text-xs text-[var(--color-gris)] mb-3 truncate">{user.email}</div>
          <LogoutButton />
        </div>
      </aside>

      {/* Contenido principal */}
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}

function NavItem({
  href,
  icon,
  label,
  exact = false,
}: {
  href: string;
  icon: string;
  label: string;
  exact?: boolean;
}) {
  const icons: Record<string, React.ReactNode> = {
    dashboard: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" />
        <rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" />
      </svg>
    ),
    car: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M19 17H5a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2Z" />
        <path d="M7 9 9 4h6l2 5" /><circle cx="7.5" cy="17" r="1.5" /><circle cx="16.5" cy="17" r="1.5" />
      </svg>
    ),
  };

  return (
    <Link
      href={href}
      className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-[var(--color-gris-claro)] hover:text-[var(--color-blanco)] hover:bg-[var(--color-negro-3)] transition-colors"
    >
      <span className="text-[var(--color-gris)]">{icons[icon]}</span>
      {label}
    </Link>
  );
}
