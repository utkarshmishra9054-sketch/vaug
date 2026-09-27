import type { Metadata } from "next";

import { about } from "@/content/company";
import { routes } from "@/content/taxonomy";
import { ExploreCards, PageCta, companyExplore } from "@/components/page/Blocks";
import { PageHero } from "@/components/page/PageHero";
import { Section } from "@/components/page/Section";
import { AboutOrbit, CountStats, IntroCards, OfficeCards, OfficesMap, Pillars, ValuesList, VisionMission } from "@/components/company/about";
import { JourneyTimeline } from "@/components/company/JourneyTimeline";
import { getSiteConfig } from "@/lib/content";

export const metadata: Metadata = {
  title: "About Us",
  description: about.metaDescription,
};

export default async function AboutPage() {
  const site = await getSiteConfig();
  const c = about;

  return (
    <>
      <PageHero
        breadcrumbs={[
          { label: "Home", href: routes.home },
          { label: "About", href: routes.about },
        ]}
        eyebrow={c.hero.eyebrow}
        title={c.hero.title}
        subtitle={c.hero.subtitle}
        tags={c.hero.tags}
        primary={{ label: "Talk to us", href: "#contact" }}
        secondary={{ label: "See our work", href: routes.caseStudies }}
        aside={<AboutOrbit />}
      />

      <Section tone="light" label="Who we are" eyebrow="The short version" title="Who we are, what we do, and why." flush>
        <IntroCards items={c.intro} />
      </Section>

      <Section tone="light" label="Vision and mission" flush>
        <VisionMission vision={c.vision} mission={c.mission} />
      </Section>

      <Section tone="dark" id="journey" eyebrow="Our journey · 2019 to today" title={c.journeyIntro.title} subtitle={c.journeyIntro.subtitle} flush>
        <JourneyTimeline items={c.journey} />
      </Section>

      <Section tone="light" id="values" eyebrow="Values" title={c.valuesTitle} flush>
        <ValuesList values={c.values} />
      </Section>

      <Section tone="dark" id="pillars" eyebrow="Automate · Build · Scale" title={c.pillarsTitle} subtitle={c.pillarsSubtitle} flush>
        <Pillars pillars={c.pillars} />
      </Section>

      <Section tone="light" eyebrow="By the numbers" title={c.statsTitle} flush>
        <CountStats stats={c.stats} />
      </Section>

      <Section tone="dark" id="offices" eyebrow="Offices" title={c.officesTitle} subtitle={c.officesSubtitle} flush>
        <div className="frame-pad pb-12">
          <OfficesMap pins={c.mapPins} />
        </div>
        <OfficeCards offices={site.offices} />
      </Section>

      <Section tone="light" label="Explore VAUG" eyebrow="Keep exploring" title="More about VAUG." flush>
        <ExploreCards items={companyExplore} />
      </Section>

      <PageCta content={c.cta} />
    </>
  );
}
