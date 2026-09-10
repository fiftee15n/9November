"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import dynamic from "next/dynamic";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
} from "motion/react";

// Dynamic Three.js 3D Memory World canvas with SSR disabled
const MemoryWorld3D = dynamic(
  () => import("@/components/3d/MemoryWorld3D").then((mod) => mod.MemoryWorld3D),
  {
    ssr: false,
    loading: () => (
      <div className="h-[380px] w-full flex items-center justify-center animate-pulse">
        <div className="flex flex-col items-center gap-2">
          <span className="size-3 rounded-full bg-rose-500 animate-ping" />
          <span className="text-xs text-neutral-400 font-mono">৩ডি দৃশ্যপট লোড হচ্ছে...</span>
        </div>
      </div>
    ),
  }
);

interface StorySpot {
  id: string;
  step: string;
  category: string;
  title: string;
  location: string;
  date: string;
  story: string;
  image: string;
  accent: string;
  glowColor: string;
}

const STORY_SPOTS: StorySpot[] = [
  {
    id: "spot-1",
    step: "০১",
    category: "সূচনা ও প্রথম স্পর্শ",
    title: "প্রথম হাত ধরা",
    location: "ফার্মগেট",
    date: "০৯ নভেম্বর",
    story: "শহরের শত ব্যস্ততার মাঝে একটি শান্ত মুহূর্ত—প্রথমবার যখন তোমার হাতটা ধরেছিলাম, মনে হয়েছিল এই পথ যেন কখনো শেষ না হয়।",
    image: "/memories/memory-2.jpg",
    accent: "rgb(244, 63, 94)",
    glowColor: "rgba(244, 63, 94, 0.25)",
  },
  {
    id: "spot-2",
    step: "০২",
    category: "বিকেলের আলাপ ও নির্জনতা",
    title: "টিএসসির বিকেল",
    location: "টিএসসি চত্বর",
    date: "নভেম্বর ২০২৪",
    story: "গাছের ছায়ায়, ইটের বেদিতে বসে ঘণ্টার পর ঘণ্টা কথা। তোমার প্রতিটি হাসিতে হারিয়ে যাওয়া ছিল আমার সবচেয়ে প্রিয় অনুভূতি।",
    image: "/memories/memory-4.jpg",
    accent: "rgb(16, 185, 129)",
    glowColor: "rgba(16, 185, 129, 0.25)",
  },
  {
    id: "spot-3",
    step: "০৩",
    category: "স্নিগ্ধতা ও মায়ার বাঁধন",
    title: "চোখের মায়ায় হারিয়ে",
    location: "সবুজের প্রান্তর",
    date: "স্মৃতির অ্যালবাম",
    story: "খোলা বাতাসের স্নিগ্ধতা আর তোমার চোখের গভীরতা—যেখানে কোনো শব্দের প্রয়োজন ছিল না, শুধু হৃদয়ের নীরব বোঝাপড়া।",
    image: "/memories/memory-3.jpg",
    accent: "rgb(6, 182, 212)",
    glowColor: "rgba(6, 182, 212, 0.25)",
  },
  {
    id: "spot-4",
    step: "০৪",
    category: "চিরন্তন নির্ভরতা",
    title: "উষ্ণ আলিঙ্গন",
    location: "উত্তরা",
    date: "বিশেষ মুহূর্ত",
    story: "দিনের শেষে সকল ক্লান্তি ভুলে তোমার মিষ্টি সান্নিধ্যে খুঁজে পাওয়া অসীম প্রশান্তি ও আজীবন নির্ভরতার আশ্রয়।",
    image: "/memories/memory-1.jpg",
    accent: "rgb(168, 85, 247)",
    glowColor: "rgba(168, 85, 247, 0.25)",
  },
  {
    id: "spot-5",
    step: "০৫",
    category: "আমাদের পূর্ণতা",
    title: "ঐতিহ্যের আঙিনায়",
    location: "ঐতিহাসিক প্রাঙ্গণ",
    date: "আমাদের দিন",
    story: "ঐতিহ্যের রাজসিক আবহে রঙিন সাজে তুমি আর আমি। দুজনে মিলে এক নতুন স্বপ্নের সূচনা, চিরদিনের অঙ্গীকার।",
    image: "/memories/memory-5.jpg",
    accent: "rgb(245, 158, 11)",
    glowColor: "rgba(245, 158, 11, 0.25)",
  },
];

