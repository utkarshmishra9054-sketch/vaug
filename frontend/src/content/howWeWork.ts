import type { CtaBlock, Faq, Feature } from "./types";
import type { CompanyHero } from "./company";

/** How We Work page. */

export interface CycleStage {
  title: string;
  description: string;
  outputs: string[];
}

export const howWeWork = {
  metaDescription:
    "How VAUG runs projects: diagnose first, one accountable lead, weekly demos, a Friday update and AI speed with human review. From first call to kickoff in days.",
  hero: {
    eyebrow: "How we work",
    title: { light: "Clear scope. Weekly proof.", bold: "Software that holds up." },
    subtitle:
      "Every VAUG project runs on the same rhythm: diagnose first, agree the outcome, show working software every week and stay after launch.",
    tags: ["Diagnose first", "Weekly demos", "Friday update", "One accountable lead"],
  } satisfies CompanyHero,

  /** Lines in the hero's Friday update mock. */
  heroUpdate: [
    { label: "Shipped", text: "Checkout flow and order emails, live on staging" },
    { label: "Next", text: "Refund agent and admin reports" },
    { label: "Risk", text: "Payment provider approval, chasing Monday" },
    { label: "Need from you", text: "Sign-off on the pricing page copy" },
  ],

  philosophy: {
    eyebrow: "Our philosophy",
    title: "Most projects fail quietly, long before launch.",
    body: [
      "They fail when nobody questions the brief, when progress lives in status reports instead of software, and when the team that built it disappears the week after go-live.",
      "So we start by diagnosing the real problem, we show working software every single week, and we stay on to measure what happens next. AI makes us faster. Engineering discipline makes that speed safe.",
    ],
    highlight: "we show working software every single week",
  },

  commitmentsTitle: "Six commitments on every project.",
  commitments: [
    { title: "One accountable lead", description: "A single senior person owns your project, answers your questions and never passes you around.", icon: "handshake" },
    { title: "Weekly demos", description: "Working software on screen every week, so you judge progress by what you can click.", icon: "rocket" },
    { title: "A Friday update", description: "A short written note every Friday: what shipped, what's next, risks and decisions we need.", icon: "message-square" },
    { title: "Your code, your accounts", description: "Repositories, cloud and third-party accounts are in your name from week one.", icon: "database" },
    { title: "No surprise invoices", description: "Changes are scoped and priced before any work starts. Fixed means fixed.", icon: "file-check" },
    { title: "We stay after launch", description: "Monitoring, fixes and improvements, with a care plan agreed before go-live.", icon: "shield" },
  ] satisfies Feature[],

  preTitle: "From first call to kickoff.",
  preSubtitle: "Eight steps, usually done in one to two weeks. Nothing is signed until you've seen a clear scope and price.",
  pre: [
    { title: "First call", meta: "30 minutes, free", description: "Tell us what you want to build or automate. We ask a lot of questions and tell you honestly if we're the right fit." },
    { title: "NDA", meta: "Same day", description: "If you want one, we sign an NDA before you share anything sensitive. Ours or yours." },
    { title: "Discovery", meta: "2–5 days", description: "We look at your workflows, users, existing code and data, and find where the real value is." },
    { title: "Consultation", meta: "1 session", description: "We walk you through what we found, the options and trade-offs, and what we'd do first." },
    { title: "Scope", meta: "Written", description: "A clear list of what's in, what's out, milestones and what done looks like." },
    { title: "Proposal", meta: "Within 48 hours", description: "Team, timeline, engagement model and price. Fixed-price or monthly, no hidden extras." },
    { title: "Contract", meta: "Plain English", description: "IP assignment to you, confidentiality, data processing terms and payment milestones." },
    { title: "Kickoff", meta: "Week 1", description: "Meet the squad, set up shared channels and accounts, agree the demo day and start building." },
  ] satisfies Feature[],

  cycleTitle: "The delivery cycle, every week.",
  cycleSubtitle: "Five stages on a loop. Each lap ends with working software and a written update.",
  cycle: [
    { title: "Align", description: "Agree this week's goals with you, based on last week's demo and what we learned.", outputs: ["Weekly goals", "Priorities", "Risks"] },
    { title: "Build", description: "Senior engineers build, with AI tools for speed and clear standards for quality.", outputs: ["Features", "Tests", "Pull requests"] },
    { title: "Validate", description: "Code review, automated tests and QA on every change. AI output gets a human check.", outputs: ["Reviews", "Test runs", "QA notes"] },
    { title: "Release", description: "Small, safe releases to staging or production, with rollback ready.", outputs: ["Demo", "Release notes", "Deploy"] },
    { title: "Improve", description: "We watch metrics and feedback, and turn what we learn into next week's plan.", outputs: ["Metrics", "Feedback", "Friday update"] },
  ] satisfies CycleStage[],

  qualityTitle: "Our quality checklist.",
  qualitySubtitle: "Nothing reaches production without passing these nine checks.",
  quality: [
    "Peer code review on every pull request",
    "Automated tests run in CI before any merge",
    "Accessibility checked against WCAG 2.2 AA",
    "Performance budgets for page speed and API latency",
    "Security scan for dependencies and secrets",
    "AI features tested with evals and edge cases",
    "Staging demo signed off by you",
    "Monitoring and alerts set up before launch",
    "Handover docs and runbooks written as we go",
  ],

  compareTitle: "Where AI helps, and where people decide.",
  compareSubtitle: "We use AI across the whole lifecycle. We never let it make the calls that matter.",
  compare: {
    left: {
      title: "AI accelerates",
      items: [
        "First drafts of boilerplate, tests and migrations",
        "Reading large, unfamiliar codebases quickly",
        "Generating test data and edge cases",
        "Drafting documentation and release notes",
        "Spotting likely bugs and code smells",
        "Research and comparison of libraries and APIs",
      ],
    },
    right: {
      title: "Humans review and decide",
      items: [
        "Architecture, data models and security design",
        "Every line of code before it merges",
        "What ships, and when",
        "Anything touching payments, health or personal data",
        "Trade-offs discussed with you",
        "Final QA and sign-off before release",
      ],
    },
  },

  modelsTitle: "Six services. One way of working.",
  modelsSubtitle: "The same AI-first delivery, whichever service fits. Pick one, or combine them.",

  contactTitle: "Tell us what you're planning.",

  faqs: [
    { question: "How quickly can you start?", answer: "Most projects kick off within one to two weeks of the first call. Dedicated developers can often start within days." },
    { question: "Who will I talk to day to day?", answer: "One accountable lead, who is senior, technical enough to answer real questions, and responsible for your project from kickoff to after launch." },
    { question: "What happens if my requirements change?", answer: "We scope the change, tell you the effect on time and cost, and only start once you agree. On a fixed-price build the original scope and price never move." },
    { question: "Do you use AI to write the code?", answer: "We use AI tools to move faster, then review every line. Architecture, security and anything sensitive is designed and checked by senior engineers." },
    { question: "Who owns the code and IP?", answer: "You do. Our contracts assign IP to you, and the code lives in your repositories from the first week." },
    { question: "How do you report progress?", answer: "A live demo every week and a short written update every Friday: shipped, next, risks and decisions needed. You also get access to the board and repository." },
    { question: "Can you work with our in-house team?", answer: "Yes. We regularly join existing teams, follow their processes and tools, and share our demo and update rhythm if it helps." },
    { question: "What happens after launch?", answer: "We agree a care plan before go-live: monitoring, fixes, updates and improvements, on a monthly plan or as needed." },
  ] satisfies Faq[],

  cta: {
    title: { light: "See how we'd run", bold: "your project." },
    subtitle: "Free 30-minute strategy call · NDA on request · Proposal within 48 hours",
    button: "Book a call",
  } satisfies CtaBlock,
};
