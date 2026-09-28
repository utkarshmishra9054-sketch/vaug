import type { ReactNode } from "react";
import {
  ArrowLeft,
  BarChart3,
  Bell,
  BookOpen,
  Camera,
  ChevronDown,
  Clock3,
  Download,
  Inbox,
  Mic,
  MoreVertical,
  Paperclip,
  Phone as PhoneIcon,
  Plus,
  Search,
  Settings,
  Smile,
  Tags,
  UserRound,
  Video,
} from "lucide-react";

import { Browser, type Screen } from "./kit";
import { Photo } from "./tools";

/* WhatsApp concierge · Barcelona boutique hotel group EnjoyBCN (Hotel La Pau, EnjoyBCN Eixample, EnjoyBCN Gràcia) */

const HOST = "concierge.enjoybcn.com";
const LOGO = { src: "/logos/enjoybcn.webp", img: { w: 480, h: 70 } };
const SITE = { src: "/sites/enjoybcn.webp", img: { w: 1440, h: 900 } };
/** The EnjoyBCN asterisk, cut from the group logo. */
const Asterisk = ({ size }: { size: number }) => <Photo {...LOGO} crop={{ x: 298, y: 4, w: 40, h: 40 }} w={size} h={size} />;
/** Hotel La Pau's own mark, cut from the lobby photo on its site. */
const LaPauMark = ({ size }: { size: number }) => <Photo {...SITE} crop={{ x: 640, y: 198, w: 160, h: 160 }} w={size} h={size} />;

const WA_HEAD = "#008069";
const WA_LINK = "#027eb5";

/* ------------------------------------------------------------------ */
/* Android WhatsApp                                                     */
/* ------------------------------------------------------------------ */

function Android({ children, time }: { children: ReactNode; time: string }) {
  return (
    <div className="h-[382px] w-[184px] shrink-0 rounded-[22px] bg-[#1b1b1f] p-[4px] shadow-[0_10px_24px_-12px_rgb(0_0_0/0.45)]">
      <div className="relative flex h-full flex-col overflow-hidden rounded-[18px] bg-[#efeae2] text-[#111b21]">
        <div className="relative flex h-[16px] shrink-0 items-center justify-between px-[10px] text-[7px] font-medium text-white" style={{ background: WA_HEAD }}>
          <span>{time}</span>
          <span className="absolute left-1/2 top-[4px] size-[8px] -translate-x-1/2 rounded-full bg-black" />
          <span className="flex items-center gap-[3px]">
            <svg viewBox="0 0 10 8" className="h-[6px]" aria-hidden="true">
              <path d="M5 8 0 2.5a7 7 0 0 1 10 0z" fill="currentColor" />
            </svg>
            <svg viewBox="0 0 8 8" className="h-[6px]" aria-hidden="true">
              <path d="M8 0v8H0z" fill="currentColor" />
            </svg>
            <span className="h-[6px] w-[3.5px] rounded-[0.5px] bg-current" />
          </span>
        </div>
        {children}
        <div className="flex h-[12px] shrink-0 items-center justify-center bg-[#f0f2f5]">
          <span className="h-[2.5px] w-[44px] rounded-full bg-black/70" />
        </div>
      </div>
    </div>
  );
}

function WaHeader({ name, avatar, bg = "#fff" }: { name: string; avatar: ReactNode; bg?: string }) {
  return (
    <div className="flex h-[30px] shrink-0 items-center gap-[5px] px-[5px] text-white" style={{ background: WA_HEAD }}>
      <ArrowLeft className="size-[10px]" aria-hidden="true" />
      <span className="flex size-[20px] shrink-0 items-center justify-center overflow-hidden rounded-full" style={{ background: bg }}>
        {avatar}
      </span>
      <span className="min-w-0 flex-1 leading-[1.2]">
        <span className="flex items-center gap-[2px] truncate text-[8.5px] font-medium">
          {name}
          <svg viewBox="0 0 10 10" className="size-[7px] shrink-0" aria-hidden="true">
            <circle cx="5" cy="5" r="5" fill="#25d366" />
            <path d="M2.8 5.2 4.4 6.7 7.3 3.6" fill="none" stroke="#fff" strokeWidth="1.2" />
          </svg>
        </span>
        <span className="block text-[6px] text-white/75">Business account</span>
      </span>
      <Video className="size-[10px]" aria-hidden="true" />
      <PhoneIcon className="ml-[5px] size-[9px]" aria-hidden="true" />
      <MoreVertical className="ml-[3px] size-[10px]" aria-hidden="true" />
    </div>
  );
}

