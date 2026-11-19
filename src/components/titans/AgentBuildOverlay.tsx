import { useCallback, useEffect, useRef, useState } from "react";
import logoAsset from "@/assets/dpsbetitanslogo.png";
import nrlLogo from "@/assets/nrl-logo.png";
import { ArrowRight, Terminal, Cpu, Radio, Shield, Zap, Sparkles } from "lucide-react";
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

function IntroTerminal({
  onProceedToSwarm,
  onSkipToClimax,
}: {
  onProceedToSwarm: () => void;
  onSkipToClimax: () => void;
}) {
  const [visibleCount, setVisibleCount] = useState(0);
  const [currentLinePartial, setCurrentLinePartial] = useState("");
  const [progressPercent, setProgressPercent] = useState(0);
  const [exiting, setExiting] = useState(false);
  const doneRef = useRef(false);
  const terminalBodyRef = useRef<HTMLDivElement>(null);

  const handleFinish = useCallback(
    (skipToClimax = false) => {
      if (doneRef.current) return;
      doneRef.current = true;
      soundSystem.playElectricZap();
      setExiting(true);
      setTimeout(() => {
        if (skipToClimax) {
          onSkipToClimax();
        } else {
          onProceedToSwarm();
        }
      }, 350);
    },
    [onProceedToSwarm, onSkipToClimax],
  );

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
        if (!cancelled) handleFinish(false);
        return;
      }

      await wait(150);

      for (let i = 0; i < terminalLogs.length; i++) {
        if (cancelled) return;
        const log = terminalLogs[i];

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

        if (terminalBodyRef.current) {
          terminalBodyRef.current.scrollTop = terminalBodyRef.current.scrollHeight;
        }

        await wait(40);
      }

      soundSystem.playMechanicalClick();
      await wait(250);
      if (!cancelled) handleFinish(false);
    };

    void runSequence();
    return () => {
      cancelled = true;
    };
  }, [handleFinish]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        handleFinish(true);
      } else if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        handleFinish(false);
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
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-3 sm:p-6 backdrop-blur-2xl ${
        exiting
          ? "opacity-0 scale-98 transition-all duration-300"
          : "animate-in fade-in duration-200"
      }`}
      role="dialog"
      aria-modal="true"
      aria-label="DPSBE Titans pure terminal boot sequence"
    >
      <div
        className="pointer-events-none absolute inset-0 z-10 opacity-20 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.85)_100%)]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0 z-10 opacity-15 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(255,255,255,0.06)_3px,transparent_4px)]"
        aria-hidden="true"
      />

      <div className="relative z-20 flex flex-col w-full max-w-5xl h-[88vh] max-h-[820px] rounded-xl border border-white/20 bg-black/90 shadow-[0_0_50px_rgba(229,169,60,0.15)] overflow-hidden font-mono text-left">
        <div className="flex items-center justify-between border-b border-white/10 bg-white/[0.04] px-4 py-2.5 sm:px-5">
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-[#ff5f56] shadow-[0_0_6px_#ff5f56]" />
            <span className="h-3 w-3 rounded-full bg-[#ffbd2e] shadow-[0_0_6px_#ffbd2e]" />
            <span className="h-3 w-3 rounded-full bg-[#27c93f] shadow-[0_0_6px_#27c93f]" />
            <span className="ml-3 hidden sm:inline text-xs font-semibold text-white/50">
              titans-kronos-os v2.6.0 (ARM64)
            </span>
          </div>

          <div className="flex items-center gap-2 text-xs font-semibold text-accent">
            <Terminal className="h-3.5 w-3.5 text-accent" />
            <span className="truncate">root@titans-174:~# /usr/bin/hyperdrive</span>
          </div>

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

        <div
          ref={terminalBodyRef}
          className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-1.5 text-xs sm:text-[13px] leading-relaxed scrollbar-thin scrollbar-thumb-white/20"
        >
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

          {visibleCount >= terminalLogs.length && (
            <div className="flex items-center gap-2 pt-2 text-accent">
              <span className="font-bold">&gt;&gt;&gt;</span>
              <span className="text-white/80">EXECUTION THREAD HANDOFF TO AUTONOMOUS SWARM</span>
              <span className="inline-block h-4 w-2 bg-accent animate-ping" />
            </div>
          )}
        </div>

        <div className="border-t border-white/10 bg-black/80 px-4 py-3 sm:px-6 flex flex-wrap items-center justify-between gap-3 text-xs">
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

          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={() => handleFinish(true)}
              className="group flex items-center gap-2 rounded-md border border-white/20 bg-white/5 px-3 py-1.5 font-mono text-xs font-semibold text-muted-foreground hover:bg-white/10 hover:text-white transition-all"
            >
              <span>SKIP TO THUNDER</span>
              <span className="rounded bg-black/60 px-1 py-0.5 text-[9px] text-white/50 border border-white/10">
                ESC
              </span>
            </button>
            <button
              type="button"
              onClick={() => handleFinish(false)}
              className="group flex items-center gap-2 rounded-md border border-accent/40 bg-accent/15 px-3.5 py-1.5 font-mono text-xs font-semibold text-accent hover:bg-accent/30 transition-all"
            >
              <span>ENTER SWARM</span>
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// =========================================================================
// PART 3: THE THUNDERBOLT & LOGO FORGE -> THUNDER BOOM CLIMAX
// Inspired by Apexion forge with particle physics, electric arc welds,
// concentric insignia assembly, and the final massive screen-shaking thunder
// =========================================================================

interface SparkParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  color: string;
  size: number;
}

interface EmberParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  phase: number;
}

export function ThunderLogoClimax({ onComplete }: { onComplete: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [stage, setStage] = useState<"bolt" | "corona" | "rays" | "hexagon" | "boom">("bolt");
  const [flashOpacity, setFlashOpacity] = useState(0);
  const [shakeIntensity, setShakeIntensity] = useState(0);
  const [discharging, setDischarging] = useState(false);
  const finishedRef = useRef(false);

  const triggerFinish = useCallback(() => {
    if (finishedRef.current) return;
    finishedRef.current = true;
    soundSystem.playThunderBoom();
    setFlashOpacity(1);
    setShakeIntensity(1.5);
    setDischarging(true);

    setTimeout(() => {
      setFlashOpacity(0);
    }, 280);

    setTimeout(() => {
      onComplete();
    }, 700);
  }, [onComplete]);

  // Particle System (Embers and Electric Spark Bursts)
  useEffect(() => {
    // Silently reset window scroll to top while hidden under solid black forge overlay
    try {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    } catch {}

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    const embers: EmberParticle[] = Array.from({ length: 70 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: -(0.5 + Math.random() * 0.9),
      size: 1 + Math.random() * 2.2,
      alpha: 0.2 + Math.random() * 0.6,
      phase: Math.random() * Math.PI * 2,
    }));

    const sparks: SparkParticle[] = [];

    const burstSparks = (px: number, py: number, count: number, speedMultiplier = 1.0) => {
      const colors = ["#FFFFFF", "#FFE066", "#E5A93C", "#FF8A00"];
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const spd = (180 + Math.random() * 520) * speedMultiplier;
        sparks.push({
          x: px,
          y: py,
          vx: Math.cos(angle) * spd,
          vy: Math.sin(angle) * spd,
          life: 1.0,
          maxLife: 0.4 + Math.random() * 0.5,
          size: 1.2 + Math.random() * 2,
          color: colors[Math.floor(Math.random() * colors.length)],
        });
      }
    };

    // Store burst function for timeline triggers
    (canvas as unknown as { burst?: typeof burstSparks }).burst = burstSparks;

    let lastTime = performance.now();

    const loop = (time: number) => {
      animId = requestAnimationFrame(loop);
      const dt = Math.min(0.05, (time - lastTime) / 1000);
      lastTime = time;

      ctx.clearRect(0, 0, width, height);

      // 1. Draw drifting golden embers
      for (const e of embers) {
        e.y += e.vy;
        e.x += e.vx + Math.sin(time * 0.002 + e.phase) * 0.4;
        if (e.y < -10) {
          e.y = height + 10;
          e.x = Math.random() * width;
        }

        ctx.fillStyle = `rgba(229, 169, 60, ${e.alpha})`;
        ctx.beginPath();
        ctx.arc(e.x, e.y, e.size, 0, Math.PI * 2);
        ctx.fill();
      }

      // 2. Draw flying electrical sparks with physics
      for (let i = sparks.length - 1; i >= 0; i--) {
        const s = sparks[i];
        s.life -= dt / s.maxLife;
        s.vy += 850 * dt; // gravity
        s.vx *= 0.985; // drag
        s.x += s.vx * dt;
        s.y += s.vy * dt;

        if (s.life <= 0 || s.y > height + 20) {
          sparks.splice(i, 1);
          continue;
        }

        ctx.strokeStyle = s.color;
        ctx.lineWidth = s.size;
        ctx.globalAlpha = Math.max(0, s.life);
        ctx.beginPath();
        ctx.moveTo(s.x, s.y);
        ctx.lineTo(s.x - s.vx * 0.02, s.y - s.vy * 0.02);
        ctx.stroke();
        ctx.globalAlpha = 1.0;
      }
    };

    animId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Choreographed Forge Timeline
  useEffect(() => {
    let cancelled = false;
    const canvas = canvasRef.current as unknown as {
      burst?: (x: number, y: number, count: number, speed?: number) => void;
    } | null;

    const wait = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));

    const runForge = async () => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;

      // 0.0s: Start welding the Central Thunderbolt (where cursors met)
      soundSystem.playElectricZap();
      canvas?.burst?.(cx + 8, cy - 25, 28, 0.9);

      await wait(450);
      if (cancelled) return;
      canvas?.burst?.(cx - 15, cy + 5, 36, 1.1);
      soundSystem.playElectricZap();

      await wait(450);
      if (cancelled) return;
      // Thunderbolt is fully formed
      canvas?.burst?.(cx + 12, cy - 5, 48, 1.2);
      soundSystem.playMechanicalClick(1.2);
      setShakeIntensity(0.4);
      setTimeout(() => setShakeIntensity(0), 150);

      // 1.4s: Strike 1 - Golden Corona Circle forms around the thunderbolt
      await wait(200);
      if (cancelled) return;
      setStage("corona");
      soundSystem.playMechanicalClick(1.5);
      canvas?.burst?.(cx, cy, 60, 1.1);

      // 1.9s: Strike 2 - Six Inward Vector Rays shoot in from all corners
      await wait(450);
      if (cancelled) return;
      setStage("rays");
      soundSystem.playElectricZap();
      canvas?.burst?.(cx, cy, 75, 1.2);
      setShakeIntensity(0.5);
      setTimeout(() => setShakeIntensity(0), 160);

      // 2.3s: Strike 3 - 60° Regular Hexagon perimeter slams together
      await wait(450);
      if (cancelled) return;
      setStage("hexagon");
      soundSystem.playMechanicalClick(0.9);
      canvas?.burst?.(cx, cy, 90, 1.4);
      setShakeIntensity(0.7);
      setTimeout(() => setShakeIntensity(0), 200);

      // 2.9s: THE THUNDER BOOM! Complete explosive release into website!
      await wait(600);
      if (cancelled) return;
      setStage("boom");
      triggerFinish();
    };

    void runForge();

    return () => {
      cancelled = true;
    };
  }, [triggerFinish]);

  // Key controls (Esc / Enter / Space immediately skips with thunder boom)
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        triggerFinish();
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [triggerFinish]);

  return (
    <div
      ref={containerRef}
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black overflow-hidden select-none transition-opacity duration-700 ease-out ${
        discharging ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
      style={{
        transform:
          shakeIntensity > 0
            ? `translate3d(${(Math.random() - 0.5) * shakeIntensity * 14}px, ${
                (Math.random() - 0.5) * shakeIntensity * 14
              }px, 0)`
            : "none",
        transition: "transform 0.05s ease-out",
      }}
      role="dialog"
      aria-modal="true"
      aria-label="DPSBE Titans Thunderbolt and Emblem Forge Sequence"
    >
      {/* Background Particle Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 z-10 pointer-events-none" />

      {/* Cyber Grid & CRT Overlay */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_center,rgba(229,169,60,0.12)_0%,rgba(0,0,0,0.95)_75%)] pointer-events-none" />
      <div className="absolute inset-0 z-0 opacity-15 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(255,255,255,0.04)_3px,transparent_4px)] pointer-events-none" />

      {/* Fullscreen White/Gold Lightning Flash */}
      <div
        className="absolute inset-0 z-40 bg-gradient-to-b from-white via-amber-200 to-accent pointer-events-none transition-opacity duration-300"
        style={{ opacity: flashOpacity }}
      />

      {/* Radial Shockwaves on Boom */}
      {discharging && (
        <div className="absolute inset-0 z-30 flex items-center justify-center pointer-events-none">
          <div className="h-72 w-72 rounded-full border-4 border-white animate-ping opacity-75" />
          <div className="h-96 w-96 rounded-full border-2 border-accent animate-ping opacity-60 delay-100" />
          <div className="h-[600px] w-[600px] rounded-full border border-yellow-300 animate-ping opacity-40 delay-150" />
        </div>
      )}

      {/* Center Stage: The Thunderbolt & Insignia Assembly */}
      <div
        className={`relative z-20 flex flex-col items-center justify-center transition-all duration-700 ${
          discharging ? "scale-[3.2] opacity-0 blur-lg" : "scale-100 opacity-100"
        }`}
      >
        <div className="relative w-72 h-72 sm:w-96 sm:h-96 flex items-center justify-center">
          {/* Central Plasma Fire Glow */}
          <div
            className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none transition-all duration-500 ${
              stage === "boom"
                ? "w-80 h-80 bg-white blur-3xl opacity-100 scale-150"
                : stage === "hexagon"
                  ? "w-56 h-56 bg-accent/60 blur-2xl opacity-90 scale-110"
                  : "w-40 h-40 bg-amber-400/40 blur-xl opacity-75"
            }`}
          />

          {/* Procedural High-Precision SVG Emblem Forge */}
          <svg
            viewBox="0 0 500 500"
            className="w-full h-full relative z-10 drop-shadow-[0_0_35px_rgba(229,169,60,0.6)]"
          >
            <defs>
              <linearGradient id="boltGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="35%" stopColor="#FFE066" />
                <stop offset="100%" stopColor="#E5A93C" />
              </linearGradient>

              <radialGradient id="discGrad" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#FF9933" />
                <stop offset="65%" stopColor="#E5A93C" />
                <stop offset="100%" stopColor="#D48B28" />
              </radialGradient>

              <radialGradient id="ringGlow" cx="50%" cy="50%" r="50%">
                <stop offset="70%" stopColor="#E5A93C" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#FFE066" stopOpacity="1" />
              </radialGradient>

              <linearGradient id="rayGrad" x1="50%" y1="0%" x2="50%" y2="100%">
                <stop offset="0%" stopColor="#FFE066" />
                <stop offset="100%" stopColor="#E5A93C" />
              </linearGradient>
            </defs>

            {/* Central Core Disc */}
            {(stage === "corona" || stage === "rays" || stage === "hexagon" || stage === "boom") && (
              <circle
                cx="250"
                cy="250"
                r="50"
                fill="url(#discGrad)"
                stroke="#FFE066"
                strokeWidth="1.5"
                className="animate-in fade-in zoom-in-75 duration-300"
              />
            )}

            {/* LAYER 1: The Central Thunderbolt (Exact DPSBE Titans Geometry) */}
            <path
              d="M 265 202 L 216 256 L 242 257 L 234 297 L 283 241 L 255 240 Z"
              fill={stage === "bolt" ? "url(#boltGrad)" : "#FFFFFF"}
              stroke="#FFFFFF"
              strokeWidth="2.5"
              strokeLinejoin="miter"
              className="drop-shadow-[0_0_20px_#FFE066] animate-pulse"
              style={{
                strokeDasharray: "400",
                strokeDashoffset: stage === "bolt" ? "0" : "0",
                animation: "dash 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) forwards",
              }}
            />

            {/* LAYER 2: The Concentric Corona Ring (Forms around the core disc) */}
            {(stage === "corona" || stage === "rays" || stage === "hexagon" || stage === "boom") && (
              <circle
                cx="250"
                cy="250"
                r="74"
                fill="none"
                stroke="url(#ringGlow)"
                strokeWidth="8"
                className="animate-in fade-in zoom-in-75 duration-300"
              />
            )}

            {/* LAYER 3: Six Triangular Vector Rays (Beaming outward from ring to the 6 corners) */}
            {(stage === "rays" || stage === "hexagon" || stage === "boom") && (
              <g className="animate-in fade-in duration-300">
                {[0, 60, 120, 180, 240, 300].map((angle) => (
                  <g key={angle} transform={`rotate(${angle} 250 250)`}>
                    <polygon
                      points="250,82 225,175 275,175"
                      fill="url(#rayGrad)"
                      stroke="#FFE066"
                      strokeWidth="1"
                    />
                  </g>
                ))}
              </g>
            )}

            {/* LAYER 4: 60° Regular Hexagon Outer Perimeter Frame (Exact 60° Geometry) */}
            {(stage === "hexagon" || stage === "boom") && (
              <polygon
                points="250,78 398,164 398,336 250,422 102,336 102,164"
                fill="none"
                stroke="#E5A93C"
                strokeWidth="9"
                strokeLinejoin="round"
                className="animate-in zoom-in-90 fade-in duration-300 drop-shadow-[0_0_25px_rgba(229,169,60,0.8)]"
              />
            )}
          </svg>

          {/* Official Emblem Crossfade for 100% Crisp Brand Identity */}
          {(stage === "hexagon" || stage === "boom") && (
            <img
              src={logoAsset}
              alt="DPSBE Titans Emblem"
              className="absolute inset-0 w-full h-full object-contain z-20 animate-in fade-in duration-300 drop-shadow-[0_0_35px_rgba(229,169,60,0.9)]"
            />
          )}

          {/* Specular Diagonal Light-Sweep Flare */}
          {(stage === "hexagon" || stage === "boom") && (
            <div className="absolute inset-0 z-30 pointer-events-none overflow-hidden rounded-full">
              <div className="w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent -rotate-45 translate-x-[-120%] animate-[sweep_0.8s_ease-out_forwards]" />
            </div>
          )}
        </div>

        {/* Cinematic Title Underneath */}
        <div className="mt-8 text-center space-y-1.5 font-mono">
          <div className="text-xl sm:text-2xl font-black tracking-widest text-foreground uppercase flex items-center justify-center gap-2">
            <span>DPSBE TITANS</span>
            <span className="text-accent">#174</span>
          </div>
          <div className="text-xs sm:text-sm font-semibold tracking-[0.25em] text-accent flex items-center justify-center gap-2">
            <Sparkles className="h-3.5 w-3.5" />
            <span>SIX CORNERS • ONE THUNDER</span>
          </div>
        </div>
      </div>

      {/* Bottom Skip Prompt */}
      {!discharging && (
        <button
          type="button"
          onClick={triggerFinish}
          className="absolute bottom-6 right-6 z-40 flex items-center gap-2 rounded-full border border-white/20 bg-black/60 px-4 py-2 font-mono text-xs font-semibold text-muted-foreground hover:bg-white/10 hover:text-white transition-all backdrop-blur-md"
        >
          <span>SKIP TO SITE</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </button>
      )}
    </div>
  );
}

