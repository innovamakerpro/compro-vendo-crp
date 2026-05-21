"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { CONTACTO } from "@/utils/constants";

// Icono SVG del logo (placeholder — se reemplazará por el logo real)
function LogoIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
      <rect width="32" height="32" rx="6" fill="url(#logoGrad)" />
      <path d="M8 16C8 11.58 11.58 8 16 8C20.42 8 24 11.58 24 16" stroke="#0A0A0A" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="16" cy="20" r="3" fill="#0A0A0A" />
      <defs>
        <linearGradient id="logoGrad" x1="0" y1="0" x2="32" y2="32">
          <stop stopColor="#C9A961" />
          <stop offset="1" stopColor="#D4BF8A" />
        </linearGradient>
      </defs>
    </svg>
  );
}

const navLinks = [
  { href: "/", label: "Inicio" },
  { href: "/catalogo", label: "Catálogo" },
  { href: "/financiacion", label: "Financiación" },
  { href: "/quienes-somos", label: "Quiénes somos" },
  { href: "/contacto", label: "Contacto" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  // Bloquear scroll del body cuando el menú móvil está abierto
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[var(--color-negro)]/95 backdrop-blur-lg border-b border-[var(--color-borde)] py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group" id="navbar-logo">
          <LogoIcon />
          <div className="flex flex-col">
            <span className="text-sm font-bold font-[family-name:var(--font-heading)] text-[var(--color-blanco)] tracking-wide group-hover:text-[var(--color-dorado)] transition-colors">
              COMPRO Y VENDO
            </span>
            <span className="text-[10px] font-medium tracking-[0.2em] text-[var(--color-gris)]">
              CRP
            </span>
          </div>
        </Link>

        {/* Navegación desktop */}
        <nav className="hidden lg:flex items-center gap-8" id="navbar-desktop">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-[var(--color-gris-claro)] hover:text-[var(--color-dorado)] transition-colors duration-200 relative group"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-[var(--color-dorado)] transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
        </nav>

        {/* Acciones desktop */}
        <div className="hidden lg:flex items-center gap-4">
          <a
            href={CONTACTO.telefonoLink}
            className="flex items-center gap-2 text-sm text-[var(--color-gris-claro)] hover:text-[var(--color-dorado)] transition-colors"
            id="navbar-phone"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
            {CONTACTO.telefono}
          </a>
          <Link href="/catalogo" className="btn-primary text-xs py-2.5 px-5" id="navbar-cta">
            Ver coches
          </Link>
        </div>

        {/* Hamburguesa móvil */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="lg:hidden flex flex-col justify-center items-center w-10 h-10 gap-1.5"
          aria-label="Menú"
          id="navbar-hamburger"
        >
          <motion.span
            animate={mobileOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
            className="block w-6 h-0.5 bg-[var(--color-blanco)]"
          />
          <motion.span
            animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
            className="block w-6 h-0.5 bg-[var(--color-blanco)]"
          />
          <motion.span
            animate={mobileOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
            className="block w-6 h-0.5 bg-[var(--color-blanco)]"
          />
        </button>
      </div>

      {/* Menú móvil */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden fixed inset-0 top-[60px] bg-[var(--color-negro)]/98 backdrop-blur-xl z-40"
            id="navbar-mobile-menu"
          >
            <nav className="flex flex-col items-center justify-center gap-8 py-16">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="text-2xl font-bold font-[family-name:var(--font-heading)] text-[var(--color-blanco)] hover:text-[var(--color-dorado)] transition-colors"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="flex flex-col items-center gap-4 mt-4"
              >
                <a href={CONTACTO.telefonoLink} className="btn-secondary">
                  Llamar: {CONTACTO.telefono}
                </a>
                <Link href="/catalogo" onClick={() => setMobileOpen(false)} className="btn-primary">
                  Ver todos los coches
                </Link>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
