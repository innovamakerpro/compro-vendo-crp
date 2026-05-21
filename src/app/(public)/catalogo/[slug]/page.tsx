import type { Metadata } from "next";
import Link from "next/link";
import { getVehiculoPorSlug, getVehiculosSimilares } from "@/lib/queries/vehiculos";
import { formatPrecio } from "@/utils/formatters";
import FichaVehiculoClient from "./FichaVehiculoClient";

export const revalidate = 60;

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const vehiculo = await getVehiculoPorSlug(slug);

  if (!vehiculo) {
    return {
      title: "Vehículo no encontrado",
      description: "El vehículo que buscas no existe o ha sido retirado del catálogo.",
    };
  }

  const titulo = `${vehiculo.marca} ${vehiculo.modelo} ${vehiculo.version ? vehiculo.version : ""} ${vehiculo.anio}`.trim();
  const precio = formatPrecio(vehiculo.precio);
  const descripcion = `${titulo} por ${precio}. ${vehiculo.kilometraje.toLocaleString("es-ES")} km, ${vehiculo.combustible}, ${vehiculo.cambio}. ${vehiculo.garantia || "Garantía disponible."}. Concesionario en Navarra.`;

  return {
    title: `${vehiculo.marca} ${vehiculo.modelo} ${vehiculo.anio} — ${precio}`,
    description: descripcion,
    keywords: [
      `${vehiculo.marca} ${vehiculo.modelo} segunda mano`,
      `comprar ${vehiculo.marca} ${vehiculo.modelo}`,
      `${vehiculo.marca} ocasión navarra`,
      `${vehiculo.carroceria} segunda mano`,
      vehiculo.combustible,
    ],
    openGraph: {
      title: `${titulo} — ${precio}`,
      description: descripcion,
      type: "website",
      locale: "es_ES",
    },
  };
}

export default async function FichaVehiculoPage({ params }: PageProps) {
  const { slug } = await params;
  const vehiculo = await getVehiculoPorSlug(slug);

  if (!vehiculo) {
    return (
      <div className="min-h-screen pt-32 text-center">
        <h1 className="text-3xl font-bold font-[family-name:var(--font-heading)] mb-4">
          Vehículo no encontrado
        </h1>
        <p className="text-[var(--color-gris)] mb-8">
          El vehículo que buscas no existe o ha sido retirado del catálogo.
        </p>
        <Link href="/catalogo" className="btn-primary">
          Volver al catálogo
        </Link>
      </div>
    );
  }

  const similares = await getVehiculosSimilares(vehiculo.id, vehiculo.carroceria, vehiculo.marca);

  return <FichaVehiculoClient vehiculo={vehiculo} similares={similares} />;
}
