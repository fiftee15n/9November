"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
} from "motion/react";
import {
  STORY_MILESTONES,
  OUR_STORY_HEADER,
  StoryMilestone,
} from "@/lib/ourStoryData";
import {
  StoryHeaderBanner,
  MilestoneDoodle,
  CurvingPathArrow,
} from "./MapDoodles";

// Interactive Alive Photo with 3D Tilt, Sticker Frame & Glow
function MapPhotoCard({
  milestone,
  index,
  onClick,
}: {
  milestone: StoryMilestone;
  index: number;
  onClick: () => void;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion() ?? false;

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), {
    stiffness: 250,
    damping: 25,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), {
    stiffness: 250,
    damping: 25,
  });
  const shineX = useTransform(mouseX, [-0.5, 0.5], ["0%", "100%"]);
  const shineY = useTransform(mouseY, [-0.5, 0.5], ["0%", "100%"]);

  // Slight playful rotation angle per card like a scrapbook
  const angles = [-1.5, 2, -2.5, 1.8, -1.2, 2.2, -1.8, 1.5, -2, 2.5, -1, 1.2, 0];
  const paperRotation = angles[index % angles.length];

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reduce || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{ perspective: 1100 }}
      className="group relative cursor-pointer"
    >
      {/* Colorful Floating Glow */}
      <div
        className="pointer-events-none absolute -inset-3 rounded-3xl opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-75"
        style={{ background: `radial-gradient(circle, ${milestone.accentColor}40 0%, transparent 70%)` }}
      />

      <motion.div
        style={{
          rotateX: reduce ? 0 : rotateX,
          rotateY: reduce ? 0 : rotateY,
          rotateZ: reduce ? 0 : paperRotation,
          transformStyle: "preserve-3d",
        }}
        whileHover={{ scale: 1.03, rotateZ: 0 }}
        whileTap={{ scale: 0.98 }}
        className="relative overflow-hidden rounded-2xl border-2 border-dashed border-neutral-300/80 bg-white/90 p-3 shadow-lg transition-all duration-300 hover:border-solid hover:shadow-2xl dark:border-neutral-700/80 dark:bg-neutral-900/90 dark:shadow-[0_15px_35px_rgba(0,0,0,0.5)]"
      >
        {/* Washi Tape Accent */}
        <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-12 h-3.5 bg-amber-200/70 dark:bg-amber-500/30 rounded-sm transform -rotate-2 border border-amber-300/50 shadow-xs pointer-events-none z-10" />

        {/* Photo Container */}
        {milestone.image && (
          <div className="relative aspect-[4/3] sm:aspect-[16/11] w-full overflow-hidden rounded-xl bg-neutral-100 dark:bg-neutral-800">
            <img
              src={milestone.image}
              alt={milestone.title}
              draggable={false}
              className="size-full object-cover transition-transform duration-700 ease-out group-hover:scale-106"
            />

            {/* Specular Light Reflection */}
            <motion.div
              style={{
                background: `radial-gradient(circle at ${shineX} ${shineY}, rgba(255,255,255,0.4) 0%, transparent 60%)`,
              }}
              className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            />
          </div>
        )}

        {/* Milestone Caption Area */}
        <div className="mt-3 text-left">
          <div className="flex items-center justify-between gap-1 mb-1">
            <span
              className="text-[10px] sm:text-[11px] font-bold tracking-wider font-mono uppercase px-2 py-0.5 rounded-full"
              style={{
                backgroundColor: `${milestone.accentColor}18`,
                color: milestone.accentColor,
              }}
            >
              {milestone.stepNumber} • {milestone.title}
            </span>
            <span className="text-[10px] font-mono text-neutral-400">
              {milestone.date}
            </span>
          </div>

          <h4
            className="text-[15px] font-bold text-neutral-800 dark:text-neutral-100"
            style={{ fontFamily: "var(--font-bengali), var(--font-geist-sans), sans-serif" }}
          >
            {milestone.subtitle}
          </h4>

          {milestone.location && (
            <span
              className="text-[11px] text-neutral-500 dark:text-neutral-400 block"
              style={{ fontFamily: "var(--font-bengali), var(--font-geist-sans), sans-serif" }}
            >
              📍 {milestone.location}
            </span>
          )}

          <p
            className="mt-1.5 text-[12px] leading-relaxed text-neutral-600 dark:text-neutral-300 line-clamp-2"
            style={{ fontFamily: "var(--font-bengali), var(--font-geist-sans), sans-serif" }}
          >
            {milestone.story}
          </p>
        </div>
      </motion.div>
    </div>
  );
}

