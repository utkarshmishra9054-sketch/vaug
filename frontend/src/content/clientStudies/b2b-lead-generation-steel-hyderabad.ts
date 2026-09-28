import type { ApproachPhase, CaseStudyDetail, Feature } from "../types";

/**
 * Pennar Industries · B2B lead generation (Google Ads + LinkedIn + landing pages).
 *
 * TODO(content): no confirmed result exists for this engagement. The scope,
 * every figure and every claim below are illustrative and must be confirmed
 * (or replaced) with the client before this study is published.
 */

const f = (title: string, description: string): Feature => ({ title, description });
const p = (phase: string, when: string, description: string): ApproachPhase => ({ phase, when, description });

export const study: CaseStudyDetail = {
  slug: "b2b-lead-generation-steel-hyderabad",
  client: "Pennar Industries",
  city: "Hyderabad, India",
  stage: "Enterprise",
  industry: "Industrial",
  model: "B2B Lead Generation",
  icon: "hammer",
  // TODO(content): illustrative headline figure, confirm with the client.
  title: "B2B Lead Generation That Brought Pennar Industries 860 Qualified RFQs",
  // TODO(content): illustrative scope and figure, confirm with the client.
  summary:
    "Search, LinkedIn and product landing pages for a Hyderabad steel and engineering products manufacturer, turning buyers searching for pre-engineered buildings and precision tubes into 860 qualified RFQs.",
  metrics: [
    // TODO(content): illustrative, confirm with the client.
    { value: "860", label: "qualified RFQs" },
    // TODO(content): illustrative, confirm with the client.
    { value: "-42%", label: "cost per qualified lead" },
    // TODO(content): illustrative, confirm with the client.
    { value: "38%", label: "enquiries qualified by sales" },
  ],
  tint: "#0b4f9c",
  screen: [
    // TODO(content): illustrative, confirm with the client.
    { label: "Enquiries", value: "2,260" },
    // TODO(content): illustrative, confirm with the client.
    { label: "Qualified RFQs", value: "860" },
    // TODO(content): illustrative, confirm with the client.
    { label: "Cost per qualified lead", value: "₹1,450" },
  ],
  logo: "/logos/pennar-industries.webp",
  service: "monthly-retainer",
  // TODO(content): confirm client type.
  clientType: "Enterprise",
  region: "India",
  domain: "B2B lead generation: Google Ads, LinkedIn and product landing pages",
  techStack: ["Google Ads", "LinkedIn Campaign Manager", "GA4", "Google Tag Manager", "HubSpot", "Webflow", "Looker Studio"],
  // TODO(content): illustrative engagement length, confirm with the client.
  duration: "9 months (ongoing)",
  // TODO(content): illustrative team, confirm with the client.
  team: "4 people: campaign lead, performance marketer, B2B copywriter, web developer",
  about:
    "Pennar Industries is a Hyderabad-based manufacturer of steel and engineering products, from cold-rolled steel strips and precision tubes to pre-engineered buildings, solar mounting structures and hydraulic systems, supplying industrial, infrastructure and automotive customers across India. Most new business came through existing relationships and distributors. Pennar wanted a steady flow of enquiries from new buyers researching suppliers online.",
  problems: [
    f("Buyers search before they call.", "Procurement teams and consultants shortlist suppliers online, and Pennar rarely appeared for product searches."),
    f("Broad catalogue, generic pages.", "Enquiries landed on general pages that did not answer specifications, capacity or lead-time questions."),
    f("Unqualified enquiries.", "Early leads mixed students, job seekers and small traders with genuine project buyers."),
  ],
  solution:
    "We set up B2B lead generation around Pennar's highest-value product lines. Google Search campaigns targeted product and specification keywords such as pre-engineered buildings, precision steel tubes and solar module mounting structures, with negative keywords to filter out jobs and retail searches. Each product line got its own landing page with specifications, capacity, certifications, project references and a short RFQ form asking for quantity, location and timeline. LinkedIn sponsored content reached procurement heads, plant managers and EPC contractors, and every enquiry flowed into HubSpot, where the sales team qualified it and the result was fed back to the campaigns.",
  features: [
    f("Product keyword campaigns", "Search campaigns per product line with specification and intent keywords."),
    f("RFQ landing pages", "Specs, certifications, project references and a short RFQ form per product."),
    f("LinkedIn sponsored content", "Ads for procurement heads, plant managers and EPC contractors."),
    f("CRM integration", "Every enquiry in HubSpot with product, source and qualification stage."),
    f("Lead-quality feedback", "Sales outcomes fed back so bids favour keywords that bring real projects."),
  ],
  challenges: [
    f("Long sales cycles", "Industrial deals take months, so we optimised for qualified RFQs rather than final orders."),
    f("Low search volume", "Specialist products have few searches, so every keyword and match type was managed closely."),
    f("Lead quality", "Negative keywords, form questions and sales feedback kept junk enquiries out."),
  ],
  approach: [
    p("Research", "Weeks 1–2", "Mapped product lines, buyer roles and keywords with the sales team."),
    p("Landing pages", "Weeks 2–4", "Built RFQ landing pages per product line with tracked forms."),
    p("Launch", "Week 5", "Launched Google Search and LinkedIn campaigns connected to HubSpot."),
    p("Qualify", "Weekly", "Reviewed enquiries with sales and fed qualification back into bidding."),
    p("Scale", "Monthly", "Moved budget to the products and keywords producing qualified RFQs."),
  ],
  results: {
    metrics: [
      // TODO(content): illustrative, confirm with the client.
      { value: "2,260", label: "B2B enquiries" },
      // TODO(content): illustrative, confirm with the client.
      { value: "860", label: "qualified RFQs" },
      // TODO(content): illustrative, confirm with the client.
      { value: "₹1,450", label: "average cost per qualified lead" },
      // TODO(content): illustrative, confirm with the client.
      { value: "-42%", label: "cost per qualified lead, month 1 to month 9" },
    ],
    // TODO(content): every figure in this narrative is illustrative; confirm with the client.
    narrative:
      "Over nine months the campaigns brought in 2,260 B2B enquiries, of which 860 were qualified by Pennar's sales team as genuine RFQs. Pre-engineered buildings and precision tubes produced the most qualified leads. Feeding sales outcomes back into bidding cut the cost per qualified lead by 42% between the first and ninth months, to about ₹1,210, for an average of around ₹1,450 across the engagement.",
  },
  screenshots: [
    "Google Ads: search campaigns by product line, Apr–Dec 2024",
    "Google search for “pre engineered building manufacturers in india” with Pennar's sponsored result",
    "Pre-engineered buildings landing page with the RFQ form",
    "LinkedIn Campaign Manager ad preview: sponsored post for procurement heads",
    "HubSpot deals board: the B2B RFQ pipeline by stage",
  ],
  website: { url: "https://pennarindia.com", image: { src: "/sites/pennar-industries.webp", alt: "Pennar Industries website home page", width: 1440, height: 900 } },
  ctaHeading: "Want more RFQs from new buyers?",
  campaign: true,
  placeholder: true,
};
