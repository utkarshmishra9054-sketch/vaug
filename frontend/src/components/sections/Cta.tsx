import type { CtaBlock } from "@/content/types";
import { ArrowLink } from "@/components/ui/Button";
import { CtaBlocks } from "./CtaBlocks";

export function Cta({ content }: { content: CtaBlock }) {
  return (
    <div className="p-3 sm:p-4">
      <div data-reveal data-blocks-host className="group relative isolate overflow-hidden rounded-lg bg-purple/90 px-6 py-20 text-center text-white sm:py-28">
        {/* geometric shapes */}
        <div aria-hidden="true" className="absolute inset-0 -z-10">
          <div data-parallax="0.03" className="absolute -left-10 top-0 h-40 w-[22rem] bg-white/10 [clip-path:polygon(25%_0,100%_0,75%_100%,0_100%)] transition-transform duration-1000 group-hover:translate-x-6 sm:h-48" />
          <div data-parallax="0.05" className="absolute -right-20 -top-44 size-[22rem] rounded-full bg-white/10 transition-transform duration-1000 group-hover:translate-y-4" />
          <div data-parallax="-0.04" className="absolute -bottom-44 -right-20 size-[22rem] rounded-full bg-yellow/25 transition-transform duration-1000 group-hover:-translate-y-4" />
          <CtaBlocks />
        </div>
        <h2 className="mx-auto max-w-3xl text-3xl leading-tight sm:text-5xl">
          <span className="font-light">{content.title.light}</span>
          <br />
          <span className="font-semibold">{content.title.bold}</span>
        </h2>
        <p className="mx-auto mt-5 max-w-xl font-mono text-xs text-white/75 sm:text-sm">{content.subtitle}</p>
        <div data-blocks-ceiling className="mt-10">
          <ArrowLink href="#contact" variant="light" className="py-2.5 pl-5 text-base">
            {content.button}
          </ArrowLink>
        </div>
      </div>
    </div>
  );
}
