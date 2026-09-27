import { routes } from "./taxonomy";
import type { CtaBlock, Faq, Feature, IconName, Link, Metric, SplitTitle } from "./types";
import type { StartBlock } from "./services";

/**
 * Content for /agents (VAUG Agents).
 * The console script is illustrative: it shows the kind of work an agent does,
 * not a real client conversation.
 */

/** One step of the animated console: a chat line, a tool call or a system update. */
export type ConsoleEvent =
  | { kind: "customer"; text: string }
  | { kind: "agent"; text: string }
  | { kind: "tool"; tool: string; detail: string }
  | { kind: "update"; system: string; detail: string }
  | { kind: "handoff"; detail: string };

export interface ConsoleScript {
  agent: string;
  channel: string;
  icon: IconName;
  events: ConsoleEvent[];
  /** Counters shown in the side panel after the script ends. */
  outcome: { label: string; value: string }[];
}

export interface AgentType {
  slug: string;
  name: string;
  icon: IconName;
  summary: string;
  tasks: string[];
  channels: string[];
  /** Trigger → steps → outcome, shown as a small flow. */
  flow: { trigger: string; steps: string[]; outcome: string };
  kpis: Metric[];
}

export interface AgentsPageContent {
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  title: SplitTitle;
  subtitle: string;
  primary: Link;
  secondary: Link;
  tags: string[];
  console: ConsoleScript[];
  ticker: string[];
  facts: Metric[];
  typesTitle: string;
  typesSubtitle: string;
  types: AgentType[];
  processTitle: string;
  processSubtitle: string;
  process: Feature[];
  guardrailsTitle: string;
  guardrailsSubtitle: string;
  guardrails: Feature[];
  approvalQueue: { action: string; reason: string; agent: string }[];
  integrationsTitle: string;
  integrationsSubtitle: string;
  integrations: { label: string; items: string[] }[];
  responsibleTitle: string;
  responsibleSubtitle: string;
  compare: { left: { title: string; items: string[] }; right: { title: string; items: string[] } };
  caseStudiesTitle: string;
  start: StartBlock;
  related: { label: string; short: string; href: string; icon: IconName }[];
  faqs: Faq[];
  cta: CtaBlock;
}

