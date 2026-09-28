import type { ReactNode } from "react";
import { Camera, ChevronDown, Coffee, Mail, MessageCircle, Mic, Package, Phone, Search, Settings, Wheat, X, LayoutGrid } from "lucide-react";

import { CellBar, LookerControl, LookerScore, LookerStudio, LookerTable } from "./invoiceInterchange";
import type { Screen } from "./kit";
import {
  BrowserChrome,
  CheckBox,
  FONT,
  G,
  GAdsChartCard,
  GAdsDot,
  GAdsTable,
  GLink,
  GoogleAdsShell,
  GoogleWordmark,
  Initials,
  LogoAvatar,
  noisy,
  PhoneBackdrop,
  PhoneFrame,
  Photo,
  Place,
  SerpAd,
  SerpLabel,
  SerpResult,
  WhatsAppChat,
  type Col,
  type WaMessage,
} from "./tools";

/* Well Aliments Brazil · B2B enquiries, São Paulo (Google Ads in PT and EN, private-label
   landing page, WhatsApp qualification flow, Looker Studio enquiry dashboard).
   TODO(content): every figure below is illustrative (see the study file).
   August 2026: Google Ads R$3,667.01, 96 qualified enquiries = R$38.20 each (from 22 a month),
   68% of enquiries start on WhatsApp, median first reply 4 min. */

const GREEN = "#0f8a5b";
const BROWN = "#2b1d18";
const WA = "#25d366";

const LOGO = { src: "/logos/well-aliments.webp", img: { w: 116, h: 120 } };
const SITE = { src: "/sites/well-aliments.webp", img: { w: 1440, h: 900 } };

function Avatar({ size }: { size: number }) {
  return (
    <LogoAvatar size={size}>
      <Photo {...LOGO} w={size * 0.72} h={size * 0.745} />
    </LogoAvatar>
  );
}

/* 01 · Google Ads campaigns (PT and EN) ------------------------------ */

const GCOLS: Col[] = [
  { label: <CheckBox size={8} />, w: 18 },
  { label: "", w: 12 },
  { label: "Campaign", w: 128 },
  { label: "Budget", w: 54 },
  { label: "Status", w: 54 },
  { label: "Campaign type", w: 46 },
  { label: "Impr.", w: 40, align: "right" },
  { label: "Clicks", w: 32, align: "right" },
  { label: "CTR", w: 36, align: "right" },
  { label: "Cost", w: 50, align: "right" },
  { label: "Conversions", w: 52, align: "right" },
  { label: "Cost / conv.", w: 46, align: "right" },
];

const wrap = (t: ReactNode) => <span style={{ whiteSpace: "normal", display: "block", lineHeight: 1.1 }}>{t}</span>;

type GRow = [string, string, string, string, "enabled" | "paused", string, string, string, string, string, string];
const G_ROWS: GRow[] = [
  ["WA_PT_Search_MarcaPropria", "R$40.00/day", "Eligible", "Search", "enabled", "6,914", "612", "8.85%", "R$1,084.37", "41.00", "R$26.45"],
  ["WA_PT_Search_Granel_CafeCacau", "R$25.00/day", "Limited by budget", "Search", "enabled", "8,402", "471", "5.61%", "R$774.12", "29.00", "R$26.69"],
  ["WA_EN_Search_Export_US-EU", "R$30.00/day", "Eligible", "Search", "enabled", "5,188", "203", "3.91%", "R$897.66", "17.00", "R$52.80"],
  ["WA_EN_Search_PrivateLabel_ME", "R$15.00/day", "Eligible", "Search", "enabled", "2,207", "88", "3.99%", "R$391.40", "6.00", "R$65.23"],
  ["WA_PT_Brand_WellAliments", "R$10.00/day", "Eligible", "Search", "enabled", "611", "214", "35.02%", "R$96.31", "21.00", "R$4.59"],
  ["WA_PT_PMax_B2B_Remarketing", "R$12.00/day", "Eligible (Learning)", "Performance Max", "enabled", "31,540", "297", "0.94%", "R$318.95", "4.00", "R$79.74"],
  ["WA_EN_Search_Cocoa_Bulk", "R$20.00/day", "Paused", "Search", "paused", "1,120", "31", "2.77%", "R$104.20", "0.00", "R$0.00"],
];

