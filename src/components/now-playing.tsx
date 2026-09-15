import { Pause, Play, SkipBack, SkipForward } from "lucide-react";
import { usePlayer } from "@/components/player-context";
import { formatTime } from "@/lib/utils";

export function NowPlaying() {
  const { track, playing, progress, duration, artistName, toggle, seek, next, prev } = usePlayer();
  const ratio = duration ? progress / duration : 0;

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-50 px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
      <div className="pointer-events-auto mx-auto flex max-w-3xl items-center gap-3 rounded-xl border border-border bg-elevated/95 p-2 shadow-[0_16px_40px_rgb(0_0_0_/_0.55)] backdrop-blur-md neon-ring">
        <img
          src={track.cover}
          alt=""
          width={56}
          height={56}
          className="size-14 shrink-0 rounded-md object-cover"
        />
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium text-fg">{track.title}</p>
          <p className="truncate text-xs text-muted">{artistName} · 30s preview</p>
          <div className="mt-1.5 flex items-center gap-2">
            <span className="w-8 shrink-0 text-[11px] tabular-nums text-subtle">
              {formatTime(progress)}
            </span>
            <input
              type="range"
              min={0}
              max={1000}
              value={Math.round(ratio * 1000)}
              aria-label="Seek preview"
              onChange={(e) => seek(Number(e.target.value) / 1000)}
              suppressHydrationWarning
              className="h-1 w-full cursor-pointer appearance-none rounded-full bg-border accent-accent"
            />
            <span className="w-8 shrink-0 text-right text-[11px] tabular-nums text-subtle">
              {formatTime(duration)}
            </span>
          </div>
        </div>
        <div className="flex shrink-0 items-center gap-1 pr-1">
          <button
            type="button"
            aria-label="Previous track"
            onClick={prev}
            className="flex size-11 items-center justify-center rounded-md text-fg hover:bg-surface"
          >
            <SkipBack className="size-4" strokeWidth={1.75} />
          </button>
          <button
            type="button"
            aria-label={playing ? "Pause" : "Play"}
            onClick={() => toggle()}
            className="flex size-11 items-center justify-center rounded-full bg-accent text-accent-fg hover:bg-fg"
          >
            {playing ? (
              <Pause className="size-4 fill-current" strokeWidth={1.5} />
            ) : (
              <Play className="size-4 fill-current" strokeWidth={1.5} />
            )}
          </button>
          <button
            type="button"
            aria-label="Next track"
            onClick={next}
            className="flex size-11 items-center justify-center rounded-md text-fg hover:bg-surface"
          >
            <SkipForward className="size-4" strokeWidth={1.75} />
          </button>
        </div>
      </div>
    </div>
  );
}
