import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  env: {
    NEXT_PUBLIC_API_URL:
      process.env.NEXT_PUBLIC_API_URL || "https://u-bit-backend.vercel.app/api",
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "https://u-bit-backend.vercel.app/api/:path*",
      },
    ];
  },
};

export default nextConfig;
