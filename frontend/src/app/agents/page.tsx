import type { Metadata } from "next";

import { agentsPage as c } from "@/content/agents";
import { routes } from "@/content/taxonomy";
import { AgentConsole } from "@/components/agents/AgentConsole";
import { ApprovalQueue, IntegrationOrbit } from "@/components/agents/AgentBlocks";
import { AgentTypes } from "@/components/agents/AgentTypes";
import { ContactSection, FaqSection, PageCta } from "@/components/page/Blocks";
import { CaseStudyGrid } from "@/components/page/CaseStudyCards";
import { Compare, FeatureGrid, LinkTiles } from "@/components/page/FeatureGrid";
import { PageHero } from "@/components/page/PageHero";
import { Section } from "@/components/page/Section";
import { TickerBand } from "@/components/sections/TickerBand";
import { FactStrip, ProcessTimeline, StartPaths } from "@/components/services/ServiceBlocks";
import { Band } from "@/components/ui/Band";
import { ArrowLink } from "@/components/ui/Button";
import { getCaseStudiesBy } from "@/lib/content";

export const metadata: Metadata = {
  title: c.metaTitle,
  description: c.metaDescription,
};

export default async function AgentsPage() {
  const studies = await getCaseStudiesBy({ service: "ai-as-a-service" });
  const inner = c.integrations.map((g) => g.items[0].replace(" Business", ""));
  const outer = c.integrations.flatMap((g) => g.items.slice(1, 3)).slice(0, 10);

  return (
    <>
      <PageHero
        breadcrumbs={[
          { label: "Home", href: routes.home },
          { label: "VAUG Agents", href: routes.agents },
        ]}
        eyebrow={c.eyebrow}
        title={c.title}
        subtitle={c.subtitle}
        primary={c.primary}
        secondary={c.secondary}
        tags={c.tags}
        aside={<AgentConsole scripts={c.console} />}
      />

      <TickerBand items={c.ticker} />

      <Band tone="light" label="At a glance">
        <FactStrip facts={c.facts} />
      </Band>

      <Section tone="dark" id="agent-types" eyebrow="Agent types" title={c.typesTitle} subtitle={c.typesSubtitle} flush>
        <AgentTypes types={c.types} />
      </Section>

      <Section tone="light" id="process" eyebrow="Process" title={c.processTitle} subtitle={c.processSubtitle}>
        <ProcessTimeline steps={c.process} />
      </Section>

      <Section tone="dark" id="guardrails" eyebrow="Human in the loop" title={c.guardrailsTitle} subtitle={c.guardrailsSubtitle} flush>
        <div className="grid border-t border-border lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
          <div data-reveal className="frame-pad flex items-center border-b border-border py-12 lg:border-b-0 lg:border-r lg:py-16">
            <ApprovalQueue items={c.approvalQueue} />
          </div>
          <div className="[&>ul]:border-t-0">
            <FeatureGrid items={c.guardrails} columns={2} />
          </div>
        </div>
      </Section>

      <Section tone="light" id="integrations" eyebrow="Integrations" title={c.integrationsTitle} subtitle={c.integrationsSubtitle} flush>
        <div className="grid border-t border-border lg:grid-cols-2">
          <div data-reveal className="overflow-hidden border-b border-border px-4 py-12 sm:px-10 lg:border-b-0 lg:border-r lg:py-16">
            <IntegrationOrbit inner={inner} outer={outer} />
          </div>
          <dl className="grid sm:grid-cols-2">
            {c.integrations.map((g, i) => (
              <div key={g.label} data-reveal style={{ "--reveal-delay": `${(i % 2) * 70}ms` } as React.CSSProperties} className="border-b border-border p-7 sm:border-r lg:p-8">
                <dt className="font-mono text-xs uppercase tracking-[0.2em] text-accent-text">{g.label}</dt>
                <dd className="mt-4 flex flex-wrap gap-1.5">
                  {g.items.map((t) => (
                    <span key={t} className="rounded-sm bg-surface-2 px-2.5 py-1 text-sm text-fg">
                      {t}
                    </span>
                  ))}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </Section>

      <Section tone="dark" id="responsible-ai" eyebrow="Responsible AI" title={c.responsibleTitle} subtitle={c.responsibleSubtitle}>
        <Compare left={c.compare.left} right={c.compare.right} />
        <div className="frame-pad flex flex-wrap gap-3 pt-10">
          <ArrowLink href={routes.security} variant="outline">
            Security & compliance
          </ArrowLink>
          <ArrowLink href={routes.engineeringPage("ai-engineering")} variant="outline">
            AI engineering
          </ArrowLink>
        </div>
      </Section>

      {studies.length > 0 && (
        <Section tone="light" id="work" eyebrow="Case studies" title={c.caseStudiesTitle}>
          <CaseStudyGrid studies={studies.slice(0, 3)} columns={studies.length >= 3 ? 3 : 2} />
          <div className="frame-pad pt-10">
            <ArrowLink href={routes.caseStudies}>See all case studies</ArrowLink>
          </div>
        </Section>
      )}

      <Section
        tone="dark"
        id="start"
        label="How we start"
        eyebrow="How we start"
        title={
          <>
            <span className="font-light">{c.start.title.light}</span> <span className="font-semibold">{c.start.title.bold}</span>
          </>
        }
        subtitle={c.start.subtitle}
      >
        <StartPaths start={c.start} />
      </Section>

      <Section tone="light" eyebrow="Go deeper" title="Learn More About Our AI Work." flush>
        <LinkTiles items={c.related} columns={3} />
      </Section>

      <FaqSection faqs={c.faqs} tone="dark" />
      <ContactSection tone="light" defaultEngagement="AI as a Service" title="Tell us which work you'd hand to an agent." subtitle="Describe the workflow in a few lines. A senior AI lead replies within one business day with a first view on what's possible." />
      <PageCta content={c.cta} />
    </>
  );
}
