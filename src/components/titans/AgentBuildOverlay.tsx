import { useCallback, useEffect, useRef, useState } from "react";
import logoAsset from "@/assets/dpsbetitanslogo.png";
import { ArrowRight, Terminal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { soundSystem } from "@/lib/sound-effects";
import { startSwarmRebuild, stopSwarmRebuild } from "@/lib/swarm";

interface AgentBuildOverlayProps {
  onComplete: () => void;
}

const launchLines = [
  "$ boot --team 174 --season 2026",
  "> loading titan identity... OK",
  "> powering up the workshop... OK",
  "> MAKE THE JOURNEY COUNT",
];

function IntroTerminal({ onComplete }: { onComplete: () => void }) {
  const [completeLines, setCompleteLines] = useState<string[]>([]);
  const [currentLine, setCurrentLine] = useState("");
  const [exiting, setExiting] = useState(false);
  const doneRef = useRef(false);

  const handleFinish = useCallback(() => {
    if (doneRef.current) return;
    doneRef.current = true;
    setExiting(true);
    setTimeout(() => {
      onComplete();
    }, 400);
  }, [onComplete]);

  useEffect(() => {
    let cancelled = false;
    const wait = (milliseconds: number) =>
      new Promise<void>((resolve) => window.setTimeout(resolve, milliseconds));

    const runSequence = async () => {
      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reducedMotion) {
        setCompleteLines(launchLines);
        await wait(300);
        if (!cancelled) handleFinish();
        return;
      }

      const typedLines: string[] = [];
      for (const line of launchLines) {
        for (let character = 1; character <= line.length; character += 1) {
          if (cancelled) return;
          setCurrentLine(line.slice(0, character));
          if (character % 2 === 0) {
            soundSystem.playKeyChirp();
          }
          await wait(9); // Snappy terminal typing
        }
        typedLines.push(line);
        setCompleteLines([...typedLines]);
        setCurrentLine("");
        await wait(75);
      }
      await wait(350);
      if (!cancelled) handleFinish();
    };

    void runSequence();
    return () => {
      cancelled = true;
    };
  }, [handleFinish]);

  useEffect(() => {
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" || event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        handleFinish();
      }
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKey);
    };
  }, [handleFinish]);

  return (
    <div
      className={`intro-sequence ${exiting ? "intro-sequence-exiting" : ""}`}
      role="dialog"
      aria-modal="true"
      aria-label="DPSBE Titans launch sequence"
    >
      <header className="intro-sequence-header">
        <div className="intro-sequence-brand">
          <Terminal aria-hidden="true" />
          <span>DPSBE TITANS / TEAM 174</span>
        </div>
        <span>2026 SEASON / SYSTEM BOOT</span>
      </header>
      <div className="intro-sequence-center">
        <img src={logoAsset} alt="DPSBE Titans logo" />
        <p className="intro-sequence-kicker">THE JOURNEY STARTS HERE</p>
        <h1>
          MAKE THE
          <br />
          JOURNEY COUNT.
        </h1>
        <div className="intro-console" aria-live="polite">
          {completeLines.map((line, index) => (
            <p className="intro-console-line" key={`${index}-${line}`}>
              {line}
            </p>
          ))}
          {currentLine && (
            <p className="intro-console-line intro-console-current">
              {currentLine}
              <span className="intro-cursor" aria-hidden="true" />
            </p>
          )}
        </div>
      </div>
      <footer className="intro-sequence-footer">
        <span>DELHI PUBLIC SCHOOL / BANGALORE EAST</span>
        <Button variant="line" onClick={handleFinish}>
          ENTER SITE <ArrowRight aria-hidden="true" />
        </Button>
      </footer>
    </div>
  );
}

export function AgentBuildOverlay({ onComplete }: AgentBuildOverlayProps) {
  // Phase 1: "terminal" (Original terminal boot sequence)
  // Phase 2: "swarm" (Multi-agent swarm builds the live website)
  const [phase, setPhase] = useState<"terminal" | "swarm">("terminal");
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  const handleTerminalDone = useCallback(() => {
    try {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    } catch {
      // Ignore
    }
    setPhase("swarm");
  }, []);

  useEffect(() => {
    if (phase !== "swarm") return;

    // Launch swarm rebuild engine on live DOM
    startSwarmRebuild({
      onComplete: () => {
        onCompleteRef.current();
      },
    });

    return () => {
      stopSwarmRebuild(false);
    };
  }, [phase]);

  if (phase === "terminal") {
    return <IntroTerminal onComplete={handleTerminalDone} />;
  }

  // During phase === "swarm", swarm rebuild engine renders directly into its own shadow root overlay
  return null;
}
