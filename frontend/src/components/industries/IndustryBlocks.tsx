import Link from "next/link";
import { ArrowUpRight, ShieldCheck } from "lucide-react";

import type { ComplianceItem, SectorProblem, ServiceFit, TechGroupLink } from "@/content/industries";
import { routes, sectors, serviceBySlug } from "@/content/taxonomy";
import type { CaseStudy, CaseStudyDetail, SectorSlug } from "@/content/types";
import { ScreenMock } from "@/components/sections/CaseStudies";
import { ArrowLink } from "@/components/ui/Button";
import { DemoBadge } from "@/components/ui/DemoBadge";
import { Icon } from "@/components/ui/Icon";
import { IllustrativeTag } from "@/components/ui/IllustrativeTag";

import { SectorVisual } from "./SectorVisual";
import type { ServiceTabItem } from "./ServiceTabs";

type Vars = React.CSSProperties & Record<`--${string}`, string>;

/** Resolves service slugs to labels, icons and links for <ServiceTabs>. */
export function toServiceTabs(fits: ServiceFit[]): ServiceTabItem[] {
  return fits.map((f) => {
    const s = serviceBySlug(f.service);
    return { label: s.label, icon: s.icon, href: routes.service(f.service), headline: f.headline, description: f.description, points: f.points };
  });
}

/* ------------------------------------------------------------------ */

