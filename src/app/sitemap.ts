import type { MetadataRoute } from "next";

import { site } from "@/config/site";

/** Página única: só existe uma URL para indexar. */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: site.url,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
