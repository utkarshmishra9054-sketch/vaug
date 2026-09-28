# Plan: add the proposal's case studies, client logos and testimonials to the site

**In one line:** keep all 12 existing case studies exactly as they are, add the 5 from the proposal (17 in total), and add the proposal's client logos and testimonials.

> **How to use this file:** settle the decisions in section 1 first. Then, in Claude Code from the repo root, say:
> "Read `PROPOSAL_CONTENT_PLAN.md` and execute it phase by phase. Stop after each phase and wait for my go-ahead."

## 0. Scope

**Existing content is kept.** The site's 12 case studies stay unchanged: 10 finished and 2 drafts (`boutique-desert-retreat-ras-al-khaimah` and `whatsapp-concierge-barcelona`, both `placeholder: true`). Do not rewrite, reorder or remove them as part of this plan.

**Taken from the old proposal PDF, and only these three things:**
1. The 5 case studies, added alongside the existing 12: CBD2Heal, CareerNaksha, Think3D, Vivin Design and Phoenix Institute
2. The client logos
3. The testimonials

**Not taken from the PDF:** services, pricing, team, stats, process, awards, offices or contact details. The website already has its own versions of all of these, and they stay as they are.

**Design:** no changes to colours, fonts, layout, motion, sections or pages. The only code edits are the smallest changes needed so the new content fits the existing components.

**Ground rules** (the same as `IMPROVEMENT_PLAN.md`):
- Content stays in `frontend/src/content/*.ts`.
- Never invent facts. Where the proposal is silent, leave `// TODO(content): …` and add it to `CONTENT_GAPS.md`.
- Hold any figure flagged in the checklist at the top of `docs/pitch-deck-content.md` until it's confirmed. That covers the PPC CTRs, the client-wall results, consent, and Kunal Kapoor's title.
- Work on the branch `content/proposal-case-studies`. Commit or stash the current uncommitted work first.
- After each phase, run `npm run lint`, `npm run typecheck` and `npm run build` in `frontend/`. Check `/`, `/case-studies` and one new case study at 375px and 1440px.

Use the case-study prose in `docs/pitch-deck-content.md` (slides 9–15) so the site and the deck match.

## 1. Decisions needed before starting

The site's case studies are anonymised, use six engineering and AI services, six sectors, and three regions (UK, Europe, UAE). The proposal's case studies are named SEO and Google Ads work for clients in India and Canada. These decisions make them fit without adding sections.

| # | Decision | Recommendation |
|---|----------|----------------|
| D1 | **Named or anonymised?** The site says "Client names kept confidential". | Name clients who give written consent, and show their logo. Anonymise the rest in the site's style, e.g. "A Canadian CBD wellness brand". Change the caption to "Some client names kept confidential". |
| D2 | **Which service?** `service` must be one of the six. | Use `build-with-us`, whose listed services already include "SEO & Google Business Profile" and "Launch Campaigns". Set the card label `model` to "SEO & Growth" or "Google Ads" so cards describe the real work. |
| D3 | **Sector?** Education and manufacturing aren't among the six, and `sectorBySlug()` crashes on unknown slugs. | Make `sector` optional on case studies. The card still shows the free-text `industry` label. |
| D4 | **Region?** | Add `"India"` and `"Canada"` to `Region`. They appear as filter options automatically. |
| D5 | **Order?** Home "Outcomes" shows the first 9 non-placeholder studies, so studies appended at the end never appear there. | Leave the 12 in their current order and insert the 5 new ones between them, e.g. after studies 2, 4, 6, 8 and 10. The home page then shows a mix of engineering and marketing results. |

## 2. Phase 1: minimal type and code changes

1. **`content/types.ts`**
   - `Region`: add `"India" | "Canada"`.
   - `CaseStudyDetail.sector`: make optional (D3).
   - `ClientItem`: add optional `logoSrc?: string` and make `href` optional (for logo-only tiles).
   - `CaseStudyDetail`: add optional `images?: { src: string; alt: string }[]` for real screenshots.
2. **`content/taxonomy.ts`**: add `"India"` and `"Canada"` to `regions`.
3. **`app/case-studies/[slug]/page.tsx`**: guard `sectorBySlug(study.sector)` when it's missing. Show `study.industry` as text and skip the industry link. Check that "related work" doesn't assume a sector.
4. **Guard every other `.sector` use.** Find them with `grep -rn "\.sector" frontend/src`. They include the industry pages, `CaseStudyExplorer`, the sitemap and `lib/content`.
5. **`components/case-studies/ScreenFrame.tsx`**: if `study.images[index]` exists, render it with `next/image` inside the existing frame. Otherwise keep today's coded mock or fallback.
6. **`components/sections/ClientGrid.tsx`**
   - When `logoSrc` is set, show the logo (greyscale, same size) in place of the icon.
   - When `href` is missing, render a `<div>` in place of the `<Link>`.
   - Use `key={client.href ?? client.label}`.
   - Change the caption copy per D1.

## 3. Phase 2: add five case studies to `content/caseStudies.ts` (after this, 17 in total)

For each study:
- Fill `problems`, `features`, `solution` and `results.narrative` from the deck's challenge, what-we-did and results copy.
- Anything the proposal doesn't state is a TODO: team, tech stack, duration and approach dates.

