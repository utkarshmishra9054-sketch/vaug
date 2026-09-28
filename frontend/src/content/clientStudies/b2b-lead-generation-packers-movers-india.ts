import type { ApproachPhase, CaseStudyDetail, Feature } from "../types";

/**
 * Devgun Packers & Movers · B2B lead generation (Google Ads, local SEO, landing pages).
 * Source: 2023 VAUG proposal. The only confirmed outcome is "new moving orders from B2B clients" (no number given).
 * TODO(content): confirm written consent to name this client and show its logo.
 * TODO(content): every figure below is illustrative and must be confirmed with the client before `placeholder` is removed.
 */

const f = (title: string, description: string): Feature => ({ title, description });
const p = (phase: string, when: string, description: string): ApproachPhase => ({ phase, when, description });

export const study: CaseStudyDetail = {
  slug: "b2b-lead-generation-packers-movers-india",
  client: "Devgun Packers & Movers",
  // TODO(content): confirm the city the company operates from.
  city: "India",
  // TODO(content): confirm company stage.
  stage: "Established",
  industry: "Logistics",
  model: "Lead Generation",
  icon: "workflow",
  title: "B2B Lead Generation That Brought New Moving Orders From Businesses",
  summary:
    "Google Ads, a stronger Google Business Profile and dedicated quote pages for a packers and movers company that wanted office and corporate relocation work, not just household shifting, and began winning new moving orders from B2B clients.",
  metrics: [
    { value: "New", label: "moving orders from B2B clients" },
    // TODO(content): illustrative. Confirm the change in business quote requests with the client.
    { value: "3×", label: "business quote requests" },
    // TODO(content): illustrative. Confirm map-pack position for the main search terms.
    { value: "Top 3", label: "in local map results" },
  ],
  tint: "#c81e1e",
  // TODO(content): illustrative dashboard rows. Confirm with the client.
  screen: [
    { label: "B2B quote requests", value: "3×" },
    { label: "Calls from Google", value: "+140%" },
    { label: "Map-pack position", value: "Top 3" },
  ],
  logo: "/logos/devgun-packers-movers.webp",
  sector: "logistics",
  service: "monthly-retainer",
  // TODO(content): confirm client type.
  clientType: "Enterprise",
  region: "India",
  domain: "B2B lead generation (Google Ads, local SEO and landing pages)",
  techStack: ["Google Ads", "Google Business Profile", "GA4", "Google Tag Manager", "Google Search Console", "WhatsApp Business", "Looker Studio"],
  // TODO(content): confirm campaign length and team.
  duration: "4 months (ongoing retainer)",
  team: "3 people: paid search specialist, local SEO specialist, web designer",
  about:
    "Devgun Packers and Movers provides professional packing and moving for office relocation and home shifting, within India and abroad: local shifts, inter-city moves and international relocations. Most of its enquiries came from households by word of mouth and directory listings. Corporate moves are larger, more regular and more valuable, so the company wanted a steady flow of enquiries from businesses.",
  problems: [
    f("Few business enquiries.", "Most leads were one-off household moves with small budgets."),
    f("Directory dependence.", "Lead directories sold the same enquiry to several competing movers."),
    f("No page for businesses.", "The website spoke to families; office managers and HR teams had nowhere to request a corporate quote."),
  ],
  solution:
    "We built B2B-focused Google Ads campaigns around searches such as office relocation, corporate shifting and commercial movers, with location targeting on the business districts and industrial areas the company serves. Every ad pointed to a dedicated quote page for businesses, with a short form covering move type, sites, dates and headcount, plus click-to-call and WhatsApp. We claimed and optimised the Google Business Profile with the right categories, services, photos and regular posts, and put a simple review request after every completed move. Calls, forms and WhatsApp chats were tracked as conversions so spend followed the enquiries that turned into orders.",
  features: [
    f("B2B search campaigns", "Ads for office relocation, corporate shifting and commercial moving searches."),
    f("Quote landing page", "A page for businesses with a short, structured quote form."),
    f("Google Business Profile", "Categories, services, photos, posts and reviews that win local map results."),
    f("Call and WhatsApp tracking", "Every call, form and chat tracked back to the campaign and keyword."),
    f("Monthly lead report", "Enquiries by source and type, with notes on which became orders."),
  ],
  challenges: [
    f("Household vs business intent", "Moving searches are mostly from households; keywords, negatives and ad copy kept spend on business moves."),
    f("A crowded local market", "Many movers compete for the same searches, so the profile and reviews had to earn trust at a glance."),
    f("Long sales cycles", "Corporate moves take weeks to confirm, so we tracked enquiries through to orders with the sales team."),
  ],
  approach: [
    // TODO(content): illustrative timings. Confirm with the client.
    p("Research", "Weeks 1–2", "Mapped B2B search terms, target areas and competitors with the sales team."),
    p("Profile and pages", "Weeks 2–4", "Optimised Google Business Profile and built the business quote page."),
    p("Launch", "Weeks 4–5", "Launched B2B search campaigns with call, form and WhatsApp tracking."),
    p("Optimise", "Ongoing", "Weekly search-term reviews, bid changes and new reviews on the profile."),
  ],
  results: {
    metrics: [
      { value: "New", label: "moving orders from B2B clients" },
      // TODO(content): illustrative. Confirm these three figures with the client.
      { value: "3×", label: "business quote requests" },
      { value: "+140%", label: "calls from Google" },
      { value: "Top 3", label: "in local map results" },
    ],
    // TODO(content): only "new moving orders from B2B clients" is confirmed; the rest of this narrative is illustrative.
    narrative:
      "The campaigns gave Devgun Packers and Movers a direct line to businesses planning a move. Office managers and HR teams now find the company through search ads and local map results, request quotes on a page built for them, and the company has won new moving orders from B2B clients alongside its household work.",
  },
  screenshots: [
    "Mobile search ad, local map results and a WhatsApp enquiry",
    "Google Business Profile listing on Search",
    "Business quote request landing page",
    "Google Ads campaigns with call, form and WhatsApp conversions",
    "Monthly lead report by source in Looker Studio",
  ],
  website: { url: "https://devgunpackersandmovers.com", image: { src: "/sites/devgun-packers-movers.webp", alt: "Devgun Packers & Movers website home page", width: 1440, height: 900 } },
  ctaHeading: "Want more business clients?",
  campaign: true,
  placeholder: true,
};
