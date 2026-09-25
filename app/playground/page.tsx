"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { TextScramble } from "@/components/motion/text-scramble";
import { ProgressiveBlur } from "@/registry/magicui/progressive-blur";

const FADE_UP = {
  hidden: { opacity: 0, y: 14, filter: "blur(6px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)" },
};

const LOVE_NOTES = [
  "তুমি যখন কিছু না বলে কেবল চোখের কোণ দিয়ে মিষ্টি করে তাকাও।",
  "ব্যস্ত শহরে হাঁটার সময় যখন আচমকা আমার হাতটা শক্ত করে আঁকড়ে ধরো।",
  "ক্লান্ত দিনে তোমার এক চিলতে হাসিতে যখন সব চিন্তা মুছে যায়।",
  "টিএসসির এক কাপ গরম চায়ে তোমার সাথে ভাগ করে নেওয়া ছোট্ট সুখ।",
  "দূরত্ব থাকলেও ভিডিও কলের ওপাশে তোমার মায়াবী উপস্থিতি।",
  "যখন আমার প্রিয় নীল শাড়িটি পরে লজ্জামাখা মুখে সামনে আসো।",
  "আমার সামান্য অসুখেও যখন তোমার চোখে ব্যাকুল চিন্তা দেখতে পাই।",
  "বৃষ্টির দিনে এক ছাতার নিচে দুজনের ভিজে যাওয়ার মিষ্টি পাগলামি।",
  "তোমার নরম হাতের স্পর্শে জীবনের সব অস্থিরতার শান্ত হয়ে যাওয়া।",
  "যখন মাঝরাতে হঠাৎ তোমার মিষ্টি কণ্ঠের ডাক শুনতে পাই।",
  "রাগ ভাঙাতে যখন তোমার মুখে অভিমানের সুন্দর ছোঁয়া দেখি।",
  "একসাথে ভবিষ্যৎ সংসারের গল্প বোনার মধুর মুহূর্তগুলো।",
  "তুমি শুধু আমার সঙ্গী নও, তুমি আমার নীরব প্রার্থনার পূর্ণতা।",
  "তোমার পাশে থাকলে নিজেকে পৃথিবীর সবচেয়ে সুখী মানুষ মনে হয়।",
  "প্রতিটি ৯ নভেম্বর আমাকে মনে করিয়ে দেয়, তুমি আমার জীবনের শ্রেষ্ঠ প্রাপ্তি।",
];

