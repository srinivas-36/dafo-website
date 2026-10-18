import type { Metadata } from "next";
import { InteriorPage } from "@/components/site/interior-page";

export const metadata: Metadata = {
  title: "Contact",
  description: "Ask a question or tell us what you want to talk about.",
};

export default function ContactPage() {
  return (
    <InteriorPage
      title="Contact"
      lede="A question, a partnership, or something you want us to know about. Join the waitlist and we'll be in touch, or write when a direct line is open."
    />
  );
}
