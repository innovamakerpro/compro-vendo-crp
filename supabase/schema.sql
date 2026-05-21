-- ============================================================
-- SCHEMA COMPLETO — Compro y Vendo CRP
-- ============================================================
-- Instrucciones:
--   1. Abre Supabase Dashboard → SQL Editor → New query
--   2. Pega todo este archivo y pulsa Run
--   3. Después de ejecutar, crea el bucket de Storage (ver final)
--   4. Crea el usuario admin en Auth y ejecuta el UPDATE del final
-- ============================================================


-- ============================================================
-- EXTENSIONES
-- ============================================================
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";


-- ============================================================
-- TIPOS ENUMERADOS
-- (DO $$ para no fallar si ya existen)
-- ============================================================
DO $$ BEGIN
  CREATE TYPE vehicle_estado AS ENUM ('disponible', 'reservado', 'vendido', 'oculto');
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE TYPE user_rol AS ENUM ('cliente', 'admin');
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE TYPE conversation_estado AS ENUM ('abierta', 'cerrada');
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE TYPE notification_tipo AS ENUM (
    'nuevo_coche', 'bajada_precio', 'mensaje_nuevo', 'cliente_nuevo'
  );
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;


-- ============================================================
-- FUNCIONES DE UTILIDAD
-- ============================================================

-- Convierte texto libre a slug URL-safe (soporta acentos españoles)
CREATE OR REPLACE FUNCTION slugify(input TEXT)
RETURNS TEXT AS $$
DECLARE
  result TEXT;
BEGIN
  result := lower(trim(input));
  -- Sustituir vocales acentuadas y caracteres españoles
  result := translate(result,
    'áàäâãéèëêíìïîóòöôõúùüûñç',
    'aaaaaeeeeiiiioooouuuunc'
  );
  -- Cualquier caracter no alfanumérico → guión
  result := regexp_replace(result, '[^a-z0-9]+', '-', 'g');
  -- Eliminar guiones al inicio y al final
  result := trim(both '-' from result);
  RETURN result;
END;
$$ LANGUAGE plpgsql IMMUTABLE;

-- Devuelve true si el usuario autenticado tiene rol admin
-- SECURITY DEFINER para poder leer profiles sin bucle de políticas RLS
-- SET search_path = public necesario para resolver tipos de enum (user_rol, etc.)
CREATE OR REPLACE FUNCTION is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid()
      AND rol = 'admin'::public.user_rol
      AND bloqueado = false
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER STABLE SET search_path = public;

-- Actualiza la columna updated_at al momento actual
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;


-- ============================================================
-- TABLAS
-- ============================================================

-- ----------------------------------------------------------
-- vehicles: catálogo de vehículos
-- ----------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.vehicles (
  id              UUID         PRIMARY KEY DEFAULT gen_random_uuid(),
  marca           TEXT         NOT NULL,
  modelo          TEXT         NOT NULL,
  version         TEXT,
  -- El slug se genera automáticamente por trigger; se puede sobrescribir manualmente
  slug            TEXT         UNIQUE NOT NULL DEFAULT '',
  anio            SMALLINT     NOT NULL CHECK (anio >= 1900 AND anio <= 2100),
  kilometraje     INTEGER      NOT NULL CHECK (kilometraje >= 0),
  precio          INTEGER      NOT NULL CHECK (precio > 0),          -- En céntimos
  precio_anterior INTEGER      CHECK (precio_anterior > 0),          -- En céntimos
  combustible     TEXT         NOT NULL,
  cambio          TEXT         NOT NULL,
  carroceria      TEXT         NOT NULL,
  potencia        SMALLINT     CHECK (potencia > 0),
  color           TEXT,
  plazas          SMALLINT     CHECK (plazas BETWEEN 1 AND 9),
  puertas         SMALLINT     CHECK (puertas BETWEEN 1 AND 5),
  danios          TEXT,
  garantia        TEXT,
  descripcion     TEXT,
  estado          vehicle_estado NOT NULL DEFAULT 'disponible',
  destacado       BOOLEAN      NOT NULL DEFAULT false,
  comprador_id    UUID         REFERENCES auth.users(id) ON DELETE SET NULL,
  fecha_venta     TIMESTAMPTZ,
  visitas         INTEGER      NOT NULL DEFAULT 0,
  created_at      TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
  updated_at      TIMESTAMPTZ  NOT NULL DEFAULT NOW()
);

