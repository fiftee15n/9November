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
    name: "প্রেমের স্মৃতি ও মধুর মুহূর্ত",
    items: [
      { name: "প্রথম হাত ধরা", icon: "🤝", done: true },
      { name: "হুডখোলা রিকশা ভ্রমণ", icon: "🛺", done: true },
      { name: "এক ছাতায় বৃষ্টি ভেজা", icon: "🌧️", done: true },
      { name: "টিএসসির মাটির কাপে চা", icon: "☕", done: true },
      { name: "খোপায় বেলি ফুলের মালা", icon: "🌸", done: true },
      { name: "রেশমি কাচের চুড়ি পরানো", icon: "✨", done: false },
      { name: "নীল শাড়িতে বিশেষ সাজ", icon: "👗", done: true },
      { name: "ভিডিও কলে রাত জাগা", icon: "📱", done: true },
      { name: "এক ইয়ারফোনে গান শোনা", icon: "🎧", done: true },
      { name: "বইমেলায় হাত ধরে ঘোরা", icon: "📚", done: false },
      { name: "হাতে লেখা প্রেমপত্র", icon: "💌", done: false },
      { name: "মাঝরাতে আইসক্রিম ডেট", icon: "🍦", done: false },
      { name: "কপালে স্নেহের চুম্বন", icon: "🌙", done: true },
    ],
  },
  {
    index: "02",
    name: "শুভ পরিণয় ও বিয়ের সাজ",
    items: [
      { name: "আংটি বদল ও শুভ সম্মতি", icon: "💍", done: false },
      { name: "গায়ে হলুদের কাঁচা হলুদ", icon: "💛", done: false },
      { name: "লাল বেনারসি ও শেরওয়ানি", icon: "👰", done: false },
      { name: "কবুল বলে চিরদিনের হওয়া", icon: "🕊️", done: false },
      { name: "বাসর রাতের লজ্জা ও গল্প", icon: "🕯️", done: false },
      { name: "ওয়েডিং ফটোশুট", icon: "📸", done: false },
      { name: "যুগল মোনাজাত ও দোয়া", icon: "🤲", done: false },
    ],
  },
  {
    index: "03",
    name: "সংসার ও দাম্পত্য জীবন",
    items: [
      { name: "স্বপ্নের নীড় সাজানো", icon: "🏡", done: false },
      { name: "এক কাপ চায়ে সকাল শুরু", icon: "☕", done: false },
      { name: "ছুটির সকালে একসাথে রান্না", icon: "🍳", done: false },
      { name: "হাত ধরে কাঁচাবাজারে যাওয়া", icon: "🛒", done: false },
      { name: "প্রথম সেহরি ও ইফতার", icon: "🌙", done: false },
      { name: "বারান্দার টবে ফুলবাগান", icon: "🪴", done: false },
      { name: "অসুস্থতায় পরম যত্নে সেবা", icon: "🩹", done: false },
      { name: "তুলতুলে বিড়ালছানা দত্তক", icon: "🐱", done: false },
      { name: "ক্লান্ত সন্ধ্যায় কাঁধে মাথা", icon: "🛋️", done: false },
      { name: "আমাদের ভালোবাসার প্রতিচ্ছবি", icon: "👶", done: false },
    ],
  },
  {
    index: "04",
    name: "ভ্রমণ ও দূর সীমানায়",
    items: [
      { name: "সাজেক ভ্যালির মেঘ ছোঁয়া", icon: "☁️", done: false },
      { name: "সৈকতে লাল সূর্যাস্ত দেখা", icon: "🌅", done: false },
      { name: "সিলেটের সবুজ চা বাগান", icon: "🍃", done: false },
      { name: "শান্ত নদীতে নৌকায় ভাসা", icon: "⛵", done: false },
      { name: "পাহাড়ে তাঁবুতে তারা দেখা", icon: "⛺", done: false },
      { name: "পাসপোর্ট হাতে বিশ্বভ্রমণ", icon: "🗺️", done: false },
      { name: "বৃষ্টির দিনে লং ড্রাইভ", icon: "🚗", done: false },
    ],
  },
  {
    index: "05",
    name: "অনন্ত নির্ভরতা ও বার্ধক্য",
    items: [
      { name: "জীবনের সব ঝড়ে অটুট ঢাল", icon: "🛡️", done: true },
      { name: "পাশাপাশি বসে নিবিড় গল্প", icon: "🕯️", done: true },
      { name: "চুল পাকলেও শক্ত করে হাত ধরা", icon: "👵👴", done: false },
      { name: "শেষ নিঃশ্বাস পর্যন্ত ভালোবাসা", icon: "♾️", done: true },
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
