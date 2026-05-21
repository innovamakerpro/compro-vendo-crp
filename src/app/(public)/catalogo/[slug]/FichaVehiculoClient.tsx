"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";
import { Vehiculo } from "@/types/vehiculo";
import { formatPrecio, formatKm, calcularDescuento, capitalizar } from "@/utils/formatters";
import { CONTACTO } from "@/utils/constants";
import VehicleCard from "@/components/vehiculos/VehicleCard";
import FavoriteButton from "@/components/vehiculos/FavoriteButton";

interface FichaVehiculoClientProps {
  vehiculo: Vehiculo;
  similares: Vehiculo[];
}

export default function FichaVehiculoClient({ vehiculo, similares }: FichaVehiculoClientProps) {
  const [imagenActiva, setImagenActiva] = useState(0);

  const descuento = vehiculo.precio_anterior
    ? calcularDescuento(vehiculo.precio_anterior, vehiculo.precio)
    : 0;

  const imagenes = vehiculo.imagenes || [];

  // Ficha técnica
  const especificaciones = [
    { label: "Marca", valor: vehiculo.marca },
    { label: "Modelo", valor: vehiculo.modelo },
    { label: "Versión", valor: vehiculo.version },
    { label: "Año", valor: vehiculo.anio },
    { label: "Kilometraje", valor: formatKm(vehiculo.kilometraje) },
    { label: "Combustible", valor: capitalizar(vehiculo.combustible) },
    { label: "Cambio", valor: capitalizar(vehiculo.cambio) },
    { label: "Carrocería", valor: capitalizar(vehiculo.carroceria) },
    { label: "Potencia", valor: vehiculo.potencia ? `${vehiculo.potencia} CV` : null },
    { label: "Color", valor: vehiculo.color },
    { label: "Plazas", valor: vehiculo.plazas },
    { label: "Puertas", valor: vehiculo.puertas },
  ].filter((e) => e.valor);

  // Cuota mensual estimada (60 meses)
  const cuotaMensual = Math.round(vehiculo.precio / 60);

  // Navegación de galería
  const irAnterior = () => {
    setImagenActiva((prev) => (prev > 0 ? prev - 1 : imagenes.length - 1));
  };
  const irSiguiente = () => {
    setImagenActiva((prev) => (prev < imagenes.length - 1 ? prev + 1 : 0));
  };

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-[var(--color-gris)] mb-8" aria-label="Migas de pan">
          <Link href="/" className="hover:text-[var(--color-dorado)] transition-colors">Inicio</Link>
          <span>/</span>
          <Link href="/catalogo" className="hover:text-[var(--color-dorado)] transition-colors">Catálogo</Link>
          <span>/</span>
          <span className="text-[var(--color-blanco)]">{vehiculo.marca} {vehiculo.modelo}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Columna izquierda: Galería */}
          <div className="lg:col-span-3">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="rounded-2xl overflow-hidden bg-[var(--color-negro-2)] border border-[var(--color-borde)]"
            >
              {/* Imagen principal */}
              <div className="relative aspect-[16/10] bg-[var(--color-negro-3)]">
                {imagenes[imagenActiva] ? (
                  <Image
                    src={imagenes[imagenActiva].url}
                    alt={`${vehiculo.marca} ${vehiculo.modelo} - Foto ${imagenActiva + 1}`}
                    fill
                    sizes="(max-width: 1024px) 100vw, 60vw"
                    className="object-cover"
                    priority
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center text-[var(--color-gris-oscuro)] gap-4">
                    <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.5">
                      <rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><path d="m21 15-5-5L5 21" />
                    </svg>
                    <span className="text-sm">Imágenes próximamente</span>
                  </div>
                )}

                {/* Badges */}
                <div className="absolute top-4 left-4 flex gap-2">
                  <span className={`badge ${
                    vehiculo.estado === "disponible" ? "badge-disponible" :
                    vehiculo.estado === "reservado" ? "badge-reservado" : "badge-vendido"
                  }`}>
                    {capitalizar(vehiculo.estado)}
                  </span>
                  {descuento > 0 && (
                    <span className="badge bg-red-500/90 text-white font-bold">
                      -{descuento}%
                    </span>
                  )}
                </div>

                {/* Favorito icon */}
                <div className="absolute top-4 right-4 z-10">
                  <FavoriteButton vehicleId={vehiculo.id} variant="icon" />
                </div>

                {/* Contador de fotos */}
                {imagenes.length > 0 && (
                  <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-sm text-white text-xs px-3 py-1.5 rounded-full">
                    {imagenActiva + 1} / {imagenes.length}
                  </div>
                )}

                {/* Flechas de navegación */}
                {imagenes.length > 1 && (
                  <>
                    <button
                      onClick={irAnterior}
                      className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm text-white flex items-center justify-center hover:bg-black/70 transition-all opacity-0 group-hover:opacity-100 hover:opacity-100 focus:opacity-100"
                      aria-label="Imagen anterior"
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M15 18l-6-6 6-6" />
                      </svg>
                    </button>
                    <button
                      onClick={irSiguiente}
                      className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm text-white flex items-center justify-center hover:bg-black/70 transition-all opacity-0 group-hover:opacity-100 hover:opacity-100 focus:opacity-100"
                      aria-label="Imagen siguiente"
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M9 18l6-6-6-6" />
                      </svg>
                    </button>
                  </>
                )}
              </div>

              {/* Thumbnails */}
              {imagenes.length > 1 && (
                <div className="flex gap-2 p-4 overflow-x-auto">
                  {imagenes.map((img, i) => (
                    <button
                      key={img.id}
                      onClick={() => setImagenActiva(i)}
                      className={`relative w-20 h-14 rounded-lg overflow-hidden shrink-0 border-2 transition-all ${
                        i === imagenActiva
                          ? "border-[var(--color-dorado)]"
                          : "border-transparent opacity-60 hover:opacity-100"
                      }`}
                    >
                      <Image src={img.url} alt="" fill sizes="80px" className="object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </motion.div>

            {/* Descripción */}
            {vehiculo.descripcion && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="mt-6 p-6 rounded-2xl bg-[var(--color-negro-2)] border border-[var(--color-borde)]"
              >
                <h2 className="text-lg font-bold font-[family-name:var(--font-heading)] mb-4">Descripción</h2>
                <p className="text-sm text-[var(--color-gris-claro)] leading-relaxed whitespace-pre-line">
                  {vehiculo.descripcion}
                </p>
              </motion.div>
            )}

            {/* Daños y Garantía */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
              {vehiculo.garantia && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="p-5 rounded-2xl bg-[var(--color-negro-2)] border border-green-500/20"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--color-disponible)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><path d="m9 12 2 2 4-4" />
                    </svg>
                    <h3 className="text-sm font-bold text-[var(--color-disponible)]">Garantía</h3>
                  </div>
                  <p className="text-sm text-[var(--color-gris-claro)]">{vehiculo.garantia}</p>
                </motion.div>
              )}
              {vehiculo.danios && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35 }}
                  className="p-5 rounded-2xl bg-[var(--color-negro-2)] border border-amber-500/20"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--color-reservado)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" /><line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" />
                    </svg>
                    <h3 className="text-sm font-bold text-[var(--color-reservado)]">Daños conocidos</h3>
                  </div>
                  <p className="text-sm text-[var(--color-gris-claro)]">{vehiculo.danios}</p>
                </motion.div>
              )}
            </div>
          </div>

          {/* Columna derecha: Info y contacto */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="sticky top-28 space-y-6"
            >
              {/* Título y precio */}
              <div className="p-6 rounded-2xl bg-[var(--color-negro-2)] border border-[var(--color-borde)]">
                <h1 className="text-2xl sm:text-3xl font-bold font-[family-name:var(--font-heading)] mb-2">
                  {vehiculo.marca} {vehiculo.modelo}
                </h1>
                {vehiculo.version && (
                  <p className="text-sm text-[var(--color-gris)] mb-4">{vehiculo.version}</p>
                )}

                {/* Botón favorito */}
                <div className="mb-6">
                  <FavoriteButton vehicleId={vehiculo.id} variant="full" />
                </div>

                {/* Precio */}
                <div className="mb-6">
                  {vehiculo.precio_anterior && vehiculo.precio_anterior > vehiculo.precio && (
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-base text-[var(--color-gris)] line-through">
                        {formatPrecio(vehiculo.precio_anterior)}
                      </span>
                      <span className="badge bg-red-500/90 text-white text-xs font-bold">
                        Ahorra {formatPrecio(vehiculo.precio_anterior - vehiculo.precio)}
                      </span>
                    </div>
                  )}
                  <span className="text-4xl font-extrabold text-gradient font-[family-name:var(--font-heading)]">
                    {formatPrecio(vehiculo.precio)}
                  </span>
                </div>

                {/* Financiación highlight */}
                <div className="p-4 rounded-xl bg-[var(--color-dorado-bg)] border border-[var(--color-dorado)]/20 mb-6">
                  <div className="flex items-center gap-2 text-[var(--color-dorado)] text-sm font-medium">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="6" width="20" height="12" rx="2" /><circle cx="12" cy="12" r="2" />
                    </svg>
                    Financiación disponible a medida
                  </div>
                  <p className="text-xs text-[var(--color-gris)] mt-1">
                    Desde {formatPrecio(cuotaMensual)}/mes • Hasta 84 meses • Sin entrada obligatoria
                  </p>
                  <Link
                    href="/financiacion"
                    className="text-xs text-[var(--color-dorado)] hover:underline mt-2 inline-block"
                  >
                    Más información sobre financiación →
                  </Link>
                </div>

                {/* Botones de contacto */}
                <div className="space-y-3">
                  <a
                    href={`${CONTACTO.whatsappLink}?text=${encodeURIComponent(
                      `Hola, me interesa el ${vehiculo.marca} ${vehiculo.modelo} ${vehiculo.anio} (${formatPrecio(vehiculo.precio)}). ¿Sigue disponible?`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary w-full py-4 text-base"
                    id="ficha-whatsapp"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                    Contactar por WhatsApp
                  </a>
                  <a
                    href={CONTACTO.telefonoLink}
                    className="btn-secondary w-full py-4 text-base"
                    id="ficha-llamar"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                    Llamar: {CONTACTO.telefono}
                  </a>
                </div>
              </div>

              {/* Ficha técnica */}
              <div className="p-6 rounded-2xl bg-[var(--color-negro-2)] border border-[var(--color-borde)]">
                <h2 className="text-lg font-bold font-[family-name:var(--font-heading)] mb-4 flex items-center gap-2">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--color-dorado)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><path d="M14 2v6h6" />
                  </svg>
                  Ficha técnica
                </h2>
                <div className="space-y-0">
                  {especificaciones.map((spec, i) => (
                    <div
                      key={spec.label}
                      className={`flex justify-between items-center py-3 text-sm ${
                        i < especificaciones.length - 1 ? "border-b border-[var(--color-borde)]" : ""
                      }`}
                    >
                      <span className="text-[var(--color-gris)]">{spec.label}</span>
                      <span className="text-[var(--color-blanco)] font-medium">{spec.valor}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick info - highlights */}
              <div className="grid grid-cols-2 gap-3">
                <div className="p-4 rounded-xl bg-[var(--color-negro-2)] border border-[var(--color-borde)] text-center">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-dorado)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="mx-auto mb-2">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  </svg>
                  <span className="text-xs text-[var(--color-gris)] block">Garantía</span>
                  <span className="text-xs text-[var(--color-blanco)] font-medium">{vehiculo.garantia ? "Incluida" : "Consultar"}</span>
                </div>
                <div className="p-4 rounded-xl bg-[var(--color-negro-2)] border border-[var(--color-borde)] text-center">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-dorado)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="mx-auto mb-2">
                    <rect x="1" y="3" width="15" height="13" /><polygon points="23 7 16 12 16 2 23 7" />
                  </svg>
                  <span className="text-xs text-[var(--color-gris)] block">IVA</span>
                  <span className="text-xs text-[var(--color-blanco)] font-medium">Incluido</span>
                </div>
                <div className="p-4 rounded-xl bg-[var(--color-negro-2)] border border-[var(--color-borde)] text-center">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-dorado)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="mx-auto mb-2">
                    <rect x="1" y="3" width="22" height="5" rx="2" /><path d="M1 8v10a2 2 0 0 0 2 2h18a2 2 0 0 0 2-2V8" /><path d="M10 12h4" />
                  </svg>
                  <span className="text-xs text-[var(--color-gris)] block">Transferencia</span>
                  <span className="text-xs text-[var(--color-blanco)] font-medium">Gestión incluida</span>
                </div>
                <div className="p-4 rounded-xl bg-[var(--color-negro-2)] border border-[var(--color-borde)] text-center">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-dorado)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="mx-auto mb-2">
                    <circle cx="12" cy="12" r="10" /><path d="m9 12 2 2 4-4" />
                  </svg>
                  <span className="text-xs text-[var(--color-gris)] block">Revisión</span>
                  <span className="text-xs text-[var(--color-blanco)] font-medium">120 puntos</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Coches similares */}
        {similares.length > 0 && (
          <section className="mt-20">
            <h2 className="text-2xl font-bold font-[family-name:var(--font-heading)] mb-8">
              Coches <span className="text-gradient">similares</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {similares.map((v, i) => (
                <VehicleCard key={v.id} vehiculo={v} index={i} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
