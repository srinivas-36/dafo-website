import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/seo";

const pages: {
  path: string;
  lastModified: string;
  changeFrequency: "weekly" | "monthly" | "yearly";
  priority: number;
}[] = [
  {
    path: "/",
    lastModified: "2026-10-27",
    changeFrequency: "weekly",
    priority: 1,
  },
  {
    path: "/contact",
    lastModified: "2026-10-27",
    changeFrequency: "monthly",
    priority: 0.8,
  },
  {
    path: "/privacy",
    lastModified: "2026-10-26",
    changeFrequency: "yearly",
    priority: 0.3,
  },
  {
    path: "/terms",
    lastModified: "2026-10-26",
    changeFrequency: "yearly",
    priority: 0.3,
  },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return pages.map((page) => ({
    url: absoluteUrl(page.path),
    lastModified: page.lastModified,
    changeFrequency: page.changeFrequency,
    priority: page.priority,
  }));
}