// 1 – 31 Aug 2026 (starts on a Saturday).
const G_CONV = noisy({ n: 31, from: 3.4, to: 4.3, seed: 61, noise: 0.4, weekly: 0.55, weekStart: 5, decimals: 1, bumps: { 10: 1.6, 17: 0.5, 24: 1.35 } });
const G_COST = noisy({ n: 31, from: 118, to: 124, seed: 62, noise: 0.1, weekly: 0.25, weekStart: 5, bumps: { 22: 0.7 } });

export const AdsOverview: Screen = () => (
  <GoogleAdsShell account="Well Aliments Brazil Ltda." customerId="418-297-6603" title="Campaigns" dateRange="1 – 31 Aug 2026" nav={null} url="ads.google.com/aw/campaigns?ocid=804417263&__c=4182976603">
    <GAdsChartCard
      w={548}
      h={40}
      metrics={[
        { label: "Conversions", value: "118.00", on: true },
        { label: "Cost", value: "R$3.67K", on: true },
        { label: "Clicks", value: "1.92K" },
        { label: "Cost / conv.", value: "R$31.08" },
      ]}
      series={[G_CONV, G_COST]}
      xLabels={["1 Aug 2026", "31 Aug 2026"]}
      left={{ max: 10, ticks: 2, format: (n) => `${n}` }}
      right={{ max: 200, ticks: 2, format: (n) => (n ? `R$${n}` : "R$0") }}
    />
    <GAdsTable
      cols={GCOLS}
      rowH={19}
      rows={G_ROWS.map(([name, budget, status, type, state, ...m]) => [
        <CheckBox key="c" size={8} />,
        <GAdsDot key="d" state={state} />,
        <GLink key="n">{name}</GLink>,
        budget,
        status.length > 10 ? <span key="s">{wrap(status)}</span> : <span key="s" style={{ color: status === "Paused" ? G.grey : G.text }}>{status}</span>,
        type === "Performance Max" ? <span key="t">{wrap(type)}</span> : type,
        ...m,
      ])}
      total={["", "", "Total: all campaigns", "", "", "", "55,982", "1,916", "3.42%", "R$3,667.01", "118.00", "R$31.08"]}
    />
  </GoogleAdsShell>
);

/* 02 · Google search (pt-BR) with the sponsored result --------------- */

function Fav({ bg, color = "#fff", t }: { bg: string; color?: string; t: string }) {
  return (
    <span className="flex items-center justify-center" style={{ width: 12, height: 12, borderRadius: 2, background: bg, color, fontSize: 6.5, fontWeight: 700, fontFamily: "Arial, sans-serif" }}>
      {t}
    </span>
  );
}

const favicon = (
  <span className="flex items-center justify-center" style={{ width: 18, height: 18, background: "#fff" }}>
    <Photo {...LOGO} crop={{ x: 18, y: 0, w: 80, h: 62 }} w={13} h={10} />
  </span>
);

