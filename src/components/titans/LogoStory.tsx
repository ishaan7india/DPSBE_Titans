import { useState, useCallback } from "react";
import logoAsset from "@/assets/dpsbetitanslogo.png";
import { soundSystem } from "@/lib/sound-effects";
import {
  Zap,
  RotateCw,
  Sparkles,
  Shield,
  Compass,
  ArrowRight,
  Layers,
  Activity,
  CheckCircle2,
} from "lucide-react";
import { Link } from "@tanstack/react-router";

interface EmblemCorner {
  index: number;
  angle: number; // 0, 60, 120, 180, 240, 300
  title: string;
  cornerName: string;
  meaning: string;
  discipline: string;
  symbolism: string;
  // Polar coordinates on 500x500 SVG relative to center (250, 250) with radius R=170
  svgX: number;
  svgY: number;
}

const emblemCorners: EmblemCorner[] = [
  {
    index: 0,
    angle: 0,
    title: "CORNER 01 • APEX (0°)",
    cornerName: "The Forward Vector",
    discipline: "STRATEGIC VISION & COMMAND",
    meaning: "Represents the team's forward momentum, mission clarity, and relentless drive toward the competition objective.",
    symbolism: "The top-most apex pointing directly ahead — representing clear vision, strategic foresight, and unified team direction.",
    svgX: 250,
    svgY: 85,
  },
  {
    index: 1,
    angle: 60,
    title: "CORNER 02 • MOBILITY (60°)",
    cornerName: "The Teleoperated Drive Vector",
    discipline: "ARENA MOBILITY & AGILITY",
    meaning: "Represents high-speed responsive maneuvering, swift obstacle avoidance, and tactical repositioning on the arena floor.",
    symbolism: "The speed vector — turning theoretical mechanical potential into fluid, precise real-time motion across the field.",
    svgX: 395,
    svgY: 168,
  },
  {
    index: 2,
    angle: 120,
    title: "CORNER 03 • CATALYST (120°)",
    cornerName: "The Collaboration Vector",
    discipline: "HUMAN-ROBOT INTEGRATION",
    meaning: "Represents the seamless bridge between human tactical coordination outside the perimeter and the robotic machine inside the arena.",
    symbolism: "The catalyst vector — timing field payloads, coordinating team strategy, and initiating match-winning scoring phases.",
    svgX: 395,
    svgY: 332,
  },
  {
    index: 3,
    angle: 180,
    title: "CORNER 04 • FOUNDATION (180°)",
    cornerName: "The Structural Anchor",
    discipline: "MECHANICAL RIGIDITY & STRENGTH",
    meaning: "Represents the physical bedrock, structural toughness, and durable chassis architecture that endures heavy arena collisions.",
    symbolism: "The bottom anchor — grounding the team with physical reliability, balanced center-of-gravity, and uncompromising build quality.",
    svgX: 250,
    svgY: 415,
  },
  {
    index: 4,
    angle: 240,
    title: "CORNER 05 • POWER (240°)",
    cornerName: "The Energy Distribution Vector",
    discipline: "ELECTRICAL ARCHITECTURE",
    meaning: "Represents steady power regulation, high-current delivery to drive motors, and resilient electrical design preventing brownouts.",
    symbolism: "The energy pulse — distributing clean regulated current to sustain relentless performance through demanding match cycles.",
    svgX: 105,
    svgY: 332,
  },
  {
    index: 5,
    angle: 300,
    title: "CORNER 06 • INTELLIGENCE (300°)",
    cornerName: "The Algorithmic Vector",
    discipline: "AUTONOMOUS LOGIC & TELEMETRY",
    meaning: "Represents precision software mapping, joystick calibration, responsive feedback loops, and intelligent autonomous routines.",
    symbolism: "The intellect vector — transforming raw sensory and driver inputs into smooth, predictable robotic execution.",
    svgX: 105,
    svgY: 168,
  },
];

