import Link from "next/link";
import { ViewTransition } from "react";
import { ArrowUpRight } from "lucide-react";

import type { CaseStudy } from "@/content/types";
import { routes } from "@/content/taxonomy";
import { ScreenMock } from "@/components/sections/CaseStudies";
import { DemoBadge } from "@/components/ui/DemoBadge";

/** Card used on the case study listing and in "related work" rows. */
export function CaseStudyCard({ study }: { study: CaseStudy }) {
  return (
    <Link href={routes.caseStudy(study.slug)} data-cursor="View case" className="group flex h-full flex-col border-b border-border bg-surface transition-colors sm:border-r">
      <div className="h-60 overflow-hidden sm:h-64">
        <ViewTransition name={`case-${study.slug}`} share="case-morph" default="none">
          <div className="h-full transition-transform duration-700 group-hover:scale-[1.03]">
            <ScreenMock study={study} compact />
          </div>
        </ViewTransition>
      </div>
      <div className="flex flex-1 flex-col p-7 lg:p-8">
        <p className="flex flex-wrap items-center gap-2 font-mono text-[11px] uppercase tracking-[0.15em] text-subtle">
          {study.industry} · {study.city}
          <DemoBadge show={study.placeholder} />
        </p>
        <p className="mt-3 inline-flex self-start rounded-sm bg-surface-2 px-2.5 py-1 text-sm text-fg">{study.model}</p>
        <h3 className="mt-4 text-xl font-semibold leading-snug tracking-[-0.02em] text-fg">{study.title}</h3>
        <p className="mt-3 line-clamp-3 text-muted">{study.summary}</p>
        <dl className="mt-6 grid grid-cols-3 gap-3 border-t border-border pt-5">
          {study.metrics.slice(0, 3).map((m) => (
            <div key={m.label}>
              <dt className="sr-only">{m.label}</dt>
              <dd>
                <span className="block text-lg font-semibold text-fg">{m.value}</span>
                <span className="mt-1 block text-xs leading-snug text-muted">{m.label}</span>
              </dd>
            </div>
          ))}
        </dl>
        <span className="mt-auto flex items-center justify-end gap-1 pt-6 text-sm font-semibold text-accent-text">
          Read case study
          <ArrowUpRight className="size-5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
        </span>
      </div>
    </Link>
  );
}

export function CaseStudyGrid({ studies, columns = 3 }: { studies: CaseStudy[]; columns?: 2 | 3 }) {
  return (
    <ul className={`grid border-t border-border sm:grid-cols-2 ${columns === 3 ? "lg:grid-cols-3" : ""}`}>
      {studies.map((s, i) => (
        <li key={s.slug} data-reveal style={{ "--reveal-delay": `${(i % columns) * 70}ms` } as React.CSSProperties}>
          <CaseStudyCard study={s} />
        </li>
      ))}
    </ul>
  );
}