function Msg({ me = false, time, children, buttons }: { me?: boolean; time: string; children: ReactNode; buttons?: string[] }) {
  return (
    <div className={`flex max-w-[86%] flex-col ${me ? "self-end" : "self-start"}`}>
      <div className={`rounded-[7px] px-[6px] pb-[3px] pt-[4px] text-[7.5px] leading-[1.38] shadow-[0_1px_0.5px_rgb(11_20_26/0.13)] ${me ? "rounded-tr-[1px] bg-[#d9fdd3]" : "rounded-tl-[1px] bg-white"} ${buttons ? "rounded-b-[2px]" : ""}`}>
        {children}
        <span className="float-right ml-[6px] mt-[3px] flex items-center gap-[1px] text-[5.5px] leading-none text-[#667781]">
          {time}
          {me && <span className="text-[6.5px] tracking-[-1.5px] text-[#53bdeb]">✓✓</span>}
        </span>
      </div>
      {buttons?.map((b) => (
        <span key={b} className="mt-[1.5px] flex h-[17px] items-center justify-center rounded-[3px] bg-white text-[7px] font-medium shadow-[0_1px_0.5px_rgb(11_20_26/0.13)] last:rounded-b-[7px]" style={{ color: WA_LINK }}>
          {b}
        </span>
      ))}
    </div>
  );
}

function Day({ children }: { children: ReactNode }) {
  return <span className="mx-auto my-[2px] rounded-[5px] bg-white px-[6px] py-[2px] text-[6px] font-medium uppercase text-[#54656f] shadow-[0_1px_0.5px_rgb(11_20_26/0.13)]">{children}</span>;
}

function WaInput() {
  return (
    <div className="flex shrink-0 items-center gap-[4px] bg-transparent px-[5px] pb-[4px] pt-[3px]">
      <span className="flex h-[20px] flex-1 items-center gap-[4px] rounded-full bg-white px-[6px] text-[7px] text-black/40 shadow-[0_1px_0.5px_rgb(11_20_26/0.13)]">
        <Smile className="size-[9px]" aria-hidden="true" />
        Message
        <Paperclip className="ml-auto size-[8px]" aria-hidden="true" />
        <Camera className="size-[8px]" aria-hidden="true" />
      </span>
      <span className="flex size-[20px] items-center justify-center rounded-full bg-[#00a884] text-white">
        <Mic className="size-[9px]" aria-hidden="true" />
      </span>
    </div>
  );
}

/* 01 · WhatsApp conversations with a late check-out upsell ----------- */

export const WhatsAppUpsell: Screen = () => (
  <div className="flex h-full items-center justify-center gap-[36px] bg-[#e7e8ea]">
    <Android time="22:49">
      <WaHeader name="EnjoyBCN Gràcia" avatar={<Asterisk size={13} />} />
      <div className="flex min-h-0 flex-1 flex-col justify-end gap-[4px] overflow-hidden px-[7px] pb-[3px]">
        <Day>Today</Day>
        <Msg me time="22:47">
          Hi! What time is check-out tomorrow? Our flight is at 19:00
        </Msg>
        <Msg time="22:47" buttons={["Until 14:00 · €35", "Until 18:00 · €60", "No thanks"]}>
          Hi Anna, check-out is at 11:00. Your room is free tomorrow, so you can stay longer if you like. We can also keep your bags at reception for free.
        </Msg>
        <Msg me time="22:48">
          Until 14:00 · €35
        </Msg>
        <Msg time="22:48">All set. Your check-out is now 14:00 and €35 has been added to your bill for room 312. Have a lovely last evening in Gràcia.</Msg>
        <Msg me time="22:49">
          Perfect, thank you!
        </Msg>
      </div>
      <WaInput />
    </Android>
    <Android time="09:12">
      <WaHeader name="Hotel La Pau" avatar={<LaPauMark size={20} />} bg="#2a211d" />
      <div className="flex min-h-0 flex-1 flex-col justify-end gap-[4px] overflow-hidden px-[7px] pb-[3px]">
        <Day>Today</Day>
        <Msg me time="09:05">
          Hola, llegamos al aeropuerto a las 13:20. ¿Podemos dejar las maletas antes del check-in?
        </Msg>
        <Msg time="09:05" buttons={["Reservar traslado · €55", "No, gracias"]}>
          ¡Hola Javier! Claro, puedes dejar las maletas en recepción desde las 8:00. El check-in es a las 15:00.
          <br />
          <br />
          ¿Quieres que un coche te recoja en el aeropuerto? El traslado privado cuesta €55 para 2 personas.
        </Msg>
        <Msg me time="09:11">
          Reservar traslado · €55
        </Msg>
        <Msg time="09:12">Hecho. Tu conductor, Marc, te esperará en la T1 con un cartel del Hotel La Pau a las 13:20.</Msg>
      </div>
      <WaInput />
    </Android>
  </div>
);

