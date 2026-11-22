import type { EngineeringSlug, IconName, SectorSlug, ServiceSlug } from "../types";
import { routes } from "../taxonomy";

/**
 * Capability showcases: interactive demos of what we build, with fictional
 * brands and invented data. No client names or results are claimed. When a
 * real client is named, the matching showcase becomes a case study.
 */
export type Showcase = {
  slug: string;
  title: string;
  summary: string;
  icon: IconName;
  sector?: SectorSlug;
  services: ServiceSlug[];
  engineering: EngineeringSlug[];
};

export const showcases: Showcase[] = [
  {
    slug: "health-centre-website",
    sector: "healthcare",
    title: "A patient-first health-centre website",
    summary: "Try a working demo: a provider finder with 100 providers, clinics and mobile units on a map, search that understands typos and health terms, English and Spanish, built on WordPress.",
    icon: "heart",
    services: ["custom-development", "build-with-us"],
    engineering: ["web-engineering", "full-stack-engineering", "ui-ux-design"],
  },
];

/** Capability pages that are not demos but prove a skill with real work (our own audit). */
const capabilityPages: (Omit<Showcase, "slug"> & { href: string })[] = [
  {
    href: routes.accessibilityAudits,
    title: "Accessibility audits and remediation",
    summary: "WCAG 2.2 AA audits tested by hand and with tools, fixed in code, no overlays. The sample report is our own audit of vaug.in.",
    icon: "shield",
    services: ["custom-development", "launch-and-rescue", "monthly-retainer"],
    engineering: ["web-engineering", "ui-ux-design", "quality-assurance"],
  },
];

export type CapabilityLink = { label: string; short: string; href: string; icon: IconName };

/** Showcases and capability pages to link from a service or engineering page, or all of them (home). */
export function capabilityLinks(filter?: { service?: ServiceSlug; engineering?: EngineeringSlug }): CapabilityLink[] {
  const all = [...showcases.map((s) => ({ ...s, href: routes.showcase(s.slug) })), ...capabilityPages];
  return all
    .filter((c) => !filter || (filter.service ? c.services.includes(filter.service) : true) && (filter.engineering ? c.engineering.includes(filter.engineering) : true))
    .map((c) => ({ label: c.title, short: c.summary, href: c.href, icon: c.icon }));
}
