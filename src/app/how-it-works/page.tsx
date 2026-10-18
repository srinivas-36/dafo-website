import type { Metadata } from "next";
import { InteriorPage } from "@/components/site/interior-page";

export const metadata: Metadata = {
  title: "How It Works",
  description: "A little context about you, then someone to talk to.",
};

export default function HowItWorksPage() {
  return (
    <InteriorPage
      title="How It Works"
      lede="Share a little about who you are, what you're open to, and what you want to talk about. We use that to find someone you have something in common with."
    />
  );
}
