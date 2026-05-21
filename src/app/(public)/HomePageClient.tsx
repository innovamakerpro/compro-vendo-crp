"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import VehicleCard from "@/components/vehiculos/VehicleCard";
import { Vehiculo } from "@/types/vehiculo";
import { CONTACTO, VENTAJAS } from "@/utils/constants";

interface Props {
  destacados: Vehiculo[];
}

const iconos: Record<string, React.ReactNode> = {
  shield: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  ),
  banknotes: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="6" width="20" height="12" rx="2" />
      <circle cx="12" cy="12" r="2" />
      <path d="M6 12h.01M18 12h.01" />
    </svg>
  ),
  truck: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2" />
      <path d="M15 18h6a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14" />
      <circle cx="17" cy="18" r="2" /><circle cx="7" cy="18" r="2" />
    </svg>
  ),
  sparkles: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
      <path d="M5 3v4M19 17v4M3 5h4M17 19h4" />
    </svg>
  ),
};

function GoldParticles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-[var(--color-dorado)]"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            opacity: Math.random() * 0.3 + 0.1,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.1, 0.4, 0.1],
          }}
          transition={{
            duration: Math.random() * 4 + 3,
            repeat: Infinity,
            delay: Math.random() * 3,
          }}
        />
      ))}
    </div>
  );
}

export default function HomePageClient({ destacados }: Props) {
  return (
    <>
      {/* =============== HERO =============== */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden" id="hero">
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-negro)] via-[var(--color-negro-2)] to-[var(--color-negro)]" />

        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 50px, rgba(201,169,97,0.5) 50px, rgba(201,169,97,0.5) 51px),
                           repeating-linear-gradient(90deg, transparent, transparent 50px, rgba(201,169,97,0.5) 50px, rgba(201,169,97,0.5) 51px)`,
        }} />

        <GoldParticles />

        <motion.div
          className="absolute top-1/4 left-0 h-px w-full bg-gradient-to-r from-transparent via-[var(--color-dorado)]/20 to-transparent"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 2, delay: 0.5 }}
        />

        <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="section-tag mb-6 inline-block">
              Concesionario en Navarra
            </span>
          </motion.div>

          <motion.h1
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold font-[family-name:var(--font-heading)] leading-tight mb-6"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Tu próximo coche{" "}
            <span className="text-gradient">te espera</span>
          </motion.h1>

          <motion.p
            className="text-lg sm:text-xl text-[var(--color-gris-claro)] max-w-2xl mx-auto mb-10 leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Más de 30 vehículos seleccionados con garantía, financiación a medida y envío a toda España.
            Calidad premium a precio de ocasión.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <Link href="/catalogo" className="btn-primary text-base px-10 py-4" id="hero-cta-catalogo">
              Explorar catálogo
            </Link>
            <a href={CONTACTO.whatsappLink} target="_blank" rel="noopener noreferrer" className="btn-secondary text-base px-10 py-4" id="hero-cta-whatsapp">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="shrink-0">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Contactar por WhatsApp
            </a>
          </motion.div>

          <motion.div
            className="flex items-center justify-center gap-8 sm:gap-16 mt-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.2 }}
          >
            {[
              { valor: "30+", label: "Vehículos" },
              { valor: "100%", label: "Garantía" },
              { valor: "€", label: "Financiación" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <span className="text-2xl sm:text-3xl font-bold text-gradient font-[family-name:var(--font-heading)]">
                  {stat.valor}
                </span>
                <span className="block text-xs text-[var(--color-gris)] mt-1">{stat.label}</span>
              </div>
            ))}
          </motion.div>
        </div>

        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-gris)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 5v14M19 12l-7 7-7-7" />
          </svg>
        </motion.div>
      </section>

      {/* =============== COCHES DESTACADOS =============== */}
      <section className="py-20 sm:py-28" id="destacados">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="section-tag mb-4 inline-block">Selección premium</span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-[family-name:var(--font-heading)]">
              Coches <span className="text-gradient">destacados</span>
            </h2>
            <p className="text-[var(--color-gris)] mt-4 max-w-xl mx-auto">
              Nuestra selección de los mejores vehículos del momento. Calidad y precio garantizados.
            </p>
          </div>

          {destacados.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {destacados.map((vehiculo, i) => (
                <VehicleCard key={vehiculo.id} vehiculo={vehiculo} index={i} />
              ))}
            </div>
          ) : (
            <p className="text-center text-[var(--color-gris)] py-12">
              Próximamente nuevos vehículos destacados. Visita el catálogo completo.
            </p>
          )}

          <div className="text-center mt-12">
            <Link href="/catalogo" className="btn-secondary" id="ver-todo-catalogo">
              Ver todo el catálogo
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* =============== POR QUÉ ELEGIRNOS =============== */}
      <section className="py-20 sm:py-28 bg-[var(--color-negro-2)]" id="ventajas">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="section-tag mb-4 inline-block">Nuestras ventajas</span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-[family-name:var(--font-heading)]">
              ¿Por qué <span className="text-gradient">elegirnos</span>?
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {VENTAJAS.map((ventaja, i) => (
              <motion.div
                key={ventaja.titulo}
                className="p-8 rounded-2xl bg-[var(--color-negro-3)] border border-[var(--color-borde)] hover:border-[var(--color-borde-hover)] transition-all group text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="w-14 h-14 mx-auto mb-5 rounded-xl bg-[var(--color-dorado-bg)] flex items-center justify-center text-[var(--color-dorado)] group-hover:scale-110 transition-transform">
                  {iconos[ventaja.icono]}
                </div>
                <h3 className="font-[family-name:var(--font-heading)] text-base font-bold text-[var(--color-blanco)] mb-3">
                  {ventaja.titulo}
                </h3>
                <p className="text-sm text-[var(--color-gris)] leading-relaxed">
                  {ventaja.descripcion}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* =============== CTA FINAL =============== */}
      <section className="py-20 sm:py-28 relative overflow-hidden" id="cta-final">
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-dorado)]/5 via-transparent to-[var(--color-dorado)]/5" />
        <div className="relative max-w-3xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-[family-name:var(--font-heading)] mb-6">
              ¿Listo para encontrar{" "}
              <span className="text-gradient">tu coche ideal</span>?
            </h2>
            <p className="text-[var(--color-gris-claro)] text-lg mb-10 leading-relaxed">
              Visítanos en nuestras instalaciones, llámanos o escríbenos por WhatsApp.
              Te asesoramos sin compromiso.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/catalogo" className="btn-primary text-base px-10 py-4">
                Ver catálogo completo
              </Link>
              <a href={CONTACTO.telefonoLink} className="btn-secondary text-base px-10 py-4">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                Llamar ahora
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
