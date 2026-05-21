/**
 * Cliente de Supabase para uso en el servidor (Server Components, Route Handlers, Server Actions).
 * Lee y escribe cookies para gestionar la sesión del usuario en el servidor.
 */
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import type { Database } from '@/types/database'

/**
 * Crea un cliente de Supabase para Server Components.
 * Debe llamarse dentro de una función async porque `cookies()` es asíncrono en Next.js 15+.
 */
export async function createClient() {
  const cookieStore = await cookies()

  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch {
            // setAll puede fallar en Server Components de solo lectura.
            // Si hay un middleware refrescando sesiones, esto es seguro de ignorar.
          }
        },
      },
    }
  )
}
