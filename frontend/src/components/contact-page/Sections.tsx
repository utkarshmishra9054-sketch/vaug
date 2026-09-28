import Link from "next/link";
import { ArrowUpRight, Briefcase, Handshake, Mail, MessageCircle, Phone, type LucideIcon } from "lucide-react";

import type { ContactChannel, ContactPageContent } from "@/content/contact";
import type { SiteConfig } from "@/content/types";
import { routes } from "@/content/taxonomy";
import { Band, SectionTitle } from "@/components/ui/Band";
import { ArrowLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { LocalTime } from "./LocalTime";
import { WorldMap } from "./WorldMap";

const split = (t: { light: string; bold: string }) => (
  <>
    <span className="font-light">{t.light}</span> <span className="font-semibold">{t.bold}</span>
  </>
);

const Eyebrow = ({ children }: { children: React.ReactNode }) => (
  <p className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-accent-text">{children}</p>
);

/** Four-step "what happens next" timeline with a line that draws itself. */
export function NextSteps({ content }: { content: ContactPageContent["steps"] }) {
  return (
    <Band tone="dark" label={content.eyebrow}>
      <div className="frame-pad pb-14 pt-20 lg:pt-24">
        <Eyebrow>{content.eyebrow}</Eyebrow>
        <SectionTitle title={split(content.title)} subtitle={content.subtitle} />
      </div>

      <div className="relative pb-20 lg:pb-24">
        {/* desktop connector */}
        <svg aria-hidden="true" data-reveal viewBox="0 0 1000 10" preserveAspectRatio="none" className="draw absolute left-[12.5%] top-[1.45rem] hidden h-2.5 w-3/4 lg:block">
          <line x1="0" y1="5" x2="1000" y2="5" pathLength={1} stroke="url(#contact-steps-grad)" strokeWidth="2" vectorEffect="non-scaling-stroke" />
          <defs>
            <linearGradient id="contact-steps-grad" x1="0" x2="1">
              <stop offset="0%" stopColor="#b69cff" />
              <stop offset="100%" stopColor="#ffd23f" />
            </linearGradient>
          </defs>
        </svg>

        <ol className="frame-pad relative grid gap-0 lg:grid-cols-4 lg:gap-6">
          {content.items.map((step, i) => (
            <li
              key={step.title}
              data-reveal
              style={{ "--reveal-delay": `${i * 180}ms`, "--i": i } as React.CSSProperties}
              className="relative flex gap-5 pb-10 last:pb-0 max-lg:before:absolute max-lg:before:bottom-0 max-lg:before:left-[27px] max-lg:before:top-14 max-lg:before:w-px max-lg:before:bg-border-strong max-lg:last:before:hidden lg:flex-col lg:items-center lg:pb-0 lg:text-center"
            >
              <span className="contact-step-node relative inline-flex size-14 shrink-0 items-center justify-center rounded-full border border-border-strong bg-surface text-accent-text">
                <Icon name={step.icon} className="size-6" />
                <span className="absolute -right-1 -top-1 inline-flex size-6 items-center justify-center rounded-full bg-yellow font-mono text-[11px] font-bold text-ink">{i + 1}</span>
              </span>
              <div className="min-w-0 lg:mt-6">
                <p className="inline-flex rounded-sm bg-accent-soft px-2 py-0.5 font-mono text-[11px] uppercase tracking-wider text-accent-text">{step.when}</p>
                <h3 className="mt-3 text-xl font-semibold text-fg">{step.title}</h3>
                <p className="mt-2 leading-relaxed text-muted">{step.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </Band>
  );
}

/** Offices with live local time, beside an animated dotted world map. */
export function Offices({ content, site }: { content: ContactPageContent; site: SiteConfig }) {
  const { offices, officeExtras, pins } = content;
  return (
    <Band tone="light" id="offices" label={offices.eyebrow}>
      <div className="frame-pad pb-12 pt-20 lg:pt-24">
        <Eyebrow>{offices.eyebrow}</Eyebrow>
        <SectionTitle title={split(offices.title)} subtitle={offices.subtitle} />
      </div>

      <div className="px-3 sm:px-4">
        <div data-reveal className="relative overflow-hidden rounded-xl bg-ink px-2 pb-4 pt-8 sm:px-6 sm:pt-10">
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_60%_40%,rgb(124_58_237/0.28),transparent_65%)]" />
          <div className="relative">
            <WorldMap pins={pins} />
          </div>
          <div className="relative mt-2 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 px-4 font-mono text-[11px] uppercase tracking-[0.15em] text-paper/70">
            <span className="inline-flex items-center gap-2">
              <span className="size-2.5 rounded-full bg-yellow" aria-hidden="true" /> {offices.legendOffice}: India · UK · USA
            </span>
            <span className="inline-flex items-center gap-2">
              <span className="size-2.5 rounded-full border-2 border-purple-light" aria-hidden="true" /> {offices.legendClient}: UK · Europe · UAE
            </span>
          </div>
        </div>
      </div>

      <ul className="mt-12 grid border-t border-border md:grid-cols-3">
        {site.offices.map((office, i) => {
          const extra = officeExtras.find((e) => e.entity === office.entity);
          return (
            <li key={office.entity} data-reveal style={{ "--reveal-delay": `${i * 120}ms` } as React.CSSProperties} className="border-b border-border md:border-r md:last:border-r-0">
              <div data-glow className="group flex h-full flex-col p-8 transition-colors hover:bg-surface lg:p-10">
                <div className="flex items-center justify-between gap-4">
                  <span className="text-4xl transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110" aria-hidden="true">
                    {office.flag}
                  </span>
                  {extra && <LocalTime timeZone={extra.timeZone} />}
                </div>
                <h3 className="mt-8 text-2xl font-semibold tracking-[-0.02em] text-fg">{office.entity}</h3>
                {extra && <p className="mt-1 font-mono text-xs uppercase tracking-[0.15em] text-accent-text">{extra.role}</p>}
                <p className="mt-4 leading-relaxed text-muted">{office.address}</p>
                <div className="mt-auto flex flex-col gap-2 pt-8 font-mono text-[13px] text-muted">
                  {office.phone && (
                    <a href={`tel:${office.phone.replace(/\s/g, "")}`} className="inline-flex items-center gap-2.5 transition-colors hover:text-fg">
                      <Phone className="size-4" aria-hidden="true" /> {office.phone}
                    </a>
                  )}
                  <a href={`mailto:${office.email}`} className="inline-flex items-center gap-2.5 transition-colors hover:text-fg">
                    <Mail className="size-4" aria-hidden="true" /> {office.email}
                  </a>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </Band>
  );
}

const channelIcon: Record<ContactChannel["kind"], LucideIcon> = {
  email: Mail,
  phone: MessageCircle,
  careers: Briefcase,
  partners: Handshake,
};

/** Email, phone/WhatsApp, careers and partnerships. */
export function Channels({ content, site }: { content: ContactPageContent["channels"]; site: SiteConfig }) {
  const digits = site.phone.replace(/[^\d]/g, "");
  const target = (kind: ContactChannel["kind"]) => {
    switch (kind) {
      case "email":
        return { href: `mailto:${site.email}`, detail: site.email, external: false };
      case "phone":
        // Until a real number is set, this card books a call instead of linking nowhere.
        return digits
          ? { href: `https://wa.me/${digits}`, detail: site.phone, external: true }
          : { href: "#contact", detail: "Free 30-minute strategy call", external: false };
      case "careers":
        return { href: routes.careers, detail: "vaug.in/careers", external: false };
      case "partners":
        return { href: routes.audience("agencies"), detail: "White-label partnerships", external: false };
    }
  };

  return (
    <Band tone="dark" label={content.eyebrow}>
      <div className="frame-pad pb-12 pt-20 lg:pt-24">
        <Eyebrow>{content.eyebrow}</Eyebrow>
        <SectionTitle title={split(content.title)} />
      </div>
      <ul className="grid border-t border-border sm:grid-cols-2 lg:grid-cols-4">
        {content.items.map((item, i) => {
          const t = target(item.kind);
          const Glyph = channelIcon[item.kind];
          const inner = (
            <>
              <span className="inline-flex size-12 items-center justify-center rounded-md bg-accent-soft text-accent-text transition-all duration-500 group-hover:-rotate-6 group-hover:scale-110 group-hover:bg-yellow group-hover:text-ink">
                <Glyph className="size-6" aria-hidden />
              </span>
              <h3 className="mt-8 text-xl font-semibold text-fg">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{item.description}</p>
              <p className="mt-6 break-all font-mono text-[13px] text-fg/80">{t.detail}</p>
              <span className="mt-auto flex items-center justify-between gap-3 pt-8 text-sm font-semibold text-accent-text">
                {item.cta}
                <ArrowUpRight className="size-5 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" aria-hidden="true" />
              </span>
            </>
          );
          const cls = "group flex h-full flex-col p-8 transition-colors hover:bg-surface";
          return (
            <li key={item.kind} data-reveal style={{ "--reveal-delay": `${i * 90}ms` } as React.CSSProperties} className="border-b border-border sm:border-r">
              {t.external || t.href.startsWith("mailto:") ? (
                <a href={t.href} data-glow className={cls} {...(t.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
                  {inner}
                </a>
              ) : (
                <Link href={t.href} data-glow className={cls}>
                  {inner}
                </Link>
              )}
            </li>
          );
        })}
      </ul>
      <div className="h-20 lg:h-24" />
    </Band>
  );
}

/** Closing band: a big "say hello" with the email, over a drifting motto. */
export function Closing({ content, email }: { content: ContactPageContent["closing"]; email: string }) {
  const row = Array.from({ length: 6 }, () => content.words).flat();
  return (
    <Band tone="dark" frameClassName="overflow-hidden" label="Say hello">
      <div className="p-3 sm:p-4">
        <div className="relative isolate overflow-hidden rounded-xl bg-purple px-6 py-20 text-center text-white sm:py-28">
          <div aria-hidden="true" className="absolute inset-0 -z-10 flex flex-col justify-center gap-4 opacity-[0.12]">
            {[0, 1].map((r) => (
              <div key={r} className="flex w-max animate-marquee gap-10 whitespace-nowrap text-7xl font-black uppercase tracking-tight sm:text-9xl" style={{ "--marquee-duration": r ? "55s" : "40s", animationDirection: r ? "reverse" : "normal" } as React.CSSProperties}>
                {[...row, ...row].map((w, i) => (
                  <span key={i}>{w} ·</span>
                ))}
              </div>
            ))}
          </div>
          <div aria-hidden="true" data-parallax="0.05" className="absolute -right-24 -top-24 -z-10 size-72 rounded-full bg-yellow/25 blur-2xl" />

          <h2 data-reveal className="mx-auto max-w-3xl text-4xl leading-tight sm:text-6xl">
            <span className="font-light">{content.lead}</span>
            <br />
            <span className="font-semibold">{content.bold}</span>
          </h2>
          <p className="mx-auto mt-5 max-w-xl font-mono text-xs text-white/75 sm:text-sm">{content.subtitle}</p>
          <a
            href={`mailto:${email}`}
            data-magnetic
            data-cursor="Email"
            className="contact-closing-email group mt-10 inline-flex max-w-full items-center gap-3 break-all text-2xl font-semibold text-yellow sm:text-5xl"
          >
            <span className="link-underline">{email}</span>
            <ArrowUpRight className="size-7 shrink-0 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 sm:size-10" aria-hidden="true" />
          </a>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <ArrowLink href="#contact" variant="light" className="py-2.5 pl-5 text-base">
              Book a call
            </ArrowLink>
            <Link href={routes.caseStudies} className="link-underline text-sm font-semibold text-white/85 hover:text-white">
              Or see our work first
            </Link>
          </div>
        </div>
      </div>
    </Band>
  );
}
