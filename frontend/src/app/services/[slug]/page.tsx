import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { serviceDetailBySlug, serviceDetails } from "@/content/services";
import { audiences, engineering, routes, sectors, services } from "@/content/taxonomy";
import { ContactSection, FaqSection, PageCta } from "@/components/page/Blocks";
import { CaseStudyGrid } from "@/components/page/CaseStudyCards";
import { FeatureGrid, LinkTiles, Steps, TechGroups } from "@/components/page/FeatureGrid";
import { PageHero } from "@/components/page/PageHero";
import { Section } from "@/components/page/Section";
import { Deliverables, FactStrip, StartPaths } from "@/components/services/ServiceBlocks";
import { ServiceVisual } from "@/components/services/ServiceVisual";
import { Band } from "@/components/ui/Band";
import { ArrowLink } from "@/components/ui/Button";
import { getCaseStudiesBy, getHomeContent } from "@/lib/content";

export const dynamicParams = false;

export async function generateStaticParams() {
  return serviceDetails.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata(props: PageProps<"/services/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const s = serviceDetailBySlug(slug);
  if (!s) return {};
  return { title: s.metaTitle, description: s.metaDescription };
}

export default async function ServicePage(props: PageProps<"/services/[slug]">) {
  const { slug } = await props.params;
  const s = serviceDetailBySlug(slug);
  if (!s) notFound();

  const [home, studies] = await Promise.all([getHomeContent(), getCaseStudiesBy({ service: s.slug })]);
  const model = home.engagementModels.find((m) => m.slug === s.slug);
  const label = services.find((x) => x.slug === s.slug)?.label ?? s.eyebrow;

  const audienceItems = s.audiences.flatMap((a) => {
    const aud = audiences.find((x) => x.slug === a.slug);
    return aud ? [{ title: aud.label, description: a.note, icon: aud.icon, href: routes.audience(aud.slug) }] : [];
  });
  const engineeringLinks = s.engineering.flatMap((slug) => {
    const e = engineering.find((x) => x.slug === slug);
    return e ? [{ label: e.label, short: e.short, href: routes.engineeringPage(e.slug), icon: e.icon }] : [];
  });
  const otherServices = services.filter((x) => x.slug !== s.slug).map((x) => ({ label: x.label, short: x.short, href: routes.service(x.slug), icon: x.icon }))
    .concat({ label: "Compare all six", short: "Take the quick quiz or see every model side by side.", href: `${routes.services}#chooser`, icon: "layers" });

  return (
    <>
      <PageHero
        breadcrumbs={[
          { label: "Home", href: routes.home },
          { label: "Services", href: routes.services },
          { label, href: routes.service(s.slug) },
        ]}
        eyebrow={s.eyebrow}
        title={s.title}
        subtitle={s.subtitle}
        primary={s.primary}
        secondary={s.secondary}
        tags={model?.services}
        aside={<ServiceVisual slug={s.slug} />}
      />

      <Band tone="dark" label="At a glance">
        <FactStrip facts={s.facts} />
      </Band>

      <Section tone="light" eyebrow="The problem" title={s.problemsTitle} flush>
        <FeatureGrid items={s.problems} columns={4} />
      </Section>

      <Section tone="dark" id="included" eyebrow="What's included" title={s.offeringsTitle} subtitle={model ? `Best for ${model.bestFor.toLowerCase()}.` : undefined} flush>
        <FeatureGrid items={s.offerings} columns={3} />
      </Section>

      <Section tone="light" id="how-it-works" eyebrow="How it works" title={s.stepsTitle} flush>
        <Steps steps={s.steps} />
      </Section>

      <Section tone="dark" id="start" label="How we start" eyebrow="How we start" title={<><span className="font-light">{s.start.title.light}</span> <span className="font-semibold">{s.start.title.bold}</span></>} subtitle={s.start.subtitle}>
        <StartPaths start={s.start} />
      </Section>

      <Section tone="light" eyebrow="Deliverables" title={s.deliverablesTitle} flush>
        <Deliverables items={s.deliverables} />
      </Section>

      <Section tone="dark" eyebrow="Why VAUG" title="Why Teams Choose VAUG." flush>
        <FeatureGrid items={s.differentiators} columns={4} />
      </Section>

      {studies.length > 0 && (
        <Section tone="light" id="work" eyebrow="Case studies" title={`${label} in Practice.`}>
          <CaseStudyGrid studies={studies.slice(0, 3)} columns={studies.length >= 3 ? 3 : 2} />
          <div className="frame-pad pt-10">
            <ArrowLink href={routes.caseStudies}>See all case studies</ArrowLink>
          </div>
        </Section>
      )}

      <Section tone="dark" id="tech" eyebrow="Technology" title="Tools We Use." flush>
        <TechGroups groups={s.tech} />
        <p className="frame-pad pb-6 pt-14 font-mono text-xs uppercase tracking-[0.2em] text-accent-text">Engineering behind it</p>
        <LinkTiles items={engineeringLinks} columns={3} />
      </Section>

      <Section tone="light" id="industries" eyebrow="Industries" title="Sectors We Know." subtitle={s.industriesNote} flush>
        <LinkTiles items={sectors.map((x) => ({ label: x.label, short: x.short, href: routes.industry(x.slug), icon: x.icon }))} columns={3} />
      </Section>

      <Section tone="dark" eyebrow="Who it's for" title={`Who ${label} Is For.`} flush>
        <FeatureGrid items={audienceItems} columns={audienceItems.length >= 4 ? 4 : audienceItems.length === 2 ? 2 : 3} />
      </Section>

      <FaqSection faqs={s.faqs} tone="light" />
      <ContactSection defaultEngagement={s.leadOption} title={`Let's talk about ${label}.`} />

      <Section tone="light" eyebrow="Explore" title="Other Ways to Work With Us." flush>
        <LinkTiles items={otherServices} columns={3} />
      </Section>

      <PageCta content={s.cta} />
    </>
  );
}
