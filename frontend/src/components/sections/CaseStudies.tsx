"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";

import type { CaseStudy } from "@/content/types";
import { DemoBadge } from "@/components/ui/DemoBadge";
import { Icon } from "@/components/ui/Icon";
import { MockScene, MockTag, type MockStudy } from "@/components/sections/ScreenMockParts";

/**
 * Product mock for each case study: a bespoke, domain-specific product scene
 * per study (exception queue, quote flow, booking app, chat agent, website,
 * map...) in varied device frames, on the study's tint. Devices straighten or
 * lift on hover. Scenes are fixed design canvases scaled to fit (see
 * `.mock2-stage` in globals.css); `compact` (and any box under 600px wide)
 * uses the simpler narrow composition.
 */
export function ScreenMock({ study, compact = false }: { study: MockStudy; compact?: boolean }) {
  const tint = study.tint;
  return (
    <div
      className="mock2-root relative h-full overflow-hidden"
      style={{ background: `radial-gradient(120% 90% at 85% 0%, rgb(255 255 255 / 0.18), transparent 55%), linear-gradient(160deg, ${tint}, color-mix(in oklab, ${tint} 70%, #000))` }}
    >
      <div className="absolute inset-0 bg-[radial-gradient(rgb(255_255_255/0.12)_1px,transparent_1px)] [background-size:18px_18px] [mask-image:linear-gradient(to_bottom,#000,transparent_85%)]" aria-hidden="true" />
      <div className="absolute -bottom-32 -left-20 size-80 rounded-full bg-black/20 blur-3xl" aria-hidden="true" />

      {!compact && <MockScene study={study} v="wide" />}
      <MockScene study={study} v="narrow" alt={!compact} />

      <MockTag />
    </div>
  );
}

export function CaseStudies({ studies }: { studies: CaseStudy[] }) {
  const industries = useMemo(() => ["Featured", ...new Set(studies.map((s) => s.industry))], [studies]);
  const [filter, setFilter] = useState("Featured");
  const list = filter === "Featured" ? studies : studies.filter((s) => s.industry === filter);
  const [index, setIndex] = useState(0);
  const current = list[Math.min(index, list.length - 1)];

  const choose = (f: string) => {
    setFilter(f);
    setIndex(0);
  };
  const go = (dir: number) => setIndex((i) => (i + dir + list.length) % list.length);

  if (!current) return null;

  return (
    <div>
      {/* Filters */}
      <div data-reveal className="no-scrollbar frame-pad flex gap-3 overflow-x-auto pb-10">
        {industries.map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => choose(f)}
            aria-pressed={filter === f}
            className={`shrink-0 rounded-md border px-4 py-2.5 text-base transition-colors sm:text-lg ${
              filter === f ? "border-border-strong bg-surface text-accent-text" : "border-transparent bg-surface-2 text-fg hover:bg-surface"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Card */}
      <article key={`${filter}-${current.slug}`} data-cursor="View case" className="group animate-[fade-up_0.6s_cubic-bezier(0.2,0.7,0.2,1)] border-y border-border">
        <div className="grid lg:grid-cols-2">
          <div className="h-72 sm:h-96 lg:h-auto lg:min-h-[26rem]">
            <ScreenMock study={current} />
          </div>
          <div data-glow className="flex flex-col bg-surface p-8 sm:p-12">
            <div className="flex items-center justify-between">
              <span className="inline-flex size-12 items-center justify-center rounded-md border border-border text-fg">
                <Icon name={current.icon} className="size-6" />
              </span>
              <DemoBadge show={current.placeholder} />
            </div>
            <p className="mt-8 font-mono text-xs uppercase tracking-widest text-subtle">
              {current.industry} · {current.city} · {current.stage}
            </p>
            <p className="mt-2 inline-flex self-start rounded-sm bg-surface-2 px-2.5 py-1 text-sm text-fg">{current.model}</p>
            <h3 className="mt-4 text-3xl font-semibold leading-tight tracking-[-0.03em] text-fg sm:text-4xl">
              <Link href={`/case-studies/${current.slug}`} className="hover:text-accent-text">
                {current.title}
              </Link>
            </h3>
            <p className="mt-5 text-lg leading-relaxed text-muted">{current.summary}</p>
            <Link href={`/case-studies/${current.slug}`} className="mt-auto flex items-center gap-2 self-end pt-8 font-semibold text-accent-text">
              Read the case study
              <ArrowUpRight className="size-7 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" aria-hidden="true" />
            </Link>
          </div>
        </div>
        <dl className="grid border-t border-border bg-surface sm:grid-cols-3">
          {current.metrics.map((m) => (
            <div key={m.label} className="border-border p-8 max-sm:border-b sm:border-r sm:last:border-r-0 sm:p-10">
              <dt className="sr-only">{m.label}</dt>
              <dd>
                <span className="block text-4xl font-semibold tracking-[-0.03em] text-fg">{m.value}</span>
                <span className="mt-2 block text-muted">{m.label}</span>
              </dd>
            </div>
          ))}
        </dl>
      </article>

      {/* Switcher */}
      {list.length > 1 && (
        <div className="flex flex-wrap items-center justify-center gap-3 px-4 py-10">
          <span className="w-full text-center font-mono text-xs tracking-[0.15em] text-muted sm:w-auto" aria-live="polite">
            <span className="text-fg">{String(Math.min(index, list.length - 1) + 1).padStart(2, "0")}</span> / {String(list.length).padStart(2, "0")}
          </span>
          <button type="button" onClick={() => go(-1)} aria-label="Previous case study" className="inline-flex size-11 items-center justify-center rounded-md text-fg transition hover:bg-surface-2">
            <ArrowLeft className="size-5" />
          </button>
          <div className="no-scrollbar flex max-w-full gap-1 overflow-x-auto rounded-md bg-surface-2 p-1.5">
            {list.map((s, i) => (
              <button
                key={s.slug}
                type="button"
                onClick={() => setIndex(i)}
                aria-current={i === index}
                className={`w-36 shrink-0 truncate rounded px-3 py-2 text-left text-sm transition-all sm:w-44 sm:text-base ${
                  i === index ? "bg-surface text-fg shadow-sm" : "text-muted hover:text-fg"
                }`}
              >
                {s.title}
              </button>
            ))}
          </div>
          <button type="button" onClick={() => go(1)} aria-label="Next case study" className="inline-flex size-11 items-center justify-center rounded-md text-fg transition hover:bg-surface-2">
            <ArrowRight className="size-5" />
          </button>
        </div>
      )}
    </div>
  );
}
