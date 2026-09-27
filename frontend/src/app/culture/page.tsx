import type { Metadata } from "next";

import { aboutExploreCard, culture } from "@/content/company";
import { routes } from "@/content/taxonomy";
import { ExploreCards, PageCta, companyExplore } from "@/components/page/Blocks";
import { FeatureGrid } from "@/components/page/FeatureGrid";
import { PageHero } from "@/components/page/PageHero";
import { Section } from "@/components/page/Section";
import { CultureCollage, CulturePrinciples, MomentsBento } from "@/components/company/culture";
import { DayAtVaug } from "@/components/company/DayAtVaug";
import { TickerBand } from "@/components/sections/TickerBand";

export const metadata: Metadata = {
  title: "Culture",
  description: culture.metaDescription,
};

export default function CulturePage() {
  const c = culture;
  return (
    <>
      <PageHero
        breadcrumbs={[
          { label: "Home", href: routes.home },
          { label: "About", href: routes.about },
          { label: "Culture", href: routes.culture },
        ]}
        eyebrow={c.hero.eyebrow}
        title={c.hero.title}
        subtitle={c.hero.subtitle}
        tags={c.hero.tags}
        primary={{ label: "See open roles", href: routes.careers }}
        secondary={{ label: "Meet the team", href: routes.team }}
        aside={<CultureCollage notes={c.heroNotes} />}
      />

      <TickerBand items={c.rituals.map((r) => r.title)} />

      <Section tone="light" id="day" eyebrow="Inside the studio" title={c.dayTitle} subtitle={c.daySubtitle} flush>
        <div className="border-t border-border">
          <DayAtVaug beats={c.day} />
        </div>
      </Section>

      <Section tone="dark" id="rituals" eyebrow="Rituals" title={c.ritualsTitle} flush>
        <FeatureGrid columns={4} items={c.rituals.map((r) => ({ title: r.title, description: r.description, icon: r.icon, meta: r.cadence }))} />
      </Section>

      <Section tone="light" id="moments" eyebrow="Moments" title={c.momentsTitle} subtitle={c.momentsSubtitle} flush>
        <div className="border-t border-border">
          <MomentsBento moments={c.moments} />
        </div>
      </Section>

      <Section tone="dark" eyebrow="Working together" title={c.principlesTitle} flush>
        <CulturePrinciples items={c.principles} />
      </Section>

      <Section tone="light" label="Explore VAUG" eyebrow="Keep exploring" title="More about VAUG." flush>
        <ExploreCards items={[aboutExploreCard, ...companyExplore.filter((e) => e.href !== routes.culture)]} />
      </Section>

      <PageCta content={c.cta} />
    </>
  );
}
