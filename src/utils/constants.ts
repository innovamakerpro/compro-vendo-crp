// Constantes del proyecto — Compro y Vendo CRP
// Estas constantes se usan en filtros, formularios y toda la aplicación

export const MARCAS = [
  "Audi", "BMW", "Citroën", "Dacia", "Fiat", "Ford", "Honda", "Hyundai",
  "Kia", "Mercedes-Benz", "Nissan", "Opel", "Peugeot", "Renault", "SEAT",
  "Skoda", "Toyota", "Volkswagen", "Volvo",
] as const;

export const COMBUSTIBLES = [
  { value: "gasolina", label: "Gasolina" },
  { value: "diesel", label: "Diésel" },
  { value: "hibrido", label: "Híbrido" },
  { value: "electrico", label: "Eléctrico" },
  { value: "glp", label: "GLP" },
] as const;

export const CAMBIOS = [
  { value: "manual", label: "Manual" },
  { value: "automatico", label: "Automático" },
] as const;

export const CARROCERIAS = [
  { value: "sedan", label: "Sedán" },
  { value: "suv", label: "SUV" },
  { value: "familiar", label: "Familiar" },
  { value: "coupe", label: "Coupé" },
  { value: "cabrio", label: "Cabrio" },
  { value: "monovolumen", label: "Monovolumen" },
  { value: "pickup", label: "Pick-up" },
] as const;

export const ESTADOS_VEHICULO = [
  { value: "disponible", label: "Disponible" },
  { value: "reservado", label: "Reservado" },
  { value: "vendido", label: "Vendido" },
  { value: "oculto", label: "Oculto" },
] as const;

export const ORDEN_OPCIONES = [
  { value: "recientes", label: "Más recientes" },
  { value: "precio-asc", label: "Precio: menor a mayor" },
  { value: "precio-desc", label: "Precio: mayor a menor" },
  { value: "km-asc", label: "Kilómetros: menos a más" },
  { value: "anio-desc", label: "Año: más nuevo primero" },
] as const;

// Datos de contacto del concesionario
export const CONTACTO = {
  nombre: "Compro y Vendo CRP",
  nombreLegal: "Flavius Autos",
  telefono: "633 39 11 02",
  telefonoLink: "tel:+34633391102",
  whatsapp: "633391102",
  whatsappLink: "https://wa.me/34633391102",
  email: "flaviusautos@gmail.com",
  direccion: "Polígono Morea Sur Ampliación, Navarra",
  horario: {
    "Lunes - Sábado": "9:30 – 13:30 / 16:00 – 20:00",
    "Domingo": "Consultar disponibilidad",
  },
  googleMapsUrl: "https://maps.google.com/?q=Polígono+Morea+Sur+Ampliación+Navarra",
} as const;

// Ventajas para la sección "Por qué elegirnos"
export const VENTAJAS = [
  {
    icono: "shield",
    titulo: "Garantía incluida",
    descripcion: "Todos nuestros vehículos cuentan con garantía. Compra con total tranquilidad.",
  },
  {
    icono: "banknotes",
    titulo: "Financiación a medida",
    descripcion: "Te ofrecemos financiación flexible adaptada a tus necesidades. Sin sorpresas.",
  },
  {
    icono: "truck",
    titulo: "Envío nacional",
    descripcion: "Cobertura en toda España. Te llevamos tu coche donde lo necesites.",
  },
  {
    icono: "sparkles",
    titulo: "Revisión de 120 puntos",
    descripcion: "Cada vehículo pasa una inspección exhaustiva antes de ponerse a la venta.",
  },
] as const;
