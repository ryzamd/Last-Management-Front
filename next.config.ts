import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://localhost:5030/api/:path*", // Port của .NET Backend
      },
    ];
  },
};

export default nextConfig;