# VAUG pitch deck: slide content

For prospects who have never heard of VAUG.

**Sources:**
- **Company, services, process and contact** come from the live website content (`frontend/src/content/`).
- **Case studies:** 5 of the site's 12 (one per service, all anonymised as on the site), plus the 5 from the old proposal PDF.
- **Client logos and testimonials** come from the proposal PDF. Nothing else from the PDF is used: no pricing, team, stats, process, awards or offices.

Anything the website marks as a placeholder is left out, for example "60+ projects", "40+ people" and the team page.

---

## Before you build the deck (internal, delete this section)

Confirm these points about the case studies, logos and testimonials before sending.

| # | Item | What to do |
|---|------|------------|
| 1 | **PPC click-through rates.** Vivin had 12,000 clicks from 27,000 impressions (44%). Phoenix had 20,000+ from 40,000+ (50%). Search ads usually get 3–10%, so anyone who runs ads will question this. | Re-check both in the Google Ads accounts. |
| 2 | **Client-wall results.** Brandless and Amity share the same copy-pasted line. Pennar Industries (a steel company) is credited with "student admissions". | Confirm the real result for each client, or show the logo with no claim. |
| 3 | **Permission.** Named clients, logos and quotes need consent, especially Amity, Parul and Kunal Kapoor. | Get an email "OK to use" from each client. |
| 4 | **Kunal Kapoor's title.** The proposal says "CEO – Ketto India". He is Ketto's co-founder. | Use "Co-founder, Ketto". |
| 5 | **Think3D "+40%".** The metric isn't named. | Name it or drop it (it's left out below). |
| 6 | **CareerNaksha timing.** The map-rank screenshots cover 28 Jan → 3 May 2022 (about 3 months), but the copy says 6 months. | Confirm which result belongs to which timeframe. |
| 7 | **Region wording.** The deck now shows clients in the UK, Europe, the UAE, India and Canada, but the website still says "the UK, Europe and the UAE". | Update the website to match (Phase 4 of `PROPOSAL_CONTENT_PLAN.md`). |
| 8 | **Which website case studies to show.** The deck uses 5 of the 12, one per service. The desert retreat and Barcelona concierge are left out because the site still marks them as drafts (`placeholder: true`). | Swap any study for another from the list on slide 19. |

---

## Slide 1: Cover

**VAUG**
AI-first engineering teams that ship.

Automate · Build · Scale

vaug.in · hello@vaug.in

---

## Slide 2: Who we are

**We build the agents and software that keep businesses moving.**

VAUG is a team of engineers, designers and AI specialists, working since 2019 and registered in 2021. We ship products, rescue prototypes and put AI agents to work for startups, family offices, enterprises and agencies.

- **A senior team you can actually reach.** Every project has one accountable lead, not a chain of account managers.
- **AI in every service.** You get shorter timelines and leaner budgets, with human review on everything.

---

## Slide 3: Why we exist

**Too much good work gets stuck.**

Ideas stall in slide decks, prototypes break at launch and teams drown in copy-paste.

Most projects fail quietly, long before launch. That happens when nobody questions the brief, when progress lives in status reports instead of software, and when the team that built it disappears the week after go-live.

**So we diagnose the real problem first, show working software every week and stay on after launch.**

---

## Slide 4: Six services, one AI-first team

| Service | What you get | Best for | How it's priced |
|---------|--------------|----------|-----------------|
| **AI as a Service** | AI agents that answer customers, qualify leads and move data between your tools. We build, host and improve them. | Teams losing hours to repetitive work | Built once, then one monthly fee |
| **Dedicated Developers** | Vetted engineers who work in your repo and join your stand-ups | Teams with a roadmap that need more hands | Month by month, scale any time |
| **Custom Development** | Web, mobile and SaaS products, designed, built and launched | A defined product you want built | Fixed price or sprint by sprint |
| **Build With Us** | Product, brand, website, SEO, launch and growth, managed end to end | Founders and investors launching something new | Retainer or partnership |
| **Monthly Retainer** | Fixes, security, updates and improvements for a live product | Live products that need steady care | One fee, every month |
| **Launch & Rescue** | Lovable, Bolt or v0 apps fixed, secured and shipped | AI-built apps that need finishing | Review first, then a fixed fee |

*Speaker note: most clients combine two services.*

---

## Slide 5: How every project runs

**Six commitments on every project**

1. **One accountable lead.** One senior person owns your project and never passes you around.
2. **Weekly demos.** You judge progress by working software you can click.
3. **A Friday update.** What shipped, what's next, risks and the decisions we need from you.
4. **Your code, your accounts.** In your name from week one.
5. **No surprise invoices.** Changes are scoped and priced before work starts. Fixed means fixed.
6. **We stay after launch.** A care plan is agreed before go-live.

---

## Slide 6: From first call to kickoff in 1–2 weeks

First call (30 min, free) → NDA (same day) → Discovery (2–5 days) → Consultation → Written scope → Proposal (within 48 hours) → Plain-English contract → Kickoff (week 1)

