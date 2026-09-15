export type Track = {
  id: string;
  title: string;
  year: number;
  duration: string;
  durationSec: number;
  cover: string;
  preview: string;
  genre: string;
  featured?: boolean;
  latest?: boolean;
  chart?: string;
  feat?: string;
  album?: string;
  explicit?: boolean;
  spotify?: string;
  apple?: string;
  deezer?: string;
};
