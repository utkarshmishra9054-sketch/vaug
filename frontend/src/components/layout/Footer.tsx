import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";

import type { FooterColumn, Link as LinkItem, SiteConfig } from "@/content/types";
import { Logo } from "@/components/ui/Logo";
import { SocialIcon } from "@/components/ui/SocialIcon";
import { FooterWordmark } from "./FooterWordmark";
import { SubscribeForm } from "./SubscribeForm";

export function Footer({ site, columns, legal }: { site: SiteConfig; columns: FooterColumn[]; legal: LinkItem[] }) {
  return (
    <footer data-tone="dark" className="band border-b-0">
      <div className="frame">
        {/* Offices */}
        <ul className="grid border-b border-border md:grid-cols-3">
          {site.offices.map((o, i) => (
            <li key={o.entity} data-glow data-reveal style={{ "--reveal-delay": `${i * 80}ms` } as React.CSSProperties} className="border-border px-8 py-10 max-md:border-b md:border-r md:last:border-r-0 md:border-dashed lg:px-12">
              <p className="flex items-center gap-3 text-xl text-fg">
                <span aria-hidden="true">{o.flag}</span>
                {o.entity}
              </p>
              <div className="mt-6 flex flex-col gap-3 font-mono text-[13px] text-muted">
                <p className="flex gap-3">
                  <MapPin className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
                  {o.address}
                </p>
                {o.phone && (
                  <a href={`tel:${o.phone.replace(/\s/g, "")}`} className="flex gap-3 transition-colors hover:text-fg">
                    <Phone className="size-4 shrink-0" aria-hidden="true" />
                    {o.phone}
                  </a>
                )}
                <a href={`mailto:${o.email}`} className="flex gap-3 transition-colors hover:text-fg">
                  <Mail className="size-4 shrink-0" aria-hidden="true" />
                  {o.email}
                </a>
              </div>
            </li>
          ))}
        </ul>

        {/* Brand + links */}
        <div className="grid border-b border-border lg:grid-cols-[minmax(0,0.8fr)_minmax(0,2.2fr)]">
          <div data-reveal className="flex flex-col gap-6 border-border p-8 max-lg:border-b lg:border-r lg:p-10">
            <Logo size="lg" />
            <p className="text-sm text-fg">{site.motto}</p>
            {site.socials.some((s) => s.href) && (
            <ul className="flex flex-wrap gap-2">
              {site.socials.filter((s) => s.href).map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    aria-label={s.label}
                    data-magnetic
                    className="inline-flex size-10 items-center justify-center rounded-sm bg-surface-2 text-fg transition-colors hover:bg-yellow hover:text-ink"
                  >
                    <SocialIcon name={s.icon} />
                  </a>
                </li>
              ))}
            </ul>
            )}
            <SubscribeForm />
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4">
            {columns.map((col, i) => (
              <div key={col.title} data-reveal style={{ "--reveal-delay": `${i * 70}ms` } as React.CSSProperties} className="border-border p-8 max-lg:border-b max-lg:[&:nth-child(odd)]:border-r lg:border-r lg:last:border-r-0 lg:p-8">
                <h3 className="text-lg font-medium text-fg">{col.title}</h3>
                <ul className="mt-6 flex flex-col gap-3.5 text-[15px]">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <Link href={link.href} className="link-underline text-muted hover:text-fg">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Oversized wordmark: writes itself, then a growth line rises from the dot */}
        <div className="border-b border-border px-4 pt-10 sm:px-8 lg:px-10">
          <FooterWordmark />
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col gap-4 px-8 py-8 text-sm sm:flex-row sm:items-center sm:justify-between lg:px-10">
          <p className="text-muted">
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {legal.map((l) => (
              <li key={l.label}>
                <Link href={l.href} className="link-underline text-muted hover:text-fg">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
