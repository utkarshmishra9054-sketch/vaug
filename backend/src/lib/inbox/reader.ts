import { ImapFlow, type FetchMessageObject, type MailboxObject, type MessageAddressObject, type MessageStructureObject } from "imapflow";

import { classify, type InboxCategory, type InboxRules } from "./classify.js";
import { imapConfig, inboxSettings, type ImapConfig } from "./config.js";
import { listRecords, pruneRecords, readRules, readState, saveRecord, writeState, type Address, type InboxRecord } from "./store.js";
import { htmlToText, snippet, stripQuoted } from "./text.js";

/**
 * Strictly read-only IMAP access to the inbox:
 * - INBOX is opened with EXAMINE (read-only), so the server itself refuses any flag change;
 * - message parts are read with BODY.PEEK, so nothing is marked as read;
 * - this module never stores flags, copies, moves, deletes, expunges, appends or sends.
 * Email content is untrusted data from outside senders. It is stored and returned as text only, never acted on.
 * Logs carry counts and error codes only: no addresses, subjects, bodies or credentials.
 */

const BULK_HEADERS = ["list-unsubscribe", "list-id", "precedence", "auto-submitted"];

function connect(cfg: ImapConfig) {
  const client = new ImapFlow({
    host: cfg.host,
    port: cfg.port,
    secure: cfg.secure,
    auth: { user: cfg.user, pass: cfg.pass },
    logger: false,
    disableAutoIdle: true,
    missingIdleCommand: "NOOP",
    connectionTimeout: 30_000,
    greetingTimeout: 15_000,
    socketTimeout: 120_000,
  });
  // Connection errors also reject the pending command; this only keeps the process from crashing on them.
  client.on("error", () => {});
  return client;
}

export class InboxOffError extends Error {}

/** Opens INBOX read-only for the length of `fn`, then logs out. */
async function withInbox<T>(fn: (client: ImapFlow, mailbox: MailboxObject) => Promise<T>): Promise<T> {
  const cfg = imapConfig();
  if (!cfg) throw new InboxOffError("Inbox reader is not configured");
  const client = connect(cfg);
  await client.connect();
  try {
    const lock = await client.getMailboxLock("INBOX", { readOnly: true });
    try {
      const mailbox = client.mailbox;
      if (!mailbox || !mailbox.readOnly) throw new Error("INBOX did not open read-only");
      return await fn(client, mailbox);
    } finally {
      lock.release();
    }
  } finally {
    await client.logout().catch(() => client.close());
  }
}

/* Message structure ---------------------------------------------------------------------------- */

const isMultipart = (p: MessageStructureObject) => p.type.toLowerCase().startsWith("multipart/");
const isEmbeddedMessage = (p: MessageStructureObject) => p.type.toLowerCase() === "message/rfc822";
const fileName = (p: MessageStructureObject) => p.dispositionParameters?.filename ?? p.parameters?.name ?? "";
const isAttachment = (p: MessageStructureObject) =>
  !isMultipart(p) && (isEmbeddedMessage(p) || p.disposition?.toLowerCase() === "attachment" || Boolean(fileName(p)));

/** Every leaf part, without descending into attached emails. */
function leaves(node: MessageStructureObject, out: MessageStructureObject[] = []) {
  if (isMultipart(node)) node.childNodes?.forEach((child) => leaves(child, out));
  else out.push(node);
  return out;
}

/** The part holding the message text: plain text if there is one, else HTML. */
function textPart(root: MessageStructureObject) {
  const parts = leaves(root).filter((p) => !isAttachment(p));
  const pick = parts.find((p) => p.type.toLowerCase() === "text/plain") ?? parts.find((p) => p.type.toLowerCase() === "text/html");
  // A single-part message has no part number; "text" is its body.
  return pick ? { part: pick.part ?? "text", html: pick.type.toLowerCase() === "text/html" } : null;
}

