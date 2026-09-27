import Link from "next/link";
import { ArrowUpRight, ChevronDown, ScrollText, ShieldCheck } from "lucide-react";

import { legalDocs, legalDraftNotice, type LegalBlock, type LegalDoc } from "@/content/legal";
import { routes } from "@/content/taxonomy";
import { PageHero } from "@/components/page/PageHero";
import { Band } from "@/components/ui/Band";
import { LegalToc } from "./LegalToc";

const docHref: Record<LegalDoc["slug"], string> = {
  "privacy-policy": routes.privacy,
  terms: routes.terms,
  "cookie-policy": routes.cookies,
};

/** Hero visual: a policy document being read, with a stamp and a scanning highlight. */
function LegalVisual({ doc }: { doc: LegalDoc }) {
  return (
    <div data-tilt className="glass relative mx-auto w-full max-w-sm overflow-hidden rounded-xl border border-border p-6">
      <div className="flex items-center gap-3">
        <span className="inline-flex size-10 items-center justify-center rounded-md bg-accent-soft text-accent-text">
          <ScrollText className="size-5" aria-hidden="true" />
        </span>
        <div>
          <p className="text-sm font-semibold text-fg">{doc.label}</p>
          <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-subtle">{doc.sections.length} sections</p>
        </div>
      </div>
      <div className="legal-doc relative mt-6 flex flex-col gap-2.5" aria-hidden="true">
        {[92, 78, 85, 60, 88, 70, 82, 45].map((w, i) => (
          <span key={i} className="legal-doc-line block h-2 rounded-full bg-surface-2" style={{ width: `${w}%`, "--i": i } as React.CSSProperties} />
        ))}
        <span className="legal-doc-scan pointer-events-none absolute inset-x-0 h-8 rounded-md bg-gradient-to-b from-transparent via-purple/25 to-transparent" />
      </div>
      <ul className="mt-6 flex flex-col gap-2">
        {doc.summary.map((s, i) => (
          <li key={s} className="legal-doc-tick flex items-start gap-2 text-xs leading-snug text-muted" style={{ "--i": i } as React.CSSProperties}>
            <ShieldCheck className="mt-px size-3.5 shrink-0 text-emerald-400" aria-hidden="true" />
            {s}
          </li>
        ))}
      </ul>
      <span aria-hidden="true" className="legal-stamp absolute right-4 top-5 rounded-sm border-2 border-yellow px-2 py-0.5 font-mono text-[11px] font-black uppercase tracking-[0.2em] text-yellow">
        Draft
      </span>
    </div>
  );
}

function Block({ block }: { block: LegalBlock }) {
  if (typeof block === "string") return <p className="mt-4 leading-relaxed text-muted">{block}</p>;
  return (
    <ul className="mt-4 flex flex-col gap-2.5">
      {block.list.map((item) => (
        <li key={item} className="flex gap-3 leading-relaxed text-muted">
          <span className="mt-[0.6rem] size-1.5 shrink-0 rounded-full bg-accent-text" aria-hidden="true" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

/**
 * Shared layout for the privacy, terms and cookie pages: hero, a sticky table
 * of contents on desktop, and the document body. The body mirrors `Prose`
 * (components/page/Blocks) but adds anchor ids and lists for the contents.
 */
export function LegalPage({ doc }: { doc: LegalDoc }) {
  const toc = doc.sections.map((s) => ({ id: s.id, heading: s.heading }));
  const others = legalDocs.filter((d) => d.slug !== doc.slug);

  return (
    <>
      <PageHero
        breadcrumbs={[
          { label: "Home", href: routes.home },
          { label: doc.label, href: docHref[doc.slug] },
        ]}
        eyebrow="Legal"
        title={doc.title}
        subtitle={doc.subtitle}
        tags={[`Last updated ${doc.updated}`, "UK GDPR", "EU GDPR"]}
        aside={<LegalVisual doc={doc} />}
      />

      <Band tone="light" label={doc.label}>
        <div className="grid lg:grid-cols-[17rem_minmax(0,1fr)]">
          <aside className="hidden border-r border-border lg:block">
            <div className="sticky top-24 max-h-[calc(100dvh-7rem)] overflow-y-auto px-8 py-16">
              <LegalToc items={toc} />
              <div className="mt-10 border-t border-border pt-6">
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-subtle">Related</p>
                <ul className="mt-3 flex flex-col gap-2 text-sm">
                  {others.map((d) => (
                    <li key={d.slug}>
                      <Link href={docHref[d.slug]} className="link-underline text-muted hover:text-fg">
                        {d.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </aside>

          <article className="frame-pad max-w-4xl py-16 lg:py-20">
            <p role="note" className="flex items-start gap-3 rounded-lg border border-dashed border-accent-text/50 bg-accent-soft px-4 py-3 text-sm leading-relaxed text-fg">
              <span className="mt-0.5 shrink-0 rounded-sm bg-ink px-1.5 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider text-yellow">Draft</span>
              {legalDraftNotice}
            </p>

            {/* Mobile contents */}
            <details className="group mt-8 rounded-lg border border-border bg-surface lg:hidden">
              <summary className="flex cursor-pointer list-none items-center justify-between px-4 py-3 font-mono text-xs uppercase tracking-[0.2em] text-muted [&::-webkit-details-marker]:hidden">
                On this page
                <ChevronDown className="size-4 transition-transform group-open:rotate-180" aria-hidden="true" />
              </summary>
              <ol className="flex flex-col border-t border-border px-4 py-3 text-sm">
                {toc.map((t) => (
                  <li key={t.id}>
                    <a href={`#${t.id}`} className="block py-1.5 text-muted hover:text-fg">
                      {t.heading}
                    </a>
                  </li>
                ))}
              </ol>
            </details>

            <div className="mt-10 rounded-lg border border-border bg-surface p-6">
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent-text">In short</p>
              <ul className="mt-4 grid gap-3 sm:grid-cols-3">
                {doc.summary.map((s) => (
                  <li key={s} className="text-sm leading-relaxed text-fg">
                    {s}
                  </li>
                ))}
              </ul>
            </div>

            <p className="mt-12 font-mono text-xs uppercase tracking-[0.15em] text-subtle">Last updated {doc.updated}</p>
            {doc.sections.map((s) => (
              <section key={s.id} id={s.id} aria-labelledby={`${s.id}-h`} className="mt-12 scroll-mt-28 first-of-type:mt-8">
                <h2 id={`${s.id}-h`} className="text-2xl font-semibold text-fg">
                  {s.heading}
                </h2>
                {s.body.map((b, i) => (
                  <Block key={i} block={b} />
                ))}
              </section>
            ))}

            <div className="mt-16 grid gap-3 border-t border-border pt-10 sm:grid-cols-3">
              {others.map((d) => (
                <Link key={d.slug} href={docHref[d.slug]} data-glow className="group flex items-center justify-between gap-3 rounded-lg border border-border bg-surface p-4 text-sm font-semibold text-fg transition-colors hover:border-border-strong">
                  {d.label}
                  <ArrowUpRight className="size-4 text-accent-text transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
                </Link>
              ))}
              <Link href={routes.contact} data-glow className="group flex items-center justify-between gap-3 rounded-lg border border-border bg-surface p-4 text-sm font-semibold text-fg transition-colors hover:border-border-strong">
                Questions? Contact us
                <ArrowUpRight className="size-4 text-accent-text transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
              </Link>
            </div>
          </article>
        </div>
      </Band>
    </>
  );
}
