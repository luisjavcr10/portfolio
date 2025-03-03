import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  sassOptions: {
    includePaths: [path.join(__dirname, "src/sass")],
  },
  images: {
    domains: ["images.unsplash.com"],
  },
};

export default nextConfig;
