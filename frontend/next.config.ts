import type { NextConfig } from "next";

// The backend (../backend) runs as a separate service. The browser keeps
// calling /api/* on this origin and Next proxies it there, so no CORS setup
// is needed. Set API_URL in production.
const API_URL = process.env.API_URL ?? "http://localhost:4000";

// `npm run build:static` sets STATIC_EXPORT=1 and emits plain HTML to ./out for
// static hosts (Hostinger public_html). Redirects and the /api proxy need a
// Node server, so they are dropped there; public/.htaccess covers the redirects.
const STATIC_EXPORT = process.env.STATIC_EXPORT === "1";

const nextConfig: NextConfig = STATIC_EXPORT
  ? {
      output: "export",
      trailingSlash: true,
      images: { unoptimized: true },
    }
  : {
      // Services renamed in the 2026 line-up: keep old links and search results working.
      async redirects() {
        return [
          { source: "/services/venture-studio", destination: "/services/build-with-us", permanent: true },
          { source: "/services/fixed-price", destination: "/services/custom-development", permanent: true },
        ];
      },
      async rewrites() {
        return [{ source: "/api/:path*", destination: `${API_URL}/api/:path*` }];
      },
    };

export default nextConfig;
