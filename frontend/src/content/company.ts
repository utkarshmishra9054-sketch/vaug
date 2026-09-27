import type { CtaBlock, IconName, SplitTitle } from "./types";
import { routes } from "./taxonomy";

/**
 * Company pages: About, Culture and Team.
 * Careers, How We Work and Security live in their own files.
 * Anything that reads like a hard fact (numbers, names) is `placeholder: true`
 * and shows a DEMO badge in development until real content replaces it.
 */

/* ------------------------------------------------------------------ */
/* Shared shapes                                                       */
/* ------------------------------------------------------------------ */

export interface CompanyHero {
  eyebrow?: string;
  title: SplitTitle;
  subtitle: string;
  tags?: string[];
}

export interface InfoCard {
  label: string;
  title: string;
  description: string;
  icon: IconName;
  href: string;
  cta: string;
}

export interface Milestone {
  year: string;
  title: string;
  description: string;
  tags: string[];
  icon: IconName;
  /** Numbers or claims that still need confirming. */
  placeholder?: boolean;
}

export interface Value {
  title: string;
  description: string;
  /** One-line "what it looks like on a Tuesday". */
  inPractice: string;
}

export interface Pillar {
  word: string;
  title: string;
  description: string;
  icon: IconName;
  links: { label: string; href: string }[];
}

export interface CountStat {
  value: number;
  suffix: string;
  label: string;
  placeholder?: boolean;
}

export interface Ritual {
  title: string;
  cadence: string;
  description: string;
  icon: IconName;
}

export interface DayBeat {
  time: string;
  title: string;
  description: string;
  /** Which prop lights up in the scene. */
  scene: "standup" | "build" | "lunch" | "review" | "demo" | "update";
}

export interface Moment {
  title: string;
  caption: string;
  when: string;
  size: "lg" | "wide" | "tall" | "sm";
  tone: "purple" | "yellow" | "ink" | "paper";
  motif: "confetti" | "grid" | "rings" | "waves" | "bars" | "dots";
  placeholder?: boolean;
}

export interface Person {
  name: string;
  role: string;
  bio: string;
  initials: string;
  /** Two colours for the monogram gradient. */
  gradient: [string, string];
  focus: string[];
  placeholder?: boolean;
}

export interface Discipline {
  name: string;
  count: number;
  icon: IconName;
  description: string;
  roles: string[];
  href: string;
  placeholder?: boolean;
}

/* ------------------------------------------------------------------ */
/* About                                                               */
/* ------------------------------------------------------------------ */

