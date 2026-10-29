import { InteriorPage } from "@/components/site/interior-page";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Episodes",
  description: "Stories from conversations that stayed with us.",
  path: "/episodes",
  index: false,
});

export default function EpisodesPage() {
  return (
    <InteriorPage
      title="Episodes"
      lede="Stories from conversations that stayed with us. New episodes will live here as DafoTalk opens."
    />
  );
}
