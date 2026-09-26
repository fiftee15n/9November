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
      sessionStorage.setItem("music_user_paused", "false");
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
    sessionStorage.setItem("music_user_paused", "true");
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

    // Set gentle romantic background volume
    audio.volume = 0.65;

    // Check if user previously paused intentionally in this session
    const previouslyPaused = sessionStorage.getItem("music_user_paused") === "true";
    if (previouslyPaused) {
      userPausedRef.current = true;
      return;
    }

    let isUnlocked = false;

    const startAudio = async () => {
      if (userPausedRef.current || isUnlocked) return;
      try {
        await audio.play();
        setIsPlaying(true);
        isUnlocked = true;
        cleanupListeners();
      } catch {
        // Autoplay policy prevented playback without interaction; keep listeners alive
      }
    };

    const cleanupListeners = () => {
      window.removeEventListener("pointerdown", startAudio);
      window.removeEventListener("click", startAudio);
      window.removeEventListener("touchstart", startAudio);
      window.removeEventListener("keydown", startAudio);
      window.removeEventListener("scroll", startAudio);
    };

    // 1. Try immediate autoplay
    startAudio();

    // 2. Fallback: unlock on the very first gesture anywhere on the page
    window.addEventListener("pointerdown", startAudio, { passive: true });
    window.addEventListener("click", startAudio, { passive: true });
    window.addEventListener("touchstart", startAudio, { passive: true });
    window.addEventListener("keydown", startAudio, { passive: true });
    window.addEventListener("scroll", startAudio, { passive: true });

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