export const about = {
  metaDescription:
    "VAUG builds AI agents and supplies senior engineering teams for startups, family offices, enterprises and agencies across the UK, Europe and the UAE. Operating since 2019.",
  hero: {
    eyebrow: "About VAUG",
    title: { light: "We build the agents and software", bold: "that keep businesses moving." },
    subtitle:
      "VAUG is a team of engineers, designers and AI specialists. Since 2019 we have shipped products, rescued prototypes and put agents to work for clients in the UK, Europe and the UAE.",
    tags: ["Since 2019", "Registered 2021", "UK · Europe · UAE", "Automate · Build · Scale"],
  } satisfies CompanyHero,

  intro: [
    {
      label: "Who we are",
      title: "A senior team you can actually reach.",
      description:
        "Engineers, designers, AI specialists and delivery leads who work as one team. Every project has one accountable lead, not a chain of account managers.",
      icon: "users",
      href: routes.team,
      cta: "Meet the team",
    },
    {
      label: "What we do",
      title: "Agents, products and the people to run them.",
      description:
        "We build AI agents that take repetitive work off your team, and we design, build and look after web, mobile and SaaS products, from fixed-price builds to full ventures.",
      icon: "layers",
      href: routes.services,
      cta: "See our services",
    },
    {
      label: "Why we exist",
      title: "Too much good work gets stuck.",
      description:
        "Ideas stall in slide decks, prototypes break at launch and teams drown in copy-paste. We exist to get that work moving and keep it moving.",
      icon: "zap",
      href: routes.howWeWork,
      cta: "How we work",
    },
  ] satisfies InfoCard[],

  vision: {
    label: "Vision",
    text: "A world where every business, not just the biggest, runs on software and agents that do the routine work well.",
  },
  mission: {
    label: "Mission",
    text: "Pair AI speed with engineering discipline to ship products and agents that earn their keep, then stay to keep them sharp.",
  },

  journeyIntro: {
    title: "From a small founding team to a studio that ships.",
    subtitle: "Seven years of building, learning and staying on after launch. Scroll the line.",
  },
  journey: [
    {
      year: "2019",
      title: "Operations start",
      description:
        "A small founding team takes on its first builds: websites, internal tools and MVPs for founders who needed something working, fast.",
      tags: ["Founding team", "First builds", "MVPs"],
      icon: "hammer",
    },
    {
      year: "2020",
      title: "First long-term clients",
      description:
        "One-off projects turn into retainers. The team goes remote-first and sets up the weekly demo and Friday update rhythm we still use.",
      tags: ["Retainers", "Remote-first", "Friday updates"],
      icon: "handshake",
    },
    {
      year: "2021",
      title: "Registered as a company",
      description: "VAUG is formally registered. Contracts, NDAs and IP assignment become standard on every engagement.",
      tags: ["Incorporated", "Standard contracts", "IP assignment"],
      icon: "briefcase",
    },
    {
      year: "2022",
      title: "Dedicated developers and first UK and European clients",
      description:
        "Clients ask for engineers who join their team by the month. The dedicated developer model is born, alongside our first clients in the UK and Europe.",
      tags: ["Dedicated developers", "UK", "Europe"],
      icon: "users",
    },
    {
      year: "2023",
      title: "Fixed-price and custom development practice",
      description:
        "We formalise discovery, scoping and fixed-price delivery, so founders can buy a clear outcome at a clear price.",
      tags: ["Discovery", "Fixed price", "Custom builds"],
      icon: "file-check",
    },
    {
      year: "2024",
      title: "AI agents practice and first UAE clients",
      description:
        "We start building agents that answer customers, qualify leads and move data between tools. Our first clients in the UAE come on board.",
      tags: ["AI agents", "Automation", "UAE"],
      icon: "bot",
    },
    {
      year: "2025",
      title: "Venture Studio and Launch & Rescue",
      description:
        "We start running whole ventures for founders and family offices, and launch a practice for fixing and shipping Lovable, Bolt and v0 prototypes.",
      tags: ["Venture Studio", "Launch & Rescue", "Family offices"],
      icon: "rocket",
    },
    {
      year: "2026",
      title: "Today",
      description:
        "A multi-disciplinary team shipping agents and products for clients across three regions, with more than 60 projects delivered.",
      tags: ["60+ projects", "3 regions", "6 engagement models"],
      icon: "sparkles",
      placeholder: true,
    },
  ] satisfies Milestone[],

  valuesTitle: "Ten things we hold ourselves to.",
  values: [
    { title: "Ownership", description: "If we built it, it's ours to fix. No hiding behind tickets or handoffs.", inPractice: "The lead who scoped it is the lead who answers for it." },
    { title: "Diagnose first", description: "We understand the problem before we sell a solution, even when the answer is \"don't build this\".", inPractice: "Discovery before code, every time." },
    { title: "Plain talk", description: "Short sentences, real numbers and bad news early. No jargon to hide behind.", inPractice: "A risk is raised the day we see it." },
    { title: "Ship weekly", description: "Progress you can click, not progress you're told about.", inPractice: "A demo every week, a written update every Friday." },
    { title: "AI speed, human judgement", description: "AI helps us move fast. People decide what ships.", inPractice: "Every AI-written line gets a human review." },
    { title: "Quality is the default", description: "Tests, reviews and monitoring are part of the job, not an upsell.", inPractice: "No merge without review and green checks." },
    { title: "Stay after launch", description: "Launch is the start of the useful part. We stick around to measure and improve.", inPractice: "Every build ends with a care plan, not a goodbye." },
    { title: "Your IP, your code", description: "Everything we build for you is yours, from day one, in your repositories.", inPractice: "Client-owned repos and accounts from week one." },
    { title: "Keep learning", description: "The tools change every month. We make time to keep up, and share what we learn.", inPractice: "A learning budget and a Thursday show-and-tell." },
    { title: "Be kind, be direct", description: "Respect for clients and colleagues, and the honesty to disagree well.", inPractice: "Feedback in the room, not behind it." },
  ] satisfies Value[],

  pillarsTitle: "Three words, one team.",
  pillarsSubtitle: "Our motto is our operating model. Most clients start with one pillar and grow into the others.",
  pillars: [
    {
      word: "Automate",
      title: "AI agents that do the routine work",
      description: "Agents that answer customers, qualify leads, reconcile data and update your CRM, hosted and improved by us.",
      icon: "bot",
      links: [
        { label: "VAUG Agents", href: routes.agents },
        { label: "AI as a Service", href: routes.service("ai-as-a-service") },
        { label: "AI Engineering", href: routes.engineeringPage("ai-engineering") },
      ],
    },
    {
      word: "Build",
      title: "Products engineered to last",
      description: "Web, mobile and SaaS products built by senior engineers, custom-quoted or fixed-price, with launch and rescue when you need it.",
      icon: "code",
      links: [
        { label: "Custom Development", href: routes.service("custom-development") },
        { label: "Fixed-Price Projects", href: routes.service("fixed-price") },
        { label: "Launch & Rescue", href: routes.service("launch-and-rescue") },
      ],
    },
    {
      word: "Scale",
      title: "Teams and ventures that grow with you",
      description: "Dedicated developers who join your team, or a studio that runs product, website and growth for your venture.",
      icon: "trending-up",
      links: [
        { label: "Dedicated Developers", href: routes.service("dedicated-developers") },
        { label: "Venture Studio", href: routes.service("venture-studio") },
        { label: "Who we serve", href: routes.whoWeServe },
      ],
    },
  ] satisfies Pillar[],

  statsTitle: "VAUG in numbers.",
  stats: [
    { value: 7, suffix: "+", label: "Years building", placeholder: false },
    { value: 60, suffix: "+", label: "Projects shipped", placeholder: true },
    { value: 40, suffix: "+", label: "People across disciplines", placeholder: true },
    { value: 12, suffix: "", label: "Countries served", placeholder: true },
  ] satisfies CountStat[],

  officesTitle: "Where to find us.",
  officesSubtitle: "Remote-first, with bases in three countries and clients across the UK, Europe and the UAE.",
  /** Points on the offices map. `hub` is where the connecting arcs start. */
  mapPins: [
    { label: "Bengaluru", lon: 77.6, lat: 13, kind: "office", hub: true },
    { label: "London", lon: -0.1, lat: 51.5, kind: "office" },
    { label: "New York", lon: -74, lat: 40.7, kind: "office" },
    { label: "Amsterdam", lon: 4.9, lat: 52.4, kind: "client" },
    { label: "Berlin", lon: 13.4, lat: 52.5, kind: "client" },
    { label: "Lisbon", lon: -9.1, lat: 38.7, kind: "client" },
    { label: "Dubai", lon: 55.3, lat: 25.2, kind: "client" },
  ] as { label: string; lon: number; lat: number; kind: "office" | "client"; hub?: boolean }[],

  cta: {
    title: { light: "Seven years in, we still reply to", bold: "every enquiry ourselves." },
    subtitle: "Free 30-minute strategy call · NDA on request · Proposal within 48 hours",
    button: "Talk to us",
  } satisfies CtaBlock,
};

