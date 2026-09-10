"use client";

export function XHoverCard() {
  return (
    <div
      className="flex flex-col items-start w-full text-foreground"
      style={{ fontFamily: "var(--font-bengali), var(--font-geist-sans), sans-serif" }}
    >
      {/* Photo of Hands */}
      <div className="relative w-full h-[120px] overflow-hidden rounded-xl bg-zinc-100 dark:bg-zinc-800">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/hands-holding.jpg"
          alt="হাত ধরে অনন্তে"
          className="size-full object-cover object-center"
          draggable={false}
        />
        <span className="absolute top-2 right-2 rounded-full bg-black/60 px-2 py-0.5 text-[10px] text-white backdrop-blur-md">
          ❤️ ০৯ নভেম্বর
        </span>
      </div>

      {/* Title + Subtitle */}
      <div className="w-full pt-3">
        <h4 className="text-[15px] font-semibold text-black dark:text-white leading-tight">
          হাত ধরে অনন্তে
        </h4>
        <p className="mt-1 text-[12px] leading-relaxed text-neutral-500 dark:text-neutral-400">
          তোমার হাতটি ধরে জীবনের বাকি পথটুকু এভাবেই একসঙ্গে হেঁটে যাওয়ার প্রতিশ্রুতি।
        </p>
      </div>
    </div>
  );
}