export function OurStoryMap() {
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);

  const handlePrev = useCallback(() => {
    if (selectedIdx === null) return;
    setSelectedIdx((prev) => (prev !== null ? (prev - 1 + STORY_MILESTONES.length) % STORY_MILESTONES.length : 0));
  }, [selectedIdx]);

  const handleNext = useCallback(() => {
    if (selectedIdx === null) return;
    setSelectedIdx((prev) => (prev !== null ? (prev + 1) % STORY_MILESTONES.length : 0));
  }, [selectedIdx]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (selectedIdx === null) return;
      if (e.key === "Escape") setSelectedIdx(null);
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [selectedIdx, handlePrev, handleNext]);

  return (
    <div className="relative w-full max-w-4xl mx-auto py-8 px-2 sm:px-6">
      {/* Top Hand-Drawn Banner */}
      <StoryHeaderBanner
        title={OUR_STORY_HEADER.title}
        names={OUR_STORY_HEADER.coupleNames}
      />

      {/* Illustrated Roadmap Layout */}
      <div className="relative mt-8 flex flex-col space-y-6">
        {STORY_MILESTONES.map((m, idx) => {
          const isLeft = m.side === "left";
          const isRight = m.side === "right";
          const isCenter = m.side === "center";
          const nextMilestone = STORY_MILESTONES[idx + 1];

          let arrowDir: "left-to-right" | "right-to-left" | "down" = "down";
          if (nextMilestone) {
            if (isLeft && nextMilestone.side === "right") arrowDir = "left-to-right";
            else if (isRight && nextMilestone.side === "left") arrowDir = "right-to-left";
            else if (isCenter && nextMilestone.side === "right") arrowDir = "left-to-right";
            else if (isRight && nextMilestone.side === "center") arrowDir = "right-to-left";
          }

          return (
            <div key={m.id} className="relative w-full">
              {/* Milestone Container Grid */}
              <div
                className={`flex flex-col sm:flex-row items-center gap-4 ${
                  isLeft
                    ? "sm:justify-start"
                    : isRight
                    ? "sm:justify-end"
                    : "justify-center text-center"
                }`}
              >
                {/* Visual Content Block */}
                <div className="w-full sm:max-w-md">
                  {/* Floating Icon Header */}
                  <div className={`flex items-center gap-2 mb-2 ${isCenter ? "justify-center" : isRight ? "sm:justify-end" : ""}`}>
                    <div
                      className="p-2 rounded-2xl border border-dashed shadow-xs transition-transform duration-300 hover:rotate-6"
                      style={{
                        backgroundColor: `${m.accentColor}12`,
                        borderColor: m.accentColor,
                      }}
                    >
                      <MilestoneDoodle type={m.icon} color={m.accentColor} />
                    </div>
                    <div className={isCenter ? "text-center" : isRight ? "sm:text-right" : "text-left"}>
                      <span
                        className="text-xs font-black tracking-wider uppercase font-mono"
                        style={{ color: m.accentColor }}
                      >
                        {m.title}
                      </span>
                      <p className="text-[11px] text-neutral-400 font-mono">
                        {m.date}
                      </p>
                    </div>
                  </div>

                  {/* Photo Card with 3D Interaction */}
                  <MapPhotoCard
                    milestone={m}
                    index={idx}
                    onClick={() => setSelectedIdx(idx)}
                  />
                </div>
              </div>

              {/* Connecting Hand-Drawn Winding Arrow to next node */}
              {idx < STORY_MILESTONES.length - 1 && (
                <CurvingPathArrow direction={arrowDir} color={m.accentColor} />
              )}
            </div>
          );
        })}
      </div>

      {/* Wedding / Grand Finale Ribbon Footer */}
      <div className="relative mt-16 text-center">
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="inline-block p-6 rounded-3xl border-2 border-dashed border-rose-400/80 bg-gradient-to-r from-rose-50/80 via-pink-50/70 to-amber-50/80 dark:from-neutral-900 dark:via-neutral-850 dark:to-neutral-900 shadow-xl"
        >
          <div className="text-3xl mb-2">💍 ❤️ 💐</div>
          <span
            className="text-xl sm:text-2xl font-black tracking-wide text-rose-600 dark:text-rose-400"
            style={{ fontFamily: "var(--font-bengali), var(--font-geist-sans), sans-serif" }}
          >
            হাত ধরে অনন্তের পথে...
          </span>
          <p
            className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 mt-2 max-w-md mx-auto"
            style={{ fontFamily: "var(--font-bengali), var(--font-geist-sans), sans-serif" }}
          >
            আমাদের ভালোবাসার গল্প এগিয়ে চলেছে প্রতিদিন, প্রতি মুহূর্তে নতুন আলোয়
          </p>
        </motion.div>
      </div>

      {/* Fullscreen Cinema Modal */}
      <AnimatePresence>
        {selectedIdx !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-xl"
            onClick={() => setSelectedIdx(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 20, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="relative max-h-[92vh] w-full max-w-xl overflow-hidden rounded-3xl border border-white/10 bg-neutral-900 shadow-2xl text-white"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setSelectedIdx(null)}
                className="absolute top-4 right-4 z-20 flex size-9 items-center justify-center rounded-full bg-black/60 text-white/80 transition-colors hover:bg-black hover:text-white"
                aria-label="Close modal"
              >
                ✕
              </button>

              {/* Prev / Next Nav */}
              <button
                type="button"
                onClick={handlePrev}
                className="absolute left-3 top-1/2 z-20 -translate-y-1/2 flex size-10 items-center justify-center rounded-full bg-black/60 text-white transition-colors hover:bg-black"
                aria-label="Previous milestone"
              >
                ‹
              </button>
              <button
                type="button"
                onClick={handleNext}
                className="absolute right-3 top-1/2 z-20 -translate-y-1/2 flex size-10 items-center justify-center rounded-full bg-black/60 text-white transition-colors hover:bg-black"
                aria-label="Next milestone"
              >
                ›
              </button>

              {/* Full Image Presentation */}
              <div className="relative w-full max-h-[58vh] flex items-center justify-center bg-black/40 p-3 overflow-hidden">
                {STORY_MILESTONES[selectedIdx].image && (
                  <img
                    src={STORY_MILESTONES[selectedIdx].image}
                    alt={STORY_MILESTONES[selectedIdx].title}
                    className="max-h-[54vh] w-auto rounded-2xl object-contain shadow-2xl select-none"
                  />
                )}
              </div>

              {/* Details and Story */}
              <div className="p-6 bg-neutral-900 border-t border-white/5">
                <div className="flex items-center justify-between">
                  <div>
                    <span
                      className="text-xs font-mono font-bold uppercase tracking-wider"
                      style={{ color: STORY_MILESTONES[selectedIdx].accentColor }}
                    >
                      {STORY_MILESTONES[selectedIdx].stepNumber} • {STORY_MILESTONES[selectedIdx].title}
                    </span>
                    <h3
                      className="text-xl font-bold text-white mt-1"
                      style={{ fontFamily: "var(--font-bengali), var(--font-geist-sans), sans-serif" }}
                    >
                      {STORY_MILESTONES[selectedIdx].subtitle}
                    </h3>
                  </div>
                  {STORY_MILESTONES[selectedIdx].location && (
                    <span
                      className="rounded-full bg-neutral-800 px-3 py-1 text-xs text-neutral-300"
                      style={{ fontFamily: "var(--font-bengali), var(--font-geist-sans), sans-serif" }}
                    >
                      📍 {STORY_MILESTONES[selectedIdx].location}
                    </span>
                  )}
                </div>

                <p
                  className="mt-3 text-sm text-neutral-300 leading-relaxed font-light"
                  style={{ fontFamily: "var(--font-bengali), var(--font-geist-sans), sans-serif" }}
                >
                  {STORY_MILESTONES[selectedIdx].story}
                </p>

                <div className="mt-4 pt-3 border-t border-neutral-800 flex items-center justify-between text-xs text-neutral-500 font-mono">
                  <span>তারিখ: {STORY_MILESTONES[selectedIdx].date}</span>
                  <span>{selectedIdx + 1} of {STORY_MILESTONES.length}</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default OurStoryMap;
