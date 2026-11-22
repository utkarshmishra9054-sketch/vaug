import type { Metadata } from "next";
import Link from "next/link";
import { FlaskConical } from "lucide-react";

import type { Faq, Feature } from "@/content/types";
import { eventPlan, locations, providers, services } from "@/content/showcases/healthCentre";
import { routes } from "@/content/taxonomy";
import { ScreenFrame } from "@/components/case-studies/ScreenFrame";
import { ShotGallery, type GalleryItem } from "@/components/case-studies/ShotGallery";
import { ShotCanvas } from "@/components/case-studies/screens/kit";
import { ContactSection, FaqSection, PageCta } from "@/components/page/Blocks";
import { CaseStudyGrid } from "@/components/page/CaseStudyCards";
import { FeatureGrid, Steps } from "@/components/page/FeatureGrid";
import { PageHero } from "@/components/page/PageHero";
import { Section } from "@/components/page/Section";
import { HealthSiteDemo } from "@/components/showcases/health/HealthSiteDemo";
import { adminCaptions, adminScreens } from "@/components/showcases/health/AdminScreens";
import { ArrowLink } from "@/components/ui/Button";
import { getCaseStudiesBy } from "@/lib/content";

export const metadata: Metadata = {
  title: "Health Centre Website Demo",
  description:
    "A working demo of a patient-first health-centre website: provider finder, locations and mobile units, typo-tolerant search, English and Spanish, built on WordPress and accessible to WCAG 2.2 AA.",
  alternates: { canonical: routes.showcase("health-centre-website") },
};

const patientFeatures: Feature[] = [
  { title: "Provider finder", description: "Filter about 100 providers by service, language, location, new-patient status and video visits. Every result has a booking button.", icon: "users" },
  { title: "Locations and mobile units", description: "Clinics on a map with hours, services, walk-in flags and this week's mobile-unit stops. One tap to call or get directions.", icon: "globe" },
  { title: "Search that understands people", description: "Misspellings are corrected and everyday words map to services: “teeth” finds dental, “pap smear” finds women's health, “dientes” works too.", icon: "search" },
  { title: "English and Spanish", description: "Every page, provider bio and location in both languages, switched with one tap and remembered, with correct language markup for screen readers.", icon: "message-square" },
  { title: "Accessible to WCAG 2.2 AA", description: "Keyboard-friendly filters, visible focus, labelled controls and colours that pass contrast. Tested by hand, not just by a scanner.", icon: "shield" },
  { title: "Costs made plain", description: "Sliding-fee discounts in a readable table, the insurance you accept, and a clear path for people with no insurance at all.", icon: "heart" },
];

const migrationSteps: Feature[] = [
  { title: "Crawl and inventory", description: "Every URL, PDF and form on the current site, with traffic and inbound links, so nothing ranking is lost by accident.", meta: "Week 1" },
  { title: "Keep, rewrite or retire", description: "Each item gets a decision with the content team. Duplicates and out-of-date pages go; plain-language rewrites are scheduled.", meta: "Weeks 1–2" },
  { title: "Redirect map", description: "Every old URL maps to its new home with a 301. Retired pages point to the closest live page, never just the home page.", meta: "Weeks 2–3" },
  { title: "Scripted import", description: "Providers, locations and services are imported into structured fields, then reviewed by editors in English and Spanish.", meta: "Weeks 3–8" },
  { title: "Launch and watch", description: "Search Console, the 404 log and analytics are checked daily for the first month, with fixes the same day.", meta: "Launch + 30 days" },
];

const faqs: Faq[] = [
  { question: "Is this a real health centre?", answer: "No. Sagebrook Health Centers is a fictional brand and every provider, location and number in the demo is invented. The demo shows how we build these sites; it does not describe a client." },
  { question: "Why WordPress?", answer: "Health centres change providers, hours and services often, and their communications teams need to do that without a developer. Custom post types with structured fields keep the content consistent and let one edit update the finder, search and schema markup. We also build on headless CMSs when a project needs it." },
  { question: "Can we keep our patient portal and scheduling system?", answer: "Yes. Booking and portal buttons link to the systems you already use, and each click is tracked so you can see which pages drive appointments." },
  { question: "What about patient privacy?", answer: "The website does not store health information. Analytics never receive personal or health details, and any form that asks for health information is routed to a HIPAA-eligible service under a business associate agreement. We follow the rules; we do not claim certifications we do not hold." },
  { question: "How long does a build like this take?", answer: "Typically 12 to 16 weeks from discovery to launch, including content migration, translation workflow, accessibility testing and staff training." },
];

