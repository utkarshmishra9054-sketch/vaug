import type { engagementOptions } from "@/lib/lead-options";

import { routes } from "./taxonomy";
import type { AudienceSlug, CtaBlock, EngineeringSlug, Faq, Feature, IconName, Link, Metric, ServiceSlug, SplitTitle } from "./types";

/**
 * Content for /services and /services/[slug].
 * No prices are published: each page shows how an engagement starts instead.
 */

export type LeadOption = (typeof engagementOptions)[number];

/** One way to begin an engagement: what happens, what you get and how long it takes. */
export interface StartOption {
  name: string;
  icon: IconName;
  timeline: string;
  what: string;
  get: string[];
  highlight?: boolean;
}

/** "How we start": three ways to begin plus a strip of commitments. No prices. */
export interface StartBlock {
  title: SplitTitle;
  subtitle: string;
  options: StartOption[];
  commitments: string[];
}

export interface ServiceDetail {
  slug: ServiceSlug;
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  title: SplitTitle;
  subtitle: string;
  primary: Link;
  secondary: Link;
  /** Short commitments shown under the hero (process promises, not client stats). */
  facts: Metric[];
  problemsTitle: string;
  problems: Feature[];
  offeringsTitle: string;
  offerings: Feature[];
  stepsTitle: string;
  steps: Feature[];
  start: StartBlock;
  deliverablesTitle: string;
  deliverables: string[];
  differentiators: Feature[];
  tech: { label: string; items: string[] }[];
  industriesNote: string;
  audiences: { slug: AudienceSlug; note: string }[];
  engineering: EngineeringSlug[];
  faqs: Faq[];
  cta: CtaBlock;
  leadOption: LeadOption;
}

/* ------------------------------------------------------------------ */
/* /services index                                                     */
/* ------------------------------------------------------------------ */

export interface ModelProfile {
  slug: ServiceSlug;
  /** 1 (low) to 5 (high). */
  speed: number;
  certainty: number;
  control: number;
  /** How much of your time it needs, 1 (little) to 5 (a lot). */
  involvement: number;
  startsIn: string;
  billing: string;
  bestFor: string;
}

export interface QuizQuestion {
  question: string;
  options: { label: string; scores: Partial<Record<ServiceSlug, number>> }[];
}

export interface ServicesIndexContent {
  eyebrow: string;
  title: SplitTitle;
  subtitle: string;
  tags: string[];
  cardsTitle: string;
  cardsSubtitle: string;
  chooser: {
    title: string;
    subtitle: string;
    questions: QuizQuestion[];
    /** Why we'd recommend each model, shown on the quiz result. */
    reasons: Record<ServiceSlug, string>;
    profiles: ModelProfile[];
  };
  combine: { title: string; subtitle: string; items: Feature[] };
  processTitle: string;
  processSubtitle: string;
  process: Feature[];
  caseStudiesTitle: string;
  faqs: Faq[];
  cta: CtaBlock;
}

