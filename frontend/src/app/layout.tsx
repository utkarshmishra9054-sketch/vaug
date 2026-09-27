import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import { ContactProvider } from "@/components/contact/ContactProvider";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { Interactions } from "@/components/ui/Interactions";
import { RevealObserver } from "@/components/ui/RevealObserver";
import { getFooterColumns, getLegalLinks, getNavigation, getSiteConfig } from "@/lib/content";
import { themeInitScript } from "@/lib/theme";
import "./globals.css";

const body = Geist({ variable: "--font-body", subsets: ["latin"], weight: ["300", "400", "500", "600", "700", "800", "900"] });
const code = Geist_Mono({ variable: "--font-code", subsets: ["latin"] });

export async function generateMetadata(): Promise<Metadata> {
  const site = await getSiteConfig();
  return {
    metadataBase: new URL(site.url),
    title: { default: `${site.name}: ${site.tagline}`, template: `%s | ${site.name}` },
    description: site.description,
    openGraph: { title: site.name, description: site.description, url: site.url, siteName: site.name, type: "website" },
    twitter: { card: "summary_large_image", title: site.name, description: site.description },
  };
}

export const viewport: Viewport = {
  themeColor: "#131116",
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const [site, navigation, footerColumns, legal] = await Promise.all([
    getSiteConfig(),
    getNavigation(),
    getFooterColumns(),
    getLegalLinks(),
  ]);

  return (
    // data-theme is set before paint by the inline script; suppress the resulting attribute mismatch.
    <html lang="en" data-theme="light" suppressHydrationWarning className={`${body.variable} ${code.variable} overflow-x-clip`}>
      <head>
        {/* suppressHydrationWarning: browser extensions often inject into <head> scripts */}
        <script suppressHydrationWarning dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="min-h-dvh overflow-x-clip">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[80] focus:rounded-md focus:bg-yellow focus:px-4 focus:py-2 focus:text-ink"
        >
          Skip to content
        </a>
        <ContactProvider email={site.email}>
          <Navbar items={navigation} />
          <main id="main">{children}</main>
          <Footer site={site} columns={footerColumns} legal={legal} />
        </ContactProvider>
        <RevealObserver />
        <Interactions />
      </body>
    </html>
  );
}
