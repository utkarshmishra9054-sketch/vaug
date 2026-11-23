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

export const readRules = () => readJsonFile<InboxRules>(path.join(DIR, "rules.json"), { clients: [], rfps: [] });
export const writeRules = (rules: InboxRules) => writeJsonFile(path.join(DIR, "rules.json"), rules);

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
