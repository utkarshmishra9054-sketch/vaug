import type { Metadata } from "next";
import Link from "next/link";
import { CircleCheck } from "lucide-react";

import sitemap from "@/app/sitemap";
import { aiSearchPage } from "@/content/aiSearch";
import { routes, services } from "@/content/taxonomy";
import { ContactSection, FaqSection, PageCta } from "@/components/page/Blocks";
import { FeatureGrid, Steps } from "@/components/page/FeatureGrid";
import { PageHero } from "@/components/page/PageHero";
import { Section } from "@/components/page/Section";
import { Band } from "@/components/ui/Band";
import { ArrowLink } from "@/components/ui/Button";
import { getCaseStudies } from "@/lib/content";
import { ld, organizationSchema } from "@/lib/jsonld";
import { buildLlmsTxt } from "@/lib/llms";

export const metadata: Metadata = {
  title: aiSearchPage.meta.title,
  description: aiSearchPage.meta.description,
  alternates: { canonical: routes.aiSearch },
};

const SCHEMA_TYPES = ["Organization", "WebSite", "BreadcrumbList", "FAQPage", "Service", "Article"];

function Code({ label, children }: { label: string; children: string }) {
  return (
    <figure className="flex min-w-0 flex-col overflow-hidden rounded-lg border border-border bg-bg">
      <figcaption className="border-b border-border px-4 py-2.5 font-mono text-xs uppercase tracking-[0.15em] text-subtle">{label}</figcaption>
      <pre tabIndex={0} aria-label={label} className="max-h-[26rem] overflow-auto whitespace-pre-wrap break-words p-4 font-mono text-xs leading-relaxed text-muted outline-none focus-visible:ring-2 focus-visible:ring-accent-text">
        {children}
      </pre>
    </figure>
  );
}

