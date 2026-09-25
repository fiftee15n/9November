"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import { motion, AnimatePresence, useReducedMotion, useScroll, useTransform } from "motion/react";
import { ProgressiveBlur } from "@/registry/magicui/progressive-blur";
import { INITIAL_BUCKET_LIST, BUCKET_CATEGORIES, type BucketItem } from "@/lib/bucketListData";

const FADE_UP = {
  hidden: { opacity: 0, y: 16, filter: "blur(6px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)" },
};

export default function BucketListPage() {
  const reduce = useReducedMotion() ?? false;
  const colRef = useRef<HTMLDivElement>(null);
  const [items, setItems] = useState<BucketItem[]>(INITIAL_BUCKET_LIST);
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [justCheckedId, setJustCheckedId] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  // Load from localStorage if user previously marked items
  useEffect(() => {
    setMounted(true);
    try {
      const saved = localStorage.getItem("our_bucket_list_state");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setItems(parsed);
        }
      }
    } catch {
      // ignore
    }
  }, []);

  const toggleItem = (id: string) => {
    setItems((prev) => {
      const next = prev.map((item) => {
        if (item.id === id) {
          const willBeCompleted = !item.completed;
          if (willBeCompleted) {
            setJustCheckedId(id);
            setTimeout(() => setJustCheckedId(null), 1200);
          }
          return {
            ...item,
            completed: willBeCompleted,
            completedDate: willBeCompleted
              ? item.completedDate || "আজ পূরণ হলো ✨"
              : undefined,
          };
        }
        return item;
      });
      try {
        localStorage.setItem("our_bucket_list_state", JSON.stringify(next));
      } catch {
        // ignore
      }
      return next;
    });
  };

  // Stats calculation
  const totalCount = items.length;
  const completedCount = useMemo(
    () => items.filter((i) => i.completed).length,
    [items]
  );
  const pendingCount = totalCount - completedCount;
  const progressPercent = Math.round((completedCount / totalCount) * 100);

  // Filtered items
  const filteredItems = useMemo(() => {
    if (activeCategory === "all") return items;
    if (activeCategory === "completed") return items.filter((i) => i.completed);
    if (activeCategory === "pending") return items.filter((i) => !i.completed);
    return items.filter((i) => i.category === activeCategory);
  }, [items, activeCategory]);

  const { scrollYProgress } = useScroll();
  const pb = useTransform(scrollYProgress, [0.2, 1], ["60px", "260px"]);

  return (
    <main className="flex flex-1 flex-col items-center justify-start bg-transparent text-foreground">
      <motion.div
        className="relative flex w-full flex-1 flex-col items-center justify-start px-3.5 sm:px-6 pt-10 sm:pt-16"
        style={{ paddingBottom: pb }}
      >
        <div ref={colRef} className="flex w-full max-w-2xl flex-col gap-6">
          {/* Header */}
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 16, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="flex flex-col items-center text-center"
          >
            {/* Glowing Tag Pill */}
            <div className="inline-flex items-center gap-1.5 rounded-full border border-rose-300/60 bg-rose-50/70 px-3.5 py-1 text-xs font-semibold text-rose-600 shadow-xs dark:border-rose-500/30 dark:bg-rose-950/40 dark:text-rose-300 backdrop-blur-md">
              <span className="text-sm">✨</span>
              <span style={{ fontFamily: "var(--font-bengali)" }}>
                আমাদের স্বপ্ন ও পথচলা
              </span>
            </div>

            {/* Title */}
            <h1
              className="mt-3 text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-900 dark:text-white"
              style={{ fontFamily: "var(--font-bengali)" }}
            >
              আমাদের ইচ্ছেতালিকা
            </h1>

            {/* Subtitle */}
            <p
              className="mt-2 text-sm sm:text-base leading-relaxed text-neutral-600 dark:text-neutral-400 max-w-lg"
              style={{ fontFamily: "var(--font-bengali)" }}
            >
              কিছু স্বপ্ন সত্যি হয়েছে সোনালি স্মৃতির পাতায়, আর কিছু স্বপ্ন ডানা
              মেলার অপেক্ষায়...
            </p>
          </motion.div>

          {/* Progress & Milestone Dashboard */}
          <motion.div
            variants={FADE_UP}
            initial={reduce ? false : "hidden"}
            animate="visible"
            transition={{ duration: 0.45, ease: "easeOut", delay: 0.15 }}
            className="relative overflow-hidden rounded-2xl sm:rounded-3xl border border-rose-200/80 bg-gradient-to-br from-white/90 via-rose-50/30 to-amber-50/40 p-4 sm:p-5 shadow-sm dark:border-rose-900/40 dark:from-neutral-900/90 dark:via-neutral-850 dark:to-neutral-900/90 backdrop-blur-xl"
          >
            <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
              <div>
                <span
                  className="text-xs sm:text-sm font-bold text-neutral-800 dark:text-neutral-100 flex items-center gap-1.5"
                  style={{ fontFamily: "var(--font-bengali)" }}
                >
                  <span>💖</span> স্বপ্নের অগ্রগতি
                </span>
                <p
                  className="text-[11px] sm:text-xs text-neutral-500 dark:text-neutral-400 mt-0.5"
                  style={{ fontFamily: "var(--font-bengali)" }}
                >
                  {completedCount}টি পূরণ হয়েছে • {pendingCount}টি বাকি
                </p>
              </div>

              {/* Percentage Badge */}
              <div
                className="flex items-center gap-1 rounded-full bg-rose-500/10 px-3 py-1 font-mono text-xs font-bold text-rose-600 dark:text-rose-400 border border-rose-500/20"
                style={{ fontFamily: "var(--font-bengali)" }}
              >
                <span>{progressPercent}%</span>
                <span className="text-[10px] font-normal text-rose-500/80">
                  সম্পূর্ণ
                </span>
              </div>
            </div>

            {/* Glowing Visual Progress Bar */}
            <div className="relative h-2.5 sm:h-3 w-full overflow-hidden rounded-full bg-neutral-200/70 dark:bg-neutral-800/80 p-0.5">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-rose-500 via-pink-500 to-amber-400 shadow-sm"
                initial={{ width: 0 }}
                animate={{ width: `${progressPercent}%` }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              />
            </div>

            {/* Micro Stats Grid */}
            <div className="mt-3.5 grid grid-cols-3 gap-2 border-t border-rose-100/80 dark:border-neutral-800/80 pt-3 text-center">
              <div>
                <span className="block text-base sm:text-lg font-extrabold text-neutral-900 dark:text-white">
                  {totalCount}
                </span>
                <span
                  className="text-[10px] sm:text-[11px] text-neutral-500 dark:text-neutral-400"
                  style={{ fontFamily: "var(--font-bengali)" }}
                >
                  মোট ইচ্ছে
                </span>
              </div>
              <div>
                <span className="block text-base sm:text-lg font-extrabold text-rose-500 dark:text-rose-400">
                  {completedCount}
                </span>
                <span
                  className="text-[10px] sm:text-[11px] text-neutral-500 dark:text-neutral-400"
                  style={{ fontFamily: "var(--font-bengali)" }}
                >
                  স্মৃতিতে আঁকা ✨
                </span>
              </div>
              <div>
                <span className="block text-base sm:text-lg font-extrabold text-amber-500 dark:text-amber-400">
                  {pendingCount}
                </span>
                <span
                  className="text-[10px] sm:text-[11px] text-neutral-500 dark:text-neutral-400"
                  style={{ fontFamily: "var(--font-bengali)" }}
                >
                  আগামীর স্বপ্ন 💫
                </span>
              </div>
            </div>
          </motion.div>

          {/* Category Filter Pills */}
          <motion.div
            variants={FADE_UP}
            initial={reduce ? false : "hidden"}
            animate="visible"
            transition={{ duration: 0.45, ease: "easeOut", delay: 0.25 }}
            className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none"
          >
            {BUCKET_CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  type="button"
                  className={`relative flex items-center gap-1.5 shrink-0 rounded-full px-3 py-1.5 text-xs font-semibold transition-all duration-200 cursor-pointer ${
                    isActive
                      ? "bg-rose-500 text-white shadow-xs dark:bg-rose-600"
                      : "bg-white/80 text-neutral-600 hover:bg-neutral-100 hover:text-black dark:bg-neutral-900/80 dark:text-neutral-300 dark:hover:bg-neutral-800 dark:hover:text-white border border-neutral-200/70 dark:border-neutral-800"
                  }`}
                  style={{ fontFamily: "var(--font-bengali)" }}
                >
                  <span className="text-xs">{cat.icon}</span>
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </motion.div>

          {/* Bucket List Items */}
          <motion.div
            variants={FADE_UP}
            initial={reduce ? false : "hidden"}
            animate="visible"
            transition={{ duration: 0.45, ease: "easeOut", delay: 0.35 }}
            className="flex flex-col gap-2.5 sm:gap-3"
          >
            <AnimatePresence mode="popLayout">
              {filteredItems.map((item, idx) => {
                const isJustCelebrated = justCheckedId === item.id;
                return (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{
                      duration: 0.3,
                      delay: Math.min(idx * 0.03, 0.3),
                    }}
                    onClick={() => toggleItem(item.id)}
                    className={`group relative flex items-start gap-3 sm:gap-4 overflow-hidden rounded-2xl border p-3.5 sm:p-4.5 cursor-pointer transition-all duration-300 select-none ${
                      item.completed
                        ? "border-rose-200/90 bg-white/95 dark:border-rose-900/40 dark:bg-neutral-900/95 shadow-xs hover:border-rose-300"
                        : "border-neutral-200/70 bg-white/80 dark:border-neutral-800/80 dark:bg-neutral-900/80 shadow-2xs hover:border-neutral-300 hover:bg-white dark:hover:bg-neutral-850"
                    } ${
                      isJustCelebrated
                        ? "ring-2 ring-rose-400 ring-offset-2 dark:ring-offset-neutral-950"
                        : ""
                    }`}
                  >
                    {/* Checkbox Button */}
                    <div className="pt-0.5 shrink-0">
                      <motion.div
                        whileTap={{ scale: 0.8 }}
                        animate={
                          isJustCelebrated
                            ? { scale: [1, 1.35, 1], rotate: [0, -12, 12, 0] }
                            : {}
                        }
                        transition={{ duration: 0.4 }}
                        className={`flex size-6 sm:size-7 items-center justify-center rounded-full border-2 transition-all duration-300 ${
                          item.completed
                            ? "border-rose-500 bg-rose-500 text-white shadow-xs dark:border-rose-500 dark:bg-rose-500"
                            : "border-neutral-300 bg-neutral-50 group-hover:border-rose-400 group-hover:bg-rose-50/50 dark:border-neutral-700 dark:bg-neutral-800 dark:group-hover:border-rose-500/70"
                        }`}
                      >
                        {item.completed ? (
                          <motion.svg
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="size-3.5 sm:size-4"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={3}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <polyline points="20 6 9 17 4 12" />
                          </motion.svg>
                        ) : (
                          <span className="size-1.5 rounded-full bg-neutral-300 opacity-0 transition-opacity group-hover:opacity-100 dark:bg-neutral-600" />
                        )}
                      </motion.div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-1.5 mb-1">
                        {/* Category Tag */}
                        <span
                          className="inline-flex items-center gap-1 text-[10px] sm:text-[11px] font-semibold px-2 py-0.5 rounded-full bg-neutral-100 text-neutral-600 dark:bg-neutral-800 dark:text-neutral-300"
                          style={{ fontFamily: "var(--font-bengali)" }}
                        >
                          <span>{item.categoryIcon}</span>
                          <span>{item.categoryLabel}</span>
                        </span>

                        {/* Tag */}
                        <span
                          className="text-[10px] text-neutral-400 dark:text-neutral-500"
                          style={{ fontFamily: "var(--font-bengali)" }}
                        >
                          • {item.tag}
                        </span>

                        {/* Completion / Status Badge */}
                        {item.completed ? (
                          <span
                            className="ml-auto inline-flex items-center gap-1 text-[10px] sm:text-[11px] font-bold text-rose-600 dark:text-rose-400 bg-rose-50/80 dark:bg-rose-950/40 px-2 py-0.5 rounded-full"
                            style={{ fontFamily: "var(--font-bengali)" }}
                          >
                            <span>✨</span>
                            <span>
                              {item.completedDate || "পূরণ হয়েছে"}
                            </span>
                          </span>
                        ) : (
                          <span
                            className="ml-auto text-[10px] sm:text-[11px] font-medium text-amber-600 dark:text-amber-400 bg-amber-50/80 dark:bg-amber-950/40 px-2 py-0.5 rounded-full"
                            style={{ fontFamily: "var(--font-bengali)" }}
                          >
                            💫 বাকি আছে
                          </span>
                        )}
                      </div>

                      {/* Wish Title */}
                      <h3
                        className={`text-sm sm:text-base font-bold leading-snug transition-colors ${
                          item.completed
                            ? "text-neutral-900 dark:text-white"
                            : "text-neutral-800 dark:text-neutral-200"
                        }`}
                        style={{ fontFamily: "var(--font-bengali)" }}
                      >
                        {item.title}
                      </h3>

                      {/* Wish Description */}
                      <p
                        className="mt-1 text-xs sm:text-[13px] leading-relaxed text-neutral-600 dark:text-neutral-400"
                        style={{ fontFamily: "var(--font-bengali)" }}
                      >
                        {item.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>

            {filteredItems.length === 0 && (
              <div
                className="py-12 text-center text-sm text-neutral-400"
                style={{ fontFamily: "var(--font-bengali)" }}
              >
                এই ক্যাটাগরিতে এখনো কোনো ইচ্ছে যোগ করা হয়নি ✨
              </div>
            )}
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
