import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      { hostname: "image.mux.com", port: "", protocol: "https" },
      { hostname: "3h2z551zgx.ufs.sh", port: "", protocol: "https" },
    ],
  },
};

export default nextConfig;
