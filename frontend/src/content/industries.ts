import type { engagementOptions } from "@/lib/lead-options";

import { routes } from "./taxonomy";
import type { CtaBlock, EngineeringSlug, Faq, Feature, IconName, SectorSlug, ServiceSlug, SplitTitle } from "./types";

/**
 * Industry pages: the /industries index and one page per sector.
 * Names, slugs and icons come from `taxonomy.ts`; everything written for the
 * pages lives here. Compliance items describe standards we build to, not
 * certifications VAUG holds.
 */

export type EngagementOption = (typeof engagementOptions)[number];

/** A pain the sector lives with, and the short version of how we fix it. */
export interface SectorProblem {
  title: string;
  description: string;
  fix: string;
}

/** Something we build for the sector, linked to the service that usually delivers it. */
export interface SectorSolution {
  title: string;
  description: string;
  icon: IconName;
  service: ServiceSlug;
}

/** "How we help": one VAUG service applied to this sector (also used by who-we-serve pages). */
export interface ServiceFit {
  service: ServiceSlug;
  headline: string;
  description: string;
  points: string[];
}

/** A regulation or standard we design and build to. Never a certification claim. */
export interface ComplianceItem {
  name: string;
  scope: string;
  description: string;
}

/** Technology group, linked to the engineering page that covers it. */
export interface TechGroupLink {
  label: string;
  engineering: EngineeringSlug;
  items: string[];
}

export interface SectorPage {
  slug: SectorSlug;
  hero: { title: SplitTitle; subtitle: string; tags: string[] };
  /** Three chips on the index tile. */
  highlights: string[];
  problemsTitle: string;
  problems: SectorProblem[];
  solutionsTitle: string;
  solutions: SectorSolution[];
  help: ServiceFit[];
  compliance: ComplianceItem[];
  tech: TechGroupLink[];
  faqs: Faq[];
  cta: CtaBlock;
  engagement: EngagementOption;
}

export interface IndustriesIndex {
  hero: { eyebrow: string; title: SplitTitle; subtitle: string; tags: string[] };
  ticker: string[];
  sectorsTitle: SplitTitle;
  sectorsSubtitle: string;
  capabilitiesTitle: string;
  capabilitiesSubtitle: string;
  capabilities: Feature[];
  approachTitle: string;
  approach: Feature[];
  workTitle: string;
  audiencesTitle: string;
  contact: { title: string; subtitle: string };
  faqs: Faq[];
  cta: CtaBlock;
}

export const industriesIndex: IndustriesIndex = {
  hero: {
    eyebrow: "Industries",
    title: { light: "Six sectors. One team that already", bold: "knows the rules." },
    subtitle:
      "We build AI agents and software for regulated, fast-moving businesses across the UK, Europe and the UAE. You skip the part where your partner learns your industry on your budget.",
    tags: ["Fintech & Insurance", "Healthcare", "Real Estate", "E-commerce", "Logistics", "Hospitality"],
  },
  ticker: ["Payments", "Patient agents", "Proptech", "Headless commerce", "Fleet tracking", "Guest concierge", "Claims", "Bookings"],
  sectorsTitle: { light: "Where we do", bold: "our best work." },
  sectorsSubtitle: "Pick your sector to see the problems we solve, the products we build and the standards we build to.",
  capabilitiesTitle: "What carries across every sector.",
  capabilitiesSubtitle: "The sector changes the rules. The craft underneath stays the same.",
  capabilities: [
    { title: "AI agents on real workflows", description: "Agents that answer, qualify, reconcile and book, with a human signing off where it matters.", icon: "bot", href: routes.engineeringPage("ai-engineering") },
    { title: "Integrations with what you run", description: "CRMs, core systems, PMS, ERPs and payment rails. We connect to them rather than replace them.", icon: "workflow", href: routes.engineeringPage("backend-engineering") },
    { title: "Web and mobile products", description: "Customer apps, portals and dashboards that are fast, accessible and easy to change.", icon: "smartphone", href: routes.engineeringPage("mobile-engineering") },
    { title: "Security by default", description: "Least-privilege access, encryption, audit trails and data residency agreed before the first commit.", icon: "shield", href: routes.security },
    { title: "Data you can trust", description: "Clean pipelines, sensible schemas and reporting that finance and ops actually believe.", icon: "database", href: routes.engineeringPage("full-stack-engineering") },
    { title: "Cloud that stays cheap", description: "Right-sized infrastructure, monitoring and alerts, so growth doesn't arrive with a surprise bill.", icon: "cloud", href: routes.engineeringPage("devops-cloud") },
  ],
  approachTitle: "How we get up to speed in your sector.",
  approach: [
    { title: "Diagnose", meta: "Week 1", description: "We map your workflows, systems and rules before we suggest anything." },
    { title: "Design to the rules", meta: "Week 2", description: "Data handling, consent and audit needs go into the design, not a later sprint." },
    { title: "Build in the open", meta: "Weeks 3+", description: "Weekly demos, a Friday update and one accountable lead." },
    { title: "Stay after launch", meta: "Ongoing", description: "We monitor, fix and improve. Your product doesn't get handed over and forgotten." },
  ],
  workTitle: "Recent work across our sectors.",
  audiencesTitle: "Whoever is buying, we speak your language.",
  contact: { title: "Tell us about your sector.", subtitle: "Share your industry and the problem you want solved. A senior lead replies within one business day." },
  faqs: [
    { question: "Do you only work in these six sectors?", answer: "No, but these are where we have the most repeat experience. If you're elsewhere, book a call and we'll tell you honestly whether we're a good fit." },
    { question: "Are you certified for regulated industries?", answer: "We build to the relevant standards (GDPR, PCI DSS scope reduction, FCA-friendly audit trails, health data rules) and work inside your compliance process. Where a formal certification is needed, we say so plainly and plan around it." },
    { question: "Can you work with our existing systems?", answer: "Yes. Most projects start by integrating with what you already run. We only suggest replacing a system when keeping it costs more than moving." },
    { question: "Which regions do you cover?", answer: "Mostly the UK, Europe and the UAE, with teams across time zones so there's always overlap with your working day." },
    { question: "How quickly can you start?", answer: "Usually within two weeks of a signed proposal. You get the proposal within 48 hours of our first call." },
  ],
  cta: {
    title: { light: "Tell us your sector and your problem.", bold: "We'll tell you what we'd build." },
    subtitle: "Free 30-minute strategy call · NDA on request · Proposal within 48 hours",
    button: "Book a call",
  },
};

