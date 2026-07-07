"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface VideoScrubberProps {
  src: string;
  poster?: string;
  pinDurationVh?: number;
  transitionStart?: number;
  className?: string;
  children?: React.ReactNode;
}

export function VideoScrubber({
  src,
  poster,
  pinDurationVh = 300,
  transitionStart = 0.85,
  className = "",
  children,
}: VideoScrubberProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  const [showPoster, setShowPoster] = useState(true);

  const lastUpdateTime = useRef(0);
  const pendingTime = useRef<number | null>(null);
  const rafId = useRef<number | null>(null);

  const canSeekSmoothly = useCallback((video: HTMLVideoElement): boolean => {
    if (video.readyState < 2) return false;
    const currentTime = video.currentTime;
    if (video.buffered.length === 0) return false;
    for (let i = 0; i < video.buffered.length; i++) {
      if (
        video.buffered.start(i) <= currentTime &&
        video.buffered.end(i) >= currentTime
      ) {
        return true;
      }
    }
    return false;
  }, []);

  const seekToTime = useCallback(
    (video: HTMLVideoElement, time: number) => {
      const clampedTime = Math.max(0, Math.min(time, video.duration || 0));

      if (canSeekSmoothly(video)) {
        video.currentTime = clampedTime;
      } else {
        pendingTime.current = clampedTime;
      }
    },
    [canSeekSmoothly],
  );

  useEffect(() => {
    const video = videoRef.current;
    const container = containerRef.current;
    const overlay = overlayRef.current;
    if (!video || !container || !overlay) return;

    const handleCanPlay = () => {
      setShowPoster(false);
    };

    const handleProgress = () => {
      if (video.buffered.length > 0 && video.readyState >= 2) {
        setShowPoster(false);
      }
    };

    const handleTimeUpdate = () => {
      if (pendingTime.current !== null) {
        const diff = Math.abs(video.currentTime - pendingTime.current);
        if (diff < 0.1) {
          pendingTime.current = null;
        }
      }
    };

    video.addEventListener("canplay", handleCanPlay);
    video.addEventListener("canplaythrough", handleCanPlay);
    video.addEventListener("progress", handleProgress);
    video.addEventListener("timeupdate", handleTimeUpdate);

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: "top top",
        end: `+=${pinDurationVh}vh`,
        pin: true,
        scrub: 0.5,
        anticipatePin: 1,
        onUpdate: (self) => {
          const now = performance.now();
          if (now - lastUpdateTime.current < 16) return;
          lastUpdateTime.current = now;

          if (rafId.current !== null) {
            cancelAnimationFrame(rafId.current);
          }

          rafId.current = requestAnimationFrame(() => {
            if (!video || video.paused) return;

            const progress = self.progress;
            const duration = video.duration || 0;
            if (duration > 0) {
              seekToTime(video, progress * duration);
            }
          });
        },
      },
    });

    const transitionDuration = 1 - transitionStart;

    gsap.to(video, {
      opacity: 0,
      scale: 1.05,
      duration: transitionDuration,
      ease: "power2.inOut",
      scrollTrigger: {
        trigger: container,
        start: `top+=${transitionStart * pinDurationVh}vh top`,
        end: `+=${transitionDuration * pinDurationVh}vh`,
        scrub: 0.5,
      },
    });

    gsap.fromTo(overlay,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: transitionDuration,
        ease: "power2.out",
        scrollTrigger: {
          trigger: container,
          start: `top+=${(transitionStart + 0.05) * pinDurationVh}vh top`,
          end: `+=${transitionDuration * pinDurationVh}vh`,
          scrub: 0.5,
        },
      },
    );

    timelineRef.current = tl;

    return () => {
      video.removeEventListener("canplay", handleCanPlay);
      video.removeEventListener("canplaythrough", handleCanPlay);
      video.removeEventListener("progress", handleProgress);
      video.removeEventListener("timeupdate", handleTimeUpdate);

      if (rafId.current !== null) {
        cancelAnimationFrame(rafId.current);
      }

      tl.kill();
      ScrollTrigger.getAll().forEach((st) => {
        st.kill();
      });
    };
  }, [
    pinDurationVh,
    transitionStart,
    seekToTime,
  ]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full ${className}`}
      style={{ height: `${pinDurationVh}vh` }}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <div className="relative h-full w-full">
          {/* Video element */}
          <video
            ref={videoRef}
            className="absolute inset-0 h-full w-full origin-center object-cover"
            src={src}
            poster={poster}
            muted
            playsInline
            preload="auto"
            style={{
              willChange: "transform, opacity",
            }}
          />

          {/* Poster overlay (shown until buffered) */}
          {showPoster && poster && (
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${poster})` }}
            />
          )}

          {/* Transition overlay content */}
          <div
            ref={overlayRef}
            className="absolute inset-0 flex items-center justify-center opacity-0"
          >
            {children || (
              <div className="text-center">
                <h2 className="mb-4 text-5xl font-bold tracking-tight text-white">
                  The Wolf Awaits
                </h2>
                <p className="text-xl text-zinc-300">
                  Continue scrolling to explore
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
