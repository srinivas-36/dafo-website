import type { Metadata } from "next";
import { InteriorPage } from "@/components/site/interior-page";

export const metadata: Metadata = {
  title: "About",
  description: "DafoTalk is a place for honest conversation.",
};

export default function AboutPage() {
  return (
    <InteriorPage
      title="About"
      lede="DafoTalk is a place for honest conversation with someone who understands where you're coming from. No feed. No followers. No networking."
    />
  );
}
