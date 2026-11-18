import { useCallback, useEffect, useRef, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import logoAsset from "@/assets/dpsbetitanslogo.png";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  ChevronRight,
  Instagram,
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
import { teamMembers, arenaRoles, engineeringSupport } from "@/data/team";
import { buildStages, highlights, mediaFilters, seasonStages, stats } from "@/data/season";
import { engineeringDisciplines, gameFields, robotSpecs } from "@/data/robot";
import { Button } from "@/components/ui/button";
import { AgentBuildOverlay } from "./AgentBuildOverlay";

const instagram = "https://instagram.com/dpsbe_titans";
const youtube = "https://youtube.com/@dpsbe_titans";
const navItems = [
  ["HOME", "/"],
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
  label = "VISUAL ARCHIVE / TO BE UPDATED",
  image = detailImage,
}: {
  className?: string;
  label?: string;
  image?: string;
}) {
  return (
    <div className={`technical-visual group ${className}`}>
      <img
        src={image}
        alt="Abstract robotics engineering detail"
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
      <Link to="/" className="brand-button" aria-label="Go to home">
        <img src={logoAsset} alt="" className="brand-logo" />
        <span>
          DPSBE TITANS
          <br />
          <span className="text-primary">#174</span>
        </span>
      </Link>
      <nav className="hidden items-center gap-7 lg:flex" aria-label="Main navigation">
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
        className="nav-cta hidden lg:inline-flex"
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
          <span>2026 NRL SEASON</span>
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
            <TechnicalVisual className="aspect-[3/4]" />
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
      <SectionLabel>02 — THE TEAM</SectionLabel>
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
        <SectionLabel>03 — THE MACHINE</SectionLabel>
        <EditorialTitle lines={["MEET", "THE ROBOT."]} />
      </div>
      <div className="robot-visual mt-14">
        <img
          src={heroImage}
          alt="Replaceable abstract robot engineering visual"
          loading="lazy"
          width={1920}
          height={1080}
        />
        <div className="absolute inset-0 bg-image-overlay" />
        <p className="absolute bottom-7 left-page text-2xl font-bold">DPSBE TITANS</p>
        <p className="absolute bottom-5 right-page text-[clamp(4rem,13vw,11rem)] font-bold leading-none text-foreground/25">
          #174
        </p>
      </div>
      <div className="grid px-page sm:grid-cols-2 lg:grid-cols-4">
        {robotSpecs.map((spec) => (
          <div className="spec-cell" key={spec}>
            <span>{spec}</span>
            <strong>COMING SOON</strong>
          </div>
        ))}
      </div>
    </section>
  );
}

