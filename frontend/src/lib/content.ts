import "server-only";

import { caseStudies } from "@/content/caseStudies";
import { home } from "@/content/home";
import { footerColumns, legalLinks, navigation, site } from "@/content/site";
import type { CaseStudyDetail, ClientType, HomePageContent, SectorSlug, ServiceSlug } from "@/content/types";

/**
 * Content repository.
 *
 * Pages read content only through these functions. Today it comes from
 * `src/content/*.ts`; to move it to a CMS or the backend later, change these
 * function bodies — the components stay the same.
 */

export async function getSiteConfig() {
  return site;
}

export async function getNavigation() {
  return navigation;
}

export async function getFooterColumns() {
  return footerColumns;
}

export async function getLegalLinks() {
  return legalLinks;
}

export async function getHomeContent(): Promise<HomePageContent> {
  return home;
}

export async function getCaseStudies(): Promise<CaseStudyDetail[]> {
  return caseStudies;
}

export async function getCaseStudy(slug: string): Promise<CaseStudyDetail | undefined> {
  return caseStudies.find((c) => c.slug === slug);
}

/** Case studies matching every given tag, e.g. `{ service: "fixed-price" }`. */
export async function getCaseStudiesBy(filter: {
  service?: ServiceSlug;
  sector?: SectorSlug;
  clientType?: ClientType;
  exclude?: string;
}): Promise<CaseStudyDetail[]> {
  return caseStudies.filter(
    (c) =>
      (!filter.service || c.service === filter.service) &&
      (!filter.sector || c.sector === filter.sector) &&
      (!filter.clientType || c.clientType === filter.clientType) &&
      c.slug !== filter.exclude,
  );
}
