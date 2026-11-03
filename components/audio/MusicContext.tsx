"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

import { usePathname } from "next/navigation";

interface MusicContextType {
  isPlaying: boolean;
  togglePlay: () => void;
  play: () => Promise<void>;
  pause: () => void;
}

const MusicContext = createContext<MusicContextType | null>(null);

export function MusicProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const userPausedRef = useRef<boolean>(false);

  // Play function with robust unlock handling
  // isPlaying is driven by the element's native play/pause events (below)
  const play = useCallback(async () => {
    const audio = audioRef.current;
    if (!audio) return;
    try {
      userPausedRef.current = false;
      await audio.play();
    } catch {
      // If browser blocked it because user hasn't clicked yet since arriving at this phase,
      // register capture listeners so the very next gesture immediately starts audio.
      const unlockAudio = async () => {
        if (userPausedRef.current) return;
        try {
          await audio.play();
        } catch {}
        removeUnlockListeners();
      };

      const captureOpts: AddEventListenerOptions = { capture: true, passive: true };
      const removeUnlockListeners = () => {
        window.removeEventListener("pointerdown", unlockAudio, { capture: true });
        window.removeEventListener("click", unlockAudio, { capture: true });
        window.removeEventListener("touchstart", unlockAudio, { capture: true });
        window.removeEventListener("keydown", unlockAudio, { capture: true });
      };

      window.addEventListener("pointerdown", unlockAudio, captureOpts);
      window.addEventListener("click", unlockAudio, captureOpts);
      window.addEventListener("touchstart", unlockAudio, captureOpts);
      window.addEventListener("keydown", unlockAudio, captureOpts);
    }
  }, []);

  // Pause function
  const pause = useCallback(() => {
    if (!audioRef.current) return;
    userPausedRef.current = true;
    audioRef.current.pause();
    setIsPlaying(false);
  }, []);

  // Toggle play/pause
  const togglePlay = useCallback(() => {
    if (audioRef.current) {
      if (audioRef.current.paused) {
        play();
      } else {
        pause();
      }
    }
  }, [play, pause]);

  // Audio initialization: only auto-start on mount if NOT on "/" (where WelcomeLoader controls start at "তুমি আমি আমাদের গল্প")
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    userPausedRef.current = false;
    audio.volume = 0.65;

    if (pathname && pathname !== "/") {
      play();
    }
  }, [pathname, play]);

  // Sync state if audio element fires native events
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);

    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);

    return () => {
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
    };
  }, []);

  return (
    <MusicContext.Provider value={{ isPlaying, togglePlay, play, pause }}>
      {children}
      <audio
        ref={audioRef}
        loop
        playsInline
        preload="auto"
        className="hidden"
        aria-hidden="true"
      >
        <source src="/music.webm" type="audio/webm" />
        <source src="/music.m4a" type="audio/mp4" />
      </audio>
    </MusicContext.Provider>
  );
}

export function useMusic() {
  const context = useContext(MusicContext);
  if (!context) {
    throw new Error("useMusic must be used within a MusicProvider");
  }
  return context;
}
