"use client";

import { useActionState, useState } from "react";
import { crearVehiculo } from "./actions";
import { MARCAS, COMBUSTIBLES, CAMBIOS, CARROCERIAS, ESTADOS_VEHICULO } from "@/utils/constants";

const FIELD = "w-full h-10 px-3 rounded-lg bg-[var(--color-negro-3)] border border-[var(--color-borde)] text-[var(--color-blanco)] text-sm placeholder:text-[var(--color-gris)] focus:outline-none focus:border-[var(--color-dorado)]/50 transition-colors";
const LABEL = "block text-xs font-medium text-[var(--color-gris-claro)] uppercase tracking-wider mb-1.5";
const SECTION = "bg-[var(--color-negro-2)] border border-[var(--color-borde)] rounded-xl p-6 mb-5";

export default function VehiculoForm() {
  const [state, action, isPending] = useActionState(crearVehiculo, null);
  const [previews, setPreviews] = useState<string[]>([]);
  const [totalSize, setTotalSize] = useState(0);
  const MAX_TOTAL_MB = 4;

  function handleImages(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? []);
    setPreviews(files.map((f) => URL.createObjectURL(f)));
    setTotalSize(files.reduce((sum, f) => sum + f.size, 0));
  }

  const totalSizeMB = totalSize / 1024 / 1024;
  const sizeExceeded = totalSizeMB > MAX_TOTAL_MB;

  return (
    <form action={action} className="max-w-4xl">

      {/* Error global */}
      {state?.error && (
        <div className="flex items-center gap-2 text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-3 mb-5">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
            <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
          {state.error}
        </div>
      )}

      {/* ── Identificación ── */}
      <div className={SECTION}>
        <h2 className="text-sm font-semibold text-[var(--color-gris-claro)] uppercase tracking-wider mb-4">Identificación</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={LABEL}>Marca <span className="text-red-400">*</span></label>
            <select name="marca" required className={FIELD} defaultValue="">
              <option value="" disabled>Selecciona marca</option>
              {MARCAS.map((m) => <option key={m} value={m}>{m}</option>)}
            </select>
          </div>
          <div>
            <label className={LABEL}>Modelo <span className="text-red-400">*</span></label>
            <input name="modelo" required placeholder="Ej: Serie 3, Golf, Tucson…" className={FIELD} />
          </div>
          <div>
            <label className={LABEL}>Versión</label>
            <input name="version" placeholder="Ej: 320d M Sport, 1.5 TSI…" className={FIELD} />
          </div>
          <div>
            <label className={LABEL}>Año <span className="text-red-400">*</span></label>
            <input name="anio" type="number" required min="1900" max="2100" placeholder="2022" className={FIELD} />
          </div>
        </div>
      </div>

      {/* ── Motor y carrocería ── */}
      <div className={SECTION}>
        <h2 className="text-sm font-semibold text-[var(--color-gris-claro)] uppercase tracking-wider mb-4">Motor y carrocería</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={LABEL}>Combustible <span className="text-red-400">*</span></label>
            <select name="combustible" required className={FIELD} defaultValue="">
              <option value="" disabled>Selecciona</option>
              {COMBUSTIBLES.map((c) => <option key={c.value} value={c.value}>{c.label}</option>)}
            </select>
          </div>
          <div>
            <label className={LABEL}>Cambio <span className="text-red-400">*</span></label>
            <select name="cambio" required className={FIELD} defaultValue="">
              <option value="" disabled>Selecciona</option>
              {CAMBIOS.map((c) => <option key={c.value} value={c.value}>{c.label}</option>)}
            </select>
          </div>
          <div>
            <label className={LABEL}>Carrocería <span className="text-red-400">*</span></label>
            <select name="carroceria" required className={FIELD} defaultValue="">
              <option value="" disabled>Selecciona</option>
              {CARROCERIAS.map((c) => <option key={c.value} value={c.value}>{c.label}</option>)}
            </select>
          </div>
          <div>
            <label className={LABEL}>Kilometraje <span className="text-red-400">*</span></label>
            <input name="kilometraje" type="number" required min="0" placeholder="45000" className={FIELD} />
          </div>
          <div>
            <label className={LABEL}>Potencia (CV)</label>
            <input name="potencia" type="number" min="1" placeholder="190" className={FIELD} />
          </div>
        </div>
      </div>

      {/* ── Detalles ── */}
      <div className={SECTION}>
        <h2 className="text-sm font-semibold text-[var(--color-gris-claro)] uppercase tracking-wider mb-4">Detalles</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={LABEL}>Color</label>
            <input name="color" placeholder="Ej: Negro Zafiro" className={FIELD} />
          </div>
          <div>
            <label className={LABEL}>Garantía</label>
            <input name="garantia" placeholder="Ej: 12 meses incluida" className={FIELD} />
          </div>
          <div>
            <label className={LABEL}>Plazas</label>
            <input name="plazas" type="number" min="1" max="9" placeholder="5" className={FIELD} />
          </div>
          <div>
            <label className={LABEL}>Puertas</label>
            <input name="puertas" type="number" min="1" max="5" placeholder="4" className={FIELD} />
          </div>
          <div className="col-span-2">
            <label className={LABEL}>Daños / observaciones</label>
            <input name="danios" placeholder="Ej: Pequeño roce en paragolpes trasero" className={FIELD} />
          </div>
        </div>
      </div>

      {/* ── Precio y estado ── */}
      <div className={SECTION}>
        <h2 className="text-sm font-semibold text-[var(--color-gris-claro)] uppercase tracking-wider mb-4">Precio y estado</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={LABEL}>Precio actual (€) <span className="text-red-400">*</span></label>
            <input name="precio" type="number" required min="1" step="0.01" placeholder="12500" className={FIELD} />
          </div>
          <div>
            <label className={LABEL}>Precio anterior (€) <span className="text-[var(--color-gris)] normal-case font-normal">tachado</span></label>
            <input name="precio_anterior" type="number" min="1" step="0.01" placeholder="14000" className={FIELD} />
          </div>
          <div>
            <label className={LABEL}>Estado <span className="text-red-400">*</span></label>
            <select name="estado" required className={FIELD} defaultValue="disponible">
              {ESTADOS_VEHICULO.map((e) => <option key={e.value} value={e.value}>{e.label}</option>)}
            </select>
          </div>
          <div className="flex items-center gap-3 pt-6">
            <input
              id="destacado"
              name="destacado"
              type="checkbox"
              className="w-4 h-4 rounded accent-[var(--color-dorado)] cursor-pointer"
            />
            <label htmlFor="destacado" className="text-sm text-[var(--color-gris-claro)] cursor-pointer">
              Marcar como <span className="text-[var(--color-dorado)]">★ Destacado</span>
            </label>
          </div>
        </div>
      </div>

      {/* ── Descripción ── */}
      <div className={SECTION}>
        <h2 className="text-sm font-semibold text-[var(--color-gris-claro)] uppercase tracking-wider mb-4">Descripción</h2>
        <textarea
          name="descripcion"
          rows={4}
          placeholder="Describe el vehículo: equipamiento, historial de mantenimiento, características destacadas…"
          className={`${FIELD} h-auto py-3 resize-none`}
        />
      </div>

      {/* ── Imágenes ── */}
      <div className={SECTION}>
        <h2 className="text-sm font-semibold text-[var(--color-gris-claro)] uppercase tracking-wider mb-4">
          Imágenes <span className="text-[var(--color-gris)] normal-case font-normal">(la primera será la principal)</span>
        </h2>

        <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-[var(--color-borde)] rounded-xl cursor-pointer hover:border-[var(--color-dorado)]/40 transition-colors bg-[var(--color-negro-3)]">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--color-gris)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="mb-2">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" y1="3" x2="12" y2="15" />
          </svg>
          <span className="text-sm text-[var(--color-gris)]">Haz clic o arrastra imágenes aquí</span>
          <span className="text-xs text-[var(--color-gris-oscuro)] mt-1">JPG, PNG, WebP — máx. 4 MB en total</span>
          <input
            name="imagenes"
            type="file"
            multiple
            accept="image/*"
            className="hidden"
            onChange={handleImages}
          />
        </label>

        {previews.length > 0 && (
          <>
            <div className="grid grid-cols-4 gap-3 mt-4">
              {previews.map((src, i) => (
                <div key={i} className="relative aspect-[4/3] rounded-lg overflow-hidden bg-[var(--color-negro-3)]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={src} alt="" className="w-full h-full object-cover" />
                  {i === 0 && (
                    <span className="absolute bottom-1 left-1 text-[10px] bg-[var(--color-dorado)] text-black font-bold px-1.5 py-0.5 rounded">
                      Principal
                    </span>
                  )}
                </div>
              ))}
            </div>
            <div className={`mt-3 text-xs flex items-center gap-2 ${sizeExceeded ? 'text-red-400' : 'text-[var(--color-gris)]'}`}>
              <span>{previews.length} imagen{previews.length !== 1 ? 'es' : ''} — {totalSizeMB.toFixed(1)} MB de {MAX_TOTAL_MB} MB</span>
              {sizeExceeded && (
                <span className="bg-red-500/10 border border-red-500/20 rounded px-2 py-0.5 font-medium">
                  ⚠ Reduce el tamaño o número de imágenes
                </span>
              )}
            </div>
          </>
        )}
      </div>

      {/* ── Botones ── */}
      <div className="flex items-center gap-4">
        <button
          type="submit"
          disabled={isPending || sizeExceeded}
          className="btn-primary px-8 py-3 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {isPending ? (
            <span className="flex items-center gap-2">
              <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 12a9 9 0 1 1-6.219-8.56" />
              </svg>
              Guardando…
            </span>
          ) : (
            "Guardar vehículo"
          )}
        </button>
        <a href="/admin/vehiculos" className="btn-secondary px-6 py-3 text-sm">
          Cancelar
        </a>
      </div>
    </form>
  );
}