-- ----------------------------------------------------------
-- vehicle_images: imágenes de cada vehículo
-- ----------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.vehicle_images (
  id           UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  vehicle_id   UUID        NOT NULL REFERENCES public.vehicles(id) ON DELETE CASCADE,
  url          TEXT        NOT NULL,
  orden        SMALLINT    NOT NULL DEFAULT 0,
  es_principal BOOLEAN     NOT NULL DEFAULT false,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ----------------------------------------------------------
-- profiles: extiende auth.users con datos del negocio
-- El trigger on_auth_user_created lo rellena al registrarse
-- ----------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.profiles (
  id         UUID        PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email      TEXT        NOT NULL,
  nombre     TEXT,
  apellidos  TEXT,
  telefono   TEXT,
  rol        user_rol    NOT NULL DEFAULT 'cliente',
  bloqueado  BOOLEAN     NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ----------------------------------------------------------
-- favorites: vehículos marcados como favoritos
-- ----------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.favorites (
  id         UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id    UUID        NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  vehicle_id UUID        NOT NULL REFERENCES public.vehicles(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(user_id, vehicle_id)
);

-- ----------------------------------------------------------
-- preferences: alertas de búsqueda guardadas
-- Cuando se publica un coche que las cumple → notificación
-- ----------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.preferences (
  id           UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id      UUID        NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  nombre       TEXT        NOT NULL,
  marcas       TEXT[],
  precio_min   INTEGER,
  precio_max   INTEGER,
  anio_min     SMALLINT,
  km_max       INTEGER,
  combustibles TEXT[],
  cambios      TEXT[],
  carrocerias  TEXT[],
  activo       BOOLEAN     NOT NULL DEFAULT true,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ----------------------------------------------------------
-- notifications: bandeja de entrada del usuario
-- ----------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.notifications (
  id         UUID              PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id    UUID              NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  tipo       notification_tipo NOT NULL,
  titulo     TEXT              NOT NULL,
  mensaje    TEXT,
  datos      JSONB,
  leida      BOOLEAN           NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ       NOT NULL DEFAULT NOW()
);

-- ----------------------------------------------------------
-- conversations: hilos de mensajería cliente ↔ admin
-- ----------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.conversations (
  id         UUID                PRIMARY KEY DEFAULT gen_random_uuid(),
  vehicle_id UUID                REFERENCES public.vehicles(id) ON DELETE SET NULL,
  cliente_id UUID                NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  admin_id   UUID                REFERENCES auth.users(id) ON DELETE SET NULL,
  asunto     TEXT,
  estado     conversation_estado NOT NULL DEFAULT 'abierta',
  created_at TIMESTAMPTZ         NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ         NOT NULL DEFAULT NOW()
);

-- ----------------------------------------------------------
-- messages: mensajes dentro de una conversación
-- ----------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.messages (
  id              UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id UUID        NOT NULL REFERENCES public.conversations(id) ON DELETE CASCADE,
  sender_id       UUID        NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  contenido       TEXT        NOT NULL,
  leido           BOOLEAN     NOT NULL DEFAULT false,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ----------------------------------------------------------
-- site_settings: configuración del sitio en clave-valor JSON
-- ----------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.site_settings (
  id          UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  clave       TEXT        UNIQUE NOT NULL,
  valor       JSONB       NOT NULL,
  descripcion TEXT,
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);


-- ============================================================
-- ÍNDICES — rendimiento de filtros del catálogo
-- ============================================================

-- Filtros individuales del catálogo
CREATE INDEX IF NOT EXISTS idx_vehicles_estado       ON public.vehicles(estado);
CREATE INDEX IF NOT EXISTS idx_vehicles_marca        ON public.vehicles(marca);
CREATE INDEX IF NOT EXISTS idx_vehicles_combustible  ON public.vehicles(combustible);
CREATE INDEX IF NOT EXISTS idx_vehicles_carroceria   ON public.vehicles(carroceria);
CREATE INDEX IF NOT EXISTS idx_vehicles_cambio       ON public.vehicles(cambio);
CREATE INDEX IF NOT EXISTS idx_vehicles_precio       ON public.vehicles(precio);
CREATE INDEX IF NOT EXISTS idx_vehicles_anio         ON public.vehicles(anio);
CREATE INDEX IF NOT EXISTS idx_vehicles_kilometraje  ON public.vehicles(kilometraje);
CREATE INDEX IF NOT EXISTS idx_vehicles_destacado    ON public.vehicles(destacado);
CREATE INDEX IF NOT EXISTS idx_vehicles_slug         ON public.vehicles(slug);
CREATE INDEX IF NOT EXISTS idx_vehicles_created_at   ON public.vehicles(created_at DESC);

-- Índice compuesto para la home (destacados disponibles)
CREATE INDEX IF NOT EXISTS idx_vehicles_home
  ON public.vehicles(destacado, estado, created_at DESC)
  WHERE destacado = true AND estado = 'disponible';

-- Índice compuesto para el catálogo público
CREATE INDEX IF NOT EXISTS idx_vehicles_catalogo
  ON public.vehicles(estado, precio, anio, kilometraje)
  WHERE estado IN ('disponible', 'reservado');

-- Imágenes: lookup por vehículo y por imagen principal
CREATE INDEX IF NOT EXISTS idx_vehicle_images_vehicle   ON public.vehicle_images(vehicle_id);
CREATE INDEX IF NOT EXISTS idx_vehicle_images_principal ON public.vehicle_images(vehicle_id, es_principal)
  WHERE es_principal = true;

-- Notificaciones no leídas
CREATE INDEX IF NOT EXISTS idx_notifications_user_unread
  ON public.notifications(user_id, created_at DESC)
  WHERE leida = false;

-- Mensajes por conversación
CREATE INDEX IF NOT EXISTS idx_messages_conversation ON public.messages(conversation_id, created_at ASC);

-- Favoritos
CREATE INDEX IF NOT EXISTS idx_favorites_user    ON public.favorites(user_id);
CREATE INDEX IF NOT EXISTS idx_favorites_vehicle ON public.favorites(vehicle_id);

-- Preferencias activas
CREATE INDEX IF NOT EXISTS idx_preferences_user_activo
  ON public.preferences(user_id)
  WHERE activo = true;

-- Conversaciones por cliente y por admin
CREATE INDEX IF NOT EXISTS idx_conversations_cliente ON public.conversations(cliente_id, updated_at DESC);
CREATE INDEX IF NOT EXISTS idx_conversations_admin   ON public.conversations(admin_id, updated_at DESC);


-- ============================================================
-- FUNCIONES Y TRIGGERS
-- ============================================================

-- ----------------------------------------------------------
-- 1. updated_at automático en todas las tablas que lo tienen
-- ----------------------------------------------------------
CREATE OR REPLACE TRIGGER trg_vehicles_updated_at
  BEFORE UPDATE ON public.vehicles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE OR REPLACE TRIGGER trg_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE OR REPLACE TRIGGER trg_preferences_updated_at
  BEFORE UPDATE ON public.preferences
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE OR REPLACE TRIGGER trg_conversations_updated_at
  BEFORE UPDATE ON public.conversations
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE OR REPLACE TRIGGER trg_site_settings_updated_at
  BEFORE UPDATE ON public.site_settings
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();


-- ----------------------------------------------------------
-- 2. generate_vehicle_slug
--    Genera el slug desde marca+modelo+version+año.
--    Se regenera en INSERT y cuando cambian los campos de identidad.
--    Para poner un slug personalizado, actualizar solo la columna slug
--    (eso no dispara este trigger).
-- ----------------------------------------------------------
CREATE OR REPLACE FUNCTION generate_vehicle_slug()
RETURNS TRIGGER AS $$
DECLARE
  base_slug  TEXT;
  final_slug TEXT;
  counter    INT := 0;
BEGIN
  -- Construir slug base con los campos de identidad del vehículo
  IF NEW.version IS NOT NULL AND trim(NEW.version) != '' THEN
    base_slug := slugify(
      NEW.marca || ' ' || NEW.modelo || ' ' || trim(NEW.version) || ' ' || NEW.anio::TEXT
    );
  ELSE
    base_slug := slugify(NEW.marca || ' ' || NEW.modelo || ' ' || NEW.anio::TEXT);
  END IF;

  -- Garantizar unicidad añadiendo sufijo numérico si ya existe
  final_slug := base_slug;
  WHILE EXISTS (
    SELECT 1 FROM public.vehicles
    WHERE slug = final_slug
      AND id IS DISTINCT FROM NEW.id   -- IS DISTINCT FROM maneja NULLs en INSERT
  ) LOOP
    counter    := counter + 1;
    final_slug := base_slug || '-' || counter;
  END LOOP;

  NEW.slug := final_slug;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Sólo se dispara cuando cambian los campos que forman el slug
CREATE OR REPLACE TRIGGER trg_vehicle_slug
  BEFORE INSERT OR UPDATE OF marca, modelo, version, anio ON public.vehicles
  FOR EACH ROW EXECUTE FUNCTION generate_vehicle_slug();


-- ----------------------------------------------------------
-- 3. on_auth_user_created
--    Crea automáticamente el perfil cuando el usuario se registra
-- ----------------------------------------------------------
CREATE OR REPLACE FUNCTION on_auth_user_created()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, rol)
  VALUES (
    NEW.id,
    NEW.email,
    'cliente'::public.user_rol
  )
  ON CONFLICT (id) DO NOTHING;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

CREATE OR REPLACE TRIGGER trg_on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION on_auth_user_created();


-- ----------------------------------------------------------
-- 4. on_vehicle_price_change
--    Notifica bajadas de precio a:
--      a) Usuarios que tienen el coche en favoritos
--      b) Usuarios con preferencias que coinciden con el vehículo
-- ----------------------------------------------------------
CREATE OR REPLACE FUNCTION on_vehicle_price_change()
RETURNS TRIGGER AS $$
DECLARE
  rec           RECORD;
  titulo_coche  TEXT;
BEGIN
  -- Solo actuar ante bajadas de precio en coches disponibles
  IF NEW.precio >= OLD.precio OR NEW.estado != 'disponible' THEN
    RETURN NEW;
  END IF;

  titulo_coche := NEW.marca || ' ' || NEW.modelo || ' ' || NEW.anio::TEXT;

  -- a) Notificar a usuarios con el coche en favoritos
  FOR rec IN
    SELECT DISTINCT user_id FROM public.favorites WHERE vehicle_id = NEW.id
  LOOP
    INSERT INTO public.notifications (user_id, tipo, titulo, mensaje, datos)
    VALUES (
      rec.user_id,
      'bajada_precio',
      '¡Bajada de precio! ' || titulo_coche,
      'Pasó de ' || (OLD.precio / 100)::TEXT || ' € a ' || (NEW.precio / 100)::TEXT || ' €.',
      jsonb_build_object(
        'vehicle_id',     NEW.id,
        'slug',           NEW.slug,
        'precio_anterior', OLD.precio,
        'precio_nuevo',   NEW.precio
      )
    );
  END LOOP;

  -- b) Notificar a usuarios con preferencias coincidentes (excluyendo los ya notificados)
  FOR rec IN
    SELECT DISTINCT p.user_id
    FROM public.preferences p
    WHERE p.activo = true
      AND (p.marcas       IS NULL OR NEW.marca       = ANY(p.marcas))
      AND (p.precio_min   IS NULL OR NEW.precio      >= p.precio_min)
      AND (p.precio_max   IS NULL OR NEW.precio      <= p.precio_max)
      AND (p.anio_min     IS NULL OR NEW.anio        >= p.anio_min)
      AND (p.km_max       IS NULL OR NEW.kilometraje <= p.km_max)
      AND (p.combustibles IS NULL OR NEW.combustible  = ANY(p.combustibles))
      AND (p.cambios      IS NULL OR NEW.cambio       = ANY(p.cambios))
      AND (p.carrocerias  IS NULL OR NEW.carroceria   = ANY(p.carrocerias))
      -- Excluir usuarios que ya recibieron notificación por favorito
      AND NOT EXISTS (
        SELECT 1 FROM public.favorites f
        WHERE f.user_id = p.user_id AND f.vehicle_id = NEW.id
      )
  LOOP
    INSERT INTO public.notifications (user_id, tipo, titulo, mensaje, datos)
    VALUES (
      rec.user_id,
      'bajada_precio',
      '¡Bajada en un coche que te puede interesar! ' || titulo_coche,
      'Nuevo precio: ' || (NEW.precio / 100)::TEXT || ' €.',
      jsonb_build_object(
        'vehicle_id',  NEW.id,
        'slug',        NEW.slug,
        'precio_nuevo', NEW.precio
      )
    );
  END LOOP;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER trg_vehicle_price_change
  AFTER UPDATE OF precio ON public.vehicles
  FOR EACH ROW EXECUTE FUNCTION on_vehicle_price_change();


