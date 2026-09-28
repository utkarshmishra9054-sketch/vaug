"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";

import type { ClientItem } from "@/content/types";
import { Band } from "@/components/ui/Band";
import { logoMetrics } from "@/content/logoMetrics";

/** Industry filters; a client can match more than one. */
const GROUPS: { label: string; match: RegExp }[] = [
  { label: "E-commerce", match: /e-commerce/i },
  { label: "Fintech", match: /fintech/i },
  { label: "Education", match: /education/i },
  { label: "Logistics", match: /logistics/i },
  { label: "Real estate", match: /real estate|interior/i },
  { label: "Healthcare", match: /health/i },
  { label: "Hospitality", match: /hospitality/i },
  { label: "Manufacturing", match: /industrial|manufactur|printing/i },
];

const inFilter = (c: ClientItem, filter: string | null) => !filter || !!GROUPS.find((g) => g.label === filter)?.match.test(c.sector);

/**
 * Logos are sized for equal visual weight, not equal boxes: height falls with
 * aspect ratio (so area stays constant) and with ink coverage (so solid block
 * wordmarks shrink and thin line marks grow). Metrics come from
 * `scripts/measure-logos.mjs`. Clients without a measured logo get a wordmark.
 */
const LOGO_BASE = 56;
const MEDIAN_INK = 0.2;
function logoHeight({ ratio, ink }: { ratio: number; ink: number }) {
  const weight = Math.min(Math.max(ink / MEDIAN_INK, 0.5), 2.5);
  const h = LOGO_BASE * Math.pow(ratio, -0.5) * Math.pow(weight, -0.32);
  return Math.min(Math.max(h, 18), 50, 150 / ratio);
}

function ClientLogo({ client }: { client: ClientItem }) {
  const metrics = client.logoSrc ? logoMetrics[client.logoSrc] : undefined;
  if (!client.logoSrc || !metrics) {
    return <span className="client-wordmark">{client.label}</span>;
  }
  const h = logoHeight(metrics);
  return (
    <Image
      src={client.logoSrc}
      alt={`${client.label} logo`}
      width={Math.round(h * metrics.ratio * 2)}
      height={Math.round(h * 2)}
      style={{ "--h": `${h.toFixed(1)}px` } as React.CSSProperties}
      className="client-logo"
    />
  );
}

/**
 * Client grid: one consistent tile per client, linking to its case study. Logos rest in
 * greyscale and bloom into colour on hover; a highlight glides to the hovered
 * tile and a soft spotlight follows the cursor. Industry chips filter the grid.
 */
