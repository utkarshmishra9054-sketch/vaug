import type { CapabilityLink } from "@/content/showcases";
import { LinkTiles } from "@/components/page/FeatureGrid";

/** "Try it yourself" tiles linking to capability demos, placed under a page's case studies. */
export function CapabilityLinks({ items, title = "Try it yourself" }: { items: CapabilityLink[]; title?: string }) {
  if (!items.length) return null;
  return (
    <div className="mt-16 lg:mt-20">
      <div className="frame-pad pb-8">
        <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-accent-text">{title}</h3>
        <p className="mt-3 max-w-2xl text-muted">Working demos with invented data, and our own accessibility audit. They show how we build, not client results.</p>
      </div>
      <LinkTiles items={items} columns={2} />
    </div>
  );
}