function attachments(root: MessageStructureObject) {
  return leaves(root)
    .filter(isAttachment)
    .slice(0, 50)
    .map((p) => ({
      name: (fileName(p) || (isEmbeddedMessage(p) ? "forwarded message.eml" : "unnamed")).slice(0, 200),
      // Encoded size from the server; base64 is about 4/3 of the file, so report the decoded estimate.
      size: Math.round((p.size ?? 0) * (p.encoding?.toLowerCase() === "base64" ? 0.75 : 1)),
    }));
}

async function readText(client: ImapFlow, uid: number, part: { part: string; html: boolean }, maxBytes: number) {
  const download = await client.download(String(uid), part.part, { uid: true, maxBytes });
  if (!download.content) return { text: "", truncated: false };
  const chunks: Buffer[] = [];
  let total = 0;
  for await (const chunk of download.content) {
    chunks.push(chunk as Buffer);
    total += (chunk as Buffer).length;
  }
  const raw = Buffer.concat(chunks).toString("utf8");
  return { text: part.html ? htmlToText(raw) : raw.replace(/\r\n?/g, "\n"), truncated: total >= maxBytes };
}

/* Records ---------------------------------------------------------------------------------------- */

const clip = (s: string | undefined, max: number) => (s ?? "").replace(/[\r\n\t]+/g, " ").trim().slice(0, max);
const address = (a: MessageAddressObject | undefined): Address => ({ name: clip(a?.name, 200), address: clip(a?.address, 320).toLowerCase() });
const toIso = (d: Date | string | undefined) => {
  const date = d ? new Date(d) : new Date();
  return Number.isNaN(date.getTime()) ? new Date().toISOString() : date.toISOString();
};

function isBulk(headers: Buffer | undefined) {
  const h = headers?.toString("utf8") ?? "";
  return /^list-(unsubscribe|id):/im.test(h) || /^precedence:\s*(bulk|list|junk)/im.test(h) || /^auto-submitted:\s*(?!no\b)\S/im.test(h);
}

async function toRecord(client: ImapFlow, msg: FetchMessageObject, uidValidity: string, rules: InboxRules): Promise<InboxRecord> {
  const env = msg.envelope ?? {};
  const from = address(env.from?.[0]);
  const subject = clip(env.subject, 500);
  const bulk = isBulk(msg.headers);
  let text = "";
  const part = msg.bodyStructure ? textPart(msg.bodyStructure) : null;
  if (part) {
    try {
      text = (await readText(client, msg.uid, part, 128 * 1024)).text;
    } catch {
      text = "(The text of this message could not be read.)";
    }
  }
  return {
    id: `${uidValidity}-${msg.uid}`,
    uid: msg.uid,
    uidValidity,
    date: toIso(env.date ?? msg.internalDate),
    from,
    to: (env.to ?? []).slice(0, 50).map(address),
    cc: (env.cc ?? []).slice(0, 50).map(address),
    subject,
    snippet: snippet(stripQuoted(text), inboxSettings.snippetChars),
    attachments: msg.bodyStructure ? attachments(msg.bodyStructure) : [],
    messageId: clip(env.messageId, 300),
    category: classify({ fromName: from.name, fromAddress: from.address, subject, bulk }, rules),
    bulk,
    fetchedAt: new Date().toISOString(),
  };
}

/* Polling ---------------------------------------------------------------------------------------- */

export type PollResult = { fetched: number; categories: Partial<Record<InboxCategory, number>>; expired: number };

function errorCode(error: unknown) {
  const e = error as { authenticationFailed?: boolean; code?: string; name?: string };
  if (e?.authenticationFailed) return "authentication failed";
  if (error instanceof InboxOffError) return "not configured";
  return e?.code ?? e?.name ?? "error";
}

