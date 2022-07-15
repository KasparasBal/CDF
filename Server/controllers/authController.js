const Post = require("../Models/postModel");

const mongoose = require("mongoose");

// Create New Post
const createPost = async (req, res) => {
  const { title, body } = req.body;

  //add doc to db
  try {
    const post = await Post.create({
      title,
      body,
    });
    res.status(200).json({ post });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
// Delete A Post
const deletePost = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No Matching Post Found" });
  }

  const post = await Post.findOneAndDelete({ _id: id });

  if (!post) {
    return res.status(404).json({ error: "No Matching Post Found." });
  }

  res.status(200).json({ mssg: "post Deleted" });
};

// Update A Post
const updatePost = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No Matching Post Found" });
  }

  const post = await Post.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );

  if (!post) {
    return res.status(404).json({ post });
  }

  res.status(200).json(post);
};

module.exports = {
  createPost,
  deletePost,
  updatePost,
};
