import type { Manifesto as ManifestoContent } from "@/content/types";
import { Band } from "@/components/ui/Band";
import { TagPile } from "./TagPile";

/** Renders "**bold**" segments as <strong>. */
function withBold(text: string) {
  return text.split(/(\*\*[^*]+\*\*)/g).map((part, i) =>
    part.startsWith("**") ? (
      <strong key={i} className="font-semibold text-fg">
        {part.slice(2, -2)}
      </strong>
    ) : (
      part
    ),
  );
}

export function Manifesto({ content }: { content: ManifestoContent }) {
  const [before] = content.title.split(content.highlight);

  return (
    <Band tone="light" label="Why VAUG">
      <div className="frame-pad pt-24 lg:pt-32">
        <h2 data-reveal className="max-w-5xl text-3xl font-semibold leading-[1.12] text-fg sm:text-4xl lg:text-[2.9rem]">
          {before}
          <span className="mark">{content.highlight}</span>
        </h2>
        <p data-reveal className="mt-6 text-lg text-muted sm:text-xl">
          {withBold(content.subtitle)}
        </p>
      </div>
      <div className="px-2 sm:px-8 lg:pl-[12%] lg:pr-6">
        <TagPile tags={content.tags} />
      </div>
    </Band>
  );
}
