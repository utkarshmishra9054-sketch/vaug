import { site } from "@/content/site";
import type { Faq } from "@/content/types";

/**
 * Structured data (schema.org JSON-LD) for vaug.in, rendered as recommended in the Next.js JSON-LD guide:
 * a script tag with `<` escaped. One Organization and one WebSite describe the company site-wide (root
 * layout); pages add BreadcrumbList (breadcrumbs), FAQPage (FAQ blocks), Service (service pages) and
 * Article (case studies), each pointing back to the Organization by @id. Keep every value true to what
 * the page itself says: no ratings, prices or certifications.
 */

export const SITE_URL = site.url.replace(/\/$/, "");
export const ORG_ID = `${SITE_URL}/#organization`;
export const WEBSITE_ID = `${SITE_URL}/#website`;

/** Absolute URL for a site path. */
export const abs = (path: string) => (/^https?:\/\//.test(path) ? path : `${SITE_URL}${path === "/" ? "" : path}`);

type Json = Record<string, unknown>;

export function JsonLd({ data }: { data: Json }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />;
}

/** Wraps nodes in a document with the schema.org context. */
export const ld = (...nodes: Json[]): Json => (nodes.length === 1 ? { "@context": "https://schema.org", ...nodes[0] } : { "@context": "https://schema.org", "@graph": nodes });

function postalAddress(address: string): Json {
  const parts = address.split(",").map((p) => p.trim());
  return {
    "@type": "PostalAddress",
    ...(parts.length > 1 ? { addressLocality: parts[0] } : {}),
    ...(parts.length > 2 ? { addressRegion: parts[1] } : {}),
    addressCountry: parts[parts.length - 1],
  };
}

export const organizationSchema = (): Json => ({
  "@type": "Organization",
  "@id": ORG_ID,
  name: site.name,
  url: SITE_URL,
  email: site.email,
  slogan: site.tagline,
  description: site.description,
  logo: abs("/icon.svg"),
  foundingDate: "2019",
  numberOfEmployees: { "@type": "QuantitativeValue", value: 18 },
  address: site.offices.map((o) => postalAddress(o.address)),
  areaServed: ["United Kingdom", "Europe", "United Arab Emirates", "India", "Canada"],
  contactPoint: { "@type": "ContactPoint", contactType: "sales", email: site.email, url: abs("/contact") },
  ...(site.socials.some((s) => s.href) ? { sameAs: site.socials.filter((s) => s.href).map((s) => s.href) } : {}),
});

export const websiteSchema = (): Json => ({
  "@type": "WebSite",
  "@id": WEBSITE_ID,
  url: SITE_URL,
  name: site.name,
  description: site.description,
  inLanguage: "en",
  publisher: { "@id": ORG_ID },
});

export const breadcrumbSchema = (items: { label: string; href: string }[]): Json => ({
  "@type": "BreadcrumbList",
  itemListElement: items.map((item, i) => ({ "@type": "ListItem", position: i + 1, name: item.label, item: abs(item.href) })),
});

export const faqSchema = (faqs: Faq[]): Json => ({
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })),
});

export const serviceSchema = ({ name, description, path }: { name: string; description: string; path: string }): Json => ({
  "@type": "Service",
  "@id": `${abs(path)}#service`,
  name,
  description,
  url: abs(path),
  provider: { "@id": ORG_ID },
  areaServed: ["United Kingdom", "Europe", "United Arab Emirates", "India", "Canada"],
});

export const caseStudySchema = ({ title, summary, client, path, image }: { title: string; summary: string; client: string; path: string; image?: string }): Json => ({
  "@type": "Article",
  "@id": `${abs(path)}#article`,
  headline: title,
  description: summary,
  url: abs(path),
  inLanguage: "en",
  about: { "@type": "Organization", name: client },
  author: { "@id": ORG_ID },
  publisher: { "@id": ORG_ID },
  isPartOf: { "@id": WEBSITE_ID },
  ...(image ? { image: abs(image) } : {}),
});
