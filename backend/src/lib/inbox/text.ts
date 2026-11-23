/** Plain-text helpers for the inbox reader: HTML to text, quoted-reply stripping and snippets. */

const ENTITIES: Record<string, string> = { amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", nbsp: " ", ndash: "–", mdash: "—", hellip: "…", rsquo: "’", lsquo: "‘", rdquo: "”", ldquo: "“" };

function decodeEntities(text: string) {
  return text.replace(/&(#x[0-9a-f]+|#\d+|[a-z]+);/gi, (match, code: string) => {
    if (code[0] === "#") {
      const n = code[1].toLowerCase() === "x" ? parseInt(code.slice(2), 16) : parseInt(code.slice(1), 10);
      return Number.isFinite(n) && n > 0 && n < 0x110000 ? String.fromCodePoint(n) : "";
    }
    return ENTITIES[code.toLowerCase()] ?? match;
  });
}

/** A rough but safe HTML-to-text conversion: no markup, scripts or styles survive. */
export function htmlToText(html: string) {
  return decodeEntities(
    html
      .replace(/<(script|style|head|title)[\s\S]*?<\/\1\s*>/gi, "")
      .replace(/<!--[\s\S]*?-->/g, "")
      // Gmail and Outlook wrap the quoted thread in these; mark them so the reply stripper can cut there.
      .replace(/<(blockquote|div)[^>]*(gmail_quote|divRplyFwdMsg|yahoo_quoted|moz-cite-prefix)[^>]*>/gi, "\n\n[[quoted]]\n")
      .replace(/<blockquote[^>]*>/gi, "\n\n[[quoted]]\n")
      .replace(/<br\s*\/?>/gi, "\n")
      .replace(/<\/(p|div|li|tr|h[1-6]|table|ul|ol)>/gi, "\n")
      .replace(/<li[^>]*>/gi, "- ")
      .replace(/<[^>]+>/g, ""),
  )
    .replace(/[ \t\f\v ]+/g, " ")
    .replace(/ *\n */g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

const REPLY_HEADERS = [
  /^\[\[quoted\]\]$/,
  /^On .{4,300}wrote:$/i,
  /^-{2,}\s*Original Message\s*-{2,}$/i,
  /^-{2,}\s*Forwarded message\s*-{2,}$/i,
  /^_{8,}$/,
  /^Le .{4,300}a écrit ?:$/i,
  /^Am .{4,300}schrieb .{0,200}:$/i,
];

/** The new part of a message: drops the quoted thread, "On … wrote:" blocks, Outlook headers and "> " lines. */
export function stripQuoted(text: string) {
  const lines = text.replace(/\r\n?/g, "\n").split("\n");
  const kept: string[] = [];
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    // Gmail sometimes breaks "On …, <x@y>" and "wrote:" over two lines.
    const joined = i + 1 < lines.length ? `${line} ${lines[i + 1].trim()}` : line;
    if (REPLY_HEADERS.some((re) => re.test(line)) || (/^On .{4,300}$/i.test(line) && /wrote:$/i.test(joined))) break;
    // Outlook: "From: …" followed within a few lines by "Sent:" or "Date:".
    if (/^From: /i.test(line) && lines.slice(i + 1, i + 5).some((l) => /^(Sent|Date): /i.test(l.trim()))) break;
    if (line.startsWith(">")) continue;
    kept.push(lines[i]);
  }
  return kept.join("\n").replace(/\n{3,}/g, "\n\n").trim();
}

export function snippet(text: string, max: number) {
  const clean = text.replace(/\n{3,}/g, "\n\n").trim();
  if (clean.length <= max) return clean;
  const cut = clean.slice(0, max);
  const space = cut.lastIndexOf(" ");
  return `${(space > max * 0.8 ? cut.slice(0, space) : cut).trimEnd()}…`;
}
