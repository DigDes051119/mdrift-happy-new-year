"use client";

import { BrandLogo } from "@/shared/ui/media/BrandLogo";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/shared/lib/i18n/LanguageContext";
import { getLocalizedPath, siteConfig } from "@/shared/config/site";
import { LanguageSwitcher } from "@/shared/ui/language-switcher/LanguageSwitcher";
import { isPageScrollLocked } from "@/shared/ui/smooth-scroll";
import { SnowToggle } from "@/features/snow-toggle";

type HeaderProps = {
  onOpenBooking: () => void;
  isRevealed?: boolean;
  isSnowEnabled: boolean;
  onToggleSnow: () => void;
};

const NAV_ITEMS = [
  { href: "#hero", label: "garage" },
  { href: "#about", label: "about" },
  { href: "#services", label: "services" },
  { href: "#club", label: "club" },
  { href: "#tariffs", label: "tariffs" },
] as const;

const MIN_DESKTOP_NAV_WIDTH = 768;
const NAV_FIT_RESERVE = 88;
const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

const menuVariants = {
  closed: { opacity: 0, y: -12, scale: 0.98 },
  open: { opacity: 1, y: 0, scale: 1 },
};

const menuListVariants = {
  closed: { opacity: 0 },
  open: {
    opacity: 1,
    transition: { staggerChildren: 0.045, delayChildren: 0.04 },
  },
};

const menuItemVariants = {
  closed: { opacity: 0, y: -8 },
  open: { opacity: 1, y: 0 },
};

