import Link from "next/link";
import { ArrowUpRight, Bot, BriefcaseBusiness, House, Layers, MessageSquare, Search } from "lucide-react";

import { routes } from "@/content/taxonomy";
import { NotFoundTerminal } from "@/components/contact-page/NotFoundTerminal";
import { HeroGlow } from "@/components/page/PageHero";
import { Band } from "@/components/ui/Band";
import { ArrowLink } from "@/components/ui/Button";

const links = [
  { label: "Home", description: "Start from the top", href: routes.home, icon: House },
  { label: "Services", description: "Six ways to work with us", href: routes.services, icon: Layers },
  { label: "Case studies", description: "Twelve products we shipped", href: routes.caseStudies, icon: BriefcaseBusiness },
  { label: "Contact", description: "Tell us what you need", href: routes.contact, icon: MessageSquare },
];

export default function NotFound() {
  return (
    <>
      <Band tone="dark" rails={false} dots={false} label="Page not found" backdrop={<HeroGlow />}>

        <div className="frame-pad relative flex flex-col items-center pb-20 pt-32 text-center sm:pt-36 lg:pb-24 lg:pt-40">
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-accent-text">Error 404</p>

          {/* 4 [orbit] 4 */}
          <div aria-hidden="true" className="mt-6 flex select-none items-center justify-center gap-2 text-[7rem] font-black leading-none tracking-tighter text-fg sm:gap-4 sm:text-[11rem] lg:text-[13rem]">
            <span className="nf-digit inline-block">4</span>
            <span className="relative inline-flex size-[0.78em] items-center justify-center">
              <span className="absolute inset-0 rounded-full border-[0.07em] border-fg" />
              <span className="nf-orbit absolute inset-[-0.12em] rounded-full border border-dashed border-accent-text/60" />
              <span className="nf-orbit absolute inset-[-0.12em]">
                <span className="absolute left-1/2 top-0 inline-flex size-[0.26em] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-yellow text-ink shadow-[0_0_24px_rgb(255_210_63/0.6)]">
                  <Bot className="nf-counter size-[0.16em]" strokeWidth={2.4} />
                </span>
              </span>
              <span className="nf-search inline-flex text-accent-text">
                <Search className="size-[0.3em]" strokeWidth={2.2} />
              </span>
            </span>
            <span className="nf-digit inline-block [animation-delay:-1.2s]">4</span>
          </div>

          <h1 className="mt-8 max-w-3xl text-4xl leading-[1.08] text-fg sm:text-5xl">
            <span className="font-light">This page didn&apos;t</span> <span className="font-semibold">ship.</span>
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted">
            Even our agents couldn&apos;t find it. The link may be mistyped, or the page may have moved. Here&apos;s where to go instead.
          </p>

          <div className="mt-10 w-full">
            <NotFoundTerminal />
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <ArrowLink href={routes.home} className="py-2.5 pl-5 text-base">
              Back to home
            </ArrowLink>
            <ArrowLink href="#contact" variant="outline" className="py-2.5 pl-5 text-base">
              Talk to us
            </ArrowLink>
          </div>
        </div>
      </Band>

      <Band tone="light" label="Popular pages">
        <ul className="grid sm:grid-cols-2 lg:grid-cols-4">
          {links.map((l, i) => (
            <li key={l.href} data-reveal style={{ "--reveal-delay": `${i * 90}ms` } as React.CSSProperties} className="border-b border-border sm:border-r">
              <Link href={l.href} data-glow className="group flex h-full flex-col p-8 transition-colors hover:bg-surface lg:p-10">
                <span className="inline-flex size-12 items-center justify-center rounded-md bg-accent-soft text-accent-text transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110">
                  <l.icon className="size-6" aria-hidden="true" />
                </span>
                <span className="mt-8 text-xl font-semibold text-fg">{l.label}</span>
                <span className="mt-1 text-sm text-muted">{l.description}</span>
                <ArrowUpRight className="mt-auto self-end pt-6 text-accent-text transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" size={40} strokeWidth={1.6} aria-hidden="true" />
              </Link>
            </li>
          ))}
        </ul>
      </Band>
    </>
  );
}