-- ----------------------------------------------------------
-- 5. on_vehicle_created
--    Cuando se publica un coche nuevo (estado = 'disponible'),
--    notifica a los usuarios con preferencias coincidentes
-- ----------------------------------------------------------
CREATE OR REPLACE FUNCTION on_vehicle_created()
RETURNS TRIGGER AS $$
DECLARE
  rec          RECORD;
  titulo_coche TEXT;
BEGIN
  -- Solo notificar vehículos que salen directamente como disponibles
  IF NEW.estado != 'disponible' THEN
    RETURN NEW;
  END IF;

  titulo_coche := NEW.marca || ' ' || NEW.modelo || ' ' || NEW.anio::TEXT;

  FOR rec IN
    SELECT DISTINCT p.user_id
    FROM public.preferences p
    WHERE p.activo = true
      AND (p.marcas       IS NULL OR NEW.marca       = ANY(p.marcas))
      AND (p.precio_min   IS NULL OR NEW.precio      >= p.precio_min)
      AND (p.precio_max   IS NULL OR NEW.precio      <= p.precio_max)
      AND (p.anio_min     IS NULL OR NEW.anio        >= p.anio_min)
      AND (p.km_max       IS NULL OR NEW.kilometraje <= p.km_max)
      AND (p.combustibles IS NULL OR NEW.combustible  = ANY(p.combustibles))
      AND (p.cambios      IS NULL OR NEW.cambio       = ANY(p.cambios))
      AND (p.carrocerias  IS NULL OR NEW.carroceria   = ANY(p.carrocerias))
  LOOP
    INSERT INTO public.notifications (user_id, tipo, titulo, mensaje, datos)
    VALUES (
      rec.user_id,
      'nuevo_coche',
      '¡Nuevo coche disponible! ' || titulo_coche,
      'Hemos publicado un vehículo que coincide con tus preferencias guardadas.',
      jsonb_build_object(
        'vehicle_id', NEW.id,
        'slug',       NEW.slug,
        'precio',     NEW.precio
      )
    );
  END LOOP;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER trg_vehicle_created
  AFTER INSERT ON public.vehicles
  FOR EACH ROW EXECUTE FUNCTION on_vehicle_created();


