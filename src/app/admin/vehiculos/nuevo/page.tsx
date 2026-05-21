import VehiculoForm from "./VehiculoForm";

export const metadata = {
  title: "Añadir vehículo — Panel Admin",
};

export default function NuevoVehiculoPage() {
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold font-[family-name:var(--font-heading)]">
          Añadir vehículo
        </h1>
        <p className="text-[var(--color-gris)] text-sm mt-1">
          Rellena los datos del nuevo vehículo para publicarlo en el catálogo
        </p>
      </div>

      <VehiculoForm />
    </div>
  );
}
