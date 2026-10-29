import { InteriorPage } from "@/components/site/interior-page";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Blog",
  description: "Notes on listening, belonging, and saying the thing out loud.",
  path: "/blog",
  index: false,
});

export default function BlogPage() {
  return (
    <InteriorPage
      title="Blog"
      lede="Notes on listening, belonging, and saying the thing out loud. Writing will show up here as we go."
    />
  );
}
