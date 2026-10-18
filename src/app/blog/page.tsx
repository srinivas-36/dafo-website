import type { Metadata } from "next";
import { InteriorPage } from "@/components/site/interior-page";

export const metadata: Metadata = {
  title: "Blog",
  description: "Notes on listening, belonging, and saying the thing out loud.",
};

export default function BlogPage() {
  return (
    <InteriorPage
      title="Blog"
      lede="Notes on listening, belonging, and saying the thing out loud. Writing will show up here as we go."
    />
  );
}