/** Google results page as a Brazilian user sees it (Portuguese UI). */
function GoogleSerpPT({ query, children }: { query: string; children: ReactNode }) {
  const ic = { width: 10, height: 10 };
  return (
    <BrowserChrome url={`google.com.br/search?q=${encodeURIComponent(query).replace(/%20/g, "+")}&hl=pt-BR`}>
      <div className="h-full" style={{ fontFamily: FONT.google, color: G.text, background: "#fff" }}>
        <div className="flex items-center" style={{ height: 44, padding: "0 14px 0 18px", gap: 18 }}>
          <GoogleWordmark size={19} />
          <span className="flex items-center" style={{ width: 360, height: 26, borderRadius: 13, boxShadow: "0 1px 5px rgb(32 33 36 / 0.22)", padding: "0 10px 0 13px", gap: 8, fontSize: 9.5 }}>
            <span className="flex-1 truncate">{query}</span>
            <X style={{ width: 11, height: 11, color: "#70757a" }} aria-hidden="true" />
            <span style={{ width: 1, height: 14, background: G.border }} />
            <Mic style={{ ...ic, color: G.blue }} aria-hidden="true" />
            <Camera style={{ ...ic, color: G.green }} aria-hidden="true" />
            <Search style={{ ...ic, color: G.blue }} aria-hidden="true" />
          </span>
          <span className="ml-auto flex items-center" style={{ gap: 10, color: G.grey }}>
            <Settings style={{ width: 11, height: 11 }} aria-hidden="true" />
            <LayoutGrid style={{ width: 11, height: 11 }} aria-hidden="true" />
            <Initials name="Mariana Souza" size={18} bg="#c26401" />
          </span>
        </div>
        <div className="flex items-end" style={{ height: 22, paddingLeft: 98, gap: 14, fontSize: 8.5, color: G.grey, borderBottom: `1px solid ${G.line}` }}>
          {["Todas", "Imagens", "Shopping", "Notícias", "Vídeos", "Maps", "Mais"].map((t, i) => (
            <span key={t} style={{ paddingBottom: 5, borderBottom: i === 0 ? `2.5px solid ${G.text}` : "2.5px solid transparent", color: i === 0 ? G.text : undefined, fontWeight: i === 0 ? 500 : 400 }}>
              {t}
            </span>
          ))}
          <span className="ml-auto" style={{ paddingBottom: 5, marginRight: 150 }}>
            Ferramentas
          </span>
        </div>
        <div style={{ paddingLeft: 98, paddingTop: 12, width: 428 }}>{children}</div>
      </div>
    </BrowserChrome>
  );
}

export const SearchAd: Screen = () => (
  <GoogleSerpPT query="café marca própria fornecedor">
    <SerpLabel>Patrocinado</SerpLabel>
    <SerpAd
      ad={{
        site: "Well Aliments Brazil",
        url: "https://www.wellaliments.com.br › marca-propria",
        favicon,
        title: "Café Marca Própria | Fabricante em São Paulo",
        desc: "Produza café com a sua marca: torra, moagem, embalagem e rótulo. Pedido mínimo a partir de 500 kg. Fale com um especialista pelo WhatsApp.",
        sitelinks: ["Marca Própria", "Blends Personalizados", "Embalagens", "Pedir Orçamento"],
      }}
    />
    <SerpResult
      r={{
        site: "Sebrae",
        url: "https://sebrae.com.br › sites › PortalSebrae › artigos",
        favicon: <Fav bg="#005eb8" t="S" />,
        title: "Como criar uma marca própria de café: passo a passo",
        date: "14 de mai. de 2026",
        desc: "Entenda como funciona a terceirização da torra, os custos de embalagem e registro e o que avaliar ao escolher um fornecedor de café para a sua marca...",
      }}
    />
    <SerpResult
      r={{
        site: "Well Aliments Brazil",
        url: "https://wellaliments.com.br › blends-personalizados",
        favicon,
        title: "Blends Personalizados de Café e Cacau - Well Aliments",
        desc: "Desenvolvemos blends exclusivos para cafeterias, redes e marcas próprias, com amostras e ficha técnica antes da produção.",
      }}
    />
    <SerpResult
      r={{
        site: "ABIC",
        url: "https://www.abic.com.br › certificacao › selo-de-pureza",
        favicon: <Fav bg="#7a4b2a" t="A" />,
        title: "Selo de Pureza ABIC: empresas e marcas certificadas",
        desc: "Consulte as indústrias de café com o Selo de Pureza e os programas de qualidade da Associação Brasileira da Indústria de Café.",
      }}
    />
  </GoogleSerpPT>
);

