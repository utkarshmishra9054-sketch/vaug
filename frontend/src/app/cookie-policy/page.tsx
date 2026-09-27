import type { Metadata } from "next";

import { cookiePolicy } from "@/content/legal";
import { routes } from "@/content/taxonomy";
import { LegalPage } from "@/components/contact-page/LegalPage";

export const metadata: Metadata = {
  title: cookiePolicy.meta.title,
  description: cookiePolicy.meta.description,
  alternates: { canonical: routes.cookies },
};

export default function CookiePolicyPage() {
  return <LegalPage doc={cookiePolicy} />;
}