/* ------------------------------------------------------------------ */
/* Hotel dashboard chrome                                              */
/* ------------------------------------------------------------------ */

const NAV = [
  [Inbox, "Handover", "7"],
  [BookOpen, "Answers", ""],
  [Tags, "Offers", ""],
  [Clock3, "Hours & info", ""],
  [BarChart3, "Reports", ""],
  [Settings, "Settings", ""],
] as const;

function Side({ tint, active, hotel }: { tint: string; active: number; hotel: string }) {
  return (
    <aside className="flex w-[112px] shrink-0 flex-col border-r border-black/[0.08] bg-[#fafaf9] px-[7px] py-[9px] text-[7.5px]">
      <span className="flex items-center gap-[5px] px-[3px] text-[8.5px] font-semibold">
        <Asterisk size={14} />
        Concierge
      </span>
      <span className="mt-[8px] flex items-center justify-between rounded-[4px] border border-black/[0.12] bg-white px-[5px] py-[3px] text-[7px]">
        {hotel}
        <ChevronDown className="size-[7px] text-black/40" aria-hidden="true" />
      </span>
      <nav className="mt-[8px] flex flex-col gap-[1px] text-black/65">
        {NAV.map(([I, l, n], i) => (
          <span key={l} className={`flex h-[19px] items-center gap-[6px] rounded-[4px] px-[5px] ${i === active ? "bg-black/[0.06] font-semibold text-black" : ""}`}>
            <I className="size-[9px]" aria-hidden="true" />
            {l}
            {n && <span className="ml-auto rounded-[3px] px-[3px] text-[6.5px] font-semibold text-white" style={{ background: tint }}>{n}</span>}
          </span>
        ))}
      </nav>
      <div className="mt-auto flex items-center gap-[5px] px-[3px]">
        <span className="flex size-[16px] items-center justify-center rounded-full bg-[#e0e7ff] text-[6px] font-bold text-[#3730a3]">LM</span>
        <span className="leading-[1.2]">
          <span className="block text-[7px] font-medium">Laia Martí</span>
          <span className="block text-[6px] text-black/45">Front office manager</span>
        </span>
      </div>
    </aside>
  );
}

/* 02 · Hotel dashboard: editing answers and offers ------------------- */

const OFFERS = [
  ["Late check-out", "€35 / €60", "Guest asks about check-out, or 18:00 day before", "On", "31%"],
  ["Airport transfer", "€55", "Pre-arrival message, 3 days before", "On", "18%"],
  ["Early check-in", "€30", "Guest shares arrival before 12:00", "On", "24%"],
  ["Cava on arrival", "€22", "Booking notes mention birthday or anniversary", "On", "12%"],
  ["Tapas walk, El Born", "€45 pp", "Guest asks for dinner or things to do", "On", "6%"],
  ["Parking, Saba Diagonal", "€28 / day", "Guest mentions car", "Off", "—"],
] as const;

