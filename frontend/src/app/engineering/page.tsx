import type { Metadata } from "next";

import { disciplines, engineeringIndex as c, engineeringLabels } from "@/content/engineering";
import { engineering, routes } from "@/content/taxonomy";
import { EngineeringFlow, EngineeringMetrics } from "@/components/engineering/Blocks";
import { DisciplineExplorer, type ExplorerItem } from "@/components/engineering/DisciplineExplorer";
import { EngineeringOrbit } from "@/components/engineering/Orbit";
import { ContactSection, FaqSection, PageCta } from "@/components/page/Blocks";
import { Compare } from "@/components/page/FeatureGrid";
import { PageHero } from "@/components/page/PageHero";
import { Section } from "@/components/page/Section";
import { TechStack } from "@/components/sections/TechStack";
import { TickerBand } from "@/components/sections/TickerBand";
import { getHomeContent } from "@/lib/content";

export const metadata: Metadata = {
  title: c.metaTitle,
  description: c.metaDescription,
};

export default async function EngineeringPage() {
  const home = await getHomeContent();

  const explorerItems: ExplorerItem[] = engineering.map((e) => {
    const d = disciplines.find((x) => x.slug === e.slug)!;
    return {
      slug: e.slug,
      label: e.label,
      short: e.short,
      icon: e.icon,
      href: routes.engineeringPage(e.slug),
      visualLabel: d.hero.visualLabel,
      title: `${e.label}: animated illustration`,
      highlights: d.services.slice(0, 4).map((s) => s.title),
      tags: d.tech.flatMap((g) => g.items).slice(0, 6),
    };
  });

  return (
    <>
      <PageHero
        breadcrumbs={[
          { label: "Home", href: routes.home },
          { label: "Engineering", href: routes.engineering },
        ]}
        eyebrow={c.hero.eyebrow}
        title={c.hero.title}
        subtitle={c.hero.subtitle}
        tags={c.hero.tags}
        primary={{ label: "Book a call", href: "#contact" }}
        secondary={{ label: "See our work", href: routes.caseStudies }}
        aside={<EngineeringOrbit coreLabel="Automate · Build · Scale" items={engineering.map((e) => ({ label: e.label, href: routes.engineeringPage(e.slug), icon: e.icon }))} />}
      />

      <TickerBand items={c.ticker} />

      <Section tone="light" id="disciplines" eyebrow="Disciplines" title={c.disciplinesTitle} subtitle={c.disciplinesSubtitle} flush>
        <DisciplineExplorer items={explorerItems} />
      </Section>

      <Section tone="dark" id="how-we-engineer" eyebrow="Process" title={c.workflowTitle} subtitle={c.workflowSubtitle}>
        <EngineeringFlow stages={c.workflow} />
        <div className="mt-16">
          <Compare left={c.aiSplit.left} right={c.aiSplit.right} />
        </div>
      </Section>

      <Section tone="light" id="numbers" eyebrow="In numbers" title={c.metricsTitle}>
        <EngineeringMetrics metrics={c.metrics} />
      </Section>

      <Section tone="light" id="tech" eyebrow={engineeringLabels.tech} title={c.techTitle} subtitle={c.techSubtitle}>
        <TechStack categories={[...home.techStack, ...c.extraTech]} />
      </Section>

      <FaqSection faqs={c.faqs} />

      <ContactSection title="Tell us what you're building." defaultEngagement="Not sure yet" />

      <PageCta content={c.cta} />
    </>
  );
}
