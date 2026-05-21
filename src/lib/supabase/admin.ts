/**
 * Cliente de Supabase con privilegios de administrador (service_role).
 * SOLO usar en el servidor (Route Handlers, Server Actions, scripts de seeding).
 * Nunca exponer al navegador: bypasa todas las políticas RLS.
 */
import { createClient, type SupabaseClient } from '@supabase/supabase-js'
import type { Database } from '@/types/database'

/**
 * Instancia singleton del cliente admin.
 * Se reutiliza entre llamadas para no crear múltiples conexiones.
 */
let adminClient: SupabaseClient<Database> | null = null

export function createAdminClient(): SupabaseClient<Database> {
  if (adminClient) return adminClient

  if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
    throw new Error('SUPABASE_SERVICE_ROLE_KEY no está definida en las variables de entorno.')
  }

  adminClient = createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY,
    {
      auth: {
        // El cliente admin no necesita persistir sesión de usuario
        autoRefreshToken: false,
        persistSession: false,
      },
    }
  )

  return adminClient
}
