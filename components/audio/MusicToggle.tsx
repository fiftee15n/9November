"use client";

import React from "react";
import { motion } from "motion/react";
import { useMusic } from "./MusicContext";
import { Tooltip } from "@/components/motion/tooltip";
import { cn } from "@/lib/utils";

interface MusicToggleProps {
  className?: string;
  iconClassName?: string;
}

export function MusicToggle({
  className,
  iconClassName,
}: MusicToggleProps) {
  const { isPlaying, togglePlay } = useMusic();

  return (
    <Tooltip
      content={isPlaying ? "গান থামান (Pause music)" : "গান শুনুন (Play music)"}
      side="bottom"
    >
      <button
        type="button"
        onClick={togglePlay}
        aria-label={isPlaying ? "Pause music" : "Play music"}
        className={cn(
          "relative flex size-8 items-center justify-center rounded-full text-neutral-400 transition-colors hover:bg-neutral-200 hover:text-foreground dark:hover:bg-white/10",
          isPlaying && "text-rose-500 dark:text-rose-400",
          className
        )}
      >
        {isPlaying ? (
          /* Animated equalizer bars when playing */
          <div
            className={cn("flex items-end justify-center gap-[2.5px] h-3.5 w-3.5", iconClassName)}
            aria-hidden="true"
          >
            <motion.span
              className="w-[2px] rounded-full bg-current"
              animate={{ height: ["4px", "14px", "7px", "13px", "4px"] }}
              transition={{ repeat: Infinity, duration: 1.1, ease: "easeInOut" }}
            />
            <motion.span
              className="w-[2px] rounded-full bg-current"
              animate={{ height: ["12px", "5px", "14px", "6px", "12px"] }}
              transition={{
                repeat: Infinity,
                duration: 0.95,
                ease: "easeInOut",
                delay: 0.15,
              }}
            />
            <motion.span
              className="w-[2px] rounded-full bg-current"
              animate={{ height: ["6px", "14px", "4px", "11px", "6px"] }}
              transition={{
                repeat: Infinity,
                duration: 1.25,
                ease: "easeInOut",
                delay: 0.3,
              }}
            />
          </div>
        ) : (
          /* Music note with a subtle slash when paused */
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.75}
            strokeLinecap="round"
            strokeLinejoin="round"
            className={cn("size-4 opacity-75", iconClassName)}
            aria-hidden="true"
          >
            <path d="M9 18V5l12-2v13" />
            <circle cx="6" cy="18" r="3" />
            <circle cx="18" cy="16" r="3" />
            <line x1="2" y1="2" x2="22" y2="22" strokeWidth={2} />
          </svg>
        )}
      </button>
    </Tooltip>
  );
}
