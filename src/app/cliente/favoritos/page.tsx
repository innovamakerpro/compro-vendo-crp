import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import FavoritosClient from "./FavoritosClient";

export const metadata = {
  title: "Mis favoritos — Compro y Vendo CRP",
};

export const dynamic = "force-dynamic";

export default async function FavoritosPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect("/auth/login?redirect=/cliente/favoritos");

  // Obtener IDs de favoritos del usuario
  const { data: favRows } = await supabase
    .from("favorites")
    .select("vehicle_id")
    .eq("user_id", user.id);

  const vehicleIds = (favRows ?? []).map((f) => f.vehicle_id);

  if (vehicleIds.length === 0) {
    return (
      <div>
        <h1 className="text-2xl font-bold font-[family-name:var(--font-heading)] mb-2">
          Mis favoritos
        </h1>
        <p className="text-[var(--color-gris)] text-sm mb-8">
          Los vehículos que guardes aparecerán aquí.
        </p>

        <div className="bg-[var(--color-negro-2)] border border-[var(--color-borde)] rounded-xl p-12 text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-500/10 flex items-center justify-center">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#EF4444" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.6">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
          </div>
          <h2 className="text-lg font-bold font-[family-name:var(--font-heading)] text-[var(--color-blanco)] mb-2">
            No tienes favoritos todavía
          </h2>
          <p className="text-sm text-[var(--color-gris)] mb-6 max-w-md mx-auto">
            Explora nuestro catálogo y pulsa el corazón en los coches que te gusten para guardarlos aquí.
          </p>
          <Link href="/catalogo" className="btn-primary inline-flex">
            Explorar catálogo
          </Link>
        </div>
      </div>
    );
  }

  // Obtener datos de los vehículos favoritos con su imagen principal
  const { data: vehiclesRaw } = await supabase
    .from("vehicles")
    .select("*, vehicle_images(*)")
    .in("id", vehicleIds);

  type VehicleWithImages = {
    id: string; marca: string; modelo: string; version: string | null;
    slug: string; anio: number; kilometraje: number; precio: number;
    precio_anterior: number | null; estado: string; combustible: string;
    cambio: string;
    vehicle_images: { url: string; es_principal: boolean; orden: number }[];
  };

  const vehiclesTyped = (vehiclesRaw ?? []) as unknown as VehicleWithImages[];

  const vehicles = vehiclesTyped.map((v) => {
    const images = v.vehicle_images ?? [];
    const principal = images.find((img) => img.es_principal) ?? images.sort((a, b) => a.orden - b.orden)[0];
    return {
      id: v.id,
      marca: v.marca,
      modelo: v.modelo,
      version: v.version,
      slug: v.slug,
      anio: v.anio,
      kilometraje: v.kilometraje,
      precio: v.precio,
      precio_anterior: v.precio_anterior,
      estado: v.estado,
      combustible: v.combustible,
      cambio: v.cambio,
      imagenUrl: principal?.url ?? null,
    };
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold font-[family-name:var(--font-heading)]">
            Mis favoritos
          </h1>
          <p className="text-[var(--color-gris)] text-sm mt-1">
            {vehicles.length} vehículo{vehicles.length !== 1 ? "s" : ""} guardado{vehicles.length !== 1 ? "s" : ""}
          </p>
        </div>
        <Link href="/catalogo" className="btn-secondary text-xs py-2 px-4">
          + Añadir más
        </Link>
      </div>

      <FavoritosClient vehiculos={vehicles} userId={user.id} />
    </div>
  );
}
