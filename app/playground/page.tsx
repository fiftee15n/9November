"use client";

import { useRef, useState } from "react";
import { motion, useReducedMotion, AnimatePresence } from "motion/react";
import { TextScramble } from "@/components/motion/text-scramble";
import { ProgressiveBlur } from "@/registry/magicui/progressive-blur";

const FADE_UP = {
  hidden: { opacity: 0, y: 14, filter: "blur(6px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)" },
};

interface ChirkutItem {
  id: string;
  name: string;
  text: string;
  sender?: string;
}

interface ChirkutGroup {
  name: string;
  items: ChirkutItem[];
}

const CHIRKUT_GROUPS: ChirkutGroup[] = [
  {
    name: "ভালোবাসার চিরকুট",
    items: [
      {
        id: "note-1",
        name: "চোখের মিষ্টি তাকানো",
        text: "তুমি যখন কিছু না বলে কেবল চোখের কোণ দিয়ে মিষ্টি করে তাকাও, মনে হয় পুরো পৃথিবীটাই থমকে গেছে।",
      },
      {
        id: "note-2",
        name: "শক্ত করে হাত ধরা",
        text: "ব্যস্ত শহরের ভিড়ের মাঝে যখন আচমকা আমার হাতটা শক্ত করে আঁকড়ে ধরো, এক অদ্ভুত নির্ভয় ভরসা পাই।",
      },
      {
        id: "note-3",
        name: "ক্লান্তিতে তোমার হাসি",
        text: "সারাদিনের ক্লান্তি শেষে তোমার এক চিলতে মিষ্টি হাসি দেখলে মনে হয় সব যুদ্ধ জিতে ফিরেছি।",
      },
      {
        id: "note-4",
        name: "টিএসসির এক কাপ চা",
        text: "টিএসসির এক কাপ গরম চায়ে তোমার সাথে ভাগ করে নেওয়া ছোট্ট সুখ পৃথিবীর যেকোনো বিলাসিতার চেয়ে দামি।",
      },
      {
        id: "note-5",
        name: "এক ছাতায় বৃষ্টি ভেজা",
        text: "শ্রাবণের ঝুম বৃষ্টিতে এক ছাতার নিচে দুজনের ভিজে যাওয়ার মিষ্টি পাগলামি আমার চিরস্মরণীয় স্মৃতি।",
      },
      {
        id: "note-6",
        name: "নীল শাড়ির লজ্জা",
        text: "আমার পছন্দের নীল শাড়িটি পরে যেদিন প্রথম লজ্জামাখা মুখে সামনে এসেছিলে, সেদিন আবার নতুন করে প্রেমে পড়েছিলাম।",
      },
      {
        id: "note-7",
        name: "ভিডিও কলের মায়া",
        text: "হাজারো মাইলের দূরত্বেও ভিডিও কলের ওপাশে তোমার এক চিলতে উপস্থিতি পুরো দিনটাকে রঙিন করে দেয়।",
      },
      {
        id: "note-8",
        name: "অভিমানী মিষ্টি রাগ",
        text: "তোমার ঠোঁট ফুলিয়ে অভিমান করা যেমন মিষ্টি, তেমনি সেই অভিমান ভাঙানোর মুহূর্তগুলো আরও মধুর।",
      },
      {
        id: "note-9",
        name: "নীরব প্রার্থনার পূর্ণতা",
        text: "তুমি শুধু আমার ভালোবাসা নও, তুমি আমার তাহাজ্জুদের নীরব প্রার্থনার সবচেয়ে সুন্দর পূর্ণতা।",
      },
      {
        id: "note-10",
        name: "বেলি ফুলের মালা",
        text: "তোমার খোপায় গুঁজে দেওয়া বেলি ফুলের সুবাস আর তোমার স্নিগ্ধ রূপ আমার হৃদয়ে আঁকা থাকবে আজীবন।",
      },
      {
        id: "note-11",
        name: "নিঝুম রাতের আলাপ",
        text: "রাত পেরিয়ে ভোর হয়ে এলেও তোমার সাথে ফিসফিস করে কথা বলার মায়া যেন কখনো ফুরাতে চায় না।",
      },
      {
        id: "note-12",
        name: "জীবনের শ্রেষ্ঠ প্রাপ্তি",
        text: "প্রতিটি ৯ নভেম্বর আমাকে নতুন করে মনে করিয়ে দেয়—তুমি আমার জীবনের সবচেয়ে সুন্দর ও শ্রেষ্ঠ প্রাপ্তি।",
      },
    ],
  },
  {
    name: "হৃদয়ের প্রেমপত্র",
    items: [
      {
        id: "letter-1",
        name: "৯ নভেম্বরের চিঠি",
        text: "ফার্মগেটের ভিড়ের মাঝে প্রথম যেদিন তোমার হাতটা ছুঁয়েছিলাম, সেদিন থেকেই জীবনের সব ব্যস্ততা ম্লান হয়ে গিয়েছিল। এতগুলো দিন পেরিয়ে আজ বুঝতে পারি—তুমি শুধু আমার ভালোবাসা নও, তুমি আমার জীবনের সবচেয়ে সুন্দর শান্তির ঠিকানা।",
        sender: "— চিরদিনের তোমার",
      },
      {
        id: "letter-2",
        name: "প্রথম দেখার অনুভূতি",
        text: "যেদিন তোমাকে প্রথম দেখেছিলাম, সেদিনই হৃদয়ের গভীরে এক নতুন জীবনের শুরু হয়েছিল। সেই শুরু আজও প্রতিদিন নতুন ভোর হয়ে আসে।",
      },
      {
        id: "letter-3",
        name: "আজীবন পাশে থাকার অঙ্গীকার",
        text: "সুখ কিংবা দুঃখ—জীবনের প্রতিটি পদক্ষেপে কোনো শর্ত ছাড়া পাশে থাকার অটল অঙ্গীকার। তোমার হাত আমি কখনো ছাড়ব না।",
      },
      {
        id: "letter-4",
        name: "১০ বছর পরের চিঠি",
        text: "দশ বছর পরের এক বিকেলে আমরা যখন পেছনে তাকাব, তখনও যেন এভাবেই পরম মায়ায় হাত দুটো শক্ত করে ধরা থাকে।",
      },
      {
        id: "letter-5",
        name: "অসুখে পরম যত্নের চিঠি",
        text: "তোমার সামান্য কষ্টেও যখন ব্যাকুল হয়ে যত্ন নাও, কপালে হাত বুলিয়ে দাও, তখনই বুঝি ভালোবাসা কেবল অনুভূতি নয়—পরম আশ্রয়।",
      },
    ],
  },
  {
    name: "কাব্য ও পঙক্তি",
    items: [
      {
        id: "poem-1",
        name: "তুমি সন্ধ্যার মেঘমালা",
        text: "তুমি সন্ধ্যার মেঘমালা, তুমি আমার সাধের সাধনা, মম বিজন-গগন-চারী... আমি আপন মনের মাধুরী মিশায়ে তোমারে করেছি রচনা।",
        sender: "— রবীন্দ্রনাথ ঠাকুর",
      },
      {
        id: "poem-2",
        name: "হাজার বছর ধরে পথ চলা",
        text: "হাজার বছর ধরে আমি পথ হাঁটিতেছি পৃথিবীর পথে... চুল তার কবেকার অন্ধকার বিদিশার নিশা, মুখ তার শ্রাবস্তীর কারুকার্য।",
        sender: "— জীবনানন্দ দাশ",
      },
      {
        id: "poem-3",
        name: "তোমার চোখে আমার আকাশ",
        text: "তোমার চোখের গভীরতায় হারিয়ে গিয়ে আমি খুঁজে পেয়েছি আমার নিজস্ব এক শান্ত ও মায়াবী নীল আকাশ।",
      },
      {
        id: "poem-4",
        name: "হৃদয় মাঝে তুমি শুধু",
        text: "হৃদয়ের প্রতিটি স্পন্দনে জড়িয়ে আছে কেবল তোমার মিষ্টি নাম আর না-বলা যত ভালোবাসার গুঞ্জন।",
      },
      {
        id: "poem-5",
        name: "অনন্ত প্রেমের সুর",
        text: "যে সুরে বাঁধা আমাদের ভালোবাসার পথচলা, সে সুর কালের সব ঝড় পেরিয়ে বেঁচে থাকবে অনন্তকাল।",
      },
    ],
  },
  {
    name: "গোপন চিরকুট",
    items: [
      {
        id: "secret-1",
        name: "তুমিই শেষ গন্তব্য",
        text: "যেদিন তোমাকে প্রথম দেখেছিলাম, সেদিনই মনের অজান্তে বুঝেছিলাম—আমার সারা জীবনের শেষ গন্তব্য কেবল তুমি।",
      },
      {
        id: "secret-2",
        name: "আমার জীবনের শ্রেষ্ঠ উপহার",
        text: "সব চাওয়া-পাওয়ার ঊর্ধ্বে বিধাতা আমাকে দেওয়া সবচেয়ে সুন্দর, স্নিগ্ধ ও অমূল্য উপহারটি তুমি।",
      },
      {
        id: "secret-3",
        name: "তোমার বুকেই প্রশান্তি",
        text: "দিনের শেষে ক্লান্তিতে তোমার কাঁধে মাথা রাখার চেয়ে পরম শান্তি ও স্বস্তি এই পৃথিবীতে আর কোথাও নেই।",
      },
      {
        id: "secret-4",
        name: "চুল পাকলেও হাত ধরা",
        text: "বয়সের ভারে চুল পাকলেও ষাট বছর পরের এক বিকেলে যেন ঠিক এই হাত দুটো এভাবেই শক্ত করে ধরে রাখতে পারি।",
      },
      {
        id: "secret-5",
        name: "অনন্ত ভালোবাসা",
        text: "ভালোবাসা কোনো ক্ষণস্থায়ী আবেগ নয়, এ ভালোবাসা জীবন পার হয়ে অনন্তকালের সাক্ষী।",
      },
    ],
  },
];