export const AnswersEditor: Screen = ({ tint }) => (
  <Browser w={640} h={400} url={`${HOST}/offers/late-checkout?hotel=gracia`}>
    <div className="flex h-full bg-white text-[#1c1917]">
      <Side tint={tint} active={2} hotel="EnjoyBCN Gràcia" />
      <div className="flex min-w-0 flex-1">
        <div className="flex min-w-0 flex-1 flex-col">
          <div className="flex h-[34px] shrink-0 items-center gap-[6px] border-b border-black/[0.08] px-[10px]">
            <p className="text-[10.5px] font-semibold">Offers</p>
            <span className="text-[7px] text-black/45">6 offers · EnjoyBCN Gràcia</span>
            <span className="ml-auto flex h-[18px] items-center gap-[3px] rounded-[4px] px-[7px] text-[7px] font-semibold text-white" style={{ background: tint }}>
              <Plus className="size-[8px]" aria-hidden="true" />
              New offer
            </span>
          </div>
          <div className="grid h-[18px] shrink-0 grid-cols-[minmax(0,1fr)_44px_22px_30px] items-center gap-[6px] border-b border-black/[0.08] bg-[#fafaf9] px-[10px] text-[6px] font-semibold uppercase text-black/45">
            <span>Offer</span>
            <span>Price</span>
            <span>Status</span>
            <span className="text-right">Take-up</span>
          </div>
          {OFFERS.map(([n, p, when, st, take], i) => (
            <div key={n} className="grid grid-cols-[minmax(0,1fr)_44px_22px_30px] items-center gap-[6px] border-b border-black/[0.06] px-[10px] py-[5px] text-[7px]" style={i === 0 ? { background: `color-mix(in oklab, ${tint} 6%, white)`, boxShadow: `inset 2px 0 0 ${tint}` } : undefined}>
              <span className="min-w-0 leading-[1.35]">
                <span className="block font-medium">{n}</span>
                <span className="block truncate text-[6.5px] text-black/45">{when}</span>
              </span>
              <span className="tabular-nums">{p}</span>
              <span className={st === "On" ? "text-[#15803d]" : "text-black/40"}>{st}</span>
              <span className="text-right tabular-nums text-black/60">{take}</span>
            </div>
          ))}
          <p className="px-[10px] pt-[6px] text-[6.5px] text-black/40">Take-up = accepted ÷ offered, last 30 days.</p>
        </div>

        {/* edit panel */}
        <div className="flex w-[232px] shrink-0 flex-col border-l border-black/[0.1] bg-[#fcfcfb]">
          <div className="flex h-[34px] shrink-0 items-center justify-between border-b border-black/[0.08] px-[10px]">
            <span className="text-[9px] font-semibold">Edit: Late check-out</span>
            <span className="text-[7px] text-black/40">Last edited by Laia, 3 days ago</span>
          </div>
          <div className="min-h-0 flex-1 space-y-[7px] px-[10px] pt-[8px] text-[7px]">
            <div>
              <p className="mb-[2px] text-[6.5px] font-medium text-black/55">Options</p>
              {[
                ["Until 14:00", "€35"],
                ["Until 18:00", "€60"],
              ].map(([a, b]) => (
                <div key={a} className="mb-[3px] flex gap-[4px]">
                  <span className="flex h-[17px] flex-1 items-center rounded-[3px] border border-black/[0.15] bg-white px-[5px]">{a}</span>
                  <span className="flex h-[17px] w-[44px] items-center rounded-[3px] border border-black/[0.15] bg-white px-[5px] tabular-nums">{b}</span>
                </div>
              ))}
            </div>
            <div>
              <p className="mb-[2px] text-[6.5px] font-medium text-black/55">Only offer when</p>
              <p className="flex items-center gap-[4px]">
                <span className="flex size-[8px] items-center justify-center rounded-[2px] text-[6px] text-white" style={{ background: tint }}>
                  ✓
                </span>
                Room is not sold for the next night (checked in Mews)
              </p>
              <p className="mt-[2px] flex items-center gap-[4px]">
                <span className="flex size-[8px] items-center justify-center rounded-[2px] text-[6px] text-white" style={{ background: tint }}>
                  ✓
                </span>
                Housekeeping can turn the room by 16:00
              </p>
            </div>
            <div>
              <div className="mb-[3px] flex items-center gap-[1px] text-[6.5px]">
                {["EN", "ES", "CA", "FR", "DE"].map((l, i) => (
                  <span key={l} className={`rounded-[3px] px-[5px] py-[1.5px] font-semibold ${i === 0 ? "bg-black/[0.07]" : "text-black/45"}`}>
                    {l}
                  </span>
                ))}
                <span className="ml-auto text-black/40">Auto-translated: CA, DE</span>
              </div>
              <div className="rounded-[3px] border border-black/[0.15] bg-white px-[6px] py-[5px] leading-[1.45] text-black/80">
                Hi {"{first_name}"}, check-out is at 11:00. Your room is free tomorrow, so you can stay longer if you like. We can also keep your bags at reception for free.
              </div>
              <p className="mt-[2px] text-right text-[6px] text-black/40">164 / 1024</p>
            </div>
            <div>
              <p className="mb-[2px] text-[6.5px] font-medium text-black/55">Charge to</p>
              <span className="flex h-[17px] items-center justify-between rounded-[3px] border border-black/[0.15] bg-white px-[5px]">
                Room folio (Mews product: LATE_CO)
                <ChevronDown className="size-[7px] text-black/40" aria-hidden="true" />
              </span>
            </div>
          </div>
          <div className="flex shrink-0 justify-end gap-[5px] border-t border-black/[0.08] px-[10px] py-[7px] text-[7px] font-semibold">
            <span className="rounded-[4px] border border-black/[0.15] bg-white px-[8px] py-[3px] text-black/65">Preview in WhatsApp</span>
            <span className="rounded-[4px] px-[8px] py-[3px] text-white" style={{ background: tint }}>
              Save changes
            </span>
          </div>
        </div>
      </div>
    </div>
  </Browser>
);

