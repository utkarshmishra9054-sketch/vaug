import type { Metadata } from "next";

import { terms } from "@/content/legal";
import { routes } from "@/content/taxonomy";
import { LegalPage } from "@/components/contact-page/LegalPage";

export const metadata: Metadata = {
  title: terms.meta.title,
  description: terms.meta.description,
  alternates: { canonical: routes.terms },
};

export default function TermsPage() {
  return <LegalPage doc={terms} />;
}
