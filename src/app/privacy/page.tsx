import type { Metadata } from "next";
import { LegalDocument } from "@/components/site/legal-document";
import {
  privacySections,
  privacyUpdated,
  privacyUpdatedDate,
} from "@/content/privacy";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How DafoTalk Private Limited collects, uses, and protects personal information on the company website.",
};

export default function PrivacyPage() {
  return (
    <LegalDocument
      kicker="Legal"
      title="Privacy Policy"
      updated={privacyUpdated}
      updatedDate={privacyUpdatedDate}
      sections={privacySections}
    />
  );
}
