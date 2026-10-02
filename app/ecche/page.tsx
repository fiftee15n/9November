"use client";

import { useRef } from "react";
import { motion, useReducedMotion } from "motion/react";
import { PoeticTitle } from "@/components/motion/poetic-title";
import { ProgressiveBlur } from "@/registry/magicui/progressive-blur";

// same entrance the work page heading uses
const FADE_UP = {
  hidden: { opacity: 0, y: 14, filter: "blur(6px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)" },
};

const BUCKET_LIST = [
  {
    name: "প্রেমের স্মৃতি ও মধুর মুহূর্ত",
    items: [
      { name: "প্রথম হাত ধরা", done: true },
      { name: "হুডখোলা রিকশা ভ্রমণ", done: true },
      { name: "এক ছাতায় বৃষ্টি ভেজা", done: true },
      { name: "টিএসসির মাটির কাপে চা", done: true },
      { name: "খোপায় বেলি ফুলের মালা", done: true },
      { name: "রেশমি কাচের চুড়ি পরানো", done: false },
      { name: "নীল শাড়িতে বিশেষ সাজ", done: true },
      { name: "ভিডিও কলে রাত জাগা", done: true },
      { name: "এক ইয়ারফোনে গান শোনা", done: true },
      { name: "বইমেলায় হাত ধরে ঘোরা", done: false },
      { name: "হাতে লেখা প্রেমপত্র", done: false },
      { name: "মাঝরাতে আইসক্রিম ডেট", done: false },
      { name: "একসাথে বসে দীর্ঘসময় চাঁদ দেখা", done: false },
      { name: "ছাদে বা নিরিবিলি কোথাও আকাশ ভরা তারা দেখা", done: false },
      { name: "প্রত্যেক আষাঢ় এ এক গুচ্ছ দোলনচাঁপা নিয়ে শহরের রাস্তায় ঘুরা", done: false },
      { name: "কপালে স্নেহের চুম্বন", done: true },
    ],
  },
  {
    name: "শুভ পরিণয় ও বিয়ের সাজ",
    items: [
      { name: "আংটি বদল ও শুভ সম্মতি", done: false },
      { name: "গায়ে হলুদের কাঁচা হলুদ", done: false },
      { name: "লাল বেনারসি ও শেরওয়ানি", done: false },
      { name: "কবুল বলে চিরদিনের হওয়া", done: false },
      { name: "বাসর রাতের লজ্জা ও গল্প", done: false },
      { name: "ওয়েডিং ফটোশুট", done: false },
      { name: "যুগল মোনাজাত ও দোয়া", done: false },
    ],
  },
  {
    name: "সংসার ও দাম্পত্য জীবন",
    items: [
      { name: "স্বপ্নের নীড় সাজানো", done: false },
      { name: "এক কাপ চায়ে সকাল শুরু", done: false },
      { name: "ছুটির সকালে একসাথে রান্না", done: false },
      { name: "হাত ধরে কাঁচাবাজারে যাওয়া", done: false },
      { name: "প্রথম সেহরি ও ইফতার", done: false },
      { name: "বারান্দার টবে ফুলবাগান", done: false },
      { name: "অসুস্থতায় পরম যত্নে সেবা", done: false },
      { name: "তুলতুলে বিড়ালছানা দত্তক", done: false },
      { name: "ক্লান্ত সন্ধ্যায় কাঁধে মাথা", done: false },
      { name: "আমাদের ভালোবাসার প্রতিচ্ছবি", done: false },
    ],
  },
  {
    name: "ভ্রমণ ও দূর সীমানায়",
    items: [
      { name: "একসাথে সমুদ্র দেখা", done: false },
      { name: "একসাথে সূর্যোদয় দেখা", done: false },
      { name: "সাজেক ভ্যালির মেঘ ছোঁয়া", done: false },
      { name: "সৈকতে লাল সূর্যাস্ত দেখা", done: false },
      { name: "সিলেটের সবুজ চা বাগান", done: false },
      { name: "শান্ত নদীতে নৌকায় ভাসা", done: false },
      { name: "পাহাড়ে তাঁবুতে তারা দেখা", done: false },
      { name: "পাসপোর্ট হাতে বিশ্বভ্রমণ", done: false },
      { name: "বৃষ্টির দিনে লং ড্রাইভ", done: false },
    ],
  },
  {
    name: "অনন্ত নির্ভরতা ও বার্ধক্য",
    items: [
      { name: "জীবনের সব ঝড়ে অটুট ঢাল", done: true },
      { name: "পাশাপাশি বসে নিবিড় গল্প", done: true },
      { name: "চুল পাকলেও শক্ত করে হাত ধরা", done: false },
      { name: "শেষ নিঃশ্বাস পর্যন্ত ভালোবাসা", done: true },
    ],
  },
];

export default function EcchePage() {
  const reduce = useReducedMotion() ?? false;
  const colRef = useRef<HTMLDivElement>(null);

  return (
    <main className="flex flex-1 flex-col items-center justify-start bg-background text-foreground">
      <motion.div
        className="relative flex w-full flex-1 flex-col items-center justify-start px-6 pt-16 pb-48 sm:pb-60"
      >
        <div
          ref={colRef}
          className="flex w-full max-w-[540px] flex-col gap-[25px]"
        >
          {/* Heading — poetic smooth transition */}
          <PoeticTitle
            title="আমাদের ইচ্ছেতালিকা"
            subtitle="স্বপ্ন ও স্মৃতির পথচলা"
          />

          {/* Bucket list — rows without numbers and icon pills */}
          <motion.div
            variants={FADE_UP}
            initial={reduce ? false : "hidden"}
            animate="visible"
            transition={{ duration: 0.45, ease: "easeOut", delay: 0.6 }}
          >
            {BUCKET_LIST.map((group, i) => (
              <div
                key={group.name}
                className={`grid grid-cols-1 gap-2 py-4 sm:grid-cols-[150px_1fr] ${
                  i < BUCKET_LIST.length - 1
                    ? "border-b border-neutral-200/70 dark:border-neutral-800"
                    : ""
                }`}
              >
                <p className="flex items-baseline text-[14px] leading-6">
                  <span
                    className="text-black dark:text-white font-medium"
                    style={{ fontFamily: "var(--font-bengali)" }}
                  >
                    {group.name}
                  </span>
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {group.items.map((item) => (
                    <span
                      key={item.name}
                      className={`flex h-6 items-center rounded-full px-2.5 transition-colors ${
                        item.done
                          ? "bg-rose-50 text-rose-800 dark:bg-rose-950/40 dark:text-rose-200 border border-rose-200/60 dark:border-rose-900/40"
                          : "bg-neutral-100 text-neutral-800 dark:bg-neutral-900/80 dark:text-neutral-100"
                      }`}
                    >
                      <span
                        className="text-[12px] leading-4"
                        style={{ fontFamily: "var(--font-bengali)" }}
                      >
                        {item.name}
                      </span>
                      {item.done && (
                        <span className="text-[10px] text-rose-500 font-bold ml-1.5">
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

      {/* progressive blur at the bottom */}
      <ProgressiveBlur
        position="bottom"
        height="180px"
        className="fixed"
        blurLevels={[0.5, 1, 2, 4, 8, 16, 24, 32]}
      />
    </main>
  );
}
