import type { ApproachPhase, CaseStudyDetail, Feature } from "./types";

/**
 * The 12 VAUG case studies. Clients are anonymised by agreement.
 *
 * Card fields (title, summary, metrics, screen …) feed the listing and the
 * home page; the rest feeds `/case-studies/[slug]`. Testimonials render only
 * when present. Items marked `placeholder` are drafts awaiting real content.
 */

const f = (title: string, description: string): Feature => ({ title, description });
const p = (phase: string, when: string, description: string): ApproachPhase => ({ phase, when, description });

export const caseStudies: CaseStudyDetail[] = [
  // ------------------------------------------------------------------ 1
  {
    slug: "reconciliation-agent-frankfurt-payments",
    client: "A Frankfurt payments processor",
    city: "Frankfurt, Germany",
    stage: "Enterprise",
    industry: "Fintech & Insurance",
    model: "AI as a Service",
    icon: "database",
    title: "A Reconciliation Agent That Closes the Books in Hours, Not Days",
    summary:
      "An AI agent that matches bank, PSP and ledger records, explains every mismatch and hands finance a clean exception queue each morning.",
    metrics: [
      { value: "92%", label: "transactions matched automatically" },
      { value: "4 hrs", label: "month-end close (down from 3 days)" },
      { value: "-70%", label: "manual review time" },
    ],
    tint: "#1d4e89",
    screen: [
      { label: "Matched today", value: "14,210" },
      { label: "Open exceptions", value: "38" },
      { label: "Avg. match time", value: "1.4s" },
    ],
    sector: "fintech-insurance",
    service: "ai-as-a-service",
    clientType: "Enterprise",
    region: "Europe",
    domain: "AI agent (transaction reconciliation)",
    techStack: ["Python", "LangGraph", "OpenAI", "PostgreSQL", "Next.js", "AWS"],
    duration: "10 weeks",
    team: "4 people: PM, 2 AI engineers, designer",
    about:
      "A Frankfurt-based payments processor serving mid-sized e-commerce merchants across the DACH region. The company processes card, SEPA and wallet payments through several PSPs and settles to merchants daily. Its finance team of six handled reconciliation across three banks, four payment providers and an internal ledger, mostly in spreadsheets. As volumes grew past 400,000 transactions a month, the close process became the slowest part of the business.",
    problems: [
      f("Three days to close.", "Month-end reconciliation took the full finance team three working days, delaying reporting to management and auditors."),
      f("Formats that never match.", "Each bank and PSP exported data in a different format, with different references, fee treatments and settlement timing."),
      f("Unexplained exceptions.", "Mismatches were flagged but not explained, so each one needed manual investigation."),
      f("Audit pressure.", "Auditors wanted a clear trail showing why every item was matched or written off."),
    ],
    solution:
      "We built a reconciliation agent that ingests daily files from every bank, PSP and the internal ledger, normalises them into one schema, and matches records using deterministic rules first and an LLM for the ambiguous remainder. For every match it cannot make with confidence, the agent writes a plain-language explanation (split settlement, fee deducted at source, duplicate refund) and proposes the next step. Finance reviews a short exception queue each morning instead of full spreadsheets. Every decision is logged with the rule or reasoning behind it, giving auditors a complete trail. The agent runs inside the client's AWS account, and no transaction data leaves their environment.",
    features: [
      f("Multi-source ingestion", "Automatic pulls from 3 banks and 4 PSPs via SFTP and API, normalised into one ledger view."),
      f("Hybrid matching engine", "Rules handle clear matches, and the LLM handles partial, split and many-to-one cases."),
      f("Explained exceptions", "Every unmatched item comes with a reason and a suggested action."),
      f("Exception queue", "A review screen where analysts approve, reassign or override in one click."),
      f("Audit trail", "A full log of every match decision, exportable for auditors."),
    ],
    challenges: [
      f("Split settlements", "One PSP payout often covered hundreds of transactions minus fees. We built many-to-one matching with fee inference."),
      f("Data residency", "The client required data to stay in the EU. We deployed the model through an EU-hosted endpoint inside their AWS region."),
      f("Trust in AI decisions", "Finance was wary of automated matches. We added confidence scores and a shadow mode that ran for two weeks alongside manual work before going live."),
    ],
    approach: [
      p("Discovery", "Weeks 1–2", "Mapped every data source, fee rule and exception type with the finance team."),
      p("Design", "Week 3", "Designed the matching logic and the exception queue with analysts in the room."),
      p("Build", "Weeks 4–7", "Built ingestion, the matching engine and the review interface."),
      p("Shadow run", "Weeks 8–9", "Ran the agent alongside the manual process and tuned rules until results agreed."),
      p("Launch & improve", "Week 10 onward", "Went live for month-end close and added new PSPs through a monthly retainer."),
    ],
    results: {
      metrics: [
        { value: "92%", label: "transactions matched automatically" },
        { value: "4 hrs", label: "month-end close" },
        { value: "-70%", label: "manual review time" },
        { value: "100%", label: "of decisions with an audit trail" },
      ],
      narrative:
        "The first live month-end close finished before lunch on day one. The finance team now spends its time on the 8% of transactions that need judgement rather than on copying data between spreadsheets. The audit that followed closed with no reconciliation findings, and the team absorbed a 30% rise in volume without new hires.",
    },
    screenshots: [
      "Exception queue with reason tags, confidence scores and approve/override buttons",
      "Daily reconciliation dashboard showing matched vs open items by source",
      "Transaction detail drawer with the agent's plain-language explanation",
      "Audit log export view",
    ],
    ctaHeading: "Want an agent that closes your books faster?",
  },

  // ------------------------------------------------------------------ 2
  {
    slug: "freelancer-insurance-platform-london",
    client: "A London insurtech for freelancers",
    city: "London, UK",
    stage: "Seed",
    industry: "Fintech & Insurance",
    model: "Custom Development",
    icon: "shield",
    title: "A Broker Platform That Quotes Freelancers in Under a Minute",
    summary:
      "A quote-and-bind platform that lets UK freelancers buy professional indemnity cover online, with a dashboard for brokers to manage policies and renewals.",
    metrics: [
      { value: "52s", label: "average time to quote" },
      { value: "3.4×", label: "more policies bound per month" },
      { value: "-60%", label: "broker admin time" },
    ],
    tint: "#4338ca",
    screen: [
      { label: "Quotes today", value: "186" },
      { label: "Policies bound", value: "41" },
      { label: "Renewals due", value: "12" },
    ],
    sector: "fintech-insurance",
    service: "custom-development",
    clientType: "Startup",
    region: "UK",
    domain: "Web platform + broker dashboard",
    techStack: ["Next.js", "NestJS", "PostgreSQL", "Stripe", "Tailwind CSS", "AWS"],
    duration: "14 weeks",
    team: "5 people: PM, designer, 2 full-stack devs, QA",
    about:
      "A seed-stage London insurtech offering professional indemnity and public liability cover to freelancers and small consultancies. Founded by two former Lloyd's brokers, the company works with two capacity providers and sold policies through a phone-and-email process backed by a spreadsheet. Demand from freelance designers, developers and consultants was growing, but every quote took a broker 20 minutes. They needed a product that could scale without hiring a larger broking team.",
    problems: [
      f("Slow quoting.", "Every quote needed a broker to collect details by email and key them into insurer portals."),
      f("Lost leads.", "Freelancers who didn't get a price the same day often bought elsewhere."),
      f("No single view.", "Policies, payments and renewals were tracked across spreadsheets and inboxes."),
      f("Investor demo.", "The founders needed a working product before their next funding round."),
    ],
    solution:
      "We built a customer-facing quote-and-bind flow and a broker dashboard on one platform. Freelancers answer a short, adaptive questionnaire; the platform applies the insurers' rating rules and returns a price in under a minute. Low-risk quotes bind automatically with card payment through Stripe; referrals route to a broker with all details pre-filled. Behind this, the broker dashboard tracks every quote, policy, payment and renewal, and sends automated renewal reminders 30 days before expiry. Policy documents are generated as PDFs and emailed on bind. The platform is built so new products and insurers can be added through configuration rather than code.",
    features: [
      f("Adaptive questionnaire", "Questions change based on profession and turnover, keeping the form short."),
      f("Rating engine", "Insurer pricing rules held as configuration, with instant quotes."),
      f("Instant bind and pay", "Card payments and monthly instalments through Stripe."),
      f("Broker dashboard", "Pipeline of quotes, referrals, live policies and renewals."),
      f("Document generation", "Branded policy schedules and certificates created on bind."),
    ],
    challenges: [
      f("Two insurers, two rulebooks", "Each insurer priced risk differently. We built a rules layer that runs both and shows the best eligible price."),
      f("Regulatory wording", "FCA rules required specific disclosures at each step. We built these into the flow and had them reviewed by the client's compliance adviser."),
      f("Referral handling", "Some risks can't be auto-bound. We routed them to brokers with the full context attached so no details are asked twice."),
    ],
    approach: [
      p("Discovery", "Weeks 1–2", "Mapped the quote process, insurer rules and FCA requirements with the founders."),
      p("Design", "Weeks 3–4", "Designed and tested the questionnaire with ten freelancers."),
      p("Build", "Weeks 5–11", "Built the rating engine, bind flow, payments and broker dashboard."),
      p("Launch", "Weeks 12–13", "Soft launch to the founders' existing client list, then public launch."),
      p("Improve", "Week 14 onward", "Added a second product line and conversion tracking."),
    ],
    results: {
      metrics: [
        { value: "52s", label: "average time to quote" },
        { value: "3.4×", label: "more policies bound per month" },
        { value: "-60%", label: "broker admin time" },
        { value: "71%", label: "of policies bound with no broker involvement" },
      ],
      narrative:
        "Within three months of launch, most policies were being bought online without a broker touching them. The two founders now spend their time on referrals and insurer relationships. The live platform and its numbers became the centre of their funding pitch.",
    },
    screenshots: [
      "Mobile quote flow showing the price screen",
      "Broker dashboard with quote pipeline and renewal alerts",
      "Policy detail page with payment history and documents",
      "Admin screen for editing insurer rating rules",
    ],
    ctaHeading: "Need a platform your customers can buy from in a minute?",
  },

  // ------------------------------------------------------------------ 3
  {
    slug: "physio-booking-app-dubai",
    client: "A Dubai physiotherapy startup",
    city: "Dubai, UAE",
    stage: "Seed",
    industry: "Healthcare",
    model: "Fixed-Price Project",
    icon: "heart",
    title: "A Booking App That Filled a Physio Clinic's Calendar in 90 Days",
    summary:
      "A bilingual booking app for clinic and home-visit physiotherapy, delivered at a fixed price, with therapist scheduling, payments and session notes.",
    metrics: [
      { value: "84%", label: "therapist utilisation (up from 51%)" },
      { value: "68%", label: "bookings made in-app" },
      { value: "-45%", label: "no-shows" },
    ],
    tint: "#0f766e",
    screen: [
      { label: "Sessions this week", value: "312" },
      { label: "Home visits", value: "74" },
      { label: "Slots open", value: "19" },
    ],
    sector: "healthcare",
    service: "fixed-price",
    clientType: "Startup",
    region: "UAE",
    domain: "Patient booking app (web + iOS + Android)",
    techStack: ["Flutter", "Node.js", "MongoDB", "Firebase", "Stripe", "Google Maps API"],
    duration: "12 weeks",
    team: "4 people: PM, designer, Flutter dev, backend dev",
    about:
      "A Dubai-based physiotherapy startup with two clinics and a growing home-visit service covering Dubai Marina, JLT and Downtown. Its therapists treat sports injuries, post-surgery rehab and back pain. Bookings came through WhatsApp and phone, managed by one receptionist and a shared calendar. With therapists travelling between clinics and homes, gaps and double bookings were common, and the founders wanted patients to book, pay and rebook on their own.",
    problems: [
      f("Manual booking.", "Every appointment was arranged through WhatsApp messages, taking hours of reception time each day."),
      f("Empty slots.", "Therapist calendars had gaps that were never filled because patients couldn't see availability."),
      f("No-shows.", "Around one in five sessions was missed, with no reminder system or deposit."),
      f("Fixed budget.", "As a seed-stage company, they needed a clear price and a fixed delivery date."),
    ],
    solution:
      "We scoped and delivered a fixed-price booking product: a patient app for iOS and Android, a web booking page, and an admin panel for the clinic team. Patients choose clinic or home visit, pick a therapist and time, and pay a deposit by card. Home-visit slots account for travel time using Google Maps, so therapists aren't double-booked across the city. Automated reminders go out 24 hours and 2 hours before each session. Therapists see their day on a simple mobile view and add session notes and exercise plans that patients can open in the app. The app runs in English and Arabic.",
    features: [
      f("Clinic and home-visit booking", "Live availability with travel-aware scheduling."),
      f("Deposits and packages", "Card payment for single sessions and discounted session bundles."),
      f("Automated reminders", "Push and SMS reminders to cut no-shows."),
      f("Therapist view", "Daily schedule, patient history and session notes on mobile."),
      f("Exercise plans", "Home exercise programmes shared with patients after each session."),
    ],
    challenges: [
      f("Travel time between visits", "We calculated drive times between appointments so home visits could be booked back to back without clashes."),
      f("Scope creep on a fixed price", "We agreed a clear feature list upfront and kept a \"phase two\" list for everything else, delivering on the agreed date."),
      f("Patient data privacy", "We stored health notes with encryption and role-based access in line with UAE health-data rules."),
    ],
    approach: [
      p("Discovery", "Week 1", "Fixed the scope, price and timeline with the founders."),
      p("Design", "Weeks 2–3", "Designed bilingual patient and therapist screens and tested them with clinic staff."),
      p("Build", "Weeks 4–10", "Built the apps, admin panel, payments and reminders in two-week sprints with demos."),
      p("Launch", "Weeks 11–12", "App store release, staff training and migration of existing patients."),
    ],
    results: {
      metrics: [
        { value: "84%", label: "therapist utilisation" },
        { value: "68%", label: "of bookings made in-app" },
        { value: "-45%", label: "no-shows" },
        { value: "On time", label: "and on budget" },
      ],
      narrative:
        "Within 90 days, most patients were booking themselves and therapist calendars were close to full. Deposits and reminders nearly halved no-shows. The receptionist moved to patient care, and the clinic opened a third location six months later using the same app.",
    },
    screenshots: [
      "Patient app booking screen with clinic / home-visit toggle",
      "Therapist daily schedule on mobile",
      "Admin calendar showing all therapists and utilisation",
      "Patient exercise plan screen",
    ],
    ctaHeading: "Want a booking app delivered at a fixed price?",
  },

  // ------------------------------------------------------------------ 4
  {
    slug: "patient-whatsapp-voice-agent-manchester",
    client: "A Manchester diagnostics network",
    city: "Manchester, UK",
    stage: "Enterprise",
    industry: "Healthcare",
    model: "AI as a Service",
    icon: "message-square",
    title: "A WhatsApp and Voice Agent That Answers Every Patient Call",
    summary:
      "An AI agent that answers calls and WhatsApp messages, books scans, collects pre-scan questionnaires and sends reminders across 9 imaging centres.",
    metrics: [
      { value: "78%", label: "patient contacts resolved without staff" },
      { value: "<5s", label: "answer time (down from 6 min)" },
      { value: "-38%", label: "missed appointments" },
    ],
    tint: "#0e7490",
    screen: [
      { label: "Conversations today", value: "1,146" },
      { label: "Scans booked by agent", value: "214" },
      { label: "Handed to staff", value: "61" },
    ],
    sector: "healthcare",
    service: "ai-as-a-service",
    clientType: "Enterprise",
    region: "UK",
    domain: "AI voice + WhatsApp agent (patient intake and reminders)",
    techStack: ["Python", "OpenAI", "Twilio", "WhatsApp Business API", "PostgreSQL", "Azure"],
    duration: "12 weeks",
    team: "5 people: PM, 2 AI engineers, integration engineer, QA",
    about:
      "A private diagnostic imaging network with nine centres across Greater Manchester and Cheshire, offering MRI, CT, ultrasound and X-ray to self-paying patients and through insurers and NHS referrals. Its central booking team of fourteen handled over 1,500 calls and messages a day. Long hold times meant patients abandoned calls, and many scans were delayed because pre-scan safety questionnaires weren't completed in time.",
    problems: [
      f("Long waits.", "Patients waited an average of six minutes on hold, and a quarter hung up."),
      f("Repetitive questions.", "Most calls were about prices, preparation, directions or moving an appointment."),
      f("Incomplete paperwork.", "MRI safety questionnaires were often missing on the day, causing delays and cancellations."),
      f("Missed appointments.", "No-shows left expensive scanner time unused."),
    ],
    solution:
      "We deployed an AI agent that works on both phone and WhatsApp. It answers instantly, understands what the patient needs, and handles common requests end to end: booking and rescheduling scans against live scanner availability, explaining preparation, sharing prices and directions, and answering insurer questions. After booking, it sends the MRI safety questionnaire on WhatsApp and follows up until it's complete, flagging any safety answers for a radiographer. Reminders go out 48 hours and on the morning of the scan, with one-tap confirm or reschedule. Anything clinical or sensitive goes straight to a human with the full conversation attached.",
    features: [
      f("Voice agent", "Natural phone conversations with instant answer and no menus."),
      f("WhatsApp agent", "Booking, rescheduling and FAQs in the patient's chat."),
      f("Live scheduling", "Two-way sync with the RIS booking system for all nine centres."),
      f("Pre-scan questionnaires", "Guided MRI safety forms with risk answers flagged to staff."),
      f("Human handover", "Clinical, complaint and complex cases passed to staff with context."),
    ],
    challenges: [
      f("Clinical safety", "The agent must never give medical advice. We built strict guardrails and a clinical-topic detector that hands over immediately."),
      f("Legacy booking system", "The RIS had a limited API. We built an integration layer that syncs availability every 30 seconds."),
      f("Data protection", "Patient data is processed in UK-region Azure with GDPR-aligned retention and consent capture."),
    ],
    approach: [
      p("Discovery", "Weeks 1–2", "Analysed 5,000 anonymised call and message logs to find the top request types."),
      p("Design", "Weeks 3–4", "Wrote conversation flows and safety rules with the clinical governance lead."),
      p("Build", "Weeks 5–9", "Built the voice and WhatsApp agents, RIS integration and staff console."),
      p("Pilot", "Weeks 10–11", "Ran at two centres, reviewing every handover and failed conversation."),
      p("Roll-out & improve", "Week 12 onward", "Extended to all nine centres with weekly tuning."),
    ],
    results: {
      metrics: [
        { value: "78%", label: "of contacts resolved without staff" },
        { value: "<5s", label: "answer time" },
        { value: "-38%", label: "missed appointments" },
        { value: "96%", label: "questionnaires completed before the scan" },
      ],
      narrative:
        "Patients now get an answer immediately at any hour, and most never need to speak to the booking team. Staff focus on referrals, insurer queries and patients who need a human. Completed questionnaires and reminders turned previously wasted scanner slots into billable scans.",
    },
    screenshots: [
      "WhatsApp conversation showing a scan being booked and a questionnaire sent",
      "Staff console with live conversations and handover queue",
      "Analytics dashboard: contacts, resolution rate and bookings by centre",
      "Flagged questionnaire review screen",
    ],
    ctaHeading: "Want an agent that answers every patient in seconds?",
  },

  // ------------------------------------------------------------------ 5
  {
    slug: "family-office-property-brand-dubai",
    client: "A Dubai family office",
    city: "Dubai, UAE",
    stage: "Private venture",
    industry: "Real Estate",
    model: "Venture Studio",
    icon: "building",
    title: "From Idea to 400 Qualified Buyer Leads: A Property Brand Built in 16 Weeks",
    summary:
      "We launched a boutique property advisory for a family office: brand, website, Google Business Profile, paid campaigns and a CRM lead engine, all in 16 weeks.",
    metrics: [
      { value: "400+", label: "qualified buyer leads in 4 months" },
      { value: "AED 38M", label: "pipeline value created" },
      { value: "4.9★", label: "Google rating" },
    ],
    tint: "#9a3412",
    screen: [
      { label: "New leads this week", value: "31" },
      { label: "Viewings booked", value: "12" },
      { label: "Pipeline", value: "AED 38M" },
    ],
    sector: "real-estate",
    service: "venture-studio",
    clientType: "HNI",
    region: "UAE",
    domain: "Brand + website + Google listings + lead engine",
    techStack: ["Next.js", "Sanity CMS", "HubSpot", "Google Ads", "Meta Ads", "WhatsApp Business API", "Vercel"],
    duration: "16 weeks",
    team: "6 people: venture lead, brand designer, 2 devs, performance marketer, content writer",
    about:
      "A Dubai-based family office with interests in trading and hospitality wanted to enter residential real estate. Rather than invest passively, the principals chose to build their own boutique advisory focused on off-plan and ready apartments for international buyers from Europe and India. They had capital, relationships with three developers and a clear market view, but no brand, no digital presence and no team to build one.",
    problems: [
      f("Starting from zero.", "No name, brand, website or listings existed."),
      f("Crowded market.", "Dubai has thousands of agencies, so the brand had to stand out quickly."),
      f("Speed to market.", "Developer launch windows meant the business had to be live within four months."),
      f("Lead quality.", "The principals wanted serious, qualified international buyers, not high volumes of casual enquiries."),
    ],
    solution:
      "As a venture studio, we acted as the founding team's product, brand and growth function. We ran positioning workshops with the principals, then created the name, identity and tone of voice. We built a fast, bilingual website with project pages, a buyer's guide and a ROI calculator, and set up and optimised the Google Business Profile. The lead engine combined Google and Meta campaigns targeted at UK, German and Indian investors, WhatsApp follow-up, and a HubSpot pipeline that scores leads by budget, timeline and nationality. Principals get a weekly one-page report of leads, viewings and pipeline value.",
    features: [
      f("Brand identity", "Name, logo, colour system, photography direction and sales collateral."),
      f("Website with investor tools", "Project pages, ROI calculator and downloadable guides."),
      f("Google Business Profile", "Setup, verification, weekly posts and review collection."),
      f("Lead engine", "Paid campaigns, WhatsApp follow-up and scored CRM pipeline."),
      f("Weekly principal report", "One page covering leads, viewings and pipeline."),
    ],
    challenges: [
      f("Standing out", "We positioned the brand as a buyer-side adviser for international investors, not another listing agent."),
      f("Lead quality", "Early campaigns attracted low-budget enquiries. We added qualifying questions and budget-based targeting, lifting the qualified share from 22% to 61%."),
      f("RERA compliance", "All ads and listings carried the required permit numbers, managed through the CMS."),
    ],
    approach: [
      p("Discovery", "Weeks 1–2", "Market research and positioning workshops with the principals."),
      p("Brand", "Weeks 3–6", "Name, identity, messaging and collateral."),
      p("Build", "Weeks 7–12", "Website, CMS, CRM, Google Business Profile and WhatsApp flows."),
      p("Launch", "Weeks 13–14", "Campaign launch in three markets."),
      p("Grow", "Weeks 15–16 onward", "Weekly optimisation of ads, content and lead scoring."),
    ],
    results: {
      metrics: [
        { value: "400+", label: "qualified buyer leads" },
        { value: "AED 38M", label: "pipeline value" },
        { value: "4.9★", label: "Google rating" },
        { value: "61%", label: "of leads qualified" },
      ],
      narrative:
        "Four months after launch, the advisory had a recognisable brand, a steady flow of qualified international buyers and closed its first eleven transactions. The principals now run a business with a clear pipeline rather than an investment idea, and are hiring their own sales team with the lead engine already in place.",
    },
    screenshots: [
      "Website home page with brand identity and featured projects",
      "ROI calculator on a project page",
      "CRM pipeline showing leads scored by budget and market",
      "Weekly principal report (one page)",
    ],
    ctaHeading: "Have capital and an idea? Let's build the business together.",
  },

  // ------------------------------------------------------------------ 6
  {
    slug: "rental-prototype-rescue-lisbon",
    client: "A Lisbon rental-tech startup",
    city: "Lisbon, Portugal",
    stage: "Pre-seed",
    industry: "Real Estate",
    model: "Launch & Rescue",
    icon: "wrench",
    title: "A Lovable Prototype Turned Into a Rental Platform Ready for Real Tenants",
    summary:
      "We took a founder-built Lovable prototype for mid-term rentals and made it secure, fast and production-ready in 6 weeks, without starting from scratch.",
    metrics: [
      { value: "6 weeks", label: "prototype to public launch" },
      { value: "1.2s", label: "page load (down from 7s)" },
      { value: "0", label: "critical security issues at launch" },
    ],
    tint: "#be123c",
    screen: [
      { label: "Active listings", value: "486" },
      { label: "Applications this week", value: "132" },
      { label: "Uptime", value: "99.95%" },
    ],
    sector: "real-estate",
    service: "launch-and-rescue",
    clientType: "Startup",
    region: "Europe",
    domain: "Web app (mid-term rental marketplace)",
    techStack: ["React", "Supabase", "PostgreSQL", "Stripe Connect", "Vercel", "Sentry"],
    duration: "6 weeks",
    team: "3 people: tech lead, full-stack dev, QA",
    about:
      "A pre-seed Lisbon startup connecting remote workers and relocating professionals with furnished apartments for one to six months. The solo, non-technical founder built the first version with Lovable in a few weekends and signed up 60 landlords. Early users liked the idea, but the app broke often, loaded slowly and had no real payment flow. With an accelerator demo day approaching, the product needed to be ready for paying tenants.",
    problems: [
      f("Security gaps.", "Database rules were open, so any logged-in user could read other users' data."),
      f("Slow and fragile.", "Pages took seven seconds to load, and many features failed under real data."),
      f("No payments.", "Deposits and rent were collected by bank transfer outside the app."),
      f("Tight deadline.", "Demo day was eight weeks away, leaving no time for a rebuild."),
    ],
    solution:
      "We audited the prototype and kept everything that worked: the design, the core flows and the founder's momentum. We then fixed what AI-generated code typically misses. We locked down Supabase row-level security, restructured the database, added indexing and image optimisation, and replaced fragile generated components with tested ones. We built a proper application and booking flow with ID verification, and added Stripe Connect so tenants pay deposits and rent in the app while landlords receive payouts automatically. We set up monitoring, automated tests and a deployment pipeline, then handed over a codebase the founder's future team can build on.",
    features: [
      f("Security hardening", "Row-level security, role-based access and secure file storage."),
      f("Performance work", "Query optimisation, image CDN and caching."),
      f("Tenant applications", "Verified profiles, documents and landlord approval flow."),
      f("Payments", "Deposits and monthly rent through Stripe Connect with landlord payouts."),
      f("Monitoring and tests", "Error tracking, uptime alerts and an automated test suite."),
    ],
    challenges: [
      f("Rescue, not rewrite", "We kept around 60% of the original code and rebuilt only what was unsafe or unstable."),
      f("Live data", "Real landlords were already using the app, so we migrated data with zero downtime."),
      f("Founder handover", "We documented the codebase and trained the founder to ship small changes safely."),
    ],
    approach: [
      p("Audit", "Week 1", "Full code, security and performance review with a clear fix list."),
      p("Stabilise", "Weeks 2–3", "Security fixes, database restructure and performance work."),
      p("Complete", "Weeks 4–5", "Applications, payments and landlord payouts."),
      p("Launch", "Week 6", "Testing, monitoring setup and public launch before demo day."),
    ],
    results: {
      metrics: [
        { value: "6 weeks", label: "prototype to launch" },
        { value: "1.2s", label: "page load" },
        { value: "0", label: "critical security issues" },
        { value: "486", label: "active listings three months later" },
      ],
      narrative:
        "The founder presented a live product with real paying tenants at demo day and raised a pre-seed round shortly after. The platform now handles hundreds of listings and applications a week without breaking, and the codebase is ready for the first in-house hire.",
    },
    screenshots: [
      "Before/after comparison of the listing page",
      "Tenant application flow with document upload",
      "Landlord dashboard with payouts",
      "Security audit summary (issues found vs fixed)",
    ],
    ctaHeading: "Built a prototype with AI? Let's make it ready for real users.",
  },

  // ------------------------------------------------------------------ 7
  {
    slug: "modest-fashion-marketplace-abu-dhabi",
    client: "An Abu Dhabi modest-fashion marketplace",
    city: "Abu Dhabi, UAE",
    stage: "Seed",
    industry: "E-commerce & Retail",
    model: "Launch & Rescue",
    icon: "layers",
    title: "A Stalled Fashion Marketplace, Fixed and Launched in 8 Weeks",
    summary:
      "A multi-vendor marketplace for regional modest-fashion designers, stuck after a previous agency left it half built. We fixed it, finished it and launched it in 8 weeks.",
    metrics: [
      { value: "8 weeks", label: "from stalled to live" },
      { value: "2.8%", label: "conversion rate" },
      { value: "140", label: "designers onboarded" },
    ],
    tint: "#86198f",
    screen: [
      { label: "Orders today", value: "96" },
      { label: "Active sellers", value: "140" },
      { label: "GMV this month", value: "AED 612K" },
    ],
    sector: "ecommerce-retail",
    service: "launch-and-rescue",
    clientType: "Startup",
    region: "UAE",
    domain: "Multi-vendor marketplace (web + mobile)",
    techStack: ["Next.js", "Medusa", "PostgreSQL", "Redis", "Tabby", "Stripe", "Algolia", "AWS"],
    duration: "8 weeks",
    team: "4 people: tech lead, 2 full-stack devs, QA",
    about:
      "A seed-stage Abu Dhabi startup building an online home for independent modest-fashion designers from the GCC. Buyers can shop abayas, kaftans and occasion wear from dozens of small labels in one place. The founders had paid a previous agency for nine months of work, but the marketplace never launched: checkout failed, seller payouts didn't work and the codebase had no documentation. They had designers waiting and Ramadan, their biggest sales season, was ten weeks away.",
    problems: [
      f("Broken checkout.", "Orders failed at payment roughly one time in three."),
      f("No seller payouts.", "Split payments between the platform and designers had never been finished."),
      f("Undocumented code.", "The previous agency left no documentation or tests."),
      f("Hard deadline.", "Launch had to happen before Ramadan to catch peak demand."),
    ],
    solution:
      "We started with a one-week audit that showed the frontend was usable but the commerce backend was not. We moved orders, inventory and payouts onto Medusa, an open-source commerce engine, and connected the existing storefront to it. We rebuilt checkout with card payments, Apple Pay and Tabby instalments, added split payouts to designers, and built a seller portal for listings, orders and earnings. We added fast bilingual search with Algolia and set up shipping integrations across the UAE and Saudi Arabia. The marketplace launched two weeks before Ramadan.",
    features: [
      f("Reliable checkout", "Card, Apple Pay and buy-now-pay-later with Tabby."),
      f("Seller portal", "Listings, stock, orders and payouts for each designer."),
      f("Split payouts", "Automatic commission and settlement to designers."),
      f("Arabic and English search", "Fast, typo-tolerant search with filters for size and occasion."),
      f("GCC shipping", "Courier integrations with live rates and tracking."),
    ],
    challenges: [
      f("Inherited code", "We kept the storefront design and replaced only the broken commerce layer, saving weeks."),
      f("Peak-season load", "We load-tested for ten times normal traffic ahead of Ramadan."),
      f("Right-to-left layouts", "We fixed Arabic layouts across every page and email template."),
    ],
    approach: [
      p("Audit", "Week 1", "Code review, bug list and a keep/fix/replace plan."),
      p("Fix", "Weeks 2–4", "Commerce backend, checkout and payments."),
      p("Finish", "Weeks 5–6", "Seller portal, payouts, search and shipping."),
      p("Launch", "Weeks 7–8", "Designer onboarding, load testing and go-live."),
    ],
    results: {
      metrics: [
        { value: "8 weeks", label: "stalled to live" },
        { value: "2.8%", label: "conversion rate" },
        { value: "140", label: "designers onboarded" },
        { value: "AED 612K", label: "GMV in the first full month" },
      ],
      narrative:
        "The marketplace launched in time for Ramadan and processed more orders in its first month than the founders had planned for the first quarter. Designers get paid automatically, and the founders now have a documented codebase and a team they can call on for new features.",
    },
    screenshots: [
      "Storefront home in Arabic and English",
      "Checkout with Tabby and Apple Pay options",
      "Seller portal with orders and earnings",
      "Admin GMV dashboard",
    ],
    ctaHeading: "Is your store stuck? Let's get it launched.",
  },

  // ------------------------------------------------------------------ 8
  {
    slug: "headless-storefront-team-stockholm",
    client: "A Stockholm Shopify agency",
    city: "Stockholm, Sweden",
    stage: "SME",
    industry: "E-commerce & Retail",
    model: "Dedicated Developers",
    icon: "users",
    title: "A White-Label Dev Team That Doubled a Shopify Agency's Capacity",
    summary:
      "A dedicated 4-developer team working under a Stockholm agency's brand to deliver headless Shopify storefronts for Nordic fashion and lifestyle brands.",
    metrics: [
      { value: "2×", label: "projects delivered per quarter" },
      { value: "6", label: "headless storefronts shipped in 9 months" },
      { value: "+34%", label: "average mobile conversion for end clients" },
    ],
    tint: "#15803d",
    screen: [
      { label: "Sprints completed", value: "38" },
      { label: "Open tickets", value: "14" },
      { label: "Avg. Lighthouse score", value: "96" },
    ],
    sector: "ecommerce-retail",
    service: "dedicated-developers",
    clientType: "Agency",
    region: "Europe",
    domain: "Dedicated dev team (headless storefront rebuilds)",
    techStack: ["Shopify Hydrogen", "Remix", "React", "TypeScript", "Storyblok", "GraphQL", "Vercel"],
    duration: "9 months (ongoing)",
    team: "4 people: tech lead, 2 frontend devs, QA",
    about:
      "A design-led Shopify agency in Stockholm working with Nordic fashion, beauty and lifestyle brands. Its team of 18 is strong in brand, UX and strategy, but it had only three in-house developers. As clients moved from standard Shopify themes to faster headless storefronts, the agency was turning away work because it couldn't hire experienced Hydrogen developers quickly enough in Stockholm.",
    problems: [
      f("Lost projects.", "The agency declined two large projects in one quarter due to lack of developers."),
      f("Hard to hire.", "Senior headless Shopify developers were scarce and expensive locally."),
      f("Brand consistency.", "Any outside team had to work invisibly under the agency's brand and standards."),
      f("Time zones.", "Developers needed enough overlap with Stockholm for daily collaboration."),
    ],
    solution:
      "We set up a dedicated team of four (a tech lead, two frontend developers and a QA engineer) who work as part of the agency. The team joins the agency's Slack, Jira and stand-ups, follows its code standards and design system, and attends client calls under the agency's name when needed. We built a shared Hydrogen starter kit with the agency, covering components, CMS setup and performance defaults, which cut setup time on every new project. The agency's own developers now focus on architecture and client relationships while our team handles delivery.",
    features: [
      f("Headless storefronts", "Six Hydrogen storefronts for fashion and lifestyle brands."),
      f("Shared starter kit", "Reusable components, CMS models and performance settings."),
      f("CMS integration", "Storyblok set up so brand teams edit pages without developers."),
      f("Quality process", "Automated tests, accessibility checks and performance budgets on every release."),
    ],
    challenges: [
      f("Working invisibly", "We adopted the agency's tools, standards and communication style from day one."),
      f("Time overlap", "The team works a shifted day with four hours of daily overlap with Stockholm."),
      f("Knowledge retention", "Everything is documented in the agency's wiki, so no knowledge is locked in our team."),
    ],
    approach: [
      p("Match", "Week 1", "Selected developers with Hydrogen experience, interviewed by the agency."),
      p("Onboard", "Weeks 2–3", "Joined tools, learned standards and shipped a first small project."),
      p("Build the kit", "Weeks 4–6", "Created the shared starter kit with the agency's lead developer."),
      p("Deliver", "Month 2 onward", "Ongoing sprints across client projects with monthly reviews."),
    ],
    results: {
      metrics: [
        { value: "2×", label: "projects delivered per quarter" },
        { value: "6", label: "headless storefronts shipped" },
        { value: "+34%", label: "average mobile conversion" },
        { value: "96", label: "average Lighthouse score" },
      ],
      narrative:
        "The agency doubled its delivery capacity without adding permanent headcount and stopped turning away headless projects. End clients saw faster stores and higher mobile conversion, and the agency now pitches headless builds as a core offer.",
    },
    screenshots: [
      "One of the delivered storefronts (product listing page)",
      "Shared starter-kit component library",
      "Sprint board showing work across client projects",
      "Before/after performance scores",
    ],
    ctaHeading: "Need more developers under your brand? Let's talk.",
  },

  // ------------------------------------------------------------------ 9
  {
    slug: "route-planning-pod-rotterdam",
    client: "A Rotterdam freight forwarder",
    city: "Rotterdam, Netherlands",
    stage: "Enterprise",
    industry: "Logistics",
    model: "Dedicated Developers",
    icon: "workflow",
    title: "An Engineering Pod That Cut Empty Truck Kilometres by 18%",
    summary:
      "A dedicated 5-person engineering pod building route optimisation and live shipment tracking for a road freight operator across the Benelux and Germany.",
    metrics: [
      { value: "-18%", label: "empty kilometres" },
      { value: "+22%", label: "loads per truck per week" },
      { value: "-55%", label: "\"where is my shipment?\" calls" },
    ],
    tint: "#b45309",
    screen: [
      { label: "Trucks on road", value: "212" },
      { label: "Shipments tracked", value: "1,874" },
      { label: "On-time rate", value: "94.6%" },
    ],
    sector: "logistics",
    service: "dedicated-developers",
    clientType: "Enterprise",
    region: "Europe",
    domain: "Engineering pod (route planning + shipment tracking)",
    techStack: ["Python", "Google OR-Tools", "Go", "Kafka", "PostgreSQL + PostGIS", "React", "Kubernetes"],
    duration: "11 months (ongoing)",
    team: "5 people: tech lead, 2 backend devs, frontend dev, data engineer",
    about:
      "A Rotterdam-based freight forwarder moving containers and general cargo by road between the Port of Rotterdam, Antwerp and inland hubs across the Netherlands, Belgium and Germany. It runs a mixed fleet of about 250 own and subcontracted trucks. Its small internal IT team maintained the core transport management system but had no capacity for new products. Planners built routes by hand, and customers called constantly for shipment updates.",
    problems: [
      f("Manual planning.", "Planners built daily routes in spreadsheets, leaving trucks returning empty."),
      f("No live visibility.", "Customers had no self-service tracking and phoned for every update."),
      f("Small IT team.", "The in-house team was fully occupied keeping core systems running."),
      f("Long-term roadmap.", "The company needed an ongoing team, not a single project."),
    ],
    solution:
      "We provided a dedicated engineering pod of five that works alongside the client's IT team under their product owner. The pod's first priority was route optimisation: a planning engine that combines orders, truck positions, driver hours and port slot times to suggest daily routes and backhaul loads. Planners review and adjust suggestions rather than starting from scratch. The second priority was live tracking, which streams GPS data from trucks, predicts arrival times and gives customers a tracking portal and automated updates. The pod works in two-week sprints and shares on-call duty with the client's team.",
    features: [
      f("Route optimisation engine", "Daily route and backhaul suggestions based on orders, driver hours and slots."),
      f("Planner workspace", "Map-based view to review, drag and confirm routes."),
      f("Live tracking", "GPS streaming from own and subcontracted trucks."),
      f("ETA prediction", "Arrival estimates that update with traffic and delays."),
      f("Customer portal", "Self-service tracking with email and API updates."),
    ],
    challenges: [
      f("Mixed fleet data", "Subcontractors used different telematics providers. We built adapters for six providers into one data stream."),
      f("Driver-hour rules", "EU driving and rest-time rules were built into the planner so every suggested route is legal."),
      f("Planner adoption", "We designed the planner to suggest, not dictate, and ran weekly sessions with planners to improve it."),
    ],
    approach: [
      p("Onboard", "Weeks 1–3", "Joined the client's team, learned the TMS and agreed the roadmap."),
      p("Tracking foundation", "Months 1–3", "Built the GPS data pipeline and customer portal."),
      p("Route optimisation", "Months 4–7", "Built and piloted the planning engine with two planners."),
      p("Scale", "Months 8–11 onward", "Rolled out to all planners, added ETA prediction and API access."),
    ],
    results: {
      metrics: [
        { value: "-18%", label: "empty kilometres" },
        { value: "+22%", label: "loads per truck per week" },
        { value: "-55%", label: "\"where is my shipment?\" calls" },
        { value: "94.6%", label: "on-time delivery" },
      ],
      narrative:
        "Planners now start each day with an optimised plan instead of a blank spreadsheet, and trucks carry more backhaul loads. Customers track shipments themselves, freeing the customer service team. The pod continues as a long-term extension of the client's IT department.",
    },
    screenshots: [
      "Planner map view with suggested routes and backhaul loads",
      "Live fleet tracking dashboard",
      "Customer tracking portal with ETA",
      "Route KPI dashboard (empty km, loads per truck)",
    ],
    ctaHeading: "Need an engineering team that works like your own?",
  },

  // ------------------------------------------------------------------ 10
  {
    slug: "courier-driver-app-birmingham",
    client: "A Birmingham same-day courier network",
    city: "Birmingham, UK",
    stage: "Enterprise",
    industry: "Logistics",
    model: "Custom Development",
    icon: "smartphone",
    title: "A Driver App and Control Panel for 300 Same-Day Couriers",
    summary:
      "A custom driver app and dispatch panel replacing paper sheets and phone calls for a same-day courier network across the Midlands.",
    metrics: [
      { value: "+27%", label: "deliveries per driver per day" },
      { value: "99.2%", label: "proof-of-delivery captured" },
      { value: "-80%", label: "dispatch phone calls" },
    ],
    tint: "#1e40af",
    screen: [
      { label: "Jobs today", value: "2,436" },
      { label: "Drivers active", value: "284" },
      { label: "Delivered", value: "1,902" },
    ],
    sector: "logistics",
    service: "custom-development",
    clientType: "Enterprise",
    region: "UK",
    domain: "Mobile driver app + admin panel",
    techStack: ["React Native", "Node.js", "PostgreSQL", "Redis", "Socket.IO", "Google Maps API", "AWS"],
    duration: "16 weeks",
    team: "5 people: PM, designer, 2 mobile/full-stack devs, QA",
    about:
      "A Birmingham-based same-day courier network delivering parcels, medical samples and B2B documents across the Midlands. It works with around 300 self-employed drivers on vans, cars and bikes. Jobs were dispatched by phone and WhatsApp, and proof of delivery was captured on paper. As large retail and healthcare clients demanded real-time updates and digital proof, the manual process could no longer keep up.",
    problems: [
      f("Phone-based dispatch.", "Controllers spent the day calling drivers to assign and confirm jobs."),
      f("Paper proof of delivery.", "Lost or illegible sheets led to disputes and delayed invoices."),
      f("No live view.", "Controllers and clients couldn't see where drivers or parcels were."),
      f("Client demands.", "Key accounts required digital tracking to renew contracts."),
    ],
    solution:
      "We designed and built a custom driver app for iOS and Android and a web-based control panel. Controllers see all jobs and drivers on a live map, assign work with drag and drop or let the system suggest the nearest suitable driver. Drivers receive jobs in the app with navigation, scan parcels, and capture signature, photo and GPS proof at delivery. Clients receive automatic notifications and a tracking link. Completed jobs flow straight into invoicing, and drivers see their earnings in the app. The app works offline in areas with poor signal and syncs when back online.",
    features: [
      f("Driver app", "Job list, navigation, barcode scanning and proof of delivery."),
      f("Live dispatch panel", "Map-based assignment with nearest-driver suggestions."),
      f("Client notifications", "Automatic SMS and email updates with tracking links."),
      f("Offline mode", "Full job handling without signal, with automatic sync."),
      f("Earnings and invoicing", "Driver earnings view and automatic client invoice data."),
    ],
    challenges: [
      f("Driver adoption", "Many drivers were not tech-savvy. We kept the app to a few large buttons and trained drivers in small groups."),
      f("Poor coverage areas", "Offline-first design meant no lost proofs in basements or rural areas."),
      f("Medical sample handling", "We added chain-of-custody steps for healthcare deliveries."),
    ],
    approach: [
      p("Discovery", "Weeks 1–2", "Rode along with drivers and sat with controllers to map the day."),
      p("Design", "Weeks 3–5", "Designed and tested the app with 15 drivers."),
      p("Build", "Weeks 6–13", "Built the app, panel, notifications and integrations."),
      p("Launch", "Weeks 14–16", "Phased roll-out, driver training and switch-off of paper sheets."),
    ],
    results: {
      metrics: [
        { value: "+27%", label: "deliveries per driver per day" },
        { value: "99.2%", label: "proof of delivery captured" },
        { value: "-80%", label: "dispatch phone calls" },
        { value: "2", label: "key contracts renewed" },
      ],
      narrative:
        "Dispatch is now visual and quiet instead of a room full of phone calls. Drivers complete more jobs because routes and details arrive in the app, and invoicing happens without chasing paper. Digital tracking helped the courier renew its two largest contracts.",
    },
    screenshots: [
      "Driver app job screen with navigation and proof of delivery",
      "Live dispatch map with drivers and jobs",
      "Client tracking page with live ETA",
      "Daily operations dashboard",
    ],
    ctaHeading: "Still dispatching by phone? Let's build your app.",
  },

  // ------------------------------------------------------------------ 11
  // Draft: the source document was cut off before #11. Replace with the real write-up.
  {
    slug: "boutique-desert-retreat-ras-al-khaimah",
    client: "A UAE private investor",
    city: "Ras Al Khaimah, UAE",
    stage: "Private venture",
    industry: "Hospitality & Travel",
    model: "Venture Studio",
    icon: "globe",
    title: "A Boutique Desert Retreat Launched From Brand to First Booking in 14 Weeks",
    summary:
      "We launched a 24-villa desert retreat for a private investor: brand, direct-booking website, OTA and Google listings, guest messaging and launch campaigns.",
    metrics: [
      { value: "62%", label: "direct bookings (vs OTAs)" },
      { value: "78%", label: "occupancy in the first season" },
      { value: "4.8★", label: "average guest rating" },
    ],
    tint: "#a16207",
    screen: [
      { label: "Bookings this month", value: "214" },
      { label: "Occupancy", value: "78%" },
      { label: "Direct share", value: "62%" },
    ],
    sector: "hospitality-travel",
    service: "venture-studio",
    clientType: "HNI",
    region: "UAE",
    domain: "Brand + direct-booking website + listings + guest messaging",
    techStack: ["Next.js", "Sanity CMS", "Cloudbeds", "Stripe", "WhatsApp Business API", "Google Ads", "Vercel"],
    duration: "14 weeks",
    team: "6 people: venture lead, brand designer, 2 devs, performance marketer, content writer",
    about:
      "A UAE-based private investor built 24 villas at the edge of the Ras Al Khaimah desert, an hour from Dubai. The property was nearly finished, but there was no name, no brand, no booking system and no team to run marketing. The investor wanted a retreat that could sell directly to guests from the UAE, Europe and the UK rather than depend on travel agencies and booking sites.",
    problems: [
      f("No brand or presence.", "The property had no name, identity, website or listings."),
      f("OTA dependence.", "Without a direct channel, most bookings would come through commission-heavy booking sites."),
      f("Fixed opening date.", "The first season started in fourteen weeks, when desert weather turns mild."),
      f("Owner time.", "The investor wanted a weekly report, not a second full-time job."),
    ],
    solution:
      "Acting as the retreat's founding team, we created the name, identity and story, then built a fast direct-booking website connected to the property management system, with secure payments and seasonal pricing. We set up and optimised Google Business Profile, Google Hotel Ads and the main booking sites, all synced from one calendar. A WhatsApp concierge handles pre-arrival questions, experiences and transfers, handing special requests to the guest team. Launch campaigns targeted UAE weekenders and European winter travellers, and the owner receives a one-page weekly report.",
    features: [
      f("Brand and story", "Name, identity, photography direction and tone of voice."),
      f("Direct-booking website", "Live availability, seasonal pricing and secure payments."),
      f("Channel management", "Google Hotel Ads and booking sites synced from one calendar."),
      f("WhatsApp concierge", "Pre-arrival questions, experiences and transfers in the guest's chat."),
      f("Weekly owner report", "Bookings, occupancy, revenue and reviews on one page."),
    ],
    challenges: [
      f("Winning direct bookings", "We offered direct-only perks and best-rate messaging so guests had a reason to book on the website."),
      f("Seasonality", "Pricing and campaigns were planned around the desert season and UAE long weekends."),
      f("Opening on time", "Brand, site and listings ran in parallel tracks so everything was live before the first guests."),
    ],
    approach: [
      p("Discovery", "Weeks 1–2", "Positioning, guest profiles and pricing with the investor."),
      p("Brand", "Weeks 3–5", "Name, identity, story and photography brief."),
      p("Build", "Weeks 6–11", "Website, booking engine, listings and WhatsApp concierge."),
      p("Launch", "Weeks 12–14", "Campaigns in the UAE, UK and Europe and the first guests."),
    ],
    results: {
      metrics: [
        { value: "62%", label: "direct bookings" },
        { value: "78%", label: "first-season occupancy" },
        { value: "4.8★", label: "average guest rating" },
        { value: "14 weeks", label: "idea to first booking" },
      ],
      narrative:
        "The retreat opened on schedule with a recognisable brand and a booking website that brings in most reservations directly. Guest questions are answered on WhatsApp in seconds, and the investor follows the business through a weekly one-page report.",
    },
    screenshots: [
      "Direct-booking website home page",
      "Villa page with live availability and pricing",
      "WhatsApp concierge conversation",
      "Weekly owner report",
    ],
    ctaHeading: "Building a hospitality venture? Let's launch it together.",
    placeholder: true,
  },

  // ------------------------------------------------------------------ 12
  // Draft: the source document was cut off before #12. Replace with the real write-up.
  {
    slug: "whatsapp-concierge-barcelona",
    client: "A Barcelona boutique hotel group",
    city: "Barcelona, Spain",
    stage: "Seed",
    industry: "Hospitality & Travel",
    model: "Fixed-Price Project",
    icon: "message-square",
    title: "A WhatsApp Concierge That Answers Guests Around the Clock",
    summary:
      "A fixed-price WhatsApp concierge for three boutique hotels: instant answers in five languages, upsells, check-in and handover to the front desk.",
    metrics: [
      { value: "81%", label: "guest questions answered instantly" },
      { value: "+19%", label: "upsell revenue per stay" },
      { value: "5", label: "languages supported" },
    ],
    tint: "#c2410c",
    screen: [
      { label: "Chats today", value: "438" },
      { label: "Upsells booked", value: "37" },
      { label: "Handed to desk", value: "24" },
    ],
    sector: "hospitality-travel",
    service: "fixed-price",
    clientType: "Startup",
    region: "Europe",
    domain: "WhatsApp concierge (guest messaging + upsells)",
    techStack: ["Node.js", "OpenAI", "WhatsApp Business API", "PostgreSQL", "Mews API", "Vercel"],
    duration: "8 weeks",
    team: "3 people: PM, AI engineer, full-stack dev",
    about:
      "A young Barcelona hotel group running three boutique properties in the Gothic Quarter, Eixample and Gràcia. Guests messaged the front desk on WhatsApp at all hours about check-in times, luggage, restaurants and transfers, in several languages. The small desk teams couldn't keep up at busy times, and upsells like late check-out or airport transfers were rarely offered.",
    problems: [
      f("Busy front desks.", "Staff answered the same WhatsApp questions all day, often while checking guests in."),
      f("Slow night replies.", "Messages sent overnight waited until morning."),
      f("Missed revenue.", "Late check-out, transfers and experiences were rarely offered."),
      f("Fixed budget.", "The group needed a clear price and a launch before the summer season."),
    ],
    solution:
      "For one agreed price, we built a WhatsApp concierge connected to the group's property management system. It answers guest questions instantly in their language, sends pre-arrival messages with check-in details, and offers late check-out, transfers and local experiences at the right moment. Anything it can't handle, or any complaint, goes straight to the front desk with the conversation attached. Each hotel's team edits answers and offers in a simple dashboard.",
    features: [
      f("Instant multilingual answers", "English, Spanish, Catalan, French and German."),
      f("Pre-arrival messages", "Check-in details and directions sent automatically."),
      f("Smart upsells", "Late check-out, transfers and experiences offered at the right time."),
      f("Front-desk handover", "Complaints and special requests passed to staff with context."),
      f("Hotel dashboard", "Edit answers, offers and opening hours without developers."),
    ],
    challenges: [
      f("Three hotels, one agent", "Each property has its own answers and offers, managed from one system."),
      f("Brand voice", "We tuned replies to sound like the hotels' own staff, not a bot."),
      f("Fixed scope", "Features outside the agreed list went onto a phase-two list, so the price never moved."),
    ],
    approach: [
      p("Discovery", "Week 1", "Agreed scope, price and top guest questions with each hotel."),
      p("Build", "Weeks 2–6", "Concierge, PMS integration, upsells and hotel dashboard."),
      p("Pilot", "Week 7", "Ran at one hotel with every conversation reviewed."),
      p("Launch", "Week 8", "Rolled out to all three hotels before the summer season."),
    ],
    results: {
      metrics: [
        { value: "81%", label: "questions answered instantly" },
        { value: "+19%", label: "upsell revenue per stay" },
        { value: "5", label: "languages" },
        { value: "On budget", label: "fixed price, delivered on time" },
      ],
      narrative:
        "Guests now get answers in seconds at any hour, and front desks focus on the guests in front of them. Timely offers turned WhatsApp into a revenue channel, and the group owns a system it can extend to new hotels.",
    },
    screenshots: [
      "WhatsApp conversation with a late check-out upsell",
      "Hotel dashboard for editing answers and offers",
      "Front-desk handover queue",
      "Upsell revenue report",
    ],
    ctaHeading: "Want a concierge that never sleeps, at a fixed price?",
    placeholder: true,
  },
];
