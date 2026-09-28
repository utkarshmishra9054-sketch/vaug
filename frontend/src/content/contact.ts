import type { Faq, IconName, ServiceSlug, SplitTitle } from "./types";
import type { engagementOptions } from "@/lib/lead-options";

/** Copy for the /contact page. Offices, email and phone come from `site.ts`. */

export type EngagementOption = (typeof engagementOptions)[number];

export interface ContactNeed {
  /** Must match an option in `src/lib/lead-options.ts`, so the form can pre-select it. */
  engagement: EngagementOption;
  /** Service page to learn more; omitted for "Not sure yet". */
  service?: ServiceSlug;
  icon: IconName;
  title: string;
  blurb: string;
}

export interface ContactStep {
  when: string;
  title: string;
  description: string;
  icon: IconName;
}

export interface MapPin {
  label: string;
  kind: "office" | "client";
  lon: number;
  lat: number;
}

export interface OfficeExtra {
  /** Matches `Office.entity` in site.ts. */
  entity: string;
  city: string;
  timeZone: string;
  role: string;
}

export interface ContactChannel {
  kind: "email" | "phone" | "careers" | "partners";
  title: string;
  description: string;
  cta: string;
}

export interface ContactPageContent {
  meta: { title: string; description: string };
  hero: { eyebrow: string; title: SplitTitle; subtitle: string; tags: string[] };
  heroCard: { title: string; events: { label: string; detail: string; time: string }[] };
  brief: {
    eyebrow: string;
    title: SplitTitle;
    subtitle: string;
    assurances: string[];
    formTitle: string;
    formNote: string;
  };
  needs: ContactNeed[];
  steps: { eyebrow: string; title: SplitTitle; subtitle: string; items: ContactStep[] };
  offices: { eyebrow: string; title: SplitTitle; subtitle: string; legendOffice: string; legendClient: string };
  officeExtras: OfficeExtra[];
  pins: MapPin[];
  channels: { eyebrow: string; title: SplitTitle; items: ContactChannel[] };
  faqs: Faq[];
  closing: { lead: string; bold: string; subtitle: string; words: string[] };
}

