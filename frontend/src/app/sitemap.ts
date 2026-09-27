import type { MetadataRoute } from "next";

import { roles } from "@/content/careers";
import { audiences, engineering, routes, sectors, services } from "@/content/taxonomy";
import { getCaseStudies, getSiteConfig } from "@/lib/content";

type Entry = MetadataRoute.Sitemap[number];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [site, caseStudies] = await Promise.all([getSiteConfig(), getCaseStudies()]);
  const base = site.url.replace(/\/$/, "");
  const lastModified = new Date();

  const entry = (path: string, priority: number, changeFrequency: Entry["changeFrequency"] = "monthly"): Entry => ({
    url: path === "/" ? base : `${base}${path}`,
    lastModified,
    changeFrequency,
    priority,
  });

  return [
    entry(routes.home, 1, "weekly"),

    // What we do
    entry(routes.agents, 0.9),
    entry(routes.services, 0.9),
    ...services.map((s) => entry(routes.service(s.slug), 0.8)),
    entry(routes.industries, 0.8),
    ...sectors.map((s) => entry(routes.industry(s.slug), 0.7)),
    entry(routes.whoWeServe, 0.8),
    ...audiences.map((a) => entry(routes.audience(a.slug), 0.7)),
    entry(routes.engineering, 0.8),
    ...engineering.map((e) => entry(routes.engineeringPage(e.slug), 0.7)),

    // Work
    entry(routes.caseStudies, 0.8, "weekly"),
    ...caseStudies.map((c) => entry(routes.caseStudy(c.slug), 0.7)),

    // Company
    entry(routes.about, 0.6),
    entry(routes.culture, 0.5),
    entry(routes.team, 0.5),
    entry(routes.careers, 0.6, "weekly"),
    ...roles.map((r) => entry(routes.career(r.slug), 0.5, "weekly")),
    entry(routes.howWeWork, 0.6),
    entry(routes.security, 0.5),
    entry(routes.contact, 0.8),

    // Legal
    entry(routes.privacy, 0.2, "yearly"),
    entry(routes.terms, 0.2, "yearly"),
    entry(routes.cookies, 0.2, "yearly"),
  ];
}
