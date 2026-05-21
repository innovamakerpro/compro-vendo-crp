import type { Metadata } from "next";
import { CONTACTO } from "@/utils/constants";

export const metadata: Metadata = {
  title: "Política de Privacidad",
  description:
    "Política de privacidad de Compro y Vendo CRP (Flavius Autos). Información sobre el tratamiento de datos personales conforme al RGPD y la LOPDGDD.",
};

export default function PoliticaPrivacidadPage() {
  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <span className="section-tag mb-4 inline-block">Legal</span>
          <h1 className="text-3xl sm:text-4xl font-bold font-[family-name:var(--font-heading)] mb-4">
            Política de <span className="text-gradient">Privacidad</span>
          </h1>
          <p className="text-sm text-[var(--color-gris)]">
            Última actualización: mayo 2026
          </p>
        </div>

        {/* Contenido */}
        <div className="prose-legal space-y-8">
          {/* 1. Responsable */}
          <section className="p-6 rounded-2xl bg-[var(--color-negro-2)] border border-[var(--color-borde)]">
            <h2 className="text-lg font-bold font-[family-name:var(--font-heading)] mb-4 text-[var(--color-dorado)]">
              1. Responsable del tratamiento
            </h2>
            <div className="space-y-2 text-sm text-[var(--color-gris-claro)] leading-relaxed">
              <p><strong className="text-[var(--color-blanco)]">Identidad:</strong> {CONTACTO.nombreLegal}</p>
              <p><strong className="text-[var(--color-blanco)]">Nombre comercial:</strong> {CONTACTO.nombre}</p>
              <p><strong className="text-[var(--color-blanco)]">Dirección:</strong> {CONTACTO.direccion}</p>
              <p><strong className="text-[var(--color-blanco)]">Teléfono:</strong> {CONTACTO.telefono}</p>
              <p><strong className="text-[var(--color-blanco)]">Email:</strong> {CONTACTO.email}</p>
            </div>
          </section>

          {/* 2. Finalidad */}
          <section className="p-6 rounded-2xl bg-[var(--color-negro-2)] border border-[var(--color-borde)]">
            <h2 className="text-lg font-bold font-[family-name:var(--font-heading)] mb-4 text-[var(--color-dorado)]">
              2. Finalidad del tratamiento de datos
            </h2>
            <div className="text-sm text-[var(--color-gris-claro)] leading-relaxed space-y-3">
              <p>En {CONTACTO.nombre} tratamos la información que nos facilitan las personas interesadas con los siguientes fines:</p>
              <ul className="list-disc list-inside space-y-2 ml-2">
                <li>Gestionar las solicitudes de información sobre vehículos disponibles en nuestro catálogo.</li>
                <li>Tramitar la compraventa de vehículos de segunda mano, incluyendo la documentación necesaria (transferencia, contrato, etc.).</li>
                <li>Gestionar solicitudes de financiación con las entidades financieras colaboradoras.</li>
                <li>Enviar comunicaciones comerciales sobre nuevos vehículos en stock, ofertas y promociones, siempre con consentimiento previo.</li>
                <li>Gestionar las consultas realizadas a través del formulario de contacto, WhatsApp o correo electrónico.</li>
                <li>Dar cumplimiento a las obligaciones legales y fiscales aplicables.</li>
              </ul>
            </div>
          </section>

          {/* 3. Legitimación */}
          <section className="p-6 rounded-2xl bg-[var(--color-negro-2)] border border-[var(--color-borde)]">
            <h2 className="text-lg font-bold font-[family-name:var(--font-heading)] mb-4 text-[var(--color-dorado)]">
              3. Legitimación
            </h2>
            <div className="text-sm text-[var(--color-gris-claro)] leading-relaxed space-y-3">
              <p>La base legal para el tratamiento de sus datos personales es:</p>
              <ul className="list-disc list-inside space-y-2 ml-2">
                <li><strong className="text-[var(--color-blanco)]">Ejecución de un contrato:</strong> La gestión de la compraventa de vehículos y servicios asociados.</li>
                <li><strong className="text-[var(--color-blanco)]">Consentimiento del interesado:</strong> Para el envío de comunicaciones comerciales y la recogida de datos a través de formularios.</li>
                <li><strong className="text-[var(--color-blanco)]">Interés legítimo:</strong> Para la atención de consultas y la mejora de nuestros servicios.</li>
                <li><strong className="text-[var(--color-blanco)]">Obligación legal:</strong> Para el cumplimiento de obligaciones fiscales y legales.</li>
              </ul>
            </div>
          </section>

          {/* 4. Destinatarios */}
          <section className="p-6 rounded-2xl bg-[var(--color-negro-2)] border border-[var(--color-borde)]">
            <h2 className="text-lg font-bold font-[family-name:var(--font-heading)] mb-4 text-[var(--color-dorado)]">
              4. Destinatarios de los datos
            </h2>
            <div className="text-sm text-[var(--color-gris-claro)] leading-relaxed space-y-3">
              <p>Los datos personales podrán ser comunicados a:</p>
              <ul className="list-disc list-inside space-y-2 ml-2">
                <li>Administraciones públicas competentes (DGT, Hacienda) para la gestión de transferencias y obligaciones fiscales.</li>
                <li>Entidades financieras colaboradoras, en caso de solicitar financiación para la adquisición de un vehículo.</li>
                <li>Empresas de logística y transporte, en caso de envío del vehículo.</li>
                <li>Asesores legales y fiscales para el cumplimiento de obligaciones legales.</li>
              </ul>
              <p>No se realizan transferencias internacionales de datos.</p>
            </div>
          </section>

          {/* 5. Derechos ARCO */}
          <section className="p-6 rounded-2xl bg-[var(--color-negro-2)] border border-[var(--color-borde)]">
            <h2 className="text-lg font-bold font-[family-name:var(--font-heading)] mb-4 text-[var(--color-dorado)]">
              5. Derechos de los interesados (ARCO+)
            </h2>
            <div className="text-sm text-[var(--color-gris-claro)] leading-relaxed space-y-3">
              <p>Cualquier persona tiene derecho a obtener confirmación sobre si en {CONTACTO.nombre} estamos tratando sus datos personales. Las personas interesadas tienen derecho a:</p>
              <ul className="list-disc list-inside space-y-2 ml-2">
                <li><strong className="text-[var(--color-blanco)]">Acceso:</strong> Obtener información sobre sus datos de carácter personal sometidos a tratamiento.</li>
                <li><strong className="text-[var(--color-blanco)]">Rectificación:</strong> Solicitar la corrección de datos inexactos o incompletos.</li>
                <li><strong className="text-[var(--color-blanco)]">Cancelación / Supresión:</strong> Solicitar la eliminación de sus datos cuando ya no sean necesarios para la finalidad para la que fueron recogidos.</li>
                <li><strong className="text-[var(--color-blanco)]">Oposición:</strong> Oponerse al tratamiento de sus datos en determinadas circunstancias.</li>
                <li><strong className="text-[var(--color-blanco)]">Limitación del tratamiento:</strong> Solicitar la limitación del tratamiento de sus datos en determinados supuestos.</li>
                <li><strong className="text-[var(--color-blanco)]">Portabilidad:</strong> Recibir los datos personales que le incumban en un formato estructurado, de uso común y lectura mecánica.</li>
              </ul>
              <p className="mt-4">
                Para ejercer estos derechos, puede dirigirse a{" "}
                <a href={`mailto:${CONTACTO.email}`} className="text-[var(--color-dorado)] hover:underline">
                  {CONTACTO.email}
                </a>{" "}
                indicando en el asunto &quot;Ejercicio de derechos RGPD&quot; y adjuntando una copia de su DNI o documento identificativo equivalente.
              </p>
              <p>
                Si considera que el tratamiento no se ajusta a la normativa vigente, podrá presentar una reclamación ante la{" "}
                <strong className="text-[var(--color-blanco)]">Agencia Española de Protección de Datos (AEPD)</strong>,{" "}
                <a href="https://www.aepd.es" target="_blank" rel="noopener noreferrer" className="text-[var(--color-dorado)] hover:underline">
                  www.aepd.es
                </a>.
              </p>
            </div>
          </section>

          {/* 6. Conservación */}
          <section className="p-6 rounded-2xl bg-[var(--color-negro-2)] border border-[var(--color-borde)]">
            <h2 className="text-lg font-bold font-[family-name:var(--font-heading)] mb-4 text-[var(--color-dorado)]">
              6. Conservación de los datos
            </h2>
            <div className="text-sm text-[var(--color-gris-claro)] leading-relaxed space-y-3">
              <p>
                Los datos personales se conservarán mientras se mantenga la relación comercial o durante el tiempo necesario para cumplir con las obligaciones legales. Una vez finalizados estos plazos, los datos serán suprimidos conforme a lo dispuesto en la normativa de protección de datos.
              </p>
              <p>Los plazos de conservación orientativos son:</p>
              <ul className="list-disc list-inside space-y-2 ml-2">
                <li>Datos de clientes y contratos de compraventa: 6 años (Código de Comercio).</li>
                <li>Datos fiscales: 4 años (Ley General Tributaria).</li>
                <li>Datos de consultas no formalizadas en contrato: 12 meses desde la última interacción.</li>
              </ul>
            </div>
          </section>

          {/* 7. Seguridad */}
          <section className="p-6 rounded-2xl bg-[var(--color-negro-2)] border border-[var(--color-borde)]">
            <h2 className="text-lg font-bold font-[family-name:var(--font-heading)] mb-4 text-[var(--color-dorado)]">
              7. Medidas de seguridad
            </h2>
            <div className="text-sm text-[var(--color-gris-claro)] leading-relaxed">
              <p>
                En {CONTACTO.nombre} hemos adoptado las medidas técnicas y organizativas necesarias para garantizar la seguridad de los datos personales y evitar su alteración, pérdida, tratamiento o acceso no autorizado, habida cuenta del estado de la tecnología, la naturaleza de los datos almacenados y los riesgos a que están expuestos.
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
