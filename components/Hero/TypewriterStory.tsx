"use client";

import { useState, useEffect, useRef } from "react";
import { useReducedMotion, motion } from "motion/react";

interface TypewriterStoryProps {
  active?: boolean;
}

const TITLE_TEXT = "আমাদের ভালোবাসার গল্প";

const PARAGRAPHS = [
  "০৯ নভেম্বর — ক্যালেন্ডারের সাধারণ একটা দিন, যা আমাদের দুজনের ভালোবাসার ছোঁয়ায় চিরদিনের জন্য অনন্য হয়ে উঠল। ফার্মগেটের সেই ব্যস্ত সন্ধ্যায় প্রথমবার হাত ধরা থেকে শুরু করে, রিকশায় পাশাপাশি বসে হারিয়ে যাওয়ার প্রতিটি মুহূর্ত আজ আমাদের জীবনের সবচেয়ে মধুর গল্প।",
  "এক মুঠো লাল গোলাপ, টিএসসির শান্ত বাতাস, মিস হয়ে যাওয়া সেই বাস আর উত্তরায় হেঁটে চলা গোধূলি বেলা—সবকিছুতেই জড়িয়ে আছে তোমার মিষ্টি হাসি আর আমাদের না-বলা সহস্র অনুভূতির মুগ্ধতা।",
  "আজ আমাদের এই বিশেষ দিনে একটাই প্রার্থনা—সময়ের সাথে সাথে আমাদের ভালোবাসা যেন প্রতিদিন নতুন রঙে রঙিন হয়ে ওঠে, আর জীবনের প্রতিটি বাঁকে এভাবেই তোমার পাশে ছায়া হয়ে থাকতে পারি। শুভ বার্ষিকী, ভালোবাসা! ❤️",
];

export function TypewriterStory({ active = true }: TypewriterStoryProps) {
  const reduce = useReducedMotion() ?? false;
  const [titleTyped, setTitleTyped] = useState("");
  const [paraTyped, setParaTyped] = useState<string[]>(["", "", ""]);
  const [currentSection, setCurrentSection] = useState<number>(0); // 0: title, 1..3: paragraphs, 4: done
  const [isComplete, setIsComplete] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLSpanElement>(null);

  // If reduced motion is preferred, render everything immediately
  useEffect(() => {
    if (reduce) {
      setTitleTyped(TITLE_TEXT);
      setParaTyped(PARAGRAPHS);
      setIsComplete(true);
      setCurrentSection(4);
    }
  }, [reduce]);

  useEffect(() => {
    if (!active || reduce || isComplete) return;

    let timeoutId: NodeJS.Timeout;
    let isCancelled = false;

    // Helper to scroll cursor into view smoothly as text expands
    const autoScroll = () => {
      if (cursorRef.current) {
        const rect = cursorRef.current.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        // If cursor is in the lower 40% of the screen or below, gently scroll
        if (rect.bottom > viewportHeight - 160) {
          window.scrollBy({
            top: rect.bottom - (viewportHeight - 200),
            behavior: "smooth",
          });
        }
      }
    };

    const typeNextChar = () => {
      if (isCancelled) return;

      if (currentSection === 0) {
        // Typing Title
        if (titleTyped.length < TITLE_TEXT.length) {
          const nextLength = titleTyped.length + 1;
          const char = TITLE_TEXT[titleTyped.length];
          setTitleTyped(TITLE_TEXT.slice(0, nextLength));
          autoScroll();

          const delay = char === " " || char === "—" ? 70 : 35;
          timeoutId = setTimeout(typeNextChar, delay);
        } else {
          // Pause before starting paragraphs
          timeoutId = setTimeout(() => {
            setCurrentSection(1);
          }, 350);
        }
      } else if (currentSection >= 1 && currentSection <= 3) {
        const pIdx = currentSection - 1;
        const targetText = PARAGRAPHS[pIdx];
        const currentPText = paraTyped[pIdx];

        if (currentPText.length < targetText.length) {
          const nextLength = currentPText.length + 1;
          const char = targetText[currentPText.length];
          
          setParaTyped((prev) => {
            const copy = [...prev];
            copy[pIdx] = targetText.slice(0, nextLength);
            return copy;
          });
          autoScroll();

          // Natural cadence with punctuation pauses
          let delay = 24;
          if (char === "।") delay = 380;
          else if (char === "—" || char === ",") delay = 180;
          else if (char === " " && Math.random() > 0.6) delay = 45;

          timeoutId = setTimeout(typeNextChar, delay);
        } else {
          // Finished this paragraph, move to next
          if (currentSection < 3) {
            timeoutId = setTimeout(() => {
              setCurrentSection((s) => s + 1);
            }, 300);
          } else {
            setIsComplete(true);
            setCurrentSection(4);
            autoScroll();
          }
        }
      }
    };

    timeoutId = setTimeout(typeNextChar, 50);

    return () => {
      isCancelled = true;
      clearTimeout(timeoutId);
    };
  }, [active, reduce, isComplete, currentSection, titleTyped, paraTyped]);

  const handleFastForward = () => {
    setTitleTyped(TITLE_TEXT);
    setParaTyped(PARAGRAPHS);
    setIsComplete(true);
    setCurrentSection(4);
  };

  return (
    <div
      ref={containerRef}
      className="max-w-2xl w-full text-left select-text"
      style={{ fontFamily: "var(--font-bengali), var(--font-geist-sans), sans-serif" }}
    >
      {/* Title */}
      <div className="relative flex items-center">
        <h1 className="text-[24px] sm:text-[26px] font-semibold leading-snug text-foreground">
          {titleTyped}
          {currentSection === 0 && !isComplete && (
            <span
              ref={cursorRef}
              className="inline-block w-[2px] h-[22px] ml-1 bg-red-500 animate-pulse align-middle"
            />
          )}
        </h1>
      </div>

      {/* Paragraph 1 */}
      {(currentSection >= 1 || paraTyped[0].length > 0) && (
        <p className="mt-4 whitespace-pre-line text-[15px] sm:text-[16px] leading-relaxed text-neutral-600 dark:text-neutral-300">
          {paraTyped[0]}
          {currentSection === 1 && !isComplete && (
            <span
              ref={cursorRef}
              className="inline-block w-[2px] h-[16px] ml-1 bg-red-500 animate-pulse align-middle"
            />
          )}
        </p>
      )}

      {/* Paragraph 2 */}
      {(currentSection >= 2 || paraTyped[1].length > 0) && (
        <p className="mt-4 whitespace-pre-line text-[15px] sm:text-[16px] leading-relaxed text-neutral-600 dark:text-neutral-300">
          {paraTyped[1]}
          {currentSection === 2 && !isComplete && (
            <span
              ref={cursorRef}
              className="inline-block w-[2px] h-[16px] ml-1 bg-red-500 animate-pulse align-middle"
            />
          )}
        </p>
      )}

      {/* Paragraph 3 */}
      {(currentSection >= 3 || paraTyped[2].length > 0) && (
        <p className="mt-4 whitespace-pre-line text-[15px] sm:text-[16px] leading-relaxed text-neutral-600 dark:text-neutral-300">
          {paraTyped[2]}
          {currentSection === 3 && !isComplete && (
            <span
              ref={cursorRef}
              className="inline-block w-[2px] h-[16px] ml-1 bg-red-500 animate-pulse align-middle"
            />
          )}
        </p>
      )}

      {/* Completed heart subtle bounce */}
      {isComplete && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mt-2 text-xs text-neutral-400 font-mono"
        >
          {/* Subtle completion indicator */}
        </motion.div>
      )}
    </div>
  );
}
