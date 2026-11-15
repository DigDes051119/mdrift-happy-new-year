import type { MetadataRoute } from "next";

import { siteConfig } from "@/shared/config/site";
import { MEDIA_ENABLED } from "@/shared/config/media";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.name,
    short_name: siteConfig.shortName,
    description: siteConfig.locales.ru.description,
    start_url: "/",
    display: "browser",
    background_color: "#050505",
    theme_color: "#050505",
    lang: siteConfig.locales.ru.languageTag,
    icons: MEDIA_ENABLED ? [
      {
        src: siteConfig.assets.icon192,
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: siteConfig.assets.icon512,
        sizes: "512x512",
        type: "image/png",
      },
    ] : [],
  };
}
