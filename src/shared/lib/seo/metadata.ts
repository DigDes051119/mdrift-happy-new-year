import type { Metadata } from "next";
import {
  absoluteUrl,
  getLanguageAlternates,
  getLocalizedPath,
  siteConfig,
  type SiteLanguage,
} from "@/shared/config/site";
import { isSiteIndexable } from "@/shared/config/site/server";

const getRobots = (indexable: boolean): Metadata["robots"] => ({
  index: indexable,
  follow: indexable,
  noarchive: !indexable,
  googleBot: {
    index: indexable,
    follow: indexable,
    noimageindex: !indexable,
  },
});

export const buildPublicPageMetadata = (
  language: SiteLanguage,
  route: "home" | "certificate" = "home",
): Metadata => {
  const locale = siteConfig.locales[language];
  const { title, description } = route === "certificate" ? locale.certificate : locale;
  const canonicalPath = getLocalizedPath(language, route);
  const canonicalUrl = absoluteUrl(canonicalPath);
  const alternateLocale = language === "ru" ? "en_US" : "ru_RU";

  return {
    title: { absolute: title },
    description,
    keywords: route === "home" ? [...locale.keywords] : undefined,
    alternates: canonicalUrl
      ? {
          canonical: canonicalUrl,
          languages: getLanguageAlternates(route),
        }
      : undefined,
    openGraph: {
      title,
      description,
      type: "website",
      locale: locale.openGraphLocale,
      alternateLocale: [alternateLocale],
      siteName: siteConfig.name,
      url: canonicalUrl ?? undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    robots: getRobots(isSiteIndexable && Boolean(canonicalUrl)),
  };
};

const legalMetadataCopy = {
  ru: {
    privacy: {
      title: "Политика конфиденциальности",
      description: "Политика обработки персональных данных M Drift School.",
    },
    terms: {
      title: "Условия использования",
      description: "Условия использования сайта M Drift School.",
    },
  },
  en: {
    privacy: {
      title: "Privacy Policy",
      description: "M Drift School personal data processing policy.",
    },
    terms: {
      title: "Terms of Use",
      description: "Terms of use for the M Drift School website.",
    },
  },
} as const;

export const buildLegalMetadata = (
  language: SiteLanguage,
  route: "terms" | "privacy",
): Metadata => {
  const copy = legalMetadataCopy[language][route];
  const canonicalUrl = absoluteUrl(getLocalizedPath(language, route));

  return {
    title: copy.title,
    description: copy.description,
    alternates: canonicalUrl ? { canonical: canonicalUrl } : undefined,
    robots: {
      index: false,
      follow: true,
      noarchive: true,
      googleBot: { index: false, follow: true, noimageindex: true },
    },
  };
};
