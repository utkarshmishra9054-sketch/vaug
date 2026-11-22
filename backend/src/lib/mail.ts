import nodemailer from "nodemailer";

/**
 * Emails new leads and subscribers to the team inbox over SMTP.
 *
 * Defaults match Hostinger mail (the vaug.in mailboxes). Set SMTP_PASS to the
 * password of the SMTP_USER mailbox to turn it on; without it, mail is skipped
 * and the record is still saved.
 */
const host = process.env.SMTP_HOST ?? "smtp.hostinger.com";
const port = Number(process.env.SMTP_PORT ?? 465);
const user = process.env.SMTP_USER ?? "hello@vaug.in";
const pass = process.env.SMTP_PASS;
const to = process.env.MAIL_TO ?? "hello@vaug.in";

const transport = pass
  ? nodemailer.createTransport({ host, port, secure: port === 465, auth: { user, pass } })
  : null;

export async function sendMail(subject: string, text: string, replyTo?: string): Promise<boolean> {
  if (!transport) {
    console.warn(`SMTP_PASS not set, email skipped: ${subject}`);
    return false;
  }
  try {
    await transport.sendMail({ from: `VAUG Website <${user}>`, to, subject, text, replyTo });
    return true;
  } catch (error) {
    console.error("Email notification failed", error);
    return false;
  }
}
