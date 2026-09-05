import type { MetadataRoute } from "next";

import { site } from "@/config/site";

const routes = ["", "/servicos", "/protocolos", "/sobre", "/contato"];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return routes.map((route) => ({
    url: `${site.url}${route}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: route === "" ? 1 : 0.7,
  }));
}
