"use client";

import dynamic from "next/dynamic";

const TrimatrikViewer = dynamic(
  () => import("@/components/3d/TrimatrikViewer").then((mod) => mod.TrimatrikViewer),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-screen flex flex-col items-center justify-center bg-white dark:bg-[#0a0a0c]">
        <div className="w-12 h-12 rounded-full border-2 border-neutral-200 dark:border-neutral-700 border-t-neutral-500 dark:border-t-neutral-400 animate-spin" />
      </div>
    ),
  }
);

export function TrimatrikClientPage() {
  return (
    <main className="relative w-full min-h-screen bg-white dark:bg-[#0a0a0c] overflow-hidden pt-16">
      <TrimatrikViewer />
    </main>
  );
}

export default TrimatrikClientPage;
