"use client";

import { useEffect, useRef, useState } from "react";
import { SpiderNet } from "@/components/SpiderNet";
import { CursorTrail } from "@/components/CursorTrail";

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

const bootLines = [
  "$ initializing spider-net protocol...",
  "> scanning network topology... OK",
  "> 2,847 nodes connected",
  "> encryption layer: AES-256-GCM",
  "> status: OPERATIONAL",
];

const responses: Record<string, string[]> = {
  help: [
    "Available commands:",
    "  help     — show this message",
    "  status   — show network status",
    "  scan     — scan for nodes",
    "  nodes    — list connected nodes",
    "  ping     — ping the mesh",
    "  clear    — clear terminal",
    "  whoami   — who are you?",
    "  date     — current timestamp",
    "  matrix   — enter the matrix",
  ],
  status: [
    "> Network: ONLINE",
    "> Uptime: 99.97%",
    "> Latency: 12ms",
    "> Throughput: 1.2 TB/s",
    "> Active connections: 2,847",
  ],
  scan: [
    "> initiating deep scan...",
    "> found 14 new nodes in sector 7G",
    "> found 3 relay nodes",
    "> scan complete — 17 new nodes added",
  ],
  nodes: [
    "> NODE_ID       STATUS    REGION",
    "> sn-00a1       ACTIVE    us-east-1",
    "> sn-00b2       ACTIVE    eu-west-2",
    "> sn-00c3       STANDBY   ap-south-1",
    "> sn-00d4       ACTIVE    us-west-2",
    "> total: 2,847 nodes online",
  ],
  ping: [
    "> PING spider-net mesh",
    "> 64 bytes from sn-00a1: time=8ms",
    "> 64 bytes from sn-00b2: time=12ms",
    "> 64 bytes from sn-00c3: time=15ms",
    "> avg latency: 11.6ms — all clear",
  ],
  whoami: [
    "> you are a operator of SpiderNet",
    "> access level: ADMIN",
    "> clearance: LEVEL 5",
  ],
  date: ["> 2026-07-07T00:00:00.000Z"],
  matrix: [
    "> Wake up, Neo...",
    "> The Matrix has you...",
    "> Follow the white rabbit.",
    "> Knock, knock.",
  ],
};

