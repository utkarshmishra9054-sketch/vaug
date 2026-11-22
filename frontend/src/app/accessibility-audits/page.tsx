import type { Metadata } from "next";
import Link from "next/link";
import { CircleCheck } from "lucide-react";

import { audit, auditsPage } from "@/content/accessibility";
import { routes } from "@/content/taxonomy";
import { AuditReport } from "@/components/accessibility/AuditReport";
import { ContactSection, FaqSection, PageCta } from "@/components/page/Blocks";
import { FeatureGrid, Steps } from "@/components/page/FeatureGrid";
import { PageHero } from "@/components/page/PageHero";
import { Section } from "@/components/page/Section";
import { Band } from "@/components/ui/Band";
import { ArrowLink } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: auditsPage.meta.title,
  description: auditsPage.meta.description,
  alternates: { canonical: routes.accessibilityAudits },
};

/** Hero card: the headline result of our own audit (real numbers). */
function AuditResultCard() {
  const resolved = audit.issues.filter((i) => i.status === "Resolved").length;
  return (
    <div className="glass relative mx-auto w-full max-w-sm rounded-xl border border-border p-6">
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent-text">Our own site, audited</p>
      <p className="mt-3 text-lg font-semibold text-fg">{audit.site}</p>
      <p className="text-sm text-muted">
        {audit.date} · {audit.standard}
      </p>
      <dl className="mt-6 grid grid-cols-2 gap-3">
        {[
          ["Pages tested", `${audit.pages} × ${audit.views.length} views`],
          ["Issues fixed", String(resolved)],
          ["Automated failures now", "0"],
          ["Overlays used", "None"],
        ].map(([k, v]) => (
          <div key={k} className="rounded-lg border border-border bg-bg px-3 py-2.5">
            <dt className="text-xs text-muted">{k}</dt>
            <dd className="mt-1 font-semibold text-fg">{v}</dd>
          </div>
        ))}
      </dl>
      <p className="mt-5 flex items-start gap-2 text-sm leading-relaxed text-muted">
        <CircleCheck className="mt-0.5 size-4 shrink-0 text-accent-text" aria-hidden="true" />
        The full issue log is below, as a sample of what you receive.
      </p>
    </div>
  );
}

export default function AccessibilityAuditsPage() {
  const c = auditsPage;
  return (
    <>
      <PageHero
        breadcrumbs={[
          { label: "Home", href: routes.home },
          { label: "Engineering", href: routes.engineering },
          { label: "Accessibility audits", href: routes.accessibilityAudits },
        ]}
        eyebrow={c.hero.eyebrow}
        title={c.hero.title}
        subtitle={c.hero.subtitle}
        tags={c.hero.tags}
        primary={{ label: "Request an audit", href: "#contact" }}
        secondary={{ label: "Our accessibility statement", href: routes.accessibility }}
        aside={<AuditResultCard />}
      />

      <Section
        tone="light"
        id="method"
        eyebrow="Method"
        title="Automated scans find the obvious. People find the rest."
        subtitle="Every audit combines tools that check every page with hands-on testing of the journeys that matter, then fixes go into your code and get re-tested."
        flush
      >
        <Steps steps={c.method} />
      </Section>

      <Section tone="dark" id="checks" eyebrow="What we test" title="Eight areas, every audit." flush>
        <FeatureGrid columns={4} items={c.checks} />
      </Section>

      <Section
        tone="light"
        id="sample-report"
        eyebrow="Sample report"
        title="What you receive, shown on our own website."
        subtitle="This is our real audit of vaug.in: what we found, how each issue was fixed in the code, and how we verified it. Filter it, open any issue."
      >
        <AuditReport {...audit} />
      </Section>

      <Band tone="dark" label={c.noOverlays.title}>
        <div className="frame-pad grid gap-12 py-20 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-16 lg:py-28">
          <div data-reveal>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent-text">Our stance</p>
            <h2 className="mt-4 text-3xl font-semibold leading-[1.1] text-fg sm:text-4xl lg:text-5xl">{c.noOverlays.title}</h2>
            {c.noOverlays.body.map((p) => (
              <p key={p} className="mt-6 text-lg leading-relaxed text-muted">
                {p}
              </p>
            ))}
          </div>
          <ul className="flex flex-col gap-4">
            {c.noOverlays.points.map((p) => (
              <li key={p.title} className="rounded-lg border border-border bg-surface p-6">
                <h3 className="font-semibold text-fg">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{p.description}</p>
              </li>
            ))}
          </ul>
        </div>
      </Band>

      <Section tone="light" id="deliverables" eyebrow="Deliverables" title="Evidence you can hand to procurement." flush>
        <FeatureGrid columns={3} items={c.deliverables} />
      </Section>

      <Section tone="dark" id="standards" eyebrow="Standards" title="The rules your evaluators point to." flush>
        <FeatureGrid columns={4} items={c.standards} numbered />
        <div className="frame-pad flex flex-wrap gap-4 py-12">
          <ArrowLink href={routes.accessibility} variant="outline">
            Read our accessibility statement
          </ArrowLink>
          <Link href={routes.industry("healthcare")} className="link-underline self-center text-accent-text">
            Healthcare websites and apps
          </Link>
        </div>
      </Section>

      <FaqSection faqs={c.faqs} title="Accessibility Questions We Hear Often." />
      <ContactSection title="Want your site audited and fixed?" subtitle="Send the address and your deadline. A senior engineer replies within one business day with scope and a plan." />
      <PageCta />
    </>
  );
}
