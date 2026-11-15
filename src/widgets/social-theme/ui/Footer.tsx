"use client";

import { BrandLogo } from "@/shared/ui/media/BrandLogo";
import Link from "next/link";
import { getLocalizedPath, siteConfig } from "@/shared/config/site";
import { useLanguage } from "@/shared/lib/i18n/LanguageContext";

function InstagramIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.9"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function TelegramIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z" />
    </svg>
  );
}

export function Footer() {
  const { lang, t } = useLanguage();

  return (
    <footer className="w-full bg-black text-white border-t border-white/10 pt-10 sm:pt-20 pb-[max(10rem,calc(env(safe-area-inset-bottom)+9.5rem))] md:pb-20 px-4 sm:px-12 lg:px-16 xl:px-20 font-sans">
      <div className="max-w-[1820px] mx-auto space-y-8 sm:space-y-12">
        <div className="sm:hidden">
          <div className="p-3.5 rounded-xl border border-white/10 bg-white/[0.03] flex items-center justify-between gap-2">
            <div className="min-w-0 space-y-0.5">
              <span className="text-[10px] uppercase font-mono text-[#8e8e93] font-semibold">
                {t.footer.contactsTitle}
              </span>
              {t.footer.phone ? (
                <div className="text-xs font-bold text-white">{t.footer.phone}</div>
              ) : null}
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <a
                href={siteConfig.instagramUrl}
                target="_blank"
                rel="noreferrer"
                aria-label={t.footer.instagram}
                className="flex items-center justify-center w-10 h-10 rounded-xl border border-white/15 bg-white/[0.06] text-white/80 hover:text-white hover:border-[#ea4043] hover:bg-[#ea4043]/15 transition-colors"
              >
                <InstagramIcon className="w-5 h-5" />
              </a>
              <a
                href={`https://t.me/${siteConfig.telegramContactUsername}`}
                target="_blank"
                rel="noreferrer"
                aria-label={t.footer.telegram}
                className="flex items-center justify-center w-10 h-10 rounded-xl border border-white/15 bg-white/[0.06] text-white/80 hover:text-white hover:border-[#ea4043] hover:bg-[#ea4043]/15 transition-colors"
              >
                <TelegramIcon className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 pb-6 sm:pb-12 border-b border-white/10 text-sm">
          {/* Brand Col with Official Logo */}
          <div className="md:col-span-5 space-y-3 sm:space-y-4">
            <a href="#hero" className="flex items-center">
              <BrandLogo
                className="h-9 w-auto max-w-full object-contain sm:h-12"
                fallbackClassName="whitespace-nowrap text-lg font-bold tracking-[0.12em] sm:text-xl"
              />
            </a>
            <p className="text-[#8e8e93] max-w-sm leading-relaxed text-xs sm:text-sm font-light">
              {t.footer.tagline}
            </p>
            {/* Social Icons */}
            <div className="flex items-center gap-2.5 pt-1">
              <a
                href={siteConfig.instagramUrl}
                target="_blank"
                rel="noreferrer"
                aria-label={t.footer.instagram}
                className="group flex items-center justify-center w-10 h-10 rounded-xl border border-white/15 bg-white/[0.04] text-white/80 hover:text-white hover:border-[#ea4043] hover:bg-[#ea4043]/15 transition-all duration-200 shadow-sm"
              >
                <InstagramIcon className="w-5 h-5 transition-transform duration-200 group-hover:scale-110" />
              </a>
              <a
                href={`https://t.me/${siteConfig.telegramContactUsername}`}
                target="_blank"
                rel="noreferrer"
                aria-label={t.footer.telegram}
                className="group flex items-center justify-center w-10 h-10 rounded-xl border border-white/15 bg-white/[0.04] text-white/80 hover:text-white hover:border-[#ea4043] hover:bg-[#ea4043]/15 transition-all duration-200 shadow-sm"
              >
                <TelegramIcon className="w-5 h-5 transition-transform duration-200 group-hover:scale-110" />
              </a>
            </div>
          </div>

          {/* Contacts Col */}
          <div className="md:col-span-4 space-y-2">
            <div className="text-white font-bold uppercase tracking-wider text-xs sm:text-sm">
              {t.footer.contactsTitle}
            </div>
            <div className="text-[#8e8e93] space-y-1.5 text-xs sm:text-sm font-light">
              <div>{t.footer.locationText}</div>
              {t.footer.phone ? (
                <div className="text-white font-medium">{t.footer.phone}</div>
              ) : null}
              <a
                href={`https://t.me/${siteConfig.telegramContactUsername}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 text-white font-medium hover:text-[#ea4043] transition-colors group"
              >
                <TelegramIcon className="w-4 h-4 text-[#8e8e93] group-hover:text-[#ea4043] transition-colors" />
                <span>{t.footer.telegram}</span>
              </a>
              <a
                href={siteConfig.instagramUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 text-white font-medium hover:text-[#ea4043] transition-colors group"
              >
                <InstagramIcon className="w-4 h-4 text-[#8e8e93] group-hover:text-[#ea4043] transition-colors" />
                <span>{t.footer.instagram}</span>
              </a>
            </div>
          </div>

          {/* Socials / Hours */}
          <div className="md:col-span-3 space-y-2">
            <div className="text-white font-bold uppercase tracking-wider text-xs sm:text-sm">
              {t.footer.hoursTitle}
            </div>
            <div className="text-[#8e8e93] space-y-1 text-xs sm:text-sm font-light">
              {t.footer.hoursDaily ? <div>{t.footer.hoursDaily}</div> : null}
              <div>{t.footer.hoursSeason}</div>
            </div>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs sm:text-sm text-[#8e8e93]">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-5">
            <div>{t.footer.copyright.replace("{year}", new Date().getFullYear().toString())}</div>
            <a
              href={`https://t.me/${siteConfig.developerTelegramUsername}`}
              target="_blank"
              rel="noreferrer"
              className="group inline-flex w-fit items-center gap-2 rounded-sm font-mono text-[11px] font-semibold tracking-[0.08em] transition-colors duration-300 hover:text-white focus-visible:text-white motion-reduce:transition-none"
            >
              <span
                aria-hidden="true"
                className="h-px w-3 origin-left bg-[linear-gradient(90deg,var(--accent-m-blue),var(--accent-red-bright))] transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-150 group-focus-visible:scale-x-150 motion-reduce:transform-none motion-reduce:transition-none"
              />
              <span>{t.footer.developedBy}</span>
              <span className="bg-[linear-gradient(90deg,var(--accent-m-blue),var(--accent-red-bright))] bg-clip-text text-transparent">
                @{siteConfig.developerTelegramUsername}
              </span>
              <span
                aria-hidden="true"
                className="inline-block text-white transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1 group-hover:-translate-y-0.5 group-focus-visible:translate-x-1 group-focus-visible:-translate-y-0.5 motion-reduce:transform-none motion-reduce:transition-none"
              >
                ↗
              </span>
              <span className="sr-only">({t.footer.opensInNewTab})</span>
            </a>
          </div>
          <div className="flex flex-wrap items-center gap-x-4 sm:gap-x-6 gap-y-1 font-medium">
            <Link
              href={getLocalizedPath(lang, "certificate")}
              prefetch={false}
              className="hover:text-white transition-colors"
            >
              {t.header.nav.certificates}
            </Link>
            <Link
              href={getLocalizedPath(lang, "privacy")}
              className="hover:text-white transition-colors"
            >
              {t.footer.privacy}
            </Link>
            <Link
              href={getLocalizedPath(lang, "terms")}
              className="hover:text-white transition-colors"
            >
              {t.footer.terms}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
