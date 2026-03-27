import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // allow all https domains
      },
    ],
  },

  // better-auth proxy
  async rewrites() {
    return [
      {
        source: "/api/auth/:path*",
        destination:
          process.env.NEXT_PUBLIC_API_BASE_URL + "/api/auth/:path*",
      },
      {
        source: "/api/v1/:path*",
        destination:
          process.env.NEXT_PUBLIC_API_BASE_URL + "/api/v1/:path*",
      },
    ];
  },
};

export default nextConfig;