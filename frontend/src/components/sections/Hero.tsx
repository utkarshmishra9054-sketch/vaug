import type { Hero as HeroContent } from "@/content/types";
import { Band } from "@/components/ui/Band";
import { ArrowLink } from "@/components/ui/Button";
import { RotatingBadge } from "./RotatingBadge";
import { RotatingWords } from "./RotatingWords";
import { glow } from "@/components/ui/glow";

/** Full-bleed light: drifting colour fields and a faint grid that fades out toward the edges. */
function HeroBackdrop() {
  return (
    <>
      {/* Soft glows are radial gradients, not blur() filters (cheaper to paint; WebKit can fail to paint big blurs). */}
      <div data-parallax="-0.04" className="hero-aurora absolute -left-[14%] -top-[32%] h-[58rem] w-[74%]" style={glow("rgb(124 58 237 / 0.34)")} />
      <div data-parallax="0.03" className="hero-aurora absolute -right-[14%] top-[14%] h-[44rem] w-[58%] [animation-delay:-6s]" style={glow("rgb(255 210 63 / 0.10)")} />
      <div className="hero-aurora absolute bottom-[-42%] left-[22%] h-[42rem] w-[62%] [animation-delay:-11s]" style={glow("rgb(182 156 255 / 0.12)")} />
      <div className="absolute inset-0 opacity-[0.07] [background-image:linear-gradient(rgb(255_255_255)_1px,transparent_1px),linear-gradient(90deg,rgb(255_255_255)_1px,transparent_1px)] [background-size:72px_72px] [mask-image:radial-gradient(ellipse_70%_60%_at_40%_40%,black,transparent)]" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-bg" />
    </>
  );
}

export function Hero({ content }: { content: HeroContent }) {
  return (
    <Band tone="dark" rails={false} dots={false} label="Introduction" backdrop={<HeroBackdrop />}>
      <div className="frame-pad relative pb-56 pt-36 sm:pt-44 lg:pb-64 lg:pt-48">
        <h1 data-reveal className="max-w-5xl text-[2.7rem] leading-[1.06] text-fg sm:text-6xl lg:text-[4.8rem]">
          <span className="font-light">{content.title.light}</span>
          <br />
          <span className="font-semibold">
            <RotatingWords words={content.title.words} />
          </span>
        </h1>

        <div
          data-reveal
          style={{ "--reveal-delay": "150ms" } as React.CSSProperties}
          className="mt-12 grid items-start gap-8 lg:mt-16 lg:grid-cols-2"
        >
          <div className="flex flex-wrap items-center gap-4">
            <ArrowLink href={content.cta.href} className="py-2.5 pl-5 text-base">
              {content.cta.label}
            </ArrowLink>
            <ArrowLink href="/case-studies" variant="outline" className="py-2.5 pl-5 text-base">
              See our work
            </ArrowLink>
          </div>
          <p className="max-w-lg text-lg leading-relaxed text-muted lg:text-xl">{content.subtitle}</p>
        </div>

        <div data-parallax="0.03" className="pointer-events-none absolute -bottom-32 -right-16 size-60 sm:-right-20 sm:size-72 lg:-bottom-40 lg:-right-24 lg:size-[24rem]">
          <RotatingBadge words={content.badgeWords} />
        </div>
      </div>
    </Band>
  );
}
