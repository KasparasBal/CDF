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
    likes: {
      type: Array,
      default: [],
    },
    commentsArrayLength: {
      type: Number,
      default: 0,
    },
    edited: {
      type: Boolean,
      default: false,
    },

    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "comment" }],
  },

  { timestamps: true }
);

module.exports = mongoose.model("Post", postSchema);