/* 03 · Front-desk handover queue ------------------------------------- */

const QUEUE = [
  { n: "Tom Fischer", room: "214", hotel: "Gràcia", why: "Complaint", c: "#b91c1c", msg: "The air con in our room isn't working and it's…", t: "2m", on: true },
  { n: "Marie Lefèvre", room: "108", hotel: "Gràcia", why: "Special request", c: "#7c3aed", msg: "Is it possible to have a cot in the room for…", t: "9m" },
  { n: "+34 612 48 90 17", room: "—", hotel: "La Pau", why: "Not found in PMS", c: "#64748b", msg: "Hola, reservé por Booking pero no me llegó…", t: "14m" },
  { n: "Liam O'Connor", room: "305", hotel: "Eixample", why: "Refund", c: "#b45309", msg: "We were charged twice for the airport transfer", t: "22m" },
  { n: "Sara Bianchi", room: "402", hotel: "Eixample", why: "Special request", c: "#7c3aed", msg: "Can you recommend a gluten-free restaurant…", t: "31m" },
  { n: "Jonas Berg", room: "117", hotel: "La Pau", why: "Complaint", c: "#b91c1c", msg: "Noise from the street, can we change room?", t: "48m" },
  { n: "Hana Suzuki", room: "209", hotel: "Gràcia", why: "Lost item", c: "#64748b", msg: "I think I left my charger in the room", t: "1h" },
];

