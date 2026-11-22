import { languages, locations, providers, services, sitePages, type LanguageId, type Location, type Provider, type ServiceId, type SitePage } from "@/content/showcases/healthCentre";

/**
 * Site search for the health-centre showcase. Runs in the browser, no server:
 *  - accent- and case-insensitive ("dientes" = "Dientes", "nino" = "niño");
 *  - corrects misspellings against the site's own vocabulary ("dentsit" → "dentist")
 *    with an optimal-string-alignment edit distance (1 edit up to 5 letters, 2 above);
 *  - understands health terms and Spanish ("pap smear" → women's health,
 *    "teeth" → dental, "seguro" → insurance) through each item's synonym list.
 */

const STOP = new Set(["the", "a", "an", "for", "near", "me", "my", "i", "need", "to", "in", "of", "and", "with", "find", "get", "de", "la", "el", "los", "las", "para", "mi", "un", "una", "cerca", "y", "con", "en", "necesito", "busco"]);

export const normalize = (s: string) =>
  s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9/ ]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();

const words = (s: string) => normalize(s).split(" ").filter(Boolean);

/** Optimal string alignment distance (Levenshtein plus adjacent swaps), stopping early past `max`. */
function distance(a: string, b: string, max: number): number {
  if (Math.abs(a.length - b.length) > max) return max + 1;
  const d: number[][] = Array.from({ length: a.length + 1 }, (_, i) => [i, ...Array(b.length).fill(0)]);
  for (let j = 1; j <= b.length; j++) d[0][j] = j;
  for (let i = 1; i <= a.length; i++) {
    let rowMin = Infinity;
    for (let j = 1; j <= b.length; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + cost);
      if (i > 1 && j > 1 && a[i - 1] === b[j - 2] && a[i - 2] === b[j - 1]) d[i][j] = Math.min(d[i][j], d[i - 2][j - 2] + 1);
      rowMin = Math.min(rowMin, d[i][j]);
    }
    if (rowMin > max) return max + 1;
  }
  return d[a.length][b.length];
}

const serviceWords = services.map((s) => ({ id: s.id, phrases: [s.name.en, s.name.es, ...s.terms].map(normalize) }));
const pageWords = sitePages.map((p) => ({ page: p, phrases: [p.title.en, p.title.es, ...p.terms].map(normalize) }));
const languageWords: { id: LanguageId; phrases: string[] }[] = languages.map((l) => ({ id: l.id, phrases: [l.name.en, l.name.es, ...(l.id === "es" ? ["espanol", "spanish speaking", "habla espanol", "latino"] : [])].map(normalize) }));

const vocabulary = new Set<string>();
for (const group of [serviceWords, pageWords, languageWords]) for (const item of group) for (const p of item.phrases) for (const w of p.split(" ")) if (w.length > 2) vocabulary.add(w);
for (const l of locations) for (const w of words(`${l.name} ${l.town}`)) if (w.length > 2) vocabulary.add(w);
for (const p of providers) for (const w of words(p.name)) vocabulary.add(w);

/** Replaces unknown words with the closest known word; returns the corrected query if anything changed. */
export function correct(query: string): { text: string; corrected: boolean } {
  let changed = false;
  const fixed = words(query).map((w) => {
    if (w.length < 4 || vocabulary.has(w) || STOP.has(w) || /\d/.test(w)) return w;
    const max = w.length <= 5 ? 1 : 2;
    let best = w;
    let bestD = max + 1;
    for (const v of vocabulary) {
      if (Math.abs(v.length - w.length) > max) continue;
      const d = distance(w, v, max);
      if (d < bestD || (d === bestD && v[0] === w[0] && best[0] !== w[0])) {
        best = v;
        bestD = d;
      }
    }
    if (bestD <= max && best !== w) {
      changed = true;
      return best;
    }
    return w;
  });
  return { text: fixed.join(" "), corrected: changed };
}

/** A phrase matches when all its words appear in the query as whole words. */
const matches = (q: string, phrase: string) => ` ${q} `.includes(` ${phrase} `) || (phrase.length > 3 && q.split(" ").includes(phrase));

export type SearchResult = {
  query: string;
  correctedTo: string | null;
  services: ServiceId[];
  providers: Provider[];
  locations: Location[];
  pages: SitePage[];
  total: number;
};

export function searchSite(raw: string): SearchResult {
  const { text, corrected } = correct(raw);
  const q = words(text)
    .filter((w) => !STOP.has(w))
    .join(" ");
  const empty: SearchResult = { query: raw, correctedTo: null, services: [], providers: [], locations: [], pages: [], total: 0 };
  if (!q) return empty;

  // Generic words ("doctor") only pick family medicine when nothing more specific matched ("eye doctor" = vision care).
  const GENERIC = new Set(["doctor", "physician", "medico", "medica", "sick"]);
  const hits = serviceWords.map((s) => ({ id: s.id, specific: s.phrases.some((p) => !GENERIC.has(p) && matches(q, p)), any: s.phrases.some((p) => matches(q, p)) }));
  const svc = (hits.some((h) => h.specific) ? hits.filter((h) => h.specific) : hits.filter((h) => h.any)).map((h) => h.id);
  const pages = pageWords.filter((p) => p.phrases.some((ph) => matches(q, ph))).map((p) => p.page);
  const lang = languageWords.find((l) => l.id !== "en" && l.phrases.some((p) => matches(q, p)))?.id;
  const qWords = q.split(" ");

  const locs = locations.filter((l) => {
    const lw = words(`${l.name} ${l.town}`).filter((w) => w.length > 3 && !["health", "center", "clinic", "community"].includes(w));
    return lw.some((w) => qWords.includes(w)) || (svc.length > 0 && svc.some((s) => l.services.includes(s)) && qWords.length <= 3);
  });

  const byName = providers.filter((p) => {
    const pw = words(p.name);
    return qWords.some((w) => w.length > 2 && pw.includes(w));
  });
  const byService = svc.length
    ? providers
        .filter((p) => svc.includes(p.service) && (!lang || p.languages.includes(lang)))
        .sort((a, b) => Number(b.accepting) - Number(a.accepting))
    : lang
      ? providers.filter((p) => p.languages.includes(lang))
      : [];
  const provs = [...new Map([...byName, ...byService].map((p) => [p.id, p])).values()];

  return {
    query: raw,
    correctedTo: corrected ? text : null,
    services: svc,
    providers: provs,
    locations: locs.slice(0, 6),
    pages,
    total: svc.length + provs.length + Math.min(locs.length, 6) + pages.length,
  };
}
