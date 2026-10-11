import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    cssChunking: "graph",
  },
};

export default nextConfig;
