// TODO(content): the engagement scope and every figure in this study (leads, costs,
// conversion rates, duration, team, tech stack) are illustrative. Replace them with
// the real work VAUG did for Invoice Interchange and confirm each one with the client,
// including written consent to name them and show their logo, then remove `placeholder`.
import type { ApproachPhase, CaseStudyDetail, Feature } from "../types";

/**
 * Invoice Interchange · SME lead generation (landing pages + Google Ads +
 * LinkedIn Ads + lead dashboard). Draft: no confirmed facts yet.
 */

const f = (title: string, description: string): Feature => ({ title, description });
const p = (phase: string, when: string, description: string): ApproachPhase => ({ phase, when, description });

export const study: CaseStudyDetail = {
  slug: "sme-lead-generation-fintech-singapore",
  client: "Invoice Interchange",
  city: "Singapore",
  stage: "Growth",
  industry: "Fintech & Insurance",
  model: "Growth Marketing",
  icon: "trending-up",
  title: "Landing Pages and Paid Campaigns That Tripled SME Financing Applications",
  summary:
    "A rebuilt website, eligibility-first landing pages, Google Ads and LinkedIn Ads for a Singapore invoice financing platform, tied together by one lead dashboard that tracks every application from click to funding.",
  metrics: [
    { value: "3.1×", label: "qualified applications per month" },
    { value: "−41%", label: "cost per qualified lead" },
    { value: "7.8%", label: "landing-page conversion" },
  ],
  tint: "#1f6fd1",
  screen: [
    { label: "Qualified leads this month", value: "142" },
    { label: "Cost per qualified lead", value: "S$125" },
    { label: "Landing-page conversion", value: "7.8%" },
  ],
  logo: "/logos/invoice-interchange.webp",
  sector: "fintech-insurance",
  service: "build-with-us",
  // TODO(content): confirm client type.
  clientType: "Startup",
  region: "Singapore",
  domain: "Website + landing pages + Google Ads + LinkedIn Ads + lead dashboard",
  techStack: ["Next.js", "HubSpot", "Google Ads", "LinkedIn Campaign Manager", "Google Tag Manager", "GA4", "Looker Studio"],
  duration: "12 weeks to launch, then 3 months of optimisation",
  team: "4 people: growth lead, performance marketer, web developer, designer",
  about:
    "Invoice Interchange is a Singapore invoice financing platform that helps small and medium-sized businesses get paid upfront on their outstanding invoices, so they can bridge the cash-flow gap while customers take 30, 60 or 90 days to pay. Most of its customers are founders and finance managers of B2B SMEs who have never used invoice financing and need to understand it, and trust it, before they apply.",
  problems: [
    f("A website built to inform, not convert.", "Visitors read about invoice financing but had no clear, quick way to check whether their business qualified."),
    f("Expensive, unqualified leads.", "Broad search campaigns brought in sole traders and consumers looking for personal loans, who could never be funded."),
    f("No view from click to funding.", "Marketing reported clicks and form fills; the credit team saw approvals. Nobody could say which campaigns produced funded businesses."),
  ],
  solution:
    "We rebuilt the website around one action: a two-minute eligibility check that asks for the details the credit team needs (UEN, annual revenue, typical invoice size and customer type) before a call is booked. Around it we built landing pages for each financing product and industry, then launched Google Ads on high-intent searches such as \"invoice financing Singapore\" and \"working capital loan for SMEs\", with tight negative keywords to filter out personal-loan traffic. LinkedIn Ads reached founders, CFOs and finance managers at Singapore companies with 10 to 200 staff. Every lead flows into HubSpot with its source and campaign, and a Looker Studio dashboard follows each one through to approval and first drawdown, so budget moves to the campaigns that fund businesses rather than the ones that fill forms.",
  features: [
    f("Eligibility-first landing pages", "A short, progressive form that pre-qualifies SMEs before they talk to sales."),
    f("Google Ads on high-intent searches", "Product and industry ad groups with negative keywords that keep personal-loan traffic out."),
    f("LinkedIn Ads for decision makers", "Sponsored posts and lead-gen forms aimed at founders, CFOs and finance managers."),
    f("CRM tracking from click to funding", "Every lead lands in HubSpot with its campaign, keyword and stage."),
    f("Lead dashboard", "Leads, cost per qualified lead and approvals by channel, updated daily."),
  ],
  challenges: [
    f("A regulated, trust-sensitive product", "Ad copy and landing pages had to be clear about fees and eligibility and avoid over-promising, so we reviewed every claim with the compliance team."),
    f("Small, expensive audiences", "B2B finance keywords and LinkedIn audiences are costly in Singapore, so we bid only where a qualified lead was likely and capped spend per ad group."),
    f("Long decision cycles", "Many SMEs compare options for weeks, so remarketing and follow-up emails kept Invoice Interchange in view until they were ready to apply."),
  ],
  approach: [
    p("Discovery", "Weeks 1–2", "Interviewed the sales and credit teams to define a qualified lead, audited past campaigns and set up tracking."),
    p("Website and landing pages", "Weeks 3–7", "Rebuilt the key pages, designed the eligibility check and launched product and industry landing pages."),
    p("Campaign launch", "Weeks 8–10", "Launched Google Ads and LinkedIn Ads with conversion tracking into HubSpot."),
    p("Lead dashboard", "Weeks 11–12", "Connected ads, CRM and approvals in one Looker Studio dashboard."),
    p("Optimise", "Months 4–6", "Weekly bid, keyword, audience and landing-page tests, with budget shifted to the campaigns that fund businesses."),
  ],
  results: {
    metrics: [
      { value: "3.1×", label: "qualified applications per month (46 → 142)" },
      { value: "−41%", label: "cost per qualified lead (S$212 → S$125)" },
      { value: "7.8%", label: "landing-page conversion" },
      { value: "620+", label: "applications in six months" },
    ],
    narrative:
      "Within six months of launch, qualified applications rose from 46 to 142 a month while the cost of each fell by 41%. The eligibility check means the sales team now speaks only to businesses that can be funded, and the lead dashboard shows exactly which keywords and audiences produce approvals, so every dollar of ad spend can be defended.",
  },
  screenshots: [
    "Google Ads campaigns for invoice-financing searches",
    "Invoice Interchange's search ad for \"invoice financing singapore\"",
    "LinkedIn ad preview and audience in Campaign Manager",
    "Landing page with the two-minute eligibility check",
    "Looker Studio lead dashboard by channel, cost and deal stage",
  ],
  website: {
    url: "https://www.invoiceinterchange.com",
    image: { src: "/sites/invoice-interchange.webp", alt: "Invoice Interchange website home page", width: 1440, height: 900 },
  },
  ctaHeading: "Need more qualified B2B leads, not just more clicks?",
  campaign: true,
  placeholder: true,
};