| Field | C2H | CareerNaksha | Think3D | Vivin Design | Phoenix Institute |
|---|---|---|---|---|---|
| slug | `seo-cbd-ecommerce-canada` | `local-seo-career-counselling-india` | `seo-3d-printing-india` | `google-ads-interior-design-noida` | `google-ads-scholarship-test-gujarat` |
| client (named / anonymised) | CBD2Heal / "A Canadian CBD wellness brand" | CareerNaksha / "An Indian career-counselling startup" | Think3D / "A leading Indian 3D printing firm" | Vivin Design / "A Noida interior design studio" | Phoenix Institute / "A Gujarat coaching institute" |
| city | Canada *(TODO)* | India *(TODO)* | India *(TODO)* | Noida, India | Vadodara, India *(confirm)* |
| industry | E-commerce & Retail | Education | Additive Manufacturing | Interior Design | Education |
| sector | `ecommerce-retail` | none | none | `real-estate` or none | none |
| service / model | `build-with-us` / SEO & Growth | same | same | `build-with-us` / Google Ads | same |
| region | Canada | India | India | India | India |
| card metrics | 62 → 6 avg. position · +90% traffic · +95% conversions | 20.2 → 1.4 map rank · +300% organic traffic · +72% MoM bookings | 1,250+ leads/month · +843% landing-page interaction · Page 1 rankings | 2,000 enquiries · 12,000 clicks · Top ad position | 5,000+ enquiries · 20,000+ clicks · 40,000+ impressions |
| results.metrics (4th) | +80% revenue | 25/25 high-ranking grid points | Page 1 for high-traffic keywords | 27,000 impressions | none |
| testimonial | Richard Sanchez, CEO, CBD2Heal | Nimish Gopal, CEO, CareerNaksha | none | none | none |
| images | site mock-up, keyword ranking table | map-rank grid before and after | SERP screenshots | sponsored ad, landing page | sponsored ad, PETEX landing page |
| icon | `trending-up` | `search` | `cpu` | `building` | `zap` |
| tint | reuse an existing tint | | | | |

**Images**
- Put them in `frontend/public/case-studies/<slug>/*.webp`. The `public/` folder is empty today.
- Use originals from the clients' sites, Ads accounts and the rank tracker. Crops from the PDF are too low-resolution.
- Blur any personal data.

**Hold until verified:**
- The Vivin and Phoenix CTRs
- CareerNaksha's timeframe
- Think3D's unnamed "+40%" (left out)

## 4. Phase 3: logos and testimonials on the home page (`content/home.ts`)

1. **`shortClient`**: add labels for the 5 new slugs. The case-study tiles then appear in `ClientGrid` automatically.
2. **Logo-only tiles**: after the case-study tiles, add consented client-wall brands without an `href`:
   - Brandless
   - Pennar Industries
   - Ntech
   - JAS Associates
   - Impossible
   - Parul University
   - Amity University
   - Jain Industries
   - Devgun Packers & Movers

   Logos go in `frontend/public/clients/<name>.svg`. Get the originals from each client.
3. **`testimonials`**: this is currently `[]`, and the existing section stays hidden while it's empty. Add the consented quotes:
   - Kunal Kapoor, **Co-founder**, Ketto
   - Ariba Khan, CEO, Jumping Minds
   - Tejal Bajla, CEO, allthingsbaby.com
   - Richard Sanchez, CEO, CBD2Heal
   - Nimish Gopal, CEO, CareerNaksha

   Use the grammar-fixed wording from deck slides 9, 10 and 15.
4. **Numbers that change with the new studies**
   - "Detailed case studies": the count updates automatically (12 → 17). Its detail line "Every client anonymised, every number real" needs rewording if any client is named.
   - "Client regions": `3` becomes `5`.
   - The insights card "Twelve builds, six sectors" is hard-coded. Derive it from `caseStudies.length`, or reword it.

## 5. Phase 4: copy the new case studies make untrue

These are wording fixes only, keeping the tone. Where the copy says clients are only in "the UK, Europe and the UAE", add India (and Canada where it's a list of client locations). Where it says all case studies are anonymised, add "unless the client agreed to be named".

- `app/page.tsx:98`: "Real results from anonymised case studies."
- `app/case-studies/page.tsx:16, 32`
- `content/legal.ts:254`: "Case studies on the website are anonymised."
- `content/company.ts:115, 120, 121, 295`
- `content/contact.ts:128, 182`
- `content/industries.ts:91, 121` and `app/industries/page.tsx:19`, `app/industries/[slug]/page.tsx:31`
- `content/audiences.ts:84`
- `content/security.ts:32`
- `content/careers.ts:105`
- Code comments: `content/caseStudies.ts:4` and `content/home.ts:6, 9, 37`

**Leave alone:** `content/audiences.ts:201`. It promises HNI clients they are never named, and none of the new clients are HNIs.

## 6. Phase 5: check everything

- `/case-studies`: all 17 show. The India and Canada filters work, and cards without a sector render fine. All 12 existing studies look exactly as they did before.
- Each new case study page shows its images and testimonial, and "related work" doesn't crash.
- Home page:
  - The client grid shows logos and a clean last row at every breakpoint.
  - The Testimonials section appears.
  - The Outcomes section shows a mix of studies.
- The sitemap includes the 5 new slugs.
- The diff touches only `content/`, `ScreenFrame`, `ClientGrid`, the case-study detail page guard and any `.sector` guards.

## 7. Assets to collect first

- [ ] Written consent for names, logos and quotes from each client and each person quoted
- [ ] Original SVG or high-resolution logos
- [ ] Original screenshots for the 5 case studies
- [ ] Google Ads exports confirming the Vivin and Phoenix figures
