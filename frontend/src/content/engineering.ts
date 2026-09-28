import type { CtaBlock, EngineeringSlug, Faq, Feature, IconName, ServiceSlug, SplitTitle, TechCategory } from "./types";
import { engagementOptions } from "@/lib/lead-options";
import { routes } from "./taxonomy";

/**
 * Engineering capability pages: /engineering and /engineering/[slug].
 * Names, short lines and icons for each discipline live in taxonomy.ts.
 */

export type EngagementOption = (typeof engagementOptions)[number];

/** A quality level a discipline commits to. `gauge` (0–100) sets how full the ring draws. */
export interface QualityTarget {
  value: string;
  label: string;
  detail: string;
  gauge: number;
  placeholder?: boolean;
}

export interface EngineeringDiscipline {
  slug: EngineeringSlug;
  metaTitle: string;
  metaDescription: string;
  hero: {
    title: SplitTitle;
    subtitle: string;
    tags: string[];
    /** File-style caption shown on the animated visual's window bar. */
    visualLabel: string;
  };
  servicesTitle: string;
  servicesSubtitle: string;
  services: Feature[];
  approachTitle: string;
  approachIntro: string;
  approach: Feature[];
  targetsTitle: string;
  targetsSubtitle: string;
  targets: QualityTarget[];
  tech: { label: string; items: string[] }[];
  /** Words matched against a case study's `techStack` to pick related work. */
  caseTech: string[];
  defaultEngagement: EngagementOption;
  faqs: Faq[];
  cta: CtaBlock;
}

export interface EngineeringEngagement {
  service: ServiceSlug;
  title: string;
  description: string;
  bestFor: string;
  icon: IconName;
}

export interface EngineeringIndexContent {
  metaTitle: string;
  metaDescription: string;
  hero: { eyebrow: string; title: SplitTitle; subtitle: string; tags: string[] };
  ticker: string[];
  disciplinesTitle: string;
  disciplinesSubtitle: string;
  workflowTitle: string;
  workflowSubtitle: string;
  workflow: Feature[];
  aiSplit: { left: { title: string; items: string[] }; right: { title: string; items: string[] } };
  metricsTitle: string;
  metrics: { value: string; label: string; detail: string; placeholder?: boolean }[];
  techTitle: string;
  techSubtitle: string;
  /** Extra categories shown after the home page's tech stack. */
  extraTech: TechCategory[];
  faqs: Faq[];
  cta: CtaBlock;
}

/* ------------------------------------------------------------------ */
/* Shared                                                              */
/* ------------------------------------------------------------------ */

export const engineeringEngagements: EngineeringEngagement[] = [
  {
    service: "dedicated-developers",
    title: "Add engineers to your team",
    description: "Vetted engineers join your stand-ups, your repo and your roadmap, billed by the month.",
    bestFor: "Teams with a backlog and a product lead",
    icon: "users",
  },
  {
    service: "custom-development",
    title: "Hand us the whole build",
    description: "A full squad with one accountable lead designs, builds and ships it, at a fixed price or sprint by sprint.",
    bestFor: "New products and big rebuilds",
    icon: "code",
  },
  {
    service: "monthly-retainer",
    title: "Keep it running and improving",
    description: "Support, security updates and a set of improvements every month for a live product, for one monthly fee.",
    bestFor: "Products already live",
    icon: "refresh-cw",
  },
];

export const engineeringLabels = {
  services: "What we deliver",
  approach: "How we work",
  targets: "Quality targets",
  tech: "Tech stack",
  work: "Related work",
  industries: "Industries",
  engagement: "Ways to work with us",
  others: "Other disciplines",
  targetsNote: "Targets we agree at kick-off and report on every week. Your numbers go in the contract, not on a poster.",
  engagementTitle: "Three Ways to Work With Us.",
  engagementSubtitle: "Pick the model that fits your team today. You can switch as the project grows.",
  industriesTitle: "Built for Regulated, Busy Industries.",
  industriesSubtitle: "The same engineering discipline, tuned to the rules and rhythms of your sector.",
  workTitle: "Work We're Proud Of.",
  workSubtitle: "Projects where this discipline did the heavy lifting.",
  othersTitle: "Explore Other Disciplines.",
  techTitle: "Tools We Know Well.",
  techSubtitle: "We choose boring, proven tools by default and reach for new ones when they earn it.",
};

/* ------------------------------------------------------------------ */
/* Index                                                               */
/* ------------------------------------------------------------------ */

