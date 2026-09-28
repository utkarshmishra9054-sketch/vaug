/**
 * Content types for the VAUG site.
 *
 * Every section reads from these shapes. Today the data lives in
 * `src/content/*.ts`; later it can come from a CMS or database by changing
 * only `src/lib/content.ts`.
 *
 * `placeholder: true` marks demo content (fictional clients, case studies,
 * testimonials, stats) that must be replaced with real content before launch.
 * In development these items show a "DEMO" badge.
 */

export type IconName =
  | "bot"
  | "users"
  | "code"
  | "rocket"
  | "file-check"
  | "wrench"
  | "sparkles"
  | "workflow"
  | "shield"
  | "gauge"
  | "layers"
  | "brain"
  | "building"
  | "briefcase"
  | "crown"
  | "handshake"
  | "search"
  | "pen-tool"
  | "hammer"
  | "trending-up"
  | "message-square"
  | "database"
  | "zap"
  | "globe"
  | "cpu"
  | "cloud"
  | "smartphone"
  | "heart"
  | "refresh-cw";

export type IllustrationName = "agents" | "developers" | "custom" | "build" | "retainer" | "rescue";

export interface Link {
  label: string;
  href: string;
}

export interface MenuLink extends Link {
  description?: string;
}

export interface NavItem extends Link {
  /** Mega-menu shown on hover / click. */
  menu?: MenuLink[];
  /** Side column of the mega-menu. */
  aside?: { title: string; links: Link[] };
}

export interface Office {
  entity: string;
  flag: string;
  address: string;
  phone: string;
  email: string;
}

export interface SiteConfig {
  name: string;
  tagline: string;
  motto: string;
  description: string;
  url: string;
  email: string;
  phone: string;
  offices: Office[];
  socials: { label: string; href: string; icon: "linkedin" | "x" | "instagram" | "github" | "youtube" }[];
}

/** A headline split into a light-weight lead and a bold ending. */
export interface SplitTitle {
  light: string;
  bold: string;
}

export interface Hero {
  /** Static lead, followed by an animated line that cycles through `words`. */
  title: { light: string; words: string[] };
  subtitle: string;
  cta: Link;
  /** Phrases for the moving ticker band under the hero. */
  ticker: string[];
  /** Words around the rotating badge. */
  badgeWords: string[];
}

export type ClientMark = "stack" | "wave" | "quay" | "parcel" | "loom" | "orbit" | "clause" | "leaf" | "sun" | "shield" | "bolt";

export interface ClientLogo {
  name: string;
  /** Geometric glyph drawn before the wordmark until real logo files are provided. */
  mark: ClientMark;
  /** Wordmark typography, so demo logos don't all look alike. */
  style: "bold" | "light" | "serif" | "caps" | "lower";
  sector: string;
  city: string;
  logoSrc?: string;
  placeholder?: boolean;
}

export interface Manifesto {
  title: string;
  /** Part of the title to highlight. Must appear inside `title`. */
  highlight: string;
  /** Sentence with **bold** segments. */
  subtitle: string;
  tags: string[];
}

export interface StoryBeat {
  lead: string;
  punch: string;
  /** Short caption under the headline. */
  caption: string;
}

export interface AiSpotlight {
  wordmark: string;
  badge: string;
  title: string;
  description: string;
  cta: Link;
  /** Scroll-driven story beats (exactly four: problem, problem, agent, outcome). */
  story: StoryBeat[];
}

export interface EngagementModel {
  slug: string;
  title: string;
  description: string;
  illustration: IllustrationName;
  services: string[];
  bestFor: string;
  pricing: string;
}

export interface Stat {
  value: number;
  suffix: string;
  label: string;
  detail: string;
  icon: IconName;
  placeholder?: boolean;
}

export interface Audience {
  title: string;
  href?: string;
  description: string;
  icon: IconName;
}

export interface CaseStudy {
  slug: string;
  client: string;
  city: string;
  stage: string;
  industry: string;
  model: string;
  icon: IconName;
  title: string;
  summary: string;
  metrics: { value: string; label: string }[];
  /** Background colour of the visual panel. */
  tint: string;
  /** Rows shown on the mock dashboard in the visual. */
  screen: { label: string; value: string }[];
  /** Full-colour client logo (`public/logos/`), shown on the home client grid. */
  logo?: string;
  placeholder?: boolean;
}

export interface TechCategory {
  category: string;
  href?: string;
  label: string;
  icon: IconName;
  description: string;
  items: string[];
}

export interface Principle {
  title: string;
  description: string;
  icon: IconName;
}

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  company: string;
  placeholder?: boolean;
}

