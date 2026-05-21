import type { Metadata } from "next";
import { Montserrat, Inter } from "next/font/google";
import "./globals.css";

// Tipografía para títulos — elegante y premium
const montserrat = Montserrat({
  variable: "--font-heading",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

// Tipografía para cuerpo — legible y limpia
const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "Compro y Vendo CRP — Coches de Segunda Mano en Navarra",
    template: "%s | Compro y Vendo CRP",
  },
  description:
    "Concesionario de coches de segunda mano en Navarra. Más de 30 vehículos con garantía, financiación disponible y envío nacional. Visítanos en Polígono Morea Sur.",
  keywords: [
    "coches segunda mano",
    "concesionario navarra",
    "compro vendo crp",
    "flavius autos",
    "coches usados pamplona",
    "financiación coche",
  ],
  authors: [{ name: "Compro y Vendo CRP" }],
  openGraph: {
    title: "Compro y Vendo CRP — Coches de Segunda Mano en Navarra",
    description:
      "Más de 30 vehículos con garantía y financiación. Tu próximo coche te espera.",
    type: "website",
    locale: "es_ES",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${montserrat.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
