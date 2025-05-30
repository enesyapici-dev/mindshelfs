import mongoose from "mongoose";
import userStatsSchema from "./userStatsModel.js";

const movieSchema = mongoose.Schema(
  {
    tmdb_id: {
      type: Number,
      required: true,
    },
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
      type: String,
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
    actors: {
      type: String,
      required: true,
    },
    userStats: userStatsSchema,
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Movie", movieSchema);
