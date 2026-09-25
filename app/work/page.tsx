"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useReducedMotion,
  useMotionValue,
  useSpring,
} from "motion/react";
import { ProgressiveBlur } from "@/registry/magicui/progressive-blur";

const HAND_HOLDING_PHOTOS = [
  { id: "hands-1", src: "/hands-holding.jpg", aspect: "aspect-[3/4]" },
  { id: "hands-2", src: "/memories/memory-2.jpg", aspect: "aspect-[3/4]" },
  { id: "hands-3", src: "/mehendi-hand.jpg", aspect: "aspect-[3/4]" },
  { id: "hands-4", src: "/follow-me-walk.jpg", aspect: "aspect-[3/4]" },
  { id: "hands-5", src: "/airport-journey.jpg", aspect: "aspect-[4/3]" },
  { id: "hands-6", src: "/diu-campus.jpg", aspect: "aspect-[4/3]" },
  { id: "hands-7", src: "/travel-luggage-hands.jpg", aspect: "aspect-[3/4]" },
  { id: "hands-8", src: "/first-hand.jpg", aspect: "aspect-square" },
  { id: "hands-9", src: "/shy-hide-face-pov.jpg", aspect: "aspect-[3/4]" },
  { id: "hands-10", src: "/memories/memory-3.jpg", aspect: "aspect-[3/4]" },
];

