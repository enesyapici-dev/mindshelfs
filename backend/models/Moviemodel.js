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
    isWatched: {
      type: Boolean,
      required: true,
    },
    userRating: { type: Number },
    watchDate: { type: Date },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Movie", movieSchema);
