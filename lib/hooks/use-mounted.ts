"use client";

import { useSyncExternalStore } from "react";

const noopSubscribe = () => () => {};

// false during SSR and hydration, true once running on the client — without
// the extra render a setState-in-effect "mounted" flag costs
export function useMounted() {
  return useSyncExternalStore(noopSubscribe, () => true, () => false);
}

// live media query match; false on the server
export function useMediaQuery(query: string) {
  return useSyncExternalStore(
    (onChange) => {
      const mql = window.matchMedia(query);
      mql.addEventListener("change", onChange);
      return () => mql.removeEventListener("change", onChange);
    },
    () => window.matchMedia(query).matches,
    () => false,
  );
}
