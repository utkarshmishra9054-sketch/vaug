import type { AiSpotlight as AiSpotlightContent } from "@/content/types";
import { Band } from "@/components/ui/Band";
import { ArrowLink } from "@/components/ui/Button";
import { AgentStory } from "./AgentStory";
import { RevealWordmark } from "./ScrollStory";

export function AiSpotlight({ content }: { content: AiSpotlightContent }) {
  return (
    <>
      <Band tone="light" id="agents" label={content.wordmark}>
        <div className="frame-pad flex flex-col items-center pb-14 pt-24 text-center lg:pb-16 lg:pt-28">
          <RevealWordmark text={content.wordmark} badge={content.badge} />
          <h3 data-reveal className="mt-8 text-2xl font-semibold text-fg sm:text-3xl">
            {content.title}
          </h3>
          <p data-reveal className="mt-4 max-w-3xl text-lg leading-relaxed text-muted">
            {content.description}
          </p>
          <div data-reveal className="mt-10">
            <ArrowLink href={content.cta.href}>{content.cta.label}</ArrowLink>
          </div>
        </div>
        <div className="pb-4 sm:pb-6">
          <AgentStory beats={content.story} />
        </div>
      </Band>
    </>
  );
}
