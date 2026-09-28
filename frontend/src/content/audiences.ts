import type { EngagementOption, ServiceFit } from "./industries";
import { routes } from "./taxonomy";
import type { AudienceSlug, CtaBlock, Faq, Feature, SplitTitle } from "./types";

/**
 * Who We Serve: the /who-we-serve index and one page per audience.
 * Labels, icons and client types come from `taxonomy.ts`.
 */

/** One stage of the journey timeline. */
export interface JourneyStage {
  stage: string;
  when: string;
  description: string;
  /** What the client has at the end of this stage. */
  outcome: string;
}

export interface AudiencePage {
  slug: AudienceSlug;
  hero: { eyebrow: string; title: SplitTitle; subtitle: string; tags: string[] };
  /** One-line promise used on the index tile. */
  promise: string;
  painsTitle: string;
  pains: Feature[];
  servicesTitle: string;
  servicesSubtitle: string;
  services: ServiceFit[];
  journeyTitle: string;
  journey: JourneyStage[];
  workTitle: string;
  termsTitle: string;
  termsSubtitle: string;
  terms: Feature[];
  /** Row on the index comparison: how an engagement usually starts and runs. */
  snapshot: { firstStep: string; usualModel: string; keyTerm: string };
  faqs: Faq[];
  cta: CtaBlock;
  engagement: EngagementOption;
}

export interface WhoWeServeIndex {
  hero: { eyebrow: string; title: SplitTitle; subtitle: string; tags: string[] };
  audiencesTitle: SplitTitle;
  audiencesSubtitle: string;
  compareTitle: string;
  compareSubtitle: string;
  promisesTitle: string;
  promises: Feature[];
  industriesTitle: string;
  workTitle: string;
  faqs: Faq[];
  cta: CtaBlock;
}

const cta = "Free 30-minute strategy call · NDA on request · Proposal within 48 hours";

export const whoWeServeIndex: WhoWeServeIndex = {
  hero: {
    eyebrow: "Who we serve",
    title: { light: "Four kinds of clients.", bold: "One way of doing the work." },
    subtitle:
      "Founders, family offices, enterprises and agencies all come to VAUG for different reasons. The discipline stays the same: diagnose first, one accountable lead, weekly demos, and we stay after launch.",
    tags: ["Startups", "HNIs & family offices", "Enterprises", "Agencies"],
  },
  audiencesTitle: { light: "Find the page", bold: "written for you." },
  audiencesSubtitle: "Each one covers the problems you're likely facing, how we'd work with you and the terms that matter to you.",
  compareTitle: "How engagements usually differ.",
  compareSubtitle: "Same team, same standards. The starting point, the model and the fine print change with who you are.",
  promisesTitle: "What every client gets.",
  promises: [
    { title: "One accountable lead", description: "A senior person who owns delivery and answers your messages.", icon: "users", href: routes.howWeWork },
    { title: "Weekly demos", description: "Working software every week, and a written update every Friday.", icon: "gauge", href: routes.howWeWork },
    { title: "Security from day one", description: "Access, data handling and code ownership agreed before we start.", icon: "shield", href: routes.security },
    { title: "We stay after launch", description: "Monitoring, fixes and improvements from the team that built it.", icon: "heart", href: routes.about },
  ],
  industriesTitle: "And the sectors we know best.",
  workTitle: "Work for clients like you.",
  faqs: [
    { question: "I don't fit neatly into one group. Does that matter?", answer: "Not at all. Plenty of clients are a funded startup inside a family office, or an agency with an enterprise client. We shape the engagement around the work, not the label." },
    { question: "Do you sign NDAs before the first call?", answer: "Yes, on request. Send yours or ask for ours and it's signed before you share anything sensitive." },
    { question: "Who owns the code and IP?", answer: "You do, once invoices are paid. It's written into every contract, and code lives in repositories you control." },
    { question: "How do you price work?", answer: "Monthly for dedicated developers and AI as a Service, fixed for scoped projects, and custom-quoted for bigger builds and ventures. You get a written proposal within 48 hours of our call." },
    { question: "Where are your teams?", answer: "We work with clients across the UK, Europe, the UAE, India and Canada, with engineering teams across time zones so there's always overlap with your day." },
  ],
  cta: {
    title: { light: "Whoever you are,", bold: "start with a conversation." },
    subtitle: cta,
    button: "Book a call",
  },
};

