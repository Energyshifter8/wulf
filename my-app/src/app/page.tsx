"use client";

import { WolfRunner } from "@/components/WolfRunner";

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      {/* Hero Section */}
      <section className="h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-6xl font-bold mb-4 tracking-tight">
            Wolf Runner
          </h1>
          <p className="text-xl text-zinc-400 mb-8">
            Scroll to see the wolf run
          </p>
          <div className="animate-bounce">
            <svg
              className="w-6 h-6 mx-auto text-zinc-500"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
      </section>

      {/* Wolf Animation Section */}
      <WolfRunner
        spriteSheet="/wolf-sprite.svg"
        frameCount={8}
        frameWidth={120}
        frameHeight={120}
        segments={6}
        segmentHeight={100}
        className="bg-gradient-to-b from-zinc-900 to-zinc-950"
      />

      {/* Spacer for scroll */}
      <section className="h-screen flex items-center justify-center">
        <p className="text-2xl text-zinc-500">End of animation</p>
      </section>
    </div>
  );
}
