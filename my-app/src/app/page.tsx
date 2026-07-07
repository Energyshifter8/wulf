"use client";

import { VideoScrubber } from "@/components/VideoScrubber";

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      {/* Hero Video Section */}
      <VideoScrubber
        src="/wolf-hero.mp4"
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

      {/* End spacer */}
      <section className="h-screen flex items-center justify-center">
        <p className="text-2xl text-zinc-500">End of animation</p>
      </section>
    </div>
  );
}
