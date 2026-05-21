"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CONTACTO } from "@/utils/constants";

export default function ContactoPage() {
  const [enviado, setEnviado] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // En Fase 2, esto enviará el formulario a Supabase
    // Por ahora, simulamos el envío
    setEnviado(true);
    setTimeout(() => setEnviado(false), 5000);
  };

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <span className="section-tag mb-4 inline-block">Estamos aquí para ti</span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-[family-name:var(--font-heading)] mb-6">
            <span className="text-gradient">Contacto</span>
          </h1>
          <p className="text-lg text-[var(--color-gris-claro)] max-w-xl mx-auto">
            ¿Tienes alguna pregunta? Escríbenos y te respondemos lo antes posible.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Formulario */}
          <motion.div
            className="lg:col-span-3"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <form
              onSubmit={handleSubmit}
              className="p-8 rounded-2xl bg-[var(--color-negro-2)] border border-[var(--color-borde)] space-y-5"
              id="contacto-form"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs text-[var(--color-gris)] mb-2 font-medium uppercase tracking-wider">
                    Nombre *
                  </label>
                  <input type="text" required className="filter-input" placeholder="Tu nombre" />
                </div>
                <div>
                  <label className="block text-xs text-[var(--color-gris)] mb-2 font-medium uppercase tracking-wider">
                    Apellidos
                  </label>
                  <input type="text" className="filter-input" placeholder="Tus apellidos" />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs text-[var(--color-gris)] mb-2 font-medium uppercase tracking-wider">
                    Email *
                  </label>
                  <input type="email" required className="filter-input" placeholder="tu@email.com" />
                </div>
                <div>
                  <label className="block text-xs text-[var(--color-gris)] mb-2 font-medium uppercase tracking-wider">
                    Teléfono
                  </label>
                  <input type="tel" className="filter-input" placeholder="600 000 000" />
                </div>
              </div>
              <div>
                <label className="block text-xs text-[var(--color-gris)] mb-2 font-medium uppercase tracking-wider">
                  Asunto
                </label>
                <select className="filter-select w-full">
                  <option value="">Selecciona un asunto</option>
                  <option value="info">Información sobre un coche</option>
                  <option value="financiacion">Financiación</option>
                  <option value="garantia">Garantía</option>
                  <option value="vender">Quiero vender mi coche</option>
                  <option value="otro">Otro</option>
                </select>
              </div>
              <div>
                <label className="block text-xs text-[var(--color-gris)] mb-2 font-medium uppercase tracking-wider">
                  Mensaje *
                </label>
                <textarea
                  required
                  rows={5}
                  className="filter-input resize-none"
                  placeholder="Escribe tu mensaje aquí..."
                />
              </div>
              <div className="flex items-start gap-3">
                <input type="checkbox" required id="privacidad" className="mt-1 accent-[var(--color-dorado)]" />
                <label htmlFor="privacidad" className="text-xs text-[var(--color-gris)]">
                  He leído y acepto la política de privacidad. *
                </label>
              </div>
              <button type="submit" className="btn-primary w-full py-4" id="contacto-enviar">
                {enviado ? "✓ Mensaje enviado" : "Enviar mensaje"}
              </button>
              {enviado && (
                <p className="text-sm text-[var(--color-disponible)] text-center">
                  ¡Gracias! Te responderemos lo antes posible.
                </p>
              )}
            </form>
          </motion.div>

          {/* Info lateral */}
          <motion.div
            className="lg:col-span-2 space-y-6"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            {/* Contacto rápido */}
            <div className="p-6 rounded-2xl bg-[var(--color-negro-2)] border border-[var(--color-borde)]">
              <h3 className="text-lg font-bold font-[family-name:var(--font-heading)] mb-5">
                Contacto <span className="text-gradient">rápido</span>
              </h3>
              <div className="space-y-4">
                <a
                  href={CONTACTO.whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-4 rounded-xl bg-[#25D366]/10 border border-[#25D366]/20 text-[#25D366] hover:bg-[#25D366]/20 transition-all"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  <div>
                    <span className="block text-sm font-bold">WhatsApp</span>
                    <span className="text-xs opacity-80">{CONTACTO.telefono}</span>
                  </div>
                </a>
                <a
                  href={CONTACTO.telefonoLink}
                  className="flex items-center gap-3 p-4 rounded-xl bg-[var(--color-dorado-bg)] border border-[var(--color-dorado)]/20 text-[var(--color-dorado)] hover:bg-[var(--color-dorado-bg-hover)] transition-all"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                  <div>
                    <span className="block text-sm font-bold">Llamar</span>
                    <span className="text-xs opacity-80">{CONTACTO.telefono}</span>
                  </div>
                </a>
                <a
                  href={`mailto:${CONTACTO.email}`}
                  className="flex items-center gap-3 p-4 rounded-xl bg-[var(--color-negro-3)] border border-[var(--color-borde)] text-[var(--color-gris-claro)] hover:border-[var(--color-borde-hover)] transition-all"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                  <div>
                    <span className="block text-sm font-bold">Email</span>
                    <span className="text-xs opacity-80">{CONTACTO.email}</span>
                  </div>
                </a>
              </div>
            </div>

            {/* Horario */}
            <div className="p-6 rounded-2xl bg-[var(--color-negro-2)] border border-[var(--color-borde)]">
              <h3 className="text-lg font-bold font-[family-name:var(--font-heading)] mb-4">Horario</h3>
              <div className="space-y-3">
                {Object.entries(CONTACTO.horario).map(([dia, hora]) => (
                  <div key={dia} className="flex justify-between text-sm">
                    <span className="text-[var(--color-gris)]">{dia}</span>
                    <span className="text-[var(--color-blanco)]">{hora}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Dirección */}
            <div className="p-6 rounded-2xl bg-[var(--color-negro-2)] border border-[var(--color-borde)]">
              <h3 className="text-lg font-bold font-[family-name:var(--font-heading)] mb-4">Ubicación</h3>
              <p className="text-sm text-[var(--color-gris)]">{CONTACTO.direccion}</p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