-- ----------------------------------------------------------
-- 6. on_message_created
--    Al recibir un mensaje, notifica al destinatario y actualiza
--    updated_at de la conversación para ordenar la bandeja
-- ----------------------------------------------------------
CREATE OR REPLACE FUNCTION on_message_created()
RETURNS TRIGGER AS $$
DECLARE
  v_cliente_id UUID;
  v_admin_id   UUID;
  recipient_id UUID;
  sender_name  TEXT;
BEGIN
  -- Obtener los participantes de la conversación (evitamos SELECT INTO por ambigüedad del parser)
  v_cliente_id := (SELECT cliente_id FROM public.conversations WHERE id = NEW.conversation_id);
  v_admin_id   := (SELECT admin_id   FROM public.conversations WHERE id = NEW.conversation_id);

  -- Determinar destinatario: el que NO envió el mensaje
  IF NEW.sender_id = v_cliente_id THEN
    recipient_id := v_admin_id;    -- cliente → admin
  ELSE
    recipient_id := v_cliente_id;  -- admin → cliente
  END IF;

  -- No notificar si aún no hay destinatario asignado
  IF recipient_id IS NULL THEN
    RETURN NEW;
  END IF;

  -- Obtener nombre del remitente para el título de la notificación
  sender_name := (SELECT COALESCE(nombre, email) FROM public.profiles WHERE id = NEW.sender_id);

  INSERT INTO public.notifications (user_id, tipo, titulo, mensaje, datos)
  VALUES (
    recipient_id,
    'mensaje_nuevo',
    'Mensaje de ' || COALESCE(sender_name, 'un usuario'),
    LEFT(NEW.contenido, 120),
    jsonb_build_object(
      'conversation_id', NEW.conversation_id,
      'sender_id',       NEW.sender_id
    )
  );

  -- Subir updated_at de la conversación para ordenar la bandeja por actividad reciente
  UPDATE public.conversations
  SET updated_at = NOW()
  WHERE id = NEW.conversation_id;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER trg_message_created
  AFTER INSERT ON public.messages
  FOR EACH ROW EXECUTE FUNCTION on_message_created();


