"use client";

import dynamic from "next/dynamic";

const TrimatrikViewer = dynamic(
  () => import("@/components/3d/TrimatrikViewer").then((mod) => mod.TrimatrikViewer),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-screen flex flex-col items-center justify-center bg-[#070608] text-white">
        <div className="w-12 h-12 rounded-full border-2 border-rose-500/20 border-t-rose-400 animate-spin" />
        <p
          className="mt-4 text-sm text-neutral-400 font-light animate-pulse"
          style={{ fontFamily: "var(--font-bengali), sans-serif" }}
        >
          ত্রিমাত্রিক দৃশ্য তৈরি হচ্ছে…
        </p>
      </div>
    ),
  }
);

export function TrimatrikClientPage() {
  return (
    <main className="relative w-full min-h-screen bg-[#070608] overflow-hidden pt-16">
      <TrimatrikViewer />
    </main>
  );
}

export default TrimatrikClientPage;
