/** Shared by the contact form (client) and lead validation (server). */
export const engagementOptions = [
  "AI as a Service",
  "Dedicated Developers",
  "Custom Development",
  "Build With Us",
  "Monthly Retainer",
  "Launch & Rescue",
  "Not sure yet",
] as const;

/** Asked instead of a budget: we never show price bands on the site. */
export const timelineOptions = [
  "As soon as possible",
  "Within a month",
  "In 1–3 months",
  "Just exploring",
] as const;
