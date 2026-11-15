import { LanguageProvider } from "@/shared/lib/i18n/LanguageContext";
import { buildPageJsonLd, JsonLd } from "@/shared/lib/seo";
import type { SiteLanguage } from "@/shared/config/site";
import { LandingExperience } from "@/widgets/social-theme/ui/LandingExperience";

type LocalizedLandingPageProps = {
  language: SiteLanguage;
};

export function LocalizedLandingPage({ language }: LocalizedLandingPageProps) {
  const pageJsonLd = buildPageJsonLd(language);
  const skipLabel =
    language === "ru" ? "Перейти к содержанию" : "Skip to content";

  return (
    <>
      <a
        href="#main-content"
        className="fixed left-4 top-4 z-[10000] -translate-y-24 rounded bg-white px-4 py-3 font-semibold text-black transition-transform focus:translate-y-0"
      >
        {skipLabel}
      </a>
      {pageJsonLd ? <JsonLd value={pageJsonLd} /> : null}
      <LanguageProvider language={language}>
        <LandingExperience />
      </LanguageProvider>
    </>
  );
}