function Engineering() {
  return (
    <section className="section-light px-page py-section">
      <SectionLabel>ENGINEERING / 174</SectionLabel>
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
                src={detailImage}
                alt="Abstract electronics and mechanisms detail"
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
      <SectionLabel>04 — PROCESS</SectionLabel>
      <div className="grid gap-12 lg:grid-cols-[.8fr_1.2fr]">
        <EditorialTitle lines={["FROM", "IDEA", "TO", "ARENA."]} />
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
                  <p>STAGE ARCHIVE / TO BE UPDATED</p>
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
    <section id="season" className="section-light px-page py-section">
      <SectionLabel>05 — 2026 NRL</SectionLabel>
      <EditorialTitle lines={["THE", "2026", "SEASON."]} light />
      <div className="season-track">
        {seasonStages.map((stage, index) => (
          <div className="season-item" key={stage}>
            <span>0{index + 1}</span>
            <div className="season-dot" />
            <h3>{stage}</h3>
            <p>TO BE UPDATED</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function Game() {
  return (
    <section className="bg-surface px-page py-section">
      <div className="grid gap-12 lg:grid-cols-[.75fr_1.25fr]">
        <div>
          <SectionLabel>2026 NRL / TEAM #174</SectionLabel>
          <EditorialTitle lines={["THE", "GAME."]} />
        </div>
        <div className="grid border-l border-t border-border sm:grid-cols-2">
          {gameFields.map((field) => (
            <div className="game-cell" key={field}>
              <span>{field}</span>
              <strong>TO BE UPDATED</strong>
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
      <SectionLabel>06 — MATCH ROLES</SectionLabel>
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
      <SectionLabel>07 — ENGINEERING JOURNAL</SectionLabel>
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

function Media() {
  const [filter, setFilter] = useState("ALL");
  const [preview, setPreview] = useState(false);
  useEffect(() => {
    if (!preview) return;
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape") setPreview(false);
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [preview]);
  return (
    <section id="media" className="bg-background px-page py-section">
      <SectionLabel>08 — MEDIA ARCHIVE</SectionLabel>
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
      <div className="media-grid">
        <button
          type="button"
          className="media-placeholder media-tall"
          onClick={() => setPreview(true)}
        >
          <Play />
          <span>{filter} / MEDIA PLACEHOLDER</span>
        </button>
        <button type="button" className="media-placeholder" onClick={() => setPreview(true)}>
          <span>IMAGE / TO BE ADDED</span>
        </button>
        <button type="button" className="media-placeholder" onClick={() => setPreview(true)}>
          <span>VIDEO / TO BE ADDED</span>
        </button>
      </div>
      {preview && (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label="Media preview">
          <Button
            variant="icon"
            onClick={() => setPreview(false)}
            aria-label="Close media preview"
            className="absolute right-5 top-5"
          >
            <X />
          </Button>
          <TechnicalVisual
            className="aspect-video w-[min(90vw,1100px)]"
            label="MEDIA PLACEHOLDER / REAL ASSET TO BE ADDED"
            image={heroImage}
          />
        </div>
      )}
    </section>
  );
}

function Highlights() {
  return (
    <section className="section-light px-page py-section">
      <SectionLabel>09 — SEASON ARCHIVE</SectionLabel>
      <EditorialTitle lines={["THE", "HIGHLIGHTS."]} light />
      <div className="mt-14 grid border-l border-t border-ink-border md:grid-cols-2">
        {highlights.map((item, index) => (
          <div className={`highlight-item ${index === 0 ? "md:col-span-2" : ""}`} key={item}>
            <span>0{index + 1}</span>
            <h3>{item}</h3>
            <p>SEASON IN PROGRESS</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function Achievements() {
  return (
    <section className="bg-background px-page py-section">
      <SectionLabel>10 — RECORD</SectionLabel>
      <EditorialTitle lines={["WHAT", "WE'VE", "DONE."]} />
      <div className="achievement-row">
        <span>2026</span>
        <strong>SEASON IN PROGRESS</strong>
        <span>EVENT / RESULT / DESCRIPTION — TO BE UPDATED</span>
      </div>
    </section>
  );
}

function Social() {
  return (
    <section className="section-light px-page py-section">
      <SectionLabel>11 — OFFICIAL CHANNELS</SectionLabel>
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
      <InstagramEmbed />
    </section>
  );
}

function InstagramEmbed() {
  return (
    <div className="instagram-feature">
      <div>
        <SectionLabel>FROM INSTAGRAM</SectionLabel>
        <h3>@dpsbe_titans</h3>
        <p>View DPSBE Titans on Instagram</p>
        <a href={instagram} target="_blank" rel="noreferrer">
          A post shared by DPSBE Titans (@dpsbe_titans) <ArrowUpRight size={16} />
        </a>
      </div>
      <a className="instagram-profile" href={instagram} target="_blank" rel="noreferrer">
        <img src={logoAsset} alt="DPSBE Titans logo" loading="lazy" />
        <span>
          VIEW ON INSTAGRAM <ArrowUpRight size={16} />
        </span>
      </a>
    </div>
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
      <div className="grid gap-10 border-b border-border pb-10 md:grid-cols-3">
        <p className="text-2xl font-bold">
          DPSBE TITANS <span className="text-primary">#174</span>
        </p>
        <p className="text-xs leading-5 tracking-[.15em]">
          2026 NRL SEASON
          <br />
          DELHI PUBLIC SCHOOL
          <br />
          BANGALORE EAST
        </p>
        <div className="grid grid-cols-2 gap-3 text-xs font-semibold">
          {navItems.map(([label, path]) => (
            <Link to={path} key={path} className="text-left hover:text-primary">
              {label}
            </Link>
          ))}
          <a href={instagram} target="_blank" rel="noreferrer">
            INSTAGRAM
          </a>
          <a href={youtube} target="_blank" rel="noreferrer">
            YOUTUBE
          </a>
        </div>
      </div>
      <div className="flex flex-col gap-2 pt-6 text-[.65rem] font-semibold tracking-[.15em] text-muted-foreground sm:flex-row sm:justify-between">
        <span>BUILT BY THE TITANS.</span>
        <span>© 2026 DPSBE TITANS</span>
      </div>
    </footer>
  );
}

export type SitePage = "home" | "team" | "robot" | "build" | "season" | "media";

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
    window.scrollTo(0, 0);
    const nodes = document.querySelectorAll("main section, main article, .stat-block");
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
  };
  return (
    <>
      <Navbar />
      <main
        className={`${page === "home" ? "" : "inner-page"} ${
          page === "home" && introActive ? "site-building-mode" : ""
        }`}
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
