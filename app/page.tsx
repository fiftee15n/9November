"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
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

function HeroContent() {
  const welcomeDone = useWelcomeDone();
  const reduce = useReducedMotion() ?? false;
  const { scrollYProgress } = useScroll();
  const pb = useTransform(scrollYProgress, [0.2, 1], ["40px", "200px"]);

  return (
    <div className="relative flex flex-1 flex-col bg-transparent text-foreground">
      <motion.div
        className="flex flex-1 flex-col items-center justify-start px-4 sm:px-6 pt-16 sm:pt-20"
        style={{ paddingBottom: pb }}
      >
        <div className="flex w-full max-w-3xl flex-col items-center text-left">
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
