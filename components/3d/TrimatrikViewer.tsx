"use client";

import { useState, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import {
  RotateCcw,
  Sparkles,
  Sun,
  Sunset,
  Maximize2,
  Minimize2,
  Hand,
  Compass,
  Heart,
  Volume2,
  VolumeX,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { TrimatrikScene, type TrimatrikLighting } from "./TrimatrikScene";

function LoadingScreen() {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#09080c]/90 z-20 backdrop-blur-md">
      <div className="relative flex items-center justify-center">
        <div className="w-16 h-16 rounded-full border-2 border-rose-500/20 border-t-rose-400 animate-spin" />
        <div className="absolute w-8 h-8 rounded-full border-2 border-amber-400/20 border-b-amber-300 animate-spin" style={{ animationDirection: "reverse" }} />
      </div>
      <p
        className="mt-6 text-sm text-neutral-300 font-light tracking-wide animate-pulse"
        style={{ fontFamily: "var(--font-bengali), sans-serif" }}
      >
        ত্রিমাত্রিক দৃশ্য তৈরি হচ্ছে…
      </p>
    </div>
  );
}

export function TrimatrikViewer() {
  const [autoRotate, setAutoRotate] = useState<boolean>(true);
  const [showParticles, setShowParticles] = useState<boolean>(true);
  const [lighting, setLighting] = useState<TrimatrikLighting>("sunset");
  const [cameraResetTrigger, setCameraResetTrigger] = useState<number>(0);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [showInfo, setShowInfo] = useState<boolean>(true);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  return (
    <div className="relative w-full h-[calc(100vh-64px)] min-h-[640px] overflow-hidden bg-radial from-[#180e1b] via-[#0d0910] to-[#070508] select-none">
      {/* 3D WebGL Canvas (Amar Lipi stage) */}
      <Suspense fallback={<LoadingScreen />}>
        <Canvas
          shadows
          camera={{ position: [0, 0.4, 5.6], fov: 40 }}
          dpr={[1, 2]}
          gl={{
            antialias: true,
            powerPreference: "high-performance",
            alpha: true,
          }}
          className="w-full h-full cursor-grab active:cursor-grabbing"
        >
          <TrimatrikScene
            autoRotate={autoRotate}
            showParticles={showParticles}
            lighting={lighting}
            cameraResetTrigger={cameraResetTrigger}
          />
        </Canvas>
      </Suspense>

      {/* Floating Drag-to-Turn Hint Banner (Amar Lipi style) */}
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.6 }}
        className="absolute top-4 left-1/2 -translate-x-1/2 z-20 pointer-events-none"
      >
        <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/40 backdrop-blur-xl border border-white/10 text-neutral-300 text-xs shadow-lg">
          <Hand className="size-3.5 text-amber-400 animate-bounce" />
          <span style={{ fontFamily: "var(--font-bengali), sans-serif" }}>
            ৩৬০° ঘুরিয়ে দেখতে মাউস বা আঙুল দিয়ে ড্র্যাগ করুন
          </span>
        </div>
      </motion.div>

      {/* Top Right Floating Controls (Amar Lipi style) */}
      <div className="absolute top-4 right-4 z-20 flex items-center gap-2">
        {/* Auto-Spin Toggle */}
        <button
          type="button"
          onClick={() => setAutoRotate(!autoRotate)}
          className={`flex items-center gap-2 px-3 py-2 rounded-full backdrop-blur-xl text-xs font-medium transition-all shadow-lg border ${
            autoRotate
              ? "bg-rose-500/20 text-rose-200 border-rose-500/40 shadow-rose-500/10"
              : "bg-black/50 text-neutral-300 border-white/10 hover:bg-white/10"
          }`}
          title={autoRotate ? "ঘূর্ণন থামান (Pause Spin)" : "ঘূর্ণন চালু করুন (Auto Spin)"}
          style={{ fontFamily: "var(--font-bengali), sans-serif" }}
        >
          <span
            className={`size-2 rounded-full transition-colors ${
              autoRotate ? "bg-rose-400 animate-pulse" : "bg-neutral-500"
            }`}
          />
          <Compass className={`size-3.5 ${autoRotate ? "animate-spin" : ""}`} style={{ animationDuration: "8s" }} />
          <span className="hidden sm:inline">ঘূর্ণন</span>
        </button>

        {/* Falling Letters & Petals Toggle */}
        <button
          type="button"
          onClick={() => setShowParticles(!showParticles)}
          className={`p-2 sm:px-3 sm:py-2 rounded-full backdrop-blur-xl text-xs font-medium transition-all shadow-lg border flex items-center gap-1.5 ${
            showParticles
              ? "bg-amber-500/20 text-amber-200 border-amber-500/40 shadow-amber-500/10"
              : "bg-black/50 text-neutral-400 border-white/10 hover:bg-white/10"
          }`}
          title="ভাসমান লিপি ও পাপড়ি (Toggle Falling Letters & Petals)"
          style={{ fontFamily: "var(--font-bengali), sans-serif" }}
        >
          <Sparkles className="size-3.5 text-amber-400" />
          <span className="hidden sm:inline">ভাসমান লিপি</span>
        </button>

        {/* Lighting Mood Toggle */}
        <button
          type="button"
          onClick={() => setLighting(lighting === "sunset" ? "twilight" : "sunset")}
          className="p-2 sm:px-3 sm:py-2 rounded-full bg-black/50 backdrop-blur-xl text-xs font-medium text-neutral-200 border border-white/10 hover:bg-white/10 transition-all shadow-lg flex items-center gap-1.5"
          title="আলো পরিবর্তন (Toggle Sunset/Twilight)"
          style={{ fontFamily: "var(--font-bengali), sans-serif" }}
        >
          {lighting === "sunset" ? (
            <>
              <Sunset className="size-3.5 text-amber-400" />
              <span className="hidden sm:inline">সূর্যাস্ত</span>
            </>
          ) : (
            <>
              <Sun className="size-3.5 text-purple-400" />
              <span className="hidden sm:inline">গোধূলি</span>
            </>
          )}
        </button>

        {/* Reset View Button */}
        <button
          type="button"
          onClick={() => setCameraResetTrigger((c) => c + 1)}
          className="p-2 rounded-full bg-black/50 backdrop-blur-xl text-neutral-300 hover:text-white border border-white/10 hover:bg-white/10 transition-all shadow-lg"
          title="রিসেট ভিউ (Reset View)"
        >
          <RotateCcw className="size-3.5" />
        </button>

        {/* Fullscreen Button */}
        <button
          type="button"
          onClick={toggleFullscreen}
          className="p-2 rounded-full bg-black/50 backdrop-blur-xl text-neutral-300 hover:text-white border border-white/10 hover:bg-white/10 transition-all shadow-lg"
          title={isFullscreen ? "ছোট করুন" : "ফুলস্ক্রিন"}
        >
          {isFullscreen ? <Minimize2 className="size-3.5" /> : <Maximize2 className="size-3.5" />}
        </button>
      </div>

      {/* Floating Hero Info Glass Panel (Amar Lipi style) */}
      <AnimatePresence>
        {showInfo && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
            className="absolute bottom-6 left-4 sm:left-8 max-w-[calc(100vw-32px)] sm:max-w-md z-20"
          >
            <div className="relative p-5 rounded-3xl bg-black/45 backdrop-blur-2xl border border-white/15 shadow-2xl overflow-hidden">
              {/* Subtle Warm Sunset Ambient Glow inside card */}
              <div className="absolute -top-12 -right-12 w-32 h-32 rounded-full bg-rose-500/20 blur-3xl pointer-events-none" />
              <div className="absolute -bottom-8 -left-8 w-24 h-24 rounded-full bg-amber-500/15 blur-2xl pointer-events-none" />

              {/* Header Badge */}
              <div className="relative flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="size-2 rounded-full bg-rose-500 animate-ping" />
                  <span
                    className="text-xs font-medium text-rose-300 tracking-wider uppercase"
                    style={{ fontFamily: "var(--font-bengali), sans-serif" }}
                  >
                    ত্রিমাত্রিক স্মৃতি • 3D Diorama
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setShowInfo(false)}
                  className="text-xs text-neutral-400 hover:text-neutral-200 transition-colors px-1.5 py-0.5 rounded-md hover:bg-white/10"
                >
                  ✕
                </button>
              </div>

              {/* Title in Bengali */}
              <h1
                className="relative text-lg sm:text-xl font-bold text-white leading-snug drop-shadow-sm"
                style={{ fontFamily: "var(--font-bengali), sans-serif" }}
              >
                সূর্যাস্তের মায়াবী আলোয় তুমি আর আমি
              </h1>

              {/* Lede Story Text */}
              <p
                className="relative mt-2 text-xs sm:text-sm text-neutral-300 leading-relaxed font-light"
                style={{ fontFamily: "var(--font-bengali), sans-serif" }}
              >
                লেকপাড়ের বেঞ্চে সূর্যাস্তের মায়াবী আলোয় কাটানো আমাদের সেই প্রিয় বিকেল। অমর লিপির মতো জীবন্ত ত্রিমাত্রিক ভাস্কর্যে সংরক্ষিত — প্রতিটি কোণ থেকে ভালোবাসার অনুভূতি।
              </p>

              {/* Metadata Badges */}
              <div
                className="relative mt-3.5 pt-3 border-t border-white/10 flex flex-wrap items-center gap-2 text-[11px] text-neutral-400"
                style={{ fontFamily: "var(--font-bengali), sans-serif" }}
              >
                <span className="px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-neutral-300 flex items-center gap-1.5">
                  <Heart className="size-3 text-rose-400 fill-rose-400" />
                  ৯ নভেম্বর
                </span>
                <span className="px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-neutral-300">
                  লেক ভিউ ডায়েরি
                </span>
                <span className="px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300">
                  ৩৬০° ইন্টারঅ্যাক্টিভ ভিউ
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Re-open Info button when minimized */}
      {!showInfo && (
        <motion.button
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          type="button"
          onClick={() => setShowInfo(true)}
          className="absolute bottom-6 left-6 z-20 px-3.5 py-2 rounded-full bg-black/60 backdrop-blur-xl border border-white/15 text-neutral-300 hover:text-white text-xs shadow-xl flex items-center gap-2 hover:bg-white/10 transition-all"
          style={{ fontFamily: "var(--font-bengali), sans-serif" }}
        >
          <Heart className="size-3.5 text-rose-400 fill-rose-400" />
          <span>স্মৃতির বিবরণ দেখুন</span>
        </motion.button>
      )}
    </div>
  );
}

export default TrimatrikViewer;