export default function Home() {
  const [booting, setBooting] = useState(true);
  const [bootLine, setBootLine] = useState(0);
  const [history, setHistory] = useState<string[]>([]);
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!booting) return;
    if (bootLine < bootLines.length) {
      const timer = setTimeout(() => setBootLine((p) => p + 1), 400);
      return () => clearTimeout(timer);
    }
    const timer = setTimeout(() => setBooting(false), 600);
    return () => clearTimeout(timer);
  }, [bootLine, booting]);

  useEffect(() => {
    if (!booting && inputRef.current) {
      inputRef.current.focus();
    }
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [booting]);

  const processCommand = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    const prompt = `$ ${cmd}`;

    if (trimmed === "clear") {
      setHistory([]);
      return;
    }

    const response = responses[trimmed];
    if (response) {
      setHistory((prev) => [
        ...prev,
        prompt,
        ...response,
      ]);
    } else if (trimmed === "") {
      setHistory((prev) => [...prev, prompt]);
    } else {
      setHistory((prev) => [
        ...prev,
        prompt,
        `> command not found: ${trimmed}`,
        '> type "help" for available commands',
      ]);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      processCommand(input);
      setInput("");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const promptLines = history
        .map((line) => line)
        .filter((line) => line.startsWith("$ "));
      if (promptLines.length > 0) {
        setInput(promptLines[promptLines.length - 1].slice(2));
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setInput("");
    }
  };

  return (
    <div className="relative min-h-screen bg-background">
      <CursorTrail />
      <SpiderNet />

      {/* Cyberpunk overlays */}
      <div className="vignette" />
      <div className="scan-line pointer-events-none fixed inset-0 z-50" />

      {/* Content */}
      <div className="relative z-[110]">
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
        <section className="grid-bg flex min-h-screen flex-col items-center justify-center px-6 pt-20">
          <div className="animate-fade-in-up mb-8 flex items-center gap-2">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-[#00ffff]" />
            <span className="font-mono text-xs tracking-[0.3em] text-[#00ffff]/70 uppercase">
              [ SYSTEM v4.2.1 ONLINE ]
            </span>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-[#00ffff]" />
          </div>

          <h1
            className="animate-fade-in-up mb-6 text-center font-mono text-6xl font-bold tracking-tight text-white md:text-8xl lg:text-9xl"
            style={{ animationDelay: "0.2s" }}
          >
            <span className="neon-text animate-pulse-glow">SPIDER</span>
            <span className="text-[#ff00ff]/40 mx-2">_</span>
            <span className="gradient-text">NET</span>
          </h1>

          <div
            className="animate-fade-in-up mb-4 font-mono text-xs tracking-[0.5em] text-[#ff0040]/60 uppercase"
            style={{ animationDelay: "0.3s" }}
          >
            // CLASSIFIED //
          </div>

          <p
            className="animate-fade-in-up mb-12 max-w-xl text-center font-mono text-sm leading-relaxed text-white/40 md:text-base"
            style={{ animationDelay: "0.4s" }}
          >
            Distributed neural mesh network. Self-evolving architecture.
            <br />
            <span className="neon-text-green">
              &gt; Zero downtime. Infinite scale. Total control.
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
            <span className="font-mono text-[10px] tracking-widest uppercase animate-flicker">
              [ SCROLL TO HACK ]
            </span>
            <div className="h-8 w-px animate-pulse bg-gradient-to-b from-[#00ffff]/50 to-transparent" />
          </div>
        </section>

        {/* Features */}
        <section id="nodes" className="relative px-6 py-32">
          <div className="mx-auto max-w-6xl">
            <div className="mb-16 flex items-center gap-4">
              <div className="h-px flex-1 bg-gradient-to-r from-[#ff00ff]/30 to-transparent" />
              <span className="font-mono text-xs tracking-[0.3em] text-[#ff00ff]/60 uppercase animate-flicker">
                {"< CORE MODULES />"}
              </span>
              <div className="h-px flex-1 bg-gradient-to-l from-[#ff00ff]/30 to-transparent" />
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {features.map((feature, i) => (
                <div
                  key={feature.title}
                  className="card-hover glass neon-border group cursor-default rounded-lg p-8"
                  style={{ animationDelay: `${i * 0.15}s` }}
                >
                  <div className="mb-6 font-mono text-4xl font-bold text-[#00ffff]/20 group-hover:text-[#00ffff]/40 transition-colors">
                    [{feature.icon}]
                  </div>
                  <h3 className="mb-3 font-mono text-lg font-semibold text-[#00ffff]">
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
              <div className="flex items-center gap-2 border-b border-[#00ffff]/20 px-4 py-3">
                <div className="h-3 w-3 rounded-full bg-[#ff0040] shadow-[0_0_8px_#ff0040]" />
                <div className="h-3 w-3 rounded-full bg-[#ff0040]/50 shadow-[0_0_8px_#ff0040]" />
                <div className="h-3 w-3 rounded-full bg-[#00ff41] shadow-[0_0_8px_#00ff41]" />
                <span className="ml-4 font-mono text-xs text-[#00ffff]/50">
                  root@spider-net:~#
                </span>
                <span className="ml-auto font-mono text-[10px] text-[#ff0040] animate-flicker">
                  REC ●
                </span>
              </div>
              {/* Terminal body */}
              <div
                ref={terminalRef}
                className="max-h-80 overflow-y-auto p-6 font-mono text-sm leading-relaxed"
                onClick={() => inputRef.current?.focus()}
              >
                {/* Boot sequence */}
                {bootLines.slice(0, bootLine).map((line) => (
                  <div key={line} className="text-white/50">
                    {line}
                  </div>
                ))}

                {!booting && (
                  <>
                    {/* Command history */}
                    {history.map((line, i) => (
                      <div
                        key={`${line}-${i}`}
                        className={
                          line.startsWith("$ ")
                            ? "text-neon-cyan"
                            : "text-white/50"
                        }
                      >
                        {line}
                      </div>
                    ))}

                    {/* Input line */}
                    <div className="flex items-center text-neon-cyan">
                      <span className="mr-2 select-none">$</span>
                      <input
                        ref={inputRef}
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        className="flex-1 bg-transparent text-white outline-none"
                        spellCheck={false}
                        autoComplete="off"
                      />
                      <span className="terminal-cursor" />
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-[#00ffff]/10 px-6 py-8">
          <div className="mx-auto flex max-w-6xl items-center justify-between font-mono text-xs text-[#00ffff]/30">
            <span className="animate-flicker">SPIDER_NET // PROTOCOL v4.2.1</span>
            <span className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#00ff41] shadow-[0_0_8px_#00ff41]" />
              <span className="neon-text-green">ALL SYSTEMS NOMINAL</span>
            </span>
          </div>
        </footer>
      </div>
    </div>
  );
}
