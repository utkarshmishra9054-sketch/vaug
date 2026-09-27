# VAUG website improvement plan: prompt for Claude Code

> **How to use this file:** in Claude Code, from the repo root, say:
> "Read `IMPROVEMENT_PLAN.md` and execute it phase by phase. Stop after each phase, show me a summary and wait for my go-ahead."

---

## 0. Your role, context and ground rules

You are a senior product designer and front-end engineer. You are improving the VAUG marketing site. VAUG sells AI agents, dedicated developers and end-to-end software delivery. The site lives in `frontend/`, a Next.js 16 / React 19 / Tailwind CSS 4 app. It has a small Hono API in `backend/` for leads and newsletter sign-ups. The goal is a site that feels **premium, fast, credible and easy to act on**. It should read like a serious senior engineering partner, not a template agency.

The current site is ambitious and mostly well structured. Its main problems:

1. **Credibility leaks:**
   - Placeholder people, stats, roles and case studies ship to production unmarked.
   - The legal pages contain `[brackets]`.
   - Claims such as "every number is real" sit next to fabricated drafts.
2. **Motion is expensive and sometimes hurts usability:**
   - Several `requestAnimationFrame` loops run forever.
   - The custom cursor hides the native cursor.
   - Reveals are a dim flicker.
   - Autoplay has no pause control.
3. **Pages are too long and every template looks the same.** There is repeated proof, repeated service lists and two or three CTAs stacked at the end of every page.
4. **Case studies have no baselines, timeframes, real visuals or structured data.** Their copy is formulaic.
5. **There is no design-token layer** for type, spacing, radius, shadow or motion. Values are hard-coded everywhere.
6. **SEO is thin.** There is no per-page OG, no JSON-LD and no canonicals on most pages.

### Hard rules

- **Read the Next.js docs first.** `frontend/AGENTS.md` says this Next.js version has breaking changes. Read the relevant guide in `frontend/node_modules/next/dist/docs/` before touching routing, metadata, `ViewTransition`, OG images or config. Heed deprecation notices.
- **Never invent facts.** Do not make up client names, metrics, certifications, team members, quotes, prices, addresses or dates.
  - You may rewrite prose for clarity, tone and structure.
  - You may re-express existing numbers, for example moving a baseline from a card label into a structured field.
  - Where a fact is missing, add a typed field, leave `// TODO(content): …`, and list it in `CONTENT_GAPS.md` (see Phase 11).
- **Content stays in `frontend/src/content/*.ts`.** Components read it through `src/lib/content.ts`. Keep that separation.
- **Keep lead options in sync.** `frontend/src/lib/lead-options.ts` and `backend/src/lib/lead-options.ts` must match. Better still, fix this in Phase 8.
- **Match the existing code style:** naming, comment density, Tailwind usage and component structure. Prefer extending existing primitives (`Band`, `SectionTitle`, `FeatureGrid`, `MetricRow`, `CountUp`, `PageHero`) over adding new ones.
- **No new heavy dependencies without asking.** Do not add Framer Motion, GSAP or Lottie. Use CSS, the View Transitions API, CSS scroll-driven animations (`animation-timeline: view()` inside `@supports`) and small hooks. If you think a library is truly needed, stop and ask.
- **Respect `prefers-reduced-motion` everywhere**, in both CSS and JS.
- **Work in phases.** After each phase:
  - run `npm run lint`, `npm run typecheck` and `npm run build` in `frontend/`
  - fix every error
  - start the dev server and check the affected pages at 375px, 768px and 1440px, in light and all-dark themes
  - summarise what changed and what you skipped
  - wait for approval before the next phase
- Work on a branch (`improve/ux-overhaul`). Make one commit per phase.

---

## 1. North star and principles

The site should answer three questions within 10 seconds on any page:

1. **What do you do for someone like me?**
2. **Why should I believe you?** This means proof: specific results, how they were measured, and who did the work.
3. **What happens if I get in touch?** A concrete next step with a time commitment.

### Design principles

- **Proof before promise.** Put the most specific evidence in the top two screens of every page.
- **One primary action per view.** Use one primary CTA style for "Book a call" and use it consistently. Any other action is secondary or tertiary.
- **Motion serves meaning.** Animate to show:
  - state change (tabs, filters)
  - causality (before to after)
  - progress (reading, timelines)
  - hierarchy (entrance order)

  Never animate forever for decoration. Every looping animation must pause off-screen, pause when the tab is hidden, and have a pause control if it runs longer than 5 seconds.
- **Each template has a signature.** Industries lead with compliance and sector problems. Audiences lead with how the engagement feels. Engineering leads with quality bars. Case studies lead with the result.
- **Shorter pages, deeper links.** Cut repeated sections and cross-link by context instead.

---

## Phase 0: Launch blockers and trust fixes (do first)

Do these before any visual work.

1. **Gate placeholder content in production.** `DemoBadge` (`src/components/ui/DemoBadge.tsx`) returns `null` in production, so every `placeholder: true` item currently ships as if it were real. There are about 40 such items: 26 in `company.ts`, 7 in `careers.ts`, 3 in `engineering.ts`, 2 in `caseStudies.ts` and 1 in `security.ts`.
   - Add a single helper in `src/lib/content.ts`:
     - `publishable<T extends { placeholder?: boolean }>(items: T[]): T[]`
     - It filters out placeholders when `process.env.NODE_ENV === "production"`, unless `NEXT_PUBLIC_SHOW_PLACEHOLDERS=true`.
   - Route **every** content getter through it.
   - Make derived values use the filtered arrays: counts, "View all N case studies", `See ${roles.length} open roles`, stats, related studies, client strip, sitemap entries and `generateStaticParams`.
   - Every section must degrade gracefully when its list becomes empty. Hide the section entirely; never show a lone heading or button.
     - Team leadership: if empty, show a "Meet the team on a call" card instead.
     - Careers with 0 roles: show the Open Application block as the primary content, with the text "No open roles right now. We still read every open application."
2. **Remove contradictory claims.** Once placeholders are filtered, reword "Every client is anonymised; every number is real." (`src/app/case-studies/page.tsx:32`, `src/content/home.ts:141`) to "Clients are anonymised under NDA. Every metric is measured by the client or from production data; see the note on each study." Only keep this wording if the owner confirms it is true (add it to `CONTENT_GAPS.md` as a question).
3. **Legal pages.**
   - `src/content/legal.ts` contains `[legal entity name]`, `[country]`, `[number]` and `[Insert a list of key sub-processors…]`, and shows a "Draft … not yet legally binding" banner in production.
   - Do not invent legal facts. Move every bracketed value into a typed `legalEntity` config in `site.ts` with `TODO(content)`.
   - Make the build fail in production if any legal value is still a placeholder: add a small check in `next.config.ts` or a prebuild script. Alternatively, add `noindex` to the legal pages until they are complete. Ask the owner which they prefer.
   - Replace the hard-coded `updated` date with a field that is edited by hand. Do not use `new Date()`.
4. **Hard-coded counts.** Replace strings such as "Twelve products we shipped", "Six ways to work with us" (`src/app/not-found.tsx:12-13`) and "Twelve builds, six sectors" (`home.ts:210`) with values computed from the data.
5. **Location and market consistency.**
   - The offices are India, the UK and the USA.
   - Case studies and copy claim "UK, mainland Europe and the UAE", and the HeroConsole feed mentions Hindi.
   - Do not change the facts. Make the copy consistent: say "Offices in Bengaluru, London and New York · clients across the UK, Europe and the Gulf". List the question in `CONTENT_GAPS.md`.
6. **Remove the "Book a call" illusion.** Many CTAs say "Book a call", but none of them books anything; all lead to the lead form. Until Phase 8 adds a scheduler, label them "Request a call" or "Talk to us". Keep the promise "A senior lead replies within one business day".

---

## Phase 1: Design system foundation

### 1.1 Tokens (`src/app/globals.css`)

Add these token groups. Map them in `@theme inline` so Tailwind utilities use them.

