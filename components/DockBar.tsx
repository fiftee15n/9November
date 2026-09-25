"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useContext, type SVGProps } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Dock, DockItem } from "@/components/motion/dock";
import { WelcomeDoneContext } from "@/components/WelcomeDoneContext";

// Phosphor icons (Shakib's picks) for the dock. Stroke weight 16 on a 256
// viewBox is proportionally identical to the lucide icons' 1.5 on 24, so line
// weights match; duotone shades use fill="currentColor" to theme in dark mode.
function PhosphorGlyph({ strokeWidth: _strokeWidth, children, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 256 256"
      fill="none"
      stroke="currentColor"
      strokeWidth={16}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      {children}
    </svg>
  );
}

function HomeGlyph(props: SVGProps<SVGSVGElement>) {
  return (
    <PhosphorGlyph {...props}>
      <path
        d="M133.66,34.34a8,8,0,0,0-11.32,0L40,116.69V216h64V152h48v64h64V116.69Z"
        fill="currentColor"
        stroke="none"
        opacity="0.2"
      />
      <line x1="16" y1="216" x2="240" y2="216" />
      <polyline points="152 216 152 152 104 152 104 216" />
      <line x1="40" y1="116.69" x2="40" y2="216" />
      <line x1="216" y1="216" x2="216" y2="116.69" />
      <path d="M24,132.69l98.34-98.35a8,8,0,0,1,11.32,0L232,132.69" />
    </PhosphorGlyph>
  );
}

function HandHoldingGlyph(props: SVGProps<SVGSVGElement>) {
  return (
    <PhosphorGlyph {...props}>
      <path
        d="M178,40c-20.65,0-38.73,12.5-46.79,30.82a4,4,0,0,1-6.42,0C116.73,52.5,98.65,40,78,40A46,46,0,0,0,32,86c0,53.52,90.41,114.73,94.24,117.29a3.61,3.61,0,0,0,3.52,0C133.59,200.73,224,139.52,224,86A46,46,0,0,0,178,40Z"
        fill="currentColor"
        stroke="none"
        opacity="0.2"
      />
      <path
        d="M178,40c-20.65,0-38.73,12.5-46.79,30.82a4,4,0,0,1-6.42,0C116.73,52.5,98.65,40,78,40A46,46,0,0,0,32,86c0,53.52,90.41,114.73,94.24,117.29a3.61,3.61,0,0,0,3.52,0C133.59,200.73,224,139.52,224,86A46,46,0,0,0,178,40Z"
      />
    </PhosphorGlyph>
  );
}

function LetterGlyph(props: SVGProps<SVGSVGElement>) {
  return (
    <PhosphorGlyph {...props}>
      <path
        d="M224,56H32A16,16,0,0,0,16,72V184a16,16,0,0,0,16,16H224a16,16,0,0,0,16-16V72A16,16,0,0,0,224,56Zm-96,88L32,80V72l96,64,96-64v8Z"
        fill="currentColor"
        stroke="none"
        opacity="0.2"
      />
      <path d="M224,56H32A16,16,0,0,0,16,72V184a16,16,0,0,0,16,16H224a16,16,0,0,0,16-16V72A16,16,0,0,0,224,56Z" />
      <polyline points="224 72 128 144 32 72" />
    </PhosphorGlyph>
  );
}

function WishGlyph(props: SVGProps<SVGSVGElement>) {
  return (
    <PhosphorGlyph {...props}>
      <path
        d="M176,16a8,8,0,0,0-7.42,4.94l-15.93,37.17-37.17,15.93a8,8,0,0,0,0,14.84l37.17,15.93,15.93,37.17a8,8,0,0,0,14.84,0l15.93-37.17,37.17-15.93a8,8,0,0,0,0-14.84l-37.17-15.93L183.42,20.94A8,8,0,0,0,176,16Z"
        fill="currentColor"
        stroke="none"
        opacity="0.2"
      />
      <path d="M176,16a8,8,0,0,0-7.42,4.94l-15.93,37.17-37.17,15.93a8,8,0,0,0,0,14.84l37.17,15.93,15.93,37.17a8,8,0,0,0,14.84,0l15.93-37.17,37.17-15.93a8,8,0,0,0,0-14.84l-37.17-15.93L183.42,20.94A8,8,0,0,0,176,16Z" />
      <path
        d="M80,88a8,8,0,0,0-7.42,4.94L56.65,130.11,19.47,146a8,8,0,0,0,0,14.84l37.18,15.94,15.93,37.18a8,8,0,0,0,14.84,0l15.94-37.18L140.54,160.9a8,8,0,0,0,0-14.84L103.36,130.11,87.42,92.94A8,8,0,0,0,80,88Z"
        fill="currentColor"
        stroke="none"
        opacity="0.2"
      />
      <path d="M80,88a8,8,0,0,0-7.42,4.94L56.65,130.11,19.47,146a8,8,0,0,0,0,14.84l37.18,15.94,15.93,37.18a8,8,0,0,0,14.84,0l15.94-37.18L140.54,160.9a8,8,0,0,0,0-14.84L103.36,130.11,87.42,92.94A8,8,0,0,0,80,88Z" />
    </PhosphorGlyph>
  );
}

