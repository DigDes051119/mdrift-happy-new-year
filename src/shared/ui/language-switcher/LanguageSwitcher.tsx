import Link from "next/link";
import { getLocalizedPath, supportedLanguages, type SiteLanguage, type SiteRoute } from "@/shared/config/site";

type LanguageSwitcherProps = {
  activeLanguage: SiteLanguage;
  route?: SiteRoute;
  label: string;
};

export function LanguageSwitcher({
  activeLanguage,
  label,
  route = "home",
}: LanguageSwitcherProps) {
  return (
    <div
      role="group"
      aria-label={label}
      className="inline-flex h-8 sm:h-10 items-center rounded-lg sm:rounded-xl border border-white/15 bg-white/[0.06] p-[2px] sm:p-[3px] text-xs uppercase tracking-wider backdrop-blur-xl lg:h-11"
    >
      {supportedLanguages.map((language) => {
        const isActive = activeLanguage === language;

        return (
          <Link
            key={language}
            href={getLocalizedPath(language, route)}
            hrefLang={language}
            lang={language}
            aria-current={isActive ? "page" : undefined}
            className={`flex h-full min-w-8 sm:min-w-10 cursor-pointer items-center justify-center rounded-md sm:rounded-lg border px-2 sm:px-2.5 text-[11px] sm:text-xs font-bold tracking-wider transition-all duration-200 lg:min-w-11 ${
              isActive
                ? "border-white/20 bg-white/20 text-white shadow-[0_2px_8px_rgba(0,0,0,0.5)]"
                : "border-transparent text-[#8e8e93] hover:text-white"
            }`}
          >
            {language.toUpperCase()}
          </Link>
        );
      })}
    </div>
  );
}
