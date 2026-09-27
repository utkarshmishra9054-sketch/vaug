import { z } from "zod";

import { engagementOptions, timelineOptions } from "./lead-options.js";

export const leadSchema = z.object({
  name: z.string({ error: "Please enter your name" }).trim().min(2, "Please enter your name").max(100),
  email: z.email("Please enter a valid email").max(200),
  company: z.string().trim().max(150).optional().default(""),
  phone: z.string().trim().max(40).optional().default(""),
  engagement: z.enum(engagementOptions, { error: "Please choose an option" }),
  timeline: z.enum(timelineOptions).optional(),
  message: z.string({ error: "Tell us a little about your project" }).trim().min(10, "Tell us a little more (at least 10 characters)").max(5000),
  // Honeypot: real users never see or fill this field.
  website: z.string().max(0).optional().default(""),
});

export type LeadInput = z.infer<typeof leadSchema>;

export const subscribeSchema = z.object({
  email: z.email("Please enter a valid email").max(200),
});
