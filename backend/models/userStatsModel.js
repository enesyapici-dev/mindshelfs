import mongoose from "mongoose";

const userStatsSchema = new mongoose.Schema({
  userRating: { type: Number },
  watchDate: { type: [String] },
});

export default userStatsSchema;
