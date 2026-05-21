"use server";

import { createAdminClient } from "@/lib/supabase/admin";
import { revalidatePath } from "next/cache";

export async function cambiarEstadoVehiculo(id: string, estado: string) {
  const supabase = createAdminClient();
  await supabase
    .from("vehicles")
    .update({ estado: estado as "disponible" | "reservado" | "vendido" | "oculto" })
    .eq("id", id);

  revalidatePath("/admin/vehiculos");
  revalidatePath("/catalogo");
  revalidatePath("/");
}

export async function eliminarVehiculo(id: string) {
  const supabase = createAdminClient();

  // Obtener rutas de imágenes en Storage para borrarlas
  const { data: images } = await supabase
    .from("vehicle_images")
    .select("url")
    .eq("vehicle_id", id);

  if (images && images.length > 0) {
    const paths = images
      .map((img) => {
        const parts = img.url.split("/vehicle-images/");
        return parts[1] ?? null;
      })
      .filter(Boolean) as string[];

    if (paths.length > 0) {
      await supabase.storage.from("vehicle-images").remove(paths);
    }
  }

  await supabase.from("vehicles").delete().eq("id", id);

  revalidatePath("/admin/vehiculos");
  revalidatePath("/catalogo");
  revalidatePath("/");
}
