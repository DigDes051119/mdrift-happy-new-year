import Link from "next/link";
import {
  getLocalizedPath,
  siteConfig,
  type SiteLanguage,
} from "@/shared/config/site";

type LegalDocument = "privacy" | "terms";

type LegalPlaceholderPageProps = {
  language: SiteLanguage;
  document: LegalDocument;
};

const content = {
  ru: {
    privacy: {
      eyebrow: "LEGAL // PRIVACY",
      title: "Политика конфиденциальности",
      notice:
        "Временная редакция. Полный юридический текст будет опубликован после согласования.",
    },
    terms: {
      eyebrow: "LEGAL // TERMS",
      title: "Условия использования",
      notice:
        "Временная редакция. Полный юридический текст будет опубликован после согласования.",
    },
    back: "Вернуться на главную",
    owner: "Владелец сайта",
    placeholders: "Контакты, адрес, территория работы и график: уточняются.",
  },
  en: {
    privacy: {
      eyebrow: "LEGAL // PRIVACY",
      title: "Privacy Policy",
      notice:
        "Temporary version. The complete legal text will be published after review.",
    },
    terms: {
      eyebrow: "LEGAL // TERMS",
      title: "Terms of Use",
      notice:
        "Temporary version. The complete legal text will be published after review.",
    },
    back: "Back to home",
    owner: "Website owner",
    placeholders: "Contact details, address, service area and hours: to be confirmed.",
  },
} as const;

export function LegalPlaceholderPage({
  language,
  document,
}: LegalPlaceholderPageProps) {
  const copy = content[language];
  const heading = copy[document];

  return (
    <main className="min-h-screen bg-[#040404] px-4 py-16 text-white sm:px-8 sm:py-24">
      <article className="mx-auto max-w-4xl rounded-2xl border border-white/10 bg-white/[0.03] p-6 sm:p-10">
        <p className="font-mono text-xs uppercase tracking-[0.18em] text-[#ea4043]">
          {heading.eyebrow}
        </p>
        <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-5xl">
          {heading.title}
        </h1>
        <div className="mt-8 rounded-xl border border-[#ea4043]/35 bg-[#ea4043]/10 p-4 text-sm leading-relaxed text-[#f1d8d9]">
          {heading.notice}
        </div>

        <section className="mt-10 space-y-4 text-sm leading-7 text-[#b8b8c0] sm:text-base">
          <h2 className="text-xl font-semibold text-white">{copy.owner}</h2>
          <p>{siteConfig.legal.legalName}</p>
          <p>ИНН: {siteConfig.legal.taxId}</p>
          <p>ОГРНИП: {siteConfig.legal.registrationId}</p>
          <p>{copy.placeholders}</p>
        </section>

        <section className="mt-10 space-y-4 text-sm leading-7 text-[#8e8e93] sm:text-base">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
            vitae justo sed urna interdum vulputate. Donec vitae sem at neque
            posuere tempor.
          </p>
          <p>
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem.
            Quisque euismod, nisl eget facilisis volutpat, sapien neque
            consequat lectus, vitae faucibus mauris erat non neque.
          </p>
        </section>

        <Link
          href={getLocalizedPath(language)}
          className="mt-10 inline-flex min-h-11 items-center rounded-lg border border-white/20 px-5 text-sm font-semibold transition-colors hover:border-white/40 hover:bg-white/10"
        >
          {copy.back}
        </Link>
      </article>
    </main>
  );
}
