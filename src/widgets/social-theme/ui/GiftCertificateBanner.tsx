import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/shared/lib/i18n/LanguageContext";

type GiftCertificateBannerProps = {
  onOpenCertificate: () => void;
};

export function GiftCertificateBanner({
  onOpenCertificate,
}: GiftCertificateBannerProps) {
  const { t } = useLanguage();

  return (
    <section
      id="gift-certificates"
      aria-labelledby="gift-banner-title"
      className="relative isolate overflow-hidden border-b border-white/10 bg-[#050507] text-white"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_80%_48%,rgba(234,64,67,0.12),transparent_34%),linear-gradient(135deg,rgba(255,255,255,0.025),transparent_48%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-1/2 z-10 mx-auto w-full max-w-[1820px] -translate-x-1/2 border-x border-white/10"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-12 z-10 h-px w-full max-w-[1820px] -translate-x-1/2 bg-white/10 sm:top-[72px] lg:top-[130px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-12 left-1/2 z-10 h-px w-full max-w-[1820px] -translate-x-1/2 bg-white/10 sm:bottom-[72px] lg:bottom-[130px]"
      />
      <div className="relative z-20 mx-auto w-full max-w-[1820px]">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-12 top-12 overflow-hidden sm:bottom-[72px] sm:top-[72px] lg:bottom-[130px] lg:top-[130px]"
        >
          <div
            className="absolute inset-0 bg-cover bg-center opacity-45"
            style={{
              backgroundImage:
                'url("/media/%D1%81%D0%B5%D1%80%D1%82%D0%B8%D1%84%D0%B8%D0%BA%D0%B0%D1%82.png")',
            }}
          />
          <div className="pointer-events-none absolute inset-0 z-[1] opacity-80 bg-[linear-gradient(0deg,rgba(0,0,0,0.85)_0%,rgba(0,0,0,0.15)_42%,rgba(0,0,0,0.15)_100%)] sm:bg-[linear-gradient(90deg,rgba(0,0,0,0.96)_0%,rgba(0,0,0,0.85)_32%,rgba(0,0,0,0.45)_55%,rgba(0,0,0,0)_80%)]" />
        </div>
        <div className="relative z-10 flex min-h-[560px] flex-col justify-center px-5 py-24 sm:min-h-[640px] sm:px-10 sm:py-36 lg:min-h-[780px] lg:px-16 lg:py-[260px] xl:px-20">
          <div className="mb-5 flex items-center gap-3 sm:mb-7">
            <span className="h-[2px] w-8 bg-[#ea4043]" />
            <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#ea4043] sm:text-xs">
              {t.giftBanner.eyebrow}
            </span>
          </div>

          <h2
            id="gift-banner-title"
            className="max-w-[980px] text-balance text-[clamp(2.05rem,5vw,4.8rem)] font-bold uppercase leading-[0.98] tracking-[-0.055em]"
          >
            {t.giftBanner.title}
          </h2>

          <div className="mt-5 h-[3px] w-24 rotate-[-4deg] bg-gradient-to-r from-[#ea4043] to-transparent sm:mt-7 sm:w-32" />

          <p className="mt-6 max-w-[760px] text-sm leading-relaxed text-[#c6c6cd] sm:mt-8 sm:text-base lg:text-lg">
            {t.giftBanner.description}
          </p>

          <p className="mt-5 max-w-[760px] border-l-2 border-[#ea4043] pl-4 text-sm font-semibold leading-relaxed text-white sm:mt-6 sm:pl-5 sm:text-base lg:text-lg">
            {t.giftBanner.closing}
          </p>

          <button
            type="button"
            onClick={onOpenCertificate}
            className="btn-swiss-primary mt-7 min-h-12 w-full justify-between rounded-xl px-5 text-xs sm:mt-9 sm:w-fit sm:min-w-[280px] sm:px-6"
          >
            <span>{t.giftBanner.chooseButton}</span>
            <ArrowRight aria-hidden="true" size={17} strokeWidth={1.8} />
          </button>
        </div>
      </div>
    </section>
  );
}
