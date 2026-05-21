"use client";

import { useState, useTransition } from "react";
import Image from "next/image";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { formatPrecio, formatKm, capitalizar } from "@/utils/formatters";

interface FavVehiculo {
  id: string;
  marca: string;
  modelo: string;
  version: string | null;
  slug: string;
  anio: number;
  kilometraje: number;
  precio: number;
  precio_anterior: number | null;
  estado: string;
  combustible: string;
  cambio: string;
  imagenUrl: string | null;
}

interface Props {
  vehiculos: FavVehiculo[];
  userId: string;
}

export default function FavoritosClient({ vehiculos: initial, userId }: Props) {
  const [vehiculos, setVehiculos] = useState(initial);
  const [removing, setRemoving] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const supabase = createClient();

  function handleRemove(vehicleId: string) {
    setRemoving(vehicleId);
    startTransition(async () => {
      await supabase
        .from("favorites")
        .delete()
        .eq("user_id", userId)
        .eq("vehicle_id", vehicleId);

      setVehiculos((prev) => prev.filter((v) => v.id !== vehicleId));
      setRemoving(null);
    });
  }

  if (vehiculos.length === 0) {
    return (
      <div className="bg-[var(--color-negro-2)] border border-[var(--color-borde)] rounded-xl p-12 text-center">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-500/10 flex items-center justify-center">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#EF4444" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.6">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        </div>
        <h2 className="text-lg font-bold font-[family-name:var(--font-heading)] text-[var(--color-blanco)] mb-2">
          Has quitado todos los favoritos
        </h2>
        <p className="text-sm text-[var(--color-gris)] mb-6">
          Vuelve al catálogo para encontrar tu próximo coche.
        </p>
        <Link href="/catalogo" className="btn-primary inline-flex">
          Explorar catálogo
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {vehiculos.map((v) => {
        const isRemoving = removing === v.id;
        const estadoClass =
          v.estado === "disponible" ? "badge-disponible" :
          v.estado === "reservado" ? "badge-reservado" : "badge-vendido";

        return (
          <div
            key={v.id}
            className={`flex flex-col sm:flex-row gap-4 p-4 bg-[var(--color-negro-2)] border border-[var(--color-borde)] rounded-xl hover:border-[var(--color-borde-hover)] transition-all ${
              isRemoving ? "opacity-50 pointer-events-none" : ""
            }`}
          >
            {/* Imagen */}
            <Link href={`/catalogo/${v.slug}`} className="relative w-full sm:w-48 h-32 rounded-lg overflow-hidden bg-[var(--color-negro-3)] shrink-0">
              {v.imagenUrl ? (
                <Image
                  src={v.imagenUrl}
                  alt={`${v.marca} ${v.modelo}`}
                  fill
                  sizes="(max-width: 640px) 100vw, 192px"
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-[var(--color-gris-oscuro)]">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.3">
                    <rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><path d="m21 15-5-5L5 21" />
                  </svg>
                </div>
              )}
              <span className={`absolute top-2 left-2 badge ${estadoClass} text-[10px]`}>
                {capitalizar(v.estado)}
              </span>
            </Link>

            {/* Info */}
            <div className="flex-1 flex flex-col justify-between min-w-0">
              <div>
                <Link href={`/catalogo/${v.slug}`} className="group">
                  <h3 className="text-base font-bold font-[family-name:var(--font-heading)] text-[var(--color-blanco)] group-hover:text-[var(--color-dorado)] transition-colors truncate">
                    {v.marca} {v.modelo}
                  </h3>
                </Link>
                {v.version && (
                  <p className="text-xs text-[var(--color-gris)] truncate">{v.version}</p>
                )}
                <div className="flex items-center gap-3 text-xs text-[var(--color-gris)] mt-2 flex-wrap">
                  <span>{v.anio}</span>
                  <span>•</span>
                  <span>{formatKm(v.kilometraje)}</span>
                  <span>•</span>
                  <span>{capitalizar(v.combustible)}</span>
                  <span>•</span>
                  <span>{capitalizar(v.cambio)}</span>
                </div>
              </div>

              <div className="flex items-end justify-between mt-3">
                <div>
                  {v.precio_anterior && v.precio_anterior > v.precio && (
                    <span className="text-xs text-[var(--color-gris)] line-through block">
                      {formatPrecio(v.precio_anterior)}
                    </span>
                  )}
                  <span className="text-xl font-bold text-gradient font-[family-name:var(--font-heading)]">
                    {formatPrecio(v.precio)}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <Link
                    href={`/catalogo/${v.slug}`}
                    className="px-3 py-2 rounded-lg text-xs font-medium bg-[var(--color-negro-3)] text-[var(--color-gris-claro)] border border-[var(--color-borde)] hover:border-[var(--color-dorado)]/30 hover:text-[var(--color-dorado)] transition-colors"
                  >
                    Ver ficha
                  </Link>
                  <button
                    onClick={() => handleRemove(v.id)}
                    disabled={isPending}
                    className="px-3 py-2 rounded-lg text-xs font-medium text-red-400 bg-red-500/10 border border-red-500/20 hover:bg-red-500/20 transition-colors disabled:opacity-60"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="inline mr-1 -mt-0.5">
                      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                    </svg>
                    Quitar
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
