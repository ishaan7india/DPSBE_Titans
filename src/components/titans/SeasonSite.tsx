import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Link, useRouterState } from "@tanstack/react-router";
import logoAsset from "@/assets/dpsbetitanslogo.png";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  ChevronRight,
  Film,
  Instagram,
  Maximize2,
  Menu,
  Play,
  Terminal,
  Volume2,
  VolumeX,
  X,
  Youtube,
} from "lucide-react";
import heroImage from "@/assets/titans-engineering-hero.jpg";
import detailImage from "@/assets/titans-technical-detail.jpg";
import journeyBanner from "@/assets/media/titans-journey-banner.jpg";
import posterImg from "@/assets/media/titans-team-poster.jpg";
import robotRealImg from "@/assets/media/titans-competition-robot.jpg";
import teamWorkingImg from "@/assets/media/titans-team-working.jpg";
import nrlLogo from "@/assets/nrl-logo.png";
import nrlBadge from "@/assets/nrl-logo-badge.jpg";
import { teamMembers, arenaRoles, engineeringSupport } from "@/data/team";
import {
  buildStages,
  highlights,
  mediaFilters,
  seasonHighlights,
  seasonStages,
  stats,
  type SeasonHighlightItem,
} from "@/data/season";
import {
  engineeringDisciplines,
  gameFields,
  hyperdriveGameDetails,
  kronosSpecs,
  robotSpecs,
} from "@/data/robot";
import { seasonPlanSlides } from "@/data/seasonPlan";
import { Button } from "@/components/ui/button";
import { AgentBuildOverlay } from "./AgentBuildOverlay";
import { SeasonRoadmapSlideshow } from "./SeasonRoadmapSlideshow";
import { LogoStory } from "./LogoStory";

const instagram = "https://instagram.com/dpsbe_titans";
const youtube = "https://youtube.com/@dpsbe_titans";
const navItems = [
  ["HOME", "/"],
  ["LOGO", "/logo"],
  ["TEAM", "/team"],
  ["ROBOT", "/robot"],
  ["BUILD", "/build"],
  ["SEASON", "/season"],
  ["MEDIA", "/media"],
] as const;

function SectionLabel({ children }: { children: React.ReactNode }) {
  return <p className="section-label">{children}</p>;
}

function EditorialTitle({ lines, light = false }: { lines: string[]; light?: boolean }) {
  return (
    <h2 className={`editorial-title ${light ? "text-ink" : "text-foreground"}`}>
      {lines.map((line) => (
        <span key={line}>{line}</span>
      ))}
    </h2>
  );
}

function TechnicalVisual({
  className = "",
  label = "KRONOS / 2026 MACHINE",
  image = robotRealImg,
}: {
  className?: string;
  label?: string;
  image?: string;
}) {
  return (
    <div className={`technical-visual group ${className}`}>
      <img
        src={image}
        alt="DPSBE Titans 2026 Competition Robot Kronos"
        loading="lazy"
        width={1024}
        height={1280}
      />
      <div className="visual-grid" aria-hidden="true" />
      <span className="absolute left-5 top-5 text-[0.62rem] font-semibold tracking-[0.2em] text-foreground/70">
        {label}
      </span>
      <span className="absolute bottom-5 right-5 font-mono text-xs text-primary">174 / 26</span>
    </div>
  );
}

function Navbar() {
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 48);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);
  useEffect(() => {
    setOpen(false);
  }, [pathname]);
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);
  return (
    <header className={`site-nav ${scrolled || open ? "site-nav-solid" : ""}`}>
      <div className="flex items-center gap-3 shrink-0">
        <Link to="/" className="brand-button" aria-label="Go to home">
          <img src={logoAsset} alt="" className="brand-logo" />
          <span>
            DPSBE TITANS
            <br />
            <span className="text-primary">#174</span>
          </span>
        </Link>
        <span className="hidden xl:inline-block h-6 w-px bg-white/20" />
        <div className="hidden xl:flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-2.5 py-1">
          <img
            src={nrlLogo}
            alt="National Robotics League"
            className="h-4 sm:h-5 w-auto object-contain"
          />
          <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
            2026 NRL • HYPERDRIVE
          </span>
        </div>
      </div>
      <nav
        className="hidden items-center gap-3.5 md:gap-4 xl:gap-6 2xl:gap-7 lg:flex"
        aria-label="Main navigation"
      >
        {navItems.map(([label, path]) => (
          <Link
            to={path}
            key={path}
            className={`nav-link ${pathname === path ? "nav-link-active" : ""}`}
          >
            {label}
          </Link>
        ))}
      </nav>
      <a
        href={instagram}
        target="_blank"
        rel="noreferrer"
        className="nav-cta hidden lg:inline-flex shrink-0"
      >
        INSTAGRAM <ArrowUpRight size={15} />
      </a>
      <Button
        variant="icon"
        className="lg:hidden"
        onClick={() => setOpen((value) => !value)}
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
      >
        {open ? <X /> : <Menu />}
      </Button>
      {open && (
        <div className="mobile-menu" role="dialog" aria-modal="true" aria-label="Navigation menu">
          <div className="mt-24 flex flex-col border-t border-border">
            {navItems.map(([label, path], index) => (
              <Link to={path} key={path} onClick={() => setOpen(false)} className="mobile-nav-link">
                <span>0{index + 1}</span>
                {label}
                <ChevronRight />
              </Link>
            ))}
          </div>
          <a
            href={instagram}
            target="_blank"
            rel="noreferrer"
            className="mt-auto flex items-center justify-between border-t border-border py-6 text-sm font-bold tracking-[0.14em]"
          >
            INSTAGRAM <ArrowUpRight />
          </a>
        </div>
      )}
    </header>
  );
}

