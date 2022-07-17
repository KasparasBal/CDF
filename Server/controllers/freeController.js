const Post = require("../Models/postModel");
const Answer = require("../Models/answerModel");

const mongoose = require("mongoose");

// Get All Answers
const getAllAnswers = async (req, res) => {
  const answers = await Answer.find({}).sort({ createdAt: -1 });

  res.status(200).json(answers);
};

// Get All Posts
const getAllPosts = async (req, res) => {
  const posts = await Post.find({}).sort({ createdAt: -1 });

  res.status(200).json(posts);
};

// Get Single Post
const getSinglePost = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No Matching Post Found" });
  }

  const post = await Post.findById(id);

  if (!post) {
    return res.status(404).json({ error: "No Matching Post Found." });
  }

  res.status(200).json(post);
};

module.exports = {
  getAllPosts,
  getSinglePost,
  getAllAnswers,
};
