import type { MetadataRoute } from "next";

import { isPublicDomain, site } from "@/config/site";

export default function robots(): MetadataRoute.Robots {
  // Em URL de preview, o site fica fora da busca até o domínio final subir.
  if (!isPublicDomain) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }

  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${site.url}/sitemap.xml`,
  };
}
