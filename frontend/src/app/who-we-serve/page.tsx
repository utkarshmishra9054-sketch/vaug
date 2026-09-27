import type { Metadata } from "next";

import { audiencePages, whoWeServeIndex } from "@/content/audiences";
import { sectorPages } from "@/content/industries";
import { audiences, routes } from "@/content/taxonomy";
import type { CaseStudyDetail } from "@/content/types";
import { AudienceCompare, AudienceHeroCards, AudienceTiles } from "@/components/audiences/AudienceBlocks";
import { SectorTiles, Split } from "@/components/industries/IndustryBlocks";
import { ContactSection, FaqSection, PageCta } from "@/components/page/Blocks";
import { CaseStudyGrid } from "@/components/page/CaseStudyCards";
import { FeatureGrid } from "@/components/page/FeatureGrid";
import { PageHero } from "@/components/page/PageHero";
import { Section } from "@/components/page/Section";
import { ArrowLink } from "@/components/ui/Button";
import { getCaseStudies } from "@/lib/content";

export const metadata: Metadata = {
  title: "Who We Serve",
  description:
    "VAUG works with startups and founders, HNIs and family offices, enterprises and agencies. See how we shape each engagement, from MVPs to white-label builds.",
};

/** One case study per audience, in audience order. */
function featuredPerAudience(studies: CaseStudyDetail[]) {
  return audiences.map((a) => studies.find((c) => c.clientType === a.clientType)).filter((c): c is CaseStudyDetail => Boolean(c));
}

export default async function WhoWeServePage() {
  const c = whoWeServeIndex;
  const featured = featuredPerAudience(await getCaseStudies());

  return (
    <>
      <PageHero
        breadcrumbs={[
          { label: "Home", href: routes.home },
          { label: "Who we serve", href: routes.whoWeServe },
        ]}
        eyebrow={c.hero.eyebrow}
        title={c.hero.title}
        subtitle={c.hero.subtitle}
        tags={c.hero.tags}
        primary={{ label: "Book a call", href: "#contact" }}
        secondary={{ label: "Find your page", href: "#audiences" }}
        aside={<AudienceHeroCards pages={audiencePages} />}
      />

      <Section tone="light" id="audiences" eyebrow="Four audiences" title={<Split title={c.audiencesTitle} />} subtitle={c.audiencesSubtitle} flush>
        <AudienceTiles items={audiencePages.map((p) => ({ slug: p.slug, promise: p.promise }))} />
      </Section>

      <Section tone="dark" id="compare" eyebrow="At a glance" title={c.compareTitle} subtitle={c.compareSubtitle} flush>
        <AudienceCompare pages={audiencePages} />
      </Section>

      <Section tone="light" id="promises" eyebrow="Always included" title={c.promisesTitle} flush>
        <FeatureGrid items={c.promises} columns={4} />
      </Section>

      {featured.length > 0 && (
        <Section tone="dark" id="work" eyebrow="Case studies" title={c.workTitle}>
          <CaseStudyGrid studies={featured} columns={featured.length === 3 ? 3 : 2} />
          <div className="frame-pad flex justify-center pt-12">
            <ArrowLink href={routes.caseStudies} variant="outline">
              All case studies
            </ArrowLink>
          </div>
        </Section>
      )}

      <Section tone="light" id="industries" eyebrow="Industries" title={c.industriesTitle} flush>
        <SectorTiles items={sectorPages.map((p) => ({ slug: p.slug, highlights: p.highlights }))} />
      </Section>

      <FaqSection faqs={c.faqs} tone="dark" />
      <ContactSection tone="light" />
      <PageCta content={c.cta} />
    </>
  );
}
