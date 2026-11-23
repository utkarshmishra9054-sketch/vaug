import { buildLlmsTxt } from "@/lib/llms";

// Built once at build time from the site's content (see src/lib/llms.ts).
export const dynamic = "force-static";

export async function GET() {
  return new Response(await buildLlmsTxt(), { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
