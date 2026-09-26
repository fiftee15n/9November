"use client";

import { useEffect } from "react";
import dynamic from "next/dynamic";
import { CoordinateProvider, useCoordinates } from "@/components/Hero/CoordinateTracker";
import { HeaderBar } from "@/components/Hero/HeaderBar";

import { usePathname } from "next/navigation";

const RomanticBackgroundScene = dynamic(
  () => import("@/components/3d/RomanticBackground").then((mod) => mod.RomanticBackgroundScene),
  { ssr: false }
);

function Shell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isTrimatrik = pathname === "/trimatrik";
  const { handleMouseMove } = useCoordinates();

  useEffect(() => {
    if (isTrimatrik) {
      document.documentElement.classList.add("overflow-hidden");
      document.body.classList.add("overflow-hidden");
      return () => {
        document.documentElement.classList.remove("overflow-hidden");
        document.body.classList.remove("overflow-hidden");
      };
    }
  }, [isTrimatrik]);

  return (
    <div
      className={`relative flex min-h-screen flex-col ${
        isTrimatrik ? "h-screen max-h-dvh overflow-hidden" : ""
      }`}
      onMouseMove={handleMouseMove}
    >
      {!isTrimatrik && <RomanticBackgroundScene />}
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
