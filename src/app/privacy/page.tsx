import { LegalDocument } from "@/components/site/legal-document";
import { JsonLd } from "@/components/site/json-ld";
import {
  privacySections,
  privacyUpdated,
  privacyUpdatedDate,
} from "@/content/privacy";
import { pageMetadata, pageSchema, withBrand } from "@/lib/seo";

const title = "Privacy Policy";
const description =
  "How DafoTalk Private Limited collects, uses, and protects personal information on the company website.";

export const metadata = pageMetadata({
  title,
  description,
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <>
      <JsonLd
        data={pageSchema({
          path: "/privacy",
          name: withBrand(title),
          description,
          dateModified: privacyUpdatedDate,
        })}
      />
      <LegalDocument
        kicker="Legal"
        title="Privacy Policy"
        updated={privacyUpdated}
        updatedDate={privacyUpdatedDate}
        sections={privacySections}
      />
    </>
  );
}
