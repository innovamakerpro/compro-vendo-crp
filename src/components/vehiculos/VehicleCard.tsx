"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Vehiculo } from "@/types/vehiculo";
import { formatPrecio, formatKm, calcularDescuento, capitalizar } from "@/utils/formatters";
import FavoriteButton from "@/components/vehiculos/FavoriteButton";

interface VehicleCardProps {
  vehiculo: Vehiculo;
  index?: number;
}

// Iconos compactos para las specs
function FuelIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 22V4a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v18" /><path d="M13 10h2a2 2 0 0 1 2 2v8" /><path d="M20 10V7a1 1 0 0 0-1-1h-1" /><rect x="6" y="7" width="4" height="5" />
    </svg>
  );
}

function GearIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3" /><path d="M12 1v4m0 14v4M4.22 4.22l2.83 2.83m9.9 9.9 2.83 2.83M1 12h4m14 0h4M4.22 19.78l2.83-2.83m9.9-9.9 2.83-2.83" />
    </svg>
  );
}

function SpeedIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 12 L16 8" /><circle cx="12" cy="12" r="10" /><path d="M12 2a14.5 14.5 0 0 0 0 20" />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  );
}

export default function VehicleCard({ vehiculo, index = 0 }: VehicleCardProps) {
  const imagenPrincipal = vehiculo.imagenes?.find((img) => img.es_principal) || vehiculo.imagenes?.[0];
  const descuento = vehiculo.precio_anterior
    ? calcularDescuento(vehiculo.precio_anterior, vehiculo.precio)
    : 0;

  const estadoClass =
    vehiculo.estado === "disponible"
      ? "badge-disponible"
      : vehiculo.estado === "reservado"
      ? "badge-reservado"
      : "badge-vendido";

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
    >
      <Link href={`/catalogo/${vehiculo.slug}`} className="block vehicle-card group" id={`vehicle-card-${vehiculo.id}`}>
        {/* Imagen */}
        <div className="vehicle-card-image bg-[var(--color-negro-3)]">
          {imagenPrincipal ? (
            <Image
              src={imagenPrincipal.url}
              alt={`${vehiculo.marca} ${vehiculo.modelo} ${vehiculo.anio}`}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-[var(--color-gris)]">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.3">
                <rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><path d="m21 15-5-5L5 21" />
              </svg>
            </div>
          )}

          {/* Badges superpuestos */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            <span className={`badge ${estadoClass}`}>
              {capitalizar(vehiculo.estado)}
            </span>
            {vehiculo.destacado && (
              <span className="badge bg-[var(--color-dorado-bg)] text-[var(--color-dorado)] border border-[var(--color-dorado)]/20">
                ★ Destacado
              </span>
            )}
          </div>

          {/* Favorito + descuento */}
          <div className="absolute top-3 right-3 flex flex-col items-end gap-2">
            <FavoriteButton vehicleId={vehiculo.id} variant="icon" />
            {descuento > 0 && (
              <span className="badge bg-red-500/90 text-white font-bold">
                -{descuento}%
              </span>
            )}
          </div>
        </div>

        {/* Contenido */}
        <div className="p-5">
          {/* Título */}
          <h3 className="font-[family-name:var(--font-heading)] text-base font-bold text-[var(--color-blanco)] mb-1 group-hover:text-[var(--color-dorado)] transition-colors truncate">
            {vehiculo.marca} {vehiculo.modelo}
          </h3>
          {vehiculo.version && (
            <p className="text-xs text-[var(--color-gris)] mb-3 truncate">{vehiculo.version}</p>
          )}

          {/* Specs rápidas */}
          <div className="flex items-center gap-3 text-xs text-[var(--color-gris)] mb-4 flex-wrap">
            <span className="flex items-center gap-1">
              <CalendarIcon /> {vehiculo.anio}
            </span>
            <span className="flex items-center gap-1">
              <SpeedIcon /> {formatKm(vehiculo.kilometraje)}
            </span>
            <span className="flex items-center gap-1">
              <FuelIcon /> {capitalizar(vehiculo.combustible)}
            </span>
            <span className="flex items-center gap-1">
              <GearIcon /> {capitalizar(vehiculo.cambio)}
            </span>
          </div>

          {/* Precio */}
          <div className="flex items-end justify-between border-t border-[var(--color-borde)] pt-4">
            <div>
              {vehiculo.precio_anterior && vehiculo.precio_anterior > vehiculo.precio && (
                <span className="text-xs text-[var(--color-gris)] line-through block">
                  {formatPrecio(vehiculo.precio_anterior)}
                </span>
              )}
              <span className="text-xl font-bold text-gradient font-[family-name:var(--font-heading)]">
                {formatPrecio(vehiculo.precio)}
              </span>
            </div>
            <span className="text-xs text-[var(--color-dorado)] opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
              Ver más
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
