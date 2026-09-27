import type { Metadata } from "next";

import { privacyPolicy } from "@/content/legal";
import { routes } from "@/content/taxonomy";
import { LegalPage } from "@/components/contact-page/LegalPage";

export const metadata: Metadata = {
  title: privacyPolicy.meta.title,
  description: privacyPolicy.meta.description,
  alternates: { canonical: routes.privacy },
};

export default function PrivacyPolicyPage() {
  return <LegalPage doc={privacyPolicy} />;
}
