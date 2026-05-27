/**
 * Tipos generados manualmente para el cliente tipado de Supabase.
 * Cuando tengas el schema en Supabase puedes regenerar este archivo con:
 *   npx supabase gen types typescript --project-id TU_PROJECT_ID > src/types/database.ts
 *
 * Por ahora definimos los tipos a mano basándonos en el schema que crearemos.
 */

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      vehicles: {
        Row: {
          id: string
          marca: string
          modelo: string
          version: string | null
          slug: string
          anio: number
          kilometraje: number
          precio: number
          precio_anterior: number | null
          combustible: string
          cambio: string
          carroceria: string
          potencia: number | null
          color: string | null
          plazas: number | null
          puertas: number | null
          danios: string | null
          garantia: string | null
          descripcion: string | null
          estado: 'disponible' | 'reservado' | 'vendido' | 'oculto'
          destacado: boolean
          comprador_id: string | null
          fecha_venta: string | null
          visitas: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          marca: string
          modelo: string
          version?: string | null
          slug?: string
          anio: number
          kilometraje: number
          precio: number
          precio_anterior?: number | null
          combustible: string
          cambio: string
          carroceria: string
          potencia?: number | null
          color?: string | null
          plazas?: number | null
          puertas?: number | null
          danios?: string | null
          garantia?: string | null
          descripcion?: string | null
          estado?: 'disponible' | 'reservado' | 'vendido' | 'oculto'
          destacado?: boolean
          comprador_id?: string | null
          fecha_venta?: string | null
          visitas?: number
        }
        Update: {
          id?: string
          marca?: string
          modelo?: string
          version?: string | null
          slug?: string
          anio?: number
          kilometraje?: number
          precio?: number
          precio_anterior?: number | null
          combustible?: string
          cambio?: string
          carroceria?: string
          potencia?: number | null
          color?: string | null
          plazas?: number | null
          puertas?: number | null
          danios?: string | null
          garantia?: string | null
          descripcion?: string | null
          estado?: 'disponible' | 'reservado' | 'vendido' | 'oculto'
          destacado?: boolean
          comprador_id?: string | null
          fecha_venta?: string | null
          visitas?: number
        }
        Relationships: []
      }
      vehicle_images: {
        Row: {
          id: string
          vehicle_id: string
          url: string
          orden: number
          es_principal: boolean
          created_at: string
        }
        Insert: {
          id?: string
          vehicle_id: string
          url: string
          orden?: number
          es_principal?: boolean
        }
        Update: {
          id?: string
          vehicle_id?: string
          url?: string
          orden?: number
          es_principal?: boolean
        }
        Relationships: []
      }
      profiles: {
        Row: {
          id: string
          email: string
          nombre: string | null
          apellidos: string | null
          telefono: string | null
          tipo_documento: string | null
          numero_documento: string | null
          rol: 'cliente' | 'admin'
          bloqueado: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          nombre?: string | null
          apellidos?: string | null
          telefono?: string | null
          tipo_documento?: string | null
          numero_documento?: string | null
          rol?: 'cliente' | 'admin'
          bloqueado?: boolean
        }
        Update: {
          id?: string
          email?: string
          nombre?: string | null
          apellidos?: string | null
          telefono?: string | null
          tipo_documento?: string | null
          numero_documento?: string | null
          rol?: 'cliente' | 'admin'
          bloqueado?: boolean
        }
        Relationships: []
      }
      favorites: {
        Row: {
          id: string
          user_id: string
          vehicle_id: string
          created_at: string
        }
        Insert: {
          user_id: string
          vehicle_id: string
        }
        Update: never
        Relationships: []
      }
      preferences: {
        Row: {
          id: string
          user_id: string
          nombre: string
          marcas: string[] | null
          precio_min: number | null
          precio_max: number | null
          anio_min: number | null
          km_max: number | null
          combustibles: string[] | null
          cambios: string[] | null
          carrocerias: string[] | null
          activo: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          user_id: string
          nombre: string
          marcas?: string[] | null
          precio_min?: number | null
          precio_max?: number | null
          anio_min?: number | null
          km_max?: number | null
          combustibles?: string[] | null
          cambios?: string[] | null
          carrocerias?: string[] | null
          activo?: boolean
        }
        Update: {
          user_id?: string
          nombre?: string
          marcas?: string[] | null
          precio_min?: number | null
          precio_max?: number | null
          anio_min?: number | null
          km_max?: number | null
          combustibles?: string[] | null
          cambios?: string[] | null
          carrocerias?: string[] | null
          activo?: boolean
        }
        Relationships: []
      }
      notifications: {
        Row: {
          id: string
          user_id: string
          tipo: 'nuevo_coche' | 'bajada_precio' | 'mensaje_nuevo' | 'cliente_nuevo'
          titulo: string
          mensaje: string | null
          datos: Json | null
          leida: boolean
          created_at: string
        }
        Insert: {
          user_id: string
          tipo: 'nuevo_coche' | 'bajada_precio' | 'mensaje_nuevo' | 'cliente_nuevo'
          titulo: string
          mensaje?: string | null
          datos?: Json | null
          leida?: boolean
        }
        Update: {
          user_id?: string
          tipo?: 'nuevo_coche' | 'bajada_precio' | 'mensaje_nuevo' | 'cliente_nuevo'
          titulo?: string
          mensaje?: string | null
          datos?: Json | null
          leida?: boolean
        }
        Relationships: []
      }
      conversations: {
        Row: {
          id: string
          vehicle_id: string | null
          cliente_id: string
          admin_id: string | null
          asunto: string | null
          estado: 'abierta' | 'cerrada'
          created_at: string
          updated_at: string
        }
        Insert: {
          vehicle_id?: string | null
          cliente_id: string
          admin_id?: string | null
          asunto?: string | null
          estado?: 'abierta' | 'cerrada'
        }
        Update: {
          vehicle_id?: string | null
          cliente_id?: string
          admin_id?: string | null
          asunto?: string | null
          estado?: 'abierta' | 'cerrada'
        }
        Relationships: []
      }
      messages: {
        Row: {
          id: string
          conversation_id: string
          sender_id: string
          contenido: string
          leido: boolean
          created_at: string
        }
        Insert: {
          conversation_id: string
          sender_id: string
          contenido: string
          leido?: boolean
        }
        Update: {
          conversation_id?: string
          sender_id?: string
          contenido?: string
          leido?: boolean
        }
        Relationships: []
      }
      site_settings: {
        Row: {
          id: string
          clave: string
          valor: Json
          descripcion: string | null
          updated_at: string
        }
        Insert: {
          clave: string
          valor: Json
          descripcion?: string | null
        }
        Update: {
          clave?: string
          valor?: Json
          descripcion?: string | null
        }
        Relationships: []
      }
    }
    Views: Record<string, never>
    Functions: Record<string, never>
    Enums: {
      vehicle_estado: 'disponible' | 'reservado' | 'vendido' | 'oculto'
      user_rol: 'cliente' | 'admin'
      conversation_estado: 'abierta' | 'cerrada'
      notification_tipo: 'nuevo_coche' | 'bajada_precio' | 'mensaje_nuevo' | 'cliente_nuevo'
    }
  }
}

// Tipos de conveniencia para no repetir el path completo
export type VehicleRow = Database['public']['Tables']['vehicles']['Row']
export type VehicleInsert = Database['public']['Tables']['vehicles']['Insert']
export type VehicleUpdate = Database['public']['Tables']['vehicles']['Update']

export type VehicleImageRow = Database['public']['Tables']['vehicle_images']['Row']
export type ProfileRow = Database['public']['Tables']['profiles']['Row']
export type FavoriteRow = Database['public']['Tables']['favorites']['Row']
export type PreferenceRow = Database['public']['Tables']['preferences']['Row']
export type NotificationRow = Database['public']['Tables']['notifications']['Row']
export type ConversationRow = Database['public']['Tables']['conversations']['Row']
export type MessageRow = Database['public']['Tables']['messages']['Row']
export type SiteSettingRow = Database['public']['Tables']['site_settings']['Row']
