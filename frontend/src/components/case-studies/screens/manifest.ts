/**
 * Pre-rendered images of the drawn case-study screens, made by scripts/capture-screens.mjs (WebKit, 3x).
 * Cards, home strips and study galleries show these instead of rendering the screens, which keeps the
 * screen code out of the browser bundle and the markup out of the HTML. Regenerate after changing screens.
 */
export const SCREEN_IMAGE = { width: 1920, height: 1200 } as const;

/** Number of drawn screens per study slug. */
export const SCREEN_COUNTS: Record<string, number> = {
  "accessible-pdf-ai-platform-austria": 5,
  "adhd-assessment-platform-harlow": 5,
  "admissions-campaigns-university-noida": 5,
  "ai-microscopy-image-analysis-edinburgh": 5,
  "ai-sewing-pattern-app-india": 5,
  "appraisal-lead-funnel-real-estate-sydney": 5,
  "autonomous-landmine-detection-india": 5,
  "b2b-lead-generation-packers-movers-india": 5,
  "b2b-lead-generation-steel-hyderabad": 5,
  "b2b-whatsapp-leads-food-sao-paulo": 5,
  "battery-recycling-portal-vellore": 5,
  "boutique-desert-retreat-ras-al-khaimah": 4,
  "capital-projects-ai-platform-usa": 5,
  "courier-driver-app-birmingham": 4,
  "deepfake-detection-platform-dehradun": 5,
  "defence-ai-mission-console-india": 5,
  "ecommerce-growth-skincare-new-york": 5,
  "family-office-property-brand-dubai": 4,
  "freelancer-insurance-platform-london": 4,
  "gait-analysis-portal-gandhinagar": 6,
  "google-ads-cpc-industrial-safety-india": 5,
  "google-ads-interior-design-noida": 4,
  "google-ads-scholarship-test-gujarat": 4,
  "gps-denied-drone-robotics-varanasi": 5,
  "headless-storefront-team-stockholm": 4,
  "home-thermal-storage-platform-australia": 5,
  "indigenous-flight-controller-india": 5,
  "linkedin-growth-university-vadodara": 5,
  "local-seo-career-counselling-india": 4,
  "modest-fashion-marketplace-abu-dhabi": 4,
  "nhs-discharge-platform-england": 6,
  "patient-whatsapp-voice-agent-manchester": 6,
  "performance-marketing-roas-lifestyle-brand-india": 5,
  "physio-booking-app-dubai": 6,
  "reconciliation-agent-frankfurt-payments": 4,
  "rent-credit-score-kenya": 5,
  "rental-prototype-rescue-lisbon": 4,
  "rice-husk-materials-portal-nashik": 5,
  "route-planning-pod-rotterdam": 4,
  "seo-3d-printing-ahmedabad": 5,
  "seo-d2c-brand-india": 5,
  "seo-ecommerce-store-india": 5,
  "smallholder-produce-payments-nairobi": 5,
  "sme-lead-generation-fintech-singapore": 5,
  "supply-chain-business-ai-south-africa": 5,
  "wastewater-carbon-removal-platform-india": 5,
  "whatsapp-concierge-barcelona": 4
};

export const screenCount = (slug: string) => SCREEN_COUNTS[slug] ?? 0;

/** Path of a study's drawn screen (0-based index). */
export const screenImage = (slug: string, index: number) => `/case-studies/screens/${slug}-${index + 1}.webp`;
