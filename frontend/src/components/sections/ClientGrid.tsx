"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { ArrowUpRight, Lock } from "lucide-react";

import type { ClientItem } from "@/content/types";
import { Band } from "@/components/ui/Band";
import { Icon } from "@/components/ui/Icon";

/**
 * Anonymised client grid: one consistent tile per client, each linking to its
 * case study. A highlight glides to whichever tile is hovered.
 */
export function ClientGrid({ clients }: { clients: ClientItem[] }) {
  const grid = useRef<HTMLUListElement>(null);
  const [box, setBox] = useState<{ x: number; y: number; w: number; h: number } | null>(null);
  const moveTo = (el: HTMLElement) => setBox({ x: el.offsetLeft, y: el.offsetTop, w: el.offsetWidth, h: el.offsetHeight });

  return (
    <Band tone="light" label="Clients">
      <div className="frame-pad flex flex-wrap items-center justify-between gap-3 border-b border-border py-5">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted">Who we&apos;ve built for</p>
        <p className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.15em] text-subtle">
          <Lock className="size-3.5" aria-hidden="true" /> Client names kept confidential
        </p>
      </div>
      <ul ref={grid} onMouseLeave={() => setBox(null)} className="relative grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6">
        {/* gliding highlight */}
        <li
          aria-hidden="true"
          className="pointer-events-none absolute left-0 top-0 z-0 bg-surface transition-all duration-500 ease-[cubic-bezier(0.2,0.8,0.2,1)]"
          style={
            box
              ? { transform: `translate(${box.x}px, ${box.y}px)`, width: box.w, height: box.h, opacity: 1 }
              : { opacity: 0, width: 0, height: 0 }
          }
        >
          <span className="absolute inset-x-0 bottom-0 h-[3px] bg-accent" />
        </li>

        {clients.map((client, i) => (
          <li
            key={client.href}
            data-reveal
            onMouseEnter={(e) => moveTo(e.currentTarget)}
            style={{ "--reveal-delay": `${(i % 6) * 40}ms` } as React.CSSProperties}
            className="group relative z-[1] border-b border-r border-border [&:nth-child(odd)]:max-sm:border-r-0 sm:max-lg:[&:nth-child(3n+1)]:border-r-0 lg:[&:nth-child(6n+1)]:border-r-0"
          >
            <Link href={client.href} className="flex h-32 flex-col justify-between p-5 sm:h-36">
              <span className="flex items-start justify-between">
                <span className="inline-flex size-9 items-center justify-center rounded-md border border-border text-fg/70 transition-all duration-300 group-hover:border-transparent group-hover:bg-accent group-hover:text-accent-fg">
                  <Icon name={client.icon} className="size-[18px]" />
                </span>
                <ArrowUpRight className="size-4 text-subtle opacity-0 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent-text group-hover:opacity-100" aria-hidden="true" />
              </span>
              <span>
                <span className="block text-[15px] font-semibold leading-snug text-fg">{client.label}</span>
                <span className="mt-1 block font-mono text-[10px] uppercase tracking-[0.12em] text-muted">
                  {client.city} · {client.sector}
                </span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </Band>
  );
}
