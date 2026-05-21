"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { CONTACTO } from "@/utils/constants";

export default function FinanciacionPage() {
  const ventajas = [
    {
      titulo: "Sin entrada obligatoria",
      desc: "Financiamos hasta el 100% del vehículo. Tú decides cuánto aportar.",
      icono: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="12" cy="12" r="10" /><path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8" /><path d="M12 18V6" />
        </svg>
      ),
    },
    {
      titulo: "Cuotas a medida",
      desc: "Plazos de 12 a 84 meses. Ajustamos la cuota a tu presupuesto mensual.",
      icono: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <rect x="2" y="4" width="20" height="16" rx="2" /><path d="M6 8h.01M2 12h20" />
        </svg>
      ),
    },
    {
      titulo: "Respuesta rápida",
      desc: "Te damos respuesta en menos de 24 horas. Sin papeleo innecesario.",
      icono: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" />
        </svg>
      ),
    },
    {
      titulo: "Todas las situaciones",
      desc: "Trabajamos con varias financieras para encontrar la mejor opción para ti.",
      icono: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      ),
    },
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
          <span className="section-tag mb-4 inline-block">Tu coche, a tu ritmo</span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-[family-name:var(--font-heading)] mb-6">
            <span className="text-gradient">Financiación</span> a medida
          </h1>
          <p className="text-lg text-[var(--color-gris-claro)] max-w-2xl mx-auto leading-relaxed">
            No dejes que el presupuesto sea un obstáculo. Tenemos opciones de financiación 
            flexibles para que te lleves el coche que realmente quieres.
          </p>
        </motion.div>

        {/* Ventajas */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-16">
          {ventajas.map((v, i) => (
            <motion.div
              key={v.titulo}
              className="p-8 rounded-2xl bg-[var(--color-negro-2)] border border-[var(--color-borde)] hover:border-[var(--color-borde-hover)] transition-all"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="w-12 h-12 rounded-xl bg-[var(--color-dorado-bg)] flex items-center justify-center text-[var(--color-dorado)] mb-5">
                {v.icono}
              </div>
              <h3 className="text-lg font-bold font-[family-name:var(--font-heading)] mb-3">
                {v.titulo}
              </h3>
              <p className="text-sm text-[var(--color-gris)] leading-relaxed">{v.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Cómo funciona */}
        <motion.div
          className="p-8 sm:p-12 rounded-2xl bg-[var(--color-negro-2)] border border-[var(--color-borde)] mb-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl font-bold font-[family-name:var(--font-heading)] mb-8 text-center">
            ¿Cómo <span className="text-gradient">funciona</span>?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {[
              { paso: "01", titulo: "Elige tu coche", desc: "Navega por nuestro catálogo y encuentra el vehículo que más te gusta." },
              { paso: "02", titulo: "Cuéntanos tu situación", desc: "Hablamos contigo para entender tus necesidades y presupuesto." },
              { paso: "03", titulo: "Aprobación y entrega", desc: "Gestionamos la financiación y te entregamos tu coche listo para conducir." },
            ].map((p) => (
              <div key={p.paso} className="text-center">
                <span className="text-4xl font-extrabold text-gradient font-[family-name:var(--font-heading)]">
                  {p.paso}
                </span>
                <h3 className="text-base font-bold mt-3 mb-2">{p.titulo}</h3>
                <p className="text-sm text-[var(--color-gris)]">{p.desc}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <div className="text-center">
          <h3 className="text-2xl font-bold font-[family-name:var(--font-heading)] mb-4">
            ¿Te interesa? <span className="text-gradient">Hablemos</span>
          </h3>
          <p className="text-[var(--color-gris)] mb-8">
            Sin compromiso. Consúltanos y te hacemos un estudio personalizado.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href={CONTACTO.whatsappLink} target="_blank" rel="noopener noreferrer" className="btn-primary">
              WhatsApp: {CONTACTO.telefono}
            </a>
            <Link href="/catalogo" className="btn-secondary">
              Ver coches disponibles
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
