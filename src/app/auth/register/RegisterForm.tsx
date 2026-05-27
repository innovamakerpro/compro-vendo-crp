"use client";

import { useActionState } from "react";
import Link from "next/link";
import { registerAction } from "./actions";

export default function RegisterForm() {
  const [state, action, isPending] = useActionState(registerAction, null);

  // Mensaje de éxito (confirmación por email activa)
  if (state?.success) {
    return (
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <span className="section-tag mb-4 inline-block">¡Ya casi estás!</span>
          <h1 className="text-3xl font-extrabold font-[family-name:var(--font-heading)]">
            Compro y Vendo <span className="text-gradient">CRP</span>
          </h1>
        </div>

        <div className="bg-[var(--color-negro-2)] border border-[var(--color-borde)] rounded-2xl p-8 shadow-[var(--shadow-card)] text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[var(--color-dorado-bg)] flex items-center justify-center">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--color-dorado)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
            </svg>
          </div>
          <h2 className="text-xl font-bold font-[family-name:var(--font-heading)] mb-2">
            Revisa tu email
          </h2>
          <p className="text-sm text-[var(--color-gris)] mb-6">
            Hemos enviado un enlace de confirmación a tu correo electrónico. Haz clic en él para activar tu cuenta.
          </p>
          <Link href="/auth/login" className="btn-primary inline-flex">
            Ir al inicio de sesión
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md">
      {/* Cabecera */}
      <div className="text-center mb-10">
        <span className="section-tag mb-4 inline-block">Crear cuenta</span>
        <h1 className="text-3xl font-extrabold font-[family-name:var(--font-heading)]">
          Compro y Vendo <span className="text-gradient">CRP</span>
        </h1>
        <p className="text-sm text-[var(--color-gris)] mt-2">
          Regístrate para guardar favoritos y recibir alertas de precio
        </p>
      </div>

      {/* Formulario */}
      <div className="bg-[var(--color-negro-2)] border border-[var(--color-borde)] rounded-2xl p-8 shadow-[var(--shadow-card)]">
        <form action={action} className="space-y-4">

          {/* Nombre + Apellidos */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="reg-nombre" className="block text-xs font-medium text-[var(--color-gris-claro)] uppercase tracking-wider mb-1.5">
                Nombre <span className="text-red-400">*</span>
              </label>
              <input
                id="reg-nombre"
                name="nombre"
                type="text"
                required
                placeholder="Juan"
                className="filter-input w-full h-11"
                disabled={isPending}
              />
            </div>
            <div>
              <label htmlFor="reg-apellidos" className="block text-xs font-medium text-[var(--color-gris-claro)] uppercase tracking-wider mb-1.5">
                Apellidos <span className="text-red-400">*</span>
              </label>
              <input
                id="reg-apellidos"
                name="apellidos"
                type="text"
                required
                placeholder="García López"
                className="filter-input w-full h-11"
                disabled={isPending}
              />
            </div>
          </div>

          {/* Teléfono */}
          <div>
            <label htmlFor="reg-telefono" className="block text-xs font-medium text-[var(--color-gris-claro)] uppercase tracking-wider mb-1.5">
              Teléfono
            </label>
            <div className="relative">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--color-gris)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              <input
                id="reg-telefono"
                name="telefono"
                type="tel"
                placeholder="633 391 102"
                className="filter-input pl-11 w-full h-11"
                disabled={isPending}
              />
            </div>
          </div>

          {/* Tipo documento + Nº documento */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="reg-tipo-documento" className="block text-xs font-medium text-[var(--color-gris-claro)] uppercase tracking-wider mb-1.5">
                Tipo documento <span className="text-red-400">*</span>
              </label>
              <select
                id="reg-tipo-documento"
                name="tipo_documento"
                required
                className="filter-input w-full h-11"
                disabled={isPending}
              >
                <option value="">Seleccionar...</option>
                <option value="DNI">DNI</option>
                <option value="NIE">NIE</option>
                <option value="Pasaporte">Pasaporte</option>
              </select>
            </div>
            <div>
              <label htmlFor="reg-numero-documento" className="block text-xs font-medium text-[var(--color-gris-claro)] uppercase tracking-wider mb-1.5">
                Nº documento <span className="text-red-400">*</span>
              </label>
              <input
                id="reg-numero-documento"
                name="numero_documento"
                type="text"
                required
                placeholder="Ej: 12345678A"
                className="filter-input w-full h-11"
                disabled={isPending}
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label htmlFor="reg-email" className="block text-xs font-medium text-[var(--color-gris-claro)] uppercase tracking-wider mb-1.5">
              Email <span className="text-red-400">*</span>
            </label>
            <div className="relative">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--color-gris)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
                <rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
              <input
                id="reg-email"
                name="email"
                type="email"
                autoComplete="email"
                required
                placeholder="tu@email.com"
                className="filter-input pl-11 w-full h-11"
                disabled={isPending}
              />
            </div>
          </div>

          {/* Contraseña */}
          <div>
            <label htmlFor="reg-password" className="block text-xs font-medium text-[var(--color-gris-claro)] uppercase tracking-wider mb-1.5">
              Contraseña <span className="text-red-400">*</span>
            </label>
            <div className="relative">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--color-gris)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
              <input
                id="reg-password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                minLength={6}
                placeholder="Mínimo 6 caracteres"
                className="filter-input pl-11 w-full h-11"
                disabled={isPending}
              />
            </div>
          </div>

          {/* Confirmar contraseña */}
          <div>
            <label htmlFor="reg-confirm" className="block text-xs font-medium text-[var(--color-gris-claro)] uppercase tracking-wider mb-1.5">
              Confirmar contraseña <span className="text-red-400">*</span>
            </label>
            <div className="relative">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--color-gris)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
              <input
                id="reg-confirm"
                name="confirm"
                type="password"
                autoComplete="new-password"
                required
                minLength={6}
                placeholder="Repite la contraseña"
                className="filter-input pl-11 w-full h-11"
                disabled={isPending}
              />
            </div>
          </div>

          {/* Privacidad */}
          <div className="flex items-start gap-3 pt-1">
            <input
              id="reg-privacy"
              name="privacy"
              type="checkbox"
              required
              className="mt-1 w-4 h-4 rounded accent-[var(--color-dorado)] cursor-pointer shrink-0"
              disabled={isPending}
            />
            <label htmlFor="reg-privacy" className="text-xs text-[var(--color-gris)] cursor-pointer leading-relaxed">
              He leído y acepto la{" "}
              <Link href="/politica-privacidad" target="_blank" className="text-[var(--color-dorado)] hover:underline">
                política de privacidad
              </Link>{" "}
              y el{" "}
              <Link href="/aviso-legal" target="_blank" className="text-[var(--color-dorado)] hover:underline">
                aviso legal
              </Link>.
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
                Creando cuenta…
              </span>
            ) : (
              "Crear mi cuenta"
            )}
          </button>
        </form>
      </div>

      {/* Links adicionales */}
      <div className="text-center mt-6 space-y-2">
        <p className="text-sm text-[var(--color-gris)]">
          ¿Ya tienes cuenta?{" "}
          <Link href="/auth/login" className="text-[var(--color-dorado)] hover:underline font-medium">
            Inicia sesión
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
