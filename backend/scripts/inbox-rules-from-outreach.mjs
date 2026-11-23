#!/usr/bin/env node
/**
 * Builds the inbox reader's default client rules from the Sales Agent's private outreach files:
 * - docs/outreach/vaug-sales/prospects.json: buyer names and aliases;
 * - docs/outreach/vaug-sales/leads/<id>/requirements.md: each lead's brief (buyer, website, contact and
 *   submission emails) and the RFP numbers or buyer acronyms in its title line.
 *
 *   node scripts/inbox-rules-from-outreach.mjs          # writes data/inbox-rules.json, prints counts only
 *   node scripts/inbox-rules-from-outreach.mjs --value  # also prints the one-line JSON for INBOX_RULES
 *
 * The output names VAUG's prospects, so it never goes into git (the repository is public; data/ and
 * docs/outreach/ are git-ignored). It reaches vaug-api as the INBOX_RULES variable in Railway.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const backend = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const outreach = path.resolve(backend, "../docs/outreach/vaug-sales");
const outFile = path.join(backend, "data", "inbox-rules.json");

// Free-mail and shared platform domains can't identify a buyer.
const SKIP_DOMAINS = new Set([
  "gmail.com", "googlemail.com", "outlook.com", "hotmail.com", "live.com", "yahoo.com", "icloud.com", "me.com", "aol.com", "proton.me", "protonmail.com",
  "zoho.com", "gmx.com", "yandex.com", "rediffmail.com", "vaug.in", "linkedin.com", "lnkd.in", "google.com", "docs.google.com", "forms.gle", "drive.google.com",
  "gov.in", "nic.in", "gov.uk", "gov", "opengov.com", "procurement.opengov.com", "bonfirehub.com", "find-tender.service.gov.uk", "contractsfinder.service.gov.uk",
  "typeform.com", "wix.com", "wixsite.com", "github.com", "medium.com", "substack.com", "upwork.com", "fiverr.com",
]);
const VAGUE_BUYER = /unnamed|unidentified|confidential|not found|not given|unknown|various/i;

const hostOf = (value) => {
  try {
    return new URL(/^https?:\/\//.test(value) ? value : `https://${value}`).hostname.toLowerCase().replace(/^www\./, "");
  } catch {
    return "";
  }
};
const emailDomains = (value) => [...String(value ?? "").matchAll(/[A-Za-z0-9._%+-]+@([A-Za-z0-9.-]+\.[A-Za-z]{2,})/g)].map((m) => m[1].toLowerCase());
const usableDomain = (d) => d && d.includes(".") && !SKIP_DOMAINS.has(d) && ![...SKIP_DOMAINS].some((s) => d.endsWith(`.${s}`) && s.includes("."));

const names = new Map(); // lowercased -> as written
const domains = new Set();
const rfps = new Map();
const addName = (n) => {
  // Drop descriptions in brackets ("Example Transit (Springfield, IL)"); acronyms are picked up from titles.
  const name = String(n ?? "").replace(/\s*\([^)]*\)/g, "").replace(/\s+/g, " ").trim();
  // Lower-case phrases ("climate research programme") describe a buyer rather than name one.
  const generic = name.includes(" ") && name === name.toLowerCase();
  if (name.length >= 3 && !generic && !VAGUE_BUYER.test(name) && !names.has(name.toLowerCase())) names.set(name.toLowerCase(), name);
};
const addRfp = (r) => {
  const id = String(r ?? "").trim();
  // Reference numbers always carry a digit ("AB-012", "XYZ0042"); this skips words like "RFP Ready".
  if (id.length >= 3 && /\d/.test(id) && !rfps.has(id.toLowerCase())) rfps.set(id.toLowerCase(), id);
};

// 1. prospects.json: { leadId: [name, alias, ...] }
const prospects = JSON.parse(fs.readFileSync(path.join(outreach, "prospects.json"), "utf8"));
for (const list of Object.values(prospects)) for (const name of list) addName(name);

// 2. Each lead's requirements.md.
const leadsDir = path.join(outreach, "leads");
let leads = 0;
for (const id of fs.existsSync(leadsDir) ? fs.readdirSync(leadsDir).sort() : []) {
  const file = path.join(leadsDir, id, "requirements.md");
  if (!fs.existsSync(file)) continue;
  leads++;
  const text = fs.readFileSync(file, "utf8");
  const brief = (() => {
    const m = text.match(/\{"leadId"[\s\S]*?\}\s*$/m);
    try {
      return m ? JSON.parse(m[0]) : {};
    } catch {
      return {};
    }
  })();

  for (const d of [...emailDomains(brief.contactEmail), ...emailDomains(brief.submitTo), hostOf(brief.buyerWebsite ?? "")]) if (usableDomain(d)) domains.add(d);
  for (const buyer of String(brief.buyer ?? "").split(/;\s*/)) addName(buyer);

  // Title line, e.g. "# L-…: Example Trust (Website rebuild, RFP ET-2026-WEB-01)".
  const title = (text.split("\n")[0] ?? "").replace(/^#\s*L-[\d-]+:\s*/, "");
  for (const m of title.matchAll(/\b(?:RFP|RFQ|RFI|ITT|tender|bid)\s+(?:no\.?\s*)?([A-Z0-9][A-Za-z0-9./-]{2,})/gi)) addRfp(m[1].replace(/[.,;)]+$/, ""));
  for (const m of title.matchAll(/\b(?=[A-Z0-9-]*\d)(?=[A-Z0-9-]*[A-Z])[A-Z0-9]+(?:-[A-Z0-9]+)+\b|\b[A-Z]{2,}\d{3,}\b/g)) addRfp(m[0]);
  // Buyer acronyms in brackets, e.g. "(EXHC website redesign)", "(ABCD)".
  for (const m of title.matchAll(/\(([A-Z]{3,6})\b/g)) addName(m[1]);
}

const rules = {
  clients: [...[...domains].sort(), ...[...names.values()].filter((n) => !domains.has(n.toLowerCase())).sort((a, b) => a.localeCompare(b))],
  rfps: [...rfps.values()].sort(),
};
fs.mkdirSync(path.dirname(outFile), { recursive: true });
fs.writeFileSync(outFile, `${JSON.stringify(rules, null, 2)}\n`);
console.log(`Read ${Object.keys(prospects).length} prospects and ${leads} lead briefs.`);
console.log(`Wrote ${path.relative(backend, outFile)}: ${domains.size} buyer domains, ${names.size} buyer names, ${rfps.size} RFP keywords (${JSON.stringify(rules).length} characters).`);
if (process.argv.includes("--value")) console.log(JSON.stringify(rules));
