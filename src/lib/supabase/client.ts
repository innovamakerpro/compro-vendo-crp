/**
 * Cliente de Supabase para uso en el navegador (Client Components).
 * Gestiona la sesión del usuario en el lado del cliente.
 */
import { createBrowserClient } from '@supabase/ssr'
import type { Database } from '@/types/database'

/**
 * Crea y devuelve un cliente de Supabase para componentes cliente.
 * Se llama una vez por componente; @supabase/ssr gestiona internamente
 * que no se creen instancias duplicadas.
 */
export function createClient() {
  return createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}
