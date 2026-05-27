"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import LogoutButton from "./LogoutButton";

function NavItem({
  href,
  icon,
  label,
  exact = false,
  onClick,
}: {
  href: string;
  icon: string;
  label: string;
  exact?: boolean;
  onClick?: () => void;
}) {
  const pathname = usePathname();
  const isActive = exact ? pathname === href : pathname.startsWith(href);

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
      onClick={onClick}
      className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
        isActive
          ? "text-[var(--color-dorado)] bg-[var(--color-dorado)]/10"
          : "text-[var(--color-gris-claro)] hover:text-[var(--color-blanco)] hover:bg-[var(--color-negro-3)]"
      }`}
    >
      <span className={isActive ? "text-[var(--color-dorado)]" : "text-[var(--color-gris)]"}>
        {icons[icon]}
      </span>
      {label}
    </Link>
  );
}

export default function AdminShell({
  userEmail,
  children,
}: {
  userEmail: string;
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  // Close sidebar on route change (mobile)
  useEffect(() => {
    setSidebarOpen(false);
  }, [pathname]);

  // Prevent body scroll when sidebar overlay is open
  useEffect(() => {
    if (sidebarOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [sidebarOpen]);

  const sidebarContent = (
    <>
      {/* Logo */}
      <div className="p-6 border-b border-[var(--color-borde)]">
        <Link href="/admin" className="block" onClick={() => setSidebarOpen(false)}>
          <span className="text-xs text-[var(--color-gris)] uppercase tracking-widest block mb-1">Panel admin</span>
          <span className="font-bold font-[family-name:var(--font-heading)] text-[var(--color-dorado)]">
            Compro y Vendo CRP
          </span>
        </Link>
      </div>

      {/* Navegación */}
      <nav className="flex-1 p-4 space-y-1">
        <NavItem href="/admin" icon="dashboard" label="Dashboard" exact onClick={() => setSidebarOpen(false)} />
        <NavItem href="/admin/vehiculos" icon="car" label="Vehículos" onClick={() => setSidebarOpen(false)} />
      </nav>

      {/* Footer del sidebar */}
      <div className="p-4 border-t border-[var(--color-borde)]">
        <div className="text-xs text-[var(--color-gris)] mb-3 truncate">{userEmail}</div>
        <LogoutButton />
      </div>
    </>
  );

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-[var(--color-negro)]">
      {/* ── Mobile top bar ── */}
      <header className="lg:hidden flex items-center justify-between px-4 py-3 bg-[var(--color-negro-2)] border-b border-[var(--color-borde)] shrink-0">
        <button
          onClick={() => setSidebarOpen(true)}
          aria-label="Abrir menú"
          className="p-2 -ml-2 rounded-lg text-[var(--color-gris-claro)] hover:text-[var(--color-blanco)] hover:bg-[var(--color-negro-3)] transition-colors"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>

        <span className="text-sm font-semibold text-[var(--color-gris-claro)] uppercase tracking-widest">
          Panel Admin
        </span>

        <span className="text-xs text-[var(--color-gris)] truncate max-w-[140px]">
          {userEmail}
        </span>
      </header>

      {/* ── Backdrop (mobile only) ── */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* ── Sidebar ── */}
      {/* Desktop: always visible, static */}
      <aside className="hidden lg:flex w-64 shrink-0 bg-[var(--color-negro-2)] border-r border-[var(--color-borde)] flex-col">
        {sidebarContent}
      </aside>

      {/* Mobile: overlay drawer */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-[var(--color-negro-2)] border-r border-[var(--color-borde)] flex flex-col transform transition-transform duration-300 ease-in-out lg:hidden ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Close button inside mobile drawer */}
        <div className="flex justify-end p-2">
          <button
            onClick={() => setSidebarOpen(false)}
            aria-label="Cerrar menú"
            className="p-2 rounded-lg text-[var(--color-gris)] hover:text-[var(--color-blanco)] hover:bg-[var(--color-negro-3)] transition-colors"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
        {sidebarContent}
      </aside>

      {/* ── Main content ── */}
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
