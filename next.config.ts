import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  output: "export",
  basePath: process.env.GITHUB_ACTIONS === "true" ? "/studio-portfolio" : "",
  images: {
    unoptimized: true,
  },
  turbopack: {
    root: path.join(__dirname),
  },
  // Phosphor ships thousands of icon modules behind one barrel export;
  // without this, importing a handful pulls the whole set into the dev graph.
  experimental: {
    optimizePackageImports: ["@phosphor-icons/react"],
  },
};

export default nextConfig;