// `disabled: true` keeps the item visible but non-navigable (unavailable)
const NAV: {
  label: string;
  href: string;
  Icon: (props: SVGProps<SVGSVGElement>) => React.JSX.Element;
  disabled?: boolean;
}[] = [
  { label: "নীড়", href: "/", Icon: HomeGlyph },
  { label: "হাত ধরা", href: "/work", Icon: HandHoldingGlyph },
  { label: "চিরকুট", href: "/chirkut", Icon: LetterGlyph },
  { label: "ইচ্ছে", href: "/ecche", Icon: WishGlyph },
];

export function DockBar() {
  const pathname = usePathname();
  // undefined outside the home page's WelcomeGate → don't wait for the loader
  const welcomeDone = useContext(WelcomeDoneContext);
  const reduce = useReducedMotion() ?? false;
  const shown = welcomeDone !== false;

  return (
    <motion.div
      className="pointer-events-none fixed inset-x-0 bottom-5 z-40 flex justify-center"
      initial={reduce ? false : { opacity: 0, y: 14, filter: "blur(6px)" }}
      animate={
        shown
          ? { opacity: 1, y: 0, filter: "blur(0px)" }
          : { opacity: 0, y: 14, filter: "blur(6px)" }
      }
      transition={{ duration: 0.45, ease: "easeOut", delay: welcomeDone === undefined ? 0 : 0.7 }}
    >
      <div className="pointer-events-auto">
        {/* glass dock per Figma: blur + translucent bordered pill; dark glass
            in dark mode, light glass in light mode so the pill reads on either */}
        <Dock
          size={49}
          className="rounded-full border border-[rgba(0,0,0,0.08)] bg-white/70 px-4 shadow-[0px_20px_40px_-12px_rgba(0,0,0,0.2),0px_10px_20px_-8px_rgba(0,0,0,0.12)] backdrop-blur-[16px] dark:border-[rgba(39,39,42,0.5)] dark:bg-[#141414]/85 dark:shadow-[0px_20px_40px_-12px_rgba(0,0,0,0.35),0px_10px_20px_-8px_rgba(0,0,0,0.2)]"
        >
          {NAV.map(({ label, href, Icon, disabled }) => {
            const active = pathname === href;
            // disabled items stay visible but render as a plain span — no
            // navigation, dimmed, with a not-allowed cursor + tooltip
            if (disabled) {
              return (
                <DockItem key={href}>
                  <span
                    title="Coming soon"
                    aria-disabled="true"
                    className="flex size-full cursor-not-allowed flex-col items-center justify-center gap-[3px] text-neutral-400/70 opacity-60 dark:text-neutral-500/70"
                  >
                    <Icon className="size-[18px]" strokeWidth={1.5} aria-hidden />
                    <span
                      className="whitespace-nowrap text-[10px] leading-none"
                      style={{ fontFamily: "var(--font-bengali), var(--font-geist-sans), sans-serif" }}
                    >
                      {label}
                    </span>
                  </span>
                </DockItem>
              );
            }
            return (
              <DockItem key={href}>
                <Link
                  href={href}
                  aria-current={active ? "page" : undefined}
                  className={`flex size-full flex-col items-center justify-center gap-[3px] transition-colors ${
                    active
                      ? "text-black dark:text-white"
                      : "text-neutral-600 hover:text-black dark:bg-transparent dark:text-neutral-400 dark:hover:text-white"
                  }`}
                >
                  <Icon className="size-[18px]" strokeWidth={1.5} aria-hidden />
                  <span
                    className="whitespace-nowrap text-[10px] leading-none"
                    style={{ fontFamily: "var(--font-bengali), var(--font-geist-sans), sans-serif" }}
                  >
                    {label}
                  </span>
                </Link>
              </DockItem>
            );
          })}
        </Dock>
      </div>
    </motion.div>
  );
}
