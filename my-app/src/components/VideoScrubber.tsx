"use client";

import { useEffect, useRef, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface VideoScrubberProps {
  src: string;
  poster?: string;
  pinDurationVh?: number;
  fps?: number;
  className?: string;
}

export function VideoScrubber({
  src,
  poster,
  pinDurationVh = 600,
  fps = 24,
  className = "",
}: VideoScrubberProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const lastUpdateTime = useRef(0);
  const rafId = useRef<number | null>(null);

  const frameDuration = 1 / fps;

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
      const snappedTime =
        Math.round(clampedTime / frameDuration) * frameDuration;

      if (canSeekSmoothly(video)) {
        video.currentTime = snappedTime;
      }
    },
    [canSeekSmoothly, frameDuration],
  );

  useEffect(() => {
    const video = videoRef.current;
    const container = containerRef.current;
    if (!video || !container) return;

    const st = ScrollTrigger.create({
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
          const progress = self.progress;
          const duration = video.duration || 0;
          if (duration > 0) {
            seekToTime(video, progress * duration);
          }
        });
      },
    });

    return () => {
      if (rafId.current !== null) {
        cancelAnimationFrame(rafId.current);
      }
      st.kill();
    };
  }, [pinDurationVh, seekToTime, fps]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full ${className}`}
      style={{ height: `${pinDurationVh}vh` }}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <video
          ref={videoRef}
          className="h-full w-full object-cover"
          src={src}
          poster={poster}
          muted
          playsInline
          preload="auto"
        />
      </div>
    </div>
  );
}
