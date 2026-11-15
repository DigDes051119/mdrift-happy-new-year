import type { MetadataRoute } from "next";

import { absoluteUrl, siteConfig } from "@/shared/config/site";
import { isSiteIndexable } from "@/shared/config/site/server";

export default function robots(): MetadataRoute.Robots {
  if (!siteConfig.url || !isSiteIndexable) {
    return {
      rules: {
        userAgent: "*",
        disallow: "/",
      },
    };
  }

  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: absoluteUrl("/sitemap.xml") ?? undefined,
  };
}
