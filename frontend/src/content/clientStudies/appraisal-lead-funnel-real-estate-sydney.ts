// TODO(content): the engagement scope and every figure in this study (appraisal
// requests, costs, signed agreements, duration, team, tech stack) are illustrative.
// Replace them with the real work VAUG did for Local Agency Co. and confirm each one
// with the client, including written consent to name them and show their logo,
// then remove `placeholder`.
import type { ApproachPhase, CaseStudyDetail, Feature } from "../types";

/**
 * Local Agency Co. · new website with rental listings, appraisal-request funnel
 * and Google / Meta ads for landlord and vendor leads. Draft: no confirmed facts yet.
 */

const f = (title: string, description: string): Feature => ({ title, description });
const p = (phase: string, when: string, description: string): ApproachPhase => ({ phase, when, description });

export const study: CaseStudyDetail = {
  slug: "appraisal-lead-funnel-real-estate-sydney",
  client: "Local Agency Co.",
  city: "Sydney, Australia",
  stage: "SME",
  industry: "Real Estate",
  model: "Growth Marketing",
  icon: "building",
  title: "An Appraisal Funnel That Quadrupled Landlord Leads for a Sydney Agency",
  summary:
    "A new website with live rental listings, a three-step appraisal request and Google and Meta campaigns aimed at landlords and vendors in Sydney's Eastern Suburbs and Lower North Shore.",
  metrics: [
    { value: "4.2×", label: "appraisal requests per month" },
    { value: "A$64", label: "cost per appraisal lead" },
    { value: "+27", label: "properties added to the rent roll" },
  ],
  tint: "#2f7c78",
  screen: [
    { label: "Appraisals this month", value: "38" },
    { label: "Cost per appraisal lead", value: "A$64" },
    { label: "New management agreements", value: "27" },
  ],
  logo: "/logos/local-agency-co.webp",
  sector: "real-estate",
  service: "build-with-us",
  // TODO(content): confirm client type.
  clientType: "Enterprise",
  region: "Australia",
  domain: "Website + rental listings + appraisal funnel + Google and Meta Ads",
  techStack: ["Next.js", "Sanity CMS", "PropertyMe", "HubSpot", "Google Ads", "Meta Ads", "GA4"],
  duration: "10 weeks to launch, then 4 months of campaigns",
  team: "4 people: growth lead, web developer, designer, performance marketer",
  about:
    "Local Agency Co. is a boutique property management and sales agency with more than twenty years' experience in Sydney's Eastern Suburbs and Lower North Shore. Its growth depends on winning new landlords to its rent roll and new vendors to sell, in suburbs where every large franchise agency competes for the same owners.",
  problems: [
    f("Leads came almost only from referrals.", "The old website attracted tenants looking for rentals, but very few landlords or vendors asked for an appraisal."),
    f("No clear path for owners.", "\"Rent my property\" sat alongside tenant links, and the appraisal form was a long, generic contact form."),
    f("Up against franchise budgets.", "Big-brand agencies outspent the team on portals and search, so every dollar had to target the right owners in the right suburbs."),
  ],
  solution:
    "We designed and built a new website that serves tenants and owners separately. Tenants get fast, filterable rental listings synced from the agency's property management system; owners get a clear route to a free rental or sales appraisal. The appraisal request is a three-step form (address, property details, preferred time) that takes under a minute and books straight into the principal's calendar. Around it we ran Google Search campaigns on owner searches like \"property management Bondi\" and \"rental appraisal Mosman\", and Meta ads to homeowners in the agency's suburbs, with separate landing pages for each area. Every request lands in the CRM with its suburb and source, and a monthly report shows appraisals, signed agreements and cost by suburb and channel.",
  features: [
    f("New website", "Separate journeys for tenants and owners, built for speed on mobile."),
    f("Live rental listings", "Listings synced from the property management system, with suburb, price and bedroom filters."),
    f("Three-step appraisal funnel", "A short request that books straight into the principal's calendar."),
    f("Google and Meta campaigns", "Search ads on owner keywords and suburb-targeted Meta ads to local homeowners."),
    f("Suburb-level reporting", "Appraisals, agreements and cost per lead by suburb and channel."),
  ],
  challenges: [
    f("Competing with franchise agencies", "We focused spend on the suburbs and searches where a boutique, local agency wins, rather than bidding on broad Sydney terms."),
    f("Two audiences on one site", "Tenants make up most of the traffic, so we kept their journey fast while making the owner call to action visible on every page."),
    f("Proving what works", "Appraisal requests were tracked through to signed agreements, so campaigns were judged on new managements, not form fills."),
  ],
  approach: [
    p("Discovery", "Weeks 1–2", "Mapped target suburbs, owner profiles and the appraisal process with the principal."),
    p("Design and build", "Weeks 3–8", "New website, listings sync and the three-step appraisal funnel."),
    p("Campaign launch", "Weeks 9–10", "Google Search and Meta campaigns with suburb landing pages and tracking."),
    p("Optimise", "Months 3–6", "Monthly tests on ads, audiences and the appraisal form, with budget moved to the best-performing suburbs."),
  ],
  results: {
    metrics: [
      { value: "4.2×", label: "appraisal requests per month (9 → 38)" },
      { value: "A$64", label: "cost per appraisal lead" },
      { value: "+27", label: "properties added to the rent roll" },
      { value: "18%", label: "appraisals turned into signed agreements" },
    ],
    narrative:
      "Appraisal requests grew from around nine a month, almost all referrals, to 38, and 27 new properties joined the rent roll in the first six months. The principal now sees which suburbs and channels bring owners who sign, and plans spend around the areas the agency wants to grow in.",
  },
  screenshots: [
    "Meta ads for landlords on Facebook, Instagram and Stories",
    "Rental appraisal landing page with the three-step request",
    "Local Agency Co.'s search ad for \"property management bondi\"",
    "Appraisal leads pipeline in HubSpot",
    "Monthly report by suburb and channel in Google Sheets",
  ],
  website: {
    url: "https://localagencyco.com",
    image: { src: "/sites/local-agency-co.webp", alt: "Local Agency Co. website home page", width: 1440, height: 900 },
  },
  ctaHeading: "Want more owners asking for an appraisal?",
  campaign: true,
  placeholder: true,
};
