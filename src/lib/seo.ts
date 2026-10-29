import type { Metadata } from "next";

const configuredUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://dafotalk.com";

export const site = {
  name: "DafoTalk",
  legalName: "DafoTalk Private Limited",
  url: configuredUrl.replace(/\/$/, ""),
  email: "hello@dafotalk.com",
  locale: "en_IN",
  language: "en",
  sameAs: [
    "https://www.instagram.com/dafotalk",
    "https://www.linkedin.com/company/dafotalk",
  ],
  address: {
    streetAddress: "89/2-16-8-1-A",
    addressLocality: "Kurnool",
    addressRegion: "Andhra Pradesh",
    addressCountry: "IN",
  },
} as const;

/** Live homepage title. Short enough to show in full on mobile search results. */
export const homeTitle = "Talk to Someone Who Understands | DafoTalk";

export const homeDescription =
  "DafoTalk matches you by who you are and what you want to talk about on contextual basis — an anonymous, moderated conversation with someone on a similar path.";

export const titleTemplate = `%s | ${site.name}`;

const indexRobots: Metadata["robots"] = {
  index: true,
  follow: true,
  googleBot: {
    index: true,
    follow: true,
    "max-image-preview": "large",
    "max-snippet": -1,
    "max-video-preview": -1,
  },
};

const noIndexRobots: Metadata["robots"] = {
  index: false,
  follow: true,
  googleBot: {
    index: false,
    follow: true,
  },
};

export function withBrand(title: string) {
  return `${title} | ${site.name}`;
}

export function absoluteUrl(path = "/") {
  if (path === "/") return site.url;
  return `${site.url}${path.startsWith("/") ? path : `/${path}`}`;
}

const socialImage = {
  url: "/opengraph-image",
  width: 1200,
  height: 630,
  alt: "DafoTalk — Sometimes, you just need someone to talk to.",
} as const;

export function pageMetadata({
  title,
  description,
  path,
  index = true,
  absoluteTitle = false,
}: {
  title: string;
  description: string;
  path: string;
  index?: boolean;
  absoluteTitle?: boolean;
}): Metadata {
  const fullTitle = absoluteTitle ? title : withBrand(title);
  const brandedTitle = { absolute: fullTitle };

  return {
    title: absoluteTitle ? brandedTitle : title,
    description,
    alternates: { canonical: path },
    robots: index ? indexRobots : noIndexRobots,
    openGraph: {
      type: "website",
      locale: site.locale,
      siteName: site.name,
      title: brandedTitle,
      description,
      url: path,
      images: [socialImage],
    },
  };
}

export function organizationGraph() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${site.url}/#organization`,
        name: site.name,
        legalName: site.legalName,
        url: site.url,
        logo: {
          "@type": "ImageObject",
          url: `${site.url}/logo-mark.webp`,
        },
        email: site.email,
        address: {
          "@type": "PostalAddress",
          ...site.address,
        },
        sameAs: site.sameAs,
      },
      {
        "@type": "WebSite",
        "@id": `${site.url}/#website`,
        url: site.url,
        name: site.name,
        description: homeDescription,
        inLanguage: site.language,
        publisher: { "@id": `${site.url}/#organization` },
      },
    ],
  };
}

export function pageSchema({
  path,
  name,
  description,
  type = "WebPage",
  dateModified,
}: {
  path: string;
  name: string;
  description: string;
  type?: "WebPage" | "ContactPage";
  dateModified?: string;
}) {
  const url = absoluteUrl(path);
  const idBase = path === "/" ? `${site.url}/` : url;
  const crumbName = name.replace(` | ${site.name}`, "");
  const crumbs =
    path === "/"
      ? []
      : [
          { name: "Home", item: site.url },
          { name: crumbName, item: url },
        ];

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": type,
        "@id": `${idBase}#webpage`,
        url,
        name,
        description,
        isPartOf: { "@id": `${site.url}/#website` },
        about: { "@id": `${site.url}/#organization` },
        inLanguage: site.language,
        ...(dateModified ? { dateModified } : {}),
        ...(crumbs.length
          ? { breadcrumb: { "@id": `${idBase}#breadcrumb` } }
          : {}),
      },
      ...(crumbs.length
        ? [
            {
              "@type": "BreadcrumbList",
              "@id": `${idBase}#breadcrumb`,
              itemListElement: crumbs.map((crumb, index) => ({
                "@type": "ListItem",
                position: index + 1,
                name: crumb.name,
                item: crumb.item,
              })),
            },
          ]
        : []),
    ],
  };
}
