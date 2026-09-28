import { caseStudies } from "./caseStudies";
import type { HomePageContent } from "./types";

/**
 * Home page content.
 * Clients, stats and results come from the real case studies. Client logos and
 * testimonials come from the 2023 VAUG proposal.
 */
/** Short client names for tiles and result cards, where the full name is long. */
const shortClient: Record<string, string> = {
  "freelancer-insurance-platform-london": "Collective Benefits",
  "physio-booking-app-dubai": "PhysioFit",
  "family-office-property-brand-dubai": "La Boutique",
  "route-planning-pod-rotterdam": "EGS Rotterdam",
  "courier-driver-app-birmingham": "City Quick",
  "seo-cbd-ecommerce-canada": "CBD2Heal",
};

export const home: HomePageContent = {
  hero: {
    title: {
      light: "AI-first teams that",
      words: ["build your product.", "automate your workflows.", "extend your team.", "launch your business.", "keep your app running.", "rescue your prototype."],
    },
    subtitle: "Agents, developers, custom builds, end-to-end launches, monthly care and rescues. One team uses AI in every service, so you get shorter timelines and leaner budgets.",
    ticker: ["AI as a Service", "Dedicated Developers", "Custom Development", "Build With Us", "Monthly Retainer", "Launch & Rescue"],
    cta: { label: "Book a strategy call", href: "#contact" },
    badgeWords: ["automate", "build", "scale"],
  },

  // Every client on the wall links to its case study.
  clients: caseStudies.map((c) => ({
    label: shortClient[c.slug] ?? c.client,
    sector: c.industry,
    city: c.city.split(",")[0],
    icon: c.icon,
    href: `/case-studies/${c.slug}`,
    logoSrc: c.logo,
  })),

  manifesto: {
    title: "AI is how we work, in every service we sell.",
    highlight: "in every service we sell.",
    subtitle: "Products get **built faster**. Workflows get **automated**. Budgets go **further**.",
    tags: [
      "AI Agents", "Web Apps", "Mobile Apps", "SaaS", "Dedicated Teams", "Automation", "Integrations",
      "WhatsApp Agents", "Dashboards", "APIs", "Cloud", "DevOps", "UI/UX", "QA", "Security", "Maintenance",
      "Support", "Branding", "SEO", "Growth", "Launch", "Rescue",
    ],
  },

  aiSpotlight: {
    wordmark: "VAUG Agents",
    badge: "AI",
    title: "AI as a Service: agents that do the repetitive work",
    description:
      "One of our six services. We find where your team loses hours, then build, host and improve agents that do that work inside your CRM, inbox and WhatsApp.",
    cta: { label: "Meet VAUG Agents", href: "/agents" },
    story: [
      { lead: "Your team answers the same questions", punch: "A Hundred Times a Day", caption: "Where's my order? Can I get a refund? Every reply pulls someone off real work, and tomorrow they type it again." },
      { lead: "While they reply, new leads", punch: "Go Cold in the Queue", caption: "A demo request sits unanswered for hours while your team copies leads into a spreadsheet. By the time someone replies, the buyer has moved on." },
      { lead: "A VAUG agent works the whole inbox", punch: "In Seconds, 24/7", caption: "It answers customers, qualifies leads, updates your CRM and hands anything unusual to a person." },
      { lead: "Your people get back to", punch: "The Work That Matters", caption: "No queue and no copy-paste. Your team only sees the conversations that need them." },
    ],
  },

  modelsIntro: {
    title: "Six Services. One AI-First Team.",
    subtitle: "Each one solves a different problem. All of them use AI to ship faster and stretch your budget further.",
  },

  engagementModels: [
    {
      slug: "ai-as-a-service",
      title: "AI as a Service",
      description:
        "AI agents that answer customers, qualify leads and move data between your tools. We build them, host them and improve them every month.",
      illustration: "agents",
      services: ["Workflow Audit & ROI Map", "Custom AI Agents", "CRM & WhatsApp Integrations", "Human-in-the-Loop Approvals", "Hosting & Monitoring", "Monthly Improvements"],
      bestFor: "Teams losing hours to repetitive work",
      pricing: "Built once, then one monthly fee",
    },
    {
      slug: "dedicated-developers",
      title: "Dedicated Developers",
      description:
        "Vetted engineers who work in your repo, join your stand-ups and take direction from you. They use AI tools daily, so each month ships more.",
      illustration: "developers",
      services: ["Full-Stack Engineers", "Mobile Engineers", "AI / ML Engineers", "Designers & QA", "Replacement Guarantee", "Monthly Scaling"],
      bestFor: "Teams with a roadmap that need more hands",
      pricing: "Month by month, scale any time",
    },
    {
      slug: "custom-development",
      title: "Custom Development",
      description:
        "Tell us the product you need and we design, build and launch it. Choose one fixed price for a clear scope, or sprint by sprint when it will evolve.",
      illustration: "custom",
      services: ["Discovery & Scoping", "Product Design", "Web & Mobile Apps", "SaaS Platforms", "Fixed Price or Sprints", "QA, Launch & Handover"],
      bestFor: "A defined product you want built",
      pricing: "Fixed price or sprint by sprint",
    },
    {
      slug: "build-with-us",
      title: "Build With Us",
      description:
        "Bring the idea and we act as your whole team: product, brand, website, launch and growth, managed end to end with AI agents built in.",
      illustration: "build",
      services: ["Validation & Strategy", "Product & Tech", "Brand & Website", "SEO & Google Business Profile", "Launch Campaigns", "AI Agents & Growth Ops"],
      bestFor: "Founders and investors launching something new",
      pricing: "Retainer or partnership",
    },
    {
      slug: "monthly-retainer",
      title: "Monthly Retainer",
      description:
        "Your product is live and needs looking after. For one monthly fee we fix bugs, keep it secure and up to date, and ship improvements every month.",
      illustration: "retainer",
      services: ["Bug Fixes & Support", "Security & Updates", "Monitoring & Uptime", "Small Features Each Month", "AI Upgrades", "Monthly Report"],
      bestFor: "Live products that need steady care",
      pricing: "One fee, every month",
    },
    {
      slug: "launch-and-rescue",
      title: "Launch & Rescue",
      description:
        "Built on Lovable, Bolt or v0 and almost working? We fix it, secure it and ship it to production in days.",
      illustration: "rescue",
      services: ["Code Review & Clean-up", "Bug Fixing", "Auth & Database Security", "Payments & Domains", "Deployment & Hosting", "Performance Pass"],
      bestFor: "AI-built and no-code apps that need a finish",
      pricing: "Review first, then a fixed fee",
    },
  ],

  stats: [
    { value: 7, suffix: "+", label: "Years building", detail: "Operating since 2019, registered in 2021", icon: "rocket" },
    { value: caseStudies.length, suffix: "", label: "Detailed case studies", detail: "Every number from the client's own data", icon: "file-check" },
    { value: 6, suffix: "", label: "Sectors served", detail: "Finance, health, property, retail, logistics, travel", icon: "layers" },
    { value: 5, suffix: "", label: "Client regions", detail: "The UK, mainland Europe, the UAE, India and Canada", icon: "globe" },
  ],

  caseStudiesTitle: "Results Our Clients Can Count.",
  caseStudies,

  techTitle: "Fluent in the Stacks You Already Use.",
  techStack: [
    { category: "AI & LLMs", href: "/engineering/ai-engineering", label: "Agents & models", icon: "cpu", description: "Model selection, retrieval, tool use and evaluation for agents that behave in production.", items: ["OpenAI", "Anthropic Claude", "Gemini", "Llama", "LangChain", "LlamaIndex", "Vector DBs"] },
    { category: "Frontend", href: "/engineering/web-engineering", label: "Web & mobile", icon: "smartphone", description: "Fast, accessible interfaces for web and mobile, from marketing sites to complex dashboards.", items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "React Native", "Flutter"] },
    { category: "Backend", href: "/engineering/backend-engineering", label: "APIs & data", icon: "database", description: "Reliable APIs, data models and integrations that scale with your business.", items: ["Node.js", "Python", "FastAPI", "Go", "GraphQL", "PostgreSQL", "MongoDB"] },
    { category: "Cloud & DevOps", href: "/engineering/devops-cloud", label: "Infrastructure", icon: "cloud", description: "Deployments, monitoring and cost control on the cloud that suits you.", items: ["AWS", "Google Cloud", "Azure", "Vercel", "Docker", "Kubernetes"] },
    { category: "Automation", href: "/agents", label: "Workflows", icon: "workflow", description: "Glue between your tools, so data moves without anyone copy-pasting it.", items: ["n8n", "Make", "Zapier", "WhatsApp API", "Twilio", "Stripe"] },
    { category: "No-code rescue", href: "/services/launch-and-rescue", label: "Launch & fix", icon: "wrench", description: "We speak the tools your prototype started in, and finish what they couldn't.", items: ["Lovable", "Bolt", "v0", "Supabase", "Firebase", "Webflow"] },
  ],

  principlesTitle: "How Every VAUG Project Runs.",
  principles: [
    { title: "We diagnose first.", description: "We map your workflows first and start with the work that pays back fastest.", icon: "search" },
    { title: "AI speed, engineering discipline.", description: "AI shortens timelines and trims budgets. Tests, reviews and solid architecture keep it safe.", icon: "cpu" },
    { title: "One accountable lead.", description: "One person owns your project, with weekly demos and a Friday update.", icon: "handshake" },
    { title: "We stay after launch.", description: "A monthly retainer keeps your product improving, or we hand over cleanly. Your call.", icon: "heart" },
  ],

  audiencesTitle: "Built for Founders, Investors and Enterprises.",
  audiences: [
    { title: "Startups & Founders", href: "/who-we-serve/startups", description: "Idea to launch with one partner for product and growth.", icon: "rocket" },
    { title: "HNIs & Family Offices", href: "/who-we-serve/hnis-family-offices", description: "Discreet, fully managed private ventures and brands.", icon: "crown" },
    { title: "Enterprises", href: "/who-we-serve/enterprises", description: "An outsourcing partner for AI, modernization and capacity.", icon: "building" },
    { title: "Agencies", href: "/who-we-serve/agencies", description: "White-label builds your clients see as your own.", icon: "handshake" },
  ],

  industries: ["Fintech", "Insurance", "Healthcare", "Real Estate", "E-commerce", "Logistics", "Hospitality"],

  insightsIntro: {
    title: "Start Where You Are.",
    subtitle: "Four starting points, depending on what you need first.",
  },
  insights: [
    {
      slug: "first-ai-agent",
      href: "/agents",
      type: "Guide",
      title: "Find your first AI agent and see how the pilot runs",
      excerpt: "The agents we build, how a shadow run works and how the payback is measured.",
      cover: { bg: "#6d28d9", fg: "#ffd23f", motif: "rings" },
    },
    {
      slug: "lovable-to-production",
      href: "/services/launch-and-rescue",
      type: "Playbook",
      title: "Turn a Lovable, Bolt or v0 prototype into a real product",
      excerpt: "What we audit, what we keep and how a rescue ships in weeks, not months.",
      cover: { bg: "#ffd23f", fg: "#131116", motif: "grid" },
    },
    {
      slug: "which-model",
      href: "/services#chooser",
      type: "Guide",
      title: "Build, extend, launch or look after: which service fits?",
      excerpt: "Answer four questions and get a recommendation, or compare all six services.",
      cover: { bg: "#6d28d9", fg: "#ffd23f", motif: "bars" },
    },
    {
      slug: "results",
      href: "/case-studies",
      type: "Article",
      title: `${caseStudies.length} case studies: see the work and the numbers`,
      excerpt: "Filter real case studies by sector, service, client type and region.",
      cover: { bg: "#131116", fg: "#ffd23f", motif: "dots" },
    },
  ],

  outcomesTitle: "What Changed for Our Clients.",
  outcomes: caseStudies
    .filter((c) => !c.placeholder)
    .slice(0, 9)
    .map((c) => ({
      value: c.metrics[0].value,
      label: c.metrics[0].label,
      text: c.results.narrative.split(". ")[0].replace(/\.$/, "") + ".",
      client: shortClient[c.slug] ?? c.client,
      service: c.model,
      tint: c.tint,
      href: `/case-studies/${c.slug}`,
    })),
  testimonialsTitle: "What Clients Say After Working With Us.",
  // From the 2023 proposal. TODO(content): confirm each person's approval of the edited wording.
  testimonials: [
    {
      quote: "VAUG has been a great partner for our business. They helped us improve our website's ranking in Google search results, and we've seen a significant increase in traffic and leads, exceeding expectations.",
      name: "Kunal Kapoor",
      role: "Co-founder",
      company: "Ketto",
    },
    {
      quote: "They have a deep understanding of SEO and are always up to date on Google's latest changes. We've worked with VAUG for four years and have been very pleased with the results.",
      name: "Ariba Khan",
      role: "CEO",
      company: "Jumping Minds",
    },
    {
      quote: "Their expertise in 360° digital marketing has improved our search rankings and online visibility. The team is creative, passionate and always willing to go the extra mile.",
      name: "Tejal Bajla",
      role: "CEO",
      company: "allthingsbaby.com",
    },
    {
      quote: "We have seen a significant increase in our sales and brand awareness. Their SEO services are top-notch!",
      name: "Richard Sanchez",
      role: "CEO",
      company: "CBD2Heal",
    },
    {
      quote: "Their comprehensive strategy and execution led to significant improvements in my website's rankings.",
      name: "Nimish Gopal",
      role: "CEO",
      company: "CareerNaksha",
    },
  ],

  faqs: [
    { question: "What does \"AI-first\" mean if I'm not buying an AI agent?", answer: "Our engineers, designers and QA use AI tools in every step of the work, with human review on everything. You see it as shorter timelines and leaner budgets on custom builds, retainers and dedicated teams alike." },
    { question: "Can you build my product at a fixed price?", answer: "Yes. Custom Development can run at one fixed price when the scope is clear, or sprint by sprint when it will evolve. Any new requirement is quoted separately, so the agreed budget never moves." },
    { question: "What's the difference between a Monthly Retainer and Dedicated Developers?", answer: "With Dedicated Developers, named engineers join your team and you direct their work. With a Monthly Retainer, we manage the work for you: support, fixes, updates and a set of improvements each month for a live product." },
    { question: "What does Build With Us cover?", answer: "Everything a new business needs from us: validating the idea, building the product, brand and website, Google listings, launch campaigns and the AI agents that answer your first customers." },
    { question: "Can you fix an app I built on Lovable, Bolt or v0?", answer: "Yes. We review the code, fix bugs and security gaps, set up hosting, domain and payments, and deploy it to production." },
    { question: "Do you work with individuals as well as companies?", answer: "Yes. We work with founders, HNIs and family offices as well as enterprises and agencies that need an outsourcing partner." },
  ],

  cta: {
    title: { light: "One conversation can tell you", bold: "what to build first." },
    subtitle: "Free 30-minute strategy call · NDA on request · Proposal within 48 hours",
    button: "Book a call",
  },
};