export interface Insight {
  slug: string;
  /** Where the card leads (there is no blog yet, so it points at the related page). */
  href?: string;
  type: "Guide" | "Article" | "Playbook" | "Event";
  title: string;
  excerpt: string;
  date?: string;
  cover: { bg: string; fg: string; motif: "grid" | "rings" | "bars" | "dots" };
  placeholder?: boolean;
}

export interface Faq {
  question: string;
  answer: string;
}

export interface CtaBlock {
  title: SplitTitle;
  subtitle: string;
  button: string;
}

export interface FooterColumn {
  title: string;
  links: Link[];
}

/** A client tile on the home page: a case study (with `href`) or a logo-only client. */
export interface ClientItem {
  label: string;
  sector: string;
  city?: string;
  icon: IconName;
  href?: string;
  /** Client logo shown in place of the icon, e.g. `/logos/brandless.webp`. */
  logoSrc?: string;
  /** Logo-only clients: their website, previewed in a lightbox when the tile is clicked. */
  website?: ClientWebsite;
}

/** A result pulled from a case study, shown instead of quotes until real testimonials exist. */
export interface Outcome {
  value: string;
  label: string;
  text: string;
  client: string;
  service: string;
  tint: string;
  href: string;
}

export interface HomePageContent {
  hero: Hero;
  clients: ClientItem[];
  manifesto: Manifesto;
  aiSpotlight: AiSpotlight;
  modelsIntro: { title: string; subtitle: string };
  engagementModels: EngagementModel[];
  stats: Stat[];
  caseStudiesTitle: string;
  caseStudies: CaseStudy[];
  techTitle: string;
  techStack: TechCategory[];
  principlesTitle: string;
  principles: Principle[];
  audiencesTitle: string;
  audiences: Audience[];
  industries: string[];
  insightsIntro: { title: string; subtitle: string };
  insights: Insight[];
  outcomesTitle: string;
  outcomes: Outcome[];
  testimonialsTitle: string;
  /** Real client quotes only. The section is hidden while this is empty. */
  testimonials: Testimonial[];
  faqs: Faq[];
  cta: CtaBlock;
}

/* ------------------------------------------------------------------ */
/* Inner pages                                                         */
/* ------------------------------------------------------------------ */

/** A titled item used by feature grids, numbered lists and process steps. */
export interface Feature {
  title: string;
  description: string;
  icon?: IconName;
  href?: string;
  /** Small label above the title, e.g. "Weeks 1–2" or "01". */
  meta?: string;
}

export interface Metric {
  value: string;
  label: string;
}

export interface ApproachPhase {
  phase: string;
  when: string;
  description: string;
}

/** A real screenshot from a case study, served from `public/`. */
export interface CaseImage {
  src: string;
  alt: string;
  width: number;
  height: number;
}

/** Full case study: the card fields plus everything the detail page needs. */
export interface CaseStudyDetail extends CaseStudy {
  /** Optional: sectors outside the six we have pages for show `industry` as plain text. */
  sector?: SectorSlug;
  service: ServiceSlug;
  clientType: ClientType;
  region: Region;
  domain: string;
  techStack: string[];
  duration: string;
  team: string;
  about: string;
  problems: Feature[];
  solution: string;
  features: Feature[];
  challenges: Feature[];
  approach: ApproachPhase[];
  results: { metrics: Metric[]; narrative: string };
  testimonial?: { quote: string; name: string; role: string };
  screenshots: string[];
  /** Real screenshots, in the order of `screenshots`. Used instead of the drawn screens when present. */
  images?: CaseImage[];
  /** The client's live website, shown after the screens (and linked in the facts panel). */
  website?: ClientWebsite;
  /** Marketing work (ads, SEO, social): the screens gallery is titled for a campaign, not a product. */
  campaign?: boolean;
  ctaHeading: string;
}

/** A client's public website and a homepage screenshot of it (`public/sites/`). */
export interface ClientWebsite {
  url: string;
  image: CaseImage;
}

export type ServiceSlug =
  | "ai-as-a-service"
  | "dedicated-developers"
  | "custom-development"
  | "build-with-us"
  | "monthly-retainer"
  | "launch-and-rescue";

export type SectorSlug =
  | "fintech-insurance"
  | "healthcare"
  | "real-estate"
  | "ecommerce-retail"
  | "logistics"
  | "hospitality-travel";

export type AudienceSlug = "startups" | "hnis-family-offices" | "enterprises" | "agencies";

export type EngineeringSlug =
  | "ai-engineering"
  | "full-stack-engineering"
  | "web-engineering"
  | "mobile-engineering"
  | "backend-engineering"
  | "devops-cloud"
  | "ui-ux-design"
  | "quality-assurance";

export type ClientType = "Startup" | "Enterprise" | "HNI" | "Agency";
export type Region = "UK" | "Europe" | "UAE" | "India" | "Canada" | "Singapore" | "Australia" | "USA" | "Brazil";
