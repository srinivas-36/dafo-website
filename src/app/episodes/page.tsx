import type { Metadata } from "next";
import { InteriorPage } from "@/components/site/interior-page";

export const metadata: Metadata = {
  title: "Episodes",
  description: "Stories from conversations that stayed with us.",
};

export default function EpisodesPage() {
  return (
    <InteriorPage
      title="Episodes"
      lede="Stories from conversations that stayed with us. New episodes will live here as DafoTalk opens."
    />
  );
}