/* 03 · Private-label landing page (PT) ------------------------------ */

const MOQ: [typeof Coffee, string, string][] = [
  [Coffee, "Café torrado e moído", "a partir de 500 kg"],
  [Coffee, "Café torrado em grãos", "a partir de 500 kg"],
  [Package, "Cápsulas de café", "a partir de 10 mil unidades"],
  [Wheat, "Achocolatado e cacau em pó", "a partir de 1 tonelada"],
];

export const LandingPage: Screen = () => (
  <BrowserChrome url="wellaliments.com.br/marca-propria?utm_source=google&utm_medium=cpc&utm_campaign=WA_PT_Search_MarcaPropria">
    <div className="relative h-full" style={{ fontFamily: FONT.web, color: "#1f2a24", background: "#fff" }}>
      <div className="flex items-center" style={{ height: 16, background: BROWN, color: "#e9e4e0", fontSize: 6.5, padding: "0 20px", gap: 12 }}>
        <span className="flex items-center" style={{ gap: 4, fontWeight: 500 }}>
          <span style={{ width: 4, height: 4, borderRadius: "50%", background: "#22c55e" }} />
          Fabricante, Exportador e Parceiro de Marca Própria — Café, Cacau e Bebidas do Brasil
        </span>
        <span className="ml-auto flex items-center" style={{ gap: 3 }}>
          <Mail style={{ width: 7, height: 7 }} aria-hidden="true" />
          info@wellaliments.com.br
        </span>
        <span className="flex items-center" style={{ gap: 3 }}>
          <Phone style={{ width: 7, height: 7 }} aria-hidden="true" />
          +55 (11) 99240-8118
        </span>
      </div>
      <header className="flex items-center" style={{ height: 36, background: GREEN, padding: "0 20px", gap: 10, color: "#fff" }}>
        <Photo {...LOGO} w={24} h={24.8} style={{ filter: "brightness(0) invert(1)" }} />
        <nav className="ml-auto flex items-center" style={{ gap: 10, fontSize: 7.5, fontWeight: 600 }}>
          {["Início", "Sobre Nós", "Produtos", "Marca Própria", "Blends", "Embalagens", "Granel", "Serviços"].map((t) => (
            <span key={t} className="flex items-center" style={{ gap: 2, borderBottom: t === "Marca Própria" ? "1.5px solid #fff" : "1.5px solid transparent", paddingBottom: 1 }}>
              {t}
              {t === "Produtos" && <ChevronDown style={{ width: 6, height: 6 }} aria-hidden="true" />}
            </span>
          ))}
        </nav>
        <span className="flex items-center" style={{ gap: 5, padding: "4px 8px", borderRadius: 12, background: "rgb(255 255 255 / 0.12)", fontSize: 7, fontWeight: 600 }}>
          <span style={{ opacity: 0.7 }}>EN</span>|<span>PT</span>
        </span>
        <span style={{ padding: "5px 10px", borderRadius: 12, background: "#fff", color: "#1f2a24", fontSize: 7.5, fontWeight: 600 }}>Fale Conosco</span>
      </header>
      <section className="relative flex flex-col items-center text-center" style={{ height: 176, paddingTop: 24, color: "#fff", overflow: "hidden" }}>
        <div className="absolute inset-0">
          <Photo {...SITE} crop={{ x: 10, y: 100, w: 400, h: 110 }} w={640} h={176} />
        </div>
        <span className="relative" style={{ fontSize: 6.5, fontWeight: 700, letterSpacing: 1.3, padding: "4px 9px", border: "1px solid rgb(255 255 255 / 0.45)", borderRadius: 3, background: "rgb(0 0 0 / 0.08)" }}>
          MARCA PRÓPRIA · DO GRÃO À EMBALAGEM
        </span>
        <h1 className="relative" style={{ fontSize: 21, fontWeight: 700, lineHeight: 1.12, marginTop: 9, letterSpacing: -0.4, maxWidth: 440 }}>
          Seu café com a sua marca, produzido no Brasil
        </h1>
        <p className="relative" style={{ fontSize: 8.5, lineHeight: 1.5, marginTop: 7, opacity: 0.92, maxWidth: 400 }}>
          Torra, moagem, blend, embalagem e rótulo em uma só fábrica em São Paulo. Envie o seu volume e receba uma proposta em até 24 horas.
        </p>
        <div className="relative flex" style={{ gap: 8, marginTop: 12 }}>
          <span className="flex items-center" style={{ gap: 5, padding: "7px 14px", borderRadius: 16, background: WA, color: "#fff", fontSize: 8.5, fontWeight: 700 }}>
            <MessageCircle style={{ width: 10, height: 10 }} fill="#fff" aria-hidden="true" />
            Falar no WhatsApp
          </span>
          <span style={{ padding: "6px 14px", borderRadius: 16, border: "1.5px solid #fff", fontSize: 8.5, fontWeight: 700 }}>Ver pedidos mínimos</span>
        </div>
      </section>
      <section style={{ padding: "14px 20px 0" }}>
        <p style={{ fontSize: 7, fontWeight: 700, letterSpacing: 1, color: GREEN }}>PEDIDOS MÍNIMOS</p>
        <p style={{ fontSize: 12, fontWeight: 700, marginTop: 3 }}>Escolha o produto e o volume da sua marca</p>
        <div className="flex" style={{ gap: 8, marginTop: 9 }}>
          {MOQ.map(([I, t, v]) => (
            <div key={t} className="flex-1" style={{ border: "1px solid #e3e8e5", borderRadius: 6, padding: "8px 9px" }}>
              <span className="flex items-center justify-center" style={{ width: 20, height: 20, borderRadius: 5, background: "#e7f4ee", color: GREEN }}>
                <I style={{ width: 10, height: 10 }} aria-hidden="true" />
              </span>
              <p style={{ fontSize: 8, fontWeight: 700, marginTop: 6 }}>{t}</p>
              <p style={{ fontSize: 7, color: "#5b6660", marginTop: 1 }}>{v}</p>
              <p style={{ fontSize: 7, color: GREEN, fontWeight: 600, marginTop: 5 }}>Pedir orçamento →</p>
            </div>
          ))}
        </div>
      </section>
      <span className="absolute flex items-center justify-center" style={{ right: 16, bottom: 14, width: 30, height: 30, borderRadius: "50%", background: WA, boxShadow: "0 2px 6px rgb(0 0 0 / 0.25)" }}>
        <MessageCircle style={{ width: 15, height: 15, color: "#fff" }} fill="#fff" aria-hidden="true" />
      </span>
    </div>
  </BrowserChrome>
);