export const audiencePages: AudiencePage[] = [
  /* ---------------------------------------------------------------- */
  {
    slug: "startups",
    hero: {
      eyebrow: "For startups & founders",
      title: { light: "From idea to launched product with", bold: "one partner." },
      subtitle:
        "You need a product in users' hands, not a six-month roadmap. We scope with you, build fast with AI speed and engineering discipline, and stay for what comes after launch.",
      tags: ["MVPs", "Fixed price", "Launch & Rescue", "Fundraising-ready"],
    },
    promise: "Ship the MVP, keep the runway.",
    painsTitle: "Sound familiar?",
    pains: [
      { title: "Runway is short", description: "Every month spent building is a month less to find traction.", icon: "gauge" },
      { title: "No technical co-founder", description: "You know the problem and the market, but not how to choose a stack or hire engineers.", icon: "users" },
      { title: "The prototype hit a wall", description: "Lovable, Bolt or v0 got you a demo. Now auth, payments and data need to be real.", icon: "wrench" },
      { title: "Agencies that disappear", description: "The last build was handed over and nobody picked up the phone afterwards.", icon: "message-square" },
      { title: "Scope that keeps growing", description: "Quotes change every time you add a feature, and the launch date drifts.", icon: "file-check" },
      { title: "Investors want proof", description: "You need something live, with real numbers, before the next conversation.", icon: "trending-up" },
    ],
    servicesTitle: "How we work with founders.",
    servicesSubtitle: "Pick the model that matches where you are. Most founders start with one and move to another as they grow.",
    services: [
      { service: "custom-development", headline: "An MVP at a fixed price", description: "We scope the smallest product worth launching and build it for one fixed price.", points: ["Scope and price agreed up front", "Weekly demos", "Launch support included"] },
      { service: "launch-and-rescue", headline: "Fix the AI-built prototype", description: "We take your Lovable, Bolt or v0 build, fix what's risky and put it live.", points: ["Code and security review", "Auth, payments and data done properly", "Deployed with monitoring"] },
      { service: "build-with-us", headline: "The product and the launch", description: "Need brand, website and launch marketing too? We build the whole business with you, end to end.", points: ["Product, brand and launch", "One team, one plan", "Retainer or partnership"] },
      { service: "monthly-retainer", headline: "Care after launch", description: "Fixes, updates and new features every month for one fee, without hiring a team yet.", points: ["One predictable monthly fee", "Monitoring and security updates", "Improvements every month"] },
    ],
    journeyTitle: "From idea to growth.",
    journey: [
      { stage: "Idea", when: "Week 0–1", description: "A free call, then a short discovery to test the idea and cut the scope to what matters.", outcome: "A scoped MVP and a fixed price" },
      { stage: "MVP", when: "Weeks 2–8", description: "We design and build in weekly increments you can click through and share.", outcome: "A working product in real users' hands" },
      { stage: "Launch", when: "Week 8–10", description: "App stores, domains, analytics and monitoring, handled with you.", outcome: "A live product with numbers to show" },
      { stage: "Growth", when: "Ongoing", description: "We keep shipping features, fixing issues and adding AI where it earns its place.", outcome: "A team that knows your product" },
    ],
    workTitle: "Built with founders.",
    termsTitle: "Terms founders care about.",
    termsSubtitle: "No lock-in, no surprises and nothing that scares an investor in due diligence.",
    terms: [
      { title: "You own the IP", description: "Code, designs and accounts belong to you, in repositories you control.", icon: "file-check", href: routes.terms },
      { title: "Fixed prices for fixed scope", description: "Agree the scope and the price once. Changes are quoted before they're built.", icon: "briefcase", href: routes.service("custom-development") },
      { title: "NDA on request", description: "Share your idea safely. We'll sign before you tell us the details.", icon: "shield", href: routes.contact },
      { title: "Investor-ready handover", description: "Documentation, architecture notes and clean repos for technical due diligence.", icon: "search", href: routes.howWeWork },
      { title: "Monthly after launch", description: "A monthly retainer or a dedicated developer, with notice you can live with.", icon: "users", href: routes.service("monthly-retainer") },
      { title: "Honest advice", description: "If an off-the-shelf tool does the job, we'll tell you before you spend money.", icon: "message-square", href: routes.about },
    ],
    snapshot: { firstStep: "Scope the MVP", usualModel: "Custom Development or Launch & Rescue", keyTerm: "You own the IP" },
    faqs: [
      { question: "How much does an MVP cost?", answer: "It depends on scope, which is why we start with a short discovery and then give you one fixed price. You'll get a written proposal within 48 hours of our call." },
      { question: "How long until we're live?", answer: "Most MVPs launch in six to ten weeks. Rescues of AI-built prototypes are often faster." },
      { question: "Do you take equity?", answer: "Not as standard. We're paid for the work so you keep your cap table clean. If there's a strong case, we're happy to talk." },
      { question: "Can you help us look technical to investors?", answer: "We can prepare architecture notes and join technical due diligence calls, so investors see a product built properly." },
      { question: "What if we need to change the scope?", answer: "It happens. We quote changes before building them, so you always know the effect on price and date." },
      { question: "Can we hire our own team later?", answer: "Yes. We document as we go and help you hire and hand over when you're ready." },
    ],
    cta: { title: { light: "Your idea deserves a launch date.", bold: "Let's set one." }, subtitle: cta, button: "Book a founder call" },
    engagement: "Custom Development",
  },

  /* ---------------------------------------------------------------- */
  {
    slug: "hnis-family-offices",
    hero: {
      eyebrow: "For HNIs & family offices",
      title: { light: "Private ventures, fully managed and", bold: "kept quiet." },
      subtitle:
        "You have the idea, the capital and no time to run a tech team. We build and run the whole venture: brand, product, website, marketing and listings, with one senior contact and complete discretion.",
      tags: ["Discretion", "Build With Us", "One point of contact", "Monthly reporting"],
    },
    promise: "Your venture, run properly, without the noise.",
    painsTitle: "What we usually hear first.",
    pains: [
      { title: "No time to manage it", description: "You want the venture to exist, not a second job managing freelancers.", icon: "gauge" },
      { title: "Too many vendors", description: "Branding, web, app, marketing and SEO each come with a separate supplier and invoice.", icon: "layers" },
      { title: "Privacy matters", description: "Your name, your family and your plans shouldn't appear in anyone's portfolio.", icon: "shield" },
      { title: "Hard to judge progress", description: "Updates are vague, and it's difficult to tell good work from busy work.", icon: "search" },
      { title: "A new sector", description: "The venture is outside what you know, so you need people who've done it before.", icon: "globe" },
      { title: "Quality over speed", description: "It carries your name, even privately. It has to feel premium from day one.", icon: "crown" },
    ],
    servicesTitle: "How we work with private clients.",
    servicesSubtitle: "Most private clients choose Build With Us, with AI agents and a monthly retainer added as the business grows.",
    services: [
      { service: "build-with-us", headline: "The whole business, built with you", description: "Brand, product, website, marketing and Google listings, delivered and run end to end by one team.", points: ["One senior point of contact", "Monthly report and review", "You own every asset"] },
      { service: "custom-development", headline: "A bespoke product", description: "When the venture needs its own platform or app, built to a premium standard.", points: ["Premium design and build", "Security-first", "Custom-quoted"] },
      { service: "ai-as-a-service", headline: "Agents that run operations", description: "Enquiries, bookings and admin handled by agents, so the venture runs lean.", points: ["Answers enquiries around the clock", "Hands over to your team", "Monthly fee"] },
      { service: "dedicated-developers", headline: "A team for your family office", description: "Engineers who build internal tools, reporting and portfolio dashboards.", points: ["Discreet, vetted people", "Monthly terms", "Works with your advisers"] },
    ],
    journeyTitle: "From brief to a running business.",
    journey: [
      { stage: "Brief", when: "Week 0–1", description: "A private conversation, under NDA, about the idea, the ambition and the budget.", outcome: "A written plan and one clear proposal" },
      { stage: "Brand", when: "Weeks 2–5", description: "Name, identity, tone and positioning, presented for your decision.", outcome: "A brand that feels premium" },
      { stage: "Launch", when: "Weeks 5–12", description: "Website, product, listings and first campaigns go live together.", outcome: "A launched venture, taking enquiries" },
      { stage: "Run", when: "Ongoing", description: "We run and grow it: content, ads, agents, fixes and a monthly review.", outcome: "A business you check in on, not manage" },
    ],
    workTitle: "Ventures we've built for private clients.",
    termsTitle: "Discretion, written into the contract.",
    termsSubtitle: "The terms private clients ask about first, standard for every HNI and family office engagement.",
    terms: [
      { title: "NDA before the brief", description: "We sign your NDA or ours before you share a name, a plan or a number.", icon: "shield", href: routes.contact },
      { title: "No portfolio mentions", description: "We never name you or show your work publicly without written permission.", icon: "crown", href: routes.caseStudies },
      { title: "One senior contact", description: "One person you know by name, reachable directly, for everything.", icon: "users", href: routes.team },
      { title: "You own everything", description: "Brand, domains, code, accounts and data are registered to you or your entity.", icon: "file-check", href: routes.terms },
      { title: "Clear monthly reporting", description: "A plain-English report of what was done, what it cost and what it achieved.", icon: "trending-up", href: routes.howWeWork },
      { title: "Secure by default", description: "Restricted access, encrypted data and devices, and a record of who touched what.", icon: "shield", href: routes.security },
    ],
    snapshot: { firstStep: "Private brief under NDA", usualModel: "Build With Us", keyTerm: "Complete discretion" },
    faqs: [
      { question: "Will you mention us as a client?", answer: "No. Private clients are never named or shown in our work unless you ask us to in writing. Our case studies are anonymised as standard." },
      { question: "Can we work through our family office or advisers?", answer: "Yes. We regularly work with family office staff, lawyers and advisers, and report in whatever format suits them." },
      { question: "How is Build With Us priced?", answer: "Usually a set-up fee for brand and launch, then a monthly fee to run and grow the venture. The proposal lists both clearly." },
      { question: "Who owns the brand and accounts?", answer: "You or your entity, from day one. We work in accounts registered to you, never the other way round." },
      { question: "Can you work in the UAE?", answer: "Yes. Many of our private clients are in the UAE, and we build Arabic and English brands and products." },
      { question: "What if we want to step back further?", answer: "That's the point. We run the day-to-day and bring you decisions, not tasks." },
    ],
    cta: { title: { light: "A private conversation,", bold: "under NDA." }, subtitle: cta, button: "Arrange a private call" },
    engagement: "Build With Us",
  },

  /* ---------------------------------------------------------------- */
  {
    slug: "enterprises",
    hero: {
      eyebrow: "For enterprises",
      title: { light: "An outsourcing partner for AI and engineering that", bold: "passes procurement." },
      subtitle:
        "Pilot AI agents on real workflows, extend your engineering teams, and modernise without a big-bang rewrite. Senior people, clear governance and security your team can review.",
      tags: ["AI pilots", "Team extension", "Security reviews", "SLAs"],
    },
    promise: "AI that gets past the pilot, and teams that fit in.",
    painsTitle: "Why enterprise teams call us.",
    pains: [
      { title: "AI stuck in pilots", description: "Proofs of concept impress in demos and never reach production.", icon: "bot" },
      { title: "Backlogs keep growing", description: "Your teams are stretched, and hiring takes months.", icon: "users" },
      { title: "Legacy slows everything", description: "Core systems work but every change touches something fragile.", icon: "database" },
      { title: "Security reviews stall vendors", description: "New suppliers spend months in questionnaires before any work starts.", icon: "shield" },
      { title: "Outsourcing burned you before", description: "Junior teams, slipping dates and code nobody wants to maintain.", icon: "wrench" },
      { title: "Need measurable results", description: "The board wants to see savings and speed, not experiments.", icon: "trending-up" },
    ],
    servicesTitle: "How we work with enterprises.",
    servicesSubtitle: "Start with an audit or a single agent pilot, then scale with the models that fit your governance.",
    services: [
      { service: "ai-as-a-service", headline: "Agent pilots that reach production", description: "We pick one workflow, build the agent, measure it against a baseline and scale what works.", points: ["Clear baseline and success metrics", "Runs in your cloud if required", "Human approval where it matters"] },
      { service: "dedicated-developers", headline: "Extend your teams", description: "Senior engineers join your squads, tools and ceremonies, managed by one VAUG lead.", points: ["Vetted, senior people", "Your process and tooling", "Monthly, flexible capacity"] },
      { service: "custom-development", headline: "Modernise without the big bang", description: "New products and API layers around legacy systems, delivered in safe increments.", points: ["Strangler-pattern modernisation", "Documented architecture", "Tested releases"] },
      { service: "monthly-retainer", headline: "Managed care for live systems", description: "Internal tools and customer platforms kept secure, patched and improving, with agreed response times.", points: ["Agreed response times", "Security patching and monitoring", "Monthly reporting"] },
    ],
    journeyTitle: "From audit to scale.",
    journey: [
      { stage: "Audit", when: "Weeks 1–2", description: "We map workflows, systems and data, and pick where AI or extra engineering pays back fastest.", outcome: "A ranked shortlist with expected savings" },
      { stage: "Pilot", when: "Weeks 3–8", description: "One agent or one team on one problem, measured against today's baseline.", outcome: "Real results on real data" },
      { stage: "Scale", when: "Month 3+", description: "Roll out what worked to more workflows, teams and regions, with governance in place.", outcome: "A programme, not an experiment" },
      { stage: "Run", when: "Ongoing", description: "Monitoring, SLAs, model updates and continuous improvement.", outcome: "Savings that stay saved" },
    ],
    workTitle: "Enterprise work.",
    termsTitle: "Security and procurement, handled.",
    termsSubtitle: "We make it easy for your security, legal and procurement teams to say yes.",
    terms: [
      { title: "Security questionnaires", description: "We complete your questionnaires and share our security practices up front.", icon: "shield", href: routes.security },
      { title: "Data stays where you say", description: "UK, EU or UAE hosting, in your cloud account if you prefer.", icon: "cloud", href: routes.security },
      { title: "MSA, DPA and SOWs", description: "Standard enterprise contracts, including data processing agreements.", icon: "file-check", href: routes.terms },
      { title: "SLAs and support", description: "Agreed response times and a named lead for escalations.", icon: "gauge", href: routes.howWeWork },
      { title: "Access you control", description: "SSO, least-privilege access and audit logs, removed on day one of offboarding.", icon: "users", href: routes.security },
      { title: "Clear governance", description: "Weekly demos, a Friday update and monthly steering reviews.", icon: "briefcase", href: routes.howWeWork },
    ],
    snapshot: { firstStep: "Two-week audit", usualModel: "AI as a Service or Dedicated Developers", keyTerm: "Security & procurement ready" },
    faqs: [
      { question: "Can you complete our security questionnaire?", answer: "Yes. We complete them routinely and can share our security practices and policies ahead of time. See our security and compliance page for the detail." },
      { question: "Do you hold ISO 27001 or SOC 2?", answer: "We work in line with ISO 27001 practices and it's on our roadmap. Where a certified supplier is mandatory, we'll say so early and discuss options." },
      { question: "Can agents run inside our environment?", answer: "Yes. We deploy into your AWS, Azure or GCP account and use models and regions you approve." },
      { question: "How do you work with our internal teams?", answer: "As part of them. Our engineers join your tools, standups and review process, with a VAUG lead accountable for quality." },
      { question: "How do we measure a pilot?", answer: "We agree a baseline and success metrics before building, then report against them weekly." },
      { question: "Can you work with our preferred supplier process?", answer: "Yes. We're used to onboarding portals, supplier checks and purchase orders." },
    ],
    cta: { title: { light: "Take one workflow from pilot", bold: "to production." }, subtitle: cta, button: "Book an enterprise call" },
    engagement: "AI as a Service",
  },

  /* ---------------------------------------------------------------- */
  {
    slug: "agencies",
    hero: {
      eyebrow: "For agencies",
      title: { light: "White-label builds your clients see as", bold: "yours." },
      subtitle:
        "Say yes to the AI, app and platform work your clients are asking for. We build under your brand, work inside your process and stay invisible to your client.",
      tags: ["White-label", "NDAs", "Your brand", "Overflow capacity"],
    },
    promise: "Say yes to bigger briefs. We'll build them quietly.",
    painsTitle: "Why agencies partner with us.",
    pains: [
      { title: "Clients want AI now", description: "Every pitch asks about AI agents, and you don't have the team to build them.", icon: "bot" },
      { title: "Capacity is lumpy", description: "Hiring for peaks leaves you paying for quiet months.", icon: "gauge" },
      { title: "Freelancers vanish", description: "The developer who built it has moved on, and so has the knowledge.", icon: "users" },
      { title: "Margins are thin", description: "Development overruns eat the profit on otherwise good projects.", icon: "trending-up" },
      { title: "Your reputation is on the line", description: "A partner who contacts your client or misses a date costs you the account.", icon: "shield" },
      { title: "Technical pitches", description: "You need someone credible to scope and estimate before you win the work.", icon: "search" },
    ],
    servicesTitle: "How we work with agencies.",
    servicesSubtitle: "Plug us in where you need us: one project, a monthly team or the AI capability you don't have in-house.",
    services: [
      { service: "dedicated-developers", headline: "A white-label team", description: "Developers who work as part of your agency, under your name, month by month.", points: ["Your email and Slack if you like", "Your process and tools", "Flexible monthly capacity"] },
      { service: "custom-development", headline: "Projects at a price you can mark up", description: "We scope and price the build so you can quote your client with confidence.", points: ["Fixed cost for fixed scope", "Protects your margin", "Weekly demos you can forward"] },
      { service: "ai-as-a-service", headline: "AI agents under your brand", description: "Offer AI agents to your clients. We build and run them; you own the relationship.", points: ["White-label dashboards", "Monthly recurring revenue for you", "We handle the ops"] },
      { service: "launch-and-rescue", headline: "Rescue a client project", description: "A build went wrong or a prototype needs to go live. We fix it quietly.", points: ["Fast code audit", "Stabilise and deploy", "No client contact unless you want it"] },
    ],
    journeyTitle: "From match to white-label delivery.",
    journey: [
      { stage: "Match", when: "Days 1–3", description: "Tell us about the brief. We match the right people and help you scope and estimate.", outcome: "A cost you can quote with confidence" },
      { stage: "Onboard", when: "Week 1", description: "NDA, white-label terms and access to your tools, brand guidelines and process.", outcome: "A team ready to work as yours" },
      { stage: "Deliver", when: "Weeks 2+", description: "We build in your name, with weekly demos you can share with your client.", outcome: "Work your client sees as yours" },
      { stage: "Support", when: "Ongoing", description: "Maintenance and improvements after launch, still under your brand.", outcome: "Recurring revenue for your agency" },
    ],
    workTitle: "Delivered for agency partners.",
    termsTitle: "White-label terms, in writing.",
    termsSubtitle: "The protections agencies need before they bring us near a client.",
    terms: [
      { title: "Strict white-label", description: "Our name never appears in code, emails, invoices or meetings your client sees.", icon: "handshake", href: routes.service("dedicated-developers") },
      { title: "NDAs as standard", description: "Mutual NDA before any brief, and per-project NDAs if your client requires them.", icon: "shield", href: routes.contact },
      { title: "Non-solicitation", description: "We never approach your clients, during the project or after it.", icon: "file-check", href: routes.terms },
      { title: "IP passes to you", description: "Everything we build is assigned to you or your client, as you decide.", icon: "briefcase", href: routes.terms },
      { title: "Partner pricing", description: "Rates that leave room for your margin, agreed per project or per month.", icon: "trending-up", href: routes.service("custom-development") },
      { title: "Your process, your tools", description: "We work in your Jira, Slack and Git, and follow your QA and release steps.", icon: "workflow", href: routes.howWeWork },
    ],
    snapshot: { firstStep: "Match on a live brief", usualModel: "Dedicated Developers or Fixed price", keyTerm: "White-label + NDAs" },
    faqs: [
      { question: "Will our client ever know you're involved?", answer: "Only if you tell them. We work under your brand, in your tools, and never contact your client directly without your say-so." },
      { question: "Can you join client calls?", answer: "Yes, as part of your team, introduced however you like. Many partners bring our lead in as their technical director." },
      { question: "Can you help us win the pitch?", answer: "Yes. We help scope, estimate and write the technical parts of proposals before the work is confirmed." },
      { question: "How do you price for agencies?", answer: "Partner rates per month or fixed prices per project, designed to leave room for your margin." },
      { question: "What if the client asks for changes mid-project?", answer: "We quote the change to you first, so you can agree it with your client before anything is built." },
      { question: "Can we resell your AI agents?", answer: "Yes. We build and run the agents under your brand, and you bill your client monthly." },
    ],
    cta: { title: { light: "Say yes to the next brief.", bold: "We'll build it under your name." }, subtitle: cta, button: "Talk partnerships" },
    engagement: "Dedicated Developers",
  },
];

export const audiencePageBySlug = (slug: string) => audiencePages.find((a) => a.slug === slug);
