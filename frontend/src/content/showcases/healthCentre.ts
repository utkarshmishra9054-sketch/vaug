/**
 * Data for the health-centre website showcase (/showcases/health-centre-website).
 *
 * "Sagebrook Health Centers" is a FICTIONAL brand made up for this demo. Every
 * provider, location, phone number (555-01xx, reserved for fiction), fee and
 * schedule here is invented. Nothing describes a real organisation or person.
 */

export type Lang = "en" | "es";
export type L10n = Record<Lang, string>;

export type ServiceId = "family" | "pediatrics" | "womens" | "behavioral" | "dental" | "optometry" | "internal" | "pharmacy" | "podiatry" | "nutrition";
export type LanguageId = "en" | "es" | "tl" | "vi" | "ar" | "asl" | "am" | "zh";

export const brand = {
  name: "Sagebrook Health Centers",
  short: "Sagebrook Health",
  phone: "(555) 010-2400",
  domain: "sagebrookhealth.example",
};

export const services: { id: ServiceId; name: L10n; blurb: L10n; terms: string[] }[] = [
  { id: "family", name: { en: "Family medicine", es: "Medicina familiar" }, blurb: { en: "Check-ups, chronic care and same-day visits for all ages.", es: "Chequeos, enfermedades crónicas y citas el mismo día para todas las edades." }, terms: ["doctor", "physician", "primary care", "checkup", "check up", "physical", "sick", "same day", "diabetes", "sugar", "blood pressure", "hypertension", "cold", "flu", "medico", "medica", "chequeo", "consulta", "azucar"] },
  { id: "pediatrics", name: { en: "Pediatrics", es: "Pediatría" }, blurb: { en: "Well-child visits, vaccines and sports physicals.", es: "Consultas del niño sano, vacunas y exámenes deportivos." }, terms: ["kids", "kid", "child", "children", "baby", "infant", "pediatrician", "peds", "school physical", "sports physical", "ninos", "nino", "bebe", "pediatra"] },
  { id: "womens", name: { en: "Women's health", es: "Salud de la mujer" }, blurb: { en: "Prenatal care, OB/GYN, family planning and screenings.", es: "Atención prenatal, ginecología, planificación familiar y exámenes." }, terms: ["ob", "gyn", "obgyn", "ob/gyn", "gynecologist", "gyno", "pregnant", "pregnancy", "prenatal", "pap", "pap smear", "mammogram", "birth control", "contraception", "midwife", "embarazo", "embarazada", "ginecologo", "prenatal", "anticonceptivos", "partera"] },
  { id: "behavioral", name: { en: "Behavioral health", es: "Salud mental" }, blurb: { en: "Counselling, psychiatry and substance-use support.", es: "Consejería, psiquiatría y apoyo por uso de sustancias." }, terms: ["mental", "mental health", "therapy", "therapist", "counseling", "counselling", "counselor", "depression", "anxiety", "stress", "psychiatrist", "psychiatry", "substance", "addiction", "recovery", "salud mental", "terapia", "consejeria", "ansiedad", "depresion"] },
  { id: "dental", name: { en: "Dental", es: "Dental" }, blurb: { en: "Cleanings, fillings, extractions and children's dentistry.", es: "Limpiezas, empastes, extracciones y odontología infantil." }, terms: ["dentist", "dental", "teeth", "tooth", "toothache", "cleaning", "cavity", "filling", "braces", "gums", "dentista", "dientes", "diente", "muela", "limpieza"] },
  { id: "optometry", name: { en: "Vision care", es: "Cuidado de la vista" }, blurb: { en: "Eye exams, glasses and diabetic eye checks.", es: "Exámenes de la vista, lentes y revisión ocular para diabetes." }, terms: ["eye", "eyes", "vision", "glasses", "contacts", "optometrist", "optometry", "eye exam", "ojos", "vista", "lentes", "anteojos", "optometrista"] },
  { id: "internal", name: { en: "Internal medicine", es: "Medicina interna" }, blurb: { en: "Adult care for complex and long-term conditions.", es: "Atención de adultos con condiciones complejas o crónicas." }, terms: ["internist", "adult", "chronic", "heart", "kidney", "cholesterol", "copd", "asthma", "internista", "adultos", "cronico"] },
  { id: "pharmacy", name: { en: "Pharmacy", es: "Farmacia" }, blurb: { en: "Low-cost prescriptions and refills on site.", es: "Recetas de bajo costo y resurtidos en la clínica." }, terms: ["pharmacy", "meds", "medication", "medicine", "prescription", "rx", "refill", "pharmacist", "farmacia", "medicinas", "receta", "resurtir"] },
  { id: "podiatry", name: { en: "Foot care", es: "Cuidado de los pies" }, blurb: { en: "Diabetic foot care and podiatry.", es: "Cuidado del pie diabético y podología." }, terms: ["foot", "feet", "podiatrist", "podiatry", "toe", "ankle", "pie", "pies", "podologo"] },
  { id: "nutrition", name: { en: "Nutrition", es: "Nutrición" }, blurb: { en: "Dietitians for diabetes, weight and pregnancy.", es: "Dietistas para diabetes, peso y embarazo." }, terms: ["diet", "dietitian", "nutrition", "nutritionist", "weight", "food", "nutricion", "dieta", "peso", "nutriologo"] },
];

