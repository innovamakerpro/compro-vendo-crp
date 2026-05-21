/**
 * Middleware de Next.js — protege rutas privadas y refresca la sesión de Supabase.
 *
 * Rutas protegidas:
 *  - /admin/*   → solo accesible con sesión activa (rol admin verificado en la propia página)
 *  - /cliente/* → solo accesible con sesión activa
 *
 * El resto de rutas son públicas y no requieren autenticación.
 */
import { type NextRequest, NextResponse } from 'next/server'
import { updateSession } from '@/lib/supabase/middleware'

// Rutas que requieren sesión activa
const RUTAS_PROTEGIDAS = ['/admin', '/cliente']

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Verificar si la ruta actual está protegida
  const esRutaProtegida = RUTAS_PROTEGIDAS.some((ruta) =>
    pathname.startsWith(ruta)
  )

  // Refrescar la sesión en cada request (necesario para que no expire)
  const { supabaseResponse, user } = await updateSession(request)

  // Si la ruta requiere autenticación y no hay usuario, redirigir al login
  if (esRutaProtegida && !user) {
    const loginUrl = new URL('/auth/login', request.url)
    // Guardar la URL de destino para redirigir tras el login
    loginUrl.searchParams.set('redirect', pathname)
    return NextResponse.redirect(loginUrl)
  }

  return supabaseResponse
}

export const config = {
  matcher: [
    /*
     * Aplicar middleware a todas las rutas excepto:
     * - _next/static  → archivos estáticos de Next.js
     * - _next/image   → optimización de imágenes
     * - favicon.ico   → favicon
     * - archivos con extensión (imágenes, fuentes, etc.)
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|woff|woff2)$).*)',
  ],
}
