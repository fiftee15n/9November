// Custom eased window scroll — native `behavior: "smooth"` can't be slowed
// down. Stops as soon as the user wheels, touches or presses a key.
// Returns a cleanup that cancels the animation.
export function slowScrollTo(targetY: number, duration = 2400) {
  const startY = window.scrollY;
  const distance = Math.max(0, targetY) - startY;
  if (Math.abs(distance) < 8) return () => {};

  const startTime = performance.now();
  let animId: number;
  let userInterrupted = false;

  const onUserInteraction = () => {
    userInterrupted = true;
    cleanup();
  };

  const cleanup = () => {
    window.removeEventListener("wheel", onUserInteraction);
    window.removeEventListener("touchstart", onUserInteraction);
    window.removeEventListener("keydown", onUserInteraction);
    cancelAnimationFrame(animId);
  };

  window.addEventListener("wheel", onUserInteraction, { passive: true });
  window.addEventListener("touchstart", onUserInteraction, { passive: true });
  window.addEventListener("keydown", onUserInteraction, { passive: true });

  // Silky smooth easeInOutCubic curve
  const easeInOutCubic = (t: number) =>
    t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

  const step = (currentTime: number) => {
    if (userInterrupted) return;
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);

    window.scrollTo(0, startY + distance * easeInOutCubic(progress));

    if (progress < 1) {
      animId = requestAnimationFrame(step);
    } else {
      cleanup();
    }
  };

  animId = requestAnimationFrame(step);
  return cleanup;
}

// Brings an element to `offset` px below the viewport top
export function slowScrollToElement(element: HTMLElement, duration = 2400, offset = 40) {
  const rect = element.getBoundingClientRect();
  return slowScrollTo(rect.top + window.scrollY - offset, duration);
}
