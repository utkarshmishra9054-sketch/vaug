import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import type { AudiencePage, JourneyStage } from "@/content/audiences";
import { audiences, routes } from "@/content/taxonomy";
import type { AudienceSlug } from "@/content/types";
import { Icon } from "@/components/ui/Icon";
import { IllustrativeTag } from "@/components/ui/IllustrativeTag";

import { AudienceVisual } from "./AudienceVisual";

type Vars = React.CSSProperties & Record<`--${string}`, string>;

/** Audience tiles with an animated scene each. */
export function AudienceTiles({ items }: { items: { slug: AudienceSlug; promise?: string }[] }) {
  return (
    <ul className={`grid border-t border-border sm:grid-cols-2 ${items.length === 3 ? "lg:grid-cols-3" : ""}`}>
      {items.map((item, i) => {
        const a = audiences.find((x) => x.slug === item.slug)!;
        return (
          <li key={a.slug} data-reveal style={{ "--reveal-delay": `${(i % 2) * 90}ms` } as Vars} className="border-b border-border sm:border-r">
            <Link href={routes.audience(a.slug)} data-glow data-cursor="Explore" className="group flex h-full flex-col transition-colors hover:bg-surface">
              <div className="relative overflow-hidden border-b border-border bg-[radial-gradient(var(--border)_1px,transparent_1px)] p-5 [background-size:16px_16px] sm:p-8">
                <div className="mx-auto max-w-md transition-transform duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)] group-hover:scale-[1.04]">
                  <AudienceVisual audience={a.slug} />
                </div>
                <span aria-hidden="true" className="pointer-events-none absolute bottom-1 right-3 sm:bottom-2 sm:right-4">
                  <IllustrativeTag />
                </span>
              </div>
              <div className="flex flex-1 flex-col p-7 lg:p-10">
                <span className="inline-flex size-11 items-center justify-center rounded-md bg-accent-soft text-accent-text transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110">
                  <Icon name={a.icon} className="size-5" />
                </span>
                <h3 className="mt-6 text-2xl font-semibold tracking-[-0.02em] text-fg sm:text-3xl">{a.label}</h3>
                <p className="mt-2 text-muted">{a.short}</p>
                {item.promise && <p className="mt-4 text-lg font-medium text-fg"><span className="mark">{item.promise}</span></p>}
                <span className="mt-auto flex items-center justify-end gap-1 pt-6 text-sm font-semibold text-accent-text">
                  Read more
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

/** How engagements differ by audience: first step, usual model, key term. */
export function AudienceCompare({ pages }: { pages: AudiencePage[] }) {
  const cols = ["First step", "Usual model", "What matters most"] as const;
  return (
    <div className="border-t border-border">
      <div aria-hidden="true" className="hidden grid-cols-[1.2fr_1fr_1fr_1fr_auto] border-b border-border bg-surface font-mono text-[11px] uppercase tracking-[0.18em] text-subtle lg:grid">
        <span className="px-10 py-4">Who</span>
        {cols.map((c) => (
          <span key={c} className="border-l border-border px-6 py-4">
            {c}
          </span>
        ))}
        <span className="w-16" />
      </div>
      <ul>
        {pages.map((p, i) => {
          const a = audiences.find((x) => x.slug === p.slug)!;
          const values = [p.snapshot.firstStep, p.snapshot.usualModel, p.snapshot.keyTerm];
          return (
            <li key={p.slug} data-reveal style={{ "--reveal-delay": `${i * 70}ms` } as Vars} className="border-b border-border">
              <Link href={routes.audience(p.slug)} data-glow className="group grid transition-colors hover:bg-surface lg:grid-cols-[1.2fr_1fr_1fr_1fr_auto]">
                <span className="frame-pad flex items-center gap-4 pt-7 lg:px-10 lg:py-7">
                  <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-md bg-accent text-accent-fg transition-transform duration-500 group-hover:-rotate-6">
                    <Icon name={a.icon} className="size-5" />
                  </span>
                  <span className="text-lg font-semibold text-fg">{a.label}</span>
                </span>
                {values.map((v, vi) => (
                  <span key={cols[vi]} className="frame-pad flex flex-col justify-center pt-3 lg:border-l lg:border-border lg:px-6 lg:py-7">
                    <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-subtle lg:hidden">{cols[vi]}</span>
                    <span className="text-muted group-hover:text-fg">{v}</span>
                  </span>
                ))}
                <span className="frame-pad flex items-center justify-end pb-7 pt-2 lg:w-16 lg:px-0 lg:py-7 lg:pr-6">
                  <ArrowUpRight className="size-6 text-accent-text transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

/**
 * Journey timeline. A rail draws itself across (down, on phones) when it
 * scrolls into view, and each stage's node pulses in turn.
 */
export function Journey({ stages }: { stages: JourneyStage[] }) {
  return (
    <div data-reveal className="aud-journey relative border-t border-border">
      {/* rails */}
      <span aria-hidden="true" className="aud-rail-x absolute left-0 right-0 top-[4.25rem] hidden h-0.5 bg-gradient-to-r from-accent via-accent-text to-yellow lg:block" />
      <span aria-hidden="true" className="aud-rail-y absolute bottom-10 left-[calc(1rem+1.25rem)] top-10 w-0.5 bg-gradient-to-b from-accent via-accent-text to-yellow sm:left-[calc(2rem+1.25rem)] lg:hidden" />
      <ol className="relative grid lg:grid-cols-4">
        {stages.map((s, i) => (
          <li key={s.stage} className="aud-stage relative flex gap-6 py-8 pl-4 pr-4 sm:pl-8 sm:pr-8 lg:flex-col lg:gap-0 lg:border-r lg:border-border lg:px-8 lg:pb-10 lg:pt-12 lg:last:border-r-0" style={{ "--i": String(i) } as Vars}>
            <span className="relative z-10 flex size-10 shrink-0 items-center justify-center rounded-full border-2 border-accent-text bg-bg font-mono text-sm font-semibold text-fg">
              <span aria-hidden="true" className="aud-node-pulse absolute inset-0 rounded-full bg-accent" style={{ "--d": `${i * 0.8}s` } as Vars} />
              <span className="relative">{String(i + 1).padStart(2, "0")}</span>
            </span>
            <div className="min-w-0 lg:mt-8">
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-subtle">{s.when}</p>
              <h3 className="mt-2 text-2xl font-semibold tracking-[-0.02em] text-fg">{s.stage}</h3>
              <p className="mt-3 leading-relaxed text-muted">{s.description}</p>
              <p className="mt-5 rounded-md border border-border bg-surface p-4 text-sm text-fg">
                <span className="block font-mono text-[10px] uppercase tracking-[0.18em] text-accent-text">You get</span>
                <span className="mt-1 block">{s.outcome}</span>
              </p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}

/** Hero aside for the index: one compact card per audience with its promise (text only, so it stays readable on phones). */
export function AudienceHeroCards({ pages }: { pages: AudiencePage[] }) {
  return (
    <ul className="grid grid-cols-2 gap-3">
      {pages.map((p, i) => {
        const a = audiences.find((x) => x.slug === p.slug)!;
        return (
          <li key={p.slug} className={i % 2 ? "sm:translate-y-6" : ""}>
            <Link
              href={routes.audience(p.slug)}
              data-tilt
              className="group flex h-full flex-col rounded-lg border border-border-strong bg-surface p-4 sm:p-5 transition-colors hover:border-accent-text"
            >
              <span className="flex items-center justify-between">
                <span className="inline-flex size-10 items-center justify-center rounded-md bg-accent text-accent-fg transition-transform duration-500 group-hover:-rotate-6">
                  <Icon name={a.icon} className="size-5" />
                </span>
                <ArrowUpRight className="size-5 text-muted transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent-text" aria-hidden="true" />
              </span>
              <span className="mt-5 block font-mono text-[10px] uppercase tracking-[0.18em] text-subtle">{String(i + 1).padStart(2, "0")} / Audience</span>
              <span className="mt-1 block text-base font-semibold leading-snug text-fg sm:text-lg">{a.label}</span>
              <span className="mb-4 mt-2 block text-[13px] leading-relaxed text-muted sm:text-sm">{p.promise}</span>
              <span className="mt-auto inline-flex self-start rounded-sm bg-accent-soft px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.12em] text-accent-text">{p.snapshot.keyTerm}</span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
