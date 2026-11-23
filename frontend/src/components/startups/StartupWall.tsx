"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ArrowRight, ArrowUpRight } from "lucide-react";

import { startupStudyHref, startups, type Startup, type StartupRegion } from "@/content/startups";

/** The startup's logo as it appears on its own site, on a plate of the site's header colour. */
export function StartupPlate({ s, className = "", decorative = false }: { s: Startup; className?: string; decorative?: boolean }) {
  return (
    <span aria-hidden={decorative || undefined} className={`flex items-center justify-center overflow-hidden rounded-lg px-3 ring-1 ring-black/[0.06] ${className}`} style={{ background: s.logo?.bg ?? "var(--surface-2)" }}>
      {s.logo ? (
        <Image
          src={s.logo.src}
          alt={decorative ? "" : `${s.name} logo`}
          width={s.logo.w}
          height={s.logo.h}
          sizes="200px"
          className={`h-auto w-auto object-contain ${s.logo.w / s.logo.h > 6 ? "max-h-[70%] max-w-[94%]" : "max-h-[62%] max-w-[86%]"}`}
        />
      ) : (
        // No logo on the site: the name in type, first part only so it fits a small plate.
        <span className="text-center text-[13px] font-bold leading-tight tracking-[-0.02em] text-fg sm:text-base">{s.name.split(" · ")[0]}</span>
      )}
    </span>
  );
}

const FILTERS: ("All" | StartupRegion)[] = ["All", "India", "UK", "Rest of the world"];

/** Every startup as a card: logo, where, sector, what we built, live site and case study. */
export function StartupWall() {
  const [region, setRegion] = useState<"All" | StartupRegion>("All");
  const list = region === "All" ? startups : startups.filter((s) => s.region === region);
  const count = (r: "All" | StartupRegion) => (r === "All" ? startups.length : startups.filter((s) => s.region === r).length);

  return (
    <div className="frame-pad pb-16">
      <div role="group" aria-label="Filter startups by region" className="flex flex-wrap gap-2">
        {FILTERS.map((f) => (
          <button
            key={f}
            type="button"
            aria-pressed={region === f}
            onClick={() => setRegion(f)}
            className={`min-h-10 rounded-full border px-4 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${region === f ? "border-fg bg-fg text-bg" : "border-border text-muted hover:text-fg"}`}
          >
            {f} <span className="ml-1 opacity-75">{count(f)}</span>
          </button>
        ))}
      </div>
      <p role="status" className="sr-only">
        {list.length} startups shown
      </p>
      <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {list.map((s) => {
          const study = startupStudyHref(s);
          return (
            <li key={s.slug} className="flex gap-4 rounded-xl border border-border bg-surface p-4 sm:flex-col">
              <StartupPlate s={s} decorative className="h-16 w-28 shrink-0 sm:h-20 sm:w-full" />
              <div className="flex min-w-0 flex-1 flex-col">
                <h3 className="font-semibold leading-snug text-fg">{s.name}</h3>
                <p className="mt-0.5 text-xs text-muted">
                  {s.country} · {s.sector}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-muted">{s.built}</p>
                <div className="mt-auto flex flex-wrap gap-x-4 gap-y-1 pt-3 text-sm">
                  {s.url && (
                    <a href={s.url} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-6 items-center gap-1 font-medium text-accent-text underline-offset-4 hover:underline">
                      Live site <ArrowUpRight className="size-3.5" aria-hidden="true" />
                      <span className="sr-only">: {s.name} (opens in a new tab)</span>
                    </a>
                  )}
                  {study && (
                    <Link href={study} className="inline-flex min-h-6 items-center gap-1 font-medium text-fg underline-offset-4 hover:underline">
                      Case study <ArrowRight className="size-3.5" aria-hidden="true" />
                      <span className="sr-only">: {s.name}</span>
                    </Link>
                  )}
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
