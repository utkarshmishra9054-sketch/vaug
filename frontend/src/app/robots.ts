import type { MetadataRoute } from "next";

import { getSiteConfig } from "@/lib/content";

export const dynamic = "force-static";

export default async function robots(): Promise<MetadataRoute.Robots> {
  const site = await getSiteConfig();
  const base = site.url.replace(/\/$/, "");
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/"],
    },
    sitemap: `${base}/sitemap.xml`,
    host: base,
  };
}