async function runPoll(): Promise<PollResult> {
  const state = await readState();
  const startedAt = new Date().toISOString();
  try {
    const result = await withInbox(async (client, mailbox) => {
      const uidValidity = String(mailbox.uidValidity);
      // First run, or the server renumbered the mailbox: read the last few days, then carry on from there.
      const reset = state.uidValidity !== uidValidity || !state.lastUid;
      const found = reset
        ? await client.search({ since: new Date(Date.now() - inboxSettings.backfillDays * 86_400_000) }, { uid: true })
        : await client.search({ uid: `${state.lastUid + 1}:*` }, { uid: true });
      const all = (found || []).filter((uid) => reset || uid > state.lastUid).sort((a, b) => a - b);
      const uids = reset ? all.slice(-inboxSettings.maxPerRun) : all.slice(0, inboxSettings.maxPerRun);

      const rules = await readRules();
      const categories: PollResult["categories"] = {};
      let lastUid = reset ? Math.max(0, mailbox.uidNext - 1) : state.lastUid;
      if (uids.length) {
        // Fetch the summaries first, then read the text parts: imapflow can't run commands inside a fetch loop.
        const messages = await client.fetchAll(
          uids.join(","),
          { uid: true, envelope: true, bodyStructure: true, internalDate: true, headers: BULK_HEADERS },
          { uid: true },
        );
        for (const msg of messages.sort((a, b) => a.uid - b.uid)) {
          const record = await toRecord(client, msg, uidValidity, rules);
          await saveRecord(record);
          categories[record.category] = (categories[record.category] ?? 0) + 1;
          if (!reset) lastUid = Math.max(lastUid, msg.uid);
        }
      }
      return { uidValidity, lastUid, fetched: uids.length, categories };
    });
    const expired = await pruneRecords(inboxSettings.retentionDays);
    await writeState({
      uidValidity: result.uidValidity,
      lastUid: result.lastUid,
      lastRunAt: startedAt,
      lastOkAt: new Date().toISOString(),
      lastNew: result.fetched,
      lastCategories: result.categories,
    });
    const breakdown = (["client", "internal", "noise", "other"] as const).map((c) => `${c} ${result.categories[c] ?? 0}`).join(", ");
    console.log(`inbox: ${result.fetched} new (${breakdown})${expired ? `, ${expired} expired` : ""}`);
    return { fetched: result.fetched, categories: result.categories, expired };
  } catch (error) {
    const code = errorCode(error);
    await writeState({ ...state, lastRunAt: startedAt, lastError: code }).catch(() => {});
    console.error(`inbox: poll failed (${code})`);
    throw error;
  }
}

let running: Promise<PollResult> | null = null;

/** Reads new mail since the last run. Concurrent calls share one run. */
export function pollInbox() {
  running ??= runPoll().finally(() => {
    running = null;
  });
  return running;
}

/** The full plain text of one message the reader has already seen, fetched read-only on demand. */
export async function fetchBody(record: InboxRecord) {
  return withInbox(async (client, mailbox) => {
    if (String(mailbox.uidValidity) !== record.uidValidity) return null;
    const msg = await client.fetchOne(String(record.uid), { uid: true, bodyStructure: true }, { uid: true });
    if (!msg || !msg.bodyStructure) return null;
    const part = textPart(msg.bodyStructure);
    if (!part) return { text: "", truncated: false };
    return readText(client, record.uid, part, inboxSettings.maxBodyBytes);
  });
}

export async function inboxStatus() {
  const state = await readState();
  const records = await listRecords();
  return {
    configured: imapConfig() !== null,
    pollMinutes: inboxSettings.pollMinutes,
    stored: records.length,
    lastRunAt: state.lastRunAt ?? null,
    lastOkAt: state.lastOkAt ?? null,
    lastNew: state.lastNew ?? null,
    lastCategories: state.lastCategories ?? null,
    lastError: state.lastError && (!state.lastOkAt || state.lastOkAt < (state.lastRunAt ?? "")) ? state.lastError : null,
  };
}

/** Starts polling every INBOX_POLL_MINUTES (15 by default). Does nothing when the IMAP settings are missing. */
export function startInboxReader() {
  if (!imapConfig()) return;
  const run = () => void pollInbox().catch(() => {});
  setTimeout(run, 15_000).unref();
  setInterval(run, inboxSettings.pollMinutes * 60_000).unref();
  console.log(`inbox: reader on, every ${inboxSettings.pollMinutes} min`);
}
