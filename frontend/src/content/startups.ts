import { routes } from "./taxonomy";

/**
 * Startups VAUG has built for: their websites and portals (per Utkarsh, 22 Nov 2026).
 * Names, sectors and countries are from each startup's own site. The "built" lines are
 * a short description of the work.
 *
 * Rules: never say or imply VAUG helped any of them raise funding (that is their story);
 * no metrics. Logos are captured from each site's header as it appears there.
 * TODO(content): confirm each "built" line and consent to show each logo (CONTENT_GAPS.md).
 * Scitus Labs has no live site we could find (scituslabs.io is an unpublished deployment and
 * scitus.io is another company), so its card shows only its name and country.
 */

export type StartupRegion = "India" | "UK" | "Rest of the world";

export type Startup = {
  slug: string;
  name: string;
  country: string;
  region: StartupRegion;
  /** Left out when the startup has no live site to take it from (Scitus Labs). */
  sector?: string;
  built?: string;
  url?: string;
  /** Logo captured from the site's header, shown on a plate of `bg`. */
  logo?: { src: string; w: number; h: number; bg: string };
  /** A full case study on vaug.in, when there is one. */
  study?: string;
};

const logo = (slug: string, w: number, h: number, bg: string) => ({ src: `/startups/${slug}.webp`, w, h, bg });

export const startups: Startup[] = [
  // India
  { slug: "reagvis", name: "Reagvis Labs", country: "India", region: "India", sector: "AI · deepfake detection", built: "Website and the sign-in portal for its detection platform", url: "https://reagvis.com", logo: logo("reagvis", 409, 130, "#fffaf5"), study: "deepfake-detection-platform-dehradun" },
  { slug: "yokostyles", name: "Stylique AI by YOKO", country: "India", region: "India", sector: "AI · fashion design", built: "Website for its AI sewing-pattern app", url: "https://yokostyles.com", study: "ai-sewing-pattern-app-india" },
  { slug: "aerosearch", name: "Aerosearch Technologies", country: "India", region: "India", sector: "Defence · autonomy", built: "Website for its autonomous threat-prediction technology", url: "https://aerosearchtech.com", logo: logo("aerosearch", 914, 85, "#0a0a09") },
  { slug: "alkamy", name: "Alkamy Carbon", country: "India", region: "India", sector: "Climate · carbon removal", built: "Website and partner enquiries for wastewater carbon removal", url: "https://alkamycarbon.com", logo: logo("alkamy", 329, 123, "#ffffff") },
  { slug: "oreejoy", name: "Oreejoy MedTech", country: "India", region: "India", sector: "Healthcare · medical devices", built: "Website and the Instrole clinician gait portal", url: "https://oreejoy.in", logo: logo("oreejoy", 476, 136, "#fcfdfe"), study: "gait-analysis-portal-gandhinagar" },
  { slug: "stelx", name: "StelX Dynamics", country: "India", region: "India", sector: "Robotics · drones", built: "Website and portfolio for its GPS-denied drones", url: "https://stelxdynamics.com", logo: logo("stelx", 311, 102, "#191b1f") },
  { slug: "swrn", name: "SWRN Systems", country: "India", region: "India", sector: "Defence · flight control", built: "Website for its indigenous flight controllers", url: "https://swrnsystems.in" },
  { slug: "earthsprint", name: "EarthSprint Solutions", country: "India", region: "India", sector: "Industrial materials", built: "Website and portal, with sample and call-back requests", url: "https://earthsprintsolutions.com", logo: logo("earthsprint", 392, 127, "#ffffff") },
  { slug: "jolenergy", name: "JOL Energy", country: "India", region: "India", sector: "Climate · battery recycling", built: "Website, metal-price pages and client portal", url: "https://jolenergy.in", logo: logo("jolenergy", 591, 150, "#ffffff") },
  { slug: "heliousai", name: "HeliousAI", country: "India", region: "India", sector: "Defence · AI", built: "Website for its canopy-penetrating defence AI", url: "https://heliousai.com", logo: logo("heliousai", 257, 150, "#2b2e2e"), study: "defence-ai-mission-console-india" },
  // UK
  { slug: "scitus", name: "Scitus Labs", country: "UK", region: "UK" },
  { slug: "theronix", name: "Theronix Health", country: "UK", region: "UK", sector: "Healthcare · NHS discharge", built: "Website and the Theronix Flow prototype", url: "https://theronixhealth.com", logo: logo("theronix", 604, 108, "#ffffff"), study: "nhs-discharge-platform-england" },
  { slug: "volkcell", name: "VolkCell", country: "UK", region: "UK", sector: "AI · microscopy analysis", built: "Website and the sign-in portal for its image analyst", url: "https://volkcell.com", logo: logo("volkcell", 269, 69, "#f0f2f3") },
  { slug: "ndlens", name: "ND Lens", country: "UK", region: "UK", sector: "Healthcare · ADHD assessment", built: "Website and demo bookings for its clinical platform", url: "https://ndlens.com", logo: logo("ndlens", 411, 109, "#16132b") },
  // Rest of the world
  { slug: "cityverse", name: "CityVerse AI", country: "USA", region: "Rest of the world", sector: "GovTech · capital projects", built: "Website and sign-in for its project-intelligence platform", url: "https://cityverseai.com", logo: logo("cityverse", 534, 128, "#fafaf8"), study: "capital-projects-ai-platform-usa" },
  { slug: "thermaldawn", name: "Thermal Dawn", country: "Australia", region: "Rest of the world", sector: "Climate · home energy", built: "Website and quote requests for its thermal storage", url: "https://thermaldawn.com", logo: logo("thermaldawn", 380, 61, "#14100d") },
  { slug: "doclarity", name: "Klartext AI · doclarity", country: "Austria", region: "Rest of the world", sector: "AI · accessible PDFs", built: "Bilingual website and the doclarity sign-up portal", url: "https://doclarity.eu", logo: logo("doclarity", 381, 108, "#ecf0fb"), study: "accessible-pdf-ai-platform-austria" },
  { slug: "vunapay", name: "VunaPay", country: "Kenya", region: "Rest of the world", sector: "Fintech · agriculture", built: "Website and early-access sign-up for smallholder payments", url: "https://vunapay.com", logo: logo("vunapay", 772, 133, "#ffffff") },
  { slug: "nesti", name: "nesti", country: "Kenya", region: "Rest of the world", sector: "Fintech · rent and credit", built: "Website and the property-manager portal", url: "https://nesti.africa", logo: logo("nesti", 279, 108, "#ffffff") },
  { slug: "tennsa", name: "Tennsa", country: "South Africa", region: "Rest of the world", sector: "AI · supply chain", built: "Website and sign-in for Tennsa OS", url: "https://tennsa.com", logo: logo("tennsa", 520, 112, "#101d38") },
];

export const startupCountries = [...new Set(startups.map((s) => s.country))];

export const startupStudyHref = (s: Startup) => (s.study ? routes.caseStudy(s.study) : undefined);
