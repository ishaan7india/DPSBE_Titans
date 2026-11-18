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

export const gameFields = [
  "GAME NAME",
  "GAME OBJECTIVE",
  "OUR STRATEGY",
  "ROBOT ROLE",
  "DRIVER ROLE",
  "HUMAN PLAYER ROLE",
];

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
