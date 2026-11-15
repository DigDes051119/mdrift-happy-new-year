import {
  absoluteUrl,
  getLocalizedPath,
  siteConfig,
  type SiteLanguage,
} from "@/shared/config/site";
import type { JsonLdDocument } from "./json-ld";
import { MEDIA_ENABLED } from "@/shared/config/media";

export const buildPageJsonLd = (
  language: SiteLanguage,
): JsonLdDocument | null => {
  if (!siteConfig.url) {
    return null;
  }

  const locale = siteConfig.locales[language];
  const pageUrl = absoluteUrl(getLocalizedPath(language)) ?? siteConfig.url;
  const organizationId = `${siteConfig.url}/#organization`;
  const websiteId = `${siteConfig.url}/#website`;
  const pageId = `${pageUrl}#webpage`;
  const logoUrl = absoluteUrl(siteConfig.assets.logo);

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": organizationId,
        name: siteConfig.name,
        legalName: siteConfig.legal.legalName,
        url: siteConfig.url,
        logo: MEDIA_ENABLED ? logoUrl ?? undefined : undefined,
        taxID: siteConfig.legal.taxId,
        identifier: [
          {
            "@type": "PropertyValue",
            propertyID: "ОГРНИП",
            value: siteConfig.legal.registrationId,
          },
          {
            "@type": "PropertyValue",
            propertyID: "ИНН",
            value: siteConfig.legal.taxId,
          },
        ],
        sameAs: [
          siteConfig.instagramUrl,
          `https://t.me/${siteConfig.telegramContactUsername}`,
        ],
      },
      {
        "@type": "WebSite",
        "@id": websiteId,
        name: siteConfig.name,
        url: siteConfig.url,
        inLanguage: ["ru-RU", "en"],
        publisher: { "@id": organizationId },
      },
      {
        "@type": "WebPage",
        "@id": pageId,
        name: locale.title,
        description: locale.description,
        url: pageUrl,
        inLanguage: locale.languageTag,
        isPartOf: { "@id": websiteId },
        about: { "@id": organizationId },
      },
    ],
  };
};
