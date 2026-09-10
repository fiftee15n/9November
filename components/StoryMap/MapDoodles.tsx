"use client";

import React from "react";

// Top Ribbon Banner with Couple figures on each side as in the sketch
export function StoryHeaderBanner({
  title = "OUR STORY",
  names = "শাকিব ও স্পর্শ",
}: {
  title?: string;
  names?: string;
}) {
  return (
    <div className="relative w-full max-w-2xl mx-auto my-6 px-4 select-none">
      <div className="relative flex flex-col items-center justify-center p-6 text-center">
        {/* Decorative Laurel & Ribbon Box */}
        <div className="relative w-full rounded-2xl border-2 border-dashed border-rose-300/70 bg-gradient-to-r from-rose-50/70 via-amber-50/50 to-pink-50/70 p-6 shadow-md dark:border-rose-500/30 dark:from-neutral-900/80 dark:via-neutral-850 dark:to-neutral-900/80 backdrop-blur-sm">
          {/* Top Banner Ribbon */}
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-rose-500/10 border border-rose-500/30 mb-2">
            <span className="text-rose-500 text-xs">✨</span>
            <span className="text-xs sm:text-sm font-bold tracking-widest text-rose-600 dark:text-rose-400 uppercase font-mono">
              {title}
            </span>
            <span className="text-rose-500 text-xs">✨</span>
          </div>

          {/* Couple Names */}
          <h1
            className="text-2xl sm:text-4xl font-extrabold tracking-tight text-neutral-800 dark:text-white mt-1"
            style={{ fontFamily: "var(--font-bengali), var(--font-geist-sans), sans-serif" }}
          >
            {names}
          </h1>

          {/* Subtitle tag */}
          <p
            className="mt-2 text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 italic"
            style={{ fontFamily: "var(--font-bengali), var(--font-geist-sans), sans-serif" }}
          >
            আমাদের জীবনের প্রতিটি সুন্দর অধ্যায়ের রঙিন স্মৃতিকথা
          </p>

          {/* Decorative Corner Stars & Florals */}
          <div className="absolute -top-3 -left-3 text-rose-400 text-lg select-none">🌸</div>
          <div className="absolute -top-3 -right-3 text-amber-400 text-lg select-none">✨</div>
          <div className="absolute -bottom-3 -left-3 text-pink-400 text-lg select-none">🌿</div>
          <div className="absolute -bottom-3 -right-3 text-rose-400 text-lg select-none">💐</div>
        </div>
      </div>
    </div>
  );
}

