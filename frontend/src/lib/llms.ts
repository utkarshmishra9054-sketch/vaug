import { site } from "@/content/site";
import { showcases } from "@/content/showcases";
import { audiences, engineering, routes, sectors, services } from "@/content/taxonomy";
import { getCaseStudies } from "@/lib/content";
import { abs } from "@/lib/jsonld";

/**
 * /llms.txt for vaug.in, following the llms.txt proposal (llmstxt.org): an H1 with the name, a one-line
 * summary in a blockquote, a few plain facts, then H2 sections of links with short notes. Built at build
 * time from the same content files the pages use, so it can't drift from the site. Facts here must match
 * the site: 120+ clients, a team of 18, offices as listed in `site.offices`; no prices or certifications.
 */

const link = (label: string, path: string, note?: string) => `- [${label}](${abs(path)})${note ? `: ${note}` : ""}`;

export async function buildLlmsTxt(): Promise<string> {
  const studies = await getCaseStudies();
  const offices = site.offices
    .map((o) => {
      const parts = o.address.split(",").map((p) => p.trim());
      return parts.length > 1 ? `${parts[0]} (${parts.at(-1)})` : parts[0];
    })
    .join(", ");

  const lines = [
    `# ${site.name}`,
    "",
    `> ${site.description}`,
    "",
    `${site.name}: ${site.tagline} Key facts, as stated on this site:`,
    "",
    "- 120+ clients; a team of 18 people across disciplines; operating since 2019.",
    `- Offices: ${offices}. Remote-first.`,
    "- Clients across the UK, Europe, the UAE, India and Canada, and websites and portals for startups across India, the UK, the US, Europe, Africa and Australia.",
    `- Contact: ${site.email} or ${abs(routes.contact)}`,
    "",
    "## Services",
    "",
    ...services.map((s) => link(s.label, routes.service(s.slug), s.short)),
    link("VAUG Agents", routes.agents, "AI agents built and run for a business"),
    link("All services, compared", routes.services),
    "",
    "## Industries",
    "",
    ...sectors.map((s) => link(s.label, routes.industry(s.slug), s.short)),
    "",
    "## Who we serve",
    "",
    ...audiences.map((a) => link(a.label, routes.audience(a.slug))),
    "",
    "## Engineering and capabilities",
    "",
    ...engineering.map((e) => link(e.label, routes.engineeringPage(e.slug), e.short)),
    link("Accessibility audits and remediation", routes.accessibilityAudits, "WCAG 2.2 AA, with our own audit of vaug.in as the sample report"),
    link("AI search readiness", routes.aiSearch, "structured data, llms.txt and answer-ready content, with vaug.in as the example"),
    link("Security and data handling", routes.security, "hosting, backups and how client data is handled"),
    ...showcases.map((s) => link(`${s.title} (labelled demo)`, routes.showcase(s.slug), s.summary)),
    "",
    "## Case studies",
    "",
    link("All case studies", routes.caseStudies),
    ...studies.map((s) => link(`${s.client}: ${s.title}`, routes.caseStudy(s.slug), s.city)),
    "",
    "## Company",
    "",
    link("About", routes.about),
    link("How we work", routes.howWeWork),
    link("Working with us", routes.workingWithUs, "hours, weekly rhythm, IP and contracts"),
    link("Team", routes.team),
    link("Careers", routes.careers),
    link("Book a 30-minute call", routes.book, "pick a time in your own time zone; Google Meet"),
    link("Contact", routes.contact),
    "",
    "## Optional",
    "",
    link("Accessibility statement", routes.accessibility),
    link("Privacy policy", routes.privacy),
    link("Terms", routes.terms),
    link("Sitemap", "/sitemap.xml"),
    "",
  ];
  return lines.join("\n");
}
