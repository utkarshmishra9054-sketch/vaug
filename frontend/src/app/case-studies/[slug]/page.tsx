import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ViewTransition } from "react";
import { ArrowLeft, ArrowRight, Quote } from "lucide-react";

import { engagementOption, routes, sectorBySlug, serviceBySlug } from "@/content/taxonomy";
import { CaseToc } from "@/components/case-studies/CaseToc";
import { ScreenFrame } from "@/components/case-studies/ScreenFrame";
import { ContactSection, PageCta } from "@/components/page/Blocks";
import { CaseStudyGrid } from "@/components/page/CaseStudyCards";
import { MetricRow } from "@/components/page/FeatureGrid";
import { Breadcrumbs, HeroGlow } from "@/components/page/PageHero";
import { ScreenMock } from "@/components/sections/CaseStudies";
import { Band, SectionTitle } from "@/components/ui/Band";
import { ArrowLink } from "@/components/ui/Button";
import { DemoBadge } from "@/components/ui/DemoBadge";
import { getCaseStudies, getCaseStudy } from "@/lib/content";

export const dynamicParams = false;

export async function generateStaticParams() {
  const studies = await getCaseStudies();
  return studies.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata(props: PageProps<"/case-studies/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const study = await getCaseStudy(slug);
  if (!study) return {};
  return { title: study.title, description: study.summary };
}

const toc = [
  { id: "client", label: "About the client" },
  { id: "problem", label: "The problem" },
  { id: "solution", label: "Our solution" },
  { id: "features", label: "What we built" },
  { id: "challenges", label: "Challenges we solved" },
  { id: "approach", label: "Our approach" },
  { id: "results", label: "Results" },
];

function Block({ id, index, title, children }: { id: string; index: number; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="scroll-mt-28 border-b border-border py-14 last:border-b-0 lg:py-16">
      <p data-reveal className="font-mono text-xs uppercase tracking-[0.2em] text-accent-text">
        {String(index).padStart(2, "0")} · {title}
      </p>
      <div className="mt-6">{children}</div>
    </section>
  );
}

export default async function CaseStudyPage(props: PageProps<"/case-studies/[slug]">) {
  const { slug } = await props.params;
  const [study, all] = await Promise.all([getCaseStudy(slug), getCaseStudies()]);
  if (!study) notFound();

  const sector = study.sector ? sectorBySlug(study.sector) : undefined;
  const service = serviceBySlug(study.service);
  const i = all.findIndex((s) => s.slug === study.slug);
  const prev = all[(i - 1 + all.length) % all.length];
  const next = all[(i + 1) % all.length];
  const related = [
    ...all.filter((s) => s.slug !== study.slug && s.sector === study.sector),
    ...all.filter((s) => s.slug !== study.slug && s.service === study.service && s.sector !== study.sector),
    ...all.filter((s) => s.slug !== study.slug && s.sector !== study.sector && s.service !== study.service),
  ].slice(0, 3);

  const facts = [
    { label: "Client", value: study.client },
    { label: "Location", value: study.city },
    study.website && { label: "Website", value: new URL(study.website.url).hostname.replace(/^www\./, ""), href: study.website.url, external: true },
    { label: "Sector", value: sector?.label ?? study.industry, href: sector && routes.industry(sector.slug) },
    { label: "Service", value: service.label, href: routes.service(service.slug) },
    { label: "Duration", value: study.duration },
    { label: "Team", value: study.team },
  ].filter((f) => !!f && !!f.value) as { label: string; value: string; href?: string; external?: boolean }[];

  return (
    <>
      {/* Hero */}
      <Band tone="dark" rails={false} dots={false} label="Case study" backdrop={<HeroGlow tint={study.tint} />}>
        <div className="frame-pad relative pb-16 pt-32 sm:pt-36 lg:pt-40">
          <Breadcrumbs
            items={[
              { label: "Home", href: routes.home },
              { label: "Case Studies", href: routes.caseStudies },
              sector ? { label: sector.label, href: `${routes.caseStudies}?sector=${sector.slug}` } : { label: study.industry, href: `${routes.caseStudies}?q=${encodeURIComponent(study.industry)}` },
            ]}
          />
          <div className="mt-8 flex flex-wrap items-center gap-2">
            {sector ? (
              <Link href={routes.industry(sector.slug)} className="rounded-sm bg-surface-2 px-2.5 py-1 text-sm text-fg transition hover:bg-accent hover:text-accent-fg">
                {sector.label}
              </Link>
            ) : (
              <span className="rounded-sm bg-surface-2 px-2.5 py-1 text-sm text-fg">{study.industry}</span>
            )}
            <Link href={routes.service(service.slug)} className="rounded-sm bg-accent-soft px-2.5 py-1 text-sm text-accent-text transition hover:bg-accent hover:text-accent-fg">
              {service.label}
            </Link>
            <span className="rounded-sm border border-border px-2.5 py-1 font-mono text-xs text-muted">{study.region}</span>
            <DemoBadge show={study.placeholder} />
          </div>
          <h1 data-reveal className="mt-6 max-w-5xl text-[2.2rem] font-semibold leading-[1.08] text-fg sm:text-5xl lg:text-[3.6rem]">
            {study.title}
          </h1>
          <p data-reveal style={{ "--reveal-delay": "100ms" } as React.CSSProperties} className="mt-6 max-w-3xl text-lg leading-relaxed text-muted lg:text-xl">
            {study.summary}
          </p>
        </div>

        <div className="relative grid border-t border-border lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]">
          <ViewTransition name={`case-${study.slug}`} share="case-morph" default="none">
            <div className="h-80 sm:h-[26rem] lg:h-full lg:min-h-[26rem]">
              <ScreenMock study={study} />
            </div>
          </ViewTransition>
          <dl className="grid grid-cols-2 border-border max-lg:border-t lg:border-l">
            {facts.map((f) => (
              <div key={f.label} className="border-b border-border p-6 odd:border-r lg:p-7">
                <dt className="font-mono text-[11px] uppercase tracking-[0.2em] text-subtle">{f.label}</dt>
                <dd className="mt-2 text-sm leading-snug text-fg">
                  {f.external ? (
                    <a href={f.href} target="_blank" rel="noopener noreferrer" className="link-underline text-accent-text">
                      {f.value}
                    </a>
                  ) : f.href ? (
                    <Link href={f.href} className="link-underline text-accent-text">
                      {f.value}
                    </Link>
                  ) : (
                    f.value
                  )}
                </dd>
              </div>
            ))}
            {study.techStack.length > 0 && (
            <div className="col-span-2 p-6 lg:p-7">
              <dt className="font-mono text-[11px] uppercase tracking-[0.2em] text-subtle">Built with</dt>
              <dd className="mt-3 flex flex-wrap gap-1.5">
                {study.techStack.map((t) => (
                  <span key={t} className="rounded-sm bg-surface-2 px-2 py-1 font-mono text-xs text-fg">
                    {t}
                  </span>
                ))}
              </dd>
            </div>
            )}
          </dl>
        </div>
      </Band>

      {/* Headline results */}
      <Band tone="light" label="Headline results">
        <MetricRow metrics={study.results.metrics} />
      </Band>

      {/* Story with sticky contents */}
      <Band tone="light" label="The story">
        <div className="grid lg:grid-cols-[15rem_minmax(0,1fr)]">
          <aside className="hidden border-r border-border px-8 py-14 lg:block">
            <CaseToc items={toc} />
          </aside>
          <div className="frame-pad lg:px-14">
            <Block id="client" index={1} title="About the client">
              <p data-reveal className="max-w-3xl text-xl leading-relaxed text-fg sm:text-2xl sm:leading-relaxed">
                {study.about}
              </p>
            </Block>

            <Block id="problem" index={2} title="The problem">
              <ul className="grid gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-2">
                {study.problems.map((p, n) => (
                  <li key={p.title} data-reveal data-glow style={{ "--reveal-delay": `${n * 70}ms` } as React.CSSProperties} className="bg-surface p-6">
                    <span className="font-mono text-sm text-accent-text">{String(n + 1).padStart(2, "0")}</span>
                    <h3 className="mt-3 text-lg font-semibold text-fg">{p.title}</h3>
                    <p className="mt-2 leading-relaxed text-muted">{p.description}</p>
                  </li>
                ))}
              </ul>
            </Block>

            <Block id="solution" index={3} title="Our solution">
              <p data-reveal className="max-w-3xl text-lg leading-relaxed text-muted">
                {study.solution}
              </p>
            </Block>

            <Block id="features" index={4} title="What we built">
              <ul className="flex flex-col">
                {study.features.map((feat, n) => (
                  <li key={feat.title} data-reveal style={{ "--reveal-delay": `${n * 60}ms` } as React.CSSProperties} className="group grid gap-2 border-t border-border py-5 transition-colors sm:grid-cols-[14rem_minmax(0,1fr)] sm:gap-8">
                    <h3 className="flex items-center gap-3 font-semibold text-fg">
                      <span className="size-2 rounded-full transition-transform duration-300 group-hover:scale-150" style={{ background: study.tint }} aria-hidden="true" />
                      {feat.title}
                    </h3>
                    <p className="text-muted">{feat.description}</p>
                  </li>
                ))}
              </ul>
            </Block>

            {/* Mid-story CTA */}
            <div data-reveal className="relative my-4 overflow-hidden rounded-lg p-8 text-white sm:p-10" style={{ background: study.tint }}>
              <div className="absolute -right-16 -top-16 size-56 rounded-full bg-white/10" aria-hidden="true" />
              <div className="absolute bottom-0 right-24 size-24 rotate-12 rounded-md border-2 border-yellow/60" aria-hidden="true" />
              <p className="relative max-w-xl text-2xl font-semibold leading-snug sm:text-3xl">{study.ctaHeading}</p>
              <div className="relative mt-6">
                <ArrowLink href="#contact" variant="light">
                  Book a call
                </ArrowLink>
              </div>
            </div>

            <Block id="challenges" index={5} title="Challenges we solved">
              <ol className="grid gap-4 sm:grid-cols-3">
                {study.challenges.map((c, n) => (
                  <li key={c.title} data-reveal data-tilt style={{ "--reveal-delay": `${n * 80}ms` } as React.CSSProperties} className="rounded-lg border border-border bg-surface p-6">
                    <span className="inline-flex size-9 items-center justify-center rounded-md bg-accent text-sm font-bold text-accent-fg">{n + 1}</span>
                    <h3 className="mt-5 font-semibold text-fg">{c.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted">{c.description}</p>
                  </li>
                ))}
              </ol>
            </Block>

            <Block id="approach" index={6} title="Our approach">
              <ol data-reveal className="relative ml-2">
                <span className="cs-spine absolute bottom-3 left-0 top-3 w-px bg-gradient-to-b from-accent-text via-border-strong to-transparent" aria-hidden="true" />
                {study.approach.map((a, n) => (
                  <li key={a.phase} className="relative pb-8 pl-10 last:pb-0">
                    <span className="absolute left-0 top-1.5 flex size-4 -translate-x-1/2 items-center justify-center rounded-full border-2 border-accent-text bg-bg" aria-hidden="true">
                      <span className="size-1.5 rounded-full bg-accent-text" />
                    </span>
                    <p className="font-mono text-xs uppercase tracking-[0.15em] text-subtle">{a.when}</p>
                    <h3 className="mt-1 text-lg font-semibold text-fg">
                      <span className="text-accent-text">{String(n + 1).padStart(2, "0")}</span> {a.phase}
                    </h3>
                    <p className="mt-1 max-w-2xl text-muted">{a.description}</p>
                  </li>
                ))}
              </ol>
            </Block>

            <Block id="results" index={7} title="Results">
              <p data-reveal className="max-w-3xl text-xl leading-relaxed text-fg sm:text-2xl sm:leading-relaxed">
                {study.results.narrative}
              </p>
              {study.testimonial && (
                <figure data-reveal className="mt-10 rounded-lg border border-border bg-surface p-8">
                  <Quote className="size-8 text-accent-text" aria-hidden="true" />
                  <blockquote className="mt-4 text-xl leading-relaxed text-fg">“{study.testimonial.quote}”</blockquote>
                  <figcaption className="mt-5 text-sm text-muted">
                    <span className="font-semibold text-fg">{study.testimonial.name}</span>, {study.testimonial.role}
                  </figcaption>
                </figure>
              )}
            </Block>
          </div>
        </div>
      </Band>

      {/* Screens */}
      <Band tone="dark" label="Product screens">
        <SectionTitle
          title={study.images ? "Inside the work." : study.campaign ? "Inside the campaign." : "Inside the product."}
          subtitle={
            study.images
              ? "Screenshots from the live work. Click any screen to enlarge."
              : study.campaign
                ? "Key screens from the campaigns and reports. Click any screen to enlarge."
                : "Key screens from the build. Click any screen to enlarge."
          }
          className="frame-pad py-16 lg:py-20"
        />
        <div className="grid border-t border-border sm:grid-cols-2">
          {study.screenshots.map((caption, n) => (
            <ScreenFrame
              key={caption}
              slug={study.slug}
              caption={caption}
              tint={study.tint}
              index={n}
              screenIndex={n - (study.images?.length ?? 0)}
              image={study.images?.[n]}
            />
          ))}
          {study.website && (
            // Spans both columns when it would otherwise sit alone in the last row.
            <div className={study.screenshots.length % 2 === 0 ? "sm:col-span-2" : undefined}>
              <ScreenFrame
                slug={study.slug}
                caption={`${study.client}'s website today: ${new URL(study.website.url).hostname.replace(/^www\./, "")}`}
                tint={study.tint}
                index={study.screenshots.length}
                image={study.website.image}
              />
            </div>
          )}
        </div>
      </Band>

      {/* Prev / next */}
      <Band tone="light" label="More case studies">
        <nav aria-label="Case study navigation" className="grid border-b border-border sm:grid-cols-2">
          {[
            { s: prev, dir: "Previous", Icon: ArrowLeft },
            { s: next, dir: "Next", Icon: ArrowRight },
          ].map(({ s, dir, Icon }) => (
            <Link key={dir} href={routes.caseStudy(s.slug)} data-glow className={`group flex flex-col gap-3 p-8 transition-colors hover:bg-surface lg:p-10 ${dir === "Next" ? "sm:items-end sm:text-right" : "border-border max-sm:border-b sm:border-r"}`}>
              <span className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-subtle">
                {dir === "Previous" && <Icon className="size-4 transition-transform group-hover:-translate-x-1" aria-hidden="true" />}
                {dir} case study
                {dir === "Next" && <Icon className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />}
              </span>
              <span className="max-w-md text-lg font-semibold leading-snug text-fg">{s.title}</span>
            </Link>
          ))}
        </nav>
        <SectionTitle title="Related work." className="frame-pad py-16 lg:py-20" />
        <CaseStudyGrid studies={related} />
        <div className="frame-pad flex justify-center py-14">
          <ArrowLink href={routes.caseStudies} variant="outline">
            All case studies
          </ArrowLink>
        </div>
      </Band>

      <ContactSection title={study.ctaHeading} defaultEngagement={engagementOption(study.service)} />
      <PageCta />
    </>
  );
}
