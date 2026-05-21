import { getVehiculos } from "@/lib/queries/vehiculos";
import CatalogoClient from "./CatalogoClient";

export const revalidate = 60;

export default async function CatalogoPage() {
  const vehiculos = await getVehiculos();
  return <CatalogoClient vehiculosIniciales={vehiculos} />;
}
