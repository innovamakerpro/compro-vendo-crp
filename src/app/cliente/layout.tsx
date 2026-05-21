import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import ClienteLogoutButton from "./LogoutButton";

export default async function ClienteLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth/login?redirect=/cliente");
  }

  // Obtener perfil para mostrar nombre
  const { data: profile } = await supabase
    .from("profiles")
    .select("nombre, email, rol")
    .eq("id", user.id)
    .single();

  const nombre = profile?.nombre || user.email?.split("@")[0] || "Usuario";

  return (
    <div className="min-h-screen bg-[var(--color-negro)]">
      {/* Top bar */}
      <header className="sticky top-0 z-40 bg-[var(--color-negro-2)]/95 backdrop-blur-lg border-b border-[var(--color-borde)]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
              <rect width="32" height="32" rx="6" fill="url(#logoGradC)" />
              <path d="M8 16C8 11.58 11.58 8 16 8C20.42 8 24 11.58 24 16" stroke="#0A0A0A" strokeWidth="2.5" strokeLinecap="round" />
              <circle cx="16" cy="20" r="3" fill="#0A0A0A" />
              <defs>
                <linearGradient id="logoGradC" x1="0" y1="0" x2="32" y2="32">
                  <stop stopColor="#C9A961" /><stop offset="1" stopColor="#D4BF8A" />
                </linearGradient>
              </defs>
            </svg>
            <span className="text-sm font-bold font-[family-name:var(--font-heading)] text-[var(--color-blanco)] group-hover:text-[var(--color-dorado)] transition-colors hidden sm:inline">
              COMPRO Y VENDO CRP
            </span>
          </Link>

          {/* Nav central */}
          <nav className="flex items-center gap-1">
            <NavLink href="/cliente" label="Mi panel" />
            <NavLink href="/cliente/favoritos" label="Favoritos" />
            <NavLink href="/catalogo" label="Catálogo" />
          </nav>

          {/* Usuario */}
          <div className="flex items-center gap-3">
            <div className="hidden sm:block text-right">
              <span className="text-xs text-[var(--color-gris)] block">Hola,</span>
              <span className="text-sm font-medium text-[var(--color-blanco)]">{nombre}</span>
            </div>
            <ClienteLogoutButton />
          </div>
        </div>
      </header>

      {/* Contenido */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        {children}
      </main>
    </div>
  );
}

function NavLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="px-3 py-2 text-sm font-medium text-[var(--color-gris-claro)] hover:text-[var(--color-dorado)] hover:bg-[var(--color-negro-3)] rounded-lg transition-colors"
    >
      {label}
    </Link>
  );
}
