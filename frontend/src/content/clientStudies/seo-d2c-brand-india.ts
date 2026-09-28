import type { ApproachPhase, CaseStudyDetail, Feature } from "../types";

const f = (title: string, description: string): Feature => ({ title, description });
const p = (phase: string, when: string, description: string): ApproachPhase => ({ phase, when, description });

// Source: 2023 VAUG proposal. TODO(content): confirm written consent to name this client.
// FACT from the proposal: organic traffic up 76%+. TODO(content): the proposal copy may have been
// pasted from another study, so confirm the 76% figure (and its period) with Brandless before launch.
// Everything else below is illustrative and must be confirmed with the client.
export const study: CaseStudyDetail = {
  slug: "seo-d2c-brand-india",
  client: "Brandless",
  city: "India",
  stage: "D2C brand",
  industry: "E-commerce",
  model: "SEO & Growth",
  icon: "trending-up",
  title: "SEO That Grew a D2C Lifestyle Brand's Organic Traffic by 76%",
  summary:
    "An ongoing SEO programme for Brandless, an Indian D2C brand of handcrafted canvas and leather essentials: technical fixes, collection pages rebuilt for search and buying guides that grew organic traffic by more than 76%.",
  metrics: [
    { value: "+76%", label: "organic traffic" },
    // TODO(content): illustrative, confirm with the client.
    { value: "11.4", label: "average Google position (from 21.8)" },
    // TODO(content): illustrative, confirm with the client.
    { value: "+58%", label: "organic revenue" },
  ],
  tint: "#2f4f3e",
  // TODO(content): illustrative dashboard values, apart from organic traffic.
  screen: [
    { label: "Organic traffic", value: "+76%" },
    { label: "Keywords on page one", value: "94" },
    { label: "Avg. position", value: "11.4" },
  ],
  logo: "/logos/brandless.webp",
  sector: "ecommerce-retail",
  service: "monthly-retainer",
  // TODO(content): confirm client type.
  clientType: "Startup",
  region: "India",
  domain: "SEO for a Shopify D2C store (technical, on-page and content)",
  // TODO(content): confirm the tools used on this engagement.
  techStack: ["Google Search Console", "Google Analytics 4", "Semrush", "Screaming Frog", "Shopify", "PageSpeed Insights"],
  // TODO(content): illustrative, confirm engagement length and team.
  duration: "6 months, then an ongoing monthly retainer",
  team: "3 people: SEO lead, content writer, Shopify developer (part-time)",
  about:
    "Brandless is an Indian direct-to-consumer brand making handcrafted essentials for how people move and gift: canvas yoga mat bags, leather bottle holders, gym pouches, monogrammed keyrings and corporate gift sets. It sells through its own Shopify store, with free monogramming of initials as a signature touch. People who already knew the brand found it easily, but shoppers searching for the products it makes rarely did.",
  problems: [
    // TODO(content): illustrative problem statements, confirm with the client.
    f("Found by name only.", "Most organic clicks came from people searching for \"brandless\"; product searches went to marketplaces and larger retailers."),
    f("Thin collection pages.", "Collection pages carried theme defaults: no unique copy, duplicate titles and nothing for Google to rank."),
    f("Slow, heavy pages.", "Large product images and app scripts slowed the store on mobile, where most Indian shoppers browse."),
  ],
  solution:
    "We started with a full technical and content audit of the Shopify store, then fixed what stopped Google crawling and understanding it: duplicate collection URLs, missing canonicals, broken internal links and oversized images. We mapped every important search (\"yoga mat bag\", \"leather bottle holder\", \"personalised corporate gifts\") to a single page, rewrote titles, meta descriptions and headings, and gave every collection unique, useful copy. We added product schema so prices, stock and ratings show in results, and published buying guides that answer research searches and link to the right collections. Rankings and organic traffic are reviewed every month, and the plan adjusts to what the data shows.",
  features: [
    f("Technical clean-up", "Duplicate URLs, canonicals, redirects and broken links fixed across the Shopify store."),
    f("Keyword-to-page map", "Every priority search mapped to one collection, product or gifting page."),
    f("Collection pages that rank", "Unique titles, intros and headings in place of theme defaults."),
    f("Rich results", "Product schema so price, stock and reviews appear in Google results."),
    f("Buying guides", "Content for research searches that links shoppers to the right collection."),
  ],
  challenges: [
    f("Competing with marketplaces", "Marketplaces dominate generic product searches, so we targeted specific, high-intent searches first and built from there."),
    f("Working inside Shopify", "Theme and app limits meant some fixes, such as duplicate collection URLs, needed careful template changes."),
    f("Gifting is seasonal", "Corporate gifting searches peak before festivals, so gifting pages had to be ready and ranking months ahead."),
  ],
  // TODO(content): illustrative timings, confirm with the client.
  approach: [
    p("Audit", "Weeks 1–2", "Technical crawl, Search Console and analytics review, competitor and keyword gap analysis."),
    p("Fix the foundations", "Weeks 3–6", "Canonicals, redirects, internal links, image compression and Core Web Vitals."),
    p("Optimise", "Months 2–3", "Keyword-to-page map, titles, meta descriptions, headings and collection copy."),
    p("Content and rich results", "Months 3–6", "Buying guides, gifting pages and product schema."),
    p("Track and adjust", "Monthly", "Rank tracking, traffic reporting and a monthly plan."),
  ],
  results: {
    metrics: [
      { value: "+76%", label: "organic traffic" },
      // TODO(content): illustrative, confirm with the client.
      { value: "21.8 → 11.4", label: "average Google position" },
      // TODO(content): illustrative, confirm with the client.
      { value: "4 → 31", label: "keywords in Google's top three" },
      // TODO(content): illustrative, confirm with the client.
      { value: "+58%", label: "organic revenue" },
    ],
    // TODO(content): only the 76% organic traffic figure is from the proposal; the rest is illustrative.
    narrative:
      "Organic traffic to the Brandless store grew by more than 76%. Product searches, not just the brand name, now bring shoppers in: the store ranks in Google's top three for \"yoga mat bag\", \"leather bottle holder\" and \"canvas yoga mat carrier\", and its gifting pages reach page one ahead of the festive season. Organic search is now the store's largest channel, and we continue to track rankings and report every month.",
  },
  screenshots: [
    "Search Console, last 12 months: organic clicks and impressions for brandless.co.in",
    "Semrush Position Tracking: product and gifting keywords moving into Google's top ten",
    "Google results for \"yoga mat bag\" with Brandless in the top three",
    "Yoga mat bags collection page with its own heading and introduction",
    "GA4 traffic acquisition: Organic Search is now the store's largest channel",
  ],
  website: { url: "https://www.brandless.co.in", image: { src: "/sites/brandless.webp", alt: "Brandless website home page", width: 1440, height: 900 } },
  ctaHeading: "Want shoppers to find your products, not just your name?",
  campaign: true,
  placeholder: true,
};