export const agentsPage: AgentsPageContent = {
  metaTitle: "VAUG Agents: AI agents that do real work",
  metaDescription:
    "VAUG builds, hosts and improves AI agents for support, sales, WhatsApp and voice, finance, operations and documents, with humans in the loop and guardrails built in.",
  eyebrow: "VAUG Agents",
  title: { light: "AI agents that answer, qualify and reconcile,", bold: "while your team does the real work." },
  subtitle:
    "We design agents around your workflows, connect them to your CRM, inbox, WhatsApp and ERP, and run them for you. Every action is logged, every risky step goes to a person, and they get better every month.",
  primary: { label: "Find your first agent", href: "#contact" },
  secondary: { label: "AI as a Service", href: routes.service("ai-as-a-service") },
  tags: ["Support", "Sales", "WhatsApp & voice", "Finance", "Operations", "Documents"],

  console: [
    {
      agent: "Support Agent",
      channel: "WhatsApp",
      icon: "message-square",
      events: [
        { kind: "customer", text: "Hi, my order #4821 hasn't arrived. Can I get a refund?" },
        { kind: "tool", tool: "shopify.get_order", detail: "#4821 · shipped 3 days ago · courier delayed" },
        { kind: "agent", text: "Sorry about that. Your parcel is delayed with the courier. I can refund you now or send a free replacement today. Which would you prefer?" },
        { kind: "customer", text: "Refund please." },
        { kind: "handoff", detail: "Refund for #4821 sent to Sam to approve" },
        { kind: "update", system: "Zendesk", detail: "Ticket #4821 resolved · tagged courier-delay" },
      ],
      outcome: [
        { label: "Resolved", value: "38s" },
        { label: "Human time", value: "4s" },
      ],
    },
    {
      agent: "Lead Qualifier",
      channel: "Web chat",
      icon: "trending-up",
      events: [
        { kind: "customer", text: "We're a 40-person logistics firm looking at automating invoice matching." },
        { kind: "tool", tool: "enrich.company", detail: "Freight · 40 staff · Rotterdam · uses Xero" },
        { kind: "agent", text: "That's a great fit. Roughly how many invoices do you process a month, and who signs off exceptions today?" },
        { kind: "customer", text: "About 3,000. Our finance lead does it all by hand." },
        { kind: "update", system: "HubSpot", detail: "Lead scored 86 · stage: Qualified · owner assigned" },
        { kind: "tool", tool: "calendar.book", detail: "Discovery call booked · Thu 10:30 GMT" },
      ],
      outcome: [
        { label: "Lead score", value: "86" },
        { label: "Call booked", value: "Thu" },
      ],
    },
    {
      agent: "Finance Agent",
      channel: "Back office",
      icon: "database",
      events: [
        { kind: "tool", tool: "bank.fetch", detail: "1,204 transactions imported" },
        { kind: "tool", tool: "xero.match", detail: "1,161 matched to invoices automatically" },
        { kind: "agent", text: "43 exceptions found. 37 are partial payments; I've drafted journal entries. 6 look like duplicates." },
        { kind: "handoff", detail: "6 possible duplicate payments sent to Priya for review" },
        { kind: "update", system: "Xero", detail: "37 draft journals created · awaiting approval" },
      ],
      outcome: [
        { label: "Matched", value: "96%" },
        { label: "Flagged", value: "6" },
      ],
    },
  ],

  ticker: ["Answer customers", "Qualify leads", "Book appointments", "Match invoices", "Chase payments", "Update the CRM", "Read documents", "Route tickets"],

  facts: [
    { value: "2 wks", label: "typical time to a first agent in shadow mode" },
    { value: "100%", label: "of agent actions logged and reviewable" },
    { value: "24/7", label: "across chat, email, WhatsApp and voice" },
    { value: "Monthly", label: "improvements included in every plan" },
  ],

  typesTitle: "Agents We Build.",
  typesSubtitle: "Six families of agents cover most of the repetitive work in a business. Pick one to see how it runs.",
  types: [
    {
      slug: "support",
      name: "Customer support",
      icon: "message-square",
      summary: "Answers questions, tracks orders, handles returns and escalates what needs a person, in your tone of voice.",
      tasks: ["Order status and tracking", "Returns and refunds", "Account and billing questions", "Policy and FAQ answers", "Ticket triage and tagging"],
      channels: ["Web chat", "Email", "WhatsApp", "Instagram", "Zendesk", "Intercom"],
      flow: { trigger: "Customer message arrives", steps: ["Identify customer and order", "Search policies and history", "Draft or send the answer", "Escalate refunds over the limit"], outcome: "Ticket resolved and tagged" },
      kpis: [{ value: "60–70%", label: "tickets resolved without a human" }, { value: "< 30s", label: "first response" }],
    },
    {
      slug: "sales",
      name: "Sales & lead qualification",
      icon: "trending-up",
      summary: "Replies to every enquiry in seconds, asks the right questions, scores the lead and books the call.",
      tasks: ["Instant first reply", "Qualification questions", "Company enrichment", "Lead scoring and routing", "Meeting booking and reminders"],
      channels: ["Web forms", "Web chat", "Email", "LinkedIn", "HubSpot", "Salesforce"],
      flow: { trigger: "New enquiry or form fill", steps: ["Enrich company details", "Ask qualifying questions", "Score against your criteria", "Book with the right rep"], outcome: "Qualified lead in the CRM" },
      kpis: [{ value: "Seconds", label: "to first reply, day or night" }, { value: "100%", label: "of leads followed up" }],
    },
    {
      slug: "voice-whatsapp",
      name: "Voice & WhatsApp",
      icon: "smartphone",
      summary: "Takes bookings, confirms appointments and answers calls and WhatsApp messages in several languages.",
      tasks: ["Bookings and rescheduling", "Appointment reminders", "Inbound call answering", "Missed-call follow-up", "Upsells and confirmations"],
      channels: ["WhatsApp Business", "Phone (Twilio)", "SMS", "Google Business messages", "Booking systems"],
      flow: { trigger: "Call or WhatsApp message", steps: ["Understand the request", "Check live availability", "Confirm and take payment", "Send reminder the day before"], outcome: "Booking in the calendar" },
      kpis: [{ value: "24/7", label: "bookings in several languages" }, { value: "Fewer", label: "no-shows with reminders" }],
    },
    {
      slug: "finance",
      name: "Finance & reconciliation",
      icon: "database",
      summary: "Matches payments to invoices, chases late payers, drafts journals and flags anything odd for review.",
      tasks: ["Bank-to-invoice matching", "Exception handling", "Payment reminders", "Expense categorisation", "Month-end checklists"],
      channels: ["Xero", "QuickBooks", "NetSuite", "Stripe", "Bank feeds", "Email"],
      flow: { trigger: "New bank transactions", steps: ["Match to open invoices", "Classify exceptions", "Draft journal entries", "Send anomalies for approval"], outcome: "Books reconciled for sign-off" },
      kpis: [{ value: "90%+", label: "transactions matched automatically" }, { value: "Hours", label: "not days, to close the month" }],
    },
    {
      slug: "operations",
      name: "Operations & back office",
      icon: "workflow",
      summary: "Moves data between systems, updates records, routes work and keeps everyone informed.",
      tasks: ["CRM and ERP updates", "Order and shipment tracking", "Supplier follow-ups", "Internal reporting", "Task routing and reminders"],
      channels: ["Slack", "Teams", "Google Sheets", "Airtable", "ERP", "Email"],
      flow: { trigger: "Status change or schedule", steps: ["Read the source system", "Apply your business rules", "Update the other systems", "Notify the right person"], outcome: "Systems in sync, nobody retyping" },
      kpis: [{ value: "Hours", label: "of copy-paste removed weekly" }, { value: "Fewer", label: "manual data errors" }],
    },
    {
      slug: "documents",
      name: "Document processing",
      icon: "file-check",
      summary: "Reads invoices, contracts, claims and forms, pulls out the data and checks it against your rules.",
      tasks: ["Invoice and receipt capture", "Contract clause extraction", "Claims and form intake", "ID and KYC checks", "Summaries for sign-off"],
      channels: ["Email inbox", "Upload portal", "Google Drive", "SharePoint", "DMS", "ERP"],
      flow: { trigger: "Document received", steps: ["Classify the document", "Extract the fields", "Validate against rules", "Queue low-confidence items"], outcome: "Clean data in your system" },
      kpis: [{ value: "Minutes", label: "not hours, per batch" }, { value: "Every", label: "low-confidence field reviewed" }],
    },
  ],

  processTitle: "How an Agent Project Runs.",
  processSubtitle: "Five stages, a demo every week, and nothing goes live until it has proved itself on your real work.",
  process: [
    { title: "Audit", description: "We shadow your team, measure where hours go and pick the workflow with the clearest payback.", meta: "Week 1", icon: "search" },
    { title: "Build", description: "Agent, knowledge, integrations and guardrails, demoed to you as they grow.", meta: "Weeks 2–3", icon: "hammer" },
    { title: "Shadow run", description: "The agent drafts, your team approves. We measure accuracy on real cases.", meta: "Weeks 3–4", icon: "users" },
    { title: "Launch", description: "It goes live on the tasks it has earned. People keep the edge cases.", meta: "Week 5", icon: "rocket" },
    { title: "Improve", description: "Monthly reviews, new skills and new workflows, reported every Friday.", meta: "Monthly", icon: "trending-up" },
  ],

  guardrailsTitle: "Humans in the Loop. Guardrails by Design.",
  guardrailsSubtitle: "An agent is only useful if you can trust it. These controls come as standard.",
  guardrails: [
    { title: "Approval thresholds", description: "Refunds, discounts, payments and anything above your limits wait for a person.", icon: "users" },
    { title: "Grounded answers", description: "Agents answer from your approved knowledge and systems, and say so when they don't know.", icon: "search" },
    { title: "Full audit trail", description: "Every message, tool call and decision is logged with who approved what.", icon: "file-check" },
    { title: "Scoped permissions", description: "Each agent can only read and write what its job needs. Nothing more.", icon: "shield" },
    { title: "Evaluations before release", description: "Changes are tested against real past cases before they reach customers.", icon: "gauge" },
    { title: "Instant off-switch", description: "Pause any agent or skill in one click, and fall back to your team.", icon: "zap" },
  ],
  approvalQueue: [
    { action: "Refund on order #4821", reason: "Above auto-refund limit", agent: "Support Agent" },
    { action: "10% discount offer", reason: "Enterprise lead, needs sales sign-off", agent: "Lead Qualifier" },
    { action: "Mark 6 payments duplicate", reason: "Low-confidence match", agent: "Finance Agent" },
  ],

  integrationsTitle: "Works Where Your Work Already Lives.",
  integrationsSubtitle: "Agents plug into the tools you use today. No migration, no new inbox to check.",
  integrations: [
    { label: "CRM & sales", items: ["HubSpot", "Salesforce", "Pipedrive", "Zoho", "Close"] },
    { label: "Messaging & voice", items: ["WhatsApp Business", "Twilio", "Intercom", "Slack", "Teams"] },
    { label: "Email & calendars", items: ["Gmail", "Outlook", "Google Calendar", "Calendly", "Cal.com"] },
    { label: "Helpdesk", items: ["Zendesk", "Freshdesk", "Gorgias", "Help Scout", "Front"] },
    { label: "Finance & ERP", items: ["Xero", "QuickBooks", "NetSuite", "SAP", "Stripe"] },
    { label: "Commerce & data", items: ["Shopify", "WooCommerce", "Airtable", "Google Sheets", "PostgreSQL"] },
  ],

  responsibleTitle: "Responsible AI, in Plain English.",
  responsibleSubtitle: "We decide with you, in writing, what the agent does on its own and what always stays with a person.",
  compare: {
    left: {
      title: "What the agent does",
      items: [
        "Answers routine questions from approved knowledge",
        "Looks up orders, bookings, invoices and records",
        "Drafts replies, journals and summaries",
        "Updates your CRM, helpdesk and spreadsheets",
        "Books meetings and sends reminders",
        "Flags anything unusual for review",
      ],
    },
    right: {
      title: "What stays with your people",
      items: [
        "Refunds, credits and payments above your limits",
        "Complaints, sensitive or emotional conversations",
        "Discount exceptions and contract terms",
        "Medical, legal or financial advice",
        "Hiring, firing and anything about staff",
        "Final sign-off on month-end and reporting",
      ],
    },
  },

  caseStudiesTitle: "Agents in Production.",

  start: {
    title: { light: "Three steps", bold: "to your first live agent." },
    subtitle: "Start with one workflow. The agent proves itself on your real work before it ever answers a customer on its own.",
    options: [
      { name: "Agent discovery call", icon: "search", timeline: "This week", what: "We map where your team loses hours and pick the workflow with the clearest payback.", get: ["Ranked list of agent opportunities", "Expected accuracy and payback", "The integrations you'd need"] },
      { name: "Shadow-mode pilot", icon: "bot", timeline: "3–4 weeks", what: "One agent drafts replies and actions on live work while your team approves each one. We measure everything.", get: ["A working agent on your channel", "Accuracy report on real cases", "Go-live recommendation"], highlight: true },
      { name: "Managed agents", icon: "workflow", timeline: "Monthly subscription", what: "Live agents hosted and watched by us, improved every month and extended to new workflows as they prove out.", get: ["Hosting, monitoring and alerts", "Human approval on risky steps", "Monthly improvements"] },
    ],
    commitments: ["Proposal within 48 hours", "Every action logged", "You own your data and prompts", "NDA on request"],
  },

  related: [
    { label: "AI as a Service", short: "How the subscription works: audit, build, hosting and monthly improvements.", href: routes.service("ai-as-a-service"), icon: "bot" },
    { label: "AI Engineering", short: "The engineering behind our agents: RAG, evaluations, tooling and LLM apps.", href: routes.engineeringPage("ai-engineering"), icon: "brain" },
    { label: "Security & compliance", short: "How we protect your data, access and audit trails.", href: routes.security, icon: "shield" },
  ],

  faqs: [
    { question: "What's the difference between a chatbot and a VAUG agent?", answer: "A chatbot answers questions. An agent also acts: it looks up the order, issues the refund (with approval), updates the CRM and books the call. It works across your systems, not just in a chat window." },
    { question: "Which AI models do you use?", answer: "Whichever fits the job: Claude, GPT, Gemini or open models like Llama and Mistral. We choose per task for quality, cost and data residency, and can switch without rebuilding." },
    { question: "Is our data used to train models?", answer: "No. We use enterprise model APIs that don't train on your data, or host open models privately. Data stays in UK or EU regions by default." },
    { question: "What if the agent gets something wrong?", answer: "Risky actions need approval, low-confidence answers go to a person, and every action is logged. When something slips through, we fix the cause and add it to the test set so it doesn't happen again." },
    { question: "How long until an agent is live?", answer: "Most first agents run in shadow mode within two weeks and go live around week five, once they've proved themselves on your real work." },
    { question: "Do we need technical staff?", answer: "No. We build, host and maintain everything. Your team just approves, reviews and tells us what to improve." },
    { question: "Can you build agents inside our own product?", answer: "Yes. Through Custom Development or AI Engineering we build agent features into your SaaS or app, which you then own and run." },
  ],

  cta: {
    title: { light: "Every repetitive task is a job", bold: "an agent could do today." },
    subtitle: "Free workflow review · NDA on request · Proposal within 48 hours",
    button: "Find your first agent",
  },
};
