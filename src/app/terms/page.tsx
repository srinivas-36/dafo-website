import { LegalDocument } from "@/components/site/legal-document";
import { JsonLd } from "@/components/site/json-ld";
import { termsSections, termsUpdated, termsUpdatedDate } from "@/content/terms";
import { pageMetadata, pageSchema, withBrand } from "@/lib/seo";

const title = "Terms & Conditions";
const description =
  "Terms governing access to and use of the DafoTalk company website operated by DafoTalk Private Limited.";

export const metadata = pageMetadata({
  title,
  description,
  path: "/terms",
});

export default function TermsPage() {
  return (
    <>
      <JsonLd
        data={pageSchema({
          path: "/terms",
          name: withBrand(title),
          description,
          dateModified: termsUpdatedDate,
        })}
      />
      <LegalDocument
        kicker="Legal"
        title="Terms & Conditions"
        updated={termsUpdated}
        updatedDate={termsUpdatedDate}
        sections={termsSections}
      />
    </>
  );
}