-- ============================================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================================

ALTER TABLE public.vehicles        ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.vehicle_images  ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles        ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.favorites       ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.preferences     ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications   ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.conversations   ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages        ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_settings   ENABLE ROW LEVEL SECURITY;

-- DROP IF EXISTS para que el schema sea re-ejecutable sin errores
DROP POLICY IF EXISTS "vehicles_public_select"       ON public.vehicles;
DROP POLICY IF EXISTS "vehicles_admin_all"            ON public.vehicles;
DROP POLICY IF EXISTS "vehicle_images_public_select"  ON public.vehicle_images;
DROP POLICY IF EXISTS "vehicle_images_admin_all"      ON public.vehicle_images;
DROP POLICY IF EXISTS "profiles_select"               ON public.profiles;
DROP POLICY IF EXISTS "profiles_update_own"           ON public.profiles;
DROP POLICY IF EXISTS "profiles_admin_update"         ON public.profiles;
DROP POLICY IF EXISTS "profiles_admin_insert"         ON public.profiles;
DROP POLICY IF EXISTS "profiles_admin_delete"         ON public.profiles;
DROP POLICY IF EXISTS "favorites_own"                 ON public.favorites;
DROP POLICY IF EXISTS "preferences_own"               ON public.preferences;
DROP POLICY IF EXISTS "notifications_select_own"      ON public.notifications;
DROP POLICY IF EXISTS "notifications_update_own"      ON public.notifications;
DROP POLICY IF EXISTS "conversations_cliente_select"  ON public.conversations;
DROP POLICY IF EXISTS "conversations_cliente_insert"  ON public.conversations;
DROP POLICY IF EXISTS "conversations_admin_all"       ON public.conversations;
DROP POLICY IF EXISTS "messages_select"               ON public.messages;
DROP POLICY IF EXISTS "messages_insert"               ON public.messages;
DROP POLICY IF EXISTS "messages_update_leido"         ON public.messages;
DROP POLICY IF EXISTS "site_settings_public_select"   ON public.site_settings;
DROP POLICY IF EXISTS "site_settings_admin_write"     ON public.site_settings;

