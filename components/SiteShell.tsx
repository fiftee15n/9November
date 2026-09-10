"use client";

import dynamic from "next/dynamic";
import { CoordinateProvider, useCoordinates } from "@/components/Hero/CoordinateTracker";
import { HeaderBar } from "@/components/Hero/HeaderBar";

const RomanticBackgroundScene = dynamic(
  () => import("@/components/3d/RomanticBackground").then((mod) => mod.RomanticBackgroundScene),
  { ssr: false }
);

function Shell({ children }: { children: React.ReactNode }) {
  const { handleMouseMove } = useCoordinates();
  return (
    <div className="relative flex min-h-screen flex-col" onMouseMove={handleMouseMove}>
      <RomanticBackgroundScene />
      <HeaderBar />
      {children}
    </div>
  );
}

// Permanent chrome (header) + cursor tracking live above every page; only
// {children} swaps on navigation, so the header never remounts or replays.
export function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <CoordinateProvider>
      <Shell>{children}</Shell>
    </CoordinateProvider>
  );
}
