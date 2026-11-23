/**
 * Inbox categories:
 * - internal: the sender is on vaug.in.
 * - client: the sender matches a buyer in the rules (domain, address or company name, from the leads sheet
 *   and prospects.json, kept on the volume via POST /api/admin/inbox/rules), or the subject names a known RFP.
 * - noise: marketing and automated mail (Hunter.io and the like, bulk or list mail, no-reply senders).
 * - other: everything else.
 */

export type InboxCategory = "client" | "internal" | "noise" | "other";
export const CATEGORIES: InboxCategory[] = ["client", "internal", "noise", "other"];

export type InboxRules = {
  /** Buyers: a domain ("acme.com"), an address ("jo@gmail.com") or a company name ("Acme Health"). */
  clients: string[];
  /** Known RFPs: words or phrases matched against the subject. */
  rfps: string[];
};

export type ClassifyInput = {
  fromName: string;
  fromAddress: string;
  subject: string;
  /** List-Unsubscribe / List-Id present, Precedence bulk or list, or Auto-Submitted. */
  bulk: boolean;
};

const INTERNAL_DOMAINS = ["vaug.in"];

/** Free-mail domains can't identify a buyer on their own; use the full address for those. */
export const FREE_MAIL = new Set(["gmail.com", "googlemail.com", "outlook.com", "hotmail.com", "live.com", "yahoo.com", "icloud.com", "me.com", "aol.com", "proton.me", "protonmail.com", "zoho.com", "gmx.com", "yandex.com", "rediffmail.com"]);

const NOISE_DOMAINS = [
  "hunter.io", "mailchimp.com", "mcsv.net", "mcdlv.net", "list-manage.com", "sendgrid.net", "hubspotemail.net", "hs-email.net",
  "brevo.com", "sendinblue.com", "mailerlite.com", "substack.com", "beehiiv.com", "convertkit.com", "klaviyo.com",
  "intercom-mail.com", "customeriomail.com", "mailgun.org", "apollo.io", "lemlist.com", "instantly.ai", "quora.com", "medium.com",
];
const NOISE_LOCAL = /^(no-?reply|do-?not-?reply|donotreply|newsletters?|news|marketing|notifications?|notify|mailer-daemon|postmaster|digest|updates?|info-?noreply|hello-?noreply)([+._-]|$)/i;

const domainOf = (address: string) => address.split("@")[1]?.toLowerCase() ?? "";
const onDomain = (domain: string, list: string[]) => list.some((d) => domain === d || domain.endsWith(`.${d}`));
const escape = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const containsWords = (haystack: string, needle: string) => new RegExp(`(?<![\\p{L}\\p{N}])${escape(needle)}(?![\\p{L}\\p{N}])`, "iu").test(haystack);

export function classify(msg: ClassifyInput, rules: InboxRules): InboxCategory {
  const address = msg.fromAddress.toLowerCase();
  const domain = domainOf(address);
  if (onDomain(domain, INTERNAL_DOMAINS)) return "internal";

  for (const raw of rules.clients) {
    const entry = raw.trim().toLowerCase();
    if (entry.length < 3) continue;
    if (entry.includes("@")) {
      if (address === entry) return "client";
    } else if (/^[a-z0-9-]+(\.[a-z0-9-]+)+$/.test(entry)) {
      if (!FREE_MAIL.has(entry) && onDomain(domain, [entry])) return "client";
    } else if (containsWords(`${msg.fromName} ${domain.replace(/\./g, " ")} ${msg.subject}`, entry)) {
      return "client";
    }
  }
  if (rules.rfps.some((r) => r.trim().length >= 3 && containsWords(msg.subject, r.trim()))) return "client";

  if (onDomain(domain, NOISE_DOMAINS) || NOISE_LOCAL.test(address.split("@")[0] ?? "") || msg.bulk) return "noise";
  return "other";
}
