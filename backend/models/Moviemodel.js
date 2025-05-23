import mongoose from "mongoose";

const movieSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    poster_path: {
      type: String,
      required: true,
    },
    director: {
      type: String,
      required: true,
    },
    release_date: {
      type: Number,
      required: true,
    },
    vote_average: {
      type: Number,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
  },
  {
    timestaps: true,
  }
);

export const Book = mongoose.model("Movie", movieSchema);
