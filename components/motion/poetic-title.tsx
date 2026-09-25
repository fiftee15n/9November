"use client";

import { useMemo } from "react";
import { motion, useReducedMotion, type Variants } from "motion/react";

interface PoeticTitleProps {
  title: string;
  subtitle?: string;
  className?: string;
  delay?: number;
}

export function PoeticTitle({
  title,
  subtitle,
  className = "",
  delay = 0.05,
}: PoeticTitleProps) {
  const reduce = useReducedMotion() ?? false;

  // Segment words and Bengali grapheme clusters (যুক্তবর্ণ ও কারচিহ্ন অক্ষত রাখা)
  const segmentedWords = useMemo(() => {
    let segmenter: Intl.Segmenter | null = null;
    try {
      segmenter = new Intl.Segmenter("bn", { granularity: "grapheme" });
    } catch {
      segmenter = null;
    }

    const words = title.split(" ");
    return words.map((word) => {
      if (segmenter) {
        return Array.from(segmenter.segment(word), (s) => s.segment);
      }
      return word.split("");
    });
  }, [title]);

  const totalGraphemes = useMemo(
    () => segmentedWords.reduce((acc, word) => acc + word.length, 0),
    [segmentedWords]
  );

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.03,
        delayChildren: delay,
      },
    },
  };

  const letterVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 12,
      filter: "blur(6px)",
      scale: 0.94,
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      scale: 1,
      transition: {
        type: "spring",
        damping: 15,
        stiffness: 170,
      },
    },
  };

  const subtitleVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 8,
      filter: "blur(4px)",
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
        delay: delay + totalGraphemes * 0.03 + 0.08,
      },
    },
  };

  if (reduce) {
    return (
      <div
        className={`text-[24px] font-medium leading-none text-foreground ${className}`}
        style={{ fontFamily: "var(--font-bengali)" }}
      >
        <span>{title}</span>
        {subtitle && (
          <span
            className="mt-2 block font-mono text-[12px] font-light tracking-[-0.3px] text-neutral-500 dark:text-neutral-400 sm:ml-3 sm:mt-0 sm:inline-block"
            style={{ fontFamily: "var(--font-bengali)" }}
          >
            {subtitle}
          </span>
        )}
      </div>
    );
  }

  return (
    <div
      className={`text-[24px] font-medium leading-none text-foreground ${className}`}
      style={{ fontFamily: "var(--font-bengali)" }}
    >
      <span className="sr-only">{title}</span>
      <motion.span
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        aria-hidden="true"
        className="inline-flex flex-wrap items-baseline gap-x-2 gap-y-1"
      >
        {segmentedWords.map((wordClusters, wordIdx) => (
          <span
            key={`word-${wordIdx}`}
            className="inline-flex whitespace-nowrap"
          >
            {wordClusters.map((cluster, clusterIdx) => (
              <motion.span
                key={`c-${wordIdx}-${clusterIdx}`}
                variants={letterVariants}
                className="inline-block"
              >
                {cluster}
              </motion.span>
            ))}
          </span>
        ))}
      </motion.span>

      {subtitle && (
        <motion.span
          variants={subtitleVariants}
          initial="hidden"
          animate="visible"
          className="mt-2 block font-mono text-[12px] font-light tracking-[-0.3px] text-neutral-500 dark:text-neutral-400 sm:ml-3 sm:mt-0 sm:inline-block"
          style={{ fontFamily: "var(--font-bengali)" }}
        >
          {subtitle}
        </motion.span>
      )}
    </div>
  );
}
