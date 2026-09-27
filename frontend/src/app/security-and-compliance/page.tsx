import type { Metadata } from "next";

import { security } from "@/content/security";
import { routes, sectors } from "@/content/taxonomy";
import { CaseStudyGrid } from "@/components/page/CaseStudyCards";
import { ContactSection, ExploreCards, FaqSection, PageCta, companyExplore } from "@/components/page/Blocks";
import { FeatureGrid } from "@/components/page/FeatureGrid";
import { PageHero } from "@/components/page/PageHero";
import { Section } from "@/components/page/Section";
import { DecisionPoints, LifecyclePipeline, ResidencyStrip, SectorStandards, ShieldVisual, StandardsGrid } from "@/components/company/security";
import { Band } from "@/components/ui/Band";
import { ArrowLink } from "@/components/ui/Button";
import { getCaseStudies } from "@/lib/content";

export const metadata: Metadata = {
  title: "Security & Compliance",
  description: security.metaDescription,
};

export default async function SecurityPage() {
  const c = security;
  const all = await getCaseStudies();
  const keywords = c.caseStudyKeywords;
  const matching = all.filter((s) => {
    const text = JSON.stringify(s).toLowerCase();
    return keywords.some((k) => text.includes(k));
  });
  const studies = (matching.length > 0 ? matching : all.filter((s) => s.sector === "fintech-insurance" || s.sector === "healthcare")).slice(0, 3);

  return (
    <>
      <PageHero
        breadcrumbs={[
          { label: "Home", href: routes.home },
          { label: "Security & compliance", href: routes.security },
        ]}
        eyebrow={c.hero.eyebrow}
        title={c.hero.title}
        subtitle={c.hero.subtitle}
        tags={c.hero.tags}
        primary={{ label: "Talk to us about security", href: "#contact" }}
        secondary={{ label: "How we work", href: routes.howWeWork }}
        aside={<ShieldVisual chips={c.heroChips} />}
      />

      <Band tone="light" label={c.intro.title}>
        <div className="frame-pad grid gap-12 py-20 lg:grid-cols-2 lg:gap-16 lg:py-28">
          <div data-reveal>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent-text">{c.intro.eyebrow}</p>
            <h2 className="mt-4 text-3xl font-semibold leading-[1.1] text-fg sm:text-4xl lg:text-5xl">{c.intro.title}</h2>
            {c.intro.body.map((p) => (
              <p key={p} className="mt-6 text-lg leading-relaxed text-muted">
                {p}
              </p>
            ))}
          </div>
          <DecisionPoints points={c.intro.points} />
        </div>
      </Band>

      <Section tone="dark" id="standards" eyebrow="Standards" title={c.standardsTitle} subtitle={c.standardsSubtitle} flush>
        <StandardsGrid standards={c.standards} />
      </Section>

      <Section tone="light" id="lifecycle" eyebrow="Secure delivery lifecycle" title={c.lifecycleTitle} subtitle={c.lifecycleSubtitle} flush>
        <LifecyclePipeline stages={c.lifecycle} />
      </Section>

      <Section tone="dark" id="sectors" eyebrow="By sector" title={c.sectorsTitle} subtitle={c.sectorsSubtitle} flush>
        <SectorStandards items={sectors.map((s) => ({ label: s.label, href: routes.industry(s.slug), icon: s.icon, standards: c.sectorStandards[s.slug] }))} />
      </Section>

      <Section tone="light" id="safeguards" eyebrow="Contracts & data" title={c.safeguardsTitle} flush>
        <FeatureGrid columns={3} items={c.safeguards} />
        <ResidencyStrip regions={c.residency} />
      </Section>

      <Section tone="dark" id="procurement" eyebrow="Procurement" title={c.procurementTitle} subtitle={c.procurementSubtitle} flush>
        <FeatureGrid columns={3} numbered items={c.procurement} />
      </Section>

      {studies.length > 0 && (
        <Section tone="light" id="case-studies" eyebrow="Case studies" title={c.caseStudiesTitle} subtitle={c.caseStudiesSubtitle} flush>
          <CaseStudyGrid studies={studies} />
          <div className="frame-pad py-10">
            <ArrowLink href={routes.caseStudies} variant="outline">
              All case studies
            </ArrowLink>
          </div>
        </Section>
      )}

      <FaqSection faqs={c.faqs} />

      <ContactSection title={c.contactTitle} subtitle={c.contactSubtitle} defaultEngagement="Not sure yet" />

      <Section tone="light" label="Explore VAUG" eyebrow="Keep exploring" title="More about VAUG." flush>
        <ExploreCards items={companyExplore} />
      </Section>

      <PageCta content={c.cta} />
    </>
  );
}
