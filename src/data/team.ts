import ishaanImg from "@/assets/team/ishaan.jpg";
import swastikImg from "@/assets/team/swastik.jpg";
import aarivImg from "@/assets/team/aariv.jpg";
import riditImg from "@/assets/team/ridit.jpg";
import supratikImg from "@/assets/team/supratik.jpg";
import abhinavImg from "@/assets/team/abhinav.jpg";

export type TeamMember = {
  number: string;
  name: string;
  grade: string;
  role: string;
  image?: string;
};

export const teamMembers: TeamMember[] = [
  {
    number: "01",
    name: "ISHAAN",
    grade: "GRADE 10",
    role: "CAPTAIN & DRIVE STRATEGIST",
    image: ishaanImg,
  },
  {
    number: "02",
    name: "SWASTIK PATRA K.",
    grade: "GRADE 10",
    role: "PROGRAMMING MEMBER",
    image: swastikImg,
  },
  {
    number: "03",
    name: "KUMAR AARIV",
    grade: "GRADE 9",
    role: "MECHANICAL MEMBER",
    image: aarivImg,
  },
  {
    number: "04",
    name: "RIDIT MITTAL",
    grade: "GRADE 9",
    role: "DRIVER",
    image: riditImg,
  },
  {
    number: "05",
    name: "SUPRATIK SENAPATI",
    grade: "GRADE 9",
    role: "HUMAN PLAYER",
    image: supratikImg,
  },
  {
    number: "06",
    name: "ABHINAV MUKUND",
    grade: "GRADE 8",
    role: "ELECTRONICS MEMBER",
    image: abhinavImg,
  },
];

export const arenaRoles = [
  { role: "DRIVER", name: "RIDIT MITTAL", grade: "GRADE 9" },
  { role: "HUMAN PLAYER", name: "SUPRATIK SENAPATI", grade: "GRADE 9" },
  { role: "DRIVE STRATEGIST", name: "ISHAAN", grade: "GRADE 10" },
];

export const engineeringSupport = [
  { name: "SWASTIK PATRA K.", role: "PROGRAMMING" },
  { name: "KUMAR AARIV", role: "MECHANICAL" },
  { name: "ABHINAV MUKUND", role: "ELECTRONICS" },
];
