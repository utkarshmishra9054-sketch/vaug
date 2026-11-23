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
  // PhysioFit Sports & Rehab Clinic, Business Bay, Dubai (physiofitdxb.com). Clinic facts
  // (one boutique clinic in Bay View Tower, owner-physio Shereen Hassam, physio + chiropractic +
  // sports massage + a visiting orthopaedic surgeon, hours, website form + WhatsApp booking) are
  // from the clinic's site, read 22 Nov 2026. Headline results are as confirmed by Utkarsh.
  // TODO(content): confirm the in-app numbers on `screen` and in the drawn screens.
  {
    slug: "physio-booking-app-dubai",
    client: "PhysioFit Sports & Rehab",
    city: "Business Bay, Dubai, UAE",
    stage: "Boutique clinic",
    industry: "Healthcare",
    model: "Custom Development",
    icon: "heart",
    title: "A Booking App That Filled a Physio Clinic's Calendar in 90 Days",
    summary:
      "A bilingual booking app for a boutique physiotherapy and chiropractic clinic in Business Bay, delivered at a fixed price, with practitioner scheduling, deposits, reminders and exercise plans.",
    metrics: [
      { value: "84%", label: "practitioner utilisation (up from 51%)" },
      { value: "68%", label: "bookings made in-app" },
      { value: "-45%", label: "no-shows" },
    ],
    tint: "#074f57",
    // TODO(content): illustrative, sized for one clinic with four practitioners; matches the drawn screens.
    screen: [
      { label: "Sessions this week", value: "148" },
      { label: "Booked in-app", value: "101" },
      { label: "Slots open", value: "28" },
    ],
    logo: "/logos/physiofit.webp",
    sector: "healthcare",
    service: "custom-development",
    clientType: "Startup",
    region: "UAE",
    domain: "Patient booking app (iOS + Android) and clinic admin",
    techStack: ["Flutter", "Node.js", "MongoDB", "Firebase", "Stripe", "WhatsApp Business API"],
    duration: "12 weeks",
    team: "4 people: PM, designer, Flutter dev, backend dev",
    about:
      "PhysioFit Sports & Rehab is a boutique, owner-managed clinic in Bay View Tower, Business Bay, overlooking the Dubai Canal. It is led by physiotherapist Shereen Hassam, in Dubai since 2008, with a team that covers physiotherapy and dry needling, chiropractic, sports massage and a visiting orthopaedic surgeon. Runners, padel and tennis players and people with long-standing back, neck and post-surgery problems come to it, many by word of mouth. Bookings arrived by phone, WhatsApp and the website's request form, and one front-desk coordinator matched them to a shared calendar by hand.",
    problems: [
      f("Manual booking.", "Every appointment was arranged over WhatsApp, phone or a website form that only sent a request, taking hours of front-desk time each day."),
      f("Empty slots.", "Practitioner calendars had gaps that were never filled because patients couldn't see availability."),
      f("No-shows.", "Around one in five sessions was missed, with no reminder system or deposit."),
      f("Fixed budget.", "As an owner-run clinic, PhysioFit needed a clear price and a fixed delivery date."),
    ],
    solution:
      "We scoped and delivered a fixed-price booking product: a patient app for iOS and Android and an admin panel for the clinic team. Patients pick a treatment (physiotherapy, sports rehab, chiropractic or sports massage), a practitioner and a time, and pay a deposit by card or Apple Pay. Requests from the website form and WhatsApp land in the same front-desk inbox with suggested slots, so they are confirmed in one tap instead of a chain of messages. Reminders go out 24 hours and 2 hours before each session, and freed slots are offered to a waitlist. Practitioners see their day on a simple mobile view and add session notes and exercise plans that patients open in the app, where they also track each milestone of their recovery. The app runs in English and Arabic.",
    features: [
      f("Treatment and practitioner booking", "Live availability across physiotherapy, chiropractic and massage, by practitioner and room."),
      f("Deposits and packages", "Card and Apple Pay for single sessions and discounted session bundles."),
      f("Front-desk inbox", "Website form, WhatsApp and app requests in one queue with suggested slots."),
      f("Automated reminders", "Push and SMS reminders, plus a waitlist that refills cancelled slots."),
      f("Practitioner view", "Daily schedule, patient history and session notes on mobile."),
      f("Exercise plans and milestones", "Home programmes shared after each session, with progress patients can see."),
    ],
    challenges: [
      f("Rooms and practitioners", "Each treatment needs the right practitioner and room (treatment beds, the chiropractic table, the rehab gym), so the scheduler books both and never double-books either."),
      f("Scope creep on a fixed price", "We agreed a clear feature list upfront and kept a \"phase two\" list for everything else, delivering on the agreed date."),
      f("Patient data privacy", "We stored health notes with encryption and role-based access in line with UAE health-data rules."),
    ],
    approach: [
      p("Discovery", "Week 1", "Fixed the scope, price and timeline with the clinic owner."),
      p("Design", "Weeks 2–3", "Designed bilingual patient and practitioner screens and tested them with clinic staff."),
      p("Build", "Weeks 4–10", "Built the apps, admin panel, payments and reminders in two-week sprints with demos."),
      p("Launch", "Weeks 11–12", "App store release, staff training and migration of existing patients."),
    ],
    results: {
      metrics: [
        { value: "84%", label: "practitioner utilisation" },
        { value: "68%", label: "of bookings made in-app" },
        { value: "-45%", label: "no-shows" },
        { value: "On time", label: "and on budget" },
      ],
      narrative:
        "Within 90 days, most patients were booking themselves and practitioner calendars were close to full. Deposits and reminders nearly halved no-shows. The front desk moved from chasing messages to looking after patients, and as the team grew, new practitioners were added to the same app without new development.",
    },
    screenshots: [
      "PhysioFit's website booking form: requests now land in the app's front-desk inbox",
      "The clinic's website on mobile: home page and booking form",
      "Patient app: choosing a treatment and practitioner, then paying the deposit",
      "Front-desk inbox: website form, WhatsApp and app requests confirmed in one tap",
      "Clinic calendar: every practitioner's day and utilisation",
      "Practitioner app: the day's list and a session note with dry-needling points",
      "Patient app: home exercise plan and recovery milestones, in English and Arabic",
      "Owner dashboard on a laptop, with the next-day summary on the owner's phone",
    ],
    images: [
      { src: "/case-studies/physio-booking-app-dubai/booking-form.webp", alt: "PhysioFit website Book an appointment form with name, email, contact number, treatment and date", width: 1440, height: 900 },
      { src: "/case-studies/physio-booking-app-dubai/mobile-site.webp", alt: "PhysioFit website on two phones: the home page and the booking form", width: 1440, height: 900 },
    ],
    website: { url: "https://physiofitdxb.com", image: { src: "/sites/physiofit.webp", alt: "PhysioFit Sports & Rehab website home page: Expert Physiotherapy in Dubai", width: 1440, height: 900 } },
    ctaHeading: "Want a booking app delivered at a fixed price?",
  },

  // ------------------------------------------------------------------ 4
  // Summerhill Health: a private GP clinic in Hale, Altrincham (summerhillhealth.co.uk).
  // Business facts (services, fees, hours, Semble booking, location) are from the clinic's
  // own website, read 22 Nov 2026. Headline results (78%, <5s, -38%, 96%) are confirmed by Utkarsh.
  // TODO(content): confirm scope, timeline, team and the volume figures in `screen` and the drawn screens (see CONTENT_GAPS.md).
  {
    slug: "patient-whatsapp-voice-agent-manchester",
    client: "Summerhill Health",
    city: "Hale, Altrincham, UK",
    stage: "Private GP clinic",
    industry: "Healthcare",
    model: "AI as a Service",
    icon: "message-square",
    title: "A WhatsApp and Voice Agent That Answers Every Patient, Day or Night",
    summary:
      "An AI agent for a private GP clinic near Manchester that answers calls and WhatsApp messages, books same-day and new-patient appointments, sends pre-consultation questionnaires and reminders, and passes anything clinical to the doctors.",
    // Headline figures confirmed by Utkarsh, 22 Nov 2026.
    metrics: [
      { value: "78%", label: "patient enquiries resolved without staff" },
      { value: "<5s", label: "answer time, evenings and weekends included" },
      { value: "-38%", label: "missed appointments" },
    ],
    tint: "#05868e",
    // TODO(content): illustrative, matches the drawn console screen.
    screen: [
      { label: "Conversations today", value: "58" },
      { label: "Appointments booked by agent", value: "14" },
      { label: "Handed to the team", value: "6" },
    ],
    logo: "/logos/summerhill-health.webp",
    sector: "healthcare",
    service: "ai-as-a-service",
    // TODO(content): confirm client type (a single private clinic, closest to "Startup" among the four).
    clientType: "Startup",
    region: "UK",
    domain: "AI voice + WhatsApp agent (patient booking, intake and reminders)",
    techStack: ["Python", "OpenAI", "Twilio Voice", "WhatsApp Business API", "Semble API", "PostgreSQL", "Azure UK South"],
    // TODO(content): illustrative engagement length and team.
    duration: "10 weeks",
    team: "4 people: PM, AI engineer, integration engineer, QA",
    about:
      "Summerhill Health is a private GP clinic on Broomfield Lane in Hale, near Altrincham, led by Dr Natalie Summerhill, a GP and menopause specialist. It offers same-day GP appointments, women's health (menopause and HRT, contraception, endometriosis and womb-cancer testing), men's health, family and children's care, home visits, blood tests and health screening to patients from across Greater Manchester and Cheshire. Patients book online, by phone or by email, and new patients who want longer-term care start with a 60-minute initial consultation. A small front-desk team answered every call and message while also looking after patients in the clinic.",
    problems: [
      f("One desk, every channel.", "The same small team answered the phone, replied to emails and enquiry forms, and checked patients in, so calls rang out at the busiest times."),
      f("Closed evenings and weekends.", "The clinic is open 8 am to 6 pm on weekdays. Patients who got in touch after hours waited until the next working day for a reply."),
      f("The same questions all day.", "Which appointment to book, what it costs, how to prepare for a blood test, where to park and whether a home visit reaches their postcode."),
      f("Late paperwork and empty slots.", "New-patient histories often arrived on the day, and late cancellations left longer consultations unfilled."),
    ],
    solution:
      "We built an AI agent that answers the clinic's phone line and WhatsApp in seconds, day or night. It knows the clinic's appointment rules, so it books the right slot against the live Semble diary: a same-day 20-minute GP appointment, a 60-minute initial consultation for new patients, a blood test or a video call. It answers questions about fees, blood-test and screening preparation, directions and parking from the clinic's own published information. After an initial consultation is booked, it sends a pre-consultation questionnaire on WhatsApp, including a menopause symptom score where relevant, writes the answers into the patient's record and flags anything clinical for the doctor. Reminders go out two days and on the morning of each appointment with one-tap confirm or reschedule, home-visit requests are checked against the postcodes the clinic covers, and patients are invited to leave a review and join the newsletter after their visit. The agent never gives medical advice: clinical questions, complaints and anything sensitive go straight to the team with the conversation attached.",
    features: [
      f("Voice agent", "Answers the clinic number instantly, with no menus, including evenings and weekends."),
      f("WhatsApp agent", "Booking, rescheduling and questions in the patient's own chat."),
      f("Live Semble booking", "Same-day GP slots, initial consultations, blood tests and video calls booked against the clinic's live diary."),
      f("Pre-consultation questionnaires", "Medical history and menopause symptom scores collected before the appointment, with answers flagged for the doctor."),
      f("Reminders and rescheduling", "Two-day and same-morning reminders with one-tap changes, inside the clinic's free-cancellation window."),
      f("Team handover", "Clinical questions, complaints and home-visit requests outside the area passed to staff with the full conversation."),
    ],
    challenges: [
      f("Clinical safety", "The agent never gives medical advice. A clinical-topic detector hands over at once, and red-flag symptoms get an immediate 999 or NHS 111 message and an alert to the doctor."),
      f("The right appointment", "We encoded the clinic's booking rules (initial consultations for new patients' longer-term care, direct booking for blood tests and contraception) so the agent books the right slot and quotes the right fee."),
      f("Patient data", "Everything runs in UK-region Azure with GDPR-aligned retention and consent capture, and questionnaire answers live in the patient's Semble record, not in chat history."),
    ],
    approach: [
      p("Discovery", "Weeks 1–2", "Reviewed three months of anonymised enquiries with the front desk and listed the 20 most common requests."),
      p("Design", "Week 3", "Wrote conversation flows, booking rules and safety guardrails with Dr Summerhill."),
      p("Build", "Weeks 4–7", "Built the voice and WhatsApp agents, the Semble integration, questionnaires, reminders and the clinic console."),
      p("Pilot", "Weeks 8–9", "Ran evenings and weekends first, with the team reviewing every conversation each morning."),
      p("Live and tuning", "Week 10 onward", "Switched on daytime overflow and tuned answers weekly from handover reasons."),
    ],
    // Results confirmed by Utkarsh, 22 Nov 2026 (96% is from the original study).
    results: {
      metrics: [
        { value: "78%", label: "of patient enquiries resolved without staff" },
        { value: "<5s", label: "answer time, day or night" },
        { value: "-38%", label: "missed appointments" },
        { value: "96%", label: "of questionnaires back before the appointment" },
      ],
      narrative:
        "Patients now get an answer in seconds, including evenings and weekends, and most never wait for a call back. The front desk spends its time with the patients in the clinic and the conversations that need a person. Questionnaires arrive before the consultation, so the doctor starts each new-patient appointment with the history in hand, and reminders with one-tap rescheduling keep the longer appointments filled.",
    },
    screenshots: [
      "Summerhill Health's fees page and Semble booking widget: the prices and slots the agent works from",
      "The clinic's website on mobile: home page and appointments",
      "WhatsApp: a same-day GP appointment booked, then an initial consultation with its questionnaire",
      "Clinic console: live calls and chats, with the handover queue",
      "Diary: Dr Summerhill and the team's day, with agent bookings and home visits",
      "Questionnaire review: a menopause symptom score with flagged answers",
      "Analytics on the practice laptop, with the morning summary on the practice manager's phone",
      "Reminders and no-show tracker, with the waitlist that refills freed slots",
    ],
    images: [
      { src: "/case-studies/patient-whatsapp-voice-agent-manchester/fees-and-booking.webp", alt: "Summerhill Health private GP fees page with the consultation fee table and the online booking widget", width: 1440, height: 900 },
      { src: "/case-studies/patient-whatsapp-voice-agent-manchester/mobile-site.webp", alt: "Summerhill Health website on two phones: the home page and the private GP appointments page", width: 1440, height: 900 },
    ],
    website: { url: "https://www.summerhillhealth.co.uk", image: { src: "/sites/summerhill-health.webp", alt: "Summerhill Health website home page: Your Private GP in Hale & Altrincham", width: 1440, height: 900 } },
    ctaHeading: "Want an agent that answers every patient in seconds?",
  },

  // ------------------------------------------------------------------ Startups · batch A
  // Oreejoy MedTech: IIT Gandhinagar-incubated medtech startup (oreejoy.in), one of the
  // startups VAUG built for (per Utkarsh, via the leader, 22 Nov 2026). Business facts are from
  // oreejoy.in, read 22 Nov 2026. Results are qualitative or product facts: no invented metrics.
  // TODO(content): confirm scope (website + clinician portal + companion app), stack, timeline,
  // team, and consent to show the logo (CONTENT_GAPS.md). In-app numbers are illustrative.
  {
    slug: "gait-analysis-portal-gandhinagar",
    client: "Oreejoy MedTech",
    city: "Gandhinagar, Gujarat, India",
    stage: "IIT Gandhinagar-incubated startup",
    industry: "Healthcare · Medical devices",
    model: "Build With Us",
    icon: "heart",
    title: "A Website and Clinician Portal That Turn Smart-Insole Data into Gait Reports",
    summary:
      "A research-grade website and a clinician portal for Instrole, Oreejoy's smart-insole gait system: foot-pressure maps, gait indices, freezing-of-gait events and fall-risk trends for every patient, fed by a companion app.",
    metrics: [
      { value: "4", label: "conditions covered in one portal" },
      { value: "2 insoles", label: "one gait report per walk" },
      { value: "9", label: "peer-reviewed papers on the site" },
    ],
    tint: "#1d4ed8",
    // TODO(content): illustrative, sized for an early clinical pilot; matches the drawn screens.
    screen: [
      { label: "Patients monitored", value: "24" },
      { label: "Walks analysed this week", value: "61" },
      { label: "Freezing episodes flagged", value: "9" },
    ],
    logo: "/logos/oreejoy.webp",
    sector: "healthcare",
    service: "build-with-us",
    clientType: "Startup",
    region: "India",
    domain: "Research website, clinician gait portal and companion app",
    techStack: ["Next.js", "Python (FastAPI)", "PostgreSQL + TimescaleDB", "Flutter", "Bluetooth LE", "AWS"],
    duration: "14 weeks",
    team: "5 people: PM, designer, 2 full-stack devs, data engineer",
    about:
      "Oreejoy MedTech is a medical-technology startup incubated at IIT Gandhinagar and based in its Research Park at Palaj, Gujarat. Its product, Instrole, is an instrumented smart insole: ultra-thin, medically calibrated sensors in everyday footwear map foot pressure, onboard processing extracts gait markers, and cloud analytics track balance and movement over time. It is built for foot drop, freezing of gait in Parkinson's disease, fall risk in older adults and objective gait indexing validated against laboratory force plates. The company is led by Prof. Uttama Lahiri of IIT Gandhinagar with co-founder Dr. Neelesh Sharma, rests on a body of peer-reviewed research, and was named a national winner of Boeing BUILD 5.0.",
    problems: [
      f("Research, not yet a product.", "Years of published gait research had to read as a credible medical product to clinicians, hospitals and partners."),
      f("Raw sensor streams.", "Each walk produced high-frequency pressure data from two insoles that clinicians couldn't read without engineering help."),
      f("Evidence in pieces.", "Papers, awards, demonstrations and the founders' profiles lived in different places, with no single link to share."),
      f("Clinical trust.", "Any portal had to show how each metric is measured and keep patient data private and access-controlled."),
    ],
    solution:
      "We built two things. The first is oreejoy.in, a fast, research-grade website that explains Instrole from foot pressure to clinical insight: the technology, the four conditions it is built for, lab highlights, publications, the founders and a brochure download, all editable by the Oreejoy team. The second is a clinician portal for the Instrole system. A companion app pairs both insoles and uploads each walk, and the portal turns it into a gait report: foot-pressure maps for both feet, cadence, stride time, step-length asymmetry and stride variability, with freezing-of-gait episodes and the cues delivered marked on a timeline. A patient view tracks the same indices across weeks, so a clinician can see balance improving or degrading before a fall. Access is by role, and every report is traceable to the walk it came from.",
    features: [
      f("Research-grade website", "Technology, applications, lab highlights, publications and founders, edited by the Oreejoy team."),
      f("Insole sync", "A companion app pairs both insoles over Bluetooth and uploads each recorded walk."),
      f("Gait report", "Foot-pressure maps, cadence, stride time, asymmetry and variability for every session."),
      f("Freezing-of-gait timeline", "Hesitation episodes and the cues delivered, second by second."),
      f("Fall-risk trends", "Balance and gait indices across weeks, flagged when they start to degrade."),
      f("Clinician workspace", "Patients by condition, session notes and PDF reports to share with the care team."),
    ],
    challenges: [
      f("From signal to meaning", "We worked with the founders to map each sensor-derived marker to a plain clinical label and a reference range, so reports read like clinical notes, not engineering logs."),
      f("High-frequency data", "Walks are stored as time series with pre-computed summaries, so a report opens instantly however long the session."),
      f("Credibility with two audiences", "The website had to satisfy clinicians and research reviewers alike, so each application links to the published work behind it."),
    ],
    approach: [
      p("Discovery", "Weeks 1–2", "Sessions with the founders on the research, the target conditions and what a clinician needs from a report."),
      p("Website", "Weeks 3–5", "Designed and built oreejoy.in with editable highlights, publications and team pages."),
      p("Portal and app", "Weeks 6–12", "Built insole sync, gait reports, the freezing timeline and trends in two-week sprints with demos."),
      p("Pilot-ready", "Weeks 13–14", "Tested with the team's own recorded walks and clinician feedback, then handed over."),
    ],
    results: {
      metrics: [
        { value: "4", label: "conditions covered in one portal" },
        { value: "2 insoles", label: "one gait report per walk" },
        { value: "9", label: "peer-reviewed papers on the site" },
        { value: "Live", label: "at oreejoy.in" },
      ],
      narrative:
        "Oreejoy now has one place that explains Instrole and shows the evidence behind it, and a portal that turns a recorded walk into a report a clinician can read in minutes. The same platform carries its demonstrations to hospitals and clinical educators, and new sensors or indices can be added without rebuilding the reports.",
    },
    screenshots: [
      "Oreejoy's website: the four conditions Instrole is built for",
      "oreejoy.in on mobile: the home page and the applications",
      "Clinician portal: patients by condition, with gait index, freezing episodes and fall-risk flags",
      "Session report: foot-pressure maps from both insoles, gait cycle and asymmetry",
      "Freezing-of-gait review: hesitations and cues across a 10-minute walk",
      "Fall-risk trend: balance and gait indices over 12 weeks",
      "Companion app: pairing the insoles and recording today's walk",
      "Website editor on a laptop: lab highlights and publications, published by the Oreejoy team",
    ],
    images: [
      { src: "/case-studies/gait-analysis-portal-gandhinagar/applications.webp", alt: "Oreejoy website: Built for Complex Movement Challenges, with foot drop support, Parkinson's gait freezing, elderly fall prediction and clinical gait indexing", width: 1440, height: 900 },
      { src: "/case-studies/gait-analysis-portal-gandhinagar/mobile-site.webp", alt: "Oreejoy website on two phones: the home page and the targeted applications", width: 1440, height: 900 },
    ],
    website: { url: "https://oreejoy.in", image: { src: "/sites/oreejoy.webp", alt: "Oreejoy website home page: Transforming Gait Analysis into Real-Time Mobility Care", width: 1440, height: 900 } },
    ctaHeading: "Turning research into a product clinicians can use?",
    placeholder: true,
  },

  // Theronix Health: NHS discharge-coordination startup (theronixhealth.com, Theronix Ltd), one of
  // the startups VAUG built for (per Utkarsh, via the leader, 22 Nov 2026). Product facts are from
  // theronixhealth.com, read 22 Nov 2026. The product is at prototype stage; no outcomes are claimed.
  // TODO(content): confirm scope (website + prototype), stack, timeline, team, city, and consent
  // to show the logo (CONTENT_GAPS.md). Patients, agencies and numbers in the screens are illustrative.
  {
    slug: "nhs-discharge-platform-england",
    client: "Theronix Health",
    city: "South East England, UK",
    stage: "Prototype-stage startup",
    industry: "Healthcare · NHS discharge",
    model: "Build With Us",
    icon: "heart",
    title: "A Discharge Platform That Has the Care Package Ready Before the Patient Is",
    summary:
      "The website and working prototype for Theronix Flow: a Pathway 1 prediction from Day 2 of admission, a care aggregator that finds spare domiciliary hours, one readiness board, and a clinician's approval before anything is activated.",
    metrics: [
      { value: "Day 2", label: "of admission, when the Pathway 1 score starts" },
      { value: "5", label: "readiness checks on one board" },
      { value: "0", label: "extra data entry for ward staff" },
    ],
    tint: "#7a22c7",
    // TODO(content): illustrative prototype data for one ward; matches the drawn screens.
    screen: [
      { label: "Patients on Pathway 1", value: "14" },
      { label: "Packages ready for review", value: "3" },
      { label: "Spare agency hours today", value: "86" },
    ],
    logo: "/logos/theronix.webp",
    sector: "healthcare",
    service: "build-with-us",
    clientType: "Startup",
    region: "UK",
    domain: "Discharge coordination platform (prototype) and website",
    techStack: ["React", "TypeScript", "Python (FastAPI)", "PostgreSQL", "scikit-learn", "Azure (UK South)"],
    duration: "12 weeks",
    team: "4 people: PM, designer, full-stack dev, ML engineer",
    about:
      "Theronix Health builds Theronix Flow, a platform for NHS Pathway 1 discharge: patients who are medically fit to go home with short-term domiciliary care, but wait because the care package is only arranged after they reach No Criteria To Reside (NCTR). Theronix Flow predicts Pathway 1 needs from Day 2 of admission using routinely collected clinical data, finds unused domiciliary care hours across local CQC-registered agencies, and puts a proposed package in front of the discharge coordinator for approval. The company is in the Health Innovation KSS Discovery Programme 2026 cohort, is engaging care providers across Kent, Surrey and Sussex, and is at prototype stage with NHS system validation underway.",
    problems: [
      f("Reactive coordination.", "Care agencies were contacted only once a patient reached NCTR, so the wait began just as the clinical work ended."),
      f("A complex story.", "The problem and the product had to make sense to clinicians, commissioners and care providers in under a minute."),
      f("A prototype to prove.", "The prediction, the care aggregator and clinician sign-off needed a working product NHS teams could click through, not slides."),
      f("Clinical safety.", "Nothing could be automated past a clinician: every proposal had to be explainable and reversible."),
    ],
    solution:
      "We built theronixhealth.com and the Theronix Flow prototype. The website explains the problem, the three components and the five-step flow in plain language, with the NHS figures and their sources, and takes enquiries from teams interested in pilots. The prototype is a web platform for discharge coordinators. From Day 2 of admission it shows each patient's Pathway 1 probability, updated daily, with the signals behind it: MDT notes, frailty score, mobility, medication dependency and social circumstances. A care aggregator finds spare domiciliary hours across local CQC-registered agencies and assembles a provisional 7 to 14 day surge package. One readiness board tracks clinical stability, therapy sign-off, medications, transport and the package for every patient. When confidence passes the threshold, the coordinator approves, modifies or rejects the proposed package; every decision is logged, and nothing activates without sign-off.",
    features: [
      f("Pathway 1 prediction", "A daily probability score from Day 2, with the clinical signals that moved it."),
      f("Care aggregator", "Spare hours across local CQC-registered agencies, matched to the patient's care needs."),
      f("Readiness board", "Clinical, therapy, medicines, transport and package status for every patient in one view."),
      f("Clinician approval", "Approve, modify or reject each proposed package, with a full audit trail."),
      f("Surge package tracking", "The 7 to 14 day bridge from NCTR until the commissioned package starts."),
      f("Website and pilot enquiries", "theronixhealth.com explains the flow and takes enquiries from NHS teams and providers."),
    ],
    challenges: [
      f("Explainable scores", "Coordinators see why a score moved, not just the number, so the prediction supports their judgement instead of replacing it."),
      f("No extra data entry", "The prototype uses only routinely collected data, so ward teams keep working exactly as they do now."),
      f("Safe by design", "Packages stay provisional until a clinician signs off, and every change is recorded with who and when."),
    ],
    approach: [
      p("Discovery", "Weeks 1–2", "Mapped the Pathway 1 journey with the founders: who decides, which data exists on Day 2, and where the wait happens."),
      p("Website", "Weeks 3–4", "Wrote and built theronixhealth.com around the problem, the three components and the five steps."),
      p("Prototype", "Weeks 5–10", "Built the score view, care aggregator, readiness board and approval flow in two-week sprints with demos."),
      p("Demo-ready", "Weeks 11–12", "Prepared realistic demo data for walkthroughs with NHS teams and care providers, and refined from feedback."),
    ],
    results: {
      metrics: [
        { value: "Day 2", label: "of admission, when the Pathway 1 score starts" },
        { value: "5", label: "readiness checks on one board" },
        { value: "0", label: "extra data entry for ward staff" },
        { value: "Every", label: "package approved by a clinician first" },
      ],
      narrative:
        "Theronix has a website that explains a complex NHS problem in plain language and a working prototype NHS teams can click through, from the Day 2 score to the approved package. It supports the company's validation work with discharge teams and care providers in Kent, Surrey and Sussex.",
    },
    screenshots: [
      "Theronix's website on mobile: the promise and the NHS problem in numbers",
      "Discharge board: every Pathway 1 patient on the ward, with score and readiness",
      "Patient view: the Pathway 1 score from Day 2, and the signals behind it",
      "Care aggregator: spare domiciliary hours across local CQC-registered agencies",
      "Proposed package: the coordinator approves, modifies or rejects",
      "Surge package tracking: from NCTR to the commissioned package",
      "The prototype on a laptop, with the coordinator's review alert on a phone",
    ],
    images: [{ src: "/case-studies/nhs-discharge-platform-england/mobile-site.webp", alt: "Theronix Flow website on two phones: the hero and the problem section", width: 1440, height: 900 }],
    website: { url: "https://theronixhealth.com", image: { src: "/sites/theronix.webp", alt: "Theronix Flow website home page: Patients are ready to go home. The coordination hasn't caught up yet.", width: 1440, height: 900 } },
    ctaHeading: "Building a product for NHS teams?",
    placeholder: true,
  },

  // ------------------------------------------------------------------ Startups · batch B (AI)
  // HeliousAI: Indian defence-AI startup (heliousai.com). Product facts from its site, read
  // 23 Nov 2026. No results claimed; the "3x better detection" line on its site is its own claim.
  // TODO(content): confirm scope (website + mission console), stack, timeline, team, city and logo
  // consent (CONTENT_GAPS.md). Every figure in the drawn screens is illustrative.
  {
    slug: "defence-ai-mission-console-india",
    client: "HeliousAI",
    city: "India",
    stage: "Defence-tech startup",
    industry: "Defence · AI imaging",
    model: "Build With Us",
    icon: "cpu",
    title: "A Website and Mission Console for Canopy-Penetrating Defence AI",
    summary:
      "The heliousai.com website and a secure mission console for E-AOS imaging: flight planning, upload tracking, multi-layer reconstruction runs and ground composites whose AI detections an operator reviews.",
    metrics: [
      { value: "4", label: "steps from flight to ground composite, on one console" },
      { value: "1,000s", label: "of geotagged thermal frames per pass, handled for the operator" },
      { value: "Every", label: "detection reviewed by a person" },
    ],
    tint: "#1c1c1e",
    // TODO(content): illustrative; matches the drawn screens.
    screen: [
      { label: "Passes today", value: "6" },
      { label: "Composites ready", value: "4" },
      { label: "Detections to review", value: "11" },
    ],
    logo: "/logos/heliousai.webp",
    service: "build-with-us",
    clientType: "Startup",
    region: "India",
    domain: "Defence-tech website and secure mission console (web)",
    techStack: ["Next.js", "TypeScript", "Python (FastAPI)", "PostgreSQL + PostGIS", "MapLibre GL", "AWS"],
    duration: "12 weeks",
    team: "4 people: PM, designer, full-stack dev, GIS and data engineer",
    about:
      "HeliousAI is an Indian defence-technology startup building canopy-penetrating AI for clarity in complex terrain. Its E-AOS (airborne optical sectioning) module flies a UAV in optimised patterns to capture thousands of geotagged thermal images, then reconstructs the canopy, mid-layer and ground separately, so that static ground signatures reinforce while foliage fades into noise. The output is a single foliage-penetrating ground composite in near real time, built to work with existing command systems on any drone or platform. The company also develops the Helious VTOL drone and an indigenous upgrade for existing platforms.",
    problems: [
      f("Physics that's hard to explain.", "Optical sectioning had to make sense to defence buyers in a minute, without overstating what it does."),
      f("Thousands of frames per pass.", "Each flight produces more geotagged thermal images than anyone can review one by one."),
      f("Restricted by default.", "Mission data had to be visible only to the right roles, with every action logged."),
      f("One place to decide.", "Teams needed the reconstructed composite and its flagged detections side by side, not across separate tools."),
    ],
    solution:
      "We built heliousai.com and a secure mission console. The website explains why conventional thermal imaging fails under canopy, how E-AOS works in four steps, and the products, with a contact route for defence teams. The console plans the synthetic-aperture flight pattern over an area, tracks each pass as its images upload, runs the multi-layer reconstruction and shows the ground composite beside the raw canopy view. Detections on the composite carry a confidence score and stay unconfirmed until an operator reviews them, and every action is logged. Access is by role, on infrastructure the client controls.",
    features: [
      f("Explainer website", "Why canopy defeats thermal imaging, the four E-AOS steps, the products and a contact route."),
      f("Flight-pattern planner", "Draw the area, pick the pattern and altitude, and see the expected coverage."),
      f("Pass tracking", "Resumable uploads from the field with per-pass progress and integrity checks."),
      f("Reconstruction runs", "Canopy, mid-layer and ground layers computed per pass, with run status."),
      f("Composite viewer", "Canopy and ground views side by side, with flagged detections and confidence."),
      f("Operator review and audit", "Confirm or dismiss each detection; every decision is logged with who and when."),
    ],
    challenges: [
      f("Large uploads over field links", "Chunked, resumable uploads with checksums, so a dropped connection never restarts a pass."),
      f("Explaining without overclaiming", "The website quotes the published research behind the approach rather than making its own performance claims."),
      f("Clear roles", "Operators, analysts and administrators see different things, and nothing leaves the console unlogged."),
    ],
    approach: [
      p("Discovery", "Weeks 1–2", "Mapped the flight-to-composite workflow and who needs to see what."),
      p("Website", "Weeks 3–5", "Wrote and built heliousai.com around the problem, the physics and the products."),
      p("Console", "Weeks 6–11", "Built planning, pass tracking, reconstruction runs, the viewer and review in two-week sprints."),
      p("Hardening", "Week 12", "Role checks, audit logging and a security review before handover."),
    ],
    results: {
      metrics: [
        { value: "4", label: "steps from flight to ground composite, on one console" },
        { value: "1,000s", label: "of geotagged thermal frames per pass, handled for the operator" },
        { value: "Every", label: "detection reviewed by a person" },
        { value: "Live", label: "at heliousai.com" },
      ],
      narrative:
        "HeliousAI has a website that explains a hard-to-picture technology in plain terms, and a console that takes a team from flight plan to reviewed ground composite in one place. Detections are never acted on without a person confirming them.",
    },
    screenshots: [
      "HeliousAI's website: the physics of seeing through canopy, in four steps",
      "heliousai.com on mobile: the promise and optical sectioning",
      "Mission console: today's passes, reconstruction runs and composites ready for review",
      "Flight planner: the synthetic-aperture pattern over the search area",
      "Composite viewer: the canopy view and the reconstructed ground view, with flagged signatures",
      "Operator review: confirm or dismiss each detection, with an audit trail",
      "The console on a laptop, with a composite-ready alert on a phone",
    ],
    images: [
      { src: "/case-studies/defence-ai-mission-console-india/optical-sectioning.webp", alt: "HeliousAI website: The Physics of Advantage, with smart flight patterns, multi-layer reconstruction, signal vs noise integration and actionable output", width: 1440, height: 900 },
      { src: "/case-studies/defence-ai-mission-console-india/mobile-site.webp", alt: "HeliousAI website on two phones: the hero and the optical sectioning section", width: 1440, height: 900 },
    ],
    website: { url: "https://www.heliousai.com", image: { src: "/sites/heliousai.webp", alt: "HeliousAI website home page: See Through The Noise, Real-Time AI Defense Clarity", width: 1440, height: 900 } },
    ctaHeading: "Need a console your field team will actually use?",
    placeholder: true,
  },

  // CityVerse AI: US GovTech startup (cityverseai.com, a product of ATHLYNK Inc.). Product facts
  // (Themis spec-compliance review, Field Operations, single system of record) from its site, read
  // 23 Nov 2026. Its own customer list is not repeated here; the screens use a sample city.
  // TODO(content): confirm scope (website + platform portal), stack, timeline, team, logo consent.
  {
    slug: "capital-projects-ai-platform-usa",
    client: "CityVerse AI",
    city: "United States",
    stage: "GovTech startup",
    industry: "GovTech · capital projects",
    model: "Build With Us",
    icon: "building",
    title: "A Website and Portal for an AI Operating Layer for City Capital Projects",
    summary:
      "The cityverseai.com website and the portal for its platform: a capital-projects portfolio, Themis plan review against a city's standard plates, questions answered across specifications with sources, and field reports from a phone.",
    metrics: [
      { value: "6", label: "everyday project tasks on one platform" },
      { value: "2", label: "products: Themis and Field Operations" },
      { value: "Every", label: "finding cites its sheet or section" },
    ],
    tint: "#1c1c1b",
    // TODO(content): illustrative sample-city data; matches the drawn screens.
    screen: [
      { label: "Active projects", value: "18" },
      { label: "Plan sets in review", value: "5" },
      { label: "Findings to decide", value: "7" },
    ],
    logo: "/logos/cityverse.webp",
    service: "build-with-us",
    clientType: "Startup",
    region: "USA",
    domain: "Website and platform portal for capital-project teams",
    techStack: ["Next.js", "TypeScript", "Python (FastAPI)", "PostgreSQL + pgvector", "AWS", "React Native"],
    duration: "14 weeks",
    team: "5 people: PM, designer, 2 full-stack devs, AI engineer",
    about:
      "CityVerse AI, a product of ATHLYNK Inc., builds the operating layer for capital projects: construction management, AI document extraction, spec-compliance review, field inspections, utility tracking and financial reporting in one system of record for cities and public agencies. Its Themis product reviews plan sets against a city's standard plates and hands each finding to an engineer to accept or overrule, with the sheet and section cited. Field Operations captures photos, voice notes and GPS on site and turns them into reports, so inspectors spend less time on paperwork.",
    problems: [
      f("A platform for skeptical buyers.", "Public-works engineers had to see exactly what the AI does, and that they stay in charge, before booking a demo."),
      f("Six jobs, one product.", "Summaries, specifications, Q&A, pre-review checks, review comments and follow-ups had to feel like one tool."),
      f("Traceable answers.", "Every finding and answer needed its source: the sheet, the standard plate, the section."),
      f("Field to office.", "Inspectors in the field needed to capture evidence fast and have it land in the project record."),
    ],
    solution:
      "We built cityverseai.com and the portal for the platform. The website leads with a live-looking Themis review, so visitors see a finding, its citation and the engineer's verdict before they read a word of marketing, with pages for Themis, Field Operations, pricing and accessibility. The portal opens on a portfolio of capital projects by phase, budget and review status. In Themis, each check on a plan set shows the AI's suggested verdict, the evidence with sheet and section, and Accept or Disagree; anything the documents don't settle is marked for the engineer's judgment. A question panel answers across the project's specifications with references, and the field app sends photos, voice notes and locations straight into the project record.",
    features: [
      f("Product website", "A live-style Themis review on the home page, product pages, pricing and accessibility."),
      f("Capital-projects portfolio", "Every project by phase, budget, review cycle and open findings."),
      f("Themis plan review", "Checks against the city's standard plates, with evidence, citations and the engineer's verdict."),
      f("Ask the documents", "Answers across specifications and city requirements, each with its source."),
      f("Field Operations app", "Photos, voice notes and GPS on site, turned into daily reports."),
      f("Follow-ups", "Status updates and review responses drafted for the team to send."),
    ],
    challenges: [
      f("Trust before the demo", "We put a real-looking review on the home page instead of a claim, with the engineer's Accept or Disagree in view."),
      f("Citations everywhere", "Every AI output in the portal links to the page it came from, so nothing has to be taken on faith."),
      f("Accessible for public agencies", "The website and portal were built and tested to WCAG 2.1 AA, which city buyers ask for."),
    ],
    approach: [
      p("Discovery", "Weeks 1–2", "Walked through a real review cycle and a field day with the founders."),
      p("Website", "Weeks 3–5", "Designed and built the site around the Themis review, with product and pricing pages."),
      p("Portal", "Weeks 6–12", "Built the portfolio, Themis review, document Q&A and field app sync in two-week sprints."),
      p("Launch", "Weeks 13–14", "Accessibility testing, analytics and handover."),
    ],
    results: {
      metrics: [
        { value: "6", label: "everyday project tasks on one platform" },
        { value: "2", label: "products: Themis and Field Operations" },
        { value: "Every", label: "finding cites its sheet or section" },
        { value: "Live", label: "at cityverseai.com" },
      ],
      narrative:
        "CityVerse has a website that shows its AI working, citations and all, before a city engineer has to take anything on trust, and a portal where a plan review, a question across the specs and a site visit all end up in the same project record.",
    },
    screenshots: [
      "CityVerse's Themis page: plan review against a city's standard plates",
      "cityverseai.com on mobile: the home page and Field Operations",
      "Portfolio: every capital project by phase, budget and review status",
      "Themis review: each check with the AI's suggestion, the evidence and the engineer's verdict",
      "Ask the documents: answers across the specifications, with sources",
      "Field Operations: a photo, a voice note and the daily report it becomes",
      "The portal on a laptop, with the field app on a phone",
    ],
    images: [
      { src: "/case-studies/capital-projects-ai-platform-usa/themis.webp", alt: "CityVerse AI website: the Themis product page with a plan review in progress", width: 1440, height: 900 },
      { src: "/case-studies/capital-projects-ai-platform-usa/mobile-site.webp", alt: "CityVerse AI website on two phones: The Operating Layer for Capital Projects, and Field Operations Without Paperwork", width: 1440, height: 900 },
    ],
    website: { url: "https://cityverseai.com", image: { src: "/sites/cityverse.webp", alt: "CityVerse AI website home page: The Operating Layer for Capital Projects", width: 1440, height: 900 } },
    ctaHeading: "Selling software to cities?",
    placeholder: true,
  },

  // Klartext AI · doclarity: Austrian accessible-PDF startup (doclarity.eu). Product and study facts
  // from its site, read 23 Nov 2026 (the 1-in-17 figure is doclarity's own study, credited as such).
  // TODO(content): confirm scope (bilingual website + account portal), stack, timeline, team, city
  // and logo consent (CONTENT_GAPS.md). Documents and figures in the drawn screens are illustrative.
  {
    slug: "accessible-pdf-ai-platform-austria",
    client: "Klartext AI · doclarity",
    city: "Austria",
    stage: "AI startup",
    industry: "AI · digital accessibility",
    model: "Build With Us",
    icon: "file-check",
    title: "A Bilingual Website and Portal for AI-Made Accessible PDFs",
    summary:
      "The English and German doclarity.eu website and the account portal for its AI remediation: upload a PDF or Office file, set the rules once, check every suggested tag before download, and see each file's PDF/UA machine check.",
    metrics: [
      { value: "2", label: "languages: English and German, site and portal" },
      { value: "3", label: "contrast levels to fix to: WCAG A, AA or AAA" },
      { value: "PDF/UA", label: "machine check on every file, shown before download" },
    ],
    tint: "#1c4fd6",
    // TODO(content): illustrative account data; matches the drawn screens.
    screen: [
      { label: "Documents this month", value: "46" },
      { label: "Pages remediated", value: "1,284" },
      { label: "Passed PDF/UA check", value: "44" },
    ],
    logo: "/logos/doclarity.webp",
    service: "build-with-us",
    clientType: "Startup",
    region: "Europe",
    domain: "Bilingual product website and account portal",
    techStack: ["Next.js", "TypeScript", "Node.js", "PostgreSQL", "Stripe", "EU hosting"],
    duration: "12 weeks",
    team: "4 people: PM, designer, full-stack dev, QA and accessibility tester",
    about:
      "Klartext AI makes doclarity, AI-assisted remediation for PDFs. It adds headings, tables, image descriptions, reading order and real form fields, fixes contrast to WCAG A, AA or AAA, and machine-checks the result against PDF/UA-1 or PDF/UA-2, while the user checks every suggestion before downloading. It takes born-digital or scanned PDFs as well as Word, PowerPoint and LibreOffice files, runs in Europe, and works in English and German. Its own study of 193,198 public PDFs from 382 Austrian public institutions found that only 1 in 17 passes the machine check for PDF/UA.",
    problems: [
      f("An accessibility product has to be accessible.", "The website and portal would be tested by the very people doclarity serves, with screen readers and high contrast."),
      f("Two languages from day one.", "Austrian and German institutions needed everything in German, with English alongside."),
      f("Trust in AI suggestions.", "Users had to see and change every tag before download, not hand their documents to a black box."),
      f("Clear pricing for institutions.", "Public bodies needed page-based pricing, invoices and a free trial without a card."),
    ],
    solution:
      "We built doclarity.eu in English and German and the account portal behind it. The website shows a tagged sample page you can point at or tab through, each element numbered in reading order, so the product explains itself, with pages for how it works, features, pricing and the Austrian PDF study, plus a contrast switch for visitors who need it. The portal handles sign-up, the free pages and plans, and every document: upload, settings that persist (PDF/UA level, contrast level, alt-text language, page straightening), progress, and the review step where each suggested tag can be changed before download. Each file shows its PDF/UA machine check, and accounts get invoices and usage by page.",
    features: [
      f("Bilingual website", "English and German, with a live tagged sample page and a contrast switch."),
      f("Sign-up, team and usage", "30 free pages without a card, team seats with roles, and pages used by month."),
      f("Rules set once", "PDF/UA level, contrast level, alt-text language and page straightening remembered per account."),
      f("Document list", "Every upload with its status, pages and PDF/UA machine check."),
      f("Review before download", "Each suggested heading, table, figure and field, in reading order, ready to change."),
      f("Study page", "The Austrian public-PDF study, readable on any device."),
    ],
    challenges: [
      f("Accessible to the people it's for", "Tested by hand with VoiceOver and NVDA, keyboard only, at 200% zoom and in high contrast, on the website and in the portal."),
      f("German that reads as German", "Native-speaker copy for both languages, not machine translation, with the language set on every page for screen readers."),
      f("Hosted in Europe", "The portal and document storage stay in an EU region, as institutions require."),
    ],
    approach: [
      p("Discovery", "Weeks 1–2", "Mapped the remediation flow with the founders and the questions institutions ask first."),
      p("Website", "Weeks 3–5", "Built the bilingual site around the tagged sample page, with pricing and the study."),
      p("Portal", "Weeks 6–10", "Sign-up, plans, uploads, settings, review and invoices in two-week sprints."),
      p("Accessibility QA", "Weeks 11–12", "Screen-reader, keyboard, zoom and contrast testing, then fixes and handover."),
    ],
    results: {
      metrics: [
        { value: "2", label: "languages: English and German, site and portal" },
        { value: "3", label: "contrast levels to fix to: WCAG A, AA or AAA" },
        { value: "PDF/UA", label: "machine check on every file, shown before download" },
        { value: "Live", label: "at doclarity.eu" },
      ],
      narrative:
        "doclarity has a website that demonstrates accessible structure instead of describing it, in both its languages, and a portal where institutions can try it free, set their rules once, and check every AI suggestion before a file leaves their hands.",
    },
    screenshots: [
      "doclarity.eu on mobile: the home page and pricing",
      "Account home: documents, pages used and each file's PDF/UA check",
      "Upload settings: PDF/UA level, contrast level and alt-text language, set once",
      "Review before download: every suggested tag in reading order",
      "Team and usage: seats, roles and pages used by month",
      "The website in German on a laptop, with the portal on a phone",
    ],
    images: [{ src: "/case-studies/accessible-pdf-ai-platform-austria/mobile-site.webp", alt: "doclarity website on two phones: Accessible PDFs, readable by everyone, and pricing", width: 1440, height: 900 }],
    website: { url: "https://doclarity.eu", image: { src: "/sites/doclarity.webp", alt: "doclarity website home page: Accessible PDFs. Readable by everyone.", width: 1440, height: 900 } },
    ctaHeading: "Building a product that has to be accessible?",
    placeholder: true,
  },

  // Reagvis Labs: Dehradun deepfake-detection startup (reagvis.com). Product facts (image, video and
  // audio detection, KYC Guard) from its site, read 23 Nov 2026.
  // TODO(content): confirm scope (website + detection portal), stack, timeline, team, logo consent.
  // Every upload, score and verdict in the drawn screens is illustrative.
  {
    slug: "deepfake-detection-platform-dehradun",
    client: "Reagvis Labs",
    city: "Dehradun, Uttarakhand, India",
    stage: "AI startup",
    industry: "AI · deepfake detection",
    model: "Build With Us",
    icon: "shield",
    title: "A Website and Detection Portal That Expose Deepfakes Across Image, Video, Audio and KYC",
    summary:
      "The reagvis.com website and the signed-in portal for its detection platform: upload an image, video or voice clip and see the verdict with the evidence behind it, and screen KYC selfies and documents in real time.",
    metrics: [
      { value: "4", label: "detection products in one portal" },
      { value: "Frame by frame", label: "manipulated segments located in video" },
      { value: "Every", label: "verdict shows its evidence" },
    ],
    tint: "#3b2414",
    // TODO(content): illustrative; matches the drawn screens.
    screen: [
      { label: "Files analysed today", value: "312" },
      { label: "Flagged as manipulated", value: "27" },
      { label: "KYC checks", value: "148" },
    ],
    logo: "/logos/reagvis.webp",
    service: "build-with-us",
    clientType: "Startup",
    region: "India",
    domain: "Product website and detection portal (web)",
    techStack: ["React", "TypeScript", "Python (FastAPI)", "PyTorch serving", "PostgreSQL", "AWS"],
    duration: "12 weeks",
    team: "4 people: PM, designer, full-stack dev, ML engineer",
    about:
      "Reagvis Labs, based in Dehradun, builds AI-driven deepfake detection. Its image detection finds AI-generated content and subtle manipulations; video analysis scrutinises footage frame by frame and localises the manipulated segments; audio verification exposes synthetic or impersonated voices with acoustic analysis; and KYC Guard screens video calls and selfie submissions for deepfakes during identity verification.",
    problems: [
      f("Four products, one story.", "Image, video, audio and KYC detection needed one clear site and one place to use them."),
      f("Verdicts need reasons.", "A bare 'fake' score isn't enough for a compliance team; they need to see where and why."),
      f("Demo versus production.", "Visitors had to be able to try the tools safely, with sign-in before anything sensitive."),
      f("KYC in real time.", "Selfie videos and ID documents had to be screened while the customer waits."),
    ],
    solution:
      "We built reagvis.com and the signed-in portal for the platform. The website introduces the four products with a page each and a demo route that explains what is and isn't analysed before sign-in. In the portal, an upload of an image, video or voice clip returns a verdict with its evidence: a heatmap of manipulated regions for images, a timeline of flagged frames for video, and a spectrogram with synthetic-speech markers for audio. KYC Guard takes a selfie video and an ID document, runs liveness and deepfake screening and returns a decision with reasons, and every result can be exported for a case file.",
    features: [
      f("Product website", "Image, video, audio and KYC Guard pages, with a clearly labelled demo route."),
      f("Upload and analyse", "Drop an image, video or voice clip and follow it through analysis."),
      f("Image evidence", "A heatmap over the regions the model believes were generated or edited."),
      f("Video timeline", "Flagged frames and segments located along the clip."),
      f("Audio check", "A spectrogram with synthetic-speech markers and a confidence score."),
      f("KYC Guard", "Selfie video and ID document screened for liveness and deepfakes, with reasons."),
    ],
    challenges: [
      f("Evidence, not just a score", "Each result shows where the model looked and what it found, so a reviewer can agree or escalate."),
      f("Big files, fast answers", "Videos upload in chunks and analysis streams progress back, so nobody stares at a spinner."),
      f("Sensitive data", "Uploads are encrypted, kept only as long as the account sets, and visible only to its own users."),
    ],
    approach: [
      p("Discovery", "Weeks 1–2", "Mapped each product's input, output and the evidence a reviewer needs."),
      p("Website", "Weeks 3–4", "Built the four product pages and the demo route."),
      p("Portal", "Weeks 5–10", "Uploads, analysis views, KYC Guard and exports in two-week sprints."),
      p("Launch", "Weeks 11–12", "Security review, load testing and handover."),
    ],
    results: {
      metrics: [
        { value: "4", label: "detection products in one portal" },
        { value: "Frame by frame", label: "manipulated segments located in video" },
        { value: "Every", label: "verdict shows its evidence" },
        { value: "Live", label: "at reagvis.com" },
      ],
      narrative:
        "Reagvis has one website for its four detection products and a portal where every verdict comes with the evidence a compliance or newsroom team needs to act on it.",
    },
    screenshots: [
      "Reagvis's website: the KYC Guard identity-verification page",
      "reagvis.com on mobile: the home page and video deepfake detection",
      "Portal home: today's uploads across image, video, audio and KYC, with verdicts",
      "Video analysis: flagged frames and the manipulated segment on the timeline",
      "Image and audio evidence: a manipulation heatmap and a synthetic-speech spectrogram",
      "KYC Guard: selfie video and ID document screened while the customer waits",
      "The portal on a laptop, with a KYC check on a phone",
    ],
    images: [
      { src: "/case-studies/deepfake-detection-platform-dehradun/kyc-guard.webp", alt: "Reagvis website: KYC Guard identity verification with selfie video and ID document upload", width: 1440, height: 900 },
      { src: "/case-studies/deepfake-detection-platform-dehradun/mobile-site.webp", alt: "Reagvis website on two phones: Exposing Deception, Ensuring Trust, and video deepfake detection", width: 1440, height: 900 },
    ],
    website: { url: "https://reagvis.com", image: { src: "/sites/reagvis.webp", alt: "Reagvis website home page: Exposing Deception. Ensuring Trust.", width: 1440, height: 900 } },
    ctaHeading: "Need AI results people can check?",
    placeholder: true,
  },

  // Stylique AI by YOKO (name as Utkarsh asked; the site says "YOKO Styles", yokostyles.com).
  // Product facts (patterns from text, images or CAD; 50+ body types; DXF export; 3D preview; API and
  // SDK; beta waitlist) from its site, read 23 Nov 2026. Its "80% less sampling cost" is its own claim.
  // TODO(content): confirm scope (website + beta app portal), stack, timeline, team, city, logo.
  {
    slug: "ai-sewing-pattern-app-india",
    client: "Stylique AI by YOKO",
    city: "India",
    stage: "AI startup, in beta",
    industry: "Fashion tech · AI",
    model: "Build With Us",
    icon: "sparkles",
    title: "A Website and Beta App for AI-Generated Sewing Patterns",
    summary:
      "The yokostyles.com website, its beta waitlist and the app portal: describe a garment or upload a sketch or CAD file, get production-ready pattern pieces, grade them across body types, preview in 3D and export DXF.",
    metrics: [
      { value: "3", label: "ways in: text, image or CAD" },
      { value: "50+", label: "body types to fit a pattern to" },
      { value: "DXF", label: "export, ready for the factory" },
    ],
    tint: "#2a1220",
    // TODO(content): illustrative; matches the drawn screens.
    screen: [
      { label: "Patterns generated", value: "128" },
      { label: "Graded size sets", value: "41" },
      { label: "Beta waitlist", value: "640" },
    ],
    service: "build-with-us",
    clientType: "Startup",
    region: "India",
    domain: "Product website, beta waitlist and app portal",
    techStack: ["Next.js", "TypeScript", "Python (FastAPI)", "Three.js", "PostgreSQL", "AWS"],
    duration: "12 weeks",
    team: "4 people: PM, designer, full-stack dev, 3D and CAD engineer",
    about:
      "Stylique AI by YOKO (YOKO Styles) turns ideas into production-ready sewing patterns with multimodal AI trained on expert datasets. Designers describe a garment, upload a sketch or photo, or bring a CAD file; the app generates the pattern pieces, fits them across more than 50 body types, previews the garment in 3D and exports DXF for manufacturing, with factory grading and marker optimisation. It serves designers and brands, manufacturers, pattern makers, students and fashion-tech platforms, which can embed it through an API and SDK. The product is in beta.",
    problems: [
      f("A new category to explain.", "Designers and factories had to understand AI pattern-making, and trust it, from one page."),
      f("Two audiences.", "Creative teams wanted an app; platforms wanted an API. Both needed a way in."),
      f("Beta, not launch.", "The site had to build a waitlist and onboard founding users in batches."),
      f("Factory-ready output.", "Patterns had to leave the app as DXF a cutting room can use, not just pictures."),
    ],
    solution:
      "We built yokostyles.com, the beta waitlist and the app portal. The website explains the product in a single scroll, with the two ways to access it (the design app or the API and SDK), who it's for, and a waitlist that captures role and use case so founding users can be invited in batches. In the app, a designer starts from a text description, an image or a CAD file and gets the pattern pieces laid out with seam allowances and grain lines. They can grade them across body types, check the fit in a 3D preview and export DXF with a marker layout for the factory. Teams share projects, and API customers get keys and usage on the same account.",
    features: [
      f("One-scroll website", "The product, the two ways to access it, who it's for, and the waitlist."),
      f("Beta waitlist", "Role and use-case capture, with batch invitations for founding users."),
      f("Pattern generator", "Pieces from text, an image or a CAD file, with seams and grain lines."),
      f("Grading", "Fit the pattern across 50+ body types and check measurements."),
      f("3D preview", "See the garment drape before a sample is cut."),
      f("DXF export and API", "Factory-ready files with a marker layout, plus keys for platforms."),
    ],
    challenges: [
      f("Showing, not telling", "We let the patterns, the size grid and the 3D preview carry the website instead of claims."),
      f("Batch onboarding", "Waitlist entries are scored by role and use case, so each beta batch covers designers, factories and platforms."),
      f("Big CAD files in a browser", "Uploads stream to the server and the 3D preview loads progressively, so the app stays responsive."),
    ],
    approach: [
      p("Discovery", "Weeks 1–2", "Sessions with the founders and pattern makers on how a pattern moves from idea to factory."),
      p("Website and waitlist", "Weeks 3–5", "Built the site and the waitlist with batch invitations."),
      p("App portal", "Weeks 6–11", "Generator, grading, 3D preview, DXF export and API keys in two-week sprints."),
      p("Beta", "Week 12", "First founding users invited, with feedback built into the app."),
    ],
    results: {
      metrics: [
        { value: "3", label: "ways in: text, image or CAD" },
        { value: "50+", label: "body types to fit a pattern to" },
        { value: "DXF", label: "export, ready for the factory" },
        { value: "Live", label: "at yokostyles.com" },
      ],
      narrative:
        "Stylique AI by YOKO has a website that explains a new way to make patterns in one scroll, a waitlist that brings in the right founding users, and an app that takes a designer from an idea to a factory-ready DXF.",
    },
    screenshots: [
      "The YOKO Styles website: two ways to access it, and the beta waitlist",
      "yokostyles.com on mobile: the home page and the AI solution",
      "Pattern generator: a text brief and a sketch become pattern pieces",
      "Grading: the pattern fitted across body types, with measurements",
      "3D preview and DXF export with a marker layout",
      "Beta waitlist: role, use case and the next invitation batch",
      "The app on a laptop, with the waitlist on a phone",
    ],
    images: [
      { src: "/case-studies/ai-sewing-pattern-app-india/access.webp", alt: "YOKO Styles website: Two Ways to Access, the full design app and the developer API and SDK, with beta access benefits and a waitlist form", width: 1440, height: 900 },
      { src: "/case-studies/ai-sewing-pattern-app-india/mobile-site.webp", alt: "YOKO Styles website on two phones: Reinventing Fashion Design with AI, and Our AI Solution", width: 1440, height: 900 },
    ],
    website: { url: "https://www.yokostyles.com", image: { src: "/sites/yokostyles.webp", alt: "YOKO Styles website home page: Reinventing Fashion Design with AI", width: 1440, height: 900 } },
    ctaHeading: "Launching a new kind of product?",
    placeholder: true,
  },

  // ------------------------------------------------------------------ Startups · batch C (climate)
  // Alkamy Carbon: Indian wastewater carbon-removal startup (alkamycarbon.com). Product facts from its
  // site, read 23 Nov 2026. Its "20–30% cost savings" and "100,000+ year storage" are its own claims and
  // are not repeated as VAUG results. TODO(content): confirm scope (website + plant monitoring and MRV
  // portal), stack, timeline, team, city and logo consent (CONTENT_GAPS.md). Screen data is illustrative.
  {
    slug: "wastewater-carbon-removal-platform-india",
    client: "Alkamy Carbon",
    city: "India",
    stage: "Climate-tech startup",
    industry: "Climate · carbon removal",
    model: "Build With Us",
    icon: "globe",
    title: "A Website and MRV Dashboard for Carbon Removal at Wastewater Plants",
    summary:
      "The alkamycarbon.com website and a plant portal for its mineral dosing system: live inlet and outlet chemistry, automated dosing, and a carbon-removal ledger where every tonne traces back to measured readings.",
    metrics: [
      { value: "Inlet + outlet", label: "chemistry measured continuously, per plant" },
      { value: "Every", label: "tonne traceable to measured readings" },
      { value: "1", label: "portal for dosing, monitoring and MRV" },
    ],
    tint: "#0b2e2e",
    // TODO(content): illustrative pilot-plant data; matches the drawn screens.
    screen: [
      { label: "CO₂ removed this month", value: "38.4 t" },
      { label: "Dosing uptime", value: "99.2%" },
      { label: "Batches verified", value: "26 / 28" },
    ],
    logo: "/logos/alkamy.webp",
    service: "build-with-us",
    clientType: "Startup",
    region: "India",
    domain: "Website and plant monitoring and MRV portal",
    techStack: ["Next.js", "TypeScript", "Python (FastAPI)", "TimescaleDB", "MQTT", "AWS"],
    duration: "12 weeks",
    team: "4 people: PM, designer, full-stack dev, data engineer",
    about:
      "Alkamy Carbon turns wastewater treatment into a carbon sink. Natural minerals, dosed precisely into a plant's existing process, stabilise treatment chemistry while converting dissolved CO₂ into stable bicarbonates: permanent, measurable carbon removal. Inlet and outlet sensing measures the change directly, so every credit is traceable, and the credits fund deployment, so utilities pay nothing to take part. The company was founded by Rushil Hari Koppaka and Rishi Rathi.",
    problems: [
      f("A new idea for conservative buyers.", "Utility engineers had to see quickly that it needs no process changes and costs them nothing."),
      f("Removal has to be measured.", "Carbon buyers trust only credits backed by continuous, traceable measurement."),
      f("Plants run all day, every day.", "Dosing and monitoring had to work without anyone watching a screen."),
      f("Pilots start with a conversation.", "Partner enquiries had to reach the founders with the details a pilot needs."),
    ],
    solution:
      "We built alkamycarbon.com and a portal for the plants. The website explains the idea in one scroll: the chemistry, the benefits for the plant, why the carbon removal is permanent and verifiable, and a partner form that asks for flow, plant type and location. The portal shows each plant's inlet and outlet chemistry live, the dosing rate and how the optimiser has adjusted it, and alerts when a reading drifts. Every batch of treated water becomes a line in the carbon-removal ledger, with the readings behind it, and verified batches export as an MRV report for the registry.",
    features: [
      f("Explainer website", "Chemistry, plant benefits and verifiable removal in one scroll, with partner enquiries."),
      f("Live plant chemistry", "Inlet and outlet pH, alkalinity and dissolved carbon, per plant."),
      f("Dosing and optimisation", "Dose rate, set limits and every automatic adjustment, logged."),
      f("Alerts", "Sensor drift, dosing faults and out-of-range readings, sent to the operator."),
      f("Carbon-removal ledger", "Each batch with the measurements behind it and its verification status."),
      f("MRV export", "Verified batches packaged for the registry and the credit buyer."),
    ],
    challenges: [
      f("Data you can audit", "Raw sensor readings are kept unchanged beside the calculated removal, so a verifier can recompute any batch."),
      f("Patchy plant connectivity", "Gateways buffer readings locally and sync when the link returns, with no gaps in the record."),
      f("Plain language for utilities", "The website talks about treatment, cost and safety first, and carbon second."),
    ],
    approach: [
      p("Discovery", "Weeks 1–2", "Mapped the chemistry, the sensors and what a verifier needs to see."),
      p("Website", "Weeks 3–4", "Built the one-scroll site and the partner form."),
      p("Portal", "Weeks 5–10", "Live chemistry, dosing logs, alerts and the ledger in two-week sprints."),
      p("Pilot-ready", "Weeks 11–12", "Connected the first pilot plant and tested the MRV export."),
    ],
    results: {
      metrics: [
        { value: "Inlet + outlet", label: "chemistry measured continuously, per plant" },
        { value: "Every", label: "tonne traceable to measured readings" },
        { value: "1", label: "portal for dosing, monitoring and MRV" },
        { value: "Live", label: "at alkamycarbon.com" },
      ],
      narrative:
        "Alkamy has a website that explains carbon removal at a treatment plant in terms a utility engineer cares about, and a portal where every tonne it claims can be traced back to the readings that prove it.",
    },
    screenshots: [
      "Alkamy's website: permanent and verifiable carbon removal, measured at inlet and outlet",
      "alkamycarbon.com on mobile: the promise and zero-cost deployment",
      "Plant dashboard: live inlet and outlet chemistry and carbon removed",
      "Dosing: dose rate, limits and every automatic adjustment",
      "Carbon-removal ledger: each batch with its readings and verification status",
      "Partner enquiries from the website, with plant details for a pilot",
      "The portal on a laptop, with a sensor alert on a phone",
    ],
    images: [
      { src: "/case-studies/wastewater-carbon-removal-platform-india/inner.webp", alt: "Alkamy Carbon website: permanent and verifiable carbon removal, with inlet, mineral dosing and outlet measurement", width: 1440, height: 900 },
      { src: "/case-studies/wastewater-carbon-removal-platform-india/mobile-site.webp", alt: "Alkamy Carbon website on two phones: Turning wastewater into a carbon sink, and zero-cost deployment", width: 1440, height: 900 },
    ],
    website: { url: "https://alkamycarbon.com", image: { src: "/sites/alkamy.webp", alt: "Alkamy Carbon website home page: Turning wastewater into a carbon sink", width: 1440, height: 900 } },
    ctaHeading: "Building climate tech that has to prove its numbers?",
    placeholder: true,
  },

  // JOL Energy: battery-recycling startup incubated at VIT, Vellore (jolenergy.in). Facts from its
  // site, read 23 Nov 2026; the site itself has metal-price, onboarding and client-dashboard pages.
  // TODO(content): confirm scope, stack, timeline, team and logo consent (CONTENT_GAPS.md). Consignments,
  // weights, prices and people in the drawn screens are illustrative.
  {
    slug: "battery-recycling-portal-vellore",
    client: "JOL Energy",
    city: "Vellore, Tamil Nadu, India",
    stage: "Climate-tech startup",
    industry: "Climate · battery recycling",
    model: "Build With Us",
    icon: "refresh-cw",
    title: "A Website, Metal-Price Pages and Client Portal for a Battery Recycler",
    summary:
      "The jolenergy.in website with metal pricing and quote requests, supplier onboarding and a client portal where every project, from a battery consignment to a material order, is tracked in one place.",
    metrics: [
      { value: "5", label: "recovery stages tracked per consignment" },
      { value: "3", label: "critical metals to quote: Li, Co, Ni" },
      { value: "1", label: "portal for suppliers, buyers and the team" },
    ],
    tint: "#152633",
    // TODO(content): illustrative; matches the drawn screens.
    screen: [
      { label: "Material received, quarter", value: "18.4 t" },
      { label: "Consignments in process", value: "4" },
      { label: "Certificates issued", value: "12" },
    ],
    logo: "/logos/jolenergy.webp",
    service: "build-with-us",
    clientType: "Startup",
    region: "India",
    domain: "Website, metal-price pages, onboarding and client portal",
    techStack: ["HTML/CSS + vanilla JS", "Node.js", "PostgreSQL", "Cloudflare", "WhatsApp Business API", "S3"],
    duration: "10 weeks",
    team: "4 people: PM, designer, full-stack dev, QA",
    about:
      "JOL Energy recovers valuable resources from batteries and e-waste. It combines mechanical processing and hydrometallurgy across five stages (collect and sort, prepare and discharge, separate mechanically, recover and refine, check and return) to turn spent lithium-ion batteries and electronic scrap into critical materials such as lithium, cobalt and nickel for manufacturing. It is incubated at the Vellore Institute of Technology in Tamil Nadu.",
    problems: [
      f("Two kinds of customer.", "Suppliers of spent batteries and buyers of recovered metals needed different routes through one site."),
      f("Trust in the chain of custody.", "Suppliers wanted to see where their material was and get a certificate at the end."),
      f("Every quote is different.", "Recovered-material prices depend on chemistry, grade, volume and delivery, so buyers needed a fast way to ask, not a price list."),
      f("Onboarding by email.", "New suppliers were signed up over email threads and spreadsheets."),
    ],
    solution:
      "We built jolenergy.in with a route for each audience: suppliers find battery recycling, e-waste processing and how to start, buyers find recovered materials, products and a metal-pricing page that explains what drives the price and takes a quote request by material, grade, volume and delivery terms. A step-by-step onboarding page collects company details, material type, monthly volume, pickup location and compliance documents. Once onboarded, a client signs in to see all their projects in one place and follows every consignment through the five recovery stages, with weights at each stage, weighbridge slips and photos, and downloads the recovery certificate when it is done. Enquiries also arrive over WhatsApp into the same queue.",
    features: [
      f("Two-audience website", "Recycling for suppliers, recovered materials for buyers, and the five-stage process for both."),
      f("Metal pricing and quotes", "What drives the price, and a quote request by material, grade, volume and delivery terms."),
      f("Supplier onboarding", "Company, material, volume, pickup and compliance documents in one guided flow."),
      f("Consignment tracking", "Each consignment through the five stages, with weights and photos."),
      f("Certificates", "Recovery certificates and documents ready to download."),
      f("WhatsApp enquiries", "Messages from the website's WhatsApp link land in the team's queue."),
    ],
    challenges: [
      f("A mass balance that adds up", "Weights are recorded at every stage, so the portal shows what came in, what was recovered and what left as residue."),
      f("Quotes, not price lists", "No live market feed is shown as a price; requests capture what the team needs to quote quickly."),
      f("Fast on slow connections", "Plain, light pages load quickly for suppliers on mobile data across India."),
    ],
    approach: [
      p("Discovery", "Weeks 1–2", "Mapped the supplier and buyer journeys and the five process stages with the team."),
      p("Website", "Weeks 3–5", "Built the site, product and process pages and the metal-pricing page."),
      p("Portal", "Weeks 6–9", "Onboarding, consignment tracking and certificates."),
      p("Launch", "Week 10", "Content, analytics and handover."),
    ],
    results: {
      metrics: [
        { value: "5", label: "recovery stages tracked per consignment" },
        { value: "3", label: "critical metals to quote: Li, Co, Ni" },
        { value: "1", label: "portal for suppliers, buyers and the team" },
        { value: "Live", label: "at jolenergy.in" },
      ],
      narrative:
        "JOL has one site that speaks to the people who bring it waste and the people who buy what it recovers, and a portal that shows a supplier exactly where their batteries are, down to the certificate at the end.",
    },
    screenshots: [
      "JOL Energy's metal-pricing page: request a current quote by material, grade and volume",
      "JOL's client access: all of a client's projects in one place",
      "jolenergy.in on mobile: the home page and products",
      "Client portal: consignments through the five recovery stages",
      "Consignment detail: weights at every stage, documents and the certificate",
      "Quote requests: material, grade, form, volume and delivery terms",
      "Supplier onboarding: company, material, volume, pickup and documents",
      "The website on a laptop, with a consignment update on a phone",
    ],
    images: [
      { src: "/case-studies/battery-recycling-portal-vellore/inner.webp", alt: "JOL Energy website: metal pricing, The material. The form. The requirement., with a request for current pricing", width: 1440, height: 900 },
      { src: "/case-studies/battery-recycling-portal-vellore/client-access.webp", alt: "JOL Energy client access: Your projects. One place., with the sign-in form", width: 1440, height: 900 },
      { src: "/case-studies/battery-recycling-portal-vellore/mobile-site.webp", alt: "JOL Energy website on two phones: the home page and products", width: 1440, height: 900 },
    ],
    website: { url: "https://www.jolenergy.in", image: { src: "/sites/jolenergy.webp", alt: "JOL Energy website home page: Resources, recovered. End of life. Start of value.", width: 1440, height: 900 } },
    ctaHeading: "Running a circular business that needs a portal?",
    placeholder: true,
  },

  // EarthSprint Solutions: Nashik materials startup (earthsprintsolutions.com). Utkarsh confirmed VAUG
  // built its current website and portal (the older WordPress site was another agency's and is not
  // referenced). Facts from the site, read 23 Nov 2026. TODO(content): confirm portal scope, stack,
  // timeline, team and logo consent (CONTENT_GAPS.md). Enquiries, sites and areas are illustrative.
  {
    slug: "rice-husk-materials-portal-nashik",
    client: "EarthSprint Solutions",
    city: "Nashik, Maharashtra, India",
    stage: "Climate-tech startup",
    industry: "Climate · low-carbon materials",
    model: "Build With Us",
    icon: "hammer",
    title: "A Website and Portal for Floor Coatings Made From Rice Husk",
    summary:
      "The current earthsprintsolutions.com website and the portal behind it: sample-panel and call-back requests, dispatch tracking, pilot floors and silica data-sheet requests, for a company turning raw rice husk into industrial materials.",
    metrics: [
      { value: "4", label: "markets from one raw material, on one site" },
      { value: "2", label: "ways to start: a sample panel or a call back" },
      { value: "1", label: "portal from enquiry to pilot floor" },
    ],
    tint: "#1c1c1c",
    // TODO(content): illustrative; matches the drawn screens.
    screen: [
      { label: "Open enquiries", value: "14" },
      { label: "Sample panels out", value: "6" },
      { label: "Pilot floors", value: "3" },
    ],
    logo: "/logos/earthsprint.webp",
    service: "build-with-us",
    clientType: "Startup",
    region: "India",
    domain: "Product website and enquiry-to-pilot portal",
    techStack: ["HTML/CSS + vanilla JS", "Node.js", "PostgreSQL", "WhatsApp Business API", "Cloudflare"],
    duration: "8 weeks",
    team: "3 people: PM and designer, full-stack dev, QA",
    about:
      "EarthSprint Solutions, based in Nashik, makes industrial materials from raw rice husk. Its proprietary low-temperature reactor turns husk into silica of up to 99% SiO₂ with ultra-low alkali, which goes into KisanKrete, a mineral floor coating for industrial floors where epoxy fails under heat, chemical spills or slab moisture. A low-carbon cement alternative (KisanKrete Binder) is in development, and the silica is being explored as a feedstock for battery anode materials.",
    problems: [
      f("One raw material, four markets.", "Coatings, silica, a binder and battery anodes each needed their own story without confusing buyers."),
      f("Industrial buyers want proof.", "Plant managers ask for a sample panel or a call before they consider a pilot floor."),
      f("Enquiries everywhere.", "Requests came by email, phone and WhatsApp, with no record of what was sent or promised."),
      f("Pilots need follow-up.", "Each pilot floor has a site, a substrate and tests to schedule."),
    ],
    solution:
      "We built the current earthsprintsolutions.com and the portal behind it. The website leads with KisanKrete, the floor coating for floors where epoxy fails, then explains the silica, the binder and the battery-anode work, each on its own page, with the husk-to-floor process in four steps. Every page ends with two ways to start: request a sample panel, or leave a number for a call back on the phone or WhatsApp. In the portal, each request lands with the product of interest; sample panels are tracked to delivery, calls are logged, and promising leads become pilot floors with the site, area, substrate and the tests planned. Silica data-sheet requests are handled in the same place.",
    features: [
      f("Product-led website", "KisanKrete first, then silica, the binder and battery anodes, each with its own page."),
      f("Sample panels", "Requests with colour and address, tracked from dispatch to delivery."),
      f("Call backs", "Number, product and WhatsApp preference, logged with the outcome."),
      f("Pilot floors", "Site, area, substrate, the problem with the current floor, and the tests planned."),
      f("Data-sheet requests", "Silica data sheets sent and recorded per buyer."),
      f("One enquiry record", "Everything a buyer asked for and received, in one place."),
    ],
    challenges: [
      f("Technical without jargon", "The site explains why mineral coatings survive heat and moisture in plain words, with the lab results left for the data sheet."),
      f("WhatsApp-first buyers", "Call-back requests can choose WhatsApp, and the team replies from the same record."),
      f("Fast on site", "Light pages that load quickly for plant managers on mobile data."),
    ],
    approach: [
      p("Discovery", "Weeks 1–2", "Mapped each product's buyer and how a pilot floor gets agreed."),
      p("Website", "Weeks 3–5", "Built the product pages, the husk-to-floor story and the request forms."),
      p("Portal", "Weeks 6–7", "Requests, sample tracking, pilots and data sheets."),
      p("Launch", "Week 8", "Content, analytics and handover."),
    ],
    results: {
      metrics: [
        { value: "4", label: "markets from one raw material, on one site" },
        { value: "2", label: "ways to start: a sample panel or a call back" },
        { value: "1", label: "portal from enquiry to pilot floor" },
        { value: "Live", label: "at earthsprintsolutions.com" },
      ],
      narrative:
        "EarthSprint has a website that makes a material made from rice husk credible to industrial buyers, and a portal that keeps every sample, call and pilot floor in one record.",
    },
    screenshots: [
      "EarthSprint's website: KisanKrete, the mineral floor coating for floors where epoxy fails",
      "earthsprintsolutions.com on mobile: the home page and rice husk silica",
      "Enquiries: sample panels, call backs and data sheets, by product",
      "Sample panels: colour, address and delivery status",
      "Pilot floors: site, area, substrate and the tests planned",
      "Silica data-sheet requests, per buyer",
      "The website on a laptop, with a WhatsApp call back on a phone",
    ],
    images: [
      { src: "/case-studies/rice-husk-materials-portal-nashik/inner.webp", alt: "EarthSprint website: KisanKrete, a mineral floor coating for floors where epoxy fails, with sample panels", width: 1440, height: 900 },
      { src: "/case-studies/rice-husk-materials-portal-nashik/mobile-site.webp", alt: "EarthSprint website on two phones: the home page and Silica from raw rice husk", width: 1440, height: 900 },
    ],
    website: { url: "https://earthsprintsolutions.com", image: { src: "/sites/earthsprint.webp", alt: "EarthSprint website home page: Floor coatings made with our own rice husk silica", width: 1440, height: 900 } },
    ctaHeading: "Selling a new material to industrial buyers?",
    placeholder: true,
  },

  // Thermal Dawn: Australian home thermal-storage startup (thermaldawn.com, FreeVolt Pty Ltd, Hornsby
  // NSW). Facts from its site, read 23 Nov 2026. Its field figures (evenings with the compressor off,
  // savings, gas and CO₂ avoided) are its own telemetry and are not repeated as VAUG results; its prices
  // and funding are not mentioned. TODO(content): confirm scope, stack, timeline, team, logo consent.
  {
    slug: "home-thermal-storage-platform-australia",
    client: "Thermal Dawn",
    city: "Hornsby, NSW, Australia",
    stage: "Climate-tech startup",
    industry: "Climate · home energy",
    model: "Build With Us",
    icon: "zap",
    title: "A Website, Quote Flow and Home App for Thermal Storage That Replaces Gas",
    summary:
      "The thermaldawn.com website with its home-fit quote flow and live field data, and the homeowner and fleet views behind it: a thermal store that charges when power is cheapest and heats the house through the evening peak.",
    metrics: [
      { value: "3", label: "cheap-power sources planned for: free window, solar, off-peak" },
      { value: "Live", label: "field data on the website, straight from installed systems" },
      { value: "1", label: "quote flow that checks the home fits first" },
    ],
    tint: "#14100d",
    // TODO(content): illustrative; matches the drawn screens.
    screen: [
      { label: "Store charge now", value: "86%" },
      { label: "Compressor off tonight", value: "5–9 pm" },
      { label: "Quote requests this week", value: "23" },
    ],
    logo: "/logos/thermaldawn.webp",
    service: "build-with-us",
    clientType: "Startup",
    region: "Australia",
    domain: "Website, quote flow, homeowner app and fleet telemetry",
    techStack: ["Astro", "TypeScript", "Node.js", "TimescaleDB", "MQTT", "Cloudflare"],
    duration: "12 weeks",
    team: "4 people: PM, designer, full-stack dev, IoT and data engineer",
    about:
      "Thermal Dawn replaces gas boilers in Australian homes with a hydronic heat pump and a thermal store it designs and builds in its own workshop in Hornsby, NSW. The system charges when power is cheapest (a free midday window, the home's own solar or late-night off-peak) and stores it as heating, cooling and hot water, so the house stays warm through the evening peak with the compressor off. It works with existing radiators or a concrete slab, uses no lithium, and its control software learns the home, the solar, the weather and the tariff. It is installed and running in homes in Victoria.",
    problems: [
      f("A new category for homeowners.", "People know batteries and heat pumps, not thermal storage; the site had to explain why stored heat beats a bigger battery."),
      f("Not every home fits.", "Radiators or slab, boiler size and solar all matter, so quotes had to start with a fit check."),
      f("Proof from real homes.", "Buyers wanted evidence from installed systems, not projections."),
      f("Smart, not scheduled.", "Homeowners needed to see the system planning ahead around tariffs, solar and weather."),
    ],
    solution:
      "We built thermaldawn.com, its quote flow and the views behind it. The website explains the solar mismatch and why a home battery isn't built for heating, shows the system, and carries a live field-data panel fed straight from installed systems' telemetry. Quote requests start with a home-fit check: heating type, boiler size, solar, tariff and location, so the team only quotes homes that fit, with nothing to pay until the homeowner approves. Homeowners get an app view of the store's charge, tonight's plan and the cheap-power windows it will use. The team gets a fleet view of every installed system, with alerts and the evening-peak performance of each home.",
    features: [
      f("Explainer website", "The solar mismatch, why batteries aren't built for heating, and how the system runs."),
      f("Live field data", "A panel on the site fed by installed systems' own telemetry."),
      f("Home-fit quote flow", "Heating type, boiler, solar, tariff and location before any quote."),
      f("Homeowner app", "Store charge, tonight's plan and the cheap-power windows, at a glance."),
      f("Fleet telemetry", "Every installed home, with alerts and evening-peak performance."),
      f("Updates list", "Occasional email updates for people not ready to request a quote."),
    ],
    challenges: [
      f("Live numbers you can trust", "The field-data panel reads only measured telemetry and states its baseline and how long it has been running."),
      f("A plan, not a timer", "The app shows why the system will charge when it does (tariff, solar forecast, weather), not just when."),
      f("Fit before price", "The quote flow screens out homes that won't fit before the team spends time on a quote."),
    ],
    approach: [
      p("Discovery", "Weeks 1–2", "Mapped how a home is assessed, quoted and installed, and what the telemetry reports."),
      p("Website", "Weeks 3–6", "Built the site, the explainer pages and the live field-data panel."),
      p("Quote flow and app", "Weeks 7–10", "Home-fit quote flow, homeowner view and fleet telemetry."),
      p("Launch", "Weeks 11–12", "Connected the first installed homes and handed over."),
    ],
    results: {
      metrics: [
        { value: "3", label: "cheap-power sources planned for: free window, solar, off-peak" },
        { value: "Live", label: "field data on the website, straight from installed systems" },
        { value: "1", label: "quote flow that checks the home fits first" },
        { value: "Live", label: "at thermaldawn.com" },
      ],
      narrative:
        "Thermal Dawn has a website that makes thermal storage make sense to a homeowner and backs it with live data from real homes, a quote flow that only spends the team's time on homes that fit, and views that show each house being kept warm on stored heat.",
    },
    screenshots: [
      "Thermal Dawn's Intelligence page: a system that plans ahead, not a timer",
      "thermaldawn.com on mobile: the home page and the hydronic system",
      "Quote flow: the home-fit check before any quote",
      "Homeowner app: store charge, tonight's plan and the cheap-power windows",
      "Fleet: every installed home, with alerts and evening-peak performance",
      "One home's week: when the store charged and when the compressor stayed off",
      "The website on a laptop, with tonight's plan on a phone",
    ],
    images: [
      { src: "/case-studies/home-thermal-storage-platform-australia/inner.webp", alt: "Thermal Dawn website, Intelligence page: Most smart home systems tell you what they did. Thermal Dawn thinks ahead.", width: 1440, height: 900 },
      { src: "/case-studies/home-thermal-storage-platform-australia/mobile-site.webp", alt: "Thermal Dawn website on two phones: Heat by Day, Warm All Night, and the hydronic page", width: 1440, height: 900 },
    ],
    website: { url: "https://www.thermaldawn.com", image: { src: "/sites/thermaldawn.webp", alt: "Thermal Dawn website home page: Heat by Day. Warm All Night.", width: 1440, height: 900 } },
    ctaHeading: "Selling clean energy to homeowners?",
    placeholder: true,
  },

  // VolkCell: AI microscopy image analysis startup (volkcell.com, VolkCell Technologies Ltd, Edinburgh).
  // Facts from its site and guide, read 23 Nov 2026. Its "used by researchers at" list and its demo
  // outputs are its own and are not repeated; its pricing and funding are not mentioned.
  // TODO(content): confirm scope, stack, timeline, team, logo consent.
  {
    slug: "ai-microscopy-image-analysis-edinburgh",
    client: "VolkCell",
    city: "Edinburgh, UK",
    stage: "AI startup",
    industry: "AI · microscopy analysis",
    model: "Build With Us",
    icon: "search",
    title: "A Website and Workspace Where Labs Ask for an Analysis and Check Every Result",
    summary:
      "The volkcell.com website and the signed-in workspace behind it: researchers attach microscopy images, describe the analysis in plain words, check the plan, and get counts, overlays and a method they can repeat and cite.",
    metrics: [
      { value: "5", label: "common assays you can ask for in plain words" },
      { value: "3", label: "images per run to try it, with no account" },
      { value: "1", label: "record per run: plan, method and software version" },
    ],
    tint: "#1f6b7a",
    // TODO(content): illustrative; matches the drawn screens.
    screen: [
      { label: "Runs this week", value: "48" },
      { label: "Images analysed", value: "1,212" },
      { label: "Warnings to review", value: "3" },
    ],
    logo: "/logos/volkcell.webp",
    service: "build-with-us",
    clientType: "Startup",
    region: "UK",
    domain: "Website, analysis chat, results review, run records and model training",
    techStack: ["Next.js", "TypeScript", "Python", "FastAPI", "PyTorch", "PostgreSQL"],
    duration: "14 weeks",
    team: "5 people: PM, designer, full-stack dev, ML engineer, QA",
    about:
      "VolkCell is an image analyst for life-science labs, based in Edinburgh. Researchers attach microscopy images, describe the analysis they need, and get back counts, overlays and the method behind them. It covers cell counts and confluency, wound closure, organoids, cells in suspension and fluorescent nuclei, and says plainly when a request goes beyond what a standard analysis can cover. Anyone can try it without an account, up to 3 images per run, and lab teams, CROs and core facilities can talk to the team about batch runs and models trained on their own images.",
    problems: [
      f("Image analysis is a bottleneck.", "Labs either script it themselves or wait for someone who can; the product had to let a researcher just ask."),
      f("Black-box numbers don't get published.", "Results had to come with masks, warnings and a method a reviewer can check."),
      f("Every lab's images are different.", "Cell type, plate format and imaging vary, so the default model would not always be right."),
      f("Trying before trusting.", "Researchers wanted to test it on their own images before creating an account or talking to anyone."),
    ],
    solution:
      "We built volkcell.com and the workspace behind it. The website lets anyone attach images and ask, with no account, and shows how a request runs: describe the question, check what runs, get the data. In the workspace, a researcher describes the assay in a chat; a routine count starts straight away, while a new workflow comes back as a plan to accept or refine. Results arrive with the counts, measurement CSVs, overlays and plots, plus the masks and any quality warnings, so a doubtful value is flagged rather than hidden. Every run keeps its plan, method and software version, so it can be repeated and cited. Where the default model misses, researchers correct the masks and train a model on their own images.",
    features: [
      f("Try without an account", "Attach up to 3 images per run on the website and ask for an analysis."),
      f("Describe your assay", "A chat that turns a plain description into a configured analysis."),
      f("Check what runs", "New workflows come back as a plan to accept or refine before anything runs."),
      f("Results you can check", "Counts, CSVs, overlays and plots, with masks and quality warnings alongside."),
      f("Run records and citation", "Each run keeps its plan, method and software version, ready to repeat and cite."),
      f("Corrections and training", "Fix masks, then train a model on your own corrected images."),
    ],
    challenges: [
      f("Warnings, not hidden numbers", "Every image is checked; a doubtful value is still returned, with a warning that says what was found."),
      f("Saying what isn't covered", "If a standard analysis can't cover part of a request, the product says which part, instead of guessing."),
      f("Reproducible by default", "Plans, methods and versions are stored with every run, not reconstructed afterwards."),
    ],
    approach: [
      p("Discovery", "Weeks 1–2", "Sat with how labs run counts, scratch assays and organoid sizing today, and what a reviewer asks for."),
      p("Website", "Weeks 3–5", "Built the site with the no-account try-it flow and the how-it-works walkthrough."),
      p("Workspace", "Weeks 6–11", "Analysis chat, plan review, results with masks and warnings, run records and exports."),
      p("Training and launch", "Weeks 12–14", "Mask corrections, custom model training, the guide, and launch."),
    ],
    results: {
      metrics: [
        { value: "5", label: "common assays you can ask for in plain words" },
        { value: "3", label: "images per run to try it, with no account" },
        { value: "1", label: "record per run: plan, method and software version" },
        { value: "Live", label: "at volkcell.com" },
      ],
      narrative:
        "VolkCell has a website where a researcher can try an analysis on their own images in a minute, and a workspace that turns a plain description into a plan, returns results with the masks and warnings to check them, and keeps a record of every run that can go straight into a methods section.",
    },
    screenshots: [
      "VolkCell's how-it-works: describe the question, check what runs, get the data",
      "volkcell.com on mobile: the home page and how a request runs",
      "Ask: attach images, describe the assay, check the plan before it runs",
      "Results: counts and confluency, with masks and a quality warning to review",
      "Wound healing: closure across time points, with the plot and the CSV",
      "Run record: the plan, method and software version, ready to repeat and cite",
      "Corrections: fix a mask, then train a model on your own images",
    ],
    images: [
      { src: "/case-studies/ai-microscopy-image-analysis-edinburgh/inner.webp", alt: "VolkCell website, how it works: Ask. Check. Get the data.", width: 1440, height: 900 },
      { src: "/case-studies/ai-microscopy-image-analysis-edinburgh/mobile-site.webp", alt: "VolkCell website on two phones: From microscopy to measurements, and how a request runs", width: 1440, height: 900 },
    ],
    website: { url: "https://www.volkcell.com", image: { src: "/sites/volkcell.webp", alt: "VolkCell website home page: From microscopy to measurements.", width: 1440, height: 900 } },
    ctaHeading: "Building a tool scientists have to trust?",
    placeholder: true,
  },

  // VunaPay: Kenyan agri-fintech startup (vunapay.com, Nairobi). Facts from its site, read 23 Nov 2026:
  // collect (produce collection synced from IoT devices), manage (farmer records and inventory), payout
  // (transparent farmer payouts), working with Agricultural Cooperative Societies; early access.
  // TODO(content): confirm scope, stack, timeline, team, logo consent, produce and payout channel.
  {
    slug: "smallholder-produce-payments-nairobi",
    client: "VunaPay",
    city: "Nairobi, Kenya",
    stage: "Agri-fintech startup",
    industry: "Fintech · agriculture",
    model: "Build With Us",
    icon: "users",
    title: "A Website and Co-op Platform That Weighs, Records and Pays Smallholder Farmers",
    summary:
      "The vunapay.com website with its early-access sign-up, and the cooperative product behind it: produce weighed and synced from the scale at collection, live records of every farmer and every centre, and payouts each farmer can check.",
    metrics: [
      { value: "3", label: "jobs in one product: collect, manage, payout" },
      { value: "IoT", label: "scale readings synced at collection, not typed" },
      { value: "1", label: "record per farmer: deliveries, deductions, payouts" },
    ],
    tint: "#559265",
    // TODO(content): illustrative; matches the drawn screens.
    screen: [
      { label: "Collected today", value: "12,480 kg" },
      { label: "Farmers in this payout", value: "1,206" },
      { label: "Net to farmers", value: "KES 5.15M" },
    ],
    logo: "/logos/vunapay.webp",
    service: "build-with-us",
    clientType: "Startup",
    region: "Africa",
    domain: "Website, collection app, co-op dashboard and farmer payouts",
    techStack: ["Wix", "React Native", "Node.js", "PostgreSQL", "Bluetooth LE", "SMS"],
    duration: "12 weeks",
    team: "4 people: PM, designer, mobile and full-stack devs",
    about:
      "VunaPay is an agri-fintech startup in Nairobi. It partners with Agricultural Cooperative Societies in Kenya to give smallholder farmers efficient, transparent produce management, so they get the most from what they deliver. Its product covers the three jobs a cooperative does for its members: collecting produce, with readings synced from IoT devices instead of written down; keeping accurate, real-time records on farmers and inventory; and paying farmers transparently for what they delivered. It is in early access.",
    problems: [
      f("Weights written by hand.", "Paper ledgers and typed weights at collection leave room for errors and disputes."),
      f("Payouts nobody can check.", "Farmers wait for a lump sum without seeing how it was worked out."),
      f("No picture across centres.", "A cooperative with several collection centres can't see what came in today, or what's in store."),
      f("Patchy signal.", "Collection centres are often where the mobile signal is weakest."),
    ],
    solution:
      "We built vunapay.com, on Wix so the team can update it themselves, with an early-access sign-up for cooperatives, and the product behind it. At collection, the clerk finds the member on a phone and the weight comes straight from a connected scale, with the grade; the farmer gets an SMS receipt. Deliveries queue on the phone when there's no signal and sync later. The cooperative sees every centre's collections live, every member's deliveries, deductions and payouts, and its stock in store. Payouts are built from the recorded deliveries less approved deductions, checked, approved and sent, and each farmer gets a statement they can check against their receipts.",
    features: [
      f("Early-access website", "What VunaPay does for cooperatives, with a one-field sign-up."),
      f("Collection app", "Find the member, take the weight from the scale, grade it, send a receipt."),
      f("Works offline", "Deliveries queue on the phone and sync when the signal returns."),
      f("Co-op dashboard", "Today's collections by centre, latest deliveries and stock in store."),
      f("Farmer records", "Every member's deliveries, deductions and payouts in one place."),
      f("Payout runs", "Net pay per farmer from recorded deliveries, with checks before sending."),
    ],
    challenges: [
      f("Trust in the number", "Every kilo in a payout traces back to a scale reading and a receipt the farmer already has."),
      f("Built for the collection queue", "Large type, one hand, few taps, so a clerk can keep a morning queue moving."),
      f("Statements in plain words", "SMS receipts and statements show weight, grade, deductions and net, nothing hidden."),
    ],
    approach: [
      p("Discovery", "Weeks 1–2", "Mapped a cooperative's collection day and payout, from scale to statement."),
      p("Website", "Weeks 3–4", "Built the site and the early-access sign-up."),
      p("Collection and records", "Weeks 5–9", "Collection app with scale sync, offline queue, farmer records and the co-op dashboard."),
      p("Payouts and pilot", "Weeks 10–12", "Payout runs, SMS receipts and statements, ready for the first cooperatives."),
    ],
    results: {
      metrics: [
        { value: "3", label: "jobs in one product: collect, manage, payout" },
        { value: "IoT", label: "scale readings synced at collection, not typed" },
        { value: "1", label: "record per farmer: deliveries, deductions, payouts" },
        { value: "Live", label: "at vunapay.com" },
      ],
      narrative:
        "VunaPay has a website that explains its offer to cooperatives and collects early-access sign-ups, and a product that takes a delivery from the scale to the farmer's payout with a receipt at every step, so farmers and their cooperative are looking at the same numbers.",
    },
    screenshots: [
      "VunaPay's services: collect, manage and payout",
      "vunapay.com on mobile: early access and the services",
      "Collection day: each delivery weighed and synced from the scale",
      "Co-op dashboard: every centre's collections, live",
      "One farmer's record: deliveries, deductions and payouts",
      "Payout run: every farmer's net pay, checked before it's sent",
      "The website on a laptop, with SMS receipts on a farmer's phone",
    ],
    images: [
      { src: "/case-studies/smallholder-produce-payments-nairobi/inner.webp", alt: "VunaPay website, services: collect, manage and payout", width: 1440, height: 900 },
      { src: "/case-studies/smallholder-produce-payments-nairobi/mobile-site.webp", alt: "VunaPay website on two phones: Harvesting a better future, and the services", width: 1440, height: 900 },
    ],
    website: { url: "https://www.vunapay.com", image: { src: "/sites/vunapay.webp", alt: "VunaPay website home page: Harvesting a better future, with an early-access sign-up", width: 1440, height: 900 } },
    ctaHeading: "Building fintech for farmers or co-ops?",
    placeholder: true,
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
