import type { Metadata } from "next";

import { statement } from "@/content/accessibility";
import { routes } from "@/content/taxonomy";
import { MotionToggle } from "@/components/layout/MotionToggle";
import { PageCta, Prose } from "@/components/page/Blocks";
import { PageHero } from "@/components/page/PageHero";
import { Band } from "@/components/ui/Band";
import { ArrowLink } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: statement.meta.title,
  description: statement.meta.description,
  alternates: { canonical: routes.accessibility },
};

export default function AccessibilityStatementPage() {
  return (
    <>
      <PageHero
        breadcrumbs={[
          { label: "Home", href: routes.home },
          { label: "Accessibility", href: routes.accessibility },
        ]}
        eyebrow="Accessibility statement"
        title={{ light: "Built for everyone,", bold: "tested by hand." }}
        subtitle="How accessible vaug.in is, how we test it, the one known exception, and how to reach us if something doesn't work for you."
        tags={["WCAG 2.2 AA", "No overlays", `Last tested ${statement.updated}`]}
        primary={{ label: "See the full audit", href: `${routes.accessibilityAudits}#sample-report` }}
        secondary={{ label: "Email us", href: "mailto:hello@vaug.in" }}
      />
      <Band tone="light" label="Statement">
        <Prose sections={statement.sections} updated={statement.updated} />
        <div className="frame-pad flex max-w-3xl flex-col gap-6 pb-20 sm:flex-row sm:items-center lg:pb-24">
          <div className="flex items-center gap-3">
            <MotionToggle withLabel />
            <span className="text-sm text-muted">The same button sits in the header on every page.</span>
          </div>
          <ArrowLink href={routes.accessibilityAudits} variant="outline">
            How we audit accessibility
          </ArrowLink>
        </div>
      </Band>
      <PageCta />
    </>
  );
}