export const languages: { id: LanguageId; name: L10n }[] = [
  { id: "en", name: { en: "English", es: "Inglés" } },
  { id: "es", name: { en: "Spanish", es: "Español" } },
  { id: "tl", name: { en: "Tagalog", es: "Tagalo" } },
  { id: "vi", name: { en: "Vietnamese", es: "Vietnamita" } },
  { id: "ar", name: { en: "Arabic", es: "Árabe" } },
  { id: "asl", name: { en: "ASL", es: "Lengua de señas (ASL)" } },
  { id: "am", name: { en: "Amharic", es: "Amárico" } },
  { id: "zh", name: { en: "Mandarin", es: "Mandarín" } },
];

export type Location = {
  id: string;
  name: string;
  town: string;
  address: string;
  phone: string;
  kind: "clinic" | "mobile";
  /** Position on the illustrated map (0-100). */
  x: number;
  y: number;
  services: ServiceId[];
  hours: { days: L10n; time: string }[];
  /** Mobile units: this week's stops. */
  stops?: { day: L10n; place: string; time: string }[];
  walkIn?: boolean;
};

const WEEKDAYS: L10n = { en: "Mon–Fri", es: "Lun–Vie" };
const SAT: L10n = { en: "Sat", es: "Sáb" };

export const locations: Location[] = [
  { id: "juniper", name: "Juniper Falls Family Health", town: "Juniper Falls", address: "1200 Canyon View Rd", phone: "(555) 010-2401", kind: "clinic", x: 46, y: 44, services: ["family", "pediatrics", "womens", "behavioral", "dental", "pharmacy", "internal"], hours: [{ days: WEEKDAYS, time: "7:30–19:00" }, { days: SAT, time: "8:00–13:00" }], walkIn: true },
  { id: "coldwater", name: "Coldwater Health Center", town: "Coldwater", address: "88 Mill Street", phone: "(555) 010-2402", kind: "clinic", x: 22, y: 28, services: ["family", "pediatrics", "behavioral", "dental"], hours: [{ days: WEEKDAYS, time: "8:00–17:30" }] },
  { id: "pinecrest", name: "Pinecrest Women & Children's", town: "Pinecrest", address: "410 Aspen Avenue", phone: "(555) 010-2403", kind: "clinic", x: 70, y: 24, services: ["womens", "pediatrics", "nutrition"], hours: [{ days: WEEKDAYS, time: "8:00–18:00" }, { days: SAT, time: "9:00–12:00" }] },
  { id: "redmesa", name: "Red Mesa Community Clinic", town: "Red Mesa", address: "2 Plaza del Sol", phone: "(555) 010-2404", kind: "clinic", x: 76, y: 66, services: ["family", "internal", "behavioral", "optometry", "podiatry"], hours: [{ days: WEEKDAYS, time: "7:00–17:00" }], walkIn: true },
  { id: "aldercreek", name: "Alder Creek Dental & Vision", town: "Alder Creek", address: "55 Riverside Drive", phone: "(555) 010-2405", kind: "clinic", x: 30, y: 72, services: ["dental", "optometry"], hours: [{ days: WEEKDAYS, time: "8:00–17:00" }] },
  { id: "eastgate", name: "Eastgate Behavioral Health", town: "Juniper Falls", address: "740 Eastgate Blvd", phone: "(555) 010-2406", kind: "clinic", x: 58, y: 52, services: ["behavioral"], hours: [{ days: WEEKDAYS, time: "8:00–20:00" }] },
  { id: "willow", name: "Willow Springs Health Center", town: "Willow Springs", address: "19 School Lane", phone: "(555) 010-2407", kind: "clinic", x: 12, y: 54, services: ["family", "pediatrics", "nutrition"], hours: [{ days: WEEKDAYS, time: "7:30–16:30" }] },
  {
    id: "mobile-med",
    name: "Sagebrook on Wheels: Medical",
    town: "Across the valley",
    address: "See this week's stops",
    phone: "(555) 010-2408",
    kind: "mobile",
    x: 38,
    y: 60,
    services: ["family", "pediatrics", "pharmacy"],
    hours: [{ days: WEEKDAYS, time: "9:00–15:00" }],
    stops: [
      { day: { en: "Mon", es: "Lun" }, place: "Coldwater Farm Workers Center", time: "9:00–15:00" },
      { day: { en: "Tue", es: "Mar" }, place: "Red Mesa Library", time: "9:00–15:00" },
      { day: { en: "Wed", es: "Mié" }, place: "Willow Springs Elementary", time: "8:30–13:00" },
      { day: { en: "Thu", es: "Jue" }, place: "Juniper Falls Shelter", time: "10:00–16:00" },
      { day: { en: "Fri", es: "Vie" }, place: "Alder Creek Community Hall", time: "9:00–14:00" },
    ],
  },
  {
    id: "mobile-dental",
    name: "Sagebrook on Wheels: Dental",
    town: "Schools and senior centers",
    address: "See this week's stops",
    phone: "(555) 010-2409",
    kind: "mobile",
    x: 62,
    y: 80,
    services: ["dental"],
    hours: [{ days: WEEKDAYS, time: "8:00–14:00" }],
    stops: [
      { day: { en: "Mon", es: "Lun" }, place: "Pinecrest Middle School", time: "8:00–14:00" },
      { day: { en: "Wed", es: "Mié" }, place: "Red Mesa Senior Center", time: "9:00–14:00" },
      { day: { en: "Fri", es: "Vie" }, place: "Coldwater High School", time: "8:00–13:00" },
    ],
  },
];

