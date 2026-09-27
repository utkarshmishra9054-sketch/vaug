import type { Metadata } from "next";

import { contactPage } from "@/content/contact";
import { routes } from "@/content/taxonomy";
import { FaqSection } from "@/components/page/Blocks";
import { PageHero } from "@/components/page/PageHero";
import { HeroTracker } from "@/components/contact-page/HeroTracker";
import { NeedPicker } from "@/components/contact-page/NeedPicker";
import { Channels, Closing, NextSteps, Offices } from "@/components/contact-page/Sections";
import { Band, SectionTitle } from "@/components/ui/Band";
import { getSiteConfig } from "@/lib/content";

export const metadata: Metadata = {
  title: contactPage.meta.title,
  description: contactPage.meta.description,
  alternates: { canonical: routes.contact },
};

export default async function ContactPage() {
  const site = await getSiteConfig();
  const c = contactPage;

  return (
    <>
      <PageHero
        breadcrumbs={[
          { label: "Home", href: routes.home },
          { label: "Contact", href: routes.contact },
        ]}
        eyebrow={c.hero.eyebrow}
        title={c.hero.title}
        subtitle={c.hero.subtitle}
        tags={c.hero.tags}
        primary={{ label: "Start your brief", href: "#brief" }}
        secondary={{ label: "Book a call", href: "#contact" }}
        aside={<HeroTracker title={c.heroCard.title} events={c.heroCard.events} />}
      />

      <Band tone="light" id="brief" label="Project enquiry" className="scroll-mt-16">
        <NeedPicker needs={c.needs} formTitle={c.brief.formTitle} formNote={c.brief.formNote}>
          <p className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-accent-text">{c.brief.eyebrow}</p>
          <SectionTitle
            title={
              <>
                <span className="font-light">{c.brief.title.light}</span> <span className="font-semibold">{c.brief.title.bold}</span>
              </>
            }
            subtitle={c.brief.subtitle}
          />
          <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted">
            {c.brief.assurances.map((a) => (
              <li key={a} className="flex items-center gap-2.5">
                <span className="size-1.5 rounded-full bg-accent-text" aria-hidden="true" />
                {a}
              </li>
            ))}
          </ul>
        </NeedPicker>
      </Band>

      <NextSteps content={c.steps} />
      <Offices content={c} site={site} />
      <Channels content={c.channels} site={site} />
      <FaqSection faqs={c.faqs} title="Before You Get in Touch." />
      <Closing content={c.closing} email={site.email} />
    </>
  );
}
