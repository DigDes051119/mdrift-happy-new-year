import { BrandLogo } from "@/shared/ui/media/BrandLogo";
import Link from "next/link";

export function NotFoundPage() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#040404] px-4 py-8 text-white sm:px-8 sm:py-10">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(circle_at_50%_42%,rgba(28,54,92,0.34),transparent_42%),linear-gradient(135deg,rgba(0,102,177,0.08),transparent_42%,rgba(234,64,67,0.09))]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-1/2 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"
      />
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-1/2 h-[54rem] w-[54rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.06]"
      />

      <section className="relative z-10 mx-auto flex w-full max-w-5xl flex-col items-center text-center">
        <Link href="/" aria-label="M Drift School — на главную">
          <BrandLogo
            preload
            className="h-11 w-auto object-contain sm:h-[60px]"
            fallbackClassName="whitespace-nowrap text-xl font-bold tracking-[0.12em] sm:text-2xl"
          />
        </Link>

        <div className="mt-8 flex items-center gap-3 font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-[#9a9aa2] sm:text-xs">
          <span className="h-1.5 w-10 bg-[#0066b1]" />
          Error // Route lost
          <span className="h-1.5 w-10 bg-[#ea4043]" />
        </div>

        <p
          aria-hidden="true"
          className="mt-3 bg-gradient-to-b from-white to-white/25 bg-clip-text text-[clamp(6rem,24vw,13rem)] font-black leading-[0.82] tracking-[-0.08em] text-transparent"
        >
          404
        </p>

        <h1 className="mt-6 text-3xl font-bold uppercase tracking-tight sm:text-5xl">
          Траектория потеряна
          <span className="text-[#ea4043]">.</span>
        </h1>
        <p className="mt-3 max-w-xl text-sm leading-relaxed text-[#a0a0a8] sm:text-base">
          Такой страницы нет или её адрес изменился. Вернитесь на главную —
          там маршрут продолжается.
        </p>
        <p className="mt-2 max-w-xl text-sm leading-relaxed text-[#73737c] sm:text-base">
          This page does not exist or its address has changed.
        </p>

        <div className="mt-7 flex w-full max-w-md flex-col gap-3 sm:flex-row">
          <Link
            href="/"
            className="inline-flex min-h-12 flex-1 items-center justify-center rounded-lg bg-[#ea4043] px-6 text-xs font-bold uppercase tracking-[0.12em] transition-colors hover:bg-[#ff5255]"
          >
            На главную
          </Link>
          <Link
            href="/en"
            hrefLang="en"
            className="inline-flex min-h-12 flex-1 items-center justify-center rounded-lg border border-white/20 bg-white/[0.04] px-6 text-xs font-bold uppercase tracking-[0.12em] transition-colors hover:border-white/40 hover:bg-white/10"
          >
            English version
          </Link>
        </div>
      </section>
    </main>
  );
}
