"use client";

import dynamic from "next/dynamic";

const TrimatrikViewer = dynamic(
  () => import("@/components/3d/TrimatrikViewer").then((mod) => mod.TrimatrikViewer),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-screen flex flex-col items-center justify-center">
        <div className="w-12 h-12 rounded-full border-2 border-neutral-200 dark:border-neutral-700 border-t-neutral-500 dark:border-t-neutral-400 animate-spin" />
      </div>
    ),
  }
);

export function TrimatrikClientPage() {
  return (
    <main className="relative w-full flex-1 h-[calc(100dvh-57px)] overflow-hidden">
      <TrimatrikViewer />
    </main>
  );
}

export default TrimatrikClientPage;
