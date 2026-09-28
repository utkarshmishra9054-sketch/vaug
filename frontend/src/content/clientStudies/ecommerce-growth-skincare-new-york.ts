import type { ApproachPhase, CaseStudyDetail, Feature } from "../types";

const f = (title: string, description: string): Feature => ({ title, description });
const p = (phase: string, when: string, description: string): ApproachPhase => ({ phase, when, description });

// TODO(content): confirm written consent to name this client.
// There is NO confirmed result for this engagement. Every figure, timing, product name and detail
// below is illustrative and must be confirmed with (or replaced by) the client before launch.
export const study: CaseStudyDetail = {
  slug: "ecommerce-growth-skincare-new-york",
  client: "epi.logic",
  city: "New York, USA",
  stage: "D2C brand",
  industry: "E-commerce & Retail",
  model: "SEO & Growth",
  icon: "trending-up",
  // TODO(content): illustrative headline figure, confirm with the client.
  title: "SEO, Shopping Ads and Email That Grew a Skincare Brand's Online Sales by 48%",
  summary:
    "A monthly growth retainer for epi.logic, a New York skincare brand: Shopify SEO, Google Shopping and Meta ads, conversion work on product pages and email flows, run as one programme against one number, online sales.",
  // TODO(content): illustrative, confirm with the client.
  metrics: [
    { value: "+48%", label: "online store sales" },
    { value: "3.4×", label: "blended return on ad spend" },
    { value: "2.1% → 3.0%", label: "store conversion rate" },
  ],
  tint: "#4f7489",
  // TODO(content): illustrative dashboard values.
  screen: [
    { label: "Online sales (90 days)", value: "+48%" },
    { label: "Blended ROAS", value: "3.4×" },
    { label: "Email share of sales", value: "24%" },
  ],
  logo: "/logos/epilogic.webp",
  sector: "ecommerce-retail",
  service: "monthly-retainer",
  // TODO(content): confirm client type.
  clientType: "Startup",
  region: "USA",
  domain: "E-commerce growth (Shopify SEO, paid social and shopping, CRO, email)",
  // TODO(content): confirm the tools used on this engagement.
  techStack: ["Shopify", "Google Search Console", "Google Analytics 4", "Google Merchant Center", "Google Ads", "Meta Ads Manager", "Klaviyo", "Semrush"],
  // TODO(content): illustrative, confirm engagement length and team.
  duration: "Ongoing monthly retainer",
  team: "4 people: growth lead, SEO specialist, paid media specialist, email and CRO specialist",
  about:
    "epi.logic is a New York skincare brand selling face oils, serums and cleansers online through its own Shopify store, with free US shipping on orders over $75 and a newsletter, Protocols & Perks, that rewards sign-ups with a first-order discount. Its products and photography were strong, but growth relied on paid social alone: search brought in little, ad costs were rising and most first-time buyers never came back.",
  problems: [
    // TODO(content): illustrative problem statements, confirm with the client.
    f("One channel doing all the work.", "Most sales came from Meta ads, so every rise in ad costs hit revenue directly."),
    f("Little search traffic.", "Product pages weren't built for search, so people searching for face oils and serums found other brands."),
    f("Buyers who didn't return.", "There was no replenishment or win-back email, so repeat purchases were left to chance."),
  ],
  solution:
    "We ran SEO, paid media, conversion and email as one monthly programme. On the Shopify store we fixed technical SEO issues, rewrote product titles, descriptions and collection pages around the searches shoppers use, and added product and review schema so prices and ratings show in Google. We set up a clean Merchant Center feed and moved Google spend to Shopping and Performance Max, while Meta was restructured into prospecting and catalogue retargeting with new creative each month. On product pages we tested reviews placement, a pre-selected subscribe-and-save option and clearer ingredient information. In Klaviyo we rebuilt the welcome series and added abandoned checkout, replenishment and win-back flows. Budgets move each month to whatever channel returns most.",
  features: [
    f("Shopify SEO", "Technical fixes, search-led product and collection pages, and product and review schema."),
    f("Google Shopping and Performance Max", "A clean product feed and campaigns built around bestsellers and brand searches."),
    f("Meta ads", "Prospecting with Advantage+ and catalogue retargeting, with fresh creative every month."),
    f("Conversion testing", "A/B tests on product pages: reviews, subscribe-and-save and ingredient information."),
    f("Email and SMS flows", "Welcome, abandoned checkout, replenishment and win-back flows in Klaviyo."),
  ],
  challenges: [
    f("A crowded category", "Skincare search is dominated by large retailers and editorial lists, so we targeted specific product searches first."),
    f("Attribution across channels", "Google, Meta and email all claim the same sale, so we judged every channel against Shopify revenue."),
    f("Growing without discounting", "The brand didn't want constant sales, so growth had to come from conversion and retention, not bigger discounts."),
  ],
  // TODO(content): illustrative timings, confirm with the client.
  approach: [
    p("Audit", "Weeks 1–2", "Shopify, analytics, ad account, feed and email audit, with a single revenue baseline."),
    p("Foundations", "Weeks 3–6", "Technical SEO, Merchant Center feed, tracking fixes and the core email flows."),
    p("Launch and test", "Months 2–3", "Shopping and Meta restructure, product page A/B tests and search-led content."),
    p("Scale", "Month 4 onwards", "Budget moved to the best-returning campaigns, new creative and new flows."),
    p("Report and adjust", "Monthly", "One report on sales, channel return and next month's plan."),
  ],
  results: {
    // TODO(content): illustrative, confirm with the client.
    metrics: [
      { value: "+48%", label: "online store sales" },
      { value: "3.4×", label: "blended return on ad spend" },
      { value: "2.1% → 3.0%", label: "store conversion rate" },
      { value: "24%", label: "of sales from email and SMS flows" },
    ],
    // TODO(content): illustrative narrative, confirm or replace with real results.
    narrative:
      "Over the last 90 days, online store sales grew 48% on the previous period. Blended return on ad spend rose from 1.9× to 3.4× as budget moved to Shopping and Performance Max, the store's conversion rate rose from 2.1% to 3.0%, and email and SMS flows now drive about a quarter of sales. The Multi-Vitamin Face Oil page ranks in Google's top three for its main search, and we continue to report and adjust every month.",
  },
  screenshots: [
    "Shopify analytics, last 90 days: sales up 48% and a 3.0% conversion rate",
    "Google Ads: Shopping and Performance Max campaigns by conversion value / cost",
    "Google results for \"multivitamin face oil\" with epi.logic in the top three",
    "Product page with subscribe-and-save pre-selected",
    "Email and SMS flows in Klaviyo, last 90 days",
  ],
  website: { url: "https://epilogicskincare.com", image: { src: "/sites/epilogic.webp", alt: "epi.logic website home page", width: 1440, height: 900 } },
  ctaHeading: "Want every channel working towards the same number?",
  campaign: true,
  placeholder: true,
};
