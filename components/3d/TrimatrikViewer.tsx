"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { useTheme } from "next-themes";
import { TrimatrikScene } from "./TrimatrikScene";

export function TrimatrikViewer() {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  return (
    <div
      className="relative w-full h-full select-none overflow-hidden pb-12 sm:pb-16"
    >
      <Suspense
        fallback={
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-10 h-10 rounded-full border-2 border-neutral-200 dark:border-neutral-700 border-t-neutral-500 dark:border-t-neutral-400 animate-spin" />
          </div>
        }
      >
        <Canvas
          camera={{ position: [0, 0, 5.5], fov: 40 }}
          dpr={[1, 2]}
          gl={{
            antialias: true,
            powerPreference: "high-performance",
            alpha: true,
          }}
          className="w-full h-full cursor-grab active:cursor-grabbing"
        >
          <TrimatrikScene isDark={isDark} />
        </Canvas>
      </Suspense>
    </div>
  );
}

export default TrimatrikViewer;
