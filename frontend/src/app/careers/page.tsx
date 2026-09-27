import type { Metadata } from "next";

import { applyHref, careers, careersEmail, departments, locationGroups, roles } from "@/content/careers";
import { aboutExploreCard } from "@/content/company";
import { routes } from "@/content/taxonomy";
import { ExploreCards, PageCta, companyExplore } from "@/components/page/Blocks";
import { FeatureGrid } from "@/components/page/FeatureGrid";
import { PageHero } from "@/components/page/PageHero";
import { Section } from "@/components/page/Section";
import { HiringPath, OpenApplication, PerksGrid, RoleStack } from "@/components/company/careers";
import { RolesBoard } from "@/components/company/RolesBoard";
import { Band } from "@/components/ui/Band";

export const metadata: Metadata = {
  title: "Careers",
  description: careers.metaDescription,
};

export default function CareersPage() {
  const c = careers;
  const summaries = roles.map(({ slug, title, department, location, locationGroup, type, experience, summary, placeholder }) => ({
    slug,
    title,
    department,
    location,
    locationGroup,
    type,
    experience,
    summary,
    placeholder,
  }));

  return (
    <>
      <PageHero
        breadcrumbs={[
          { label: "Home", href: routes.home },
          { label: "Careers", href: routes.careers },
        ]}
        eyebrow={c.hero.eyebrow}
        title={c.hero.title}
        subtitle={c.hero.subtitle}
        tags={c.hero.tags}
        primary={{ label: `See ${roles.length} open roles`, href: "#roles" }}
        secondary={{ label: "Our culture", href: routes.culture }}
        aside={<RoleStack roles={roles} />}
      />

      <Section tone="light" id="why" eyebrow="Why VAUG" title={c.whyTitle} flush>
        <FeatureGrid columns={3} items={c.why} />
      </Section>

      <Section tone="dark" id="perks" eyebrow="Perks" title={c.perksTitle} flush>
        <PerksGrid perks={c.perks} />
      </Section>

      <Section tone="light" id="process" eyebrow="Hiring process" title={c.processTitle} subtitle={c.processSubtitle}>
        <HiringPath steps={c.process} />
      </Section>

      <Section tone="dark" id="roles" eyebrow="Open roles" title={c.rolesTitle} subtitle={c.rolesSubtitle} flush>
        <RolesBoard roles={summaries} departments={departments} locations={locationGroups} />
      </Section>

      <Band tone="light" label={c.fallback.title}>
        <OpenApplication title={c.fallback.title} text={c.fallback.text} href={applyHref(c.fallback.subject)} email={careersEmail} />
      </Band>

      <Section tone="light" label="Explore VAUG" eyebrow="Keep exploring" title="Get to know us first." flush>
        <ExploreCards items={[aboutExploreCard, ...companyExplore.filter((e) => e.href !== routes.careers)]} />
      </Section>

      <PageCta content={c.cta} />
    </>
  );
}
