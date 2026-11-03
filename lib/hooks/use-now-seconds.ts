"use client";

import { useSyncExternalStore } from "react";

const subscribe = (onTick: () => void) => {
  const id = setInterval(onTick, 1000);
  return () => clearInterval(id);
};

// current unix time in whole seconds, ticking once a second; null on the
// server so clock text never causes a hydration mismatch
export function useNowSeconds() {
  return useSyncExternalStore<number | null>(
    subscribe,
    () => Math.floor(Date.now() / 1000),
    () => null,
  );
}
