"use client";

import { useRef } from "react";
import { motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";
import { WelcomeGate } from "@/components/WelcomeGate";
import { useWelcomeDone } from "@/components/WelcomeDoneContext";
import { TypewriterStory } from "@/components/Hero/TypewriterStory";
import { ProjectsSection } from "@/components/ProjectsSection";
import { ProgressiveBlur } from "@/registry/magicui/progressive-blur";

const FADE_UP = {
  hidden: { opacity: 0, y: 14, filter: "blur(6px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)" },
};

function HeroContent() {
  const welcomeDone = useWelcomeDone();
  const reduce = useReducedMotion() ?? false;
  const { scrollYProgress } = useScroll();
  const pb = useTransform(scrollYProgress, [0.2, 1], ["40px", "200px"]);
  const sigRef = useRef<HTMLDivElement>(null);

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
          <motion.div
            id="hero-signature"
            ref={sigRef}
            className="mb-6 h-28 w-auto shrink-0 self-start"
            aria-label="Logo"
            style={{ x: sigSpringX, y: sigSpringY, rotate: sigSpringR }}
            initial={reduce ? false : { opacity: 0 }}
            animate={welcomeDone ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0 }}
          >
            <img
              src="/logo-cropped.png"
              alt="Logo"
              className="h-28 w-auto object-contain select-none"
              draggable={false}
            />
          </motion.div>

          <TypewriterStory active={welcomeDone} />

          <motion.div
            variants={FADE_UP}
            initial={reduce ? false : "hidden"}
            animate={welcomeDone ? "visible" : "hidden"}
            transition={{ duration: 0.45, ease: "easeOut", delay: 0.33 }}
            className="mt-8 w-full"
          >
            <ProjectsSection />
          </motion.div>
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
