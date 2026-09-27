import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { sectorPageBySlug, sectorPages } from "@/content/industries";
import { routes, sectorBySlug, serviceBySlug } from "@/content/taxonomy";
import { CaseSpotlight, ComplianceGrid, ProblemCards, SectorTiles, TechLinks, toServiceTabs } from "@/components/industries/IndustryBlocks";
import { SectorVisual } from "@/components/industries/SectorVisual";
import { ServiceTabs } from "@/components/industries/ServiceTabs";
import { ContactSection, FaqSection, PageCta } from "@/components/page/Blocks";
import { CaseStudyGrid } from "@/components/page/CaseStudyCards";
import { FeatureGrid } from "@/components/page/FeatureGrid";
import { PageHero } from "@/components/page/PageHero";
import { Section } from "@/components/page/Section";
import { TickerBand } from "@/components/sections/TickerBand";
import { ArrowLink } from "@/components/ui/Button";
import { getCaseStudiesBy } from "@/lib/content";

export const dynamicParams = false;

export async function generateStaticParams() {
  return sectorPages.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(props: PageProps<"/industries/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const page = sectorPageBySlug(slug);
  if (!page) return {};
  const label = sectorBySlug(page.slug).label;
  return {
    title: `${label} Software & AI Agents`,
    description: `${page.hero.subtitle.split(". ")[0]}. ${label} projects across the UK, Europe and the UAE.`,
  };
}

export default async function IndustryPage(props: PageProps<"/industries/[slug]">) {
  const { slug } = await props.params;
  const page = sectorPageBySlug(slug);
  if (!page) notFound();

  const sector = sectorBySlug(page.slug);
  const studies = await getCaseStudiesBy({ sector: page.slug });
  const [spotlight] = studies;
  const others = sectorPages.filter((p) => p.slug !== page.slug);

  return (
    <>
      <PageHero
        breadcrumbs={[
          { label: "Home", href: routes.home },
          { label: "Industries", href: routes.industries },
          { label: sector.label, href: routes.industry(page.slug) },
        ]}
        eyebrow={sector.label}
        title={page.hero.title}
        subtitle={page.hero.subtitle}
        tags={page.hero.tags}
        primary={{ label: "Book a call", href: "#contact" }}
        secondary={{ label: studies.length ? "See our work" : "What we build", href: studies.length ? "#work" : "#solutions" }}
        aside={<SectorVisual sector={page.slug} size="hero" />}
      />

      <TickerBand items={[...page.highlights, ...page.hero.tags]} />

      <Section tone="light" id="problems" eyebrow="The problems" title={page.problemsTitle} subtitle="And how we fix each one." flush>
        <ProblemCards problems={page.problems} />
      </Section>

      {spotlight && (
        <Section tone="dark" id="spotlight" eyebrow={`${sector.label} · case study`} title="Proof, not promises." flush>
          <CaseSpotlight study={spotlight} />
        </Section>
      )}

      <Section tone="light" id="solutions" eyebrow="What we build" title={page.solutionsTitle} flush>
        <FeatureGrid
          columns={3}
          items={page.solutions.map((s) => ({ title: s.title, description: s.description, icon: s.icon, meta: serviceBySlug(s.service).label, href: routes.service(s.service) }))}
        />
      </Section>

      <Section tone="dark" id="how-we-help" eyebrow="How we help" title={`Four ways to work with us in ${sector.label.toLowerCase()}.`} subtitle="Every engagement comes with one accountable lead, weekly demos and a Friday update." flush>
        <ServiceTabs items={toServiceTabs(page.help)} />
      </Section>

      <Section tone="light" id="compliance" eyebrow="Compliance & standards" title="Standards we build to." subtitle={`The rules that shape ${sector.label.toLowerCase()} software in the UK, Europe and the UAE, designed in from the first sprint.`}>
        <ComplianceGrid items={page.compliance} />
      </Section>

      <Section tone="dark" id="work" eyebrow="Case studies" title={`${sector.label} work.`}>
        {studies.length > 0 && <CaseStudyGrid studies={studies} columns={2} />}
        <div className="frame-pad flex flex-wrap justify-center gap-3 pt-12">
          <ArrowLink href={routes.caseStudies} variant="outline">
            All case studies
          </ArrowLink>
        </div>
      </Section>

      <Section tone="light" id="tech" eyebrow="Technology" title="Tech we commonly use here." subtitle="Chosen for the problem, not the trend. Click a group to see how we engineer with it." flush>
        <TechLinks groups={page.tech} />
      </Section>

      <FaqSection faqs={page.faqs} tone="dark" title={`${sector.label}: your questions.`} />

      <Section tone="light" id="other-industries" eyebrow="Other industries" title="Explore other sectors." flush>
        <SectorTiles items={others.map((p) => ({ slug: p.slug }))} />
      </Section>

      <ContactSection title={`Tell us about your ${sector.label.toLowerCase()} project.`} defaultEngagement={page.engagement} />
      <PageCta content={page.cta} />
    </>
  );
}
