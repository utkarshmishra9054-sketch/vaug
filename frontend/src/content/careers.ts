import type { CtaBlock, Feature, IconName } from "./types";
import type { CompanyHero } from "./company";
import { routes } from "./taxonomy";

/**
 * Careers page and job openings.
 * TODO(content): every role below is a placeholder. Replace with real openings
 * (or an ATS feed) before launch. Applications go to `careersEmail`.
 */

export type Department = "Engineering" | "AI" | "Design" | "QA" | "Delivery" | "Growth";

export interface Role {
  slug: string;
  title: string;
  department: Department;
  location: string;
  /** Used by the location filter. */
  locationGroup: "India" | "UK" | "Remote";
  type: "Full-time" | "Contract";
  experience: string;
  summary: string;
  about: string[];
  responsibilities: string[];
  requirements: string[];
  niceToHave: string[];
  stack: string[];
  placeholder?: boolean;
}

export interface Perk {
  title: string;
  description: string;
  icon: IconName;
}

export const careersEmail = "careers@vaug.ai";

export const careers = {
  metaDescription:
    "Join VAUG. Open roles for engineers, AI specialists, designers, testers, delivery leads and marketers. Remote-first, senior-led, shipping every week.",
  hero: {
    eyebrow: "Careers",
    title: { light: "Do the best work of your career,", bold: "and ship it every week." },
    subtitle:
      "Small senior squads, real clients, modern tools and a learning budget. If you like shipping more than meetings, you'll fit right in.",
    tags: ["Remote-first", "Senior-led", "Learning budget", "Weekly demos"],
  } satisfies CompanyHero,

  whyTitle: "Why people join VAUG.",
  why: [
    { title: "Real ownership", description: "You own features end to end, talk to clients directly and see your work used within weeks, not quarters.", icon: "crown" },
    { title: "AI in your daily kit", description: "Work with the latest models and tools every day, with the engineering discipline to use them properly.", icon: "cpu" },
    { title: "Grow on purpose", description: "A written growth plan, a learning budget and a lead who actually has time for your one-to-ones.", icon: "trending-up" },
  ] satisfies Feature[],

  perksTitle: "Perks and benefits.",
  perks: [
    { title: "Remote-first", description: "Work from home, a co-working space or one of our offices.", icon: "globe" },
    { title: "Learning budget", description: "Yearly budget for courses, books, conferences and certifications.", icon: "brain" },
    { title: "Top-spec kit", description: "A laptop and setup allowance so your tools never slow you down.", icon: "smartphone" },
    { title: "Health cover", description: "Medical insurance for you and your family, where local rules allow.", icon: "heart" },
    { title: "Flexible hours", description: "Core overlap hours for the team, the rest is up to you.", icon: "gauge" },
    { title: "AI tool access", description: "Paid seats on the AI coding and research tools we use for clients.", icon: "sparkles" },
    { title: "Offsites", description: "Twice-yearly team offsites to plan, learn and unwind.", icon: "users" },
    { title: "Performance bonus", description: "A share in the results when projects and the company do well.", icon: "trending-up" },
  ] satisfies Perk[],

  processTitle: "How we hire.",
  processSubtitle: "Four steps, usually done within two weeks. We reply to every application.",
  process: [
    { title: "Apply", meta: "Day 1", description: "Send your CV or portfolio and a few lines on what you'd like to work on." },
    { title: "Intro call", meta: "Within 5 days", description: "Thirty minutes with the hiring lead to talk about you, the role and how we work." },
    { title: "Practical task", meta: "Paid if over 3 hours", description: "A realistic, time-boxed task or a pairing session. No trick puzzles." },
    { title: "Meet the team", meta: "Final round", description: "Meet the people you'd work with, ask anything, then get an answer within 48 hours." },
  ] satisfies Feature[],

  rolesTitle: "Open roles.",
  rolesSubtitle: "Filter by team or location. Every role links to a full description.",

  fallback: {
    title: "Didn't find your role?",
    text: "We always want to hear from great engineers, designers and AI specialists. Send us your CV and tell us what you'd like to build.",
    subject: "Open application",
  },

  cta: {
    title: { light: "Hiring a team instead of joining one?", bold: "We can help with that too." },
    subtitle: "Dedicated developers from two weeks · Free 30-minute call",
    button: "Talk to us",
  } satisfies CtaBlock,
};

