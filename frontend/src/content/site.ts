import { audiences, engineering, routes, sectors, services } from "./taxonomy";
import type { FooterColumn, NavItem, SiteConfig } from "./types";

// TODO(content): add real phone numbers, street addresses and social profile URLs.
// Empty phones and social hrefs are hidden on the site until they are filled in.
export const site: SiteConfig = {
  name: "VAUG",
  tagline: "AI agents and engineering teams that ship.",
  motto: "Automate · Build · Scale",
  description:
    "VAUG builds AI agents that streamline your workflows, supplies dedicated developers, and delivers software end to end, from fixed-price builds to fully managed venture launches.",
  url: "https://vaug.ai",
  email: "hello@vaug.ai",
  phone: "",
  offices: [
    { entity: "VAUG India", flag: "🇮🇳", address: "Bengaluru, Karnataka, India", phone: "", email: "hello@vaug.ai" },
    { entity: "VAUG UK", flag: "🇬🇧", address: "London, United Kingdom", phone: "", email: "hello@vaug.ai" },
    { entity: "VAUG USA", flag: "🇺🇸", address: "New York, NY, United States", phone: "", email: "hello@vaug.ai" },
  ],
  socials: [
    { label: "LinkedIn", href: "", icon: "linkedin" },
    { label: "X", href: "", icon: "x" },
    { label: "YouTube", href: "", icon: "youtube" },
    { label: "Instagram", href: "", icon: "instagram" },
    { label: "GitHub", href: "", icon: "github" },
  ],
};

const serviceLinks = services.map((s) => ({ label: s.label, href: routes.service(s.slug), description: s.short }));
const sectorLinks = sectors.map((s) => ({ label: s.label, href: routes.industry(s.slug), description: s.short }));
const audienceLinks = audiences.map((a) => ({ label: a.label, href: routes.audience(a.slug) }));
const engineeringLinks = engineering.map((e) => ({ label: e.label, href: routes.engineeringPage(e.slug), description: e.short }));

export const navigation: NavItem[] = [
  { label: "VAUG Agents", href: routes.agents },
  {
    label: "What We Do",
    href: routes.services,
    menu: serviceLinks,
    aside: {
      title: "Explore",
      links: [
        { label: "All services", href: routes.services },
        { label: "VAUG Agents", href: routes.agents },
        { label: "How we work", href: routes.howWeWork },
        { label: "Case studies", href: routes.caseStudies },
      ],
    },
  },
  {
    label: "Industries",
    href: routes.industries,
    menu: sectorLinks,
    aside: { title: "Who we serve", links: [...audienceLinks, { label: "All industries", href: routes.industries }] },
  },
  {
    label: "Engineering",
    href: routes.engineering,
    menu: engineeringLinks,
    aside: {
      title: "Engineering",
      links: [
        { label: "All disciplines", href: routes.engineering },
        { label: "Dedicated developers", href: routes.service("dedicated-developers") },
        { label: "Security & compliance", href: routes.security },
      ],
    },
  },
  { label: "Work", href: routes.caseStudies },
  {
    label: "About",
    href: routes.about,
    menu: [
      { label: "About Us", href: routes.about, description: "Our story since 2019, values and offices" },
      { label: "How We Work", href: routes.howWeWork, description: "Clear commitments and visible progress" },
      { label: "Culture", href: routes.culture, description: "Remote-first, demo-driven, always learning" },
      { label: "Team", href: routes.team, description: "The people behind every build" },
      { label: "Careers", href: routes.careers, description: "Open roles for builders and AI specialists" },
      { label: "Security & Compliance", href: routes.security, description: "How we protect your data and IP" },
    ],
    aside: {
      title: "Get in touch",
      links: [
        { label: "Contact us", href: routes.contact },
        { label: "Book a strategy call", href: "#contact" },
        { label: "Case studies", href: routes.caseStudies },
      ],
    },
  },
];

export const footerColumns: FooterColumn[] = [
  { title: "What We Do", links: [...serviceLinks.map(({ label, href }) => ({ label, href })), { label: "VAUG Agents", href: routes.agents }] },
  { title: "Industries", links: [...sectorLinks.map(({ label, href }) => ({ label, href })), { label: "Who we serve", href: routes.whoWeServe }] },
  { title: "Engineering", links: engineeringLinks.map(({ label, href }) => ({ label, href })) },
  {
    title: "Company",
    links: [
      { label: "About Us", href: routes.about },
      { label: "How We Work", href: routes.howWeWork },
      { label: "Case Studies", href: routes.caseStudies },
      { label: "Culture", href: routes.culture },
      { label: "Team", href: routes.team },
      { label: "Careers", href: routes.careers },
      { label: "Security", href: routes.security },
      { label: "Contact", href: routes.contact },
    ],
  },
];

export const legalLinks = [
  { label: "Privacy Policy", href: routes.privacy },
  { label: "Terms & Conditions", href: routes.terms },
  { label: "Cookie Policy", href: routes.cookies },
];
