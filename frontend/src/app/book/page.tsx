import type { Metadata } from "next";
import Link from "next/link";

import { BookingApp } from "@/components/booking/BookingApp";
import { Breadcrumbs, HeroGlow } from "@/components/page/PageHero";
import { routes } from "@/content/taxonomy";
import { Band } from "@/components/ui/Band";

export const metadata: Metadata = {
  title: "Book a 30-Minute Call",
  description: "Book a free 30-minute Google Meet call with Utkarsh Mishra at VAUG. Pick a time in your own time zone and get the invite straight away.",
  alternates: { canonical: routes.book },
};

export default function BookPage() {
  return (
    <Band tone="dark" rails={false} dots={false} label="Book a call" backdrop={<HeroGlow />}>
      <div className="frame-pad relative pb-20 pt-28 sm:pt-32 lg:pt-36">
        <Breadcrumbs
          items={[
            { label: "Home", href: routes.home },
            { label: "Book a call", href: routes.book },
          ]}
        />
        <div className="mt-6">
          <BookingApp />
        </div>
        <p className="mt-6 text-sm text-muted">
          Prefer to write?{" "}
          <Link href={routes.contact} className="font-semibold text-accent-text underline-offset-2 hover:underline">
            Send us a message
          </Link>{" "}
          and a senior lead replies within one business day.
        </p>
      </div>
    </Band>
  );
}