export const HandoverQueue: Screen = ({ tint }) => (
  <Browser w={640} h={400} url={`${HOST}/handover/c_8f21a4`}>
    <div className="flex h-full bg-white text-[#1c1917]">
      <Side tint={tint} active={0} hotel="All hotels" />
      {/* queue */}
      <div className="flex w-[168px] shrink-0 flex-col border-r border-black/[0.08]">
        <div className="flex h-[30px] shrink-0 items-center gap-[5px] border-b border-black/[0.08] px-[8px]">
          <span className="text-[9px] font-semibold">Handover</span>
          <span className="text-[7px] text-black/45">7 open · 24 today</span>
          <Search className="ml-auto size-[8px] text-black/40" aria-hidden="true" />
        </div>
        <div className="flex h-[20px] shrink-0 items-center gap-[8px] border-b border-black/[0.08] px-[8px] text-[6.5px] text-black/50">
          <span className="flex h-full items-center font-semibold text-black" style={{ boxShadow: `inset 0 -2px 0 ${tint}` }}>
            Open 7
          </span>
          <span>Mine 2</span>
          <span>Resolved</span>
        </div>
        {QUEUE.map((q) => (
          <div key={q.n} className="border-b border-black/[0.06] px-[8px] py-[5px] text-[6.5px]" style={q.on ? { background: `color-mix(in oklab, ${tint} 6%, white)`, boxShadow: `inset 2px 0 0 ${tint}` } : undefined}>
            <p className="flex items-center gap-[4px]">
              <span className="truncate text-[7px] font-semibold">{q.n}</span>
              <span className="shrink-0 text-black/40">
                {q.hotel} {q.room !== "—" && `· ${q.room}`}
              </span>
              <span className="ml-auto shrink-0 text-black/40">{q.t}</span>
            </p>
            <p className="mt-[1px] truncate text-black/55">{q.msg}</p>
            <span className="mt-[2px] inline-block rounded-[2px] px-[3px] py-[0.5px] text-[5.5px] font-semibold" style={{ background: `color-mix(in oklab, ${q.c} 12%, white)`, color: q.c }}>
              {q.why}
            </span>
          </div>
        ))}
      </div>
      {/* conversation */}
      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex h-[30px] shrink-0 items-center gap-[6px] border-b border-black/[0.08] px-[10px]">
          <span className="shrink-0 whitespace-nowrap text-[8.5px] font-semibold">Tom Fischer</span>
          <span className="min-w-0 truncate text-[7px] text-black/45">Gràcia · 214 · English</span>
          <span className="ml-auto shrink-0 whitespace-nowrap rounded-[4px] border border-black/[0.15] px-[6px] py-[2px] text-[7px] font-semibold text-black/65">Assign to me</span>
          <span className="shrink-0 rounded-[4px] px-[6px] py-[2px] text-[7px] font-semibold text-white" style={{ background: tint }}>
            Resolve
          </span>
        </div>
        <div className="flex min-h-0 flex-1 flex-col justify-end gap-[5px] bg-[#fafaf9] px-[10px] pb-[6px] text-[7px] leading-[1.4]">
          <p className="self-center text-[6px] text-black/40">Today 21:36</p>
          <div className="max-w-[78%] self-start rounded-[6px] border border-black/[0.08] bg-white px-[6px] py-[4px]">
            The air con in our room isn&apos;t working and it&apos;s really hot, we can&apos;t sleep. Can someone come up?
            <span className="block text-right text-[5.5px] text-black/40">Guest · 21:36</span>
          </div>
          <div className="max-w-[78%] self-end rounded-[6px] bg-[#f1f5f9] px-[6px] py-[4px]">
            I&apos;m sorry about that, Tom. I&apos;ve asked the front desk to help right away. Someone will message you here in a few minutes.
            <span className="block text-right text-[5.5px] text-black/40">Concierge (auto) · 21:36</span>
          </div>
          <div className="rounded-[5px] border border-dashed border-[#f59e0b] bg-[#fffbeb] px-[7px] py-[5px] text-[6.5px] text-[#78350f]">
            <b className="font-semibold">Handed over: complaint.</b> AC not working in room 214, guest can&apos;t sleep. Checked Mews: rooms 216 and 311 (same type) are free tonight. Suggest a room move or engineer visit.
          </div>
        </div>
        <div className="shrink-0 border-t border-black/[0.08] px-[10px] py-[6px]">
          <div className="flex gap-[4px] text-[6.5px]">
            {["Send engineer (ETA 15 min)", "Offer room 311", "Call guest"].map((s) => (
              <span key={s} className="rounded-full border border-black/[0.12] px-[6px] py-[1.5px] text-black/60">
                {s}
              </span>
            ))}
          </div>
          <div className="mt-[5px] flex h-[34px] items-start rounded-[4px] border border-black/[0.15] px-[6px] py-[4px] text-[7px] text-black/40">Reply to Tom on WhatsApp…</div>
        </div>
      </div>
      {/* guest details */}
      <div className="w-[118px] shrink-0 border-l border-black/[0.08] px-[8px] pt-[9px] text-[6.5px]">
        <p className="flex items-center gap-[4px] text-[7.5px] font-semibold">
          <UserRound className="size-[9px] text-black/45" aria-hidden="true" />
          Reservation
        </p>
        <div className="mt-[5px] space-y-[3px] leading-[1.35]">
          {[
            ["Guest", "Tom Fischer"],
            ["Mews ID", "#5719"],
            ["Stay", "29 Sep – 3 Oct"],
            ["Room", "214 · Superior"],
            ["Guests", "2 adults"],
            ["Rate", "Direct · flexible"],
            ["Balance", "€0.00"],
          ].map(([k, v]) => (
            <p key={k} className="flex justify-between gap-[4px]">
              <span className="text-black/45">{k}</span>
              <span className="truncate text-right">{v}</span>
            </p>
          ))}
        </div>
        <p className="mt-[8px] border-t border-black/[0.08] pt-[5px] text-[7px] font-semibold">This stay</p>
        <p className="mt-[3px] leading-[1.45] text-black/55">12 messages · 1 upsell (airport transfer, €55) · 0 handovers before</p>
        <p className="mt-[6px] flex items-center gap-[3px] text-black/45">
          <Bell className="size-[7px]" aria-hidden="true" />
          Desk notified 21:36
        </p>
      </div>
    </div>
  </Browser>
);