export const engineeringIndex: EngineeringIndexContent = {
  metaTitle: "Engineering",
  metaDescription:
    "AI, full-stack, web, mobile, backend, DevOps, design and QA under one roof. Senior engineers, AI-assisted speed and human review on every change.",
  hero: {
    eyebrow: "Engineering at VAUG",
    title: { light: "Eight disciplines.", bold: "One team that ships." },
    subtitle:
      "From AI agents to app store releases, one senior team designs, builds, tests and runs your product. AI makes us fast. Reviews, tests and pipelines keep it safe.",
    tags: ["AI Engineering", "Web & Mobile", "Backend & Cloud", "Design & QA"],
  },
  ticker: ["Design", "Build", "Test", "Ship", "Monitor", "Improve"],
  disciplinesTitle: "Everything Your Product Needs.",
  disciplinesSubtitle: "Pick a discipline to see what we build and how. Most projects use four or five of them at once.",
  workflowTitle: "How Our Engineering Works.",
  workflowSubtitle:
    "Every change follows the same path from idea to production. AI drafts, engineers decide, and nothing ships without a test and a second pair of eyes.",
  workflow: [
    { meta: "Plan", title: "Scoped ticket", description: "Each change starts as a small ticket with acceptance criteria your lead has agreed.", icon: "search" },
    { meta: "Draft", title: "AI-assisted build", description: "Engineers use AI tools to draft code, tests and docs faster, then rewrite what isn't right.", icon: "sparkles" },
    { meta: "Review", title: "Human code review", description: "A second engineer reviews every pull request for logic, security and readability.", icon: "users" },
    { meta: "Test", title: "Automated tests", description: "Unit, integration and end-to-end tests run on every push. Red builds don't merge.", icon: "shield" },
    { meta: "Ship", title: "CI/CD pipeline", description: "Preview builds for every branch, one-click releases and instant rollbacks.", icon: "rocket" },
    { meta: "Document", title: "Living docs", description: "READMEs, architecture notes and runbooks updated in the same pull request.", icon: "file-check" },
  ],
  aiSplit: {
    left: {
      title: "What AI speeds up",
      items: [
        "Boilerplate, scaffolding and repetitive refactors",
        "First drafts of tests and documentation",
        "Searching large codebases and explaining legacy code",
        "Spotting likely bugs before review",
      ],
    },
    right: {
      title: "What engineers always own",
      items: [
        "Architecture, data models and trade-offs",
        "Security, privacy and access decisions",
        "Final review and approval of every change",
        "Talking to you, and saying no when it matters",
      ],
    },
  },
  metricsTitle: "Engineering by the Numbers.",
  metrics: [
    { value: "120+", label: "Products shipped", detail: "Web, mobile and AI builds since 2019", placeholder: true },
    { value: "40+", label: "Engineers and designers", detail: "Senior-led squads across disciplines", placeholder: true },
    { value: "100%", label: "Pull requests reviewed", detail: "No change merges without a second engineer" },
    { value: "<1 day", label: "Median time to production", detail: "From merged pull request to live", placeholder: true },
  ],
  techTitle: "The Full Stack We Work In.",
  techSubtitle: "Drag through the categories. We pick what fits your team, budget and roadmap, not what's trendy.",
  extraTech: [
    { category: "Testing & QA", label: "Quality", icon: "shield", description: "Automated suites, device labs and load tests that catch problems before your users do.", items: ["Playwright", "Cypress", "Jest", "Vitest", "Appium", "k6", "BrowserStack"] },
    { category: "Design", label: "Product design", icon: "pen-tool", description: "Research, prototypes and design systems your engineers can build from directly.", items: ["Figma", "FigJam", "Storybook", "Framer", "Maze", "Lottie"] },
    { category: "Data & Analytics", label: "Insight", icon: "trending-up", description: "Events, dashboards and pipelines so you know what's working and what isn't.", items: ["BigQuery", "dbt", "Airbyte", "Metabase", "PostHog", "Mixpanel"] },
  ],
  faqs: [
    { question: "Do you use AI to write code?", answer: "Yes, as a drafting tool. Engineers use AI to move faster on boilerplate, tests and docs. Every line is still reviewed by a human engineer and covered by tests before it merges." },
    { question: "Who owns the code?", answer: "You do. Code lives in your repository from day one and full IP transfers to you under our standard agreement." },
    { question: "Can you work with our existing team and stack?", answer: "Yes. We join your tools, rituals and code standards, or bring ours if you don't have them yet. We're comfortable picking up legacy code." },
    { question: "How do you keep quality high while moving fast?", answer: "Small pull requests, mandatory code review, automated tests on every push and preview builds you can click through. Your lead reports on quality every Friday." },
    { question: "Which discipline do I need?", answer: "Usually several. Book a free 30-minute call and we'll map what you're building to the right mix of skills, then send a proposal within 48 hours." },
  ],
  cta: {
    title: { light: "Bring us the hard part.", bold: "We'll bring the team." },
    subtitle: "Free 30-minute strategy call · NDA on request · Proposal within 48 hours",
    button: "Book a call",
  },
};

/* ------------------------------------------------------------------ */
/* Disciplines                                                         */
/* ------------------------------------------------------------------ */

const cta = (light: string, bold: string): CtaBlock => ({
  title: { light, bold },
  subtitle: "Free 30-minute strategy call · NDA on request · Proposal within 48 hours",
  button: "Book a call",
});

