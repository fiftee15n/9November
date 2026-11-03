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
import { useMediaQuery, useMounted } from "@/lib/hooks/use-mounted";

const HAND_HOLDING_PHOTOS = [
  { id: "story-8", src: "/airport-journey.jpg", aspect: "aspect-[4/3]" },
  { id: "story-13", src: "/follow-me-walk.jpg", aspect: "aspect-[3/4]" },
  { id: "story-14", src: "/mehendi-hand.jpg", aspect: "aspect-[3/4]" },
  { id: "story-16", src: "/daisy-rose-bouquet.jpg", aspect: "aspect-square" },
  { id: "story-23", src: "/bamboo-gazebo.jpg", aspect: "aspect-[4/3]" },
  { id: "story-25", src: "/diu-campus.jpg", aspect: "aspect-[4/3]" },
  { id: "story-27", src: "/travel-luggage-hands.jpg", aspect: "aspect-[3/4]" },
  { id: "story-30", src: "/shy-hide-face-pov.jpg", aspect: "aspect-[3/4]" },
  { id: "story-32", src: "/campus-walk-together.jpg", aspect: "aspect-[3/4]" },
  { id: "story-47", src: "/shared-backpack-walk.jpg", aspect: "aspect-[4/3]" },
  { id: "story-48", src: "/mehendi-ring-hands.jpg", aspect: "aspect-[3/4]" },
  { id: "story-49", src: "/white-roses-ring-bouquet.jpg", aspect: "aspect-[3/4]" },
  { id: "story-50", src: "/holding-both-mehendi-hands.jpg", aspect: "aspect-[3/4]" },
  { id: "story-51", src: "/pinky-promise-hands.jpg", aspect: "aspect-[3/4]" },
  { id: "story-52", src: "/beli-mala-red-flowers.jpg", aspect: "aspect-[3/4]" },
  { id: "story-54", src: "/linked-arms-beli-mala.jpg", aspect: "aspect-[4/3]" },
  { id: "story-55", src: "/hand-in-hand-beli-mala.jpg", aspect: "aspect-[3/4]" },
  { id: "story-56", src: "/autumn-leaves-walk.jpg", aspect: "aspect-[3/4]" },
  { id: "story-57", src: "/table-hands-pink-petals.jpg", aspect: "aspect-square" },
  { id: "story-58", src: "/palm-to-palm-sunlight.jpg", aspect: "aspect-[3/4]" },
  { id: "story-59", src: "/wooden-table-handclasp.jpg", aspect: "aspect-[3/4]" },
  { id: "story-60", src: "/pavement-walk-yellow-dress.jpg", aspect: "aspect-[3/4]" },
  { id: "story-61", src: "/felt-wool-holding-hands.jpg", aspect: "aspect-[3/4]" },
];


function AlbumPhotoCard({
  src,
  aspect,
  index,
  isMobile,
  onClick,
}: {
  src: string;
  aspect: string;
  index: number;
  isMobile: boolean;
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

  // Album photo resting rotation angles - disabled on mobile for clean gallery alignment
  const angles = [-1.8, 1.5, -2.2, 1.8, -1.2, 2.0, -1.6, 1.4, -2.0, 1.6];
  const paperRotation = isMobile ? 0 : angles[index % angles.length];

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reduce || isMobile || !cardRef.current) return;
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
      initial={reduce ? false : { opacity: 0, y: 16, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.4, delay: Math.min(index * 0.04, 0.4), ease: "easeOut" }}
      className="break-inside-avoid mb-2 sm:mb-5"
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
            rotateX: reduce || isMobile ? 0 : rotateX,
            rotateY: reduce || isMobile ? 0 : rotateY,
            rotateZ: reduce ? 0 : paperRotation,
            transformStyle: "preserve-3d",
          }}
          whileHover={{ scale: 1.025, rotateZ: 0 }}
          whileTap={{ scale: 0.97 }}
          className="relative overflow-hidden rounded-xl sm:rounded-2xl border border-white/80 sm:border-2 bg-white/95 p-1 sm:p-2.5 shadow-xs sm:shadow-md transition-all duration-300 hover:shadow-2xl dark:border-neutral-700/80 dark:bg-neutral-900/95 dark:shadow-[0_15px_35px_rgba(0,0,0,0.5)]"
        >
          {/* Photo Frame Container - Pure photo without title or caption */}
          <div className={`relative w-full overflow-hidden rounded-lg sm:rounded-xl bg-neutral-100 dark:bg-neutral-800 ${aspect}`}>
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

