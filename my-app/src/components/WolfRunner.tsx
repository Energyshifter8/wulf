"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useCallback, useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

interface WolfRunnerProps {
  spriteSheet: string;
  frameCount: number;
  frameWidth: number;
  frameHeight: number;
  segments?: number;
  segmentHeight?: number;
  className?: string;
}

export function WolfRunner({
  spriteSheet,
  frameCount,
  frameWidth,
  frameHeight,
  segments = 5,
  segmentHeight = 100,
  className = "",
}: WolfRunnerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const wolfRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  const setupAnimation = useCallback(() => {
    if (!containerRef.current || !wolfRef.current) return;

    const container = containerRef.current;
    const wolf = wolfRef.current;

    const totalScrollHeight = segments * segmentHeight;
    const horizontalTravel = window.innerWidth * 0.6;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: "top top",
        end: `+=${totalScrollHeight}`,
        pin: true,
        scrub: 0.5,
        anticipatePin: 1,
      },
    });

    let currentX = -horizontalTravel / 2;
    let direction = 1;

    for (let i = 0; i < segments; i++) {
      const startX = currentX;
      const endX = startX + direction * horizontalTravel;

      const segmentLabel = `segment${i}`;
      tl.addLabel(segmentLabel, i * segmentHeight);

      tl.to(
        wolf,
        {
          x: endX,
          duration: segmentHeight,
          ease: "none",
        },
        segmentLabel,
      );

      tl.to(
        wolf,
        {
          scaleX: direction > 0 ? 1 : -1,
          duration: 0.1,
          ease: "power2.out",
        },
        segmentLabel,
      );

      const bobAmount = 8;
      const bobFrequency = 4;
      for (let j = 0; j < bobFrequency; j++) {
        const bobDuration = segmentHeight / bobFrequency;
        const bobY = j % 2 === 0 ? -bobAmount : bobAmount;

        tl.to(
          wolf,
          {
            y: bobY,
            duration: bobDuration,
            ease: "sine.inOut",
          },
          `${segmentLabel}+${j * bobDuration}`,
        );
      }

      currentX = endX;
      direction *= -1;
    }

    const totalFrames = frameCount;
    const frameStep = frameWidth;

    tl.to(
      wolf,
      {
        backgroundPositionX: -frameStep * (totalFrames - 1),
        duration: totalScrollHeight,
        ease: "none",
      },
      0,
    );

    timelineRef.current = tl;

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach((st) => {
        st.kill();
      });
    };
  }, [segments, segmentHeight, frameCount, frameWidth]);

  useEffect(() => {
    const cleanup = setupAnimation();
    return cleanup;
  }, [setupAnimation]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full overflow-hidden ${className}`}
      style={{ height: `${segmentHeight}vh` }}
    >
      <div
        ref={wolfRef}
        className="absolute left-1/2 top-1/2"
        style={{
          width: `${frameWidth}px`,
          height: `${frameHeight}px`,
          backgroundImage: `url(${spriteSheet})`,
          backgroundSize: `${frameWidth * frameCount}px ${frameHeight}px`,
          backgroundPosition: "0px 0px",
          backgroundRepeat: "no-repeat",
          willChange: "transform",
          transform: "translate(-50%, -50%)",
          imageRendering: "pixelated",
        }}
      />
    </div>
  );
}
