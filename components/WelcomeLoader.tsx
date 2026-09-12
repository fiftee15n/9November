"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { EASE_OUT } from "@/lib/ease";

interface StoryMoment {
  id: string;
  type?: "normal" | "silence" | "climax";
  title?: string;
  subtitle?: string;
  footer?: string;
  duration?: number;
  bgImage?: string;
}

const STORY_MOMENTS: StoryMoment[] = [
  {
    id: "date-intro",
    title: "৯ নভেম্বর",
    subtitle: "একটা তারিখ… যে তারিখটা আমাদের হয়ে গেল।",
    duration: 4500,
  },
  {
    id: "farmgate",
    title: "ফার্মগেট",
    subtitle: "একটা সাধারণ জায়গা, যেখানে শুরু হয়েছিল অসাধারণ এক গল্প।",
    duration: 5200,
    bgImage: "/farmgate.jpg",
  },
  {
    id: "first-hand",
    title: "প্রথম হাত ধরা",
    subtitle: "সেদিন প্রথমবার তোমার হাতটা ধরেছিলাম…\nজানি না কেন, কিন্তু ছাড়তে ইচ্ছে করেনি।",
    duration: 5200,
    bgImage: "/first-hand.jpg",
  },
  {
    id: "flowers",
    title: "এক মুঠো ফুল",
    subtitle: "ছোট্ট কিছু ফুল,\nআর তার চেয়েও বড় হয়ে থাকা একটা অনুভূতি।",
    duration: 4800,
  },
  {
    id: "tsc",
    title: "টিএসসি",
    subtitle: "রিকশায় পাশাপাশি,\nশহরটা সেদিন যেন একটু ধীর হয়ে গিয়েছিল।",
    duration: 5200,
    bgImage: "/tsc.jpg",
  },
  {
    id: "missed-bus",
    title: "মিস হয়ে যাওয়া বাস",
    subtitle: "তোমার ইউনিভার্সিটির বাসটা মিস হয়ে গেল…\nআর সেই ছোট্ট ঘটনাটাই আমাদের দিনটাকে আরও দীর্ঘ করে দিল।",
    duration: 5500,
  },
  {
    id: "metro",
    title: "মেট্রোর পথে",
    subtitle: "বাস না থাক, পথ তো থেমে থাকেনি—\nআমরাও থামিনি।",
    duration: 5200,
    bgImage: "/metro.jpg",
  },
  {
    id: "uttara",
    title: "উত্তরা",
    subtitle: "অচেনা পথ, পরিচিত একজন…\nআর পাশে তুমি।",
    duration: 4800,
  },
  {
    id: "airport",
    title: "এয়ারপোর্টের পথে",
    subtitle: "আরেকটা রিকশা,\nআরও কিছু গল্প, আরও কিছুটা সময় একসাথে।",
    duration: 5200,
  },
  {
    id: "hall",
    title: "তোমার হলের সামনে",
    subtitle: "দিনটা সেখানেই শেষ হয়েছিল…\nকিন্তু আমাদের গল্পটা নয়।",
    duration: 5200,
  },
  {
    id: "silence",
    type: "silence",
    duration: 3000, // ৩ সেকেন্ডের সম্পূর্ণ নীরবতা
  },
  {
    id: "climax",
    type: "climax",
    title: "সেদিন আমরা জানতাম না…",
    subtitle: "এই ছোট্ট পথচলাই একদিন\nআমাদের সবচেয়ে সুন্দর স্মৃতিগুলোর শুরু হয়ে থাকবে।",
    footer: "৯ নভেম্বর — যেদিন থেকে “আমি” আর “তুমি”-র গল্পটা “আমরা” হয়ে গেল।",
    duration: 7000,
  },
];

type Phase = "story" | "signature" | "moving";

