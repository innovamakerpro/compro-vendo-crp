import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Mi panel — Compro y Vendo CRP",
};

export default async function ClienteDashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect("/auth/login");

  // Datos del perfil
  const { data: profile } = await supabase
    .from("profiles")
    .select("nombre, apellidos, email, telefono")
    .eq("id", user.id)
    .single();

  // Contar favoritos
  const { count: favCount } = await supabase
    .from("favorites")
    .select("*", { count: "exact", head: true })
    .eq("user_id", user.id);

  const nombre = profile?.nombre || "Usuario";

  return (
    <div>
      {/* Saludo */}
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold font-[family-name:var(--font-heading)]">
          Hola, <span className="text-gradient">{nombre}</span>
        </h1>
        <p className="text-[var(--color-gris)] text-sm mt-1">
          Bienvenido a tu panel personal. Desde aquí puedes gestionar tus favoritos y preferencias.
        </p>
      </div>

      {/* Tarjetas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">

        {/* Mis favoritos */}
        <Link href="/cliente/favoritos" className="group">
          <div className="bg-[var(--color-negro-2)] border border-[var(--color-borde)] rounded-xl p-6 hover:border-[var(--color-borde-hover)] transition-all duration-300 group-hover:shadow-[var(--shadow-card-hover)] group-hover:-translate-y-1 h-full">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-xl bg-red-500/10 flex items-center justify-center shrink-0">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#EF4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
              </div>
              <div>
                <h2 className="font-bold font-[family-name:var(--font-heading)] text-[var(--color-blanco)] group-hover:text-[var(--color-dorado)] transition-colors">
                  Mis favoritos
                </h2>
                <p className="text-xs text-[var(--color-gris)]">
                  {favCount ?? 0} vehículo{favCount !== 1 ? "s" : ""} guardado{favCount !== 1 ? "s" : ""}
                </p>
              </div>
            </div>
            <p className="text-sm text-[var(--color-gris)]">
              Revisa los coches que has guardado y compara precios.
            </p>
          </div>
        </Link>

        {/* Mi perfil */}
        <div className="bg-[var(--color-negro-2)] border border-[var(--color-borde)] rounded-xl p-6 h-full">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center shrink-0">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
              </svg>
            </div>
            <div>
              <h2 className="font-bold font-[family-name:var(--font-heading)] text-[var(--color-blanco)]">
                Mi perfil
              </h2>
              <p className="text-xs text-[var(--color-gris)]">Datos personales</p>
            </div>
          </div>
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2 text-[var(--color-gris)]">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
                <rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
              <span className="truncate">{profile?.email ?? user.email}</span>
            </div>
            {profile?.telefono && (
              <div className="flex items-center gap-2 text-[var(--color-gris)]">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                <span>{profile.telefono}</span>
              </div>
            )}
            <p className="text-xs text-[var(--color-gris)]">
              {profile?.nombre} {profile?.apellidos}
            </p>
          </div>
        </div>

        {/* Alertas (preparado) */}
        <div className="bg-[var(--color-negro-2)] border border-[var(--color-borde)] rounded-xl p-6 h-full relative overflow-hidden">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center shrink-0">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" />
              </svg>
            </div>
            <div>
              <h2 className="font-bold font-[family-name:var(--font-heading)] text-[var(--color-blanco)]">
                Alertas de precio
              </h2>
              <p className="text-xs text-[var(--color-gris)]">Próximamente</p>
            </div>
          </div>
          <p className="text-sm text-[var(--color-gris)]">
            Recibe notificaciones cuando baje el precio de un coche que te interese.
          </p>
          {/* Overlay "próximamente" */}
          <div className="absolute inset-0 bg-[var(--color-negro-2)]/60 backdrop-blur-[2px] flex items-center justify-center rounded-xl">
            <span className="section-tag text-xs">Próximamente</span>
          </div>
        </div>
      </div>

      {/* CTA catálogo */}
      <div className="mt-10 text-center">
        <p className="text-sm text-[var(--color-gris)] mb-4">
          ¿Buscas tu próximo coche? Explora nuestro catálogo actualizado.
        </p>
        <Link href="/catalogo" className="btn-primary inline-flex">
          Ver catálogo
        </Link>
      </div>
    </div>
  );
}
