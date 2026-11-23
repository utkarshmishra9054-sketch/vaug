import type { Faq, Feature } from "./types";

/**
 * "AI search readiness" capability page. The worked example is vaug.in itself: the structured data and
 * /llms.txt shown on the page are rendered from the same code that serves them (src/lib/jsonld.tsx,
 * src/lib/llms.ts), added 23 Nov 2026. Keep claims modest: no promised rankings, citations or traffic,
 * and say plainly that llms.txt is a proposal, not a standard every assistant reads.
 */

export const aiSearchPage = {
  meta: {
    title: "AI Search Readiness: Structured Data, llms.txt and Answer-Ready Content",
    description:
      "Make your site easy for AI assistants and search engines to read, quote and link: schema.org structured data, an llms.txt file, crawlable pages and answer-ready content. Shown on vaug.in itself.",
  },
  hero: {
    eyebrow: "AI search readiness",
    title: { light: "Be easy to read,", bold: "quote and link." },
    subtitle:
      "People now ask assistants as often as they search. Those assistants work from what they can crawl and understand. We make your site clear to them: structured data that says who you are and what each page is, an llms.txt map, pages that render without tricks, and content that answers real questions in plain words.",
    tags: ["Schema.org JSON-LD", "llms.txt", "Crawlable pages", "Answer-ready content"],
  },
  reads: [
    { title: "Can it get in?", description: "robots.txt, a complete sitemap, canonical URLs and pages that render their text on the server, not only after scripts run.", icon: "search" },
    { title: "Who are you?", description: "One Organization record with your name, contacts and offices, the same on every page and matching what the page says.", icon: "building" },
    { title: "What is this page?", description: "Each page typed: a service, an article, an FAQ, a breadcrumb trail, so a summary doesn't have to guess.", icon: "layers" },
    { title: "What's the answer?", description: "Questions written the way people ask them, answered in the first sentence, with the detail after.", icon: "message-square" },
    { title: "Can it trust you?", description: "Facts that agree across pages: one team size, one client count, one set of offices, dates on what changes.", icon: "shield" },
    { title: "Where do things live?", description: "An llms.txt file: a short, plain-text map of your most useful pages, with a line on each.", icon: "file-check" },
    { title: "Is it accessible?", description: "Good headings, landmarks and link text help screen readers and machines in the same way.", icon: "users" },
    { title: "Is it fast and stable?", description: "Pages that load quickly and don't move around are easier to fetch and render for every crawler.", icon: "gauge" },
  ] satisfies Feature[],
  method: [
    { title: "Audit", description: "We crawl the site as a search engine and as an assistant would: robots, sitemap, rendering without JavaScript, duplicate and missing titles, and the facts that disagree between pages.", meta: "Week 1" },
    { title: "Structure", description: "We add schema.org JSON-LD where it describes the page truthfully: Organization and WebSite once, then BreadcrumbList, FAQPage, Service, Article, Product or Event as each page needs.", meta: "Week 2" },
    { title: "Map", description: "We generate llms.txt from your content at build time, so it lists your real pages and can't drift out of date.", meta: "Week 2" },
    { title: "Rewrite for answers", description: "We tighten the pages people ask about: clear questions, direct first sentences, consistent numbers, and FAQs that match real enquiries.", meta: "Weeks 2–3" },
    { title: "Verify", description: "We validate every schema type, check pages render for crawlers, and record how the main assistants describe you before and after, so you can see what changed.", meta: "Week 4" },
  ] satisfies Feature[],
  limits: {
    title: "What no one can promise.",
    body: [
      "No agency controls what an assistant says or which sources it cites. Anyone promising a guaranteed AI answer or ranking is guessing.",
      "What we can do is remove the reasons to skip you: pages that can't be read, facts that contradict each other, and content that never answers the question. That is work you can check, and it helps ordinary search at the same time.",
    ],
    points: [
      { title: "llms.txt is a proposal", description: "It's cheap to add and some tools read it, but it isn't a standard every assistant follows. We treat it as a bonus, not the plan." },
      { title: "Structured data must be true", description: "Markup that claims ratings, prices or reviews the page doesn't show can do harm. We only mark up what's visible." },
      { title: "Content still does the work", description: "Schema helps a machine understand a good page. It can't make a thin page useful." },
    ] satisfies Feature[],
  },
  deliverables: [
    { title: "Readiness report", description: "What crawlers and assistants can and can't read today, page type by page type, with the fixes in priority order.", icon: "file-check" },
    { title: "Structured data in code", description: "JSON-LD added in your codebase or CMS templates, so every new page of a type gets it automatically.", icon: "code" },
    { title: "llms.txt", description: "Generated from your content at build time and kept in your repository.", icon: "layers" },
    { title: "Content edits", description: "Rewritten answers and FAQs for the pages people ask about most.", icon: "message-square" },
    { title: "Validation record", description: "Schema validator and rich-results checks for each page type, plus the before-and-after assistant answers.", icon: "shield" },
    { title: "Release checks", description: "Checks added to your build so a new page can't ship without its title, canonical URL and structured data.", icon: "workflow" },
  ] satisfies Feature[],
  faqs: [
    { question: "What is AI search readiness?", answer: "Making your website easy for AI assistants and search engines to read, understand and link to: crawlable pages, schema.org structured data, an llms.txt file, and content that answers real questions with consistent facts." },
    { question: "What is llms.txt?", answer: "A plain-text file at the root of a site, proposed at llmstxt.org, that gives language models a short map of the site's most useful pages. It's easy to add and some tools read it, but it isn't a standard every assistant follows, so we add it alongside the fundamentals, not instead of them." },
    { question: "Will this get us cited by ChatGPT, Claude or Gemini?", answer: "No one can guarantee that. What we can do is make sure nothing on your side stops it: pages that render, structured data that matches the page, consistent facts and clear answers. We record how assistants describe you before and after so you can judge the change." },
    { question: "Does this replace SEO?", answer: "No. Most of it is good SEO done properly: crawlable pages, accurate titles, structured data and useful content. The difference is more attention to plain answers and to facts agreeing across the whole site." },
    { question: "Can you do this on WordPress, Webflow or Shopify?", answer: "Yes. On a CMS we add structured data in the theme or templates and generate llms.txt from the published content, so editors don't have to maintain either by hand." },
    { question: "How long does it take?", answer: "About four weeks for a typical marketing site: one to audit, one to add structure and llms.txt, one to two for content, and a final week to verify. Larger sites are scoped by page type." },
  ] satisfies Faq[],
};