// Open, borderless, floating alive photo piece
function FloatingAlivePhoto({
  spot,
  onClick,
  index,
}: {
  spot: StorySpot;
  onClick: () => void;
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion() ?? false;

  // Real-time 3D tilt
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), {
    stiffness: 260,
    damping: 24,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), {
    stiffness: 260,
    damping: 24,
  });
  const shineX = useTransform(mouseX, [-0.5, 0.5], ["10%", "90%"]);
  const shineY = useTransform(mouseY, [-0.5, 0.5], ["10%", "90%"]);

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
      style={{ perspective: 1000 }}
      className="group relative cursor-pointer my-2"
    >
      {/* Organic Ambient Aura behind photo */}
      <div
        className="pointer-events-none absolute -inset-4 rounded-3xl opacity-0 blur-2xl transition-opacity duration-700 group-hover:opacity-100"
        style={{ background: `radial-gradient(circle, ${spot.glowColor} 0%, transparent 70%)` }}
      />

      <motion.div
        style={{
          rotateX: reduce ? 0 : rotateX,
          rotateY: reduce ? 0 : rotateY,
          transformStyle: "preserve-3d",
        }}
        whileHover={{ scale: 1.025 }}
        whileTap={{ scale: 0.98 }}
        className="relative overflow-hidden rounded-2xl shadow-xl transition-shadow duration-500 hover:shadow-2xl"
      >
        {/* Photo Image */}
        <div className="relative aspect-[4/5] w-full overflow-hidden bg-neutral-900">
          <img
            src={spot.image}
            alt={spot.title}
            draggable={false}
            className="size-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />

          {/* Dynamic Light Specular Reflection */}
          <motion.div
            style={{
              background: `radial-gradient(circle at ${shineX} ${shineY}, rgba(255,255,255,0.3) 0%, transparent 60%)`,
            }}
            className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          />

          {/* Vignette Bottom Gradient for readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

          {/* Floating Category Pill in Photo */}
          <div
            style={{ transform: "translateZ(30px)" }}
            className="absolute top-3.5 left-3.5 flex items-center gap-1.5 rounded-full bg-black/50 px-3 py-1 text-[11px] font-medium text-white shadow-md backdrop-blur-md border border-white/10"
          >
            <span
              className="inline-block size-1.5 rounded-full"
              style={{ backgroundColor: spot.accent }}
            />
            <span style={{ fontFamily: "var(--font-bengali), var(--font-geist-sans), sans-serif" }}>
              {spot.category}
            </span>
          </div>

          {/* Date Tag */}
          <div
            style={{ transform: "translateZ(30px)" }}
            className="absolute top-3.5 right-3.5 rounded-full bg-black/50 px-2.5 py-1 text-[10px] font-mono text-white/90 backdrop-blur-md border border-white/10"
          >
            {spot.date}
          </div>

          {/* Bottom Caption Overlay */}
          <div
            style={{ transform: "translateZ(25px)" }}
            className="absolute inset-x-0 bottom-0 p-4 text-white"
          >
            <div className="flex items-baseline justify-between">
              <h3
                className="text-lg font-bold tracking-tight text-white drop-shadow-md"
                style={{ fontFamily: "var(--font-bengali), var(--font-geist-sans), sans-serif" }}
              >
                {spot.title}
              </h3>
              <span
                className="text-xs text-white/90 font-medium"
                style={{ fontFamily: "var(--font-bengali), var(--font-geist-sans), sans-serif" }}
              >
                📍 {spot.location}
              </span>
            </div>
            <p
              className="mt-1 text-xs text-neutral-200 line-clamp-2 leading-relaxed"
              style={{ fontFamily: "var(--font-bengali), var(--font-geist-sans), sans-serif" }}
            >
              {spot.story}
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export function ProjectsSection() {
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [active3DSpot, setActive3DSpot] = useState<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const handlePrev = useCallback(() => {
    if (selectedIdx === null) return;
    setSelectedIdx((prev) => (prev !== null ? (prev - 1 + STORY_SPOTS.length) % STORY_SPOTS.length : 0));
  }, [selectedIdx]);

  const handleNext = useCallback(() => {
    if (selectedIdx === null) return;
    setSelectedIdx((prev) => (prev !== null ? (prev + 1) % STORY_SPOTS.length : 0));
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
    <section ref={containerRef} className="relative w-full py-8">
      {/* Section Header */}
      <div className="mb-6 text-left">
        <div className="inline-flex items-center gap-2 rounded-full border border-neutral-200/80 bg-neutral-100/70 px-3 py-1 text-xs font-medium text-neutral-700 dark:border-neutral-800 dark:bg-neutral-900/80 dark:text-neutral-300 mb-2">
          <span className="inline-block size-2 rounded-full bg-rose-500 animate-pulse" />
          <span style={{ fontFamily: "var(--font-bengali), var(--font-geist-sans), sans-serif" }}>
            আমাদের স্মৃতির পথচলা
          </span>
        </div>
        <h2
          className="text-xl sm:text-2xl font-semibold tracking-tight text-foreground"
          style={{ fontFamily: "var(--font-bengali), var(--font-geist-sans), sans-serif" }}
        >
          একটি ভালোবাসার গল্প • ৫টি মধুর অধ্যায়
        </h2>
        <p
          className="mt-1 text-sm leading-relaxed text-neutral-500 dark:text-neutral-400"
          style={{ fontFamily: "var(--font-bengali), var(--font-geist-sans), sans-serif" }}
        >
          হাত ধরে হেঁটে চলার এই অনন্ত পথ — প্রতিটি পদক্ষেপে রচিত হয়েছে আমাদের মায়াবী স্মৃতি
        </p>
      </div>

      {/* 3D Interactive World (Floating directly on the page, no enclosing box) */}
      <div className="relative mb-12">
        <MemoryWorld3D
          activeIdx={active3DSpot}
          onSelectSpot={(idx) => {
            setActive3DSpot(idx);
          }}
          onOpenLightbox={() => {
            setSelectedIdx(active3DSpot);
          }}
        />
      </div>

      {/* Walking Story Trail: Pure organic layout without boxy cards */}
      <div className="relative mt-8">
        {/* Glowing dashed trail line representing walking journey */}
        <div className="absolute left-[20px] top-6 bottom-6 w-[2px] bg-gradient-to-b from-rose-500/60 via-emerald-500/40 to-amber-500/60 border-l border-dashed border-rose-400/40" />

        {/* Story Spots */}
        <div className="space-y-12">
          {STORY_SPOTS.map((spot, idx) => (
            <div key={spot.id} className="relative flex gap-5 sm:gap-6 items-start">
              {/* Walking Milestone Indicator */}
              <div
                className="relative z-10 flex size-10 shrink-0 items-center justify-center rounded-full text-white shadow-lg transition-transform duration-300 hover:scale-110"
                style={{ backgroundColor: spot.accent }}
              >
                <span
                  className="text-xs font-bold font-mono"
                  style={{ fontFamily: "var(--font-bengali), var(--font-geist-sans), sans-serif" }}
                >
                  {spot.step}
                </span>
              </div>

              {/* Story Narrative & Floating 3D Photo */}
              <div className="flex-1">
                <div className="mb-2">
                  <span
                    className="text-[11px] font-mono tracking-wider uppercase font-semibold"
                    style={{ color: spot.accent }}
                  >
                    স্পট {spot.step} — {spot.location}
                  </span>
                  <h3
                    className="text-[17px] font-bold text-foreground mt-0.5"
                    style={{ fontFamily: "var(--font-bengali), var(--font-geist-sans), sans-serif" }}
                  >
                    {spot.category}
                  </h3>
                </div>

                {/* Floating Alive Photo */}
                <div className="max-w-[440px]">
                  <FloatingAlivePhoto
                    spot={spot}
                    index={idx}
                    onClick={() => {
                      setActive3DSpot(idx);
                      setSelectedIdx(idx);
                    }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Fullscreen Cinema Lightbox */}
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
                aria-label="Previous spot"
              >
                ‹
              </button>
              <button
                type="button"
                onClick={handleNext}
                className="absolute right-3 top-1/2 z-20 -translate-y-1/2 flex size-10 items-center justify-center rounded-full bg-black/60 text-white transition-colors hover:bg-black"
                aria-label="Next spot"
              >
                ›
              </button>

              {/* Full Image Presentation */}
              <div className="relative w-full max-h-[60vh] flex items-center justify-center bg-black/40 p-2 overflow-hidden">
                <img
                  src={STORY_SPOTS[selectedIdx].image}
                  alt={STORY_SPOTS[selectedIdx].title}
                  className="max-h-[58vh] w-auto rounded-xl object-contain shadow-2xl select-none"
                />
              </div>

              {/* Details and Story */}
              <div className="p-6 bg-neutral-900 border-t border-white/5">
                <div className="flex items-center justify-between">
                  <div>
                    <span
                      className="text-xs font-mono uppercase"
                      style={{ color: STORY_SPOTS[selectedIdx].accent }}
                    >
                      অধ্যায় {STORY_SPOTS[selectedIdx].step} • {STORY_SPOTS[selectedIdx].category}
                    </span>
                    <h3
                      className="text-xl font-bold text-white mt-1"
                      style={{ fontFamily: "var(--font-bengali), var(--font-geist-sans), sans-serif" }}
                    >
                      {STORY_SPOTS[selectedIdx].title}
                    </h3>
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className="rounded-full bg-neutral-800 px-3 py-1 text-xs text-neutral-300"
                      style={{ fontFamily: "var(--font-bengali), var(--font-geist-sans), sans-serif" }}
                    >
                      📍 {STORY_SPOTS[selectedIdx].location}
                    </span>
                  </div>
                </div>

                <p
                  className="mt-3 text-sm text-neutral-300 leading-relaxed font-light"
                  style={{ fontFamily: "var(--font-bengali), var(--font-geist-sans), sans-serif" }}
                >
                  {STORY_SPOTS[selectedIdx].story}
                </p>

                <div className="mt-4 pt-3 border-t border-neutral-800 flex items-center justify-between text-xs text-neutral-500 font-mono">
                  <span>তারিখ: {STORY_SPOTS[selectedIdx].date}</span>
                  <span>{selectedIdx + 1} of {STORY_SPOTS.length}</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}