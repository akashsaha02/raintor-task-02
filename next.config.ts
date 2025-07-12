import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      // Allow images from dummyjson.com domain
      "dummyjson.com",
      // Allow images from unpkg.com for leaflet markers
      "unpkg.com",
    ],
    // You can also specify a more restrictive remotePatterns if needed
    remotePatterns: [
      {
        protocol: "https",
        hostname: "dummyjson.com",
        pathname: "/icon/**",
      },
    ],
  },
};

export default nextConfig;
