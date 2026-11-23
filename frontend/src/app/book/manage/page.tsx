import type { Metadata } from "next";
import { Suspense } from "react";

import { ManageBooking } from "@/components/booking/ManageBooking";
import { HeroGlow } from "@/components/page/PageHero";
import { Band } from "@/components/ui/Band";

export const metadata: Metadata = {
  title: "Manage Your Booking",
  description: "Reschedule or cancel your call with VAUG.",
  robots: { index: false, follow: false },
  referrer: "no-referrer",
};

export default function ManageBookingPage() {
  return (
    <Band tone="dark" rails={false} dots={false} label="Manage your booking" backdrop={<HeroGlow />}>
      <div className="frame-pad relative min-h-[70vh] pb-20 pt-28 sm:pt-32 lg:pt-36">
        <div className="rounded-xl border border-border bg-surface p-6 sm:p-8">
          <Suspense fallback={<p className="text-sm text-muted">Loading your booking…</p>}>
            <ManageBooking />
          </Suspense>
        </div>
      </div>
    </Band>
  );
}
