import { createClient } from '@/lib/supabase/server'
import type { Vehiculo, VehiculoImagen } from '@/types/vehiculo'
import type { VehicleRow, VehicleImageRow } from '@/types/database'

type VehicleWithImages = VehicleRow & { vehicle_images: VehicleImageRow[] }

const SELECT = '*, vehicle_images(*)' as const

function mapToVehiculo(v: VehicleWithImages): Vehiculo {
  return {
    id: v.id,
    marca: v.marca,
    modelo: v.modelo,
    version: v.version ?? undefined,
    slug: v.slug,
    anio: v.anio,
    kilometraje: v.kilometraje,
    precio: v.precio,
    precio_anterior: v.precio_anterior ?? undefined,
    combustible: v.combustible,
    cambio: v.cambio,
    carroceria: v.carroceria,
    potencia: v.potencia ?? undefined,
    color: v.color ?? undefined,
    plazas: v.plazas ?? undefined,
    puertas: v.puertas ?? undefined,
    danios: v.danios ?? undefined,
    garantia: v.garantia ?? undefined,
    descripcion: v.descripcion ?? undefined,
    estado: v.estado,
    destacado: v.destacado,
    comprador_id: v.comprador_id ?? undefined,
    fecha_venta: v.fecha_venta ?? undefined,
    visitas: v.visitas,
    created_at: v.created_at,
    updated_at: v.updated_at,
    imagenes: v.vehicle_images
      .sort((a, b) => a.orden - b.orden)
      .map((img): VehiculoImagen => ({
        id: img.id,
        vehicle_id: img.vehicle_id,
        url: img.url,
        orden: img.orden,
        es_principal: img.es_principal,
        created_at: img.created_at,
      })),
  }
}

export async function getVehiculosDestacados(limite = 6): Promise<Vehiculo[]> {
  const supabase = await createClient()
  const { data } = await supabase
    .from('vehicles')
    .select(SELECT)
    .eq('estado', 'disponible')
    .eq('destacado', true)
    .order('created_at', { ascending: false })
    .limit(limite)

  if (!data) return []
  return (data as unknown as VehicleWithImages[]).map(mapToVehiculo)
}

export async function getVehiculos(): Promise<Vehiculo[]> {
  const supabase = await createClient()
  const { data } = await supabase
    .from('vehicles')
    .select(SELECT)
    .in('estado', ['disponible', 'reservado'])
    .order('created_at', { ascending: false })

  if (!data) return []
  return (data as unknown as VehicleWithImages[]).map(mapToVehiculo)
}

export async function getVehiculoPorSlug(slug: string): Promise<Vehiculo | null> {
  const supabase = await createClient()
  const { data } = await supabase
    .from('vehicles')
    .select(SELECT)
    .eq('slug', slug)
    .maybeSingle()

  if (!data) return null
  return mapToVehiculo(data as unknown as VehicleWithImages)
}

export async function getVehiculosSimilares(
  vehiculoId: string,
  carroceria: string,
  marca: string,
  limite = 3,
): Promise<Vehiculo[]> {
  const supabase = await createClient()
  const { data } = await supabase
    .from('vehicles')
    .select(SELECT)
    .eq('estado', 'disponible')
    .neq('id', vehiculoId)
    .or(`carroceria.eq.${carroceria},marca.eq.${marca}`)
    .limit(limite)

  if (!data) return []
  return (data as unknown as VehicleWithImages[]).map(mapToVehiculo)
}
