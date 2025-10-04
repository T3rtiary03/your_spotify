import { Schema } from "mongoose";
import { SpotifyImage } from "./image";

export interface SpotifyEpisode {
  id: string;
  name: string;
  images: SpotifyImage[];
  release_date: string;
  duration_ms: number;
  show: {
    id: string;
    name: string;
    publisher: string;
    images: SpotifyImage[];
  };
}

export interface Episode extends Omit<SpotifyEpisode, "show"> {
  show: string;
}

export const EpisodeSchema = new Schema<Episode>(
  {
    id: { type: String, unique: true, required: true },
    name: String,
    images: Array,
    release_date: String,
    duration_ms: Number,
    show: { type: String, ref: "Show" },
  },
  {
    timestamps: true,
  },
);