"use client";

import { motion } from "motion/react";
import { useLanguage } from "@/shared/lib/i18n/LanguageContext";
import { AmbientVideo } from "@/shared/ui/video";

const M2_VIDEOS = [
  { mp4: `/media/${encodeURIComponent("видео для блока последнего.mp4")}` },
] as const;

interface BmwM2ReelSectionProps {
  onOpenBooking?: () => void;
  onOpenCertificate?: () => void;
  onOpenClub?: () => void;
  onOpenPartnership?: () => void;
}

export function BmwM2ReelSection({
  onOpenBooking,
  onOpenCertificate,
  onOpenClub,
  onOpenPartnership,
}: BmwM2ReelSectionProps) {
  const { lang } = useLanguage();
  const isRu = lang === "ru";

  return (
    <section
      id="reel-m2"
      className="relative min-h-[580px] sm:min-h-[640px] md:min-h-[85vh] lg:min-h-[100dvh] w-full bg-black text-white overflow-hidden flex flex-col justify-center items-center border-b border-white/10 font-sans"
    >
      <div className="absolute inset-0 w-full h-full overflow-hidden z-0">
        <AmbientVideo
          clips={M2_VIDEOS}
          allowWhenMediaDisabled
          poster="/images/tariffs-instructor-m2.webp"
          posterClassName="object-cover object-center"
          className="absolute inset-0 w-full h-full object-cover object-center"
          activeClassName="opacity-100 z-0"
          inactiveClassName="opacity-0 z-0 pointer-events-none"
        />
      </div>

      <div className="absolute inset-0 bg-black/30 z-10 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/25 z-10 pointer-events-none" />

      <div className="relative z-20 max-w-[1820px] w-full mx-auto border-l border-r border-white/10 flex flex-col justify-center items-center flex-1 py-16 sm:py-24 md:py-28 px-4 sm:px-12 pointer-events-auto">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.25 }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-[1400px] w-full mx-auto flex flex-col items-center justify-center text-center space-y-4 sm:space-y-6"
        >
          <div className="flex flex-col items-center justify-center text-center space-y-3 sm:space-y-5">
            <span className="text-[10px] sm:text-xs uppercase tracking-[0.25em] text-[#ea4043] font-bold block font-mono">
              {isRu
                ? "// РЕВ МОТОРА • СКОРОСТЬ • АДРЕНАЛИН • КЛУБЫ ДЫМА"
                : "// ENGINE ROAR • SPEED • ADRENALINE • SMOKE TRAILS"}
            </span>

            <div className="inline-flex items-center gap-2.5 px-4 sm:px-5 py-2 rounded-full bg-black/60 border border-white/15 backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.5)]">
              <span className="w-2 h-2 rounded-full bg-[#ea4043] shadow-[0_0_10px_#ea4043] animate-pulse shrink-0" />
              <span className="text-xs sm:text-sm uppercase tracking-[0.18em] font-semibold text-white/90">
                {isRu ? "ГОТОВ ПРОВЕРИТЬ СЕБЯ?" : "READY TO TEST YOURSELF?"}
              </span>
            </div>

            <h2 className="text-[clamp(1.85rem,6.8vw,3.15rem)] sm:text-4xl md:text-5xl lg:text-6xl xl:text-[4.25rem] font-bold tracking-tight uppercase leading-[1.05] select-none text-white">
              {isRu ? (
                <>
                  ПОСМОТРИМ, НА ЧТО ТЫ СПОСОБЕН<span className="text-gradient-red">!</span>
                </>
              ) : (
                <>
                  LET&apos;S SEE WHAT YOU&apos;RE CAPABLE OF<span className="text-gradient-red">!</span>
                </>
              )}
            </h2>

            <p className="text-xs sm:text-base lg:text-lg text-[#d4d4dc] max-w-2xl px-2 sm:px-0 leading-relaxed font-light">
              {isRu
                ? "Развивайте контроль автомобиля в управляемом заносе. Выберите программу тренировок, оформите сертификат или вступите в M-Community."
                : "Build controlled-driving skills in a managed slide. Choose a training program, get a certificate or join M-Community."}
            </p>

            <div className="w-full max-w-sm md:max-w-none pt-3 sm:pt-5 z-20 flex flex-col md:flex-row items-center justify-center gap-2.5 sm:gap-4">
              <button
                onClick={() => onOpenBooking && onOpenBooking()}
                className="w-full md:w-auto px-6 md:px-8 py-4 bg-[#ea4043] hover:bg-[#ff2a55] active:scale-[0.98] text-white font-bold uppercase tracking-[0.12em] md:tracking-[0.14em] text-xs md:text-[13px] border border-[#ea4043] hover:border-[#ff2a55] rounded-xl md:rounded transition-all duration-200 shadow-[0_0_30px_rgba(234,64,67,0.45)] hover:shadow-[0_0_45px_rgba(234,64,67,0.7)] cursor-pointer select-none whitespace-nowrap"
              >
                {isRu ? "Записаться на тренировку" : "Book Training"}
              </button>

              <div className="grid grid-cols-2 gap-2.5 w-full md:w-auto md:flex md:gap-4">
                <button
                  onClick={onOpenCertificate}
                  className="w-full md:w-auto px-3 md:px-7 py-3 md:py-4 bg-black/70 hover:bg-white active:scale-[0.97] text-white hover:text-black font-bold uppercase tracking-[0.1em] md:tracking-[0.14em] text-[11px] md:text-[13px] border border-white/25 hover:border-white rounded-xl md:rounded transition-all duration-200 backdrop-blur-xl cursor-pointer select-none shadow-[0_4px_20px_rgba(0,0,0,0.5)] whitespace-nowrap"
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
        </motion.div>
      </div>
    </section>
  );
}