export function WelcomeLoader({ onComplete }: { onComplete: () => void }) {
  const reduce = useReducedMotion() ?? false;
  const [index, setIndex] = useState(0);
  const [phase, setPhase] = useState<Phase>("story");
  const [path, setPath] = useState<{
    startX: number;
    startY: number;
    endX: number;
    endY: number;
    endScale: number;
  } | null>(null);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const START_H = 140;
    const el = document.getElementById("hero-signature");
    const r = el?.getBoundingClientRect();
    const w = START_H * (745 / 873);
    setPath({
      startX: (window.innerWidth - w) / 2,
      startY: (window.innerHeight - START_H) / 2,
      endX: r ? r.left : Math.max(8, window.innerWidth / 2 - 270),
      endY: r ? r.top : 64,
      endScale: r ? r.height / START_H : 0.8,
    });
  }, []);

  const finishStory = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setPhase("signature");
  }, []);

  const nextSlide = useCallback(() => {
    setIndex((prev) => {
      if (prev < STORY_MOMENTS.length - 1) {
        return prev + 1;
      } else {
        finishStory();
        return prev;
      }
    });
  }, [finishStory]);

  const currentMoment = STORY_MOMENTS[index];
  const currentDuration = currentMoment?.duration ?? 4800;

  useEffect(() => {
    if (reduce) {
      const t = setTimeout(() => setPhase("signature"), 200);
      return () => clearTimeout(t);
    }
    if (phase !== "story") return;

    timerRef.current = setTimeout(() => {
      nextSlide();
    }, currentDuration);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [index, phase, reduce, nextSlide, currentDuration]);

  useEffect(() => {
    if (phase !== "signature") return;
    const t = setTimeout(() => setPhase("moving"), 800);
    return () => clearTimeout(t);
  }, [phase]);

  // Keyboard navigation: Space, ArrowRight, Enter advances; Escape skips
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (phase !== "story") return;
      if (e.key === " " || e.key === "ArrowRight" || e.key === "Enter") {
        e.preventDefault();
        nextSlide();
      } else if (e.key === "Escape") {
        e.preventDefault();
        finishStory();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [phase, nextSlide, finishStory]);

  const handleAnimationComplete = () => {
    if (phase === "moving") {
      onComplete();
    }
  };

  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex flex-col justify-between bg-black text-white select-none cursor-pointer overflow-hidden"
      style={{
        fontFamily: "var(--font-bengali), var(--font-geist-sans), sans-serif",
      }}
      onClick={(e) => {
        if (phase === "story") {
          e.stopPropagation();
          nextSlide();
        }
      }}
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1.0] }}
      aria-modal="true"
      role="dialog"
      aria-label="Welcome Story"
    >
      {/* Dynamic Background Photo Layer (e.g. Farmgate Sunset Painting) */}
      <AnimatePresence>
        {phase === "story" && currentMoment.bgImage && (
          <motion.div
            key={currentMoment.bgImage}
            initial={{ opacity: 0, scale: 1.08 }}
            animate={{ opacity: 1, scale: 1.0 }}
            exit={{ opacity: 0, scale: 1.04 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0 pointer-events-none z-0 overflow-hidden"
          >
            <img
              src={currentMoment.bgImage}
              alt={currentMoment.title || "Background"}
              className="size-full object-cover object-center filter brightness-[0.7] contrast-[1.05]"
            />
            {/* Cinematic Gradient Scrim to keep typography ultra crisp */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/85" />
            <div className="absolute inset-0 bg-radial from-transparent via-black/30 to-black/80" />
          </motion.div>
        )}
      </AnimatePresence>

      {phase === "story" || !path ? (
        <>
          {/* Top minimal skip button */}
          <div
            className="relative z-10 flex w-full justify-end px-6 pt-6 sm:pt-8"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={finishStory}
              className="text-xs text-neutral-600 hover:text-neutral-300 transition-colors px-3 py-1.5 rounded-full"
            >
              এড়িয়ে যান →
            </button>
          </div>

          {/* Center Story Display */}
          <div className="relative z-10 flex flex-1 items-center justify-center px-6 py-12">
            <div className="w-full max-w-3xl text-center">
              <AnimatePresence mode="wait">
                {currentMoment.type === "silence" ? (
                  /* 2-3 seconds complete silence */
                  <motion.div
                    key="silence"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.0 }}
                    className="h-24"
                  />
                ) : currentMoment.type === "climax" ? (
                  /* Final climax reflection */
                  <motion.div
                    key="climax"
                    initial={{ opacity: 0, y: 14, filter: "blur(12px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    exit={{ opacity: 0, y: -10, filter: "blur(10px)" }}
                    transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
                    className="flex flex-col items-center justify-center text-center space-y-6"
                  >
                    <h2 className="text-xl sm:text-2xl md:text-3xl font-light text-neutral-400">
                      {currentMoment.title}
                    </h2>

                    <p className="text-2xl sm:text-3xl md:text-4xl font-medium text-neutral-100 whitespace-pre-line leading-relaxed max-w-2xl">
                      {currentMoment.subtitle}
                    </p>

                    {currentMoment.footer && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.8, duration: 1.2 }}
                        className="pt-6 border-t border-neutral-800/80 mt-6 max-w-xl text-sm sm:text-base md:text-lg text-neutral-400 font-light leading-relaxed"
                      >
                        {currentMoment.footer}
                      </motion.div>
                    )}
                  </motion.div>
                ) : (
                  /* Standard story moments */
                  <motion.div
                    key={`slide-${currentMoment.id}`}
                    initial={{ opacity: 0, y: 14, filter: "blur(12px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    exit={{ opacity: 0, y: -10, filter: "blur(10px)" }}
                    transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                    className="flex flex-col items-center justify-center"
                  >
                    {/* Moment Title */}
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight text-neutral-100 leading-tight">
                      {currentMoment.title}
                    </h1>

                    {/* Moment Subtitle */}
                    {currentMoment.subtitle && (
                      <motion.p
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          delay: 0.3,
                          duration: 1.0,
                          ease: "easeOut",
                        }}
                        className="mt-4 sm:mt-5 text-lg sm:text-xl md:text-2xl font-light leading-relaxed text-neutral-300 whitespace-pre-line max-w-2xl"
                      >
                        {currentMoment.subtitle}
                      </motion.p>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Subtle footer hint */}
          <div className="relative z-10 pb-8 text-center text-xs tracking-wide text-neutral-700">
            <span>ট্যাপ অথবা ক্লিক করে এগিয়ে যান</span>
          </div>
        </>
      ) : (
        <motion.div
          key="signature"
          aria-label="Logo"
          initial={{
            opacity: 0,
            filter: "blur(8px)",
            x: path.startX,
            y: path.startY,
            scale: 1,
          }}
          animate={
            phase === "moving"
              ? {
                  opacity: 1,
                  filter: "blur(0px)",
                  x: path.endX,
                  y: path.endY,
                  scale: path.endScale,
                  transition: { duration: 0.9, ease: EASE_OUT },
                }
              : {
                  opacity: 1,
                  filter: "blur(0px)",
                  x: path.startX,
                  y: path.startY,
                  scale: 1,
                  transition: {
                    duration: 0.6,
                    ease: "easeOut",
                    filter: { duration: 0.7, ease: "easeOut" },
                  },
                }
          }
          onAnimationComplete={handleAnimationComplete}
          style={
            {
              position: "fixed",
              top: 0,
              left: 0,
              height: "140px",
              width: "auto",
              transformOrigin: "top left",
              willChange: "transform, opacity",
            } as const
          }
        >
          <img
            src="/logo-cropped.png"
            alt="Logo"
            className="h-[140px] w-auto object-contain select-none"
            draggable={false}
          />
        </motion.div>
      )}
    </motion.div>
  );
}
