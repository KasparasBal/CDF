const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const postSchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    author: {
      type: String,
    },
    likeCount: {
      type: Number,
      default: 0,
    },
    comments: {
      type: [String],
      default: [],
    },
  },

  { timestamps: true }
);

module.exports = mongoose.model("Post", postSchema);
