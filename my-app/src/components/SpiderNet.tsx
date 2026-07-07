"use client";

import type { ISourceOptions } from "@tsparticles/engine";
import { Particles, ParticlesProvider } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import { useMemo } from "react";

interface SpiderNetProps {
  className?: string;
}

function SpiderNetInner({ className = "" }: SpiderNetProps) {
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
          value: "#9ca3af",
        },
        links: {
          color: "#6b7280",
          distance: 180,
          enable: true,
          opacity: 0.5,
          width: 1.5,
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
          value: 320,
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
            min: 1.5,
            max: 3,
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

  return (
    <div className={`absolute inset-0 ${className}`}>
      <Particles id="spider-net" options={options} className="h-full w-full" />
    </div>
  );
}

export function SpiderNet(props: SpiderNetProps) {
  return (
    <ParticlesProvider init={(engine) => loadSlim(engine)}>
      <SpiderNetInner {...props} />
    </ParticlesProvider>
  );
}
