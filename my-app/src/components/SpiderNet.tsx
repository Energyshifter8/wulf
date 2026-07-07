"use client";

import { useEffect, useState, useMemo } from "react";
import dynamic from "next/dynamic";
import { tsParticles } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";
import type { ISourceOptions } from "@tsparticles/engine";

const Particles = dynamic(
  () => import("@tsparticles/react").then((mod) => mod.Particles),
  { ssr: false },
);

interface SpiderNetProps {
  className?: string;
}

export function SpiderNet({ className = "" }: SpiderNetProps) {
  const [init, setInit] = useState(false);

  useEffect(() => {
    loadSlim(tsParticles).then(() => setInit(true));
  }, []);

  const options: ISourceOptions = useMemo(
    () => ({
      fullScreen: false,
      fpsLimit: 60,
      interactivity: {
        events: {
          onHover: {
            enable: true,
            mode: "grab",
          },
          resize: {
            enable: true,
          },
        },
        modes: {
          grab: {
            distance: 200,
            links: {
              opacity: 0.8,
            },
          },
        },
      },
      particles: {
        color: {
          value: "#6b7280",
        },
        links: {
          color: "#4b5563",
          distance: 150,
          enable: true,
          opacity: 0.3,
          width: 1,
        },
        move: {
          enable: true,
          speed: 0.4,
          direction: "none" as const,
          random: true,
          straight: false,
          outModes: {
            default: "bounce" as const,
          },
        },
        number: {
          density: {
            enable: true,
          },
          value: 80,
        },
        opacity: {
          value: {
            min: 0.1,
            max: 0.5,
          },
          animation: {
            enable: true,
            speed: 0.3,
            sync: false,
          },
        },
        shape: {
          type: "circle",
        },
        size: {
          value: {
            min: 1,
            max: 2,
          },
          animation: {
            enable: true,
            speed: 0.5,
            sync: false,
          },
        },
      },
      detectRetina: true,
    }),
    [],
  );

  if (!init) return null;

  return (
    <div className={`absolute inset-0 ${className}`}>
      <Particles id="spider-net" options={options} className="h-full w-full" />
    </div>
  );
}