- **Type scale.** Build a fluid `clamp()` scale: `--text-display`, `--text-h1`, `--text-h2`, `--text-h3`, `--text-lead`, `--text-body`, `--text-small`, `--text-label`, `--text-micro`.
  - Replace the arbitrary sizes. There are currently 73 × `text-[11px]`, 71 × `text-[10px]`, 26 × `text-[9px]`, plus `text-[2.9rem]`, `lg:text-[4.8rem]`, `text-[15px]` and `text-[13px]`.
  - Floors: 12px for UI labels and 11px for mono micro-labels. Mock/illustration internals (`text-[6.5px]` etc.) are exempt; keep them `aria-hidden`.
  - Tracking tokens: `--tracking-tight` (-0.035em, for display and h1), `--tracking-snug` (-0.02em, for h2 and h3), `--tracking-label` (0.08em, uppercase mono). Replace the six ad-hoc `tracking-[…]` values.
- **Spacing and section rhythm.**
  - Add `--section-y-sm/md/lg`. Replace the scattered `py-14/16/20/24/28` with three rhythm steps.
  - Standardise `frame-pad` gutters: 16px on mobile, 24px on tablet, 40px on desktop.
- **Radius:** `--radius-sm` (4px), `--radius-md` (8px), `--radius-lg` (14px), `--radius-pill`. Replace `rounded-[4px]` and other mixed radii.
- **Elevation:** `--shadow-1/2/3` plus a `--shadow-glow-accent`. Replace hand-written `shadow-[…]` values.
- **Motion:**
  - Easings:
    - `--ease-out: cubic-bezier(0.2, 0.8, 0.2, 1)`, which is repeated dozens of times today
    - `--ease-in-out: cubic-bezier(0.65, 0, 0.35, 1)`
    - `--ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1)`, only for small UI such as chips and toggles
  - Durations: `--dur-1: 120ms` (hover and press), `--dur-2: 200ms` (small UI), `--dur-3: 320ms` (panels and menus), `--dur-4: 560ms` (entrances), `--dur-5: 900ms` (hero choreography).
  - `--stagger: 60ms`.
- **Colour.**
  - Remove raw hex from components. There are currently 23 × `#ffd23f`, 13 × `#131116` and 12 × `#7c3aed`, plus `fill-[#8f8a96]` in `RotatingBadge`, the Insights cover hex map, `#16a34a` in AgentStory, `text-red-300/400`, the `body` background, `::selection`, the cursor colours and `.glass` borders.
  - Add tokens `--success`, `--danger` and `--warning` (plus `-soft` variants) for form states, both tones and all-dark mode.
  - In the all-dark override, define `--accent-hover`.
  - Fix hard-coded surfaces that ignore the theme: `TickerBand` (`bg-yellow text-ink`), the purple Stats featured tile and Cta panel, and the Insights covers. Each must look intentional in all-dark mode.
- **Contrast.** `--subtle` fails WCAG AA: about 3.2:1 on paper and about 3.6:1 on ink. It is used for 10–11px mono labels everywhere.
  - Raise it to at least 4.5:1 in both tones.
  - Audit every `text-subtle` / `text-muted` pair with a contrast script. Write a tiny node script in the scratchpad; do not commit it.

### 1.2 Fonts (`src/app/layout.tsx`)

- Geist is a variable font. Remove the 7-item `weight` array so one variable file ships. Weight 800 is never used anyway.
- Keep Geist Mono.
- Set `display: "swap"`. Add `adjustFontFallback` if the docs for this Next version support it.

### 1.3 Heading convention

Headings currently mix Title Case with a trailing period ("Six Ways to Build With VAUG.", "Questions We Hear Often.", "Why Teams Choose VAUG.") with sentence case ("Proof, not promises.", "Tech we commonly use here.").

- **Adopt sentence case everywhere, with no trailing period on H2/H3.** A period is allowed only on deliberate one-line statements in hero H1s.
- Apply this across all content files and all hard-coded titles in `page.tsx` files. Examples: `agents/page.tsx:128`, `services/[slug]/page.tsx:91`, `industries/[slug]/page.tsx:81`.
- Move hard-coded titles into content files.

### 1.4 Components and states

- **Button / ArrowLink** (`src/components/ui/Button.tsx`):
  - Define exactly three variants: `primary` (filled accent), `secondary` (outline) and `ghost` (text + arrow).
  - Each needs hover, active, `focus-visible` (2px ring in `--accent` with 2px offset, visible on both tones), disabled and loading states.
  - `ArrowLink` renders a `Link`, so `disabled:` never applies. Add `aria-disabled` styling instead.
- **Interactive cards and tiles:**
  - Every hover-only reveal (`group-hover`) must also trigger on `group-focus-visible`. This covers Stats details, TechStack cards and the Audiences rail.
  - Hover-only information must also be visible on touch. The Stats `detail` text is currently invisible on mobile.
  - Stat tiles show an `ArrowUpRight` on hover but are not links. Either make them links or remove the arrow.
- **Carousels:** prev/next buttons need a disabled state at the scroll ends (TechStack, Insights) and visible focus.
- **Chips and filters:** use one `Chip` primitive with `aria-pressed`, a count badge, a disabled state at zero results, and focus styling.
- **Cleanup:**
  - Replace `transition-all` with explicit properties.
  - Remove the blanket `will-change: transform` on `[data-tilt]`. Set it only while the element is hovered.
- **CSS size:** `globals.css` is about 1,400 lines and includes page-specific keyframes (`eng-*`, `ind-*`, `aud-*`, `nf-*`, `legal-*`, `svc-*`) that ship on every route. Move page-specific CSS into CSS Modules or co-located files, so each route loads only its own. Keep tokens, base styles, reveals and shared utilities global.

---

## Phase 2: Motion system and performance

### 2.1 Fix what exists

- **`RevealObserver.tsx`.** It currently runs:
  - an IntersectionObserver
  - a rAF sweep calling `getBoundingClientRect` on every pending node on every scroll
  - a whole-body `MutationObserver`
  - a `setInterval(1500)` that runs forever

  Replace all of this with one IntersectionObserver (`rootMargin: "0px 0px -10% 0px"`, threshold 0.15). Observe newly added nodes from a lightweight `MutationObserver` scoped to `main`, or re-scan on route change. Unobserve each node once it is revealed.
  - Change the start state from `opacity: .35; translateY(14px)` (which reads as a dim flicker) to `opacity: 0; translateY(16px)`.
  - Use `--dur-4` and `--ease-out`. Stagger siblings by `--stagger`, capped at 6 items.
  - **Never hide the LCP element.** The page-hero `h1` (`PageHero.tsx:72`) and the home hero headline must render visible without JS. Animate them with a CSS-only entrance that starts from visible-but-offset, or skip the reveal for them.
  - Where supported, prefer CSS scroll-driven animation: `@supports (animation-timeline: view()) { [data-reveal] { animation: reveal linear both; animation-timeline: view(); animation-range: entry 0% entry 40%; } }`. Fall back to the IO class.
- **`Interactions.tsx`.**
  - **Custom cursor:**
    - Remove `cursor: none !important` (globals.css:268). The native cursor must always be visible.
    - Keep a subtle follower ring as an enhancement, only when all of these hold: `(pointer: fine) and (hover: hover) and (prefers-reduced-motion: no-preference)`.
    - Run its rAF loop only while the pointer is moving. Stop the loop when the position has settled, and restart it on `pointermove`.
    - Remove the per-frame `getComputedStyle`.
    - Remove gimmick labels such as `data-cursor="VAUG"`. Keep "View case" and "Drag" where they add meaning.
  - **Parallax:** replace the `setInterval(2000)` re-query of `[data-parallax]` with an IO-driven registration.
  - **Back-to-top:** replace the hard-coded `[--surface:#1b1920]` with a token.
  - **Tilt and magnetic effects:** apply only on fine pointers; skip under reduced motion.
- **Perpetual loops.**
  - Every rAF or interval loop must pause when it is off-screen (IntersectionObserver) and when `document.hidden`. This covers TickerBand (it also reads `scrollWidth` every frame, so cache it on resize), RotatingBadge, HeroConsole, Outcomes auto-cycle, the AgentConsole scripts, AgentTypes, DisciplineExplorer, PreEngagementStepper, DeliveryLoop and HeroTracker.
  - Build one `useInViewLoop(callback, { fps? })` hook and use it everywhere.