Nothing is signed until you've seen a clear scope and price.

---

## Slide 7: Where AI helps, and where people decide

| AI accelerates | Humans review and decide |
|----------------|--------------------------|
| Boilerplate, tests and migrations | Architecture, data models and security |
| Reading unfamiliar codebases | Every line of code before it merges |
| Test data and edge cases | What ships, and when |
| Docs and release notes | Anything touching payments, health or personal data |

---

## Slide 8: Results at a glance

| | |
|---|---|
| **4 hrs** | Month-end close for a Frankfurt payments processor, down from 3 days |
| **400+** | Qualified buyer leads for a new Dubai property brand in 4 months |
| **6 weeks** | From Lovable prototype to live rental platform in Lisbon |
| **62 → 6** | Average Google position for C2H |
| **300%** | Organic traffic growth for CareerNaksha |
| **5,000+** | Enquiries from one Phoenix Institute campaign |

---

# Part 1: Build and automate (from the website)

*Clients are anonymised, as on the website.*

---

## Slide 9: A reconciliation agent that closes the books in hours, not days

**A Frankfurt payments processor · Fintech · AI as a Service · 10 weeks**

**The challenge**
Month-end reconciliation across 3 banks, 4 payment providers and a ledger took the finance team three working days. Mismatches were flagged but never explained, and auditors wanted a clear trail.

**What we built**
An AI agent that pulls every bank, provider and ledger file each day and matches records with rules first and an LLM for the ambiguous rest. It explains every mismatch in plain language and hands finance a short exception queue each morning. It runs inside the client's own AWS account.

**Results**
- **92%** of transactions matched automatically
- Month-end close in **4 hours**, down from 3 days
- **-70%** manual review time
- **100%** of decisions with an audit trail

---

## Slide 10: A booking app that filled a physio clinic's calendar in 90 days

**A Dubai physiotherapy startup · Healthcare · Custom Development · 12 weeks, fixed price**

**The challenge**
Every appointment was booked over WhatsApp, calendars had gaps and about one in five sessions was a no-show. As a seed-stage company, they needed a fixed price and date.

**What we built**
A bilingual (English and Arabic) iOS, Android and web booking app for clinic and home visits. It includes card deposits, travel-aware scheduling, automated reminders and a therapist view for session notes and exercise plans.

**Results**
- **84%** therapist utilisation, up from 51%
- **68%** of bookings made in-app
- **-45%** no-shows
- Delivered **on time and on budget**

---

## Slide 11: An engineering pod that cut empty truck kilometres by 18%

**A Rotterdam freight forwarder · Logistics · Dedicated Developers · 11 months (ongoing)**

**The challenge**
Planners built routes in spreadsheets, trucks returned empty, customers phoned for every update, and the in-house IT team had no spare capacity.

**What we built**
A dedicated 5-person pod working under the client's product owner. It built a route-optimisation engine (orders, truck positions, driver hours, port slots) and live GPS tracking with predicted arrival times and a customer portal.

**Results**
- **-18%** empty kilometres
- **+22%** loads per truck per week
- **-55%** "where is my shipment?" calls
- **94.6%** on-time delivery

---

## Slide 12: From idea to 400 qualified buyer leads in 16 weeks

**A Dubai family office · Real estate · Build With Us · 16 weeks**

**The challenge**
The family office wanted to launch a boutique property advisory from nothing (no name, brand, website or listings) in a crowded market, within four months.

**What we built**
The name, identity and tone of voice, plus a bilingual website with a buyer's guide and ROI calculator and an optimised Google Business Profile. The lead engine combines Google and Meta campaigns, WhatsApp follow-up and a HubSpot pipeline that scores every lead.

**Results**
- **400+** qualified buyer leads in 4 months
- **AED 38M** pipeline value
- **4.9★** Google rating
- **61%** of leads qualified

---

## Slide 13: A Lovable prototype turned into a live rental platform in 6 weeks

**A Lisbon rental-tech startup · Real estate · Launch & Rescue · 6 weeks**

**The challenge**
The founder's Lovable prototype had open database rules, 7-second page loads and no payments, with demo day eight weeks away.

**What we built**
We kept what worked, then locked down Supabase security, restructured the database and replaced fragile generated components with tested ones. We added ID verification and Stripe Connect for deposits and rent, plus monitoring, tests and a deployment pipeline.

**Results**
- **6 weeks** from prototype to public launch
- **1.2s** page load, down from 7s
- **0** critical security issues at launch
- **486** active listings three months later

---

# Part 2: Grow (from the proposal)

---

## Slide 14: Case study, CBD2Heal (C2H)

**E-commerce · Canada · SEO**

**The challenge**
C2H sells CBD wellness products online in Canada. Its site wasn't producing the traffic or sales it needed. Our audit found bad links, broken links, crawl errors and pages that weren't optimised for search.

**What we did**
A full technical audit and fixes, an improved sitemap and link structure, keyword research, on-page SEO, a content strategy, relevant backlinks and continuous rank tracking.

