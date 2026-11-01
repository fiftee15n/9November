"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

interface MusicContextType {
  isPlaying: boolean;
  togglePlay: () => void;
  play: () => Promise<void>;
  pause: () => void;
}

const MusicContext = createContext<MusicContextType | null>(null);

export function MusicProvider({ children }: { children: React.ReactNode }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const userPausedRef = useRef<boolean>(false);

  // Play function
  const play = useCallback(async () => {
    if (!audioRef.current) return;
    try {
      userPausedRef.current = false;
      await audioRef.current.play();
      setIsPlaying(true);
    } catch (err) {
      console.warn("Audio play blocked or deferred:", err);
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

  // Autoplay attempt on mount + unlock on first interaction if blocked
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // Reset pause state on every page open so music always plays when opening the web
    userPausedRef.current = false;
    try {
      sessionStorage.removeItem("music_user_paused");
    } catch {
      // Ignore storage restrictions if any
    }

    // Set gentle romantic background volume
    audio.volume = 0.65;

    let isUnlocked = false;

    const startAudio = async () => {
      if (userPausedRef.current || isUnlocked) return;
      try {
        await audio.play();
        setIsPlaying(true);
        isUnlocked = true;
        cleanupListeners();
      } catch {
        // Autoplay policy prevented unmuted playback without interaction; keep listeners alive
      }
    };

    const captureOpts: AddEventListenerOptions = { capture: true, passive: true };

    const cleanupListeners = () => {
      const rmOpts = { capture: true };
      window.removeEventListener("pointerdown", startAudio, rmOpts);
      window.removeEventListener("click", startAudio, rmOpts);
      window.removeEventListener("touchstart", startAudio, rmOpts);
      window.removeEventListener("touchend", startAudio, rmOpts);
      window.removeEventListener("keydown", startAudio, rmOpts);
      window.removeEventListener("scroll", startAudio, rmOpts);
      window.removeEventListener("wheel", startAudio, rmOpts);

      document.removeEventListener("pointerdown", startAudio, rmOpts);
      document.removeEventListener("click", startAudio, rmOpts);
      document.removeEventListener("touchstart", startAudio, rmOpts);
      document.removeEventListener("touchend", startAudio, rmOpts);
      document.removeEventListener("keydown", startAudio, rmOpts);
    };

    // 1. Try immediate autoplay on page open
    startAudio();

    // 2. Fallback: unlock on the very first gesture anywhere on the page (capture phase catches even if stopPropagation is used)
    window.addEventListener("pointerdown", startAudio, captureOpts);
    window.addEventListener("click", startAudio, captureOpts);
    window.addEventListener("touchstart", startAudio, captureOpts);
    window.addEventListener("touchend", startAudio, captureOpts);
    window.addEventListener("keydown", startAudio, captureOpts);
    window.addEventListener("scroll", startAudio, captureOpts);
    window.addEventListener("wheel", startAudio, captureOpts);

    document.addEventListener("pointerdown", startAudio, captureOpts);
    document.addEventListener("click", startAudio, captureOpts);
    document.addEventListener("touchstart", startAudio, captureOpts);
    document.addEventListener("touchend", startAudio, captureOpts);
    document.addEventListener("keydown", startAudio, captureOpts);

    return () => {
      cleanupListeners();
    };
  }, []);

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
