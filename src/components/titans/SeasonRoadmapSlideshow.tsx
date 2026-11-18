import { useState, useEffect, useCallback, useRef } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Maximize2,
  X,
  Play,
  Pause,
  Calendar,
  Target,
  CheckCircle2,
  Layers,
} from "lucide-react";
import { seasonPlanSlides, type SeasonPlanSlide } from "@/data/seasonPlan";

interface SeasonRoadmapSlideshowProps {
  initialIndex?: number;
  className?: string;
  onSlideChange?: (slide: SeasonPlanSlide) => void;
}

export function SeasonRoadmapSlideshow({
  initialIndex = 0,
  className = "",
  onSlideChange,
}: SeasonRoadmapSlideshowProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [isPlaying, setIsPlaying] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const total = seasonPlanSlides.length;
  const currentSlide = seasonPlanSlides[currentIndex];

  const goToSlide = useCallback(
    (nextIdx: number) => {
      const idx = (nextIdx + total) % total;
      setCurrentIndex(idx);
      setProgress(0);
      onSlideChange?.(seasonPlanSlides[idx]);
    },
    [total, onSlideChange],
  );

  const prevSlide = useCallback(() => goToSlide(currentIndex - 1), [currentIndex, goToSlide]);
  const nextSlide = useCallback(() => goToSlide(currentIndex + 1), [currentIndex, goToSlide]);

  // Handle Autoplay timer
  useEffect(() => {
    if (!isPlaying) {
      if (timerRef.current) clearInterval(timerRef.current);
      setProgress(0);
      return;
    }

    const intervalStep = 50; // ms
    const duration = 6000; // 6s per slide
    const increment = (intervalStep / duration) * 100;

    timerRef.current = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          nextSlide();
          return 0;
        }
        return prev + increment;
      });
    }, intervalStep);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, nextSlide]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        prevSlide();
      } else if (e.key === "ArrowRight") {
        nextSlide();
      } else if (e.key === "Escape" && lightboxOpen) {
        setLightboxOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [prevSlide, nextSlide, lightboxOpen]);

  return (
    <div
      ref={containerRef}
      className={`relative rounded-2xl border border-white/10 bg-surface/70 backdrop-blur-md overflow-hidden ${className}`}
    >
      {/* Top HUD Control Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 px-4 py-3 sm:px-6 bg-black/40">
        <div className="flex items-center gap-2.5">
          <span className="flex h-2.5 w-2.5 rounded-full bg-accent animate-pulse" />
          <span className="font-mono text-xs uppercase tracking-widest text-accent font-semibold">
            NRL 2026 SEASON PLAN
          </span>
          <span className="text-white/30">•</span>
          <span className="font-mono text-xs text-muted-foreground">
            PHASE {currentSlide.slideNumber} / 0{total}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Autoplay Toggle */}
          <button
            type="button"
            onClick={() => setIsPlaying(!isPlaying)}
            className="flex items-center gap-1.5 rounded-md border border-white/10 bg-white/5 px-2.5 py-1 text-xs font-mono text-foreground hover:bg-white/10 hover:border-accent/40 transition-colors"
            title={isPlaying ? "Pause autoplay" : "Start autoplay slideshow"}
          >
            {isPlaying ? (
              <>
                <Pause className="h-3.5 w-3.5 text-accent" />
                <span className="hidden sm:inline">PAUSE</span>
              </>
            ) : (
              <>
                <Play className="h-3.5 w-3.5 text-accent" />
                <span className="hidden sm:inline">AUTOPLAY</span>
              </>
            )}
          </button>

          {/* Fullscreen Lightbox Button */}
          <button
            type="button"
            onClick={() => setLightboxOpen(true)}
            className="flex items-center gap-1.5 rounded-md border border-white/10 bg-white/5 px-2.5 py-1 text-xs font-mono text-foreground hover:bg-white/10 hover:border-accent/40 transition-colors"
            title="Expand Fullscreen / Inspect Blueprint"
          >
            <Maximize2 className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">EXPAND</span>
          </button>

          {/* Prev / Next Buttons */}
          <div className="flex items-center border border-white/10 rounded-md overflow-hidden bg-white/5">
            <button
              type="button"
              onClick={prevSlide}
              aria-label="Previous slide"
              className="p-1.5 hover:bg-white/10 text-foreground transition-colors border-r border-white/10"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={nextSlide}
              aria-label="Next slide"
              className="p-1.5 hover:bg-white/10 text-foreground transition-colors"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Autoplay Progress Line */}
      {isPlaying && (
        <div className="h-0.5 w-full bg-white/10 overflow-hidden">
          <div
            className="h-full bg-accent transition-all duration-75 ease-linear"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}

      {/* Main Showcase Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 p-4 sm:p-6 lg:p-8 items-center">
        {/* Left Column: Interactive Poster Slide with Click to Zoom */}
        <div className="lg:col-span-5 xl:col-span-5 flex justify-center">
          <div
            onClick={() => setLightboxOpen(true)}
            className="group relative cursor-pointer overflow-hidden rounded-xl border border-white/15 bg-black/80 shadow-2xl transition-all duration-300 hover:border-accent/60 hover:shadow-accent/10 hover:shadow-2xl"
          >
            {/* Slide Poster Image */}
            <div className="relative aspect-[3/4] w-full max-w-[380px] sm:max-w-[420px] overflow-hidden">
              <img
                src={currentSlide.image}
                alt={`${currentSlide.title} - ${currentSlide.subtitle}`}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />
            </div>

            {/* Hover overlay hint */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 backdrop-blur-[2px]">
              <span className="flex items-center gap-2 rounded-full border border-accent/60 bg-black/80 px-4 py-2 font-mono text-xs uppercase tracking-wider text-accent shadow-lg">
                <Maximize2 className="h-3.5 w-3.5" />
                Click to inspect blueprint
              </span>
            </div>

            {/* Bottom status badge overlay */}
            <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs font-mono">
              <span className="rounded bg-black/80 px-2 py-0.5 text-accent border border-accent/30 backdrop-blur-sm">
                {currentSlide.phaseCode}
              </span>
              <span className="rounded bg-black/80 px-2 py-0.5 text-white/80 border border-white/10 backdrop-blur-sm">
                {currentSlide.statusBadge}
              </span>
            </div>
          </div>
        </div>

        {/* Right Column: Detailed Phase Intel & Specifications */}
        <div className="lg:col-span-7 xl:col-span-7 flex flex-col justify-between space-y-6">
          {/* Phase Header */}
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
              <span className="rounded-full bg-accent/15 px-3 py-1 font-semibold text-accent border border-accent/30">
                {currentSlide.phaseCode} • {currentSlide.phaseLabel}
              </span>
              <span className="flex items-center gap-1 text-muted-foreground">
                <Calendar className="h-3 w-3 text-accent" />
                {currentSlide.dateRange}
              </span>
            </div>

            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-foreground font-sans uppercase">
              {currentSlide.title}
            </h3>

            <p className="font-mono text-xs sm:text-sm text-accent/90 italic tracking-wide">
              "{currentSlide.subtitle}"
            </p>
          </div>

          {/* Detailed Summary */}
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
            {currentSlide.summary}
          </p>

          {/* Key Engineering Bullets */}
          <div className="space-y-2.5 rounded-xl border border-white/10 bg-black/30 p-4">
            <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-white/70 mb-1">
              <Layers className="h-3.5 w-3.5 text-accent" />
              <span>Phase Objectives & Milestones</span>
            </div>
            <ul className="space-y-2">
              {currentSlide.bulletPoints.map((point) => (
                <li
                  key={point}
                  className="flex items-start gap-2.5 text-xs sm:text-sm text-foreground/90"
                >
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-accent mt-0.5" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Key Objective Highlight */}
          <div className="flex items-center gap-3 rounded-lg border border-accent/30 bg-accent/5 px-4 py-3">
            <Target className="h-5 w-5 shrink-0 text-accent" />
            <div>
              <p className="font-mono text-[10px] uppercase tracking-widest text-accent font-semibold">
                CORE OBJECTIVE
              </p>
              <p className="font-mono text-xs sm:text-sm font-bold text-foreground">
                {currentSlide.objective}
              </p>
            </div>
          </div>

          {/* Technical Specs Grid */}
          {currentSlide.technicalSpecs && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 border-t border-white/10 pt-4">
              {currentSlide.technicalSpecs.map((spec) => (
                <div
                  key={spec.label}
                  className="rounded-md border border-white/5 bg-white/[0.02] p-2.5"
                >
                  <div className="font-mono text-[10px] uppercase text-muted-foreground">
                    {spec.label}
                  </div>
                  <div className="font-mono text-xs sm:text-sm font-semibold text-foreground truncate mt-0.5">
                    {spec.value}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Bottom Interactive Phase Step Track */}
      <div className="border-t border-white/10 bg-black/50 p-3 sm:p-4">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
          {seasonPlanSlides.map((slide, idx) => {
            const isActive = idx === currentIndex;
            return (
              <button
                key={slide.id}
                type="button"
                onClick={() => goToSlide(idx)}
                className={`group flex items-center gap-2.5 rounded-lg border p-2 text-left transition-all ${
                  isActive
                    ? "border-accent bg-accent/15 shadow-sm shadow-accent/20"
                    : "border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/10"
                }`}
              >
                {/* Micro Thumbnail */}
                <div className="relative h-10 w-8 shrink-0 overflow-hidden rounded border border-white/10 bg-black">
                  <img
                    src={slide.image}
                    alt={slide.title}
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                  {isActive && (
                    <div className="absolute inset-0 border border-accent bg-accent/10" />
                  )}
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1 font-mono text-[10px] uppercase">
                    <span className={isActive ? "text-accent font-bold" : "text-muted-foreground"}>
                      {slide.slideNumber}
                    </span>
                    <span className="text-white/20">•</span>
                    <span
                      className={`truncate ${
                        isActive ? "text-accent font-semibold" : "text-muted-foreground"
                      }`}
                    >
                      {slide.phaseCode}
                    </span>
                  </div>
                  <div
                    className={`truncate text-xs font-semibold ${
                      isActive ? "text-foreground" : "text-white/80 group-hover:text-foreground"
                    }`}
                  >
                    {slide.title}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Fullscreen Lightbox Modal */}
      {lightboxOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4 backdrop-blur-xl animate-in fade-in duration-200"
          onClick={() => setLightboxOpen(false)}
        >
          {/* Lightbox Controls */}
          <div className="absolute top-4 right-4 z-10 flex items-center gap-2">
            <span className="font-mono text-xs text-white/70 mr-2 hidden sm:inline">
              USE ← → ARROWS TO NAVIGATE • ESC TO CLOSE
            </span>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setLightboxOpen(false);
              }}
              className="rounded-full border border-white/20 bg-black/80 p-2 text-white hover:bg-white/20 transition-colors"
              aria-label="Close fullscreen"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Prev Slide in Lightbox */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              prevSlide();
            }}
            className="absolute left-4 z-10 rounded-full border border-white/20 bg-black/80 p-3 text-white hover:bg-accent hover:text-black hover:border-accent transition-all"
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>

          {/* Active Poster in High-Res */}
          <div
            className="relative max-h-[90vh] max-w-[90vw] overflow-hidden rounded-xl border border-white/20 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={currentSlide.image}
              alt={`${currentSlide.title} full poster`}
              className="max-h-[85vh] w-auto max-w-full object-contain"
            />
            {/* Overlay Caption Bar */}
            <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black via-black/80 to-transparent p-4 sm:p-6 flex flex-wrap items-center justify-between gap-3 font-mono">
              <div>
                <div className="text-accent text-xs font-semibold uppercase tracking-wider">
                  {currentSlide.phaseCode} • {currentSlide.phaseLabel}
                </div>
                <div className="text-white text-base sm:text-xl font-bold font-sans">
                  {currentSlide.title} — {currentSlide.subtitle}
                </div>
              </div>
              <div className="text-xs text-white/70 border border-white/20 px-3 py-1 rounded bg-black/60">
                SLIDE {currentSlide.slideNumber} OF 0{total}
              </div>
            </div>
          </div>

          {/* Next Slide in Lightbox */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              nextSlide();
            }}
            className="absolute right-4 z-10 rounded-full border border-white/20 bg-black/80 p-3 text-white hover:bg-accent hover:text-black hover:border-accent transition-all"
            aria-label="Next slide"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>
      )}
    </div>
  );
}
