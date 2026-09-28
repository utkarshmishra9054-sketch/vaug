import { clientStudies } from "./clientStudies";
import type { ApproachPhase, CaseStudyDetail, Feature } from "./types";

/**
 * The VAUG case studies. Every client is named.
 * TODO(content): confirm written consent to name each client and show its logo.
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
    client: "Traxpay",
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
    logo: "/logos/traxpay.webp",
    sector: "fintech-insurance",
    service: "ai-as-a-service",
    clientType: "Enterprise",
    region: "Europe",
    domain: "AI agent (transaction reconciliation)",
    techStack: ["Python", "LangGraph", "OpenAI", "PostgreSQL", "Next.js", "AWS"],
    duration: "10 weeks",
    team: "4 people: PM, 2 AI engineers, designer",
    about:
      "Traxpay is a Frankfurt-based payments processor serving mid-sized e-commerce merchants across the DACH region. The company processes card, SEPA and wallet payments through several PSPs and settles to merchants daily. Its finance team of six handled reconciliation across three banks, four payment providers and an internal ledger, mostly in spreadsheets. As volumes grew past 400,000 transactions a month, the close process became the slowest part of the business.",
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
    website: { url: "https://www.traxpay.com", image: { src: "/sites/traxpay.webp", alt: "Traxpay website home page", width: 1440, height: 900 } },
    ctaHeading: "Want an agent that closes your books faster?",
  },

  // ------------------------------------------------------------------ 2
  {
    slug: "freelancer-insurance-platform-london",
    client: "Collective Benefits (now Onsi)",
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
    logo: "/logos/onsi.webp",
    sector: "fintech-insurance",
    service: "custom-development",
    clientType: "Startup",
    region: "UK",
    domain: "Web platform + broker dashboard",
    techStack: ["Next.js", "NestJS", "PostgreSQL", "Stripe", "Tailwind CSS", "AWS"],
    duration: "14 weeks",
    team: "5 people: PM, designer, 2 full-stack devs, QA",
    about:
      "Collective Benefits (now Onsi) is a seed-stage London insurtech offering professional indemnity and public liability cover to freelancers and small consultancies. Founded by two former Lloyd's brokers, the company works with two capacity providers and sold policies through a phone-and-email process backed by a spreadsheet. Demand from freelance designers, developers and consultants was growing, but every quote took a broker 20 minutes. They needed a product that could scale without hiring a larger broking team.",
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
    website: { url: "https://onsi.com", image: { src: "/sites/onsi.webp", alt: "Onsi (formerly Collective Benefits) website home page", width: 1440, height: 900 } },
    ctaHeading: "Need a platform your customers can buy from in a minute?",
  },

  // ------------------------------------------------------------------ proposal · C2H
  // Source: 2023 VAUG proposal. TODO(content): confirm written consent to name this client.
  {
    slug: "seo-cbd-ecommerce-canada",
    client: "CBD2Heal",
    city: "Canada",
    stage: "Online retailer",
    industry: "E-commerce & Retail",
    model: "SEO & Growth",
    icon: "trending-up",
    title: "From Position 62 to 6: SEO That Put a CBD Store on Google's First Page",
    summary:
      "A full SEO programme for a Canadian CBD e-commerce brand: technical fixes, site structure, content and clean link building that moved its average Google position from 62 to 6.",
    metrics: [
      { value: "62 → 6", label: "average Google position" },
      { value: "+90%", label: "traffic" },
      { value: "+95%", label: "conversions" },
    ],
    tint: "#15803d",
    screen: [
      { label: "Avg. position", value: "6" },
      { label: "Organic share", value: "79%" },
      { label: "Spam score", value: "<0.5" },
    ],
    sector: "ecommerce-retail",
    service: "build-with-us",
    // TODO(content): confirm client type.
    clientType: "Startup",
    region: "Canada",
    domain: "SEO (technical, on-page and off-page)",
    // TODO(content): confirm the full tool list for this engagement.
    techStack: ["Google Search Console", "Google Analytics"],
    // TODO(content): engagement length and team.
    duration: "",
    team: "",
    about:
      "CBD2Heal (C2H) sells CBD wellness products online in Canada, from oil tinctures and gel capsules to healing salves and bath bombs. Its secondary keywords already ranked on Google's first page, but its primary keywords sat below page three, and the site wasn't generating the traffic, and so the sales, the team was looking for.",
    problems: [
      f("Primary keywords out of sight.", "The product searches that matter most ranked below Google's third page."),
      f("Bad and broken links.", "The audit found harmful backlinks and broken internal links."),
      f("Crawl errors.", "Search engines hit errors crawling the site, so pages weren't fully indexed."),
      f("Traffic without sales.", "The site wasn't optimised to turn the visitors it did get into buyers."),
    ],
    solution:
      "We started, as on every SEO campaign, with a full website audit to show why the site wasn't producing traffic or sales. We fixed the technical issues, improved the sitemap and site flow, and reworked the link structure so search engines could crawl every product. We then ran keyword research, optimised every key page, built a content strategy and earned relevant backlinks while keeping the spam score below 0.5. Effort split across off-page link building (30.3%), content strategy (19.7%), advanced SEO (15.2%), speed optimisation (15.2%), tracking and analysis (12.1%) and data study (7.6%). Rankings are tracked continuously.",
    features: [
      f("Technical audit", "Bad links, broken links and crawl errors found and fixed."),
      f("Sitemap and site flow", "A cleaner structure so every product page can be crawled and reached."),
      f("Keyword research and on-page SEO", "Product pages optimised for the searches buyers actually use."),
      f("Content strategy", "Content planned around primary and secondary keywords."),
      f("Clean link building", "Relevant backlinks, with the spam score kept below 0.5."),
    ],
    challenges: [
      f("Starting below page three", "Primary keywords began below Google's third page, so every gain had to be earned."),
      f("Cleaning up before building", "Harmful links and crawl errors had to be fixed before new links could count."),
      f("Growth without risk", "Link building had to stay clean enough to keep the spam score under 0.5."),
    ],
    // TODO(content): add dates to each phase.
    approach: [
      p("Audit", "Phase 1", "Full website audit: search visibility, links, crawl errors and on-page gaps."),
      p("Fix the foundations", "Phase 2", "Technical fixes, sitemap, site flow and link structure."),
      p("Optimise", "Phase 3", "Keyword research and on-page optimisation of the key product pages."),
      p("Grow authority", "Phase 4", "Content strategy and relevant backlinks."),
      p("Track and adjust", "Ongoing", "Continuous rank tracking and analysis."),
    ],
    results: {
      metrics: [
        { value: "62 → 6", label: "average Google position" },
        { value: "+90%", label: "traffic" },
        { value: "+95%", label: "conversions" },
        { value: "+80%", label: "revenue" },
      ],
      narrative:
        "C2H's average Google position moved from 62 to 6, and 79% of its traffic now comes from organic search. It ranks #1 for \"pure CBD oil tincture in Canada\", \"pure CBD gel capsules 500mg\", \"CBD healing salve cream\" and \"CBD2HEAL broad spectrum\", and #2 for \"best CBD detox bath bomb\". Traffic is up 90%, conversions 95% and revenue 80%, and we continue to monitor rankings.",
    },
    testimonial: {
      quote: "We have seen a significant increase in our sales and brand awareness. Their SEO services are top-notch!",
      name: "Richard Sanchez",
      role: "CEO, CBD2Heal",
    },
    screenshots: [
      "The CBD2Heal storefront",
      "Primary keyword rankings: position 1 for four of five primary keywords",
      "Position tracking: average Google position climbing from 62 to 6",
      "Search Console queries: the primary product searches at positions 1 to 2",
      "Google Analytics traffic acquisition: Organic Search brings 79% of sessions",
      "The optimised product page for the pure CBD oil tincture",
    ],
    images: [
      { src: "/case-studies/seo-cbd-ecommerce-canada/storefront.webp", alt: "CBD2Heal storefront home page promoting 5000mg CBD oil tinctures", width: 863, height: 447 },
      { src: "/case-studies/seo-cbd-ecommerce-canada/keyword-rankings.webp", alt: "Keyword ranking table for five primary CBD keywords with their positions and URLs", width: 882, height: 201 },
    ],
    ctaHeading: "Want your store on Google's first page?",
  },

  // ------------------------------------------------------------------ 3
  {
    slug: "physio-booking-app-dubai",
    client: "PhysioFit Sports & Rehab",
    city: "Dubai, UAE",
    stage: "Seed",
    industry: "Healthcare",
    model: "Custom Development",
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
    logo: "/logos/physiofit.webp",
    sector: "healthcare",
    service: "custom-development",
    clientType: "Startup",
    region: "UAE",
    domain: "Patient booking app (web + iOS + Android)",
    techStack: ["Flutter", "Node.js", "MongoDB", "Firebase", "Stripe", "Google Maps API"],
    duration: "12 weeks",
    team: "4 people: PM, designer, Flutter dev, backend dev",
    about:
      "PhysioFit Sports & Rehab is a Dubai-based physiotherapy startup with two clinics and a growing home-visit service covering Dubai Marina, JLT and Downtown. Its therapists treat sports injuries, post-surgery rehab and back pain. Bookings came through WhatsApp and phone, managed by one receptionist and a shared calendar. With therapists travelling between clinics and homes, gaps and double bookings were common, and the founders wanted patients to book, pay and rebook on their own.",
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
    website: { url: "https://physiofitdxb.com", image: { src: "/sites/physiofit.webp", alt: "PhysioFit Sports & Rehab website home page", width: 1440, height: 900 } },
    ctaHeading: "Want a booking app delivered at a fixed price?",
  },

  // ------------------------------------------------------------------ 4
  {
    slug: "patient-whatsapp-voice-agent-manchester",
    client: "Summerhill Health",
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
    logo: "/logos/summerhill-health.webp",
    sector: "healthcare",
    service: "ai-as-a-service",
    clientType: "Enterprise",
    region: "UK",
    domain: "AI voice + WhatsApp agent (patient intake and reminders)",
    techStack: ["Python", "OpenAI", "Twilio", "WhatsApp Business API", "PostgreSQL", "Azure"],
    duration: "12 weeks",
    team: "5 people: PM, 2 AI engineers, integration engineer, QA",
    about:
      "Summerhill Health is a private diagnostic imaging network with nine centres across Greater Manchester and Cheshire, offering MRI, CT, ultrasound and X-ray to self-paying patients and through insurers and NHS referrals. Its central booking team of fourteen handled over 1,500 calls and messages a day. Long hold times meant patients abandoned calls, and many scans were delayed because pre-scan safety questionnaires weren't completed in time.",
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
    website: { url: "https://www.summerhillhealth.co.uk", image: { src: "/sites/summerhill-health.webp", alt: "Summerhill Health website home page", width: 1440, height: 900 } },
    ctaHeading: "Want an agent that answers every patient in seconds?",
  },

  // ------------------------------------------------------------------ proposal · CareerNaksha
  // Source: 2023 VAUG proposal. TODO(content): confirm written consent to name this client.
  {
    slug: "local-seo-career-counselling-india",
    client: "CareerNaksha",
    city: "India",
    stage: "Startup",
    industry: "Education",
    model: "SEO & Growth",
    icon: "search",
    title: "Local SEO That Took a Career-Counselling Startup From Map Rank 20 to 1.4",
    summary:
      "SEO and local SEO for a career-counselling startup expanding into new cities: indexing fixes, site structure, content and backlinks that took its average map rank from 20.2 to 1.4.",
    metrics: [
      { value: "20.2 → 1.4", label: "average map rank" },
      { value: "+300%", label: "organic traffic" },
      { value: "+72%", label: "session bookings, month on month" },
    ],
    tint: "#0f766e",
    screen: [
      { label: "Avg. map rank", value: "1.4" },
      { label: "High-ranking grid points", value: "25/25" },
      { label: "Organic traffic", value: "+300%" },
    ],
    logo: "/logos/careernaksha.webp",
    service: "build-with-us",
    clientType: "Startup",
    region: "India",
    domain: "SEO and local SEO",
    // TODO(content): confirm the full tool list for this engagement.
    techStack: ["Google Search Console", "Google Analytics"],
    // TODO(content): engagement length (the proposal says 6 months; the map-rank data covers 28 Jan to 3 May 2022) and team.
    duration: "",
    team: "",
    about:
      "CareerNaksha is a career-counselling startup offering psychometric career tests and counselling for school students, graduates and professionals, online and offline across India. As a newer brand, it was up against competitors that had been in the market longer with more resources, and it was rolling out into several new cities at once.",
    problems: [
      f("Older, better-funded competitors.", "Established brands dominated the searches CareerNaksha needed to win."),
      f("Not built for SEO.", "The site was originally developed without SEO best practices."),
      f("A site change that cost traffic.", "A change in early 2022 altered the URL structure and slowed organic traffic."),
      f("New cities, new competitors.", "Each new city page needed local traffic, and each city had different local competitors."),
    ],
    solution:
      "We began with an SEO audit, which traced the drop in traffic to indexing issues caused by the URL structure change. We improved site flow and link structure for crawlability and user experience, researched high-potential keywords for each city, and optimised pages for better click-through rates. A content strategy produced engaging content on and off the site, and high-quality backlinks raised domain authority. Effort split across competitor analysis (23.1%), analytics monitoring (20%), backlinks (18.5%), site speed (15.4%), technical fixes (12.3%) and user experience (10.8%), with A/B testing along the way.",
    features: [
      f("Indexing recovery", "Indexing issues from the URL change identified and fixed."),
      f("Site flow and link structure", "Rebuilt for crawlability and a better user experience."),
      f("City-by-city keyword targeting", "High-potential keywords for each new city page."),
      f("On-page optimisation", "Titles and pages tuned for higher click-through rates."),
      f("Content and backlinks", "Engaging content on and off the site, and high-quality backlinks."),
    ],
    challenges: [
      f("A hidden cause", "The traffic drop came from indexing issues after a URL change, not from content."),
      f("Many local markets", "Every new city had its own local competitors, so each city page needed its own plan."),
      f("A young domain", "Competing with established brands meant building domain authority from a lower base."),
    ],
    approach: [
      p("Audit", "Step 1", "SEO audit that identified indexing issues from the URL structure change."),
      p("Structure", "Step 2", "Improved site flow and link structure for crawlability and user experience."),
      p("Keywords", "Step 3", "Keyword research for high-potential targets."),
      p("On-page", "Step 4", "On-page optimisation for better click-through rates."),
      p("Content", "Step 5", "A content strategy for engaging content on and off the site."),
      p("Authority", "Step 6", "High-quality backlinks for higher domain authority."),
    ],
    results: {
      metrics: [
        { value: "20.2 → 1.4", label: "average map rank" },
        { value: "25/25", label: "high-ranking grid points (from 1)" },
        { value: "+300%", label: "organic traffic" },
        { value: "+72%", label: "session bookings, month on month" },
      ],
      narrative:
        "Between 28 January and 3 May 2022, CareerNaksha's average map rank moved from 20.2 to 1.4, and all 25 points on the local rank grid went from low to high ranking. Better site flow, link structure, keyword targeting and on-page work raised its visibility in search, while content and backlinks built domain authority. Organic traffic grew 300% and session bookings rose 72% month on month.",
    },
    testimonial: {
      quote: "Their comprehensive strategy and execution led to significant improvements in my website's rankings.",
      name: "Nimish Gopal",
      role: "CEO, CareerNaksha",
    },
    screenshots: [
      "Local rank grid on 28 January 2022: average map rank 20.2, 24 of 25 points ranking low",
      "Local rank grid on 3 May 2022: average map rank 1.4, all 25 points ranking high",
      "Rank grid maps side by side: 28 January vs 3 May 2022, every grid point now in the top 3",
      "Google local results for \"career counselling near me\" with CareerNaksha first in the map pack",
      "Search Console, January to May 2022: organic clicks growing across the city pages",
      "Business Profile performance: interactions and the searches that found CareerNaksha",
    ],
    images: [
      { src: "/case-studies/local-seo-career-counselling-india/map-rank-jan-2022.webp", alt: "Rank tracker on 28 January 2022 showing an average map rank of 20.2", width: 942, height: 232 },
      { src: "/case-studies/local-seo-career-counselling-india/map-rank-may-2022.webp", alt: "Rank tracker on 3 May 2022 showing an average map rank of 1.4", width: 942, height: 232 },
    ],
    website: { url: "https://careernaksha.com", image: { src: "/sites/careernaksha.webp", alt: "CareerNaksha website home page", width: 1440, height: 900 } },
    ctaHeading: "Expanding to new cities? Let's get you found in each one.",
  },

  // ------------------------------------------------------------------ 5
  {
    slug: "family-office-property-brand-dubai",
    client: "La Boutique Real Estate",
    city: "Dubai, UAE",
    stage: "Private venture",
    industry: "Real Estate",
    model: "Build With Us",
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
    logo: "/logos/la-boutique-real-estate.webp",
    sector: "real-estate",
    service: "build-with-us",
    clientType: "HNI",
    region: "UAE",
    domain: "Brand + website + Google listings + lead engine",
    techStack: ["Next.js", "Sanity CMS", "HubSpot", "Google Ads", "Meta Ads", "WhatsApp Business API", "Vercel"],
    duration: "16 weeks",
    team: "6 people: venture lead, brand designer, 2 devs, performance marketer, content writer",
    about:
      "La Boutique Real Estate was founded by a Dubai-based family office with interests in trading and hospitality that wanted to enter residential real estate. Rather than invest passively, the principals chose to build their own boutique advisory focused on off-plan and ready apartments for international buyers from Europe and India. They had capital, relationships with three developers and a clear market view, but no brand, no digital presence and no team to build one.",
    problems: [
      f("Starting from zero.", "No name, brand, website or listings existed."),
      f("Crowded market.", "Dubai has thousands of agencies, so the brand had to stand out quickly."),
      f("Speed to market.", "Developer launch windows meant the business had to be live within four months."),
      f("Lead quality.", "The principals wanted serious, qualified international buyers, not high volumes of casual enquiries."),
    ],
    solution:
      "Working end to end with the principals, we acted as the founding team's product, brand and growth function. We ran positioning workshops with the principals, then created the name, identity and tone of voice. We built a fast, bilingual website with project pages, a buyer's guide and a ROI calculator, and set up and optimised the Google Business Profile. The lead engine combined Google and Meta campaigns targeted at UK, German and Indian investors, WhatsApp follow-up, and a HubSpot pipeline that scores leads by budget, timeline and nationality. Principals get a weekly one-page report of leads, viewings and pipeline value.",
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
      "HubSpot deal pipeline with leads scored by budget, timeline and market",
      "Weekly principal report (one page)",
    ],
    website: { url: "https://laboutiquerealestate.com", image: { src: "/sites/la-boutique-real-estate.webp", alt: "La Boutique Real Estate website home page", width: 1440, height: 900 } },
    ctaHeading: "Have capital and an idea? Let's build the business together.",
  },

  // ------------------------------------------------------------------ 6
  {
    slug: "rental-prototype-rescue-lisbon",
    client: "Unlockit",
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
    logo: "/logos/unlockit.webp",
    sector: "real-estate",
    service: "launch-and-rescue",
    clientType: "Startup",
    region: "Europe",
    domain: "Web app (mid-term rental marketplace)",
    techStack: ["React", "Supabase", "PostgreSQL", "Stripe Connect", "Vercel", "Sentry"],
    duration: "6 weeks",
    team: "3 people: tech lead, full-stack dev, QA",
    about:
      "Unlockit is a pre-seed Lisbon startup connecting remote workers and relocating professionals with furnished apartments for one to six months. The solo, non-technical founder built the first version with Lovable in a few weekends and signed up 60 landlords. Early users liked the idea, but the app broke often, loaded slowly and had no real payment flow. With an accelerator demo day approaching, the product needed to be ready for paying tenants.",
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
      "Security audit tracked as issues: 31 found, 30 fixed before launch",
    ],
    website: { url: "https://unlockit.io", image: { src: "/sites/unlockit.webp", alt: "Unlockit website home page", width: 1440, height: 900 } },
    ctaHeading: "Built a prototype with AI? Let's make it ready for real users.",
  },

  // ------------------------------------------------------------------ proposal · Think3D
  // Source: 2023 VAUG proposal. TODO(content): confirm written consent to name this client.
  {
    slug: "seo-3d-printing-india",
    client: "Think3D",
    city: "India",
    stage: "Established",
    industry: "Additive Manufacturing",
    model: "SEO & Growth",
    icon: "cpu",
    title: "SEO and Campaigns That Bring a 3D Printing Firm 1,250+ Leads a Month",
    summary:
      "SEO, content and targeted campaigns for one of India's leading 3D printing firms, taking it to Google's first page and generating more than 1,250 leads a month.",
    metrics: [
      { value: "1,250+", label: "leads per month" },
      { value: "+843%", label: "landing-page interaction in 6 months" },
      { value: "Page 1", label: "for high-traffic keywords" },
    ],
    tint: "#1d4e89",
    screen: [
      { label: "Leads this month", value: "1,250+" },
      { label: "Landing-page interaction", value: "+843%" },
      { label: "\"best 3d printing in ahmedabad\"", value: "#1" },
    ],
    logo: "/logos/think3d.webp",
    service: "build-with-us",
    // TODO(content): confirm client type.
    clientType: "Enterprise",
    region: "India",
    domain: "SEO, content and lead-generation campaigns",
    // TODO(content): tools used on this engagement.
    techStack: [],
    duration: "Since July 2020",
    // TODO(content): team.
    team: "",
    about:
      "Think3D is one of India's leading 3D printing and additive manufacturing companies, with a team of experienced engineers, designers and technologists. It offers 3D printing, rapid prototyping and 3D modelling services.",
    problems: [
      f("Low rankings.", "The website wasn't performing well in search engine rankings."),
      f("Low visibility.", "Buyers searching for 3D printing services weren't finding Think3D."),
      f("Lost opportunities.", "Low visibility meant the company was losing out on potential business."),
    ],
    solution:
      "We implemented an SEO strategy that optimised the website and created engaging content, so Think3D ranked for the high-traffic searches its buyers use. Alongside it, we ran targeted campaigns to generate leads and improved the landing pages those visitors arrive on.",
    features: [
      f("Website optimisation", "Pages optimised to rank for high-traffic 3D printing searches."),
      f("Engaging content", "Content that answers what buyers search for."),
      f("Targeted campaigns", "Lead-generation campaigns aimed at the right buyers."),
      f("Landing pages", "Landing pages improved to turn visits into interactions and enquiries."),
    ],
    challenges: [
      f("A technical niche", "3D printing buyers search in specific terms, so keyword targeting had to be precise."),
      f("Visibility first", "Nothing else worked until the site ranked for the searches that matter."),
      f("From visits to leads", "Traffic had to become enquiries, which put the focus on landing pages."),
    ],
    approach: [
      p("Optimise and create content", "From July 2020", "Website optimisation and engaging content to lift rankings."),
      p("Campaigns", "Ongoing", "Targeted campaigns to generate leads every month."),
      p("Landing pages", "First 6 months", "Landing-page improvements that lifted customer interaction by 843%."),
    ],
    results: {
      metrics: [
        { value: "1,250+", label: "leads per month" },
        { value: "+843%", label: "landing-page interaction in 6 months" },
        { value: "Page 1", label: "for several high-traffic keywords" },
        { value: "#1", label: "for \"best 3d printing in ahmedabad\"" },
      ],
      narrative:
        "After we implemented the SEO strategy, Think3D started ranking on the first page of Google for several high-traffic keywords, which brought more organic traffic to its website. Targeted campaigns now generate more than 1,250 leads a month, and customer interaction on landing pages rose 843% in the first six months.",
    },
    screenshots: [
      "Google results for \"best 3d printing in ahmedabad\" with Think3D ranking first",
      "Google results for \"think 3d\" with site links to services, careers and contact pages",
      "Search Console queries: 3D printing searches ranking on Google's first page",
      "Google Analytics conversions: more than 1,250 leads in a month",
      "The Ahmedabad 3D printing landing page with the quote form",
    ],
    images: [
      { src: "/case-studies/seo-3d-printing-india/serp-local.webp", alt: "Google search results for best 3d printing in ahmedabad with Think3D as the first result", width: 800, height: 549 },
      { src: "/case-studies/seo-3d-printing-india/serp-brand.webp", alt: "Google search results for think 3d showing Think3D with site links", width: 792, height: 475 },
    ],
    website: { url: "https://www.think3d.in", image: { src: "/sites/think3d.webp", alt: "Think3D website home page", width: 1440, height: 900 } },
    ctaHeading: "Want more leads from search?",
  },

  // ------------------------------------------------------------------ 7
  {
    slug: "modest-fashion-marketplace-abu-dhabi",
    client: "Fantasy Abaya",
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
    logo: "/logos/fantasy-abaya.webp",
    sector: "ecommerce-retail",
    service: "launch-and-rescue",
    clientType: "Startup",
    region: "UAE",
    domain: "Multi-vendor marketplace (web + mobile)",
    techStack: ["Next.js", "Medusa", "PostgreSQL", "Redis", "Tabby", "Stripe", "Algolia", "AWS"],
    duration: "8 weeks",
    team: "4 people: tech lead, 2 full-stack devs, QA",
    about:
      "Fantasy Abaya is a seed-stage Abu Dhabi startup building an online home for independent modest-fashion designers from the GCC. Buyers can shop abayas, kaftans and occasion wear from dozens of small labels in one place. The founders had paid a previous agency for nine months of work, but the marketplace never launched: checkout failed, seller payouts didn't work and the codebase had no documentation. They had designers waiting and Ramadan, their biggest sales season, was ten weeks away.",
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
      "Storefront home in Arabic, with an English switch",
      "Checkout with Tabby and Apple Pay options",
      "Seller portal with orders and earnings",
      "Admin GMV dashboard",
    ],
    website: { url: "https://fantasyabaya.me", image: { src: "/sites/fantasy-abaya.webp", alt: "Fantasy Abaya website home page", width: 1440, height: 900 } },
    ctaHeading: "Is your store stuck? Let's get it launched.",
  },

  // ------------------------------------------------------------------ 8
  {
    slug: "headless-storefront-team-stockholm",
    client: "Iggy Agency",
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
    logo: "/logos/iggy.webp",
    sector: "ecommerce-retail",
    service: "dedicated-developers",
    clientType: "Agency",
    region: "Europe",
    domain: "Dedicated dev team (headless storefront rebuilds)",
    techStack: ["Shopify Hydrogen", "Remix", "React", "TypeScript", "Storyblok", "GraphQL", "Vercel"],
    duration: "9 months (ongoing)",
    team: "4 people: tech lead, 2 frontend devs, QA",
    about:
      "Iggy is a design-led Shopify agency in Stockholm working with Nordic fashion, beauty and lifestyle brands. Its team of 18 is strong in brand, UX and strategy, but it had only three in-house developers. As clients moved from standard Shopify themes to faster headless storefronts, the agency was turning away work because it couldn't hire experienced Hydrogen developers quickly enough in Stockholm.",
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
    website: { url: "https://iggy.agency", image: { src: "/sites/iggy.webp", alt: "Iggy website home page", width: 1440, height: 900 } },
    ctaHeading: "Need more developers under your brand? Let's talk.",
  },

  // ------------------------------------------------------------------ proposal · Vivin Design
  // Source: 2023 VAUG proposal. TODO(content): confirm written consent to name this client.
  // TODO(content): verify clicks vs impressions in Google Ads (a 44% CTR is unusually high), then remove `placeholder`.
  {
    slug: "google-ads-interior-design-noida",
    client: "Vivin Design",
    city: "Noida, India",
    stage: "Established",
    industry: "Interior Design",
    model: "Google Ads",
    icon: "building",
    title: "Google Ads That Keep an Interior Design Studio at the Top of Search",
    summary:
      "Search campaigns for an interior design studio in Noida: keyword research, ad copy, bid management and testing that held the top ad position and brought in 2,000 direct enquiries.",
    metrics: [
      { value: "2,000", label: "direct enquiries" },
      { value: "12,000", label: "website clicks" },
      { value: "Top", label: "ad position" },
    ],
    tint: "#9a3412",
    screen: [
      { label: "Paid impressions", value: "27,000" },
      { label: "Website clicks", value: "12,000" },
      { label: "Direct enquiries", value: "2,000" },
    ],
    logo: "/logos/vivin-design.webp",
    service: "build-with-us",
    // TODO(content): confirm client type.
    clientType: "Enterprise",
    region: "India",
    domain: "Google Ads (search)",
    techStack: ["Google Ads"],
    // TODO(content): campaign length and team.
    duration: "",
    team: "",
    about:
      "Vivin Design, a division of VC Design, provides interior design for homes, offices and commercial spaces. Its team of architects, interior designers, supervisors and craftsmen has delivered projects across India, from corporate offices to retail stores, hotels and high-end homes.",
    problems: [
      f("A crowded search page.", "Searches like \"best interior designers in Noida\" show several competing ads."),
      f("Cost control.", "Prime placements had to be won without overspending."),
      f("Clicks that become enquiries.", "Traffic only mattered if it turned into enquiries from potential clients."),
    ],
    solution:
      "We researched and targeted high-volume, relevant keywords, then wrote engaging, persuasive ad copy around Vivin Design's selling points. We managed bids strategically to secure prime placements while keeping costs efficient, and A/B tested ad variations, landing-page elements and targeting to keep improving the campaign.",
    features: [
      f("Keyword research", "High-volume, relevant keywords for interior design searches."),
      f("Ad copy", "Ads built around Vivin Design's selling points."),
      f("Bid management", "Prime placements at an efficient cost."),
      f("A/B testing", "Ads, landing-page elements and targeting tested and refined."),
    ],
    challenges: [
      f("Winning the top slot", "Competing advertisers bid on the same searches, so position had to be earned through bids and quality."),
      f("Efficiency", "Top placement had to come without runaway cost per click."),
      f("Enquiry quality", "Targeting had to bring potential clients, not just visitors."),
    ],
    approach: [
      p("Keyword research", "Step 1", "Identified and targeted high-volume, relevant keywords."),
      p("Ad copy", "Step 2", "Wrote ads that showcase Vivin Design's selling points."),
      p("Bidding", "Step 3", "Managed bids for prime placements at an efficient cost."),
      p("Testing", "Ongoing", "A/B tested ads, landing pages and targeting."),
    ],
    results: {
      metrics: [
        { value: "27,000", label: "paid impressions" },
        { value: "12,000", label: "website clicks" },
        { value: "2,000", label: "direct enquiries" },
        { value: "Top", label: "ad position" },
      ],
      narrative:
        "Through strategic bidding and optimisation, Vivin Design's ads consistently held the top position. The campaign generated 27,000 impressions and brought a substantial increase in website traffic, and that targeted traffic produced 2,000 direct enquiries from potential clients.",
    },
    screenshots: [
      "Vivin Design's ad in the top position for \"best interior designers in noida\"",
      "The VC Design website that campaign traffic lands on",
      "Google Ads campaigns: 27,000 impressions, 12,000 clicks and 2,000 enquiries",
      "Search keywords by match type, with Quality Score and top-of-page rate",
      "Responsive search ads and their ad strength",
      "The enquiry sheet the sales team works from",
    ],
    images: [
      { src: "/case-studies/google-ads-interior-design-noida/search-ad.webp", alt: "Google search for best interior designers in noida with the Vivin Design ad first", width: 648, height: 469 },
      { src: "/case-studies/google-ads-interior-design-noida/website.webp", alt: "VC Design website home page with the headline Best Ideas and Solutions for Your Home Interiors", width: 864, height: 540 },
    ],
    website: { url: "https://www.vivindesign.com", image: { src: "/sites/vivin-design.webp", alt: "Vivin Design website home page", width: 1440, height: 900 } },
    ctaHeading: "Want your ads at the top of search?",
    placeholder: true,
  },

  // ------------------------------------------------------------------ 9
  {
    slug: "route-planning-pod-rotterdam",
    client: "EGS Customs & Logistic",
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
    logo: "/logos/egs-rotterdam.webp",
    sector: "logistics",
    service: "dedicated-developers",
    clientType: "Enterprise",
    region: "Europe",
    domain: "Engineering pod (route planning + shipment tracking)",
    techStack: ["Python", "Google OR-Tools", "Go", "Kafka", "PostgreSQL + PostGIS", "React", "Kubernetes"],
    duration: "11 months (ongoing)",
    team: "5 people: tech lead, 2 backend devs, frontend dev, data engineer",
    about:
      "EGS Customs & Logistic is a Rotterdam-based freight forwarder moving containers and general cargo by road between the Port of Rotterdam, Antwerp and inland hubs across the Netherlands, Belgium and Germany. It runs a mixed fleet of about 250 own and subcontracted trucks. Its small internal IT team maintained the core transport management system but had no capacity for new products. Planners built routes by hand, and customers called constantly for shipment updates.",
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
    website: { url: "https://egsrotterdam.com", image: { src: "/sites/egs-rotterdam.webp", alt: "EGS Customs & Logistic website home page", width: 1440, height: 900 } },
    ctaHeading: "Need an engineering team that works like your own?",
  },

  // ------------------------------------------------------------------ 10
  {
    slug: "courier-driver-app-birmingham",
    client: "City Quick Logistics",
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
    logo: "/logos/city-quick.webp",
    sector: "logistics",
    service: "custom-development",
    clientType: "Enterprise",
    region: "UK",
    domain: "Mobile driver app + admin panel",
    techStack: ["React Native", "Node.js", "PostgreSQL", "Redis", "Socket.IO", "Google Maps API", "AWS"],
    duration: "16 weeks",
    team: "5 people: PM, designer, 2 mobile/full-stack devs, QA",
    about:
      "City Quick Logistics is a Birmingham-based same-day courier network delivering parcels, medical samples and B2B documents across the Midlands. It works with around 300 self-employed drivers on vans, cars and bikes. Jobs were dispatched by phone and WhatsApp, and proof of delivery was captured on paper. As large retail and healthcare clients demanded real-time updates and digital proof, the manual process could no longer keep up.",
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
      "Client SMS update and tracking page with live ETA",
      "Daily operations dashboard",
    ],
    website: { url: "https://cityquick.co.uk", image: { src: "/sites/city-quick.webp", alt: "City Quick Logistics website home page", width: 1440, height: 900 } },
    ctaHeading: "Still dispatching by phone? Let's build your app.",
  },

  // ------------------------------------------------------------------ proposal · Phoenix Institute
  // Source: 2023 VAUG proposal. TODO(content): confirm written consent to name this client.
  // TODO(content): verify clicks vs impressions in Google Ads (a 50% CTR is unusually high), then remove `placeholder`.
  {
    slug: "google-ads-scholarship-test-gujarat",
    client: "Phoenix Institute",
    city: "Vadodara, India",
    stage: "Established",
    industry: "Education",
    model: "Google Ads",
    icon: "zap",
    title: "A Google Ads Campaign That Drove 5,000+ Enquiries for a Scholarship Test",
    summary:
      "Search campaigns and dedicated landing pages for PETEX, Phoenix Institute's scholarship and admission test in Gujarat, generating more than 5,000 enquiries.",
    metrics: [
      { value: "5,000+", label: "enquiries" },
      { value: "20,000+", label: "website clicks" },
      { value: "40,000+", label: "paid impressions" },
    ],
    tint: "#be123c",
    screen: [
      { label: "Paid impressions", value: "40,000+" },
      { label: "Website clicks", value: "20,000+" },
      { label: "Enquiries", value: "5,000+" },
    ],
    logo: "/logos/phoenix-institute.webp",
    service: "build-with-us",
    // TODO(content): confirm client type.
    clientType: "Enterprise",
    region: "India",
    domain: "Google Ads (search) and landing pages",
    techStack: ["Google Ads"],
    // TODO(content): campaign length and team.
    duration: "",
    team: "",
    about:
      "Phoenix Institute is a coaching institute in Vadodara. PETEX, its eligibility and talent search exam, is billed as Gujarat's biggest scholarship test, with scholarships of up to 90%. The institute needed registrations for the test, which took place on 11 December 2022.",
    problems: [
      f("A fixed test date.", "Registrations had to come in before the exam day."),
      f("The right students.", "Ads needed to reach students and parents in the right locations."),
      f("Capturing interest.", "Every click had to have somewhere to register."),
    ],
    solution:
      "We identified relevant keywords with high search volume and low competition around admission tests, and wrote ads that emphasised the institute's comprehensive study materials and experienced faculty. We set up targeted campaigns, ad groups and ad extensions focused on specific locations, and sent traffic to dedicated landing pages with registration forms. Throughout the campaign we refined keywords and ad copy to lift click-through rates and conversions.",
    features: [
      f("Keyword targeting", "High-volume, low-competition keywords around admission tests."),
      f("Ad copy", "Ads highlighting study materials and experienced faculty."),
      f("Geo-targeted campaigns", "Campaigns, ad groups and ad extensions focused on specific locations."),
      f("Dedicated landing pages", "Registration pages and forms that capture every enquiry."),
      f("Continuous optimisation", "Keywords and ad copy refined to lift CTR and conversions."),
    ],
    challenges: [
      f("A deadline", "The campaign had to peak before the 11 December 2022 exam."),
      f("Local focus", "Spend had to stay on the locations the institute serves."),
      f("Conversion", "Clicks had to become registrations, not just visits."),
    ],
    approach: [
      p("Keywords", "Step 1", "Found high-volume, low-competition keywords related to admission tests."),
      p("Messaging", "Step 2", "Built ads around study materials and experienced faculty."),
      p("Campaign setup", "Step 3", "Set up geo-targeted campaigns, ad groups and ad extensions."),
      p("Optimise", "Ongoing", "Refined keywords and ad copy to improve CTR and conversions."),
    ],
    results: {
      metrics: [
        { value: "40,000+", label: "paid impressions" },
        { value: "20,000+", label: "website clicks" },
        { value: "5,000+", label: "enquiries" },
        { value: "11 Dec 2022", label: "PETEX exam day" },
      ],
      narrative:
        "The campaign generated more than 40,000 impressions, giving PETEX wide visibility, and brought a substantial increase in website traffic. More than 5,000 enquiries were captured through dedicated landing pages and contact forms, a high conversion rate that shows the ad copy and targeting worked.",
    },
    screenshots: [
      "Phoenix Institute's ad in the top position on Google",
      "The PETEX scholarship test landing page with registration form",
      "Google Ads campaigns by city in the run-up to the 11 December exam",
      "Search keywords around scholarship tests and coaching, with Quality Score",
      "Enquiries by targeted location across Gujarat",
      "PETEX search ads on mobile, with location and sitelink assets",
    ],
    images: [
      { src: "/case-studies/google-ads-scholarship-test-gujarat/search-ad.webp", alt: "Google search results with the Phoenix Institute Vadodara ad at the top", width: 810, height: 581 },
      { src: "/case-studies/google-ads-scholarship-test-gujarat/landing-page.webp", alt: "PETEX landing page announcing Gujarat's biggest scholarship test on 11 December 2022 with a registration form", width: 864, height: 433 },
    ],
    website: { url: "https://phoenixinstitute.co", image: { src: "/sites/phoenix-institute.webp", alt: "Phoenix Institute website home page", width: 1440, height: 900 } },
    ctaHeading: "Need enquiries before a deadline?",
    placeholder: true,
  },

  // ------------------------------------------------------------------ 11
  // Draft: the source document was cut off before #11. Replace with the real write-up.
  {
    slug: "boutique-desert-retreat-ras-al-khaimah",
    client: "RAK Glamping",
    city: "Ras Al Khaimah, UAE",
    stage: "Private venture",
    industry: "Hospitality & Travel",
    model: "Build With Us",
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
    logo: "/logos/rak-glamping.webp",
    sector: "hospitality-travel",
    service: "build-with-us",
    clientType: "HNI",
    region: "UAE",
    domain: "Brand + direct-booking website + listings + guest messaging",
    techStack: ["Next.js", "Sanity CMS", "Cloudbeds", "Stripe", "WhatsApp Business API", "Google Ads", "Vercel"],
    duration: "14 weeks",
    team: "6 people: venture lead, brand designer, 2 devs, performance marketer, content writer",
    about:
      "The owner of RAK Glamping, a UAE-based private investor, built 24 villas at the edge of the Ras Al Khaimah desert, an hour from Dubai. The property was nearly finished, but there was no name, no brand, no booking system and no team to run marketing. The investor wanted a retreat that could sell directly to guests from the UAE, Europe and the UK rather than depend on travel agencies and booking sites.",
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
      "Weekly owner report, as it arrives by email",
    ],
    website: { url: "https://www.rakglamping.com", image: { src: "/sites/rak-glamping.webp", alt: "RAK Glamping website home page", width: 1440, height: 900 } },
    ctaHeading: "Building a hospitality venture? Let's launch it together.",
    placeholder: true,
  },

  // ------------------------------------------------------------------ 12
  // Draft: the source document was cut off before #12. Replace with the real write-up.
  {
    slug: "whatsapp-concierge-barcelona",
    client: "EnjoyBCN Group",
    city: "Barcelona, Spain",
    stage: "Seed",
    industry: "Hospitality & Travel",
    model: "Custom Development",
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
    logo: "/logos/enjoybcn.webp",
    sector: "hospitality-travel",
    service: "custom-development",
    clientType: "Startup",
    region: "Europe",
    domain: "WhatsApp concierge (guest messaging + upsells)",
    techStack: ["Node.js", "OpenAI", "WhatsApp Business API", "PostgreSQL", "Mews API", "Vercel"],
    duration: "8 weeks",
    team: "3 people: PM, AI engineer, full-stack dev",
    about:
      "EnjoyBCN Group is a young Barcelona hotel group running three boutique properties in the Gothic Quarter, Eixample and Gràcia. Guests messaged the front desk on WhatsApp at all hours about check-in times, luggage, restaurants and transfers, in several languages. The small desk teams couldn't keep up at busy times, and upsells like late check-out or airport transfers were rarely offered.",
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
      "WhatsApp conversations: a late check-out upsell, and a transfer booked in Spanish",
      "Hotel dashboard for editing answers and offers",
      "Front-desk handover queue",
      "Upsell revenue report",
    ],
    website: { url: "https://hotellapau.com", image: { src: "/sites/enjoybcn.webp", alt: "Hotel La Pau (EnjoyBCN Group) website home page", width: 1440, height: 900 } },
    ctaHeading: "Want a concierge that never sleeps, at a fixed price?",
    placeholder: true,
  },

  // Growth-marketing studies for the rest of the home page client wall.
  ...clientStudies,
];