export const roles: Role[] = [
  {
    slug: "senior-full-stack-engineer",
    title: "Senior Full-Stack Engineer",
    department: "Engineering",
    location: "Bengaluru, India (hybrid)",
    locationGroup: "India",
    type: "Full-time",
    experience: "5+ years",
    summary: "Own features from database to interface on client products built with Next.js, Node and Postgres.",
    about: [
      "You'll join a small squad building web products for startups and enterprises in the UK, Europe and the UAE.",
      "You'll work directly with clients, demo every week and have a real say in architecture decisions.",
    ],
    responsibilities: [
      "Design and build features end to end across frontend, API and database",
      "Review code and mentor mid-level engineers",
      "Use AI coding tools well, and review their output carefully",
      "Join client demos and explain trade-offs in plain English",
      "Improve tests, CI and monitoring on every project you touch",
    ],
    requirements: [
      "5+ years building production web applications",
      "Strong TypeScript, React and Node.js",
      "Solid SQL and data modelling, ideally Postgres",
      "Experience deploying to AWS, GCP or Vercel",
      "Clear written English",
    ],
    niceToHave: ["Next.js App Router", "Payments or fintech experience", "Experience leading a small team"],
    stack: ["TypeScript", "React", "Next.js", "Node.js", "PostgreSQL", "AWS"],
    placeholder: true,
  },
  {
    slug: "ai-engineer-llm-agents",
    title: "AI Engineer (LLM / Agents)",
    department: "AI",
    location: "Remote (UK / Europe)",
    locationGroup: "Remote",
    type: "Full-time",
    experience: "3+ years",
    summary: "Build, evaluate and run AI agents that do real work inside clients' CRMs, inboxes and WhatsApp.",
    about: [
      "You'll join our agents practice, which builds and hosts AI agents for clients as a monthly service.",
      "You'll take agents from a workflow audit to production, and keep improving them with real data.",
    ],
    responsibilities: [
      "Design agent workflows, tools and guardrails with the delivery lead",
      "Build retrieval pipelines and integrations with client systems",
      "Write evaluations and monitor quality, cost and latency in production",
      "Decide when a task needs an agent, a rule or a person",
      "Document how each agent works so clients can trust it",
    ],
    requirements: [
      "3+ years of software engineering, with at least 1 year shipping LLM features",
      "Strong Python or TypeScript",
      "Hands-on experience with tool calling, RAG and prompt design",
      "A habit of measuring quality with evals rather than vibes",
    ],
    niceToHave: ["Vector databases", "WhatsApp or CRM integrations", "Experience with data protection (GDPR)"],
    stack: ["Python", "TypeScript", "LLM APIs", "Postgres / pgvector", "Langfuse", "AWS"],
    placeholder: true,
  },
  {
    slug: "flutter-developer",
    title: "Flutter Developer",
    department: "Engineering",
    location: "Bengaluru, India (hybrid)",
    locationGroup: "India",
    type: "Full-time",
    experience: "3+ years",
    summary: "Ship polished iOS and Android apps with Flutter for startups and Venture Studio clients.",
    about: [
      "You'll build mobile apps from first screen to App Store release, working with a designer and a backend engineer.",
    ],
    responsibilities: [
      "Build and release Flutter apps for iOS and Android",
      "Turn Figma designs into smooth, accessible interfaces",
      "Integrate APIs, payments, push notifications and analytics",
      "Write widget and integration tests",
      "Handle store submissions and release notes",
    ],
    requirements: ["3+ years with Flutter and Dart", "At least two apps live in the stores", "State management experience (Riverpod, Bloc or similar)", "Comfort working with REST and GraphQL APIs"],
    niceToHave: ["Native iOS or Android experience", "React Native", "Firebase"],
    stack: ["Flutter", "Dart", "Riverpod", "Firebase", "REST", "GraphQL"],
    placeholder: true,
  },
  {
    slug: "qa-automation-engineer",
    title: "QA Automation Engineer",
    department: "QA",
    location: "Remote (India)",
    locationGroup: "Remote",
    type: "Full-time",
    experience: "3+ years",
    summary: "Build the automated test suites that let our squads ship every week without breaking things.",
    about: ["You'll own test strategy on two or three projects at a time, and help raise the bar across the company."],
    responsibilities: [
      "Write and maintain end-to-end and API test suites",
      "Set up tests in CI so every pull request is checked",
      "Run exploratory testing before each release",
      "Test AI features for accuracy, safety and edge cases",
      "Report bugs clearly and help the team fix root causes",
    ],
    requirements: ["3+ years in QA with a strong automation focus", "Playwright or Cypress", "API testing experience", "A sharp eye for edge cases"],
    niceToHave: ["Performance testing (k6, JMeter)", "Mobile testing (Appium, Maestro)", "Security testing basics"],
    stack: ["Playwright", "Cypress", "Postman", "k6", "GitHub Actions"],
    placeholder: true,
  },
  {
    slug: "product-designer",
    title: "Product Designer",
    department: "Design",
    location: "London, UK (hybrid)",
    locationGroup: "UK",
    type: "Full-time",
    experience: "4+ years",
    summary: "Turn fuzzy ideas into clear flows and polished interfaces for web, mobile and AI products.",
    about: ["You'll lead design on client projects from discovery workshops to developer handoff, and help grow our design system."],
    responsibilities: [
      "Run discovery and user research with clients",
      "Design flows, wireframes and high-fidelity interfaces",
      "Design how AI features explain themselves and hand over to people",
      "Build and maintain design systems in Figma",
      "Work closely with engineers through build and QA",
    ],
    requirements: ["4+ years in product design", "A portfolio showing shipped products and your process", "Strong Figma skills", "Comfortable presenting to clients"],
    niceToHave: ["Prototyping in code", "Motion design", "Accessibility expertise"],
    stack: ["Figma", "FigJam", "Framer", "Maze"],
    placeholder: true,
  },
  {
    slug: "delivery-manager",
    title: "Delivery Manager",
    department: "Delivery",
    location: "London, UK (hybrid)",
    locationGroup: "UK",
    type: "Full-time",
    experience: "5+ years",
    summary: "Be the one accountable lead for a portfolio of client projects: scope, plan, demo and report.",
    about: ["You'll be the single point of contact for clients, and the person who makes sure weekly demos and Friday updates happen."],
    responsibilities: [
      "Scope projects with clients and write clear proposals",
      "Plan sprints and keep squads focused on outcomes",
      "Run weekly demos and write the Friday update",
      "Spot risks early and raise them plainly",
      "Manage budgets, change requests and timelines",
    ],
    requirements: ["5+ years delivering software projects", "Experience with fixed-price and time-and-materials work", "Excellent written English", "Comfort with technical conversations"],
    niceToHave: ["A development background", "Experience with AI projects", "Agency experience"],
    stack: ["Linear", "Jira", "Notion", "Figma", "Slack"],
    placeholder: true,
  },
  {
    slug: "performance-marketer",
    title: "Performance Marketer",
    department: "Growth",
    location: "Remote (UK / UAE)",
    locationGroup: "Remote",
    type: "Contract",
    experience: "3+ years",
    summary: "Run paid campaigns, listings and SEO for the ventures we launch in our Venture Studio.",
    about: ["You'll own growth for several early-stage ventures, from first campaign to steady, measurable demand."],
    responsibilities: [
      "Plan and run Google, Meta and LinkedIn campaigns",
      "Set up tracking, dashboards and conversion goals",
      "Manage Google Business listings and local SEO",
      "Test landing pages with designers and engineers",
      "Report results weekly in plain numbers",
    ],
    requirements: ["3+ years running paid campaigns with real budgets", "Google Ads and Meta Ads", "GA4 and tag management", "A test-and-learn habit"],
    niceToHave: ["UAE or UK market experience", "Copywriting", "Marketing automation"],
    stack: ["Google Ads", "Meta Ads", "GA4", "GTM", "Looker Studio"],
    placeholder: true,
  },
];

export const departments: Department[] = ["Engineering", "AI", "Design", "QA", "Delivery", "Growth"];
export const locationGroups: Role["locationGroup"][] = ["India", "UK", "Remote"];

/** URL of a role page. (Candidate for `routes` in taxonomy.ts.) */
export const roleHref = (slug: string) => routes.career(slug);

/** Mailto link for applying, with a prefilled subject. */
export const applyHref = (subject: string) => `mailto:${careersEmail}?subject=${encodeURIComponent(subject)}`;

export const roleBySlug = (slug: string) => roles.find((r) => r.slug === slug);

export const departmentIcon: Record<Department, IconName> = {
  Engineering: "code",
  AI: "brain",
  Design: "pen-tool",
  QA: "shield",
  Delivery: "workflow",
  Growth: "trending-up",
};
