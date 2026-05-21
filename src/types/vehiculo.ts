// Tipos principales del proyecto — Compro y Vendo CRP

export interface Vehiculo {
  id: string;
  marca: string;
  modelo: string;
  version?: string;
  slug: string;
  anio: number;
  kilometraje: number;
  precio: number;         // En céntimos (12500€ = 1250000)
  precio_anterior?: number;
  combustible: string;
  cambio: string;
  carroceria: string;
  potencia?: number;
  color?: string;
  plazas?: number;
  puertas?: number;
  danios?: string;
  garantia?: string;
  descripcion?: string;
  estado: "disponible" | "reservado" | "vendido" | "oculto";
  destacado: boolean;
  comprador_id?: string;
  fecha_venta?: string;
  visitas: number;
  created_at: string;
  updated_at: string;
  // Relación con imágenes
  imagenes?: VehiculoImagen[];
}

export interface VehiculoImagen {
  id: string;
  vehicle_id: string;
  url: string;
  orden: number;
  es_principal: boolean;
  created_at: string;
}

export interface Perfil {
  id: string;
  email: string;
  nombre?: string;
  apellidos?: string;
  telefono?: string;
  rol: "cliente" | "admin";
  bloqueado: boolean;
  created_at: string;
  updated_at: string;
}

export interface Preferencia {
  id: string;
  user_id: string;
  nombre: string;
  marcas?: string[];
  precio_min?: number;
  precio_max?: number;
  anio_min?: number;
  km_max?: number;
  combustibles?: string[];
  cambios?: string[];
  carrocerias?: string[];
  activo: boolean;
  created_at: string;
  updated_at: string;
}

export interface Notificacion {
  id: string;
  user_id: string;
  tipo: "nuevo_coche" | "bajada_precio" | "mensaje_nuevo" | "cliente_nuevo";
  titulo: string;
  mensaje?: string;
  datos?: Record<string, unknown>;
  leida: boolean;
  created_at: string;
}

// Filtros del catálogo
export interface FiltrosCatalogo {
  marca?: string;
  combustible?: string;
  cambio?: string;
  carroceria?: string;
  precio_min?: number;
  precio_max?: number;
  anio_min?: number;
  anio_max?: number;
  km_max?: number;
  busqueda?: string;
  orden?: string;
}
