"use client";

import { motion, useMotionValue, animate } from "motion/react";
import { type ReactNode, useEffect, useRef, useState } from "react";
import { CloseIcon } from "@/shared/ui/icons";
import { useModalA11y } from "./useModalA11y";

interface ModalShellProps {
  /** Id of the heading rendered inside `children`. */
  labelledById: string;
  onClose: () => void;
  closeLabel: string;
  isCloseDisabled?: boolean;
  /** Width cap for the panel, e.g. `max-w-5xl xl:max-w-6xl`. */
  panelWidthClassName: string;
  children: ReactNode;
}

/**
 * 120fps hardware-accelerated bottom sheet on mobile (with jitter-free pull-down & pull-up gestures),
 * centered dialog from `sm` up.
 */
export function ModalShell({
  labelledById,
  onClose,
  closeLabel,
  isCloseDisabled = false,
  panelWidthClassName,
  children,
}: ModalShellProps) {
  const [isClosing, setIsClosing] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window !== "undefined") {
      return window.innerWidth < 640;
    }
    return false;
  });

  const y = useMotionValue(0);
  const touchStartY = useRef<number | null>(null);
  const touchStartTime = useRef<number>(0);
  const isDragging = useRef(false);

  const startClose = () => {
    if (isClosing) return;
    setIsClosing(true);

    if (isMobile) {
      const windowH = typeof window !== "undefined" ? window.innerHeight : 800;
      animate(y, windowH, {
        type: "spring",
        damping: 32,
        stiffness: 300,
        mass: 0.8,
      }).then(() => {
        onClose();
      });
    } else {
      setTimeout(() => {
        onClose();
      }, 250);
    }
  };

  const { panelRef, dialogProps } = useModalA11y({ onClose: startClose, labelledById });

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Smooth entrance animation on mobile
  useEffect(() => {
    if (isMobile) {
      const windowH = typeof window !== "undefined" ? window.innerHeight : 800;
      y.set(windowH);
      animate(y, 0, {
        type: "spring",
        damping: 30,
        stiffness: 280,
        mass: 0.8,
      });
    }
  }, [isMobile, y]);

  // Jitter-free touch gestures for mobile bottom sheet
  const handleTouchStart = (e: React.TouchEvent) => {
    if (!isMobile || isClosing) return;
    if ((e.target as HTMLElement).closest("button")) return;
    touchStartY.current = e.touches[0].clientY;
    touchStartTime.current = Date.now();
    isDragging.current = true;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging.current || touchStartY.current === null) return;
    const deltaY = e.touches[0].clientY - touchStartY.current;

    if (!isExpanded) {
      // From 88dvh: pull down follows 1:1, pull up has slight resistance
      if (deltaY > 0) {
        y.set(deltaY);
      } else {
        y.set(deltaY * 0.7);
      }
    } else {
      // From 100dvh: pull down follows finger
      if (deltaY > 0) {
        y.set(deltaY);
      }
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!isDragging.current || touchStartY.current === null) return;
    isDragging.current = false;
    const deltaY = e.changedTouches[0].clientY - touchStartY.current;
    const deltaTime = Math.max(1, Date.now() - touchStartTime.current);
    const velocity = deltaY / deltaTime; // px per ms

    touchStartY.current = null;

    if (!isExpanded) {
      // Pull down: close if dragged > 75px or flicked down
      if (deltaY > 75 || velocity > 0.4) {
        startClose();
        return;
      }
      // Pull up: expand if dragged up > 35px or flicked up
      if (deltaY < -35 || velocity < -0.3) {
        setIsExpanded(true);
        animate(y, 0, { type: "spring", damping: 28, stiffness: 350 });
        return;
      }
      // Rebound to 88dvh resting position
      animate(y, 0, { type: "spring", damping: 28, stiffness: 350 });
    } else {
      // From fullscreen:
      // Hard swipe down (> 160px or fast flick) -> close completely
      if (deltaY > 160 || velocity > 0.6) {
        startClose();
        return;
      }
      // Moderate swipe down (> 40px or flick) -> collapse to 88dvh
      if (deltaY > 40 || velocity > 0.25) {
        setIsExpanded(false);
        animate(y, 0, { type: "spring", damping: 28, stiffness: 350 });
        return;
      }
      // Rebound to fullscreen resting position
      animate(y, 0, { type: "spring", damping: 28, stiffness: 350 });
    }
  };

  return (
    <div
      {...dialogProps}
      className={`fixed inset-x-0 bottom-0 top-0 z-50 h-[100dvh] overflow-hidden overscroll-none flex ${
        isMobile ? "items-end" : "items-center"
      } justify-center ${
        isMobile ? "p-0" : "p-5 md:p-6 lg:p-8"
      } font-sans`}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isClosing ? 0 : 1 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        aria-hidden="true"
        onClick={startClose}
        className="absolute inset-0 bg-black/80 backdrop-blur-sm sm:backdrop-blur-xl"
      />

      <motion.div
        ref={panelRef}
        tabIndex={-1}
        style={isMobile ? { y } : undefined}
        initial={isMobile ? false : { opacity: 0, y: 25, scale: 0.98 }}
        animate={
          isMobile
            ? undefined
            : {
                opacity: isClosing ? 0 : 1,
                y: isClosing ? 25 : 0,
                scale: isClosing ? 0.98 : 1,
              }
        }
        transition={isMobile ? undefined : { duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
        className={`relative z-10 flex w-full ${panelWidthClassName} ${
          isMobile
            ? `${
                isExpanded ? "h-[100dvh] rounded-t-none" : "h-[88dvh] rounded-t-3xl"
              } border-t border-white/15 bg-[#08080c] shadow-2xl transition-[height,border-radius] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]`
            : "max-h-full sm:h-auto sm:max-h-[92dvh] rounded-2xl border border-white/15 bg-[#08080c] shadow-[0_30px_90px_rgba(0,0,0,0.95),0_0_60px_rgba(234,64,67,0.08)]"
        } flex-col overflow-hidden will-change-transform transform-gpu`}
      >
        {/* Pinned Top Bar: Touch-friendly Drag Handle & Redesigned Close Button */}
        <div
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          className="relative shrink-0 flex items-center justify-end px-4 sm:px-5 py-2.5 sm:py-3 border-b border-white/10 select-none cursor-grab active:cursor-grabbing sm:cursor-default"
        >
          {/* iOS Grab Handle (Tappable & Draggable) */}
          <div
            onClick={() => isMobile && !isClosing && setIsExpanded((prev) => !prev)}
            className="absolute left-1/2 top-0 bottom-0 -translate-x-1/2 flex items-center justify-center w-36 py-2 cursor-pointer sm:hidden touch-none"
            aria-label={isExpanded ? "Свернуть" : "Развернуть на весь экран"}
          >
            <span
              className={`h-1.5 rounded-full transition-all duration-200 ${
                isExpanded
                  ? "w-14 bg-white/45 shadow-[0_0_8px_rgba(255,255,255,0.2)]"
                  : "w-11 bg-white/30 hover:bg-white/45"
              }`}
            />
          </div>

          {/* Redesigned Clean & Tactile Close Button */}
          <button
            type="button"
            onClick={startClose}
            disabled={isCloseDisabled}
            className="relative z-20 w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center bg-white/10 hover:bg-white/20 active:bg-white/25 active:scale-90 border border-white/20 text-white/90 hover:text-white shadow-md backdrop-blur-md disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-all duration-150"
            aria-label={closeLabel}
          >
            <CloseIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2.5]" />
          </button>
        </div>

        {/* Scrollable Content Region */}
        <div
          data-lenis-prevent="true"
          className="relative min-h-0 flex-1 overflow-y-auto overflow-x-hidden overscroll-contain [touch-action:pan-y_pinch-zoom] no-scrollbar p-5 sm:p-8 lg:p-10 xl:p-12 pb-[max(5rem,calc(12dvh+env(safe-area-inset-bottom)))]"
        >
          {children}
        </div>
      </motion.div>
    </div>
  );
}
