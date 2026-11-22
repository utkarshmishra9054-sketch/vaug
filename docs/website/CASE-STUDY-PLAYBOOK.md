# Case study playbook

How to add (or upgrade) a client case study on vaug.in, fast. Written 22 Nov 2026 for the VAUG Website Improver session. Follow it top to bottom for each company Utkarsh names.

The Sales Agent uses these studies as proof in proposals, matched to the industry a lead needs. Every study links to the client's real website, so the write-up must match what that business really is.

---

## 0. Ground rules

- **VAUG built it end to end.** Write in the first person plural ("we built"). Never use the Apidel name. Never mention Utkarsh's day job.
- **No prices, no certifications.** Say "built to GDPR, aligned with ISO 27001" if compliance comes up. Never "certified".
- **Invented numbers are drafts.** Anything Utkarsh didn't give you is illustrative: set `placeholder: true`, mark each invented figure with `// TODO(content): …`, and add the study to `CONTENT_GAPS.md`. Drafts stay live on purpose; never hide or delete them.
- **Don't "fix" the site's other contradictions** (60+ projects vs 120+ clients, 40+ people vs a team of seven, and so on). They're Utkarsh's call.
- **Upgrade in place.** If the client already has a study, rewrite that one under its existing slug. Never add a second study for the same client.
- **Don't copy third-party UIs** (Google, Meta, HubSpot, Linear, WhatsApp's own app chrome) in *new* screens. A WhatsApp-style chat bubble is fine; a pixel copy of WhatsApp Web is not. Older screens in `screens/tools.tsx` copy Google Ads, Meta and Search Console. Don't extend that pattern.

---

## 1. Where everything lives

| What | Where |
|---|---|
| Study data (engineering and AI studies) | `frontend/src/content/caseStudies.ts`, one object per study in a single array |
| Study data (growth/marketing studies for the client wall) | `frontend/src/content/clientStudies/<slug>.ts`, one file each, listed in `clientStudies/index.ts` |
| The shape of a study | `CaseStudyDetail` in `frontend/src/content/types.ts` |
| Detail page | `frontend/src/app/case-studies/[slug]/page.tsx` (static, `generateStaticParams` from the array) |
| Listing and filters | `frontend/src/app/case-studies/page.tsx` + `components/case-studies/CaseStudyExplorer.tsx` (filters: sector, service, client type, region) |
| Drawn product screens | `frontend/src/components/case-studies/screens/<name>.tsx`, registered by slug in `screens/index.ts` |
| Screen building blocks | `screens/kit.tsx` (app shell, KPIs, tables, charts, tags, toggles, WhatsApp bubbles) and `components/sections/mocks/kit.tsx` (`Phone`, `Laptop`, `Browser`, `Tablet`, `Avatar`, `Pill`, `Ring`, `TONES`) |
| Gallery and screen viewer | `components/case-studies/ScreenFrame.tsx` (one gallery tile) and `ShotGallery.tsx` (tap-to-zoom viewer) |
| Hero visual | `components/sections/CaseStudies.tsx` → `ScreenMock` → `BoardCarousel` cycles the study's drawn screens automatically |
| Client logo (colour) | `frontend/public/logos/<client>.webp`, then run `node scripts/measure-logos.mjs` from `frontend/` to refresh `content/logoMetrics.ts` |
| Website screenshot | `frontend/public/sites/<client>.webp`, 1440 × 900 |
| Extra real screenshots | `frontend/public/case-studies/<slug>/<name>.webp`, listed in `images` |
| Home client wall | `content/home.ts` builds it from every study (`shortClient` holds short names for long client names) |
| Open questions | `CONTENT_GAPS.md` at the repo root |

The 2023 VAUG proposal PDF (source of CBD2Heal, CareerNaksha, Think3D, Vivin Design, Phoenix Institute, the logos and the testimonials) is **not on this Mac any more**. Its content survives in `docs/pitch-deck-content.md` (Part 2) and `PROPOSAL_CONTENT_PLAN.md`. Ask Utkarsh if you need the original.

---

## 2. Research (15-30 min)

1. **Search the repo first:** `grep -ri "<client>" docs frontend/src CONTENT_GAPS.md PROPOSAL_CONTENT_PLAN.md`. The client may already have a study, logo or screenshot.
2. **Read their live website.** What they sell, to whom, where (city, catchment), how customers book or buy, their published services and fees page, reviews, team. The study must describe *this* business.
3. **Decide the engagement.** If nothing is recorded, infer a credible end-to-end build from what their business needs (a clinic needs booking, reminders, intake and staff handover; a retailer needs a storefront, catalogue and fulfilment). Write each assumption down as you go; it goes to Utkarsh at the end.
4. **Pick the taxonomy** (`frontend/src/content/taxonomy.ts`):
   - `service`: one of `ai-as-a-service`, `dedicated-developers`, `custom-development`, `build-with-us`, `monthly-retainer`, `launch-and-rescue`.
   - `sector` (optional): `fintech-insurance`, `healthcare`, `real-estate`, `ecommerce-retail`, `logistics`, `hospitality-travel`. Leave it out for other industries; `industry` is free text and shows instead.
   - `region`: `UK`, `Europe`, `UAE`, `India`, `Canada`, `Singapore`, `Australia`, `USA`, `Brazil`. To add one, extend `Region` in `types.ts` and `regions` in `taxonomy.ts`.
   - `clientType`: `Startup`, `Enterprise`, `HNI`, `Agency`.