export const servicesIndex: ServicesIndexContent = {
  eyebrow: "Services",
  title: { light: "One AI-first team.", bold: "Six ways to work with it." },
  subtitle:
    "Automate work with AI agents, add engineers to your team, get a product built, launch a business end to end, keep a live product improving, or rescue an app that almost works. Every service uses AI to shorten timelines and stretch your budget.",
  tags: ["AI agents", "Dedicated developers", "Custom builds", "Build with us", "Monthly retainer", "Launch & rescue"],
  cardsTitle: "Six services. Six different jobs.",
  cardsSubtitle: "Every service comes with the same senior people, the same weekly demos and the same Friday update.",

  chooser: {
    title: "Which Service Fits You?",
    subtitle: "Answer four quick questions, or compare every service side by side. There are no wrong answers: most clients combine two.",
    questions: [
      {
        question: "What do you need most right now?",
        options: [
          { label: "Take repetitive work off my team", scores: { "ai-as-a-service": 3 } },
          { label: "More engineering hands, fast", scores: { "dedicated-developers": 3 } },
          { label: "A new product built properly", scores: { "custom-development": 3 } },
          { label: "A whole business launched for me", scores: { "build-with-us": 3 } },
          { label: "Someone to look after my live product", scores: { "monthly-retainer": 3 } },
          { label: "Fix an app that almost works", scores: { "launch-and-rescue": 3 } },
        ],
      },
      {
        question: "Where are you today?",
        options: [
          { label: "It's still an idea", scores: { "build-with-us": 2, "custom-development": 1 } },
          { label: "I know exactly what to build", scores: { "custom-development": 2, "launch-and-rescue": 1 } },
          { label: "My product is live", scores: { "monthly-retainer": 2, "dedicated-developers": 1 } },
          { label: "It's an ongoing workflow, not a product", scores: { "ai-as-a-service": 2 } },
        ],
      },
      {
        question: "How would you like to pay?",
        options: [
          { label: "One fixed price", scores: { "custom-development": 2, "launch-and-rescue": 2 } },
          { label: "Per engineer, per month", scores: { "dedicated-developers": 2 } },
          { label: "One predictable monthly fee", scores: { "monthly-retainer": 2, "ai-as-a-service": 2 } },
          { label: "Retainer or partnership", scores: { "build-with-us": 2 } },
        ],
      },
      {
        question: "How involved do you want to be?",
        options: [
          { label: "Hands-on: I'll direct the team", scores: { "dedicated-developers": 2 } },
          { label: "A weekly demo is plenty", scores: { "custom-development": 1, "ai-as-a-service": 1, "launch-and-rescue": 1 } },
          { label: "A monthly check-in is enough", scores: { "monthly-retainer": 2 } },
          { label: "Hand it all over", scores: { "build-with-us": 2, "ai-as-a-service": 1 } },
        ],
      },
    ],
    reasons: {
      "ai-as-a-service": "Your pain is repetitive work, not missing software. An agent that answers, qualifies or reconciles will pay for itself faster than a new build.",
      "dedicated-developers": "You already have a roadmap and want to steer. AI-assisted engineers who join your stand-ups give you speed without handing over control.",
      "custom-development": "You know the product you need. We scope it, build it and launch it, at one fixed price if the scope is clear or sprint by sprint if it will move.",
      "build-with-us": "You have the idea and the backing, not the team. We build the product and run the launch end to end so you can focus on the business.",
      "monthly-retainer": "Your product is live and needs steady care. One monthly fee covers fixes, updates, security and a set of improvements every month.",
      "launch-and-rescue": "You're close. A short, fixed-fee fix gets your AI-built app secure, stable and live in days, not months.",
    },
    profiles: [
      { slug: "ai-as-a-service", speed: 4, certainty: 4, control: 3, involvement: 2, startsIn: "2 weeks", billing: "Build, then monthly", bestFor: "Repetitive workflows" },
      { slug: "dedicated-developers", speed: 5, certainty: 3, control: 5, involvement: 4, startsIn: "1–2 weeks", billing: "Monthly per engineer", bestFor: "Teams needing capacity" },
      { slug: "custom-development", speed: 4, certainty: 4, control: 4, involvement: 3, startsIn: "2–3 weeks", billing: "Fixed price or per sprint", bestFor: "New products" },
      { slug: "build-with-us", speed: 3, certainty: 3, control: 2, involvement: 1, startsIn: "3–4 weeks", billing: "Retainer or partnership", bestFor: "New businesses" },
      { slug: "monthly-retainer", speed: 4, certainty: 5, control: 3, involvement: 1, startsIn: "1 week", billing: "One monthly fee", bestFor: "Live products" },
      { slug: "launch-and-rescue", speed: 5, certainty: 5, control: 3, involvement: 2, startsIn: "48 hours", billing: "Fixed fee per fix", bestFor: "AI-built apps" },
    ],
  },

  combine: {
    title: "Most Clients Combine Two.",
    subtitle: "The services are building blocks. These are the pairings we see most.",
    items: [
      { title: "Build, then look after", description: "We build your product at a fixed price, then a monthly retainer keeps it secure, fast and improving.", icon: "code", meta: "Custom Development + Monthly Retainer" },
      { title: "Rescue, then retain", description: "We fix and launch your Lovable build for a fixed fee, then a retainer or dedicated engineer keeps it moving.", icon: "wrench", meta: "Launch & Rescue + Monthly Retainer" },
      { title: "Launch with agents built in", description: "Your new business opens with enquiries, bookings and follow-ups already automated.", icon: "rocket", meta: "Build With Us + AI as a Service" },
    ],
  },

  processTitle: "How Every Engagement Runs.",
  processSubtitle: "Whatever the service, the rhythm is the same: diagnose first, one accountable lead, a demo every week and a written update every Friday.",
  process: [
    { title: "Strategy call", description: "Thirty minutes, free. We listen, ask awkward questions and tell you honestly if we're the right fit.", meta: "Day 0", icon: "message-square" },
    { title: "Proposal in 48 hours", description: "Scope, service, team, timeline and price in writing. NDA first if you need one.", meta: "Day 2", icon: "file-check" },
    { title: "Diagnose", description: "A short discovery to test the riskiest assumptions before anyone writes production code.", meta: "Week 1", icon: "search" },
    { title: "Build with weekly demos", description: "AI-assisted delivery, working software every week, a Friday update and one lead who owns it.", meta: "Weeks 2+", icon: "hammer" },
    { title: "Launch and stay", description: "We ship, monitor and keep improving on a monthly retainer, or hand over cleanly.", meta: "Ongoing", icon: "rocket" },
  ],

  caseStudiesTitle: "Work Across Every Service.",

  faqs: [
    { question: "What does \"AI-first\" mean for services that aren't AI agents?", answer: "Our engineers, designers and QA use AI tools at every step, from scoping to testing, and a senior person reviews everything. You see it as shorter timelines and leaner budgets on every service, not just the agents." },
    { question: "Can I switch services later?", answer: "Yes, and many clients do. A custom build often moves onto a monthly retainer after launch, and a dedicated engineer can move onto an AI agent project. Your lead handles the handover so nothing is lost." },
    { question: "How is a Monthly Retainer different from Dedicated Developers?", answer: "Dedicated Developers are named engineers who join your team and take direction from you. A Monthly Retainer is managed by us: we decide who does what across design, engineering, QA and DevOps to keep your live product fixed, secure and improving." },
    { question: "How quickly can you start?", answer: "Launch & Rescue can start within 48 hours. Retainers and dedicated engineers usually start within one to two weeks. Custom builds and Build With Us start after a short discovery, typically two to four weeks from the first call." },
    { question: "Do I own the code and the IP?", answer: "Yes. Everything we build for you, including agent prompts, workflows and infrastructure code, is yours once invoices are paid. We sign an NDA before you share anything sensitive." },
    { question: "What if I'm not sure which service I need?", answer: "Pick 'Not sure yet' on the enquiry form. On the strategy call we'll recommend a service, explain why, and tell you what it would take to start small." },
    { question: "Is there a minimum engagement?", answer: "Dedicated engineers and retainers start at one month. AI agents are a monthly subscription after the build. Custom builds and rescues are priced per scope, so there's no minimum beyond the job itself." },
  ],

  cta: {
    title: { light: "Not sure which service fits?", bold: "We'll tell you honestly." },
    subtitle: "Free 30-minute strategy call · NDA on request · Proposal within 48 hours",
    button: "Book a call",
  },
};

/* ------------------------------------------------------------------ */
/* /services/[slug]                                                    */
/* ------------------------------------------------------------------ */

const bookCall: Link = { label: "Book a strategy call", href: "#contact" };

