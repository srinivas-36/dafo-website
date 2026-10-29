import { InteriorPage } from "@/components/site/interior-page";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "About",
  description: "DafoTalk is a place for honest conversation.",
  path: "/about",
  index: false,
});

export default function AboutPage() {
  return (
    <InteriorPage
      title="About"
      lede="DafoTalk is a place for honest conversation with someone who understands where you're coming from. No feed. No followers. No networking."
    />
  );
}
