import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async redirects() {
    return [
      {
        source: '/',
        destination: '/pokemon',
        permanent: true, // Use true for a 301 redirect, false for a 302 redirect
      },
    ];
  },
};

export default nextConfig;
