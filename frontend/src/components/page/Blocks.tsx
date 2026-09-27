import Link from "next/link";
import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";

import type { CtaBlock, Faq as FaqItem, IconName } from "@/content/types";
import { routes } from "@/content/taxonomy";
import { ContactForm } from "@/components/contact/ContactForm";
import { Cta } from "@/components/sections/Cta";
import { Faq } from "@/components/sections/Faq";
import { Band, SectionTitle } from "@/components/ui/Band";
import { Icon } from "@/components/ui/Icon";
import { getSiteConfig } from "@/lib/content";

export const defaultCta: CtaBlock = {
  title: { light: "The right conversation can save you", bold: "six months." },
  subtitle: "Free 30-minute strategy call · NDA on request · Proposal within 48 hours",
  button: "Book a call",
};

/** The closing purple banner. Its button opens the contact panel. */
export function PageCta({ content = defaultCta }: { content?: CtaBlock }) {
  return (
    <Band tone="dark" label="Contact">
      <Cta content={content} />
    </Band>
  );
}

export function FaqSection({ faqs, title = "Questions We Hear Often.", tone = "light" }: { faqs: FaqItem[]; title?: string; tone?: "dark" | "light" }) {
  if (faqs.length === 0) return null;
  return (
    <Band tone={tone} id="faq" label="Frequently asked questions">
      <SectionTitle title={title} className="frame-pad py-16 lg:py-20" />
      <Faq faqs={faqs} />
    </Band>
  );
}

/** Inline contact form with office details, used near the end of landing pages. */
export async function ContactSection({
  title = "Tell us what you're building.",
  subtitle = "Share a few lines about your idea, workflow or project. A senior lead replies within one business day.",
  defaultEngagement,
  tone = "dark",
}: {
  title?: string;
  subtitle?: string;
  defaultEngagement?: string;
  tone?: "dark" | "light";
}) {
  const site = await getSiteConfig();
  return (
    <Band tone={tone} id="enquire" label="Enquiry form">
      <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)]">
        <div className="frame-pad flex flex-col border-border py-16 max-lg:border-b lg:border-r lg:py-20">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent-text">Get in touch</p>
          <h2 className="mt-4 text-3xl font-semibold leading-tight text-fg sm:text-4xl">{title}</h2>
          <p className="mt-4 text-lg leading-relaxed text-muted">{subtitle}</p>
          <ul className="mt-10 flex flex-col gap-3 text-sm text-muted">
            {["Free 30-minute strategy call", "NDA on request", "Proposal within 48 hours"].map((t) => (
              <li key={t} className="flex items-center gap-3">
                <span className="size-1.5 rounded-full bg-yellow" aria-hidden="true" />
                {t}
              </li>
            ))}
          </ul>
          <div className="mt-auto flex flex-col gap-3 pt-10 font-mono text-[13px] text-muted">
            <a href={`mailto:${site.email}`} className="flex items-center gap-3 transition-colors hover:text-fg">
              <Mail className="size-4" aria-hidden="true" /> {site.email}
            </a>
            {site.phone && (
              <a href={`tel:${site.phone.replace(/\s/g, "")}`} className="flex items-center gap-3 transition-colors hover:text-fg">
                <Phone className="size-4" aria-hidden="true" /> {site.phone}
              </a>
            )}
            <Link href={routes.contact} className="flex items-center gap-3 transition-colors hover:text-fg">
              <MapPin className="size-4" aria-hidden="true" /> Our offices
            </Link>
          </div>
        </div>
        <div className="frame-pad py-16 lg:py-20">
          <ContactForm idPrefix="inline-" defaultEngagement={defaultEngagement} />
        </div>
      </div>
    </Band>
  );
}

/** Three large link cards, e.g. Team / Culture / Careers at the end of company pages. */
export function ExploreCards({ items }: { items: { title: string; description: string; href: string; icon: IconName }[] }) {
  return (
    <ul className="grid border-t border-border md:grid-cols-3">
      {items.map((item) => (
        <li key={item.href} data-reveal className="border-b border-border md:border-r">
          <Link href={item.href} data-glow className="group flex h-full flex-col p-8 transition-colors hover:bg-surface lg:p-10">
            <span className="inline-flex size-14 items-center justify-center rounded-md bg-accent-soft text-accent-text transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110">
              <Icon name={item.icon} className="size-7" />
            </span>
            <h3 className="mt-10 text-2xl font-semibold tracking-[-0.02em] text-fg">{item.title}</h3>
            <p className="mt-3 text-muted">{item.description}</p>
            <ArrowUpRight className="mt-auto self-end pt-6 text-accent-text transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" size={44} strokeWidth={1.6} aria-hidden="true" />
          </Link>
        </li>
      ))}
    </ul>
  );
}

export const companyExplore = [
  { title: "Meet the team", description: "The people who build, ship and look after your product.", href: routes.team, icon: "users" as const },
  { title: "Our culture", description: "How we work together, learn and keep the craft high.", href: routes.culture, icon: "heart" as const },
  { title: "Join VAUG", description: "Open roles for engineers, designers and AI specialists.", href: routes.careers, icon: "rocket" as const },
];

/** Long-form text for legal and policy pages. Pass sections of headings and paragraphs. */
export function Prose({ sections, updated }: { sections: { heading: string; body: string[] }[]; updated?: string }) {
  return (
    <div className="frame-pad max-w-3xl py-16 lg:py-20">
      {updated && <p className="font-mono text-xs uppercase tracking-[0.15em] text-subtle">Last updated {updated}</p>}
      {sections.map((s) => (
        <section key={s.heading} className="mt-12 first:mt-8">
          <h2 className="text-2xl font-semibold text-fg">{s.heading}</h2>
          {s.body.map((p, i) => (
            <p key={i} className="mt-4 leading-relaxed text-muted">
              {p}
            </p>
          ))}
        </section>
      ))}
    </div>
  );
}
