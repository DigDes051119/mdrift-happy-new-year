"use client";

import { MediaImage } from "@/shared/ui/media/MediaImage";
import { useReducedMotion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { MEDIA_ENABLED } from "@/shared/config/media";

export type AmbientVideoClip = {
  mp4?: string;
  webm?: string;
};

interface AmbientVideoProps {
  clips: readonly AmbientVideoClip[];
  poster?: string;
  posterClassName?: string;
  posterPreload?: boolean;
  posterSizes?: string;
  isEnabled?: boolean;
  allowWhenMediaDisabled?: boolean;
  loop?: boolean;
  className: string;
  activeClassName: string;
  inactiveClassName: string;
  onFirstClipNearEnd?: () => void;
}

type NetworkInformation = {
  effectiveType?: string;
  saveData?: boolean;
};

type NavigatorWithConnection = Navigator & {
  connection?: NetworkInformation;
};

function canLoadAmbientVideo(): boolean {
  if (typeof navigator === "undefined") return true;
  const connection = (navigator as NavigatorWithConnection).connection;
  return (
    connection?.saveData !== true &&
    connection?.effectiveType !== "slow-2g" &&
    connection?.effectiveType !== "2g"
  );
}

function getSources(clip?: AmbientVideoClip) {
  if (!clip) return [];
  return [
    clip.webm ? { src: clip.webm, type: 'video/webm; codecs="vp9"' } : null,
    clip.mp4 ? { src: clip.mp4, type: "video/mp4" } : null,
  ].filter((source): source is { src: string; type: string } => source !== null);
}

function configureMediaElement(video: HTMLVideoElement | null): void {
  if (!video) return;
  video.muted = true;
  video.defaultMuted = true;
  video.playsInline = true;
  video.setAttribute("playsinline", "");
  video.setAttribute("webkit-playsinline", "");
}

export function AmbientVideo(props: AmbientVideoProps) {
  if (!MEDIA_ENABLED && !props.allowWhenMediaDisabled) {
    return (
      <div
        aria-hidden="true"
        className="absolute inset-0 h-full w-full bg-black"
      />
    );
  }

  return <EnabledAmbientVideo {...props} />;
}

function EnabledAmbientVideo({
  clips,
  poster,
  posterClassName = "object-cover object-center",
  posterPreload = false,
  posterSizes = "(min-width: 1820px) 1820px, 100vw",
  isEnabled = true,
  loop = true,
  className,
  activeClassName,
  inactiveClassName,
  onFirstClipNearEnd,
}: AmbientVideoProps) {
  const prefersReducedMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);

  const videoRefA = useRef<HTMLVideoElement | null>(null);
  const videoRefB = useRef<HTMLVideoElement | null>(null);

  const [activeSlot, setActiveSlot] = useState<"A" | "B">("A");
  const [clipIdxA, setClipIdxA] = useState(0);
  const [clipIdxB, setClipIdxB] = useState(clips.length > 1 ? 1 : 0);
  const [hasStartedPlayback, setHasStartedPlayback] = useState(false);

  const [isInView, setIsInView] = useState(false);
  const [sourcesEnabled, setSourcesEnabled] = useState(false);

  const [posterReady, setPosterReady] = useState(false);
  const [warmStandby, setWarmStandby] = useState(false);
  const failedClips = useRef(new Set<number>());
  const [playlistFailed, setPlaylistFailed] = useState(false);
  const loadMedia = isEnabled && sourcesEnabled && !prefersReducedMotion &&
    (!posterPreload || !poster || posterReady) && !playlistFailed;
  const loadA = loadMedia && (activeSlot === "A" || warmStandby);
  const loadB = loadMedia && (activeSlot === "B" || warmStandby);

  const isSingleClip = clips.length <= 1;
  const shouldPlay =
    loadMedia && isInView;

  const activeSlotRef = useRef<"A" | "B">("A");
  const hasTriggeredNearEndRef = useRef(false);

  useEffect(() => {
    activeSlotRef.current = activeSlot;
  }, [activeSlot]);

  useEffect(() => {
    configureMediaElement(videoRefA.current);
    configureMediaElement(videoRefB.current);
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const playbackObserver = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { threshold: 0.01 },
    );
    const sourceObserver = new IntersectionObserver(
      ([entry]) => {
        if (
          entry.isIntersecting &&
          canLoadAmbientVideo() &&
          !prefersReducedMotion
        ) {
          setSourcesEnabled(true);
          sourceObserver.disconnect();
        }
      },
      { rootMargin: "200px" },
    );

    playbackObserver.observe(container);
    sourceObserver.observe(container);

    return () => {
      playbackObserver.disconnect();
      sourceObserver.disconnect();
    };
  }, [prefersReducedMotion]);

  useEffect(() => {
    const activeVideo =
      activeSlot === "A" ? videoRefA.current : videoRefB.current;
    const inactiveVideo =
      activeSlot === "A" ? videoRefB.current : videoRefA.current;

    if (!shouldPlay) {
      activeVideo?.pause();
      inactiveVideo?.pause();
      return;
    }

    if (activeVideo) {
      configureMediaElement(activeVideo);
      const playPromise = activeVideo.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {});
      }
    }

    inactiveVideo?.pause();
  }, [activeSlot, shouldPlay]);

  useEffect(() => {
    const onVisibilityChange = () => {
      if (document.hidden) {
        videoRefA.current?.pause();
        videoRefB.current?.pause();
        return;
      }

      if (!shouldPlay) return;
      const activeVideo =
        activeSlot === "A" ? videoRefA.current : videoRefB.current;
      if (activeVideo && (!activeVideo.ended || loop)) {
        configureMediaElement(activeVideo);
        activeVideo.play().catch(() => {});
      }
    };

    document.addEventListener("visibilitychange", onVisibilityChange);
    return () =>
      document.removeEventListener("visibilitychange", onVisibilityChange);
  }, [activeSlot, shouldPlay, loop]);

  const cutToNextClip = useCallback(() => {
    if (isSingleClip) return;

    const currentSlot = activeSlotRef.current;
    const currentClipIdx = currentSlot === "A" ? clipIdxA : clipIdxB;

    if (!loop && currentClipIdx === clips.length - 1) {
      const activeVideo =
        currentSlot === "A" ? videoRefA.current : videoRefB.current;
      activeVideo?.pause();
      return;
    }

    const nextSlot = currentSlot === "A" ? "B" : "A";
    setWarmStandby(false);
    activeSlotRef.current = nextSlot;
    setActiveSlot(nextSlot);

    if (nextSlot === "B") {
      const nextNextIdx = (clipIdxB + 1) % clips.length;
      setClipIdxA(nextNextIdx);
    } else {
      const nextNextIdx = (clipIdxA + 1) % clips.length;
      setClipIdxB(nextNextIdx);
    }
  }, [clipIdxA, clipIdxB, clips.length, isSingleClip, loop]);

  const handlePlaying = useCallback(() => {
    setHasStartedPlayback(true);
  }, []);

  const handleTimeUpdate = useCallback(
    (element: HTMLVideoElement, slot: "A" | "B") => {
      if (slot !== activeSlotRef.current) return;

      if (!isSingleClip && element.currentTime > 0 && element.duration - element.currentTime <= 1.25) {
        setWarmStandby(true);
      }

      if (slot === "A" && clipIdxA === 0 && !hasTriggeredNearEndRef.current) {
        if (
          element.currentTime >= 2.0 ||
          (element.duration > 0 && element.duration - element.currentTime <= 2.0)
        ) {
          hasTriggeredNearEndRef.current = true;
          onFirstClipNearEnd?.();
        }
      }
    },
    [clipIdxA, isSingleClip, onFirstClipNearEnd],
  );

  const handleEnded = useCallback(
    (slot: "A" | "B") => {
      if (slot === activeSlotRef.current) {
        cutToNextClip();
      }
    },
    [cutToNextClip],
  );

  const handleError = (slot: "A" | "B") => {
    if (slot !== activeSlotRef.current) return;
    failedClips.current.add(slot === "A" ? clipIdxA : clipIdxB);
    if (isSingleClip || failedClips.current.size >= clips.length) {
      setPlaylistFailed(true);
      return;
    }
    cutToNextClip();
  };

  const clipA = clips[clipIdxA];
  const clipB = clips[clipIdxB];
  const sourcesA = loadA ? getSources(clipA) : [];
  const sourcesB = loadB ? getSources(clipB) : [];

  const classSlotA =
    hasStartedPlayback && loadMedia && activeSlot === "A"
      ? `${activeClassName} opacity-100`
      : `${inactiveClassName} opacity-0 pointer-events-none`;

  const classSlotB =
    hasStartedPlayback && loadMedia && activeSlot === "B"
      ? `${activeClassName} opacity-100`
      : `${inactiveClassName} opacity-0 pointer-events-none`;

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 h-full w-full overflow-hidden bg-black"
    >
      {poster && (
        <MediaImage
          src={poster}
          alt=""
          fill
          onLoad={() => setPosterReady(true)}
          onError={() => setPosterReady(true)}
          preload={posterPreload}
          sizes={posterSizes}
          className={`pointer-events-none select-none z-0 ${
            hasStartedPlayback && loadMedia ? "opacity-0" : "opacity-100"
          } ${posterClassName}`}
        />
      )}

      <video
        ref={videoRefA}
        key={`A-${clipIdxA}-${loadA}`}
        muted
        playsInline
        autoPlay={shouldPlay && activeSlot === "A"}
        loop={loop && isSingleClip}
        preload={loadA ? "auto" : "none"}
        disablePictureInPicture
        disableRemotePlayback
        onEnded={() => handleEnded("A")}
        onPlaying={handlePlaying}
        onTimeUpdate={(e) => handleTimeUpdate(e.currentTarget, "A")}
        onError={() => handleError("A")}
        className={`${className} ${classSlotA}`}
      >
        {sourcesA.map((source, index) => (
            <source
              key={source.src}
              src={source.src}
              type={source.type}
              onError={index === sourcesA.length - 1 ? () => handleError("A") : undefined}
            />
          ))}
      </video>

      {!isSingleClip && (
        <video
          ref={videoRefB}
          key={`B-${clipIdxB}-${loadB}`}
          muted
          playsInline
          autoPlay={shouldPlay && activeSlot === "B"}
          loop={false}
          preload={loadB ? "auto" : "none"}
          disablePictureInPicture
          disableRemotePlayback
          onEnded={() => handleEnded("B")}
          onPlaying={handlePlaying}
          onTimeUpdate={(e) => handleTimeUpdate(e.currentTarget, "B")}
          onError={() => handleError("B")}
          className={`${className} ${classSlotB}`}
        >
          {sourcesB.map((source, index) => (
              <source
                key={source.src}
                src={source.src}
                type={source.type}
                onError={index === sourcesB.length - 1 ? () => handleError("B") : undefined}
              />
            ))}
        </video>
      )}
    </div>
  );
}
