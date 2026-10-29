import { InteriorPage } from "@/components/site/interior-page";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Careers",
  description: "We're a small team building DafoTalk with care.",
  path: "/careers",
  index: false,
});

export default function CareersPage() {
  return (
    <InteriorPage
      title="Careers"
      lede="We're a small team building DafoTalk with care. Open roles will be posted here."
    />
  );
}