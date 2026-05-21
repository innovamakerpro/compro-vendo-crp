"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import VehicleCard from "@/components/vehiculos/VehicleCard";
import { Vehiculo, FiltrosCatalogo } from "@/types/vehiculo";
import { MARCAS, COMBUSTIBLES, CAMBIOS, CARROCERIAS, ORDEN_OPCIONES } from "@/utils/constants";

interface Props {
  vehiculosIniciales: Vehiculo[];
}

export default function CatalogoClient({ vehiculosIniciales }: Props) {
  const [filtros, setFiltros] = useState<FiltrosCatalogo>({});
  const [mostrarFiltros, setMostrarFiltros] = useState(false);

  const vehiculosFiltrados = useMemo(() => {
    let resultado = [...vehiculosIniciales];

    if (filtros.marca) {
      resultado = resultado.filter((v) => v.marca === filtros.marca);
    }
    if (filtros.combustible) {
      resultado = resultado.filter((v) => v.combustible === filtros.combustible);
    }
    if (filtros.cambio) {
      resultado = resultado.filter((v) => v.cambio === filtros.cambio);
    }
    if (filtros.carroceria) {
      resultado = resultado.filter((v) => v.carroceria === filtros.carroceria);
    }
    if (filtros.precio_min) {
      resultado = resultado.filter((v) => v.precio >= filtros.precio_min!);
    }
    if (filtros.precio_max) {
      resultado = resultado.filter((v) => v.precio <= filtros.precio_max!);
    }
    if (filtros.anio_min) {
      resultado = resultado.filter((v) => v.anio >= filtros.anio_min!);
    }
    if (filtros.km_max) {
      resultado = resultado.filter((v) => v.kilometraje <= filtros.km_max!);
    }
    if (filtros.busqueda) {
      const q = filtros.busqueda.toLowerCase();
      resultado = resultado.filter(
        (v) =>
          v.marca.toLowerCase().includes(q) ||
          v.modelo.toLowerCase().includes(q) ||
          (v.version && v.version.toLowerCase().includes(q))
      );
    }

    switch (filtros.orden) {
      case "precio-asc":
        resultado.sort((a, b) => a.precio - b.precio);
        break;
      case "precio-desc":
        resultado.sort((a, b) => b.precio - a.precio);
        break;
      case "km-asc":
        resultado.sort((a, b) => a.kilometraje - b.kilometraje);
        break;
      case "anio-desc":
        resultado.sort((a, b) => b.anio - a.anio);
        break;
      default:
        resultado.sort(
          (a, b) =>
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );
    }

    return resultado;
  }, [vehiculosIniciales, filtros]);

  const actualizarFiltro = (clave: keyof FiltrosCatalogo, valor: string) => {
    setFiltros((prev) => ({
      ...prev,
      [clave]: valor || undefined,
    }));
  };

  const limpiarFiltros = () => setFiltros({});

  const hayFiltrosActivos = Object.values(filtros).some((v) => v !== undefined && v !== "");

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <span className="section-tag mb-4 inline-block">Nuestro stock</span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-[family-name:var(--font-heading)]">
              Catálogo de <span className="text-gradient">vehículos</span>
            </h1>
            <p className="text-[var(--color-gris)] mt-3">
              {vehiculosFiltrados.length} vehículo{vehiculosFiltrados.length !== 1 ? "s" : ""} encontrado{vehiculosFiltrados.length !== 1 ? "s" : ""}
            </p>
          </motion.div>
        </div>

        {/* Barra de búsqueda y toggle de filtros */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <svg
              width="18" height="18" viewBox="0 0 24 24" fill="none"
              stroke="var(--color-gris)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
              className="absolute left-4 top-1/2 -translate-y-1/2"
            >
              <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
            </svg>
            <input
              type="text"
              placeholder="Buscar por marca, modelo o versión..."
              className="filter-input pl-12 h-12"
              value={filtros.busqueda || ""}
              onChange={(e) => actualizarFiltro("busqueda", e.target.value)}
              id="catalogo-busqueda"
            />
          </div>
          <button
            onClick={() => setMostrarFiltros(!mostrarFiltros)}
            className={`flex items-center gap-2 px-5 h-12 rounded-[var(--radius-md)] border transition-all text-sm font-medium ${
              mostrarFiltros || hayFiltrosActivos
                ? "bg-[var(--color-dorado-bg)] border-[var(--color-dorado)]/30 text-[var(--color-dorado)]"
                : "bg-[var(--color-negro-3)] border-[var(--color-borde)] text-[var(--color-gris-claro)]"
            }`}
            id="catalogo-toggle-filtros"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="4" y1="6" x2="20" y2="6" /><line x1="8" y1="12" x2="20" y2="12" /><line x1="12" y1="18" x2="20" y2="18" />
              <circle cx="6" cy="6" r="2" fill="currentColor" /><circle cx="10" cy="12" r="2" fill="currentColor" /><circle cx="14" cy="18" r="2" fill="currentColor" />
            </svg>
            Filtros
            {hayFiltrosActivos && (
              <span className="w-5 h-5 rounded-full bg-[var(--color-dorado)] text-[var(--color-negro)] text-xs font-bold flex items-center justify-center">
                {Object.values(filtros).filter((v) => v !== undefined && v !== "").length}
              </span>
            )}
          </button>
          <select
            className="filter-select h-12"
            value={filtros.orden || "recientes"}
            onChange={(e) => actualizarFiltro("orden", e.target.value)}
            id="catalogo-orden"
          >
            {ORDEN_OPCIONES.map((op) => (
              <option key={op.value} value={op.value}>
                {op.label}
              </option>
            ))}
          </select>
        </div>

        {/* Panel de filtros desplegable */}
        {mostrarFiltros && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-[var(--color-negro-2)] border border-[var(--color-borde)] rounded-xl p-6 mb-8"
            id="catalogo-filtros-panel"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="block text-xs text-[var(--color-gris)] mb-2 font-medium uppercase tracking-wider">Marca</label>
                <select className="filter-select w-full" value={filtros.marca || ""} onChange={(e) => actualizarFiltro("marca", e.target.value)}>
                  <option value="">Todas las marcas</option>
                  {MARCAS.map((m) => <option key={m} value={m}>{m}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs text-[var(--color-gris)] mb-2 font-medium uppercase tracking-wider">Combustible</label>
                <select className="filter-select w-full" value={filtros.combustible || ""} onChange={(e) => actualizarFiltro("combustible", e.target.value)}>
                  <option value="">Todos</option>
                  {COMBUSTIBLES.map((c) => <option key={c.value} value={c.value}>{c.label}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs text-[var(--color-gris)] mb-2 font-medium uppercase tracking-wider">Cambio</label>
                <select className="filter-select w-full" value={filtros.cambio || ""} onChange={(e) => actualizarFiltro("cambio", e.target.value)}>
                  <option value="">Todos</option>
                  {CAMBIOS.map((c) => <option key={c.value} value={c.value}>{c.label}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs text-[var(--color-gris)] mb-2 font-medium uppercase tracking-wider">Carrocería</label>
                <select className="filter-select w-full" value={filtros.carroceria || ""} onChange={(e) => actualizarFiltro("carroceria", e.target.value)}>
                  <option value="">Todas</option>
                  {CARROCERIAS.map((c) => <option key={c.value} value={c.value}>{c.label}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs text-[var(--color-gris)] mb-2 font-medium uppercase tracking-wider">Precio mín (€)</label>
                <input
                  type="number" className="filter-input" placeholder="Desde..."
                  value={filtros.precio_min ? filtros.precio_min / 100 : ""}
                  onChange={(e) => actualizarFiltro("precio_min", e.target.value ? String(Number(e.target.value) * 100) : "")}
                />
              </div>
              <div>
                <label className="block text-xs text-[var(--color-gris)] mb-2 font-medium uppercase tracking-wider">Precio máx (€)</label>
                <input
                  type="number" className="filter-input" placeholder="Hasta..."
                  value={filtros.precio_max ? filtros.precio_max / 100 : ""}
                  onChange={(e) => actualizarFiltro("precio_max", e.target.value ? String(Number(e.target.value) * 100) : "")}
                />
              </div>
              <div>
                <label className="block text-xs text-[var(--color-gris)] mb-2 font-medium uppercase tracking-wider">Año mínimo</label>
                <input
                  type="number" className="filter-input" placeholder="Desde..."
                  value={filtros.anio_min || ""}
                  onChange={(e) => actualizarFiltro("anio_min", e.target.value)}
                />
              </div>
              <div>
                <label className="block text-xs text-[var(--color-gris)] mb-2 font-medium uppercase tracking-wider">Km máximo</label>
                <input
                  type="number" className="filter-input" placeholder="Hasta..."
                  value={filtros.km_max || ""}
                  onChange={(e) => actualizarFiltro("km_max", e.target.value)}
                />
              </div>
            </div>

            {hayFiltrosActivos && (
              <button onClick={limpiarFiltros} className="mt-4 text-sm text-[var(--color-dorado)] hover:underline" id="catalogo-limpiar-filtros">
                ✕ Limpiar todos los filtros
              </button>
            )}
          </motion.div>
        )}

        {/* Grid de vehículos */}
        {vehiculosFiltrados.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {vehiculosFiltrados.map((vehiculo, i) => (
              <VehicleCard key={vehiculo.id} vehiculo={vehiculo} index={i} />
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="var(--color-gris-oscuro)" strokeWidth="1" className="mx-auto mb-4">
              <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" /><path d="M8 11h6" />
            </svg>
            <h3 className="text-xl font-bold font-[family-name:var(--font-heading)] text-[var(--color-gris)] mb-2">
              No se encontraron vehículos
            </h3>
            <p className="text-sm text-[var(--color-gris-oscuro)] mb-6">
              {hayFiltrosActivos
                ? "Prueba a ajustar los filtros o buscar con otros términos."
                : "Todavía no hay vehículos en el catálogo. ¡Vuelve pronto!"}
            </p>
            {hayFiltrosActivos && (
              <button onClick={limpiarFiltros} className="btn-secondary text-sm">
                Limpiar filtros
              </button>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
}
