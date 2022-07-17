const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const answerSchema = new Schema(
  {
    body: {
      type: String,
      required: true,
    },
    author: {
      type: String,
    },
  },

  { timestamps: true }
);

module.exports = mongoose.model("Answer", answerSchema);
