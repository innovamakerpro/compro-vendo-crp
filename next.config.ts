import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Vercel serverless functions tienen un límite de 4.5 MB en el body.
  // El default de Next.js es 1 MB, lo cual es insuficiente para subir fotos.
  // @ts-expect-error — serverActions existe en Next.js runtime pero los tipos pueden no exponerlo
  serverActions: {
    bodySizeLimit: "4mb",
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.supabase.co",
      },
    ],
  },
};

export default nextConfig;
