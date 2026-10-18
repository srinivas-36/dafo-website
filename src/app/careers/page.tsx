import type { Metadata } from "next";
import { InteriorPage } from "@/components/site/interior-page";

export const metadata: Metadata = {
  title: "Careers",
  description: "We're a small team building DafoTalk with care.",
};

export default function CareersPage() {
  return (
    <InteriorPage
      title="Careers"
      lede="We're a small team building DafoTalk with care. Open roles will be posted here."
    />
  );
}