/* ------------------------------------------------------------------ */
/* Culture                                                             */
/* ------------------------------------------------------------------ */

export const culture = {
  metaDescription:
    "How the VAUG team works together: remote-first, weekly demos, Friday updates, a learning budget and a strong bias for shipping.",
  hero: {
    eyebrow: "Culture",
    title: { light: "Serious about the craft.", bold: "Easy to work with." },
    subtitle:
      "We are remote-first, write things down, demo every week and make time to learn. It keeps the work good and the people around.",
    tags: ["Remote-first", "Demo days", "Learning budget", "Friday updates"],
  } satisfies CompanyHero,

  heroNotes: [
    { text: "Demo at 4pm, bring snacks", tone: "yellow" },
    { text: "Shipped: checkout v2", tone: "purple" },
    { text: "Pairing on the agent evals?", tone: "paper" },
    { text: "Friday update sent", tone: "ink" },
  ] as { text: string; tone: Moment["tone"] }[],

  dayTitle: "A day at VAUG.",
  daySubtitle: "No two days are the same, but the rhythm is. Press play, or pick a moment.",
  day: [
    { time: "09:30", title: "Stand-up, ten minutes max", description: "Each squad says what shipped, what's next and what's blocked. Blockers get an owner before the call ends.", scene: "standup" },
    { time: "10:00", title: "Deep work", description: "Notifications off, headphones on. Most of the real building happens in long, quiet blocks.", scene: "build" },
    { time: "13:00", title: "Lunch, away from the screen", description: "Calendars are blocked by default. Nobody books a meeting over lunch.", scene: "lunch" },
    { time: "14:30", title: "Code review and pairing", description: "Every change gets a second pair of eyes. Tricky ones get pairing, not long comment threads.", scene: "review" },
    { time: "16:00", title: "Client demo", description: "Working software on a shared screen. Clients click through it themselves and we note what changes.", scene: "demo" },
    { time: "17:30", title: "Written update", description: "What we did, what's next, what we need. On Fridays it goes to every client, in plain English.", scene: "update" },
  ] satisfies DayBeat[],

  ritualsTitle: "The rituals that keep us honest.",
  rituals: [
    { title: "Friday updates", cadence: "Every Friday", description: "A short written update to every client: shipped, next, risks, decisions needed.", icon: "message-square" },
    { title: "Demo days", cadence: "Every week", description: "Working software on screen. If it can't be demoed, it isn't done.", icon: "rocket" },
    { title: "Show-and-tell", cadence: "Thursdays", description: "Someone shares a tool, a trick or a failure. Twenty minutes, no slides required.", icon: "sparkles" },
    { title: "Learning budget", cadence: "Every year", description: "Money and time for courses, books, conferences and certifications you choose.", icon: "brain" },
    { title: "Remote-first", cadence: "Always", description: "Written by default, async where possible, and meetings with an agenda or not at all.", icon: "globe" },
    { title: "Post-launch reviews", cadence: "Every launch", description: "What went well, what hurt, what we change next time. Blameless and written down.", icon: "search" },
    { title: "Hack days", cadence: "Quarterly", description: "A day to build something just because. Several internal agents started here.", icon: "zap" },
    { title: "Offsites", cadence: "Twice a year", description: "The whole team in one place, to plan, argue kindly and eat well.", icon: "heart" },
  ] satisfies Ritual[],

  principlesTitle: "How we treat each other.",
  principles: [
    { title: "Write it down", body: "Decisions, specs and handovers live in writing, so nobody has to be in the room to know what happened." },
    { title: "Default to trust", body: "We hire adults and treat them like adults. Outcomes matter more than online status." },
    { title: "Disagree, then commit", body: "Argue the idea, not the person. Once we decide, we all push the same way." },
    { title: "Leave it better", body: "Every codebase, doc and process should be a little better after you've touched it." },
  ],

  momentsTitle: "Moments from the studio.",
  momentsSubtitle: "Photos coming soon. For now, the stories behind them.",
  moments: [
    { title: "The first 24/7 agent goes live", caption: "The whole team watched the first overnight conversations roll in. Nobody slept much.", when: "2024", size: "lg", tone: "purple", motif: "rings", placeholder: true },
    { title: "Hack day winner", caption: "An internal agent that writes our Friday update drafts. We still edit every one.", when: "Hack day", size: "tall", tone: "yellow", motif: "confetti", placeholder: true },
    { title: "Rescue in 9 days", caption: "A Bolt prototype, a launch date and a lot of coffee.", when: "2025", size: "tall", tone: "ink", motif: "bars", placeholder: true },
    { title: "Offsite, Goa", caption: "Planning, beach cricket and a whiteboard that didn't survive the rain.", when: "Offsite", size: "wide", tone: "paper", motif: "waves", placeholder: true },
    { title: "100th Friday update", caption: "One client framed it. We're not sure if that was a joke.", when: "Milestone", size: "sm", tone: "paper", motif: "dots", placeholder: true },
    { title: "First London kickoff", caption: "Our first in-person kickoff with a UK client. Tea was involved.", when: "2022", size: "sm", tone: "purple", motif: "grid", placeholder: true },
    { title: "Demo day, every week", caption: "Real software, real clicks, real feedback. Hundreds and counting.", when: "Weekly", size: "wide", tone: "yellow", motif: "bars", placeholder: true },
    { title: "Friday lunch, remote edition", caption: "Everyone orders their own and we eat on camera. It's more fun than it sounds.", when: "Fridays", size: "wide", tone: "ink", motif: "dots", placeholder: true },
  ] satisfies Moment[],

  cta: {
    title: { light: "Like how we work?", bold: "Work with us, or join us." },
    subtitle: "Free 30-minute strategy call · Open roles on our careers page",
    button: "Talk to us",
  } satisfies CtaBlock,
};

