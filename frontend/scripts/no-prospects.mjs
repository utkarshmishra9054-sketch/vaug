// Pre-deploy check: no company we are pitching may appear on vaug.in (as a client,
// logo, case study, testimonial or demo). Reads the Sales Agent's prospect names
// (docs/outreach/vaug-sales/prospects.json: { leadId: [name, alias, ...] }) and
// searches every file under frontend/src and frontend/public for them.
//
//   npm run no-prospects            (exits 1 on any match)
//
// The prospect list is private and not in git, so on machines without it the
// check is skipped with a notice rather than failing.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const frontend = path.resolve(here, "..");
const listPath = process.env.PROSPECTS_JSON ?? path.resolve(frontend, "../docs/outreach/vaug-sales/prospects.json");

if (!fs.existsSync(listPath)) {
  console.log(`Skipped: no prospect list at ${listPath}`);
  process.exit(0);
}
const prospects = JSON.parse(fs.readFileSync(listPath, "utf8"));
const names = Object.entries(prospects).flatMap(([lead, list]) => list.map((name) => ({ lead, name })));
const escape = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const patterns = names.map(({ lead, name }) => ({ lead, name, re: new RegExp(`(?<![A-Za-z0-9])${escape(name)}(?![A-Za-z0-9])`, "i") }));

const TEXT = /\.(tsx?|jsx?|mjs|css|json|md|txt|svg|html|xml)$/i;
function* walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(p);
    else yield p;
  }
}

let hits = 0;
for (const root of ["src", "public"]) {
  const dir = path.join(frontend, root);
  if (!fs.existsSync(dir)) continue;
  for (const file of walk(dir)) {
    const rel = path.relative(frontend, file);
    // File names count too (a logo called iacet.svg is still a logo).
    for (const { lead, name, re } of patterns) {
      if (re.test(path.basename(file))) {
        console.log(`FOUND ${rel} (file name): "${name}" [${lead}]`);
        hits++;
      }
    }
    if (!TEXT.test(file)) continue;
    const lines = fs.readFileSync(file, "utf8").split("\n");
    lines.forEach((line, i) => {
      for (const { lead, name, re } of patterns) {
        if (re.test(line)) {
          console.log(`FOUND ${rel}:${i + 1}: "${name}" [${lead}] :: ${line.trim().slice(0, 120)}`);
          hits++;
        }
      }
    });
  }
}
console.log(hits ? `\n${hits} prospect mention(s) found. Remove them before deploying.` : `No prospect names found (${names.length} names checked).`);
process.exit(hits ? 1 : 0);
