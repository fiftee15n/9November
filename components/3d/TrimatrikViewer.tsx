"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { TrimatrikScene } from "./TrimatrikScene";

export function TrimatrikViewer() {
  return (
    <div className="relative w-full h-[calc(100vh-64px)] min-h-[500px] bg-white select-none">
      <Suspense
        fallback={
          <div className="absolute inset-0 flex items-center justify-center bg-white">
            <div className="w-10 h-10 rounded-full border-2 border-neutral-200 border-t-neutral-500 animate-spin" />
          </div>
        }
      >
        <Canvas
          camera={{ position: [0, 0, 5.5], fov: 40 }}
          dpr={[1, 2]}
          gl={{
            antialias: true,
            powerPreference: "high-performance",
            alpha: false,
          }}
          className="w-full h-full cursor-grab active:cursor-grabbing"
        >
          <TrimatrikScene />
        </Canvas>
      </Suspense>
    </div>
  );
}

export default TrimatrikViewer;
