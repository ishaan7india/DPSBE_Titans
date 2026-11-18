import { useState, useCallback } from "react";
import logoAsset from "@/assets/dpsbetitanslogo.png";
import ishaanImg from "@/assets/team/ishaan.jpg";
import riditImg from "@/assets/team/ridit.jpg";
import supratikImg from "@/assets/team/supratik.jpg";
import aarivImg from "@/assets/team/aariv.jpg";
import abhinavImg from "@/assets/team/abhinav.jpg";
import swastikImg from "@/assets/team/swastik.jpg";
import { soundSystem } from "@/lib/sound-effects";
import {
  Zap,
  RotateCw,
  Sparkles,
  Shield,
  Compass,
  ArrowRight,
  Flame,
  Cpu,
  Layers,
  Activity,
  CheckCircle2,
} from "lucide-react";
import { Link } from "@tanstack/react-router";

interface LogoVertex {
  index: number;
  angle: number; // 0, 60, 120, 180, 240, 300
  title: string;
  name: string;
  role: string;
  grade: string;
  image: string;
  discipline: string;
  vectorRole: string;
  matchContribution: string;
  symbolism: string;
  color: string;
  // Polar coordinate on 500x500 SVG relative to center (250, 250) with radius R=170
  svgX: number;
  svgY: number;
}

const logoVertices: LogoVertex[] = [
  {
    index: 0,
    angle: 0,
    title: "VERTEX 01 • APEX (0°)",
    name: "Ishaan",
    role: "Captain & Drive Strategist",
    grade: "Grade 10",
    image: ishaanImg,
    discipline: "STRATEGIC LEADERSHIP & MATCH COMMAND",
    vectorRole: "The Forward Vector",
    matchContribution:
      "Directs real-time alliance coordination, calls defensive rotations, manages the 2:30 match clock, and dictates autonomous scoring priorities.",
    symbolism:
      "The top-most apex pointing directly ahead — representing clear vision, mission discipline, and unified tournament direction.",
    color: "from-amber-400 to-yellow-500",
    svgX: 250,
    svgY: 85,
  },
  {
    index: 1,
    angle: 60,
    title: "VERTEX 02 • TELEOP (60°)",
    name: "Ridit Mittal",
    role: "Robot Driver",
    grade: "Grade 10",
    image: riditImg,
    discipline: "PRECISION ARENA TELEOPERATION",
    vectorRole: "The Dynamic Drive Vector",
    matchContribution:
      "Controls Kronos's 4WD drivetrain under full speed, threading tight field obstacles, executing micro-adjustments for claw payload capture, and defending lanes.",
    symbolism:
      "The speed vector — turning theoretical mechanical torque into tactical millisecond maneuvers across the Hyperdrive arena surface.",
    color: "from-amber-500 to-orange-500",
    svgX: 395,
    svgY: 168,
  },
  {
    index: 2,
    angle: 120,
    title: "VERTEX 03 • CATALYST (120°)",
    name: "Supratik Senapati",
    role: "Human Player",
    grade: "Grade 10",
    image: supratikImg,
    discipline: "ARENA OPERATIONS & PAYLOAD TIMING",
    vectorRole: "The Field Supply Vector",
    matchContribution:
      "Manages the alliance depot station, pre-loading scoring elements, timing the release of match Payloads, and initiating high-multiplier STARBURST bonus periods.",
    symbolism:
      "The catalyst vector — bridging the human strategy zone outside the perimeter with the automated robot inside the field boundary.",
    color: "from-orange-500 to-amber-400",
    svgX: 395,
    svgY: 332,
  },
  {
    index: 3,
    angle: 180,
    title: "VERTEX 04 • FOUNDATION (180°)",
    name: "Kumar Aariv",
    role: "Mechanical",
    grade: "Grade 9",
    image: aarivImg,
    discipline: "STRUCTURAL RIGIDITY & KINEMATICS",
    vectorRole: "The Structural Anchor Vector",
    matchContribution:
      "Engineered Kronos's 4WD low-center-of-gravity chassis, CNC-milled structural ribs, high-traction knobby tread wheel geometry, and rigid servo claw linkages.",
    symbolism:
      "The bottom anchor — providing the bedrock stability and physical toughness without which high-velocity impacts would destroy the machine.",
    color: "from-yellow-500 to-amber-500",
    svgX: 250,
    svgY: 415,
  },
  {
    index: 4,
    angle: 240,
    title: "VERTEX 05 • POWER (240°)",
    name: "Abhinav Mukund R",
    role: "Electronics",
    grade: "Grade 9",
    image: abhinavImg,
    discipline: "ELECTRICAL ARCHITECTURE & REGULATION",
    vectorRole: "The Energy Distribution Vector",
    matchContribution:
      "Architected the 12V dual-bus battery power system, motor driver breakout modules, emergency master isolation switch, and clean noise-isolated wire harnesses.",
    symbolism:
      "The pulse vector — channeling stable current to high-stall motors and preventing brownouts during heavy contact collisions.",
    color: "from-amber-400 to-yellow-400",
    svgX: 105,
    svgY: 332,
  },
  {
    index: 5,
    angle: 300,
    title: "VERTEX 06 • INTELLIGENCE (300°)",
    name: "Swastik Patra K",
    role: "Programmer",
    grade: "Grade 9",
    image: swastikImg,
    discipline: "AUTONOMOUS LOGIC & TELEMETRY",
    vectorRole: "The Algorithmic Vector",
    matchContribution:
      "Authored autonomous routine state machines, customized joystick deadband filters, exponential speed curve mappings, and real-time sensor odometry algorithms.",
    symbolism:
      "The intellect vector — transforming raw electrical signals and driver joystick inputs into fluid, predictable robotic behaviors.",
    color: "from-yellow-400 to-amber-400",
    svgX: 105,
    svgY: 168,
  },
];

