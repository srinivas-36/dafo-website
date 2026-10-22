import type { Metadata } from "next";
import { ContactSection } from "@/components/site/contact-section";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Join the waitlist, ask a question, or tell us about a transition you're navigating. A real person reads every message.",
};

export default function ContactPage() {
  return <ContactSection />;
}
