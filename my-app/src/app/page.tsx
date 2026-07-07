"use client";

import { useEffect, useState } from "react";
import { SpiderNet } from "@/components/SpiderNet";

const stats = [
  { label: "Nodes Active", value: "2,847", color: "text-neon-cyan" },
  { label: "Data Streams", value: "1.2 TB/s", color: "text-neon-purple" },
  { label: "Uptime", value: "99.97%", color: "text-neon-pink" },
];

const features = [
  {
    icon: "01",
    title: "Neural Mesh",
    desc: "Distributed processing across thousands of interconnected nodes. Self-healing architecture.",
  },
  {
    icon: "02",
    title: "Quantum Sync",
    desc: "Real-time data synchronization with zero-latency protocols. Encrypted end-to-end.",
  },
  {
    icon: "03",
    title: "Core AI",
    desc: "Adaptive intelligence that evolves with your workflow. Predictive analytics built-in.",
  },
];

const terminalLines = [
  "$ initializing spider-net protocol...",
  "> scanning network topology... OK",
  "> 2,847 nodes connected",
  "> encryption layer: AES-256-GCM",
  "> status: OPERATIONAL",
  "$ _",
];

export default function Home() {
  const [currentLine, setCurrentLine] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentLine((prev) =>
        prev < terminalLines.length - 1 ? prev + 1 : prev,
      );
    }, 800);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative min-h-screen bg-background">
      <SpiderNet />

      {/* Scan line effect */}
      <div className="scan-line pointer-events-none fixed inset-0 z-50" />

      {/* Content */}
      <div className="relative z-10">
        {/* Nav */}
        <nav className="glass fixed top-0 left-0 right-0 z-40 border-b border-white/5 px-6 py-4">
          <div className="mx-auto flex max-w-6xl items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-neon-cyan shadow-[0_0_10px_#06b6d4]" />
              <span className="font-mono text-sm tracking-widest text-white/70 uppercase">
                SpiderNet
              </span>
            </div>
            <div className="hidden items-center gap-8 font-mono text-xs text-white/50 uppercase tracking-wider md:flex">
              <a
                href="#system"
                className="transition-colors hover:text-neon-cyan"
              >
                System
              </a>
              <a
                href="#nodes"
                className="transition-colors hover:text-neon-cyan"
              >
                Nodes
              </a>
              <a
                href="#terminal"
                className="transition-colors hover:text-neon-cyan"
              >
                Terminal
              </a>
            </div>
            <div className="flex items-center gap-3">
              <div className="h-2 w-2 animate-pulse rounded-full bg-green-400 shadow-[0_0_8px_#4ade80]" />
              <span className="font-mono text-xs text-green-400/80">
                ONLINE
              </span>
            </div>
          </div>
        </nav>

        {/* Hero */}
        <section className="flex min-h-screen flex-col items-center justify-center px-6 pt-20">
          <div className="animate-fade-in-up mb-8 flex items-center gap-2">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-neon-cyan" />
            <span className="font-mono text-xs tracking-[0.3em] text-neon-cyan/70 uppercase">
              System v4.2.1
            </span>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-neon-cyan" />
          </div>

          <h1
            className="animate-fade-in-up mb-6 text-center font-mono text-5xl font-bold tracking-tight text-white md:text-7xl lg:text-8xl"
            style={{ animationDelay: "0.2s" }}
          >
            <span className="neon-text animate-pulse-glow">SPIDER</span>
            <span className="text-white/20">_</span>
            <span className="gradient-text">NET</span>
          </h1>

          <p
            className="animate-fade-in-up mb-12 max-w-xl text-center font-mono text-sm leading-relaxed text-white/40 md:text-base"
            style={{ animationDelay: "0.4s" }}
          >
            Distributed neural mesh network. Self-evolving architecture.
            <br />
            <span className="text-neon-cyan/60">
              Zero downtime. Infinite scale.
            </span>
          </p>

          {/* Stats */}
          <div
            className="animate-fade-in-up mb-16 grid grid-cols-3 gap-6 md:gap-12"
            style={{ animationDelay: "0.6s" }}
          >
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div
                  className={`font-mono text-2xl font-bold md:text-3xl ${stat.color}`}
                >
                  {stat.value}
                </div>
                <div className="mt-1 font-mono text-[10px] tracking-wider text-white/30 uppercase md:text-xs">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          {/* Scroll indicator */}
          <div
            className="animate-fade-in-up flex flex-col items-center gap-2 text-white/20"
            style={{ animationDelay: "0.8s" }}
          >
            <span className="font-mono text-[10px] tracking-widest uppercase">
              Scroll
            </span>
            <div className="h-8 w-px animate-pulse bg-gradient-to-b from-neon-cyan/50 to-transparent" />
          </div>
        </section>

        {/* Features */}
        <section id="nodes" className="relative px-6 py-32">
          <div className="mx-auto max-w-6xl">
            <div className="mb-16 flex items-center gap-4">
              <div className="h-px flex-1 bg-gradient-to-r from-neon-cyan/20 to-transparent" />
              <span className="font-mono text-xs tracking-[0.3em] text-neon-cyan/50 uppercase">
                Core Modules
              </span>
              <div className="h-px flex-1 bg-gradient-to-l from-neon-cyan/20 to-transparent" />
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {features.map((feature, i) => (
                <div
                  key={feature.title}
                  className="card-hover glass neon-border group cursor-default rounded-lg p-8"
                  style={{ animationDelay: `${i * 0.15}s` }}
                >
                  <div className="mb-6 font-mono text-4xl font-bold text-neon-cyan/20 group-hover:text-neon-cyan/40 transition-colors">
                    {feature.icon}
                  </div>
                  <h3 className="mb-3 font-mono text-lg font-semibold text-white">
                    {feature.title}
                  </h3>
                  <p className="font-mono text-sm leading-relaxed text-white/40">
                    {feature.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Terminal */}
        <section id="terminal" className="px-6 py-32">
          <div className="mx-auto max-w-3xl">
            <div className="glass neon-border rounded-lg overflow-hidden">
              {/* Terminal header */}
              <div className="flex items-center gap-2 border-b border-white/5 px-4 py-3">
                <div className="h-3 w-3 rounded-full bg-red-500/80" />
                <div className="h-3 w-3 rounded-full bg-yellow-500/80" />
                <div className="h-3 w-3 rounded-full bg-green-500/80" />
                <span className="ml-4 font-mono text-xs text-white/30">
                  spider-net — bash
                </span>
              </div>
              {/* Terminal body */}
              <div className="p-6 font-mono text-sm leading-relaxed">
                {terminalLines.slice(0, currentLine + 1).map((line, i) => (
                  <div
                    key={line}
                    className={`${
                      i === currentLine ? "text-neon-cyan" : "text-white/50"
                    }`}
                  >
                    {line}
                    {i === currentLine && line.endsWith("_") && (
                      <span className="terminal-cursor" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-white/5 px-6 py-8">
          <div className="mx-auto flex max-w-6xl items-center justify-between font-mono text-xs text-white/20">
            <span>SpiderNet Protocol v4.2.1</span>
            <span className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-neon-cyan" />
              All systems operational
            </span>
          </div>
        </footer>
      </div>
    </div>
  );
}