export default function PlaygroundPage() {
  const reduce = useReducedMotion() ?? false;
  const [noteIdx, setNoteIdx] = useState(0);
  const [isSecretRevealed, setIsSecretRevealed] = useState(false);
  const [animatingJar, setAnimatingJar] = useState(false);

  const drawNextNote = () => {
    setAnimatingJar(true);
    setNoteIdx((prev) => (prev + 1) % LOVE_NOTES.length);
    setTimeout(() => setAnimatingJar(false), 400);
  };

  return (
    <main className="flex flex-1 flex-col items-center bg-background text-foreground">
      {/* Header */}
      <div className="flex w-full max-w-[540px] flex-col items-start px-4 sm:px-6 pt-16">
        <motion.p
          className="text-[24px] font-medium leading-none text-foreground"
          style={{ fontFamily: "var(--font-bengali)" }}
          initial={reduce ? false : { opacity: 0, y: 14, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.45, ease: "easeOut" }}
        >
          <TextScramble text="চিরকুট ও চিঠিপত্র" />
          <motion.span
            className="mt-2 block font-mono text-[12px] font-light tracking-[-0.3px] text-neutral-500 dark:text-neutral-400 sm:ml-3 sm:mt-0 sm:inline-block"
            variants={FADE_UP}
            initial={reduce ? false : "hidden"}
            animate="visible"
            transition={{ duration: 0.45, ease: "easeOut", delay: 0.5 }}
            style={{ fontFamily: "var(--font-bengali)" }}
          >
            হৃদয়ের না-বলা যত কথা
          </motion.span>
        </motion.p>
      </div>

      {/* Bento Grid layout in the existing design pattern */}
      <motion.div
        variants={FADE_UP}
        initial={reduce ? false : "hidden"}
        animate="visible"
        transition={{ duration: 0.45, ease: "easeOut", delay: 0.6 }}
        className="mt-8 sm:mt-10 w-full max-w-[540px] px-4 sm:px-6 pb-48 sm:pb-60"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
          {/* Card 1: 9 November Anniversary Love Letter (Full width span-2) */}
          <div className="sm:col-span-2 overflow-hidden rounded-2xl border border-dashed border-rose-200/80 bg-gradient-to-br from-white/95 via-rose-50/20 to-amber-50/30 p-5 shadow-xs dark:border-rose-900/40 dark:from-neutral-900/90 dark:via-neutral-850 dark:to-neutral-900/90 backdrop-blur-md transition-all hover:border-rose-300">
            <div className="flex items-center justify-between gap-2 mb-3">
              <span
                className="inline-flex items-center gap-1.5 rounded-full bg-rose-100/70 dark:bg-rose-950/50 px-2.5 py-0.5 text-[11px] font-semibold text-rose-700 dark:text-rose-300 border border-rose-200/60 dark:border-rose-900/40"
                style={{ fontFamily: "var(--font-bengali)" }}
              >
                <span>💌</span>
                <span>প্রেমের চিঠি</span>
              </span>
              <span
                className="text-[11px] text-neutral-400 font-mono"
                style={{ fontFamily: "var(--font-bengali)" }}
              >
                ০৯ নভেম্বর
              </span>
            </div>

            <h3
              className="text-base font-bold text-neutral-900 dark:text-neutral-100 mb-2"
              style={{ fontFamily: "var(--font-bengali)" }}
            >
              তোমার প্রতি এক অচেনা কৃতজ্ঞতা
            </h3>

            <p
              className="text-[13px] leading-relaxed text-neutral-600 dark:text-neutral-300"
              style={{ fontFamily: "var(--font-bengali)" }}
            >
              ফার্মগেটের ভিড়ের মাঝে প্রথম যেদিন তোমার হাতটা ছুঁয়েছিলাম, সেদিন থেকেই
              জীবনের সব ব্যস্ততা ম্লান হয়ে গিয়েছিল। এতগুলো দিন পেরিয়ে আজ বুঝতে পারি—তুমি
              শুধু আমার ভালোবাসা নও, তুমি আমার জীবনের সবচেয়ে সুন্দর শান্তির ঠিকানা। প্রতিটি
              ৯ নভেম্বর আমাদের মনে করিয়ে দেয়, কিছু অনুভূতি সময়ের সাথে পুরোনো হয় না, বরং
              আরও গভীর হয়...
            </p>

            <div className="mt-3.5 flex justify-end">
              <span
                className="text-[12px] italic text-rose-600 dark:text-rose-400 font-medium"
                style={{ fontFamily: "var(--font-bengali)" }}
              >
                — চিরদিনের তোমার
              </span>
            </div>
          </div>

          {/* Card 2: ছোট কার্ড (Interactive) — চিরকুট বয়াম (Draw a Note) */}
          <div className="sm:col-span-1 overflow-hidden rounded-2xl border border-neutral-200/80 bg-white/90 p-4 shadow-xs dark:border-neutral-800 dark:bg-neutral-900/90 backdrop-blur-md flex flex-col justify-between transition-all hover:border-rose-300">
            <div>
              <div className="flex items-center justify-between gap-1 mb-2.5">
                <span
                  className="inline-flex items-center gap-1 text-[11px] font-semibold text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/40 px-2 py-0.5 rounded-full border border-amber-200/60 dark:border-amber-900/40"
                  style={{ fontFamily: "var(--font-bengali)" }}
                >
                  <span>🍯</span>
                  <span>চিরকুট বয়াম</span>
                </span>
                <span className="text-[10px] text-neutral-400 font-mono">
                  #{noteIdx + 1}/{LOVE_NOTES.length}
                </span>
              </div>

              <div className="min-h-[72px] flex items-center">
                <AnimatePresence mode="wait">
                  <motion.p
                    key={noteIdx}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.2 }}
                    className="text-[12.5px] leading-relaxed text-neutral-700 dark:text-neutral-200 font-medium italic"
                    style={{ fontFamily: "var(--font-bengali)" }}
                  >
                    &ldquo;{LOVE_NOTES[noteIdx]}&rdquo;
                  </motion.p>
                </AnimatePresence>
              </div>
            </div>

            <button
              type="button"
              onClick={drawNextNote}
              className="mt-3 flex w-full items-center justify-center gap-1.5 rounded-xl border border-rose-200/80 bg-rose-50/70 hover:bg-rose-100 py-1.5 text-[11.5px] font-semibold text-rose-700 dark:border-rose-900/40 dark:bg-rose-950/40 dark:text-rose-300 dark:hover:bg-rose-900/50 transition-all cursor-pointer active:scale-97 select-none"
              style={{ fontFamily: "var(--font-bengali)" }}
            >
              <motion.span
                animate={animatingJar ? { rotate: [0, -15, 15, 0] } : {}}
                transition={{ duration: 0.3 }}
              >
                ✨
              </motion.span>
              <span>আরেকটি চিরকুট তোলো</span>
            </button>
          </div>

          {/* Card 3: ছোট কার্ড — ভালোবাসার কবিতা */}
          <div className="sm:col-span-1 overflow-hidden rounded-2xl border border-neutral-200/80 bg-white/90 p-4 shadow-xs dark:border-neutral-800 dark:bg-neutral-900/90 backdrop-blur-md flex flex-col justify-between transition-all hover:border-rose-300">
            <div>
              <div className="flex items-center justify-between gap-1 mb-2.5">
                <span
                  className="inline-flex items-center gap-1 text-[11px] font-semibold text-purple-700 dark:text-purple-300 bg-purple-50 dark:bg-purple-950/40 px-2 py-0.5 rounded-full border border-purple-200/60 dark:border-purple-900/40"
                  style={{ fontFamily: "var(--font-bengali)" }}
                >
                  <span>📖</span>
                  <span>কাব্য পঙক্তি</span>
                </span>
                <span className="text-[10px] text-neutral-400">রবীন্দ্রনাথ</span>
              </div>

              <p
                className="text-[12.5px] leading-relaxed text-neutral-700 dark:text-neutral-200 italic"
                style={{ fontFamily: "var(--font-bengali)" }}
              >
                &ldquo;তুমি সন্ধ্যার মেঘমালা, তুমি আমার সাধের সাধনা, মম বিজন-গগন-চারী...&rdquo;
              </p>
            </div>

            <div className="mt-3 pt-2 border-t border-neutral-100 dark:border-neutral-800/80 flex items-center justify-between text-[11px] text-neutral-400">
              <span style={{ fontFamily: "var(--font-bengali)" }}>তোমার জন্য সুর</span>
              <span>🎶</span>
            </div>
          </div>

          {/* Card 4: ছোট কার্ড (Interactive) — গোপন চিরকুট (Tap to Reveal) */}
          <div
            onClick={() => setIsSecretRevealed((p) => !p)}
            className="sm:col-span-1 overflow-hidden rounded-2xl border border-dashed border-rose-300/70 bg-rose-50/30 p-4 shadow-xs dark:border-rose-900/40 dark:bg-rose-950/20 backdrop-blur-md flex flex-col justify-between cursor-pointer transition-all hover:border-rose-400 select-none group"
          >
            <div>
              <div className="flex items-center justify-between gap-1 mb-2">
                <span
                  className="inline-flex items-center gap-1 text-[11px] font-semibold text-rose-700 dark:text-rose-300"
                  style={{ fontFamily: "var(--font-bengali)" }}
                >
                  <span>🔒</span>
                  <span>গোপন চিরকুট</span>
                </span>
                <span
                  className="text-[10px] text-rose-500 font-medium"
                  style={{ fontFamily: "var(--font-bengali)" }}
                >
                  {isSecretRevealed ? "লুকিয়ে ফেলো" : "ট্যাপ করো"}
                </span>
              </div>

              <div className="min-h-[58px] flex items-center justify-center text-center">
                <AnimatePresence mode="wait">
                  {isSecretRevealed ? (
                    <motion.p
                      key="revealed"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="text-[12.5px] leading-relaxed text-rose-700 dark:text-rose-300 font-bold"
                      style={{ fontFamily: "var(--font-bengali)" }}
                    >
                      ❤️ &ldquo;যেদিন তোমাকে প্রথম দেখেছিলাম, সেদিনই বুঝেছিলাম—আমার শেষ গন্তব্য তুমি।&rdquo;
                    </motion.p>
                  ) : (
                    <motion.div
                      key="hidden"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex flex-col items-center gap-1 py-1"
                    >
                      <span className="text-xl">💌</span>
                      <span
                        className="text-[11.5px] text-neutral-500 dark:text-neutral-400 group-hover:text-rose-600 transition-colors"
                        style={{ fontFamily: "var(--font-bengali)" }}
                      >
                        ট্যাপ করে গোপন চিরকুটটি পড়ো...
                      </span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            <div className="mt-2 text-center text-[10px] text-neutral-400">
              <span style={{ fontFamily: "var(--font-bengali)" }}>
                {isSecretRevealed ? "✨ কেবল তোমার জন্য" : "🤫 শুধু আমাদের দুজনের"}
              </span>
            </div>
          </div>

          {/* Card 5: ছোট কার্ড — টাইম ক্যাপসুল (১০ বছর পরের জন্য) */}
          <div className="sm:col-span-1 overflow-hidden rounded-2xl border border-neutral-200/80 bg-white/90 p-4 shadow-xs dark:border-neutral-800 dark:bg-neutral-900/90 backdrop-blur-md flex flex-col justify-between transition-all hover:border-amber-300">
            <div>
              <div className="flex items-center justify-between gap-1 mb-2.5">
                <span
                  className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded-full border border-emerald-200/60 dark:border-emerald-900/40"
                  style={{ fontFamily: "var(--font-bengali)" }}
                >
                  <span>⏳</span>
                  <span>টাইম ক্যাপসুল</span>
                </span>
                <span className="text-[10px] text-neutral-400 font-mono">২০৩৪</span>
              </div>

              <p
                className="text-[12.5px] leading-relaxed text-neutral-700 dark:text-neutral-200"
                style={{ fontFamily: "var(--font-bengali)" }}
              >
                দশ বছর পরের এক বিকেলে আমরা যখন এই চিঠিটা খুলব, তখনও যেন এভাবেই পরম
                নির্ভরতায় হাত দুটো শক্ত করে ধরা থাকে...
              </p>
            </div>

            <div className="mt-3 pt-2 border-t border-neutral-100 dark:border-neutral-800/80 flex items-center justify-between text-[11px] text-neutral-400">
              <span style={{ fontFamily: "var(--font-bengali)" }}>১০ম বর্ষপূর্তির জন্য</span>
              <span>🔒</span>
            </div>
          </div>

          {/* Card 6: Footer Quote Card (Full width span-2) */}
          <div className="sm:col-span-2 overflow-hidden rounded-2xl border border-neutral-200/60 bg-neutral-50/60 p-4 text-center dark:border-neutral-800/60 dark:bg-neutral-900/40 backdrop-blur-xs">
            <p
              className="text-[12px] leading-relaxed text-neutral-500 dark:text-neutral-400 italic"
              style={{ fontFamily: "var(--font-bengali)" }}
            >
              &ldquo;কাগজের চিরকুট হয়তো হারিয়ে যেতে পারে, কিন্তু হৃদয়ের খাতায় লেখা প্রতিটি শব্দের লেখক তুমি...&rdquo;
            </p>
          </div>
        </div>
      </motion.div>

      {/* Progressive Blur at the bottom */}
      <ProgressiveBlur
        position="bottom"
        height="180px"
        className="fixed"
        blurLevels={[0.5, 1, 2, 4, 8, 16, 24, 32]}
      />
    </main>
  );
}