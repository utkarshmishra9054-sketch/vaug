import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import type { Audience } from "@/content/types";
import { routes } from "@/content/taxonomy";
import { Icon } from "@/components/ui/Icon";

/** Industry names on the home page → sector pages (unlisted ones go to the index). */
const industryHref: Record<string, string> = {
  Fintech: routes.industry("fintech-insurance"),
  Insurance: routes.industry("fintech-insurance"),
  Healthcare: routes.industry("healthcare"),
  "Real Estate": routes.industry("real-estate"),
  Logistics: routes.industry("logistics"),
  "E-commerce": routes.industry("ecommerce-retail"),
  Hospitality: routes.industry("hospitality-travel"),
};

export function Audiences({ audiences, industries }: { audiences: Audience[]; industries: string[] }) {
  return (
    <>
      <ul className="grid border-t border-border sm:grid-cols-2 lg:grid-cols-4">
        {audiences.map((a, i) => (
          <li
            key={a.title}
            data-reveal
            data-glow
            style={{ "--reveal-delay": `${i * 80}ms` } as React.CSSProperties}
            className="group relative border-border transition-colors duration-300 hover:bg-surface max-lg:border-b sm:max-lg:[&:nth-child(odd)]:border-r lg:border-r lg:last:border-r-0"
          >
            <Link href={a.href ?? routes.whoWeServe} className="block h-full p-8 lg:py-12">
              <span className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-accent transition-transform duration-500 group-hover:scale-x-100" aria-hidden="true" />
              <span className="flex items-start justify-between">
                <Icon name={a.icon} className="size-7 text-fg" strokeWidth={1.5} />
                <ArrowUpRight className="size-5 text-muted transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent-text" aria-hidden="true" />
              </span>
              <h3 className="mt-8 text-xl font-semibold text-fg">{a.title}</h3>
              <p className="mt-3 leading-relaxed text-muted">{a.description}</p>
            </Link>
          </li>
        ))}
      </ul>

      {/* Industries */}
      <div className="flex flex-col gap-4 border-t border-border py-8 sm:flex-row sm:items-center">
        <Link href={routes.industries} className="frame-pad link-underline shrink-0 font-mono text-xs uppercase tracking-widest text-subtle hover:text-fg sm:pr-0">
          Industries we serve
        </Link>
        <nav className="mask-fade-x group overflow-hidden" aria-label="Industries">
          <ul className="animate-marquee flex w-max gap-3 group-hover:[animation-play-state:paused]" style={{ "--marquee-duration": "45s" } as React.CSSProperties}>
            {[...industries, ...industries].map((name, i) => (
              <li key={`${name}-${i}`} aria-hidden={i >= industries.length || undefined}>
                <Link
                  href={industryHref[name] ?? routes.industries}
                  tabIndex={i >= industries.length ? -1 : undefined}
                  className="block whitespace-nowrap rounded-md bg-surface-2 px-4 py-2 text-sm font-medium text-fg transition-colors hover:bg-accent hover:text-accent-fg"
                >
                  {name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  );
}
