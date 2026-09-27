import type { Metadata } from "next";

import { aboutExploreCard, team } from "@/content/company";
import { routes } from "@/content/taxonomy";
import { ExploreCards, PageCta, companyExplore } from "@/components/page/Blocks";
import { PageHero } from "@/components/page/PageHero";
import { Section } from "@/components/page/Section";
import { DisciplineBoard, LeadershipGrid, MissionQuote, TeamConstellation } from "@/components/company/team";
import { Band } from "@/components/ui/Band";
import { ArrowLink } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Team",
  description: team.metaDescription,
};

export default function TeamPage() {
  const c = team;
  return (
    <>
      <PageHero
        breadcrumbs={[
          { label: "Home", href: routes.home },
          { label: "About", href: routes.about },
          { label: "Team", href: routes.team },
        ]}
        eyebrow={c.hero.eyebrow}
        title={c.hero.title}
        subtitle={c.hero.subtitle}
        tags={c.hero.tags}
        primary={{ label: "Book a call with a lead", href: "#contact" }}
        secondary={{ label: "Join the team", href: routes.careers }}
        aside={<TeamConstellation people={c.leadership} headcount={c.headcount} />}
      />

      <Section tone="light" id="leadership" eyebrow="Leadership" title={c.leadershipTitle} subtitle={c.leadershipSubtitle} flush>
        <LeadershipGrid people={c.leadership} />
      </Section>

      <Section tone="dark" id="disciplines" eyebrow="Disciplines" title={c.disciplinesTitle} subtitle={c.disciplinesSubtitle} flush>
        <DisciplineBoard disciplines={c.disciplines} />
      </Section>

      <Band tone="light" label="Our hiring principle">
        <MissionQuote text={c.quote.text} by={c.quote.by} />
      </Band>

      <Band tone="dark" label="Join the team">
        <div className="frame-pad flex flex-col items-start justify-between gap-8 py-16 md:flex-row md:items-center lg:py-20">
          <div data-reveal>
            <h2 className="text-3xl font-semibold leading-tight text-fg sm:text-4xl">{c.joinTitle}</h2>
            <p className="mt-3 text-lg text-muted">{c.joinText}</p>
          </div>
          <div data-reveal style={{ "--reveal-delay": "120ms" } as React.CSSProperties} className="flex flex-wrap gap-3">
            <ArrowLink href={routes.careers} className="py-2.5 pl-5 text-base">
              See open roles
            </ArrowLink>
            <ArrowLink href={routes.culture} variant="outline" className="py-2.5 pl-5 text-base">
              Our culture
            </ArrowLink>
          </div>
        </div>
      </Band>

      <Section tone="light" label="Explore VAUG" eyebrow="Keep exploring" title="More about VAUG." flush>
        <ExploreCards items={[aboutExploreCard, ...companyExplore.filter((e) => e.href !== routes.team)]} />
      </Section>

      <PageCta content={c.cta} />
    </>
  );
}
