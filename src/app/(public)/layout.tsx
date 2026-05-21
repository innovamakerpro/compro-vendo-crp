import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

// Layout para las páginas públicas: navbar + contenido + footer
export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}
