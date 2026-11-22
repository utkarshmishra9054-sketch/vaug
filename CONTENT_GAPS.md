# Content gaps

Open questions the site can't answer on its own. Each item matches a `// TODO(content)` in `frontend/src/content/`.

## Proposal case studies, logos and testimonials (from `PROPOSAL_CONTENT_PLAN.md`)

### Consent (blocks naming anyone publicly)
- [ ] Written consent to name each client and show its logo: CBD2Heal, CareerNaksha, Think3D, Vivin Design and Phoenix Institute (case studies), plus Brandless, Ntech, JAS Associates, Impossible, Parul University, Amity University, Pennar Industries, Jain Industries and Devgun Packers & Movers (logo tiles in `home.ts`).
- [ ] Approval of the grammar-edited quotes from Kunal Kapoor (Ketto), Ariba Khan (Jumping Minds), Tejal Bajla (allthingsbaby.com), Richard Sanchez (CBD2Heal) and Nimish Gopal (CareerNaksha).

### Figures to verify
- [ ] **Vivin Design:** 12,000 clicks from 27,000 impressions is a 44% CTR. Check it in Google Ads, then remove `placeholder: true`.
- [ ] **Phoenix Institute:** 20,000+ clicks from 40,000+ impressions is a 50% CTR. Check it in Google Ads, then remove `placeholder: true`.
- [ ] **CareerNaksha:** the proposal says "6 months", but the map-rank data runs from 28 Jan to 3 May 2022. Confirm the engagement length.
- [ ] **Think3D:** the proposal's "+40%" doesn't name its metric, so it's left out. Name it if it should go back in.

### Missing facts, per study
| Study | Missing |
|---|---|
| CBD2Heal | Duration, team, full tool list, client type, city, dates for each approach phase |
| CareerNaksha | Duration, team, full tool list, HQ city |
| Think3D | Team, tools, client type, city |
| Vivin Design | Campaign length, team, client type |
| Phoenix Institute | Campaign length, team, client type |

### Assets
- [ ] Screenshots and logos are taken from the proposal PDF. Replace them with originals (SVG logos, full-resolution screenshots) when available.
- [ ] Client-wall results (such as Brandless "+76% organic traffic") are not shown on the site. Brandless and Amity share the same copy-pasted line, and Pennar's result doesn't match the business. Confirm them before any are used.

## Client-wall case studies (`frontend/src/content/clientStudies/`)

All 13 are drafts (`placeholder: true`). Every figure other than those below is illustrative, including the numbers drawn in their screens (`components/case-studies/screens/`). Each file marks them with `TODO(content)`.

| Client | Confirmed fact | Needs |
|---|---|---|
| Amity University | 10,000+ enquiries; landing pages, Google Ads and Meta Ads run end to end (from the owner) | CPL, spend, duration, team, channel split |
| Parul University | LinkedIn engagement up 573% (proposal) | Everything else |
| Brandless | Organic traffic up 76% (proposal; may be copy-pasted, see above) | Confirm the figure; everything else |
| Jain Industries | Non-brand organic traffic up to 9× (proposal) | What the business sells, its website and logo; everything else |
| Ntech | Ranked within 4 months of SEO (proposal) | Everything else |
| JAS Associates | 36% lower CPC in under 3 months (proposal) | Everything else |
| Impossible | ROAS up 3,134% (proposal) | Everything else |
| Devgun Packers & Movers | New moving orders from B2B clients (proposal) | City; everything else |
| Pennar Industries | None | The real engagement and results |
| Invoice Interchange | None | The real engagement and results |
| Local Agency Co. | None | The real engagement and results |
| epi.logic | None | The real engagement and results |
| Well Aliments Brazil | None | The real engagement and results |

## Summerhill Health (`patient-whatsapp-voice-agent-manchester`, rewritten 22 Nov 2026)

The study used to describe a nine-centre imaging network. It now describes the real business: a private GP clinic at 6 Broomfield Lane, Hale (Altrincham), led by Dr Natalie Summerhill. It is now a draft (`placeholder: true`), so it no longer shows in the home page "What Changed for Our Clients" strip, and its numbers must not be quoted as fact.

**Taken from the clinic's own site (summerhillhealth.co.uk, read 22 Nov 2026):** services, fees (£135 20-min GP, £175 follow-up, £285 initial consultation, home visits from £165), opening hours (8 am–6 pm weekdays), the 6 pm-the-day-before cancellation rule, parking, Semble online booking, brand colours, Lato font, logo and screenshots.

**Illustrative, needs Utkarsh to confirm or replace:**
- [ ] What VAUG actually built for Summerhill, and when (the study assumes a 10-week build of a phone + WhatsApp agent integrated with Semble, by a team of 4).
- [ ] Every figure: 78% resolved without staff, <5s answer time, −38% missed appointments, 93% questionnaires returned, 1,284 enquiries in October, 58 conversations a day, 14 bookings by the agent, 38% of enquiries out of hours, and all values in the six drawn screens.
- [ ] Whether the clinic has a WhatsApp number (its site lists phone, email, an enquiry form and online booking only).
- [ ] Client type: set to "Startup" as the closest of the four options for a single private clinic.
- [ ] The site still shows a "We're closed right now, call you back?" form out of hours, so the study keeps the agent to phone and WhatsApp.
- [ ] Everyone in the screens except Dr Summerhill is invented (patients, "Associate GP", "Practice nurse", "Front desk"). The Menopause Rating Scale is a real published scale; the answers are invented.
- [ ] Consent to name Summerhill Health and show its logo, website and Dr Summerhill's photo (in the website screenshots).
- [ ] A testimonial from Dr Summerhill, if she'll give one.
- [ ] Real screenshots of the console, if any exist, to replace the drawn screens.

### Drawn screens (all case studies)
Screens in `frontend/src/components/case-studies/screens/` copy real tools (Google Ads, Meta, Search Console, GA4, LinkedIn, HubSpot, Semrush…) using each client's real name, domain and logo. Every number, campaign, keyword, lead and person in them is illustrative (see the `TODO(content)` comments). Replace them with real exports where possible, and get client consent before publishing.
- [ ] **Devgun:** phone number shown masked (`0XXXX XXXXX`); add the real Business Profile number or leave it masked.
- [ ] **EnjoyBCN:** the Eixample and Gràcia hotels are shown as "EnjoyBCN Eixample" / "EnjoyBCN Gràcia"; use the real property names.
- [ ] **Jain Industries:** the domain `jainindustries.co.in` and product range (steel kitchenware) are guesses.
- [ ] **CBD2Heal:** no website screenshot on file, so its hero still shows the generic illustrative mock.
- [ ] **Invented competitors:** Some search-results screens show invented competitor names (Ntech's map pack, Devgun's local results).