/* 04 · Upsell revenue report ----------------------------------------- */

// Weekly upsell revenue (€), all 3 hotels, 16 weeks since launch.
const WEEKS = [2816, 3141, 3529, 3394, 3800, 3963, 3656, 4170, 4405, 4251, 4621, 4865, 4477, 4883, 5127, 4983];

function RevenueChart({ tint }: { tint: string }) {
  const w = 266;
  const h = 104;
  const L = 24;
  const slot = (w - L) / WEEKS.length;
  const bw = slot * 0.62;
  const max = 6000;
  const y = (v: number) => 4 + ((max - v) / max) * (h - 16);
  return (
    <svg width={w} height={h} className="block" aria-hidden="true">
      {[0, 2000, 4000, 6000].map((g) => (
        <g key={g}>
          <line x1={L} x2={w} y1={y(g)} y2={y(g)} stroke="rgb(0 0 0 / 0.07)" />
          <text x={L - 3} y={y(g) + 2.2} textAnchor="end" fontSize="6" fill="rgb(0 0 0 / 0.4)">
            {g ? `€${g / 1000}k` : "0"}
          </text>
        </g>
      ))}
      {WEEKS.map((v, i) => (
        <rect key={i} x={(L + i * slot + (slot - bw) / 2).toFixed(1)} y={y(v).toFixed(1)} width={bw.toFixed(1)} height={(y(0) - y(v)).toFixed(1)} fill={i === WEEKS.length - 1 ? tint : `color-mix(in oklab, ${tint} 55%, white)`} />
      ))}
      {[0, 4, 8, 12, 15].map((i) => (
        <text key={i} x={(L + i * slot + slot / 2).toFixed(1)} y={h - 3} textAnchor="middle" fontSize="6" fill="rgb(0 0 0 / 0.45)">
          {["1 Jun", "29 Jun", "27 Jul", "24 Aug", "14 Sep"][[0, 4, 8, 12, 15].indexOf(i)]}
        </text>
      ))}
    </svg>
  );
}

const BY_OFFER = [
  ["Late check-out", 612, "€24,860", "€40.62"],
  ["Airport transfer", 441, "€24,255", "€55.00"],
  ["Early check-in", 287, "€8,610", "€30.00"],
  ["Cava on arrival", 118, "€2,596", "€22.00"],
  ["Tapas walk, El Born", 64, "€5,760", "€90.00"],
] as const;

