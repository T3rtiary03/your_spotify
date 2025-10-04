import { Schema, Types } from "mongoose";

export interface Infos {
  owner: Types.ObjectId;
  id: string;
  albumId?: string;
  primaryArtistId?: string;
  artistIds?: string[];
  showId?: string;
  durationMs: number;
  played_at: Date;
  blacklistedBy?: "artist";
  type: "track" | "episode";
}

export const InfosSchema = new Schema<Infos>(
  {
    owner: { type: Schema.Types.ObjectId, ref: "User" },

    id: { type: String, index: true },
    albumId: { type: String, index: true, required: false },
    primaryArtistId: { type: String, index: true, required: false },
    artistIds: { type: [{ type: String }], required: false },
    showId: { type: String, index: true, required: false },

    durationMs: { type: Number },

    played_at: { type: Date, index: true },
    blacklistedBy: {
      type: [String],
      enum: ["artist"],
      required: false,
      default: undefined,
    },
    type: {
      type: String,
      enum: ["track", "episode"],
      required: true,
    },
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true } },
);

InfosSchema.virtual("track", {
  ref: "Track",
  localField: "id",
  foreignField: "id",
  justOne: true,
});

InfosSchema.virtual("episode", {
  ref: "Episode",
  localField: "id",
  foreignField: "id",
  justOne: true,
});

InfosSchema.virtual("show", {
  ref: "Show",
  localField: "showId",
  foreignField: "id",
  justOne: true,
});

InfosSchema.virtual("album", {
  ref: "Album",
  localField: "albumId",
  foreignField: "id",
  justOne: true,
});

InfosSchema.virtual("artist", {
  ref: "Artist",
  localField: "primaryArtistId",
  foreignField: "id",
  justOne: true,
});