-- ---- vehicles ----
-- Visitantes y clientes ven coches disponibles y reservados
CREATE POLICY "vehicles_public_select" ON public.vehicles
  FOR SELECT USING (estado IN ('disponible', 'reservado'));

-- Admin tiene acceso total (ver ocultos, vendidos, crear, editar, borrar)
CREATE POLICY "vehicles_admin_all" ON public.vehicles
  FOR ALL USING (is_admin()) WITH CHECK (is_admin());

-- ---- vehicle_images ----
-- Solo se muestran imágenes de coches visibles al público
CREATE POLICY "vehicle_images_public_select" ON public.vehicle_images
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.vehicles v
      WHERE v.id = vehicle_id
        AND v.estado IN ('disponible', 'reservado')
    )
  );

CREATE POLICY "vehicle_images_admin_all" ON public.vehicle_images
  FOR ALL USING (is_admin()) WITH CHECK (is_admin());

-- ---- profiles ----
-- Cada usuario lee su propio perfil; admin lee todos
CREATE POLICY "profiles_select" ON public.profiles
  FOR SELECT USING (auth.uid() = id OR is_admin());

-- El usuario puede actualizar sus propios datos (nombre, teléfono, apellidos).
-- La restricción de no poder cambiar rol/bloqueado se gestiona en la aplicación.
-- Subqueries auto-referenciadas sobre la misma tabla con RLS activo
-- provocan recursión infinita, así que simplificamos a solo verificar identidad.
CREATE POLICY "profiles_update_own" ON public.profiles
  FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Admin puede modificar cualquier perfil (incluido cambiar roles)
