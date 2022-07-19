const mongoose = require("mongoose");
const { Schema } = mongoose;

const commentSchema = new Schema(
  {
    content: {
      type: String,
      required: true,
    },
    user: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    postId: mongoose.Types.ObjectId,
    author: {
      type: String,
      required: true,
    },
    edited: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("comment", commentSchema);
