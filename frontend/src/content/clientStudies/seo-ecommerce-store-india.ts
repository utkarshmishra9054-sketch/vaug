import type { ApproachPhase, CaseStudyDetail, Feature } from "../types";

const f = (title: string, description: string): Feature => ({ title, description });
const p = (phase: string, when: string, description: string): ApproachPhase => ({ phase, when, description });

// Source: 2023 VAUG proposal. TODO(content): confirm written consent to name this client.
// FACT from the proposal: non-brand organic traffic up to 9×.
// TODO(content): the product range (steel kitchenware and home storage) is an assumption, as are all
// other figures, timings and details below. They are illustrative and must be confirmed with the client.
// No logo: the only logo on file is illegible, so the home tile shows a wordmark.
export const study: CaseStudyDetail = {
  slug: "seo-ecommerce-store-india",
  client: "Jain Industries",
  city: "India",
  stage: "Established",
  industry: "E-commerce",
  model: "SEO & Growth",
  icon: "search",
  title: "Up to 9× More Non-Brand Organic Traffic for an Indian Online Store",
  summary:
    "Technical SEO, category pages rebuilt for search and a steady content programme that took Jain Industries' online store beyond its own name, growing non-brand organic traffic up to nine times.",
  metrics: [
    { value: "Up to 9×", label: "non-brand organic traffic" },
    // TODO(content): illustrative, confirm with the client.
    { value: "12 → 110", label: "non-brand keywords on page one" },
    // TODO(content): illustrative, confirm with the client.
    { value: "54 → 92", label: "site health score" },
  ],
  tint: "#a3471b",
  // TODO(content): illustrative dashboard values, apart from the 9× figure.
  screen: [
    { label: "Non-brand organic traffic", value: "9×" },
    { label: "Keywords on page one", value: "110" },
    { label: "Pages indexable", value: "96%" },
  ],
  // TODO(content): website still needed
  sector: "ecommerce-retail",
  service: "monthly-retainer",
  // TODO(content): confirm client type.
  clientType: "Enterprise",
  region: "India",
  domain: "SEO for an e-commerce store (technical, on-page and content)",
  // TODO(content): confirm the tools used on this engagement.
  techStack: ["Google Search Console", "Google Analytics 4", "Semrush", "Screaming Frog", "PageSpeed Insights", "Google Merchant Center"],
  // TODO(content): illustrative, confirm engagement length and team.
  duration: "8 months, then an ongoing monthly retainer",
  team: "3 people: SEO lead, technical SEO specialist, content writer",
  // TODO(content): confirm what Jain Industries sells; the product range here is an assumption.
  about:
    "Jain Industries is an Indian manufacturer that sells its products direct to customers through its own online store, with a large catalogue of kitchen and home storage products. Customers who already knew the name found the store without trouble, but almost nobody found it by searching for the products it makes: most of its organic traffic came from people typing \"jain industries\" into Google.",
  problems: [
    // TODO(content): illustrative problem statements, confirm with the client.
    f("Invisible beyond the brand name.", "Fewer than half of organic clicks came from product searches, and only 12 non-brand keywords reached Google's first page."),
    f("A catalogue Google couldn't read.", "Filter parameters created thousands of duplicate URLs, and some category pages were blocked from crawling altogether."),
    f("Slow on mobile.", "Heavy images and scripts gave key category pages a mobile performance score below 40."),
  ],
  solution:
    "We began with a full crawl and Search Console review, which showed that most of the catalogue was either duplicated or hidden from Google. We canonicalised filter and sort URLs, unblocked category pages, fixed broken links and redirect chains, and added product and breadcrumb structured data. We then built a keyword map by category, from steel containers to kitchen racks, gave every category page a unique title, heading and introduction, and published buying guides that link to the right products. Page speed work brought mobile scores above 90. Each month we report non-brand traffic separately from brand traffic, so growth from new customers is easy to see.",
  features: [
    f("Crawl and index clean-up", "Duplicate filter URLs canonicalised, blocked categories opened and broken links fixed."),
    f("Category keyword map", "Every product category matched to the searches its buyers use."),
    f("Category pages that rank", "Unique titles, headings, intros and buying guides on each category page."),
    f("Structured data", "Product and breadcrumb schema for price, stock and ratings in results."),
    f("Mobile speed", "Compressed images and deferred scripts for fast category pages on mobile."),
  ],
  challenges: [
    f("A large catalogue", "Thousands of product and filter URLs meant fixes had to be made at template level, not page by page."),
    f("Measuring the right thing", "Brand traffic hid the real picture, so we reported non-brand clicks separately from day one."),
    f("Competing with marketplaces", "Marketplaces own the broadest searches, so we won specific, high-intent searches first and built from there."),
  ],
  // TODO(content): illustrative timings, confirm with the client.
  approach: [
    p("Audit", "Weeks 1–2", "Full crawl, Search Console and analytics review, brand and non-brand baseline."),
    p("Technical fixes", "Weeks 3–8", "Canonicals, robots rules, redirects, broken links, structured data and page speed."),
    p("Category optimisation", "Months 2–4", "Keyword map, titles, headings and introductions for every category page."),
    p("Content", "Months 3–8", "Buying guides and internal links into the categories that matter most."),
    p("Track and adjust", "Monthly", "Brand and non-brand reporting, rank tracking and a monthly plan."),
  ],
  results: {
    metrics: [
      { value: "Up to 9×", label: "non-brand organic traffic" },
      // TODO(content): illustrative, confirm with the client.
      { value: "12 → 110", label: "non-brand keywords on page one" },
      // TODO(content): illustrative, confirm with the client.
      { value: "38% → 96%", label: "pages Google can index" },
      // TODO(content): illustrative, confirm with the client.
      { value: "38 → 91", label: "mobile performance score" },
    ],
    // TODO(content): only the 9× non-brand figure is from the proposal; the rest is illustrative.
    narrative:
      "Non-brand organic traffic grew up to nine times, so the store now reaches people who have never heard of Jain Industries. Non-brand searches went from under half of organic clicks to the large majority, 110 non-brand keywords now rank on Google's first page, and the site's health score rose from 54 to 92. We continue to track rankings and report brand and non-brand traffic every month.",
  },
  screenshots: [
    "Semrush Site Audit: site health at 92%, up from 54%",
    "Search Console with the brand name filtered out: non-brand clicks over 16 months",
    "Semrush Position Tracking by product category tag",
    "Mobile Google results with Jain Industries in the top three",
    "PageSpeed Insights for the steel containers category page on mobile",
  ],
  ctaHeading: "Want customers who don't know your name yet?",
  campaign: true,
  placeholder: true,
};