// Doodle icons for each story node
export function MilestoneDoodle({ type, color }: { type: string; color: string }) {
  const iconProps = {
    className: "w-8 h-8 sm:w-10 sm:h-10 transition-transform duration-300 group-hover:scale-110",
    strokeWidth: 1.6,
    stroke: color,
    fill: "none",
  };

  switch (type) {
    case "meet":
      return (
        <svg viewBox="0 0 24 24" {...iconProps}>
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill={`${color}20`} />
          <path d="M12 7v3m-1.5-1.5h3" strokeLinecap="round" />
        </svg>
      );

    case "hiking":
      return (
        <svg viewBox="0 0 24 24" {...iconProps}>
          <path d="M3 20h18L15 8l-4 6-3-4-5 10z" strokeLinejoin="round" strokeLinecap="round" fill={`${color}15`} />
          <circle cx="17" cy="6" r="2" fill={`${color}40`} />
          <path d="M8 20l3-5 3 2 4-6" strokeDasharray="1 2" strokeLinecap="round" />
        </svg>
      );

    case "monument":
      return (
        <svg viewBox="0 0 24 24" {...iconProps}>
          <path d="M12 2v20M4 22h16M7 10h10M6 14h12M5 18h14M12 2l4 4H8l4-4z" strokeLinecap="round" strokeLinejoin="round" fill={`${color}15`} />
        </svg>
      );

    case "car":
      return (
        <svg viewBox="0 0 24 24" {...iconProps}>
          <rect x="3" y="10" width="18" height="7" rx="2" fill={`${color}15`} />
          <path d="M5 10l2.5-5h9l2.5 5" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="7.5" cy="17" r="2" fill="currentColor" />
          <circle cx="16.5" cy="17" r="2" fill="currentColor" />
          <path d="M1 12h2m-2 3h2" strokeLinecap="round" />
        </svg>
      );

    case "ski":
      return (
        <svg viewBox="0 0 24 24" {...iconProps}>
          <path d="M4 19c4-1 9-2 15-4 1.5-.2 2.5 1 2 2.5-3 1-8 2-15 4" strokeLinecap="round" />
          <path d="M8 6a2 2 0 100-4 2 2 0 000 4zM7 9l3 4 3-2 3 5M6 12l4-1" strokeLinecap="round" />
        </svg>
      );

    case "cabin":
      return (
        <svg viewBox="0 0 24 24" {...iconProps}>
          <path d="M3 10l9-7 9 7v10a1 1 0 01-1 1H4a1 1 0 01-1-1V10z" fill={`${color}15`} strokeLinejoin="round" />
          <path d="M9 21V12h6v9M12 3v3" strokeLinecap="round" strokeLinejoin="round" />
          <line x1="16" y1="7" x2="16" y2="4" />
        </svg>
      );

    case "house":
      return (
        <svg viewBox="0 0 24 24" {...iconProps}>
          <path d="M3 11l9-7 9 7v9a2 2 0 01-2 2H5a2 2 0 01-2-2v-9z" fill={`${color}15`} />
          <path d="M12 12a1.5 1.5 0 100-3 1.5 1.5 0 000 3zM10 16h4" strokeLinecap="round" />
        </svg>
      );

    case "trip":
      return (
        <svg viewBox="0 0 24 24" {...iconProps}>
          <path d="M3 17l6-3 4 6 8-15-15 8 6 4" strokeLinecap="round" strokeLinejoin="round" fill={`${color}10`} />
          <path d="M12 13l9-8" strokeDasharray="2 2" strokeLinecap="round" />
        </svg>
      );

    case "sushi":
      return (
        <svg viewBox="0 0 24 24" {...iconProps}>
          <ellipse cx="12" cy="12" rx="9" ry="6" fill={`${color}15`} />
          <ellipse cx="12" cy="12" rx="4" ry="2.5" fill={`${color}40`} />
          <path d="M3 12v4c0 3.3 4 6 9 6s9-2.7 9-6v-4" strokeLinecap="round" />
        </svg>
      );

    case "grad_m":
    case "grad_n":
      return (
        <svg viewBox="0 0 24 24" {...iconProps}>
          <path d="M12 3L1 9l11 6 9-4.91V17h2V9L12 3z" fill={`${color}15`} strokeLinejoin="round" />
          <path d="M6 12.5v5c0 2 3 3.5 6 3.5s6-1.5 6-3.5v-5" strokeLinecap="round" />
        </svg>
      );

    case "engaged":
      return (
        <svg viewBox="0 0 24 24" {...iconProps}>
          <circle cx="12" cy="14" r="6" strokeLinecap="round" fill={`${color}15`} />
          <path d="M9 8l3-4 3 4-3 1-3-1z" strokeLinejoin="round" fill={`${color}40`} />
          <circle cx="12" cy="5" r="1" fill={color} />
        </svg>
      );

    case "married":
      return (
        <svg viewBox="0 0 24 24" {...iconProps}>
          <path d="M7 11a4 4 0 100-8 4 4 0 000 8zm10 0a4 4 0 100-8 4 4 0 000 8z" fill={`${color}15`} />
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" strokeWidth="1.2" />
        </svg>
      );

    default:
      return (
        <svg viewBox="0 0 24 24" {...iconProps}>
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill={`${color}20`} />
        </svg>
      );
  }
}

// Hand-drawn style connecting arrow curve between milestones
export function CurvingPathArrow({
  direction = "right-to-left",
  color = "#F43F5E",
}: {
  direction?: "right-to-left" | "left-to-right" | "center-to-right" | "center-to-left" | "down";
  color?: string;
}) {
  if (direction === "left-to-right") {
    return (
      <div className="hidden sm:flex justify-center my-2 opacity-75">
        <svg width="140" height="48" viewBox="0 0 140 48" fill="none">
          <path
            d="M10 10 C 60 42, 80 44, 125 18"
            stroke={color}
            strokeWidth="2"
            strokeDasharray="4 4"
            strokeLinecap="round"
          />
          <path
            d="M118 10 L 126 18 L 115 23"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    );
  }

  if (direction === "right-to-left") {
    return (
      <div className="hidden sm:flex justify-center my-2 opacity-75">
        <svg width="140" height="48" viewBox="0 0 140 48" fill="none">
          <path
            d="M125 10 C 80 42, 60 44, 15 18"
            stroke={color}
            strokeWidth="2"
            strokeDasharray="4 4"
            strokeLinecap="round"
          />
          <path
            d="M22 10 L 14 18 L 25 23"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    );
  }

  return (
    <div className="flex justify-center my-2 opacity-75">
      <svg width="32" height="48" viewBox="0 0 32 48" fill="none">
        <path
          d="M16 6 C 10 20, 22 28, 16 42"
          stroke={color}
          strokeWidth="2"
          strokeDasharray="4 4"
          strokeLinecap="round"
        />
        <path
          d="M10 36 L 16 43 L 22 36"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}
