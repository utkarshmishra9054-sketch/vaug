import type { CtaBlock, Faq, Feature, SectorSlug } from "./types";
import type { CompanyHero } from "./company";

/**
 * Security & Compliance page.
 * VAUG holds no formal certifications today: standards are described as
 * "aligned with" or "on our roadmap". Do not change that wording without
 * a real certificate to back it.
 */

export interface Standard {
  name: string;
  short: string;
  description: string;
  status: "Built to" | "Aligned with" | "Via providers" | "On our roadmap";
  placeholder?: boolean;
}

export interface LifecycleStage {
  title: string;
  description: string;
  checks: string[];
}

export const security = {
  metaDescription:
    "How VAUG handles security and compliance: GDPR and UK GDPR, OWASP ASVS, ISO 27001-aligned practices, NDAs, IP ownership, EU/UK/UAE data residency and careful AI data handling.",
  hero: {
    eyebrow: "Security & compliance",
    title: { light: "Security that's designed in,", bold: "not bolted on." },
    subtitle:
      "We build for regulated sectors in the UK, Europe and the UAE. Security, privacy and data residency are decided at the start of a project, not patched in before launch.",
    tags: ["GDPR & UK GDPR", "OWASP ASVS", "EU · UK · UAE hosting", "NDA on request"],
  } satisfies CompanyHero,

  /** Chips orbiting the hero shield. */
  heroChips: ["GDPR", "UK GDPR", "OWASP ASVS", "PCI DSS via Stripe", "ISO 27001-aligned", "EU · UK · UAE"],

  intro: {
    eyebrow: "Our approach",
    title: "Security starts with product decisions.",
    body: [
      "What data do you actually need? Where should it live? Who can see it, and for how long? The most important security choices are made in discovery, before a line of code is written.",
      "We make those choices with you, write them down, and build them into the architecture, the tests and the way we operate after launch.",
    ],
    points: [
      { title: "Collect less", description: "Only the personal data a feature truly needs." },
      { title: "Decide where it lives", description: "Hosting region agreed at scoping, not at launch." },
      { title: "Limit who sees it", description: "Least-privilege access for people and agents." },
    ],
  },

  standardsTitle: "Standards we build to.",
  standardsSubtitle:
    "We don't claim certificates we don't hold. Here is exactly how each standard shows up in our work.",
  standards: [
    { name: "GDPR", short: "EU data protection", description: "Data processing agreements, privacy by design, data subject rights and records of processing on every project that handles EU personal data.", status: "Built to" },
    { name: "UK GDPR", short: "UK data protection", description: "The same controls for UK personal data, with UK hosting available and international transfer terms where needed.", status: "Built to" },
    { name: "OWASP ASVS", short: "Application security", description: "We use the Application Security Verification Standard as the checklist for authentication, sessions, access control and input handling.", status: "Aligned with" },
    { name: "PCI DSS", short: "Card payments", description: "Card data is handled by certified payment providers such as Stripe, so card numbers never touch your servers or ours.", status: "Via providers" },
    { name: "ISO 27001", short: "Information security", description: "Our internal practices follow ISO 27001 controls: access management, asset inventory, incident response and supplier review.", status: "Aligned with" },
    { name: "ISO 27001 & SOC 2 certification", short: "Formal audits", description: "Formal certification is on our roadmap. Until then we complete security questionnaires and share our policies on request.", status: "On our roadmap", placeholder: true },
  ] satisfies Standard[],

  lifecycleTitle: "Security across the whole lifecycle.",
  lifecycleSubtitle: "Five stages, each with its own checks. Nothing moves forward until the checks pass.",
  lifecycle: [
    { title: "Discover", description: "Map the data, the users and the risks before anything is designed.", checks: ["Data inventory", "Threat sketch", "Regulatory scope"] },
    { title: "Design", description: "Build privacy and access control into the architecture.", checks: ["Least privilege", "Encryption plan", "Hosting region"] },
    { title: "Build", description: "Secure coding standards, reviewed by people, checked by tools.", checks: ["Peer review", "Secret scanning", "Dependency checks"] },
    { title: "Verify", description: "Test that the controls actually work before release.", checks: ["ASVS checklist", "Auth & access tests", "Pen test on request"] },
    { title: "Operate", description: "Monitor, patch and respond, for as long as we look after it.", checks: ["Logging & alerts", "Patching", "Incident runbook"] },
  ] satisfies LifecycleStage[],

  sectorsTitle: "Standards by sector.",
  sectorsSubtitle: "Every sector has its own rules. We know the common ones and work with your compliance team on the rest.",
  sectorStandards: {
    "fintech-insurance": ["PCI DSS via providers", "Strong customer authentication", "Audit trails"],
    healthcare: ["Special category data", "Consent records", "Clinical data minimisation"],
    "real-estate": ["KYC / AML workflows", "Document retention", "Tenant data rights"],
    "ecommerce-retail": ["PCI DSS via providers", "Cookie consent", "Fraud controls"],
    logistics: ["Driver & location data", "Role-based access", "Partner API security"],
    "hospitality-travel": ["Guest data retention", "Payment tokenisation", "Multi-region hosting"],
  } satisfies Record<SectorSlug, string[]>,

  safeguardsTitle: "The safeguards in every contract.",
  safeguards: [
    { title: "NDAs on request", description: "We sign an NDA, ours or yours, before you share anything sensitive, usually the same day.", icon: "file-check" },
    { title: "You own the IP", description: "Contracts assign all IP to you. Code lives in your repositories and accounts from week one.", icon: "crown" },
    { title: "Data residency", description: "Host in the EU, the UK or the UAE, agreed at scoping. We use regional cloud services to keep data where it belongs.", icon: "globe" },
    { title: "Access control", description: "Named accounts, least privilege, MFA everywhere, and access removed the day someone leaves the project.", icon: "shield" },
    { title: "AI data handling", description: "Business-tier AI APIs that don't train on your data, no sensitive data in prompts unless agreed, and redaction where it matters.", icon: "brain" },
    { title: "Incident response", description: "A written runbook, named contacts and prompt notification if anything goes wrong.", icon: "zap" },
  ] satisfies Feature[],

  residency: [
    { region: "EU", note: "Frankfurt · Dublin · Paris" },
    { region: "UK", note: "London" },
    { region: "UAE", note: "Dubai · Abu Dhabi" },
  ],

  procurementTitle: "Security reviews and procurement, handled.",
  procurementSubtitle: "Enterprise buyers need paperwork. We make it quick.",
  procurement: [
    { title: "Security questionnaires", description: "We complete vendor questionnaires (including SIG Lite and custom forms) with your security team." },
    { title: "Policies on request", description: "Information security, access control, incident response and acceptable use policies, shared under NDA." },
    { title: "Data processing agreements", description: "Standard DPAs with sub-processor lists and international transfer terms." },
    { title: "Architecture reviews", description: "A walkthrough of the proposed architecture, data flows and controls with your technical team." },
    { title: "Third-party testing", description: "We work with your chosen penetration testers and fix findings before launch." },
    { title: "Audit support", description: "Evidence and access logs for your own audits, for the systems we build and run." },
  ] satisfies Feature[],

  caseStudiesTitle: "Compliance in practice.",
  caseStudiesSubtitle: "Projects where data residency and compliance shaped the build.",

  /** Case studies whose content mentions any of these are shown on the page. */
  caseStudyKeywords: ["residen", "gdpr", "complian", "regulat", "audit", "pci", "data protection", "encrypt"],
  contactTitle: "Send us your security questionnaire.",
  contactSubtitle: "Or tell us about your project. A senior lead replies within one business day, and we'll sign an NDA before you share anything sensitive.",

  faqs: [
    { question: "Is VAUG ISO 27001 or SOC 2 certified?", answer: "Not yet. Our practices are aligned with ISO 27001 controls and formal certification is on our roadmap. We're happy to complete your security questionnaire and share our policies under NDA." },
    { question: "Can you host our data in the UK, EU or UAE?", answer: "Yes. We agree the hosting region during scoping and use regional cloud services so data stays where it needs to be." },
    { question: "Do you send our data to AI providers?", answer: "Only when agreed, only what's needed, and only through business-tier APIs that don't train on your data. Sensitive fields can be redacted before any AI call." },
    { question: "Will you sign our NDA?", answer: "Yes. We'll sign yours or offer ours, usually the same day, before you share anything sensitive." },
    { question: "Who owns the code?", answer: "You do. IP is assigned to you in the contract, and code lives in your repositories from the first week." },
    { question: "Do you handle card payments?", answer: "Through certified providers such as Stripe, so card data never touches your servers. That keeps your PCI DSS scope as small as possible." },
    { question: "Can you support our penetration test?", answer: "Yes. We work with your chosen testers, or recommend one, and fix findings before launch." },
  ] satisfies Faq[],

  cta: {
    title: { light: "Bring your security questions.", bold: "We'll bring the answers." },
    subtitle: "Free 30-minute call · NDA before you share anything · Security questionnaire support",
    button: "Talk to us",
  } satisfies CtaBlock,
};
