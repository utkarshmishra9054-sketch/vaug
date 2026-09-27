import Link from "next/link";

import type { IconName } from "@/content/types";
import { Icon } from "@/components/ui/Icon";

/**
 * Discipline icons orbiting a VAUG core. Each icon links to its page;
 * the orbit pauses on hover or keyboard focus so links are easy to hit.
 */
export function EngineeringOrbit({ items, coreLabel }: { items: { label: string; href: string; icon: IconName }[]; coreLabel: string }) {
  const step = 360 / items.length;
  return (
    <div className="eng-orbit relative mx-auto aspect-square w-full max-w-[26rem] [container-type:inline-size]">
      {/* rings */}
      <div aria-hidden="true" className="absolute inset-[8%] rounded-full border border-dashed border-border-strong" />
      <div aria-hidden="true" className="absolute inset-[26%] rounded-full border border-border" />
      <div aria-hidden="true" className="absolute inset-[26%] rounded-full bg-purple/20 blur-2xl" />

      {/* core */}
      <div className="absolute inset-[34%] flex flex-col items-center justify-center rounded-full border border-border-strong bg-surface text-center shadow-[0_0_60px_-10px_rgb(124_58_237/0.6)]">
        <span className="text-[7cqw] font-black tracking-[-0.05em] text-fg">VAUG</span>
        <span className="mt-1 flex flex-col font-mono text-[2.6cqw] uppercase leading-snug tracking-[0.15em] text-accent-text">
          {coreLabel.split(" · ").map((part) => (
            <span key={part}>{part}</span>
          ))}
        </span>
      </div>

      {/* orbiting icons */}
      <ul className="eng-a-orbit absolute inset-0">
        {items.map((item, i) => (
          <li
            key={item.href}
            className="absolute left-1/2 top-1/2"
            style={{ transform: `rotate(${i * step}deg) translateY(-42cqw) rotate(${-i * step}deg)` }}
          >
            <div className="eng-a-orbit-rev -ml-[6.5cqw] -mt-[6.5cqw]">
              <Link
                href={item.href}
                aria-label={item.label}
                title={item.label}
                className="flex size-[13cqw] items-center justify-center rounded-full border border-border-strong bg-bg text-accent-text shadow-lg transition-[transform,background-color,color] duration-300 hover:scale-110 hover:bg-yellow hover:text-ink focus-visible:scale-110"
              >
                <Icon name={item.icon} className="size-[5.5cqw]" />
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
