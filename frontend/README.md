# VAUG frontend

Next.js 16 (App Router) + Tailwind CSS v4. The website; the API lives in `../backend`.

```bash
cp .env.example .env.local   # set API_URL (defaults to http://localhost:4000)
npm install
npm run dev                  # http://localhost:3000
```

## Where things live

| What | Where |
| --- | --- |
| All page copy (hero, services, case studies, FAQs…) | `src/content/home.ts` |
| Site info, navigation, footer links, offices, socials | `src/content/site.ts` |
| Content shapes (TypeScript types) | `src/content/types.ts` |
| Brand colours (dark bands = purple, light bands = yellow) | `src/app/globals.css` (`[data-tone]` tokens) |
| Logo (animated wordmark; dot colour via `--logo-dot`) | `src/components/ui/Logo.tsx`, favicon `src/app/icon.svg` |
| Page sections | `src/components/sections/*` |
| Section order on the home page | `src/app/page.tsx` |

## Pages

| Route | Content file |
| --- | --- |
| `/agents` | `src/content/agents.ts` |
| `/services`, `/services/[slug]` (6) | `src/content/services.ts` |
| `/industries`, `/industries/[slug]` (6) | `src/content/industries.ts` |
| `/who-we-serve`, `/who-we-serve/[slug]` (4) | `src/content/audiences.ts` |
| `/engineering`, `/engineering/[slug]` (8) | `src/content/engineering.ts` |
| `/case-studies`, `/case-studies/[slug]` (12) | `src/content/caseStudies.ts` |
| `/about`, `/culture`, `/team` | `src/content/company.ts` |
| `/careers`, `/careers/[slug]` | `src/content/careers.ts` |
| `/how-we-work` | `src/content/howWeWork.ts` |
| `/security-and-compliance` | `src/content/security.ts` |
| `/contact` | `src/content/contact.ts` |
| `/privacy-policy`, `/terms`, `/cookie-policy` | `src/content/legal.ts` (drafts: need legal review) |

Slugs, labels and URL builders shared by every page live in `src/content/taxonomy.ts`. Always link
with `routes.*` from there. Shared inner-page building blocks are in `src/components/page/`.
Case studies filter by URL, e.g. `/case-studies?sector=healthcare&service=fixed-price`.

Content marked `placeholder: true` is demo content (team names, job openings, prices, some About
page figures, case studies #11 and #12). In `npm run dev` those items show a dashed **DEMO** badge;
the badge never renders in production. Replace them and remove the flag before launch.

The home page clients, stats and results are drawn from the real (anonymised) case studies.
Testimonials, phone numbers and social links are hidden until real ones are added in
`src/content/home.ts` (`testimonials`) and `src/content/site.ts` (`phone`, `socials[].href`).
Mock dashboards and product visuals carry an "Illustrative example" tag
(`src/components/ui/IllustrativeTag.tsx`).

## Backend

All `/api/*` requests are proxied to the separate backend (`../backend`) via `rewrites` in
`next.config.ts`. Set `API_URL` in production.

## Design and motion

- Sections are `<Band tone="dark|light">` inside a railed centre frame (`src/components/ui/Band.tsx`).
- The theme toggle switches between alternating bands (default) and an all-dark mode.
- Any link to `#contact` opens the slide-in contact panel (`src/components/contact/`).
- `src/components/ui/Interactions.tsx` runs the load/reading progress bar, the back-to-top
  progress ring, the custom cursor (dot + velocity-stretched ring that wraps around buttons and
  shows labels from `data-cursor="Read"`), and opt-in attributes any element can use:
  `data-magnetic`, `data-tilt`, `data-glow`, `data-parallax="0.03"`.
- `.glass` gives a frosted-glass panel.
- The VAUG Agents story (`src/components/sections/AgentStory.tsx`) is scroll-scrubbed: every
  element's position is computed from scroll progress, so scrolling back rewinds it.
- Service illustrations (`src/components/ui/Illustration.tsx`) are isometric line drawings that
  draw in on scroll, then keep moving (`.ill-*` classes in `globals.css`).
- All motion respects `prefers-reduced-motion`.