export const serviceDetails: ServiceDetail[] = [
  /* ---------------------------- AI as a Service ---------------------------- */
  {
    slug: "ai-as-a-service",
    metaTitle: "AI as a Service: custom AI agents, hosted and improved",
    metaDescription:
      "VAUG builds, hosts and improves AI agents that answer customers, qualify leads and reconcile data inside your CRM, inbox and WhatsApp, for a monthly fee.",
    eyebrow: "AI as a Service",
    title: { light: "AI agents that do the work,", bold: "hosted and improved for you." },
    subtitle:
      "We find where your team loses hours, then build agents that answer, qualify, reconcile and follow up inside the tools you already use. We host them, watch them and make them better every month.",
    primary: bookCall,
    secondary: { label: "Meet VAUG Agents", href: routes.agents },
    facts: [
      { value: "2 wks", label: "typical time to a first agent in shadow mode" },
      { value: "24/7", label: "coverage across chat, email and WhatsApp" },
      { value: "1", label: "monthly fee for build, hosting and improvements" },
    ],
    problemsTitle: "Sound Familiar?",
    problems: [
      { title: "The same questions, all day", description: "Order status, opening hours, refund rules. Your best people spend their mornings copy-pasting answers.", icon: "message-square" },
      { title: "Leads go cold in the inbox", description: "Enquiries arrive at 11pm and get a reply at 11am. By then they've booked with someone faster.", icon: "trending-up" },
      { title: "Data moved by hand", description: "Invoices, orders and bookings retyped between tools, with errors found weeks later.", icon: "database" },
      { title: "AI pilots that never shipped", description: "A clever demo that nobody trusts in production, because nobody owns it after the hackathon.", icon: "bot" },
    ],
    offeringsTitle: "What's Included.",
    offerings: [
      { title: "Workflow audit & ROI map", description: "We shadow your team, measure where time goes and rank the workflows an agent should take first.", icon: "search" },
      { title: "Custom AI agents", description: "Support, sales, finance and back-office agents built on your data, your rules and your tone of voice.", icon: "bot" },
      { title: "CRM, inbox & WhatsApp integrations", description: "Agents read and write where work already happens: HubSpot, Salesforce, Zendesk, Gmail, WhatsApp Business and more.", icon: "workflow" },
      { title: "Human-in-the-loop approvals", description: "Refunds, discounts and anything risky go to a person with one-tap approve or edit.", icon: "users" },
      { title: "Hosting & monitoring", description: "We run the agents, log every action, watch quality and cost, and get alerted before you do.", icon: "cloud" },
      { title: "Monthly improvements", description: "We review conversations, fix gaps and add new skills each month. The agent gets better, not stale.", icon: "trending-up" },
    ],
    stepsTitle: "From Audit to Always-On.",
    steps: [
      { title: "Audit", description: "We map your workflows and pick the one with the clearest payback.", meta: "Week 1" },
      { title: "Build", description: "Agent, knowledge base, integrations and guardrails, demoed to you as it grows.", meta: "Weeks 2–3" },
      { title: "Shadow run", description: "The agent drafts, your team approves. We measure accuracy on real work.", meta: "Weeks 3–4" },
      { title: "Launch", description: "The agent goes live on the tasks it has earned, with humans on the edge cases.", meta: "Week 5" },
      { title: "Improve", description: "Monthly reviews, new skills, new workflows. You see the numbers every Friday.", meta: "Monthly" },
    ],
    start: {
      title: { light: "Start small.", bold: "Let the agent earn its place." },
      subtitle: "Every agent begins on one workflow, proves itself in shadow mode on your real work, then goes live on the tasks it has earned.",
      options: [
        { name: "Workflow audit call", icon: "search", timeline: "This week", what: "A 45-minute call where we walk through your support, sales or back-office work and spot where the hours go.", get: ["Shortlist of automatable workflows", "Expected payback for each", "What we'd leave to people"] },
        { name: "Pilot agent in shadow mode", icon: "bot", timeline: "3–4 weeks", what: "We build one agent on your top workflow. It drafts every reply and action, and your team approves before anything goes out.", get: ["One agent on one channel", "Accuracy measured on real work", "Go-live report with the numbers"], highlight: true },
        { name: "Live agent subscription", icon: "trending-up", timeline: "Ongoing, monthly", what: "The agent goes live on the tasks it has earned. We host, monitor and improve it, and add workflows as they prove out.", get: ["Hosting, monitoring and alerts", "New skills every month", "Friday numbers in your inbox"] },
      ],
      commitments: ["Proposal within 48 hours", "Nothing goes live without your sign-off", "You own your prompts, data and logs", "NDA on request"],
    },
    deliverablesTitle: "What You Walk Away With.",
    deliverables: [
      "Workflow audit with ROI estimates",
      "Production agents on your channels",
      "Knowledge base built from your documents",
      "Integrations with your CRM and tools",
      "Approval rules and escalation paths",
      "Live dashboard of every agent action",
      "Monthly improvement report",
      "Full export of prompts, data and logs",
    ],
    differentiators: [
      { title: "We start with the workflow, not the model", description: "Most AI projects fail because they automate the wrong thing. We measure first.", icon: "search" },
      { title: "Engineers, not prompt tinkerers", description: "Agents are software: tested, versioned, monitored and rolled back when needed.", icon: "code" },
      { title: "Humans stay in charge", description: "Clear rules on what the agent decides and what it hands to a person.", icon: "shield" },
      { title: "We stay after launch", description: "The subscription means we're paid to keep improving it, not to walk away.", icon: "handshake" },
    ],
    tech: [
      { label: "Models", items: ["Claude", "GPT", "Gemini", "Llama", "Mistral"] },
      { label: "Agent tooling", items: ["LangGraph", "Vercel AI SDK", "MCP", "pgvector", "Pinecone", "Evals"] },
      { label: "Channels & tools", items: ["WhatsApp Business", "Twilio", "HubSpot", "Salesforce", "Zendesk", "Gmail", "Slack"] },
    ],
    industriesNote: "Agents we've shipped handle bookings, claims, orders, tenants and shipments.",
    audiences: [
      { slug: "enterprises", note: "Take the repetitive load off support, ops and finance without a two-year programme." },
      { slug: "startups", note: "Answer every lead and customer from day one without hiring a night shift." },
      { slug: "hnis-family-offices", note: "Discreet assistants for portfolio reporting, enquiries and admin." },
      { slug: "agencies", note: "White-label agents your clients see as your product." },
    ],
    engineering: ["ai-engineering", "backend-engineering", "devops-cloud"],
    faqs: [
      { question: "Which workflows are best for a first agent?", answer: "High-volume, rules-based work with a clear 'done': answering FAQs, qualifying leads, matching invoices, updating CRM records. We rank candidates in the audit by hours saved and risk." },
      { question: "Will the agent make things up?", answer: "Agents answer only from your approved knowledge and systems, cite their sources internally, and hand over to a person when they're unsure. We test against real past conversations before launch." },
      { question: "Where is our data stored?", answer: "In your region where possible (UK or EU hosting by default), encrypted at rest and in transit. We can use models that don't train on your data, or host open models privately." },
      { question: "Do we need to change our tools?", answer: "No. Agents plug into the CRM, helpdesk, inbox and messaging apps you already use." },
      { question: "What happens if we cancel?", answer: "You keep an export of your prompts, knowledge base, workflows and logs. We help hand over or switch the agents off cleanly." },
      { question: "How do we measure success?", answer: "We agree two or three numbers up front, such as resolution rate, response time or hours saved, and report them every Friday." },
      { question: "Can agents speak other languages?", answer: "Yes. Most of our agents work in several languages, including Arabic, and switch automatically with the customer." },
    ],
    cta: { title: { light: "Find the workflow that", bold: "pays for your first agent." }, subtitle: "Free workflow review · NDA on request · Proposal within 48 hours", button: "Find your first agent" },
    leadOption: "AI as a Service",
  },

  /* ---------------------------- Dedicated Developers ---------------------------- */
  {
    slug: "dedicated-developers",
    metaTitle: "Dedicated Developers: vetted engineers by the month",
    metaDescription:
      "Hire vetted full-stack, mobile and AI engineers who join your stand-ups and your repo within two weeks. Billed monthly, scaled up or down as you need.",
    eyebrow: "Dedicated Developers",
    title: { light: "Senior engineers in your stand-up", bold: "within two weeks." },
    subtitle:
      "Vetted full-stack, mobile and AI engineers who work in your repo, your tools and your hours. They use AI coding tools every day, so each month ships more. You direct the work; we handle hiring, quality and cover.",
    primary: bookCall,
    secondary: { label: "See our engineering", href: routes.engineering },
    facts: [
      { value: "1–2 wks", label: "from call to first commit" },
      { value: "4+ hrs", label: "daily overlap with UK and EU hours" },
      { value: "Monthly", label: "billing, scale up or down with notice" },
    ],
    problemsTitle: "Why Teams Call Us.",
    problems: [
      { title: "Hiring takes months", description: "Three months to hire, three more to ramp up, while the roadmap slips.", icon: "users" },
      { title: "Freelancers disappear", description: "Great for a sprint, gone when the bug appears in production.", icon: "zap" },
      { title: "Specialists you need once", description: "An AI engineer for six months or a mobile lead for a launch, not a permanent hire.", icon: "brain" },
      { title: "Agencies that hide the team", description: "You never meet the people doing the work, and quality drifts.", icon: "search" },
    ],
    offeringsTitle: "Who You Can Add.",
    offerings: [
      { title: "Full-stack engineers", description: "React, Next.js, Node and Python engineers who own features from database to interface.", icon: "layers", href: routes.engineeringPage("full-stack-engineering") },
      { title: "Mobile engineers", description: "Flutter and React Native specialists for iOS and Android.", icon: "smartphone", href: routes.engineeringPage("mobile-engineering") },
      { title: "AI / ML engineers", description: "Agents, RAG, evaluations and LLM features built with engineering discipline.", icon: "brain", href: routes.engineeringPage("ai-engineering") },
      { title: "Backend & DevOps", description: "APIs, data pipelines, cloud infrastructure and cost control.", icon: "cloud", href: routes.engineeringPage("devops-cloud") },
      { title: "Designers", description: "Product designers who run research, prototype and keep your design system tidy.", icon: "pen-tool", href: routes.engineeringPage("ui-ux-design") },
      { title: "QA engineers", description: "Manual and automated testing so releases stop being scary.", icon: "shield", href: routes.engineeringPage("quality-assurance") },
    ],
    stepsTitle: "From Call to First Commit.",
    steps: [
      { title: "Brief", description: "Tell us the stack, the seniority and the problem. We ask about your team, not just the job spec.", meta: "Day 1" },
      { title: "Shortlist", description: "Two or three matched engineers with code samples and a written profile.", meta: "Days 2–5" },
      { title: "Interview", description: "You interview and choose. Pair on a real task if you like.", meta: "Week 1" },
      { title: "Onboard", description: "Access, tooling, first ticket. A VAUG lead checks in during the first fortnight.", meta: "Week 2" },
      { title: "Scale", description: "Add or swap people monthly. Replacement at no cost if the fit isn't right.", meta: "Monthly" },
    ],
    start: {
      title: { light: "Meet the engineer.", bold: "Then try the fit on real work." },
      subtitle: "You interview every engineer, start with a trial fortnight in your repo, and only then settle into a monthly team.",
      options: [
        { name: "Needs call", icon: "message-square", timeline: "Profiles in 48 hours", what: "Tell us about your stack, your rituals and the gap in the team. We come back with profiles, not a sales pitch.", get: ["Two or three vetted profiles", "Suggested team shape", "A start date you can plan around"] },
        { name: "Trial fortnight", icon: "users", timeline: "2 weeks", what: "Your chosen engineer joins your stand-ups, repo and tickets for two weeks. If the fit isn't right, we swap them.", get: ["Real tickets shipped in your repo", "Daily presence in your rituals", "A no-fault swap if needed"], highlight: true },
        { name: "Monthly team", icon: "layers", timeline: "Monthly rolling", what: "Keep the engineer, grow into a pod with a tech lead and QA, or scale down after a launch, month by month.", get: ["Holiday cover and replacement guarantee", "A VAUG delivery lead", "Friday written update"] },
      ],
      commitments: ["You interview every engineer", "No recruitment fees", "Code and IP are yours from day one", "NDA on request"],
    },
    deliverablesTitle: "What You Get Every Month.",
    deliverables: [
      "Engineers matched to your stack",
      "Your code in your repository",
      "Daily stand-up attendance",
      "Weekly demo of shipped work",
      "Friday written update",
      "Named VAUG delivery lead",
      "Holiday and sickness cover",
      "Free replacement if the fit is wrong",
    ],
    differentiators: [
      { title: "Vetted, not resold", description: "Our engineers are on our team, trained on our standards, not freelancers passed through.", icon: "shield" },
      { title: "AI-assisted, human-reviewed", description: "They use AI tools for speed and review every line with the discipline you'd expect.", icon: "sparkles" },
      { title: "A lead who owns quality", description: "A VAUG lead reviews code and checks in with you, so you're never managing alone.", icon: "users" },
      { title: "Flexible by design", description: "Monthly terms. Scale up for a launch, down after it.", icon: "gauge" },
    ],
    tech: [
      { label: "Frontend & mobile", items: ["React", "Next.js", "TypeScript", "Flutter", "React Native", "Tailwind"] },
      { label: "Backend & data", items: ["Node.js", "Python", "Go", "PostgreSQL", "Redis", "GraphQL"] },
      { label: "Cloud & AI", items: ["AWS", "GCP", "Vercel", "Docker", "LangGraph", "OpenAI & Anthropic APIs"] },
    ],
    industriesNote: "Our engineers have shipped in regulated and fast-moving sectors alike.",
    audiences: [
      { slug: "startups", note: "Ship your roadmap without burning months on hiring." },
      { slug: "enterprises", note: "Add specialist capacity under your processes and security rules." },
      { slug: "agencies", note: "White-label engineers who deliver under your brand." },
    ],
    engineering: ["full-stack-engineering", "mobile-engineering", "ai-engineering"],
    faqs: [
      { question: "How quickly can an engineer start?", answer: "Usually within one to two weeks of the brief. Niche skills can take a little longer; we'll tell you up front." },
      { question: "Do I interview the engineers?", answer: "Always. You get a shortlist with profiles and code samples, interview who you like and choose." },
      { question: "What if it isn't working out?", answer: "Tell your VAUG lead. We replace the engineer at no extra cost and handle the handover." },
      { question: "Whose hours do they work?", answer: "Your team's. We guarantee at least four hours of daily overlap with UK and European hours, and more on request." },
      { question: "Who owns the code?", answer: "You do. Engineers work in your repositories under an agreement that assigns all IP to you." },
      { question: "Can I scale down?", answer: "Yes. Terms are monthly with a short notice period, so you can scale down after a launch." },
    ],
    cta: { title: { light: "Need engineers who", bold: "start next week?" }, subtitle: "Free 30-minute call · Shortlist within days · Monthly terms", button: "Request engineers" },
    leadOption: "Dedicated Developers",
  },

  /* ---------------------------- Custom Development ---------------------------- */
  {
    slug: "custom-development",
    metaTitle: "Custom Development: web, mobile and SaaS, fixed price or by sprint",
    metaDescription:
      "Bespoke web apps, mobile apps, SaaS platforms and internal tools, built by an AI-first team at one fixed price or sprint by sprint, with weekly demos and a warranty.",
    eyebrow: "Custom Development",
    title: { light: "Web, mobile and SaaS products,", bold: "built to last." },
    subtitle:
      "Tell us what you need and one team designs, builds and ships it. Pick one fixed price when the scope is clear, or sprint by sprint when it will evolve. AI-assisted delivery means shorter timelines and leaner budgets either way.",
    primary: bookCall,
    secondary: { label: "See case studies", href: routes.caseStudies },
    facts: [
      { value: "2 ways", label: "to pay: one fixed price or sprint by sprint" },
      { value: "Weekly", label: "demos of working software" },
      { value: "100%", label: "of code and IP owned by you" },
    ],
    problemsTitle: "What Usually Goes Wrong.",
    problems: [
      { title: "Specs that miss the point", description: "A 60-page brief that nobody tested with users, built exactly as written.", icon: "file-check" },
      { title: "Beautiful, but slow and brittle", description: "Great designs that fall over at a hundred users or can't be changed without breaking.", icon: "gauge" },
      { title: "Budgets that creep", description: "An estimate that doubles by launch, with weeks of silence between invoices.", icon: "trending-up" },
      { title: "Stuck with the vendor", description: "Undocumented code only the original team can touch.", icon: "code" },
    ],
    offeringsTitle: "What We Build.",
    offerings: [
      { title: "Discovery, scope & price", description: "Workshops and a clickable prototype, then one fixed price or a sprint plan. Your choice.", icon: "search" },
      { title: "Product design", description: "UX research, interface design and a design system your team can keep using.", icon: "pen-tool", href: routes.engineeringPage("ui-ux-design") },
      { title: "Web applications", description: "Fast, accessible web apps with Next.js and React, built for real traffic.", icon: "globe", href: routes.engineeringPage("web-engineering") },
      { title: "Mobile apps", description: "iOS and Android from one codebase with Flutter or React Native.", icon: "smartphone", href: routes.engineeringPage("mobile-engineering") },
      { title: "SaaS platforms", description: "Multi-tenant products with billing, roles, analytics and admin built in.", icon: "layers", href: routes.engineeringPage("full-stack-engineering") },
      { title: "Internal tools & AI features", description: "Dashboards, portals and AI features that save your team hours.", icon: "sparkles", href: routes.engineeringPage("ai-engineering") },
    ],
    stepsTitle: "How a Build Runs.",
    steps: [
      { title: "Discover", description: "Goals, users, risks and a scope everyone signs up to.", meta: "Weeks 1–2" },
      { title: "Design", description: "Flows, prototypes and visual design, tested with real users.", meta: "Weeks 2–4" },
      { title: "Build", description: "Two-week sprints, a demo every week and a staging link you can click.", meta: "Weeks 4–12" },
      { title: "Test & launch", description: "QA, performance, security checks and a careful release.", meta: "Weeks 12–14" },
      { title: "Support", description: "A warranty, then a monthly retainer if you want us to keep improving it.", meta: "Ongoing" },
    ],
    start: {
      title: { light: "Discovery first.", bold: "Then a plan you can hold us to." },
      subtitle: "We don't quote a build we don't understand. A short discovery turns your idea into a scope, a timeline and a proposal, at a fixed price or by sprint.",
      options: [
        { name: "Strategy call", icon: "message-square", timeline: "This week", what: "A senior product lead talks through the idea, the users and the constraints with you.", get: ["A first view on approach and stack", "The risks we'd tackle first", "Whether you need discovery at all"] },
        { name: "Discovery sprint", icon: "search", timeline: "1–2 weeks", what: "Workshops, user journeys and a clickable prototype of the core flows, so we both know exactly what we're building.", get: ["Scope and acceptance criteria", "Clickable prototype", "Fixed price or sprint plan, in writing"], highlight: true },
        { name: "Build and launch", icon: "code", timeline: "Milestones or sprints", what: "On a fixed price you pay per accepted milestone. On sprints you re-plan every two weeks. Either way, a demo every week.", get: ["Working software every week", "Changes quoted before they're built", "Warranty after launch"] },
      ],
      commitments: ["Proposal within 48 hours of discovery", "Fixed price never moves for the agreed scope", "You own the code and IP", "NDA on request"],
    },
    deliverablesTitle: "What You Receive.",
    deliverables: [
      "Scope document and product roadmap",
      "Clickable prototype and design files",
      "Production web and/or mobile apps",
      "Source code in your repository",
      "Automated test suite",
      "Deployment and monitoring set-up",
      "Technical documentation",
      "Handover session for your team",
    ],
    differentiators: [
      { title: "Diagnose before we build", description: "A short discovery saves months of building the wrong thing.", icon: "search" },
      { title: "AI speed, engineering discipline", description: "We use AI tools to move fast, with reviews, tests and architecture that hold up.", icon: "zap" },
      { title: "One accountable lead", description: "One person owns delivery, runs your demos and writes your Friday update.", icon: "users" },
      { title: "No lock-in", description: "Clean, documented code in your repository. Keep us or take it in-house.", icon: "file-check" },
    ],
    tech: [
      { label: "Web & mobile", items: ["Next.js", "React", "TypeScript", "Flutter", "React Native", "Tailwind"] },
      { label: "Backend & data", items: ["Node.js", "Python", "PostgreSQL", "Supabase", "Stripe", "GraphQL"] },
      { label: "Infrastructure", items: ["AWS", "Vercel", "Docker", "GitHub Actions", "Sentry", "Cloudflare"] },
    ],
    industriesNote: "We know the rules, integrations and users in each of these sectors.",
    audiences: [
      { slug: "startups", note: "Take an idea to a product investors and users take seriously." },
      { slug: "enterprises", note: "Internal tools and customer platforms built to your standards." },
      { slug: "agencies", note: "Complex builds delivered white-label under your brand." },
      { slug: "hnis-family-offices", note: "Private platforms built discreetly, end to end." },
    ],
    engineering: ["full-stack-engineering", "web-engineering", "mobile-engineering"],
    faqs: [
      { question: "Fixed price or sprints: which should I pick?", answer: "Fixed price suits a clear, signed-off scope and a set budget: one figure, milestone payments, no surprises. Sprints suit products that will change as you learn. We recommend one after discovery, and you decide." },
      { question: "How do you price a custom build?", answer: "After a short paid or free discovery (depending on size) we write a scope, a timeline and a quote. Fixed-price builds are paid per accepted milestone; sprint builds are billed per sprint." },
      { question: "What if our requirements change?", answer: "They will, and that's fine. On a fixed price, anything new is quoted separately and the original price never moves. On sprints, we re-plan every two weeks and agree changes before we build them." },
      { question: "How does AI make it faster?", answer: "Our engineers use AI tools for scaffolding, tests, reviews and documentation, and a senior engineer checks every change. It shortens timelines without cutting corners." },
      { question: "Can you work with our existing code?", answer: "Yes. We start with a code review, tell you what we'd keep and what we'd change, and extend it carefully." },
      { question: "Do you design as well as build?", answer: "Yes. Product designers work alongside engineers from discovery to launch." },
      { question: "What happens after launch?", answer: "A warranty period covers bugs at no cost. After that, most clients move to a Monthly Retainer for support, updates and improvements." },
      { question: "Who owns the code?", answer: "You do, fully, once invoices are paid. It lives in your repository from day one." },
    ],
    cta: { title: { light: "Have a product in mind?", bold: "Let's scope it properly." }, subtitle: "Free 30-minute call · Fixed price or sprints · Proposal within 48 hours", button: "Scope my build" },
    leadOption: "Custom Development",
  },

  /* ---------------------------- Build With Us ---------------------------- */
  {
    slug: "build-with-us",
    metaTitle: "Build With Us: from idea to launched business, end to end",
    metaDescription:
      "Bring the idea. VAUG acts as your whole team: validation, product, brand, website, Google Business Profile, SEO, launch campaigns and AI agents, managed end to end.",
    eyebrow: "Build With Us",
    title: { light: "You bring the idea.", bold: "We build the business with you." },
    subtitle:
      "Validation, product, brand, website, Google listings, launch campaigns and the AI agents that answer your first customers. One AI-first team manages it end to end, so you launch sooner and spend less getting there.",
    primary: bookCall,
    secondary: { label: "For HNIs & family offices", href: routes.audience("hnis-family-offices") },
    facts: [
      { value: "1", label: "team for product, brand, launch and growth" },
      { value: "Weekly", label: "numbers on leads, traffic and revenue" },
      { value: "100%", label: "of the brand, code and accounts owned by you" },
    ],
    problemsTitle: "Why Founders Build With Us.",
    problems: [
      { title: "Five suppliers, no owner", description: "A developer, a designer, an SEO agency and a marketer who never talk to each other.", icon: "users" },
      { title: "A product nobody finds", description: "Launched quietly, invisible on Google, with no plan for the first hundred customers.", icon: "search" },
      { title: "No time to run it", description: "You have a portfolio or a day job. The business needs someone every day.", icon: "briefcase" },
      { title: "Money spent before it's tested", description: "Big builds before anyone checks whether customers will pay.", icon: "trending-up" },
    ],
    offeringsTitle: "Everything a New Business Needs.",
    offerings: [
      { title: "Validation & strategy", description: "Market, competitors, positioning and a live test page before the big spend.", icon: "search" },
      { title: "Product & tech", description: "The app, platform or booking system your business runs on.", icon: "code" },
      { title: "Brand & website", description: "Name, identity, tone of voice and a website that converts.", icon: "pen-tool" },
      { title: "SEO & Google Business Profile", description: "Local and organic search set up properly and kept fresh every week.", icon: "globe" },
      { title: "Launch campaigns", description: "Google, Meta and social campaigns with budgets tied to real enquiries.", icon: "trending-up" },
      { title: "AI agents & growth ops", description: "CRM, dashboards and agents that answer, book and follow up from day one.", icon: "bot" },
    ],
    stepsTitle: "From Idea to Income.",
    steps: [
      { title: "Validate", description: "Market, competitors, positioning and a test landing page before the big spend.", meta: "Weeks 1–3" },
      { title: "Brand & build", description: "Identity, website and product built in parallel, with AI speeding up every step.", meta: "Weeks 3–10" },
      { title: "Launch", description: "Google Business Profile, SEO foundations, first campaigns and agents live.", meta: "Weeks 10–14" },
      { title: "Grow", description: "Weekly experiments on channels, offers and conversion.", meta: "Months 4+" },
      { title: "Hand over or scale", description: "Hire your own team with our help, or keep us running it.", meta: "When ready" },
    ],
    start: {
      title: { light: "Idea on the table.", bold: "A whole team behind it." },
      subtitle: "We start by testing whether the business should exist, then build and run it with you as a retainer or a partnership.",
      options: [
        { name: "Founder session", icon: "handshake", timeline: "This week", what: "A working session on the idea, the market and what success looks like for you a year from now.", get: ["An honest view of the opportunity", "What we'd validate first", "Retainer or partnership, explained"] },
        { name: "Validation sprint", icon: "search", timeline: "2–3 weeks", what: "Market and competitor research, positioning and a live test landing page before the big spend.", get: ["Positioning and brand direction", "Test landing page with real traffic", "Go, pivot or stop recommendation"], highlight: true },
        { name: "Build, launch and grow", icon: "rocket", timeline: "Month 1 onwards", what: "Brand, website, product, local presence, campaigns and agents, run by one team with weekly growth reviews.", get: ["One team across product and marketing", "Weekly experiments and reporting", "A monthly board-level update"] },
      ],
      commitments: ["Proposal within 48 hours", "Ad spend passed through at cost", "You own the brand, code and accounts", "NDA on request"],
    },
    deliverablesTitle: "What Your Business Gets.",
    deliverables: [
      "Market and competitor validation",
      "Brand identity and guidelines",
      "Website and product, live",
      "Google Business Profile, verified",
      "SEO foundations and content plan",
      "Launch campaigns with tracking",
      "CRM, automations and AI agents",
      "Weekly growth dashboard",
    ],
    differentiators: [
      { title: "One team, end to end", description: "Product and marketing sit together, so the launch and the build tell the same story.", icon: "layers" },
      { title: "AI-first, so it costs less", description: "AI speeds up design, code and content, so you launch sooner on a leaner budget.", icon: "sparkles" },
      { title: "Discreet by default", description: "NDA first, no portfolio mentions without permission. Many of our launches are private.", icon: "shield" },
      { title: "Skin in the game", description: "Partnership options tie part of our fee to your results.", icon: "handshake" },
    ],
    tech: [
      { label: "Product", items: ["Next.js", "Flutter", "Supabase", "Stripe", "Shopify", "Webflow"] },
      { label: "Growth", items: ["Google Ads", "Meta Ads", "Google Business Profile", "Search Console", "GA4", "Semrush"] },
      { label: "Operations", items: ["HubSpot", "WhatsApp Business", "Zapier", "n8n", "VAUG Agents", "Looker Studio"] },
    ],
    industriesNote: "Businesses we've launched include lettings, clinics, retreats, retail and services.",
    audiences: [
      { slug: "hnis-family-offices", note: "A fully managed, discreet team for new businesses in your portfolio." },
      { slug: "startups", note: "Founders who'd rather sell than manage five suppliers." },
    ],
    engineering: ["full-stack-engineering", "ui-ux-design", "web-engineering"],
    faqs: [
      { question: "How is this different from Custom Development?", answer: "Custom Development builds the product you specify. Build With Us covers the whole business around it: validating the idea, brand, website, Google listings, launch campaigns, agents and growth, all run by one team." },
      { question: "What kinds of businesses do you take on?", answer: "Service businesses, marketplaces, SaaS products and local brands, usually backed by founders, HNIs or family offices. We say no if we don't believe we can make it work." },
      { question: "Do you take equity?", answer: "Sometimes. Partnership deals combine a lower monthly fee with equity or revenue share. It's discussed openly after discovery." },
      { question: "Who owns the brand and accounts?", answer: "You do. Domains, ad accounts, Google Business Profile and code are set up in your name from day one." },
      { question: "How involved do I need to be?", answer: "As much or as little as you like. Most owners join a weekly 30-minute review and read the Friday update." },
      { question: "Can we hire our own team later?", answer: "Yes. We help recruit and hand over, with documentation for every system we set up." },
    ],
    cta: { title: { light: "Have an idea and the backing?", bold: "Let's build the business together." }, subtitle: "Free 30-minute call · NDA first · Confidential by default", button: "Build with us" },
    leadOption: "Build With Us",
  },

  /* ---------------------------- Monthly Retainer ---------------------------- */
  {
    slug: "monthly-retainer",
    metaTitle: "Monthly Retainer: support, fixes and improvements for your live product",
    metaDescription:
      "One monthly fee keeps your live web or mobile product fixed, secure, up to date and improving. Support, monitoring, security updates and new features every month from an AI-first team.",
    eyebrow: "Monthly Retainer",
    title: { light: "Your product is live.", bold: "We keep it running and improving." },
    subtitle:
      "For one predictable monthly fee, a VAUG team fixes bugs, keeps your app secure and up to date, watches it around the clock and ships a set of improvements every month. AI-powered monitoring and testing mean problems get caught early and fixed fast.",
    primary: bookCall,
    secondary: { label: "How we work", href: routes.howWeWork },
    facts: [
      { value: "1 fee", label: "every month, agreed up front" },
      { value: "24/7", label: "monitoring with alerts to our team" },
      { value: "Monthly", label: "improvements shipped and reported" },
    ],
    problemsTitle: "Sound Familiar?",
    problems: [
      { title: "Nobody owns it after launch", description: "The original team moved on. Bugs pile up and every fix means finding a new freelancer.", icon: "users" },
      { title: "Updates keep slipping", description: "Outdated libraries, expiring certificates and app store rules nobody is tracking.", icon: "shield" },
      { title: "You find out from customers", description: "Downtime and broken checkouts reported by users, not by an alert.", icon: "zap" },
      { title: "Small ideas never ship", description: "A list of small improvements that's too small for a project and too big to ignore.", icon: "file-check" },
    ],
    offeringsTitle: "What's Included Every Month.",
    offerings: [
      { title: "Bug fixes & support", description: "Report an issue and we triage, fix and release it, with agreed response times.", icon: "wrench" },
      { title: "Security & updates", description: "Dependencies, frameworks, OS versions and app store requirements kept current.", icon: "shield" },
      { title: "Monitoring & uptime", description: "Errors, speed and uptime watched around the clock, with AI flagging issues early.", icon: "gauge" },
      { title: "Monthly improvements", description: "A set of small features and UX tweaks planned with you and shipped each month.", icon: "trending-up" },
      { title: "AI upgrades", description: "Add AI search, assistants or automations to your product as they make sense.", icon: "sparkles" },
      { title: "Monthly report", description: "What we fixed, what we shipped, how the app performed and what's next.", icon: "file-check" },
    ],
    stepsTitle: "How a Retainer Runs.",
    steps: [
      { title: "Health check", description: "We review the code, hosting and backlog, and fix anything urgent first.", meta: "Week 1" },
      { title: "Agree the plan", description: "Response times, monthly scope and the first month's priorities, in writing.", meta: "Week 1" },
      { title: "Monitor", description: "Alerts, error tracking and uptime checks set up and watched.", meta: "Always on" },
      { title: "Fix & improve", description: "Support tickets handled as they come, planned improvements shipped each week.", meta: "Every week" },
      { title: "Report & re-plan", description: "A monthly report and a short call to set the next month's priorities.", meta: "Monthly" },
    ],
    start: {
      title: { light: "Check its health first.", bold: "Then look after it monthly." },
      subtitle: "Every retainer starts with a health check of your product, so we both know what we're looking after before the first invoice.",
      options: [
        { name: "Product review call", icon: "message-square", timeline: "This week", what: "Walk us through your product, your stack and what keeps going wrong.", get: ["A first view on risks", "What a monthly plan would cover", "Suggested retainer size"] },
        { name: "Health check", icon: "search", timeline: "1 week", what: "A review of code, security, hosting, monitoring and your backlog, with urgent fixes flagged.", get: ["Written health report", "Prioritised fix list", "A monthly plan and fee, in writing"], highlight: true },
        { name: "Monthly retainer", icon: "refresh-cw", timeline: "Monthly rolling", what: "Support, updates, monitoring and planned improvements every month, for one agreed fee.", get: ["Agreed response times", "Improvements every month", "Monthly report and planning call"] },
      ],
      commitments: ["One agreed monthly fee", "Scale the plan up or down monthly", "You own the code and IP", "NDA on request"],
    },
    deliverablesTitle: "What You Get Every Month.",
    deliverables: [
      "Bug fixes with agreed response times",
      "Security patches and dependency updates",
      "24/7 monitoring and error alerts",
      "Backups and uptime checks",
      "Planned improvements shipped",
      "App store and platform compliance",
      "Monthly performance report",
      "A named VAUG lead",
    ],
    differentiators: [
      { title: "We manage it, not you", description: "We decide who does what across design, engineering, QA and DevOps. You just set priorities.", icon: "users" },
      { title: "AI-powered upkeep", description: "AI-assisted testing, monitoring and code review catch problems early and fix them faster.", icon: "sparkles" },
      { title: "A fee you can plan around", description: "One monthly figure, agreed up front. No surprise invoices for small fixes.", icon: "gauge" },
      { title: "We'll take code we didn't write", description: "Built by another agency, a freelancer or an AI builder? We review it and take it on.", icon: "code" },
    ],
    tech: [
      { label: "Apps we look after", items: ["Next.js", "React", "Flutter", "React Native", "Node.js", "Python"] },
      { label: "Platforms", items: ["AWS", "Vercel", "Supabase", "Firebase", "Shopify", "WordPress"] },
      { label: "Monitoring & quality", items: ["Sentry", "Datadog", "Better Stack", "Playwright", "GitHub Actions", "Dependabot"] },
    ],
    industriesNote: "We look after live booking apps, marketplaces, portals and internal tools across sectors.",
    audiences: [
      { slug: "startups", note: "Keep your launched product improving without hiring a full team." },
      { slug: "enterprises", note: "Reliable care for internal tools and customer platforms, with clear response times." },
      { slug: "agencies", note: "White-label support and maintenance for the sites and apps you've delivered." },
      { slug: "hnis-family-offices", note: "Discreet, fully managed upkeep for your private platforms." },
    ],
    engineering: ["full-stack-engineering", "devops-cloud", "quality-assurance"],
    faqs: [
      { question: "How is this different from Dedicated Developers?", answer: "With Dedicated Developers you get named engineers and direct them yourself. On a retainer we manage the work: we pull in design, engineering, QA or DevOps as needed to keep your product fixed, secure and improving." },
      { question: "What does the monthly fee cover?", answer: "Support and bug fixes, security and dependency updates, monitoring, and an agreed amount of improvement work each month. It's all set out in writing after the health check." },
      { question: "Can you look after an app someone else built?", answer: "Yes. We start with a health check, fix anything urgent and document what we find. We take on apps from other agencies, freelancers and AI builders like Lovable or Bolt." },
      { question: "What if we need more one month?", answer: "Tell us. We can scale the plan up for a busy month or quote a larger feature separately, and scale back down afterwards." },
      { question: "How fast do you respond to issues?", answer: "Response times are agreed in the plan, with faster cover for anything that stops customers using your product." },
      { question: "Is there a long contract?", answer: "No. Retainers roll month to month with a short notice period." },
    ],
    cta: { title: { light: "Product live but nobody", bold: "looking after it?" }, subtitle: "Free 30-minute call · Health check first · One monthly fee", button: "Start a retainer" },
    leadOption: "Monthly Retainer",
  },

  /* ---------------------------- Launch & Rescue ---------------------------- */
  {
    slug: "launch-and-rescue",
    metaTitle: "Launch & Rescue: fix and ship Lovable, Bolt and v0 apps",
    metaDescription:
      "Built your app with Lovable, Bolt, v0 or Cursor and it almost works? VAUG fixes the bugs, secures auth and data, wires up payments and deploys it to production.",
    eyebrow: "Launch & Rescue",
    title: { light: "Almost working?", bold: "We'll fix it and ship it." },
    subtitle:
      "You built it with Lovable, Bolt, v0 or Cursor, and got 80% of the way. We fix the last 20%: bugs, auth, database security, payments, domains and deployment, so real users can pay for it.",
    primary: { label: "Get my app reviewed", href: "#contact" },
    secondary: { label: "See a rescue story", href: routes.caseStudies },
    facts: [
      { value: "48 hrs", label: "to a written review of your app" },
      { value: "Fixed", label: "fee per fix or per launch" },
      { value: "Days", label: "not months, for most rescues" },
    ],
    problemsTitle: "The Last 20% Problem.",
    problems: [
      { title: "It breaks when real users arrive", description: "Works in the preview, fails with ten people logged in.", icon: "zap" },
      { title: "Your database is wide open", description: "Missing row-level security, exposed keys and anyone-can-edit tables.", icon: "shield" },
      { title: "The AI keeps making it worse", description: "Every prompt fixes one bug and adds two.", icon: "bot" },
      { title: "Payments, domains, email: stuck", description: "Stripe webhooks, custom domains and transactional email that won't cooperate.", icon: "wrench" },
    ],
    offeringsTitle: "What We Fix.",
    offerings: [
      { title: "Code review & clean-up", description: "We read everything, remove the dead ends and make it maintainable.", icon: "search" },
      { title: "Bug fixing", description: "Every broken flow reproduced, fixed and tested.", icon: "wrench" },
      { title: "Auth & database security", description: "Row-level security, secrets management and proper roles.", icon: "shield" },
      { title: "Payments & domains", description: "Stripe checkout, subscriptions, webhooks, custom domains and email.", icon: "globe" },
      { title: "Deployment & hosting", description: "Production hosting, environments, backups and monitoring.", icon: "cloud" },
      { title: "Performance pass", description: "Faster pages, smaller bundles and queries that scale.", icon: "gauge" },
    ],
    stepsTitle: "From Broken Preview to Live.",
    steps: [
      { title: "Share access", description: "Send us the repo or project link. NDA first if you like.", meta: "Day 0" },
      { title: "Review", description: "A written list of what's broken, what's risky and a fixed quote.", meta: "Within 48 hrs" },
      { title: "Fix", description: "Bugs, security, payments. You watch progress daily.", meta: "Days 3–7" },
      { title: "Launch", description: "Deployed to production with monitoring and backups.", meta: "Days 7–10" },
      { title: "Keep going", description: "Add features yourself, or keep us on for the next stage.", meta: "Optional" },
    ],
    start: {
      title: { light: "Review first.", bold: "Fix only what matters." },
      subtitle: "Start with a written review of your AI-built app. You'll know exactly what's wrong before anyone touches the code.",
      options: [
        { name: "Send us the link", icon: "zap", timeline: "Today", what: "Share your Lovable, Bolt, Replit or Cursor project and a few lines on what's stuck.", get: ["Same-day reply", "The right engineer on it", "NDA before access if needed"] },
        { name: "Health check", icon: "shield", timeline: "Within 48 hours", what: "A full code and security review with a prioritised fix list and a fixed quote for the fix.", get: ["Security and RLS scan", "Prioritised fix list", "Fixed quote for the fix"], highlight: true },
        { name: "Rescue and launch", icon: "rocket", timeline: "Days, not months", what: "We fix, secure and deploy to production, then hand back a codebase you can keep building on.", get: ["Bugs, auth and payments fixed", "Production deploy on your domain", "Warranty after launch"] },
      ],
      commitments: ["Review within 48 hours", "No work without your approval", "Your code stays yours", "NDA on request"],
    },
    deliverablesTitle: "What You Get Back.",
    deliverables: [
      "Written review of your codebase",
      "Every critical bug fixed",
      "Secured auth and database rules",
      "Working payments and webhooks",
      "Custom domain and email set up",
      "Production deployment",
      "Monitoring and error alerts",
      "Notes on how to keep building safely",
    ],
    differentiators: [
      { title: "We like AI-built code", description: "No lectures. We keep what works and fix what doesn't.", icon: "sparkles" },
      { title: "Security first", description: "The most common problem is exposed data. We fix that before anything else.", icon: "shield" },
      { title: "Fixed fee, fast", description: "A quote after the review and a launch in days.", icon: "zap" },
      { title: "You can keep building", description: "We leave the code clean enough for you or your AI tools to carry on.", icon: "code" },
    ],
    tech: [
      { label: "Builders we rescue", items: ["Lovable", "Bolt", "v0", "Cursor", "Replit", "Bubble"] },
      { label: "Stacks we fix", items: ["React", "Next.js", "Supabase", "Firebase", "Vite", "Tailwind"] },
      { label: "Launch essentials", items: ["Stripe", "Vercel", "Netlify", "Resend", "Cloudflare", "Sentry"] },
    ],
    industriesNote: "We've rescued booking apps, marketplaces, portals and internal tools across sectors.",
    audiences: [
      { slug: "startups", note: "Founders who built their own MVP and need it production-ready." },
      { slug: "agencies", note: "Prototype-to-production finishing for your client work." },
      { slug: "enterprises", note: "Hardening internal tools built by teams with AI builders." },
    ],
    engineering: ["full-stack-engineering", "devops-cloud", "quality-assurance"],
    faqs: [
      { question: "Which tools do you rescue?", answer: "Lovable, Bolt, v0, Cursor, Replit and most React, Next.js, Supabase or Firebase projects. If it's something else, send it and we'll tell you honestly." },
      { question: "Will you rewrite everything?", answer: "Rarely. We keep your UI and working flows and fix the parts that are broken or unsafe. We only suggest a rebuild if it's genuinely cheaper." },
      { question: "How fast can you start?", answer: "Usually within 48 hours. The review comes first, then a fixed quote for the fix." },
      { question: "Can I keep using Lovable afterwards?", answer: "In most cases, yes. We'll tell you which parts are safe to keep editing with AI tools and which to leave alone." },
      { question: "Is my app secure right now?", answer: "Many AI-built apps expose their database. The health check tells you exactly where you stand within 48 hours." },
      { question: "What if you find more problems while fixing?", answer: "We tell you straight away, quote them separately, and never add cost without approval." },
      { question: "Do you help after launch?", answer: "Yes. Every rescue has a short warranty, and many clients keep a dedicated engineer or a small retainer afterwards." },
    ],
    cta: { title: { light: "Close to launch but stuck?", bold: "Send us the link." }, subtitle: "Written review within 48 hours · Fixed fee · NDA on request", button: "Rescue my app" },
    leadOption: "Launch & Rescue",
  },
];

export const serviceDetailBySlug = (slug: string) => serviceDetails.find((s) => s.slug === slug);
