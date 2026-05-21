import Link from "next/link";
import { notFound } from "next/navigation";
import { createAdminClient } from "@/lib/supabase/admin";
import EditarVehiculoForm from "./EditarVehiculoForm";

export const dynamic = "force-dynamic";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { id } = await params;
  const supabase = createAdminClient();
  const { data } = await supabase
    .from("vehicles")
    .select("marca, modelo, anio")
    .eq("id", id)
    .single();

  if (!data) return { title: "Vehículo no encontrado" };

  return {
    title: `Editar ${data.marca} ${data.modelo} ${data.anio} — Panel Admin`,
  };
}

export default async function EditarVehiculoPage({ params }: PageProps) {
  const { id } = await params;
  const supabase = createAdminClient();

  const { data: vehiculo } = await supabase
    .from("vehicles")
    .select("*")
    .eq("id", id)
    .single();

  if (!vehiculo) {
    notFound();
  }

  const { data: imagenes } = await supabase
    .from("vehicle_images")
    .select("*")
    .eq("vehicle_id", id)
    .order("orden", { ascending: true });

  return (
    <div className="p-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-[var(--color-gris)] mb-6">
        <Link href="/admin/vehiculos" className="hover:text-[var(--color-dorado)] transition-colors">
          Vehículos
        </Link>
        <span>›</span>
        <span className="text-[var(--color-gris-claro)]">
          Editar {vehiculo.marca} {vehiculo.modelo}
        </span>
      </div>

      <div className="mb-8">
        <h1 className="text-2xl font-bold font-[family-name:var(--font-heading)]">
          Editar vehículo
        </h1>
        <p className="text-[var(--color-gris)] text-sm mt-1">
          {vehiculo.marca} {vehiculo.modelo} {vehiculo.version ?? ""} {vehiculo.anio}
        </p>
      </div>

      <EditarVehiculoForm
        vehiculo={{
          id: vehiculo.id,
          marca: vehiculo.marca,
          modelo: vehiculo.modelo,
          version: vehiculo.version,
          anio: vehiculo.anio,
          kilometraje: vehiculo.kilometraje,
          precio: vehiculo.precio,
          precio_anterior: vehiculo.precio_anterior,
          combustible: vehiculo.combustible,
          cambio: vehiculo.cambio,
          carroceria: vehiculo.carroceria,
          potencia: vehiculo.potencia,
          color: vehiculo.color,
          plazas: vehiculo.plazas,
          puertas: vehiculo.puertas,
          danios: vehiculo.danios,
          garantia: vehiculo.garantia,
          descripcion: vehiculo.descripcion,
          estado: vehiculo.estado,
          destacado: vehiculo.destacado,
        }}
        imagenes={
          (imagenes ?? []).map((img) => ({
            id: img.id,
            url: img.url,
            orden: img.orden,
            es_principal: img.es_principal,
          }))
        }
      />
    </div>
  );
}
