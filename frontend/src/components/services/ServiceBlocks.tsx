import Link from "next/link";
import { ArrowUpRight, Check, Clock, ShieldCheck } from "lucide-react";

import type { StartBlock } from "@/content/services";
import type { EngagementModel, Feature, IconName } from "@/content/types";
import { ArrowLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Illustration } from "@/components/ui/Illustration";

/* ------------------------------------------------------------------ */
/* Rich service cards (bento) for /services                            */
/* ------------------------------------------------------------------ */

/** Column spans for a 6-card bento: two wide, three regular, one full-width. */
const spans = ["lg:col-span-3", "lg:col-span-3", "lg:col-span-2", "lg:col-span-2", "lg:col-span-2", "lg:col-span-6"];

export function ServiceCards({ items }: { items: { href: string; icon: IconName; model: EngagementModel }[] }) {
  return (
    <ul className="grid border-t border-border md:grid-cols-2 lg:grid-cols-6">
      {items.map(({ href, icon, model }, i) => {
        const wide = i === items.length - 1;
        return (
          <li key={model.slug} data-reveal style={{ "--reveal-delay": `${(i % 3) * 80}ms` } as React.CSSProperties} className={`border-b border-border md:border-r ${spans[i] ?? "lg:col-span-2"}`}>
            <Link href={href} data-glow data-cursor="Explore" className={`group relative flex h-full flex-col overflow-hidden p-7 transition-colors duration-300 hover:bg-surface sm:p-9 ${wide ? "lg:flex-row lg:items-center lg:gap-12" : ""}`}>
              <div className={wide ? "pb-8 lg:flex-1 lg:pb-0" : "pb-8"}>
                <div className="flex items-center justify-between gap-4">
                  <span className="inline-flex size-12 items-center justify-center rounded-md bg-accent-soft text-accent-text transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110">
                    <Icon name={icon} className="size-6" />
                  </span>
                  <span className="flex items-center gap-2 font-mono text-xs text-subtle">
                    {String(i + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
                    <ArrowUpRight className="size-6 text-accent-text transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" aria-hidden="true" />
                  </span>
                </div>
                <h3 className="mt-8 text-2xl font-semibold tracking-[-0.02em] text-fg sm:text-3xl">{model.title}</h3>
                <p className="mt-3 max-w-xl leading-relaxed text-muted">{model.description}</p>
                <ul className="mt-6 flex flex-wrap gap-1.5">
                  {model.services.slice(0, wide ? 6 : 4).map((s) => (
                    <li key={s} className="rounded-sm bg-surface-2 px-2.5 py-1 text-xs text-fg">
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
              {(i < 2 || wide) && (
                <div className={`pointer-events-none mt-6 ${wide ? "lg:mt-0 lg:w-[34%]" : ""}`}>
                  <Illustration name={model.illustration} className="mx-auto w-full max-w-xs text-fg/70 transition-transform duration-700 group-hover:scale-105" />
                </div>
              )}
              <dl className={`mt-auto grid grid-cols-2 gap-4 border-t border-border pt-5 text-sm ${wide ? "lg:mt-0 lg:w-[26%] lg:grid-cols-1 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0" : ""}`}>
                <div>
                  <dt className="font-mono text-[11px] uppercase tracking-widest text-subtle">Best for</dt>
                  <dd className="mt-1 text-fg">{model.bestFor}</dd>
                </div>
                <div>
                  <dt className="font-mono text-[11px] uppercase tracking-widest text-subtle">Billing</dt>
                  <dd className="mt-1 text-fg">{model.pricing}</dd>
                </div>
              </dl>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

/* ------------------------------------------------------------------ */
/* How we start: three ways to begin, plus commitments (no prices)     */
/* ------------------------------------------------------------------ */

export function StartPaths({ start }: { start: StartBlock }) {
  return (
    <>
      <div className="relative border-t border-border">
        {/* a light travels along the steps (desktop) */}
        <div aria-hidden="true" className="svc-start-rail pointer-events-none absolute inset-x-0 top-[3.375rem] hidden h-px bg-border md:block lg:top-[3.875rem]">
          <span className="svc-start-runner absolute -top-[3.5px] size-2 rounded-full bg-accent-text shadow-[0_0_14px_var(--accent-text)]" />
        </div>
        <ol className="relative grid md:grid-cols-3">
          {start.options.map((o, i) => (
            <li key={o.name} data-reveal style={{ "--reveal-delay": `${i * 90}ms` } as React.CSSProperties} className="border-b border-border md:border-r md:last:border-r-0">
              <div data-glow className={`group relative flex h-full flex-col p-8 lg:p-10 ${o.highlight ? "bg-surface" : ""}`}>
                {o.highlight && <span aria-hidden="true" className="svc-shine absolute inset-x-0 top-0 h-1 bg-accent" />}
                <div className="flex items-center justify-between gap-3">
                  <span
                    className="svc-start-step relative z-10 inline-flex size-11 shrink-0 items-center justify-center rounded-full border border-border-strong bg-bg text-accent-text transition-colors duration-300 group-hover:bg-accent group-hover:text-accent-fg"
                    style={{ "--step-delay": `${i * 2}s` } as React.CSSProperties}
                  >
                    <Icon name={o.icon} className="size-5" />
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-sm bg-surface-2 px-2 py-1 font-mono text-[11px] text-muted">
                    <Clock className="size-3 text-accent-text" aria-hidden="true" />
                    {o.timeline}
                  </span>
                </div>
                <p className="mt-8 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-accent-text">
                  Step {String(i + 1).padStart(2, "0")}
                  {o.highlight && <span className="rounded-sm bg-accent px-2 py-0.5 text-[10px] font-bold tracking-wider text-accent-fg">Where most start</span>}
                </p>
                <h3 className="mt-3 text-2xl font-semibold tracking-[-0.02em] text-fg">{o.name}</h3>
                <p className="mt-3 leading-relaxed text-muted">{o.what}</p>
                <p className="mt-8 border-t border-border pt-6 font-mono text-[11px] uppercase tracking-widest text-subtle">What you get</p>
                <ul className="mt-4 flex flex-col gap-3">
                  {o.get.map((g) => (
                    <li key={g} className="flex items-start gap-3 text-sm text-fg">
                      <span className="mt-0.5 inline-flex size-4 shrink-0 items-center justify-center rounded-full bg-accent-soft text-accent-text">
                        <Check className="size-3" aria-hidden="true" />
                      </span>
                      {g}
                    </li>
                  ))}
                </ul>
                <div className="mt-auto pt-10">
                  <ArrowLink href="#contact" variant={o.highlight ? "solid" : "outline"}>
                    Get a tailored proposal
                  </ArrowLink>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
      <ul className="frame-pad flex flex-wrap gap-2 pt-10" aria-label="Our commitments">
        {start.commitments.map((c, i) => (
          <li
            key={c}
            className="svc-promise inline-flex items-center gap-2 rounded-md border border-border px-3 py-2 text-sm text-fg"
            style={{ "--promise-delay": `${i * 1.5}s` } as React.CSSProperties}
          >
            <ShieldCheck className="size-4 shrink-0 text-accent-text" aria-hidden="true" />
            {c}
          </li>
        ))}
      </ul>
    </>
  );
}

/* ------------------------------------------------------------------ */
/* Deliverables checklist                                              */
/* ------------------------------------------------------------------ */

export function Deliverables({ items }: { items: string[] }) {
  return (
    <ol className="grid border-t border-border sm:grid-cols-2 lg:grid-cols-4">
      {items.map((item, i) => (
        <li key={item} data-reveal style={{ "--reveal-delay": `${(i % 4) * 70}ms` } as React.CSSProperties} className="group flex items-start gap-4 border-b border-border p-6 sm:border-r lg:p-8">
          <span className="svc-check inline-flex size-8 shrink-0 items-center justify-center rounded-md border border-border text-accent-text transition-colors duration-300 group-hover:bg-accent group-hover:text-accent-fg">
            <Check className="size-4" aria-hidden="true" />
          </span>
          <span>
            <span className="block font-mono text-[11px] text-subtle">{String(i + 1).padStart(2, "0")}</span>
            <span className="mt-1 block font-medium leading-snug text-fg">{item}</span>
          </span>
        </li>
      ))}
    </ol>
  );
}

/* ------------------------------------------------------------------ */
/* Process timeline that draws itself                                  */
/* ------------------------------------------------------------------ */

export function ProcessTimeline({ steps }: { steps: Feature[] }) {
  return (
    <div className="relative border-t border-border">
      {/* connecting rail (desktop: horizontal, mobile: vertical) */}
      <div aria-hidden="true" data-reveal className="svc-rail pointer-events-none absolute left-[2.625rem] top-0 h-full w-px bg-border sm:left-[3.375rem] lg:left-0 lg:top-[3.875rem] lg:h-px lg:w-full">
        <span className="svc-rail-fill absolute inset-0 bg-accent-text" />
        <span className="svc-runner absolute size-2 rounded-full bg-accent-text shadow-[0_0_14px_var(--accent-text)]" />
      </div>
      <ol className="relative grid lg:grid-flow-col lg:auto-cols-fr">
        {steps.map((s, i) => (
          <li key={s.title} data-reveal style={{ "--reveal-delay": `${i * 110}ms` } as React.CSSProperties} className="group relative flex gap-5 border-b border-border px-5 py-8 sm:px-8 lg:flex-col lg:gap-0 lg:border-b-0 lg:border-r lg:px-8 lg:py-10 lg:last:border-r-0">
            <span className="relative z-10 inline-flex size-11 shrink-0 items-center justify-center rounded-full border border-border-strong bg-bg text-accent-text transition-all duration-300 group-hover:scale-110 group-hover:bg-accent group-hover:text-accent-fg">
              {s.icon ? <Icon name={s.icon} className="size-5" /> : <span className="font-mono text-sm">{i + 1}</span>}
            </span>
            <div className="lg:mt-8">
              {s.meta && <p className="font-mono text-xs uppercase tracking-[0.15em] text-accent-text">{s.meta}</p>}
              <h3 className="mt-2 text-lg font-semibold text-fg">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{s.description}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Hero facts strip                                                    */
/* ------------------------------------------------------------------ */

export function FactStrip({ facts }: { facts: { value: string; label: string }[] }) {
  return (
    <dl className={`grid border-t border-border sm:grid-cols-2 ${facts.length >= 4 ? "lg:grid-cols-4" : "lg:grid-cols-3"}`}>
      {facts.map((f, i) => (
        <div key={f.label} data-reveal style={{ "--reveal-delay": `${i * 80}ms` } as React.CSSProperties} className="border-b border-border px-6 py-8 sm:border-r lg:px-10">
          <dt className="sr-only">{f.label}</dt>
          <dd>
            <span className="block text-3xl font-semibold tracking-[-0.03em] text-fg sm:text-4xl">{f.value}</span>
            <span className="mt-2 block text-sm text-muted">{f.label}</span>
          </dd>
        </div>
      ))}
    </dl>
  );
}

/* ------------------------------------------------------------------ */
/* Services hero visual: six linked tiles with a travelling highlight  */
/* ------------------------------------------------------------------ */

export function ServiceConstellation({ items }: { items: { label: string; short: string; href: string; icon: IconName }[] }) {
  return (
    <div className="relative mx-auto w-full max-w-md">
      <div aria-hidden="true" className="absolute left-1/2 top-1/2 size-40 -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple/30 blur-3xl" />
      <ul className="relative grid grid-cols-2 gap-3 sm:grid-cols-3">
        {items.map((s, i) => (
          <li key={s.href}>
            <Link
              href={s.href}
              data-tilt
              className="svc-tile group relative flex aspect-square flex-col justify-between overflow-hidden rounded-lg border border-border bg-surface/80 p-3.5 backdrop-blur transition-colors hover:border-accent-text sm:p-4"
              style={{ "--tile-delay": `${i * 1}s` } as React.CSSProperties}
            >
              <span className="inline-flex size-9 items-center justify-center rounded-md bg-accent-soft text-accent-text transition-colors group-hover:bg-accent group-hover:text-accent-fg">
                <Icon name={s.icon} className="size-5" />
              </span>
              <span className="text-[13px] font-semibold leading-tight text-fg sm:text-sm">{s.label}</span>
              <ArrowUpRight className="absolute right-3 top-3 size-4 text-subtle transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent-text" aria-hidden="true" />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
