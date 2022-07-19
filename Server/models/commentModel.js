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
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("comment", commentSchema);
