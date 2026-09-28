import type { ApproachPhase, CaseStudyDetail, Feature } from "../types";

/**
 * Parul University · LinkedIn and social content with paid social.
 *
 * FACT from the 2023 proposal: LinkedIn engagement up 573%. Every other figure
 * below is illustrative and marked with a TODO(content) comment.
 */

const f = (title: string, description: string): Feature => ({ title, description });
const p = (phase: string, when: string, description: string): ApproachPhase => ({ phase, when, description });

export const study: CaseStudyDetail = {
  slug: "linkedin-growth-university-vadodara",
  client: "Parul University",
  city: "Vadodara, India",
  stage: "Enterprise",
  industry: "Education",
  model: "LinkedIn & Social",
  icon: "message-square",
  title: "LinkedIn Content That Lifted Parul University's Engagement by 573%",
  summary:
    "A LinkedIn-first content and paid social programme for Parul University: a weekly content calendar, placement and research stories, and sponsored posts that lifted LinkedIn engagement by 573%.",
  metrics: [
    { value: "+573%", label: "LinkedIn engagement" },
    // TODO(content): illustrative, confirm follower growth with the client.
    { value: "+41,000", label: "new LinkedIn followers" },
    // TODO(content): illustrative, confirm engagement rate with the client.
    { value: "5.2%", label: "average engagement rate" },
  ],
  tint: "#c2410c",
  screen: [
    { label: "LinkedIn engagement", value: "+573%" },
    // TODO(content): illustrative, confirm with the client.
    { label: "New followers", value: "+41,000" },
    // TODO(content): illustrative, confirm with the client.
    { label: "Engagement rate", value: "5.2%" },
  ],
  logo: "/logos/parul-university.webp",
  service: "monthly-retainer",
  // TODO(content): confirm client type.
  clientType: "Enterprise",
  region: "India",
  domain: "LinkedIn and social content with paid social",
  techStack: ["LinkedIn Campaign Manager", "LinkedIn Page Analytics", "Meta Business Suite", "Canva", "Figma", "Looker Studio", "Notion"],
  // TODO(content): illustrative engagement length, confirm with the client.
  duration: "6 months (ongoing)",
  // TODO(content): illustrative team, confirm with the client.
  team: "4 people: social lead, content writer, designer, paid social specialist",
  about:
    "Parul University is a private university in Vadodara, Gujarat, with a large multi-disciplinary campus spanning engineering, medicine, pharmacy, management, law, design and the arts, and a growing number of international students. Its LinkedIn page mattered to prospective students, parents, recruiters and academic partners alike, but it was used mainly for notices and event photos, and posts reached few people beyond existing followers.",
  problems: [
    f("A notice board, not a channel.", "Posts were mostly announcements and event photos with little reach or conversation."),
    f("Many audiences.", "Students, parents, recruiters, alumni and partners all read the page and wanted different things."),
    f("No rhythm.", "Posting was irregular, with no calendar, formats or measure of what worked."),
  ],
  solution:
    "We treated LinkedIn as the university's main professional channel. We set content pillars around placements, research, faculty, student achievement and campus life, and ran a weekly calendar of carousels, short videos, faculty posts and alumni stories written for each audience. Strong organic posts were boosted with sponsored content aimed at prospective students, parents in target cities and recruiters, and a monthly report showed what drove engagement so the calendar kept improving. The same stories were adapted for Instagram and Facebook.",
  features: [
    f("Content pillars", "Placements, research, faculty, student achievement and campus life, each with a clear audience."),
    f("Weekly calendar", "Carousels, short videos, polls and long-form posts planned a month ahead."),
    f("Faculty and alumni voices", "Posts drafted for faculty and alumni to share from their own profiles."),
    f("Sponsored content", "Top organic posts boosted to students, parents and recruiters on LinkedIn."),
    f("Monthly reporting", "Engagement, reach and follower growth by pillar and format."),
  ],
  challenges: [
    f("Approvals", "Content had to pass several departments, so we built a simple monthly approval cycle."),
    f("Raw material", "Stories were scattered across departments; we set up a monthly story round-up with each school."),
    f("Right audience", "Paid posts had to reach prospective students and recruiters, not just existing followers."),
  ],
  approach: [
    p("Audit", "Weeks 1–2", "Reviewed past posts, followers and competitors to find what earned engagement."),
    p("Strategy", "Weeks 2–3", "Defined content pillars, formats, tone and a monthly approval cycle."),
    p("Publish", "Weekly", "Ran the content calendar across LinkedIn, with adapted versions for Instagram and Facebook."),
    p("Amplify", "Monthly", "Boosted the strongest posts with sponsored content for target audiences."),
    p("Report", "Monthly", "Shared engagement by pillar and format and fed the results into the next calendar."),
  ],
  results: {
    metrics: [
      { value: "+573%", label: "LinkedIn engagement" },
      // TODO(content): illustrative, confirm with the client.
      { value: "+41,000", label: "new LinkedIn followers" },
      // TODO(content): illustrative, confirm with the client.
      { value: "2.3M", label: "post impressions" },
      // TODO(content): illustrative, confirm with the client.
      { value: "5.2%", label: "average engagement rate" },
    ],
    // TODO(content): the follower, impression and engagement-rate figures in this narrative are illustrative; confirm with the client.
    narrative:
      "LinkedIn engagement rose by 573% as the page moved from notices to stories people wanted to share. Placement carousels and faculty posts performed best, the page added around 41,000 followers, and posts earned 2.3 million impressions. Sponsored content took the strongest stories to prospective students, parents and recruiters beyond the university's existing network.",
  },
  screenshots: [
    "LinkedIn Page analytics: content highlights and impressions, Jul–Dec 2023",
    "The Placements 2023 document post on Parul University's LinkedIn page",
    "LinkedIn content calendar by pillar in Notion, December 2023",
    "LinkedIn Campaign Manager: sponsored content campaigns, Jul–Dec 2023",
    "LinkedIn content analytics: top posts by engagement rate",
  ],
  website: { url: "https://www.paruluniversity.ac.in", image: { src: "/sites/parul-university.webp", alt: "Parul University website home page", width: 1440, height: 900 } },
  ctaHeading: "Want a LinkedIn page people actually engage with?",
  campaign: true,
  placeholder: true,
};
