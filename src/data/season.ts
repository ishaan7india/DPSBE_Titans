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

export const highlights = [
  "BEST BUILDS",
  "ROBOT TESTING",
  "TEAM MOMENTS",
  "COMPETITION DAYS",
  "MATCH MOMENTS",
];