export function LogoStory() {
  const [rotationAngle, setRotationAngle] = useState(0);
  const [activeCorner, setActiveCorner] = useState<number>(0);
  const [thunderActive, setThunderActive] = useState(false);
  const [isCharging, setIsCharging] = useState(false);

  // Rotate in exact 60-degree increments
  const spinExact60 = useCallback(() => {
    soundSystem.playMechanicalClick();
    setRotationAngle((prev) => {
      const next = prev + 60;
      const nextIndex = ((Math.round(next / 60) % 6) + 6) % 6;
      setActiveCorner(nextIndex);
      return next;
    });
  }, []);

  // Snap directly to a specific corner
  const selectCorner = useCallback((index: number) => {
    setActiveCorner(index);
    setRotationAngle(index * 60);
    soundSystem.playMechanicalClick();
  }, []);

  // Reset to original 0-degree Apex
  const resetOrientation = useCallback(() => {
    soundSystem.playMechanicalClick();
    setRotationAngle(0);
    setActiveCorner(0);
  }, []);

  // Trigger the full Convergence & Thunder sequence
  const triggerThunder = useCallback(() => {
    if (thunderActive || isCharging) return;

    // Phase 1: Energy Charge-up
    setIsCharging(true);
    soundSystem.playMechanicalClick();

    setTimeout(() => {
      // Phase 2: Thunder Discharge!
      setIsCharging(false);
      setThunderActive(true);
      soundSystem.playThunderBoom();

      setTimeout(() => {
        setThunderActive(false);
      }, 1100);
    }, 450);
  }, [thunderActive, isCharging]);

  const currentCorner = emblemCorners[activeCorner];

  return (
    <div className="relative">
      {/* Full-Screen Lightning Flash on Thunder */}
      {thunderActive && (
        <div className="pointer-events-none fixed inset-0 z-50 bg-gradient-to-b from-amber-300/30 via-white/40 to-accent/20 backdrop-blur-[1px] animate-pulse transition-opacity duration-300" />
      )}

      {/* Hero Header Section */}
      <section className="bg-background px-page py-section">
        <div className="flex flex-wrap items-center gap-2 font-mono text-xs font-semibold uppercase tracking-widest text-accent">
          <span>02 — IDENTITY ARCHITECTURE</span>
          <span className="text-white/30">•</span>
          <span>60° REGULAR HEXAGON</span>
          <span className="text-white/30">•</span>
          <span>TEAM #174</span>
        </div>

        <h1 className="editorial-title text-foreground mt-6">
          <span>SIX CORNERS.</span>
          <span>ONE THUNDER.</span>
        </h1>

        <p className="mt-8 max-w-3xl text-base sm:text-lg text-muted-foreground leading-relaxed">
          The DPSBE Titans emblem is an exact regular hexagon with 60° rotational symmetry. Each of
          its six corners represents one of the six team members. In isolation, six individual
          points are just separate entities on a field. But when all six converge at the center,
          they ignite the golden core —{" "}
          <strong className="text-foreground">when they come together, they thunder</strong>.
        </p>

        {/* ============================================================== */}
        {/* MAIN INTERACTIVE EMBLEM STAGE & CONVERGENCE CONTROLS           */}
        {/* ============================================================== */}
        <div className="mt-14 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center rounded-3xl border border-white/10 bg-surface/60 p-6 sm:p-10 backdrop-blur-xl shadow-2xl relative overflow-hidden">
          {/* Subtle Ambient Radial Glow */}
          <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-accent/10 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-primary/15 blur-3xl pointer-events-none" />

          {/* Left Column: The Emblem Stage */}
          <div className="lg:col-span-6 flex flex-col items-center justify-center p-2 sm:p-6">
            {/* The Emblem Arena Container */}
            <div className="relative flex items-center justify-center w-full max-w-[420px] aspect-square">
              {/* Outer Orbital Compass & Angle Ticks */}
              <div className="absolute inset-0 rounded-full border border-dashed border-white/15 animate-[spin_120s_linear_infinite] pointer-events-none" />
              <div className="absolute inset-6 rounded-full border border-accent/20 pointer-events-none" />

              {/* 6 Angle Indicator Markers around the Perimeter */}
              {emblemCorners.map((c) => {
                const isSelected = activeCorner === c.index;
                const rad = ((c.angle - 90) * Math.PI) / 180;
                const leftPercent = 50 + 44 * Math.cos(rad);
                const topPercent = 50 + 44 * Math.sin(rad);

                return (
                  <button
                    key={c.index}
                    type="button"
                    onClick={() => selectCorner(c.index)}
                    className={`absolute z-30 -translate-x-1/2 -translate-y-1/2 rounded-full px-2.5 py-1 text-[11px] font-mono font-bold transition-all ${
                      isSelected
                        ? "bg-accent text-black scale-110 shadow-lg shadow-accent/50 ring-2 ring-white"
                        : "bg-black/80 text-white/70 border border-white/20 hover:border-accent hover:text-accent hover:scale-105"
                    }`}
                    style={{ left: `${leftPercent}%`, top: `${topPercent}%` }}
                    title={`Click to focus on Corner ${c.index + 1} (${c.angle}°)`}
                  >
                    {c.angle}°
                  </button>
                );
              })}

              {/* -------------------------------------------------------- */}
              {/* The Rotating Emblem Container (Strict 60° increments)    */}
              {/* -------------------------------------------------------- */}
              <div
                className="relative z-10 w-64 h-64 sm:w-76 sm:h-76 cursor-pointer transition-transform duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)]"
                style={{ transform: `rotate(${rotationAngle}deg)` }}
                onClick={spinExact60}
                title="Click to spin exactly 60°"
              >
                {/* 1. Underlying Central Plasma Core (Shines directly through the cutout bolt!) */}
                <div
                  className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full transition-all duration-300 pointer-events-none ${
                    thunderActive
                      ? "w-36 h-36 bg-gradient-to-r from-amber-200 via-white to-yellow-300 blur-xl opacity-100 scale-150 animate-pulse"
                      : isCharging
                        ? "w-24 h-24 bg-accent/60 blur-md opacity-90 scale-110 animate-ping"
                        : "w-20 h-20 bg-amber-400/25 blur-sm opacity-60"
                  }`}
                />

                {/* 2. The Transparent PNG Emblem */}
                <img
                  src={logoAsset}
                  alt="DPSBE Titans Hexagonal Emblem"
                  className={`relative z-10 w-full h-full object-contain filter transition-all duration-300 ${
                    thunderActive
                      ? "brightness-125 drop-shadow-[0_0_40px_rgba(229,169,60,0.9)]"
                      : isCharging
                        ? "brightness-110 drop-shadow-[0_0_25px_rgba(229,169,60,0.6)]"
                        : "drop-shadow-[0_0_20px_rgba(229,169,60,0.35)]"
                  }`}
                />

                {/* 3. Mathematical 1:1 Synchronized Thunder Overlay (500x500 SVG Space) */}
                {(thunderActive || isCharging) && (
                  <svg
                    viewBox="0 0 500 500"
                    className="absolute inset-0 z-20 w-full h-full pointer-events-none"
                  >
                    <defs>
                      <radialGradient id="centerCoreGlow">
                        <stop offset="0%" stopColor="#FFFFFF" stopOpacity="1" />
                        <stop offset="45%" stopColor="#FFE066" stopOpacity="0.9" />
                        <stop offset="85%" stopColor="#E5A93C" stopOpacity="0.4" />
                        <stop offset="100%" stopColor="#E5A93C" stopOpacity="0" />
                      </radialGradient>
                    </defs>

                    {/* Six Radial Electric Rays connecting the Center to all 6 Vertices */}
                    {emblemCorners.map((c) => (
                      <g key={c.index}>
                        {/* Golden energetic core line */}
                        <line
                          x1="250"
                          y1="250"
                          x2={c.svgX}
                          y2={c.svgY}
                          stroke="#FFE066"
                          strokeWidth={thunderActive ? "3.5" : "1.5"}
                          strokeDasharray={isCharging ? "4,4" : "none"}
                          className={thunderActive ? "animate-pulse" : ""}
                        />
                        {/* Outer electric spark glow line */}
                        {thunderActive && (
                          <line
                            x1="250"
                            y1="250"
                            x2={c.svgX}
                            y2={c.svgY}
                            stroke="#FFFFFF"
                            strokeWidth="1.5"
                            opacity="0.9"
                          />
                        )}
                        {/* Terminal Node Spark at the vertex */}
                        <circle
                          cx={c.svgX}
                          cy={c.svgY}
                          r={thunderActive ? "7" : "4"}
                          fill="#FFFFFF"
                          className="animate-ping"
                        />
                      </g>
                    ))}

                    {/* Central Thunder Core Explosive Flare */}
                    {thunderActive && (
                      <>
                        {/* Plasma Disc */}
                        <circle cx="250" cy="250" r="42" fill="url(#centerCoreGlow)" />
                        {/* Shockwave expanding ring */}
                        <circle
                          cx="250"
                          cy="250"
                          r="55"
                          fill="none"
                          stroke="#FFFFFF"
                          strokeWidth="2.5"
                          className="animate-ping"
                        />
                        <circle
                          cx="250"
                          cy="250"
                          r="75"
                          fill="none"
                          stroke="#E5A93C"
                          strokeWidth="1.5"
                          opacity="0.75"
                        />
                      </>
                    )}
                  </svg>
                )}
              </div>
            </div>

            {/* Interactive Stage Controls */}
            <div className="flex flex-wrap items-center justify-center gap-3 mt-6 font-mono text-xs w-full max-w-md">
              <button
                type="button"
                onClick={spinExact60}
                className="flex-1 flex items-center justify-center gap-2 rounded-xl border border-accent/40 bg-accent/10 px-4 py-3 font-semibold text-accent hover:bg-accent/20 transition-all hover:scale-[1.02] shadow-sm"
              >
                <RotateCw className="h-4 w-4" />
                <span>SPIN 60°</span>
                <span className="rounded bg-black/60 px-2 py-0.5 text-[10px] text-white/80">
                  {((rotationAngle % 360) + 360) % 360}°
                </span>
              </button>

              <button
                type="button"
                onClick={triggerThunder}
                disabled={thunderActive || isCharging}
                className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-accent px-5 py-3 font-bold text-black hover:bg-accent/90 transition-all hover:scale-[1.02] shadow-lg shadow-accent/25 disabled:opacity-50"
              >
                <Zap className="h-4 w-4 fill-black" />
                <span>{isCharging ? "CONVERGING..." : "TRIGGER THUNDER"}</span>
              </button>

              <button
                type="button"
                onClick={resetOrientation}
                className="rounded-xl border border-white/10 bg-white/5 px-3.5 py-3 text-muted-foreground hover:bg-white/10 hover:text-foreground transition-all"
                title="Reset to 0° Apex"
              >
                RESET 0°
              </button>
            </div>
          </div>

          {/* Right Column: Meaning of the Emblem & Active Corner */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2 font-mono text-xs text-accent">
                <Sparkles className="h-4 w-4" />
                <span>THE SACRED GEOMETRY OF TEAM #174</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold uppercase text-foreground">
                When They Come Together, They Thunder.
              </h2>
            </div>

            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              In structural geometry, the <strong className="text-foreground">regular hexagon</strong>{" "}
              provides the highest strength-to-weight ratio and perfect 60° equilateral equilibrium.
              Six corners support the perimeter; the center concentrates the energy. Each corner
              represents one team member, and when all six forces converge at the center, they
              create the lightning bolt.
            </p>

            {/* Selected Corner Meaning Card */}
            <div className="rounded-2xl border border-accent/40 bg-accent/10 p-5 sm:p-6 space-y-4 shadow-xl shadow-accent/10 relative overflow-hidden">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="rounded-full bg-accent text-black font-bold px-3 py-1">
                  {currentCorner.title}
                </span>
                <span className="text-accent/90 font-semibold font-mono">{currentCorner.discipline}</span>
              </div>

              <div>
                <h3 className="text-xl font-bold text-foreground font-sans">
                  {currentCorner.cornerName}
                </h3>
                <p className="font-mono text-xs text-accent mt-0.5">
                  Corner {currentCorner.index + 1} of 6 — Vector Orientation {currentCorner.angle}°
                </p>
              </div>

              <div className="border-t border-accent/20 pt-3 space-y-2 text-xs sm:text-sm">
                <div className="font-semibold text-foreground/90 font-sans">
                  Hexagonal Representation:
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  {currentCorner.meaning}
                </p>

                <div className="font-semibold text-foreground/90 font-sans pt-1">
                  Insignia Symbolism:
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  {currentCorner.symbolism}
                </p>
              </div>
            </div>

            {/* Quick Corner Selector */}
            <div className="space-y-2">
              <div className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                EXPLORE EACH CORNER (60° INCREMENTS):
              </div>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                {emblemCorners.map((c) => (
                  <button
                    key={c.index}
                    type="button"
                    onClick={() => selectCorner(c.index)}
                    className={`rounded-lg border p-2 text-center transition-all font-mono text-xs ${
                      activeCorner === c.index
                        ? "border-accent bg-accent text-black font-bold shadow-md shadow-accent/30 scale-105"
                        : "border-white/10 bg-white/5 text-muted-foreground hover:bg-white/10 hover:text-foreground"
                    }`}
                  >
                    <div className="text-[10px] opacity-75">{c.angle}°</div>
                    <div className="truncate font-semibold mt-0.5">C-0{c.index + 1}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* SECTION 2: THE 4 ANATOMICAL LAYERS OF THE EMBLEM             */}
      {/* ============================================================== */}
      <section className="bg-surface px-page py-section border-t border-white/10">
        <div className="flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-widest text-accent">
          <span>STRUCTURAL BREAKDOWN</span>
          <span className="text-white/30">•</span>
          <span>THE FOUR ANATOMICAL LAYERS</span>
        </div>

        <h2 className="editorial-title text-foreground mt-4 text-[clamp(2.5rem,7.2vw,7.5rem)]">
          <span className="whitespace-nowrap">THE ANATOMY OF</span>
          <span className="whitespace-nowrap">THE INSIGNIA.</span>
        </h2>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="rounded-2xl border border-white/10 bg-black/40 p-6 space-y-4 hover:border-accent/40 transition-colors">
            <div className="h-10 w-10 rounded-xl bg-accent/10 border border-accent/30 flex items-center justify-center text-accent">
              <Shield className="h-5 w-5" />
            </div>
            <div className="font-mono text-xs text-accent font-bold">LAYER 01</div>
            <h3 className="text-lg font-bold text-foreground">The Hexagonal Perimeter</h3>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              A regular hexagon with 60° internal equilateral symmetry. It provides maximum
              structural rigidity and balanced equilibrium, forming the protective perimeter of the
              insignia.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-black/40 p-6 space-y-4 hover:border-accent/40 transition-colors">
            <div className="h-10 w-10 rounded-xl bg-accent/10 border border-accent/30 flex items-center justify-center text-accent">
              <Compass className="h-5 w-5" />
            </div>
            <div className="font-mono text-xs text-accent font-bold">LAYER 02</div>
            <h3 className="text-lg font-bold text-foreground">Six Inward-Converging Rays</h3>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              The six triangular rays originate from each of the six corners and point inward toward
              the focal center. Each ray represents a member focusing their full dedication and
              energy toward the core.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-black/40 p-6 space-y-4 hover:border-accent/40 transition-colors">
            <div className="h-10 w-10 rounded-xl bg-accent/10 border border-accent/30 flex items-center justify-center text-accent">
              <Layers className="h-5 w-5" />
            </div>
            <div className="font-mono text-xs text-accent font-bold">LAYER 03</div>
            <h3 className="text-lg font-bold text-foreground">The Golden Corona Ring</h3>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              The concentric circle unifies all six inward rays into an unbroken circuit. It
              represents complete team cohesion, zero friction, and flawless communication across all
              six disciplines.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-black/40 p-6 space-y-4 hover:border-accent/40 transition-colors">
            <div className="h-10 w-10 rounded-xl bg-accent/10 border border-accent/30 flex items-center justify-center text-accent">
              <Zap className="h-5 w-5 fill-accent" />
            </div>
            <div className="font-mono text-xs text-accent font-bold">LAYER 04</div>
            <h3 className="text-lg font-bold text-foreground">The Central Thunderbolt</h3>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              When all six corners unite with zero resistance, potential energy converts into pure
              electric force. That explosive impact is the Thunder — the ultimate symbol of the
              team coming together as one.
            </p>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* SECTION 3: PHILOSOPHY OF THE SIX-CORNER CONVERGENCE             */}
      {/* ============================================================== */}
      <section className="bg-background px-page py-section border-t border-white/10">
        <div className="max-w-4xl mx-auto space-y-10">
          <div className="text-center space-y-3">
            <div className="inline-flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-widest text-accent">
              <Activity className="h-4 w-4" />
              <span>THE CORE PHILOSOPHY</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-bold uppercase text-foreground">
              Six Corners. One Thunder.
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base max-w-2xl mx-auto">
              How six individual components combine into an unstoppable energetic force.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="rounded-2xl border border-white/10 bg-surface/50 p-6 space-y-3">
              <div className="font-mono text-xs text-accent font-bold">01 • THE PERIMETER</div>
              <h4 className="text-lg font-bold text-foreground">Individual Diversity</h4>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                Six distinct corners spread evenly across 360 degrees. Each corner possesses its own
                unique perspective, role, and discipline, ensuring the structure is balanced from
                every angle.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-surface/50 p-6 space-y-3">
              <div className="font-mono text-xs text-accent font-bold">02 • THE CONVERGENCE</div>
              <h4 className="text-lg font-bold text-foreground">Inward Focus</h4>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                Rather than pointing outward or pulling in opposing directions, all six rays direct
                their power inward toward the center. Harmony is achieved when personal effort serves
                the collective mission.
              </p>
            </div>

            <div className="rounded-2xl border border-accent/40 bg-accent/10 p-6 space-y-3 shadow-lg shadow-accent/10">
              <div className="font-mono text-xs text-black font-bold bg-accent px-2 py-0.5 rounded w-fit">
                03 • THE THUNDER
              </div>
              <h4 className="text-lg font-bold text-foreground">Electric Release</h4>
              <p className="text-xs sm:text-sm text-foreground/90 leading-relaxed">
                At the exact point of intersection, the convergence ignites the thunderbolt. The
                whole is exponentially greater than the sum of its parts. When they come together,
                they thunder.
              </p>
            </div>
          </div>

          {/* Bottom Navigation CTA */}
          <div className="flex flex-wrap items-center justify-between gap-6 rounded-2xl border border-white/10 bg-surface/80 p-6 sm:p-8 mt-12">
            <div>
              <h3 className="text-xl font-bold font-sans text-foreground">
                Explore the Journey Further
              </h3>
              <p className="font-mono text-xs text-muted-foreground mt-1">
                Meet the crew behind the corners or inspect the Kronos competition machine.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Link
                to="/team"
                className="inline-flex items-center gap-2 rounded-lg border border-white/20 bg-white/5 px-4 py-2.5 font-mono text-xs font-bold text-foreground hover:bg-white/10 transition-all"
              >
                <span>CREW PROFILES</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
              <Link
                to="/robot"
                className="inline-flex items-center gap-2 rounded-lg bg-accent px-4 py-2.5 font-mono text-xs font-bold text-black hover:bg-accent/90 transition-all hover:scale-105"
              >
                <span>ROBOT KRONOS</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