export function ClientGrid({ clients }: { clients: ClientItem[] }) {
  const wrap = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const [filter, setFilter] = useState<string | null>(null);
  const [box, setBox] = useState<{ x: number; y: number; w: number; h: number } | null>(null);
  const moveTo = (el: HTMLElement) => setBox({ x: el.offsetLeft, y: el.offsetTop, w: el.offsetWidth, h: el.offsetHeight });

  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => e.isIntersecting && (setInView(true), io.disconnect()), { threshold: 0.15 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const groups = GROUPS.map((g) => ({ ...g, count: clients.filter((c) => g.match.test(c.sector)).length })).filter((g) => g.count > 0);
  const chips = [
    { label: "All", value: null, count: clients.length },
    ...groups.map((g) => ({ label: g.label, value: g.label, count: g.count })),
  ];
  const shown = clients.filter((c) => inFilter(c, filter));

  const pick = (value: string | null) => {
    setFilter(value);
    setBox(null);
  };

  return (
    <Band tone="light" label="Clients">
      <div className="frame-pad flex flex-col gap-7 border-b border-border py-10 lg:flex-row lg:items-end lg:justify-between lg:gap-12 lg:py-14">
        <div data-reveal>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted">Who we&apos;ve built for</p>
          <h2 className="mt-4 max-w-2xl text-3xl leading-[1.1] text-fg sm:text-4xl">
            <span className="font-light">Real growth for real companies,</span>{" "}
            <span className="font-semibold">from Frankfurt fintechs to India&apos;s biggest universities.</span>
          </h2>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted sm:text-base">Every logo opens the full story: the brief, the work, the screens and the numbers.</p>
        </div>
        <div role="group" aria-label="Filter clients by industry" className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 lg:mx-0 lg:max-w-xl lg:flex-wrap lg:justify-end lg:overflow-visible lg:px-0">
          {chips.map((chip) => {
            const active = filter === chip.value;
            return (
              <button
                key={chip.label}
                type="button"
                aria-pressed={active}
                onClick={() => pick(chip.value)}
                className={`inline-flex shrink-0 items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-[13px] transition-all duration-300 ${
                  active ? "border-fg bg-fg text-bg" : "border-border-strong text-fg/75 hover:border-fg hover:text-fg"
                }`}
              >
                {chip.label}
                <span className={`font-mono text-[10px] ${active ? "text-accent" : "text-subtle"}`}>{chip.count}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div
        ref={wrap}
        className={`client-wall relative ${inView ? "is-in" : ""}`}
        onMouseMove={(e) => {
          const r = e.currentTarget.getBoundingClientRect();
          e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
          e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
        }}
      >
        <div aria-hidden="true" className="client-spotlight" />
        <ul key={filter ?? "all"} onMouseLeave={() => setBox(null)} className="relative grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6">
          {/* gliding highlight */}
          <li
            aria-hidden="true"
            className="pointer-events-none absolute left-0 top-0 z-0 bg-surface shadow-[0_18px_40px_-18px_rgb(19_17_22/0.25)] transition-all duration-500 ease-[cubic-bezier(0.2,0.8,0.2,1)]"
            style={
              box
                ? { transform: `translate(${box.x}px, ${box.y}px)`, width: box.w, height: box.h, opacity: 1 }
                : { opacity: 0, width: 0, height: 0 }
            }
          >
            <span className="absolute inset-x-0 bottom-0 h-[3px] bg-accent" />
          </li>

          {shown.map((client, i) => {
            const meta = [client.city, client.sector].filter(Boolean).join(" · ");
            const cta = client.href ? "Read the case study" : null;
            const body = (
              <>
                {client.href && (
                  <ArrowUpRight className="absolute right-4 top-4 size-4 text-subtle opacity-0 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent-text group-hover:opacity-100" aria-hidden="true" />
                )}
                <span className="flex h-14 items-end lg:h-16">
                  <ClientLogo client={client} />
                </span>
                <span>
                  <span className="block text-[15px] font-semibold leading-snug text-fg">{client.label}</span>
                  <span className="mt-1 grid min-h-[3.2em] font-mono text-[10px] uppercase leading-[1.6] tracking-[0.12em] *:[grid-area:1/1]">
                    <span className={`text-muted transition-all duration-300 ${cta ? "group-hover:-translate-y-1.5 group-hover:opacity-0" : ""}`}>{meta}</span>
                    {cta && (
                      <span className="translate-y-1.5 text-accent-text opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                        {cta} →
                      </span>
                    )}
                  </span>
                </span>
              </>
            );
            const tile = "relative flex h-44 flex-col justify-between gap-4 p-5 outline-none sm:h-48";
            return (
              <li
                key={client.href ?? client.label}
                onMouseEnter={(e) => moveTo(e.currentTarget)}
                onFocus={(e) => moveTo(e.currentTarget)}
                style={{ "--d": `${(Math.floor(i / 6) + (i % 6)) * 70}ms` } as React.CSSProperties}
                className="client-tile group relative z-[1] border-b border-r border-border [&:nth-child(odd)]:max-sm:border-r-0 sm:max-lg:[&:nth-child(3n+1)]:border-r-0 lg:[&:nth-child(6n+1)]:border-r-0"
              >
                {client.href ? (
                  <Link href={client.href} className={tile}>
                    {body}
                  </Link>
                ) : (
                  <div className={tile}>{body}</div>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </Band>
  );
}