/* 04 · WhatsApp qualification flow ---------------------------------- */

/** A message with WhatsApp interactive reply buttons under it. */
function Buttons({ text, options }: { text: ReactNode; options: string[] }) {
  return (
    <span className="block">
      <span className="block">{text}</span>
      <span className="block" style={{ margin: "4px -6px -3px", clear: "both" }}>
        {options.map((o) => (
          <span key={o} className="block text-center" style={{ borderTop: "0.5px solid #e2e2e2", padding: "3px 0", color: "#027eb5", fontWeight: 500 }}>
            {o}
          </span>
        ))}
      </span>
    </span>
  );
}

const b = (t: string) => <b style={{ fontWeight: 700 }}>{t}</b>;

const CHAT_1: WaMessage[] = [
  { day: "Hoje", me: true, text: "Olá! Vi o anúncio de vocês no Google. Quero um orçamento de café com a minha marca.", time: "10:41" },
  {
    text: (
      <Buttons
        text={
          <>
            Olá! Obrigado pelo contato com a Well Aliments. São 4 perguntas rápidas.
            <br />
            <br />
            {b("1/4")} Qual produto você procura?
          </>
        }
        options={["Café torrado e moído", "Café em grãos", "Cacau / achocolatado"]}
      />
    ),
    time: "10:41",
  },
  { me: true, text: "Café torrado e moído", time: "10:41" },
  { text: <Buttons text={<>{b("2/4")} Qual o volume mensal estimado?</>} options={["Até 500 kg", "De 500 kg a 2 t", "Acima de 2 t"]} />, time: "10:42" },
];

