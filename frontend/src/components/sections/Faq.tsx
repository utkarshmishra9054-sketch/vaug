import { Plus } from "lucide-react";

import type { Faq as FaqItem } from "@/content/types";

export function Faq({ faqs }: { faqs: FaqItem[] }) {
  return (
    <ul className="border-t border-border">
      {faqs.map((faq) => (
        <li key={faq.question} className="border-b border-border last:border-b-0">
          <details data-glow className="group">
            <summary className="frame-pad flex cursor-pointer list-none items-center justify-between gap-6 py-7 text-left text-lg font-medium text-fg transition-colors hover:bg-surface sm:text-xl [&::-webkit-details-marker]:hidden">
              {faq.question}
              <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-sm border border-border text-fg transition-all duration-300 group-open:rotate-45 group-open:bg-accent group-open:text-accent-fg">
                <Plus className="size-4" aria-hidden="true" />
              </span>
            </summary>
            <p className="frame-pad max-w-4xl pb-8 text-lg leading-relaxed text-muted">{faq.answer}</p>
          </details>
        </li>
      ))}
    </ul>
  );
}
