import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Vercel serverless functions tienen un límite de 4.5 MB en el body.
  experimental: {
    serverActions: {
      bodySizeLimit: "4.5mb",
    },
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