export const contactPage: ContactPageContent = {
  meta: {
    title: "Contact",
    description:
      "Tell us what you're building. A senior lead replies within one business day, with a free 30-minute call and a proposal within 48 hours.",
  },
  hero: {
    eyebrow: "Start a project",
    title: { light: "Turn your idea into a product", bold: "that ships." },
    subtitle:
      "Tell us what you need in a few lines. A senior lead reads every message and replies within one business day, not a sales bot.",
    tags: ["Free 30-min strategy call", "NDA on request", "Proposal in 48 hours"],
  },
  heroCard: {
    title: "Your enquiry, start to kickoff",
    events: [
      { label: "Enquiry received", detail: "Routed to a senior lead", time: "Now" },
      { label: "Reply sent", detail: "Questions and a call slot", time: "< 1 day" },
      { label: "Strategy call", detail: "30 minutes, no cost", time: "Day 2–3" },
      { label: "Proposal shared", detail: "Scope, team, price, plan", time: "48 hrs" },
    ],
  },
  brief: {
    eyebrow: "What do you need?",
    title: { light: "Pick a starting point.", bold: "We'll take it from there." },
    subtitle:
      "Choose the option closest to what you have in mind. It pre-fills the form, and you can change it any time. Not sure? That's what the first call is for.",
    assurances: [
      "Read by a senior lead, not a bot",
      "Your idea stays confidential",
      "No obligation, no hard sell",
    ],
    formTitle: "Tell us about your project",
    formNote: "Takes about two minutes.",
  },
  needs: [
    { engagement: "AI as a Service", service: "ai-as-a-service", icon: "bot", title: "AI as a Service", blurb: "Agents that take repetitive work off your team." },
    { engagement: "Dedicated Developers", service: "dedicated-developers", icon: "users", title: "Dedicated Developers", blurb: "Vetted engineers who join your team by the month." },
    { engagement: "Custom Development", service: "custom-development", icon: "code", title: "Custom Development", blurb: "Web, mobile or SaaS, at a fixed price or by sprint." },
    { engagement: "Build With Us", service: "build-with-us", icon: "rocket", title: "Build With Us", blurb: "Idea to launched business: product, brand and growth." },
    { engagement: "Monthly Retainer", service: "monthly-retainer", icon: "refresh-cw", title: "Monthly Retainer", blurb: "Support, fixes and upgrades for a live product." },
    { engagement: "Launch & Rescue", service: "launch-and-rescue", icon: "wrench", title: "Launch & Rescue", blurb: "Fix and ship a Lovable, Bolt or v0 build." },
    { engagement: "Not sure yet", icon: "sparkles", title: "Not sure yet", blurb: "Tell us the problem. We'll suggest the right model." },
  ],
  steps: {
    eyebrow: "What happens next",
    title: { light: "From first message to kickoff,", bold: "in about a week." },
    subtitle: "No long sales cycle. Four clear steps, each with a named person and a date.",
    items: [
      { when: "Within 1 business day", title: "We reply", description: "A senior lead reads your message, asks anything that's unclear and offers a call slot.", icon: "message-square" },
      { when: "Day 2–3", title: "30-minute call", description: "We diagnose first: goals, users, constraints and what good looks like. NDA on request.", icon: "search" },
      { when: "Within 48 hours", title: "Your proposal", description: "Scope, team, timeline and price in plain English, with the trade-offs spelled out.", icon: "file-check" },
      { when: "Week 1", title: "Kickoff", description: "One accountable lead, a shared board, weekly demos and a Friday update from day one.", icon: "rocket" },
    ],
  },
  offices: {
    eyebrow: "Where we are",
    title: { light: "Three offices.", bold: "Clients across three regions." },
    subtitle:
      "Engineering from India, client teams in the UK and USA, working with founders and companies across the UK, Europe, the UAE, India and Canada. Overlapping hours, every working day.",
    legendOffice: "VAUG office",
    legendClient: "Client region",
  },
  officeExtras: [
    { entity: "VAUG India", city: "Bengaluru", timeZone: "Asia/Kolkata", role: "Engineering hub" },
    { entity: "VAUG UK", city: "London", timeZone: "Europe/London", role: "UK & Europe clients" },
    { entity: "VAUG USA", city: "New York", timeZone: "America/New_York", role: "North America" },
  ],
  pins: [
    { label: "Bengaluru", kind: "office", lon: 77.6, lat: 12.97 },
    { label: "London", kind: "office", lon: -0.13, lat: 51.5 },
    { label: "New York", kind: "office", lon: -74, lat: 40.7 },
    { label: "Europe", kind: "client", lon: 10, lat: 48 },
    { label: "UAE", kind: "client", lon: 55.3, lat: 25.2 },
  ],
  channels: {
    eyebrow: "Other ways to reach us",
    title: { light: "Prefer another route?", bold: "Pick one." },
    items: [
      { kind: "email", title: "Email us", description: "For projects, questions or a second opinion on a build.", cta: "Write to us" },
      // Books a call until a real phone/WhatsApp number is set in site.ts (then retitle to "Call or WhatsApp").
      { kind: "phone", title: "Talk to a senior lead", description: "Prefer a conversation? Book a free 30-minute call.", cta: "Book a call" },
      { kind: "careers", title: "Join the team", description: "Engineers, designers and AI specialists. See how we hire.", cta: "View careers" },
      { kind: "partners", title: "Agencies & partners", description: "White-label builds your clients see as yours.", cta: "Partner with us" },
    ],
  },
  faqs: [
    {
      question: "How quickly will I hear back?",
      answer:
        "Within one business day, from a senior lead rather than a sales rep. If your message arrives on a weekend, expect a reply on Monday.",
    },
    {
      question: "Is the first call really free?",
      answer:
        "Yes. The 30-minute strategy call is free and carries no obligation. We use it to understand the problem and tell you honestly whether we're the right fit.",
    },
    {
      question: "Can you sign an NDA before we talk?",
      answer:
        "Of course. Send your NDA or ask for ours, and we'll sign it before you share anything sensitive.",
    },
    {
      question: "What should I include in my message?",
      answer:
        "A few lines is plenty: what you want to build or fix, who it's for, and any deadline. Links to a prototype, deck or existing product help, but aren't required.",
    },
    {
      question: "I'm not sure which service fits. Is that a problem?",
      answer:
        "Not at all. Pick \"Not sure yet\" and describe the problem. We'll recommend a service on the call, and explain why.",
    },
    {
      question: "Do you work with clients outside the UK, Europe and the UAE?",
      answer:
        "Yes. Most of our engineering clients are in those regions, and we also work with clients in India and Canada. We work with teams anywhere with a few hours of overlap.",
    },
  ],
  closing: {
    lead: "Still reading?",
    bold: "Just say hello.",
    subtitle: "One email is all it takes. We'll handle the rest.",
    words: ["Automate", "Build", "Scale"],
  },
};
