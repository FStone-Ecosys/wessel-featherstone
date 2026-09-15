import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import type { Track } from "@/data/catalog";

type PlayerCtx = {
  track: Track;
  playing: boolean;
  progress: number;
  duration: number;
  artistName: string;
  play: (track: Track) => void;
  toggle: (track?: Track) => void;
  seek: (ratio: number) => void;
  next: () => void;
  prev: () => void;
  audioRef: React.RefObject<HTMLAudioElement | null>;
};

const PlayerContext = createContext<PlayerCtx | null>(null);

export function PlayerProvider({
  children,
  tracks,
  artistName,
}: {
  children: ReactNode;
  tracks: Track[];
  artistName: string;
}) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const tracksRef = useRef(tracks);
  tracksRef.current = tracks;
  const [track, setTrack] = useState<Track>(tracks[0]);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(30);

  const loadAndPlay = useCallback((next: Track) => {
    const el = audioRef.current;
    if (!el) return;
    if (el.src !== new URL(next.preview, window.location.origin).href) {
      el.src = next.preview;
    }
    setTrack(next);
    void el.play().then(
      () => setPlaying(true),
      () => setPlaying(false),
    );
  }, []);

  const play = useCallback(
    (next: Track) => {
      loadAndPlay(next);
    },
    [loadAndPlay],
  );

  const toggle = useCallback(
    (next?: Track) => {
      const el = audioRef.current;
      if (!el) return;
      if (next && next.id !== track.id) {
        loadAndPlay(next);
        return;
      }
      if (playing) {
        el.pause();
        setPlaying(false);
      } else {
        void el.play().then(
          () => setPlaying(true),
          () => setPlaying(false),
        );
      }
    },
    [loadAndPlay, playing, track.id],
  );

  const seek = useCallback((ratio: number) => {
    const el = audioRef.current;
    if (!el || !el.duration) return;
    el.currentTime = Math.min(Math.max(ratio, 0), 1) * el.duration;
  }, []);

  const next = useCallback(() => {
    const list = tracksRef.current;
    const i = list.findIndex((t) => t.id === track.id);
    loadAndPlay(list[(i + 1) % list.length]);
  }, [loadAndPlay, track.id]);

  const prev = useCallback(() => {
    const list = tracksRef.current;
    const i = list.findIndex((t) => t.id === track.id);
    loadAndPlay(list[(i - 1 + list.length) % list.length]);
  }, [loadAndPlay, track.id]);

  useEffect(() => {
    const el = audioRef.current;
    if (!el) return;
    const onTime = () => setProgress(el.currentTime);
    const onMeta = () => setDuration(el.duration || 30);
    const onEnd = () => {
      const list = tracksRef.current;
      const i = list.findIndex((t) => t.id === track.id);
      loadAndPlay(list[(i + 1) % list.length]);
    };
    const onPause = () => {
      if (el.ended) return;
      setPlaying(false);
    };
    el.addEventListener("timeupdate", onTime);
    el.addEventListener("loadedmetadata", onMeta);
    el.addEventListener("ended", onEnd);
    el.addEventListener("pause", onPause);
    el.addEventListener("play", () => setPlaying(true));
    return () => {
      el.removeEventListener("timeupdate", onTime);
      el.removeEventListener("loadedmetadata", onMeta);
      el.removeEventListener("ended", onEnd);
      el.removeEventListener("pause", onPause);
    };
  }, [loadAndPlay, track.id]);

  const value = useMemo(
    () => ({
      track,
      playing,
      progress,
      duration,
      artistName,
      play,
      toggle,
      seek,
      next,
      prev,
      audioRef,
    }),
    [track, playing, progress, duration, artistName, play, toggle, seek, next, prev],
  );

  return (
    <PlayerContext.Provider value={value}>
      <audio ref={audioRef} preload="none" src={track.preview} />
      {children}
    </PlayerContext.Provider>
  );
}

export function usePlayer() {
  const ctx = useContext(PlayerContext);
  if (!ctx) throw new Error("usePlayer must be used within PlayerProvider");
  return ctx;
}
