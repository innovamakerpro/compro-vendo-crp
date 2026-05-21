"use server";

import { createAdminClient } from "@/lib/supabase/admin";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export interface FormState {
  error?: string;
}

export async function crearVehiculo(
  _prev: FormState | null,
  formData: FormData
): Promise<FormState> {
  const supabase = createAdminClient();

  const marca       = (formData.get("marca") as string)?.trim();
  const modelo      = (formData.get("modelo") as string)?.trim();
  const version     = (formData.get("version") as string)?.trim() || null;
  const anio        = Number(formData.get("anio"));
  const kilometraje = Number(formData.get("kilometraje"));
  const precioEuros = Number(formData.get("precio"));
  const precioAntStr = formData.get("precio_anterior") as string;
  const combustible = formData.get("combustible") as string;
  const cambio      = formData.get("cambio") as string;
  const carroceria  = formData.get("carroceria") as string;
  const potenciaStr = formData.get("potencia") as string;
  const color       = (formData.get("color") as string)?.trim() || null;
  const plazasStr   = formData.get("plazas") as string;
  const puertasStr  = formData.get("puertas") as string;
  const danios      = (formData.get("danios") as string)?.trim() || null;
  const garantia    = (formData.get("garantia") as string)?.trim() || null;
  const descripcion = (formData.get("descripcion") as string)?.trim() || null;
  const estado      = (formData.get("estado") as string) || "disponible";
  const destacado   = formData.get("destacado") === "on";

  if (!marca || !modelo || !combustible || !cambio || !carroceria) {
    return { error: "Rellena todos los campos obligatorios (marca, modelo, combustible, cambio, carrocería)." };
  }

  const precio = Math.round(precioEuros * 100);
  if (precio <= 0) return { error: "El precio debe ser mayor que 0." };
  if (kilometraje < 0) return { error: "El kilometraje no puede ser negativo." };
  if (!anio || anio < 1900 || anio > 2100) return { error: "Introduce un año válido." };

  const { data: vehicle, error: insertError } = await supabase
    .from("vehicles")
    .insert({
      marca, modelo, version, anio, kilometraje, precio,
      precio_anterior: precioAntStr ? Math.round(Number(precioAntStr) * 100) : null,
      combustible, cambio, carroceria,
      potencia: potenciaStr ? Number(potenciaStr) : null,
      color,
      plazas: plazasStr ? Number(plazasStr) : null,
      puertas: puertasStr ? Number(puertasStr) : null,
      danios, garantia, descripcion,
      estado: estado as "disponible" | "reservado" | "vendido" | "oculto",
      destacado,
    })
    .select("id")
    .single();

  if (insertError || !vehicle) {
    return { error: insertError?.message ?? "Error al guardar el vehículo." };
  }

  // Subir imágenes al bucket de Storage
  const imageFiles = formData.getAll("imagenes") as File[];
  const validImages = imageFiles.filter((f) => f.size > 0);

  for (let i = 0; i < validImages.length; i++) {
    const file = validImages[i];
    const ext  = file.name.split(".").pop()?.toLowerCase() ?? "jpg";
    const path = `${vehicle.id}/${i}-${Date.now()}.${ext}`;

    const buffer = await file.arrayBuffer();
    const { error: upErr } = await supabase.storage
      .from("vehicle-images")
      .upload(path, buffer, { contentType: file.type });

    if (upErr) continue;

    const { data: { publicUrl } } = supabase.storage
      .from("vehicle-images")
      .getPublicUrl(path);

    await supabase.from("vehicle_images").insert({
      vehicle_id:   vehicle.id,
      url:          publicUrl,
      orden:        i,
      es_principal: i === 0,
    });
  }

  revalidatePath("/admin/vehiculos");
  revalidatePath("/catalogo");
  revalidatePath("/");
  redirect("/admin/vehiculos");
}
