import { getVehiculosDestacados } from "@/lib/queries/vehiculos";
import HomePageClient from "./HomePageClient";

export const revalidate = 60;

export default async function HomePage() {
  const destacados = await getVehiculosDestacados(6);
  return <HomePageClient destacados={destacados} />;
}
