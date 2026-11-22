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
    "How VAUG handles security and compliance: hosting and tested backups, role-based portals, health data kept off marketing sites with BAAs where PHI is involved, GDPR and UK GDPR, OWASP ASVS, ISO 27001-aligned practices, NDAs, IP ownership and data residency in the EU, UK, UAE or, on request, the US.",
  hero: {
    eyebrow: "Security & compliance",
    title: { light: "Security that's designed in,", bold: "not bolted on." },
    subtitle:
      "We build for regulated sectors in the UK, Europe and the UAE. Security, privacy and data residency are decided at the start of a project, not patched in before launch.",
    tags: ["GDPR & UK GDPR", "OWASP ASVS", "EU · UK · UAE · US hosting", "BAA for PHI work", "NDA on request"],
  } satisfies CompanyHero,

  /** Chips orbiting the hero shield. */
  heroChips: ["GDPR", "UK GDPR", "OWASP ASVS", "PCI DSS via Stripe", "ISO 27001-aligned", "EU · UK · UAE · US"],

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
    healthcare: ["HIPAA: BAAs and no PHI on public sites", "Special category data (UK & EU)", "Clinical data minimisation"],
    "real-estate": ["KYC / AML workflows", "Document retention", "Tenant data rights"],
    "ecommerce-retail": ["PCI DSS via providers", "Cookie consent", "Fraud controls"],
    logistics: ["Driver & location data", "Role-based access", "Partner API security"],
    "hospitality-travel": ["Guest data retention", "Payment tokenisation", "Multi-region hosting"],
  } satisfies Record<SectorSlug, string[]>,

  safeguardsTitle: "The safeguards in every contract.",
  safeguards: [
    { title: "NDAs on request", description: "We sign an NDA, ours or yours, before you share anything sensitive, usually the same day.", icon: "file-check" },
    { title: "You own the IP", description: "Contracts assign all IP to you. Code lives in your repositories and accounts from week one.", icon: "crown" },
    { title: "Data residency", description: "Host in the EU, the UK, the UAE or, on request, a US region, agreed at scoping. We use regional cloud services to keep data where it belongs.", icon: "globe" },
    { title: "Access control", description: "Named accounts, least privilege, MFA everywhere, and access removed the day someone leaves the project.", icon: "shield" },
    { title: "AI data handling", description: "Business-tier AI APIs that don't train on your data, no sensitive data in prompts unless agreed, and redaction where it matters.", icon: "brain" },
    { title: "Incident response", description: "A written runbook, named contacts and prompt notification if anything goes wrong.", icon: "zap" },
  ] satisfies Feature[],

  residency: [
    { region: "EU", note: "Frankfurt · Dublin · Paris" },
    { region: "UK", note: "London" },
    { region: "UAE", note: "Dubai · Abu Dhabi" },
    { region: "US", note: "On request · AWS or Azure US regions" },
  ],

  // TODO(content): backup retention (30 days), hosting in client accounts, SSO/MFA and logging need Utkarsh to confirm (CONTENT_GAPS.md).
  hostingTitle: "Hosting, backups and access.",
  hostingSubtitle: "What we set up on every site and portal we build and run, written into the handover so your team knows how it works.",
  hosting: [
    { title: "Hosting in your accounts", description: "Production runs in your own cloud or hosting account (AWS, Google Cloud, Azure or managed WordPress hosting) in the region agreed at scoping. You hold the keys; we get named access you can revoke.", icon: "cloud" },
    { title: "Backups we've restored", description: "Automated daily backups of the database and uploaded files, stored apart from the live site and kept for 30 days unless you need longer. We restore one before launch to prove it works.", icon: "database" },
    { title: "Encrypted in transit and at rest", description: "HTTPS on every page and API, encrypted databases and backups, and secrets kept in a secrets manager, never in code or chat.", icon: "shield" },
    { title: "Role-based portals", description: "Patients, members, staff, editors and admins each see only what their role needs. Staff sign in with SSO or MFA, and access is reviewed whenever someone joins or leaves.", icon: "users" },
    { title: "Audit trails", description: "Content edits, permission changes and data exports are logged with who and when, and kept for your own audits.", icon: "file-check" },
    { title: "Patched and monitored", description: "Uptime and error alerts go to a named engineer. CMS core, plugins and dependencies are updated on a schedule, and security fixes go out as soon as they're tested.", icon: "refresh-cw" },
  ] satisfies Feature[],

  // TODO(content): Utkarsh to confirm VAUG signs BAAs (CONTENT_GAPS.md). US-region hosting on request was confirmed by him on 22 Nov 2026.
  healthTitle: "Health data stays where it belongs.",
  healthSubtitle: "For clinics, health centres and digital-health products. Most websites never need protected health information (PHI), so we design them not to touch it.",
  health: [
    { title: "No PHI on marketing sites", description: "Public websites don't collect or store health information. Contact and appointment-request forms ask only for what's needed to get in touch, and say so on the form.", icon: "globe" },
    { title: "Analytics without patient data", description: "GA4 and Tag Manager are configured so names, contact details, conditions and appointment details are never sent. Events describe pages and buttons, not people.", icon: "gauge" },
    { title: "Clinical features in HIPAA-eligible systems", description: "Patient portals, scheduling and anything that handles PHI stay in HIPAA-eligible services, such as your EHR's portal or cloud services covered by a BAA. The website links to them.", icon: "layers" },
    { title: "A BAA before any PHI access", description: "If our team needs access to systems that hold PHI, we sign a business associate agreement with you first, and limit access to the people and data the work needs.", icon: "handshake" },
  ] satisfies Feature[],

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
    { question: "Can you host our data in the UK, EU, UAE or US?", answer: "Yes. We agree the hosting region during scoping and use regional cloud services so data stays where it needs to be. US regions (for example on AWS or Azure) are available on request." },
    { question: "Do you send our data to AI providers?", answer: "Only when agreed, only what's needed, and only through business-tier APIs that don't train on your data. Sensitive fields can be redacted before any AI call." },
    { question: "Will you sign our NDA?", answer: "Yes. We'll sign yours or offer ours, usually the same day, before you share anything sensitive." },
    { question: "Who owns the code?", answer: "You do. IP is assigned to you in the contract, and code lives in your repositories from the first week." },
    { question: "Do you handle card payments?", answer: "Through certified providers such as Stripe, so card data never touches your servers. That keeps your PCI DSS scope as small as possible." },
    { question: "Can you support our penetration test?", answer: "Yes. We work with your chosen testers, or recommend one, and fix findings before launch." },
    { question: "Will you sign a business associate agreement (BAA)?", answer: "Yes, whenever a project gives our team access to protected health information. We sign it before that access is granted. Most health-centre websites never touch PHI, and we design them that way." },
    { question: "Are you HIPAA certified?", answer: "There is no official HIPAA certification, and we don't claim one. We follow the HIPAA rules that apply to our work: no PHI on public sites or in analytics, HIPAA-eligible services for clinical features, minimum necessary access and a BAA where PHI is involved." },
    { question: "How are backups handled?", answer: "Automated daily backups of the database and uploaded files, stored separately from the live site and kept for 30 days unless you need longer. We test a restore before launch, and again whenever you ask." },
    { question: "Can different staff see different things?", answer: "Yes. Portals and admin areas are role-based: each role (for example patient, member, editor, manager or admin) sees only what it needs. Staff accounts use SSO or MFA, and changes are logged." },
  ] satisfies Faq[],

  cta: {
    title: { light: "Bring your security questions.", bold: "We'll bring the answers." },
    subtitle: "Free 30-minute call · NDA before you share anything · Security questionnaire support",
    button: "Talk to us",
  } satisfies CtaBlock,
};
