"use client";

import { useEffect, useState } from "react";
import { Bot, CircleCheck } from "lucide-react";

import { IllustrativeTag } from "@/components/ui/IllustrativeTag";

const events = [
  { agent: "Lead Qualifier", action: "Scored 42 new leads and routed 9 to sales" },
  { agent: "Support Agent", action: "Resolved ticket #4821: refund issued" },
  { agent: "Ops Assistant", action: "Matched 118 invoices to purchase orders" },
  { agent: "Content Engine", action: "Published 3 Google Business Profile updates" },
  { agent: "Support Agent", action: "Answered 27 WhatsApp queries in Hindi and English" },
  { agent: "Lead Qualifier", action: "Booked 4 discovery calls on the sales calendar" },
  { agent: "Ops Assistant", action: "Flagged 2 duplicate vendor payments for review" },
];

const VISIBLE = 3;

/** Illustrative agent feed: a new event slides in every few seconds. */
export function HeroConsole() {
  const [tick, setTick] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setTick((t) => t + 1), 2800);
    return () => clearInterval(id);
  }, []);

  const rows = Array.from({ length: VISIBLE }, (_, i) => {
    const n = tick - i;
    return { ...events[((n % events.length) + events.length) % events.length], key: n };
  });
  const times = ["now", "3s", "6s"];

  return (
    <div className="w-full">
      <div className="relative rounded-lg border border-border bg-surface p-4 text-left sm:p-6">
        <div className="flex items-center justify-between border-b border-border pb-4">
          <div className="flex items-center gap-3">
            <span className="inline-flex size-9 items-center justify-center rounded-md bg-accent text-accent-fg">
              <Bot className="size-5" aria-hidden="true" />
            </span>
            <div>
              <p className="text-sm font-semibold text-fg">VAUG Agent Console</p>
              <p className="text-xs text-muted">4 agents running · your workspace</p>
            </div>
          </div>
          <span className="inline-flex items-center gap-2 rounded-md bg-accent-soft px-2.5 py-1 font-mono text-xs font-semibold text-accent-text">
            <span className="animate-pulse-dot size-1.5 rounded-full bg-accent-text" aria-hidden="true" />
            Live
          </span>
        </div>
        <ul className="mt-4 flex flex-col gap-2" aria-live="off">
          {rows.map((item, i) => (
            <li
              key={item.key}
              className={`flex items-center gap-3 rounded-md bg-surface-2/70 px-3 py-3 sm:px-4 ${
                i === 0 && tick > 0 ? "animate-[feed-in_0.6s_cubic-bezier(0.2,0.7,0.2,1)]" : ""
              }`}
              style={{ opacity: 1 - i * 0.22 }}
            >
              <CircleCheck className="size-4 shrink-0 text-accent-text" aria-hidden="true" />
              <p className="min-w-0 flex-1 truncate text-sm text-muted">
                <span className="font-semibold text-fg">{item.agent}</span> · {item.action}
              </p>
              <span className="shrink-0 font-mono text-xs text-subtle">{times[i]}</span>
            </li>
          ))}
        </ul>
        <p className="mt-4 flex justify-center">
          <IllustrativeTag label="Illustrative agent workspace" />
        </p>
      </div>
    </div>
  );
}