function Hero() {
  return (
    <section id="home" className="hero-section">
      <img
        src={heroImage}
        alt="Abstract close-up of precision robotics engineering"
        width={1920}
        height={1080}
        className="hero-image"
      />
      <div className="hero-overlay" />
      <div className="hero-grain" aria-hidden="true" />
      <div className="thunder-strike" aria-hidden="true" />
      <img src={logoAsset} alt="" className="hero-emblem" aria-hidden="true" />
      <div className="hero-content">
        <div className="flex items-center justify-between border-b border-border pb-4 text-[0.65rem] font-semibold tracking-[0.2em]">
          <div className="flex items-center gap-2.5">
            <img
              src={nrlLogo}
              alt="National Robotics League"
              className="h-5 sm:h-6 w-auto object-contain inline-block"
            />
            <span>2026 NRL SEASON // GAME: HYPERDRIVE</span>
          </div>
          <span>TEAM / 174</span>
        </div>
        <h1 className="hero-title">
          <span>DPSBE</span>
          <span>TITANS</span>
        </h1>
        <div className="hero-number" aria-hidden="true">
          174
        </div>
        <div className="hero-footer">
          <p>
            DELHI PUBLIC SCHOOL
            <br />
            BANGALORE EAST
          </p>
          <p className="hidden sm:block">MAKE THE JOURNEY COUNT.</p>
          <a className="scroll-prompt" href="#intro">
            SCROLL TO EXPLORE <ArrowDown size={16} />
          </a>
        </div>
      </div>
    </section>
  );
}