/** Rich sector tiles: an animated scene, the name, a line and a few chips. */
export function SectorTiles({ items, columns = 3 }: { items: { slug: SectorSlug; highlights?: string[] }[]; columns?: 2 | 3 }) {
  return (
    <ul className={`grid border-t border-border sm:grid-cols-2 ${columns === 3 ? "lg:grid-cols-3" : ""}`}>
      {items.map((item, i) => {
        const s = sectors.find((x) => x.slug === item.slug)!;
        return (
          <li key={s.slug} data-reveal style={{ "--reveal-delay": `${(i % columns) * 80}ms` } as Vars} className="border-b border-border sm:border-r">
            <Link href={routes.industry(s.slug)} data-glow data-cursor="Explore" className="group flex h-full flex-col transition-colors hover:bg-surface">
              <div className="relative overflow-hidden border-b border-border bg-[radial-gradient(var(--border)_1px,transparent_1px)] p-5 pt-16 [background-size:16px_16px]">
                <div className="transition-transform duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)] group-hover:scale-[1.04]">
                  <SectorVisual sector={s.slug} />
                </div>
                <span aria-hidden="true" className="pointer-events-none absolute bottom-1 right-3">
                  <IllustrativeTag />
                </span>
                <span className="absolute left-4 top-4 inline-flex size-10 items-center justify-center rounded-md bg-accent text-accent-fg shadow-lg transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110">
                  <Icon name={s.icon} className="size-5" />
                </span>
              </div>
              <div className="flex flex-1 flex-col p-7 lg:p-8">
                <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-subtle">{String(sectors.indexOf(s) + 1).padStart(2, "0")} / Industry</p>
                <h3 className="mt-3 text-2xl font-semibold tracking-[-0.02em] text-fg">{s.label}</h3>
                <p className="mt-2 text-muted">{s.short}</p>
                {item.highlights && (
                  <ul className="mt-5 flex flex-wrap gap-2">
                    {item.highlights.map((h) => (
                      <li key={h} className="rounded-sm bg-surface-2 px-2.5 py-1 text-xs text-fg">
                        {h}
                      </li>
                    ))}
                  </ul>
                )}
                <span className="mt-auto flex items-center justify-end gap-1 pt-6 text-sm font-semibold text-accent-text">
                  See {s.label}
                  <ArrowUpRight className="size-5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
                </span>
              </div>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

/* ------------------------------------------------------------------ */

/** Six sector icons orbiting a VAUG core. Each icon links to its sector; hovering pauses the orbit. */
export function IndustryOrbit() {
  return (
    <div className="ind-orbit-wrap relative mx-auto aspect-square w-full max-w-[26rem] [container-type:inline-size]">
      <div aria-hidden="true" className="absolute inset-[12%] rounded-full border border-dashed border-border-strong" />
      <div aria-hidden="true" className="absolute inset-[26%] rounded-full border border-border" />
      <div aria-hidden="true" className="absolute inset-[26%] rounded-full bg-[conic-gradient(from_0deg,transparent,var(--accent-soft),transparent_40%)] ind-orbit" style={{ "--orbit": "9s" } as Vars} />

      {/* core */}
      <div className="absolute inset-[34%] flex flex-col items-center justify-center rounded-full bg-purple text-center text-white shadow-[0_0_80px_-10px_#7c3aed]">
        <span aria-hidden="true" className="absolute inset-0 rounded-full border-2 border-purple ind-ping-ring" />
        <span className="text-[9cqw] font-black leading-none tracking-[-0.06em]">6</span>
        <span className="mt-1 font-mono text-[2.6cqw] uppercase tracking-[0.2em] text-white/80">sectors</span>
      </div>

      {/* orbiting sectors */}
      <ul className="ind-orbit absolute inset-0" style={{ "--orbit": "60s" } as Vars}>
        {sectors.map((s, i) => {
          const angle = (360 / sectors.length) * i;
          return (
            <li key={s.slug} className="absolute left-1/2 top-1/2" style={{ transform: `rotate(${angle}deg) translateY(-38cqw) rotate(${-angle}deg)` }}>
              <div className="ind-orbit-counter origin-top-left" style={{ "--orbit": "60s" } as Vars}>
                <Link
                  href={routes.industry(s.slug)}
                  aria-label={s.label}
                  className="glass group flex -translate-x-1/2 -translate-y-1/2 items-center gap-2 rounded-full py-1.5 pl-1.5 pr-3 text-fg transition-transform duration-300 hover:scale-110"
                >
                  <span className="inline-flex size-8 items-center justify-center rounded-full bg-accent text-accent-fg">
                    <Icon name={s.icon} className="size-4" />
                  </span>
                  <span className="whitespace-nowrap text-xs font-semibold max-sm:hidden">{s.label.split(" & ")[0]}</span>
                </Link>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

/* ------------------------------------------------------------------ */

/** Problem cards: the problem on top, the fix pinned to the bottom of every card so a row lines up. */
export function ProblemCards({ problems }: { problems: SectorProblem[] }) {
  return (
    <ul className="grid border-t border-border sm:grid-cols-2 lg:grid-cols-3">
      {problems.map((p, i) => (
        <li key={p.title} data-reveal style={{ "--reveal-delay": `${(i % 3) * 70}ms` } as Vars} className="border-b border-border sm:border-r">
          <div data-glow className="group relative flex h-full flex-col p-8 lg:p-10">
            <span className="font-mono text-sm text-accent-text">{String(i + 1).padStart(2, "0")}</span>
            <h3 className="mt-5 text-xl font-semibold leading-snug tracking-[-0.02em] text-fg">{p.title}</h3>
            <p className="mt-3 leading-relaxed text-muted">{p.description}</p>

            <div className="mt-auto pt-6 lg:pt-8">
              <div className="rounded-md bg-accent-soft p-4 transition-colors duration-300 lg:-mx-10 lg:-mb-10 lg:rounded-none lg:bg-accent lg:px-10 lg:py-7">
                <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-accent-text lg:text-accent-fg">How we fix it</p>
                <p className="mt-2 leading-relaxed text-fg lg:mt-3 lg:text-lg lg:font-medium lg:text-accent-fg">{p.fix}</p>
              </div>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}

/* ------------------------------------------------------------------ */

/** Standards we build to, each with a shield that draws itself in. */
export function ComplianceGrid({ items }: { items: ComplianceItem[] }) {
  return (
    <>
      <ul className="grid border-t border-border sm:grid-cols-2 lg:grid-cols-3">
        {items.map((c, i) => (
          <li key={c.name} data-reveal style={{ "--reveal-delay": `${(i % 3) * 70}ms` } as Vars} className="border-b border-border sm:border-r">
            <div data-glow className="group flex h-full gap-5 p-8 lg:p-10">
              <svg viewBox="0 0 48 56" className="draw h-14 w-12 shrink-0 text-accent-text" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" data-reveal aria-hidden="true">
                <path pathLength={1} d="M24 3 L44 11 V27 C44 40 35 49 24 53 C13 49 4 40 4 27 V11 Z" fill="var(--accent-soft)" />
                <path pathLength={1} d="M15 28 L22 35 L34 21" className="transition-transform duration-500 group-hover:scale-110" style={{ transformOrigin: "24px 28px" }} />
              </svg>
              <div>
                <p className="inline-flex rounded-sm bg-surface-2 px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.15em] text-muted">{c.scope}</p>
                <h3 className="mt-3 text-lg font-semibold text-fg">{c.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{c.description}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <div className="frame-pad flex flex-col gap-4 pt-10 sm:flex-row sm:items-center sm:justify-between">
        <p className="flex max-w-2xl items-start gap-3 text-sm leading-relaxed text-muted">
          <ShieldCheck className="mt-0.5 size-5 shrink-0 text-accent-text" aria-hidden="true" />
          We design and build to these standards and work inside your compliance process. We don&apos;t claim certifications we don&apos;t hold, and we&apos;ll tell you early if one is required.
        </p>
        <ArrowLink href={routes.security} variant="outline" className="shrink-0">
          Security & compliance
        </ArrowLink>
      </div>
    </>
  );
}

/* ------------------------------------------------------------------ */

/** One case study, shown large: the product mock, the story in brief and its numbers. */
export function CaseSpotlight({ study, eyebrow = "Featured case study" }: { study: CaseStudyDetail | CaseStudy; eyebrow?: string }) {
  const detail = "techStack" in study ? study : undefined;
  return (
    <div className="grid border-t border-border lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)]">
      <Link href={routes.caseStudy(study.slug)} data-cursor="View case" aria-label={`Read the case study: ${study.title}`} className="group block min-h-[18rem] overflow-hidden border-b border-border sm:min-h-[22rem] lg:border-r">
        <div className="h-full transition-transform duration-700 group-hover:scale-[1.02]">
          <ScreenMock study={study} />
        </div>
      </Link>
      <div className="flex flex-col border-b border-border p-8 sm:p-10 lg:p-12">
        <p className="flex flex-wrap items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-accent-text">
          {eyebrow}
          <DemoBadge show={study.placeholder} />
        </p>
        <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.15em] text-subtle">
          {study.industry} · {study.city} · {study.model}
        </p>
        <h3 className="mt-3 text-2xl font-semibold leading-tight tracking-[-0.02em] text-fg sm:text-3xl">{study.title}</h3>
        <p className="mt-4 leading-relaxed text-muted">{study.summary}</p>
        <dl className="mt-8 grid grid-cols-3 gap-4 border-y border-border py-6">
          {study.metrics.slice(0, 3).map((m, i) => (
            <div key={m.label} data-reveal style={{ "--reveal-delay": `${i * 90}ms` } as Vars}>
              <dt className="sr-only">{m.label}</dt>
              <dd>
                <span className="block text-2xl font-semibold tracking-[-0.03em] text-fg sm:text-3xl">{m.value}</span>
                <span className="mt-1 block text-xs leading-snug text-muted sm:text-sm">{m.label}</span>
              </dd>
            </div>
          ))}
        </dl>
        {detail && (
          <ul className="mt-6 flex flex-wrap gap-2">
            {[detail.duration, detail.team, ...detail.techStack.slice(0, 3)].filter(Boolean).map((t) => (
              <li key={t} className="rounded-sm bg-surface-2 px-2.5 py-1 text-xs text-fg">
                {t}
              </li>
            ))}
          </ul>
        )}
        <div className="mt-8 flex flex-wrap gap-3 lg:mt-auto lg:pt-8">
          <ArrowLink href={routes.caseStudy(study.slug)}>Read the case study</ArrowLink>
          {detail && (
            <ArrowLink href={routes.service(detail.service)} variant="outline">
              {serviceBySlug(detail.service).label}
            </ArrowLink>
          )}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */

/** Technology groups whose headings link to the engineering page that covers them. */
export function TechLinks({ groups }: { groups: TechGroupLink[] }) {
  return (
    <ul className="grid border-t border-border sm:grid-cols-2 lg:grid-cols-3">
      {groups.map((g, gi) => (
        <li key={g.label} data-reveal style={{ "--reveal-delay": `${gi * 70}ms` } as Vars} className="border-b border-border sm:border-r">
          <Link href={routes.engineeringPage(g.engineering)} data-glow className="group flex h-full flex-col p-8 transition-colors hover:bg-surface lg:p-10">
            <span className="flex items-center justify-between font-mono text-xs uppercase tracking-[0.2em] text-accent-text">
              {g.label}
              <ArrowUpRight className="size-5 text-muted transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent-text" aria-hidden="true" />
            </span>
            <ul className="mt-6 flex flex-wrap gap-2">
              {g.items.map((t, i) => (
                <li key={t} className="rounded-sm bg-surface-2 px-3 py-1.5 text-sm text-fg transition-transform duration-300 group-hover:-translate-y-0.5" style={{ transitionDelay: `${i * 40}ms` }}>
                  {t}
                </li>
              ))}
            </ul>
          </Link>
        </li>
      ))}
    </ul>
  );
}

/** Light lead + bold ending, for passing into section titles (no extra heading element). */
export function Split({ title }: { title: { light: string; bold: string } }) {
  return (
    <>
      <span className="font-light">{title.light}</span> <span className="font-semibold">{title.bold}</span>
    </>
  );
}
