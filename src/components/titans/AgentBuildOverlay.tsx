import { useCallback, useEffect, useRef, useState } from "react";
import logoAsset from "@/assets/dpsbetitanslogo.png";
import nrlLogo from "@/assets/nrl-logo.png";
import { ArrowRight, Terminal, Cpu, Radio, Shield, Zap } from "lucide-react";
import { soundSystem } from "@/lib/sound-effects";
import { startSwarmRebuild, stopSwarmRebuild } from "@/lib/swarm";

interface AgentBuildOverlayProps {
  onComplete: () => void;
}

interface TerminalLine {
  text: string;
  tag?: string;
  tagColor?: string;
  textColor?: string;
  delayMs?: number;
}

const terminalLogs: TerminalLine[] = [
  {
    tag: "[BOOT]",
    tagColor: "text-amber-400 font-bold",
    text: "root@titans-174:~# /usr/bin/hyperdrive --boot-sequence --nrl-2026",
    textColor: "text-accent font-semibold",
    delayMs: 35,
  },
  {
    tag: "[INIT]",
    tagColor: "text-cyan-400",
    text: "Kernel v2.6.0-titan-arm64 loaded. Clock: 4.20 GHz. Memory: 16GB OK.",
    textColor: "text-muted-foreground",
    delayMs: 25,
  },
  {
    tag: "[HARDWARE]",
    tagColor: "text-emerald-400",
    text: "4WD All-Terrain Chassis Frame ................. [ 12.6V NOMINAL - READY ]",
    textColor: "text-emerald-400 font-medium",
    delayMs: 20,
  },
  {
    tag: "[DRIVETRAIN]",
    tagColor: "text-emerald-400",
    text: "Dual High-Torque DC Motor Bus ................. [ SYNCHRONIZED 100% ]",
    textColor: "text-emerald-400 font-medium",
    delayMs: 20,
  },
  {
    tag: "[MECHANICS]",
    tagColor: "text-cyan-400",
    text: "Active Acrylic Gripper Claw (Servo CH1) ....... [ ZEROED: 0° -> 110° ]",
    textColor: "text-cyan-300 font-medium",
    delayMs: 20,
  },
  {
    tag: "[LEAGUE]",
    tagColor: "text-pink-500 font-bold",
    text: "National Robotics League™ (Amazon × TIS) ...... [ GAME: HYPERDRIVE 2v2 ]",
    textColor: "text-pink-400 font-bold",
    delayMs: 20,
  },
  {
    tag: "[RADIO]",
    tagColor: "text-blue-400 font-bold",
    text: "NRL HEXA Controller ID #174 Pairing .......... [ 2.4GHz LOW-LATENCY LOCKED ]",
    textColor: "text-blue-300 font-medium",
    delayMs: 20,
  },
  {
    tag: "[CREW]",
    tagColor: "text-accent font-bold",
    text: "Authenticating 6-Member Titans Crew ........... [ 6/6 AUTH_OK ]",
    textColor: "text-foreground font-semibold",
    delayMs: 20,
  },
  {
    tag: "      ->",
    tagColor: "text-muted-foreground",
    text: "Ishaan (Capt/Strat) | Ridit (Driver) | Supratik (Human Player)",
    textColor: "text-accent/90 font-mono text-xs",
    delayMs: 15,
  },
  {
    tag: "      ->",
    tagColor: "text-muted-foreground",
    text: "Aariv (Mech) | Abhinav (Elec) | Swastik (Prog) | Mentor: Sitali Nema",
    textColor: "text-accent/90 font-mono text-xs",
    delayMs: 15,
  },
  {
    tag: "[ARENA]",
    tagColor: "text-amber-400 font-bold",
    text: "Target: NRL Bangalore East Regional Finals .... [ 20 - 21 NOV 2026 ]",
    textColor: "text-amber-300 font-bold",
    delayMs: 20,
  },
  {
    tag: "[SWARM]",
    tagColor: "text-emerald-400 font-bold",
    text: "Summoning 12 Autonomous Builder Agent Fleet ... [ ASSEMBLED ]",
    textColor: "text-emerald-300 font-bold",
    delayMs: 25,
  },
  {
    tag: ">>>",
    tagColor: "text-accent font-bold animate-pulse",
    text: "ALL SYSTEMS NOMINAL. INITIATING SWARM SITE REBUILD PROTOCOL...",
    textColor: "text-accent font-bold text-sm tracking-wider",
    delayMs: 30,
  },
];

const asciiBanner = `
 ████████╗██╗████████╗ █████╗ ███╗   ██╗███████╗    ██╗███████╗██╗  ██╗
 ╚══██╔══╝██║╚══██╔══╝██╔══██╗████╗  ██║██╔════╝   ███║╚════██║██║  ██║
    ██║   ██║   ██║   ███████║██╔██╗ ██║███████╗   ╚██║    ██╔╝███████║
    ██║   ██║   ██║   ██╔══██║██║╚██╗██║╚════██║    ██║   ██╔╝ ╚════██║
    ██║   ██║   ██║   ██║  ██║██║ ╚████║███████║    ██║   ██║       ██║
    ╚═╝   ╚═╝   ╚═╝   ╚═╝  ╚═╝╚═╝  ╚═══╝╚══════╝    ╚═╝   ╚═╝       ╚═╝`;

