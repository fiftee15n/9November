"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { TextScramble } from "@/components/motion/text-scramble";
import { ProgressiveBlur } from "@/registry/magicui/progressive-blur";

// same entrance the work page heading uses
const FADE_UP = {
  hidden: { opacity: 0, y: 14, filter: "blur(6px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)" },
};

const BUCKET_LIST = [
  {
    index: "01",
    name: "স্মৃতিতে পূরণ",
    items: [
      { name: "প্রথম হাত ধরা", icon: "🤝", done: true },
      { name: "এক ছাতায় বৃষ্টি", icon: "🌧️", done: true },
      { name: "ভিডিও কল", icon: "📱", done: true },
      { name: "টিএসসির চা", icon: "☕", done: true },
      { name: "ম্যাচিং নীল পোশাক", icon: "👗", done: true },
      { name: "বিমানবন্দরে দেখা", icon: "✈️", done: true },
      { name: "একসাথে গান শোনা", icon: "🎧", done: true },
      { name: "রিকশা ভ্রমণ", icon: "🛺", done: true },
    ],
  },
  {
    index: "02",
    name: "ভ্রমণ ও রোমাঞ্চ",
    items: [
      { name: "সাজেক ভ্যালির মেঘ", icon: "☁️", done: false },
      { name: "সৈকতে লাল সূর্যাস্ত", icon: "🌅", done: false },
      { name: "চা বাগান ভ্রমণ", icon: "🍃", done: false },
      { name: "পাহাড়ে ক্যাম্পিং", icon: "⛺", done: false },
      { name: "একসাথে বিদেশ ভ্রমণ", icon: "🗺️", done: false },
      { name: "লং রোডট্রিপ", icon: "🚗", done: false },
    ],
  },
  {
    index: "03",
    name: "আমাদের নীড়",
    items: [
      { name: "স্বপ্নের ঘর সাজানো", icon: "🏡", done: false },
      { name: "একসাথে রান্না করা", icon: "🍳", done: false },
      { name: "বারান্দায় ফুলবাগান", icon: "🌸", done: false },
      { name: "বিড়ালছানা দত্তক", icon: "🐱", done: false },
      { name: "স্মৃতির ছবির দেওয়াল", icon: "🖼️", done: false },
      { name: "মাঝরাতে আইসক্রিম", icon: "🍦", done: false },
    ],
  },
  {
    index: "04",
    name: "চিরন্তন প্রতিশ্রুতি",
    items: [
      { name: "বিয়ের উৎসবের সাজ", icon: "💍", done: false },
      { name: "সব ঝড়ে পাশে থাকা", icon: "🛡️", done: true },
      { name: "বৃদ্ধ বয়সেও হাত ধরা", icon: "👵👴", done: false },
      { name: "অনন্ত ভালোবাসা", icon: "♾️", done: true },
    ],
  },
];

export default function SkillsPage() {
  const reduce = useReducedMotion() ?? false;
  const colRef = useRef<HTMLDivElement>(null);
  // On phone viewports this page barely overflows, so the scroll-driven
  // padding below completes its whole 40→300 ramp inside the first swipe and
  // each +260px height change re-triggers it on the next scroll event — the
  // document height thrashes and the page shakes. Short pages get a frozen
  // runout instead; genuinely long pages keep the work-page ramp.
  const [frozenPb, setFrozenPb] = useState<number | null>(null);
  const { scrollYProgress } = useScroll();
  const pb = useTransform(scrollYProgress, [0.2, 1], ["40px", "300px"]);

  useEffect(() => {
    const measure = () => {
      // normalize to the 40px base padding so a previously frozen 300px
      // doesn't skew the overflow reading on resize
      const wrap = colRef.current?.parentElement;
      if (!wrap) return;
      const currentPb = parseFloat(getComputedStyle(wrap).paddingBottom) || 0;
      const overflow =
        document.documentElement.scrollHeight - currentPb + 40 - window.innerHeight;
      setFrozenPb(overflow <= 0 ? 40 : overflow < 200 ? 300 : null);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  return (
    <main className="flex flex-1 flex-col items-center justify-start bg-background text-foreground">
      <motion.div
        className="relative flex w-full flex-1 flex-col items-center justify-start px-6 pt-16"
        style={{ paddingBottom: frozenPb ?? pb }}
      >
        <div
          ref={colRef}
          className="flex w-full max-w-[540px] flex-col gap-[25px]"
        >
          {/* Heading — same hero greeting treatment as the work page */}
          <motion.p
            className="text-[24px] font-medium leading-none text-foreground"
            style={{ fontFamily: "var(--font-bengali)" }}
            initial={reduce ? false : { opacity: 0, y: 14, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.45, ease: "easeOut" }}
          >
            <TextScramble text="আমাদের ইচ্ছেতালিকা" />
            <motion.span
              className="mt-2 block font-mono text-[12px] font-light tracking-[-0.3px] text-neutral-500 dark:text-neutral-400 sm:ml-3 sm:mt-0 sm:inline-block"
              variants={FADE_UP}
              initial={reduce ? false : "hidden"}
              animate="visible"
              transition={{ duration: 0.45, ease: "easeOut", delay: 0.5 }}
              style={{ fontFamily: "var(--font-bengali)" }}
            >
              স্বপ্ন ও স্মৃতির পথচলা
            </motion.span>
          </motion.p>

          {/* Stack list — numbered rows with icon pills in the exact existing design */}
          <motion.div
            variants={FADE_UP}
            initial={reduce ? false : "hidden"}
            animate="visible"
            transition={{ duration: 0.45, ease: "easeOut", delay: 0.6 }}
          >
            {BUCKET_LIST.map((group, i) => (
              <div
                key={group.name}
                className={`grid grid-cols-1 gap-2 py-4 sm:grid-cols-[140px_1fr] ${
                  i < BUCKET_LIST.length - 1
                    ? "border-b border-neutral-200/70 dark:border-neutral-800"
                    : ""
                }`}
              >
                <p className="flex items-baseline gap-2 text-[14px] leading-6">
                  <span className="font-mono text-neutral-400 dark:text-neutral-500">
                    {group.index}
                  </span>
                  <span
                    className="text-black dark:text-white"
                    style={{ fontFamily: "var(--font-bengali)" }}
                  >
                    {group.name}
                  </span>
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {group.items.map((item) => (
                    <span
                      key={item.name}
                      className={`flex h-6 items-center gap-[5px] rounded-full px-2 transition-colors ${
                        item.done
                          ? "bg-rose-50 text-rose-800 dark:bg-rose-950/40 dark:text-rose-200 border border-rose-200/60 dark:border-rose-900/40"
                          : "bg-neutral-100 text-neutral-800 dark:bg-neutral-900/80 dark:text-neutral-100"
                      }`}
                    >
                      <span className="text-[12px]">{item.icon}</span>
                      <span
                        className="text-[12px] leading-4"
                        style={{ fontFamily: "var(--font-bengali)" }}
                      >
                        {item.name}
                      </span>
                      {item.done && (
                        <span className="text-[10px] text-rose-500 font-bold ml-0.5">
                          ✓
                        </span>
                      )}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* progressive blur at the bottom — same treatment as the work page */}
      <ProgressiveBlur
        position="bottom"
        height="180px"
        className="fixed"
        blurLevels={[0.5, 1, 2, 4, 8, 16, 24, 32]}
      />
    </main>
  );
}
