import { createAdminClient } from "@/lib/supabase/admin";

export const dynamic = "force-dynamic";

async function getStats() {
  const supabase = createAdminClient();
  const [{ data: vRaw }, { data: pRaw }] = await Promise.all([
    supabase.from("vehicles").select("estado, visitas"),
    supabase.from("profiles").select("rol"),
  ]);

  type VRow = { estado: string; visitas: number };
  type PRow = { rol: string };
  const vData = vRaw as VRow[] | null;
  const pData = pRaw as PRow[] | null;

  const total = vData?.length ?? 0;
  const disponibles = vData?.filter((v) => v.estado === "disponible").length ?? 0;
  const reservados = vData?.filter((v) => v.estado === "reservado").length ?? 0;
  const visitas = vData?.reduce((acc, v) => acc + (v.visitas ?? 0), 0) ?? 0;
  const clientes = pData?.filter((p) => p.rol === "cliente").length ?? 0;

  return { total, disponibles, reservados, visitas, clientes };
}

export default async function AdminDashboard() {
  const stats = await getStats();

  const tarjetas = [
    {
      label: "Vehículos en catálogo",
      valor: stats.total,
      sub: `${stats.disponibles} disponibles · ${stats.reservados} reservados`,
      color: "var(--color-dorado)",
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M19 17H5a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2Z" />
          <path d="M7 9 9 4h6l2 5" /><circle cx="7.5" cy="17" r="1.5" /><circle cx="16.5" cy="17" r="1.5" />
        </svg>
      ),
    },
    {
      label: "Total visitas",
      valor: stats.visitas.toLocaleString("es-ES"),
      sub: "Acumuladas en todo el catálogo",
      color: "#60A5FA",
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" /><circle cx="12" cy="12" r="3" />
        </svg>
      ),
    },
    {
      label: "Clientes registrados",
      valor: stats.clientes,
      sub: "Usuarios con cuenta activa",
      color: "#34D399",
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" />
          <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      ),
    },
  ];

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold font-[family-name:var(--font-heading)]">Dashboard</h1>
        <p className="text-[var(--color-gris)] text-sm mt-1">Resumen general del concesionario</p>
      </div>

      {/* Tarjetas de stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-10">
        {tarjetas.map((t) => (
          <div
            key={t.label}
            className="bg-[var(--color-negro-2)] border border-[var(--color-borde)] rounded-xl p-6"
          >
            <div className="flex items-start justify-between mb-4">
              <span className="text-xs font-medium text-[var(--color-gris)] uppercase tracking-wider">
                {t.label}
              </span>
              <span style={{ color: t.color }}>{t.icon}</span>
            </div>
            <div className="text-3xl font-bold font-[family-name:var(--font-heading)]" style={{ color: t.color }}>
              {t.valor}
            </div>
            <div className="text-xs text-[var(--color-gris)] mt-1">{t.sub}</div>
          </div>
        ))}
      </div>

      {/* Acceso rápido */}
      <div className="bg-[var(--color-negro-2)] border border-[var(--color-borde)] rounded-xl p-6">
        <h2 className="text-sm font-semibold text-[var(--color-gris-claro)] uppercase tracking-wider mb-4">
          Acceso rápido
        </h2>
        <div className="flex flex-wrap gap-3">
          <a
            href="/admin/vehiculos/nuevo"
            className="btn-primary text-sm px-5 py-2.5"
          >
            + Añadir vehículo
          </a>
          <a
            href="/admin/vehiculos"
            className="btn-secondary text-sm px-5 py-2.5"
          >
            Ver catálogo
          </a>
        </div>
      </div>
    </div>
  );
}
