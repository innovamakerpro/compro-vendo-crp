import Link from "next/link";
import { createAdminClient } from "@/lib/supabase/admin";
import VehiculosTable from "./VehiculosTable";

export const dynamic = "force-dynamic";

export default async function AdminVehiculosPage() {
  const supabase = createAdminClient();
  const { data } = await supabase
    .from("vehicles")
    .select("*, vehicle_images(*)")
    .order("created_at", { ascending: false });

  type VRow = typeof data extends (infer T)[] | null ? T : never;
  const vehiculos = (data ?? []) as VRow[];

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold font-[family-name:var(--font-heading)]">Vehículos</h1>
          <p className="text-[var(--color-gris)] text-sm mt-1">
            {vehiculos.length} vehículo{vehiculos.length !== 1 ? "s" : ""} en total
          </p>
        </div>
        <Link href="/admin/vehiculos/nuevo" className="btn-primary text-sm px-5 py-2.5">
          + Añadir vehículo
        </Link>
      </div>

      <VehiculosTable vehiculos={vehiculos} />
    </div>
  );
}