- **Autoplay accessibility (WCAG 2.2.2).**
  - Every auto-advancing component needs a visible Pause/Play control, modelled on `DayAtVaug.tsx:126,217`, which already does this well. The same list applies: AgentTypes, AgentConsole, DisciplineExplorer, PreEngagementStepper, DeliveryLoop, HeroTracker, Outcomes and HeroConsole.
  - Autoplay stops permanently after any user interaction.
  - Show a thin progress bar that fills over the dwell time.
- **Tabs.**
  - Unify on one `Tabs` primitive with the full WAI-ARIA pattern: roving `tabIndex`, Arrow keys, Home and End, and `aria-controls`.
  - Set `aria-orientation` from the actual layout: horizontal on mobile, vertical on desktop.
  - `DeliveryLoop` and `PreEngagementStepper` currently have `role="tab"` without keyboard handling. `AgentTypes` lacks Home and End.
- **Scroll-driven React state.**
  - AgentStory (`usePinProgress` + `useSmoothed`), `RevealWordmark` and `Navbar` call `setState` on every scroll event.
  - Write the progress to a CSS custom property on the container (`el.style.setProperty('--p', progress)`) inside a single rAF. Derive transforms in CSS from `var(--p)`. React re-renders only when the discrete beat index changes.
  - Throttle Navbar's hide-on-scroll with rAF, and set state only when the value flips.
- **Reduced motion gaps.** The following ignore `prefers-reduced-motion` today:
  - `RevealWordmark` (ScrollStory.tsx:41)
  - `TagPile`'s drop-in and drag physics
  - AgentStory's −420px drop-in
  - the infinite `animate-ping` on the floating contact button (`ContactProvider.tsx:77`) and on NeedPicker (`NeedPicker.tsx:115`)

  Gate them all, and use `motion-safe:` on Tailwind animation utilities.
- **Paint cost.**
  - The three hero aurora blobs (`blur-[140px]`, animated forever) should become one pre-blurred radial-gradient layer. Animate only `transform`, slowly, and pause off-screen.
  - Limit `backdrop-filter` to the header, and only after the page has scrolled.
- **Client bundles.** Almost every section is `"use client"`.
  - Split components so static markup is server-rendered, with small client islands for interactivity.
  - Lazy-load heavy below-the-fold visuals with `next/dynamic`: AgentStory, the ScreenMock parts, Illustration SVGs and SectorVisual (592 lines).
  - `CaseStudies.tsx:30-31` renders both wide and narrow mock scenes. Render only one, chosen with CSS containers or `matchMedia`.
- **View transitions.**
  - `template.tsx` imports `ViewTransition` from `react`, and `next.config.ts` has no view-transition flag.
  - Check the Next 16 docs for how to enable it (`experimental.viewTransition` or its equivalent). Enable it, and confirm the page fade and the case-card-to-hero morph actually fire in Chrome.
  - Keep a graceful no-op fallback.

### 2.2 Animation spec: add these

Build these with the motion tokens. Each one needs a reduced-motion fallback: an instant final state, or at most a 150ms opacity-only change.

| Where | Animation | Spec |
|---|---|---|
| Home hero | Entrance choreography | Eyebrow, then H1 word-mask rise (existing `Words`), then subtitle, then CTAs, then proof strip. Offsets 0/80/200/280/360ms. `--dur-5` for the H1 and `--dur-4` for the rest. Must not delay LCP paint. |
| Rotating hero words | Keep the letter roll | Make screen readers hear the full list once: add a visually hidden sentence "AI agents and engineers that automate operations, ship products, …". Pause after 3 full cycles. |
| Metrics (everywhere) | Count-up | Reuse `components/company/CountUp.tsx`. Add a `parseMetric(value)` helper that returns `{ prefix, number, decimals, suffix }` and handles `-70%`, `3.4×`, `AED 38M`, `<5s`, `4.9★` and `1.2s`. Server-render the **final** value, and start the count only when the element is in view. This fixes the Stats flash where the value renders final, jumps to 0, then counts. Run once and never replay on hover. Duration scales 700 to 1200ms with the magnitude. |
| Case study results | Before → after bars | For metrics with a `baseline`, draw two bars (baseline muted, result accent). The result bar grows from the baseline width on entering view (`--dur-5`, `--ease-out`), with the delta label fading in at the end. |
| Case study detail | Reading progress | A thin top bar plus TOC active-item fill, driven by scroll (CSS `animation-timeline: scroll()` with a JS fallback). |
| Approach timeline | Spine fill tied to scroll | Replace the one-shot `cs-spine` scaleY with a scroll-linked fill. Each phase dot pops (`scale .6→1`, `--ease-spring`, `--dur-2`) as the fill reaches it. |
| Case-study listing | Filter transitions | **No remount on filter change.** `key={JSON.stringify(filters)}` at `CaseStudyExplorer.tsx:123` currently replays the entrance on every keystroke. Animate the layout instead: exiting cards fade and scale to .98 (`--dur-2`), and remaining cards move to their new positions with FLIP or `document.startViewTransition` using a `view-transition-name` per card. Debounce search by 150ms. |
| Cards (case, service, sector) | Hover and focus | Lift -2px, `--shadow-2`, a subtle border colour shift to `--border-strong`, an arrow nudge of 4px, and the first metric brightening to the accent colour. `--dur-2`. Identical on `focus-visible`. No 3D tilt on content cards; keep tilt only for decorative visuals. |
| Mega-menu | Open and close | Panel: `opacity 0→1`, `translateY(-6px)→0`, `--dur-3`. Items stagger 30ms (currently an imperceptible 15ms). Close is faster (`--dur-2`), with no stagger. |
| Mobile menu | Sheet | Full-height sheet sliding from the right (`--dur-3`, `--ease-out`). Links stagger 40ms. Background scrim fades in. |
| Contact modal | Slide-over | Keep it, but add a scrim fade, a focus trap, and a preserved form state (see Phase 8). |
| Tabs and explorers | Panel swap | Crossfade plus 8px slide in the direction of travel (`--dur-3`). The indicator slides between tabs; don't jump it. |
| Form feedback | Field errors | Error text slides down 4px and fades in. Shake only the submit button once, 4px amplitude, 300ms, and never under reduced motion. Success: checkmark stroke draw (existing `.draw` pattern), then content fades in. |
| Section banding | Dark/light transitions | Optional: between `Band`s of different tone, a 1px accent hairline draws across on entering view. Keep it subtle. |
| Theme toggle | Existing circular clip-path | Keep it. Add `aria-pressed`. |

**Remove or tone down:**
- infinite `cs-shimmer` on ScreenFrame skeletons, which looks like a stuck loading state
- infinite `cs-float` / `cs-bar` in `ResultsStack`: make them one-shot on entrance
- the 2.8s auto-cycle in Outcomes, which competes with reading
- TagPile drag physics (remove the section; see Phase 4)
- 3D tilt on text cards

**Performance budget (verify with Lighthouse, mobile preset, production build):**
- LCP under 2.5s
- CLS under 0.05
- INP under 200ms
- TBT under 200ms on the home page
- no long tasks over 50ms caused by animation while idle
- 0 rAF callbacks per second when the page is idle and the pointer is still, checked in the Performance panel

---

## Phase 3: Global chrome

### 3.1 Navbar (`src/components/layout/Navbar.tsx`)

- **Primary CTA.** "Book a call" uses the outline variant and is hidden below `sm`.
  - Make it the **primary** filled button.
  - On mobile, show a compact "Talk to us" pill next to the burger.
  - After Phase 8, label it "Book a call" only if it actually books.
- **Labels.** The top nav says "Work" while menus and footer say "Case studies". Use **"Case studies"** everywhere.
- **Mega-menu accessibility:**
  - Render each panel **directly after its trigger** in the DOM, so Tab goes from the trigger into its links. Today the panel is rendered after the whole nav row.
  - Add `aria-expanded` and `aria-controls` to each trigger.
  - Arrow keys move between items. Escape closes and returns focus to the trigger.
  - Close on click or tap outside, and on focus leaving the panel.
  - Keep the 90ms hover intent. Add a 150ms close delay with a safe-triangle, so diagonal mouse movement doesn't close the menu.