export default function HatDhoroPage() {
  const { scrollYProgress } = useScroll();
  const pb = useTransform(scrollYProgress, [0.2, 1], ["100px", "280px"]);
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const mounted = useMounted();
  const isMobile = useMediaQuery("(max-width: 639.98px)");

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
        className="relative flex w-full flex-1 flex-col items-center justify-start px-2 sm:px-6 pt-4 sm:pt-14"
        style={{ paddingBottom: pb }}
      >
        {/* Album Gallery - Compact 2 columns on mobile, 3-4 columns on desktop, no titles, no captions */}
        <div className="w-full max-w-4xl columns-2 sm:columns-3 md:columns-3 lg:columns-4 gap-2 sm:gap-4 md:gap-5">
          {HAND_HOLDING_PHOTOS.map((photo, idx) => (
            <AlbumPhotoCard
              key={photo.id}
              src={photo.src}
              aspect={photo.aspect}
              index={idx}
              isMobile={isMobile}
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
                className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/85 p-2 sm:p-6 backdrop-blur-xl"
                onClick={() => setSelectedIdx(null)}
              >
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className="relative max-h-[92vh] max-w-3xl overflow-hidden rounded-2xl sm:rounded-3xl border border-white/10 bg-neutral-900/90 shadow-2xl flex items-center justify-center p-1.5 sm:p-3"
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* Close Button */}
                  <button
                    type="button"
                    onClick={() => setSelectedIdx(null)}
                    className="absolute top-2.5 right-2.5 sm:top-3 sm:right-3 z-30 flex size-8 sm:size-9 items-center justify-center rounded-full bg-black/70 text-white/90 border border-white/10 backdrop-blur-md transition-all hover:bg-black hover:scale-105 active:scale-95 cursor-pointer text-xs sm:text-sm"
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
                    className="absolute left-1.5 sm:left-3 top-1/2 z-30 -translate-y-1/2 flex size-8 sm:size-10 items-center justify-center rounded-full bg-black/70 text-white/90 border border-white/10 backdrop-blur-md transition-all hover:bg-black hover:scale-105 active:scale-95 cursor-pointer text-sm sm:text-base"
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
                    className="absolute right-1.5 sm:right-3 top-1/2 z-30 -translate-y-1/2 flex size-8 sm:size-10 items-center justify-center rounded-full bg-black/70 text-white/90 border border-white/10 backdrop-blur-md transition-all hover:bg-black hover:scale-105 active:scale-95 cursor-pointer text-sm sm:text-base"
                    aria-label="Next"
                  >
                    ›
                  </button>

                  {/* Full Image Display - No Title, No Caption, Touch Drag / Swipeable on Mobile */}
                  <div className="relative max-h-[85vh] max-w-[90vw] sm:max-w-[85vw] flex items-center justify-center overflow-hidden rounded-xl sm:rounded-2xl">
                    <motion.img
                      key={selectedIdx}
                      src={HAND_HOLDING_PHOTOS[selectedIdx].src}
                      alt=""
                      initial={{ opacity: 0, scale: 0.97 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      drag="x"
                      dragConstraints={{ left: 0, right: 0 }}
                      dragElastic={0.2}
                      onDragEnd={(_e, { offset }) => {
                        if (offset.x > 50) handlePrev();
                        else if (offset.x < -50) handleNext();
                      }}
                      className="max-h-[82vh] w-auto max-w-full rounded-xl sm:rounded-2xl object-contain shadow-2xl select-none touch-pan-y"
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
