import type { ApproachPhase, CaseStudyDetail, Feature } from "../types";

/**
 * Amity University · admissions campaigns (Google Ads + Meta Ads + landing pages).
 *
 * FACTS confirmed by the owner: VAUG ran the admissions campaigns end to end,
 * from building the landing pages to running Google Ads and Meta Ads, and the
 * campaigns drove 10,000+ enquiries. Every other figure below is illustrative
 * and marked with a TODO(content) comment.
 */

const f = (title: string, description: string): Feature => ({ title, description });
const p = (phase: string, when: string, description: string): ApproachPhase => ({ phase, when, description });

export const study: CaseStudyDetail = {
  slug: "admissions-campaigns-university-noida",
  client: "Amity University",
  city: "Noida, India",
  stage: "Enterprise",
  industry: "Education",
  model: "Google & Meta Ads",
  icon: "trending-up",
  title: "Admissions Campaigns That Brought Amity University 10,000+ Enquiries",
  summary:
    "End-to-end admissions campaigns for Amity University: course landing pages, Google Ads and Meta Ads, run as one programme that drove more than 10,000 enquiries.",
  metrics: [
    { value: "10,000+", label: "admissions enquiries" },
    // TODO(content): illustrative, confirm cost per enquiry with the client.
    { value: "₹305", label: "average cost per enquiry" },
    // TODO(content): illustrative, confirm landing-page conversion rate with the client.
    { value: "9.8%", label: "landing-page conversion" },
  ],
  tint: "#1d3f8f",
  screen: [
    { label: "Enquiries", value: "10,000+" },
    // TODO(content): illustrative, confirm with the client.
    { label: "Cost per enquiry", value: "₹305" },
    // TODO(content): illustrative, confirm with the client.
    { label: "Landing-page conversion", value: "9.8%" },
  ],
  logo: "/logos/amity-university.webp",
  service: "monthly-retainer",
  // TODO(content): confirm client type.
  clientType: "Enterprise",
  region: "India",
  domain: "Admissions campaigns: landing pages, Google Ads and Meta Ads",
  techStack: ["Google Ads", "Meta Ads Manager", "GA4", "Google Tag Manager", "Looker Studio", "Next.js", "Google Sheets"],
  // TODO(content): illustrative campaign length, confirm with the client.
  duration: "16 weeks per admissions cycle",
  // TODO(content): illustrative team, confirm with the client.
  team: "5 people: campaign lead, performance marketer, designer, developer, analyst",
  about:
    "Amity University is one of India's largest private universities, with its main campus in Noida and programmes across engineering, management, law, design, media and the sciences. Every admissions season it competes with dozens of universities for the attention of students and parents searching for the right course. Amity wanted a single team to run its admissions campaigns end to end, from the pages students land on to the ads that bring them there.",
  problems: [
    f("A crowded admissions season.", "Students compare many universities at once, and the same course keywords are bid on by every competitor."),
    f("Many courses, one budget.", "Spend had to be spread across programmes and cities without starving the courses that needed seats filled."),
    f("Clicks that become enquiries.", "Generic pages lost interest; each course needed a page that answered its questions and captured the enquiry."),
  ],
  solution:
    "We ran the admissions campaigns as one programme. We built fast, course-specific landing pages with short enquiry forms, then launched Google Search campaigns on course and \"admissions open\" keywords alongside Meta Ads that reached students and parents on Instagram and Facebook with feed, story and lead-form creatives. Every enquiry was tagged by course, city and channel and fed into a shared lead dashboard, so the admissions team could follow up quickly and we could move budget each week towards the courses and cities that converted best.",
  features: [
    f("Course landing pages", "Fast pages per programme with fees, eligibility, placements and a short enquiry form."),
    f("Google Search campaigns", "Course, brand and \"admission\" keywords with geo-targeting and ad extensions."),
    f("Meta Ads", "Feed, story and instant-form ads for students and parents on Instagram and Facebook."),
    f("Lead tracking", "Every enquiry tagged by course, city and channel through GA4 and Tag Manager."),
    f("Weekly optimisation", "Budget, bids and creatives shifted each week towards what converted."),
  ],
  challenges: [
    f("Competitive keywords", "Course searches are contested by every university, so ad quality and landing-page relevance had to keep costs down."),
    f("Seasonal peaks", "Enquiries cluster around results days and deadlines, so budgets had to flex week by week."),
    f("Enquiry quality", "Forms and targeting had to bring genuine applicants, not just form fills."),
  ],
  approach: [
    p("Plan", "Weeks 1–2", "Mapped priority courses, cities and deadlines with the admissions team and set enquiry targets."),
    p("Landing pages", "Weeks 2–3", "Designed and built course-specific landing pages with tracked enquiry forms."),
    p("Launch", "Week 4", "Launched Google Search and Meta campaigns with course-level ad groups and creatives."),
    p("Optimise", "Weekly", "Moved budget, refined keywords and refreshed creatives based on cost per enquiry."),
    p("Report", "Ongoing", "Shared a live lead dashboard by course, city and channel with the admissions team."),
  ],
  results: {
    metrics: [
      { value: "10,000+", label: "admissions enquiries" },
      // TODO(content): illustrative, confirm with the client.
      { value: "₹305", label: "average cost per enquiry" },
      // TODO(content): illustrative, confirm with the client.
      { value: "9.8%", label: "landing-page conversion" },
      // TODO(content): illustrative, confirm with the client.
      { value: "6.4%", label: "search click-through rate" },
    ],
    // TODO(content): the channel split, CTR and conversion figures in this narrative are illustrative; confirm with the client.
    narrative:
      "Running the landing pages and the ads as one programme drove more than 10,000 admissions enquiries. Course-specific pages converted close to one visitor in ten, search ads held a 6.4% click-through rate on contested course keywords, and Google and Meta together kept the average cost per enquiry near ₹305. The admissions team worked from a single dashboard showing every enquiry by course, city and channel.",
  },
  screenshots: [
    "Google Ads: admissions search campaigns, Jan–Mar 2025",
    "Meta ads on Facebook and Instagram: feed and Story creatives",
    "B.Tech admissions landing page with the enquiry form",
    "Meta Ads Manager: lead campaigns for students and parents, Jan–Mar 2025",
    "Google search for “btech admission 2025 noida” with Amity's sponsored result",
  ],
  website: { url: "https://www.amity.edu", image: { src: "/sites/amity-university.webp", alt: "Amity University website home page", width: 1440, height: 900 } },
  ctaHeading: "Need more enquiries this admissions season?",
  campaign: true,
  placeholder: true,
};
