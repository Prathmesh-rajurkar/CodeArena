import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ["images.pexels.com"],
    // remotePatterns:[new URL("https://images.pexels.com")],
  },
};

export default nextConfig;