- **Mega-menu content.** Each panel should:
  - show one featured case study card (title, result metric, link) in the aside
  - show a one-line description per item (it already exists for most)
  - put "All services" / "All industries" at the top-right as a secondary link, not buried at the bottom of the aside
- **Mobile menu:**
  - When closed it is `max-h-0 opacity-0` but still focusable. Use `inert` (or `hidden`) when closed.
  - Add a focus trap.
  - Scroll lock currently uses `body.overflow`, which fails on iOS. Use a lock that works on iOS.
  - Add `aria-hidden` to the burger icons.
  - Use accordions for each group, with the primary CTA pinned to the bottom of the sheet.
- **Hide on scroll.** Keep it, but always show the header when focus is inside it, when a menu is open, or within 200px of the top.
- **Hash links.** Add a scroll offset for anchors (`scroll-margin-top` on sections = header height + 16px).

### 3.2 Footer

- **Offices:** show city plus local time (reuse `LocalTime` from the contact page). Hide empty phone and email fields cleanly. Keep `TODO(content)` for addresses.
- **Newsletter:** "Subscribe to our notes" promises content that doesn't exist, since there is no blog.
  - Either rename it to "Get a monthly note on what we're shipping with AI agents" and confirm with the owner that this will exist (add to `CONTENT_GAPS.md`), or remove the form.
  - Use tokenised error and success colours, `aria-live`, and a clear success state.
- **Wordmark:** the 24vw footer wordmark is fine as a brand moment. Make sure it doesn't cause horizontal scroll and is `aria-hidden`.
- **Link order:** follow the navigation order. Add the security page and "Request a call" to the Company column.

### 3.3 Theme toggle

- The "light" theme is really "alternating light and dark bands", and the header and hero stay dark.
- Keep the behaviour. Change the accessible name and tooltip to "Dark mode" and add `aria-pressed`.
- Respect `prefers-color-scheme` on the first visit.

### 3.4 SectionRail

- It only shows at `2xl`, and its order doesn't match the home page.
- Generate the rail from the actual rendered sections, for example from a `sections` array in the page that renders both the rail and the bands.
- Show it from `xl` up. Mark the active item with `aria-current="true"`.

---

## Phase 4: Home page (`src/app/page.tsx`, `src/content/home.ts`)

The home page has about 15 blocks and runs over 10 viewport heights; AgentStory alone is about 3.8 screens. Proof appears four times, scattered across ClientGrid, Stats, the CaseStudies carousel and Outcomes. The service list appears three times: Ticker, TagPile and EngagementModels.

### 4.1 New structure (target: about 6–7 viewport heights on desktop)

1. **Hero.**
   - **Headline:** keep the rotating structure, but make the static part carry the value, e.g. "AI agents and senior engineers that **[rotating outcome]**". Rotating phrases should be outcomes ("close the books in hours", "answer every patient in seconds"), not service names. Take them from real case studies.
   - **Subtitle:** the current "Rent developers, fix the price, or hand us the whole venture" packs three offers into one sentence. Rewrite it around audience and outcome, e.g. "For founders and operators in fintech, healthcare, property and commerce. We automate the work that eats your week and ship the products that grow it."
   - **CTAs:** primary "Book a call" / "Talk to us" and secondary "See case studies".
   - **Proof strip** directly under the CTAs:
     - three real headline metrics, each linked to its case study (e.g. "92% of transactions auto-matched · Frankfurt payments")
     - the CTA facts line from the bottom of the page: "Free 30-minute call · NDA on request · Proposal within 48 hours". It is currently the most concrete copy on the site and is buried at the end.
   - **Layout:** remove the empty `pb-56` zone reserved for the RotatingBadge. Either integrate the badge into the layout or drop it.
2. **Client strip (condensed ClientGrid).**
   - One row of anonymised descriptors ("Payments processor · Frankfurt"), with the note "Names withheld under NDA; references available on request". Include the second part only if the owner confirms it.
   - Fix the fragile border logic, which depends on the aria-hidden highlight `<li>` being first.
3. **VAUG Agents story (AgentStory).**
   - Cut it to three beats and about 2–2.5 screens.
   - Rewrite clichés ("Hours come back every week for strategy, clients and craft", "The Work That Matters").
   - The dashboard figures ("42h", "94%", "3x") are invented. Either tie them to a real case study or keep the `IllustrativeTag` very visible.
   - Fix the heading hierarchy: currently an H2 containing only the product name sits above an H3 title.
   - Remove `data-cursor="VAUG"`.
4. **Ways to work (EngagementModels).** Six models on the home page is choice overload.
   - Show the six as compact cards in a 3×2 grid. Each card gets a one-line "best for", a typical timeline, and how the engagement is priced (e.g. "Monthly retainer", "Fixed quote after a 1-week scope").
   - Add "Not sure? Take the 4-question chooser" linking to the `ModelChooser` on `/services#chooser`.
   - Remove the duplicate links to the same URL (L84, L104).
   - Fix `aria-current={boolean}`.
5. **Proof, merging CaseStudies, Outcomes and Stats into one section.**
   - Left side: a featured case study carousel. Limit it to 4 curated studies via a `featured: true` flag; don't show all 12.
   - Right side or below: a results grid with 3–4 headline metrics plus count-up, each linking to its study.
   - Drop the Stats band's self-referential numbers ("3 client regions", "6 sectors", "12 case studies"). Keep only "Operating since 2019" and genuinely impressive, sourced numbers, if the owner has them.
   - Fix the carousel switcher truncation (`w-36`/`w-44` in `CaseStudies.tsx:130`). Show sector plus a short title instead.
   - Remove the "Featured = all" filter behaviour.
   - Replace the hard-coded `/case-studies/${slug}` (L90, L95) with `routes.caseStudy`.
   - One "See all case studies" link.
6. **How we work (Principles).**
   - Keep the 2×2, but rewrite the generic lines ("AI speed, engineering discipline.", "We stay after launch.") into specific commitments: "A working demo every Friday", "One accountable senior lead", "You own the code and IP from day one", "30 days of post-launch fixes included". Only use facts supported by `howWeWork.ts`.
   - Fix the invalid `<span class="grid-dot">` directly inside the `<ul>` (L11–12).
   - Link to `/how-we-work`.
7. **Who we serve.**
   - Audiences plus industries in one section: four audience cards, then a static row of sector chips.
   - Drop the keyboard-reachable marquee of links. Marquees of links are an accessibility trap.
8. **Technology (TechStack).**
   - Condense it into a single static, categorised grid with real logos (SVGs in `public/logos/`, monochrome, following theme colour).
   - Remove the duplicate 60s marquee of the same items.
   - Fix the full-card `absolute inset-0` overlay link that blocks text selection.
9. **FAQ.**
   - Expand from 4 to 8 questions covering pricing ranges, timelines, IP/NDA, time zones and overlap hours, team location, AI data privacy, what happens after launch, and minimum engagement size.
   - Answers must come from existing content or be left as `TODO(content)`.
   - Add FAQPage JSON-LD (Phase 9).
10. **Final CTA (Cta).** Keep the strong copy, and make it theme-aware.

**Remove from home:**
- TickerBand (or keep one only if it carries outcomes rather than service names)
- Manifesto's filler line "Workflows get automated. Products get shipped. We handle both." (keep the strong line "Every repetitive task is a job an agent could do today." inside the Agents intro)
- TagPile
- Insights ("Guide/Playbook/Article" cards that just link to service pages; this misleads)
- Outcomes (merged into Proof)
- Testimonials (keep the component, but render only when real testimonials exist; delete the dead `testimonialsTitle` until then)

**Other home fixes:**
- Outcomes text built from `narrative.split(". ")[0]` and `slice(0,9)`, which cuts sentences and silently drops studies. Replace it with an explicit `headline` field on each case study.
- The HeroConsole fake feed ("Answered 27 WhatsApp queries in Hindi and English") contradicts the stated markets. If it's kept, label it illustrative and align it with real case studies. Also rename the component; it isn't in the hero.

---

## Phase 5: Case studies (highest content priority)

