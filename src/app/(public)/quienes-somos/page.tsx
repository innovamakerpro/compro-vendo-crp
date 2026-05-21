"use client";

import { motion } from "framer-motion";
import { CONTACTO } from "@/utils/constants";

export default function QuienesSomosPage() {
  const valores = [
    { titulo: "Transparencia", desc: "Sin sorpresas. Te contamos todo sobre cada vehículo: historial, estado real y posibles defectos." },
    { titulo: "Calidad", desc: "Seleccionamos cada coche cuidadosamente. Todos pasan una inspección exhaustiva antes de la venta." },
    { titulo: "Confianza", desc: "Años de experiencia avalan nuestro trabajo. Nuestros clientes vuelven y nos recomiendan." },
    { titulo: "Cercanía", desc: "Te atendemos como nos gustaría que nos atendiesen a nosotros. Sin presión, con paciencia." },
  ];

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <span className="section-tag mb-4 inline-block">Conócenos</span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-[family-name:var(--font-heading)] mb-6">
            Quiénes <span className="text-gradient">somos</span>
          </h1>
        </motion.div>

        {/* Historia */}
        <motion.div
          className="p-8 sm:p-12 rounded-2xl bg-[var(--color-negro-2)] border border-[var(--color-borde)] mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl font-bold font-[family-name:var(--font-heading)] mb-6">
            <span className="text-gradient">Compro y Vendo CRP</span>
          </h2>
          <div className="space-y-4 text-[var(--color-gris-claro)] leading-relaxed">
            <p>
              Somos un concesionario de vehículos de segunda mano ubicado en el <strong className="text-[var(--color-blanco)]">Polígono Morea Sur Ampliación, Navarra</strong>. 
              Bajo la marca <strong className="text-[var(--color-blanco)]">Flavius Autos</strong>, nos dedicamos a ofrecer coches de calidad a precios competitivos.
            </p>
            <p>
              Contamos con un stock de más de <strong className="text-[var(--color-dorado)]">30 vehículos</strong> revisados y preparados para su entrega inmediata. 
              Cada coche que entra en nuestro concesionario pasa por un riguroso proceso de selección e inspección.
            </p>
            <p>
              Ofrecemos <strong className="text-[var(--color-dorado)]">financiación a medida</strong>, <strong className="text-[var(--color-dorado)]">garantía</strong> en todos nuestros vehículos 
              y <strong className="text-[var(--color-dorado)]">envío a toda España</strong>. Porque encontrar tu coche ideal no debería ser complicado.
            </p>
          </div>
        </motion.div>

        {/* Valores */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold font-[family-name:var(--font-heading)] mb-8 text-center">
            Nuestros <span className="text-gradient">valores</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {valores.map((v, i) => (
              <motion.div
                key={v.titulo}
                className="p-6 rounded-2xl bg-[var(--color-negro-2)] border border-[var(--color-borde)] hover:border-[var(--color-borde-hover)] transition-all"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <h3 className="text-lg font-bold font-[family-name:var(--font-heading)] mb-2 text-[var(--color-dorado)]">
                  {v.titulo}
                </h3>
                <p className="text-sm text-[var(--color-gris)] leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Ubicación */}
        <motion.div
          className="p-8 rounded-2xl bg-[var(--color-negro-2)] border border-[var(--color-borde)]"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl font-bold font-[family-name:var(--font-heading)] mb-6">
            Dónde <span className="text-gradient">encontrarnos</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-dorado)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 shrink-0">
                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" />
                </svg>
                <div>
                  <p className="font-medium text-[var(--color-blanco)]">{CONTACTO.direccion}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-dorado)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                <a href={CONTACTO.telefonoLink} className="text-[var(--color-blanco)] hover:text-[var(--color-dorado)] transition-colors">
                  {CONTACTO.telefono}
                </a>
              </div>
              <div className="flex items-center gap-3">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-dorado)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
                  <rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
                <a href={`mailto:${CONTACTO.email}`} className="text-[var(--color-blanco)] hover:text-[var(--color-dorado)] transition-colors">
                  {CONTACTO.email}
                </a>
              </div>
              <div className="mt-4 space-y-2">
                {Object.entries(CONTACTO.horario).map(([dia, hora]) => (
                  <div key={dia} className="flex justify-between text-sm">
                    <span className="text-[var(--color-gris)]">{dia}</span>
                    <span className="text-[var(--color-blanco)]">{hora}</span>
                  </div>
                ))}
              </div>
            </div>
            {/* Placeholder del mapa — se reemplazará por Leaflet/OpenStreetMap */}
            <div className="rounded-xl overflow-hidden border border-[var(--color-borde)] bg-[var(--color-negro-3)] min-h-[280px] flex items-center justify-center">
              <div className="text-center text-[var(--color-gris)]">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="mx-auto mb-2 opacity-30">
                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" />
                </svg>
                <p className="text-sm">Mapa OpenStreetMap</p>
                <p className="text-xs opacity-60">Se integrará en próxima fase</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
