import type { Screen } from "./kit";
import { careerNakshaScreens } from "./careerNaksha";
import { cbd2healScreens } from "./cbd2heal";
import { phoenixScreens } from "./phoenix";
import { think3dScreens } from "./think3d";
import { vivinScreens } from "./vivin";
import { amityScreens } from "./amity";
import { brandlessSeoScreens } from "./brandlessSeo";
import { devgunScreens } from "./devgun";
import { epilogicGrowthScreens } from "./epilogicGrowth";
import { impossibleScreens } from "./impossible";
import { invoiceInterchangeScreens } from "./invoiceInterchange";
import { jainSeoScreens } from "./jainSeo";
import { jasScreens } from "./jas";
import { localAgencyScreens } from "./localAgency";
import { ntechSeoScreens } from "./ntechSeo";
import { parulScreens } from "./parul";
import { pennarScreens } from "./pennar";
import { wellAlimentsScreens } from "./wellAliments";
import { conciergeScreens } from "./concierge";
import { courierScreens } from "./courier";
import { desertRetreatScreens } from "./desertRetreat";
import { insuranceScreens } from "./insurance";
import { marketplaceScreens } from "./marketplace";
import { patientAgentScreens } from "./patientAgent";
import { physioScreens } from "./physio";
import { propertyBrandScreens } from "./propertyBrand";
import { reconciliationScreens } from "./reconciliation";
import { rentalRescueScreens } from "./rentalRescue";
import { routePlanningScreens } from "./routePlanning";
import { storefrontTeamScreens } from "./storefrontTeam";

/** Product screenshots per case study slug, in the order of `study.screenshots`. */
export const SCREENS: Record<string, Screen[]> = {
  "reconciliation-agent-frankfurt-payments": reconciliationScreens,
  "freelancer-insurance-platform-london": insuranceScreens,
  "physio-booking-app-dubai": physioScreens,
  "patient-whatsapp-voice-agent-manchester": patientAgentScreens,
  "family-office-property-brand-dubai": propertyBrandScreens,
  "rental-prototype-rescue-lisbon": rentalRescueScreens,
  "modest-fashion-marketplace-abu-dhabi": marketplaceScreens,
  "headless-storefront-team-stockholm": storefrontTeamScreens,
  "route-planning-pod-rotterdam": routePlanningScreens,
  "courier-driver-app-birmingham": courierScreens,
  "boutique-desert-retreat-ras-al-khaimah": desertRetreatScreens,
  "whatsapp-concierge-barcelona": conciergeScreens,
  // Proposal studies: drawn screens follow their real screenshots (see `screenIndex`).
  "seo-cbd-ecommerce-canada": cbd2healScreens,
  "local-seo-career-counselling-india": careerNakshaScreens,
  "seo-3d-printing-india": think3dScreens,
  "google-ads-interior-design-noida": vivinScreens,
  "google-ads-scholarship-test-gujarat": phoenixScreens,
  "sme-lead-generation-fintech-singapore": invoiceInterchangeScreens,
  "appraisal-lead-funnel-real-estate-sydney": localAgencyScreens,
  "ecommerce-growth-skincare-new-york": epilogicGrowthScreens,
  "b2b-whatsapp-leads-food-sao-paulo": wellAlimentsScreens,
  "seo-d2c-brand-india": brandlessSeoScreens,
  "seo-3d-printing-ahmedabad": ntechSeoScreens,
  "google-ads-cpc-industrial-safety-india": jasScreens,
  "performance-marketing-roas-lifestyle-brand-india": impossibleScreens,
  "linkedin-growth-university-vadodara": parulScreens,
  "admissions-campaigns-university-noida": amityScreens,
  "b2b-lead-generation-steel-hyderabad": pennarScreens,
  "seo-ecommerce-store-india": jainSeoScreens,
  "b2b-lead-generation-packers-movers-india": devgunScreens,
};
