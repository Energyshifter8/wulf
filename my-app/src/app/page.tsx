"use client";

import { VideoScrubber } from "@/components/VideoScrubber";
import { WolfRunner } from "@/components/WolfRunner";

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      {/* Hero Video Section */}
      <VideoScrubber
        src="/video.mp4"
        poster="/wolf-hero-poster.jpg"
        pinDurationVh={300}
        transitionStart={0.85}
      >
        <div className="text-center">
          <h2 className="mb-4 text-5xl font-bold tracking-tight text-white drop-shadow-lg">
            The Hunt Begins
          </h2>
          <p className="text-xl text-zinc-300">
            Scroll to witness the wolf in motion
          </p>
        </div>
      </VideoScrubber>

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

      {/* End spacer */}
      <section className="h-screen flex items-center justify-center">
        <p className="text-2xl text-zinc-500">End of animation</p>
      </section>
    </div>
  );
}
