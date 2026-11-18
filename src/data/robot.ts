export type RobotSpec = {
  label: string;
  value: string;
  detail?: string;
};

export const kronosSpecs: RobotSpec[] = [
  { label: "MACHINE NAME", value: "KRONOS", detail: "NRL 2026 COMPETITION ROBOT" },
  { label: "DRIVE SYSTEM", value: "4WD ALL-TERRAIN", detail: "HIGH-TRACTION RUGGED TREAD WHEELS" },
  { label: "MANIPULATOR", value: "ACTIVE CLAW", detail: "SERVO-DRIVEN DUAL ACRYLIC ARMS" },
  { label: "DRIVE MOTORS", value: "DUAL DC MOTORS", detail: "HIGH-TORQUE INDEPENDENT GEARBOXES" },
  { label: "POWER SYSTEM", value: "12V DUAL-BUS", detail: "ISOLATION SWITCHES & REGULATED RAILS" },
  { label: "CONTROL & MCU", value: "MCU CORE", detail: "PWM MOTOR HUBS & TELEMETRY LINK" },
  { label: "CHASSIS FRAME", value: "HYBRID CNC", detail: "PRECISION ACRYLIC & ALUMINUM CHASSIS" },
  { label: "WEIGHT / CLASS", value: "3.8 KG", detail: "NRL REGULATION COMPETITION CLASS" },
];

export const robotSpecs = kronosSpecs.map((s) => s.label);

export interface HyperdriveGameField {
  code: string;
  title: string;
  value: string;
  description: string;
  badge?: string;
}

export const hyperdriveGameDetails: HyperdriveGameField[] = [
  {
    code: "GAME IDENT",
    title: "NRL 2026: HYPERDRIVE",
    value: "OFFICIAL LEAGUE GAME",
    description:
      "Presented by Amazon and powered by The Innovation Story. Played on the enclosed HYPERDRIVE Arena in a dynamic 2v2 Squad format (Red Squad vs Blue Squad).",
    badge: "OFFICIAL GAME",
  },
  {
    code: "MATCH CYCLE",
    title: "2V2 SQUAD TOURNAMENT",
    value: "7-MINUTE MATCH CYCLES",
    description:
      "4 to 6 Qualification matches per team with rotating alliance partners. Cycle: 1:00 pre-match placement, 2:30 live teleoperated play, 3:30 field reset.",
    badge: "MATCH FORMAT",
  },
  {
    code: "SCORING MATRIX",
    title: "CORES & SPACE STATION",
    value: "UP TO 6 RP PER MATCH",
    description:
      "Squad Specific Cores (High Pole 3, Star Pole 5, Apex Pole 9, Drop Zone 1). Golden Cores (Star Pole 7, Drop Zone 3). Space Station (Engage 3, Dock 8, Balance 15). Star Bonus (10) & Payload Bonus (10).",
    badge: "SCORING MATRIX",
  },
  {
    code: "OUR STRATEGY",
    title: "RAPID CORE CYCLING & ENDGAME",
    value: "KRONOS TACTICAL SYSTEM",
    description:
      "Engineered for high-throughput ground intake, Star Pole scoring, coordinating Starburst multipliers with our Human Player, and securing high-value Space Station Balance points.",
    badge: "TITANS STRATEGY",
  },
  {
    code: "DRIVER ROLE",
    title: "HEXA CONTROLLER DRIVE",
    value: "RIDIT MITTAL (DRIVER)",
    description:
      "Commands Kronos through the official NRL HEXA Controller. Proportional 4WD throttle, skid-steer agility, ramp climbing, and precision claw actuation under pressure.",
    badge: "DRIVE TEAM",
  },
  {
    code: "DRIVE STRATEGIST",
    title: "TACTICAL MATCH CALLER",
    value: "ISHAAN (CAPTAIN)",
    description:
      "Reads opponent defense, calls pole priorities, tracks real-time point differentials, coordinates strategy with partner teams, and leads Squad Selection.",
    badge: "DRIVE TEAM",
  },
  {
    code: "HUMAN PLAYER",
    title: "STARBURST STATION",
    value: "SUPRATIK SENAPATI",
    description:
      "Operates from the perimeter Human Player station. Manages team Payloads and strategically triggers the high-impact STARBURST Mode during peak scoring opportunities.",
    badge: "DRIVE TEAM",
  },
  {
    code: "ROAD TO NATIONALS",
    title: "6 TEAMS QUALIFY",
    value: "REGIONAL TO NATIONAL FINALS",
    description:
      "4 Finalist teams on the field (both Squads) + 1 Tech Titans Award winner + 1 Autonomous / Changemakers Award winner qualify for the National Championship.",
    badge: "NATIONAL QUALIFIER",
  },
];

export const gameFields = hyperdriveGameDetails.map((g) => g.title);

export const engineeringDisciplines = [
  {
    number: "01",
    title: "MECHANICAL",
    copy: "Custom CNC acrylic chassis, high-traction 4WD tread wheel architecture, and a rapid servo-driven intake claw engineered for arena field scoring.",
  },
  {
    number: "02",
    title: "ELECTRONICS",
    copy: "Dual heavy-duty power isolation switches, multi-channel motor driver boards, regulated power distribution, and clean organized signal routing.",
  },
  {
    number: "03",
    title: "PROGRAMMING",
    copy: "Precision teleoperated drive response, calibrated analog stick mapping, autonomous routine coordination, and telemetry feedback loops.",
  },
];
