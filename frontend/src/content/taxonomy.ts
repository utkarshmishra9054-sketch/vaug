import type { AudienceSlug, ClientType, EngineeringSlug, IconName, SectorSlug, ServiceSlug } from "./types";

/**
 * Names, slugs and URLs shared by navigation, filters and cross-links.
 * Page content for each item lives in its own file (services.ts, industries.ts …).
 */

export const services: { slug: ServiceSlug; label: string; short: string; icon: IconName }[] = [
  { slug: "ai-as-a-service", label: "AI as a Service", short: "Custom AI agents that run your repetitive workflows", icon: "bot" },
  { slug: "dedicated-developers", label: "Dedicated Developers", short: "Vetted engineers who join your team by the month", icon: "users" },
  { slug: "custom-development", label: "Custom Development", short: "Bespoke web, mobile and SaaS builds, custom-quoted", icon: "code" },
  { slug: "venture-studio", label: "Venture Studio", short: "We run product, website, marketing and Google listings", icon: "rocket" },
  { slug: "fixed-price", label: "Fixed-Price Projects", short: "One agreed scope, one agreed price", icon: "file-check" },
  { slug: "launch-and-rescue", label: "Launch & Rescue", short: "Fix and deploy Lovable, Bolt or v0 builds", icon: "wrench" },
];

export const sectors: { slug: SectorSlug; label: string; short: string; icon: IconName }[] = [
  { slug: "fintech-insurance", label: "Fintech & Insurance", short: "Payments, lending, insurtech and finance ops", icon: "database" },
  { slug: "healthcare", label: "Healthcare", short: "Clinics, diagnostics and patient experience", icon: "heart" },
  { slug: "real-estate", label: "Real Estate", short: "Proptech, rentals, brokerage and developers", icon: "building" },
  { slug: "ecommerce-retail", label: "E-commerce & Retail", short: "Stores, marketplaces and headless commerce", icon: "layers" },
  { slug: "logistics", label: "Logistics", short: "Freight, courier, fleet and supply chain", icon: "workflow" },
  { slug: "hospitality-travel", label: "Hospitality & Travel", short: "Hotels, retreats, concierge and travel", icon: "globe" },
];

export const audiences: { slug: AudienceSlug; label: string; short: string; icon: IconName; clientType: ClientType }[] = [
  { slug: "startups", label: "Startups & Founders", short: "From idea to launched product with one partner", icon: "rocket", clientType: "Startup" },
  { slug: "hnis-family-offices", label: "HNIs & Family Offices", short: "Discreet, fully managed private ventures", icon: "crown", clientType: "HNI" },
  { slug: "enterprises", label: "Enterprises", short: "An outsourcing partner for AI and engineering", icon: "building", clientType: "Enterprise" },
  { slug: "agencies", label: "Agencies", short: "White-label builds your clients see as yours", icon: "handshake", clientType: "Agency" },
];

export const engineering: { slug: EngineeringSlug; label: string; short: string; icon: IconName }[] = [
  { slug: "ai-engineering", label: "AI Engineering", short: "Agents, RAG, LLM apps and evaluation", icon: "brain" },
  { slug: "full-stack-engineering", label: "Full-Stack Engineering", short: "One team from database to interface", icon: "layers" },
  { slug: "web-engineering", label: "Web Engineering", short: "Fast, accessible web apps and sites", icon: "globe" },
  { slug: "mobile-engineering", label: "Mobile Engineering", short: "iOS and Android with Flutter and React Native", icon: "smartphone" },
  { slug: "backend-engineering", label: "Backend Engineering", short: "APIs, data and integrations that scale", icon: "database" },
  { slug: "devops-cloud", label: "DevOps & Cloud", short: "Deployments, monitoring and cost control", icon: "cloud" },
  { slug: "ui-ux-design", label: "UI/UX Design", short: "Research, product design and design systems", icon: "pen-tool" },
  { slug: "quality-assurance", label: "Quality Assurance", short: "Manual, automated and performance testing", icon: "shield" },
];

export const regions = ["UK", "Europe", "UAE"] as const;

export const routes = {
  home: "/",
  agents: "/agents",
  services: "/services",
  service: (slug: ServiceSlug) => `/services/${slug}`,
  industries: "/industries",
  industry: (slug: SectorSlug) => `/industries/${slug}`,
  whoWeServe: "/who-we-serve",
  audience: (slug: AudienceSlug) => `/who-we-serve/${slug}`,
  engineering: "/engineering",
  engineeringPage: (slug: EngineeringSlug) => `/engineering/${slug}`,
  caseStudies: "/case-studies",
  caseStudy: (slug: string) => `/case-studies/${slug}`,
  about: "/about",
  culture: "/culture",
  team: "/team",
  careers: "/careers",
  career: (slug: string) => `/careers/${slug}`,
  howWeWork: "/how-we-work",
  security: "/security-and-compliance",
  contact: "/contact",
  privacy: "/privacy-policy",
  terms: "/terms",
  cookies: "/cookie-policy",
} as const;

export const serviceBySlug = (slug: ServiceSlug) => services.find((s) => s.slug === slug)!;
export const sectorBySlug = (slug: SectorSlug) => sectors.find((s) => s.slug === slug)!;

/** The contact form's "I'm interested in" option for a service. */
export const engagementOption = (slug: ServiceSlug) => (slug === "fixed-price" ? "Fixed-Price Project" : serviceBySlug(slug).label);
