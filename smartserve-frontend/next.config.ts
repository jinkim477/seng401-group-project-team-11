import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Image configurations
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "png.pngtree.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "www.theheadshotguy.co.uk",
        pathname: "/**",
      }
    ],
  },
  // TypeScript settings to ignore build errors
  typescript: {
    ignoreBuildErrors: true,
  },
  // Any other Next.js config options you have
};

export default nextConfig;