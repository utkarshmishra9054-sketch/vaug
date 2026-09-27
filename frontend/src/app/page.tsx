import { AiSpotlight } from "@/components/sections/AiSpotlight";
import { Audiences } from "@/components/sections/Audiences";
import { CaseStudies } from "@/components/sections/CaseStudies";
import { ClientGrid } from "@/components/sections/ClientGrid";
import { Cta } from "@/components/sections/Cta";
import { EngagementModels } from "@/components/sections/EngagementModels";
import { Faq } from "@/components/sections/Faq";
import { Hero } from "@/components/sections/Hero";
import { Insights } from "@/components/sections/Insights";
import { Manifesto } from "@/components/sections/Manifesto";
import { Outcomes } from "@/components/sections/Outcomes";
import { Principles } from "@/components/sections/Principles";
import { Stats } from "@/components/sections/Stats";
import { TechStack } from "@/components/sections/TechStack";
import { Testimonials } from "@/components/sections/Testimonials";
import { TickerBand } from "@/components/sections/TickerBand";
import { Band, SectionTitle } from "@/components/ui/Band";
import { ArrowLink } from "@/components/ui/Button";
import { SectionRail } from "@/components/ui/SectionRail";
import { getHomeContent } from "@/lib/content";

export default async function HomePage() {
  const c = await getHomeContent();

  return (
    <>
      <SectionRail
        items={[
          { id: "agents", label: "VAUG Agents" },
          { id: "models", label: "Ways to work" },
          { id: "work", label: "Case studies" },
          { id: "tech", label: "Technology" },
          { id: "process", label: "How we work" },
          { id: "audiences", label: "Who we serve" },
          { id: "insights", label: "Start here" },
          { id: "results", label: "Results" },
          { id: "faq", label: "FAQ" },
        ]}
      />
      <Hero content={c.hero} />
      <TickerBand items={c.hero.ticker} />
      <ClientGrid clients={c.clients} />
      <Manifesto content={c.manifesto} />
      <AiSpotlight content={c.aiSpotlight} />

      <Band tone="dark" id="models" label="Engagement models">
        <SectionTitle title={c.modelsIntro.title} subtitle={c.modelsIntro.subtitle} className="frame-pad py-20 lg:py-24" />
        <EngagementModels models={c.engagementModels} />
      </Band>

      <Band tone="light" label="VAUG in numbers">
        <Stats stats={c.stats} />
      </Band>

      <Band tone="light" id="work" label="Case studies">
        <SectionTitle title={c.caseStudiesTitle} className="frame-pad pb-10 pt-20 lg:pt-24" />
        <CaseStudies studies={c.caseStudies} />
        <div className="frame-pad flex justify-center pb-16">
          <ArrowLink href="/case-studies" variant="outline">
            View all {c.caseStudies.length} case studies
          </ArrowLink>
        </div>
      </Band>

      <Band tone="light" id="tech" label="Technology">
        <SectionTitle title={c.techTitle} align="center" className="frame-pad pb-10 pt-20 lg:pt-28" />
        <TechStack categories={c.techStack} />
        <div className="frame-pad flex justify-center pb-16 pt-4">
          <ArrowLink href="/engineering" variant="outline">
            Explore our engineering
          </ArrowLink>
        </div>
      </Band>

      <Band tone="dark" id="process" label="How we work">
        <SectionTitle title={c.principlesTitle} className="frame-pad py-20 lg:py-24" />
        <Principles items={c.principles} />
        <div className="frame-pad flex justify-center py-14">
          <ArrowLink href="/how-we-work">See how we work</ArrowLink>
        </div>
      </Band>

      <Band tone="light" id="audiences" label="Who we serve">
        <SectionTitle title={c.audiencesTitle} className="frame-pad py-20 lg:py-24" />
        <Audiences audiences={c.audiences} industries={c.industries} />
      </Band>

      <Band tone="light" id="insights" label="Insights">
        <SectionTitle title={c.insightsIntro.title} subtitle={c.insightsIntro.subtitle} className="frame-pad pt-20 lg:pt-24" />
        <div className="pb-20 pt-4 lg:pb-24">
          <Insights insights={c.insights} />
        </div>
      </Band>

      <Band tone="light" id="results" label="Client results">
        <SectionTitle
          title={c.outcomesTitle}
          subtitle="Real results from anonymised case studies. Pick one to read how we got there."
          align="center"
          className="frame-pad py-16 lg:py-20"
        />
        <Outcomes outcomes={c.outcomes} />
        <div className="frame-pad flex justify-center py-14">
          <ArrowLink href="/case-studies" variant="outline">
            Read all case studies
          </ArrowLink>
        </div>
      </Band>

      {c.testimonials.length > 0 && (
        <Band tone="light" id="testimonials" label="Testimonials">
          <SectionTitle title={c.testimonialsTitle} align="center" className="frame-pad border-b border-border py-16 lg:py-20" />
          <div className="py-10">
            <Testimonials testimonials={c.testimonials} />
          </div>
        </Band>
      )}

      <Band tone="light" id="faq" label="Frequently asked questions">
        <SectionTitle title="Questions We Hear Often." className="frame-pad py-16 lg:py-20" />
        <Faq faqs={c.faqs} />
      </Band>

      <Band tone="dark" id="contact" label="Contact">
        <Cta content={c.cta} />
      </Band>
    </>
  );
}
