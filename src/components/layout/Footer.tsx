import Link from "next/link";
import { CONTACTO } from "@/utils/constants";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[var(--color-negro-2)] border-t border-[var(--color-borde)]" id="footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Grid principal */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 py-16">
          {/* Columna 1: Logo y descripción */}
          <div className="lg:col-span-1">
            <h3 className="font-[family-name:var(--font-heading)] text-lg font-bold mb-4">
              <span className="text-gradient">COMPRO Y VENDO</span>
              <span className="block text-xs tracking-[0.2em] text-[var(--color-gris)] mt-1">CRP</span>
            </h3>
            <p className="text-sm text-[var(--color-gris)] leading-relaxed mb-6">
              Tu concesionario de confianza en Navarra. Más de 30 vehículos de segunda mano con garantía y financiación a medida.
            </p>
            {/* Redes sociales */}
            <div className="flex gap-3">
              <a
                href={CONTACTO.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-[var(--color-negro-3)] border border-[var(--color-borde)] flex items-center justify-center text-[var(--color-gris)] hover:text-[#25D366] hover:border-[#25D366]/30 transition-all"
                aria-label="WhatsApp"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
              </a>
              <a
                href={`mailto:${CONTACTO.email}`}
                className="w-10 h-10 rounded-full bg-[var(--color-negro-3)] border border-[var(--color-borde)] flex items-center justify-center text-[var(--color-gris)] hover:text-[var(--color-dorado)] hover:border-[var(--color-borde-hover)] transition-all"
                aria-label="Email"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
              </a>
            </div>
          </div>

          {/* Columna 2: Navegación */}
          <div>
            <h4 className="font-[family-name:var(--font-heading)] text-sm font-semibold text-[var(--color-blanco)] mb-6 uppercase tracking-wider">
              Navegación
            </h4>
            <ul className="space-y-3">
              {[
                { href: "/", label: "Inicio" },
                { href: "/catalogo", label: "Catálogo" },
                { href: "/financiacion", label: "Financiación" },
                { href: "/quienes-somos", label: "Quiénes somos" },
                { href: "/contacto", label: "Contacto" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-[var(--color-gris)] hover:text-[var(--color-dorado)] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Columna 3: Contacto */}
          <div>
            <h4 className="font-[family-name:var(--font-heading)] text-sm font-semibold text-[var(--color-blanco)] mb-6 uppercase tracking-wider">
              Contacto
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm text-[var(--color-gris)]">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--color-dorado)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 shrink-0">
                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                {CONTACTO.direccion}
              </li>
              <li>
                <a href={CONTACTO.telefonoLink} className="flex items-center gap-3 text-sm text-[var(--color-gris)] hover:text-[var(--color-dorado)] transition-colors">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--color-dorado)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                  {CONTACTO.telefono}
                </a>
              </li>
              <li>
                <a href={`mailto:${CONTACTO.email}`} className="flex items-center gap-3 text-sm text-[var(--color-gris)] hover:text-[var(--color-dorado)] transition-colors">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--color-dorado)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
                    <rect x="2" y="4" width="20" height="16" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                  {CONTACTO.email}
                </a>
              </li>
            </ul>
          </div>

          {/* Columna 4: Horario */}
          <div>
            <h4 className="font-[family-name:var(--font-heading)] text-sm font-semibold text-[var(--color-blanco)] mb-6 uppercase tracking-wider">
              Horario
            </h4>
            <ul className="space-y-3">
              {Object.entries(CONTACTO.horario).map(([dia, hora]) => (
                <li key={dia} className="flex justify-between text-sm">
                  <span className="text-[var(--color-gris)]">{dia}</span>
                  <span className="text-[var(--color-blanco-perla)]">{hora}</span>
                </li>
              ))}
            </ul>
            <div className="mt-6">
              <Link href="/catalogo" className="btn-primary text-xs py-2.5 w-full">
                Ver coches disponibles
              </Link>
            </div>
          </div>
        </div>

        {/* Línea inferior */}
        <div className="border-t border-[var(--color-borde)] py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[var(--color-gris)]">
            © {currentYear} {CONTACTO.nombreLegal}. Todos los derechos reservados.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/politica-privacidad" className="text-xs text-[var(--color-gris)] hover:text-[var(--color-dorado)] transition-colors">
              Política de privacidad
            </Link>
            <Link href="/aviso-legal" className="text-xs text-[var(--color-gris)] hover:text-[var(--color-dorado)] transition-colors">
              Aviso legal
            </Link>
            <Link href="/cookies" className="text-xs text-[var(--color-gris)] hover:text-[var(--color-dorado)] transition-colors">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
