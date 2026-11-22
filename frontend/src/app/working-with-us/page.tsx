import type { Metadata } from "next";

import { workingWithUs } from "@/content/workingWithUs";
import { routes } from "@/content/taxonomy";
import { OverlapChart } from "@/components/company/OverlapChart";
import { ContactSection, ExploreCards, FaqSection, PageCta, companyExplore } from "@/components/page/Blocks";
import { FeatureGrid, Steps } from "@/components/page/FeatureGrid";
import { PageHero } from "@/components/page/PageHero";
import { Section } from "@/components/page/Section";
import { ArrowLink } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Working With Us: Hours, Process and Contracts",
  description: workingWithUs.metaDescription,
  alternates: { canonical: routes.workingWithUs },
};

export default function WorkingWithUsPage() {
  const c = workingWithUs;
  return (
    <>
      <PageHero
        breadcrumbs={[
          { label: "Home", href: routes.home },
          { label: "About", href: routes.about },
          { label: "Working with us", href: routes.workingWithUs },
        ]}
        eyebrow={c.hero.eyebrow}
        title={c.hero.title}
        subtitle={c.hero.subtitle}
        tags={c.hero.tags}
        primary={{ label: "See our hours", href: "#hours" }}
        secondary={{ label: "Book a call", href: "#contact" }}
      />

      <Section tone="light" id="hours" eyebrow="Time zones" title={c.hoursTitle} subtitle={c.hoursSubtitle}>
        <OverlapChart />
      </Section>

      <Section tone="dark" id="week" eyebrow="Weekly rhythm" title={c.weekTitle} flush>
        <Steps steps={c.week} />
      </Section>

      <Section tone="light" id="people" eyebrow="Your contacts" title={c.peopleTitle} subtitle={c.peopleSubtitle} flush>
        <FeatureGrid columns={3} items={c.people} />
      </Section>

      <Section tone="dark" id="contracts" eyebrow="Contracts" title={c.contractsTitle} subtitle={c.contractsSubtitle} flush>
        <FeatureGrid columns={3} items={c.contracts} />
        <div className="frame-pad flex flex-wrap items-center gap-6 py-12">
          <ArrowLink href={routes.howWeWork} variant="outline">
            How we run a project
          </ArrowLink>
          <ArrowLink href={routes.security} variant="outline">
            Security and data handling
          </ArrowLink>
        </div>
      </Section>

      <FaqSection faqs={c.faqs} title="Questions Buyers Ask Before Signing." />

      <ContactSection title="Ask us anything before you sign." subtitle="Tell us your time zone and your deadline. A senior lead replies within one business day." defaultEngagement="Not sure yet" />

      <Section tone="light" label="Explore VAUG" eyebrow="Keep exploring" title="More about VAUG." flush>
        <ExploreCards items={companyExplore} />
      </Section>

      <PageCta content={c.cta} />
    </>
  );
}
