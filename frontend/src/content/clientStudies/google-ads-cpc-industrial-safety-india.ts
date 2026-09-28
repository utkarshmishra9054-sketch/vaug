import type { ApproachPhase, CaseStudyDetail, Feature } from "../types";

/**
 * JAS Associates · Google Ads (search).
 * Source: 2023 VAUG proposal. The only confirmed figure is "36% lower cost per click in under 3 months".
 * TODO(content): confirm written consent to name this client and show its logo.
 * TODO(content): every other figure, date and claim below is illustrative and must be confirmed with the client before `placeholder` is removed.
 */

const f = (title: string, description: string): Feature => ({ title, description });
const p = (phase: string, when: string, description: string): ApproachPhase => ({ phase, when, description });

export const study: CaseStudyDetail = {
  slug: "google-ads-cpc-industrial-safety-india",
  client: "JAS Associates",
  // TODO(content): confirm the city the firm operates from.
  city: "India",
  // TODO(content): confirm company stage.
  stage: "Established",
  industry: "Industrial safety",
  model: "Google Ads",
  icon: "shield",
  title: "Google Ads That Cut Cost per Click by 36% in Under Three Months",
  summary:
    "Search campaigns for an industrial safety and compliance consultancy: a rebuilt account structure, tighter keywords, better ads and landing pages that cut cost per click by 36% in under three months.",
  metrics: [
    { value: "-36%", label: "cost per click" },
    { value: "< 3 months", label: "to reach it" },
    // TODO(content): illustrative. Confirm the change in enquiries with the client.
    { value: "+56%", label: "clicks on the same budget" },
  ],
  tint: "#c2410c",
  // TODO(content): illustrative rupee figures (₹42.0 to ₹26.9 matches the confirmed 36% drop). Confirm actual CPCs.
  screen: [
    { label: "Avg. CPC", value: "₹26.9" },
    { label: "CPC change", value: "-36%" },
    { label: "Quality Score (avg.)", value: "8/10" },
  ],
  logo: "/logos/jas-associates.webp",
  service: "monthly-retainer",
  // TODO(content): confirm client type.
  clientType: "Enterprise",
  region: "India",
  domain: "Google Ads (search) and landing pages",
  techStack: ["Google Ads", "Google Tag Manager", "GA4", "Looker Studio"],
  // TODO(content): confirm campaign length and team.
  duration: "12 weeks (then ongoing)",
  team: "2 people: paid search specialist, landing-page designer",
  about:
    "JAS Associates helps factories, plants and industrial sites stay safe and compliant. With more than twelve years in industrial safety, the firm provides end-to-end SHE (safety, health and environment) management, statutory approvals, training certifications and PESO licensing. Most of its new clients search for these services on Google, where competition from national consultancies and directories drives click prices up.",
  problems: [
    f("Expensive clicks.", "Broad keywords and a flat account structure were pushing cost per click up."),
    f("Wasted spend.", "Ads showed for job seekers, students and free-template searches that would never become clients."),
    f("Generic ads.", "One set of ads and one landing page served every service, so relevance and Quality Scores were low."),
  ],
  solution:
    "We rebuilt the Google Ads account around JAS Associates' services, with tightly themed ad groups for SHE consultancy, safety audits, training certification, statutory approvals and PESO licensing. We moved spend from broad match to phrase and exact match, and added a growing negative-keyword list to filter out jobs, courses and free downloads. Each ad group got its own responsive search ads and extensions, pointing at a matching service page with a short quote form. Better relevance lifted Quality Scores, and bids were set by device, location and hour from the data, which brought cost per click down by 36% in under three months.",
  features: [
    f("Service-led account structure", "Tightly themed ad groups for each service, from SHE audits to PESO licensing."),
    f("Negative keywords", "Filters for jobs, courses, free templates and other searches that never convert."),
    f("Relevant ads", "Responsive search ads and extensions written for each service."),
    f("Matching landing pages", "Service pages with a short quote form and clear proof of expertise."),
    f("Bid adjustments", "Bids tuned by device, location and time of day from campaign data."),
  ],
  challenges: [
    f("Competitive search terms", "National consultancies and directories bid on the same terms, so relevance, not budget, had to win the auction."),
    f("Mixed intent", "Safety searches often come from students and job seekers; negatives and ad copy screened them out."),
    f("Fast payback", "The client wanted to see lower costs within a quarter, so changes were prioritised by impact on spend."),
  ],
  approach: [
    // TODO(content): illustrative timings. Confirm with the client.
    p("Audit", "Week 1", "Reviewed search terms, Quality Scores and wasted spend in the existing account."),
    p("Restructure", "Weeks 2–3", "Rebuilt campaigns and ad groups by service and tightened match types."),
    p("Ads and pages", "Weeks 3–5", "Wrote new ads and extensions and matched each ad group to a service page."),
    p("Optimise", "Weeks 6–12", "Weekly search-term reviews, negatives and bid adjustments."),
  ],
  results: {
    metrics: [
      { value: "-36%", label: "cost per click" },
      { value: "< 3 months", label: "to reach it" },
      // TODO(content): illustrative. Confirm these two figures with the client.
      { value: "8/10", label: "average Quality Score (from 5)" },
      { value: "+56%", label: "clicks on the same budget" },
    ],
    // TODO(content): only the 36% CPC drop in under three months is confirmed; the rest of this narrative is illustrative.
    narrative:
      "In under three months, JAS Associates' average cost per click fell by 36%. More relevant ads and landing pages lifted Quality Scores, and tighter keywords stopped spend leaking to searches that would never convert. The same monthly budget now buys far more qualified clicks from plant managers and safety officers looking for compliance support.",
  },
  screenshots: [
    "Search ad in top position",
    "Google Ads campaigns by service",
    "Average cost per click by week over 12 weeks",
    "Search terms report, with junk searches being added as negatives",
    "PESO licence landing page with quote form",
  ],
  website: { url: "https://jas-associates.com", image: { src: "/sites/jas-associates.webp", alt: "JAS Associates website home page", width: 1440, height: 900 } },
  ctaHeading: "Paying too much per click?",
  campaign: true,
  placeholder: true,
};
