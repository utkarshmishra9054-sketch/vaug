import Link from "next/link";
import { ChevronRight } from "lucide-react";

import type { Link as LinkItem, SplitTitle } from "@/content/types";
import { Band } from "@/components/ui/Band";
import { ArrowLink } from "@/components/ui/Button";

export function Breadcrumbs({ items }: { items: LinkItem[] }) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-1.5 font-mono text-xs uppercase tracking-[0.15em] text-subtle">
        {items.map((item, i) => (
          <li key={item.href} className="flex items-center gap-1.5">
            {i > 0 && <ChevronRight className="size-3" aria-hidden="true" />}
            {i === items.length - 1 ? (
              <span aria-current="page" className="text-muted">
                {item.label}
              </span>
            ) : (
              <Link href={item.href} className="link-underline transition-colors hover:text-fg">
                {item.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

/** Full-bleed light behind inner-page heroes, matching the home hero. */
export function HeroGlow({ tint }: { tint?: string }) {
  return (
    <>
      <div className="hero-aurora absolute -left-[5%] -top-[25%] h-[36rem] w-[50%] rounded-full blur-[140px]" style={{ background: tint ? `${tint}55` : "rgb(124 58 237 / 0.28)" }} />
      <div className="hero-aurora absolute -right-[5%] top-[30%] h-[24rem] w-[38%] rounded-full bg-yellow/[0.07] blur-[130px] [animation-delay:-6s]" />
      <div className="absolute inset-0 opacity-[0.06] [background-image:linear-gradient(rgb(255_255_255)_1px,transparent_1px),linear-gradient(90deg,rgb(255_255_255)_1px,transparent_1px)] [background-size:72px_72px] [mask-image:radial-gradient(ellipse_70%_60%_at_35%_35%,black,transparent)]" />
    </>
  );
}

/**
 * Opening band for every inner page: breadcrumbs, a split headline,
 * a subtitle, up to two actions and an optional visual on the right.
 */
export function PageHero({
  breadcrumbs,
  eyebrow,
  title,
  subtitle,
  primary,
  secondary,
  tags,
  aside,
}: {
  breadcrumbs: LinkItem[];
  eyebrow?: string;
  title: SplitTitle | string;
  subtitle?: string;
  primary?: LinkItem;
  secondary?: LinkItem;
  tags?: string[];
  aside?: React.ReactNode;
}) {
  return (
    <Band tone="dark" rails={false} dots={false} label="Introduction" backdrop={<HeroGlow />}>

      <div className={`frame-pad relative grid gap-12 pb-20 pt-32 sm:pt-36 lg:pb-24 lg:pt-40 ${aside ? "lg:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)] lg:items-center" : ""}`}>
        <div>
          <Breadcrumbs items={breadcrumbs} />
          {eyebrow && <p className="mt-8 inline-flex rounded-sm bg-surface-2 px-2.5 py-1 text-sm text-accent-text">{eyebrow}</p>}
          <h1 data-reveal className={`${eyebrow ? "mt-5" : "mt-8"} max-w-4xl text-[2.4rem] leading-[1.06] text-fg sm:text-5xl lg:text-[4rem]`}>
            {typeof title === "string" ? (
              <span className="font-semibold">{title}</span>
            ) : (
              <>
                <span className="font-light">{title.light}</span> <span className="font-semibold">{title.bold}</span>
              </>
            )}
          </h1>
          {subtitle && (
            <p data-reveal style={{ "--reveal-delay": "100ms" } as React.CSSProperties} className="mt-6 max-w-2xl text-lg leading-relaxed text-muted lg:text-xl">
              {subtitle}
            </p>
          )}
          {tags && tags.length > 0 && (
            <ul className="mt-8 flex flex-wrap gap-2">
              {tags.map((t) => (
                <li key={t} className="rounded-sm border border-border px-2.5 py-1 font-mono text-xs text-muted">
                  {t}
                </li>
              ))}
            </ul>
          )}
          {(primary || secondary) && (
            <div data-reveal style={{ "--reveal-delay": "200ms" } as React.CSSProperties} className="mt-10 flex flex-wrap items-center gap-4">
              {primary && (
                <ArrowLink href={primary.href} className="py-2.5 pl-5 text-base">
                  {primary.label}
                </ArrowLink>
              )}
              {secondary && (
                <ArrowLink href={secondary.href} variant="outline" className="py-2.5 pl-5 text-base">
                  {secondary.label}
                </ArrowLink>
              )}
            </div>
          )}
        </div>
        {aside && <div data-reveal>{aside}</div>}
      </div>
    </Band>
  );
}
