import type { Language } from "@/shared/lib/i18n/types";

const rawSiteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();

const resolveSiteOrigin = (): string | null => {
  if (!rawSiteUrl) {
    return null;
  }

  const url = new URL(rawSiteUrl);

  if (url.protocol !== "http:" && url.protocol !== "https:") {
    throw new Error("NEXT_PUBLIC_SITE_URL must use http or https");
  }

  return url.origin;
};

export const supportedLanguages = ["ru", "en"] as const satisfies readonly Language[];

export const siteConfig = {
  name: "M Drift School",
  shortName: "M Drift",
  url: resolveSiteOrigin(),
  defaultLanguage: "ru" as const,
  assets: {
    logo: "/media/Happy%20New%20Year%20Logo.png",
    favicon: "/icons/favicon-32.png",
    icon192: "/icons/favicon-192.png",
    icon512: "/icons/icon-512.png",
    appleTouchIcon: "/icons/apple-touch-icon.png",
  },
  telegramContactUsername: "m_drif_scholl",
  developerTelegramUsername: "darjekngh",
  instagramUrl: "https://www.instagram.com/andreybraga7?igsi=MWZkdmxiOWs1MHQ4OA==",
  legal: {
    legalName: "ИП Дунаевский Вадим Сергеевич",
    taxId: "381209701707",
    registrationId: "325385000055161",
  },
  locales: {
    ru: {
      path: "/",
      certificate: {
        title: "Подарочный сертификат на дрифт в Москве | M Drift School",
        description: "Электронный сертификат на тренировку на BMW M в Москве. Выберите программу или свой номинал и оформите заказ через Telegram.",
      },
      languageTag: "ru-RU",
      openGraphLocale: "ru_RU",
      title: "Школа дрифта в Москве на BMW M | M Drift School",
      description:
        "Тренировки в Москве по управляемому заносу, контраварийной и трековой подготовке на автомобилях BMW M-серии.",
      keywords: [
        "дрифт школа",
        "BMW M дрифт",
        "обучение дрифту",
        "контраварийная подготовка",
        "трековая подготовка",
      ],
    },
    en: {
      path: "/en",
      certificate: {
        title: "Drift Training Gift Certificate in Moscow | M Drift School",
        description: "Give a BMW M drift lesson in Moscow. Choose a training programme or a custom amount and order a digital gift certificate via Telegram.",
      },
      languageTag: "en",
      openGraphLocale: "en_US",
      title: "BMW M Drift School in Moscow | M Drift School",
      description:
        "Controlled drift, defensive driving and track training in BMW M-series cars in Moscow.",
      keywords: [
        "BMW M drift school",
        "drift training",
        "defensive driving",
        "track driving training",
        "BMW M driving experience",
      ],
    },
  },
} as const;

export type SiteLanguage = keyof typeof siteConfig.locales;
export type SiteRoute = "certificate" | "home" | "privacy" | "terms";

const routeSuffixes: Record<Exclude<SiteRoute, "home">, string> = {
  certificate: "/gift-certificate",
  privacy: "/privacy",
  terms: "/terms",
};

export const getLocalizedPath = (
  language: SiteLanguage,
  route: SiteRoute = "home",
): string => {
  const languageRoot = siteConfig.locales[language].path;

  if (route === "home") {
    return languageRoot;
  }

  return languageRoot === "/"
    ? routeSuffixes[route]
    : `${languageRoot}${routeSuffixes[route]}`;
};

export const absoluteUrl = (path = "/"): string | null => {
  if (!siteConfig.url) {
    return null;
  }

  return new URL(path, siteConfig.url).toString();
};

export const getLanguageAlternates = (route: SiteRoute = "home"): Record<string, string> | undefined => {
  const russianUrl = absoluteUrl(getLocalizedPath("ru", route));
  const englishUrl = absoluteUrl(getLocalizedPath("en", route));

  if (!russianUrl || !englishUrl) {
    return undefined;
  }

  return {
    ru: russianUrl,
    en: englishUrl,
    "x-default": russianUrl,
  };
};