Files: `src/content/caseStudies.ts`, `src/content/types.ts`, `src/app/case-studies/page.tsx`, `src/app/case-studies/[slug]/page.tsx`, `src/components/case-studies/*`, `src/components/page/CaseStudyCards.tsx`, `src/components/sections/CaseStudies.tsx`.

### 5.1 Data model (`types.ts`)

Extend the types as follows. Migrate all 12 studies by moving existing information into the new fields. **Do not invent values**; use `TODO(content)` where data is missing.

```ts
interface Metric {
  value: string;          // "92%"
  label: string;          // "of transactions auto-matched"
  baseline?: string;      // "0% (fully manual)"
  timeframe?: string;     // "measured over the first 3 months after go-live"
  method?: string;        // "client's reconciliation reports"
  direction?: "up" | "down";
}

interface CaseStudy {
  // existing fields…
  headline: string;              // one-sentence outcome, used by cards, Outcomes, OG and meta description
  featured?: boolean;            // curated for the home page
  publishedAt: string;           // ISO date
  updatedAt?: string;
  engagementStatus: "completed" | "ongoing";
  constraints: string[];         // compliance/regulatory/technical constraints, pulled out of `challenges`
  architecture?: { summary: string; integrations: string[]; hosting?: string; dataResidency?: string };
  team: { role: string; count: number; seniority?: string }[]; // replaces the free-text `team`
  clientSide?: string;           // "Head of Finance + 2 analysts"
  lessons?: string[];            // "What we'd do differently"
  relatedSlugs?: string[];       // manual override for related studies
  heroImage?: string; ogImage?: string;
  gallery?: { src?: string; caption: string; kind: "desktop" | "phone" }[];
  testimonial?: { quote: string; role: string; company: string; anonymised: boolean; permission: boolean };
  referenceAvailable?: boolean;
}
```

- **Remove drifting duplicate pairs.** Keep only the slug fields (`sector`, `service`, `clientType`) and derive the display labels from `taxonomy.ts`. Today `industry`/`sector`, `model`/`service` and `stage`/`clientType` can drift apart. For example, #12 is a hotel group with `stage: "Seed"`.
- **Carry baselines through.** Baselines currently survive only in card label strings and are **dropped** on the detail page:
  - #1: "(down from 3 days)"
  - #3: "(up from 51%)"
  - #4: "(down from 6 min)"

  Move them into `baseline` so both views show them.

### 5.2 Listing page (`/case-studies`)

- **URL state:**
  - Read filters **server-side** from `searchParams`, so the first paint is already filtered. No flash from 12 cards down to the filtered set.
  - Sync changes with `router.replace` (or `useSearchParams`). Push history on chip changes, so Back works; replace on typing.
- **Filters:**
  - Keep sector, service, client type and region. Chips show result counts and are disabled at zero.
  - Allow multi-select within a group.
  - Add sort: "Most recent", "Biggest impact" (manual `impactRank`), "Sector".
  - Add a "Clear all" control and an `aria-live` result count ("Showing 4 of 10 case studies").
- **Search:**
  - Include `about`, `problems`, `solution`, `domain` and `constraints`. The placeholder already says "Search by problem…" but those fields aren't searched.
  - Debounce by 150ms, and highlight the matched terms in card summaries.
- **Sticky toolbar.** On desktop all four fieldsets are always expanded in a `sticky top-20` bar. Once scrolling starts, collapse it to a single row: search, then four dropdown or popover filters, then the count. On mobile, keep the toggle and use a bottom-sheet.
- **Cards:**
  - Show sector, service, region and duration.
  - Show the `headline` and the top 2 metrics with baseline arrows.
  - Show an "Ongoing" badge where relevant.
  - Fix the duplicate screen-reader labels (`dt sr-only` plus a visible span, `CaseStudyCards.tsx:32-35`).
  - The card's primary link wraps the title only. Extend the click area with a `::after` overlay pseudo-element so text stays selectable.
- **Hero:**
  - Replace the self-referential MetricRow ("12 case studies / 6 sectors / 6 ways of working / 3 regions") with three strongest aggregate outcomes, each linked. Alternatively, drop it and put the grid higher.
  - `ResultsStack` just takes `slice(0,4)`: make it use `featured`, and make its animation one-shot.
- **Empty state:** keep it, and add "Clear filters" plus "Tell us your problem; we've probably solved a version of it", which opens the contact modal pre-filled.

### 5.3 Detail page (`/case-studies/[slug]`)

New section order:

1. **Hero.** Breadcrumb (ending with the current page), sector, service and region chips, the title, the `headline`, and a **Results at a glance** panel: 3–4 metrics with baseline → result and count-up, plus a footnote with timeframe and method. Also show duration, team shape, engagement status, reading time and last updated.
2. **The client and the situation:** `about` plus constraints as a checklist-style list, e.g. "FCA-regulated", "UK data residency".
3. **The problem:** `problems`.
4. **What we built:** `solution` plus `features`, with an **architecture panel** showing integrations as a simple SVG flow diagram (system → agent → human approval → system). Build one reusable, data-driven `FlowDiagram` component.
5. **How we did it:** the approach timeline with the scroll-linked spine, plus team composition.
6. **Challenges and how we handled them.**
7. **Results:** full metrics with before → after bars, the narrative, and the testimonial if one exists. Include only the parts backed by data.
8. **What we'd do differently:** `lessons`. This adds credibility; include it only when data exists.
9. **Inside the product (gallery).** Every study currently shows the **same generic ScreenFrame skeleton**. Only tint and caption change, and a caption like "Before/after comparison of the listing page" sits over grey bars.
   - If `gallery[].src` exists, show real anonymised screenshots in a lightbox (keyboard navigable, Escape to close).
   - If not, **hide the gallery**. Don't show fake skeletons.
   - Bespoke hero mocks exist for only 2 of 12 studies, via `ScreenMockParts.tsx:384-387`. The other 10 fall back to the same `DashboardMock`. Prefer a data-driven mock that renders the study's own metric labels and entities over a generic dashboard, and keep the `IllustrativeTag`.
10. **One CTA block.** Today there are three: the mid-story tinted CTA, the `ContactSection` titled with the same `ctaHeading` string, and `PageCta`. Keep **one** contextual block: "Facing something similar in [sector]?" with a primary "Talk to us" (opening the modal pre-filled with sector and service), and a secondary "Download this case study (PDF)" only if you implement print styles (see below).
11. **Related studies:** use `relatedSlugs` first, then the heuristic. Never show placeholders, and never pad with unrelated studies.
12. **Previous/next:** show sector plus headline metric, not just the title. Do not wrap circularly without a visual cue.

**Also on the detail page:**
- **Mobile TOC:** a sticky collapsible "On this page" bar with a reading-progress fill. The TOC is currently `hidden lg:block`.
- **Share:** a "Copy link" button with toast feedback; add LinkedIn and X share links.
- **Print stylesheet:** `@media print` gives a clean one-page-ish PDF (hide nav, footer, modal and animations). "Download PDF" can simply call `window.print()`.
- **SEO:** see Phase 9 (`generateMetadata` with the headline, per-study OG image, Article + BreadcrumbList JSON-LD).

### 5.4 Case study content rewrite rules

Apply these to every study in `caseStudies.ts`. You may rewrite prose; you may not invent facts. Every open question goes into `CONTENT_GAPS.md`, grouped by study.

