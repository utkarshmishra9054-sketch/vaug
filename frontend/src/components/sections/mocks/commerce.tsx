import { CheckCircle2, ChevronLeft, GitBranch, Heart, Rocket, Search, ShoppingBag } from "lucide-react";

import { At, Avatar, Bar, Browser, Card, Laptop, Phone, Ring, Tilt, type LayoutProps } from "./kit";

/* ------------------------------------------------------------------ */
/* Modest-fashion marketplace: storefront grid + checkout with Tabby    */
/* ------------------------------------------------------------------ */

const PRODUCTS = [
  { name: "Linen abaya", by: "Layla Studio", price: "AED 420", bg: "#efe4d8", ink: "#8b6f55" },
  { name: "Silk kaftan", by: "Maison Noor", price: "AED 680", bg: "#e6e1ef", ink: "#6b5b8c" },
  { name: "Pleated set", by: "Hessa Atelier", price: "AED 390", bg: "#dfe9e4", ink: "#4f7563" },
  { name: "Jersey hijab", by: "Rimal", price: "AED 85", bg: "#f2dede", ink: "#a15b5b" },
  { name: "Open abaya", by: "Dar Kenza", price: "AED 510", bg: "#e3e7ee", ink: "#51607a" },
  { name: "Maxi dress", by: "Layla Studio", price: "AED 460", bg: "#f1e6cf", ink: "#9a7a3e" },
];

/** Simple garment silhouette on a soft tile. */
function Garment({ bg, ink, h }: { bg: string; ink: string; h: number }) {
  return (
    <div className="relative flex items-end justify-center overflow-hidden rounded-[6px]" style={{ height: h, background: bg }}>
      <svg viewBox="0 0 60 64" height={h * 0.86} aria-hidden="true">
        <path d="M24 4 Q30 8 36 4 L44 9 L50 26 L45 28 L42 18 L46 64 L14 64 L18 18 L15 28 L10 26 L16 9 Z" fill={ink} opacity="0.85" />
        <path d="M24 4 Q30 12 36 4" fill="none" stroke="#fff" strokeOpacity="0.5" strokeWidth="1.2" />
      </svg>
      <span className="absolute right-[4px] top-[4px] flex size-[14px] items-center justify-center rounded-full bg-white/80">
        <Heart className="size-[8px] text-black/50" aria-hidden="true" />
      </span>
    </div>
  );
}

