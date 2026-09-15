import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight, ExternalLink, Pause, Play } from "lucide-react";
import { PlayerProvider, usePlayer } from "@/components/player-context";
import { NowPlaying } from "@/components/now-playing";
import {
  WESSEL,
  WESSEL_FEATURED,
  WESSEL_LATEST,
  WESSEL_PLATFORMS,
  WESSEL_TRACKS,
} from "@/data/wessel";
import type { Track } from "@/data/catalog";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({
  component: Page,
  head: () => ({
    meta: [
      { title: "Wessel Featherstone" },
      {
        name: "description",
        content:
          "Wessel Featherstone — East London dark pop, synth-pop and zef-pop. Play official previews. LFSTN.STUDIO.",
      },
    ],
  }),
});

function Page() {
  return (
    <PlayerProvider tracks={WESSEL_TRACKS} artistName={WESSEL.name}>
      <div className="theme-wessel relative min-h-screen overflow-x-hidden bg-bg pb-32 text-fg">
        <div
          aria-hidden
          className="grain pointer-events-none fixed inset-0 z-40 opacity-[0.06] mix-blend-overlay"
        />
        <Nav />
        <Hero />
        <FeaturedRail />
        <Catalog />
        <SpotifyStage />
        <Story />
        <ListenEverywhere />
        <Footer />
        <NowPlaying />
      </div>
    </PlayerProvider>
  );
}

function Nav() {
  return (
    <header className="absolute inset-x-0 top-0 z-30 flex items-center justify-between px-5 py-5 md:px-10">
      <a
        href="https://www.lfstn.xyz/studio"
        target="_blank"
        rel="noreferrer"
        className="font-display text-[11px] font-medium tracking-[0.42em] text-accent uppercase"
      >
        LFSTN.STUDIO
      </a>
      <nav className="hidden items-center gap-8 text-sm text-fg/80 md:flex">
        <a href="#listen" className="hover:text-accent">
          Listen
        </a>
        <a href="#catalog" className="hover:text-accent">
          Catalog
        </a>
        <a href="#about" className="hover:text-accent">
          About
        </a>
      </nav>
      <a
        href={WESSEL_PLATFORMS[0].href}
        target="_blank"
        rel="noreferrer"
        className="inline-flex h-11 items-center rounded-full border border-border px-4 text-sm font-medium text-fg hover:border-accent hover:text-accent"
      >
        Open Spotify
      </a>
    </header>
  );
}

function Hero() {
  const { play, toggle, playing, track } = usePlayer();
  const isLatest = playing && track.id === WESSEL_LATEST.id;

  return (
    <section id="top" className="relative isolate min-h-[100svh]">
      <picture>
        <source media="(min-width: 768px)" srcSet="/art/wessel-wide.jpg" />
        <img
          src="/art/wessel-portrait.jpg"
          alt="Wessel Featherstone"
          className="absolute inset-0 h-full w-full object-cover object-[center_12%]"
        />
      </picture>
      <div className="absolute inset-0 bg-gradient-to-b from-bg/55 via-transparent to-bg" />
      <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-bg via-bg/50 to-transparent" />

      <div className="relative mx-auto flex min-h-[100svh] max-w-7xl flex-col justify-end px-5 pb-10 pt-28 md:px-10 md:pb-16">
        <p className="text-[11px] font-medium tracking-[0.38em] text-accent uppercase">
          East London · {WESSEL.genre}
        </p>
        <h1 className="metal mt-3 font-display text-[clamp(2.6rem,10vw,7.2rem)] leading-[0.9] font-semibold tracking-[0.04em] text-balance uppercase">
          Wessel
          <span className="mt-1 block">Featherstone</span>
        </h1>
        <p className="mt-5 max-w-md text-base leading-relaxed text-pretty text-fg/80">
          {WESSEL.tagline} Written, produced and engineered at the studio — dark
          pop, metallic synths, and a vocal that won't stay in one register.
        </p>
        <div className="mt-7 flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={() => (isLatest ? toggle() : play(WESSEL_LATEST))}
            className="inline-flex h-12 items-center gap-2.5 rounded-full bg-accent px-6 text-sm font-medium text-accent-fg hover:bg-fg"
          >
            {isLatest ? (
              <Pause className="size-4 fill-current" />
            ) : (
              <Play className="size-4 fill-current" />
            )}
            {isLatest ? "Pause preview" : `Play ${WESSEL_LATEST.title}`}
          </button>
          <a
            href="#catalog"
            className="inline-flex h-12 items-center rounded-full border border-border px-6 text-sm font-medium text-fg hover:border-accent hover:text-accent"
          >
            Full catalog
          </a>
        </div>
        <dl className="mt-8 grid max-w-lg grid-cols-3 gap-4 border-t border-border pt-5">
          <Stat label="Latest" value="Bubble" />
          <Stat label="Albums" value="2" />
          <Stat label="Era" value="2026" />
        </dl>
      </div>
    </section>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-[11px] tracking-[0.18em] text-subtle uppercase">{label}</dt>
      <dd className="mt-1 font-display text-xl tracking-wide text-accent">{value}</dd>
    </div>
  );
}

