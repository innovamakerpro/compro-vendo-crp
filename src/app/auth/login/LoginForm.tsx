"use client";

import { useState, useActionState } from "react";
import Link from "next/link";
import { loginAction } from "./actions";

interface Props {
  redirectTo: string;
}

/* Icono ojo abierto (mostrar) */
function EyeIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

/* Icono ojo cerrado (ocultar) */
function EyeOffIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49" />
      <path d="M14.084 14.158a3 3 0 0 1-4.242-4.242" />
      <path d="M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143" />
      <path d="m2 2 20 20" />
    </svg>
  );
}

export default function LoginForm({ redirectTo }: Props) {
  const [state, action, isPending] = useActionState(loginAction, null);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="w-full max-w-md">
      {/* Logo / Marca */}
      <div className="text-center mb-10">
        <span className="section-tag mb-4 inline-block">Acceder</span>
        <h1 className="text-3xl font-extrabold font-[family-name:var(--font-heading)]">
          Compro y Vendo <span className="text-gradient">CRP</span>
        </h1>
        <p className="text-sm text-[var(--color-gris)] mt-2">
          Inicia sesión en tu cuenta
        </p>
      </div>

      {/* Tarjeta del formulario */}
      <div className="bg-[var(--color-negro-2)] border border-[var(--color-borde)] rounded-2xl p-8 shadow-[var(--shadow-card)]">
        <form action={action} className="space-y-5">
          <input type="hidden" name="redirectTo" value={redirectTo} />

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-xs font-medium text-[var(--color-gris-claro)] uppercase tracking-wider mb-2"
            >
              Email
            </label>
            <div className="relative">
              <svg
                width="16" height="16" viewBox="0 0 24 24" fill="none"
                stroke="var(--color-gris)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none"
              >
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                placeholder=""
                className="filter-input pl-11 w-full h-12"
                disabled={isPending}
              />
            </div>
          </div>

          {/* Contraseña */}
          <div>
            <label
              htmlFor="password"
              className="block text-xs font-medium text-[var(--color-gris-claro)] uppercase tracking-wider mb-2"
            >
              Contraseña
            </label>
            <div className="relative">
              <svg
                width="16" height="16" viewBox="0 0 24 24" fill="none"
                stroke="var(--color-gris)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none"
              >
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                required
                placeholder=""
                className="filter-input pl-11 pr-12 w-full h-12"
                disabled={isPending}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 rounded-lg text-[var(--color-gris)] hover:text-[var(--color-gris-claro)] hover:bg-white/5 transition-colors"
                tabIndex={-1}
                aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
              >
                {showPassword ? <EyeOffIcon /> : <EyeIcon />}
              </button>
            </div>
          </div>

          {/* Recordar sesión */}
          <div className="flex items-center gap-3">
            <input
              id="login-remember"
              name="remember"
              type="checkbox"
              defaultChecked
              className="w-4 h-4 rounded accent-[var(--color-dorado)] cursor-pointer shrink-0"
              disabled={isPending}
            />
            <label htmlFor="login-remember" className="text-xs text-[var(--color-gris)] cursor-pointer leading-relaxed">
              Recordar mi sesión
            </label>
          </div>

          {/* Error */}
          {state?.error && (
            <div className="flex items-center gap-2 text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-3">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
                <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              {state.error}
            </div>
          )}

          {/* Botón */}
          <button
            type="submit"
            disabled={isPending}
            className="btn-primary w-full h-12 text-base mt-2 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isPending ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                </svg>
                Verificando…
              </span>
            ) : (
              "Iniciar sesión"
            )}
          </button>
        </form>
      </div>

      {/* Links adicionales */}
      <div className="text-center mt-6 space-y-2">
        <p className="text-sm text-[var(--color-gris)]">
          ¿No tienes cuenta?{" "}
          <Link href="/auth/register" className="text-[var(--color-dorado)] hover:underline font-medium">
            Regístrate gratis
          </Link>
        </p>
        <p className="text-sm text-[var(--color-gris)]">
          <Link href="/" className="hover:text-[var(--color-dorado)] transition-colors">
            ← Volver al sitio
          </Link>
        </p>
      </div>
    </div>
  );
}