## 3. Brand (10 min)

Take these from the live site, not from memory:

- **Colours:** open the site's CSS (DevTools or `curl` the stylesheet) and pull the exact hex codes for the primary, secondary and accent colours. Write them as constants at the top of the screen file. Set the study's `tint` to the darkest brand colour that still reads white text (it colours the hero, frames and the mid-page CTA).
- **Fonts:** read `font-family` from the CSS. Use the same Google font if it is one; otherwise the closest match. Load it only inside the screens via an inline `style={{ fontFamily }}` with a system fallback stack (the site doesn't load client fonts globally; check `app/layout.tsx` before adding one).
- **Logo:** download the SVG or PNG from their header. Convert to WebP: `cwebp -q 90 in.png -o frontend/public/logos/<client>.webp` (for SVG, screenshot it at 2× on white first). Keep a transparent or white background. Run `node scripts/measure-logos.mjs` in `frontend/`.

## 4. Real screenshots (10 min)

Capture 2 or 3 real screenshots of their website:

- **Desktop home page**, 1440 × 900 (this one is required: `website.image`). Save as `frontend/public/sites/<client>.webp`.
- **One inner page** (services, booking or pricing) at 1440 × 900, and **one mobile view** at 390 wide. Save under `frontend/public/case-studies/<slug>/` and list them in `images` (they show first in the gallery, before the drawn screens, and need matching captions at the start of `screenshots`).
- How: use the browser pane (`preview_start` with the URL, `resize_window` to the size, dismiss cookie banners with the most private option, then `computer` screenshot), or headless Chrome:
  `"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless --screenshot=out.png --window-size=1440,900 --hide-scrollbars https://example.com`
  then `cwebp -q 82 out.png -o out.webp`.
- Record `width` and `height` exactly; the gallery and the viewer use them for aspect ratio and zoom.

## 5. Write-up (30-45 min)

Copy an existing study as the template. `patient-whatsapp-voice-agent-manchester` (AI agent), `physio-booking-app-dubai` (custom app) and `reconciliation-agent-frankfurt-payments` (AI agent for finance) are the strongest. Fill every field of `CaseStudyDetail`:

| Field | Notes |
|---|---|
| `slug` | `<what>-<sector>-<city>`, lower case, e.g. `patient-whatsapp-voice-agent-manchester`. Never change an existing slug (links are already shared). |
| `client`, `city`, `region`, `clientType`, `stage`, `industry`, `sector`, `service`, `model` | `model` is the short card label (e.g. "AI as a Service"). |
| `icon` | An `IconName` from `types.ts`. |
| `title` | Outcome-first, Title Case, about 8-12 words. |
| `summary` | One sentence: what we built and what it does. |
| `metrics` | 3 card metrics. `results.metrics` has 4 (the same 3 plus one). |
| `tint` | Brand colour (see Brand). |
| `screen` | 3 label/value rows for the home-page mock. Keep them consistent with the drawn screens. |
| `logo`, `website` | `/logos/<client>.webp`; `{ url, image: { src: "/sites/<client>.webp", alt, width: 1440, height: 900 } }`. |
| `domain` | Short description of the product, e.g. "AI agent (patient messaging and voice)". |
| `techStack` | 5-7 items. |
| `duration`, `team` | e.g. "10 weeks", "4 people: PM, 2 AI engineers, designer". |
| `about` | 3-5 sentences about the real business. |
| `problems` | 4 × `f("Short title.", "One sentence.")`. |
| `solution` | One paragraph, 5-7 sentences. |
| `features` | 5-6 modules, one sentence each. |
| `challenges` | 3, one sentence each. |
| `approach` | 4-5 phases with `p(phase, "Weeks 1–2", description)`. |
| `results` | 4 metrics plus a 2-3 sentence narrative. |
| `testimonial` | Only a real, approved quote. Otherwise leave it out (the slot renders only when present). |
| `screenshots` | One caption per gallery screen, in order: real `images` first, then drawn screens. Captions are shown under each screen and in the viewer. |
| `ctaHeading` | A question to the reader, e.g. "Want an agent that answers every patient in seconds?" |
| `campaign` | `true` only for ads/SEO/social work (changes the gallery title). |
| `placeholder` | `true` while any figure is illustrative. |

Numbers: conservative and plausible for the client's size. A single clinic doesn't handle 1,500 contacts a day. Keep the figures in the copy, the metrics, `screen` and the drawn screens consistent with each other.

## 6. Generated screens (2-3 hours)

Create `frontend/src/components/case-studies/screens/<name>.tsx` exporting `<name>Screens: Screen[]`, one component per drawn caption, then register it in `screens/index.ts` under the slug.

**The canvas.** Every screen is a fixed **640 × 400 design-pixel** canvas (`ShotCanvas`), scaled to its box, so text never reflows. Sizes in the kit: body 8.5-9.5 px, labels 7-8 px, titles 11-12 px, KPI values 17 px. Use `[px]` Tailwind values, not rem.

**Depth bar** (generic skeletons were rejected as "too basic"; match `physio.tsx`, `patientAgent.tsx`, `reconciliation.tsx`, `routePlanning.tsx`):
- Real navigation: `Sidebar` with the client's logo (`Photo` from `tools.tsx` with the logo's pixel size), 6-8 nav items with badges, and a signed-in user.
- `TopBar` with title, sub-line (date, site), search and actions.
- KPI row (`Kpi`) with deltas, then 2-3 panels: a table (`Th`/`Tr`, 6-9 plausible rows with names, timestamps, statuses as `Pill`/`Tag`, avatars), a chart (`LineChart`/`BarChart`/`Donut` with axis labels via `yFormat`/`labels` and a `Legend`), and a detail or filter panel (`Select`, `Segments`, `Toggle`, `Check`).
- Domain-specific detail: real service names, prices only if the client publishes them, local names and places, realistic times.
- Phone screens: use a handset (`Handset` pattern in `physio.tsx`, or `Phone` from the mocks kit) on a soft tinted backdrop, two phones side by side.
- **Device mockups:** include at least one laptop (`Laptop` from `components/sections/mocks/kit.tsx`) or browser-window composition and one phone composition, so the gallery isn't all flat dashboards.
- Brand: the client's hex codes, font and logo throughout. Keep data hard-coded (server and client renders must match; no `Math.random`, no `Date.now`).
- Mark illustrative data: `// TODO(content): illustrative …` at the top of the file.