**Results**
- Average Google position improved from **62 to 6**
- **+90%** traffic, **+80%** revenue and **+95%** conversions
- **79%** of traffic now organic, with spam score below 0.5
- **#1 on Google** for "pure CBD oil tincture in Canada", "pure CBD gel capsules 500mg", "CBD healing salve cream" and "CBD2HEAL broad spectrum"

> "We have seen a significant increase in our sales and brand awareness. Their SEO services are top-notch!"
> **Richard Sanchez**, CEO, CBD2Heal

---

## Slide 15: Case study, CareerNaksha

**Education · India · SEO and local SEO**

**The challenge**
CareerNaksha is a career-counselling startup up against older, better-funded brands. A site change in early 2022 had cut organic traffic, and every new city it launched in had its own local competitors.

**What we did**
We found and fixed indexing problems caused by the URL change, and improved site flow and link structure. We also carried out keyword research, on-page optimisation, content and backlinks, A/B testing and site speed work.

**Results**
- Average local map rank improved from **20.2 to 1.4** (28 Jan → 3 May 2022)
- High-ranking grid points went from **1 of 25 to 25 of 25**
- **+300%** organic traffic
- Session bookings up **72% month on month**

> "Their comprehensive strategy and execution led to significant improvements in my website's rankings."
> **Nimish Gopal**, CEO, CareerNaksha

---

## Slide 16: Case study, Think3D

**3D printing · India · SEO and lead generation · since July 2020**

**The challenge**
Think3D is one of India's leading 3D printing firms, but its website ranked poorly and the company was losing business to low visibility.

**What we did**
We optimised the website, created engaging content, built targeted lead-generation campaigns and improved the landing pages.

**Results**
- **Page 1 on Google** for several high-traffic keywords
- **1,250+ leads per month**
- **+843%** customer interaction on landing pages after 6 months

---

## Slide 17: Case studies, Google Ads for Vivin Design and Phoenix Institute

| | **Vivin Design** (interior design, Noida) | **Phoenix Institute** (PETEX scholarship test, Gujarat) |
|---|---|---|
| **What we did** | Keyword research, ad copy around Vivin's selling points, bid management for top placement, A/B tests on ads and landing pages | Admission-test keywords, ad copy around study materials and faculty, geo-targeted campaigns, continuous refinement |
| **Impressions** | 27,000 | 40,000+ |
| **Clicks** | 12,000 | 20,000+ |
| **Enquiries** | 2,000 | 5,000+ |
| **Also** | Top ad position for "best interior designers in Noida" | Enquiries captured on dedicated landing pages |

*Checklist item 1: confirm these figures before sending.*

---

## Slide 18: More clients we've worked with

*Show only the results you have confirmed (checklist item 2). If a result is unconfirmed, show the logo alone.*

| Client | Result |
|--------|--------|
| Brandless | Organic traffic up 76%+ |
| Ntech | Ranked within 4 months of SEO |
| JAS Associates | 36% lower cost per click in under 3 months |
| Impossible | ROAS up 3,134% |
| Parul University | LinkedIn engagement up 573% |
| Jain Industries | Non-brand organic traffic up to 9× |
| Devgun Packers & Movers | New moving orders from B2B clients |
| Pennar Industries | *[confirm result]* |
| Amity University | *[confirm result]* |

---

## Slide 19: More work on the website

These case studies are on vaug.in/case-studies:

- **A WhatsApp and voice agent that answers every patient call**, Manchester diagnostics network (AI as a Service): 78% of contacts resolved without staff
- **A broker platform that quotes freelancers in under a minute**, London insurtech (Custom Development): 52-second quotes, 3.4× more policies bound
- **A driver app and control panel for 300 same-day couriers**, Birmingham courier network (Custom Development): +27% deliveries per driver
- **A white-label dev team that doubled a Shopify agency's capacity**, Stockholm agency (Dedicated Developers): 2× projects per quarter
- **A stalled fashion marketplace, fixed and launched in 8 weeks**, Abu Dhabi marketplace (Launch & Rescue): 140 designers onboarded

---

## Slide 20: What clients say

> "VAUG has been a great partner for our business. They helped us improve our website's ranking in Google search results, and we've seen a significant increase in traffic and leads, exceeding expectations."
> **Kunal Kapoor**, Co-founder, Ketto

> "They have a deep understanding of SEO and are always up to date on Google's latest changes. We've worked with VAUG for four years and have been very pleased with the results."
> **Ariba Khan**, CEO, Jumping Minds

> "Their expertise in 360° digital marketing has improved our search rankings and online visibility. The team is creative, passionate and always willing to go the extra mile."
> **Tejal Bajla**, CEO, allthingsbaby.com

*The quotes are lightly edited for grammar only. Ask each client to approve the final wording.*

---

## Slide 21: Let's talk

**One conversation can tell you what to build first.**

Free 30-minute strategy call · NDA on request · Proposal within 48 hours

hello@vaug.in · vaug.in
Bengaluru · London · New York
