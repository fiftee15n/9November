"use client";

import { useState, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import {
  RotateCcw,
  Sparkles,
  Layers,
  Box,
  Eye,
  Sun,
  Sunset,
  Moon,
  Maximize2,
  Minimize2,
  Compass,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import {
  TrimatrikScene,
  type TrimatrikMode,
  type TrimatrikLighting,
} from "./TrimatrikScene";

function LoadingScreen() {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 z-20 backdrop-blur-md">
      <div className="relative flex items-center justify-center">
        <div className="w-16 h-16 rounded-full border-2 border-rose-500/20 border-t-rose-400 animate-spin" />
        <div className="absolute w-8 h-8 rounded-full border-2 border-amber-400/20 border-b-amber-300 animate-spin animate-reverse" />
      </div>
      <p
        className="mt-6 text-sm text-neutral-300 font-light tracking-wide animate-pulse"
        style={{ fontFamily: "var(--font-bengali), sans-serif" }}
      >
        ত্রিমাত্রিক স্মৃতি লোড হচ্ছে…
      </p>
    </div>
  );
}

export function TrimatrikViewer() {
  const [mode, setMode] = useState<TrimatrikMode>("spatial");
  const [depthScale, setDepthScale] = useState<number>(0.65);
  const [lighting, setLighting] = useState<TrimatrikLighting>("sunset");
  const [autoRotate, setAutoRotate] = useState<boolean>(true);
  const [showParticles, setShowParticles] = useState<boolean>(true);
  const [cameraResetTrigger, setCameraResetTrigger] = useState<number>(0);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [showControls, setShowControls] = useState<boolean>(true);

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
    <div className="relative w-full h-[calc(100vh-64px)] min-h-[600px] overflow-hidden bg-[#070608] select-none">
      {/* Three.js 3D WebGL Viewport */}
      <Suspense fallback={<LoadingScreen />}>
        <Canvas
          shadows
          camera={{ position: [0, 0, 5.2], fov: 48 }}
          dpr={[1, 2]}
          gl={{
            antialias: true,
            powerPreference: "high-performance",
            alpha: false,
          }}
          className="w-full h-full cursor-grab active:cursor-grabbing"
        >
          <color attach="background" args={["#080709"]} />
          <TrimatrikScene
            mode={mode}
            depthScale={depthScale}
            lighting={lighting}
            autoRotate={autoRotate}
            showParticles={showParticles}
            cameraResetTrigger={cameraResetTrigger}
          />
        </Canvas>
      </Suspense>

      {/* Top Header Badge */}
      <div className="absolute top-4 left-4 z-20 flex flex-col gap-1 pointer-events-none">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-2.5 px-4 py-2 rounded-2xl bg-black/45 backdrop-blur-xl border border-white/10 shadow-lg pointer-events-auto"
        >
          <div className="size-2 rounded-full bg-rose-500 animate-ping" />
          <span
            className="text-sm sm:text-base font-medium text-white tracking-wide"
            style={{ fontFamily: "var(--font-bengali), sans-serif" }}
          >
            ত্রিমাত্রিক স্মৃতি
          </span>
          <span className="text-xs px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30">
            3D
          </span>
        </motion.div>
        <p
          className="text-xs text-neutral-400 font-light drop-shadow-md pl-1 hidden sm:block"
          style={{ fontFamily: "var(--font-bengali), sans-serif" }}
        >
          সূর্যাস্তের মায়াবী আলোয় তুমি আর আমি…
        </p>
      </div>

      {/* Top Right Quick Actions */}
      <div className="absolute top-4 right-4 z-20 flex items-center gap-2">
        <button
          type="button"
          onClick={() => setCameraResetTrigger((c) => c + 1)}
          title="ক্যামেরা রিসেট করুন"
          className="p-2.5 rounded-xl bg-black/45 hover:bg-black/70 backdrop-blur-xl border border-white/10 text-neutral-200 hover:text-white transition-all shadow-md active:scale-95"
        >
          <RotateCcw className="size-4" />
        </button>

        <button
          type="button"
          onClick={toggleFullscreen}
          title={isFullscreen ? "ফুলস্ক্রিন থেকে বের হন" : "ফুলস্ক্রিন করুন"}
          className="p-2.5 rounded-xl bg-black/45 hover:bg-black/70 backdrop-blur-xl border border-white/10 text-neutral-200 hover:text-white transition-all shadow-md active:scale-95 hidden sm:flex"
        >
          {isFullscreen ? (
            <Minimize2 className="size-4" />
          ) : (
            <Maximize2 className="size-4" />
          )}
        </button>

        <button
          type="button"
          onClick={() => setShowControls((s) => !s)}
          title="কন্ট্রোলস টগল করুন"
          className={`p-2.5 rounded-xl backdrop-blur-xl border transition-all shadow-md active:scale-95 ${
            showControls
              ? "bg-rose-500/25 border-rose-500/40 text-rose-200"
              : "bg-black/45 hover:bg-black/70 border-white/10 text-neutral-300"
          }`}
        >
          <Compass className="size-4" />
        </button>
      </div>

      {/* Floating Interactive HUD Controls Bar */}
      <AnimatePresence>
        {showControls && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="absolute bottom-20 sm:bottom-22 inset-x-4 max-w-2xl mx-auto z-20 pointer-events-none"
          >
            <div className="flex flex-col gap-3 p-3.5 sm:p-4 rounded-3xl bg-black/60 backdrop-blur-2xl border border-white/15 shadow-[0_20px_50px_rgba(0,0,0,0.6)] pointer-events-auto text-white">
              {/* Row 1: Mode Switcher */}
              <div className="flex items-center justify-between gap-1.5 p-1 rounded-2xl bg-white/5 border border-white/10">
                <button
                  type="button"
                  onClick={() => setMode("spatial")}
                  className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 px-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all ${
                    mode === "spatial"
                      ? "bg-gradient-to-r from-rose-500 to-amber-500 text-white shadow-md shadow-rose-500/25"
                      : "text-neutral-400 hover:text-white hover:bg-white/5"
                  }`}
                  style={{ fontFamily: "var(--font-bengali), sans-serif" }}
                >
                  <Eye className="size-3.5" />
                  <span>ত্রিমাত্রিক ডায়োরামা</span>
                </button>

                <button
                  type="button"
                  onClick={() => setMode("layered")}
                  className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 px-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all ${
                    mode === "layered"
                      ? "bg-gradient-to-r from-rose-500 to-amber-500 text-white shadow-md shadow-rose-500/25"
                      : "text-neutral-400 hover:text-white hover:bg-white/5"
                  }`}
                  style={{ fontFamily: "var(--font-bengali), sans-serif" }}
                >
                  <Layers className="size-3.5" />
                  <span>লেয়ার ভিউ</span>
                </button>

                <button
                  type="button"
                  onClick={() => setMode("wireframe")}
                  className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 px-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all ${
                    mode === "wireframe"
                      ? "bg-gradient-to-r from-rose-500 to-amber-500 text-white shadow-md shadow-rose-500/25"
                      : "text-neutral-400 hover:text-white hover:bg-white/5"
                  }`}
                  style={{ fontFamily: "var(--font-bengali), sans-serif" }}
                >
                  <Box className="size-3.5" />
                  <span>ওয়্যারফ্রেম</span>
                </button>
              </div>

              {/* Row 2: Sliders & Quick Toggles */}
              <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
                {/* Depth Extrusion Slider */}
                <div className="flex items-center gap-2.5 flex-1 min-w-[200px]">
                  <span
                    className="text-neutral-300 font-light whitespace-nowrap"
                    style={{ fontFamily: "var(--font-bengali), sans-serif" }}
                  >
                    গভীরতা (Depth):
                  </span>
                  <input
                    type="range"
                    min="0.1"
                    max="1.5"
                    step="0.05"
                    value={depthScale}
                    onChange={(e) => setDepthScale(parseFloat(e.target.value))}
                    className="flex-1 accent-rose-500 cursor-pointer h-1.5 bg-neutral-700 rounded-lg"
                  />
                  <span className="text-[11px] font-mono text-neutral-400 w-8 text-right">
                    {depthScale.toFixed(2)}x
                  </span>
                </div>

                {/* Lighting Presets */}
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => setLighting("sunset")}
                    title="স্বর্ণালী সূর্যাস্ত"
                    className={`flex items-center gap-1 px-2.5 py-1 rounded-lg border transition-all ${
                      lighting === "sunset"
                        ? "bg-amber-500/20 border-amber-500/50 text-amber-300 shadow-sm"
                        : "border-white/10 text-neutral-400 hover:text-white"
                    }`}
                  >
                    <Sunset className="size-3.5" />
                    <span className="hidden sm:inline" style={{ fontFamily: "var(--font-bengali), sans-serif" }}>
                      সূর্যাস্ত
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setLighting("twilight")}
                    title="রোমান্টিক গোধূলি"
                    className={`flex items-center gap-1 px-2.5 py-1 rounded-lg border transition-all ${
                      lighting === "twilight"
                        ? "bg-purple-500/20 border-purple-500/50 text-purple-300 shadow-sm"
                        : "border-white/10 text-neutral-400 hover:text-white"
                    }`}
                  >
                    <Moon className="size-3.5" />
                    <span className="hidden sm:inline" style={{ fontFamily: "var(--font-bengali), sans-serif" }}>
                      গোধূলি
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setLighting("afternoon")}
                    title="উজ্জ্বল অপরাহ্ন"
                    className={`flex items-center gap-1 px-2.5 py-1 rounded-lg border transition-all ${
                      lighting === "afternoon"
                        ? "bg-yellow-500/20 border-yellow-500/50 text-yellow-300 shadow-sm"
                        : "border-white/10 text-neutral-400 hover:text-white"
                    }`}
                  >
                    <Sun className="size-3.5" />
                    <span className="hidden sm:inline" style={{ fontFamily: "var(--font-bengali), sans-serif" }}>
                      অপরাহ্ন
                    </span>
                  </button>
                </div>

                {/* Toggles: Auto-rotate & Particles */}
                <div className="flex items-center gap-1.5 ml-auto">
                  <button
                    type="button"
                    onClick={() => setAutoRotate((r) => !r)}
                    title={autoRotate ? "অটো-ঘূর্ণন বন্ধ করুন" : "অটো-ঘূর্ণন চালু করুন"}
                    className={`px-2.5 py-1 rounded-lg border text-xs font-medium transition-all ${
                      autoRotate
                        ? "bg-rose-500/20 border-rose-500/40 text-rose-300"
                        : "border-white/10 text-neutral-400 hover:text-white"
                    }`}
                    style={{ fontFamily: "var(--font-bengali), sans-serif" }}
                  >
                    ঘূর্ণন {autoRotate ? "চালু" : "বন্ধ"}
                  </button>

                  <button
                    type="button"
                    onClick={() => setShowParticles((p) => !p)}
                    title="ভাসমান আলো কণা"
                    className={`p-1.5 rounded-lg border transition-all ${
                      showParticles
                        ? "bg-amber-500/20 border-amber-500/40 text-amber-300"
                        : "border-white/10 text-neutral-400 hover:text-white"
                    }`}
                  >
                    <Sparkles className="size-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Bottom Center Guidance Hint */}
      <div className="absolute bottom-6 inset-x-0 z-10 flex justify-center pointer-events-none">
        <div
          className="px-3.5 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-[11px] sm:text-xs text-neutral-400 font-light drop-shadow-md"
          style={{ fontFamily: "var(--font-bengali), sans-serif" }}
        >
          🖱️ মাউস ড্র্যাগ করে ৩ডি ঘুরে দেখুন • স্ক্রোল করে জুম করুন
        </div>
      </div>
    </div>
  );
}

export default TrimatrikViewer;
