import type { NextConfig } from "next";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:4000";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "res.cloudinary.com" },
    ],
  },
  async rewrites() {
    return [
      // Public read-only endpoints consumed by the frontend
      {
        source: "/api/public/:path*",
        destination: `${BACKEND_URL}/api/public/:path*`,
      },
      // Admin/authenticated CRUD endpoints used by the dashboard
      {
        source: "/api/members/:path*",
        destination: `${BACKEND_URL}/api/members/:path*`,
      },
      {
        source: "/api/events/:path*",
        destination: `${BACKEND_URL}/api/events/:path*`,
      },
      {
        source: "/api/projects/:path*",
        destination: `${BACKEND_URL}/api/projects/:path*`,
      },
      {
        source: "/api/admin/:path*",
        destination: `${BACKEND_URL}/api/admin/:path*`,
      },
    ];
  },
};

export default nextConfig;
