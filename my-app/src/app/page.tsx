"use client";

import { SpiderNet } from "@/components/SpiderNet";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-zinc-950">
      <SpiderNet />
      <div className="relative z-10 flex min-h-screen items-center justify-center">
        <h1 className="text-6xl font-bold text-white tracking-tight">
          Spider Net
        </h1>
      </div>
    </div>
  );
}
