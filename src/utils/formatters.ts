// Funciones de formato — Compro y Vendo CRP

/**
 * Formatea un precio en céntimos a formato español con símbolo de euro.
 * Ejemplo: 1250000 → "12.500 €"
 */
export function formatPrecio(centimos: number): string {
  const euros = centimos / 100;
  return new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(euros);
}

/**
 * Formatea el kilometraje con separador de miles.
 * Ejemplo: 85000 → "85.000 km"
 */
export function formatKm(km: number): string {
  return `${new Intl.NumberFormat("es-ES").format(km)} km`;
}

/**
 * Formatea una fecha ISO a formato español legible.
 * Ejemplo: "2024-03-15T10:30:00Z" → "15 mar 2024"
 */
export function formatFecha(isoDate: string): string {
  return new Intl.DateTimeFormat("es-ES", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(isoDate));
}

/**
 * Genera un slug URL-friendly a partir de un texto.
 * Ejemplo: "BMW Serie 3 2020" → "bmw-serie-3-2020"
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // Quitar acentos
    .replace(/[^a-z0-9]+/g, "-")    // Reemplazar caracteres no alfanuméricos por guiones
    .replace(/^-+|-+$/g, "");       // Quitar guiones al inicio/final
}

/**
 * Calcula el porcentaje de descuento entre precio anterior y actual.
 * Ejemplo: (1500000, 1250000) → 17 (17%)
 */
export function calcularDescuento(precioAnterior: number, precioActual: number): number {
  if (!precioAnterior || precioAnterior <= precioActual) return 0;
  return Math.round(((precioAnterior - precioActual) / precioAnterior) * 100);
}

/**
 * Capitaliza la primera letra de un texto.
 */
export function capitalizar(texto: string): string {
  return texto.charAt(0).toUpperCase() + texto.slice(1);
}
