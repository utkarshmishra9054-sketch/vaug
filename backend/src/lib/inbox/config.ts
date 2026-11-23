/**
 * Read-only inbox reader for utkarsh@vaug.in (IMAP). Off unless all four IMAP_* variables are set on the
 * API service; Utkarsh sets them in Railway himself. Never log or return these values.
 */

export type ImapConfig = { host: string; port: number; secure: boolean; user: string; pass: string };

export function imapConfig(): ImapConfig | null {
  const { IMAP_HOST: host, IMAP_PORT: port, IMAP_USER: user, IMAP_PASS: pass, IMAP_TLS: tls } = process.env;
  if (!host || !port || !user || !pass) return null;
  const portNumber = Number(port);
  if (!Number.isInteger(portNumber) || portNumber <= 0) return null;
  // 993 is implicit TLS. IMAP_TLS=false is only for the local mock server in scripts/inbox-mock-test.ts.
  return { host, port: portNumber, secure: tls ? tls !== "false" : portNumber === 993, user, pass };
}

const num = (value: string | undefined, fallback: number) => (value && Number(value) > 0 ? Number(value) : fallback);

export const inboxSettings = {
  /** How often to look for new mail. */
  pollMinutes: num(process.env.INBOX_POLL_MINUTES, 15),
  /** On the first run (or if the mailbox is reset), how far back to read. */
  backfillDays: num(process.env.INBOX_BACKFILL_DAYS, 7),
  /** Records older than this are deleted. */
  retentionDays: 90,
  /** At most this many messages per run; the rest are picked up on the next run. */
  maxPerRun: 200,
  snippetChars: 800,
  /** Upper bound for a body fetched on demand. */
  maxBodyBytes: 512 * 1024,
};
