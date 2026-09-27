import type { Metadata } from "next";
import { notFound } from "next/navigation";

import type { CaseStudyDetail } from "@/content/types";
import { disciplineBySlug, disciplines, engineeringEngagements, engineeringLabels as L } from "@/content/engineering";
import { engagementOption, engineering, routes, sectors } from "@/content/taxonomy";
import { ApproachList, DisciplineTiles, EngagementCards, QualityTargets } from "@/components/engineering/Blocks";
import { DisciplineVisual } from "@/components/engineering/Visuals";
import { ContactSection, FaqSection, PageCta } from "@/components/page/Blocks";
import { CaseStudyGrid } from "@/components/page/CaseStudyCards";
import { FeatureGrid, LinkTiles, TechGroups } from "@/components/page/FeatureGrid";
import { PageHero } from "@/components/page/PageHero";
import { Section } from "@/components/page/Section";
import { TickerBand } from "@/components/sections/TickerBand";
import { Band } from "@/components/ui/Band";
import { ArrowLink } from "@/components/ui/Button";
import { getCaseStudies } from "@/lib/content";

export const dynamicParams = false;

export async function generateStaticParams() {
  return disciplines.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata(props: PageProps<"/engineering/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const d = disciplineBySlug(slug);
  if (!d) return {};
  return { title: d.metaTitle, description: d.metaDescription };
}

const escape = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

/** Case studies ranked by how many of the discipline's technologies they use; padded to three. */
function relatedWork(studies: CaseStudyDetail[], keywords: string[], count = 3) {
  const patterns = keywords.map((k) => new RegExp(`(^|[^a-z0-9])${escape(k.toLowerCase())}([^a-z0-9]|$)`));
  const scored = studies
    .map((s, i) => ({ s, i, score: s.techStack.filter((t) => patterns.some((p) => p.test(t.toLowerCase()))).length }))
    .sort((a, b) => b.score - a.score || a.i - b.i);
  return scored.slice(0, count).map((x) => x.s);
}

export default async function EngineeringDisciplinePage(props: PageProps<"/engineering/[slug]">) {
  const { slug } = await props.params;
  const d = disciplineBySlug(slug);
  if (!d) notFound();

  const meta = engineering.find((e) => e.slug === d.slug)!;
  const studies = relatedWork(await getCaseStudies(), d.caseTech);
  const others = engineering.filter((e) => e.slug !== d.slug);

  return (
    <>
      <PageHero
        breadcrumbs={[
          { label: "Home", href: routes.home },
          { label: "Engineering", href: routes.engineering },
          { label: meta.label, href: routes.engineeringPage(d.slug) },
        ]}
        eyebrow={meta.label}
        title={d.hero.title}
        subtitle={d.hero.subtitle}
        tags={d.hero.tags}
        primary={{ label: "Book a call", href: "#contact" }}
        secondary={{ label: "See our work", href: routes.caseStudies }}
        aside={<DisciplineVisual slug={d.slug} label={d.hero.visualLabel} title={`${meta.label}: animated illustration`} />}
      />

      <TickerBand items={d.hero.tags} />

      <Section tone="light" id="services" eyebrow={L.services} title={d.servicesTitle} subtitle={d.servicesSubtitle}>
        <FeatureGrid items={d.services} columns={3} />
      </Section>

      <Band tone="dark" id="approach" label={d.approachTitle}>
        <ApproachList title={d.approachTitle} intro={d.approachIntro} steps={d.approach} />
      </Band>

      <Section tone="light" id="quality" eyebrow={L.targets} title={d.targetsTitle} subtitle={d.targetsSubtitle}>
        <QualityTargets targets={d.targets} note={L.targetsNote} />
      </Section>

      <Section tone="dark" id="tech" eyebrow={L.tech} title={L.techTitle} subtitle={L.techSubtitle}>
        <TechGroups groups={d.tech} />
      </Section>

      {studies.length > 0 && (
        <Section tone="light" id="work" eyebrow={L.work} title={L.workTitle} subtitle={L.workSubtitle}>
          <CaseStudyGrid studies={studies} />
          <div className="frame-pad mt-10 flex justify-end">
            <ArrowLink href={routes.caseStudies} variant="outline">
              All case studies
            </ArrowLink>
          </div>
        </Section>
      )}

      <Section tone="dark" id="industries" eyebrow={L.industries} title={L.industriesTitle} subtitle={L.industriesSubtitle}>
        <LinkTiles items={sectors.map((s) => ({ label: s.label, short: s.short, href: routes.industry(s.slug), icon: s.icon }))} />
      </Section>

      <Section tone="light" id="engage" eyebrow={L.engagement} title={L.engagementTitle} subtitle={L.engagementSubtitle}>
        <EngagementCards
          items={engineeringEngagements.map((e) => ({
            title: e.title,
            description: e.description,
            bestFor: e.bestFor,
            icon: e.icon,
            href: routes.service(e.service),
            label: engagementOption(e.service),
          }))}
        />
      </Section>

      <FaqSection faqs={d.faqs} />

      <ContactSection title={`Talk to our ${meta.label} team.`} defaultEngagement={d.defaultEngagement} />

      <Section tone="light" id="other-disciplines" eyebrow={L.others} title={L.othersTitle}>
        <DisciplineTiles
          items={others.map((o) => ({ label: o.label, short: o.short, href: routes.engineeringPage(o.slug), icon: o.icon }))}
          all={{ label: "All engineering", href: routes.engineering }}
        />
      </Section>

      <PageCta content={d.cta} />
    </>
  );
}
