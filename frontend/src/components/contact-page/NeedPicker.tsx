"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";

import type { ContactNeed } from "@/content/contact";
import { routes } from "@/content/taxonomy";
import { ContactForm } from "@/components/contact/ContactForm";
import { Icon } from "@/components/ui/Icon";

const PREFIX = "contact-page-";

/**
 * "What do you need?" cards that pre-select the enquiry form's engagement.
 * The form stays mounted (it's uncontrolled), so anything already typed is
 * kept when the visitor changes their mind. Changing the form's own select
 * highlights the matching card too.
 */
export function NeedPicker({
  needs,
  formTitle,
  formNote,
  children,
}: {
  needs: ContactNeed[];
  formTitle: string;
  formNote: string;
  /** Intro copy rendered above the cards. */
  children?: React.ReactNode;
}) {
  const [selected, setSelected] = useState("");
  const formRef = useRef<HTMLDivElement>(null);
  const active = needs.find((n) => n.engagement === selected);

  function choose(engagement: string) {
    setSelected(engagement);
    const select = document.getElementById(`${PREFIX}engagement`) as HTMLSelectElement | null;
    if (select) select.value = engagement;
    // On stacked layouts, bring the form into view once a choice is made.
    if (window.matchMedia("(max-width: 1023px)").matches) {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      formRef.current?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
    }
    document.getElementById(`${PREFIX}name`)?.focus({ preventScroll: true });
  }

  return (
    <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
      <div className="frame-pad border-border py-16 max-lg:border-b lg:border-r lg:py-20">
        {children}
        <ul role="list" aria-label="What do you need?" className="mt-10 grid gap-3 sm:grid-cols-2">
          {needs.map((need, i) => {
            const on = need.engagement === selected;
            const wide = i === needs.length - 1 && needs.length % 2 === 1;
            return (
              <li key={need.engagement} data-reveal style={{ "--reveal-delay": `${i * 60}ms` } as React.CSSProperties} className={wide ? "sm:col-span-2" : ""}>
                <button
                  type="button"
                  aria-pressed={on}
                  onClick={() => choose(need.engagement)}
                  data-glow
                  className={`contact-need group relative flex h-full w-full items-start gap-4 overflow-hidden rounded-lg border p-4 text-left transition-[border-color,background-color,transform,box-shadow] duration-300 hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-text ${
                    on
                      ? "border-accent-text bg-accent-soft shadow-[0_18px_40px_-24px_rgb(109_40_217/0.6)]"
                      : "border-border bg-surface hover:border-border-strong"
                  }`}
                >
                  <span
                    className={`inline-flex size-11 shrink-0 items-center justify-center rounded-md transition-all duration-500 ${
                      on ? "rotate-[-8deg] scale-110 bg-ink text-yellow" : "bg-surface-2 text-accent-text group-hover:rotate-[-6deg]"
                    }`}
                  >
                    <Icon name={need.icon} className="size-5" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-semibold text-fg">{need.title}</span>
                    <span className="mt-1 block text-sm leading-snug text-muted">{need.blurb}</span>
                  </span>
                  <span
                    aria-hidden="true"
                    className={`inline-flex size-6 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${
                      on ? "scale-100 border-transparent bg-accent-text text-bg" : "scale-90 border-border-strong text-transparent"
                    }`}
                  >
                    <Check className="size-3.5" strokeWidth={3} />
                  </span>
                </button>
              </li>
            );
          })}
        </ul>

        <p aria-live="polite" className="mt-6 min-h-6 text-sm text-muted">
          {active?.service ? (
            <Link href={routes.service(active.service)} className="link-underline inline-flex items-center gap-1 font-semibold text-accent-text">
              How {active.title} works <ArrowUpRight className="size-4" aria-hidden="true" />
            </Link>
          ) : active ? (
            <Link href={routes.services} className="link-underline inline-flex items-center gap-1 font-semibold text-accent-text">
              Compare all six services <ArrowUpRight className="size-4" aria-hidden="true" />
            </Link>
          ) : (
            <span className="font-mono text-xs uppercase tracking-[0.15em] text-subtle">Pick one to pre-fill the form</span>
          )}
        </p>
      </div>

      <div ref={formRef} className="frame-pad scroll-mt-24 py-16 lg:py-20">
        <div className="contact-form-card relative rounded-xl border border-border bg-surface-2 p-5 shadow-[0_30px_80px_-40px_rgb(19_17_22/0.45)] sm:p-8">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
            <h3 className="text-xl font-semibold text-fg">{formTitle}</h3>
            <span className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.15em] text-subtle">
              <span className="relative flex size-2">
                <span className="absolute inset-0 animate-ping rounded-full bg-emerald-400/70" />
                <span className="relative size-2 rounded-full bg-emerald-500" />
              </span>
              {formNote}
            </span>
          </div>
          <div
            onChange={(e) => {
              const t = e.target;
              if (t instanceof HTMLSelectElement && t.name === "engagement") setSelected(t.value);
            }}
          >
            <ContactForm idPrefix={PREFIX} defaultEngagement={selected} />
          </div>
        </div>
      </div>
    </div>
  );
}
