"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";
import { GitHubHoverCard } from "@/components/Hero/GitHubHoverCard";
import { XHoverCard } from "@/components/Hero/XHoverCard";
import { LinkedInHoverCard } from "@/components/Hero/LinkedInHoverCard";
import { WelcomeGate } from "@/components/WelcomeGate";
import { useWelcomeDone } from "@/components/WelcomeDoneContext";
import { Button, ButtonLink } from "@/components/motion/button";
import { ActionSwapCascadeText, ActionSwapIcon } from "@/components/motion/action-swap";
import { TextScramble } from "@/components/motion/text-scramble";
import { ProjectsSection } from "@/components/ProjectsSection";
import { ArchiveSection } from "@/components/ArchiveSection";
import { ColophonSection } from "@/components/ColophonSection";
import { LinksLine } from "@/components/LinksLine";
import { ProgressiveBlur } from "@/registry/magicui/progressive-blur";

const GH_CARD_W = 290;
const GH_CARD_HALF = GH_CARD_W / 2;

const FADE_UP = {
  hidden: { opacity: 0, y: 14, filter: "blur(6px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)" },
};

function HeroContent() {
  const welcomeDone = useWelcomeDone();
  const [pillHovered, setPillHovered] = useState<"x" | "gh" | "li" | null>(null);
  const [pillOffset, setPillOffset] = useState(0);
  const [pillCardY, setPillCardY] = useState(0);
  const [mailCopied, setMailCopied] = useState(false);
  const reduce = useReducedMotion() ?? false;
  // same bottom treatment as the work page: content rises above the fixed
  // blur/dock zone as the page scrolls
  const { scrollYProgress } = useScroll();
  const pb = useTransform(scrollYProgress, [0.2, 1], ["40px", "200px"]);
  const ghWrapperRef = useRef<HTMLDivElement>(null);
  const xWrapperRef = useRef<HTMLDivElement>(null);
  const liWrapperRef = useRef<HTMLDivElement>(null);
  const pillRowRef = useRef<HTMLDivElement>(null);
  const sigRef = useRef<HTMLDivElement>(null);

  // magnetic ink: the resting signature leans toward a nearby cursor (max ~3px
  // drift + ~1.2deg tilt) and settles back with a soft spring when it leaves
  const sigMagX = useMotionValue(0);
  const sigMagY = useMotionValue(0);
  const sigMagR = useMotionValue(0);
  const sigSpringX = useSpring(sigMagX, { stiffness: 150, damping: 20, mass: 0.5 });
  const sigSpringY = useSpring(sigMagY, { stiffness: 150, damping: 20, mass: 0.5 });
  const sigSpringR = useSpring(sigMagR, { stiffness: 150, damping: 20, mass: 0.5 });

  const handleSigMagnetic = (e: React.MouseEvent) => {
    const el = sigRef.current;
    if (!el || reduce) return;
    const r = el.getBoundingClientRect();
    const dx = e.clientX - (r.left + r.width / 2);
    const dy = e.clientY - (r.top + r.height / 2);
    const dist = Math.hypot(dx, dy);
    const RADIUS = 240;
    if (dist > RADIUS || dist === 0) {
      sigMagX.set(0);
      sigMagY.set(0);
      sigMagR.set(0);
      return;
    }
    const pull = 1 - dist / RADIUS;
    sigMagX.set((dx / dist) * 3 * pull);
    sigMagY.set((dy / dist) * 3 * pull);
    sigMagR.set((dx / RADIUS) * 1.2);
  };

  // one shared card morphs between the three pills: x/y are relative to the pill
  // row and clamp to the viewport, so switching buttons glides instead of jumping
  const pillWrapperRefs = { x: xWrapperRef, gh: ghWrapperRef, li: liWrapperRef };
  const getPillOffset = (e: React.MouseEvent) => {
    if (!pillRowRef.current) return 0;
    const r = pillRowRef.current.getBoundingClientRect();
    const clamped = Math.min(Math.max(e.clientX, GH_CARD_HALF + 12), document.documentElement.clientWidth - GH_CARD_HALF - 12);
    return clamped - r.left - GH_CARD_HALF;
  };
  const hoverPill = (target: "x" | "gh" | "li", e: React.MouseEvent) => {
    setPillOffset(getPillOffset(e));
    const wrapper = pillWrapperRefs[target].current;
    if (wrapper && pillRowRef.current) {
      setPillCardY(wrapper.getBoundingClientRect().bottom - pillRowRef.current.getBoundingClientRect().top + 12);
    }
    setPillHovered(target);
  };

  return (
    <div
      className="relative flex flex-1 flex-col bg-background text-foreground"
      onMouseMove={handleSigMagnetic}
    >
      <motion.div className="flex flex-1 flex-col items-center justify-start px-6 pt-16" style={{ paddingBottom: pb }}>
        <div className="flex w-full max-w-[540px] flex-col items-start text-left">
        <motion.div
          id="hero-signature"
          ref={sigRef}
          className="mb-6 h-28 w-auto shrink-0 self-start"
          aria-label="Logo"
          style={{ x: sigSpringX, y: sigSpringY, rotate: sigSpringR }}
          initial={reduce ? false : { opacity: 0 }}
          animate={welcomeDone ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0 }}
        >
          <img
            src="/logo-cropped.png"
            alt="Logo"
            className="h-28 w-auto object-contain select-none"
            draggable={false}
          />
        </motion.div>

        <p className="text-[24px] sm:text-[26px] font-semibold leading-snug text-foreground" style={{ fontFamily: "var(--font-bengali), var(--font-geist-sans), sans-serif" }}>
          <TextScramble text="আমাদের ভালোবাসার গল্প" glyphs="অআইঈউঊঋএঐওঔকখগঘঙচছজঝঞটঠডঢণতথদধনপফবভমযরলশষসহ০১২৩৪৫৬৭৮৯" active={welcomeDone} />
        </p>

        <motion.p
          variants={FADE_UP}
          initial={reduce ? false : "hidden"}
          animate={welcomeDone ? "visible" : "hidden"}
          transition={{ duration: 0.45, ease: "easeOut", delay: 0.05 }}
          className="mt-4 whitespace-pre-line max-w-[540px] text-[15px] sm:text-[16px] leading-relaxed text-neutral-600 dark:text-neutral-300"
          style={{ fontFamily: "var(--font-bengali), var(--font-geist-sans), sans-serif" }}
        >
          ০৯ নভেম্বর — ক্যালেন্ডারের সাধারণ একটা দিন, যা আমাদের দুজনের ভালোবাসার ছোঁয়ায় চিরদিনের জন্য অনন্য হয়ে উঠল। ফার্মগেটের সেই ব্যস্ত সন্ধ্যায় প্রথমবার হাত ধরা থেকে শুরু করে, রিকশায় পাশাপাশি বসে হারিয়ে যাওয়ার প্রতিটি মুহূর্ত আজ আমাদের জীবনের সবচেয়ে মধুর গল্প।
        </motion.p>

        <motion.p
          variants={FADE_UP}
          initial={reduce ? false : "hidden"}
          animate={welcomeDone ? "visible" : "hidden"}
          transition={{ duration: 0.45, ease: "easeOut", delay: 0.12 }}
          className="mt-4 whitespace-pre-line max-w-[540px] text-[15px] sm:text-[16px] leading-relaxed text-neutral-600 dark:text-neutral-300"
          style={{ fontFamily: "var(--font-bengali), var(--font-geist-sans), sans-serif" }}
        >
          এক মুঠো লাল গোলাপ, টিএসসির শান্ত বাতাস, মিস হয়ে যাওয়া সেই বাস আর উত্তরায় হেঁটে চলা গোধূলি বেলা—সবকিছুতেই জড়িয়ে আছে তোমার মিষ্টি হাসি আর আমাদের না-বলা সহস্র অনুভূতির মুগ্ধতা।
        </motion.p>

        <motion.p
          variants={FADE_UP}
          initial={reduce ? false : "hidden"}
          animate={welcomeDone ? "visible" : "hidden"}
          transition={{ duration: 0.45, ease: "easeOut", delay: 0.19 }}
          className="mt-4 whitespace-pre-line max-w-[540px] text-[15px] sm:text-[16px] leading-relaxed text-neutral-600 dark:text-neutral-300"
          style={{ fontFamily: "var(--font-bengali), var(--font-geist-sans), sans-serif" }}
        >
          আজ আমাদের এই বিশেষ দিনে একটাই প্রার্থনা—সময়ের সাথে সাথে আমাদের ভালোবাসা যেন প্রতিদিন নতুন রঙে রঙিন হয়ে ওঠে, আর জীবনের প্রতিটি বাঁকে এভাবেই তোমার পাশে ছায়া হয়ে থাকতে পারি। শুভ বার্ষিকী, ভালোবাসা! ❤️
        </motion.p>

        <div ref={pillRowRef} className="relative mt-8">
        <motion.div
          className="flex flex-wrap gap-1"
          initial={reduce ? false : { opacity: 0, y: 10 }}
          animate={welcomeDone ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{ duration: 0.4, ease: "easeOut", delay: 0.3 + (welcomeDone ? 0 : 0.4) }}
        >
          <div>
            <Button
              variant="pill"
              size="pill"
              layout
              // Motion's border-radius projection only engages for radii set
              // via style — the class alone leaves the caps elliptical mid-FLIP
              style={{ borderRadius: "13.5px" }}
              onClick={async () => {
                try {
                  await navigator.clipboard.writeText("shakibaliuix@proton.me");
                } catch {}
                setMailCopied(true);
                setTimeout(() => setMailCopied(false), 1400);
              }}
            >
              <span className="flex items-center self-center pr-[6px]">
              <span className="flex size-[13px] shrink-0 items-center justify-center text-[#171717] dark:text-white">
                  <ActionSwapIcon value={mailCopied ? "tick" : "copy"}>
                    {mailCopied ? (
                      <svg
                        viewBox="0 0 9 9"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="size-full"
                      >
                        <path
                        d="M1.5 4.5L3.6 6.6L7.5 2.1"
                        stroke="currentColor"
                        // 9-unit viewBox renders at 13px (×1.44) — 0.7 ≈ 1px on screen
                        strokeWidth="0.7"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                      stroke="currentColor"
                      strokeWidth="1"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="size-full"
                    >
                      <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
                      <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
                      </svg>
                    )}
                  </ActionSwapIcon>
                </span>
              </span>
              <ActionSwapCascadeText value={mailCopied ? "Copied!" : "shakibaliuix@proton.me"} />
            </Button>
          </div>
          <motion.div
            layout="position"
            transition={{ type: "spring", stiffness: 420, damping: 32, mass: 0.6 } as any}
            ref={xWrapperRef as any}
            className="relative inline-flex"
            onMouseEnter={(e) => hoverPill("x", e)}
            onMouseMove={(e) => setPillOffset(getPillOffset(e))}
            onMouseLeave={() => setPillHovered(null)}
          >
            <ButtonLink
              variant="pill"
              size="pill"
              href="https://x.com/iamshakibali"
              target="_blank"
              rel="noopener noreferrer"
            >
              X
              <span className="flex pl-[6px]">
                <span className="size-[15px] shrink-0 text-[#171717] dark:text-white">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="size-full"
                  >
                    <path d="M7 7h10v10" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M7 17 17 7" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </span>
            </ButtonLink>
          </motion.div>
          <motion.div
            layout="position"
            transition={{ type: "spring", stiffness: 420, damping: 32, mass: 0.6 } as any}
            ref={ghWrapperRef as any}
            className="relative inline-flex"
            onMouseEnter={(e) => hoverPill("gh", e)}
            onMouseMove={(e) => setPillOffset(getPillOffset(e))}
            onMouseLeave={() => setPillHovered(null)}
          >
            <ButtonLink
              variant="pill"
              size="pill"
              href="https://github.com/iamshakibali"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
              <span className="flex pl-[6px]">
                <span className="size-[15px] shrink-0 text-[#171717] dark:text-white">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="size-full"
                  >
                    <path d="M7 7h10v10" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M7 17 17 7" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </span>
            </ButtonLink>
          </motion.div>
          <motion.div
            layout="position"
            transition={{ type: "spring", stiffness: 420, damping: 32, mass: 0.6 } as any}
            ref={liWrapperRef as any}
            className="relative inline-flex"
            onMouseEnter={(e) => hoverPill("li", e)}
            onMouseMove={(e) => setPillOffset(getPillOffset(e))}
            onMouseLeave={() => setPillHovered(null)}
          >
            <ButtonLink
              variant="pill"
              size="pill"
              href="https://linkedin.com/in/iamshakibali"
              target="_blank"
              rel="noopener noreferrer"
            >
              Linkedin
              <span className="flex pl-[6px]">
                <span className="size-[15px] shrink-0 text-[#171717] dark:text-white">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="size-full"
                  >
                    <path d="M7 7h10v10" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M7 17 17 7" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </span>
            </ButtonLink>
          </motion.div>
        </motion.div>
        <AnimatePresence>
          {pillHovered && (
            <motion.div
              initial={{ opacity: 0, y: pillCardY + 16, filter: "blur(12px)", x: pillOffset, height: pillHovered === "gh" ? 138 : 175 }}
              animate={{ opacity: 1, y: pillCardY, filter: "blur(0px)", x: pillOffset, height: pillHovered === "gh" ? 138 : 175 }}
              exit={{ opacity: 0, y: pillCardY + 10, filter: "blur(10px)" }}
              transition={{
                opacity: { duration: 0.2, ease: "easeOut" },
                y: { duration: 0.2, ease: "easeOut" },
                filter: { duration: 0.24, ease: "easeOut" },
                x: { type: "tween", duration: 0.16, ease: "easeOut" },
                height: { type: "tween", duration: 0.2, ease: "easeOut" },
              }}
              className="pointer-events-none absolute left-0 top-0 z-20 w-[290px] overflow-hidden rounded-[12px] bg-white p-[16px] shadow-[0px_53px_79px_rgba(0,0,0,0.1)] dark:bg-zinc-900"
            >
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.div
                  key={pillHovered}
                  initial={pillHovered === "x" ? { opacity: 0, filter: "blur(6px)" } : false}
                  animate={{ opacity: 1, filter: "blur(0px)" }}
                  exit={pillHovered === "x" ? { opacity: 0, filter: "blur(6px)" } : { opacity: 0, filter: "blur(0px)" }}
                  transition={pillHovered === "x" ? { duration: 0.16, ease: "easeOut" } : { duration: 0 }}
                >
                  {pillHovered === "x" ? <XHoverCard /> : pillHovered === "gh" ? <GitHubHoverCard /> : <LinkedInHoverCard />}
                </motion.div>
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
        </div>

        <motion.div
          variants={FADE_UP}
          initial={reduce ? false : "hidden"}
          animate={welcomeDone ? "visible" : "hidden"}
          transition={{ duration: 0.45, ease: "easeOut", delay: 0.33 }}
          className="mt-10 w-full"
        >
          <ProjectsSection />
        </motion.div>

        <motion.div
          variants={FADE_UP}
          initial={reduce ? false : "hidden"}
          animate={welcomeDone ? "visible" : "hidden"}
          transition={{ duration: 0.45, ease: "easeOut", delay: 0.47 }}
          className="mt-6 w-full"
        >
          <ArchiveSection />
        </motion.div>

        <motion.div
          variants={FADE_UP}
          initial={reduce ? false : "hidden"}
          animate={welcomeDone ? "visible" : "hidden"}
          transition={{ duration: 0.45, ease: "easeOut", delay: 0.54 }}
          className="mt-14 w-full"
        >
          <LinksLine />
        </motion.div>

        <motion.div
          variants={FADE_UP}
          initial={reduce ? false : "hidden"}
          animate={welcomeDone ? "visible" : "hidden"}
          transition={{ duration: 0.45, ease: "easeOut", delay: 0.61 }}
          className="mt-14 w-full"
        >
          <ColophonSection />
        </motion.div>
        </div>
      </motion.div>
      {/* progressive blur at the bottom — exact mask values from magicui */}
      <ProgressiveBlur
        position="bottom"
        height="180px"
        className="fixed"
        blurLevels={[0.5, 1, 2, 4, 8, 16, 24, 32]}
      />
    </div>
  );
}

export default function Home() {
  return (
    <WelcomeGate>
      <HeroContent />
    </WelcomeGate>
  );
}