/* ------------------------------------------------------------------ */
/* Team                                                                */
/* ------------------------------------------------------------------ */

export const team = {
  metaDescription:
    "Meet the VAUG team: engineering, AI, design, QA, delivery and growth. Senior people, one accountable lead per project.",
  hero: {
    eyebrow: "Team",
    title: { light: "The people who build,", bold: "ship and stay." },
    subtitle:
      "Senior engineers, AI specialists, designers, testers and delivery leads. Small squads, one accountable lead, and nobody hidden behind an account manager.",
    tags: ["Senior-led squads", "One accountable lead", "Six disciplines"],
  } satisfies CompanyHero,

  /** Shown in the hero visual. */
  headcount: { value: "40+", label: "people", placeholder: true },

  leadershipTitle: "Leadership.",
  leadershipSubtitle: "The people accountable for how VAUG works, and for every project we take on.",
  leadership: [
    { name: "Aarav Mehta", role: "Founder & CEO", initials: "AM", gradient: ["#7c3aed", "#ffd23f"], bio: "Started VAUG in 2019 building MVPs for founders. Still sits in on every new client's first call.", focus: ["Strategy", "Partnerships", "Venture Studio"], placeholder: true },
    { name: "Priya Nair", role: "CTO", initials: "PN", gradient: ["#4c1d95", "#8b5cf6"], bio: "Owns architecture and engineering standards across every squad. Reviews more code than she admits.", focus: ["Architecture", "Cloud", "Code quality"], placeholder: true },
    { name: "Daniel Brooks", role: "Head of AI", initials: "DB", gradient: ["#8b5cf6", "#22d3ee"], bio: "Leads our agents practice, from workflow audits to evaluation and monitoring in production.", focus: ["Agents", "RAG", "Evaluation"], placeholder: true },
    { name: "Sana Qureshi", role: "Head of Delivery", initials: "SQ", gradient: ["#ffd23f", "#f97316"], bio: "Keeps every project on its weekly rhythm. The reason Friday updates arrive on Fridays.", focus: ["Delivery", "Scoping", "Client success"], placeholder: true },
    { name: "Luca Romano", role: "Head of Design", initials: "LR", gradient: ["#ec4899", "#7c3aed"], bio: "Leads research, product design and design systems. Believes every screen should earn its place.", focus: ["Product design", "Research", "Design systems"], placeholder: true },
    { name: "Hannah Clarke", role: "Head of Growth", initials: "HC", gradient: ["#10b981", "#ffd23f"], bio: "Runs websites, listings and campaigns for Venture Studio clients, and for VAUG itself.", focus: ["Growth", "SEO", "Performance marketing"], placeholder: true },
  ] satisfies Person[],

  disciplinesTitle: "The wider team, by discipline.",
  disciplinesSubtitle: "Squads are put together per project from these six groups.",
  disciplines: [
    { name: "Engineering", count: 18, icon: "code", description: "Full-stack, web, mobile and backend engineers who own features end to end.", roles: ["Full-stack", "React / Next.js", "Flutter", "Node / Python"], href: routes.engineeringPage("full-stack-engineering"), placeholder: true },
    { name: "AI", count: 6, icon: "brain", description: "Engineers who design, evaluate and run agents and LLM features in production.", roles: ["Agents", "RAG", "Evals", "MLOps"], href: routes.engineeringPage("ai-engineering"), placeholder: true },
    { name: "Design", count: 4, icon: "pen-tool", description: "Researchers and product designers who turn fuzzy ideas into clear flows.", roles: ["Product design", "UX research", "Design systems"], href: routes.engineeringPage("ui-ux-design"), placeholder: true },
    { name: "QA", count: 4, icon: "shield", description: "Testers who automate the boring checks and hunt the edge cases.", roles: ["Automation", "Manual", "Performance"], href: routes.engineeringPage("quality-assurance"), placeholder: true },
    { name: "Delivery", count: 5, icon: "workflow", description: "Leads who scope, plan and keep the weekly rhythm, and the single point of contact for clients.", roles: ["Delivery leads", "Scrum", "Business analysis"], href: routes.howWeWork, placeholder: true },
    { name: "Growth", count: 3, icon: "trending-up", description: "Marketers who run websites, listings and campaigns for studio ventures.", roles: ["SEO", "Paid media", "Content"], href: routes.service("venture-studio"), placeholder: true },
  ] satisfies Discipline[],

  quote: {
    text: "We hire people who would rather ship something real on Friday than talk about it on Monday.",
    by: "VAUG hiring principle",
  },

  joinTitle: "Want your initials on this page?",
  joinText: "We're hiring engineers, AI specialists, designers and delivery leads.",

  cta: {
    title: { light: "Meet the people who'd", bold: "build your product." },
    subtitle: "Free 30-minute strategy call with a senior lead · NDA on request",
    button: "Book a call",
  } satisfies CtaBlock,
};

/** Extra explore card, used alongside `companyExplore` on pages other than About. */
export const aboutExploreCard = {
  title: "About VAUG",
  description: "Our story, values and the journey since 2019.",
  href: routes.about,
  icon: "building" as const,
};