function Intro() {
  return (
    <section id="intro" className="section-dark px-page py-section">
      <SectionLabel>01 — THE TITANS</SectionLabel>
      <div className="mt-12 grid gap-14 lg:grid-cols-[1.05fr_.95fr] lg:items-end">
        <EditorialTitle lines={["SIX", "BUILDERS.", "ONE", "ROBOT."]} />
        <div className="grid gap-8 lg:grid-cols-[.8fr_1.2fr]">
          <div className="hidden lg:block">
            <TechnicalVisual
              className="aspect-[3/4]"
              image={robotRealImg}
              label="KRONOS / 2026 MACHINE"
            />
          </div>
          <div className="space-y-6 border-t border-border pt-6 text-base leading-7 text-muted-foreground">
            <p>
              DPSBE Titans is a six-member student robotics team from Delhi Public School Bangalore
              East competing during the 2026 season.
            </p>
            <p>
              Across mechanical engineering, electronics, programming, driving, strategy and game
              play, six students come together to design, build, test and compete as one team.
            </p>
            <div className="pt-2">
              <Link
                to="/season"
                className="inline-flex items-center gap-2 rounded-md border border-accent/40 bg-accent/10 px-4 py-2 font-mono text-xs font-semibold text-accent hover:bg-accent/20 transition-colors"
              >
                <span>EXPLORE 2026 ROADMAP SLIDESHOW</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Stats() {
  return (
    <section className="border-y border-border bg-surface">
      <div className="grid grid-cols-2 px-page lg:grid-cols-5">
        {stats.map((stat, index) => (
          <div
            key={stat.label}
            className={`stat-block ${index === 4 ? "col-span-2 lg:col-span-1" : ""}`}
          >
            <strong>{stat.value}</strong>
            <span>{stat.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

function Team() {
  return (
    <section id="team" className="section-light px-page py-section">
      <SectionLabel>03 — THE TEAM</SectionLabel>
      <EditorialTitle lines={["MEET", "THE TITANS."]} light />
      <div className="mt-16 grid border-l border-t border-ink-border sm:grid-cols-2 lg:grid-cols-3">
        {teamMembers.map((member) => (
          <article key={member.name} className="team-profile group">
            <div className="profile-visual">
              {member.image ? (
                <img
                  src={member.image}
                  alt={member.name}
                  className="profile-photo"
                  loading="lazy"
                  width={640}
                  height={800}
                />
              ) : (
                <>
                  <div className="profile-scan" />
                  <span className="profile-mark">174</span>
                </>
              )}
              <span className="profile-number">{member.number}</span>
            </div>
            <div className="border-t border-ink-border pt-5">
              <div className="flex items-start justify-between gap-3">
                <h3>{member.name}</h3>
                <ArrowUpRight className="profile-arrow" />
              </div>
              <p>{member.grade}</p>
              <p className="role">{member.role}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function Mentor() {
  return (
    <section className="grid border-t border-border bg-background px-page py-16 lg:grid-cols-[.4fr_1.6fr] lg:items-end lg:py-24">
      <SectionLabel>THE MENTOR</SectionLabel>
      <div>
        <div className="mb-6 h-px w-full bg-border" />
        <h2 className="text-[clamp(2.5rem,7vw,7.5rem)] font-bold leading-[.85]">
          MS. SITALI
          <br />
          NEMA
        </h2>
        <p className="mt-6 text-xs font-semibold tracking-[0.2em] text-primary">
          MENTOR / TEAM 174
        </p>
      </div>
    </section>
  );
}

function Robot() {
  return (
    <section id="robot" className="bg-background py-section">
      <div className="px-page">
        <SectionLabel>04 — THE MACHINE: KRONOS #174</SectionLabel>
        <EditorialTitle lines={["MEET", "KRONOS."]} />
      </div>
      <div className="robot-visual mt-14">
        <img
          src={robotRealImg}
          alt="DPSBE Titans 2026 Competition Robot Kronos with custom 4WD chassis and claw"
          loading="lazy"
          width={1920}
          height={1080}
        />
        <div className="absolute inset-0 bg-image-overlay" />
        <div className="absolute bottom-7 left-page">
          <span className="font-mono text-xs font-bold tracking-[0.2em] text-primary">
            2026 COMPETITION MACHINE
          </span>
          <p className="text-3xl font-bold tracking-tight">KRONOS</p>
        </div>
        <p className="absolute bottom-5 right-page text-[clamp(4rem,13vw,11rem)] font-bold leading-none text-foreground/25">
          #174
        </p>
      </div>
      <div className="grid px-page sm:grid-cols-2 lg:grid-cols-4">
        {kronosSpecs.map((spec) => (
          <div className="spec-cell" key={spec.label}>
            <span>{spec.label}</span>
            <strong className="text-foreground">{spec.value}</strong>
            {spec.detail && (
              <span className="mt-1 font-mono text-[0.62rem] text-primary">{spec.detail}</span>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

function Engineering() {
  return (
    <section className="section-light px-page py-section">
      <SectionLabel>ENGINEERING / KRONOS #174</SectionLabel>
      <EditorialTitle lines={["BUILT", "TO WORK."]} light />
      <div className="mt-16 border-t border-ink-border">
        {engineeringDisciplines.map((item, index) => (
          <article key={item.title} className="engineering-row">
            <span className="font-mono text-sm">{item.number}</span>
            <div>
              <h3>{item.title}</h3>
              <p>{item.copy}</p>
            </div>
            <div className="engineering-glyph" aria-hidden="true">
              <span />
              <span />
              <span />
            </div>
            {index === 1 && (
              <img
                src={robotRealImg}
                alt="Kronos robot electronics, chassis and motor wiring detail"
                loading="lazy"
                width={1024}
                height={1280}
              />
            )}
          </article>
        ))}
      </div>
    </section>
  );
}

function BuildJourney() {
  const [active, setActive] = useState<number | null>(null);
  return (
    <section id="build" className="bg-background px-page py-section">
      <SectionLabel>05 — PROCESS</SectionLabel>
      <div className="grid gap-12 lg:grid-cols-[.8fr_1.2fr]">
        <div>
          <EditorialTitle lines={["FROM", "IDEA", "TO", "ARENA."]} />
          <div className="mt-8 overflow-hidden rounded-lg border border-border bg-surface">
            <img
              src={teamWorkingImg}
              alt="Titans crew prototyping and wiring in the robotics lab"
              className="aspect-video w-full object-cover transition-transform duration-500 hover:scale-105"
              loading="lazy"
              width={1280}
              height={720}
            />
            <div className="flex items-center justify-between px-4 py-2.5 font-mono text-[0.62rem] text-muted-foreground">
              <span>LAB ARCHIVE / TEAM IN ACTION</span>
              <span className="font-bold text-primary">#174</span>
            </div>
          </div>
        </div>
        <div className="border-t border-border">
          {buildStages.map((stage, index) => (
            <div key={stage} className="border-b border-border">
              <Button
                variant="filter"
                aria-expanded={active === index}
                aria-controls={`stage-panel-${index}`}
                onClick={() => setActive(active === index ? null : index)}
                className="stage-button"
              >
                <span>0{index + 1}</span>
                <strong>{stage}</strong>
                <span className="stage-symbol">{active === index ? "—" : "+"}</span>
              </Button>
              {active === index && (
                <div id={`stage-panel-${index}`} className="stage-panel">
                  <p>STAGE ARCHIVE / ACTIVE SEASON</p>
                  <span>PHOTOS · VIDEO · CAD · NOTES · TESTING · BUILD LOGS</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Season() {
  return (
    <section id="season" className="bg-background px-page py-section">
      <SectionLabel>06 — 2026 NRL ROADMAP</SectionLabel>
      <EditorialTitle lines={["THE", "2026", "SEASON."]} />

      <p className="mt-6 max-w-3xl text-sm sm:text-base text-muted-foreground leading-relaxed">
        The official competition roadmap for DPSBE Titans Team #174. Follow our complete engineering
        progression from foundational 4WD chassis fabrication to active claw manipulator kinematics,
        multi-cycle stress validation, and the NRL Regional Championship arena.
      </p>

      {/* Interactive Season Roadmap Slideshow */}
      <div className="mt-10">
        <SeasonRoadmapSlideshow />
      </div>

      {/* Structured Chronological Stages */}
      <div className="mt-16">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border pb-4">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-accent" />
            <h3 className="font-mono text-xs uppercase tracking-widest text-accent font-semibold">
              CHRONOLOGICAL TIMELINE & PHASES
            </h3>
          </div>
          <span className="font-mono text-xs text-muted-foreground">
            DPSBE TITANS #174 • 6 PHASES
          </span>
        </div>

        <div className="season-track mt-6">
          {seasonStages.map((stage) => (
            <div className="season-item" key={stage.step}>
              <span>{stage.step}</span>
              <div className="season-dot" />
              <div>
                <div className="flex flex-wrap items-center gap-2 font-mono text-[11px] text-accent">
                  <span className="font-semibold">{stage.phaseCode}</span>
                  <span className="text-white/30">•</span>
                  <span className="text-muted-foreground">{stage.dates}</span>
                </div>
                <h3 className="mt-1">{stage.name}</h3>
                <p className="mt-1">{stage.description}</p>
              </div>
              <div className="font-mono text-xs font-semibold text-accent/90 border border-accent/20 rounded px-2.5 py-1 bg-accent/5 self-start sm:self-center">
                {stage.status}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Game() {
  return (
    <section id="game" className="bg-surface px-page py-section">
      <div className="grid gap-12 lg:grid-cols-[.8fr_1.2fr] items-start">
        <div>
          <SectionLabel>2026 NRL OFFICIAL GAME / TEAM #174</SectionLabel>
          <EditorialTitle lines={["GAME:", "HYPER-", "DRIVE."]} />

          {/* Official League & Sponsors Card with NRL Logo */}
          <div className="mt-8 rounded-xl border border-white/10 bg-black/40 p-5 space-y-3">
            <div className="flex items-center gap-3">
              <img
                src={nrlLogo}
                alt="National Robotics League"
                className="h-6 w-auto object-contain"
              />
              <span className="font-mono text-xs uppercase tracking-widest text-accent font-semibold">
                REGIONAL COMPETITION
              </span>
            </div>
            <p className="font-mono text-xs text-muted-foreground leading-relaxed">
              Presented by <strong className="text-white">Amazon</strong> • Powered by{" "}
              <strong className="text-white">The Innovation Story</strong>
            </p>
            <div className="flex flex-wrap gap-2 pt-2 border-t border-white/10 font-mono text-[11px]">
              <span className="rounded bg-accent/15 px-2.5 py-1 text-accent border border-accent/30 font-semibold">
                2v2 QUAD-SQUAD FORMAT
              </span>
              <span className="rounded bg-white/5 px-2.5 py-1 text-white/80 border border-white/10">
                7-MIN MATCH CYCLES
              </span>
              <span className="rounded bg-white/5 px-2.5 py-1 text-white/80 border border-white/10">
                MAX 6 RP
              </span>
            </div>
          </div>

          <div className="mt-8 space-y-4 text-sm sm:text-base text-muted-foreground leading-relaxed">
            <p>
              In <strong className="text-foreground">HYPERDRIVE</strong>, two Squads of two teams
              each (Red Squad vs Blue Squad) face off on the arena floor. Matches are fast-paced,
              high-intensity 2v2 tactical battles where alliance teamwork dictates victory.
            </p>
            <p>
              Each match cycle lasts 7 minutes (1:00 pre-match, 2:30 live play, 3:30 field reset).
              Teams earn Match Score through Squad Specific Cores, Golden Cores, and Space Station
              docking, chasing up to 6 Ranking Points (RP) per match.
            </p>
          </div>
        </div>

        {/* Hyperdrive Tactical Specifications Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {hyperdriveGameDetails.map((field) => (
            <div
              key={field.code}
              className="rounded-xl border border-white/10 bg-black/40 p-5 flex flex-col justify-between hover:border-accent/40 transition-colors"
            >
              <div>
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-accent font-semibold">{field.code}</span>
                  {field.badge && (
                    <span className="rounded bg-white/5 px-2 py-0.5 text-[10px] text-white/70 border border-white/10">
                      {field.badge}
                    </span>
                  )}
                </div>
                <h4 className="mt-2 text-base sm:text-lg font-bold text-foreground font-sans uppercase">
                  {field.title}
                </h4>
                <div className="mt-1 font-mono text-xs font-semibold text-accent/90">
                  {field.value}
                </div>
                <p className="mt-2 text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  {field.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Arena() {
  return (
    <section className="section-dark px-page py-section">
      <SectionLabel>03.2 — MATCH ROLES</SectionLabel>
      <EditorialTitle lines={["IN THE", "ARENA."]} />
      <div className="mt-14 grid border-l border-t border-border md:grid-cols-3">
        {arenaRoles.map((person, index) => (
          <article className="arena-card" key={person.role}>
            <span>0{index + 1}</span>
            <h3>{person.role}</h3>
            <p>{person.name}</p>
            <small>{person.grade}</small>
          </article>
        ))}
      </div>
      <div className="mt-20 grid gap-8 lg:grid-cols-[.7fr_1.3fr]">
        <h3 className="text-2xl font-bold">
          ENGINEERING
          <br />& SUPPORT
        </h3>
        <div className="border-t border-border">
          {engineeringSupport.map((person) => (
            <div className="support-row" key={person.name}>
              <span>{person.name}</span>
              <span>{person.role}</span>
            </div>
          ))}
        </div>
      </div>
      <p className="mt-8 max-w-xl text-xs leading-5 text-muted-foreground">
        PRIMARY RESPONSIBILITIES ONLY. EVERY MEMBER CONTRIBUTES ACROSS THE TEAM.
      </p>
    </section>
  );
}

function BuildLog() {
  const categories = [
    "BUILD",
    "MECHANICAL",
    "ELECTRONICS",
    "PROGRAMMING",
    "TESTING",
    "STRATEGY",
    "COMPETITION",
  ];
  return (
    <section className="section-light px-page py-section">
      <SectionLabel>05.2 — ENGINEERING JOURNAL</SectionLabel>
      <EditorialTitle lines={["THE", "BUILD", "LOG."]} light />
      <div className="mt-14 flex flex-wrap gap-x-5 border-y border-ink-border py-4">
        {categories.map((category) => (
          <span
            key={category}
            className="text-[.65rem] font-semibold tracking-[.16em] text-ink-muted"
          >
            {category}
          </span>
        ))}
      </div>
      <div className="empty-editorial">
        <span>000</span>
        <div>
          <h3>COMING SOON</h3>
          <p>THE 2026 ENGINEERING JOURNAL WILL BE PUBLISHED HERE.</p>
        </div>
      </div>
    </section>
  );
}

type MediaItem = {
  id: string;
  type: "video" | "image";
  title: string;
  subtitle: string;
  badge: string;
  categories: string[];
  src: string;
  thumbnail: string;
  featured?: boolean;
};

const mediaGalleryItems: MediaItem[] = [
  {
    id: "season-roadmap-master",
    type: "image",
    title: "THE ROAD TO REGIONALS — NRL 2026 SEASON PLAN",
    subtitle: "Complete 6-phase engineering masterplan, blueprints & tournament roadmap",
    badge: "ROADMAP SLIDESHOW",
    categories: ["ALL", "ROADMAP", "COMPETITION", "BUILD", "TEAM"],
    src: seasonPlanSlides[0].image,
    thumbnail: seasonPlanSlides[0].image,
    featured: true,
  },
  {
    id: "season-reel",
    type: "video",
    title: "TITANS 2026 OFFICIAL SEASON REEL",
    subtitle: "Complete team highlights, robot action, and arena journey recap",
    badge: "OFFICIAL VIDEO",
    categories: ["ALL", "COMPETITION", "ROBOT", "TEAM", "BEHIND THE SCENES"],
    src: "/media/titans-season-video.mp4",
    thumbnail: journeyBanner,
    featured: true,
  },
  {
    id: "competition-robot-real",
    type: "image",
    title: "KRONOS — 2026 COMPETITION ROBOT",
    subtitle:
      "Custom 4WD chassis, high-torque drivetrain, central electronics bay & acrylic intake claw",
    badge: "OFFICIAL ROBOT",
    categories: ["ALL", "ROBOT", "BUILD", "COMPETITION"],
    src: robotRealImg,
    thumbnail: robotRealImg,
    featured: true,
  },
  {
    id: "team-working-session",
    type: "image",
    title: "THE TEAM AT WORK",
    subtitle: "Titans engineering crew prototyping, wiring, and programming in the lab",
    badge: "CREW AT WORK",
    categories: ["ALL", "TEAM", "BUILD", "BEHIND THE SCENES"],
    src: teamWorkingImg,
    thumbnail: teamWorkingImg,
    featured: true,
  },
  {
    id: "team-roster-poster",
    type: "image",
    title: "TITANS #174 OFFICIAL ROSTER POSTER",
    subtitle: "The 6 core engineering crew members & their tournament roles",
    badge: "TEAM ROSTER",
    categories: ["ALL", "TEAM"],
    src: posterImg,
    thumbnail: posterImg,
    featured: true,
  },
  {
    id: "journey-banner",
    type: "image",
    title: "MAKE THE JOURNEY COUNT",
    subtitle: "Official DPSBE Titans 2026 Season cyber-hud identity artwork",
    badge: "IDENTITY BANNER",
    categories: ["ALL", "BUILD", "BEHIND THE SCENES"],
    src: journeyBanner,
    thumbnail: journeyBanner,
  },
  {
    id: "titans-first-release-teaser",
    type: "video" as const,
    title: "FIRST OFFICIAL TEASER RELEASE",
    subtitle: "The original launch teaser — where the DPSBE Titans 2026 season journey began",
    badge: "FIRST POST • LAUNCH TEASER",
    categories: ["ALL", "COMPETITION", "TEAM", "BEHIND THE SCENES"],
    src: "/media/titans-first-release.mp4",
    thumbnail: journeyBanner,
    featured: false,
  },
];

function Media() {
  const [filter, setFilter] = useState("ALL");
  const [activeMedia, setActiveMedia] = useState<MediaItem | null>(null);
  const [playingVideoId, setPlayingVideoId] = useState<string | null>(null);
  const videoCardRefs = useRef<Record<string, HTMLDivElement | null>>({});

  useEffect(() => {
    if (!activeMedia) return;
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActiveMedia(null);
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [activeMedia]);

  const filteredItems =
    filter === "ALL"
      ? mediaGalleryItems
      : mediaGalleryItems.filter((item) => item.categories.includes(filter));

  const handleMediaCardClick = (item: MediaItem) => {
    if (item.type === "video") {
      // Inline playback: Start playing video right inside the card where clicked!
      setPlayingVideoId(item.id);
      // Ensure the card is smoothly centered in view
      setTimeout(() => {
        const el = videoCardRefs.current[item.id];
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "nearest" });
        }
      }, 50);
    } else {
      setActiveMedia(item);
    }
  };

  return (
    <section id="media" className="bg-background px-page py-section">
      <SectionLabel>07 — MEDIA ARCHIVE</SectionLabel>
      <EditorialTitle lines={["INSIDE", "THE TITANS."]} />
      <div className="mt-12 flex flex-wrap gap-x-5 border-y border-border py-3">
        {mediaFilters.map((item) => (
          <Button
            key={item}
            variant="filter"
            aria-pressed={filter === item}
            onClick={() => setFilter(item)}
          >
            {item}
          </Button>
        ))}
      </div>

      <div className="mt-8 flex flex-wrap items-center justify-between gap-4 rounded-xl border border-accent/30 bg-accent/5 p-4 sm:p-5">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent/20 border border-accent/40 text-accent">
            <Play className="h-5 w-5 fill-accent" />
          </div>
          <div>
            <h4 className="font-sans font-bold text-foreground text-sm sm:text-base">
              NRL 2026 Season Plan Slideshow
            </h4>
            <p className="font-mono text-xs text-muted-foreground">
              Interactive 6-phase presentation with blueprint diagrams, milestones & CAD schematics.
            </p>
          </div>
        </div>
        <Link
          to="/season"
          className="inline-flex items-center gap-2 rounded-md bg-accent px-4 py-2 font-mono text-xs font-bold text-black hover:bg-accent/90 transition-colors"
        >
          <span>VIEW FULL SLIDESHOW</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>

      <div className="media-grid mt-10">
        {filteredItems.map((item) => {
          const isVideoPlaying = item.type === "video" && playingVideoId === item.id;

          return (
            <div
              key={item.id}
              ref={(el) => {
                videoCardRefs.current[item.id] = el;
              }}
              className={`media-card ${item.featured ? "media-card-featured" : ""}`}
              onClick={() => {
                if (!isVideoPlaying) {
                  handleMediaCardClick(item);
                }
              }}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  handleMediaCardClick(item);
                }
              }}
              aria-label={`View ${item.title}`}
            >
              <div className="media-card-thumb-wrap">
                {isVideoPlaying ? (
                  <div
                    className="relative w-full h-full bg-black flex items-center justify-center"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <video
                      src={item.src}
                      controls
                      autoPlay
                      playsInline
                      className="w-full h-full object-contain bg-black"
                    />
                    <div className="absolute top-2 right-2 z-20 flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveMedia(item);
                        }}
                        className="rounded bg-black/80 hover:bg-accent hover:text-black text-white p-1.5 border border-white/20 transition-all shadow-md"
                        title="Expand to Fullscreen Modal"
                      >
                        <Maximize2 size={13} />
                      </button>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setPlayingVideoId(null);
                        }}
                        className="rounded bg-black/80 hover:bg-rose-500 hover:text-white text-white p-1.5 border border-white/20 transition-all shadow-md"
                        title="Close Player"
                      >
                        <X size={13} />
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      loading="lazy"
                      className="media-card-thumb"
                    />
                    <span className="media-card-type-tag">
                      {item.type === "video" ? (
                        <>
                          <Film size={12} className="text-primary" />
                          <span>VIDEO</span>
                        </>
                      ) : (
                        <>
                          <Maximize2 size={12} className="text-primary" />
                          <span>IMAGE</span>
                        </>
                      )}
                    </span>
                    {item.type === "video" && (
                      <div className="media-card-play-overlay">
                        <div className="media-card-play-icon">
                          <Play size={24} fill="currentColor" />
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>
              <div className="media-card-info">
                <span className="media-card-badge">{item.badge}</span>
                <h3 className="media-card-title">{item.title}</h3>
                <p className="media-card-sub">{item.subtitle}</p>
              </div>
            </div>
          );
        })}
      </div>

      {activeMedia &&
        createPortal(
          <div
            className="media-lightbox"
            role="dialog"
            aria-modal="true"
            aria-label={activeMedia.title}
            onClick={(e) => {
              if (e.target === e.currentTarget) setActiveMedia(null);
            }}
          >
            <Button
              variant="icon"
              onClick={() => setActiveMedia(null)}
              aria-label="Close media preview"
              className="absolute right-6 top-6 z-50 bg-background/80 hover:bg-background border border-border"
            >
              <X size={20} />
            </Button>

            <div className="media-lightbox-content">
              {activeMedia.type === "video" ? (
                <video
                  src={activeMedia.src}
                  controls
                  autoPlay
                  playsInline
                  className="media-lightbox-media bg-black"
                />
              ) : (
                <img
                  src={activeMedia.src}
                  alt={activeMedia.title}
                  className="media-lightbox-media bg-black"
                />
              )}
              <div className="media-lightbox-footer">
                <div>
                  <span className="font-mono text-[0.62rem] font-bold tracking-widest text-primary">
                    {activeMedia.badge}
                  </span>
                  <h4 className="text-base font-bold text-foreground sm:text-lg">
                    {activeMedia.title}
                  </h4>
                  <p className="font-mono text-xs text-muted-foreground">{activeMedia.subtitle}</p>
                </div>
                <a
                  href={activeMedia.src}
                  target="_blank"
                  rel="noreferrer"
                  download={activeMedia.type === "video" ? "titans-video.mp4" : undefined}
                  className="inline-flex items-center gap-2 rounded border border-border bg-primary px-3 py-2 font-mono text-xs font-bold text-primary-foreground transition-colors hover:bg-primary/90"
                >
                  {activeMedia.type === "video" ? "DOWNLOAD VIDEO" : "VIEW FULL SIZE"}
                  <ArrowUpRight size={14} />
                </a>
              </div>
            </div>
          </div>,
          document.body,
        )}
    </section>
  );
}

function Highlights() {
  const [selectedHighlight, setSelectedHighlight] = useState<SeasonHighlightItem | null>(null);

  return (
    <section id="highlights" className="bg-background px-page py-section">
      <SectionLabel>06.2 — SEASON ARCHIVE</SectionLabel>
      <EditorialTitle lines={["SEASON", "HIGHLIGHTS."]} />

      <p className="mt-6 max-w-2xl text-sm sm:text-base text-muted-foreground leading-relaxed">
        Key engineering milestones, prototype breakthroughs, and team moments captured across our
        NRL 2026 Hyperdrive tournament journey.
      </p>

      <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {seasonHighlights.map((item) => (
          <article
            key={item.id}
            onClick={() => setSelectedHighlight(item)}
            className="group relative cursor-pointer overflow-hidden rounded-xl border border-white/10 bg-surface/60 backdrop-blur-sm transition-all duration-300 hover:border-accent/60 hover:shadow-xl hover:shadow-accent/5 flex flex-col"
          >
            {/* Image Thumbnail */}
            <div className="relative aspect-[16/11] w-full overflow-hidden bg-black">
              <img
                src={item.image}
                alt={item.title}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 pointer-events-none" />

              {/* Number and Tag Badges */}
              <div className="absolute top-3 left-3 right-3 flex items-center justify-between font-mono text-[10px]">
                <span className="rounded bg-black/80 px-2 py-0.5 text-accent border border-accent/40 backdrop-blur-sm font-semibold">
                  {item.number} • {item.tag}
                </span>
                <span className="rounded bg-black/80 px-2 py-0.5 text-white/80 border border-white/10 backdrop-blur-sm">
                  {item.category}
                </span>
              </div>
            </div>

            {/* Content Details */}
            <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
              <div>
                <h3 className="font-sans text-base sm:text-lg font-bold text-foreground group-hover:text-accent transition-colors uppercase">
                  {item.title}
                </h3>
                <p className="font-mono text-xs text-accent/80 font-medium mt-0.5">
                  {item.subtitle}
                </p>
                <p className="text-xs sm:text-sm text-muted-foreground mt-2 leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="pt-3 border-t border-white/10 flex items-center justify-between font-mono text-[11px] text-muted-foreground group-hover:text-foreground">
                <span>INSPECT HIGHLIGHT</span>
                <Maximize2 className="h-3.5 w-3.5 text-accent" />
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Lightbox Modal for Selected Highlight */}
      {selectedHighlight && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4 backdrop-blur-xl animate-in fade-in duration-200"
          onClick={() => setSelectedHighlight(null)}
        >
          <button
            type="button"
            onClick={() => setSelectedHighlight(null)}
            className="absolute top-4 right-4 rounded-full border border-white/20 bg-black/80 p-2.5 text-white hover:bg-white/20 transition-colors"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
          <div
            className="relative max-h-[90vh] max-w-4xl overflow-hidden rounded-xl border border-white/20 bg-black shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selectedHighlight.image}
              alt={selectedHighlight.title}
              className="max-h-[70vh] w-full object-contain bg-black"
            />
            <div className="p-5 sm:p-6 bg-surface/90 border-t border-white/10">
              <div className="flex items-center gap-2 font-mono text-xs text-accent">
                <span>{selectedHighlight.number}</span>
                <span>•</span>
                <span>{selectedHighlight.category}</span>
                <span>•</span>
                <span>{selectedHighlight.tag}</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-foreground mt-1">
                {selectedHighlight.title}
              </h3>
              <p className="font-mono text-xs text-accent/90 mt-0.5">
                {selectedHighlight.subtitle}
              </p>
              <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                {selectedHighlight.description}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

function Achievements() {
  return (
    <section className="bg-surface px-page py-section">
      <SectionLabel>06.2 — TOURNAMENT CAMPAIGN</SectionLabel>
      <EditorialTitle lines={["ROAD TO", "NATIONALS."]} />

      <div className="mt-12 space-y-4">
        <div className="achievement-row">
          <span>2026</span>
          <strong>NRL REGIONAL CHAMPIONSHIP</strong>
          <span>BANGALORE EAST • 20 - 21 NOVEMBER 2026 • 2V2 HYPERDRIVE ARENA MATCHES</span>
        </div>
        <div className="achievement-row">
          <span>TARGET</span>
          <strong>TOP 8 CAPTAINS & ALLIANCES</strong>
          <span>LEADERBOARD RANKING VIA MATCH WINS & STARBURST/PATTERN/ENDGAME BONUS RP</span>
        </div>
        <div className="achievement-row">
          <span>GOAL</span>
          <strong>NATIONAL FINALS QUALIFICATION</strong>
          <span>6 ADVANCING TEAMS: 4 FINALISTS ON THE FIELD + 2 ADVANCING THROUGH AWARDS</span>
        </div>
        <div className="achievement-row">
          <span>JUDGING</span>
          <strong>TECH TITANS & DESIGN AWARDS</strong>
          <span>
            2+ PRINTED COPIES OF ENGINEERING PORTFOLIO SUBMITTED • PIT INTERVIEWS SCHEDULED
          </span>
        </div>
      </div>
    </section>
  );
}

function Social() {
  return (
    <section className="section-light px-page py-section">
      <SectionLabel>07.2 — OFFICIAL CHANNELS</SectionLabel>
      <EditorialTitle lines={["FOLLOW", "THE", "TITANS."]} light />
      <div className="mt-14 grid border-l border-t border-ink-border lg:grid-cols-2">
        <a className="social-block" href={instagram} target="_blank" rel="noreferrer">
          <Instagram />
          <span>INSTAGRAM</span>
          <h3>@dpsbe_titans</h3>
          <p>
            FOLLOW ON INSTAGRAM <ArrowUpRight />
          </p>
        </a>
        <a className="social-block" href={youtube} target="_blank" rel="noreferrer">
          <Youtube />
          <span>YOUTUBE</span>
          <h3>DPSBE TITANS</h3>
          <p>
            WATCH ON YOUTUBE <ArrowUpRight />
          </p>
        </a>
      </div>
    </section>
  );
}

function FinalCTA() {
  return (
    <section className="final-section">
      <img
        src={heroImage}
        alt="Abstract robotics engineering detail"
        loading="lazy"
        width={1920}
        height={1080}
      />
      <div className="absolute inset-0 bg-final-overlay" />
      <div className="relative z-10 px-page py-section">
        <SectionLabel>DPSBE TITANS / 2026</SectionLabel>
        <EditorialTitle lines={["SEE YOU", "IN THE", "ARENA."]} />
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-background px-page py-12">
      <div className="grid gap-10 border-b border-border pb-10 md:grid-cols-4">
        <div>
          <p className="text-2xl font-bold">
            DPSBE TITANS <span className="text-primary">#174</span>
          </p>
          <p className="mt-3 text-xs leading-5 tracking-[.15em] text-muted-foreground">
            DELHI PUBLIC SCHOOL
            <br />
            BANGALORE EAST
            <br />
            ROBOTICS SQUAD
          </p>
        </div>

        <div className="flex flex-col justify-between">
          <div className="flex items-center gap-3">
            <img
              src={nrlLogo}
              alt="National Robotics League"
              className="h-7 w-auto object-contain"
            />
          </div>
          <p className="text-xs leading-5 text-muted-foreground mt-2">
            Official Team #174
            <br />
            Game: <strong className="text-foreground">HYPERDRIVE</strong>
            <br />
            Presented by Amazon • Powered by TIS
          </p>
        </div>

        <div>
          <span className="font-mono text-[10px] uppercase tracking-widest text-accent font-semibold">
            NAVIGATION
          </span>
          <div className="grid grid-cols-2 gap-2 text-xs font-semibold mt-3">
            {navItems.map(([label, path]) => (
              <Link to={path} key={path} className="text-left hover:text-primary transition-colors">
                {label}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <span className="font-mono text-[10px] uppercase tracking-widest text-accent font-semibold">
            CONNECT
          </span>
          <div className="flex flex-col gap-2 text-xs font-semibold mt-3">
            <a
              href={instagram}
              target="_blank"
              rel="noreferrer"
              className="hover:text-primary transition-colors"
            >
              INSTAGRAM @dpsbe_titans
            </a>
            <a
              href={youtube}
              target="_blank"
              rel="noreferrer"
              className="hover:text-primary transition-colors"
            >
              YOUTUBE @dpsbe_titans
            </a>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-2 pt-6 text-[.65rem] font-semibold tracking-[.15em] text-muted-foreground sm:flex-row sm:justify-between">
        <span>BUILT BY THE TITANS • NATIONAL ROBOTICS LEAGUE 2026</span>
        <span>© 2026 DPSBE TITANS</span>
      </div>
    </footer>
  );
}

export type SitePage = "home" | "team" | "robot" | "build" | "season" | "media" | "logo";

export function SeasonSite({ page = "home" }: { page?: SitePage }) {
  const [introActive, setIntroActive] = useState(() => {
    if (page !== "home") return false;
    if (typeof window === "undefined") return true;
    try {
      return window.sessionStorage.getItem("titans-intro-seen") !== "true";
    } catch {
      return true;
    }
  });
  const [introKey, setIntroKey] = useState(0);
  const dismissStarted = useRef(false);

  const finishIntro = useCallback(() => {
    if (dismissStarted.current) return;
    dismissStarted.current = true;
    try {
      window.sessionStorage.setItem("titans-intro-seen", "true");
    } catch {
      // Continue into the site even when session storage is unavailable.
    }
    try {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    } catch {
      // Ignore
    }
    setIntroActive(false);
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    const nodes = document.querySelectorAll(
      "main section:not(:first-child), main article, .stat-block",
    );
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -20px 0px" },
    );
    nodes.forEach((node) => {
      node.classList.add("reveal-ready");
      observer.observe(node);
    });
    return () => observer.disconnect();
  }, [page]);
  const pages = {
    home: (
      <>
        <Hero />
        <Intro />
        <Stats />
        <FinalCTA />
      </>
    ),
    team: (
      <>
        <Team />
        <Mentor />
        <Arena />
      </>
    ),
    robot: (
      <>
        <Robot />
        <Engineering />
      </>
    ),
    build: (
      <>
        <BuildJourney />
        <BuildLog />
      </>
    ),
    season: (
      <>
        <Season />
        <Game />
        <Highlights />
        <Achievements />
      </>
    ),
    media: (
      <>
        <Media />
        <Social />
      </>
    ),
    logo: (
      <>
        <LogoStory />
      </>
    ),
  };
  return (
    <>
      <Navbar />
      <main
        className={`${page === "home" ? "" : "inner-page"} ${
          page === "home" && introActive ? "site-building-mode" : ""
        } tab-transition`}
        key={page}
      >
        {pages[page]}
      </main>
      <Footer />
      {page === "home" && introActive && (
        <AgentBuildOverlay key={introKey} onComplete={finishIntro} />
      )}
    </>
  );
}
