"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { content } from "@/lib/content";

export function ProjectsSection() {
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);

  const handlePrev = useCallback(() => {
    if (selectedIdx === null) return;
    setSelectedIdx((prev) => (prev !== null ? (prev - 1 + content.projects.length) % content.projects.length : 0));
  }, [selectedIdx]);

  const handleNext = useCallback(() => {
    if (selectedIdx === null) return;
    setSelectedIdx((prev) => (prev !== null ? (prev + 1) % content.projects.length : 0));
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
    <section className="w-full">
      <div className="flex items-center justify-between mb-3">
        <h2
          className="text-sm font-medium text-neutral-500 dark:text-neutral-400"
          style={{ fontFamily: "var(--font-bengali), var(--font-geist-sans), sans-serif" }}
        >
          স্মৃতির অ্যালবাম • <span className="text-foreground font-semibold">আমাদের মুহূর্তগুলো</span>
        </h2>
        <span className="text-[11px] font-mono text-neutral-400">
          {content.projects.length} Photos
        </span>
      </div>

      {/* Compact Photo Strip / Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
        {content.projects.map((project, idx) => {
          return (
            <div
              key={project.name}
              onClick={() => setSelectedIdx(idx)}
              className="group relative cursor-pointer overflow-hidden rounded-xl border border-neutral-200/80 bg-neutral-100/60 p-1.5 transition-all duration-300 hover:border-neutral-400 hover:shadow-md dark:border-neutral-800 dark:bg-neutral-900/60 dark:hover:border-neutral-700"
            >
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-lg bg-neutral-200 dark:bg-neutral-800">
                <img
                  src={project.image}
                  alt={project.name}
                  draggable={false}
                  className="size-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-90" />
                
                {/* Overlay Text */}
                <div className="absolute inset-x-0 bottom-0 p-2 text-white">
                  <p
                    className="text-[12px] font-medium leading-tight"
                    style={{ fontFamily: "var(--font-bengali), var(--font-geist-sans), sans-serif" }}
                  >
                    {project.name}
                  </p>
                  {project.location && (
                    <p
                      className="mt-0.5 text-[10px] text-white/70 truncate"
                      style={{ fontFamily: "var(--font-bengali), var(--font-geist-sans), sans-serif" }}
                    >
                      📍 {project.location}
                    </p>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Interactive Photo Lightbox */}
      <AnimatePresence>
        {selectedIdx !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-md"
            onClick={() => setSelectedIdx(null)}
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              className="relative max-h-[90vh] w-full max-w-lg overflow-hidden rounded-2xl bg-neutral-900 border border-neutral-800 shadow-2xl text-white"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setSelectedIdx(null)}
                className="absolute top-3 right-3 z-10 flex size-8 items-center justify-center rounded-full bg-black/60 text-white/80 transition-colors hover:bg-black hover:text-white"
                aria-label="Close modal"
              >
                ✕
              </button>

              {/* Navigation Arrows */}
              <button
                type="button"
                onClick={handlePrev}
                className="absolute left-2.5 top-1/2 z-10 -translate-y-1/2 flex size-8 items-center justify-center rounded-full bg-black/60 text-white/80 transition-colors hover:bg-black hover:text-white"
                aria-label="Previous image"
              >
                ‹
              </button>
              <button
                type="button"
                onClick={handleNext}
                className="absolute right-2.5 top-1/2 z-10 -translate-y-1/2 flex size-8 items-center justify-center rounded-full bg-black/60 text-white/80 transition-colors hover:bg-black hover:text-white"
                aria-label="Next image"
              >
                ›
              </button>

              {/* Main Image */}
              <div className="relative w-full max-h-[60vh] flex items-center justify-center bg-black/50 overflow-hidden">
                <img
                  src={content.projects[selectedIdx].image}
                  alt={content.projects[selectedIdx].name}
                  className="max-h-[60vh] w-auto object-contain select-none"
                />
              </div>

              {/* Info text */}
              <div className="p-4 bg-neutral-900">
                <div className="flex items-center justify-between">
                  <h3
                    className="text-base font-semibold text-white"
                    style={{ fontFamily: "var(--font-bengali), var(--font-geist-sans), sans-serif" }}
                  >
                    {content.projects[selectedIdx].name}
                  </h3>
                  <div className="flex items-center gap-2">
                    {content.projects[selectedIdx].location && (
                      <span
                        className="rounded-full bg-neutral-800 px-2.5 py-0.5 text-xs text-neutral-300"
                        style={{ fontFamily: "var(--font-bengali), var(--font-geist-sans), sans-serif" }}
                      >
                        📍 {content.projects[selectedIdx].location}
                      </span>
                    )}
                    <span className="text-xs font-mono text-neutral-400">
                      {selectedIdx + 1} / {content.projects.length}
                    </span>
                  </div>
                </div>
                <p
                  className="mt-2 text-sm text-neutral-300 leading-relaxed"
                  style={{ fontFamily: "var(--font-bengali), var(--font-geist-sans), sans-serif" }}
                >
                  {content.projects[selectedIdx].description}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}