export default async function HealthCentreShowcasePage() {
  const studies = (await getCaseStudiesBy({ sector: "healthcare" })).slice(0, 3);
  const gallery: GalleryItem[] = adminScreens.map((Screen, i) => ({
    caption: adminCaptions[i],
    node: (
      <ShotCanvas>
        <Screen tint="#3d6b53" />
      </ShotCanvas>
    ),
  }));

  return (
    <>
      <PageHero
        breadcrumbs={[
          { label: "Home", href: routes.home },
          { label: "Industries", href: routes.industries },
          { label: "Healthcare", href: routes.industry("healthcare") },
          { label: "Health-centre website demo", href: routes.showcase("health-centre-website") },
        ]}
        eyebrow="Capability showcase · Healthcare"
        title={{ light: "Patient-first websites", bold: "for health centres." }}
        subtitle="A working demo of what we build for community health centres and clinic groups: find a provider, find a clinic or mobile unit, search in plain words or Spanish, and book. Built on WordPress so your team can keep it up to date."
        tags={["WordPress", "WCAG 2.2 AA", "English + Spanish", "GA4 + GTM"]}
        primary={{ label: "Try the demo", href: "#demo" }}
        secondary={{ label: "Talk to us", href: "#contact" }}
        aside={
          <div className="glass mx-auto w-full max-w-sm rounded-xl border border-border p-6">
            <p className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-accent-text">
              <FlaskConical className="size-4" aria-hidden="true" /> In the demo
            </p>
            <dl className="mt-5 grid grid-cols-2 gap-3">
              {[
                ["Providers", String(providers.length)],
                ["Clinics", String(locations.filter((l) => l.kind === "clinic").length)],
                ["Mobile units", String(locations.filter((l) => l.kind === "mobile").length)],
                ["Services", String(services.length)],
                ["Languages", "2"],
                ["Tracked events", String(eventPlan.length)],
              ].map(([k, v]) => (
                <div key={k} className="rounded-lg border border-border bg-bg px-3 py-2.5">
                  <dt className="text-xs text-muted">{k}</dt>
                  <dd className="mt-1 text-xl font-semibold text-fg">{v}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-5 text-sm leading-relaxed text-muted">Fictional brand, invented data. It shows what we build, not a client.</p>
          </div>
        }
      />

      <Section
        tone="light"
        id="demo"
        eyebrow="Try it"
        title="Use it like a patient would."
        subtitle="Search for “dentsit” or “pap smear”, find a Spanish-speaking counsellor, switch to Español, open the map. The panel beside it shows the analytics events each action would send."
      >
        <div className="frame-pad">
          <HealthSiteDemo />
        </div>
      </Section>

      <Section tone="dark" id="patients" eyebrow="What patients get" title="Everything a patient looks for, in two taps." flush>
        <FeatureGrid columns={3} items={patientFeatures} />
      </Section>

      <Section
        tone="light"
        id="admin"
        eyebrow="Built on WordPress"
        title="Your team edits it, not us."
        subtitle="Providers, locations and services are custom post types with structured fields, so one edit updates the finder, the filters, search and schema markup. Spanish versions sit beside the English ones. Open any screen to enlarge it."
        flush
      >
        <ShotGallery items={gallery}>
          <div className="grid border-t border-border sm:grid-cols-2">
            {gallery.map((item, n) => (
              <ScreenFrame key={item.caption} item={item} tint="#1d3a5f" index={n} />
            ))}
          </div>
        </ShotGallery>
      </Section>

      <Section tone="dark" id="analytics" eyebrow="Measured from day one" title="An event plan, not just a pageview counter." subtitle="Every booking button, call, search and filter is a named GA4 event sent through Google Tag Manager, so you can see which pages and services turn into appointments. No personal or health information is ever sent.">
        <div className="frame-pad">
          <div role="region" aria-label="GA4 event plan (scrolls sideways on small screens)" tabIndex={0} className="overflow-x-auto rounded-xl border border-border focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent">
            <table className="w-full min-w-[36rem] text-left text-sm">
              <caption className="sr-only">GA4 event plan for the health-centre site</caption>
              <thead className="bg-surface-2 text-fg">
                <tr>
                  <th scope="col" className="px-4 py-3 font-semibold">
                    Event
                  </th>
                  <th scope="col" className="px-4 py-3 font-semibold">
                    Fires when
                  </th>
                  <th scope="col" className="px-4 py-3 font-semibold">
                    Parameters
                  </th>
                </tr>
              </thead>
              <tbody>
                {eventPlan.map((e) => (
                  <tr key={e.event} className="border-t border-border">
                    <th scope="row" className="px-4 py-3 font-mono text-[13px] font-medium text-fg">
                      {e.event}
                    </th>
                    <td className="px-4 py-3 text-muted">{e.when}</td>
                    <td className="px-4 py-3 font-mono text-[13px] text-muted">{e.params}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Section>

      <Section tone="light" id="migration" eyebrow="Migration" title="300+ pages moved without losing search traffic." subtitle="How we move an existing health-centre site, its providers, locations, PDFs and forms, onto the new build, with a 301 redirect for every old URL." flush>
        <Steps steps={migrationSteps} />
      </Section>

      {studies.length > 0 && (
        <Section tone="dark" id="work" eyebrow="Healthcare work" title="Proof from real clinics." subtitle="Case studies from healthcare clients we have built for." flush>
          <CaseStudyGrid studies={studies} columns={studies.length >= 3 ? 3 : 2} />
          <div className="frame-pad flex flex-wrap items-center gap-6 py-12">
            <ArrowLink href={routes.industry("healthcare")} variant="outline">
              All healthcare work
            </ArrowLink>
            <Link href={routes.accessibilityAudits} className="link-underline text-accent-text">
              How we test accessibility
            </Link>
          </div>
        </Section>
      )}

      <FaqSection faqs={faqs} title="Health-Centre Website Questions." />
      <ContactSection title="Planning a new health-centre website?" subtitle="Send us your current site and your deadline. A senior lead replies within one business day with an approach and timeline." />
      <PageCta />
    </>
  );
}