export function AgentBuildOverlay({ onComplete }: AgentBuildOverlayProps) {
  // Phase 1: "terminal" (High-intensity pure cyber terminal boot sequence)
  // Phase 2: "swarm" (Multi-agent swarm builds the live website)
  // Phase 3: "climax" (Thunderbolt & Logo Forge -> Thunder Boom into Website)
  const [phase, setPhase] = useState<"terminal" | "swarm" | "climax">("terminal");
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  const handleTerminalToSwarm = useCallback(() => {
    try {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    } catch {
      // Ignore
    }
    setPhase("swarm");
  }, []);

  const handleSkipDirectToClimax = useCallback(() => {
    try {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    } catch {
      // Ignore
    }
    setPhase("climax");
  }, []);

  useEffect(() => {
    if (phase !== "swarm") return;

    // Launch swarm rebuild engine on live DOM
    startSwarmRebuild({
      onComplete: () => {
        // When Swarm finishes building the site, transition to Part 3 (Thunderbolt & Logo Forge Climax!)
        setPhase("climax");
      },
    });

    return () => {
      stopSwarmRebuild(false);
    };
  }, [phase]);

  if (phase === "terminal") {
    return (
      <IntroTerminal
        onProceedToSwarm={handleTerminalToSwarm}
        onSkipToClimax={handleSkipDirectToClimax}
      />
    );
  }

  if (phase === "climax") {
    return <ThunderLogoClimax onComplete={() => onCompleteRef.current()} />;
  }

  // During phase === "swarm", swarm rebuild engine renders directly into its own shadow root overlay
  return null;
}