export default function PlaygroundPage() {
  const reduce = useReducedMotion() ?? false;
  const colRef = useRef<HTMLDivElement>(null);
  const [selectedItem, setSelectedItem] = useState<ChirkutItem>(
    CHIRKUT_GROUPS[1].items[0] // 9 November letter by default
  );

  return (
    <main className="flex flex-1 flex-col items-center justify-start bg-background text-foreground">
      <motion.div className="relative flex w-full flex-1 flex-col items-center justify-start px-6 pt-16 pb-48 sm:pb-60">
        <div
          ref={colRef}
          className="flex w-full max-w-[540px] flex-col gap-[25px]"
        >
          {/* Heading — same hero greeting treatment as icche page */}
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

          {/* Interactive Note Display Box — opens selected note smoothly */}
          <motion.div
            variants={FADE_UP}
            initial={reduce ? false : "hidden"}
            animate="visible"
            transition={{ duration: 0.45, ease: "easeOut", delay: 0.55 }}
            className="overflow-hidden rounded-2xl border border-dashed border-rose-200/90 bg-gradient-to-br from-white/90 via-rose-50/25 to-amber-50/20 p-4 shadow-2xs dark:border-rose-900/40 dark:from-neutral-900/90 dark:via-neutral-850 dark:to-neutral-900/90 backdrop-blur-md"
          >
            <div className="flex items-center justify-between text-[11px] mb-2">
              <span
                className="font-semibold text-rose-700 dark:text-rose-300"
                style={{ fontFamily: "var(--font-bengali)" }}
              >
                {selectedItem.name}
              </span>
              <span
                className="text-[10px] text-neutral-400"
                style={{ fontFamily: "var(--font-bengali)" }}
              >
                পড়ার জন্য যেকোনো চিরকুটে ট্যাপ করো
              </span>
            </div>

            <div className="min-h-[58px] flex items-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedItem.id}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  transition={{ duration: 0.2 }}
                  className="w-full"
                >
                  <p
                    className="text-[13px] leading-relaxed text-neutral-700 dark:text-neutral-200 italic"
                    style={{ fontFamily: "var(--font-bengali)" }}
                  >
                    &ldquo;{selectedItem.text}&rdquo;
                  </p>
                  {selectedItem.sender && (
                    <div className="mt-1.5 flex justify-end">
                      <span
                        className="text-[11.5px] font-medium text-rose-600 dark:text-rose-400 italic"
                        style={{ fontFamily: "var(--font-bengali)" }}
                      >
                        {selectedItem.sender}
                      </span>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Numbered Rows with Icon Pills in the exact existing design of icche */}
          <motion.div
            variants={FADE_UP}
            initial={reduce ? false : "hidden"}
            animate="visible"
            transition={{ duration: 0.45, ease: "easeOut", delay: 0.6 }}
          >
            {CHIRKUT_GROUPS.map((group, i) => (
              <div
                key={group.name}
                className={`grid grid-cols-1 gap-2 py-4 sm:grid-cols-[145px_1fr] ${
                  i < CHIRKUT_GROUPS.length - 1
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
                  {group.items.map((item) => {
                    const isSelected = selectedItem.id === item.id;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setSelectedItem(item)}
                        className={`flex h-6 items-center rounded-full px-2.5 text-[12px] leading-4 transition-all duration-200 cursor-pointer select-none active:scale-95 ${
                          isSelected
                            ? "bg-rose-500 text-white shadow-xs dark:bg-rose-600"
                            : "bg-neutral-100 text-neutral-800 hover:bg-neutral-200/80 hover:text-black dark:bg-neutral-900/80 dark:text-neutral-100 dark:hover:bg-neutral-800 dark:hover:text-white"
                        }`}
                        style={{ fontFamily: "var(--font-bengali)" }}
                      >
                        <span>{item.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </motion.div>
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