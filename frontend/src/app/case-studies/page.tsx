import type { Metadata } from "next";

import { routes, sectors } from "@/content/taxonomy";
import { CaseStudyExplorer } from "@/components/case-studies/CaseStudyExplorer";
import { ResultsStack } from "@/components/case-studies/ResultsStack";
import { ContactSection, PageCta } from "@/components/page/Blocks";
import { LinkTiles, MetricRow } from "@/components/page/FeatureGrid";
import { PageHero } from "@/components/page/PageHero";
import { Section } from "@/components/page/Section";
import { Band } from "@/components/ui/Band";
import { getCaseStudies } from "@/lib/content";

export const metadata: Metadata = {
  title: "Case Studies",
  description:
    "AI agents, platforms, apps, ventures and growth campaigns VAUG has delivered for startups, enterprises, agencies and family offices across the UK, Europe, the UAE, India and Canada.",
};

export default async function CaseStudiesPage() {
  const studies = await getCaseStudies();
  const count = (key: "sector" | "service" | "region") => new Set(studies.map((s) => s[key])).size;

  return (
    <>
      <PageHero
        breadcrumbs={[
          { label: "Home", href: routes.home },
          { label: "Case Studies", href: routes.caseStudies },
        ]}
        eyebrow="Our work"
        title={{ light: "Results our clients", bold: "can count." }}
        subtitle="Agents that close the books in hours, apps that fill calendars, rescued prototypes and ventures built from zero, plus the search and ads work that fills pipelines. Every number comes from the client's own data."
        primary={{ label: "Discuss your project", href: "#contact" }}
        secondary={{ label: "How we work", href: routes.howWeWork }}
        aside={<ResultsStack studies={studies} />}
      />

      <Band tone="light" label="Case studies in numbers">
        <MetricRow
          metrics={[
            { value: String(studies.length), label: "detailed case studies" },
            { value: String(count("sector")), label: "sectors" },
            { value: String(count("service")), label: "ways of working with us" },
            { value: String(count("region")), label: "regions, from the UK to Australia" },
          ]}
        />
      </Band>

      <Band tone="light" id="all" label="All case studies">
        <CaseStudyExplorer studies={studies} />
      </Band>

      <Section tone="dark" eyebrow="Browse by sector" title="Find work from your industry." subtitle="Each sector page covers the problems we solve there, the standards we build to and the work we've shipped." flush>
        <LinkTiles items={sectors.map((s) => ({ label: s.label, short: s.short, href: routes.industry(s.slug), icon: s.icon }))} />
      </Section>

      <ContactSection title="Have a problem like these?" subtitle="Tell us what's slowing you down. We'll reply within one business day with how we'd approach it and a similar project we've shipped." />
      <PageCta />
    </>
  );
}
