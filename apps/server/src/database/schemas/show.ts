import { Schema } from "mongoose";
import { SpotifyImage } from "./image";

export interface SpotifyShow {
  id: string;
  name: string;
  publisher: string;
  images: SpotifyImage[];
}

export type Show = SpotifyShow;

export const ShowSchema = new Schema<Show>(
  {
    id: { type: String, unique: true, required: true },
    name: String,
    publisher: String,
    images: Array,
  },
  {
    timestamps: true,
  },
);