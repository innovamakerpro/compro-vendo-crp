/**
 * Utilidad para refrescar la sesión de Supabase en el middleware de Next.js.
 * Mantiene la sesión activa leyendo y actualizando las cookies en cada request.
 */
import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'
import type { Database } from '@/types/database'

export async function updateSession(request: NextRequest) {
  // Comenzamos con una respuesta que continúa normalmente
  let supabaseResponse = NextResponse.next({
    request,
  })

  const supabase = createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          // Primero actualiza las cookies en el request entrante
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          )
          // Luego recrea la respuesta con las cookies actualizadas
          supabaseResponse = NextResponse.next({ request })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  // IMPORTANTE: No añadir lógica entre createServerClient y getUser.
  // Un error aquí podría dejar al usuario desconectado indefinidamente.
  const {
    data: { user },
  } = await supabase.auth.getUser()

  return { supabaseResponse, user }
}
