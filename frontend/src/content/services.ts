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
  title: { light: "One senior team.", bold: "Six ways to work with it." },
  subtitle:
    "Rent engineers by the month, fix the price, hand us the whole venture or let an AI agent take the repetitive work. Pick the model that fits your budget and pace, and switch when your needs change.",
  tags: ["AI agents", "Dedicated teams", "Custom builds", "Venture studio", "Fixed price", "Rescue & launch"],
  cardsTitle: "Pick the model. Keep the team.",
  cardsSubtitle: "Every model comes with the same people, the same weekly demos and the same Friday update.",

  chooser: {
    title: "Which Model Fits You?",
    subtitle: "Answer four quick questions, or compare every model side by side. There are no wrong answers: most clients combine two.",
    questions: [
      {
        question: "What do you need most right now?",
        options: [
          { label: "Take repetitive work off my team", scores: { "ai-as-a-service": 3 } },
          { label: "More engineering hands, fast", scores: { "dedicated-developers": 3 } },
          { label: "A new product built properly", scores: { "custom-development": 2, "fixed-price": 2 } },
          { label: "A whole business launched for me", scores: { "venture-studio": 3 } },
          { label: "Fix an app that almost works", scores: { "launch-and-rescue": 3 } },
        ],
      },
      {
        question: "How clear is the scope?",
        options: [
          { label: "Written down and signed off", scores: { "fixed-price": 2, "launch-and-rescue": 1 } },
          { label: "Mostly clear, will evolve", scores: { "custom-development": 2, "dedicated-developers": 1 } },
          { label: "It's still an idea", scores: { "venture-studio": 2, "custom-development": 1 } },
          { label: "It's an ongoing workflow", scores: { "ai-as-a-service": 2, "dedicated-developers": 1 } },
        ],
      },
      {
        question: "How would you like to pay?",
        options: [
          { label: "One fixed price", scores: { "fixed-price": 2, "launch-and-rescue": 2 } },
          { label: "Monthly and flexible", scores: { "dedicated-developers": 2, "ai-as-a-service": 2 } },
          { label: "Quoted per build", scores: { "custom-development": 2 } },
          { label: "Retainer or partnership", scores: { "venture-studio": 2 } },
        ],
      },
      {
        question: "How involved do you want to be?",
        options: [
          { label: "Hands-on: I'll direct the team", scores: { "dedicated-developers": 2 } },
          { label: "A weekly demo is plenty", scores: { "custom-development": 1, "fixed-price": 1, "ai-as-a-service": 1, "launch-and-rescue": 1 } },
          { label: "Hand it all over", scores: { "venture-studio": 2, "ai-as-a-service": 1 } },
        ],
      },
    ],
    reasons: {
      "ai-as-a-service": "Your pain is repetitive work, not missing software. An agent that answers, qualifies or reconciles will pay for itself faster than a new build.",
      "dedicated-developers": "You already have a roadmap and want to steer. Engineers who join your stand-ups give you speed without handing over control.",
      "custom-development": "You need a real product and the details will move as you learn. A scoped, quoted build keeps quality high without locking you in too early.",
      "venture-studio": "You have the idea and the backing, not the team. We build the product and run the launch so you can focus on the business.",
      "fixed-price": "Your scope is clear and your budget is set. One agreed price, milestone payments and no surprises.",
      "launch-and-rescue": "You're close. A short, fixed-fee fix gets your AI-built app secure, stable and live in days, not months.",
    },
    profiles: [
      { slug: "ai-as-a-service", speed: 4, certainty: 4, control: 3, involvement: 2, startsIn: "2 weeks", billing: "Monthly subscription", bestFor: "Repetitive workflows" },
      { slug: "dedicated-developers", speed: 5, certainty: 3, control: 5, involvement: 4, startsIn: "1–2 weeks", billing: "Monthly per engineer", bestFor: "Teams needing capacity" },
      { slug: "custom-development", speed: 3, certainty: 3, control: 4, involvement: 3, startsIn: "2–3 weeks", billing: "Custom quote", bestFor: "Evolving products" },
      { slug: "venture-studio", speed: 3, certainty: 3, control: 2, involvement: 1, startsIn: "3–4 weeks", billing: "Retainer or partnership", bestFor: "New ventures" },
      { slug: "fixed-price", speed: 3, certainty: 5, control: 3, involvement: 2, startsIn: "2 weeks", billing: "Fixed project fee", bestFor: "Defined scope, set budget" },
      { slug: "launch-and-rescue", speed: 5, certainty: 5, control: 3, involvement: 2, startsIn: "48 hours", billing: "Fixed fee per fix", bestFor: "AI-built apps" },
    ],
  },

  combine: {
    title: "Most Clients Combine Two.",
    subtitle: "The models are building blocks. These are the pairings we see most.",
    items: [
      { title: "Rescue, then retain", description: "We fix and launch your Lovable build for a fixed fee, then a dedicated engineer keeps it moving.", icon: "wrench", meta: "Launch & Rescue + Dedicated" },
      { title: "Build, then automate", description: "A fixed-price product first, then agents that run its support and back office.", icon: "bot", meta: "Fixed Price + AI as a Service" },
      { title: "Venture with agents built in", description: "Your new business launches with enquiries, bookings and follow-ups already automated.", icon: "rocket", meta: "Venture Studio + AI as a Service" },
    ],
  },

  processTitle: "How Every Engagement Runs.",
  processSubtitle: "Whatever the model, the rhythm is the same: diagnose first, one accountable lead, a demo every week and a written update every Friday.",
  process: [
    { title: "Strategy call", description: "Thirty minutes, free. We listen, ask awkward questions and tell you honestly if we're the right fit.", meta: "Day 0", icon: "message-square" },
    { title: "Proposal in 48 hours", description: "Scope, model, team, timeline and price in writing. NDA first if you need one.", meta: "Day 2", icon: "file-check" },
    { title: "Diagnose", description: "A short discovery to test the riskiest assumptions before anyone writes production code.", meta: "Week 1", icon: "search" },
    { title: "Build with weekly demos", description: "Working software every week, a Friday update in your inbox and one lead who owns delivery.", meta: "Weeks 2+", icon: "hammer" },
    { title: "Launch and stay", description: "We ship, monitor and keep improving. Warranty on fixed work, retainers for everything after.", meta: "Ongoing", icon: "rocket" },
  ],

  caseStudiesTitle: "Work Across Every Model.",

  faqs: [
    { question: "Can I switch models later?", answer: "Yes, and many clients do. A fixed-price build often becomes a monthly retainer, and a dedicated engineer can move onto an AI agent project. Your lead handles the handover so nothing is lost." },
    { question: "How quickly can you start?", answer: "Launch & Rescue can start within 48 hours. Dedicated engineers usually join within one to two weeks. Scoped builds and ventures start after a short discovery, typically two to four weeks from the first call." },
    { question: "Do I own the code and the IP?", answer: "Yes. Everything we build for you, including agent prompts, workflows and infrastructure code, is yours once invoices are paid. We sign an NDA before you share anything sensitive." },
    { question: "Which regions do you work with?", answer: "Our clients are mostly in the UK, Europe and the UAE. We overlap with UK and European working hours every day and join your calls in your time zone." },
    { question: "What if I'm not sure which model I need?", answer: "Pick 'Not sure yet' on the enquiry form. On the strategy call we'll recommend a model, explain why, and tell you what it would cost to start small." },
    { question: "Is there a minimum engagement?", answer: "Dedicated engineers start at one month. AI agents are a monthly subscription after the build. Fixed-price and rescue work is priced per scope, so there's no minimum beyond the job itself." },
  ],

  cta: {
    title: { light: "Not sure which model fits?", bold: "We'll tell you honestly." },
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
      "Vetted full-stack, mobile and AI engineers who work in your repo, your tools and your hours. You direct the work; we handle hiring, quality and cover. Billed monthly, scaled when you need.",
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
    metaTitle: "Custom Development: web, mobile and SaaS builds",
    metaDescription:
      "Bespoke web apps, mobile apps, SaaS platforms and internal tools, scoped with you, designed properly and quoted per build by one accountable team.",
    eyebrow: "Custom Development",
    title: { light: "Web, mobile and SaaS products,", bold: "built to last." },
    subtitle:
      "From discovery to launch, one team designs, builds and ships your product. We scope with you, quote per build and show you working software every week, so the product you get is the one you meant.",
    primary: bookCall,
    secondary: { label: "See case studies", href: routes.caseStudies },
    facts: [
      { value: "Weekly", label: "demos of working software" },
      { value: "48 hrs", label: "from call to written proposal" },
      { value: "100%", label: "of code and IP owned by you" },
    ],
    problemsTitle: "What Usually Goes Wrong.",
    problems: [
      { title: "Specs that miss the point", description: "A 60-page brief that nobody tested with users, built exactly as written.", icon: "file-check" },
      { title: "Beautiful, but slow and brittle", description: "Great designs that fall over at a hundred users or can't be changed without breaking.", icon: "gauge" },
      { title: "Silence between invoices", description: "Weeks without a demo, then a surprise at the end.", icon: "message-square" },
      { title: "Stuck with the vendor", description: "Undocumented code only the original team can touch.", icon: "code" },
    ],
    offeringsTitle: "What We Build.",
    offerings: [
      { title: "Discovery & scoping", description: "Workshops, user interviews and a clickable prototype before the big spend.", icon: "search" },
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
      { title: "Support", description: "Warranty, monitoring and a retainer for what comes next.", meta: "Ongoing" },
    ],
    start: {
      title: { light: "Discovery first.", bold: "Then a plan you can hold us to." },
      subtitle: "We don't quote a build we don't understand. A short discovery turns your idea into a scope, a timeline and a written proposal.",
      options: [
        { name: "Strategy call", icon: "message-square", timeline: "This week", what: "A senior product lead talks through the idea, the users and the constraints with you.", get: ["A first view on approach and stack", "The risks we'd tackle first", "Whether you need discovery at all"] },
        { name: "Discovery sprint", icon: "search", timeline: "1–2 weeks", what: "Workshops, user journeys and a clickable prototype of the core flows, so we both know exactly what we're building.", get: ["Scope and user journeys", "Clickable prototype", "Milestone plan and written proposal"], highlight: true },
        { name: "Build in sprints", icon: "code", timeline: "Sprint by sprint", what: "Design, build and ship in two-week sprints, with a demo every week and changes agreed before they're built.", get: ["Working software every week", "Automated tests and CI", "Warranty after launch"] },
      ],
      commitments: ["Proposal within 48 hours of discovery", "Changes agreed before work starts", "You own the code and IP", "NDA on request"],
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
      { question: "How do you price a custom build?", answer: "After a short paid or free discovery (depending on size) we write a scope, a timeline and a quote. Larger builds are split into milestones so you pay as value arrives." },
      { question: "What if our requirements change?", answer: "They will, and that's fine. We re-plan at the end of each sprint and agree any change in scope and cost before we build it." },
      { question: "Can you work with our existing code?", answer: "Yes. We start with a code review, tell you what we'd keep and what we'd change, and extend it carefully." },
      { question: "Do you design as well as build?", answer: "Yes. Product designers work alongside engineers from discovery to launch." },
      { question: "What happens after launch?", answer: "A warranty period covers bugs at no cost. After that, most clients keep us on a retainer for improvements and support." },
      { question: "Who owns the code?", answer: "You do, fully, once invoices are paid. It lives in your repository from day one." },
    ],
    cta: { title: { light: "Have a product in mind?", bold: "Let's scope it properly." }, subtitle: "Free 30-minute call · NDA on request · Proposal within 48 hours", button: "Scope my build" },
    leadOption: "Custom Development",
  },

  /* ---------------------------- Venture Studio ---------------------------- */
  {
    slug: "venture-studio",
    metaTitle: "Venture Studio: we build and launch your venture",
    metaDescription:
      "You bring the idea and the backing. VAUG builds the product and runs the brand, website, Google Business Profile, SEO and growth, as a retainer or partnership.",
    eyebrow: "Venture Studio",
    title: { light: "You bring the idea.", bold: "We build and run the rest." },
    subtitle:
      "Product, brand, website, Google Business Profile, SEO, paid campaigns and the agents that answer your first customers. One studio team takes your venture from idea to income, and keeps it growing.",
    primary: bookCall,
    secondary: { label: "For HNIs & family offices", href: routes.audience("hnis-family-offices") },
    facts: [
      { value: "1", label: "team for product, brand and growth" },
      { value: "Weekly", label: "numbers on leads, traffic and revenue" },
      { value: "100%", label: "of the brand, code and accounts owned by you" },
    ],
    problemsTitle: "The Venture Gap.",
    problems: [
      { title: "Five suppliers, no owner", description: "A developer, a designer, an SEO agency and a marketer who never talk to each other.", icon: "users" },
      { title: "A product nobody finds", description: "Launched quietly, invisible on Google, with no plan for the first hundred customers.", icon: "search" },
      { title: "No time to run it", description: "You have a portfolio or a day job. The venture needs someone every day.", icon: "briefcase" },
      { title: "Money spent before it's tested", description: "Big builds before anyone checks whether customers will pay.", icon: "trending-up" },
    ],
    offeringsTitle: "Everything a Venture Needs.",
    offerings: [
      { title: "Product & tech", description: "The app, platform or booking system your venture runs on.", icon: "code" },
      { title: "Brand & website", description: "Name, identity, tone of voice and a website that converts.", icon: "pen-tool" },
      { title: "SEO & Google Business Profile", description: "Local and organic search set up properly and kept fresh every week.", icon: "globe" },
      { title: "Performance marketing", description: "Google, Meta and LinkedIn campaigns with budgets tied to real enquiries.", icon: "trending-up" },
      { title: "Social media", description: "Content calendars, posting and community management.", icon: "message-square" },
      { title: "Analytics & growth ops", description: "Dashboards, CRM, automations and agents that handle the first reply.", icon: "gauge" },
    ],
    stepsTitle: "From Idea to Income.",
    steps: [
      { title: "Validate", description: "Market, competitors, positioning and a test landing page before the big spend.", meta: "Weeks 1–3" },
      { title: "Brand & build", description: "Identity, website and product built in parallel.", meta: "Weeks 3–10" },
      { title: "Launch", description: "Google Business Profile, SEO foundations, first campaigns and PR.", meta: "Weeks 10–14" },
      { title: "Grow", description: "Weekly experiments on channels, offers and conversion.", meta: "Months 4+" },
      { title: "Hand over or scale", description: "Hire your own team with our help, or keep us running it.", meta: "When ready" },
    ],
    start: {
      title: { light: "Idea on the table.", bold: "Venture team behind it." },
      subtitle: "We start by testing whether the business should exist, then build and run it with you as a retainer or a partnership.",
      options: [
        { name: "Founder session", icon: "handshake", timeline: "This week", what: "A working session on the idea, the market and what success looks like for you a year from now.", get: ["An honest view of the opportunity", "What we'd validate first", "Retainer or partnership, explained"] },
        { name: "Validation sprint", icon: "search", timeline: "2–3 weeks", what: "Market and competitor research, positioning and a live test landing page before the big spend.", get: ["Positioning and brand direction", "Test landing page with real traffic", "Go, pivot or stop recommendation"], highlight: true },
        { name: "Launch and grow", icon: "rocket", timeline: "Month 1 onwards", what: "Brand, website, product, local presence, campaigns and agents, run by one team with weekly growth reviews.", get: ["One team across product and marketing", "Weekly experiments and reporting", "A monthly board-level update"] },
      ],
      commitments: ["Proposal within 48 hours", "Ad spend passed through at cost", "You own the brand, code and accounts", "NDA on request"],
    },
    deliverablesTitle: "What Your Venture Gets.",
    deliverables: [
      "Market and competitor validation",
      "Brand identity and guidelines",
      "Website and product, live",
      "Google Business Profile, verified",
      "SEO foundations and content plan",
      "Paid campaigns with tracking",
      "CRM, automations and AI agents",
      "Weekly growth dashboard",
    ],
    differentiators: [
      { title: "One team, one plan", description: "Product and marketing sit together, so the launch and the build tell the same story.", icon: "layers" },
      { title: "Discreet by default", description: "NDA first, no portfolio mentions without permission. Many of our ventures are private.", icon: "shield" },
      { title: "Numbers every week", description: "Leads, traffic, conversions and spend, in plain English every Friday.", icon: "gauge" },
      { title: "Skin in the game", description: "Partnership options tie part of our fee to your results.", icon: "handshake" },
    ],
    tech: [
      { label: "Product", items: ["Next.js", "Flutter", "Supabase", "Stripe", "Shopify", "Webflow"] },
      { label: "Growth", items: ["Google Ads", "Meta Ads", "Google Business Profile", "Search Console", "GA4", "Semrush"] },
      { label: "Operations", items: ["HubSpot", "WhatsApp Business", "Zapier", "n8n", "VAUG Agents", "Looker Studio"] },
    ],
    industriesNote: "Ventures we've launched include lettings, clinics, retreats, retail and services.",
    audiences: [
      { slug: "hnis-family-offices", note: "A fully managed, discreet venture team for new businesses in your portfolio." },
      { slug: "startups", note: "Founders who'd rather sell than manage five suppliers." },
    ],
    engineering: ["full-stack-engineering", "ui-ux-design", "web-engineering"],
    faqs: [
      { question: "What kinds of ventures do you take on?", answer: "Service businesses, marketplaces, SaaS products and local brands, usually backed by founders, HNIs or family offices. We say no if we don't believe we can make it work." },
      { question: "Do you take equity?", answer: "Sometimes. Partnership deals combine a lower monthly fee with equity or revenue share. It's discussed openly after discovery." },
      { question: "Who owns the brand and accounts?", answer: "You do. Domains, ad accounts, Google Business Profile and code are set up in your name from day one." },
      { question: "How involved do I need to be?", answer: "As much or as little as you like. Most owners join a weekly 30-minute review and read the Friday update." },
      { question: "Can you run an existing business's marketing?", answer: "Yes, if it needs product and growth together. For marketing only, we'll recommend a specialist." },
      { question: "Can we hire our own team later?", answer: "Yes. We help recruit and hand over, with documentation for every system we set up." },
    ],
    cta: { title: { light: "Have an idea and the backing?", bold: "Let's build the business." }, subtitle: "Free 30-minute call · NDA first · Confidential by default", button: "Start a venture" },
    leadOption: "Venture Studio",
  },

  /* ---------------------------- Fixed-Price ---------------------------- */
  {
    slug: "fixed-price",
    metaTitle: "Fixed-Price Projects: one scope, one price",
    metaDescription:
      "One agreed scope, one fixed price and milestone payments. Anything new is quoted separately, so your budget never moves. Weekly demos and a warranty included.",
    eyebrow: "Fixed-Price Projects",
    title: { light: "One agreed scope.", bold: "One price that never moves." },
    subtitle:
      "When the scope is clear and the budget is set, we lock both. You pay by milestone, see a demo every week, and anything new is quoted separately before we touch it.",
    primary: bookCall,
    secondary: { label: "How we work", href: routes.howWeWork },
    facts: [
      { value: "0", label: "surprise invoices: changes are quoted first" },
      { value: "Milestones", label: "you pay as working software arrives" },
      { value: "Warranty", label: "on every fixed-price delivery" },
    ],
    problemsTitle: "Why Fixed Price.",
    problems: [
      { title: "Budgets that creep", description: "Time-and-materials projects that end at twice the estimate.", icon: "trending-up" },
      { title: "Board or investor sign-off", description: "You need one number to approve, not a range.", icon: "briefcase" },
      { title: "Unclear 'done'", description: "Projects that never finish because the finish line keeps moving.", icon: "file-check" },
      { title: "Paying before seeing", description: "Large upfront payments with nothing to click for months.", icon: "shield" },
    ],
    offeringsTitle: "What's Included.",
    offerings: [
      { title: "Locked scope & timeline", description: "A written scope with acceptance criteria for every feature.", icon: "file-check" },
      { title: "Milestone payments", description: "Pay in stages as each milestone is demoed and accepted.", icon: "layers" },
      { title: "Weekly demos", description: "A working build every week on a staging link you can share.", icon: "gauge" },
      { title: "Change requests quoted separately", description: "New ideas are welcome. They're priced before anyone builds them.", icon: "message-square" },
      { title: "Warranty period", description: "Bugs found after launch are fixed at no cost during the warranty.", icon: "shield" },
      { title: "Clean handover", description: "Code, documentation, credentials and a walkthrough for your team.", icon: "handshake" },
    ],
    stepsTitle: "Scope, Price, Deliver.",
    steps: [
      { title: "Scope", description: "Workshops to write down every feature and what 'done' means.", meta: "Week 1" },
      { title: "Fix the price", description: "One figure, milestone plan and dates, signed off by you.", meta: "Week 2" },
      { title: "Build in milestones", description: "Demo, accept, pay. Repeat until done.", meta: "Weeks 3–10" },
      { title: "Accept & launch", description: "Final acceptance testing against the scope, then go live.", meta: "Weeks 10–12" },
      { title: "Warranty", description: "We fix any defects free, then hand over or move to a retainer.", meta: "30–90 days" },
    ],
    start: {
      title: { light: "Scope it properly.", bold: "Then lock it." },
      subtitle: "Fixed price only works with a real scope, so we spend the time up front. Once you sign, the scope and the dates hold.",
      options: [
        { name: "Scoping call", icon: "message-square", timeline: "This week", what: "Walk us through what you need. We ask the awkward questions early, so they don't surface mid-build.", get: ["Must-haves split from nice-to-haves", "Early risks flagged", "Whether fixed price is the right fit"] },
        { name: "Fixed-scope proposal", icon: "file-check", timeline: "Within 2 weeks", what: "A written scope, milestone plan and acceptance criteria with one agreed figure, ready for your sign-off.", get: ["Scope and acceptance criteria", "Milestone plan with dates", "One agreed figure, in writing"], highlight: true },
        { name: "Milestone delivery", icon: "hammer", timeline: "Per milestone plan", what: "We build against the plan with a demo every week. You pay as milestones are accepted, not before.", get: ["Weekly demos", "Changes quoted before any work", "Warranty on delivery"] },
      ],
      commitments: ["Proposal within 48 hours", "Changes quoted before work", "You own the code and IP", "NDA on request"],
    },
    deliverablesTitle: "What's Guaranteed.",
    deliverables: [
      "Signed scope with acceptance criteria",
      "Fixed price and milestone schedule",
      "Weekly staging demos",
      "Friday written update",
      "Production release",
      "Source code and documentation",
      "Warranty on every defect",
      "Handover walkthrough",
    ],
    differentiators: [
      { title: "We scope properly", description: "Fixed price only works with a real scope. We spend the time up front so the price holds.", icon: "search" },
      { title: "Changes are never hidden", description: "Anything new is quoted separately and only built if you approve.", icon: "file-check" },
      { title: "You pay as it works", description: "Milestone payments tied to demos you've accepted.", icon: "gauge" },
      { title: "Warranty included", description: "Defects after launch are ours to fix, free.", icon: "shield" },
    ],
    tech: [
      { label: "Build", items: ["Next.js", "React", "Flutter", "Node.js", "Python", "TypeScript"] },
      { label: "Data & payments", items: ["PostgreSQL", "Supabase", "Stripe", "Firebase", "Algolia"] },
      { label: "Quality & release", items: ["Playwright", "Jest", "GitHub Actions", "Vercel", "AWS", "Sentry"] },
    ],
    industriesNote: "Fixed-price suits regulated sectors that need budgets approved in advance.",
    audiences: [
      { slug: "startups", note: "Build your MVP on a budget investors already approved." },
      { slug: "enterprises", note: "Procurement-friendly delivery with one number and clear acceptance." },
      { slug: "agencies", note: "Fixed costs you can mark up and resell with confidence." },
    ],
    engineering: ["web-engineering", "mobile-engineering", "quality-assurance"],
    faqs: [
      { question: "What if we want to change something mid-project?", answer: "Tell us. We'll quote the change separately, show the impact on timeline, and only build it once you approve. The original price stays fixed." },
      { question: "How are payments structured?", answer: "Typically a deposit to start, then payments at each accepted milestone, with a final payment on launch." },
      { question: "What if you run over?", answer: "That's our risk, not yours. The price is fixed for the agreed scope." },
      { question: "Is fixed price more expensive?", answer: "Slightly, sometimes, because we carry the risk. In return you get certainty, which is often worth more." },
      { question: "What does the warranty cover?", answer: "Any defect against the agreed scope, fixed free during the warranty period (30 to 90 days depending on the package)." },
      { question: "Can a fixed-price project become ongoing?", answer: "Yes. After launch many clients move to a monthly retainer or dedicated engineers for the next phase." },
    ],
    cta: { title: { light: "Know what you need?", bold: "Get one fixed price." }, subtitle: "Free scoping call · NDA on request · Fixed quote after scoping", button: "Get a fixed quote" },
    leadOption: "Fixed-Price Project",
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
