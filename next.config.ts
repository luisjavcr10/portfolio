import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    cssChunking: { type: "graph", requestCost: 2000 },
  },
};

export default nextConfig;