function IntroTerminal({ onComplete }: { onComplete: () => void }) {
  const [visibleCount, setVisibleCount] = useState(0);
  const [currentLinePartial, setCurrentLinePartial] = useState("");
  const [progressPercent, setProgressPercent] = useState(0);
  const [exiting, setExiting] = useState(false);
  const doneRef = useRef(false);
  const terminalBodyRef = useRef<HTMLDivElement>(null);

  const handleFinish = useCallback(() => {
    if (doneRef.current) return;
    doneRef.current = true;
    soundSystem.playElectricZap();
    setExiting(true);
    setTimeout(() => {
      onComplete();
    }, 350);
  }, [onComplete]);

  // Execute terminal typewriter log sequence
  useEffect(() => {
    let cancelled = false;
    const wait = (ms: number) => new Promise<void>((resolve) => window.setTimeout(resolve, ms));

    const runSequence = async () => {
      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reducedMotion) {
        setVisibleCount(terminalLogs.length);
        setProgressPercent(100);
        await wait(300);
        if (!cancelled) handleFinish();
        return;
      }

      await wait(150);

      for (let i = 0; i < terminalLogs.length; i++) {
        if (cancelled) return;
        const log = terminalLogs[i];

        // Type out log character by character
        const fullText = log.text;
        const step = fullText.length > 40 ? 3 : 2;

        for (let charIdx = step; charIdx <= fullText.length; charIdx += step) {
          if (cancelled) return;
          setCurrentLinePartial(fullText.slice(0, charIdx));
          if (charIdx % 6 === 0) {
            soundSystem.playKeyChirp();
          }
          await wait(log.delayMs || 15);
        }

        setCurrentLinePartial("");
        setVisibleCount((prev) => prev + 1);
        setProgressPercent(Math.round(((i + 1) / terminalLogs.length) * 100));

        // Auto-scroll terminal body
        if (terminalBodyRef.current) {
          terminalBodyRef.current.scrollTop = terminalBodyRef.current.scrollHeight;
        }

        await wait(40);
      }

      soundSystem.playMechanicalClick();
      await wait(250);
      if (!cancelled) handleFinish();
    };

    void runSequence();
    return () => {
      cancelled = true;
    };
  }, [handleFinish]);

  // Allow immediate skip via Escape, Enter, or Space
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        handleFinish();
      }
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKey);
    };
  }, [handleFinish]);

  return (
    <div
      onClick={handleFinish}
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-3 sm:p-6 backdrop-blur-2xl cursor-pointer ${
        exiting
          ? "opacity-0 scale-98 transition-all duration-300"
          : "animate-in fade-in duration-200"
      }`}
      role="dialog"
      aria-modal="true"
      aria-label="DPSBE Titans pure terminal boot sequence"
    >
      {/* Scanline CRT overlay */}
      <div
        className="pointer-events-none absolute inset-0 z-10 opacity-20 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.85)_100%)]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0 z-10 opacity-15 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(255,255,255,0.06)_3px,transparent_4px)]"
        aria-hidden="true"
      />

      {/* Cyber Terminal Window Container */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative z-20 flex flex-col w-full max-w-5xl h-[88vh] max-h-[820px] rounded-xl border border-white/20 bg-black/90 shadow-[0_0_50px_rgba(229,169,60,0.15)] overflow-hidden font-mono text-left"
      >
        {/* Terminal Window Header Bar */}
        <div className="flex items-center justify-between border-b border-white/10 bg-white/[0.04] px-4 py-2.5 sm:px-5">
          {/* Traffic light window controls */}
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-[#ff5f56] shadow-[0_0_6px_#ff5f56]" />
            <span className="h-3 w-3 rounded-full bg-[#ffbd2e] shadow-[0_0_6px_#ffbd2e]" />
            <span className="h-3 w-3 rounded-full bg-[#27c93f] shadow-[0_0_6px_#27c93f]" />
            <span className="ml-3 hidden sm:inline text-xs font-semibold text-white/50">
              titans-kronos-os v2.6.0 (ARM64)
            </span>
          </div>

          {/* Central Title */}
          <div className="flex items-center gap-2 text-xs font-semibold text-accent">
            <Terminal className="h-3.5 w-3.5 text-accent" />
            <span className="truncate">root@titans-174:~# /usr/bin/hyperdrive</span>
          </div>

          {/* Live Status Telemetry */}
          <div className="flex items-center gap-3 text-[10px] text-muted-foreground">
            <span className="hidden md:flex items-center gap-1 text-emerald-400">
              <Cpu className="h-3 w-3" />
              CPU 99%
            </span>
            <span className="hidden sm:flex items-center gap-1 text-cyan-400">
              <Radio className="h-3 w-3" />
              HEXA 2.4G
            </span>
            <span className="flex items-center gap-1 text-accent">
              <Shield className="h-3 w-3" />
              NRL #174
            </span>
          </div>
        </div>

        {/* Terminal Body */}
        <div
          ref={terminalBodyRef}
          className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-1.5 text-xs sm:text-[13px] leading-relaxed scrollbar-thin scrollbar-thumb-white/20"
        >
          {/* Top ASCII Banner and Emblem */}
          <div className="flex flex-col sm:flex-row items-center gap-4 border-b border-white/10 pb-4 mb-4">
            <img
              src={logoAsset}
              alt="DPSBE Titans Logo"
              className="h-16 w-16 sm:h-20 sm:w-20 object-contain drop-shadow-[0_0_15px_rgba(229,169,60,0.4)]"
            />
            <div className="min-w-0 flex-1">
              <pre className="hidden md:block font-mono text-[9px] leading-[10px] text-accent/80 select-none overflow-x-auto">
                {asciiBanner}
              </pre>
              <div className="flex flex-wrap items-center gap-2 mt-1 font-mono text-[11px] text-white/70">
                <span className="text-accent font-bold">DPSBE TITANS #174</span>
                <span>•</span>
                <span>DELHI PUBLIC SCHOOL BANGALORE EAST</span>
                <span>•</span>
                <span className="text-pink-400 font-semibold">NRL 2026 HYPERDRIVE</span>
              </div>
            </div>
          </div>

          {/* Rendered Log Lines */}
          {terminalLogs.slice(0, visibleCount).map((log, idx) => (
            <div key={idx} className="flex flex-wrap items-baseline gap-2">
              {log.tag && (
                <span className={`shrink-0 font-bold ${log.tagColor || "text-accent"}`}>
                  {log.tag}
                </span>
              )}
              <span className={log.textColor || "text-foreground"}>{log.text}</span>
            </div>
          ))}

          {/* Currently typing line */}
          {visibleCount < terminalLogs.length && (
            <div className="flex flex-wrap items-baseline gap-2">
              {terminalLogs[visibleCount].tag && (
                <span
                  className={`shrink-0 font-bold ${
                    terminalLogs[visibleCount].tagColor || "text-accent"
                  }`}
                >
                  {terminalLogs[visibleCount].tag}
                </span>
              )}
              <span className={terminalLogs[visibleCount].textColor || "text-foreground"}>
                {currentLinePartial}
                <span className="inline-block h-3.5 w-2 bg-accent ml-1 animate-pulse align-middle" />
              </span>
            </div>
          )}

          {/* Completion blinking cursor */}
          {visibleCount >= terminalLogs.length && (
            <div className="flex items-center gap-2 pt-2 text-accent">
              <span className="font-bold">&gt;&gt;&gt;</span>
              <span className="text-white/80">EXECUTION THREAD HANDOFF TO AUTONOMOUS SWARM</span>
              <span className="inline-block h-4 w-2 bg-accent animate-ping" />
            </div>
          )}
        </div>

        {/* Terminal Bottom HUD / Progress Footer */}
        <div className="border-t border-white/10 bg-black/80 px-4 py-3 sm:px-6 flex flex-wrap items-center justify-between gap-3 text-xs">
          {/* Progress Indicator */}
          <div className="flex items-center gap-3">
            <span className="font-mono text-[11px] text-muted-foreground uppercase">
              BOOT SEQUENCE:
            </span>
            <div className="h-2 w-36 sm:w-56 rounded-full bg-white/10 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-accent via-electric to-emerald-400 transition-all duration-100 ease-out"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <span className="font-mono text-xs font-bold text-accent">{progressPercent}%</span>
          </div>

          {/* Skip Shortcut Prompt */}
          <button
            type="button"
            onClick={handleFinish}
            className="group flex items-center gap-2 rounded-md border border-accent/40 bg-accent/10 px-3.5 py-1.5 font-mono text-xs font-semibold text-accent hover:bg-accent/20 transition-all"
          >
            <span>SKIP BOOT</span>
            <span className="rounded bg-black/60 px-1.5 py-0.5 text-[10px] text-white/70 border border-white/10">
              ESC
            </span>
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
          </button>
        </div>
      </div>
    </div>
  );
}

export function AgentBuildOverlay({ onComplete }: AgentBuildOverlayProps) {
  // Phase 1: "terminal" (High-intensity pure cyber terminal boot sequence)
  // Phase 2: "swarm" (Multi-agent swarm builds the live website)
  const [phase, setPhase] = useState<"terminal" | "swarm">("terminal");
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  const handleTerminalDone = useCallback(() => {
    try {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    } catch {
      // Ignore
    }
    setPhase("swarm");
  }, []);

  useEffect(() => {
    if (phase !== "swarm") return;

    // Launch swarm rebuild engine on live DOM
    startSwarmRebuild({
      onComplete: () => {
        onCompleteRef.current();
      },
    });

    return () => {
      stopSwarmRebuild(false);
    };
  }, [phase]);

  if (phase === "terminal") {
    return <IntroTerminal onComplete={handleTerminalDone} />;
  }

  // During phase === "swarm", swarm rebuild engine renders directly into its own shadow root overlay
  return null;
}
