import mongoose from "mongoose";

const userStatsSchema = new mongoose.Schema({
  isWatched: { type: Boolean, required: true },
  userRating: { type: Number },
  watchDate: { type: String },
});

export default userStatsSchema;
