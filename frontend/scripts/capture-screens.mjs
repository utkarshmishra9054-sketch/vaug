#!/usr/bin/env node
/**
 * Pre-renders every drawn case-study screen (src/components/case-studies/screens) to a WebP image, so
 * listing cards, home strips and most of each study's gallery can show an image instead of shipping the
 * screen's markup and code. Run it after adding or changing a study's drawn screens:
 *
 *   npm run build && npm run start -- -p 3400        # in one terminal
 *   npx -p playwright@1.57.0 node scripts/capture-screens.mjs http://localhost:3400 [slug ...]
 *
 * (First time: `npx playwright@1.57.0 install webkit`.) It captures in WebKit (the iPhone engine) at 3x,
 * so each 640 x 400 canvas becomes a 1920 x 1200 image, converts it with `cwebp` (brew install webp),
 * writes public/case-studies/screens/<slug>-<n>.webp and regenerates screens/manifest.ts.
 * With no slugs it captures every study listed in screens/index.ts. It must run against a build where the
 * screens still render live (the gallery's live first screen is enough for new studies only if they have
 * one screen; otherwise temporarily remove the study from manifest.ts first so all its screens render live).
 */
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const [base = "http://localhost:3400", ...only] = process.argv.slice(2);
const index = fs.readFileSync(path.join(root, "src/components/case-studies/screens/index.ts"), "utf8");
const all = [...index.matchAll(/^\s+"([a-z0-9-]+)":\s*[A-Za-z]+Screens/gm)].map((m) => m[1]);
const slugs = only.length ? only : all;
const outDir = path.join(root, "public/case-studies/screens");
const tmp = fs.mkdtempSync(path.join((await import("node:os")).tmpdir(), "vaug-screens-"));
fs.mkdirSync(outDir, { recursive: true });

const { webkit } = await import("playwright");
const browser = await webkit.launch();
const page = await (await browser.newContext({ viewport: { width: 1440, height: 1000 }, deviceScaleFactor: 3 })).newPage();
const manifestPath = path.join(root, "src/components/case-studies/screens/manifest.ts");
const existing = fs.existsSync(manifestPath) ? Object.fromEntries([...fs.readFileSync(manifestPath, "utf8").matchAll(/"([a-z0-9-]+)": (\d+)/g)].map((m) => [m[1], Number(m[2])])) : {};
const counts = { ...existing };

for (const slug of slugs) {
  await page.goto(`${base}/case-studies/${slug}`, { waitUntil: "networkidle" });
  // Force each gallery canvas to its design size, so it renders at scale 1 (x3 for the image), and lift
  // the page's overflow clipping, which would otherwise cut off a canvas wider than its grid cell.
  await page.addStyleTag({ content: 'button[aria-label^="Enlarge screen"]{width:640px!important;max-width:none!important} html,body,main,section:not(.shot *),div:not(.shot, .shot *){overflow:visible!important;overflow-x:visible!important}' });
  await page.evaluate(async () => {
    document.querySelectorAll("[data-reveal]").forEach((e) => e.classList.add("is-visible"));
    await document.fonts.ready;
  });
  const shots = await page.$$('button[aria-label^="Enlarge screen"]:has(.shot) .shot');
  let n = 0;
  for (const shot of shots) {
    // Lift this canvas above its neighbours, which overlap it once it's wider than its grid cell.
    await shot.evaluate((el) => document.querySelectorAll('button[aria-label^="Enlarge screen"]').forEach((b) => b.style.cssText += b.contains(el) ? ';position:relative;z-index:9999' : ';z-index:auto'));
    await shot.scrollIntoViewIfNeeded();
    await page.waitForTimeout(350);
    const png = path.join(tmp, `${slug}-${++n}.png`);
    await shot.screenshot({ path: png });
    execFileSync("cwebp", ["-quiet", "-q", "80", "-m", "6", png, "-o", path.join(outDir, `${slug}-${n}.webp`)]);
  }
  if (n) counts[slug] = n;
  console.log(slug, n);
}
await browser.close();

const sorted = Object.fromEntries(Object.entries(counts).sort(([a], [b]) => a.localeCompare(b)));
fs.writeFileSync(
  manifestPath,
  `/**
 * Pre-rendered images of the drawn case-study screens, made by scripts/capture-screens.mjs (WebKit, 3x).
 * Cards, home strips and study galleries show these instead of rendering the screens, which keeps the
 * screen code out of the browser bundle and the markup out of the HTML. Regenerate after changing screens.
 */
export const SCREEN_IMAGE = { width: 1920, height: 1200 } as const;

/** Number of drawn screens per study slug. */
export const SCREEN_COUNTS: Record<string, number> = ${JSON.stringify(sorted, null, 2).replace(/\n/g, "\n")};

export const screenCount = (slug: string) => SCREEN_COUNTS[slug] ?? 0;

/** Path of a study's drawn screen (0-based index). */
export const screenImage = (slug: string, index: number) => \`/case-studies/screens/\${slug}-\${index + 1}.webp\`;
`,
);
console.log(`Wrote ${Object.keys(sorted).length} studies to screens/manifest.ts`);
