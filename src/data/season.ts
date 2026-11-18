export const stats = [
  { value: "06", label: "TEAM MEMBERS" },
  { value: "01", label: "MENTOR" },
  { value: "01", label: "ROBOT (KRONOS)" },
  { value: "174", label: "TEAM NUMBER" },
  { value: "2026", label: "SEASON" },
];

export const buildStages = ["CONCEPT", "DESIGN", "BUILD", "PROGRAM", "TEST", "ITERATE", "COMPETE"];

export interface SeasonStageInfo {
  step: string;
  phaseCode: string;
  name: string;
  dates: string;
  status: string;
  description: string;
}

export const seasonStages: SeasonStageInfo[] = [
  {
    step: "01",
    phaseCode: "OVERVIEW",
    name: "THE ROAD TO REGIONALS",
    dates: "NRL 2026 SEASON",
    status: "ROADMAP COMPLETE",
    description: "Design → Build → Innovate → Compete master plan.",
  },
  {
    step: "02",
    phaseCode: "PHASE 01",
    name: "THE BASIC ROBOT",
    dates: "SEASON START – 30 OCT 2026",
    status: "MILESTONE ACHIEVED",
    description: "Foundational 4WD chassis, knobby tread wheels & baseline electronics.",
  },
  {
    step: "03",
    phaseCode: "TRANSITION",
    name: "THE NEXT CHAPTER",
    dates: "31 OCTOBER 2026",
    status: "PHASE SHIFT",
    description: "Pivoting from open testbed to advanced mechanical manipulation.",
  },
  {
    step: "04",
    phaseCode: "PHASE 02",
    name: "ADVANCED DEVELOPMENT",
    dates: "31 OCT – 20 NOV 2026",
    status: "SYSTEM INTEGRATION",
    description: "Active servo-driven acrylic claw gripper & speed-tuned drivetrain.",
  },
  {
    step: "05",
    phaseCode: "PHASE 03",
    name: "TESTING & REFINEMENT",
    dates: "PRE-REGIONAL SESSIONS",
    status: "RIGOROUS VALIDATION",
    description: "100+ mechanism cycles, software debugging & driver slalom courses.",
  },
  {
    step: "06",
    phaseCode: "ARENA FINALS",
    name: "NRL REGIONALS",
    dates: "20 – 21 NOVEMBER 2026",
    status: "THE FINAL DESTINATION",
    description: "Bangalore East Titans taking the tournament stage to compete.",
  },
];

export const mediaFilters = [
  "ALL",
  "TEAM",
  "ROBOT",
  "BUILD",
  "ROADMAP",
  "TESTING",
  "COMPETITION",
  "BEHIND THE SCENES",
];

export interface SeasonHighlightItem {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  category: string;
  tag: string;
  description: string;
  image: string;
}

export const seasonHighlights: SeasonHighlightItem[] = [
  {
    id: "kronos-chassis-complete",
    number: "01",
    title: "KRONOS ROBOT FABRICATION",
    subtitle: "Custom 4WD Platform & Knobby Treads",
    category: "ROBOT HARDWARE",
    tag: "COMPETITION MACHINE",
    description:
      "Precision-cut CNC acrylic chassis, high-traction all-terrain tread wheels, dual heavy-duty DC motors, and central electronics bay.",
    image: "/media/titans-competition-robot.jpg",
  },
  {
    id: "team-lab-prototyping",
    number: "02",
    title: "ENGINEERING IN THE LAB",
    subtitle: "Wiring, Assembly & Software Tuning",
    category: "TEAM AT WORK",
    tag: "LAB ARCHIVE",
    description:
      "The 6-member engineering crew prototyping claw kinematics, calibrating motor drivers, and optimizing autonomous and teleoperated routines.",
    image: "/media/titans-team-working.jpg",
  },
  {
    id: "team-roster-identity",
    number: "03",
    title: "OFFICIAL #174 CREW ROSTER",
    subtitle: "Six Students • One Engineering Mission",
    category: "TEAM IDENTITY",
    tag: "TOURNAMENT SQUAD",
    description:
      "Ishaan, Ridit, Supratik, Aariv, Abhinav, and Swastik — assigned across Driver, Drive Strategist, Human Player, and Subsystems.",
    image: "/media/titans-team-poster.jpg",
  },
  {
    id: "active-gripper-claw",
    number: "04",
    title: "ACTIVE CLAW MANIPULATION",
    subtitle: "High-Torque Metal Gear Servo Actuation",
    category: "SUBSYSTEMS",
    tag: "MECHANICAL DETAIL",
    description:
      "Articulated dual acrylic pincer mechanism engineered for lightning-fast ground capture of Hyperdrive game cores.",
    image: "/media/season-plan/04-phase-02-advanced-development.jpg",
  },
  {
    id: "road-to-regionals-roadmap",
    number: "05",
    title: "ROAD TO REGIONALS MASTERPLAN",
    subtitle: "Disciplined 6-Phase Engineering Arc",
    category: "ROADMAP",
    tag: "SEASON BLUEPRINT",
    description:
      "The complete masterplan: Phase 01 Basic Robot, Transition, Phase 02 Advanced Dev, Phase 03 Testing, and NRL Regionals.",
    image: "/media/season-plan/01-road-to-regionals.jpg",
  },
  {
    id: "nrl-regionals-destination",
    number: "06",
    title: "NRL REGIONALS CHAMPIONSHIP",
    subtitle: "Bangalore East Regionals • Nov 20-21, 2026",
    category: "TOURNAMENT",
    tag: "THE FINAL DESTINATION",
    description:
      "Competing in 2v2 Hyperdrive match cycles, aiming for Top 8 Captain status and qualifying for the National Finals.",
    image: "/media/season-plan/06-nrl-regionals-destination.jpg",
  },
];

export const highlights = seasonHighlights.map((h) => h.title);
