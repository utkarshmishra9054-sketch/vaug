import { startupCountries, startups } from "@/content/startups";
import { routes } from "@/content/taxonomy";
import { ArrowLink } from "@/components/ui/Button";

import { StartupPlate } from "./StartupWall";

/** Compact logo grid of every startup we've built for, linking to the full wall. */
export function StartupLogos({ cta = true }: { cta?: boolean }) {
  return (
    <div className="frame-pad pb-16">
      <ul className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-5">
        {startups.map((s) => (
          <li key={s.slug}>
            <StartupPlate s={s} className="h-20" />
          </li>
        ))}
      </ul>
      <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
        <p className="text-sm text-muted">
          {startups.length} startups in {startupCountries.length} countries: {startupCountries.join(", ")}.
        </p>
        {cta && (
          <ArrowLink href={`${routes.audience("startups")}#startups-we-built`} variant="outline">
            See what we built for each
          </ArrowLink>
        )}
      </div>
    </div>
  );
}
