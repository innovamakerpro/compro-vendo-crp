import type { Metadata } from "next";
import { CONTACTO } from "@/utils/constants";

export const metadata: Metadata = {
  title: "Aviso Legal",
  description: "Aviso legal de Compro y Vendo CRP. Información sobre el titular del sitio web y condiciones de uso.",
};

export default function AvisoLegalPage() {
  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <span className="section-tag mb-4 inline-block">Legal</span>
          <h1 className="text-3xl sm:text-4xl font-bold font-[family-name:var(--font-heading)] mb-4">
            Aviso <span className="text-gradient">Legal</span>
          </h1>
          <p className="text-sm text-[var(--color-gris)]">Última actualización: mayo 2026</p>
        </div>

        <div className="space-y-8">
          <section className="p-6 rounded-2xl bg-[var(--color-negro-2)] border border-[var(--color-borde)]">
            <h2 className="text-lg font-bold font-[family-name:var(--font-heading)] mb-4 text-[var(--color-dorado)]">1. Datos identificativos del titular</h2>
            <div className="text-sm text-[var(--color-gris-claro)] leading-relaxed space-y-2">
              <p>En cumplimiento del artículo 10 de la Ley 34/2002, de 11 de julio, de Servicios de la Sociedad de la Información y del Comercio Electrónico (LSSI-CE):</p>
              <div className="mt-4 space-y-2 p-4 rounded-xl bg-[var(--color-negro-3)] border border-[var(--color-borde)]">
                <p><strong className="text-[var(--color-blanco)]">Denominación social:</strong> {CONTACTO.nombreLegal}</p>
                <p><strong className="text-[var(--color-blanco)]">Nombre comercial:</strong> {CONTACTO.nombre}</p>
                <p><strong className="text-[var(--color-blanco)]">Domicilio:</strong> {CONTACTO.direccion}</p>
                <p><strong className="text-[var(--color-blanco)]">Teléfono:</strong> {CONTACTO.telefono}</p>
                <p><strong className="text-[var(--color-blanco)]">Email:</strong> {CONTACTO.email}</p>
                <p><strong className="text-[var(--color-blanco)]">Actividad:</strong> Compraventa de vehículos de segunda mano</p>
              </div>
            </div>
          </section>

          <section className="p-6 rounded-2xl bg-[var(--color-negro-2)] border border-[var(--color-borde)]">
            <h2 className="text-lg font-bold font-[family-name:var(--font-heading)] mb-4 text-[var(--color-dorado)]">2. Objeto del sitio web</h2>
            <div className="text-sm text-[var(--color-gris-claro)] leading-relaxed space-y-3">
              <p>Este sitio web ofrece información sobre los servicios de compraventa de vehículos de segunda mano de {CONTACTO.nombre}.</p>
              <p>La información publicada (precios, disponibilidad, características) tiene carácter orientativo y no constituye una oferta contractual vinculante. Los precios y la disponibilidad pueden variar sin previo aviso.</p>
            </div>
          </section>

          <section className="p-6 rounded-2xl bg-[var(--color-negro-2)] border border-[var(--color-borde)]">
            <h2 className="text-lg font-bold font-[family-name:var(--font-heading)] mb-4 text-[var(--color-dorado)]">3. Condiciones de uso</h2>
            <div className="text-sm text-[var(--color-gris-claro)] leading-relaxed space-y-3">
              <p>El acceso al sitio web atribuye la condición de usuario, quien acepta las presentes condiciones. El usuario se compromete a:</p>
              <ul className="list-disc list-inside space-y-2 ml-2">
                <li>Hacer un uso adecuado y lícito del sitio web.</li>
                <li>No realizar actividades ilícitas o contrarias a la buena fe.</li>
                <li>No provocar daños en los sistemas físicos y lógicos del sitio web.</li>
                <li>No introducir ni difundir virus informáticos.</li>
                <li>No intentar acceder a áreas restringidas de los sistemas informáticos.</li>
              </ul>
            </div>
          </section>

          <section className="p-6 rounded-2xl bg-[var(--color-negro-2)] border border-[var(--color-borde)]">
            <h2 className="text-lg font-bold font-[family-name:var(--font-heading)] mb-4 text-[var(--color-dorado)]">4. Propiedad intelectual e industrial</h2>
            <div className="text-sm text-[var(--color-gris-claro)] leading-relaxed space-y-3">
              <p>Todos los contenidos del sitio web (textos, fotografías, gráficos, logotipos, software y código fuente) son propiedad de {CONTACTO.nombreLegal} o de terceros que han autorizado su uso.</p>
              <p>Queda prohibida su reproducción, distribución o transformación sin consentimiento por escrito. Las marcas de vehículos que aparecen se utilizan únicamente con fines informativos.</p>
            </div>
          </section>

          <section className="p-6 rounded-2xl bg-[var(--color-negro-2)] border border-[var(--color-borde)]">
            <h2 className="text-lg font-bold font-[family-name:var(--font-heading)] mb-4 text-[var(--color-dorado)]">5. Exclusión de responsabilidad</h2>
            <div className="text-sm text-[var(--color-gris-claro)] leading-relaxed space-y-3">
              <p>{CONTACTO.nombre} no se hace responsable de:</p>
              <ul className="list-disc list-inside space-y-2 ml-2">
                <li>Errores de seguridad o daños al sistema informático del usuario.</li>
                <li>Interferencias, interrupciones o fallos de telecomunicaciones.</li>
                <li>La exactitud o actualidad de los contenidos publicados.</li>
                <li>Decisiones tomadas a partir de la información del sitio web.</li>
              </ul>
            </div>
          </section>

          <section className="p-6 rounded-2xl bg-[var(--color-negro-2)] border border-[var(--color-borde)]">
            <h2 className="text-lg font-bold font-[family-name:var(--font-heading)] mb-4 text-[var(--color-dorado)]">6. Enlaces a terceros</h2>
            <div className="text-sm text-[var(--color-gris-claro)] leading-relaxed">
              <p>Este sitio web puede contener enlaces a páginas de terceros (WhatsApp, Google Maps, entidades financieras). {CONTACTO.nombre} no asume responsabilidad sobre el contenido o las políticas de privacidad de esos sitios.</p>
            </div>
          </section>

          <section className="p-6 rounded-2xl bg-[var(--color-negro-2)] border border-[var(--color-borde)]">
            <h2 className="text-lg font-bold font-[family-name:var(--font-heading)] mb-4 text-[var(--color-dorado)]">7. Legislación aplicable y jurisdicción</h2>
            <div className="text-sm text-[var(--color-gris-claro)] leading-relaxed">
              <p>Las presentes condiciones se rigen por la legislación española. Para la resolución de controversias, las partes se someten a los Juzgados y Tribunales del domicilio del usuario, conforme a la legislación vigente en materia de consumidores y usuarios.</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