export function Header({
  onOpenBooking,
  isRevealed = true,
  isSnowEnabled,
  onToggleSnow,
}: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [isCompactNav, setIsCompactNav] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const headerContentRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLAnchorElement>(null);
  const navMeasureRef = useRef<HTMLDivElement>(null);
  const actionsMeasureRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const { lang, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      if (isPageScrollLocked()) return;
      setScrolled(window.scrollY > 20);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    let isDisposed = false;

    const measureNavFit = () => {
      if (isDisposed) return;

      const headerContent = headerContentRef.current;
      const logo = logoRef.current;
      const nav = navMeasureRef.current;
      const actions = actionsMeasureRef.current;

      if (!headerContent || !logo || !nav || !actions) return;

      const fullNavWidth =
        logo.offsetWidth +
        nav.scrollWidth +
        actions.scrollWidth +
        NAV_FIT_RESERVE;
      const compactByViewport = window.innerWidth < MIN_DESKTOP_NAV_WIDTH;
      const nextIsCompact =
        compactByViewport || fullNavWidth > headerContent.clientWidth;

      setIsCompactNav(nextIsCompact);
      if (!nextIsCompact) {
        setIsMenuOpen(false);
      }
    };

    measureNavFit();

    if (typeof ResizeObserver === "undefined") {
      window.addEventListener("resize", measureNavFit);

      return () => {
        isDisposed = true;
        window.removeEventListener("resize", measureNavFit);
      };
    }

    const resizeObserver = new ResizeObserver(measureNavFit);
    const observedElements: Element[] = [];
    [
      headerContentRef.current,
      logoRef.current,
      navMeasureRef.current,
      actionsMeasureRef.current,
    ].forEach((element) => {
      if (element) {
        observedElements.push(element);
      }
    });

    observedElements.forEach((element) => resizeObserver.observe(element));
    window.addEventListener("resize", measureNavFit);
    void document.fonts?.ready.then(measureNavFit);

    return () => {
      isDisposed = true;
      resizeObserver.disconnect();
      window.removeEventListener("resize", measureNavFit);
    };
  }, [lang]);

  useEffect(() => {
    if (!isMenuOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setIsMenuOpen(false);
      requestAnimationFrame(() => menuButtonRef.current?.focus());
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isMenuOpen]);

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const openBookingFromMenu = () => {
    closeMenu();
    onOpenBooking();
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[padding,background-color,border-color,box-shadow] duration-1000 ${
        scrolled
          ? "border-b border-white/15 bg-black/92 pt-[max(0.9rem,calc(env(safe-area-inset-top)+0.5rem))] pb-3 sm:py-4 shadow-[0_12px_36px_rgba(0,0,0,0.85)] backdrop-blur-2xl"
          : isRevealed
            ? "border-b border-white/10 bg-gradient-to-b from-black/95 via-black/60 to-transparent pt-[max(1.25rem,calc(env(safe-area-inset-top)+0.75rem))] pb-4 sm:py-6 backdrop-blur-[3px]"
            : "pointer-events-none border-b border-transparent bg-transparent pt-[max(1.25rem,calc(env(safe-area-inset-top)+0.75rem))] pb-4 sm:py-6"
      }`}
    >
      <div
        ref={headerContentRef}
        className="relative mx-auto flex min-h-[40px] w-full max-w-[1920px] items-center justify-between gap-3 px-4 sm:gap-5 sm:px-6 lg:px-10 xl:px-12"
      >
        <motion.a
          ref={logoRef}
          href="#hero"
          initial={{ opacity: 0, y: -16 }}
          animate={
            isRevealed
              ? { opacity: 1, y: 0 }
              : { opacity: 0, y: -16 }
          }
          transition={{ duration: 0.9, delay: 0.1, ease: EASE_OUT_EXPO }}
          className="group relative z-10 flex shrink-0 items-center"
        >
          <BrandLogo
            className="h-[34px] w-auto object-contain transition-transform duration-200 group-hover:scale-[1.03] sm:h-10 lg:h-[46px]"
            fallbackClassName="whitespace-nowrap text-sm font-bold tracking-[0.12em] sm:text-base"
          />
        </motion.a>

        <div
          ref={navMeasureRef}
          aria-hidden="true"
          className="pointer-events-none invisible absolute left-0 top-0 flex whitespace-nowrap text-xs font-bold uppercase tracking-[0.08em]"
        >
          <div className="flex items-center justify-center gap-6 xl:gap-8">
            {NAV_ITEMS.map((item) => (
              <span key={item.href}>{t.header.nav[item.label]}</span>
            ))}
            <span>{t.header.nav.certificates}</span>
          </div>
        </div>

        <div
          ref={actionsMeasureRef}
          aria-hidden="true"
          className="pointer-events-none invisible absolute right-0 top-0 flex shrink-0 items-center justify-end gap-2.5 sm:gap-3.5"
        >
          <div className="inline-flex h-8 items-center rounded-lg border border-white/15 bg-white/[0.06] p-[2px] text-xs uppercase tracking-wider backdrop-blur-xl sm:h-10 sm:rounded-xl sm:p-[3px] lg:h-11">
            {(["ru", "en"] as const).map((language) => (
              <span
                key={language}
                className="flex h-full min-w-8 items-center justify-center rounded-md border border-transparent px-2 text-[11px] font-bold tracking-wider sm:min-w-10 sm:rounded-lg sm:px-2.5 sm:text-xs lg:min-w-11"
              >
                {language.toUpperCase()}
              </span>
            ))}
          </div>
          <div className="h-8 w-8 rounded-lg border border-white/15 bg-white/[0.06] sm:h-10 sm:w-10 sm:rounded-xl lg:h-11 lg:w-11" />
          <div className="btn-swiss-primary h-10 whitespace-nowrap px-5 text-xs lg:h-11">
            <span>{t.header.bookBtn}</span>
          </div>
        </div>

        <AnimatePresence initial={false}>
          {!isCompactNav ? (
            <motion.nav
              key="desktop-navigation"
              aria-label={t.header.navLabel}
              initial={{ opacity: 0, y: -10 }}
              animate={
                isRevealed
                  ? { opacity: 1, y: 0 }
                  : { opacity: 0, y: -10 }
              }
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.9, delay: 0.25, ease: EASE_OUT_EXPO }}
              className="flex min-w-0 flex-1 justify-center px-4"
            >
              <ul className="flex min-w-0 items-center justify-center gap-6 xl:gap-8">
                {NAV_ITEMS.map((item) => (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      className="whitespace-nowrap text-xs font-bold uppercase tracking-[0.08em] text-[#8e8e93] transition-colors duration-200 hover:text-white"
                    >
                      {t.header.nav[item.label]}
                    </a>
                  </li>
                ))}
                <li>
                  <Link
                    href={getLocalizedPath(lang, "certificate")}
                    prefetch={false}
                    className="whitespace-nowrap text-xs font-bold uppercase tracking-[0.08em] text-[#8e8e93] transition-colors duration-200 hover:text-white"
                  >
                    {t.header.nav.certificates}
                  </Link>
                </li>
              </ul>
            </motion.nav>
          ) : null}
        </AnimatePresence>

        <motion.div
          initial={{ opacity: 0, y: -14 }}
          animate={
            isRevealed
              ? { opacity: 1, y: 0 }
              : { opacity: 0, y: -14 }
          }
          transition={{ duration: 0.9, delay: 0.4, ease: EASE_OUT_EXPO }}
          className="flex shrink-0 items-center justify-end gap-2.5 sm:gap-3.5"
        >
          <div className={isCompactNav ? "hidden sm:block" : "block"}>
            <LanguageSwitcher
              activeLanguage={lang}
              label={t.header.languageLabel}
            />
          </div>

          <SnowToggle
            isEnabled={isSnowEnabled}
            onToggle={onToggleSnow}
            enableLabel={t.header.snowEnable}
            disableLabel={t.header.snowDisable}
          />

          <div className={isCompactNav ? "hidden sm:block" : "block"}>
            <button
              type="button"
              onClick={isCompactNav ? openBookingFromMenu : onOpenBooking}
              className="btn-swiss-primary h-10 lg:h-11 whitespace-nowrap px-5 text-xs cursor-pointer active:scale-95"
            >
              <span>{t.header.bookBtn}</span>
            </button>
          </div>

          {isCompactNav ? (
            <button
              ref={menuButtonRef}
              type="button"
              aria-controls="site-header-menu"
              aria-expanded={isMenuOpen}
              aria-label={isMenuOpen ? t.header.menuClose : t.header.menuOpen}
              onClick={() => setIsMenuOpen((current) => !current)}
              className="inline-flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-lg border border-white/15 bg-white/[0.06] text-white backdrop-blur-xl transition-colors duration-200 hover:border-white/30 hover:bg-white/12 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ea4043] sm:h-11 sm:w-11 sm:rounded-xl"
            >
              {isMenuOpen ? (
                <X aria-hidden="true" size={18} strokeWidth={2} />
              ) : (
                <Menu aria-hidden="true" size={18} strokeWidth={2} />
              )}
            </button>
          ) : null}
        </motion.div>
      </div>

      <AnimatePresence initial={false}>
        {isCompactNav && isMenuOpen ? (
          <motion.div
            id="site-header-menu"
            key="site-header-menu"
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
            transition={{ duration: 0.32, ease: EASE_OUT_EXPO }}
            className="mx-auto mt-3 w-full max-w-[1920px] px-4 sm:px-6 lg:px-10 xl:px-12"
          >
            <div className="overflow-hidden rounded-lg border border-white/15 bg-black/94 shadow-[0_18px_48px_rgba(0,0,0,0.82)] backdrop-blur-2xl">
              <motion.nav
                aria-label={t.header.navLabel}
                variants={menuListVariants}
                className="p-2 sm:p-3"
              >
                <ul className="grid gap-1 sm:grid-cols-2">
                  {NAV_ITEMS.map((item) => (
                    <motion.li
                      key={item.href}
                      variants={menuItemVariants}
                      transition={{ duration: 0.24, ease: EASE_OUT_EXPO }}
                    >
                      <a
                        href={item.href}
                        onClick={closeMenu}
                        className="flex min-h-11 items-center rounded-md px-3 text-xs font-bold uppercase tracking-[0.08em] text-[#d8d8dc] transition-colors duration-200 hover:bg-white/[0.08] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ea4043] sm:px-4"
                      >
                        {t.header.nav[item.label]}
                      </a>
                    </motion.li>
                  ))}
                  <motion.li variants={menuItemVariants}>
                    <Link
                      href={getLocalizedPath(lang, "certificate")}
                      prefetch={false}
                      onClick={closeMenu}
                      className="flex min-h-11 items-center rounded-md px-3 text-xs font-bold uppercase tracking-[0.08em] text-[#d8d8dc] transition-colors duration-200 hover:bg-white/[0.08] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ea4043] sm:px-4"
                    >
                      {t.header.nav.certificates}
                    </Link>
                  </motion.li>
                </ul>

                <motion.div
                  variants={menuItemVariants}
                  transition={{ duration: 0.24, ease: EASE_OUT_EXPO }}
                  className="mt-2 flex flex-col gap-2 border-t border-white/10 p-2 sm:hidden"
                >
                  <LanguageSwitcher
                    activeLanguage={lang}
                    label={t.header.languageLabel}
                  />
                  <button
                    type="button"
                    onClick={openBookingFromMenu}
                    className="btn-swiss-primary h-11 w-full whitespace-nowrap px-5 text-xs cursor-pointer active:scale-95"
                  >
                    <span>{t.header.bookBtn}</span>
                  </button>
                </motion.div>
              </motion.nav>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
