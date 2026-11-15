import { BrandLogo } from "@/shared/ui/media/BrandLogo";
import { MediaImage } from "@/shared/ui/media/MediaImage";
import Link from "next/link";
import { CERTIFICATE_PLANS, formatRubles } from "@/entities/program";
import { getLocalizedPath, type SiteLanguage } from "@/shared/config/site";
import { LanguageProvider } from "@/shared/lib/i18n/LanguageContext";
import { translations } from "@/shared/lib/i18n/translations";
import { LanguageSwitcher } from "@/shared/ui/language-switcher/LanguageSwitcher";
import { APP_SHELL_ID } from "@/shared/ui/modal";
import { CertificateOrderButton } from "@/widgets/social-theme/ui/CertificateOrderButton";

export function GiftCertificatePage({ language }: { language: SiteLanguage }) {
  const ru = language === "ru";
  return (
    <main id={APP_SHELL_ID} className="mx-auto min-h-screen max-w-6xl px-5 pb-16 text-white sm:px-10">
      <nav aria-label={ru ? "Навигация" : "Navigation"} className="flex items-center justify-between border-b border-white/15 py-5">
        <Link href={getLocalizedPath(language)} aria-label={ru ? "M Drift School — на главную" : "M Drift School home"}>
          <BrandLogo
            className="h-auto w-40"
            fallbackClassName="whitespace-nowrap text-sm font-bold tracking-[0.12em]"
          />
        </Link>
        <LanguageSwitcher
          activeLanguage={language}
          label={translations[language].header.languageLabel}
          route="certificate"
        />
      </nav>
      <div className="grid gap-6 py-8 sm:py-14 md:grid-cols-2 md:items-center">
        <div>
          <h1 className="text-balance text-4xl font-bold tracking-tight sm:text-5xl">
            {ru ? "Подарочный сертификат на дрифт" : "Drift training gift certificate"}
          </h1>
          <p className="mt-5 max-w-lg leading-relaxed text-zinc-300">
            {ru ? "Подарите тренировку на BMW M в Москве. Выберите программу или свой номинал и укажите имя получателя. Форма подготовит сообщение для заказа электронного PDF-сертификата в Telegram."
              : "Give a BMW M drift lesson in Moscow. Choose a programme or a custom amount and enter the recipient’s name. The form prepares a Telegram message to order a digital PDF certificate."}
          </p>
          <LanguageProvider language={language}><CertificateOrderButton /></LanguageProvider>
        </div>
        <div className="relative aspect-[2/1] overflow-hidden rounded-xl md:aspect-[4/3]">
          <MediaImage src="/images/tariff-2-asphalt-start.webp" fill sizes="(min-width: 768px) 50vw, 100vw" alt="" className="object-cover" />
        </div>
      </div>
      <h2 className="mb-4 text-2xl font-semibold">{ru ? "Программы и номиналы" : "Programmes and prices"}</h2>
      <dl className="divide-y divide-white/15 border-y border-white/15">
        {CERTIFICATE_PLANS.map((plan) => (
          <div key={plan.id} className="flex flex-wrap items-baseline justify-between gap-x-5 gap-y-1 py-4">
            <dt>
              <span className="font-semibold">{ru ? plan.titleRu : plan.titleEn}</span>
              {!plan.isCustom && <span className="block text-sm text-zinc-400">{ru ? plan.subtitleRu : plan.subtitleEn}</span>}
            </dt>
            <dd className="font-medium">{plan.isCustom ? (ru ? plan.subtitleRu : plan.subtitleEn) : formatRubles(plan.price)}</dd>
          </div>
        ))}
      </dl>
    </main>
  );
}
