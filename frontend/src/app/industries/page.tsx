import type { Metadata } from "next";

import { industriesIndex, sectorPages } from "@/content/industries";
import { audiences, routes, sectors } from "@/content/taxonomy";
import type { CaseStudyDetail } from "@/content/types";
import { IndustryOrbit, SectorTiles, Split } from "@/components/industries/IndustryBlocks";
import { ContactSection, FaqSection, PageCta } from "@/components/page/Blocks";
import { CaseStudyGrid } from "@/components/page/CaseStudyCards";
import { FeatureGrid, LinkTiles, Steps } from "@/components/page/FeatureGrid";
import { PageHero } from "@/components/page/PageHero";
import { Section } from "@/components/page/Section";
import { TickerBand } from "@/components/sections/TickerBand";
import { ArrowLink } from "@/components/ui/Button";
import { getCaseStudies } from "@/lib/content";

export const metadata: Metadata = {
  title: "Industries",
  description:
    "AI agents and software for fintech and insurance, healthcare, real estate, e-commerce, logistics and hospitality across the UK, Europe and the UAE.",
};

/** The first case study in each sector, in sector order. */
function featuredPerSector(studies: CaseStudyDetail[]) {
  return sectors.map((s) => studies.find((c) => c.sector === s.slug)).filter((c): c is CaseStudyDetail => Boolean(c));
}

export default async function IndustriesPage() {
  const c = industriesIndex;
  const featured = featuredPerSector(await getCaseStudies());

  return (
    <>
      <PageHero
        breadcrumbs={[
          { label: "Home", href: routes.home },
          { label: "Industries", href: routes.industries },
        ]}
        eyebrow={c.hero.eyebrow}
        title={c.hero.title}
        subtitle={c.hero.subtitle}
        tags={c.hero.tags}
        primary={{ label: "Book a call", href: "#contact" }}
        secondary={{ label: "Explore sectors", href: "#sectors" }}
        aside={<IndustryOrbit />}
      />

      <TickerBand items={c.ticker} />

      <Section
        tone="light"
        id="sectors"
        eyebrow="Six sectors"
        title={<Split title={c.sectorsTitle} />}
        subtitle={c.sectorsSubtitle}
        flush
      >
        <SectorTiles items={sectorPages.map((p) => ({ slug: p.slug, highlights: p.highlights }))} />
      </Section>

      <Section tone="dark" id="capabilities" eyebrow="Across every sector" title={c.capabilitiesTitle} subtitle={c.capabilitiesSubtitle} flush>
        <FeatureGrid items={c.capabilities} columns={3} />
      </Section>

      <Section tone="light" id="approach" eyebrow="Getting up to speed" title={c.approachTitle} flush>
        <Steps steps={c.approach} />
      </Section>

      {featured.length > 0 && (
        <Section tone="dark" id="work" eyebrow="Case studies" title={c.workTitle}>
          <CaseStudyGrid studies={featured.slice(0, 6)} />
          <div className="frame-pad flex justify-center pt-12">
            <ArrowLink href={routes.caseStudies} variant="outline">
              All case studies
            </ArrowLink>
          </div>
        </Section>
      )}

      <Section tone="light" id="audiences" eyebrow="Who we serve" title={c.audiencesTitle} flush>
        <LinkTiles columns={4} items={audiences.map((a) => ({ label: a.label, short: a.short, href: routes.audience(a.slug), icon: a.icon }))} />
      </Section>

      <FaqSection faqs={c.faqs} tone="dark" />
      <ContactSection title={c.contact.title} subtitle={c.contact.subtitle} tone="light" />
      <PageCta content={c.cta} />
    </>
  );
}