function Storefront({ tint, cols, count, tile }: { tint: string; cols: number; count: number; tile: number }) {
  return (
    <div className="h-full bg-white">
      <div className="flex h-[30px] items-center gap-[10px] border-b border-black/[0.06] px-[12px]">
        <span className="font-serif text-[12.5px] font-semibold tracking-[0.12em]">NOOR &amp; CO</span>
        <span className="ml-auto flex items-center gap-[8px] text-black/50">
          <Search className="size-[10px]" aria-hidden="true" />
          <span className="relative">
            <ShoppingBag className="size-[10px]" aria-hidden="true" />
            <span className="absolute -right-[4px] -top-[4px] flex size-[9px] items-center justify-center rounded-full text-[6.5px] font-bold text-white" style={{ background: tint }}>
              2
            </span>
          </span>
        </span>
      </div>
      <div className="flex gap-[5px] px-[12px] pt-[8px]">
        {["New in", "Abayas", "Kaftans", "Hijabs", "Sets"].slice(0, cols + 1).map((c, i) => (
          <span key={c} className="rounded-full px-[8px] py-[3px] text-[9px] font-medium" style={i === 1 ? { background: tint, color: "#fff" } : { background: "rgb(0 0 0 / 0.05)" }}>
            {c}
          </span>
        ))}
      </div>
      <div className="grid gap-[8px] px-[12px] pt-[8px]" style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}>
        {PRODUCTS.slice(0, count).map((p) => (
          <div key={p.name} className="min-w-0">
            <Garment bg={p.bg} ink={p.ink} h={tile} />
            <p className="mt-[4px] truncate text-[9.5px] font-semibold leading-tight">{p.name}</p>
            <p className="truncate text-[8.5px] leading-tight text-black/45">{p.by}</p>
            <p className="text-[9.5px] font-bold leading-tight">{p.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function CheckoutPhone({ tint, w, h }: { tint: string; w: number; h: number }) {
  return (
    <Phone w={w} h={h} bg="#ffffff">
      <div className="flex flex-1 flex-col px-[10px] pt-[4px]">
        <div className="flex items-center gap-[4px]">
          <ChevronLeft className="size-[11px] text-black/40" aria-hidden="true" />
          <span className="text-[11px] font-bold">Checkout</span>
        </div>
        <div className="mt-[8px] flex items-center gap-[7px]">
          <div className="w-[36px] shrink-0">
            <Garment bg={PRODUCTS[0].bg} ink={PRODUCTS[0].ink} h={42} />
          </div>
          <div className="min-w-0 text-[9.5px] leading-tight">
            <p className="truncate font-semibold">Linen abaya</p>
            <p className="text-black/45">Sand · Size 54</p>
            <p className="font-bold">AED 388</p>
          </div>
        </div>
        <div className="mt-[8px] space-y-[3px] border-t border-black/[0.06] pt-[6px] text-[9px]">
          <p className="flex justify-between text-black/55">
            <span>Delivery</span>
            <span>Free</span>
          </p>
          <p className="flex justify-between font-bold">
            <span>Total</span>
            <span>AED 388</span>
          </p>
        </div>
        <div className="mt-[8px] rounded-[8px] p-[7px] ring-[1.5px]" style={{ boxShadow: `inset 0 0 0 1.5px ${tint}` }}>
          <div className="flex items-center justify-between">
            <span className="rounded-[4px] bg-[#3bffc1] px-[5px] py-[1px] text-[9px] font-extrabold text-black">tabby</span>
            <span className="size-[10px] rounded-full border-[3px]" style={{ borderColor: tint }} />
          </div>
          <p className="mt-[5px] text-[9px] font-semibold leading-[1.3]">4 payments of AED 97</p>
          <p className="text-[8.5px] leading-[1.3] text-black/50">Interest-free, no fees</p>
          <div className="mt-[5px] grid grid-cols-4 gap-[3px]">
            {[1, 0, 0, 0].map((on, i) => (
              <span key={i} className="h-[3px] rounded-full" style={{ background: on ? tint : "rgb(0 0 0 / 0.1)" }} />
            ))}
          </div>
        </div>
        <div className="mt-[6px] flex items-center gap-[6px] rounded-[8px] px-[7px] py-[6px] text-[9px] text-black/60 ring-1 ring-black/10">
          <span className="size-[10px] rounded-full ring-1 ring-black/25" />
          Card or Apple Pay
        </div>
        <span className="mt-auto mb-[4px] flex h-[26px] items-center justify-center rounded-[9px] bg-[#111] text-[10px] font-semibold text-white">Place order</span>
      </div>
    </Phone>
  );
}

export function MarketplaceMock({ study, v }: LayoutProps) {
  const tint = study.tint;
  if (v === "narrow") {
    return (
      <>
        <At x={4} y={10}>
          <Tilt m="left">
            <Browser w={264} h={240} url="noorandco.ae/abayas">
              <Storefront tint={tint} cols={3} count={3} tile={92} />
            </Browser>
          </Tilt>
        </At>
        <At x={244} y={0} z={2}>
          <Tilt m="lift">
            <CheckoutPhone tint={tint} w={150} h={300} />
          </Tilt>
        </At>
      </>
    );
  }
  return (
    <>
      <At x={6} y={24}>
        <Tilt m="left">
          <Browser w={444} h={330} url="noorandco.ae/abayas">
            <Storefront tint={tint} cols={4} count={4} tile={122} />
            <div className="absolute inset-x-[12px] bottom-[12px] flex items-center justify-between rounded-[8px] px-[10px] py-[7px] text-white" style={{ background: tint }}>
              <span className="text-[10px] font-semibold">{study.metrics[2]?.value} designers, one checkout</span>
              <span className="text-[9px] text-white/80">Shop the edit →</span>
            </div>
          </Browser>
        </Tilt>
      </At>
      <At x={430} y={0} z={2}>
        <Tilt m="lift">
          <CheckoutPhone tint={tint} w={180} h={364} />
        </Tilt>
      </At>
    </>
  );
}

/* ------------------------------------------------------------------ */
/* Shopify agency dev team: sprint board + Lighthouse scores            */
/* ------------------------------------------------------------------ */

const COLS = [
  {
    name: "In progress",
    dot: "#f59e0b",
    tickets: [
      { id: "NSC-214", title: "PDP image gallery", tag: "Hydrogen", who: "EL" },
      { id: "NSC-219", title: "Bundle builder", tag: "Storefront API", who: "AK" },
    ],
  },
  {
    name: "Review",
    dot: "#8b5cf6",
    tickets: [
      { id: "NSC-207", title: "Checkout UI extension", tag: "Checkout", who: "MR" },
      { id: "NSC-211", title: "Size guide modal", tag: "A11y", who: "JL" },
    ],
  },
  {
    name: "Done",
    dot: "#22c55e",
    tickets: [
      { id: "NSC-198", title: "Cart drawer upsells", tag: "Hydrogen", who: "SN" },
      { id: "NSC-201", title: "Metaobject CMS", tag: "Content", who: "EL" },
    ],
  },
];

function SprintBoard({ tint, cols, perCol }: { tint: string; cols: number; perCol: number }) {
  return (
    <div className="flex h-full flex-col bg-[#0f1012] text-white">
      <div className="flex h-[32px] shrink-0 items-center gap-[7px] border-b border-white/[0.08] px-[10px]">
        <span className="flex size-[16px] items-center justify-center rounded-[4px] text-[8px] font-bold" style={{ background: tint }}>
          N
        </span>
        <span className="text-[10.5px] font-semibold">Sprint 38</span>
        <span className="text-[9px] text-white/45">· Nordic storefront</span>
        <span className="ml-auto flex w-[70px] items-center gap-[4px] text-[8.5px] text-white/60">
          <span className="flex-1">
            <Bar pct={72} color={tint} h={4} track="rgb(255 255 255 / 0.12)" />
          </span>
          72%
        </span>
      </div>
      <div className="flex min-h-0 flex-1 gap-[7px] p-[8px]">
        {COLS.slice(3 - cols).map((c) => (
          <div key={c.name} className="flex min-w-0 flex-1 flex-col">
            <p className="flex items-center gap-[5px] px-[2px] pb-[6px] text-[9px] font-semibold text-white/75">
              <span className="size-[6px] rounded-full" style={{ background: c.dot }} />
              {c.name}
              <span className="text-white/35">{c.tickets.length + 2}</span>
            </p>
            <div className="space-y-[5px]">
              {c.tickets.slice(0, perCol).map((t) => (
                <div key={t.id} className="rounded-[6px] bg-white/[0.06] p-[6px] ring-1 ring-white/[0.08]">
                  <p className="font-mono text-[8px] text-white/40">{t.id}</p>
                  <p className="mt-[2px] truncate text-[9.5px] font-medium leading-tight">{t.title}</p>
                  <div className="mt-[5px] flex items-center justify-between">
                    <span className="rounded-[4px] bg-white/[0.08] px-[4px] py-[1.5px] text-[8px] text-white/65">{t.tag}</span>
                    <Avatar text={t.who} i={t.who.charCodeAt(0)} size={14} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function LighthouseCard({ w, size, labels = true }: { w: number; size: number; labels?: boolean }) {
  const scores = [
    ["Performance", 96],
    ["Accessibility", 100],
    ["Best practices", 100],
    ["SEO", 98],
  ] as const;
  return (
    <Card w={w}>
      <p className="text-[10.5px] font-semibold">Lighthouse · mobile</p>
      <p className="text-[8.5px] text-black/45">/products/wool-runner</p>
      <div className="mt-[8px] grid grid-cols-2 gap-x-[6px] gap-y-[8px]">
        {scores.map(([k, s]) => (
          <div key={k} className="flex flex-col items-center gap-[3px]">
            <Ring value={s} size={size} color="#0cce6b" track="#0cce6b22" />
            {labels && <span className="text-center text-[8.5px] leading-tight text-black/55">{k}</span>}
          </div>
        ))}
      </div>
    </Card>
  );
}

export function AgencySprintMock({ study, v }: LayoutProps) {
  const tint = study.tint;
  if (v === "narrow") {
    return (
      <>
        <At x={4} y={10}>
          <Tilt m="left">
            <Browser w={270} h={236} url="sprints.vaug.dev/nordic" dark>
              <SprintBoard tint={tint} cols={2} perCol={2} />
            </Browser>
          </Tilt>
        </At>
        <At x={250} y={0} z={2}>
          <Tilt m="lift">
            <LighthouseCard w={144} size={36} />
          </Tilt>
        </At>
      </>
    );
  }
  return (
    <>
      <At x={14} y={20}>
        <Tilt m="left">
          <Laptop w={430} h={300} bg="#0f1012">
            <SprintBoard tint={tint} cols={3} perCol={2} />
          </Laptop>
        </Tilt>
      </At>
      <At x={430} y={10} z={2}>
        <Tilt m="lift">
          <LighthouseCard w={196} size={46} />
        </Tilt>
      </At>
      <At x={404} y={250} z={3}>
        <div className="w-[218px] rounded-[10px] bg-white px-[10px] py-[8px] shadow-[0_14px_30px_-12px_rgb(0_0_0/0.6)]">
          <p className="flex items-center gap-[5px] text-[10px] font-semibold">
            <Rocket className="size-[11px]" style={{ color: tint }} aria-hidden="true" />
            Deployed to production
            <CheckCircle2 className="ml-auto size-[11px] text-[#16a34a]" aria-hidden="true" />
          </p>
          <p className="mt-[3px] flex items-center gap-[4px] font-mono text-[8.5px] text-black/50">
            <GitBranch className="size-[8px]" aria-hidden="true" /> main · 4f2c9a1 · 2m ago
          </p>
          <p className="mt-[4px] text-[9px] text-black/60">
            Sprint {study.screen[0]?.value} of the partnership
          </p>
        </div>
      </At>
    </>
  );
}
