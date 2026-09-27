import type { NextConfig } from "next";

// The backend (../backend) runs as a separate service. The browser keeps
// calling /api/* on this origin and Next proxies it there, so no CORS setup
// is needed. Set API_URL in production.
const API_URL = process.env.API_URL ?? "http://localhost:4000";

const nextConfig: NextConfig = {
  async rewrites() {
    return [{ source: "/api/:path*", destination: `${API_URL}/api/:path*` }];
  },
};

export default nextConfig;
