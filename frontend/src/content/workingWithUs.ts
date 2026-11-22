import type { CtaBlock, Faq, Feature } from "./types";
import type { CompanyHero } from "./company";

/**
 * "Working with us": the practical answers buyers in other time zones need before
 * they sign (hours, weekly rhythm, who they talk to, contracts, insurance).
 *
 * TODO(content): the US overlap window (9 a.m.–1 p.m. Eastern) comes from the
 * proposals the sales team sends; the insurance wording promises certificates
 * before signing without naming cover. Utkarsh to confirm both (CONTENT_GAPS.md).
 */

/** Team hours, used by the overlap chart. Core hours are in India; the US window is anchored to Eastern time. */
export const teamHours = {
  core: { tz: "Asia/Kolkata", start: 10 * 60, end: 19 * 60 },
  usWindow: { tz: "America/New_York", start: 9 * 60, end: 13 * 60 },
};

export const overlapRegions: { label: string; city: string; tz: string; window: "core" | "usWindow" }[] = [
  { label: "US Pacific", city: "Los Angeles", tz: "America/Los_Angeles", window: "usWindow" },
  { label: "US Eastern", city: "New York", tz: "America/New_York", window: "usWindow" },
  { label: "UK", city: "London", tz: "Europe/London", window: "core" },
  { label: "Central Europe", city: "Berlin", tz: "Europe/Berlin", window: "core" },
  { label: "UAE", city: "Dubai", tz: "Asia/Dubai", window: "core" },
];

export const workingWithUs = {
  metaDescription:
    "How VAUG works with clients in the US, UK, Europe and the UAE: daily overlap hours, weekly demos, one accountable lead, an escalation contact, and contracts where you own all the IP.",
  hero: {
    eyebrow: "Working with us",
    title: { light: "Your hours, your IP,", bold: "no surprises." },
    subtitle:
      "The practical side of hiring VAUG from another time zone: when we're online with you, what happens every week, who you talk to, and what the contract says.",
    tags: ["9 a.m.–1 p.m. ET overlap", "4+ hours with UK & Europe", "Weekly demos", "You own the IP"],
  } satisfies CompanyHero,

  hoursTitle: "Hours that overlap with yours.",
  hoursSubtitle:
    "US clients get a fixed four-hour window every weekday, 9 a.m. to 1 p.m. Eastern. UK, European and Gulf clients share most of their working morning with our core hours. Your calls and demos sit inside these windows.",

  weekTitle: "What happens every week.",
  week: [
    { title: "Kickoff", meta: "Week 1", description: "Meet your lead and team, agree the demo slot, the channels and who decides what. Repositories and accounts are set up in your name." },
    { title: "Daily stand-up note", meta: "Written", description: "A short note in your shared Slack or Teams channel: done, next, blockers. Questions are answered the same day inside the overlap window." },
    { title: "Weekly demo", meta: "Fixed slot", description: "Working software on screen every week, at a fixed time in your morning, so you judge progress by what you can click." },
    { title: "Friday update", meta: "Written", description: "What shipped, what's next, risks, and the decisions we need from you." },
    { title: "Milestone sign-off", meta: "Each milestone", description: "You review and accept each milestone against its agreed criteria before it's invoiced." },
  ] satisfies Feature[],

  peopleTitle: "Who you'll talk to.",
  peopleSubtitle: "Named people from day one, not a ticket queue.",
  people: [
    { title: "Engagement lead", description: "Owns the relationship, the scope and the commercial side. Your first call and your contract go through them.", icon: "handshake" },
    { title: "Project manager", description: "Runs the work day to day: the stand-up notes, the demo, the Friday update and the plan. Your main contact.", icon: "workflow" },
    { title: "Escalation contact", description: "A senior person outside the project team. If something isn't working, you can go to them directly, and they answer within one business day.", icon: "shield" },
  ] satisfies Feature[],

  contractsTitle: "Contracts and paperwork.",
  contractsSubtitle: "Plain English, agreed before work starts, and nothing that leaves you depending on us.",
  contracts: [
    { title: "Master agreement and statement of work", description: "One master agreement, then a statement of work per project: scope, milestones, acceptance criteria and price. Your own contract template is fine too.", icon: "file-check" },
    { title: "You own the IP", description: "All code, designs and content are assigned to you. Repositories, cloud and third-party accounts are in your name from week one.", icon: "crown" },
    { title: "NDA, DPA and BAA", description: "An NDA the same day if you want one. A data processing agreement for personal data, and a business associate agreement before any access to health information.", icon: "shield" },
    { title: "Milestone billing", description: "Payments are split across milestones and invoiced when you accept each one, on net-30 terms. US clients pay in US dollars by wire transfer.", icon: "briefcase" },
    { title: "Insurance certificates", description: "If your contract requires insurance (general liability, professional liability or cyber), we supply the certificates before it's signed, at the limits it sets.", icon: "file-check" },
    { title: "Changes priced first", description: "If the scope changes, we write down the effect on time and cost, and only start once you agree.", icon: "refresh-cw" },
  ] satisfies Feature[],

  faqs: [
    { question: "What hours do you work with US clients?", answer: "Every weekday from 9 a.m. to 1 p.m. Eastern (6 to 10 a.m. Pacific). Your calls and weekly demo happen in that window. Anything you send outside it is answered in writing by the start of your next working day." },
    { question: "And with UK, European and Gulf clients?", answer: "At least four hours of overlap every working day, usually the whole morning in the UK and Europe and most of the day in the UAE." },
    { question: "How will we see progress?", answer: "A live demo every week, a short written stand-up note every working day and a written update every Friday. You'll also have access to the repository, the staging site and the task board." },
    { question: "Will the same people stay on our project?", answer: "Yes. Your lead and core team stay for the whole project. If someone has to change, we tell you first and overlap the handover." },
    { question: "Do you subcontract?", answer: "Our core team are VAUG employees. When a project needs a specialist, they're contracted under VAUG's terms and managed by us, and you deal with VAUG throughout." },
    { question: "Can we use our own contract?", answer: "Yes. Send it over and we'll review it, mark up anything that needs a conversation, and sign. Or use our master agreement and statement of work." },
    { question: "Who owns the work?", answer: "You do. IP in all code, designs and content is assigned to you, and everything lives in your accounts from the first week, so you can change suppliers at any time." },
    { question: "How do payments work?", answer: "The price is split across milestones, and each one is invoiced when you accept it, on net-30 terms. US clients pay in US dollars by wire transfer." },
    { question: "What about insurance?", answer: "Tell us the cover your contract requires (general liability, professional liability or cyber). We supply certificates of insurance before the contract is signed." },
    { question: "What if a deadline is at risk?", answer: "You hear it from us first, in the Friday update or sooner, with the reason, the options and what we recommend. Fixed-price work stays at the agreed price." },
  ] satisfies Faq[],

  cta: {
    title: { light: "Questions before you sign?", bold: "Ask us anything." },
    subtitle: "Free 30-minute call · inside your working hours · NDA on request",
    button: "Book a call",
  } satisfies CtaBlock,
};