export const sectorPages: SectorPage[] = [
  /* ---------------------------------------------------------------- */
  {
    slug: "fintech-insurance",
    hero: {
      title: { light: "Fintech and insurance software that moves money", bold: "and passes audit." },
      subtitle:
        "Payments, lending, insurtech and finance operations. We build the products your customers use and the agents that clear the back-office work behind them.",
      tags: ["Payments", "Lending", "Insurtech", "Reconciliation", "KYC"],
    },
    highlights: ["Reconciliation agents", "Claims portals", "KYC onboarding"],
    problemsTitle: "What slows finance teams down.",
    problems: [
      { title: "Month-end is still manual", description: "Analysts match statements to ledgers by hand, and close slips every time volume grows.", fix: "A reconciliation agent matches, flags exceptions and leaves a full audit trail." },
      { title: "Onboarding loses customers", description: "Long KYC forms and slow checks mean good applicants give up halfway.", fix: "Short, staged onboarding with automated checks and clear status updates." },
      { title: "Claims sit in inboxes", description: "Claims arrive by email and PDF, get re-keyed and wait days for a first look.", fix: "Agents read, classify and route claims, so handlers start with the facts." },
      { title: "Legacy core systems", description: "The core platform works but nobody wants to touch it, so every change is slow.", fix: "A clean API layer around the core lets new products ship without risky rewrites." },
      { title: "Audit anxiety", description: "Every new tool raises the question: can we explain what it did and why?", fix: "Logged decisions, human approval steps and explainable outputs by design." },
      { title: "Fraud and risk blind spots", description: "Rules catch yesterday's patterns and flood the team with false positives.", fix: "Risk scoring that learns from your data, with thresholds your team controls." },
    ],
    solutionsTitle: "What we build for fintech and insurance.",
    solutions: [
      { title: "Reconciliation agents", description: "Match transactions across banks, PSPs and ledgers, and escalate only the exceptions.", icon: "bot", service: "ai-as-a-service" },
      { title: "Customer onboarding and KYC", description: "Identity, document and sanctions checks wired into a flow people actually finish.", icon: "users", service: "custom-development" },
      { title: "Claims and policy portals", description: "Self-serve portals for quotes, policies and claims, with status customers can follow.", icon: "file-check", service: "custom-development" },
      { title: "Payments and wallets", description: "Checkout, payouts and wallet features on top of Stripe, Adyen, Checkout.com or open banking.", icon: "zap", service: "fixed-price" },
      { title: "Finance ops dashboards", description: "Live cash, exposure and exception views that replace weekly spreadsheets.", icon: "gauge", service: "dedicated-developers" },
      { title: "Document intelligence", description: "Extract data from statements, invoices and policy wording with confidence scores.", icon: "brain", service: "ai-as-a-service" },
    ],
    help: [
      { service: "ai-as-a-service", headline: "Agents for the back office", description: "We build and run agents for reconciliation, claims triage and document checks, and we keep improving them every month.", points: ["Human approval on every payment action", "Full decision logs for audit", "Runs inside your cloud if required"] },
      { service: "custom-development", headline: "Customer-facing products", description: "Onboarding flows, portals and apps built with the controls your risk team expects.", points: ["Security reviewed at each release", "Integrations with core and payment systems", "Accessible, tested interfaces"] },
      { service: "dedicated-developers", headline: "Engineers who've worked in finance", description: "Add developers who understand ledgers, idempotency and why rounding matters.", points: ["Join your sprints and tools", "Vetted for fintech experience", "Scale up or down monthly"] },
      { service: "launch-and-rescue", headline: "Prototype to production", description: "Took a fintech idea to a Lovable or Bolt prototype? We make it secure and deployable.", points: ["Security and data review first", "Payments wired properly", "Deployed with monitoring"] },
    ],
    compliance: [
      { name: "GDPR / UK GDPR", scope: "UK & EU", description: "Data minimisation, lawful basis, retention rules and subject-access support built in." },
      { name: "FCA expectations", scope: "UK", description: "Audit trails, Consumer Duty-friendly journeys and clear records of automated decisions." },
      { name: "PCI DSS", scope: "Card data", description: "We keep card data out of your systems with tokenised providers, reducing your PCI scope." },
      { name: "PSD2 & open banking", scope: "UK & EU", description: "Strong customer authentication and consented account access through regulated providers." },
      { name: "AML / KYC", scope: "Global", description: "Identity, sanctions and PEP checks wired to vetted providers with review queues." },
      { name: "DORA readiness", scope: "EU", description: "Resilience testing, incident logging and third-party risk records your team can show." },
    ],
    tech: [
      { label: "AI and agents", engineering: "ai-engineering", items: ["OpenAI", "Claude", "LangGraph", "pgvector", "Document AI"] },
      { label: "Backend and data", engineering: "backend-engineering", items: ["Node.js", "Python", "PostgreSQL", "Kafka", "dbt"] },
      { label: "Payments and cloud", engineering: "devops-cloud", items: ["Stripe", "Adyen", "Plaid / TrueLayer", "AWS", "Terraform"] },
    ],
    faqs: [
      { question: "Can AI agents take actions on money?", answer: "Only with guardrails you approve. Our agents usually prepare, match and flag; a person approves anything that moves money or changes a customer's position." },
      { question: "Do you handle card data?", answer: "We design so you don't have to. Card details go straight to a tokenised provider like Stripe or Adyen, which keeps most of your platform out of PCI scope." },
      { question: "Can you work with our core banking or policy system?", answer: "Yes. We normally build an API layer around it, so new features ship without risky changes to the core." },
      { question: "Will our compliance team be involved?", answer: "From week one. We share data flows, access models and decision logs early, so there are no surprises at sign-off." },
      { question: "Can the agent run in our own cloud?", answer: "Yes. For sensitive workloads we deploy inside your AWS, Azure or GCP account, with models and data kept in your chosen region." },
      { question: "What does a first project usually look like?", answer: "Often one well-defined workflow, like reconciliation or claims triage, delivered in four to eight weeks with clear before-and-after numbers." },
    ],
    cta: {
      title: { light: "Close the books faster.", bold: "Keep the audit trail." },
      subtitle: "Free 30-minute strategy call · NDA on request · Proposal within 48 hours",
      button: "Talk to a fintech lead",
    },
    engagement: "AI as a Service",
  },

  /* ---------------------------------------------------------------- */
  {
    slug: "healthcare",
    hero: {
      title: { light: "Healthcare software that gives clinicians", bold: "their time back." },
      subtitle:
        "Clinics, diagnostics and patient experience. We build booking, patient agents and records tools that respect health data and fit the way care is actually delivered.",
      tags: ["Clinics", "Booking", "Telehealth", "Patient agents", "Records"],
    },
    highlights: ["Patient agents", "Online booking", "Telehealth"],
    problemsTitle: "What gets in the way of care.",
    problems: [
      { title: "Phones ring all day", description: "Reception spends hours on bookings, reschedules and the same five questions.", fix: "A patient agent on WhatsApp, web and voice handles routine requests, day and night." },
      { title: "No-shows cost money", description: "Empty slots and late cancellations add up to lost revenue every week.", fix: "Smart reminders, easy rescheduling and waitlists that fill gaps automatically." },
      { title: "Systems don't talk", description: "Booking, records, billing and messaging live in separate tools with double entry.", fix: "Integrations that keep one patient record in sync across your tools." },
      { title: "Admin eats clinical time", description: "Notes, letters and forms take hours that should go to patients.", fix: "Assistants that draft notes and letters for a clinician to check and sign." },
      { title: "Clunky patient apps", description: "Patients abandon apps that are slow, confusing or not accessible.", fix: "Simple, accessible booking and follow-up journeys tested with real patients." },
      { title: "Worry about health data", description: "Every new tool raises consent, security and data residency questions.", fix: "Health data rules designed in: consent, access control, encryption and audit logs." },
    ],
    solutionsTitle: "What we build for healthcare.",
    solutions: [
      { title: "Online booking", description: "Real-time availability, deposits, reminders and rescheduling that patients can do themselves.", icon: "file-check", service: "fixed-price" },
      { title: "Patient agents", description: "WhatsApp, web and voice agents that answer questions, book and triage to the right person.", icon: "bot", service: "ai-as-a-service" },
      { title: "Telehealth", description: "Secure video consultations with intake forms, notes and follow-ups in one flow.", icon: "smartphone", service: "custom-development" },
      { title: "Records and integrations", description: "Connect practice management, EHR, labs and billing so data is entered once.", icon: "database", service: "custom-development" },
      { title: "Clinical admin assistants", description: "Draft letters, summaries and referral notes for clinicians to review and approve.", icon: "brain", service: "ai-as-a-service" },
      { title: "Patient and clinic apps", description: "Mobile apps for exercise plans, results, payments and messaging.", icon: "heart", service: "dedicated-developers" },
    ],
    help: [
      { service: "ai-as-a-service", headline: "Patient agents that never go home", description: "We build, run and improve agents for bookings, FAQs and triage, with clear handover to your team.", points: ["Escalates anything clinical to a person", "Speaks your patients' languages", "Conversation logs for review"] },
      { service: "fixed-price", headline: "A booking app at a fixed price", description: "Well-understood products like booking and reminders, scoped and priced up front.", points: ["One agreed scope and price", "Weekly demos", "Launch support included"] },
      { service: "custom-development", headline: "Telehealth and records, built to fit", description: "Bespoke platforms where your care model doesn't fit an off-the-shelf tool.", points: ["Integrations with EHR and billing", "Role-based access", "Accessibility tested"] },
      { service: "dedicated-developers", headline: "Extra hands for your product team", description: "Engineers who've built health products join your team and your sprints.", points: ["Monthly, flexible terms", "Healthcare experience", "Your tools, your process"] },
    ],
    compliance: [
      { name: "GDPR special category data", scope: "UK & EU", description: "Explicit consent, minimisation and strict access for health data, with records to prove it." },
      { name: "NHS DSPT alignment", scope: "UK", description: "We design to the Data Security and Protection Toolkit so your submission is easier." },
      { name: "DTAC", scope: "UK", description: "Clinical safety, data protection and interoperability evidence prepared as we build." },
      { name: "UAE health data law", scope: "UAE", description: "Health data kept in-country where required, with access controls and audit logs." },
      { name: "DHA / DoH guidance", scope: "Dubai & Abu Dhabi", description: "Telehealth and data handling designed around local health authority rules." },
      { name: "HL7 FHIR", scope: "Interoperability", description: "Standard data models and APIs so records move cleanly between systems." },
    ],
    tech: [
      { label: "AI and agents", engineering: "ai-engineering", items: ["Claude", "OpenAI", "Twilio", "WhatsApp Business API", "Whisper"] },
      { label: "Apps and web", engineering: "mobile-engineering", items: ["Flutter", "React Native", "Next.js", "WebRTC"] },
      { label: "Data and cloud", engineering: "backend-engineering", items: ["FHIR APIs", "PostgreSQL", "AWS (UK / UAE regions)", "Azure"] },
    ],
    faqs: [
      { question: "Can a patient agent give medical advice?", answer: "No. Our agents handle bookings, admin questions and routing. Anything clinical is passed to a qualified person, and that rule is built into the agent." },
      { question: "Where is patient data stored?", answer: "In the region you need: UK, EU or UAE. We choose cloud regions and providers to match your data residency obligations." },
      { question: "Can you integrate with our practice management system?", answer: "Usually, yes. We've worked with APIs, HL7/FHIR feeds and, when needed, secure exports. We confirm what's possible in the first week." },
      { question: "Do you help with NHS DSPT or DTAC?", answer: "We design and document to those standards and provide the technical evidence. Submission and clinical safety sign-off stay with your organisation." },
      { question: "How long does a booking app take?", answer: "A focused booking and reminders product typically takes six to ten weeks at a fixed price, including launch support." },
      { question: "Can the agent speak Arabic?", answer: "Yes. We regularly build agents in English and Arabic, and can add other languages your patients use." },
    ],
    cta: {
      title: { light: "Fewer calls. Fewer no-shows.", bold: "More time for patients." },
      subtitle: "Free 30-minute strategy call · NDA on request · Proposal within 48 hours",
      button: "Talk to a healthcare lead",
    },
    engagement: "AI as a Service",
  },

  /* ---------------------------------------------------------------- */
  {
    slug: "real-estate",
    hero: {
      title: { light: "Proptech that turns enquiries into", bold: "viewings and sales." },
      subtitle:
        "Rentals, brokerage and developers across the UK, Europe and the UAE. We build listing platforms, lead agents and investor portals that keep deals moving.",
      tags: ["Proptech", "Rentals", "Brokerage", "Developers", "Investor portals"],
    },
    highlights: ["Lead qualification agents", "Listing platforms", "Investor portals"],
    problemsTitle: "Where property deals stall.",
    problems: [
      { title: "Slow replies lose leads", description: "Enquiries arrive at night and on weekends. By Monday the buyer has booked elsewhere.", fix: "A lead agent replies in seconds, qualifies budget and timing, and books viewings." },
      { title: "Listings everywhere", description: "Portals, the website and social all show different prices and photos.", fix: "One listing source that syncs to portals and your site automatically." },
      { title: "CRM nobody updates", description: "Agents live in WhatsApp, so the CRM is always out of date.", fix: "Conversations logged to the CRM automatically, with next steps suggested." },
      { title: "Investors want updates", description: "Off-plan buyers and investors chase for progress, documents and payments.", fix: "Investor portals with milestones, documents and payment schedules in one place." },
      { title: "Prototype, not product", description: "The rental app built in a weekend won't survive real tenants and payments.", fix: "We rescue and harden prototypes into secure, deployable products." },
      { title: "Brand feels generic", description: "New developments launch with templates that look like everyone else's.", fix: "A venture studio team that builds the brand, site and launch campaign together." },
    ],
    solutionsTitle: "What we build for real estate.",
    solutions: [
      { title: "Lead qualification agents", description: "Reply instantly on WhatsApp and web, qualify, and book viewings into your calendar.", icon: "bot", service: "ai-as-a-service" },
      { title: "Listing and search platforms", description: "Fast property search with maps, filters, saved searches and portal syncing.", icon: "search", service: "custom-development" },
      { title: "Rental and tenant apps", description: "Applications, referencing, rent payments and maintenance requests in one app.", icon: "smartphone", service: "launch-and-rescue" },
      { title: "Investor and buyer portals", description: "Off-plan progress, documents, statements and payment schedules for buyers.", icon: "briefcase", service: "custom-development" },
      { title: "Development launch sites", description: "Brand, website, 3D-ready galleries and campaigns for a new development.", icon: "building", service: "venture-studio" },
      { title: "CRM automation", description: "Sync conversations, score leads and trigger follow-ups without manual entry.", icon: "workflow", service: "ai-as-a-service" },
    ],
    help: [
      { service: "ai-as-a-service", headline: "Never miss a lead again", description: "A lead agent works every enquiry, every hour, and hands your team qualified viewings.", points: ["WhatsApp, web and portal leads", "Books viewings in your calendar", "Logs everything to your CRM"] },
      { service: "venture-studio", headline: "Launch a property brand end to end", description: "For developers and family offices: brand, website, listings and marketing, run for you.", points: ["Brand and website", "Google listings and campaigns", "One team, one monthly report"] },
      { service: "custom-development", headline: "Platforms and portals", description: "Listing, rental and investor platforms built for your market and your process.", points: ["Maps, search and payments", "Portal integrations", "Arabic and English support"] },
      { service: "launch-and-rescue", headline: "Rescue the prototype", description: "Your proptech MVP was built in Lovable, Bolt or v0. We fix it and ship it.", points: ["Security and data fixes", "Payments and auth wired properly", "Deployed and monitored"] },
    ],
    compliance: [
      { name: "RERA guidance", scope: "Dubai", description: "Listing permits, advertising rules and broker details reflected in how listings are shown." },
      { name: "GDPR / UK GDPR", scope: "UK & EU", description: "Consent for marketing, retention rules and easy data requests for buyers and tenants." },
      { name: "AML checks", scope: "UK, EU & UAE", description: "Buyer identity and source-of-funds checks wired to vetted providers." },
      { name: "Material information", scope: "UK", description: "Listings designed to show the details UK trading standards expect up front." },
      { name: "UAE PDPL", scope: "UAE", description: "Personal data handled to the UAE data protection law, with local hosting where needed." },
      { name: "PCI DSS", scope: "Payments", description: "Deposits and rent taken through tokenised providers to keep card data out of scope." },
    ],
    tech: [
      { label: "AI and agents", engineering: "ai-engineering", items: ["WhatsApp Business API", "Claude", "OpenAI", "HubSpot", "Salesforce"] },
      { label: "Web and apps", engineering: "web-engineering", items: ["Next.js", "Mapbox", "Google Maps", "Flutter"] },
      { label: "Backend and cloud", engineering: "backend-engineering", items: ["Node.js", "PostgreSQL + PostGIS", "Stripe", "AWS"] },
    ],
    faqs: [
      { question: "Can the agent reply in Arabic and English?", answer: "Yes. Most of our UAE property agents work in both, and switch automatically based on the enquiry." },
      { question: "Will it work with Rightmove, Bayut or Property Finder leads?", answer: "Yes. We connect portal lead feeds so every enquiry gets the same fast, qualified response." },
      { question: "Can it book viewings directly?", answer: "Yes. It checks your agents' calendars, offers slots and confirms, then sends reminders to both sides." },
      { question: "Do you build for developers launching a new project?", answer: "Yes. Our Venture Studio can run the brand, website, listings and launch campaign for a new development." },
      { question: "Our rental app was built with AI tools. Can you take it over?", answer: "That's exactly what Launch & Rescue is for. We audit it, fix what's risky and get it live." },
      { question: "How do you handle RERA advertising rules?", answer: "We build listing templates that show the permit and broker details required, and we check them with your compliance team before launch." },
    ],
    cta: {
      title: { light: "Answer every enquiry.", bold: "Book more viewings." },
      subtitle: "Free 30-minute strategy call · NDA on request · Proposal within 48 hours",
      button: "Talk to a proptech lead",
    },
    engagement: "AI as a Service",
  },

  /* ---------------------------------------------------------------- */
  {
    slug: "ecommerce-retail",
    hero: {
      title: { light: "Commerce that loads fast, sells more and", bold: "runs itself at night." },
      subtitle:
        "Stores, marketplaces and headless commerce. We build storefronts, customer agents and the operations tooling that keeps orders flowing.",
      tags: ["Headless", "Shopify", "Marketplaces", "Support agents", "Ops"],
    },
    highlights: ["Headless storefronts", "Support agents", "Order ops"],
    problemsTitle: "What holds stores back.",
    problems: [
      { title: "Slow pages lose sales", description: "Every extra second on mobile shows up in your conversion rate.", fix: "Headless storefronts built for speed, with images and scripts under control." },
      { title: "Support can't keep up", description: "\"Where's my order?\" floods the inbox every sale and every holiday.", fix: "A support agent answers order, return and sizing questions instantly." },
      { title: "Stock out of sync", description: "Inventory differs between the store, marketplaces and the warehouse.", fix: "One inventory source with real-time sync to every channel." },
      { title: "Returns eat margin", description: "Manual returns handling is slow, and refunds go out before goods come back.", fix: "Self-serve returns with rules, labels and refunds that follow the parcel." },
      { title: "Plugins everywhere", description: "Dozens of apps slow the site down and conflict with each other.", fix: "Replace fragile plugins with a few well-built custom features." },
      { title: "Launch days break things", description: "Traffic spikes during drops and sales take the store down.", fix: "Load-tested infrastructure and caching that holds up on your busiest day." },
    ],
    solutionsTitle: "What we build for e-commerce and retail.",
    solutions: [
      { title: "Headless storefronts", description: "Next.js storefronts on Shopify, commercetools or Medusa, built for speed.", icon: "zap", service: "custom-development" },
      { title: "Customer support agents", description: "Answer order, return and product questions on chat, email and WhatsApp.", icon: "message-square", service: "ai-as-a-service" },
      { title: "Marketplace platforms", description: "Multi-vendor catalogues, payouts, reviews and seller dashboards.", icon: "layers", service: "custom-development" },
      { title: "Inventory and order ops", description: "Sync stock, route orders and alert the team before problems reach customers.", icon: "workflow", service: "dedicated-developers" },
      { title: "Product content at scale", description: "Agents that write and translate product copy for your team to approve.", icon: "sparkles", service: "ai-as-a-service" },
      { title: "Shopify builds and fixes", description: "Custom themes, apps and checkout features, scoped and priced up front.", icon: "file-check", service: "fixed-price" },
    ],
    help: [
      { service: "custom-development", headline: "Storefronts and marketplaces", description: "Custom commerce where a theme isn't enough: headless, multi-vendor or multi-region.", points: ["Core Web Vitals targets agreed up front", "Payments and tax for UK, EU and UAE", "Load-tested before launch"] },
      { service: "ai-as-a-service", headline: "Agents for support and content", description: "Agents answer customers and prepare product content, and your team handles the exceptions.", points: ["Connected to orders and returns", "Brand voice you approve", "Hands over to a person when needed"] },
      { service: "fixed-price", headline: "Scoped Shopify work", description: "Custom apps, theme features and integrations for one agreed price.", points: ["Clear scope and price", "Weekly demos", "Launch support included"] },
      { service: "dedicated-developers", headline: "A commerce team on demand", description: "Add engineers for peak season or a replatforming project, month by month.", points: ["Shopify, headless and ERP experience", "Join your sprints", "Flexible monthly terms"] },
    ],
    compliance: [
      { name: "PCI DSS", scope: "Payments", description: "Hosted, tokenised checkout so card data never touches your servers." },
      { name: "GDPR & ePrivacy", scope: "UK & EU", description: "Consent-first tracking, cookie controls and clean customer data handling." },
      { name: "WCAG 2.2 AA", scope: "Accessibility", description: "Accessible storefronts, in line with the European Accessibility Act." },
      { name: "Consumer rights", scope: "UK & EU", description: "Clear returns, cancellation and pricing information at the right step." },
      { name: "VAT & OSS", scope: "UK & EU", description: "Tax calculation and invoices that match where you sell and ship." },
      { name: "UAE e-commerce rules", scope: "UAE", description: "Arabic-ready storefronts, local payment methods and consumer protection details." },
    ],
    tech: [
      { label: "Commerce", engineering: "web-engineering", items: ["Shopify / Hydrogen", "commercetools", "Medusa", "Next.js"] },
      { label: "AI and agents", engineering: "ai-engineering", items: ["Claude", "OpenAI", "Gorgias", "Zendesk"] },
      { label: "Ops and cloud", engineering: "devops-cloud", items: ["Vercel", "Cloudflare", "Algolia", "Stripe", "Klaviyo"] },
    ],
    faqs: [
      { question: "Should we go headless?", answer: "Not always. If a Shopify theme does what you need, stay on it. Headless pays off when speed, content or multi-region needs outgrow the theme. We'll tell you which side you're on." },
      { question: "Can a support agent access order data?", answer: "Yes, with read access scoped to what it needs. It can check status, start returns and escalate refunds for a person to approve." },
      { question: "Will it handle peak season?", answer: "We load-test to your biggest expected day plus headroom, and set up monitoring and alerts before it arrives." },
      { question: "Can you work with our existing agency?", answer: "Yes. We often build the technical parts while your agency owns brand and campaigns, or we work white-label for them." },
      { question: "Do you do marketplace builds?", answer: "Yes: multi-vendor catalogues, seller onboarding, payouts and reviews, usually on a custom or Medusa-based stack." },
      { question: "How do you measure success?", answer: "Agreed numbers from day one, such as page speed, conversion, support response time or tickets resolved, reported every week." },
    ],
    cta: {
      title: { light: "A faster store and a calmer inbox.", bold: "Let's build it." },
      subtitle: "Free 30-minute strategy call · NDA on request · Proposal within 48 hours",
      button: "Talk to a commerce lead",
    },
    engagement: "Custom Development",
  },

  /* ---------------------------------------------------------------- */
  {
    slug: "logistics",
    hero: {
      title: { light: "Logistics software that knows where", bold: "everything is." },
      subtitle:
        "Freight, courier, fleet and supply chain. We build tracking, dispatch and document agents that cut the calls, emails and spreadsheets from every shipment.",
      tags: ["Freight", "Courier", "Fleet", "Supply chain", "Tracking"],
    },
    highlights: ["Live tracking", "Dispatch tools", "Document agents"],
    problemsTitle: "Where shipments lose time.",
    problems: [
      { title: "\"Where is my parcel?\"", description: "Customer service spends the day answering tracking questions by phone and email.", fix: "Live tracking pages and an agent that answers status questions instantly." },
      { title: "Paperwork by hand", description: "Bills of lading, invoices and customs forms get re-typed into several systems.", fix: "Document agents read, check and enter shipping paperwork for review." },
      { title: "Dispatch on whiteboards", description: "Planning lives in a spreadsheet and one person's head.", fix: "Dispatch tools that suggest routes and loads, and let planners adjust." },
      { title: "Drivers without tools", description: "Drivers juggle calls, paper proof of delivery and several apps.", fix: "One driver app for jobs, navigation, photos and signatures, working offline." },
      { title: "Data you can't see", description: "Carriers, telematics and warehouse systems each hold part of the picture.", fix: "Integrations that bring every feed into one live operations view." },
      { title: "Exceptions found late", description: "Delays are spotted when the customer calls, not when they happen.", fix: "Alerts that flag late, damaged or stuck shipments as soon as the data shows it." },
    ],
    solutionsTitle: "What we build for logistics.",
    solutions: [
      { title: "Live tracking", description: "Branded tracking pages, ETAs and proactive notifications by SMS and WhatsApp.", icon: "globe", service: "custom-development" },
      { title: "Document agents", description: "Read bills of lading, invoices and customs forms, and enter them for review.", icon: "bot", service: "ai-as-a-service" },
      { title: "Dispatch and planning", description: "Job allocation, route suggestions and load planning your planners can adjust.", icon: "workflow", service: "custom-development" },
      { title: "Driver apps", description: "Jobs, navigation, proof of delivery and offline mode in one simple app.", icon: "smartphone", service: "fixed-price" },
      { title: "Operations dashboards", description: "One live view of shipments, fleet, exceptions and SLAs.", icon: "gauge", service: "dedicated-developers" },
      { title: "Customer service agents", description: "Answer tracking, rebooking and claims questions on every channel.", icon: "message-square", service: "ai-as-a-service" },
    ],
    help: [
      { service: "ai-as-a-service", headline: "Agents for paperwork and questions", description: "Document and customer agents take the repetitive work off your ops and service teams.", points: ["Reads PDFs, emails and scans", "Confidence scores and review queues", "Run as a monthly service"] },
      { service: "custom-development", headline: "Tracking and dispatch platforms", description: "Bespoke tools where off-the-shelf TMS software doesn't match how you operate.", points: ["Telematics and carrier integrations", "Maps and route logic", "Built for real volumes"] },
      { service: "fixed-price", headline: "A driver app at a fixed price", description: "Well-scoped apps like proof of delivery and job lists, priced up front.", points: ["Offline-first", "Photos and signatures", "Launch support"] },
      { service: "dedicated-developers", headline: "Engineers for your platform", description: "Grow your in-house team with developers who've built logistics systems.", points: ["Integration-heavy experience", "Monthly terms", "Your tools and process"] },
    ],
    compliance: [
      { name: "GDPR / UK GDPR", scope: "UK & EU", description: "Driver and recipient data handled lawfully, with location data kept to what's needed." },
      { name: "Customs data", scope: "UK, EU & UAE", description: "Accurate declarations and document records for CDS, ICS2 and UAE customs systems." },
      { name: "eCMR & e-documents", scope: "EU", description: "Digital consignment notes and records designed to the eFTI direction of travel." },
      { name: "Tachograph & working time", scope: "UK & EU", description: "Driver hours respected in planning tools, with data your compliance team can check." },
      { name: "ISO 27001 alignment", scope: "Security", description: "Access control, logging and change management aligned with ISO 27001 practices." },
      { name: "Dangerous goods (ADR)", scope: "UK & EU", description: "Flags and documents for hazardous loads built into booking and dispatch." },
    ],
    tech: [
      { label: "Maps and tracking", engineering: "backend-engineering", items: ["Google Maps Platform", "Mapbox", "Samsara / Webfleet APIs", "PostGIS"] },
      { label: "AI and documents", engineering: "ai-engineering", items: ["Claude", "OpenAI", "Document AI", "Twilio"] },
      { label: "Apps and cloud", engineering: "mobile-engineering", items: ["Flutter", "React Native", "AWS", "Kafka"] },
    ],
    faqs: [
      { question: "Can you integrate with our TMS or WMS?", answer: "Usually, yes. We work with APIs, EDI and file feeds. If a system has none of these, we'll find the safest workable route." },
      { question: "Will the driver app work without signal?", answer: "Yes. We build offline-first, so jobs, photos and signatures sync when the connection comes back." },
      { question: "How accurate is a document agent?", answer: "It depends on the documents, so we measure it on your real samples first. Anything below the confidence threshold goes to a person to check." },
      { question: "Can we brand the tracking page?", answer: "Yes. Tracking pages and notifications carry your brand, domain and tone." },
      { question: "Do you replace our existing software?", answer: "Rarely. Most projects connect what you already run and add the missing pieces around it." },
      { question: "How fast can we see results?", answer: "A first agent or tracking page is often live within four to six weeks, with weekly demos along the way." },
    ],
    cta: {
      title: { light: "Fewer calls about parcels.", bold: "More parcels delivered." },
      subtitle: "Free 30-minute strategy call · NDA on request · Proposal within 48 hours",
      button: "Talk to a logistics lead",
    },
    engagement: "Custom Development",
  },

  /* ---------------------------------------------------------------- */
  {
    slug: "hospitality-travel",
    hero: {
      title: { light: "Hospitality tech that feels like", bold: "great service." },
      subtitle:
        "Hotels, retreats, concierge and travel. We build direct booking, guest agents and operations tools, so your team spends more time with guests and less with screens.",
      tags: ["Hotels", "Retreats", "Concierge", "Direct booking", "Travel"],
    },
    highlights: ["Direct booking", "Guest concierge agents", "Ops tools"],
    problemsTitle: "What pulls teams away from guests.",
    problems: [
      { title: "Commission on every booking", description: "Online travel agents take a large share of each reservation.", fix: "A fast direct booking site with offers that make booking direct worth it." },
      { title: "Same questions, all day", description: "Check-in times, parking, transfers and menus, asked again and again.", fix: "A guest concierge agent that answers instantly in the guest's language." },
      { title: "Tools that don't connect", description: "PMS, channel manager, POS and messaging each hold part of the guest story.", fix: "Integrations that give staff one view of each guest." },
      { title: "Upsells left on the table", description: "Transfers, spa slots and room upgrades are rarely offered at the right moment.", fix: "Timely, personal offers before and during the stay." },
      { title: "Reviews go unanswered", description: "Replying well to every review takes time nobody has.", fix: "Drafted replies in your voice for a manager to approve in seconds." },
      { title: "Seasonal staff turnover", description: "New staff need to learn systems and standards quickly.", fix: "Simple internal tools and an assistant that knows your procedures." },
    ],
    solutionsTitle: "What we build for hospitality and travel.",
    solutions: [
      { title: "Direct booking engines", description: "Fast booking with packages, add-ons and payments, connected to your PMS.", icon: "globe", service: "custom-development" },
      { title: "Guest concierge agents", description: "Answer questions, take requests and book extras on WhatsApp and web.", icon: "bot", service: "ai-as-a-service" },
      { title: "Retreat and experience platforms", description: "Programmes, schedules, payments and guest communication in one place.", icon: "heart", service: "venture-studio" },
      { title: "Operations tools", description: "Housekeeping, maintenance and shift tools that work on any phone.", icon: "workflow", service: "fixed-price" },
      { title: "Review and reputation assistants", description: "Draft replies and spot trends across review sites.", icon: "message-square", service: "ai-as-a-service" },
      { title: "Travel and itinerary apps", description: "Itineraries, bookings and trip updates in a mobile app guests keep.", icon: "smartphone", service: "dedicated-developers" },
    ],
    help: [
      { service: "ai-as-a-service", headline: "A concierge that never sleeps", description: "Guest agents handle questions and requests around the clock, and pass the rest to your team.", points: ["Multilingual", "Connected to PMS and bookings", "Hands over to staff for anything personal"] },
      { service: "venture-studio", headline: "Launch a hospitality brand", description: "For owners and investors opening a retreat, hotel or experience: brand, website, booking and marketing, run for you.", points: ["Brand and website", "Google listings and campaigns", "Direct booking from day one"] },
      { service: "custom-development", headline: "Booking and guest platforms", description: "Direct booking, packages and guest apps built around your properties.", points: ["PMS and channel manager integrations", "Payments and deposits", "Fast on mobile"] },
      { service: "fixed-price", headline: "Operations tools at a fixed price", description: "Housekeeping, maintenance and staff tools scoped and priced up front.", points: ["One agreed scope and price", "Works on any phone", "Launch support included"] },
    ],
    compliance: [
      { name: "PCI DSS", scope: "Payments", description: "Deposits and card guarantees through tokenised providers, keeping card data out of scope." },
      { name: "GDPR / UK GDPR", scope: "UK & EU", description: "Guest profiles, marketing consent and retention handled lawfully." },
      { name: "Package Travel Regulations", scope: "UK & EU", description: "Clear information and protections when selling bundled travel." },
      { name: "WCAG 2.2 AA", scope: "Accessibility", description: "Booking journeys and guest apps that work for everyone." },
      { name: "UAE PDPL", scope: "UAE", description: "Guest data handled to UAE data protection law, hosted locally where needed." },
      { name: "Tourism registration", scope: "UAE", description: "Holiday home and tourism permit details shown where local rules require them." },
    ],
    tech: [
      { label: "Booking and PMS", engineering: "backend-engineering", items: ["Mews", "Cloudbeds", "SiteMinder", "Stripe"] },
      { label: "AI and messaging", engineering: "ai-engineering", items: ["Claude", "OpenAI", "WhatsApp Business API", "Twilio"] },
      { label: "Web and apps", engineering: "web-engineering", items: ["Next.js", "Flutter", "Sanity", "Vercel"] },
    ],
    faqs: [
      { question: "Can the concierge agent make bookings?", answer: "Yes, for things you allow: restaurant slots, spa treatments, transfers and extras. Anything unusual goes to your team." },
      { question: "Will a direct booking site really cut OTA commission?", answer: "It shifts a share of bookings direct when the site is fast and the offer is better. We track the direct share from launch so you can see the effect." },
      { question: "Which PMS systems do you work with?", answer: "We've integrated with several modern PMS and channel managers through their APIs. We confirm yours in the first week." },
      { question: "Can you launch a retreat business for us?", answer: "Yes. Our Venture Studio handles brand, website, booking, listings and marketing for new hospitality ventures." },
      { question: "Does the agent speak other languages?", answer: "Yes. Guest agents reply in the guest's language and can switch mid-conversation." },
      { question: "What happens after launch?", answer: "We stay. Monitoring, fixes and improvements continue with the same team that built it." },
    ],
    cta: {
      title: { light: "More direct bookings.", bold: "Happier guests." },
      subtitle: "Free 30-minute strategy call · NDA on request · Proposal within 48 hours",
      button: "Talk to a hospitality lead",
    },
    engagement: "Venture Studio",
  },
];

export const sectorPageBySlug = (slug: string) => sectorPages.find((s) => s.slug === slug);