**Phones.** Screens are drawn once at 640 × 400 and are not re-laid out for phones. On a phone the gallery shows each screen edge to edge with a "Tap to zoom" chip, and the viewer opens at a readable zoom (1.3×, so 8 px text reads at about 10.5 px) where the user tapped, with pinch, double-tap, drag and a mini-map. So: keep the smallest text at 7 px or more, and keep the most important content (title, KPIs, the key table) in the top two-thirds, where a phone user lands first.

## 7. Check and polish (three passes)

Run the dev server (`.claude/launch.json` → `vaug-web`, port 3300) and open `/case-studies/<slug>`.

Each pass:
1. Screenshot desktop (1440) and phone (375, 390, 430): hero, facts panel, gallery, and the viewer opened on two screens.
2. Compare against the client's real site (colours, logo, font, tone) and the best existing studies (depth, realism).
3. Fix what's off. Typical fixes: text overflowing a cell, empty corners, too few rows, numbers that disagree between copy and screens, a tint that's too light for white text.
4. Write one line per pass in your report: what changed.

## 8. Content gaps

Add the study to `CONTENT_GAPS.md` with what's confirmed, what's illustrative, and what's needed from Utkarsh (real figures, consent to name the client, real screenshots, a testimonial). Real screenshots he sends later go into `images` (with captions at the start of `screenshots`) and replace drawn screens one for one; remove the matching drawn screen from the `<name>Screens` array so the indexes still line up.

## 9. Go live

From `frontend/`:
```bash
npm run lint && npm run typecheck && npm run build
```
Then from the repo root, stage **only your files by path** (the Sales Agent writes untracked files under `docs/outreach/`; never `git add -A` or `git add .`), commit, and push:
```bash
git push new-origin main
```
Railway auto-deploys the `vaug-web` service from `main`. Follow it with the Railway connector (`list-deployments` / `get-status` on project `vaug`, service `vaug-web`) until it's `SUCCESS`, then check `https://vaug.in/case-studies/<slug>` at desktop and phone widths. Never touch DNS, Cloudflare or Hostinger.

## 10. Report

- Push-notify Utkarsh: the live URL and the full assumptions list (what was invented, what to confirm).
- Message the leader session: slug, industry, sector and URL, so the Sales Agent can cite it.

---

### Checklist

- [ ] Repo searched; existing study upgraded in place if there is one
- [ ] Live website read; business described correctly
- [ ] Brand hex codes, font, logo (WebP in `public/logos/`, `measure-logos.mjs` run)
- [ ] 2-3 real screenshots (desktop home in `public/sites/`, others in `public/case-studies/<slug>/`)
- [ ] All `CaseStudyDetail` fields filled; numbers consistent across copy, metrics, `screen` and drawn screens
- [ ] 5-6 drawn screens in brand, incl. laptop and phone mockups, registered in `screens/index.ts`
- [ ] Three polish passes at 1440 / 375 / 390 / 430, notes kept
- [ ] `placeholder: true`, `TODO(content)` comments, `CONTENT_GAPS.md` entry
- [ ] Lint, typecheck, build; only own files staged; pushed to `new-origin main`; Railway deploy live; live page checked
- [ ] Utkarsh notified (URL + assumptions); leader session told (slug, industry, URL)
