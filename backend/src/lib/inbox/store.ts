import { mkdir, readdir, readFile, rename, rm, writeFile } from "node:fs/promises";
import path from "node:path";

import type { InboxCategory, InboxRules } from "./classify.js";

/**
 * Inbox records on the API's volume (DATA_DIR, /data on Railway), under inbox/:
 * - messages/<uidValidity>-<uid>.json: one compact record per message (no full body, no attachments);
 * - state.json: last UID seen and the last run's counts (no content);
 * - rules.json: buyer domains/names and RFP keywords used to spot client mail.
 */

const DIR = path.join(process.env.DATA_DIR ?? path.join(process.cwd(), "data"), "inbox");
const MESSAGES = path.join(DIR, "messages");

export type Address = { name: string; address: string };

export type InboxRecord = {
  id: string;
  uid: number;
  uidValidity: string;
  date: string;
  from: Address;
  to: Address[];
  cc: Address[];
  subject: string;
  /** First ~800 characters of the new text, quoted replies stripped. Untrusted content. */
  snippet: string;
  attachments: { name: string; size: number }[];
  messageId: string;
  category: InboxCategory;
  /** Kept so the category can be worked out again when the rules change. */
  bulk: boolean;
  fetchedAt: string;
};

export type InboxState = {
  uidValidity?: string;
  lastUid: number;
  lastRunAt?: string;
  lastOkAt?: string;
  lastNew?: number;
  lastCategories?: Partial<Record<InboxCategory, number>>;
  lastError?: string;
};

async function readJsonFile<T>(file: string, fallback: T): Promise<T> {
  try {
    return JSON.parse(await readFile(file, "utf8")) as T;
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") return fallback;
    throw error;
  }
}

async function writeJsonFile(file: string, data: unknown) {
  await mkdir(path.dirname(file), { recursive: true });
  const tmp = `${file}.${process.pid}.tmp`;
  await writeFile(tmp, JSON.stringify(data, null, 2));
  await rename(tmp, file);
}

export const readState = () => readJsonFile<InboxState>(path.join(DIR, "state.json"), { lastUid: 0 });
export const writeState = (state: InboxState) => writeJsonFile(path.join(DIR, "state.json"), state);

/**
 * Default client rules come from the INBOX_RULES variable on vaug-api ({"clients": [...], "rfps": [...]}),
 * generated locally from the private outreach files by scripts/inbox-rules-from-outreach.mjs. They are kept
 * out of git because the repository is public. Rules saved through POST /api/admin/inbox/rules override them.
 */
let envRulesCache: { raw: string; rules: InboxRules | null } | null = null;
function envRules(): InboxRules | null {
  const raw = process.env.INBOX_RULES ?? "";
  if (envRulesCache?.raw === raw) return envRulesCache.rules;
  let rules: InboxRules | null = null;
  if (raw.trim()) {
    try {
      const data = JSON.parse(raw) as Partial<InboxRules>;
      const strings = (v: unknown) => (Array.isArray(v) ? v.filter((x): x is string => typeof x === "string") : []);
      rules = { clients: strings(data.clients), rfps: strings(data.rfps) };
    } catch {
      console.error("inbox: INBOX_RULES is not valid JSON; ignoring it");
    }
  }
  envRulesCache = { raw, rules };
  return rules;
}

export async function readRulesWithSource(): Promise<{ rules: InboxRules; source: "saved" | "default" | "none" }> {
  const saved = await readJsonFile<InboxRules | null>(path.join(DIR, "rules.json"), null);
  if (saved) return { rules: saved, source: "saved" };
  const defaults = envRules();
  return defaults ? { rules: defaults, source: "default" } : { rules: { clients: [], rfps: [] }, source: "none" };
}

export const readRules = async () => (await readRulesWithSource()).rules;
export const writeRules = (rules: InboxRules) => writeJsonFile(path.join(DIR, "rules.json"), rules);
/** Drops the saved rules, so the INBOX_RULES defaults apply again. */
export const clearSavedRules = () => rm(path.join(DIR, "rules.json"), { force: true });

export const saveRecord = (record: InboxRecord) => writeJsonFile(path.join(MESSAGES, `${record.id}.json`), record);

export async function readRecord(id: string) {
  if (!/^\d+-\d+$/.test(id)) return null;
  return readJsonFile<InboxRecord | null>(path.join(MESSAGES, `${id}.json`), null);
}

export async function listRecords(): Promise<InboxRecord[]> {
  let files: string[];
  try {
    files = (await readdir(MESSAGES)).filter((f) => f.endsWith(".json"));
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") return [];
    throw error;
  }
  const records = await Promise.all(files.map((f) => readJsonFile<InboxRecord | null>(path.join(MESSAGES, f), null).catch(() => null)));
  return records.filter((r): r is InboxRecord => r !== null).sort((a, b) => b.date.localeCompare(a.date) || b.uid - a.uid);
}

/** Deletes records whose message date is older than `days`. Returns how many were removed. */
export async function pruneRecords(days: number) {
  const cutoff = new Date(Date.now() - days * 86_400_000).toISOString();
  const old = (await listRecords()).filter((r) => r.date < cutoff);
  await Promise.all(old.map((r) => rm(path.join(MESSAGES, `${r.id}.json`), { force: true })));
  return old.length;
}
