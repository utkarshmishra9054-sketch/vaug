// TODO(content): the engagement scope and every figure in this study (enquiries,
// costs, reply times, duration, team, tech stack) are illustrative. Replace them with
// the real work VAUG did for Well Aliments Brazil and confirm each one with the
// client, including written consent to name them and show their logo, then remove
// `placeholder`.
import type { ApproachPhase, CaseStudyDetail, Feature } from "../types";

/**
 * Well Aliments Brazil · bilingual B2B website + Google Ads + WhatsApp enquiry
 * funnel for distributor, private-label and bulk-supply leads. Draft: no confirmed facts yet.
 */

const f = (title: string, description: string): Feature => ({ title, description });
const p = (phase: string, when: string, description: string): ApproachPhase => ({ phase, when, description });

export const study: CaseStudyDetail = {
  slug: "b2b-whatsapp-leads-food-sao-paulo",
  client: "Well Aliments Brazil",
  city: "São Paulo, Brazil",
  stage: "Established",
  industry: "Logistics",
  model: "Growth Marketing",
  icon: "message-square",
  title: "A B2B Website and WhatsApp Funnel That Quadrupled Distributor Enquiries",
  summary:
    "A bilingual B2B website, Google Ads in Brazil and export markets, and a WhatsApp enquiry flow that qualifies private-label and bulk-supply buyers before they reach the sales team.",
  metrics: [
    { value: "4.3×", label: "qualified B2B enquiries per month" },
    { value: "R$38", label: "cost per qualified enquiry" },
    { value: "4 min", label: "median first reply" },
  ],
  tint: "#0e8a5c",
  screen: [
    { label: "Enquiries this month", value: "96" },
    { label: "Via WhatsApp", value: "68%" },
    { label: "Cost per enquiry", value: "R$38" },
  ],
  logo: "/logos/well-aliments.webp",
  sector: "logistics",
  service: "build-with-us",
  // TODO(content): confirm client type.
  clientType: "Enterprise",
  region: "Brazil",
  domain: "B2B website + Google Ads + WhatsApp enquiry funnel",
  techStack: ["Next.js", "WhatsApp Business API", "RD Station CRM", "Google Ads", "Google Tag Manager", "GA4", "Looker Studio"],
  duration: "10 weeks to launch, then 3 months of optimisation",
  team: "4 people: growth lead, web developer, performance marketer, automation engineer",
  about:
    "Well Aliments Brazil is a São Paulo manufacturer, exporter and private-label partner for Brazilian coffee, cocoa and beverages. It supplies distributors, retailers and brands in Brazil and abroad, in bulk or under their own label, and handles blending, packaging and shipping. Its buyers are procurement managers and brand owners who expect quick, specific answers on product, volume, packaging and delivery.",
  problems: [
    f("Enquiries arrived without the basics.", "Contact-form messages rarely said which product, what volume or where to ship, so the first days went on back-and-forth emails."),
    f("Buyers wanted WhatsApp.", "Brazilian buyers expect to talk on WhatsApp, but messages went to a sales rep's personal phone with no record in the CRM."),
    f("Little visibility on search.", "Well Aliments barely appeared for searches like \"café marca própria\" or \"cacau em pó atacado\", where distributors look for suppliers."),
  ],
  solution:
    "We rebuilt the website in Portuguese and English around the three ways Well Aliments sells: private label, custom blends and bulk supply, each with its own landing page, minimum order quantities and a clear \"Talk on WhatsApp\" call to action. Google Ads campaigns target Brazilian buyers in Portuguese and importers abroad in English. Every WhatsApp conversation starts with a short, friendly qualification flow (product, monthly volume, packaging and destination), then routes the buyer to the right sales rep with the details already in RD Station CRM. A dashboard shows enquiries, cost and reply times by campaign, product and region.",
  features: [
    f("Bilingual B2B website", "Portuguese and English pages for private label, custom blends and bulk supply."),
    f("Google Ads in Brazil and abroad", "Portuguese search campaigns for Brazilian buyers and English campaigns for importers."),
    f("WhatsApp enquiry flow", "Product, volume, packaging and destination captured in the first minute."),
    f("Rep routing and CRM", "Qualified buyers routed to the right rep, with every conversation logged in RD Station."),
    f("Enquiry dashboard", "Enquiries, cost and reply times by campaign, product and region."),
  ],
  challenges: [
    f("Two markets, two languages", "Domestic and export buyers search differently, so campaigns, keywords and landing pages were built separately for each."),
    f("Qualifying without friction", "The WhatsApp flow asks four quick questions with tap-to-answer buttons, so buyers never feel they are filling in a form."),
    f("Small buyers versus distributors", "Minimum order quantities are shown up front, and small requests get an automatic reply pointing to retail partners."),
  ],
  approach: [
    p("Discovery", "Weeks 1–2", "Defined buyer types, minimum volumes and what a qualified enquiry looks like with the sales team."),
    p("Website", "Weeks 3–7", "Bilingual website and landing pages for private label, custom blends and bulk supply."),
    p("WhatsApp funnel", "Weeks 6–8", "WhatsApp Business API, qualification flow, rep routing and CRM integration."),
    p("Campaign launch", "Weeks 9–10", "Google Ads in Portuguese and English with conversion tracking from WhatsApp."),
    p("Optimise", "Months 3–5", "Weekly keyword, bid and flow tweaks based on which enquiries became orders."),
  ],
  results: {
    metrics: [
      { value: "4.3×", label: "qualified B2B enquiries per month (22 → 96)" },
      { value: "R$38", label: "cost per qualified enquiry" },
      { value: "4 min", label: "median first reply (from about 3 hours)" },
      { value: "68%", label: "of enquiries start on WhatsApp" },
    ],
    narrative:
      "Qualified enquiries rose from 22 to 96 a month, and most buyers now start on WhatsApp, where the flow collects product, volume and destination before a rep replies. Sales reps open each conversation already knowing what the buyer needs, first replies fell from hours to minutes, and every enquiry is tracked in the CRM from the ad that brought it in.",
  },
  screenshots: [
    "Google Ads campaigns in Portuguese and English",
    "Well Aliments' search ad for \"café marca própria fornecedor\"",
    "Private-label landing page with the WhatsApp call to action",
    "WhatsApp flow qualifying a buyer before a sales rep replies",
    "Looker Studio enquiry dashboard by campaign, product and region",
  ],
  website: {
    url: "https://wellaliments.com.br",
    image: { src: "/sites/well-aliments.webp", alt: "Well Aliments Brazil website home page", width: 1440, height: 900 },
  },
  ctaHeading: "Want B2B buyers to reach you on WhatsApp, already qualified?",
  campaign: true,
  placeholder: true,
};
