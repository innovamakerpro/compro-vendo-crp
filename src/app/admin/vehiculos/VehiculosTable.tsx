"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { formatPrecio, formatKm } from "@/utils/formatters";
import { cambiarEstadoVehiculo, eliminarVehiculo } from "./actions";

const ESTADO_COLORS: Record<string, string> = {
  disponible: "text-green-400 bg-green-400/10 border-green-400/20",
  reservado:  "text-yellow-400 bg-yellow-400/10 border-yellow-400/20",
  vendido:    "text-red-400 bg-red-400/10 border-red-400/20",
  oculto:     "text-[var(--color-gris)] bg-white/5 border-white/10",
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function VehiculosTable({ vehiculos }: { vehiculos: any[] }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  function handleEstado(id: string, estado: string) {
    startTransition(async () => {
      await cambiarEstadoVehiculo(id, estado);
      router.refresh();
    });
  }

  function handleEliminar(id: string, nombre: string) {
    if (!confirm(`¿Eliminar "${nombre}"? Esta acción no se puede deshacer.`)) return;
    startTransition(async () => {
      await eliminarVehiculo(id);
      router.refresh();
    });
  }

  if (vehiculos.length === 0) {
    return (
      <div className="bg-[var(--color-negro-2)] border border-[var(--color-borde)] rounded-xl p-16 text-center">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--color-gris-oscuro)" strokeWidth="1" className="mx-auto mb-4">
          <path d="M19 17H5a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2Z" />
          <path d="M7 9 9 4h6l2 5" /><circle cx="7.5" cy="17" r="1.5" /><circle cx="16.5" cy="17" r="1.5" />
        </svg>
        <p className="text-[var(--color-gris)] mb-4">No hay vehículos todavía</p>
        <Link href="/admin/vehiculos/nuevo" className="btn-primary text-sm px-5 py-2.5">
          + Añadir el primero
        </Link>
      </div>
    );
  }

  return (
    <div className={`bg-[var(--color-negro-2)] border border-[var(--color-borde)] rounded-xl overflow-hidden ${isPending ? "opacity-60 pointer-events-none" : ""}`}>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[var(--color-borde)] text-xs text-[var(--color-gris)] uppercase tracking-wider">
              <th className="text-left px-4 py-3 w-16">Foto</th>
              <th className="text-left px-4 py-3">Vehículo</th>
              <th className="text-right px-4 py-3">Precio</th>
              <th className="text-right px-4 py-3">Km</th>
              <th className="text-center px-4 py-3">Estado</th>
              <th className="text-right px-4 py-3">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--color-borde)]">
            {vehiculos.map((v) => {
              const imagenPrincipal = v.vehicle_images?.find((i: { es_principal: boolean }) => i.es_principal) ?? v.vehicle_images?.[0];
              const nombre = `${v.marca} ${v.modelo} ${v.anio}`;
              return (
                <tr key={v.id} className="hover:bg-[var(--color-negro-3)] transition-colors">
                  {/* Foto */}
                  <td className="px-4 py-3">
                    <div className="w-12 h-9 rounded-lg overflow-hidden bg-[var(--color-negro-3)] shrink-0">
                      {imagenPrincipal ? (
                        <Image src={imagenPrincipal.url} alt={nombre} width={48} height={36} className="object-cover w-full h-full" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--color-gris-oscuro)" strokeWidth="1.5">
                            <rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><path d="m21 15-5-5L5 21" />
                          </svg>
                        </div>
                      )}
                    </div>
                  </td>

                  {/* Vehículo */}
                  <td className="px-4 py-3">
                    <div className="font-medium text-[var(--color-blanco)]">
                      {v.marca} {v.modelo}
                    </div>
                    <div className="text-xs text-[var(--color-gris)] mt-0.5">
                      {v.version ? `${v.version} · ` : ""}{v.anio} · {v.combustible}
                    </div>
                  </td>

                  {/* Precio */}
                  <td className="px-4 py-3 text-right font-semibold text-[var(--color-dorado)]">
                    {formatPrecio(v.precio)}
                  </td>

                  {/* Km */}
                  <td className="px-4 py-3 text-right text-[var(--color-gris-claro)]">
                    {formatKm(v.kilometraje)}
                  </td>

                  {/* Estado */}
                  <td className="px-4 py-3 text-center">
                    <select
                      defaultValue={v.estado}
                      onChange={(e) => handleEstado(v.id, e.target.value)}
                      className={`text-xs font-medium px-2 py-1 rounded-full border bg-transparent cursor-pointer ${ESTADO_COLORS[v.estado] ?? ""}`}
                    >
                      <option value="disponible">Disponible</option>
                      <option value="reservado">Reservado</option>
                      <option value="vendido">Vendido</option>
                      <option value="oculto">Oculto</option>
                    </select>
                  </td>

                  {/* Acciones */}
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/catalogo/${v.slug}`}
                        target="_blank"
                        title="Ver en web"
                        className="p-1.5 rounded-lg text-[var(--color-gris)] hover:text-[var(--color-blanco)] hover:bg-[var(--color-negro-4)] transition-colors"
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" />
                        </svg>
                      </Link>
                      <Link
                        href={`/admin/vehiculos/${v.id}/editar`}
                        title="Editar"
                        className="p-1.5 rounded-lg text-[var(--color-gris)] hover:text-[var(--color-dorado)] hover:bg-[var(--color-dorado-bg)] transition-colors"
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                        </svg>
                      </Link>
                      <button
                        onClick={() => handleEliminar(v.id, nombre)}
                        title="Eliminar"
                        className="p-1.5 rounded-lg text-[var(--color-gris)] hover:text-red-400 hover:bg-red-500/10 transition-colors"
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="3 6 5 6 21 6" /><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" /><path d="M10 11v6M14 11v6" /><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
