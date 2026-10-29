import { Hero } from "@/components/site/hero";
import { HomepageJourney } from "@/components/site/homepage-journey";
import { JsonLd } from "@/components/site/json-ld";
import { homeDescription, homeTitle, pageMetadata, pageSchema } from "@/lib/seo";

export const metadata = pageMetadata({
  title: homeTitle,
  description: homeDescription,
  path: "/",
  absoluteTitle: true,
});

export default function HomePage() {
  return (
    <>
      <JsonLd
        data={pageSchema({
          path: "/",
          name: homeTitle,
          description: homeDescription,
        })}
      />
      <Hero />
      <HomepageJourney />
    </>
  );
}