function FeaturedRail() {
  const { play, toggle, playing, track } = usePlayer();

  return (
    <section id="listen" className="relative px-5 py-16 md:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-[11px] tracking-[0.28em] text-accent uppercase">The era</p>
            <h2 className="metal mt-2 font-display text-4xl font-medium tracking-wide text-balance md:text-5xl">
              Gru-Sprake.
            </h2>
          </div>
          <p className="hidden max-w-xs text-right text-sm text-muted md:block">
            Thirty-second previews — tap any sleeve.
          </p>
        </div>
        <div className="-mx-5 mt-10 flex gap-4 overflow-x-auto px-5 pb-4 md:mx-0 md:grid md:grid-cols-4 md:overflow-visible md:px-0 lg:grid-cols-8">
          {WESSEL_FEATURED.map((t) => {
            const active = playing && track.id === t.id;
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => (track.id === t.id ? toggle() : play(t))}
                className="group w-40 shrink-0 text-left md:w-auto"
              >
                <div
                  className={cn(
                    "relative aspect-square overflow-hidden rounded-lg",
                    active && "neon-ring",
                  )}
                >
                  <img
                    src={t.cover}
                    alt=""
                    className="h-full w-full object-cover transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
                  />
                  <span
                    className={cn(
                      "absolute inset-0 flex items-center justify-center bg-bg/40 opacity-0 transition-opacity group-hover:opacity-100",
                      active && "opacity-100",
                    )}
                  >
                    <span className="flex size-12 items-center justify-center rounded-full bg-accent text-accent-fg">
                      {active ? (
                        <Pause className="size-4 fill-current" />
                      ) : (
                        <Play className="size-4 fill-current" />
                      )}
                    </span>
                  </span>
                </div>
                <p className="mt-3 truncate text-sm font-medium">{t.title}</p>
                <p className="text-xs text-muted">
                  {t.album} · {t.year}
                </p>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Catalog() {
  const [era, setEra] = useState<"all" | "singles" | "reckoning" | "son">("all");
  const list = WESSEL_TRACKS.filter((t) => {
    if (era === "singles") return !t.album || !["RECKONING", "SonObsidian"].includes(t.album);
    if (era === "reckoning") return t.album === "RECKONING";
    if (era === "son") return t.album === "SonObsidian";
    return true;
  });

  return (
    <section id="catalog" className="px-5 py-8 md:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-4 border-b border-border pb-6 sm:flex-row sm:items-end sm:justify-between">
          <h2 className="metal font-display text-4xl font-medium tracking-wide">The records</h2>
          <div className="flex flex-wrap gap-2">
            {(
              [
                ["all", "All"],
                ["singles", "Singles"],
                ["reckoning", "RECKONING"],
                ["son", "SonObsidian"],
              ] as const
            ).map(([id, label]) => (
              <button
                key={id}
                type="button"
                onClick={() => setEra(id)}
                className={cn(
                  "h-11 rounded-full px-4 text-sm",
                  era === id
                    ? "bg-accent text-accent-fg"
                    : "border border-border text-muted hover:text-fg",
                )}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
        <ul className="divide-y divide-border">
          {list.map((t, i) => (
            <TrackRow key={t.id} track={t} index={i + 1} />
          ))}
        </ul>
      </div>
    </section>
  );
}

function TrackRow({ track, index }: { track: Track; index: number }) {
  const { play, toggle, playing, track: current } = usePlayer();
  const active = current.id === track.id && playing;

  return (
    <li className="group flex items-center gap-3 py-3 md:gap-5">
      <span className="hidden w-6 text-right text-xs tabular-nums text-subtle sm:block">
        {String(index).padStart(2, "0")}
      </span>
      <button
        type="button"
        onClick={() => (current.id === track.id ? toggle() : play(track))}
        className="relative size-14 shrink-0 overflow-hidden rounded-md md:size-16"
        aria-label={`${active ? "Pause" : "Play"} ${track.title}`}
      >
        <img src={track.cover} alt="" className="h-full w-full object-cover" />
        <span className="absolute inset-0 flex items-center justify-center bg-bg/50 opacity-0 transition-opacity group-hover:opacity-100">
          {active ? (
            <Pause className="size-4 fill-fg text-fg" />
          ) : (
            <Play className="size-4 fill-fg text-fg" />
          )}
        </span>
        {active && (
          <span className="absolute inset-0 flex items-center justify-center bg-bg/40">
            <Pause className="size-4 fill-accent text-accent" />
          </span>
        )}
      </button>
      <div className="min-w-0 flex-1">
        <p className={cn("truncate font-medium", active && "text-accent")}>
          {track.title}
          {track.explicit ? <span className="ml-2 text-[10px] text-subtle">E</span> : null}
        </p>
        <p className="truncate text-xs text-muted">
          {track.album}
          {track.feat ? ` · feat. ${track.feat}` : ""}
          {track.chart ? ` · ${track.chart}` : ""}
        </p>
      </div>
      <span className="hidden text-xs tabular-nums text-subtle sm:block">{track.duration}</span>
      <div className="flex shrink-0 items-center gap-1">
        {track.deezer && (
          <a
            href={track.deezer}
            target="_blank"
            rel="noreferrer"
            aria-label={`Open ${track.title}`}
            className="flex size-11 items-center justify-center rounded-md text-muted hover:text-fg"
          >
            <ExternalLink className="size-4" />
          </a>
        )}
        <button
          type="button"
          onClick={() => (current.id === track.id ? toggle() : play(track))}
          className="flex size-11 items-center justify-center rounded-full bg-elevated text-fg hover:bg-accent hover:text-accent-fg"
        >
          {active ? (
            <Pause className="size-4 fill-current" />
          ) : (
            <Play className="size-4 fill-current" />
          )}
        </button>
      </div>
    </li>
  );
}

function SpotifyStage() {
  return (
    <section className="px-5 py-16 md:px-10">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div>
          <p className="text-[11px] tracking-[0.28em] text-accent uppercase">On Spotify</p>
          <h2 className="metal mt-2 font-display text-4xl font-medium tracking-wide text-balance md:text-5xl">
            The official player.
          </h2>
          <p className="mt-4 max-w-md text-pretty text-muted">
            Full Spotify embed — follow, save, and play the live catalog. Previews
            above are the 30-second cuts.
          </p>
          <a
            href={`https://open.spotify.com/artist/${WESSEL.spotifyArtist}`}
            target="_blank"
            rel="noreferrer"
            className="mt-6 inline-flex h-12 items-center gap-2 rounded-full bg-accent px-5 text-sm font-medium text-accent-fg hover:bg-fg"
          >
            Open artist page
            <ArrowUpRight className="size-4" />
          </a>
        </div>
        <div className="overflow-hidden rounded-xl border border-border bg-surface neon-ring">
          <iframe
            title="Wessel Featherstone on Spotify"
            src={`https://open.spotify.com/embed/artist/${WESSEL.spotifyArtist}?utm_source=generator&theme=0`}
            width="100%"
            height="380"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
            className="block w-full"
          />
        </div>
      </div>
    </section>
  );
}

function Story() {
  return (
    <section id="about" className="relative px-5 py-16 md:px-10">
      <img
        src="/scenes/obsidian.jpg"
        alt=""
        className="absolute inset-0 h-full w-full object-cover opacity-45"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-bg via-bg/80 to-bg" />
      <div className="relative mx-auto grid max-w-7xl gap-12 lg:grid-cols-2">
        <div>
          <p className="text-[11px] tracking-[0.28em] text-accent uppercase">About</p>
          <h2 className="metal mt-2 font-display text-4xl font-medium tracking-wide md:text-5xl">
            Welcome to the studio.
          </h2>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-pretty text-muted">
            {WESSEL.bio}
          </p>
          <p className="mt-4 max-w-xl text-pretty text-muted">{WESSEL.bio2}</p>
        </div>
        <div className="grid gap-4">
          <img
            src="/art/wessel-photo.jpg"
            alt="Wessel Featherstone"
            className="h-[28rem] w-full rounded-xl border border-border object-cover object-[center_12%] md:h-[32rem]"
          />
          <figure className="rounded-xl border border-border bg-surface/80 p-6">
            <blockquote className="font-display text-2xl leading-snug text-pretty text-fg italic">
              We eat the filth. We drink the rain.
            </blockquote>
            <figcaption className="mt-4 text-xs tracking-[0.18em] text-subtle uppercase">
              Artist pick · We Bloom
            </figcaption>
          </figure>
          <figure className="rounded-xl border border-border bg-surface/80 p-6">
            <blockquote className="font-display text-xl leading-snug text-pretty text-fg italic">
              Deep cinematic black, every crack of neon pink and metallic gold —
              the visual anchor of the Atali-Standard.
            </blockquote>
            <figcaption className="mt-4 text-xs tracking-[0.18em] text-subtle uppercase">
              RECKONING · April 2026
            </figcaption>
          </figure>
          <figure className="rounded-xl border border-border bg-surface/80 p-6">
            <blockquote className="font-display text-xl leading-snug text-pretty text-fg italic">
              High-fidelity precision. Cinematic pop anthems or aggressive,
              stylized electronics — never one lane.
            </blockquote>
            <figcaption className="mt-4 text-xs tracking-[0.18em] text-subtle uppercase">
              LFSTN.STUDIO · East London
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}

function ListenEverywhere() {
  return (
    <section className="px-5 py-16 md:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="obsidian-panel relative overflow-hidden rounded-xl border border-border px-6 py-12 md:px-12">
          <div className="absolute inset-0 bg-bg/75" />
          <div className="relative">
            <h2 className="metal font-display text-4xl font-medium tracking-wide">
              Listen everywhere
            </h2>
            <p className="mt-3 max-w-lg text-muted">
              Same catalog across the platforms. House Featherstone on YouTube for
              the audio-visual side.
            </p>
            <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3">
              {WESSEL_PLATFORMS.map((p) => (
                <a
                  key={p.id}
                  href={p.href}
                  target="_blank"
                  rel="noreferrer"
                  className="flex h-14 items-center justify-between rounded-lg border border-border bg-elevated/80 px-4 text-sm font-medium hover:border-accent hover:text-accent"
                >
                  {p.name}
                  <ArrowUpRight className="size-4 opacity-60" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border px-5 py-10 md:px-10">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 text-sm text-muted md:flex-row md:items-center md:justify-between">
        <p className="font-display tracking-[0.28em] text-accent uppercase">{WESSEL.label}</p>
        <p>
          {WESSEL.name} · {WESSEL.hometown}
        </p>
        <p>Previews are 30-second clips. Full tracks on the services above.</p>
      </div>
    </footer>
  );
}
