"use client";

import { useRef, useState, useEffect } from "react";
import { AnimatePresence, motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";
import { WelcomeGate } from "@/components/WelcomeGate";
import { useWelcomeDone } from "@/components/WelcomeDoneContext";
import { TypewriterStory } from "@/components/Hero/TypewriterStory";
import { ProjectsSection } from "@/components/ProjectsSection";
import { ProgressiveBlur } from "@/registry/magicui/progressive-blur";

const FADE_UP = {
  hidden: { opacity: 0, y: 14, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transitionEnd: { filter: "none" },
  },
};

// Persists through dock navigation in the same session
let storyCompletedThisLoad = false;

// Custom cinematic slow smooth scroll that gracefully brings the storymap card into view
function slowScrollToElement(element: HTMLElement, duration = 2400, offset = 40) {
  const rect = element.getBoundingClientRect();
  const targetY = Math.max(0, rect.top + window.scrollY - offset);
  const startY = window.scrollY;
  const distance = targetY - startY;
  if (Math.abs(distance) < 8) return () => {};

  const startTime = performance.now();
  let animId: number;
  let userInterrupted = false;

  const onUserInteraction = () => {
    userInterrupted = true;
    cleanup();
  };

  const cleanup = () => {
    window.removeEventListener("wheel", onUserInteraction);
    window.removeEventListener("touchstart", onUserInteraction);
    window.removeEventListener("keydown", onUserInteraction);
    cancelAnimationFrame(animId);
  };

  window.addEventListener("wheel", onUserInteraction, { passive: true });
  window.addEventListener("touchstart", onUserInteraction, { passive: true });
  window.addEventListener("keydown", onUserInteraction, { passive: true });

  // Silky smooth easeInOutCubic curve
  const easeInOutCubic = (t: number) =>
    t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

  const step = (currentTime: number) => {
    if (userInterrupted) return;
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const easeProgress = easeInOutCubic(progress);

    window.scrollTo(0, startY + distance * easeProgress);

    if (progress < 1) {
      animId = requestAnimationFrame(step);
    } else {
      cleanup();
    }
  };

  animId = requestAnimationFrame(step);
  return cleanup;
}

function HeroContent() {
  const welcomeDone = useWelcomeDone();
  const reduce = useReducedMotion() ?? false;
  const [storyComplete, setStoryComplete] = useState(
    () => storyCompletedThisLoad || reduce
  );
  const { scrollYProgress } = useScroll();
  const pb = useTransform(scrollYProgress, [0.2, 1], ["40px", "200px"]);
  const sigRef = useRef<HTMLDivElement>(null);
  const storyMapRef = useRef<HTMLDivElement>(null);
  const isFirstCompletionRef = useRef(!storyCompletedThisLoad && !reduce);

  useEffect(() => {
    if (storyComplete && isFirstCompletionRef.current) {
      isFirstCompletionRef.current = false;
      let cleanupScroll: (() => void) | undefined;
      // Start slow scroll gently once the slow reveal has begun
      const timer = setTimeout(() => {
        if (storyMapRef.current) {
          cleanupScroll = slowScrollToElement(storyMapRef.current, 2400, 40);
        }
      }, 450);

      return () => {
        clearTimeout(timer);
        cleanupScroll?.();
      };
    }
  }, [storyComplete]);

  // magnetic ink: the resting signature leans toward a nearby cursor
  const sigMagX = useMotionValue(0);
  const sigMagY = useMotionValue(0);
  const sigMagR = useMotionValue(0);
  const sigSpringX = useSpring(sigMagX, { stiffness: 150, damping: 20, mass: 0.5 });
  const sigSpringY = useSpring(sigMagY, { stiffness: 150, damping: 20, mass: 0.5 });
  const sigSpringR = useSpring(sigMagR, { stiffness: 150, damping: 20, mass: 0.5 });

  const handleSigMagnetic = (e: React.MouseEvent) => {
    const el = sigRef.current;
    if (!el || reduce) return;
    const r = el.getBoundingClientRect();
    const dx = e.clientX - (r.left + r.width / 2);
    const dy = e.clientY - (r.top + r.height / 2);
    const dist = Math.hypot(dx, dy);
    const RADIUS = 240;
    if (dist > RADIUS || dist === 0) {
      sigMagX.set(0);
      sigMagY.set(0);
      sigMagR.set(0);
      return;
    }
    const pull = 1 - dist / RADIUS;
    sigMagX.set((dx / dist) * 3 * pull);
    sigMagY.set((dy / dist) * 3 * pull);
    sigMagR.set((dx / RADIUS) * 1.2);
  };

  return (
    <div
      className="relative flex flex-1 flex-col bg-transparent text-foreground"
      onMouseMove={handleSigMagnetic}
    >
      <motion.div className="flex flex-1 flex-col items-center justify-start px-4 sm:px-6 pt-16" style={{ paddingBottom: pb }}>
        <div className="flex w-full max-w-3xl flex-col items-center text-left">
          {/* Hero text container: logo and typewriter aligned on the exact same left line */}
          <div className="flex w-full max-w-2xl flex-col items-start text-left">
            <motion.div
              id="hero-signature"
              ref={sigRef}
              className="mb-6 h-28 w-auto shrink-0 self-start"
              aria-label="Logo"
              style={{ x: sigSpringX, y: sigSpringY, rotate: sigSpringR }}
              initial={reduce ? false : { opacity: 0, y: 10 }}
              animate={
                welcomeDone
                  ? { opacity: 1, y: 0 }
                  : { opacity: 0, y: 10 }
              }
              transition={{ duration: 1.4, ease: "easeOut", delay: 0.35 }}
            >
              <img
                src="/logo-cropped.png"
                alt="Logo"
                className="h-28 w-auto object-contain select-none"
                draggable={false}
              />
            </motion.div>

            <TypewriterStory
              active={welcomeDone}
              initialComplete={storyCompletedThisLoad}
              onComplete={() => {
                storyCompletedThisLoad = true;
                setStoryComplete(true);
              }}
            />
          </div>

          <AnimatePresence>
            {storyComplete && (
              <motion.div
                ref={storyMapRef}
                key="story-map-cards"
                initial={
                  reduce
                    ? false
                    : { opacity: 0, y: 50, filter: "blur(12px)" }
                }
                animate={{
                  opacity: 1,
                  y: 0,
                  filter: "blur(0px)",
                  transitionEnd: { filter: "none" },
                }}
                exit={{ opacity: 0, y: 20 }}
                transition={{
                  duration: 2.2,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="mt-8 w-full scroll-mt-16"
              >
                <ProjectsSection />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
      {/* progressive blur at the bottom */}
      <ProgressiveBlur
        position="bottom"
        height="180px"
        className="fixed"
        blurLevels={[0.5, 1, 2, 4, 8, 16, 24, 32]}
      />
    </div>
  );
}

export default function Home() {
  return (
    <WelcomeGate>
      <HeroContent />
    </WelcomeGate>
  );
}
