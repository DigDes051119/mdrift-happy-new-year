import type { MetadataRoute } from "next";

import {
  absoluteUrl,
  getLanguageAlternates,
  getLocalizedPath,
  siteConfig,
  supportedLanguages,
} from "@/shared/config/site";
import { isSiteIndexable } from "@/shared/config/site/server";

export default function sitemap(): MetadataRoute.Sitemap {
  if (!siteConfig.url || !isSiteIndexable) {
    return [];
  }

  const siteOrigin = siteConfig.url;
  return (["home", "certificate"] as const).flatMap((route) => {
    const languages = getLanguageAlternates(route);
    return supportedLanguages.map((language) => ({
      url: absoluteUrl(getLocalizedPath(language, route)) ?? siteOrigin,
      alternates: languages ? { languages } : undefined,
    }));
  });
}
