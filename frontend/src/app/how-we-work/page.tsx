import type { Metadata } from "next";

import { howWeWork } from "@/content/howWeWork";
import { routes, services } from "@/content/taxonomy";
import { ContactSection, ExploreCards, FaqSection, PageCta, companyExplore } from "@/components/page/Blocks";
import { Compare, FeatureGrid, LinkTiles } from "@/components/page/FeatureGrid";
import { PageHero } from "@/components/page/PageHero";
import { Section } from "@/components/page/Section";
import { DeliveryLoop } from "@/components/company/DeliveryLoop";
import { FridayUpdateMock, Philosophy, QualityChecklist } from "@/components/company/howWeWork";
import { PreEngagementStepper } from "@/components/company/PreEngagementStepper";
import { Band } from "@/components/ui/Band";

export const metadata: Metadata = {
  title: "How We Work",
  description: howWeWork.metaDescription,
};

export default function HowWeWorkPage() {
  const c = howWeWork;
  return (
    <>
      <PageHero
        breadcrumbs={[
          { label: "Home", href: routes.home },
          { label: "How we work", href: routes.howWeWork },
        ]}
        eyebrow={c.hero.eyebrow}
        title={c.hero.title}
        subtitle={c.hero.subtitle}
        tags={c.hero.tags}
        primary={{ label: "Book a strategy call", href: "#contact" }}
        secondary={{ label: "See case studies", href: routes.caseStudies }}
        aside={<FridayUpdateMock items={c.heroUpdate} />}
      />

      <Band tone="light" label="Our philosophy">
        <Philosophy {...c.philosophy} />
      </Band>

      <Section tone="dark" id="commitments" eyebrow="Commitments" title={c.commitmentsTitle} flush>
        <FeatureGrid columns={3} items={c.commitments} />
      </Section>

      <Section tone="light" id="before-we-start" eyebrow="Before we start" title={c.preTitle} subtitle={c.preSubtitle} flush>
        <PreEngagementStepper steps={c.pre} />
      </Section>

      <Section tone="dark" id="delivery-cycle" eyebrow="Delivery cycle" title={c.cycleTitle} subtitle={c.cycleSubtitle} flush>
        <DeliveryLoop stages={c.cycle} />
      </Section>

      <Section tone="light" id="quality" eyebrow="Quality" title={c.qualityTitle} subtitle={c.qualitySubtitle} flush>
        <QualityChecklist items={c.quality} />
      </Section>

      <Section tone="dark" id="ai" eyebrow="AI with guard rails" title={c.compareTitle} subtitle={c.compareSubtitle} flush>
        <Compare left={c.compare.left} right={c.compare.right} />
      </Section>

      <Section tone="light" id="engagement-models" eyebrow="Engagement models" title={c.modelsTitle} subtitle={c.modelsSubtitle} flush>
        <LinkTiles items={services.map((s) => ({ label: s.label, short: s.short, href: routes.service(s.slug), icon: s.icon }))} />
      </Section>

      <FaqSection faqs={c.faqs} />

      <ContactSection title={c.contactTitle} defaultEngagement="Not sure yet" />

      <Section tone="light" label="Explore VAUG" eyebrow="Keep exploring" title="More about VAUG." flush>
        <ExploreCards items={companyExplore} />
      </Section>

      <PageCta content={c.cta} />
    </>
  );
}