const CHAT_2: WaMessage[] = [
  { me: true, text: "De 500 kg a 2 t", time: "10:42" },
  { text: <>{b("3/4")} Qual embalagem? Pode escrever o formato e o peso.</>, time: "10:42" },
  { me: true, text: "Stand-up pouch 500 g com válvula", time: "10:42" },
  { text: <>{b("4/4")} Para qual cidade e estado é a entrega?</>, time: "10:43" },
  { me: true, text: "Curitiba - PR", time: "10:43" },
  { text: "Perfeito! Encaminhei para o Rafael, do comercial da região Sul. Ele responde por aqui em instantes.", time: "10:43" },
  { text: "Oi, tudo bem? Aqui é o Rafael, da Well Aliments. Vi que você procura café torrado e moído em stand-up de 500 g, 500 kg a 2 t/mês, entrega em Curitiba. Posso te enviar nossa tabela de marca própria?", time: "10:47" },
  { me: true, text: "Pode sim, obrigada!", time: "10:48" },
];

export const WhatsAppFlow: Screen = () => (
  <PhoneBackdrop>
    <Place x={118} y={10}>
      <PhoneFrame time="10:41">
        <WhatsAppChat name="Well Aliments Brazil" status="Conta comercial" avatar={<Avatar size={20} />} messages={CHAT_1} />
      </PhoneFrame>
    </Place>
    <Place x={342} y={10}>
      <PhoneFrame time="10:48">
        <WhatsAppChat name="Well Aliments Brazil" status="Conta comercial" avatar={<Avatar size={20} />} messages={CHAT_2} />
      </PhoneFrame>
    </Place>
  </PhoneBackdrop>
);

/* 05 · Looker Studio enquiry dashboard (pt-BR) ---------------------- */

