"use client";

import { usePathname } from "next/navigation";

/** A tiny terminal that "searches" for the missing path and comes up empty. */
export function NotFoundTerminal() {
  const path = usePathname() || "/";
  const shown = path.length > 42 ? `${path.slice(0, 40)}…` : path;
  return (
    <div className="glass mx-auto w-full max-w-xl overflow-hidden rounded-lg border border-border text-left font-mono text-xs sm:text-sm">
      <div className="flex items-center gap-1.5 border-b border-border px-4 py-2.5" aria-hidden="true">
        <span className="size-2.5 rounded-full bg-red-400/80" />
        <span className="size-2.5 rounded-full bg-yellow/80" />
        <span className="size-2.5 rounded-full bg-emerald-400/80" />
        <span className="ml-3 text-[11px] text-subtle">vaug-agent</span>
      </div>
      <div className="flex flex-col gap-1.5 px-4 py-4">
        <p className="nf-line break-all text-fg" style={{ "--i": 0 } as React.CSSProperties}>
          <span className="text-accent-text">$</span> vaug find <span className="text-yellow">{shown}</span>
        </p>
        <p className="nf-line text-muted" style={{ "--i": 1 } as React.CSSProperties}>
          → searched 60+ pages, 12 case studies, 6 services
        </p>
        <p className="nf-line text-red-300" style={{ "--i": 2 } as React.CSSProperties}>
          ✕ 0 results. Page not found (404)
        </p>
        <p className="nf-line text-emerald-400" style={{ "--i": 3 } as React.CSSProperties}>
          ✓ suggesting the best routes below<span className="nf-caret ml-1 inline-block h-[1em] w-[0.55em] translate-y-[0.15em] bg-emerald-400" aria-hidden="true" />
        </p>
      </div>
    </div>
  );
}