export const disciplines: EngineeringDiscipline[] = [
  {
    slug: "ai-engineering",
    metaTitle: "AI Engineering",
    metaDescription: "Production AI agents, RAG systems and LLM features with evaluation, guardrails and human review built in.",
    hero: {
      title: { light: "AI that works on Monday,", bold: "not just in the demo." },
      subtitle:
        "We build agents, retrieval systems and LLM features that plug into your real tools, get measured against real cases and stay safe with a human in the loop.",
      tags: ["AI agents", "RAG", "LLM apps", "Evaluation", "Guardrails", "MLOps"],
      visualLabel: "agent-graph.live",
    },
    servicesTitle: "What We Build With AI.",
    servicesSubtitle: "From a single workflow agent to AI features inside your product.",
    services: [
      { icon: "bot", title: "Workflow agents", description: "Agents that read emails, update your CRM, chase invoices and hand off to a human when unsure.", href: routes.agents },
      { icon: "database", title: "RAG and knowledge search", description: "Answers grounded in your own documents, with sources cited and permissions respected." },
      { icon: "message-square", title: "Chat and voice assistants", description: "Customer and staff assistants on web, WhatsApp and phone that know your policies." },
      { icon: "sparkles", title: "LLM product features", description: "Summaries, drafting, classification and extraction built into the product you already have." },
      { icon: "gauge", title: "Evaluation and monitoring", description: "Test sets, scoring and dashboards so you know quality before and after every change." },
      { icon: "cpu", title: "Model selection and cost", description: "The right model for each task, with caching and routing to keep your bill predictable." },
    ],
    approachTitle: "From Workflow to Working Agent.",
    approachIntro: "We start with the job, not the model. Every agent earns its place with numbers.",
    approach: [
      { title: "Map the workflow", description: "We sit with the people doing the work and write down every step, exception and system." },
      { title: "Pick the payback", description: "We score each step for effort saved and risk, and start where the return is fastest." },
      { title: "Build a golden set", description: "Real past cases become the test set the agent must pass before anyone relies on it." },
      { title: "Prototype in days", description: "A working agent on your real data inside two weeks, run alongside your team." },
      { title: "Add guardrails", description: "Permissions, approvals, rate limits and a clear hand-off to a person when confidence drops." },
      { title: "Measure and improve", description: "Weekly quality scores, cost per task and time saved, reported every Friday." },
    ],
    targetsTitle: "Quality We Commit To.",
    targetsSubtitle: "Agreed per workflow at kick-off, measured on your golden set.",
    targets: [
      { value: "95%+", label: "Golden-set accuracy", detail: "before an agent acts without approval", gauge: 95 },
      { value: "100%", label: "Actions logged", detail: "every tool call traceable and auditable", gauge: 100 },
      { value: "<3s", label: "Median response", detail: "for chat and assistant replies", gauge: 82 },
      { value: "0", label: "Unreviewed high-risk actions", detail: "payments and deletions need a human", gauge: 100 },
    ],
    tech: [
      { label: "Models", items: ["OpenAI", "Anthropic Claude", "Gemini", "Llama", "Mistral"] },
      { label: "Frameworks", items: ["LangChain", "LlamaIndex", "Vercel AI SDK", "MCP", "Pydantic AI"] },
      { label: "Retrieval", items: ["pgvector", "Pinecone", "Weaviate", "Elasticsearch"] },
      { label: "Evaluation", items: ["Langfuse", "Promptfoo", "Ragas", "OpenTelemetry"] },
      { label: "Channels", items: ["WhatsApp API", "Twilio", "Slack", "Email", "Web chat"] },
      { label: "Automation", items: ["n8n", "Make", "Zapier", "Python", "FastAPI"] },
    ],
    caseTech: ["OpenAI", "Claude", "Anthropic", "LangChain", "LlamaIndex", "Gemini", "RAG", "LLM", "n8n", "pgvector", "Pinecone", "AI"],
    defaultEngagement: "AI as a Service",
    faqs: [
      { question: "Will an AI agent make mistakes?", answer: "Sometimes, which is why we measure it on your real cases before it goes live, and route anything risky or uncertain to a person for approval." },
      { question: "Is our data used to train models?", answer: "No. We use providers and settings that don't train on your data, and can host open models in your own cloud if you need to." },
      { question: "Which model do you use?", answer: "Whichever is best for each task on cost, speed and quality. We often mix models and can switch provider without rebuilding." },
      { question: "How quickly can we see something working?", answer: "Usually within two weeks: a working agent on a slice of your real workflow, running alongside your team." },
      { question: "What does it cost to run?", answer: "We estimate cost per task up front and track it weekly. Caching and model routing usually keep it well below the cost of the manual work." },
      { question: "Can it connect to our existing tools?", answer: "Yes. CRMs, inboxes, spreadsheets, ERPs and custom databases, through their APIs or a secure integration we build." },
    ],
    cta: cta("Pick one workflow.", "We'll show you the payback."),
  },
  {
    slug: "full-stack-engineering",
    metaTitle: "Full-Stack Engineering",
    metaDescription: "One team from database to interface. Full-stack product engineering in TypeScript, Python and Go.",
    hero: {
      title: { light: "One team from database", bold: "to the last pixel." },
      subtitle:
        "Full-stack squads that own a feature end to end, so nothing gets lost between frontend and backend and you talk to one lead, not three.",
      tags: ["Product engineering", "TypeScript", "APIs", "Databases", "SaaS", "MVPs"],
      visualLabel: "stack.trace",
    },
    servicesTitle: "What Our Full-Stack Teams Deliver.",
    servicesSubtitle: "Whole products and whole features, not handovers between silos.",
    services: [
      { icon: "rocket", title: "MVPs and new products", description: "From first commit to paying users in weeks, built to grow rather than be thrown away." },
      { icon: "layers", title: "SaaS platforms", description: "Multi-tenant apps with billing, roles, onboarding and admin tools done properly." },
      { icon: "gauge", title: "Dashboards and portals", description: "Customer portals and internal tools that turn your data into daily decisions." },
      { icon: "workflow", title: "Integrations", description: "Payments, CRMs, ERPs and third-party APIs wired together reliably." },
      { icon: "wrench", title: "Modernisation", description: "Legacy apps moved to a modern stack one slice at a time, without a risky big bang." },
      { icon: "code", title: "Prototype rescue", description: "Lovable, Bolt or v0 builds turned into production code you can trust.", href: routes.service("launch-and-rescue") },
    ],
    approachTitle: "How a Feature Travels Through Our Team.",
    approachIntro: "Small vertical slices, shipped often, each one working from database to screen.",
    approach: [
      { title: "Slice vertically", description: "Every ticket is a thin, working slice of value, never 'backend now, frontend later'." },
      { title: "Model the data first", description: "We agree the data model early because everything else depends on it." },
      { title: "Type-safe end to end", description: "Shared types from database to UI catch whole classes of bugs before runtime." },
      { title: "Preview every branch", description: "Each pull request gets a live preview link you can click through." },
      { title: "Weekly demo", description: "You see working software every week and steer before the next sprint." },
      { title: "Own it after launch", description: "The same team monitors, fixes and improves after go-live." },
    ],
    targetsTitle: "Quality We Commit To.",
    targetsSubtitle: "Set with you at kick-off and reported every Friday.",
    targets: [
      { value: "80%+", label: "Test coverage", detail: "on business logic and APIs", gauge: 80 },
      { value: "100%", label: "Pull requests reviewed", detail: "by a second engineer", gauge: 100 },
      { value: "Weekly", label: "Production releases", detail: "at minimum, often daily", gauge: 90 },
      { value: "<1 day", label: "Critical bug response", detail: "from report to fix in progress", gauge: 92 },
    ],
    tech: [
      { label: "Frontend", items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "TanStack"] },
      { label: "Backend", items: ["Node.js", "NestJS", "Python", "FastAPI", "Go"] },
      { label: "Data", items: ["PostgreSQL", "MongoDB", "Redis", "Prisma", "Drizzle"] },
      { label: "Platforms", items: ["Supabase", "Firebase", "Stripe", "Auth0", "Clerk"] },
      { label: "Cloud", items: ["AWS", "Vercel", "Google Cloud", "Docker"] },
      { label: "Quality", items: ["Vitest", "Playwright", "ESLint", "Sentry"] },
    ],
    caseTech: ["React", "Next.js", "Node", "TypeScript", "PostgreSQL", "NestJS", "Supabase", "Prisma", "Stripe", "Python"],
    defaultEngagement: "Custom Development",
    faqs: [
      { question: "Why full-stack rather than separate frontend and backend teams?", answer: "Fewer handovers, fewer bugs at the seams and faster decisions. One squad owns the feature from database to screen." },
      { question: "Which stack do you recommend?", answer: "Usually TypeScript with React and Node or Python, on PostgreSQL. We'll suggest what fits your team and hiring plans, and happily work in yours." },
      { question: "Can you take over an existing codebase?", answer: "Yes. We start with a short audit, fix the riskiest issues first and improve the code as we add features." },
      { question: "How fast can you ship an MVP?", answer: "Most MVPs take 6 to 12 weeks. We'll give you a milestone plan in the proposal, within 48 hours of our call." },
      { question: "Do you write tests?", answer: "Always. Business logic and APIs get automated tests, and critical user journeys get end-to-end tests." },
    ],
    cta: cta("One team, one lead,", "one product that works."),
  },
  {
    slug: "web-engineering",
    metaTitle: "Web Engineering",
    metaDescription: "Fast, accessible web apps and marketing sites in React and Next.js, built for Core Web Vitals and SEO.",
    hero: {
      title: { light: "Websites and web apps", bold: "that load before you blink." },
      subtitle:
        "React and Next.js builds tuned for speed, accessibility and search, from marketing sites to complex web apps your team uses all day.",
      tags: ["Next.js", "React", "Core Web Vitals", "Accessibility", "SEO", "Headless CMS"],
      visualLabel: "lighthouse.report",
    },
    servicesTitle: "What We Build for the Web.",
    servicesSubtitle: "Anything that runs in a browser, built to be fast and found.",
    services: [
      { icon: "globe", title: "Marketing websites", description: "Fast, editable sites on a headless CMS your marketing team can run without us." },
      { icon: "layers", title: "Web applications", description: "Complex, data-heavy apps with real-time updates, roles and offline support." },
      { icon: "building", title: "E-commerce storefronts", description: "Headless Shopify and custom storefronts that convert on mobile.", href: routes.industry("ecommerce-retail") },
      { icon: "zap", title: "Performance fixes", description: "Slow sites audited and fixed until Core Web Vitals are green." },
      { icon: "heart", title: "Accessibility", description: "WCAG 2.2 AA audits and fixes, so everyone can use what you've built." },
      { icon: "search", title: "Technical SEO", description: "Rendering, structured data and site speed that help you get found." },
    ],
    approachTitle: "How We Build for the Web.",
    approachIntro: "Speed and accessibility are designed in, then checked on every pull request.",
    approach: [
      { title: "Set a performance budget", description: "We agree load-time and bundle-size limits before writing code." },
      { title: "Server-first rendering", description: "Pages render on the server and ship less JavaScript to the browser." },
      { title: "Components, not pages", description: "A shared component library keeps the site consistent and quick to extend." },
      { title: "Accessible by default", description: "Semantic HTML, keyboard support and colour contrast checked as we build." },
      { title: "Automated audits", description: "Lighthouse and accessibility checks run on every preview build." },
      { title: "Hand the keys over", description: "Your team edits content in the CMS without waiting for a developer." },
    ],
    targetsTitle: "Quality We Commit To.",
    targetsSubtitle: "Measured on real devices, checked on every release.",
    targets: [
      { value: "90+", label: "Lighthouse performance", detail: "on mobile for key pages", gauge: 90 },
      { value: "AA", label: "WCAG 2.2 accessibility", detail: "audited before launch", gauge: 100 },
      { value: "<2.5s", label: "Largest Contentful Paint", detail: "at the 75th percentile", gauge: 85 },
      { value: "<0.1", label: "Cumulative Layout Shift", detail: "no jumping pages", gauge: 95 },
    ],
    tech: [
      { label: "Frameworks", items: ["Next.js", "React", "Astro", "Remix", "TypeScript"] },
      { label: "Styling", items: ["Tailwind CSS", "CSS Modules", "Radix UI", "shadcn/ui"] },
      { label: "Content", items: ["Sanity", "Contentful", "Strapi", "Payload", "Webflow"] },
      { label: "Commerce", items: ["Shopify", "Stripe", "Medusa", "commercetools"] },
      { label: "Hosting", items: ["Vercel", "Netlify", "Cloudflare", "AWS"] },
      { label: "Quality", items: ["Lighthouse CI", "axe", "Playwright", "Sentry"] },
    ],
    caseTech: ["Next.js", "React", "Shopify", "Sanity", "Contentful", "Webflow", "Tailwind", "Vercel", "Astro"],
    defaultEngagement: "Custom Development",
    faqs: [
      { question: "Why Next.js?", answer: "It gives fast server rendering, good SEO and a huge ecosystem. We'll use something else, like Astro, when it fits better." },
      { question: "Can our marketing team edit the site?", answer: "Yes. We connect a headless CMS and train your team, so everyday changes don't need a developer." },
      { question: "Can you speed up our existing site?", answer: "Usually, yes. We start with a performance audit and fix the biggest wins first, often in a couple of weeks." },
      { question: "Do you design the site too?", answer: "We can. Our UI/UX designers work in the same squad, or we build from your existing designs." },
      { question: "Is accessibility included?", answer: "Always. We build to WCAG 2.2 AA and audit before launch." },
    ],
    cta: cta("Faster pages,", "more customers."),
  },
  {
    slug: "mobile-engineering",
    metaTitle: "Mobile Engineering",
    metaDescription: "iOS and Android apps in Flutter and React Native, built for crash-free sessions, fast starts and smooth store releases.",
    hero: {
      title: { light: "Mobile apps people", bold: "keep on their home screen." },
      subtitle:
        "Cross-platform apps in Flutter and React Native, and native when it matters. Smooth, stable and released to the stores without drama.",
      tags: ["iOS", "Android", "Flutter", "React Native", "Swift", "Kotlin"],
      visualLabel: "device-preview",
    },
    servicesTitle: "What We Build for Mobile.",
    servicesSubtitle: "Consumer apps, business apps and everything in between.",
    services: [
      { icon: "smartphone", title: "Cross-platform apps", description: "One codebase for iOS and Android in Flutter or React Native, without the clunky feel." },
      { icon: "cpu", title: "Native iOS and Android", description: "Swift and Kotlin when you need deep device features or the last drop of performance." },
      { icon: "zap", title: "Offline-first apps", description: "Apps that keep working in lifts, basements and warehouses, then sync." },
      { icon: "message-square", title: "Push and engagement", description: "Notifications, deep links and in-app messages that bring people back." },
      { icon: "wrench", title: "App rescue", description: "Crashing, slow or abandoned apps stabilised and brought up to date." },
      { icon: "rocket", title: "Store releases", description: "App Store and Play Store submissions, reviews and staged roll-outs handled for you." },
    ],
    approachTitle: "From Sketch to App Store.",
    approachIntro: "Designed for thumbs, tested on real devices, released in stages.",
    approach: [
      { title: "Choose the right approach", description: "Cross-platform, native or both, decided on your features, budget and team." },
      { title: "Design for thumbs", description: "Prototypes tested on real phones before we build, not just in a browser." },
      { title: "Build in fortnightly drops", description: "A new test build on your phone every two weeks via TestFlight and Play testing." },
      { title: "Test on real devices", description: "Automated tests plus a device lab covering the phones your users actually own." },
      { title: "Release in stages", description: "Staged roll-outs and feature flags, so any issue reaches few users." },
      { title: "Watch the crash rate", description: "Crash and performance monitoring from day one, fixed before reviews suffer." },
    ],
    targetsTitle: "Quality We Commit To.",
    targetsSubtitle: "Targets we set per app and track in your crash and performance dashboards.",
    targets: [
      { value: "99.9%", label: "Crash-free sessions", detail: "target for every production release", gauge: 99 },
      { value: "<2s", label: "Cold start", detail: "on mid-range devices", gauge: 86 },
      { value: "60fps", label: "Smooth scrolling", detail: "on lists and animations", gauge: 94 },
      { value: "4.5★+", label: "Store rating goal", detail: "backed by in-app feedback loops", gauge: 90 },
    ],
    tech: [
      { label: "Cross-platform", items: ["Flutter", "React Native", "Expo", "Dart", "TypeScript"] },
      { label: "Native", items: ["Swift", "SwiftUI", "Kotlin", "Jetpack Compose"] },
      { label: "Backend", items: ["Firebase", "Supabase", "Node.js", "GraphQL"] },
      { label: "Release", items: ["Fastlane", "EAS", "Codemagic", "TestFlight"] },
      { label: "Monitoring", items: ["Crashlytics", "Sentry", "Firebase Performance"] },
      { label: "Testing", items: ["Detox", "Appium", "Maestro", "BrowserStack"] },
    ],
    caseTech: ["Flutter", "React Native", "Expo", "Swift", "Kotlin", "iOS", "Android", "Firebase"],
    defaultEngagement: "Custom Development",
    faqs: [
      { question: "Flutter or React Native?", answer: "Both are excellent. Flutter suits highly custom UI; React Native suits teams already using React. We'll recommend one on your specifics." },
      { question: "Do you handle the App Store and Play Store?", answer: "Yes. Accounts, listings, submissions, review questions and staged roll-outs are all part of the job." },
      { question: "Can you take over our existing app?", answer: "Yes. We audit stability first, fix the crashes, then carry on with your roadmap." },
      { question: "How do you test on different phones?", answer: "Automated tests plus a device lab and cloud devices covering the models and OS versions your users have." },
      { question: "How long does an app take?", answer: "A focused first version usually takes 8 to 14 weeks. We'll give you a milestone plan in the proposal." },
      { question: "What about updates after launch?", answer: "We keep your app current with OS releases, monitor crashes and ship improvements on a monthly plan." },
    ],
    cta: cta("Your app, in your hand,", "in weeks."),
  },
  {
    slug: "backend-engineering",
    metaTitle: "Backend Engineering",
    metaDescription: "APIs, data pipelines and integrations that scale. Backend engineering in Node.js, Python and Go on PostgreSQL.",
    hero: {
      title: { light: "The quiet part of your product", bold: "that has to never break." },
      subtitle:
        "APIs, data models, queues and integrations built to stay fast under load, secure by default and easy for the next engineer to understand.",
      tags: ["APIs", "Microservices", "Data pipelines", "Integrations", "Node.js", "Go"],
      visualLabel: "request-flow.trace",
    },
    servicesTitle: "What We Build Behind the Scenes.",
    servicesSubtitle: "The engines that keep your apps, agents and reports running.",
    services: [
      { icon: "code", title: "APIs", description: "REST and GraphQL APIs with clear contracts, versioning and documentation." },
      { icon: "database", title: "Data modelling", description: "Schemas designed for today's features and next year's reports." },
      { icon: "workflow", title: "Integrations", description: "Payments, banking, CRMs, ERPs and logistics partners connected reliably.", href: routes.industry("fintech-insurance") },
      { icon: "zap", title: "Queues and real-time", description: "Background jobs, events and live updates that don't drop messages." },
      { icon: "layers", title: "Data pipelines", description: "Clean data flowing into your warehouse and dashboards on schedule." },
      { icon: "shield", title: "Auth and security", description: "Login, roles, audit trails and encryption built in from the start." },
    ],
    approachTitle: "How We Build Backends That Last.",
    approachIntro: "Clear contracts, boring technology and observability from day one.",
    approach: [
      { title: "Contract first", description: "We agree the API contract before building, so frontend and mobile can start in parallel." },
      { title: "Model the domain", description: "Data models that mirror how your business actually works, not how a tutorial does." },
      { title: "Design for failure", description: "Retries, timeouts and idempotency so a partner outage doesn't become yours." },
      { title: "Secure by default", description: "Least-privilege access, secrets management and input validation everywhere." },
      { title: "Observe everything", description: "Logs, metrics and traces so we can answer 'why is it slow?' in minutes." },
      { title: "Load test before launch", description: "We find the breaking point in testing, not on your busiest day." },
    ],
    targetsTitle: "Quality We Commit To.",
    targetsSubtitle: "Service levels agreed per system and shown on a live dashboard.",
    targets: [
      { value: "99.9%", label: "API uptime", detail: "monthly target for production", gauge: 99 },
      { value: "<200ms", label: "p95 response time", detail: "for core read endpoints", gauge: 88 },
      { value: "100%", label: "Endpoints documented", detail: "OpenAPI or GraphQL schema", gauge: 100 },
      { value: "0", label: "Secrets in code", detail: "scanned on every push", gauge: 100 },
    ],
    tech: [
      { label: "Languages", items: ["Node.js", "TypeScript", "Python", "Go", "Java"] },
      { label: "Frameworks", items: ["NestJS", "FastAPI", "Express", "Django", "Gin"] },
      { label: "Databases", items: ["PostgreSQL", "MongoDB", "Redis", "DynamoDB"] },
      { label: "Messaging", items: ["Kafka", "RabbitMQ", "SQS", "BullMQ"] },
      { label: "APIs", items: ["REST", "GraphQL", "gRPC", "OpenAPI", "Webhooks"] },
      { label: "Observability", items: ["OpenTelemetry", "Datadog", "Grafana", "Sentry"] },
    ],
    caseTech: ["Node", "NestJS", "Python", "FastAPI", "Go", "PostgreSQL", "MongoDB", "Redis", "Kafka", "GraphQL", "Django"],
    defaultEngagement: "Dedicated Developers",
    faqs: [
      { question: "Monolith or microservices?", answer: "Usually a well-structured monolith first. We split out services when there's a real reason, like scale or team size." },
      { question: "Can you integrate with our legacy systems?", answer: "Yes. We've connected to old SOAP services, FTP drops and databases with no API. We wrap them safely so new code stays clean." },
      { question: "How do you handle security?", answer: "Least-privilege access, encrypted data, secrets managers, dependency scanning and audit logs, aligned with common standards." },
      { question: "Will it scale?", answer: "We design for your expected load with headroom, and load test before launch so we know where the limits are." },
      { question: "Do you document the APIs?", answer: "Always. Every endpoint is described in OpenAPI or a GraphQL schema, with examples your partners can use." },
    ],
    cta: cta("Build the backend once.", "Build it right."),
  },
  {
    slug: "devops-cloud",
    metaTitle: "DevOps & Cloud",
    metaDescription: "CI/CD pipelines, infrastructure as code, monitoring and cloud cost control on AWS, Google Cloud and Azure.",
    hero: {
      title: { light: "Ship on a Friday.", bold: "Sleep on a Friday." },
      subtitle:
        "Pipelines, infrastructure as code and monitoring that make releases boring, plus a cloud bill you can actually explain.",
      tags: ["CI/CD", "AWS", "Kubernetes", "Terraform", "Monitoring", "Cost control"],
      visualLabel: "pipeline #1482",
    },
    servicesTitle: "What We Set Up and Run.",
    servicesSubtitle: "The machinery between a merged pull request and a happy user.",
    services: [
      { icon: "workflow", title: "CI/CD pipelines", description: "Build, test and deploy on every merge, with previews and one-click rollbacks." },
      { icon: "code", title: "Infrastructure as code", description: "Every server, database and permission written in Terraform, reviewed like code." },
      { icon: "cloud", title: "Cloud migration", description: "From ageing servers or another cloud to AWS, Google Cloud or Azure with no big-bang weekend." },
      { icon: "gauge", title: "Monitoring and alerts", description: "Dashboards and alerts that wake the right person for the right reason." },
      { icon: "trending-up", title: "Cost optimisation", description: "Right-sized resources, reserved capacity and clean-ups that cut the monthly bill." },
      { icon: "shield", title: "Security hardening", description: "Network rules, secrets, backups and access reviews set up properly." },
    ],
    approachTitle: "How We Make Releases Boring.",
    approachIntro: "Automate the path to production, then watch it closely.",
    approach: [
      { title: "Audit what's there", description: "We map your current setup, costs and risks in the first week." },
      { title: "Codify the infrastructure", description: "Everything moves into Terraform so it can be reviewed, repeated and restored." },
      { title: "Automate the pipeline", description: "Tests, security scans and deploys run automatically on every change." },
      { title: "Release safely", description: "Blue-green and canary releases with automatic rollback on errors." },
      { title: "Watch and alert", description: "Metrics, logs and traces in one place, with alerts tuned to avoid noise." },
      { title: "Review costs monthly", description: "A monthly cost report with the next three savings we recommend." },
    ],
    targetsTitle: "Quality We Commit To.",
    targetsSubtitle: "Measured with the DORA metrics and reported monthly.",
    targets: [
      { value: "Daily", label: "Deploy frequency", detail: "or on every merge", gauge: 92 },
      { value: "<15min", label: "Rollback time", detail: "back to the last good release", gauge: 90 },
      { value: "99.95%", label: "Platform uptime", detail: "monthly target for production", gauge: 99 },
      { value: "100%", label: "Infrastructure in code", detail: "no hand-built servers", gauge: 100 },
    ],
    tech: [
      { label: "Cloud", items: ["AWS", "Google Cloud", "Azure", "Cloudflare", "Vercel"] },
      { label: "Containers", items: ["Docker", "Kubernetes", "ECS", "Cloud Run"] },
      { label: "IaC", items: ["Terraform", "Pulumi", "CloudFormation", "Helm"] },
      { label: "CI/CD", items: ["GitHub Actions", "GitLab CI", "Argo CD", "CircleCI"] },
      { label: "Observability", items: ["Grafana", "Prometheus", "Datadog", "Sentry"] },
      { label: "Security", items: ["Vault", "Snyk", "Trivy", "AWS IAM"] },
    ],
    caseTech: ["AWS", "Docker", "Kubernetes", "Terraform", "GitHub Actions", "Google Cloud", "Azure", "CI/CD"],
    defaultEngagement: "Dedicated Developers",
    faqs: [
      { question: "Which cloud should we use?", answer: "Often the one your team already knows. We work across AWS, Google Cloud and Azure and will recommend based on your needs and credits." },
      { question: "Can you reduce our cloud bill?", answer: "Usually. Right-sizing, reserved capacity and removing forgotten resources often make a noticeable dent in the first month." },
      { question: "Do you offer on-call support?", answer: "Yes, on a monthly plan with agreed response times for incidents." },
      { question: "Do we need Kubernetes?", answer: "Often not. Simpler managed services are cheaper to run for most products. We'll only suggest Kubernetes when it pays off." },
      { question: "Is our infrastructure ours?", answer: "Yes. It lives in your cloud accounts, in code in your repository, with access you control." },
    ],
    cta: cta("Make releases", "boring again."),
  },
  {
    slug: "ui-ux-design",
    metaTitle: "UI/UX Design",
    metaDescription: "User research, product design, prototypes and design systems that engineers can build straight from.",
    hero: {
      title: { light: "Design that's easy to use", bold: "and easy to build." },
      subtitle:
        "Research, wireframes, prototypes and design systems made by designers who sit with engineers, so what you approve is what ships.",
      tags: ["Research", "UX", "UI", "Prototyping", "Design systems", "Accessibility"],
      visualLabel: "canvas.fig",
    },
    servicesTitle: "What Our Designers Deliver.",
    servicesSubtitle: "From the first question to the last pixel.",
    services: [
      { icon: "search", title: "User research", description: "Interviews, usability tests and analytics that show what people really need." },
      { icon: "workflow", title: "UX and flows", description: "Journeys and wireframes that make complex tasks feel simple." },
      { icon: "pen-tool", title: "UI design", description: "Distinctive, polished interfaces that fit your brand across web and mobile." },
      { icon: "sparkles", title: "Clickable prototypes", description: "Realistic prototypes to test with users and show investors before building." },
      { icon: "layers", title: "Design systems", description: "Tokens, components and guidelines shared between Figma and code." },
      { icon: "heart", title: "Accessibility reviews", description: "Contrast, focus, motion and screen reader checks before a line of code." },
    ],
    approachTitle: "How We Go From Question to Interface.",
    approachIntro: "Research a little, design a lot, test early and hand over cleanly.",
    approach: [
      { title: "Understand the problem", description: "Stakeholder interviews and a quick look at your data before any pixels." },
      { title: "Talk to users", description: "Five to eight user interviews usually reveal most of what matters." },
      { title: "Sketch the flows", description: "Low-fidelity wireframes to agree structure before visual design." },
      { title: "Design the system", description: "Colours, type and components defined once and reused everywhere." },
      { title: "Prototype and test", description: "Clickable prototypes tested with real users, then refined." },
      { title: "Hand over to code", description: "Specs, tokens and Storybook components so engineers build exactly what you approved." },
    ],
    targetsTitle: "Quality We Commit To.",
    targetsSubtitle: "Design quality measured with users, not opinions.",
    targets: [
      { value: "80%+", label: "Task success", detail: "in usability tests on key flows", gauge: 80 },
      { value: "AA", label: "Contrast and focus", detail: "WCAG 2.2 checked in design", gauge: 100 },
      { value: "100%", label: "Components in the system", detail: "no one-off screens", gauge: 100 },
      { value: "1:1", label: "Design to build match", detail: "reviewed on every release", gauge: 95 },
    ],
    tech: [
      { label: "Design", items: ["Figma", "FigJam", "Adobe CC", "Spline"] },
      { label: "Prototyping", items: ["Figma prototypes", "Framer", "ProtoPie"] },
      { label: "Research", items: ["Maze", "Lookback", "Hotjar", "Dovetail"] },
      { label: "Design systems", items: ["Storybook", "Tokens Studio", "Radix UI", "Tailwind CSS"] },
      { label: "Motion", items: ["Lottie", "Rive", "After Effects"] },
      { label: "Analytics", items: ["PostHog", "Mixpanel", "GA4"] },
    ],
    caseTech: ["Figma", "Storybook", "Framer", "Design system", "Webflow"],
    defaultEngagement: "Custom Development",
    faqs: [
      { question: "Do you only design, or build too?", answer: "Both. Our designers work in the same squad as engineers, but we're happy to do design-only projects too." },
      { question: "Can you work with our existing brand?", answer: "Yes. We extend your brand into a product design system, or help refresh it if it's holding you back." },
      { question: "Do we need user research?", answer: "A small amount almost always pays off. Even five interviews can save weeks of building the wrong thing." },
      { question: "What do we get at the end?", answer: "Figma files, a design system, clickable prototypes and developer-ready specs. All yours." },
      { question: "How long does a product design phase take?", answer: "Typically 3 to 6 weeks for a new product, depending on scope. Design then runs a sprint ahead of engineering." },
    ],
    cta: cta("Great products start", "with the right questions."),
  },
  {
    slug: "quality-assurance",
    metaTitle: "Quality Assurance",
    metaDescription: "Manual, automated, performance and security testing that catches problems before your users do.",
    hero: {
      title: { light: "Find the bugs", bold: "before your users do." },
      subtitle:
        "Manual and automated testing woven into every sprint, so releases go out with confidence rather than crossed fingers.",
      tags: ["Test automation", "Manual testing", "Performance", "Mobile QA", "Accessibility", "Security"],
      visualLabel: "test-runner --watch",
    },
    servicesTitle: "What Our QA Engineers Cover.",
    servicesSubtitle: "Every layer, from a single function to a full day of traffic.",
    services: [
      { icon: "code", title: "Test automation", description: "Unit, API and end-to-end suites that run on every pull request." },
      { icon: "search", title: "Manual and exploratory", description: "Skilled testers who think like users and try what scripts don't." },
      { icon: "smartphone", title: "Mobile and device testing", description: "Real devices and cloud labs covering the phones your users own." },
      { icon: "gauge", title: "Performance and load", description: "Load tests that find the breaking point before your big launch." },
      { icon: "heart", title: "Accessibility testing", description: "Keyboard, screen reader and contrast checks against WCAG 2.2." },
      { icon: "shield", title: "Security testing", description: "Dependency scans, OWASP checks and pen-test preparation.", href: routes.security },
    ],
    approachTitle: "How We Build Quality In.",
    approachIntro: "Testing starts at the ticket, not the week before launch.",
    approach: [
      { title: "Test at the ticket", description: "Acceptance criteria become test cases before development starts." },
      { title: "Automate the boring", description: "Repetitive regression checks move into automated suites fast." },
      { title: "Explore the edges", description: "Testers spend their time on the tricky, human cases automation misses." },
      { title: "Gate every merge", description: "Red tests block the merge. No exceptions, no 'fix it later'." },
      { title: "Test like production", description: "Realistic data, devices and load in a staging environment." },
      { title: "Report clearly", description: "A plain-English quality report with every release." },
    ],
    targetsTitle: "Quality We Commit To.",
    targetsSubtitle: "Tracked per release and shared with you in the Friday update.",
    targets: [
      { value: "90%+", label: "Critical paths automated", detail: "sign-up, checkout, payments and more", gauge: 90 },
      { value: "<10min", label: "Pipeline test time", detail: "fast feedback on every pull request", gauge: 85 },
      { value: "0", label: "Known critical bugs at release", detail: "blocked, not shipped", gauge: 100 },
      { value: "<2%", label: "Flaky test rate", detail: "quarantined and fixed weekly", gauge: 96 },
    ],
    tech: [
      { label: "Web automation", items: ["Playwright", "Cypress", "Selenium"] },
      { label: "Unit and API", items: ["Jest", "Vitest", "Pytest", "Postman", "REST Assured"] },
      { label: "Mobile", items: ["Appium", "Detox", "Maestro", "BrowserStack"] },
      { label: "Performance", items: ["k6", "JMeter", "Lighthouse CI"] },
      { label: "Accessibility", items: ["axe", "Pa11y", "VoiceOver", "NVDA"] },
      { label: "Management", items: ["TestRail", "Jira", "Linear", "Allure"] },
    ],
    caseTech: ["Playwright", "Cypress", "Jest", "Vitest", "Appium", "k6", "Selenium", "Detox"],
    defaultEngagement: "Dedicated Developers",
    faqs: [
      { question: "Can you test a product another team built?", answer: "Yes. We often start with a test audit, then build an automated regression suite around the riskiest journeys." },
      { question: "Manual or automated testing?", answer: "Both. Automation covers repetitive regression checks; skilled testers explore the edge cases automation misses." },
      { question: "Can QA join our existing sprints?", answer: "Yes. Our QA engineers join your ceremonies and tools, as part of a dedicated team or on their own." },
      { question: "Do you do penetration testing?", answer: "We run security scans and OWASP checks, and prepare you for an independent pen test with a specialist partner." },
      { question: "How do you deal with flaky tests?", answer: "We quarantine them the day they flake, fix the root cause and track the flaky rate every week." },
    ],
    cta: cta("Release with confidence,", "not crossed fingers."),
  },
];

export const disciplineBySlug = (slug: string) => disciplines.find((d) => d.slug === slug);
