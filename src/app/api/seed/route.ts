/**
 * GET /api/seed
 * 
 * Inserta 8 vehículos de prueba en Supabase para poder manipularlos
 * desde el panel admin. Usa el cliente admin (service_role) para
 * bypassar las políticas RLS.
 *
 * ¡Solo ejecutar una vez! Si ya hay vehículos, no inserta nada.
 * Para re-ejecutar, borra primero los vehículos existentes desde el dashboard.
 */
import { NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'

// Datos de los 8 coches de prueba
const VEHICULOS_SEED = [
  {
    marca: 'BMW',
    modelo: 'Serie 3',
    version: '320d M Sport',
    anio: 2021,
    kilometraje: 45000,
    precio: 2890000,
    precio_anterior: 3150000,
    combustible: 'diesel',
    cambio: 'automatico',
    carroceria: 'sedan',
    potencia: 190,
    color: 'Negro Zafiro',
    plazas: 5,
    puertas: 4,
    garantia: 'Garantía de 12 meses incluida',
    descripcion:
      'BMW Serie 3 en estado impecable. Interior en cuero Dakota, navegación profesional, faros LED adaptativos, asientos calefactados. Mantenimiento oficial al día.',
    estado: 'disponible' as const,
    destacado: true,
    visitas: 0,
    imagenes: ['/mock/bmw-320d-1.png', '/mock/bmw-320d-2.png'],
  },
  {
    marca: 'Mercedes-Benz',
    modelo: 'Clase A',
    version: 'A 200 AMG Line',
    anio: 2022,
    kilometraje: 28000,
    precio: 3250000,
    combustible: 'gasolina',
    cambio: 'automatico',
    carroceria: 'sedan',
    potencia: 163,
    color: 'Gris Montaña',
    plazas: 5,
    puertas: 4,
    garantia: 'Garantía de 12 meses incluida',
    descripcion:
      'Mercedes Clase A con acabado AMG Line. Sistema MBUX, pantalla multimedia de 10.25", cámara trasera, sensores de aparcamiento. Un coche premium a precio de ocasión.',
    estado: 'disponible' as const,
    destacado: true,
    visitas: 0,
    imagenes: ['/mock/mercedes-a200-1.png'],
  },
  {
    marca: 'Audi',
    modelo: 'A4',
    version: '35 TFSI S Line',
    anio: 2020,
    kilometraje: 67000,
    precio: 2450000,
    combustible: 'gasolina',
    cambio: 'automatico',
    carroceria: 'sedan',
    potencia: 150,
    color: 'Blanco Ibis',
    plazas: 5,
    puertas: 4,
    garantia: 'Garantía de 6 meses incluida',
    descripcion:
      'Audi A4 con pack S Line exterior e interior. Virtual cockpit, navegación MMI, faros LED matrix. Historial completo de mantenimiento.',
    estado: 'disponible' as const,
    destacado: true,
    visitas: 0,
    imagenes: ['/mock/audi-a4-1.png'],
  },
  {
    marca: 'Toyota',
    modelo: 'RAV4',
    version: '2.5 Hybrid Advance',
    anio: 2023,
    kilometraje: 15000,
    precio: 3590000,
    combustible: 'hibrido',
    cambio: 'automatico',
    carroceria: 'suv',
    potencia: 218,
    color: 'Gris Eclipse',
    plazas: 5,
    puertas: 5,
    garantia: 'Garantía de fábrica vigente',
    descripcion:
      'Toyota RAV4 Hybrid con solo 15.000 km. Sistema híbrido auto-recargable, tracción delantera, cámara 360°, Toyota Safety Sense 2.0. Consumo mixto de 5.6L/100km.',
    estado: 'disponible' as const,
    destacado: true,
    visitas: 0,
    imagenes: ['/mock/toyota-rav4-1.png'],
  },
  {
    marca: 'Volkswagen',
    modelo: 'Golf',
    version: '1.5 TSI R-Line',
    anio: 2021,
    kilometraje: 38000,
    precio: 2190000,
    combustible: 'gasolina',
    cambio: 'manual',
    carroceria: 'sedan',
    potencia: 150,
    color: 'Gris Urano',
    plazas: 5,
    puertas: 5,
    garantia: 'Garantía de 12 meses incluida',
    descripcion:
      'Golf 8 con acabado R-Line. Digital cockpit pro, Discover Media, asistente de aparcamiento. El Golf más tecnológico de la historia.',
    estado: 'disponible' as const,
    destacado: false,
    visitas: 0,
    imagenes: ['/mock/vw-golf-1.png'],
  },
  {
    marca: 'SEAT',
    modelo: 'León',
    version: '1.5 TSI FR',
    anio: 2022,
    kilometraje: 22000,
    precio: 1990000,
    combustible: 'gasolina',
    cambio: 'manual',
    carroceria: 'sedan',
    potencia: 150,
    color: 'Rojo Deseo',
    plazas: 5,
    puertas: 5,
    garantia: 'Garantía de 12 meses incluida',
    descripcion:
      'SEAT León FR con motor 1.5 TSI EVO. Cuadro digital, navegación, asistentes de conducción de última generación. Deportividad y tecnología.',
    estado: 'disponible' as const,
    destacado: false,
    visitas: 0,
    imagenes: ['/mock/seat-leon-1.png'],
  },
  {
    marca: 'Hyundai',
    modelo: 'Tucson',
    version: '1.6 CRDi Tecno',
    anio: 2022,
    kilometraje: 35000,
    precio: 2690000,
    precio_anterior: 2850000,
    combustible: 'diesel',
    cambio: 'automatico',
    carroceria: 'suv',
    potencia: 136,
    color: 'Negro Phantom',
    plazas: 5,
    puertas: 5,
    garantia: 'Garantía de 12 meses incluida',
    descripcion:
      'Hyundai Tucson con diseño espectacular. Pantalla de 10.25", cuadro digital, climatizador bizona, cargador inalámbrico. El SUV más deseado.',
    estado: 'reservado' as const,
    destacado: false,
    visitas: 0,
    imagenes: ['/mock/hyundai-tucson-1.png'],
  },
  {
    marca: 'Peugeot',
    modelo: '3008',
    version: '1.5 BlueHDi Allure',
    anio: 2021,
    kilometraje: 52000,
    precio: 2390000,
    combustible: 'diesel',
    cambio: 'automatico',
    carroceria: 'suv',
    potencia: 130,
    color: 'Gris Artense',
    plazas: 5,
    puertas: 5,
    garantia: 'Garantía de 12 meses incluida',
    descripcion:
      'Peugeot 3008 con el innovador i-Cockpit. Pantalla táctil de 10", navegación 3D, grip control, cámara de visión trasera. Diseño que no pasa desapercibido.',
    estado: 'disponible' as const,
    destacado: false,
    visitas: 0,
    imagenes: ['/mock/peugeot-3008-1.png'],
  },
]

export async function GET() {
  try {
    const supabase = createAdminClient()

    // Comprobar si ya hay vehículos para no duplicar
    const { count } = await supabase
      .from('vehicles')
      .select('*', { count: 'exact', head: true })

    if (count && count > 0) {
      return NextResponse.json(
        {
          ok: false,
          mensaje: `Ya existen ${count} vehículos en la base de datos. Borra los existentes primero si quieres re-ejecutar el seed.`,
        },
        { status: 409 }
      )
    }

    const resultados: { marca: string; modelo: string; id: string; imagenes: number }[] = []

    for (const vehiculo of VEHICULOS_SEED) {
      const { imagenes, ...datosVehiculo } = vehiculo

      // Insertar el vehículo (el slug se genera automáticamente por trigger)
      const { data: vehiculoInsertado, error: errorVehiculo } = await supabase
        .from('vehicles')
        .insert({
          ...datosVehiculo,
          slug: '', // El trigger lo sobrescribirá
        })
        .select('id, marca, modelo, slug')
        .single()

      if (errorVehiculo || !vehiculoInsertado) {
        console.error(`Error insertando ${datosVehiculo.marca} ${datosVehiculo.modelo}:`, errorVehiculo)
        continue
      }

      // Insertar las imágenes del vehículo
      const imagenesData = imagenes.map((url, index) => ({
        vehicle_id: vehiculoInsertado.id,
        url,
        orden: index,
        es_principal: index === 0,
      }))

      const { error: errorImagenes } = await supabase
        .from('vehicle_images')
        .insert(imagenesData)

      if (errorImagenes) {
        console.error(`Error insertando imágenes de ${datosVehiculo.marca} ${datosVehiculo.modelo}:`, errorImagenes)
      }

      resultados.push({
        marca: vehiculoInsertado.marca,
        modelo: vehiculoInsertado.modelo,
        id: vehiculoInsertado.id,
        imagenes: imagenes.length,
      })
    }

    return NextResponse.json({
      ok: true,
      mensaje: `Se han insertado ${resultados.length} vehículos de prueba correctamente.`,
      vehiculos: resultados,
    })
  } catch (error) {
    console.error('Error en seed:', error)
    return NextResponse.json(
      { ok: false, mensaje: 'Error interno al ejecutar el seed.', error: String(error) },
      { status: 500 }
    )
  }
}