export default async function AiSearchReadinessPage() {
  const c = aiSearchPage;
  const [map, llms, studies] = await Promise.all([sitemap(), buildLlmsTxt(), getCaseStudies()]);
  const llmsLinks = llms.split("\n").filter((l) => l.startsWith("- [")).length;
  const llmsExcerpt = llms.split("\n").slice(0, 26).join("\n") + "\n…";
  const orgJson = JSON.stringify(ld(organizationSchema()), null, 2);

  const coverage: [string, string, string][] = [
    ["Organization + WebSite", "Every page", "Who VAUG is, contacts and location, in the root layout"],
    ["BreadcrumbList", "Every page with breadcrumbs", "The trail shown at the top of the page"],
    ["FAQPage", "Every page with an FAQ block", "The same questions and answers shown on the page"],
    ["Service", `${services.length} service pages`, "Each engagement model, provided by VAUG"],
    ["Article", `${studies.length} case studies`, "Each study, about its client, published by VAUG"],
  ];

  return (
    <>
      <PageHero
        breadcrumbs={[
          { label: "Home", href: routes.home },
          { label: "Engineering", href: routes.engineering },
          { label: "AI search readiness", href: routes.aiSearch },
        ]}
        eyebrow={c.hero.eyebrow}
        title={c.hero.title}
        subtitle={c.hero.subtitle}
        tags={c.hero.tags}
        primary={{ label: "Check my site", href: "#contact" }}
        secondary={{ label: "See it on vaug.in", href: "#example" }}
        aside={
          <div className="glass relative mx-auto w-full max-w-sm rounded-xl border border-border p-6">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent-text">Our own site, made ready</p>
            <p className="mt-3 text-lg font-semibold text-fg">vaug.in</p>
            <p className="text-sm text-muted">Structured data and llms.txt, built from the site&apos;s content</p>
            <dl className="mt-6 grid grid-cols-2 gap-3">
              {[
                ["Schema types", String(SCHEMA_TYPES.length)],
                ["Pages in the sitemap", String(map.length)],
                ["Links in llms.txt", String(llmsLinks)],
                ["Paid plug-ins", "None"],
              ].map(([k, v]) => (
                <div key={k} className="rounded-lg border border-border bg-bg px-3 py-2.5">
                  <dt className="text-xs text-muted">{k}</dt>
                  <dd className="mt-1 font-semibold text-fg">{v}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-5 flex items-start gap-2 text-sm leading-relaxed text-muted">
              <CircleCheck className="mt-0.5 size-4 shrink-0 text-accent-text" aria-hidden="true" />
              Generated at build time, so they can&apos;t drift from the pages.
            </p>
          </div>
        }
      />

      <Section tone="light" id="what-they-read" eyebrow="What they read" title="Eight questions a crawler or assistant asks of your site." flush>
        <FeatureGrid columns={4} items={c.reads} />
      </Section>

      <Section
        tone="dark"
        id="method"
        eyebrow="Method"
        title="Audit, structure, map, rewrite, verify."
        subtitle="Most of the work is in your code and templates, so it keeps working as you add pages."
        flush
      >
        <Steps steps={c.method} />
      </Section>

      <Section
        tone="light"
        id="example"
        eyebrow="Worked example"
        title="What we did on vaug.in."
        subtitle="Everything below is live on this site. The code samples are rendered from the same functions that serve them, so they are exactly what a crawler gets."
      >
        <div className="frame-pad grid gap-6 pb-6 lg:grid-cols-2">
          <Code label="Organization, in every page's head (JSON-LD)">{orgJson}</Code>
          <Code label="/llms.txt, first lines">{llmsExcerpt}</Code>
        </div>
        <div className="frame-pad pb-12">
          <div tabIndex={0} role="region" aria-label="Structured data on vaug.in, by type" className="overflow-x-auto rounded-lg border border-border outline-none focus-visible:ring-2 focus-visible:ring-accent-text">
            <table className="w-full min-w-[36rem] text-left text-sm">
              <caption className="sr-only">Where each structured data type appears on vaug.in</caption>
              <thead className="bg-surface font-mono text-xs uppercase tracking-[0.12em] text-subtle">
                <tr>
                  <th scope="col" className="px-4 py-3 font-normal">Type</th>
                  <th scope="col" className="px-4 py-3 font-normal">Where</th>
                  <th scope="col" className="px-4 py-3 font-normal">What it says</th>
                </tr>
              </thead>
              <tbody>
                {coverage.map(([t, where, what]) => (
                  <tr key={t} className="border-t border-border">
                    <th scope="row" className="px-4 py-3 font-medium text-fg">{t}</th>
                    <td className="px-4 py-3 text-muted">{where}</td>
                    <td className="px-4 py-3 text-muted">{what}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-8 flex flex-wrap gap-4">
            <ArrowLink href="/llms.txt" variant="outline">
              Open vaug.in/llms.txt
            </ArrowLink>
            <a href="https://validator.schema.org/#url=https%3A%2F%2Fvaug.in%2Fai-search-readiness" target="_blank" rel="noopener noreferrer" className="link-underline self-center text-accent-text">
              Check this page in the Schema Markup Validator
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          </div>
        </div>
      </Section>

      <Band tone="dark" label={c.limits.title}>
        <div className="frame-pad grid gap-12 py-20 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-16 lg:py-28">
          <div data-reveal>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent-text">Honest limits</p>
            <h2 className="mt-4 text-3xl font-semibold leading-[1.1] text-fg sm:text-4xl lg:text-5xl">{c.limits.title}</h2>
            {c.limits.body.map((p) => (
              <p key={p} className="mt-6 text-lg leading-relaxed text-muted">
                {p}
              </p>
            ))}
          </div>
          <ul className="flex flex-col gap-4">
            {c.limits.points.map((p) => (
              <li key={p.title} className="rounded-lg border border-border bg-surface p-6">
                <h3 className="font-semibold text-fg">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{p.description}</p>
              </li>
            ))}
          </ul>
        </div>
      </Band>

      <Section tone="light" id="deliverables" eyebrow="Deliverables" title="What you get." flush>
        <FeatureGrid columns={3} items={c.deliverables} />
        <div className="frame-pad flex flex-wrap gap-4 py-12">
          <ArrowLink href={routes.accessibilityAudits} variant="outline">
            Accessibility audits
          </ArrowLink>
          <Link href={routes.engineeringPage("web-engineering")} className="link-underline self-center text-accent-text">
            Web engineering
          </Link>
        </div>
      </Section>

      <FaqSection faqs={c.faqs} title="AI Search Questions We Hear Often." />
      <ContactSection title="Want your site ready for AI search?" subtitle="Send the address. A senior engineer replies within one business day with what crawlers and assistants can and can't read today." />
      <PageCta />
    </>
  );
}
