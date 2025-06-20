import mongoose from "mongoose";
import userStatsSchema from "./userStatsModel.js";

const bookSchema = mongoose.Schema(
  {
    google_books_id: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    cover_image_url: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    published_date: {
      type: String,
      required: true,
    },
    isRead: {
      type: Boolean,
      required: true,
    },
    userStats: userStatsSchema,
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Book", bookSchema);
