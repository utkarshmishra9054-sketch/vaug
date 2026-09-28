import type { Metadata } from "next";

import { servicesIndex as c } from "@/content/services";
import { routes, services } from "@/content/taxonomy";
import type { CaseStudyDetail } from "@/content/types";
import { ContactSection, FaqSection, PageCta } from "@/components/page/Blocks";
import { CaseStudyGrid } from "@/components/page/CaseStudyCards";
import { FeatureGrid } from "@/components/page/FeatureGrid";
import { PageHero } from "@/components/page/PageHero";
import { Section } from "@/components/page/Section";
import { TickerBand } from "@/components/sections/TickerBand";
import { ModelChooser } from "@/components/services/ModelChooser";
import { ProcessTimeline, ServiceCards, ServiceConstellation } from "@/components/services/ServiceBlocks";
import { ArrowLink } from "@/components/ui/Button";
import { getCaseStudies, getHomeContent } from "@/lib/content";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Six services from one AI-first team: AI as a Service, Dedicated Developers, Custom Development, Build With Us, Monthly Retainer and Launch & Rescue. Compare them and find your fit.",
};

export default async function ServicesPage() {
  const [home, studies] = await Promise.all([getHomeContent(), getCaseStudies()]);

  const links = services.map((s) => ({ ...s, href: routes.service(s.slug) }));
  const cards = services.flatMap((s) => {
    const model = home.engagementModels.find((m) => m.slug === s.slug);
    return model ? [{ href: routes.service(s.slug), icon: s.icon, model }] : [];
  });

  // One study per service where available, so the grid shows the range of models.
  const featured = services
    .map((s) => studies.find((st) => st.service === s.slug))
    .filter((st): st is CaseStudyDetail => Boolean(st))
    .slice(0, 6);

  return (
    <>
      <PageHero
        breadcrumbs={[
          { label: "Home", href: routes.home },
          { label: "Services", href: routes.services },
        ]}
        eyebrow={c.eyebrow}
        title={c.title}
        subtitle={c.subtitle}
        primary={{ label: "Book a strategy call", href: "#contact" }}
        secondary={{ label: "Find your model", href: "#chooser" }}
        tags={c.tags}
        aside={<ServiceConstellation items={links} />}
      />

      <TickerBand items={services.map((s) => s.label)} />

      <Section tone="light" id="models" title={c.cardsTitle} subtitle={c.cardsSubtitle} flush>
        <ServiceCards items={cards} />
      </Section>

      <Section tone="dark" id="chooser" eyebrow="Find your fit" title={c.chooser.title} subtitle={c.chooser.subtitle} flush>
        <ModelChooser questions={c.chooser.questions} reasons={c.chooser.reasons} profiles={c.chooser.profiles} services={links} />
      </Section>

      <Section tone="light" eyebrow="Mix and match" title={c.combine.title} subtitle={c.combine.subtitle} flush>
        <FeatureGrid items={c.combine.items} columns={3} />
      </Section>

      <Section tone="dark" id="process" eyebrow="Process" title={c.processTitle} subtitle={c.processSubtitle}>
        <ProcessTimeline steps={c.process} />
        <div className="frame-pad pt-10">
          <ArrowLink href={routes.howWeWork} variant="outline">
            How we work in detail
          </ArrowLink>
        </div>
      </Section>

      {featured.length > 0 && (
        <Section tone="light" id="work" eyebrow="Case studies" title={c.caseStudiesTitle}>
          <CaseStudyGrid studies={featured} />
          <div className="frame-pad pt-10">
            <ArrowLink href={routes.caseStudies}>See all case studies</ArrowLink>
          </div>
        </Section>
      )}

      <FaqSection faqs={c.faqs} tone="dark" />
      <ContactSection tone="light" defaultEngagement="Not sure yet" title="Tell us what you need." subtitle="Not sure which service fits? Describe the problem and we'll recommend one on the call." />
      <PageCta content={c.cta} />
    </>
  );
}
