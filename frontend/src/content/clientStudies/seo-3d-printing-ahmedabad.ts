import type { ApproachPhase, CaseStudyDetail, Feature } from "../types";

const f = (title: string, description: string): Feature => ({ title, description });
const p = (phase: string, when: string, description: string): ApproachPhase => ({ phase, when, description });

// Source: 2023 VAUG proposal. TODO(content): confirm written consent to name this client.
// FACT from the proposal: Ntech ranked on Google within 4 months of starting SEO.
// Everything else below (positions, enquiries, timings, team) is illustrative and must be confirmed with the client.
export const study: CaseStudyDetail = {
  slug: "seo-3d-printing-ahmedabad",
  client: "Ntech",
  city: "Ahmedabad, India",
  stage: "SME",
  industry: "3D printing",
  model: "SEO & Growth",
  icon: "cpu",
  title: "Local SEO That Put a 3D Printing Firm on Google Within Four Months",
  summary:
    "Keyword research, rebuilt service pages and local SEO for Ntech Engineering Solutions, an Ahmedabad 3D printing and prototyping firm that went from not ranking to ranking on Google within four months.",
  metrics: [
    { value: "4 months", label: "to rank on Google" },
    // TODO(content): illustrative, confirm with the client.
    { value: "Page 1", label: "for \"3d printing in ahmedabad\"" },
    // TODO(content): illustrative, confirm with the client.
    { value: "6×", label: "monthly enquiries from search" },
  ],
  tint: "#1f5f99",
  // TODO(content): illustrative dashboard values, apart from the four-month figure.
  screen: [
    { label: "Time to rank", value: "4 months" },
    { label: "Keywords on page one", value: "23" },
    { label: "Google Maps pack", value: "#2" },
  ],
  logo: "/logos/ntech.webp",
  service: "monthly-retainer",
  // TODO(content): confirm client type.
  clientType: "Startup",
  region: "India",
  domain: "Local SEO (keyword research, on-page, technical and Google Business Profile)",
  // TODO(content): confirm the tools used on this engagement.
  techStack: ["Google Search Console", "Google Analytics 4", "Google Business Profile", "Semrush", "Screaming Frog", "WordPress"],
  // TODO(content): illustrative, confirm engagement length and team.
  duration: "4 months to rank, then an ongoing monthly retainer",
  team: "2 people: SEO lead and content writer, with a web developer for fixes",
  about:
    "Ntech Engineering Solutions is a 3D printing and additive manufacturing company on Prahladnagar Road in Ahmedabad. It offers FDM, SLA and industrial 3D printing, rapid prototyping and 3D design for businesses that need to turn digital designs into real parts quickly. Its work and its reviews were strong, but its website didn't rank for the searches that bring in buyers, so new enquiries depended on word of mouth.",
  problems: [
    // TODO(content): illustrative problem statements, confirm with the client.
    f("Not ranking.", "The website didn't appear in Google's results for \"3d printing in ahmedabad\" or any of its services."),
    f("One page for everything.", "All services sat on a single page, so no page matched what a specific buyer searched for."),
    f("Weak local signals.", "The Google Business Profile was incomplete and the business details didn't match across the web."),
  ],
  solution:
    "We began with keyword research focused on Ahmedabad and Gujarat, sorting hundreds of searches by intent so each could be matched to one page. We gave every core service (FDM printing, SLA printing, rapid prototyping and industrial 3D printing) its own page with a clear title, heading, FAQs and structured data, and built a dedicated Ahmedabad page for the main local search. We fixed technical issues, submitted a clean sitemap and optimised the Google Business Profile so the business details matched everywhere. Guides answering cost and material questions brought in buyers earlier in their research. Within four months, Ntech was ranking on Google.",
  features: [
    f("Local keyword research", "Hundreds of 3D printing searches in Ahmedabad and Gujarat, sorted by intent."),
    f("A page per service", "Dedicated, optimised pages for FDM, SLA, rapid prototyping and industrial printing."),
    f("Google Business Profile", "A complete profile with services, photos and consistent business details."),
    f("Technical fixes", "Clean sitemap, faster pages and LocalBusiness and FAQ schema."),
    f("Buyer guides", "Content on cost, materials and lead times that links to the right service."),
  ],
  challenges: [
    f("Starting from zero", "The site didn't rank at all, so the first gains had to come from pages Google could clearly understand."),
    f("A crowded local market", "Several established 3D printing firms already compete for the same Ahmedabad searches."),
    f("Technical buyers", "Engineers search in precise terms, so copy had to be accurate about processes and materials."),
  ],
  // TODO(content): illustrative timings, confirm with the client.
  approach: [
    p("Research", "Weeks 1–2", "Local keyword research, competitor review and a keyword-to-page plan."),
    p("Fix the foundations", "Weeks 2–4", "Technical fixes, sitemap, page speed and structured data."),
    p("Service pages", "Weeks 4–8", "New and rewritten pages for each service and for Ahmedabad."),
    p("Local SEO", "Weeks 6–10", "Google Business Profile, consistent business listings and reviews."),
    p("Content and tracking", "Month 3 onwards", "Buyer guides, rank tracking and monthly reporting."),
  ],
  results: {
    metrics: [
      { value: "4 months", label: "to rank on Google" },
      // TODO(content): illustrative, confirm with the client.
      { value: "23", label: "keywords on Google's first page" },
      // TODO(content): illustrative, confirm with the client.
      { value: "#2", label: "in the Google Maps pack for Ahmedabad" },
      // TODO(content): illustrative, confirm with the client.
      { value: "6×", label: "monthly enquiries from search" },
    ],
    // TODO(content): only "ranked on Google within 4 months" is from the proposal; the rest is illustrative.
    narrative:
      "Ntech was ranking on Google within four months of starting SEO. \"3d printing in ahmedabad\" moved from outside the top 100 to the first page, the business now appears in the Google Maps pack for local searches, and 23 of its 42 target keywords rank on page one. Monthly enquiries from search grew six-fold by month six, most of them through the new Ahmedabad and rapid prototyping pages. We continue to track rankings and report every month.",
  },
  screenshots: [
    "Keyword research for 3D printing in Ahmedabad in Semrush's Keyword Magic Tool",
    "Semrush rankings distribution, January to June: tracked keywords reaching Google's first page",
    "Google results for \"3d printing in ahmedabad\" with Ntech second in the Maps pack",
    "Rapid prototyping service page, rebuilt for search",
    "GA4: enquiries (generate_lead) by channel, with organic search leading",
  ],
  website: { url: "https://ntechsolutions.co.in", image: { src: "/sites/ntech.webp", alt: "Ntech website home page", width: 1440, height: 900 } },
  ctaHeading: "Want buyers in your city to find you first?",
  campaign: true,
  placeholder: true,
};