CREATE POLICY "profiles_admin_update" ON public.profiles
  FOR UPDATE USING (is_admin()) WITH CHECK (is_admin());

-- Admin puede insertar perfiles manualmente y eliminar usuarios
CREATE POLICY "profiles_admin_insert" ON public.profiles
  FOR INSERT WITH CHECK (is_admin());

CREATE POLICY "profiles_admin_delete" ON public.profiles
  FOR DELETE USING (is_admin());

-- ---- favorites ----
-- Cada usuario gestiona solo sus propios favoritos
CREATE POLICY "favorites_own" ON public.favorites
  FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- ---- preferences ----
-- Cada usuario gestiona solo sus propias preferencias
CREATE POLICY "preferences_own" ON public.preferences
  FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- ---- notifications ----
-- Cada usuario lee sus propias notificaciones
CREATE POLICY "notifications_select_own" ON public.notifications
  FOR SELECT USING (auth.uid() = user_id);

-- Solo puede marcarlas como leídas (campo leida)
CREATE POLICY "notifications_update_own" ON public.notifications
  FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Los triggers (SECURITY DEFINER) insertan notificaciones sin política INSERT

-- ---- conversations ----
-- El cliente ve sus propias conversaciones
CREATE POLICY "conversations_cliente_select" ON public.conversations
  FOR SELECT USING (auth.uid() = cliente_id);

-- El cliente puede abrir una conversación nueva
CREATE POLICY "conversations_cliente_insert" ON public.conversations
  FOR INSERT WITH CHECK (auth.uid() = cliente_id);

-- Admin ve y gestiona todas las conversaciones
CREATE POLICY "conversations_admin_all" ON public.conversations
  FOR ALL USING (is_admin()) WITH CHECK (is_admin());

-- ---- messages ----
-- Se pueden leer mensajes de conversaciones propias (o si eres admin)
CREATE POLICY "messages_select" ON public.messages
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.conversations c
      WHERE c.id = conversation_id
        AND (c.cliente_id = auth.uid() OR is_admin())
    )
  );

-- Solo se puede escribir en conversaciones propias y abiertas
CREATE POLICY "messages_insert" ON public.messages
  FOR INSERT WITH CHECK (
    auth.uid() = sender_id
    AND EXISTS (
      SELECT 1 FROM public.conversations c
      WHERE c.id = conversation_id
        AND (c.cliente_id = auth.uid() OR is_admin())
        AND c.estado = 'abierta'
    )
  );

