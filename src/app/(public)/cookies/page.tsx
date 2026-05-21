import type { Metadata } from "next";
import { CONTACTO } from "@/utils/constants";

export const metadata: Metadata = {
  title: "Política de Cookies",
  description: "Política de cookies de Compro y Vendo CRP. Información sobre el uso de cookies en nuestro sitio web.",
};

export default function CookiesPage() {
  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <span className="section-tag mb-4 inline-block">Legal</span>
          <h1 className="text-3xl sm:text-4xl font-bold font-[family-name:var(--font-heading)] mb-4">
            Política de <span className="text-gradient">Cookies</span>
          </h1>
          <p className="text-sm text-[var(--color-gris)]">Última actualización: mayo 2026</p>
        </div>

        <div className="space-y-8">
          <section className="p-6 rounded-2xl bg-[var(--color-negro-2)] border border-[var(--color-borde)]">
            <h2 className="text-lg font-bold font-[family-name:var(--font-heading)] mb-4 text-[var(--color-dorado)]">1. ¿Qué son las cookies?</h2>
            <div className="text-sm text-[var(--color-gris-claro)] leading-relaxed space-y-3">
              <p>Las cookies son pequeños archivos de texto que los sitios web almacenan en su dispositivo (ordenador, teléfono móvil, tablet) cuando los visita. Sirven para que el sitio web recuerde información sobre su visita, como su idioma preferido o configuración, lo que puede facilitar su próxima visita y hacer que el sitio le resulte más útil.</p>
            </div>
          </section>

          <section className="p-6 rounded-2xl bg-[var(--color-negro-2)] border border-[var(--color-borde)]">
            <h2 className="text-lg font-bold font-[family-name:var(--font-heading)] mb-4 text-[var(--color-dorado)]">2. Tipos de cookies que utilizamos</h2>
            <div className="text-sm text-[var(--color-gris-claro)] leading-relaxed space-y-4">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-[var(--color-borde)]">
                      <th className="py-3 pr-4 text-[var(--color-blanco)] font-semibold">Tipo</th>
                      <th className="py-3 pr-4 text-[var(--color-blanco)] font-semibold">Finalidad</th>
                      <th className="py-3 text-[var(--color-blanco)] font-semibold">Duración</th>
                    </tr>
                  </thead>
                  <tbody className="space-y-2">
                    <tr className="border-b border-[var(--color-borde)]">
                      <td className="py-3 pr-4 font-medium text-[var(--color-blanco)]">Técnicas</td>
                      <td className="py-3 pr-4">Necesarias para el funcionamiento del sitio web. Permiten la navegación y el uso de funciones básicas.</td>
                      <td className="py-3">Sesión</td>
                    </tr>
                    <tr className="border-b border-[var(--color-borde)]">
                      <td className="py-3 pr-4 font-medium text-[var(--color-blanco)]">Preferencias</td>
                      <td className="py-3 pr-4">Recuerdan sus elecciones (como filtros de búsqueda en el catálogo) para mejorar su experiencia.</td>
                      <td className="py-3">1 año</td>
                    </tr>
                    <tr className="border-b border-[var(--color-borde)]">
                      <td className="py-3 pr-4 font-medium text-[var(--color-blanco)]">Analíticas</td>
                      <td className="py-3 pr-4">Nos ayudan a entender cómo interactúan los usuarios con el sitio web, recopilando información de forma anónima.</td>
                      <td className="py-3">2 años</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          <section className="p-6 rounded-2xl bg-[var(--color-negro-2)] border border-[var(--color-borde)]">
            <h2 className="text-lg font-bold font-[family-name:var(--font-heading)] mb-4 text-[var(--color-dorado)]">3. Cookies de terceros</h2>
            <div className="text-sm text-[var(--color-gris-claro)] leading-relaxed space-y-3">
              <p>Este sitio web puede utilizar servicios de terceros que instalan cookies en su dispositivo:</p>
              <ul className="list-disc list-inside space-y-2 ml-2">
                <li><strong className="text-[var(--color-blanco)]">Google Analytics:</strong> Cookies analíticas para obtener estadísticas de uso del sitio web. <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-[var(--color-dorado)] hover:underline">Política de privacidad de Google</a>.</li>
                <li><strong className="text-[var(--color-blanco)]">Google Maps:</strong> Si visualiza mapas integrados en la página de contacto. <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-[var(--color-dorado)] hover:underline">Política de privacidad de Google</a>.</li>
              </ul>
            </div>
          </section>

          <section className="p-6 rounded-2xl bg-[var(--color-negro-2)] border border-[var(--color-borde)]">
            <h2 className="text-lg font-bold font-[family-name:var(--font-heading)] mb-4 text-[var(--color-dorado)]">4. ¿Cómo gestionar las cookies?</h2>
            <div className="text-sm text-[var(--color-gris-claro)] leading-relaxed space-y-3">
              <p>Puede configurar su navegador para aceptar o rechazar todas las cookies, o para que le avise cuando un sitio web intenta instalar una cookie. Los procedimientos para bloquear y eliminar cookies varían según el navegador:</p>
              <ul className="list-disc list-inside space-y-2 ml-2">
                <li><a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer" className="text-[var(--color-dorado)] hover:underline">Google Chrome</a></li>
                <li><a href="https://support.mozilla.org/es/kb/habilitar-y-deshabilitar-cookies-sitios-web-rastrear-preferencias" target="_blank" rel="noopener noreferrer" className="text-[var(--color-dorado)] hover:underline">Mozilla Firefox</a></li>
                <li><a href="https://support.apple.com/es-es/guide/safari/sfri11471/mac" target="_blank" rel="noopener noreferrer" className="text-[var(--color-dorado)] hover:underline">Safari</a></li>
                <li><a href="https://support.microsoft.com/es-es/microsoft-edge/eliminar-cookies-en-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" target="_blank" rel="noopener noreferrer" className="text-[var(--color-dorado)] hover:underline">Microsoft Edge</a></li>
              </ul>
              <p>Tenga en cuenta que si bloquea todas las cookies, es posible que algunas funciones del sitio web no funcionen correctamente.</p>
            </div>
          </section>

          <section className="p-6 rounded-2xl bg-[var(--color-negro-2)] border border-[var(--color-borde)]">
            <h2 className="text-lg font-bold font-[family-name:var(--font-heading)] mb-4 text-[var(--color-dorado)]">5. Actualización de la política de cookies</h2>
            <div className="text-sm text-[var(--color-gris-claro)] leading-relaxed space-y-3">
              <p>{CONTACTO.nombre} puede modificar esta política de cookies en función de exigencias legislativas, reglamentarias o con la finalidad de adaptar dicha política a las instrucciones dictadas por la Agencia Española de Protección de Datos. Se recomienda revisar esta política periódicamente.</p>
            </div>
          </section>

          <section className="p-6 rounded-2xl bg-[var(--color-negro-2)] border border-[var(--color-borde)]">
            <h2 className="text-lg font-bold font-[family-name:var(--font-heading)] mb-4 text-[var(--color-dorado)]">6. Contacto</h2>
            <div className="text-sm text-[var(--color-gris-claro)] leading-relaxed">
              <p>
                Si tiene dudas sobre esta política de cookies, puede contactar con nosotros en{" "}
                <a href={`mailto:${CONTACTO.email}`} className="text-[var(--color-dorado)] hover:underline">{CONTACTO.email}</a>{" "}
                o llamar al{" "}
                <a href={CONTACTO.telefonoLink} className="text-[var(--color-dorado)] hover:underline">{CONTACTO.telefono}</a>.
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
