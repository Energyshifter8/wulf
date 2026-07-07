"use client";

import { VideoScrubber } from "@/components/VideoScrubber";

export default function Home() {
  return (
    <div className="bg-zinc-950 text-white">
      <VideoScrubber
        src="/wolf-hero.mp4"
        poster="/wolf-hero-poster.jpg"
        pinDurationVh={600}
      />
    </div>
  );
}
