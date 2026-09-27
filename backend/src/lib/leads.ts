
import { randomUUID } from "node:crypto";

import { appendRecord, readRecords } from "./store.js";
import type { LeadInput } from "./validation.js";

export interface Lead extends Omit<LeadInput, "website"> {
  id: string;
  createdAt: string;
  source: string;
}

export async function listLeads(): Promise<Lead[]> {
  const leads = await readRecords<Lead>("leads");
  return leads.toSorted((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export async function createLead(input: LeadInput, source: string): Promise<Lead> {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars -- drop the honeypot field
  const { website, ...fields } = input;
  const lead: Lead = { ...fields, id: randomUUID(), createdAt: new Date().toISOString(), source };
  await appendRecord("leads", lead);
  await notify(`New VAUG lead: ${lead.name} <${lead.email}> — ${lead.engagement}`, lead);
  return lead;
}

export async function listSubscribers(): Promise<Subscriber[]> {
  const subs = await readRecords<Subscriber>("subscribers");
  return subs.toSorted((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export interface Subscriber {
  email: string;
  createdAt: string;
}

/** Returns false when the email is already subscribed. */
export async function addSubscriber(email: string) {
  const normalized = email.trim().toLowerCase();
  const added = await appendRecord<Subscriber>(
    "subscribers",
    { email: normalized, createdAt: new Date().toISOString() },
    (s) => s.email === normalized,
  );
  if (added) await notify(`New VAUG newsletter subscriber: ${normalized}`, { email: normalized });
  return added;
}

/** Hook for email / Slack / CRM notifications. Set LEAD_WEBHOOK_URL to enable. */
async function notify(text: string, payload: unknown) {
  const webhook = process.env.LEAD_WEBHOOK_URL;
  if (!webhook) return;
  try {
    await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text, payload }),
    });
  } catch (error) {
    console.error("Webhook notification failed", error);
  }
}
