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
      <div className="flex items-baseline justify-between mb-4">
        <div>
          <h2
            className="text-[17px] font-semibold text-black dark:text-white"
            style={{ fontFamily: "var(--font-bengali), var(--font-geist-sans), sans-serif" }}
          >
            আমাদের কিছু প্রিয় মুহূর্ত
          </h2>
          <p
            className="text-[13px] text-neutral-500 dark:text-neutral-400 mt-0.5"
            style={{ fontFamily: "var(--font-bengali), var(--font-geist-sans), sans-serif" }}
          >
            প্রতিটি ছবির পেছনে জড়িয়ে আছে আমাদের ভালোবাসার এক একটি অধ্যায়
          </p>
        </div>
        <span className="text-[12px] font-mono text-neutral-400">
          {content.projects.length} Moments
        </span>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {content.projects.map((project, idx) => {
          const isWide = idx === 0 || idx === 3;
          return (
            <div
              key={project.name}
              onClick={() => setSelectedIdx(idx)}
              className={`group relative overflow-hidden rounded-xl border border-dashed border-neutral-200 bg-neutral-50/60 p-2.5 transition-all duration-300 hover:border-neutral-400 hover:bg-neutral-100/90 cursor-pointer dark:border-neutral-800/80 dark:bg-neutral-900/40 dark:hover:border-neutral-700 dark:hover:bg-neutral-900/80 shadow-sm ${
                isWide ? "sm:col-span-2" : ""
              }`}
            >
              <div
                className={`relative w-full overflow-hidden rounded-lg bg-neutral-200 dark:bg-neutral-800 ${
                  isWide ? "aspect-[16/10] sm:aspect-[21/9]" : "aspect-[4/3]"
                }`}
              >
                <img
                  src={project.image}
                  alt={`${project.name}`}
                  draggable={false}
                  className="size-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                
                {project.date && (
                  <span className="absolute top-2.5 right-2.5 rounded-full bg-black/60 px-2.5 py-0.5 text-[11px] font-medium text-white backdrop-blur-md">
                    {project.date}
                  </span>
                )}
              </div>

              <div className="flex items-center justify-between px-1.5 pt-3">
                <span
                  className="text-[15px] font-medium text-black dark:text-white"
                  style={{ fontFamily: "var(--font-bengali), var(--font-geist-sans), sans-serif" }}
                >
                  {project.name}
                </span>
                {project.location && (
                  <span
                    className="inline-flex items-center gap-1 rounded-full bg-neutral-200/70 px-2 py-0.5 text-[11px] text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300"
                    style={{ fontFamily: "var(--font-bengali), var(--font-geist-sans), sans-serif" }}
                  >
                    📍 {project.location}
                  </span>
                )}
              </div>

              <p
                className="px-1.5 pb-1 pt-1.5 text-[13px] leading-relaxed text-neutral-600 dark:text-neutral-400"
                style={{ fontFamily: "var(--font-bengali), var(--font-geist-sans), sans-serif" }}
              >
                {project.description}
              </p>
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
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md"
            onClick={() => setSelectedIdx(null)}
          >
            <motion.div
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.94, opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="relative max-h-[90vh] w-full max-w-2xl overflow-hidden rounded-2xl bg-neutral-900 border border-neutral-800 shadow-2xl text-white"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setSelectedIdx(null)}
                className="absolute top-3 right-3 z-10 flex size-9 items-center justify-center rounded-full bg-black/60 text-white/80 transition-colors hover:bg-black hover:text-white"
                aria-label="Close modal"
              >
                ✕
              </button>

              {/* Prev / Next buttons */}
              <button
                type="button"
                onClick={handlePrev}
                className="absolute left-3 top-1/2 z-10 -translate-y-1/2 flex size-9 items-center justify-center rounded-full bg-black/60 text-white/80 transition-colors hover:bg-black hover:text-white"
                aria-label="Previous image"
              >
                ‹
              </button>
              <button
                type="button"
                onClick={handleNext}
                className="absolute right-3 top-1/2 z-10 -translate-y-1/2 flex size-9 items-center justify-center rounded-full bg-black/60 text-white/80 transition-colors hover:bg-black hover:text-white"
                aria-label="Next image"
              >
                ›
              </button>

              {/* Main Image */}
              <div className="relative w-full max-h-[62vh] flex items-center justify-center bg-black/40 overflow-hidden">
                <img
                  src={content.projects[selectedIdx].image}
                  alt={content.projects[selectedIdx].name}
                  className="max-h-[62vh] w-auto object-contain select-none"
                />
              </div>

              {/* Info text */}
              <div className="p-5">
                <div className="flex items-center justify-between">
                  <h3
                    className="text-lg font-medium text-white"
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