import type { ReactNode } from "react";
import { BadgeCheck, CheckCheck, ChevronLeft, Clock3, Languages, Plus, UserRound } from "lucide-react";

import { At, Avatar, Card, LogoMark, Phone, Pill, Tablet, Tilt, ToolChip, type LayoutProps } from "./kit";

/* ------------------------------------------------------------------ */
/* Hotel WhatsApp concierge: chat with upsell + front-desk handovers    */
/* ------------------------------------------------------------------ */

const WA_GREEN = "#075e54";

function Bubble({ me, children, time }: { me?: boolean; children: ReactNode; time: string }) {
  return (
    <div className={`relative max-w-[84%] rounded-[8px] px-[7px] pb-[4px] pt-[5px] text-[9.5px] leading-[1.35] shadow-[0_1px_0.5px_rgb(0_0_0/0.13)] ${me ? "ml-auto rounded-tr-[2px] bg-[#d9fdd3]" : "rounded-tl-[2px] bg-white"}`}>
      {children}
      <span className="mt-[1px] flex items-center justify-end gap-[2px] text-[7.5px] leading-none text-black/40">
        {time}
        {me && <CheckCheck className="size-[8px] text-[#53bdeb]" aria-hidden="true" />}
      </span>
    </div>
  );
}

function WhatsAppPhone({ tint, w, h, short = false }: { tint: string; w: number; h: number; short?: boolean }) {
  return (
    <Phone w={w} h={h} bg="#efeae2" bar={WA_GREEN} dark>
      <div className="flex h-[30px] shrink-0 items-center gap-[5px] px-[6px]" style={{ background: WA_GREEN }}>
        <ChevronLeft className="size-[11px] text-white/80" aria-hidden="true" />
        <LogoMark tint={tint} text="CG" size={20} />
        <div className="min-w-0 leading-tight">
          <p className="flex items-center gap-[2px] truncate text-[10px] font-semibold text-white">
            Casa Gràcia <BadgeCheck className="size-[9px] text-[#25d366]" aria-hidden="true" />
          </p>
          <p className="text-[8px] text-white/70">online</p>
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-[5px] overflow-hidden px-[7px] pt-[7px] text-[#111b21]">
        <span className="mx-auto rounded-[5px] bg-white/80 px-[6px] py-[2px] text-[8px] text-black/50">Today</span>
        <Bubble me time="22:47">Hola! Could we check out later tomorrow? Our flight is at 19:00.</Bubble>
        <div className="flex justify-center">
          <ToolChip>mews.get_reservation #4821</ToolChip>
        </div>
        <Bubble time="22:47">
          Of course, Anna! Room 312 can stay until 14:00.
          <span className="mt-[5px] block overflow-hidden rounded-[6px] ring-1 ring-black/10">
            <span className="flex items-center justify-between gap-[4px] bg-black/[0.03] px-[6px] py-[4px]">
              <span className="flex items-center gap-[3px] font-semibold">
                <Clock3 className="size-[9px]" style={{ color: tint }} aria-hidden="true" />
                Late check-out
              </span>
              <span className="font-bold">€35</span>
            </span>
            <span className="block py-[4px] text-center text-[9px] font-semibold text-[#027eb5]">Add to my stay</span>
          </span>
        </Bubble>
        {!short && <Bubble me time="22:48">Perfect, yes please!</Bubble>}
        {!short && (
          <Bubble time="22:48">
            Done. Added to room 312 <span className="text-[#16a34a]">✓</span>
          </Bubble>
        )}
      </div>
      <div className="flex shrink-0 items-center gap-[4px] px-[6px] pb-[4px] pt-[5px]">
        <span className="flex h-[20px] flex-1 items-center gap-[4px] rounded-full bg-white px-[7px] text-[8.5px] text-black/35">
          <Plus className="size-[9px]" aria-hidden="true" /> Message
        </span>
        <span className="size-[20px] rounded-full bg-[#00a884]" />
      </div>
    </Phone>
  );
}

const HANDOVERS = [
  { guest: "Julien M.", lang: "FR", room: "204", why: "Noise complaint from next room", tone: "red" as const, tag: "Urgent" },
  { guest: "Katrin B.", lang: "DE", room: "118", why: "Birthday cake for Friday", tone: "amber" as const, tag: "Request" },
  { guest: "Marta R.", lang: "ES", room: "305", why: "Wheelchair taxi to airport", tone: "amber" as const, tag: "Request" },
  { guest: "Tom H.", lang: "EN", room: "221", why: "Lost property: blue scarf", tone: "blue" as const, tag: "Info" },
];

function DeskScreen({ study, rows }: { study: LayoutProps["study"]; rows: number }) {
  const tint = study.tint;
  return (
    <div className="flex h-full flex-col bg-[#faf8f5]">
      <div className="flex h-[30px] shrink-0 items-center gap-[7px] border-b border-black/[0.07] bg-white px-[10px]">
        <LogoMark tint={tint} text="C" size={16} />
        <span className="text-[10.5px] font-semibold">Concierge · Front desk</span>
        <span className="ml-auto flex items-center gap-[3px] text-[8.5px] text-black/50">
          <span className="mock-pulse size-[5px] rounded-full bg-[#22c55e]" />
          Agent live
        </span>
      </div>
      <div className="grid shrink-0 grid-cols-3 gap-[6px] px-[9px] pt-[8px]">
        {study.screen.map((s, i) => (
          <div key={s.label} className="rounded-[7px] bg-white px-[7px] py-[5px] ring-1 ring-black/[0.06]">
            <p className="truncate text-[8.5px] text-black/50">{s.label}</p>
            <p className="text-[14px] font-bold leading-tight" style={i === 1 ? { color: tint } : undefined}>
              {s.value}
            </p>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-between px-[10px] pb-[4px] pt-[8px]">
        <span className="text-[9px] font-semibold uppercase tracking-[0.08em] text-black/40">Handover queue</span>
        <span className="flex items-center gap-[3px] text-[8.5px] text-black/45">
          <Languages className="size-[9px]" aria-hidden="true" /> 5 languages
        </span>
      </div>
      <div className="mx-[9px] overflow-hidden rounded-[7px] bg-white ring-1 ring-black/[0.06]">
        {HANDOVERS.slice(0, rows).map((h, k) => (
          <div key={h.guest} className="flex h-[31px] items-center gap-[7px] border-t border-black/[0.05] px-[8px] first:border-t-0">
            <Avatar text={h.lang} i={k + 1} size={20} />
            <div className="min-w-0 flex-1">
              <p className="truncate text-[9.5px] font-semibold leading-tight">{h.why}</p>
              <p className="truncate text-[8.5px] leading-tight text-black/45">
                {h.guest} · Room {h.room}
              </p>
            </div>
            <Pill tone={h.tone} size={8}>
              {h.tag}
            </Pill>
          </div>
        ))}
      </div>
    </div>
  );
}

export function WhatsAppConciergeMock({ study, v }: LayoutProps) {
  const tint = study.tint;
  if (v === "narrow") {
    return (
      <>
        <At x={18} y={0} z={2}>
          <Tilt m="lift">
            <WhatsAppPhone tint={tint} w={172} h={310} short />
          </Tilt>
        </At>
        <At x={206} y={22}>
          <Card w={180} className="!p-[9px]">
            <p className="flex items-center gap-[5px] text-[10px] font-semibold">
              <UserRound className="size-[10px]" style={{ color: tint }} aria-hidden="true" /> Passed to front desk
            </p>
            <div className="mt-[6px] space-y-[6px]">
              {HANDOVERS.slice(0, 3).map((h, k) => (
                <div key={h.guest} className="flex items-center gap-[6px]">
                  <Avatar text={h.lang} i={k + 1} size={18} />
                  <p className="min-w-0 flex-1 truncate text-[9.5px] leading-tight">{h.why}</p>
                </div>
              ))}
            </div>
          </Card>
        </At>
        <At x={206} y={150}>
          <div className="rounded-[10px] bg-white px-[10px] py-[7px] shadow-[0_14px_30px_-12px_rgb(0_0_0/0.6)]">
            <p className="text-[16px] font-bold leading-none" style={{ color: tint }}>
              {study.metrics[1]?.value}
            </p>
            <p className="mt-[3px] text-[9px] text-black/55">{study.metrics[1]?.label}</p>
          </div>
        </At>
      </>
    );
  }
  return (
    <>
      <At x={216} y={40}>
        <Tilt m="right">
          <Tablet w={418} h={290} bg="#faf8f5">
            <DeskScreen study={study} rows={4} />
          </Tablet>
        </Tilt>
      </At>
      <At x={24} y={0} z={2}>
        <Tilt m="lift">
          <WhatsAppPhone tint={tint} w={186} h={368} />
        </Tilt>
      </At>
    </>
  );
}
