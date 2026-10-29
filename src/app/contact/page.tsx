import { ContactSection } from "@/components/site/contact-section";
import { JsonLd } from "@/components/site/json-ld";
import { pageMetadata, pageSchema, withBrand } from "@/lib/seo";

const title = "Contact";
const description =
  "Joining the waitlist, have a question, or want to work with DafoTalk? Send a message. A real person reads every note.";

export const metadata = pageMetadata({
  title,
  description,
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <JsonLd
        data={pageSchema({
          path: "/contact",
          name: withBrand(title),
          description,
          type: "ContactPage",
        })}
      />
      <ContactSection />
    </>
  );
}