/* ------------------------------------------------------------------ */
/* Providers: 100, generated from a fixed seed so every render matches */
/* ------------------------------------------------------------------ */

export type Provider = {
  id: string;
  name: string;
  credential: string;
  service: ServiceId;
  languages: LanguageId[];
  locations: string[];
  accepting: boolean;
  telehealth: boolean;
  gender: "f" | "m";
};

function rng(seed: number) {
  let a = seed >>> 0;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const FIRST_F = ["Maria", "Priya", "Aisha", "Mei", "Fatima", "Grace", "Nadia", "Sofia", "Hannah", "Leah", "Rosa", "Ana", "Elena", "Linh", "Rachel", "Teresa", "Julia", "Yesenia", "Camila", "Alma", "Noor", "Imani", "Lucia", "Tamar", "Beatriz"];
const FIRST_M = ["James", "Daniel", "Luis", "Samuel", "Carlos", "Tomas", "Ethan", "Andre", "Omar", "Miguel", "Kevin", "Diego", "Marcus", "Jorge", "Victor", "Hassan", "Paolo", "Brian", "Nathan", "Isaac", "Mateo", "Dawit", "Arjun", "Felipe", "Malik"];
const LAST = ["Garcia", "Nguyen", "Patel", "Johnson", "Martinez", "Lee", "Hernandez", "Williams", "Ramirez", "Chen", "Lopez", "Brooks", "Flores", "Kim", "Rivera", "Okafor", "Torres", "Shah", "Morales", "Bennett", "Castillo", "Ortiz", "Reyes", "Hughes", "Delgado", "Park", "Vargas", "Coleman", "Mendoza", "Ali", "Tesfaye", "Santos", "Haddad", "Wu", "Alvarez", "Cruz"];
const CREDS: Record<ServiceId, string[]> = {
  family: ["MD", "DO", "FNP", "PA-C"],
  pediatrics: ["MD", "DO", "CPNP"],
  womens: ["MD", "CNM", "WHNP"],
  behavioral: ["LCSW", "PhD", "PMHNP", "LMFT", "LPC"],
  dental: ["DDS", "DMD", "RDH"],
  optometry: ["OD"],
  internal: ["MD", "DO"],
  pharmacy: ["PharmD"],
  podiatry: ["DPM"],
  nutrition: ["RD"],
};
const COUNTS: [ServiceId, number][] = [["family", 25], ["pediatrics", 14], ["womens", 12], ["behavioral", 15], ["dental", 12], ["optometry", 5], ["internal", 8], ["pharmacy", 4], ["podiatry", 2], ["nutrition", 3]];
const EXTRA_LANGS: LanguageId[] = ["tl", "vi", "ar", "asl", "am", "zh"];

function buildProviders(): Provider[] {
  const r = rng(20261122);
  const pick = <T,>(xs: T[]) => xs[Math.floor(r() * xs.length)];
  const used = new Set<string>();
  const out: Provider[] = [];
  for (const [service, n] of COUNTS) {
    const places = locations.filter((l) => l.services.includes(service)).map((l) => l.id);
    for (let i = 0; i < n; i++) {
      const gender = r() < 0.58 ? "f" : "m";
      let name = "";
      do name = `${pick(gender === "f" ? FIRST_F : FIRST_M)} ${pick(LAST)}`;
      while (used.has(name));
      used.add(name);
      const langs: LanguageId[] = ["en"];
      if (r() < 0.47) langs.push("es");
      if (r() < 0.16) langs.push(pick(EXTRA_LANGS));
      const home = pick(places);
      const locs = [home];
      if (places.length > 1 && r() < 0.3) {
        const second = pick(places.filter((p) => p !== home));
        if (second) locs.push(second);
      }
      out.push({
        id: `p${out.length + 1}`,
        name,
        credential: pick(CREDS[service]),
        service,
        languages: [...new Set(langs)],
        locations: locs,
        accepting: r() < 0.72,
        telehealth: ["family", "behavioral", "internal", "nutrition"].includes(service) ? r() < 0.75 : r() < 0.15,
        gender,
      });
    }
  }
  return out;
}

export const providers: Provider[] = buildProviders();

/* ------------------------------------------------------------------ */
/* Costs, insurance and site pages                                     */
/* ------------------------------------------------------------------ */

/** Sliding-fee scale by household income as a share of the federal poverty guidelines (illustrative). */
export const slidingFee: { band: string; medical: string; dental: string }[] = [
  { band: "≤ 100%", medical: "$20", dental: "$30" },
  { band: "101–125%", medical: "$30", dental: "$45" },
  { band: "126–150%", medical: "$40", dental: "$60" },
  { band: "151–175%", medical: "$55", dental: "$75" },
  { band: "176–200%", medical: "$70", dental: "$90" },
  { band: "> 200%", medical: "Full fee", dental: "Full fee" },
];

export const insurance: L10n[] = [
  { en: "Medicaid", es: "Medicaid" },
  { en: "Medicare", es: "Medicare" },
  { en: "CHIP (children's coverage)", es: "CHIP (cobertura infantil)" },
  { en: "Most marketplace plans", es: "La mayoría de planes del mercado" },
  { en: "Most employer plans", es: "La mayoría de planes de empleadores" },
  { en: "No insurance: sliding fee", es: "Sin seguro: tarifa con descuento" },
];

export type SitePage = { id: string; title: L10n; summary: L10n; terms: string[]; view: View };
export type View = "home" | "providers" | "locations" | "costs" | "search";

export const sitePages: SitePage[] = [
  { id: "sliding-fee", title: { en: "Sliding-fee discounts", es: "Descuentos por ingresos" }, summary: { en: "Pay based on your household size and income. No one is turned away.", es: "Pague según el tamaño e ingresos de su hogar. Atendemos a todos." }, terms: ["cost", "costs", "price", "prices", "afford", "affordable", "cheap", "discount", "sliding", "sliding fee", "sliding scale", "uninsured", "no insurance", "payment", "pay", "bill", "costo", "precio", "descuento", "pagar", "sin seguro"], view: "costs" },
  { id: "insurance", title: { en: "Insurance we accept", es: "Seguros que aceptamos" }, summary: { en: "Medicaid, Medicare, CHIP and most marketplace and employer plans.", es: "Medicaid, Medicare, CHIP y la mayoría de planes del mercado y de empleadores." }, terms: ["insurance", "medicaid", "medicare", "chip", "coverage", "marketplace", "plan", "seguro", "cobertura"], view: "costs" },
  { id: "portal", title: { en: "Patient portal", es: "Portal del paciente" }, summary: { en: "See results, message your care team and request refills.", es: "Vea resultados, escriba a su equipo de salud y pida resurtidos." }, terms: ["portal", "results", "lab results", "records", "message", "login", "log in", "account", "mychart", "resultados", "cuenta", "mensaje"], view: "home" },
  { id: "appointments", title: { en: "Book an appointment", es: "Hacer una cita" }, summary: { en: "Book online, call us or walk in at Juniper Falls and Red Mesa.", es: "Reserve en línea, llámenos o venga sin cita a Juniper Falls y Red Mesa." }, terms: ["appointment", "book", "schedule", "walk in", "walk-in", "same day", "new patient", "cita", "citas", "agendar", "sin cita"], view: "home" },
  { id: "vaccines", title: { en: "Vaccines and flu shots", es: "Vacunas y vacuna contra la gripe" }, summary: { en: "Childhood vaccines and seasonal flu shots at every clinic.", es: "Vacunas infantiles y contra la gripe en todas las clínicas." }, terms: ["vaccine", "vaccines", "vaccination", "immunization", "shot", "shots", "flu shot", "covid", "vacuna", "vacunas", "inyeccion"], view: "home" },
  { id: "mobile", title: { en: "Mobile health units", es: "Unidades móviles de salud" }, summary: { en: "Medical and dental vans visit schools, shelters and farm communities.", es: "Camionetas médicas y dentales visitan escuelas, albergues y comunidades agrícolas." }, terms: ["mobile", "van", "bus", "on wheels", "outreach", "movil", "camioneta"], view: "locations" },
];

/** Event plan for GA4 through Google Tag Manager (what the demo pushes to its own dataLayer). */
export const eventPlan: { event: string; when: string; params: string }[] = [
  { event: "page_view", when: "A page or view opens", params: "page_path, language" },
  { event: "site_search", when: "A search is run", params: "search_term, results_count, corrected_to" },
  { event: "provider_filter", when: "A provider filter changes", params: "filter_name, filter_value, results_count" },
  { event: "provider_profile_view", when: "A provider card is opened", params: "provider_id, service, location" },
  { event: "book_appointment_click", when: "Any booking button", params: "placement, provider_id, location" },
  { event: "patient_portal_click", when: "Portal sign-in", params: "placement" },
  { event: "click_to_call", when: "A phone number is tapped", params: "location" },
  { event: "get_directions", when: "Directions to a location", params: "location" },
  { event: "language_switch", when: "English / Español toggle", params: "language" },
];

/** Interface text in both languages. */
export const t = {
  en: {
    emergency: "In an emergency, call 911.",
    nav: { home: "Home", providers: "Find a provider", locations: "Locations", costs: "Costs & insurance" },
    portal: "Patient portal",
    book: "Book appointment",
    bookShort: "Book",
    heroTitle: "Care for every family in the valley.",
    heroText: "Doctors, dentists and counsellors at 7 clinics and 2 mobile units. Everyone is welcome, with or without insurance.",
    searchLabel: "Search the site",
    searchPlaceholder: "Try “dentsit”, “pap smear” or “dientes”",
    searchButton: "Search",
    quick: { providers: "Find a provider", locations: "Clinics near you", sameDay: "Same-day care", costs: "Pay on a sliding scale" },
    servicesTitle: "Our services",
    providerTitle: "Find a provider",
    filters: { service: "Service", language: "Language", location: "Location", accepting: "Accepting new patients", telehealth: "Offers video visits", name: "Name", any: "Any", clear: "Clear filters" },
    results: (n: number) => `${n} provider${n === 1 ? "" : "s"}`,
    acceptingYes: "Accepting new patients",
    acceptingNo: "Not accepting new patients",
    video: "Video visits",
    speaks: "Speaks",
    showMore: "Show more",
    locationsTitle: "Locations",
    mapLabel: "Map of Sagebrook clinics and mobile unit stops",
    walkIn: "Walk-ins welcome",
    hours: "Hours",
    call: "Call",
    directions: "Directions",
    thisWeek: "This week's stops",
    mobileUnit: "Mobile unit",
    clinic: "Clinic",
    allServices: "All services",
    costsTitle: "Costs and insurance",
    feeIntro: "If your household income is at or below 200% of the federal poverty guidelines, you pay a reduced flat fee per visit. Bring proof of income, or tell us you have none.",
    feeHead: { band: "Household income (% of poverty guidelines)", medical: "Medical visit", dental: "Dental visit" },
    insuranceTitle: "Insurance we accept",
    searchResultsFor: (q: string) => `Results for “${q}”`,
    showingFor: (q: string) => `Showing results for “${q}”`,
    noResults: "No results. Try a service like “dental” or call us.",
    groups: { services: "Services", providers: "Providers", locations: "Locations", pages: "Pages" },
    demoNotice: "Demo site with invented data",
  },
  es: {
    emergency: "En una emergencia, llame al 911.",
    nav: { home: "Inicio", providers: "Buscar proveedor", locations: "Ubicaciones", costs: "Costos y seguros" },
    portal: "Portal del paciente",
    book: "Hacer una cita",
    bookShort: "Cita",
    heroTitle: "Atención para cada familia del valle.",
    heroText: "Médicos, dentistas y consejeros en 7 clínicas y 2 unidades móviles. Todos son bienvenidos, con o sin seguro.",
    searchLabel: "Buscar en el sitio",
    searchPlaceholder: "Pruebe “dentsit”, “papanicolau” o “dientes”",
    searchButton: "Buscar",
    quick: { providers: "Buscar proveedor", locations: "Clínicas cercanas", sameDay: "Citas el mismo día", costs: "Pague según sus ingresos" },
    servicesTitle: "Nuestros servicios",
    providerTitle: "Buscar proveedor",
    filters: { service: "Servicio", language: "Idioma", location: "Ubicación", accepting: "Acepta pacientes nuevos", telehealth: "Ofrece consultas por video", name: "Nombre", any: "Cualquiera", clear: "Borrar filtros" },
    results: (n: number) => `${n} proveedor${n === 1 ? "" : "es"}`,
    acceptingYes: "Acepta pacientes nuevos",
    acceptingNo: "No acepta pacientes nuevos",
    video: "Consultas por video",
    speaks: "Habla",
    showMore: "Ver más",
    locationsTitle: "Ubicaciones",
    mapLabel: "Mapa de las clínicas Sagebrook y paradas de las unidades móviles",
    walkIn: "Se atiende sin cita",
    hours: "Horario",
    call: "Llamar",
    directions: "Cómo llegar",
    thisWeek: "Paradas de esta semana",
    mobileUnit: "Unidad móvil",
    clinic: "Clínica",
    allServices: "Todos los servicios",
    costsTitle: "Costos y seguros",
    feeIntro: "Si el ingreso de su hogar está en o por debajo del 200% de las pautas federales de pobreza, paga una tarifa fija reducida por consulta. Traiga comprobante de ingresos, o díganos si no tiene.",
    feeHead: { band: "Ingreso del hogar (% de las pautas de pobreza)", medical: "Consulta médica", dental: "Consulta dental" },
    insuranceTitle: "Seguros que aceptamos",
    searchResultsFor: (q: string) => `Resultados para “${q}”`,
    showingFor: (q: string) => `Mostrando resultados para “${q}”`,
    noResults: "Sin resultados. Pruebe un servicio como “dental” o llámenos.",
    groups: { services: "Servicios", providers: "Proveedores", locations: "Ubicaciones", pages: "Páginas" },
    demoNotice: "Sitio de demostración con datos inventados",
  },
};
