import slide01 from "@/assets/media/season-plan/01-road-to-regionals.jpg";
import slide02 from "@/assets/media/season-plan/02-phase-01-basic-robot.jpg";
import slide03 from "@/assets/media/season-plan/03-the-next-chapter.jpg";
import slide04 from "@/assets/media/season-plan/04-phase-02-advanced-development.jpg";
import slide05 from "@/assets/media/season-plan/05-phase-03-testing-refinement.jpg";
import slide06 from "@/assets/media/season-plan/06-nrl-regionals-destination.jpg";

export interface SeasonPlanSlide {
  id: string;
  index: number;
  slideNumber: string;
  phaseCode: string;
  phaseLabel: string;
  title: string;
  subtitle: string;
  dateRange: string;
  statusBadge: string;
  summary: string;
  bulletPoints: string[];
  objective: string;
  image: string;
  technicalSpecs?: { label: string; value: string }[];
}

export const seasonPlanSlides: SeasonPlanSlide[] = [
  {
    id: "road-to-regionals",
    index: 0,
    slideNumber: "01",
    phaseCode: "OVERVIEW",
    phaseLabel: "SEASON ROADMAP",
    title: "THE ROAD TO REGIONALS",
    subtitle: "From a basic build to advanced engineering.",
    dateRange: "NRL 2026 SEASON PLAN",
    statusBadge: "ACTIVE ROADMAP",
    summary:
      "The complete engineering masterplan for DPSBE Titans Team #174. Tracking the full evolutionary arc of our competition machine across four disciplined engineering pillars: Design, Build, Innovate, and Compete.",
    bulletPoints: [
      "Six dedicated students & one mentor on a united engineering journey",
      "Disciplined CAD modeling and mechanical geometry iteration",
      "Dual-layer acrylic-aluminum chassis engineering with active manipulators",
      "Rigorous pre-tournament stress trials and match simulations",
    ],
    objective: "DESIGN → BUILD → INNOVATE → COMPETE",
    image: slide01,
    technicalSpecs: [
      { label: "TEAM", value: "DPSBE Titans #174" },
      { label: "SEASON", value: "NRL 2026" },
      { label: "FOOTPRINT", value: "450 × 350 × 300 mm" },
      { label: "DESTINATION", value: "NRL Regionals" },
    ],
  },
  {
    id: "phase-01-basic-robot",
    index: 1,
    slideNumber: "02",
    phaseCode: "PHASE 01",
    phaseLabel: "FOUNDATION & DRIVETRAIN",
    title: "THE BASIC ROBOT",
    subtitle: "Every great machine starts with a foundation.",
    dateRange: "SEASON START – 30 OCTOBER 2026",
    statusBadge: "MILESTONE ACHIEVED",
    summary:
      "Phase 01 focused on structural integrity and mobile robotics fundamentals. We engineered a rigid rectangular chassis frame, integrated all-terrain tread wheels with dual DC high-torque drive motors, and wired the primary power and teleoperated control systems.",
    bulletPoints: [
      "Building the basic robot chassis and structural load distribution",
      "Establishing the drivetrain and 4WD all-terrain movement systems",
      "Integrating essential electronics, motor drivers, and battery harness",
      "Setting up fundamental teleoperated remote control channels",
      "Achieving a robust, functional, drive-tested baseline robot platform",
    ],
    objective: "A WORKING BASIC ROBOT READY FOR MECHANICAL EXPANSION",
    image: slide02,
    technicalSpecs: [
      { label: "DRIVE ARCHITECTURE", value: "4WD Dual DC Motors" },
      { label: "WHEEL TYPE", value: "High-Grip Knobby Treads" },
      { label: "POWER SYSTEM", value: "12V Dual-Bus Battery Array" },
      { label: "CHASSIS", value: "Structural Acrylic Core" },
    ],
  },
  {
    id: "next-chapter-transition",
    index: 2,
    slideNumber: "03",
    phaseCode: "TRANSITION",
    phaseLabel: "PHASE SHIFT",
    title: "THE NEXT CHAPTER BEGINS.",
    subtitle: "The foundation is ready. Now, it's time to engineer beyond the basics.",
    dateRange: "31 OCTOBER 2026",
    statusBadge: "TRANSITION POINT",
    summary:
      "With the baseline drivetrain thoroughly verified, our focus shifts towards advanced mechanical development. We pivot from an open testbed to an offensive, competition-capable robotics machine equipped with custom manipulators.",
    bulletPoints: [
      "Reviewing Phase 01 telemetry, speed curves, and ground friction metrics",
      "Designing articulated dual-arm intake kinematics for tournament game objects",
      "Machining precision acrylic mounting brackets for high-torque servo linkages",
      "Evolving the platform from a basic mover into a high-utility tournament machine",
    ],
    objective: "TRANSFORMING FOUNDATIONAL BUILD INTO A CAPABLE SCORING MACHINE",
    image: slide03,
    technicalSpecs: [
      { label: "TARGET SUBSYSTEM", value: "Active Claw Gripper" },
      { label: "ACTUATION", value: "Servo-Driven Linkage" },
      { label: "STATUS", value: "Phase 02 Transition" },
      { label: "OBJECTIVE", value: "Advanced Manipulation" },
    ],
  },
  {
    id: "phase-02-advanced-development",
    index: 3,
    slideNumber: "04",
    phaseCode: "PHASE 02",
    phaseLabel: "ADVANCED DEVELOPMENT",
    title: "ADVANCED DEVELOPMENT",
    subtitle: "Engineering high-efficiency manipulation & active systems.",
    dateRange: "31 OCTOBER – 20/21 NOVEMBER 2026",
    statusBadge: "SYSTEM INTEGRATION",
    summary:
      "Phase 02 brings competition-grade intelligence and mechanical precision to Kronos. We integrate custom acrylic gripper arms, fine-tune gear ratios for instantaneous acceleration, and optimize internal wiring for rapid pit-stop accessibility.",
    bulletPoints: [
      "Precision CNC/laser-cut clear acrylic claw with standoff spacers",
      "High-torque blue casing servo calibration for firm game element holding",
      "Drivetrain speed optimization and skid-steer rotational precision tuning",
      "Modular electronics top-deck mounting for thermal dissipation & diagnostics",
    ],
    objective: "TOURNAMENT-GRADE KINEMATICS, RESPONSIVE CONTROLS & AGILITY",
    image: slide04,
    technicalSpecs: [
      { label: "CLAW MECHANISM", value: "Dual Acrylic Pincers" },
      { label: "SERVO TORQUE", value: "High-Torque Metal Gear" },
      { label: "WIRING", value: "Braided & Modular Looms" },
      { label: "ROBOT DESIGNATION", value: "Kronos (Team #174)" },
    ],
  },
  {
    id: "phase-03-testing-refinement",
    index: 4,
    slideNumber: "05",
    phaseCode: "PHASE 03",
    phaseLabel: "TESTING & REFINEMENT",
    title: "TESTING & REFINEMENT",
    subtitle: "Building is only half the challenge. Reliability makes a competition-ready robot.",
    dateRange: "PRE-REGIONAL PREPARATION",
    statusBadge: "RIGOROUS VALIDATION",
    summary:
      "A complete battery of high-intensity stress testing, software tuning, and driver practice sessions. We simulate full match conditions on the tournament arena to eradicate electrical noise, mechanical backlash, and latency.",
    bulletPoints: [
      "Testing Mechanisms: Repeated grab-and-release stress cycles to guarantee reliability",
      "Software Debugging: Fine-tuning throttle deadzones, exponential steering, and failsafes",
      "Driver Practice: Course navigation, cone obstacle weaving, and cycle speed improvement",
      "Match Strategy: Analysing tournament rules, arena scoring zones, and counter-tactics",
      "Reliability Checks: Comprehensive fastener inspections, wiring strain reliefs, and battery health",
    ],
    objective: "PERFORMANCE, PRECISION AND UNCOMPROMISED RELIABILITY",
    image: slide05,
    technicalSpecs: [
      { label: "TEST RUNS", value: "100+ Mechanism Cycles" },
      { label: "DRILLS", value: "Obstacle Cones & Slaloms" },
      { label: "TELEMETRY", value: "Voltage & Current Monitored" },
      { label: "INSPECTION", value: "NRL Safety Spec Cleared" },
    ],
  },
  {
    id: "nrl-regionals",
    index: 5,
    slideNumber: "06",
    phaseCode: "CHAMPIONSHIP",
    phaseLabel: "NRL REGIONALS",
    title: "NRL REGIONALS",
    subtitle: "The final destination of this phase. Make the journey count.",
    dateRange: "20 – 21 NOVEMBER 2026",
    statusBadge: "THE FINAL DESTINATION",
    summary:
      "The culmination of months of dedication, late-night lab builds, and iterative engineering. Six students and one mentor take Kronos into the National Robotics League arena to compete against the best schools in the region.",
    bulletPoints: [
      "Six students. One mentor. One engineering journey.",
      "Built on a foundation. Driven by innovation.",
      "Competing with sportsmanship, precision driving, and rapid tactical pivots.",
      "Growing together through technical collaboration, pressure, and triumph.",
    ],
    objective: "MAKE THE JOURNEY COUNT — DESIGN, BUILD, INNOVATE, COMPETE",
    image: slide06,
    technicalSpecs: [
      { label: "TOURNAMENT", value: "National Robotics League Regionals" },
      { label: "DATES", value: "20 – 21 November 2026" },
      { label: "CREW SIZE", value: "6 Members + 1 Mentor" },
      { label: "ARENA ROLE", value: "Primary Match Competitor" },
    ],
  },
];
