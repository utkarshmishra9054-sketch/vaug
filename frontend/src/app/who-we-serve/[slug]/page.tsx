import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { audiencePageBySlug, audiencePages } from "@/content/audiences";
import { audiences, routes, sectors } from "@/content/taxonomy";
import { AudienceTiles, Journey } from "@/components/audiences/AudienceBlocks";
import { AudienceVisual } from "@/components/audiences/AudienceVisual";
import { CaseSpotlight, toServiceTabs } from "@/components/industries/IndustryBlocks";
import { ServiceTabs } from "@/components/industries/ServiceTabs";
import { ContactSection, FaqSection, PageCta } from "@/components/page/Blocks";
import { CaseStudyGrid } from "@/components/page/CaseStudyCards";
import { FeatureGrid, LinkTiles } from "@/components/page/FeatureGrid";
import { PageHero } from "@/components/page/PageHero";
import { Section } from "@/components/page/Section";
import { TickerBand } from "@/components/sections/TickerBand";
import { ArrowLink } from "@/components/ui/Button";
import { getCaseStudiesBy } from "@/lib/content";

export const dynamicParams = false;

export async function generateStaticParams() {
  return audiencePages.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(props: PageProps<"/who-we-serve/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const page = audiencePageBySlug(slug);
  if (!page) return {};
  const a = audiences.find((x) => x.slug === page.slug)!;
  return { title: `For ${a.label}`, description: page.hero.subtitle };
}

export default async function AudiencePage(props: PageProps<"/who-we-serve/[slug]">) {
  const { slug } = await props.params;
  const page = audiencePageBySlug(slug);
  if (!page) notFound();

  const audience = audiences.find((a) => a.slug === page.slug)!;
  const studies = await getCaseStudiesBy({ clientType: audience.clientType });
  const [lead, ...rest] = studies;
  const others = audiencePages.filter((p) => p.slug !== page.slug);

  return (
    <>
      <PageHero
        breadcrumbs={[
          { label: "Home", href: routes.home },
          { label: "Who we serve", href: routes.whoWeServe },
          { label: audience.label, href: routes.audience(page.slug) },
        ]}
        eyebrow={page.hero.eyebrow}
        title={page.hero.title}
        subtitle={page.hero.subtitle}
        tags={page.hero.tags}
        primary={{ label: page.cta.button, href: "#contact" }}
        secondary={{ label: "How it works", href: "#journey" }}
        aside={<AudienceVisual audience={page.slug} size="hero" />}
      />

      <TickerBand items={page.hero.tags} />

      <Section tone="light" id="pains" eyebrow="What you're dealing with" title={page.painsTitle} flush>
        <FeatureGrid items={page.pains} columns={3} />
      </Section>

      <Section tone="dark" id="how-we-work" eyebrow="How we work with you" title={page.servicesTitle} subtitle={page.servicesSubtitle} flush>
        <ServiceTabs items={toServiceTabs(page.services)} />
      </Section>

      <Section tone="light" id="journey" eyebrow="Your journey" title={page.journeyTitle}>
        <Journey stages={page.journey} />
        <div className="frame-pad flex justify-center pt-12">
          <ArrowLink href={routes.howWeWork} variant="outline">
            How we work
          </ArrowLink>
        </div>
      </Section>

      {lead && (
        <Section tone="dark" id="work" eyebrow="Case studies" title={page.workTitle}>
          <CaseSpotlight study={lead} eyebrow="Featured" />
          {rest.length > 0 && (
            <div className="pt-12">
              <CaseStudyGrid studies={rest.slice(0, 3)} columns={rest.length >= 3 ? 3 : 2} />
            </div>
          )}
          <div className="frame-pad flex justify-center pt-12">
            <ArrowLink href={routes.caseStudies} variant="outline">
              All case studies
            </ArrowLink>
          </div>
        </Section>
      )}

      <Section tone="light" id="terms" eyebrow="Engagement terms" title={page.termsTitle} subtitle={page.termsSubtitle} flush>
        <FeatureGrid items={page.terms} columns={3} />
      </Section>

      <Section tone="dark" id="industries" eyebrow="Industries" title="Sectors we know well." flush>
        <LinkTiles columns={3} items={sectors.map((s) => ({ label: s.label, short: s.short, href: routes.industry(s.slug), icon: s.icon }))} />
      </Section>

      <FaqSection faqs={page.faqs} tone="light" />

      <Section tone="dark" id="others" eyebrow="Who else we serve" title="Not quite you?" flush>
        <AudienceTiles items={others.map((p) => ({ slug: p.slug, promise: p.promise }))} />
      </Section>

      <ContactSection tone="light" defaultEngagement={page.engagement} />
      <PageCta content={page.cta} />
    </>
  );
}
