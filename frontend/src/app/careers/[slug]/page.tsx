import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight, Briefcase, Clock, MapPin } from "lucide-react";

import { applyHref, careers, careersEmail, roleBySlug, roleHref, roles } from "@/content/careers";
import { aboutExploreCard } from "@/content/company";
import { routes } from "@/content/taxonomy";
import { ExploreCards, PageCta, companyExplore } from "@/components/page/Blocks";
import { PageHero } from "@/components/page/PageHero";
import { Section } from "@/components/page/Section";
import { HiringPath, RoleSection, RoleSnapshot } from "@/components/company/careers";
import { Band } from "@/components/ui/Band";
import { ArrowLink } from "@/components/ui/Button";
import { DemoBadge } from "@/components/ui/DemoBadge";

export const dynamicParams = false;

export async function generateStaticParams() {
  return roles.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata(props: PageProps<"/careers/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const role = roleBySlug(slug);
  if (!role) return {};
  return {
    title: `${role.title} · Careers`,
    description: `${role.summary} ${role.location}, ${role.type.toLowerCase()}.`,
  };
}

export default async function RolePage(props: PageProps<"/careers/[slug]">) {
  const { slug } = await props.params;
  const role = roleBySlug(slug);
  if (!role) notFound();

  const subject = `Application: ${role.title}`;
  const others = roles.filter((r) => r.slug !== role.slug).slice(0, 3);
  const facts = [
    { icon: MapPin, label: "Location", value: role.location },
    { icon: Clock, label: "Type", value: role.type },
    { icon: Briefcase, label: "Experience", value: role.experience },
  ];

  return (
    <>
      <PageHero
        breadcrumbs={[
          { label: "Home", href: routes.home },
          { label: "Careers", href: routes.careers },
          { label: role.title, href: roleHref(role.slug) },
        ]}
        eyebrow={role.department}
        title={role.title}
        subtitle={role.summary}
        tags={[role.location, role.type, role.experience]}
        primary={{ label: "Apply now", href: applyHref(subject) }}
        secondary={{ label: "Ask us a question", href: "#contact" }}
        aside={<RoleSnapshot role={role} />}
      />

      <Band tone="light" label="Role details">
        <div className="grid lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]">
          <div className="frame-pad border-border py-16 lg:border-r lg:py-20">
            {role.placeholder && (
              <p className="mb-8 flex items-center gap-2 text-sm text-muted">
                <DemoBadge show /> Sample role description
              </p>
            )}
            <section data-reveal className="pb-10">
              <h2 className="text-2xl font-semibold text-fg">About the role</h2>
              {role.about.map((p) => (
                <p key={p} className="mt-4 text-lg leading-relaxed text-muted">
                  {p}
                </p>
              ))}
            </section>
            <RoleSection title="What you'll do" items={role.responsibilities} />
            <RoleSection title="What you'll bring" items={role.requirements} />
            <RoleSection title="Nice to have" items={role.niceToHave} marker="plus" />
            <section data-reveal className="border-t border-border pt-10">
              <h2 className="text-2xl font-semibold text-fg">Tools you&apos;ll use</h2>
              <ul className="mt-6 flex flex-wrap gap-2">
                {role.stack.map((t) => (
                  <li key={t} className="rounded-sm bg-surface-2 px-3 py-1.5 text-sm text-fg">
                    {t}
                  </li>
                ))}
              </ul>
            </section>
          </div>

          <aside className="frame-pad py-16 lg:py-20" aria-label="Apply">
            <div className="lg:sticky lg:top-28">
              <div data-reveal className="rounded-lg border border-border bg-surface p-6 sm:p-8">
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent-text">At a glance</p>
                <dl className="mt-5 flex flex-col divide-y divide-border">
                  {facts.map((f) => (
                    <div key={f.label} className="flex items-center justify-between gap-4 py-3">
                      <dt className="flex items-center gap-2 text-sm text-muted">
                        <f.icon className="size-4" aria-hidden="true" /> {f.label}
                      </dt>
                      <dd className="text-right text-sm font-medium text-fg">{f.value}</dd>
                    </div>
                  ))}
                </dl>
                <div className="mt-6 flex flex-col gap-3">
                  <ArrowLink href={applyHref(subject)} className="justify-between py-2.5 pl-5 text-base">
                    Apply for this role
                  </ArrowLink>
                  <ArrowLink href="#contact" variant="outline" className="justify-between py-2.5 pl-5 text-base">
                    Ask a question first
                  </ArrowLink>
                </div>
                <p className="mt-5 text-sm leading-relaxed text-muted">
                  Send your CV or portfolio to{" "}
                  <a href={applyHref(subject)} className="link-underline font-medium text-accent-text">
                    {careersEmail}
                  </a>{" "}
                  with the role in the subject line. We reply to every application.
                </p>
              </div>
            </div>
          </aside>
        </div>
      </Band>

      <Section tone="dark" eyebrow="What happens next" title={careers.processTitle} subtitle={careers.processSubtitle}>
        <HiringPath steps={careers.process} />
      </Section>

      <Section tone="light" eyebrow="More openings" title="Other open roles." flush>
        <ul className="grid border-t border-border md:grid-cols-3">
          {others.map((r) => (
            <li key={r.slug} data-reveal className="border-b border-border md:border-r">
              <Link href={roleHref(r.slug)} data-glow className="group flex h-full flex-col p-8 transition-colors hover:bg-surface lg:p-10">
                <p className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-accent-text">
                  {r.department}
                  <DemoBadge show={r.placeholder} />
                </p>
                <h3 className="mt-3 text-xl font-semibold text-fg">{r.title}</h3>
                <p className="mt-2 text-sm text-muted">{r.location}</p>
                <ArrowUpRight className="mt-auto self-end pt-6 text-accent-text transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" size={36} strokeWidth={1.6} aria-hidden="true" />
              </Link>
            </li>
          ))}
        </ul>
        <div className="frame-pad py-10">
          <ArrowLink href={`${routes.careers}#roles`} variant="outline">
            All open roles
          </ArrowLink>
        </div>
      </Section>

      <Section tone="light" label="Explore VAUG" eyebrow="Keep exploring" title="Get to know us first." flush>
        <ExploreCards items={[aboutExploreCard, ...companyExplore.filter((e) => e.href !== routes.careers)]} />
      </Section>

      <PageCta content={careers.cta} />
    </>
  );
}
