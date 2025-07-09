import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,

  // Add the redirects configuration here
  async redirects() {
    return [
      {
        source: '/services',      // The old, non-existent path
        destination: '/',         // The new path to redirect to (the homepage)
        permanent: true,          // Use a 301 status for permanent redirect (best for SEO)
      },
      // You can add more redirects here in the future if needed
    ];
  },
};

export default nextConfig;