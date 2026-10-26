import type { Metadata } from "next";
import { LegalDocument } from "@/components/site/legal-document";
import { termsSections, termsUpdated, termsUpdatedDate } from "@/content/terms";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description:
    "Terms governing access to and use of the DafoTalk company website.",
};

export default function TermsPage() {
  return (
    <LegalDocument
      kicker="Legal"
      title="Terms & Conditions"
      updated={termsUpdated}
      updatedDate={termsUpdatedDate}
      sections={termsSections}
    />
  );
}
