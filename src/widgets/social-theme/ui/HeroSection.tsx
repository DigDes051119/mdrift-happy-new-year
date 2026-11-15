"use client";

import { useEffect, useState } from "react";
import { siteConfig } from "@/shared/config/site";
import { motion } from "motion/react";
import { useLanguage } from "@/shared/lib/i18n/LanguageContext";
import { AmbientVideo } from "@/shared/ui/video";

interface HeroSectionProps {
  isRevealed?: boolean;
  onOpenBooking?: (carModel?: string) => void;
  onOpenCertificate: () => void;
  onOpenClub?: () => void;
  onOpenPartnership?: () => void;
  onFirstClipNearEnd?: () => void;
}

const HERO_VIDEOS = [
  { mp4: `/media/${encodeURIComponent("Видео для блока #1.mp4")}` },
] as const;

export function HeroSection({
  isRevealed = true,
  onOpenBooking,
  onOpenCertificate,
  onOpenClub,
  onOpenPartnership,
  onFirstClipNearEnd,
}: HeroSectionProps) {
  const { t, lang } = useLanguage();
  const isRu = lang === "ru";
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    let rafId: number | null = null;
    const handleScroll = () => {
      if (rafId !== null) return;
      rafId = requestAnimationFrame(() => {
        rafId = null;
        setHasScrolled(window.scrollY > 20);
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      if (rafId !== null) cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <section
      id="hero"
      className={`relative min-h-[600px] h-[88svh] sm:h-[92svh] md:h-auto md:min-h-[100dvh] md:max-h-none w-full bg-black text-white overflow-hidden flex flex-col justify-center items-center border-b ${
        isRevealed ? "border-white/10" : "border-transparent"
      } transition-colors duration-1000 font-sans`}
    >
      <div className="absolute inset-0 w-full h-full z-0 overflow-hidden bg-black pointer-events-none">
        <AmbientVideo
          clips={HERO_VIDEOS}
          allowWhenMediaDisabled
          isEnabled={true}
          loop={true}
          poster="/images/hero-drift-poster-v1.webp"
          onFirstClipNearEnd={onFirstClipNearEnd}
          className="absolute inset-0 w-full h-full object-cover object-[50%_45%] sm:object-center"
          activeClassName="opacity-100 z-0"
          inactiveClassName="opacity-0 z-0 pointer-events-none"
        />
      </div>

      <div className="absolute inset-0 bg-black/15 z-10 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/25 z-10 pointer-events-none" />

      {/* Centered Hero Content */}
      <div
        className={`relative z-20 max-w-[1820px] w-full mx-auto border-l border-r ${
          isRevealed ? "border-white/10" : "border-transparent"
        } flex flex-col justify-between items-center flex-1 pt-[106px] sm:pt-[160px] md:pt-[170px] pb-8 sm:pb-12 md:pb-14 px-4 sm:px-12 pointer-events-auto transition-colors duration-1000`}
      >
        <div className="w-full max-w-[1400px] mx-auto flex flex-col items-center text-center space-y-2.5 sm:space-y-4">
          <h1 className="text-balance text-[clamp(2.15rem,7vw,6rem)] font-bold tracking-tighter uppercase leading-[0.98] text-white">
            {t.hero.headline}
          </h1>
          <p className="text-xs sm:text-lg lg:text-xl text-[#d4d4dc] max-w-2xl px-2 sm:px-0 leading-relaxed font-light">
            {t.hero.subtitle}
          </p>
        </div>

        <div
          className="w-full max-w-sm md:max-w-none z-20 flex flex-col md:flex-row items-center justify-center gap-2.5 sm:gap-4 mt-auto mb-10 sm:mb-12 md:mb-10"
        >
          <a
            href={`https://t.me/${siteConfig.telegramContactUsername}`}
            onClick={(event) => {
              if (onOpenBooking && !event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey) {
                event.preventDefault();
                onOpenBooking();
              }
            }}
            className="text-center w-full md:w-auto px-6 md:px-8 py-4 bg-[#ea4043] hover:bg-[#ff2a55] active:scale-[0.98] text-white font-bold uppercase tracking-[0.12em] md:tracking-[0.14em] text-xs md:text-[13px] border border-[#ea4043] hover:border-[#ff2a55] rounded-xl md:rounded transition-all duration-200 shadow-[0_0_30px_rgba(234,64,67,0.45)] hover:shadow-[0_0_45px_rgba(234,64,67,0.7)] cursor-pointer select-none whitespace-nowrap"
          >
            {isRu ? "Записаться на тренировку" : "Book Training"}
          </a>

          <div className="grid grid-cols-2 gap-2.5 w-full md:w-auto md:flex md:gap-4">
            <button
              type="button"
              onClick={onOpenCertificate}
              className="text-center w-full md:w-auto px-3 md:px-7 py-3 md:py-4 bg-black/70 hover:bg-white active:scale-[0.97] text-white hover:text-black font-bold uppercase tracking-[0.1em] md:tracking-[0.14em] text-[11px] md:text-[13px] border border-white/25 hover:border-white rounded-xl md:rounded transition-all duration-200 backdrop-blur-xl cursor-pointer select-none shadow-[0_4px_20px_rgba(0,0,0,0.5)] whitespace-nowrap"
            >
              {isRu ? "Сертификат" : "Certificate"}
            </button>

            <button
              onClick={onOpenClub}
              className="w-full md:w-auto px-3 md:px-7 py-3 md:py-4 bg-black/70 hover:bg-white active:scale-[0.97] text-white hover:text-black font-bold uppercase tracking-[0.1em] md:tracking-[0.14em] text-[11px] md:text-[13px] border border-white/25 hover:border-white rounded-xl md:rounded transition-all duration-200 backdrop-blur-xl cursor-pointer select-none shadow-[0_4px_20px_rgba(0,0,0,0.5)] whitespace-nowrap"
            >
              {isRu ? "М-Комьюнити" : "M-Community"}
            </button>
          </div>

          <button
            onClick={onOpenPartnership}
            className="w-full md:w-auto px-4 md:px-7 py-2.5 md:py-4 bg-white/[0.04] md:bg-black/70 hover:bg-white active:scale-[0.97] text-[#a0a0a8] hover:text-black font-bold uppercase tracking-[0.1em] md:tracking-[0.14em] text-[11px] md:text-[13px] border border-white/10 hover:border-white rounded-xl md:rounded transition-all duration-200 backdrop-blur-xl cursor-pointer select-none whitespace-nowrap"
          >
            {isRu ? "Партнёрам" : "Partners"}
          </button>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, filter: "blur(12px)", y: 16 }}
        animate={
          isRevealed && !hasScrolled
            ? { opacity: 1, filter: "blur(0px)", y: 0 }
            : { opacity: 0, filter: "blur(12px)", y: 16 }
        }
        transition={{
          duration: hasScrolled ? 0.4 : 1.0,
          delay: hasScrolled ? 0 : 1.4,
          ease: [0.16, 1, 0.3, 1],
        }}
        onClick={() => {
          const nextSection = document.getElementById("about");
          if (nextSection) {
            nextSection.scrollIntoView({ behavior: "smooth" });
          }
        }}
        className={`absolute bottom-2 sm:bottom-4 md:bottom-5 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center cursor-pointer select-none group ${
          hasScrolled ? "pointer-events-none" : "pointer-events-auto"
        }`}
        role="button"
        tabIndex={hasScrolled ? -1 : 0}
        aria-label={isRu ? "Скролл вниз" : "Scroll down"}
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.9, repeat: Infinity, ease: "easeInOut" }}
          className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-black/50 backdrop-blur-xl border border-white/25 flex items-center justify-center text-white/85 group-hover:text-white group-hover:border-white/60 group-hover:bg-black/70 shadow-[0_8px_24px_rgba(0,0,0,0.8)] transition-all"
        >
          <svg
            className="w-4.5 h-4.5 sm:w-5 sm:h-5 transition-transform duration-200 group-hover:translate-y-0.5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.4}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
}