const brl = (n: number) => `R$ ${n.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

const CAMPAIGNS: [string, number, number, number][] = [
  ["WA_PT_Search_MarcaPropria", 41, 34, 1084.37],
  ["WA_PT_Search_Granel_CafeCacau", 29, 22, 774.12],
  ["WA_PT_Brand_WellAliments", 21, 12, 96.31],
  ["WA_EN_Search_Export_US-EU", 17, 11, 897.66],
  ["WA_EN_Search_PrivateLabel_ME", 6, 4, 391.4],
  ["WA_PT_PMax_B2B_Remarketing", 4, 2, 318.95],
  ["Orgânico / direto", 19, 11, 0],
  ["WA_EN_Search_Cocoa_Bulk", 0, 0, 104.2],
];

const PRODUCTS: [string, number][] = [
  ["Café torrado e moído", 41],
  ["Café em grãos", 22],
  ["Cacau e achocolatado", 18],
  ["Cápsulas", 9],
  ["Outros", 6],
];

const REGIONS: [string, number][] = [
  ["São Paulo", 27],
  ["Exterior (EUA, UE, Or. Médio)", 18],
  ["Paraná", 14],
  ["Minas Gerais", 11],
  ["Outros estados", 11],
  ["Rio de Janeiro", 9],
  ["Santa Catarina", 6],
];

function HBars({ title, rows, max, ticks }: { title: string; rows: [string, number][]; max: number; ticks: number[] }) {
  const bw = 78;
  return (
    <div>
      <p style={{ fontSize: 7.5, fontWeight: 500 }}>{title}</p>
      <div className="flex flex-col" style={{ gap: 3, marginTop: 5 }}>
        {rows.map(([l, v]) => (
          <div key={l} className="flex items-center" style={{ gap: 4, fontSize: 6.5 }}>
            <span className="truncate" style={{ width: 88, color: G.grey }}>
              {l}
            </span>
            <span style={{ width: (v / max) * bw, height: 9, background: "#4285f4" }} />
            <span style={{ fontVariantNumeric: "tabular-nums" }}>{v}</span>
          </div>
        ))}
      </div>
      <div className="flex justify-between" style={{ marginLeft: 92, width: bw, marginTop: 3, fontSize: 5.5, color: G.grey }}>
        {ticks.map((t) => (
          <span key={t}>{t}</span>
        ))}
      </div>
    </div>
  );
}

export const EnquiryDashboard: Screen = () => (
  <LookerStudio title="Well Aliments · Painel de leads B2B" url="lookerstudio.google.com/reporting/2f9b7c41-6d0e-4a83-b5e2-9c17a4d08e3b/page/p_8vq2m1xkld" labels={["Redefinir", "Compartilhar", "Editar"]}>
    <div className="flex items-center" style={{ gap: 8 }}>
      <Photo {...LOGO} w={19} h={19.6} />
      <span style={{ fontSize: 10, fontWeight: 600, color: "#0b6b4c" }}>Leads B2B por campanha, produto e região</span>
      <span className="ml-auto flex items-center" style={{ gap: 6 }}>
        <LookerControl w={72}>Canal: Todos</LookerControl>
        <LookerControl>1 de ago. de 2026 - 31 de ago. de 2026</LookerControl>
      </span>
    </div>
    <div className="flex" style={{ gap: 6, marginTop: 8 }}>
      <LookerScore label="Leads qualificados" value="96" change="14,3%" />
      <LookerScore label="Iniciados no WhatsApp" value="68%" change="5,1%" />
      <LookerScore label="Investimento" value={brl(3667.01)} change="2,2%" good={false} />
      <LookerScore label="Custo / lead qualif." value="R$ 38,20" change="10,6%" up={false} />
      <LookerScore label="Mediana da 1ª resposta" value="4 min" change="20,0%" up={false} />
      <LookerScore label="Negociações abertas" value="41" change="17,1%" />
    </div>
    <div className="flex" style={{ gap: 12, marginTop: 9 }}>
      <div style={{ width: 400 }}>
        <p style={{ fontSize: 7.5, fontWeight: 500, marginBottom: 5 }}>Leads por campanha</p>
        <LookerTable
          cols={[
            { label: "Campanha", w: 128 },
            { label: "Leads", w: 38, align: "right" },
            { label: "Qualificados", w: 70, align: "right" },
            { label: "Investimento", w: 66, align: "right" },
            { label: "Custo / qualif.", w: 66, align: "right" },
          ]}
          rows={CAMPAIGNS.map(([c, l, q, s]) => [c, l, <CellBar key="q" v={q} max={34} label={`${q}`} />, brl(s), q && s ? brl(s / q) : "–"])}
          total={["Total geral", "137", "96", brl(3667.01), brl(38.2)]}
          pager="1 - 8 / 8"
        />
      </div>
      <div className="flex min-w-0 flex-1 flex-col" style={{ gap: 10 }}>
        <HBars title="Leads qualificados por produto" rows={PRODUCTS} max={45} ticks={[0, 15, 30, 45]} />
        <HBars title="Leads qualificados por região" rows={REGIONS} max={30} ticks={[0, 10, 20, 30]} />
      </div>
    </div>
  </LookerStudio>
);

export const wellAlimentsScreens: Screen[] = [AdsOverview, SearchAd, LandingPage, WhatsAppFlow, EnquiryDashboard];
