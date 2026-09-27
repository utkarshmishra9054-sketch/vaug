import { caseStudies } from "./caseStudies";
import type { HomePageContent } from "./types";

/**
 * Home page content.
 * Clients, stats and results come from the real (anonymised) case studies.
 * Testimonials stay empty until real, approved quotes exist.
 */
/** Short, anonymised client names for tiles and result cards. */
const shortClient: Record<string, string> = {
  "reconciliation-agent-frankfurt-payments": "Payments processor",
  "freelancer-insurance-platform-london": "Freelancer insurtech",
  "physio-booking-app-dubai": "Physiotherapy clinics",
  "patient-whatsapp-voice-agent-manchester": "Diagnostics network",
  "family-office-property-brand-dubai": "Family office",
  "rental-prototype-rescue-lisbon": "Rental marketplace",
  "modest-fashion-marketplace-abu-dhabi": "Fashion marketplace",
  "headless-storefront-team-stockholm": "Shopify agency",
  "route-planning-pod-rotterdam": "Freight forwarder",
  "courier-driver-app-birmingham": "Courier network",
  "boutique-desert-retreat-ras-al-khaimah": "Desert retreat",
  "whatsapp-concierge-barcelona": "Boutique hotel group",
};

export const home: HomePageContent = {
  hero: {
    title: {
      light: "AI agents and engineers that",
      words: ["ship your product.", "answer your customers.", "qualify your leads.", "close your books.", "launch your venture."],
    },
    subtitle: "Rent developers, fix the price, or hand us the whole venture. We build the agents and the software around them.",
    ticker: ["AI Agents", "Dedicated Developers", "Custom Development", "Venture Studio", "Fixed-Price Projects", "Launch & Rescue"],
    cta: { label: "Book a strategy call", href: "#contact" },
    badgeWords: ["automate", "build", "scale"],
  },

  // Clients are anonymised by agreement; each tile links to its case study.
  clients: caseStudies.map((c) => ({
    label: shortClient[c.slug] ?? c.client,
    sector: c.industry,
    city: c.city.split(",")[0],
    icon: c.icon,
    href: `/case-studies/${c.slug}`,
  })),

  manifesto: {
    title: "Every repetitive task is a job an agent could do today.",
    highlight: "an agent could do today.",
    subtitle: "Workflows get **automated**. Products get **shipped**. We handle **both**.",
    tags: [
      "AI Agents", "Automation", "Workflows", "Integrations", "Web Apps", "Mobile Apps", "WhatsApp Agents",
      "Voice AI", "CRM Sync", "Dashboards", "SaaS", "APIs", "Cloud", "DevOps", "UI/UX", "QA", "Security",
      "Scalability", "Growth", "SEO", "Branding", "Launch",
    ],
  },

  aiSpotlight: {
    wordmark: "VAUG Agents",
    badge: "AI",
    title: "AI as a Service, built around your workflows",
    description:
      "We find where your team loses hours, then build, host and improve agents that do that work inside your CRM, inbox and WhatsApp.",
    cta: { label: "Meet VAUG Agents", href: "/agents" },
    story: [
      { lead: "Your team answers the same questions", punch: "A Hundred Times a Day", caption: "Order status, refunds, opening hours. Every message needs a human, every time." },
      { lead: "Leads wait in the inbox while everyone is", punch: "Busy Copy-Pasting", caption: "Hot leads go cold while your team moves data between tabs." },
      { lead: "A VAUG agent handles it", punch: "In Seconds, 24/7", caption: "It answers, qualifies and updates your CRM, and hands edge cases to a person." },
      { lead: "Your people get back to", punch: "The Work That Matters", caption: "Hours come back every week for strategy, clients and craft." },
    ],
  },

  modelsIntro: {
    title: "Six Ways to Build With VAUG.",
    subtitle: "One senior team, six ways to engage. Add AI agents to any of them.",
  },

  engagementModels: [
    {
      slug: "ai-as-a-service",
      title: "AI as a Service",
      description:
        "Agents that answer customers, qualify leads and reconcile data. We host, monitor and improve them for a monthly fee.",
      illustration: "agents",
      services: ["Workflow Audit & ROI Map", "Custom AI Agents", "CRM & WhatsApp Integrations", "Human-in-the-Loop Approvals", "Hosting & Monitoring", "Monthly Improvements"],
      bestFor: "Teams drowning in repetitive work",
      pricing: "Built, hosted and improved monthly",
    },
    {
      slug: "dedicated-developers",
      title: "Dedicated Developers",
      description:
        "Vetted engineers and AI specialists who join your stand-ups and your repo. Billed monthly, scaled as you need.",
      illustration: "developers",
      services: ["Full-Stack Engineers", "Mobile Engineers", "AI / ML Engineers", "Designers & QA", "Replacement Guarantee", "Monthly Scaling"],
      bestFor: "Teams that need capacity fast",
      pricing: "Month by month, scale any time",
    },
    {
      slug: "custom-development",
      title: "Custom Development",
      description: "Web, mobile, SaaS and internal tools, scoped with you and delivered build by build.",
      illustration: "custom",
      services: ["Discovery & Scoping", "Product Design", "Web & Mobile Apps", "SaaS Platforms", "Internal Tools", "QA, Launch & Handover"],
      bestFor: "Products with evolving requirements",
      pricing: "Scoped with you, sprint by sprint",
    },
    {
      slug: "venture-studio",
      title: "Venture Studio",
      description:
        "You bring the idea. We build the product and run the rest: brand, website, Google Business Profile, SEO and growth.",
      illustration: "venture",
      services: ["Product & Tech", "Branding & Website", "SEO & Google Business Profile", "Performance Marketing", "Social Media", "Analytics & Growth Ops"],
      bestFor: "Founders and HNIs launching a venture",
      pricing: "Retainer or partnership",
    },
    {
      slug: "fixed-price",
      title: "Fixed-Price Projects",
      description:
        "One agreed scope, one fixed price. Anything new is quoted separately, so your budget never moves.",
      illustration: "fixed",
      services: ["Locked Scope & Timeline", "Milestone Payments", "Weekly Demos", "Change Requests Quoted Separately", "Warranty Period", "Clean Handover"],
      bestFor: "Well-defined projects with a set budget",
      pricing: "One agreed scope and budget",
    },
    {
      slug: "launch-and-rescue",
      title: "Launch & Rescue",
      description:
        "Built on Lovable, Bolt or v0 and almost working? We fix it, secure it and ship it to production.",
      illustration: "rescue",
      services: ["Code Review & Clean-up", "Bug Fixing", "Auth & Database Security", "Payments & Domains", "Deployment & Hosting", "Performance Pass"],
      bestFor: "AI-built and no-code apps that need a finish",
      pricing: "Audit first, then a fixed plan",
    },
  ],

  stats: [
    { value: 7, suffix: "+", label: "Years building", detail: "Operating since 2019, registered in 2021", icon: "rocket" },
    { value: caseStudies.length, suffix: "", label: "Detailed case studies", detail: "Every client anonymised, every number real", icon: "file-check" },
    { value: 6, suffix: "", label: "Sectors served", detail: "Finance, health, property, retail, logistics, travel", icon: "layers" },
    { value: 3, suffix: "", label: "Client regions", detail: "The UK, mainland Europe and the UAE", icon: "globe" },
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
    { title: "AI speed, engineering discipline.", description: "AI makes us fast. Tests, reviews and solid architecture keep it safe.", icon: "cpu" },
    { title: "One accountable lead.", description: "One person owns your project, with weekly demos and a Friday update.", icon: "handshake" },
    { title: "We stay after launch.", description: "We host, monitor and improve, or hand over cleanly. Your call.", icon: "heart" },
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
      title: "Fixed price, custom quote or dedicated team: which fits?",
      excerpt: "Answer four questions and get a recommendation, or compare all six models.",
      cover: { bg: "#6d28d9", fg: "#ffd23f", motif: "bars" },
    },
    {
      slug: "results",
      href: "/case-studies",
      type: "Article",
      title: "Twelve builds, six sectors: see the work and the numbers",
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
  testimonials: [],

  faqs: [
    { question: "What does AI as a Service include?", answer: "We audit your workflows, build custom AI agents, connect them to your tools, and host, monitor and improve them for a monthly fee." },
    { question: "How does fixed-price work if my requirements change?", answer: "The agreed scope stays at the agreed price. Any new requirement is scoped and quoted as a separate piece of work, so your original budget never moves." },
    { question: "Can you fix an app I built on Lovable, Bolt or v0?", answer: "Yes. We review the code, fix bugs and security gaps, set up hosting, domain and payments, and deploy it to production." },
    { question: "Do you work with individuals as well as companies?", answer: "Yes. We work with founders, HNIs and family offices as well as enterprises and agencies that need an outsourcing partner." },
  ],

  cta: {
    title: { light: "One conversation can tell you", bold: "what to build first." },
    subtitle: "Free 30-minute strategy call · NDA on request · Proposal within 48 hours",
    button: "Book a call",
  },
};