export function LogoStory() {
  const [rotationAngle, setRotationAngle] = useState(0);
  const [activeVertex, setActiveVertex] = useState<number>(0);
  const [thunderActive, setThunderActive] = useState(false);
  const [isCharging, setIsCharging] = useState(false);

  // Rotate in exact 60-degree increments
  const spinExact60 = useCallback(() => {
    soundSystem.playMechanicalClick();
    setRotationAngle((prev) => {
      const next = prev + 60;
      // Also update the active vertex corresponding to the top
      const nextIndex = ((Math.round(next / 60) % 6) + 6) % 6;
      setActiveVertex(nextIndex);
      return next;
    });
  }, []);

  // Snap directly to a specific vertex
  const selectVertex = useCallback((index: number) => {
    setActiveVertex(index);
    // Rotating by negative angle brings this vertex to the top (0°)
    setRotationAngle(index * 60);
    soundSystem.playMechanicalClick();
  }, []);

  // Reset to original 0-degree Apex
  const resetOrientation = useCallback(() => {
    soundSystem.playMechanicalClick();
    setRotationAngle(0);
    setActiveVertex(0);
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

  const currentMember = logoVertices[activeVertex];

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
          its six corners represents one of our six student engineers. In isolation, six students
          are just six separate points on a field. But when their diverse disciplines converge at
          the focal point, they ignite the golden core —{" "}
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
              {logoVertices.map((v) => {
                const isSelected = activeVertex === v.index;
                // Calculate position on the circle (radius ~48%)
                const rad = ((v.angle - 90) * Math.PI) / 180;
                const leftPercent = 50 + 44 * Math.cos(rad);
                const topPercent = 50 + 44 * Math.sin(rad);

                return (
                  <button
                    key={v.index}
                    type="button"
                    onClick={() => selectVertex(v.index)}
                    className={`absolute z-30 -translate-x-1/2 -translate-y-1/2 rounded-full px-2 py-1 text-[10px] font-mono font-bold transition-all ${
                      isSelected
                        ? "bg-accent text-black scale-110 shadow-lg shadow-accent/50 ring-2 ring-white"
                        : "bg-black/80 text-white/70 border border-white/20 hover:border-accent hover:text-accent hover:scale-105"
                    }`}
                    style={{ left: `${leftPercent}%`, top: `${topPercent}%` }}
                    title={`Click to focus on ${v.name} (${v.angle}°)`}
                  >
                    {v.angle}°
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
                    {logoVertices.map((v) => (
                      <g key={v.index}>
                        {/* Golden energetic core line */}
                        <line
                          x1="250"
                          y1="250"
                          x2={v.svgX}
                          y2={v.svgY}
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
                            x2={v.svgX}
                            y2={v.svgY}
                            stroke="#FFFFFF"
                            strokeWidth="1.5"
                            opacity="0.9"
                          />
                        )}
                        {/* Terminal Node Spark at the vertex */}
                        <circle
                          cx={v.svgX}
                          cy={v.svgY}
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

          {/* Right Column: The Active Corner Dossier & Meaning */}
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
              In physics and mechanical truss design, the{" "}
              <strong className="text-foreground">regular hexagon</strong> is the strongest polygon
              known — providing the highest strength-to-weight ratio with 60° equilateral harmony.
              Six corners support the hull; the center holds the electric power.
            </p>

            {/* Selected Vertex Card */}
            <div className="rounded-2xl border border-accent/40 bg-accent/10 p-5 sm:p-6 space-y-4 shadow-xl shadow-accent/10 relative overflow-hidden">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="rounded-full bg-accent text-black font-bold px-3 py-1">
                  {currentMember.title}
                </span>
                <span className="text-accent/90 font-semibold">{currentMember.grade}</span>
              </div>

              <div className="flex items-center gap-4">
                <img
                  src={currentMember.image}
                  alt={currentMember.name}
                  className="h-16 w-16 rounded-full object-cover border-2 border-accent shadow-md shadow-accent/20"
                />
                <div>
                  <h3 className="text-xl font-bold text-foreground font-sans">
                    {currentMember.name}
                  </h3>
                  <p className="font-mono text-xs text-accent font-semibold">
                    {currentMember.role}
                  </p>
                  <p className="font-mono text-[11px] text-muted-foreground uppercase tracking-wider mt-0.5">
                    {currentMember.discipline}
                  </p>
                </div>
              </div>

              <div className="border-t border-accent/20 pt-3 space-y-2 text-xs sm:text-sm">
                <div className="font-semibold text-foreground/90 font-sans">
                  Arena Responsibility:
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  {currentMember.matchContribution}
                </p>

                <div className="font-semibold text-foreground/90 font-sans pt-1">
                  Insignia Symbolism:
                </div>
                <p className="text-muted-foreground leading-relaxed">{currentMember.symbolism}</p>
              </div>
            </div>

            {/* Quick Vertex Grid Selector */}
            <div className="space-y-2">
              <div className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                QUICK ALIGN TO ANY CORNER:
              </div>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                {logoVertices.map((v) => (
                  <button
                    key={v.index}
                    type="button"
                    onClick={() => selectVertex(v.index)}
                    className={`rounded-lg border p-2 text-center transition-all font-mono text-xs ${
                      activeVertex === v.index
                        ? "border-accent bg-accent text-black font-bold shadow-md shadow-accent/30 scale-105"
                        : "border-white/10 bg-white/5 text-muted-foreground hover:bg-white/10 hover:text-foreground"
                    }`}
                  >
                    <div className="text-[10px] opacity-75">{v.angle}°</div>
                    <div className="truncate font-semibold mt-0.5">{v.name.split(" ")[0]}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* SECTION 2: THE 4 ARCHITECTURAL LAYERS OF THE EMBLEM             */}
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
              A regular hexagon has 60° internal equilateral symmetry. In Kronos's engineering,
              triangulated honeycomb trusses yield maximum chassis rigidity with minimum mass —
              withstanding high-speed arena collisions.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-black/40 p-6 space-y-4 hover:border-accent/40 transition-colors">
            <div className="h-10 w-10 rounded-xl bg-accent/10 border border-accent/30 flex items-center justify-center text-accent">
              <Compass className="h-5 w-5" />
            </div>
            <div className="font-mono text-xs text-accent font-bold">LAYER 02</div>
            <h3 className="text-lg font-bold text-foreground">Six Inward-Converging Rays</h3>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              The six triangular pointers do not project outward to dissipate energy; they point
              strictly inward. Individual hours in the workshop funnel directly toward collective
              tournament execution.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-black/40 p-6 space-y-4 hover:border-accent/40 transition-colors">
            <div className="h-10 w-10 rounded-xl bg-accent/10 border border-accent/30 flex items-center justify-center text-accent">
              <Layers className="h-5 w-5" />
            </div>
            <div className="font-mono text-xs text-accent font-bold">LAYER 03</div>
            <h3 className="text-lg font-bold text-foreground">The Golden Corona Ring</h3>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              The concentric circle unifies the six points into an unbroken circuit. It represents
              seamless telemetry, zero communication latency between driver, coach, pit crew, and
              human player.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-black/40 p-6 space-y-4 hover:border-accent/40 transition-colors">
            <div className="h-10 w-10 rounded-xl bg-accent/10 border border-accent/30 flex items-center justify-center text-accent">
              <Zap className="h-5 w-5 fill-accent" />
            </div>
            <div className="font-mono text-xs text-accent font-bold">LAYER 04</div>
            <h3 className="text-lg font-bold text-foreground">The Central Thunderbolt</h3>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              When six distinct forces converge with zero friction, potential energy discharges into
              kinetic dominance. That explosive release is the Thunder — Team #174 striking the
              Hyperdrive arena.
            </p>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* SECTION 3: THE SIX BUILDERS — DEEP DIVE DOSSIERS               */}
      {/* ============================================================== */}
      <section className="bg-background px-page py-section border-t border-white/10">
        <div className="flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-widest text-accent">
          <span>CREW REPUTATION</span>
          <span className="text-white/30">•</span>
          <span>THE SIX CREW MEMBERS</span>
        </div>

        <h2 className="editorial-title text-foreground mt-4">
          <span>THE SIX</span>
          <span>BUILDERS.</span>
        </h2>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {logoVertices.map((vertex) => {
            const isSelected = activeVertex === vertex.index;

            return (
              <div
                key={vertex.index}
                onClick={() => selectVertex(vertex.index)}
                className={`group cursor-pointer rounded-2xl border p-6 flex flex-col justify-between transition-all duration-300 ${
                  isSelected
                    ? "border-accent bg-accent/15 shadow-xl shadow-accent/10 scale-[1.02]"
                    : "border-white/10 bg-surface/40 hover:border-white/20 hover:bg-surface/70"
                }`}
              >
                <div className="space-y-4">
                  {/* Top Header */}
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="rounded-full bg-accent/15 px-3 py-1 text-accent border border-accent/30 font-semibold">
                      {vertex.title}
                    </span>
                    <span className="text-muted-foreground font-medium">{vertex.grade}</span>
                  </div>

                  {/* Member Photo & Identification */}
                  <div className="flex items-center gap-3.5">
                    <img
                      src={vertex.image}
                      alt={vertex.name}
                      className="h-14 w-14 rounded-full object-cover border-2 border-white/20 group-hover:border-accent transition-colors"
                    />
                    <div>
                      <h3 className="font-sans text-xl font-bold text-foreground group-hover:text-accent transition-colors">
                        {vertex.name}
                      </h3>
                      <p className="font-mono text-xs text-accent/90 font-semibold mt-0.5">
                        {vertex.role}
                      </p>
                    </div>
                  </div>

                  {/* Discipline */}
                  <div className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground border-b border-white/10 pb-2">
                    {vertex.discipline}
                  </div>

                  {/* Match Role */}
                  <div className="space-y-1 text-xs">
                    <div className="font-mono font-semibold text-foreground/90 uppercase tracking-wider text-[10px]">
                      HYPERDRIVE ROLE
                    </div>
                    <p className="text-muted-foreground leading-relaxed">
                      {vertex.matchContribution}
                    </p>
                  </div>

                  {/* Symbolism */}
                  <div className="space-y-1 text-xs">
                    <div className="font-mono font-semibold text-accent uppercase tracking-wider text-[10px]">
                      HEXAGONAL SYMBOLISM
                    </div>
                    <p className="text-muted-foreground leading-relaxed">{vertex.symbolism}</p>
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-white/10 flex items-center justify-between font-mono text-[11px] text-accent">
                  <span>ALIGN CORNER ({vertex.angle}°)</span>
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ============================================================== */}
      {/* SECTION 4: HOW THUNDER OCCURS ON THE HYPERDRIVE ARENA           */}
      {/* ============================================================== */}
      <section className="bg-surface px-page py-section border-t border-white/10">
        <div className="max-w-4xl mx-auto space-y-10">
          <div className="text-center space-y-3">
            <div className="inline-flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-widest text-accent">
              <Activity className="h-4 w-4" />
              <span>TOURNAMENT EXECUTION</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-bold uppercase text-foreground">
              The 2:30 Convergence Cycle
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base max-w-2xl mx-auto">
              How the six corners of the emblem synchronize throughout a 2-minute 30-second NRL
              match.
            </p>
          </div>

          <div className="space-y-4">
            <div className="rounded-xl border border-white/10 bg-black/40 p-5 sm:p-6 flex flex-col sm:flex-row gap-5 items-start sm:items-center">
              <div className="font-mono text-sm font-bold text-accent bg-accent/10 px-3 py-1.5 rounded-lg border border-accent/20 shrink-0">
                0:00 — 0:30
              </div>
              <div className="space-y-1">
                <h4 className="font-bold text-foreground text-base">
                  Phase 1: The Initial Punch — Core Intake & Placement
                </h4>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  First 30 seconds. Ridit unleashes Kronos on the arena floor for the opening strike
                  — swiftly collecting the initial field cores with the high-torque claw and
                  dropping them cleanly and correctly into designated scoring zones.
                </p>
              </div>
            </div>

            <div className="rounded-xl border border-white/10 bg-black/40 p-5 sm:p-6 flex flex-col sm:flex-row gap-5 items-start sm:items-center">
              <div className="font-mono text-sm font-bold text-accent bg-accent/10 px-3 py-1.5 rounded-lg border border-accent/20 shrink-0">
                0:30 — 1:00
              </div>
              <div className="space-y-1">
                <h4 className="font-bold text-foreground text-base">
                  Phase 2: Payload Delivery & Starburst Activation
                </h4>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  Next 30 seconds. Seamless human-to-robot coordination: Supra (Supratik, Human
                  Player) and Ridit (Driver) execute rapid payload delivery from the alliance
                  station to Kronos, successfully triggering and activating the high-multiplier
                  STARBURST period across the arena!
                </p>
              </div>
            </div>

            <div className="rounded-xl border border-white/10 bg-black/40 p-5 sm:p-6 flex flex-col sm:flex-row gap-5 items-start sm:items-center">
              <div className="font-mono text-sm font-bold text-accent bg-accent/10 px-3 py-1.5 rounded-lg border border-accent/20 shrink-0">
                1:00 — 2:00
              </div>
              <div className="space-y-1">
                <h4 className="font-bold text-foreground text-base">
                  Phase 3: Core Cycling — Targeting the Golden Cores (1-Min Sprint)
                </h4>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  Next 1 minute. With Starburst active, Kronos enters a relentless 60-second cycling
                  surge — prioritizing and scoring cores, especially hunting high-value Golden Cores
                  to maximize multiplier points while Swastik's throttle maps and Abhinav's power
                  bus sustain peak output.
                </p>
              </div>
            </div>

            <div className="rounded-xl border border-accent/40 bg-accent/10 p-5 sm:p-6 flex flex-col sm:flex-row gap-5 items-start sm:items-center shadow-lg shadow-accent/10">
              <div className="font-mono text-sm font-bold text-black bg-accent px-3 py-1.5 rounded-lg shrink-0">
                2:00 — 2:30
              </div>
              <div className="space-y-1">
                <h4 className="font-bold text-foreground text-base">
                  Phase 4: The Docking — Final Climax & Space Station Lock
                </h4>
                <p className="text-xs sm:text-sm text-foreground/90 leading-relaxed font-sans">
                  Last 30 seconds. Ishaan counts down the match clock. Ridit maneuvers Kronos to the
                  alliance Space Station ramp. The 4WD platform climbs, centers, and locks securely
                  into the docking zone before the final buzzer sounds. Six corners united — the
                  Thunder has landed.
                </p>
              </div>
            </div>
          </div>

          {/* Bottom Navigation CTA */}
          <div className="flex flex-wrap items-center justify-between gap-6 rounded-2xl border border-white/10 bg-black/60 p-6 sm:p-8">
            <div>
              <h3 className="text-xl font-bold font-sans text-foreground">
                Continue Into the Titans Journey
              </h3>
              <p className="font-mono text-xs text-muted-foreground mt-1">
                Meet the crew behind the vertices or inspect the Kronos machine.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Link
                to="/team"
                className="inline-flex items-center gap-2 rounded-lg border border-white/20 bg-white/5 px-4 py-2.5 font-mono text-xs font-bold text-foreground hover:bg-white/10 transition-all"
              >
                <span>TEAM DOSSIERS</span>
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
