"use client";

import { useEffect } from "react";
import { useSmoothScroll } from "./SmoothScrollProvider";

/**
 * iOS Safari ignores `overflow: hidden` on <body> for touch scrolling, so a
 * dialog opened there still lets the page pan behind it (vertically *and*
 * horizontally, via rubber-banding). Pinning the body with `position: fixed`
 * and restoring the offset on release is the technique that holds on every
 * engine. <html> is locked alongside it: `body { overflow-x: hidden }` in
 * globals.css normally propagates to the viewport, but a pinned body stops
 * being the element that propagation reads, which leaves the viewport free to
 * pan sideways. `overscroll-behavior: none` kills the remaining bounce.
 *
 * `scrollbar-gutter: stable` on <html> (globals.css) keeps the desktop layout
 * from shifting while the document scrollbar is gone.
 */
let activeLocks = 0;
let savedScrollY = 0;

/**
 * True while a dialog holds the page pinned. Pinning collapses the document, so
 * `window.scrollY` reads 0 for as long as the lock is held — scroll listeners
 * that drive UI state (active nav tab, condensed header) must ignore that or
 * they flip to their top-of-page state behind the dialog and animate back when
 * it closes.
 */
export function isPageScrollLocked() {
  return activeLocks > 0;
}

export function useScrollLock(isLocked: boolean) {
  const lenis = useSmoothScroll();

  useEffect(() => {
    if (!isLocked) return;

    const { body, documentElement } = document;
    activeLocks += 1;

    if (activeLocks === 1) {
      savedScrollY = window.scrollY;
      body.style.position = "fixed";
      body.style.top = `-${savedScrollY}px`;
      body.style.left = "0";
      body.style.right = "0";
      body.style.width = "100%";
      body.style.overflow = "hidden";
      documentElement.style.overflow = "hidden";
      documentElement.style.overscrollBehavior = "none";
    }

    lenis?.stop();

    return () => {
      activeLocks = Math.max(0, activeLocks - 1);
      if (activeLocks > 0) return;

      body.style.position = "";
      body.style.top = "";
      body.style.left = "";
      body.style.right = "";
      body.style.width = "";
      body.style.overflow = "";
      documentElement.style.overflow = "";
      documentElement.style.overscrollBehavior = "";

      // Same task as the style reset, so the jump to 0 is never painted.
      window.scrollTo({ top: savedScrollY, left: 0, behavior: "instant" });

      // Lenis cached its scroll limit while the pinned body collapsed the
      // document to one viewport; without a resize it clamps the restored
      // offset back to 0. `resize()` also re-syncs it to the real position.
      lenis?.resize();
      lenis?.start();
    };
  }, [isLocked, lenis]);
}