export const UpsellReport: Screen = ({ tint }) => (
  <Browser w={640} h={400} url={`${HOST}/reports/upsells?range=since-launch`}>
    <div className="flex h-full bg-white text-[#1c1917]">
      <Side tint={tint} active={4} hotel="All hotels" />
      <div className="flex min-w-0 flex-1 flex-col bg-[#fafaf9]">
        <div className="flex h-[34px] shrink-0 items-center gap-[6px] border-b border-black/[0.08] bg-white px-[12px]">
          <p className="text-[10.5px] font-semibold">Upsell revenue</p>
          <span className="flex h-[17px] items-center gap-[3px] rounded-[4px] border border-black/[0.15] px-[6px] text-[7px]">
            Since launch (1 Jun – 20 Sep)
            <ChevronDown className="size-[7px] text-black/40" aria-hidden="true" />
          </span>
          <span className="ml-auto flex h-[17px] items-center gap-[3px] rounded-[4px] border border-black/[0.15] bg-white px-[6px] text-[7px] font-semibold text-black/65">
            <Download className="size-[7px]" aria-hidden="true" />
            Export
          </span>
        </div>
        <div className="grid shrink-0 grid-cols-4 border-b border-black/[0.08] bg-white">
          {[
            ["Upsell revenue", "€66,081", "1,522 upsells"],
            ["Per stay", "€14.82", "was €12.45 before launch (+19%)"],
            ["Offer take-up", "21.4%", "7,112 offers sent"],
            ["Answered instantly", "81%", "19% handed to desk"],
          ].map(([k, v, s], i) => (
            <div key={k} className={`px-[10px] py-[7px] ${i ? "border-l border-black/[0.08]" : ""}`}>
              <p className="text-[6.5px] text-black/50">{k}</p>
              <p className="mt-[2px] text-[13px] font-semibold tabular-nums">{v}</p>
              <p className="truncate text-[6px] text-black/45">{s}</p>
            </div>
          ))}
        </div>
        <div className="flex min-h-0 flex-1 gap-[8px] p-[10px]">
          <section className="flex w-[286px] shrink-0 flex-col rounded-[4px] border border-black/[0.08] bg-white px-[9px] py-[6px]">
            <p className="flex items-center justify-between text-[7.5px] font-semibold">
              Weekly upsell revenue, all hotels
              <span className="text-[6.5px] font-normal text-black/45">Weeks starting</span>
            </p>
            <RevenueChart tint={tint} />
            <div className="mt-[6px] border-t border-black/[0.06] pt-[5px]">
              <p className="text-[7px] font-semibold">By hotel</p>
              {[
                ["EnjoyBCN Gràcia", "€24,918", "€15.40"],
                ["EnjoyBCN Eixample", "€23,574", "€14.96"],
                ["Hotel La Pau", "€17,589", "€13.88"],
              ].map(([h, r, p]) => (
                <p key={h} className="mt-[2px] grid grid-cols-[minmax(0,1fr)_56px_56px] text-[7px]">
                  <span>{h}</span>
                  <span className="text-right tabular-nums">{r}</span>
                  <span className="text-right tabular-nums text-black/55">{p} / stay</span>
                </p>
              ))}
            </div>
          </section>
          <section className="min-w-0 flex-1 overflow-hidden rounded-[4px] border border-black/[0.08] bg-white">
            <p className="flex h-[20px] items-center border-b border-black/[0.08] px-[8px] text-[7.5px] font-semibold">By offer</p>
            <div className="grid h-[16px] grid-cols-[minmax(0,1fr)_28px_44px_36px] items-center gap-[4px] border-b border-black/[0.08] bg-[#fafaf9] px-[8px] text-[5.5px] font-semibold uppercase text-black/45">
              <span>Offer</span>
              <span className="text-right">Sold</span>
              <span className="text-right">Revenue</span>
              <span className="text-right">Avg</span>
            </div>
            {BY_OFFER.map(([o, n, r, a]) => (
              <div key={o} className="grid h-[19px] grid-cols-[minmax(0,1fr)_28px_44px_36px] items-center gap-[4px] border-b border-black/[0.05] px-[8px] text-[6.5px]">
                <span className="truncate">{o}</span>
                <span className="text-right tabular-nums">{n}</span>
                <span className="text-right tabular-nums">{r}</span>
                <span className="text-right tabular-nums text-black/55">{a}</span>
              </div>
            ))}
            <div className="grid h-[19px] grid-cols-[minmax(0,1fr)_28px_44px_36px] items-center gap-[4px] px-[8px] text-[6.5px] font-semibold">
              <span>Total</span>
              <span className="text-right tabular-nums">1,522</span>
              <span className="text-right tabular-nums">€66,081</span>
              <span className="text-right tabular-nums">€43.42</span>
            </div>
            <p className="border-t border-black/[0.08] px-[8px] py-[5px] text-[6px] leading-[1.45] text-black/45">Revenue is posted to Mews folios. Refunds (€360) and no-shows are excluded.</p>
          </section>
        </div>
      </div>
    </div>
  </Browser>
);

export const conciergeScreens: Screen[] = [WhatsAppUpsell, AnswersEditor, HandoverQueue, UpsellReport];