- **Every metric needs a baseline and a timeframe,** or a `TODO(content)` note.
- **Remove the repeated formulas:**
  - every client described as "A <City> <noun>": vary the structure, and lead with what the business does
  - "weekly one-page report" (#5 and #11)
  - "with the conversation attached" / "full context" (#2, #4, #12)
  - "phase-two list" (#3, #12)
  - "in seconds at any hour" / "at any hour" (#4, #11, #12)
  - "X now spend their time on Y" narratives (#1, #2)
  - every `ctaHeading` being a "Want/Need …?" question
- **Cut generic lines,** for example:
  - "Guests now get answers in seconds at any hour, and front desks focus on the guests in front of them"
  - "Dispatch is now visual and quiet instead of a room full of phone calls"
  - "We tuned replies to sound like the hotels' own staff, not a bot"

  Replace each with a specific mechanism or number that already exists in the study.
- **Flag implausible or internally inconsistent claims** in `CONTENT_GAPS.md`. Soften the wording in the meantime; do not delete the study.
  - **#1:** the close drops about 94% (3 days → 4 hrs), but "manual review time" drops only 70%. "Finished before lunch on day one" is anecdotal.
  - **#2:** "3.4× more policies bound" has no baseline or period. "71% bound with no broker" sits oddly beside "-60% broker admin".
  - **#4:**
    - "<5s answer time" for a voice agent, but the stack lists no STT/TTS (only Twilio + OpenAI).
    - "78% resolved without staff" in regulated healthcare has no timeframe.
  - **#5:**
    - "400+ qualified leads in 4 months": 4 months from launch or from kickoff?
    - "AED 38M pipeline" and "4.9★" have no review count.
    - "Bilingual website" doesn't name the languages.
    - "Closed its first eleven transactions" is the strongest proof in the study; make it a metric.
  - **#6:** "0 critical security issues" is self-graded; say who audited it. "Raised a pre-seed round shortly after" is vague.
  - **#7:** "2.8% conversion" has no baseline or benchmark.
  - **#8:** "38 sprints in 9 months" is impossible for one team on the stated cadence. "+34% mobile conversion" has no attribution method. "Works a shifted day" should state the time zones.
  - **#9:** the approach phases overlap ("Weeks 1–3" vs "Months 1–3").
  - **#11 and #12** are placeholders and are gated in Phase 0. If they return, fix these first:
    - #11: "Idea to first booking" for a nearly finished property; 62% direct share for a new property; 214 bookings a month from 24 villas.
    - #12: 438 chats a day for three boutique hotels; "Seed" stage for a hotel group.
- **Sector balance.** Exactly 2 studies per sector and 2 per service reads as manufactured. Don't fabricate more, but do mark `featured` by strength, not symmetry.
- **Voice.** Use plain, specific, past-tense narrative. Lead with the result. Keep sentences under about 25 words, prefer numbers to adjectives, and write no more than one sentence of scene-setting.

---

## Phase 6: Offering pages

**Applies to every page below:**
- **One end-of-page CTA.** Every page currently ends with `ContactSection` (the form) followed immediately by `PageCta` (a banner). Keep **one**:
  - high-intent pages (services, industries, who-we-serve, agents) keep the inline `ContactSection` pre-filled with context
  - informational pages keep a `PageCta`
- **Sibling tiles go before the CTA.** "Other services / disciplines / audiences" tiles currently sit after the contact form (a navigation dead zone). Move them above the CTA.
- **Proof goes high.** Filtered case studies go in the top third of each page, filtered by the current facet. Hide the section when there are none; never show an empty section.
- **Context-aware cross-links.** Services ↔ industries ↔ audiences ↔ engineering links should be filtered by relevance. Add an optional `relatedSectors` / `relatedServices` to each taxonomy entry, instead of listing all six sectors everywhere.
- **Vary the CTA proof line.** The line "Free 30-minute strategy call · NDA on request · Proposal within 48 hours" is repeated verbatim on about 12 pages. Give each page its own, e.g. a sector-specific compliance promise or a relevant result.
- **Touch-friendly instructions.** Replace mouse-centric copy such as "Click a group" and "Drag through the categories" with neutral wording.
- **Hard-coded titles.** Move them into content files, e.g. "Four ways to work with us…" (`industries/[slug]/page.tsx:81`) and "Why Teams Choose VAUG." (`services/[slug]/page.tsx:91`).
- **Distinct templates.** All four `[slug]` routes share one skeleton (hero → ticker → grids → FAQ → contact → tiles → CTA), and `FeatureGrid` renders almost everything. Give each template its **signature section** and at least two distinct block layouts:
  - numbered problem → fix rows
  - comparison table
  - timeline
  - quote or proof band
  - a checklist with ticks

### `/agents` (flagship product page)

- **Hero:** on mobile, `AgentConsole` hides its actions sidebar (`hidden sm:flex`), losing the key "human approves" message. Show a compact approval chip on mobile.
- **KPIs:** agent-type KPIs such as "60–70% tickets resolved without a human", "90%+ transactions matched" and "< 30s first response" have no source.
  - Link each KPI to the case study it comes from, or label it "typical target" with `IllustrativeTag`.
  - Replace vague non-numbers ("Fewer no-shows with reminders", "Hours of copy-paste removed weekly") with a number or remove the KPI slot.
- **Conflicting timelines** across `agents.ts` and `services.ts`:
  - "2 wks to shadow mode"
  - "shadow mode within two weeks, live around week five"
  - "Shadow run Weeks 3–4"
  - "Shadow-mode pilot 3–4 weeks"

  Pick one canonical timeline in a single shared constant and reference it from both pages. Do the same for the first call: "45-minute workflow audit" vs "Free 30-minute strategy call".
- **Duplication with `/services/ai-as-a-service`.** Make `/agents` the product page (what the agents do, guardrails, integrations, proof). Make the AIaaS service page the commercial wrapper (pricing model, onboarding, SLAs). Remove the duplicated three-step start path from one of them.
- **Cross-links:** add links from agent types to the matching sectors (support → e-commerce, voice → healthcare and hospitality).
- **SEO:** `Service` (or `SoftwareApplication`) plus FAQPage JSON-LD.

### `/services` (the hub, and currently the strongest page)

- Keep `ModelChooser`. Give it an anchor (`#chooser`), and link to it from home and every service page.
- Add a "By who you are" row (audiences) and a "By industry" row, since this is the hub.

### `/services/[slug]`

- **New order:** hero, facts, problems, what's included, **case studies**, steps (merged with StartPaths; they currently tell the same "how it starts" story back to back at L79-85), deliverables, why VAUG, tech, relevant sectors (filtered, not all six; see `:111`), who it's for, FAQ, other services, then one CTA.
- The case-study CTA should link to `/case-studies?service=<slug>`.

### `/industries` and `/industries/[slug]`

- **Signature section:** the compliance block (its content is strong, e.g. DSPT, DTAC and FHIR for healthcare) goes near the top, beside ProblemCards.
- **Bugs:**
  - The `#work` section renders even when `studies` is empty (`:89-96`).
  - The spotlight study is repeated in the Work grid.
- **Links:** add links to relevant audiences. "Data you can trust" links to `full-stack-engineering` (`industries.ts:103`); re-check that target.
- **Meta descriptions:** they are built with `hero.subtitle.split(". ")[0]` and come out thin. Write a `metaDescription` per sector.

### `/who-we-serve` and `/who-we-serve/[slug]`

- **Too close to industries.** They are near-clones of the industry pages and share `ServiceTabs`, `CaseSpotlight` and "Sectors we know". The signature section here is **how the engagement feels for this audience**: a journey plus terms.
- **Pains:** upgrade them to problem → fix rows, like ProblemCards. They are currently a plain FeatureGrid with no fixes.
- **Ticker:** remove it (`:60`); it only repeats the hero tags.
- **`snapshot`:** the field (`audiences.ts:36`) is defined but unused. Use it in the hero.
- **HNI content bugs:**
  - "No portfolio mentions" links to `routes.caseStudies`, which contradicts itself.
  - "You own everything" links to the website T&Cs, which are not engagement terms.
  - The FAQ says case studies are anonymised, yet the page shows "Ventures we've built for private clients". Make these consistent.
- **Mobile:** check that the audience compare table scrolls horizontally, with a visible scroll affordance.
- **Meta titles:** "For ${label}" is weak. Write proper `metaTitle` / `metaDescription` values.

### `/engineering` and `/engineering/[slug]`

- **Proof:** add case studies to the hub page. It currently has none.
- **Metrics:** "120+ Products shipped", "40+ Engineers and designers" and "<1 day median time to production" are placeholders. They are gated in Phase 0, and the section hides if empty.
- **Banding:** `#numbers` and `#tech` are adjacent light bands (`:68,72`), which breaks the dark/light alternation rule in `globals.css:6`. Fix the alternation.
- **Related work:** `relatedWork` (`[slug]:35-41`) pads to 3 even when the score is 0. Show only studies with a score above 0, and hide the section when none match.
- **Secondary CTA:** "See our work" should scroll to the on-page `#work` section.
- **Signature section:** quality targets (coverage, performance budgets, review process) as a visual checklist.

---

## Phase 7: Company pages

### `/about`

- **Stats:** the placeholder stats (`60+ projects`, `40+ people`, `12 countries`) and the "client" map pins for Amsterdam, Berlin, Lisbon and Dubai are gated. The map shows offices only, unless client locations are confirmed.
- **Proof:** add a proof band with 2–3 case-study headlines. The page currently has no proof at all.
- **Values:** "Ten things we hold ourselves to" is too many to read. Show 6 of the 10, with each value paired with a concrete behaviour ("Ownership: the lead who scopes your project is the one who delivers it").
- **CTA:** "Seven years in, we still reply to every enquiry ourselves" makes a claim. Keep it only if the owner confirms it.

### `/how-we-work`

- `PreEngagementStepper` (3.2s) and `DeliveryLoop` (3s) need pause controls and the full tab keyboard pattern (see Phase 2).
- Remove the stacked `ContactSection` + `ExploreCards` + `PageCta`; keep one CTA.
- Add FAQPage JSON-LD.
- **Signature section:** the "Friday update" mock is a great, concrete artefact. Make it bigger and more real, e.g. a sample weekly update the visitor can expand.

### `/culture`

- The 8 "moments" are all placeholders and are gated. Without real photos, the page needs a design that doesn't depend on imagery:
  - lead with `DayAtVaug`, which is already the best-built autoplay component on the site
  - follow with rituals shown as a weekly calendar strip
- Add a `TODO(content)` for a real photo set in `CONTENT_GAPS.md`.

### `/team`

- **Leadership:** the six leaders are placeholders (invented names, initials on gradients) and are gated.
  - When real people are added, each needs: photo (`next/image`, with blur placeholder), name, role, a 1-line background, and a LinkedIn link. Add Person JSON-LD.
  - Until then, the page leads with the discipline board and a "Meet the team on a call" CTA.
- **Discipline counts** (18/6/4/4/5/3) are placeholders. Show disciplines without counts.
- **Quote:** it is attributed to "VAUG hiring principle". Present it as a principle, not a quote.

### `/careers` and `/careers/[slug]`

- **Roles:** all 7 roles are placeholders. See Phase 0 for the zero-roles state.
- **Role data:** extend the `Role` type with `datePosted`, `validThrough`, `employmentType`, `locationType`, `applicantLocations`, `salaryRange?` and `status`. Show a salary range when provided.
- **Perks:** "Health cover", "Performance bonus" and "Twice-yearly offsites" are unverified. Flag them in `CONTENT_GAPS.md`.
- **Applying:** it is `mailto:` only.
  - Build a proper application form: name, email, LinkedIn/portfolio URL, CV upload (PDF only, 5MB limit), role, and a short "why" field.
  - Add a backend route `POST /api/applications` with the same validation, honeypot and rate-limit patterns as leads.
  - The success state must say what happens next.
  - If uploads are out of scope, ask the owner. The fallback is a URL-only field.
- **"Ask a question first"** currently opens the *sales* lead modal. Open the modal in a "careers" mode with relevant options, or use a mailto link to a careers address.
- **SEO:** JobPosting JSON-LD, only for real, open roles.

### `/security-and-compliance`

- **Hero chips:** "ISO 27001-aligned" and "PCI DSS via Stripe" can be misread as certifications. Reword them to "Controls aligned to ISO 27001 (not certified)" and "Card data handled by Stripe (PCI DSS Level 1)".
- **Honesty:** keep the honest copy ("We don't claim certificates we don't hold"). It builds trust; make it more prominent.
- **Security pack:** add a "Request our security pack" CTA that opens the contact modal pre-set to a security enquiry.
- **Case-study matching:** it uses `JSON.stringify` keyword search (`page.tsx:24-28`), which is fragile. Use a `tags: ["security", "compliance"]` field on case studies.
- **Unbacked claims:** "Audit support" and "EU · UK · UAE hosting" are listed in `CONTENT_GAPS.md` for confirmation.
- Collapse the stacked CTAs.

### `not-found.tsx`

- Keep the fun animated 404.
- Add a site search box (client-side, over titles of pages and case studies), and set metadata `title: "Page not found"`.
- The popular-link descriptions must use computed counts.

---

## Phase 8: Contact and conversion flow

### 8.1 Form (`src/components/contact/ContactForm.tsx`)

- **Client-side validation.** Validate on blur and on submit, mirroring the backend rules. The backend requires a name of at least 2 characters and a message of at least 10 (`backend/src/lib/validation.ts:6,12`); the UI never tells the user about the 10-character minimum. Show the hints inline ("Tell us a little more: at least 10 characters").
  - **Share the schema.** Create `shared/lead-schema.ts` (or a tiny workspace package) holding the zod schema and the lead options, used by both frontend and backend. This ends the duplicated `lead-options.ts`. If a shared package is awkward with the current setup, add a check script that diffs the two files, and run it in `npm run lint`.
- **On error:**
  - Move focus to the first invalid field.
  - Keep the `role="alert"` summary with links to each field.
  - Use `--danger` tokens with at least 4.5:1 contrast on both surfaces. `text-red-300` fails on the light card.
- **On success:**
  - Put the success heading in a `role="status"` region and move focus to it.
  - Echo back a summary ("We'll reply to jane@… about Dedicated developers").
  - Offer next steps: "Pick a time now" (the scheduler below), "Read a related case study", "See how we work".
- **Network handling:**
  - `res.json()` throws on non-JSON, e.g. when the backend is down, and users then see a misleading "Network error". Handle non-JSON responses with a clear message plus the email fallback.
  - Respect a 429's `Retry-After` ("Too many attempts, try again in 1 minute").
- **Consent:** add a consent line under submit ("We'll only use this to reply. Privacy policy.") linking to `/privacy-policy`.
- **Fields:**
  - Add optional "Where did you hear about us?".
  - Capture hidden context: page path, referrer, and UTM parameters stored in `sessionStorage` on first landing. Send these with the lead.
- **Budget:** make it a range select (options from the shared lead options), plus a "Not sure yet" option.

### 8.2 Modal (`src/components/contact/ContactProvider.tsx`)

- **Focus trap:** add one. Today there is only initial focus.
- **Draft preservation:** keep the form mounted on close, or persist the draft to state, so closing and reopening doesn't lose typed input (`{isOpen && <ContactForm />}` currently unmounts it).
- **Context:** `openContact({ engagement?, sector?, source? })` pre-fills the form. Every contextual CTA passes context: service pages pass the service, industry pages the sector, case studies both, the security page "security enquiry".
- **Link interception:** the `a[href="#contact"]` intercept must ignore modified clicks (meta, ctrl, shift, middle-click).
- **Inline forms:** on pages that already have an inline `ContactSection`, `#contact` links should scroll to the inline form instead of opening the modal. Verify how-we-work and security.
- **Floating button:**
  - Gate the infinite `animate-ping` with `motion-safe:`, and limit it to 3 iterations.
  - Hide the button while the inline form is in view, and while the mobile menu or modal is open.

### 8.3 Contact page

- **CTAs:** the hero "Book a call" and the closing CTA both open a modal containing the same form that is already on the page. Make them scroll to `#brief` and focus the first field.
- **NeedPicker:**
  - Keep it.
  - It mutates the select through the DOM. Make it a controlled component that shares state with the form.
- **HeroTracker:** add a pause control.
- **Channels:** the "Book a call" channel implies a calendar. Wire it to the scheduler below, or relabel it.

### 8.4 Scheduling (ask the owner first)

There is no scheduler; every "Book a call" ends at the lead form. Propose an embedded scheduler (Cal.com embed is recommended; Calendly is the alternative) shown **after** a successful form submit, pre-filled with the lead's name and email.

**Ask the owner** for the booking URL. Until you have it, keep "Request a call" wording.

### 8.5 Backend (`backend/src`)

- **Spam:** add Cloudflare Turnstile (or hCaptcha) verification on `POST /api/leads` and `/api/subscribe`, behind an env flag. Add a minimum time-to-submit check of 3s, using a signed timestamp field.
- **Rate limiting:** the IP comes from a spoofable `x-forwarded-for` (`lib/http.ts:6`). Trust only the platform's header, or the rightmost untrusted hop. Document that the in-memory limiter is per-process.
- **Storage:** the JSON-file store (`lib/store.ts`) doesn't persist on serverless hosts. Keep the interface and add an adapter option (e.g. Postgres/SQLite or a hosted KV), selected by env. Do not remove the JSON adapter.
- **Notifications:**
  - Leads currently notify only an optional `LEAD_WEBHOOK_URL`, so if it's unset nobody hears about the lead. Add an email notification to the team via Resend or SMTP, behind env config.
  - Send an auto-reply to the lead confirming receipt and restating the "one business day" promise.
  - Ask the owner which provider to use.
- **Lead records:** store the page context and UTMs from 8.1.

---

## Phase 9: SEO, metadata and structured data

- **Per-page metadata:**
  - Every route's `generateMetadata` returns `title`, `description`, `alternates.canonical`, `openGraph` (title, description, url, type, images) and `twitter`.
  - Today only the root layout has OG, and canonicals exist only on the contact and legal pages.
- **OG images:**
  - Create `opengraph-image.tsx` for the root and for each dynamic segment (case studies, services, industries, engineering, who-we-serve, careers), using `next/og` (check the Next 16 docs for the API).
  - Use a branded template: dark ink background, accent bar, page title, and for case studies the headline metric.
  - The root layout declares `twitter.card: summary_large_image` but no image exists.
- **JSON-LD:** add a tiny `JsonLd` server component that renders `<script type="application/ld+json">`. Emit:
  - `Organization` (root): name, url, logo, the 3 offices as `address`, `contactPoint` and `sameAs` (once socials exist)
  - `WebSite` (root)
  - `BreadcrumbList` from `PageHero`'s existing `breadcrumbs` prop, which gives every page one
  - `FAQPage` wherever `FaqSection` renders
  - `Service` on service pages and `/agents`
  - `Article` on case-study detail pages, with `datePublished` / `dateModified`
  - `JobPosting` on real, open roles only
  - `ContactPage` on `/contact`
- **Sitemap:**
  - `lastModified = new Date()` on every URL is meaningless. Use `updatedAt` from content, falling back to a build-time constant.
  - Exclude placeholder roles and studies, and legal pages while they are still drafts, if the owner chose `noindex` for them.
- **Headings:** exactly one `h1` per page, and no skipped levels. The AgentStory H2 → H3 is broken today.
- **Metadata copy:** hand-write the `metaTitle` / `metaDescription` for sectors, audiences and case studies. Keep titles at most 60 characters and descriptions 140–160.

---

## Phase 10: Accessibility pass (WCAG 2.2 AA)

Run axe (via `@axe-core/cli` or the browser extension) on every route, in both themes. Fix every serious and critical issue.

Specific items already known:

- **Contrast:** the `--subtle` contrast failure (Phase 1).
- **Autoplay:** pause controls on all autoplay (Phase 2).
- **Tabs:** keyboard patterns and orientation (Phase 2).
- **Menus:** mobile menu focusable when hidden; mega-menu DOM order (Phase 3).
- **Invalid markup:** `<span>` inside `<ul>` in Principles.
- **`aria-current` values:** they must be `"true"` / `"page"` strings, not booleans. This affects EngagementModels and the CaseStudies switcher.
- **TickerBand:** a `<section aria-label>` whose only content is `aria-hidden`. Make it a `div`, or give it real content.
- **Marquees of links:** remove them, or make them static for keyboard and screen-reader users.
- **Rotating hero words:** give screen readers the full sentence.
- **Targets:** all interactive targets at least 24×24px, and at least 44×44px on mobile nav and chips.
- **Focus:** every custom interactive element gets a visible `focus-visible` style.
- **Forms:** focus management and announced status (Phase 8).
- **Motion:** every animation checked with DevTools "Emulate prefers-reduced-motion".

---

## Phase 11: Content deliverables and style guide

### 11.1 Create `CONTENT_GAPS.md` at the repo root

A checklist for the owner, grouped by page, of every fact you could not confirm or had to leave as `TODO(content)`. For each item, give:

- file:line
- what's needed
- why it matters
- a suggested phrasing to use once confirmed

It must at least include:

- **Case studies:** every missing baseline, timeframe, method, team shape, gallery image, testimonial and reference availability; plus each implausible claim flagged in Phase 5.4.
- **Legal:** legal entity details, sub-processors and the review date.
- **Offices:** addresses and phones. The client-market statement.
- **Proof points:** real team members and photos, real open roles, real culture photos, and sourced company stats.
- **Commitments to confirm:** "every number is real", "we reply to every enquiry ourselves", perks, "Audit support", hosting regions, the newsletter's existence, the booking URL, the email provider and the CAPTCHA provider.
- **Home:** the canonical agent timeline and the first-call length.

### 11.2 Voice and style guide (apply everywhere and add it to `frontend/CLAUDE.md`)

- **Voice:** a senior engineer explaining to a busy founder. Be plain, specific, confident and unhyped.
- **Banned phrases and patterns:**
  - "cutting-edge", "seamless", "leverage", "unlock", "empower", "world-class", "end-to-end" (except as a literal service description), "the work that matters", "at any hour"
  - triplets of bold single words ("Workflows get **automated**. Products get **shipped**.")
  - rhetorical questions as headings, more than once per page
- **Numbers:**
  - Use digits for all numbers 10 and above, and for all metrics.
  - Always state a baseline or context for a metric.
  - Use `×` for multipliers.
  - Currency uses the ISO code before the value (`AED 38M`).
- **Headings:** sentence case, with no trailing period on H2/H3 (see Phase 1.3).
- **CTAs:** use verb-first, specific labels, e.g. "Talk to us", "See the case study", "Take the 4-question chooser". Never "Learn more" or "Click here".
- **Microcopy:** errors say what happened and what to do. Empty states offer a next step.
- **Length:** hero subtitles are at most 25 words. Card summaries are at most 30 words. Section intros are at most 2 sentences.

---

## Definition of done (check before declaring each phase complete)

- [ ] `npm run lint`, `npm run typecheck` and `npm run build` pass in `frontend/`. The backend builds and its tests pass, if any exist.
- [ ] No `placeholder: true` content is visible in a production build (`npm run build && npm start`).
- [ ] No raw hex colours in components (`grep -rE "#[0-9a-fA-F]{6}" src/components` returns only illustration and mock internals, with a comment explaining each).
- [ ] No arbitrary `text-[Npx]` below the floors outside `aria-hidden` mocks.
- [ ] Lighthouse mobile on `/`, `/case-studies`, one case-study detail, `/services/[slug]` and `/contact`:
  - Performance ≥ 90
  - Accessibility 100
  - Best Practices ≥ 95
  - SEO 100
- [ ] With the pointer idle for 5 seconds on the home page, the Performance panel shows no recurring rAF or interval work.
- [ ] Every autoplaying component has a working pause control. Reduced-motion emulation leaves no moving element.
- [ ] Keyboard-only walkthrough of the nav, mega-menu, mobile menu, filters, tabs, modal and form works with visible focus and no traps.
- [ ] Checked at 375, 768, 1024 and 1440px in both themes, with no horizontal scroll.
- [ ] Rich Results Test passes for Organization, BreadcrumbList, FAQPage and Article on sample pages.
- [ ] `CONTENT_GAPS.md` is up to date.

## Questions to ask the owner before or during the work (don't guess)

1. Are the 10 non-placeholder case studies real engagements, with real numbers? Can any client be named, or give a quote (even role-attributed)? Are reference calls available?
2. Legal entity details, sub-processors, and whether the legal pages should be `noindex` until they are reviewed.
3. A booking link (Cal.com or Calendly) and an email provider (Resend or SMTP) for notifications and auto-replies. Also a CAPTCHA preference.
4. Real team photos and bios, real open roles, and culture photos. If there are none yet, confirm that those sections should hide.
5. The canonical agent onboarding timeline, and the length of the first call (30 or 45 minutes).
6. Whether a newsletter or blog will actually exist.
7. Can the logos of the technologies and platforms used be shown on the tech stack?
