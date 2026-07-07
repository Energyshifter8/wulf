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

function useIsTouch() {
  const [isTouch, setIsTouch] = useState(false);
  useEffect(() => {
    setIsTouch(
      "ontouchstart" in window ||
        navigator.maxTouchPoints > 0,
    );
  }, []);
  return isTouch;
}

export default function Home() {
  const [booting, setBooting] = useState(true);
  const [bootLine, setBootLine] = useState(0);
  const [history, setHistory] = useState<string[]>([]);
  const [input, setInput] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);
  const isTouch = useIsTouch();

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
      setHistory((prev) => [...prev, prompt, ...response]);
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
      const promptLines = history.filter((line) => line.startsWith("$ "));
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
      {!isTouch && <CursorTrail />}
      <SpiderNet />

      <div className="vignette" />
      <div className="scan-line pointer-events-none fixed inset-0 z-50" />

      <div className="relative z-[110]">
        {/* Nav */}
        <nav className="glass fixed top-0 left-0 right-0 z-40 border-b border-white/5 px-4 sm:px-6 py-3 sm:py-4">
          <div className="mx-auto flex max-w-6xl items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-[#00ffff] shadow-[0_0_10px_#00ffff]" />
              <span className="font-mono text-xs sm:text-sm tracking-widest text-white/70 uppercase">
                SpiderNet
              </span>
            </div>

            {/* Desktop nav */}
            <div className="hidden items-center gap-6 lg:gap-8 font-mono text-xs text-white/50 uppercase tracking-wider md:flex">
              <a href="#system" className="transition-colors hover:text-[#00ffff]">
                System
              </a>
              <a href="#nodes" className="transition-colors hover:text-[#00ffff]">
                Nodes
              </a>
              <a href="#terminal" className="transition-colors hover:text-[#00ffff]">
                Terminal
              </a>
            </div>

            {/* Mobile hamburger */}
            <button
              className="flex flex-col gap-1 md:hidden p-2"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              <span className={`block w-5 h-0.5 bg-[#00ffff] transition-all duration-300 ${menuOpen ? "translate-y-1.5 rotate-45" : ""}`} />
              <span className={`block w-5 h-0.5 bg-[#00ffff] transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
              <span className={`block w-5 h-0.5 bg-[#00ffff] transition-all duration-300 ${menuOpen ? "-translate-y-1.5 -rotate-45" : ""}`} />
            </button>

            <div className="flex items-center gap-2 sm:gap-3">
              <div className="h-2 w-2 animate-pulse rounded-full bg-[#00ff41] shadow-[0_0_8px_#00ff41]" />
              <span className="font-mono text-[10px] sm:text-xs text-[#00ff41]/80">
                ONLINE
              </span>
            </div>
          </div>

          {/* Mobile menu */}
          {menuOpen && (
            <div className="md:hidden mt-3 pb-3 border-t border-[#00ffff]/10 pt-3 flex flex-col gap-3 font-mono text-xs text-white/50 uppercase tracking-wider">
              <a href="#system" onClick={() => setMenuOpen(false)} className="transition-colors hover:text-[#00ffff]">
                System
              </a>
              <a href="#nodes" onClick={() => setMenuOpen(false)} className="transition-colors hover:text-[#00ffff]">
                Nodes
              </a>
              <a href="#terminal" onClick={() => setMenuOpen(false)} className="transition-colors hover:text-[#00ffff]">
                Terminal
              </a>
            </div>
          )}
        </nav>

        {/* Hero */}
        <section className="grid-bg flex min-h-screen flex-col items-center justify-center px-4 sm:px-6 pt-20">
          <div className="animate-fade-in-up mb-6 sm:mb-8 flex items-center gap-2">
            <div className="h-px w-6 sm:w-12 bg-gradient-to-r from-transparent to-[#00ffff]" />
            <span className="font-mono text-[10px] sm:text-xs tracking-[0.2em] sm:tracking-[0.3em] text-[#00ffff]/70 uppercase">
              [ SYSTEM v4.2.1 ]
            </span>
            <div className="h-px w-6 sm:w-12 bg-gradient-to-l from-transparent to-[#00ffff]" />
          </div>

          <h1 className="animate-fade-in-up mb-4 sm:mb-6 text-center font-mono font-bold tracking-tight text-white" style={{ animationDelay: "0.2s" }}>
            <span className="neon-text animate-pulse-glow text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl">
              SPIDER
            </span>
            <span className="text-[#ff00ff]/40 mx-1 sm:mx-2 text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl">
              _
            </span>
            <span className="gradient-text text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl">
              NET
            </span>
          </h1>

          <div
            className="animate-fade-in-up mb-3 sm:mb-4 font-mono text-[10px] sm:text-xs tracking-[0.3em] sm:tracking-[0.5em] text-[#ff0040]/60 uppercase"
            style={{ animationDelay: "0.3s" }}
          >
            // CLASSIFIED //
          </div>

          <p
            className="animate-fade-in-up mb-8 sm:mb-12 max-w-md sm:max-w-xl text-center font-mono text-xs sm:text-sm leading-relaxed text-white/40"
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
            className="animate-fade-in-up mb-12 sm:mb-16 grid grid-cols-3 gap-3 sm:gap-6 md:gap-12 w-full max-w-lg"
            style={{ animationDelay: "0.6s" }}
          >
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className={`font-mono text-lg sm:text-2xl md:text-3xl font-bold ${stat.color}`}>
                  {stat.value}
                </div>
                <div className="mt-1 font-mono text-[8px] sm:text-[10px] md:text-xs tracking-wider text-white/30 uppercase">
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
            <span className="font-mono text-[9px] sm:text-[10px] tracking-widest uppercase animate-flicker">
              [ SCROLL TO HACK ]
            </span>
            <div className="h-6 sm:h-8 w-px animate-pulse bg-gradient-to-b from-[#00ffff]/50 to-transparent" />
          </div>
        </section>

        {/* Features */}
        <section id="nodes" className="relative px-4 sm:px-6 py-20 sm:py-32">
          <div className="mx-auto max-w-6xl">
            <div className="mb-10 sm:mb-16 flex items-center gap-3 sm:gap-4">
              <div className="h-px flex-1 bg-gradient-to-r from-[#ff00ff]/30 to-transparent" />
              <span className="font-mono text-[10px] sm:text-xs tracking-[0.2em] sm:tracking-[0.3em] text-[#ff00ff]/60 uppercase animate-flicker">
                {"< CORE MODULES />"}
              </span>
              <div className="h-px flex-1 bg-gradient-to-l from-[#ff00ff]/30 to-transparent" />
            </div>

            <div className="grid gap-4 sm:gap-6 md:grid-cols-3">
              {features.map((feature, i) => (
                <div
                  key={feature.title}
                  className="card-hover glass neon-border group cursor-default rounded-lg p-5 sm:p-8"
                  style={{ animationDelay: `${i * 0.15}s` }}
                >
                  <div className="mb-4 sm:mb-6 font-mono text-3xl sm:text-4xl font-bold text-[#00ffff]/20 group-hover:text-[#00ffff]/40 transition-colors">
                    [{feature.icon}]
                  </div>
                  <h3 className="mb-2 sm:mb-3 font-mono text-base sm:text-lg font-semibold text-[#00ffff]">
                    {feature.title}
                  </h3>
                  <p className="font-mono text-xs sm:text-sm leading-relaxed text-white/40">
                    {feature.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Terminal */}
        <section id="terminal" className="px-4 sm:px-6 py-20 sm:py-32">
          <div className="mx-auto max-w-3xl">
            <div className="glass neon-border rounded-lg overflow-hidden">
              {/* Terminal header */}
              <div className="flex items-center gap-2 border-b border-[#00ffff]/20 px-3 sm:px-4 py-2.5 sm:py-3">
                <div className="h-2.5 sm:h-3 w-2.5 sm:w-3 rounded-full bg-[#ff0040] shadow-[0_0_8px_#ff0040]" />
                <div className="h-2.5 sm:h-3 w-2.5 sm:w-3 rounded-full bg-[#ff0040]/50 shadow-[0_0_8px_#ff0040]" />
                <div className="h-2.5 sm:h-3 w-2.5 sm:w-3 rounded-full bg-[#00ff41] shadow-[0_0_8px_#00ff41]" />
                <span className="ml-3 sm:ml-4 font-mono text-[10px] sm:text-xs text-[#00ffff]/50 truncate">
                  root@spider-net:~#
                </span>
                <span className="ml-auto font-mono text-[9px] sm:text-[10px] text-[#ff0040] animate-flicker shrink-0">
                  REC ●
                </span>
              </div>
              {/* Terminal body */}
              <div
                ref={terminalRef}
                className="max-h-60 sm:max-h-80 overflow-y-auto p-3 sm:p-6 font-mono text-xs sm:text-sm leading-relaxed"
                onClick={() => inputRef.current?.focus()}
              >
                {bootLines.slice(0, bootLine).map((line) => (
                  <div key={line} className="text-white/50">
                    {line}
                  </div>
                ))}

                {!booting && (
                  <>
                    {history.map((line, i) => (
                      <div
                        key={`${line}-${i}`}
                        className={
                          line.startsWith("$ ")
                            ? "text-[#00ffff]"
                            : "text-white/50"
                        }
                      >
                        {line}
                      </div>
                    ))}

                    <div className="flex items-center text-[#00ffff]">
                      <span className="mr-1.5 sm:mr-2 select-none">$</span>
                      <input
                        ref={inputRef}
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        className="flex-1 min-w-0 bg-transparent text-white outline-none"
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
        <footer className="border-t border-[#00ffff]/10 px-4 sm:px-6 py-6 sm:py-8">
          <div className="mx-auto max-w-6xl flex flex-col sm:flex-row items-center justify-between gap-3 font-mono text-[10px] sm:text-xs text-[#00ffff]/30">
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
