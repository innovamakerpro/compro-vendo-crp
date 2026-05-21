import LoginForm from "./LoginForm";

interface PageProps {
  searchParams: Promise<{ redirect?: string }>;
}

export const metadata = {
  title: "Acceder — Compro y Vendo CRP",
};

export default async function LoginPage({ searchParams }: PageProps) {
  const params = await searchParams;
  // Si viene un redirect explícito lo usamos; si no, dejamos que el server action decida por rol
  const redirectTo = params.redirect || "";

  return <LoginForm redirectTo={redirectTo} />;
}
