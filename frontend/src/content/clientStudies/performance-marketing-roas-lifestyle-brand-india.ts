import type { ApproachPhase, CaseStudyDetail, Feature } from "../types";

/**
 * Impossible · performance marketing (Meta + Google Shopping).
 * Source: 2023 VAUG proposal. The only confirmed figure is "ROAS up 3,134%".
 * TODO(content): confirm written consent to name this client and show its logo.
 * TODO(content): every other figure, date and claim below is illustrative and must be confirmed with the client before `placeholder` is removed.
 */

const f = (title: string, description: string): Feature => ({ title, description });
const p = (phase: string, when: string, description: string): ApproachPhase => ({ phase, when, description });

export const study: CaseStudyDetail = {
  slug: "performance-marketing-roas-lifestyle-brand-india",
  client: "Impossible",
  // TODO(content): confirm the city the brand operates from.
  city: "India",
  // TODO(content): confirm company stage.
  stage: "Direct-to-consumer brand",
  industry: "E-commerce",
  model: "Performance Marketing",
  icon: "trending-up",
  title: "Meta and Google Shopping Ads That Lifted ROAS by 3,134%",
  summary:
    "Paid social and Shopping campaigns for a performance lifestyle brand selling apparel and nutrition online: a rebuilt product feed, full-funnel Meta campaigns and weekly creative testing that lifted return on ad spend by 3,134%.",
  metrics: [
    { value: "+3,134%", label: "return on ad spend" },
    // TODO(content): illustrative. Confirm the before/after ROAS with the client.
    { value: "12.3×", label: "blended ROAS (from 0.38×)" },
    // TODO(content): illustrative. Confirm the share of revenue from Shopping ads.
    { value: "42%", label: "of paid revenue from Google Shopping" },
  ],
  tint: "#13213a",
  // TODO(content): illustrative dashboard rows, except the ROAS uplift.
  screen: [
    { label: "ROAS uplift", value: "+3,134%" },
    { label: "Blended ROAS", value: "12.3×" },
    { label: "Purchases (30 days)", value: "1,286" },
  ],
  logo: "/logos/impossible.webp",
  sector: "ecommerce-retail",
  service: "monthly-retainer",
  // TODO(content): confirm client type.
  clientType: "Startup",
  region: "India",
  domain: "Performance marketing (Meta Ads + Google Shopping)",
  techStack: ["Meta Ads Manager", "Meta Pixel + Conversions API", "Google Ads", "Google Merchant Center", "GA4", "Shopify", "Looker Studio"],
  // TODO(content): confirm campaign length and team.
  duration: "6 months (ongoing retainer)",
  team: "3 people: performance marketer, creative designer, analyst",
  about:
    "Impossible is a performance lifestyle brand for athletes and high performers, selling training apparel alongside science-backed performance drinks and nutrition through its own online store. The brand already had a loyal following and strong product photography, but its paid media was not paying for itself: ads brought traffic, yet very little of it turned into orders.",
  problems: [
    f("Ads that did not pay back.", "Spend on Meta and Google was returning less revenue than it cost."),
    f("A thin product feed.", "Shopping ads ran from a feed with short titles, missing attributes and disapproved products."),
    f("Blind spots in tracking.", "Purchases were under-reported, so campaigns were optimising towards the wrong signals."),
  ],
  solution:
    "We started with measurement, fixing the Meta Pixel and Conversions API and GA4 e-commerce events so every purchase was attributed. We then rebuilt the Google Merchant Center feed with richer titles, product types, sizes and colours, and launched Shopping and Performance Max campaigns split by margin. On Meta we restructured the account into prospecting, retargeting and catalogue campaigns, and ran a weekly creative testing cycle across feed, Stories and Reels. Budgets moved every week towards the products, audiences and creatives with the best return, and one Looker Studio dashboard showed spend, revenue and ROAS by channel.",
  features: [
    f("Tracking you can trust", "Pixel, Conversions API and GA4 purchase events reconciled against store orders."),
    f("Rebuilt Shopping feed", "Optimised titles, attributes and custom labels in Google Merchant Center."),
    f("Full-funnel Meta structure", "Prospecting, retargeting and dynamic catalogue ads with clean audiences."),
    f("Weekly creative testing", "New hooks, formats and offers tested every week across feed, Stories and Reels."),
    f("ROAS dashboard", "Spend, revenue and ROAS by channel, campaign and product in Looker Studio."),
  ],
  challenges: [
    f("Two very different ranges", "Apparel and nutrition sell differently, so each got its own campaigns, budgets and ROAS targets."),
    f("Creative fatigue", "Winning ads wore out quickly; a weekly testing rhythm kept fresh creative ready to replace them."),
    f("Scaling without losing return", "Budgets were raised in steps and only on campaigns that held their ROAS for a full week."),
  ],
  approach: [
    // TODO(content): illustrative timings. Confirm with the client.
    p("Audit and tracking", "Weeks 1–2", "Audited both ad accounts and fixed Pixel, Conversions API and GA4 purchase tracking."),
    p("Feed and structure", "Weeks 3–4", "Rebuilt the Merchant Center feed and restructured Meta and Google campaigns."),
    p("Launch", "Weeks 5–6", "Launched Shopping, Performance Max and full-funnel Meta campaigns."),
    p("Creative testing", "Ongoing", "Tested new creatives weekly and retired ads as they fatigued."),
    p("Scale", "Month 3 onward", "Moved budget to the best-returning products and audiences, reported weekly."),
  ],
  results: {
    metrics: [
      { value: "+3,134%", label: "return on ad spend" },
      // TODO(content): illustrative. Confirm these three figures with the client.
      { value: "12.3×", label: "blended ROAS" },
      { value: "-96%", label: "cost per purchase" },
      { value: "1,286", label: "purchases in the last 30 days" },
    ],
    // TODO(content): only the 3,134% uplift is confirmed; the rest of this narrative is illustrative.
    narrative:
      "With accurate tracking, a stronger product feed and a steady supply of tested creative, Impossible's paid media went from losing money to one of its most profitable channels. Return on ad spend rose by 3,134%, cost per purchase fell sharply, and Shopping ads became a reliable source of new customers alongside Meta.",
  },
  screenshots: [
    "Meta Ads Manager campaign view",
    "Instagram ad creatives across feed, Stories and Reels",
    "Shopping ads at the top of Google results",
    "Google Merchant Center product feed health",
    "Looker Studio report: revenue and ROAS by week and channel",
  ],
  website: { url: "https://impossible.co", image: { src: "/sites/impossible.webp", alt: "Impossible website home page", width: 1440, height: 900 } },
  ctaHeading: "Want ads that pay for themselves?",
  campaign: true,
  placeholder: true,
};