function AlbumPhotoCard({
  src,
  aspect,
  index,
  onClick,
}: {
  src: string;
  aspect: string;
  index: number;
  onClick: () => void;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion() ?? false;

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [6, -6]), {
    stiffness: 250,
    damping: 25,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-6, 6]), {
    stiffness: 250,
    damping: 25,
  });
  const shineX = useTransform(mouseX, [-0.5, 0.5], ["0%", "100%"]);
  const shineY = useTransform(mouseY, [-0.5, 0.5], ["0%", "100%"]);

  // Album photo resting rotation angles
  const angles = [-1.8, 1.5, -2.2, 1.8, -1.2, 2.0, -1.6, 1.4, -2.0, 1.6];
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
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 24, scale: 0.94 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.45, delay: index * 0.05, ease: "easeOut" }}
      className="break-inside-avoid mb-5 sm:mb-6"
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={onClick}
        style={{ perspective: 1000 }}
        className="group relative w-full cursor-pointer select-none"
      >
        <motion.div
          style={{
            rotateX: reduce ? 0 : rotateX,
            rotateY: reduce ? 0 : rotateY,
            rotateZ: reduce ? 0 : paperRotation,
            transformStyle: "preserve-3d",
          }}
          whileHover={{ scale: 1.03, rotateZ: 0 }}
          whileTap={{ scale: 0.98 }}
          className="relative overflow-hidden rounded-2xl border-2 border-white/80 bg-white/95 p-2.5 sm:p-3 shadow-md transition-all duration-300 hover:shadow-2xl dark:border-neutral-700/80 dark:bg-neutral-900/95 dark:shadow-[0_15px_35px_rgba(0,0,0,0.5)]"
        >
          {/* Subtle Washi Tape Accent on top */}
          <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-11 sm:w-14 h-3 sm:h-3.5 bg-amber-200/70 dark:bg-amber-500/30 rounded-xs transform -rotate-1 border border-amber-300/50 shadow-xs pointer-events-none z-10" />

          {/* Photo Frame Container - Pure photo without title or caption */}
          <div className={`relative w-full overflow-hidden rounded-xl bg-neutral-100 dark:bg-neutral-800 ${aspect}`}>
            <img
              src={src}
              alt=""
              draggable={false}
              className="size-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />

            {/* Specular Light Gleam */}
            <motion.div
              style={{
                background: `radial-gradient(circle at ${shineX} ${shineY}, rgba(255,255,255,0.4) 0%, transparent 65%)`,
              }}
              className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            />
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default function WorkPage() {
  const { scrollYProgress } = useScroll();
  const pb = useTransform(scrollYProgress, [0.2, 1], ["40px", "220px"]);
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handlePrev = useCallback(() => {
    if (selectedIdx === null) return;
    setSelectedIdx((prev) => (prev !== null ? (prev - 1 + HAND_HOLDING_PHOTOS.length) % HAND_HOLDING_PHOTOS.length : 0));
  }, [selectedIdx]);

  const handleNext = useCallback(() => {
    if (selectedIdx === null) return;
    setSelectedIdx((prev) => (prev !== null ? (prev + 1) % HAND_HOLDING_PHOTOS.length : 0));
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

  // Lock body scroll when modal is open
  useEffect(() => {
    if (selectedIdx !== null) {
      const prevOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prevOverflow;
      };
    }
  }, [selectedIdx]);

  return (
    <main className="flex flex-1 flex-col items-center justify-start bg-transparent text-foreground">
      <motion.div
        className="relative flex w-full flex-1 flex-col items-center justify-start px-3 sm:px-6 pt-10 sm:pt-14"
        style={{ paddingBottom: pb }}
      >
        {/* Album Masonry Gallery - No titles, no captions, pure photos */}
        <div className="w-full max-w-4xl columns-1 sm:columns-2 md:columns-3 gap-5 sm:gap-6">
          {HAND_HOLDING_PHOTOS.map((photo, idx) => (
            <AlbumPhotoCard
              key={photo.id}
              src={photo.src}
              aspect={photo.aspect}
              index={idx}
              onClick={() => setSelectedIdx(idx)}
            />
          ))}
        </div>
      </motion.div>

      {/* Progressive Blur at the bottom */}
      <ProgressiveBlur
        position="bottom"
        height="180px"
        className="fixed"
        blurLevels={[0.5, 1, 2, 4, 8, 16, 24, 32]}
      />

      {/* Fullscreen Photo Lightbox Modal - Portaled to document.body */}
      {mounted &&
        createPortal(
          <AnimatePresence>
            {selectedIdx !== null && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/85 p-3 sm:p-6 backdrop-blur-xl"
                onClick={() => setSelectedIdx(null)}
              >
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className="relative max-h-[92vh] max-w-3xl overflow-hidden rounded-3xl border border-white/10 bg-neutral-900/90 shadow-2xl flex items-center justify-center p-2 sm:p-3"
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* Close Button */}
                  <button
                    type="button"
                    onClick={() => setSelectedIdx(null)}
                    className="absolute top-3 right-3 z-30 flex size-9 items-center justify-center rounded-full bg-black/70 text-white/90 border border-white/10 backdrop-blur-md transition-all hover:bg-black hover:scale-105 active:scale-95 cursor-pointer"
                    aria-label="Close"
                  >
                    ✕
                  </button>

                  {/* Previous Button */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePrev();
                    }}
                    className="absolute left-2 sm:left-3 top-1/2 z-30 -translate-y-1/2 flex size-10 items-center justify-center rounded-full bg-black/70 text-white/90 border border-white/10 backdrop-blur-md transition-all hover:bg-black hover:scale-105 active:scale-95 cursor-pointer"
                    aria-label="Previous"
                  >
                    ‹
                  </button>

                  {/* Next Button */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleNext();
                    }}
                    className="absolute right-2 sm:right-3 top-1/2 z-30 -translate-y-1/2 flex size-10 items-center justify-center rounded-full bg-black/70 text-white/90 border border-white/10 backdrop-blur-md transition-all hover:bg-black hover:scale-105 active:scale-95 cursor-pointer"
                    aria-label="Next"
                  >
                    ›
                  </button>

                  {/* Full Image Display - No Title, No Caption */}
                  <div className="relative max-h-[85vh] max-w-[85vw] flex items-center justify-center overflow-hidden rounded-2xl">
                    <motion.img
                      key={selectedIdx}
                      src={HAND_HOLDING_PHOTOS[selectedIdx].src}
                      alt=""
                      initial={{ opacity: 0, scale: 0.97 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.2 }}
                      className="max-h-[82vh] w-auto max-w-full rounded-2xl object-contain shadow-2xl select-none"
                    />
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </main>
  );
}
