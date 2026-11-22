// Accessibility check for vaug.in: runs axe-core (WCAG 2.0, 2.1 and 2.2 A/AA rules
// plus best practices) on every URL in the sitemap of a running build, in several
// views, through headless Chrome. Run it before each release:
//
//   npm run build && npm run start -- --port 3400   (in another terminal)
//   npm run a11y -- http://localhost:3400
//
// Options (environment variables):
//   A11Y_MODES   comma list of light-desktop, dark-desktop, light-mobile, dark-mobile
//   A11Y_REVEAL  "0" to test as a visitor would on load (no scrolling first)
//   A11Y_FILTER  only URLs containing this text ("=/path" for one exact path)
//   A11Y_OUT     write the full results to this JSON file
//   CHROME_PATH  Chrome or Chromium binary (defaults to the macOS install)
// Exits with code 1 when any violation is found.
import { spawn } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const base = (process.argv[2] ?? "http://localhost:3400").replace(/\/$/, "");
const modes = (process.env.A11Y_MODES ?? "light-desktop,dark-desktop,light-mobile").split(",");
const reveal = process.env.A11Y_REVEAL !== "0";
const filter = process.env.A11Y_FILTER ?? "";
const out = process.env.A11Y_OUT;
const chromePath = process.env.CHROME_PATH ?? "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const AXE = fs.readFileSync(require.resolve("axe-core/axe.min.js"), "utf8");
const VIEWS = {
  "light-desktop": { w: 1280, h: 900, theme: "light", mobile: false },
  "dark-desktop": { w: 1280, h: 900, theme: "dark", mobile: false },
  "light-mobile": { w: 390, h: 844, theme: "light", mobile: true },
  "dark-mobile": { w: 390, h: 844, theme: "dark", mobile: true },
};
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const sitemap = await (await fetch(`${base}/sitemap.xml`)).text();
let urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].replace(/^https?:\/\/[^/]+/, base));
urls.push(`${base}/this-page-does-not-exist`);
// A11Y_FILTER="=/path" matches one exact path; otherwise any URL containing the text.
if (filter) urls = filter.startsWith("=") ? urls.filter((u) => (u.replace(base, "") || "/") === filter.slice(1)) : urls.filter((u) => u.includes(filter));

const port = 9600 + Math.floor(Math.random() * 300);
const profile = fs.mkdtempSync(path.join(os.tmpdir(), "vaug-a11y-"));
const chrome = spawn(chromePath, ["--headless=new", "--disable-gpu", "--hide-scrollbars", `--remote-debugging-port=${port}`, `--user-data-dir=${profile}`, "about:blank"], { stdio: "ignore" });
let target;
for (let i = 0; i < 50 && !target; i++) {
  await sleep(200);
  try {
    target = (await (await fetch(`http://127.0.0.1:${port}/json`)).json()).find((t) => t.type === "page");
  } catch {
    // Chrome still starting.
  }
}
if (!target) throw new Error(`Could not start Chrome at ${chromePath}`);
const ws = new WebSocket(target.webSocketDebuggerUrl);
await new Promise((r) => (ws.onopen = r));
let id = 0;
const pending = new Map();
ws.onmessage = (m) => {
  const d = JSON.parse(m.data);
  if (d.id && pending.has(d.id)) {
    pending.get(d.id)(d);
    pending.delete(d.id);
  }
};
const send = (method, params = {}) =>
  new Promise((r) => {
    const i = ++id;
    pending.set(i, r);
    ws.send(JSON.stringify({ id: i, method, params }));
  });
const evaluate = async (expression) => (await send("Runtime.evaluate", { expression, awaitPromise: true, returnByValue: true })).result?.result?.value;

await send("Page.enable");
const results = [];
let total = 0;
for (const name of modes) {
  const v = VIEWS[name];
  await send("Emulation.setDeviceMetricsOverride", { width: v.w, height: v.h, deviceScaleFactor: 1, mobile: v.mobile });
  const init = await send("Page.addScriptToEvaluateOnNewDocument", { source: `try{localStorage.setItem("vaug-theme","${v.theme}")}catch(e){}` });
  for (const url of urls) {
    await send("Page.navigate", { url });
    await sleep(2200);
    if (reveal) {
      // Reveal what scrolling would reveal, then let staggered entrances finish.
      await evaluate(`(async()=>{document.querySelectorAll('[data-reveal],[data-reveal-draw]').forEach(e=>e.classList.add('is-visible')); window.scrollTo(0, document.body.scrollHeight); await new Promise(r=>setTimeout(r,400)); window.scrollTo(0,0); await new Promise(r=>setTimeout(r,1800)); return true})()`);
    } else {
      // Let the entrances triggered on load finish, as a visitor would see them.
      await sleep(1800);
    }
    await evaluate(`${AXE};true`);
    const r = await evaluate(
      `(async()=>{const res=await axe.run(document,{runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21a','wcag21aa','wcag22aa','best-practice']},resultTypes:['violations']});return res.violations.map(v=>({id:v.id,impact:v.impact,help:v.help,count:v.nodes.length,nodes:v.nodes.slice(0,50).map(n=>({target:n.target.join(' '),html:n.html.slice(0,160),summary:(n.failureSummary||'').slice(0,240)}))}))})()`,
    );
    const page = url.replace(base, "") || "/";
    const n = (r ?? []).reduce((t, x) => t + x.count, 0);
    total += n;
    results.push({ view: name, url: page, violations: r ?? [] });
    console.log(`${n ? "FAIL" : "ok  "} ${name.padEnd(13)} ${page}${n ? `  (${r.map((x) => `${x.id}:${x.count}`).join(", ")})` : ""}`);
  }
  await send("Page.removeScriptToEvaluateOnNewDocument", { identifier: init.result.identifier });
}
ws.close();
chrome.kill();
await sleep(500);
try {
  fs.rmSync(profile, { recursive: true, force: true });
} catch {
  // Chrome may still hold the profile briefly.
}
if (out) fs.writeFileSync(out, JSON.stringify(results, null, 1));
console.log(`\n${results.length} page views tested, ${total} violations.`);
process.exit(total ? 1 : 0);
