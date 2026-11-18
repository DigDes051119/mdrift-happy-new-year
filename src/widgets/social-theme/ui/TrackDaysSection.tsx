"use client";

import { motion } from "motion/react";
import { useLanguage } from "@/shared/lib/i18n/LanguageContext";
import { AmbientVideo } from "@/shared/ui/video";

interface TrackDaysSectionProps {
  onOpenClub: () => void;
}

const TRACK_DAYS_CLIPS = [
  { mp4: "/media/video-for-block-6.mp4" },
] as const;

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.05,
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },
};

export function TrackDaysSection({ onOpenClub }: TrackDaysSectionProps) {
  const { t } = useLanguage();

  return (
    <section id="track-days" className="relative w-full bg-black text-white border-b border-white/10 overflow-hidden font-sans">
      <div className="max-w-[1820px] mx-auto border-l border-r border-white/10 relative sm:min-h-[560px] lg:min-h-[600px] flex flex-col justify-between overflow-hidden">
        {/*
          Phones get the clip at its native 16:9 ratio instead of a ~540px-tall
          `object-cover` crop that only exposed a third of each frame. From
          `sm` up it goes back to a full-bleed backdrop behind the copy.
        */}
        <div className="relative w-full aspect-[1280/712] z-0 overflow-hidden bg-black pointer-events-none sm:absolute sm:inset-0 sm:aspect-auto sm:h-full">
          <AmbientVideo
            clips={TRACK_DAYS_CLIPS}
            allowWhenMediaDisabled
            poster="/images/club-track-sunset.webp"
            posterClassName="object-cover object-center"
            className="absolute inset-0 w-full h-full object-cover object-center select-none"
            activeClassName="opacity-100"
            inactiveClassName="opacity-0"
          />

          <div className="absolute inset-0 z-1 pointer-events-none opacity-80 bg-[linear-gradient(0deg,rgba(0,0,0,0.85)_0%,rgba(0,0,0,0.15)_42%,rgba(0,0,0,0.15)_100%)] sm:bg-[linear-gradient(90deg,rgba(0,0,0,0.96)_0%,rgba(0,0,0,0.85)_32%,rgba(0,0,0,0.45)_55%,rgba(0,0,0,0)_80%)]" />
        </div>

        <div className="relative z-10 w-full py-8 sm:py-20 lg:py-24 px-4 sm:px-14 lg:px-20 flex flex-col justify-end sm:justify-center flex-1 pointer-events-auto">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.3, margin: "-40px" }}
            className="flex flex-col justify-center my-auto"
          >
            <motion.div variants={itemVariants} className="space-y-3.5 sm:space-y-5 max-w-3xl">
              <div className="text-[10px] sm:text-sm uppercase tracking-widest text-[#ea4043] font-bold drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
                {t.club.bannerBadge}
              </div>
              <h2 className="text-[clamp(1.85rem,9vw,3rem)] sm:text-5xl lg:text-6xl font-bold uppercase tracking-tight text-white leading-[1.05] drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)]">
                {t.club.bannerTitle}
              </h2>
              <p className="text-xs sm:text-lg lg:text-xl text-[#d1d1d6] leading-relaxed font-light drop-shadow-[0_2px_10px_rgba(0,0,0,0.95)] max-w-2xl">
                {t.club.bannerDesc}
              </p>

              <div className="pt-2">
                <button
                  onClick={onOpenClub}
                  className="w-full sm:w-auto px-6 py-3.5 sm:py-3 bg-black/70 hover:bg-white active:scale-[0.98] text-white hover:text-black font-bold uppercase tracking-[0.12em] text-xs border border-white/30 hover:border-white rounded-xl sm:rounded transition-all duration-200 backdrop-blur-xl cursor-pointer select-none shadow-[0_4px_20px_rgba(0,0,0,0.5)]"
                >
                  {t.club.bannerBtn}
                </button>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