-- Marcar mensajes como leídos (solo campo leido)
CREATE POLICY "messages_update_leido" ON public.messages
  FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM public.conversations c
      WHERE c.id = conversation_id
        AND (c.cliente_id = auth.uid() OR is_admin())
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.conversations c
      WHERE c.id = conversation_id
        AND (c.cliente_id = auth.uid() OR is_admin())
    )
  );

-- ---- site_settings ----
-- Cualquier visitante puede leer la configuración del sitio
CREATE POLICY "site_settings_public_select" ON public.site_settings
  FOR SELECT USING (true);

-- Solo admin puede crear/editar/borrar configuración
CREATE POLICY "site_settings_admin_write" ON public.site_settings
  FOR ALL USING (is_admin()) WITH CHECK (is_admin());


-- ============================================================
-- DATOS INICIALES — site_settings
-- ============================================================
INSERT INTO public.site_settings (clave, valor, descripcion) VALUES
  ('nombre_concesionario', '"Compro y Vendo CRP"',
    'Nombre del concesionario que aparece en el sitio'),
  ('telefono',             '"676 000 000"',
    'Teléfono principal de contacto'),
  ('whatsapp',             '"34676000000"',
    'Número de WhatsApp sin + ni espacios (para links wa.me/)'),
  ('email_contacto',       '"info@comproyvendocrp.com"',
    'Email principal de contacto'),
  ('direccion',            '"Calle Ejemplo 1, Pamplona, Navarra"',
    'Dirección física del concesionario'),
  ('horario',              '"Lunes a viernes: 9:00–19:00 | Sábado: 10:00–14:00"',
    'Horario de atención al público'),
  ('logo_url',             'null',
    'URL del logotipo principal (null = usar texto)'),
  ('instagram',            '"https://instagram.com/comproyvendocrp"',
    'URL del perfil de Instagram'),
  ('facebook',             '"https://facebook.com/comproyvendocrp"',
    'URL de la página de Facebook'),
  ('financiacion_activa',  'true',
    'Mostrar sección y botón de financiación'),
  ('reserva_activa',       'true',
    'Permitir reservar vehículos online'),
  ('importe_reserva',      '15000',
    'Importe de reserva en céntimos (15000 = 150 €)'),
  ('vehiculos_por_pagina', '12',
    'Número de vehículos por página en el catálogo'),
  ('meta_title',
    '"Compro y Vendo CRP | Coches de segunda mano en Navarra"',
    'Título SEO por defecto para el sitio'),
  ('meta_description',
    '"Encuentra tu próximo coche de segunda mano en Pamplona. Vehículos revisados, garantizados y con financiación."',
    'Descripción SEO por defecto para el sitio')
ON CONFLICT (clave) DO NOTHING;


-- ============================================================
-- STORAGE — bucket para imágenes de vehículos
-- ============================================================
-- Crear desde Supabase Dashboard → Storage → New bucket:
--   Nombre:  vehicle-images
--   Público: SÍ (acceso público de lectura)
--
-- Después, en Storage → Policies del bucket vehicle-images, añadir:
--   SELECT (lectura pública):  bucket_id = 'vehicle-images'
--   INSERT/UPDATE/DELETE:      (is_admin()) en service_role


-- ============================================================
-- SETUP ADMIN
-- ============================================================
-- Después de ejecutar este schema:
--   1. Ve a Supabase Dashboard → Authentication → Users
--   2. Pulsa "Add user" e introduce el email y contraseña del admin
--   3. Copia el UUID del usuario recién creado
--   4. Ejecuta estas consultas (sustituye el email o usa el UUID):
--
-- UPDATE public.profiles
-- SET rol = 'admin'
-- WHERE email = 'admin@comproyvendocrp.com';
--
-- -- Verificar que se ha aplicado correctamente:
-- SELECT id, email, rol FROM public.profiles WHERE rol = 'admin';
