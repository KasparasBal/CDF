const Post = require("../Models/postModel");
const router = require("express").Router();

//GetAll Posts
//////////////////////////////////////////////////////////
const getAllPosts = async (req, res) => {
  const posts = await Post.find({}).sort({ createdAt: -1 });

  res.status(200).json(posts);
};

//Create A Single Post
//////////////////////////////////////////////////////////
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

//Create A Post
//////////////////////////////////////////////////////////

const CreatePost = async (req, res) => {
  const newPost = new Post(req.body);
  try {
    const savedPost = await newPost.save();

    res.status(200).json({ savedPost });
  } catch (err) {
    res.status(500).json({ err });
  }
};

//Update A Post
//////////////////////////////////////////////////////////

const UpdatePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    //Check if post owner matches
    if (post.userId === req.body.userId) {
      await post.updateOne({ $set: req.body });
      req.status(200).json("the post has been updated");
    } else {
      res.status(403).json("Only the author can update this!");
    }
  } catch (err) {
    res.status(500).json({ err });
  }
};

//Delete A Post
//////////////////////////////////////////////////////////

const DeletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    //Check if post owner matches
    if (post.userId === req.body.userId) {
      await post.deleteOne();
      req.status(200).json("the post has been deleted");
    } else {
      res.status(403).json("Only the author can delete this!");
    }
  } catch (err) {
    res.status(500).json({ err });
  }
};

//Like A Post
//////////////////////////////////////////////////////////
const LikePost = async (req, res) => {
  try {
    //Find this post
    const post = await Post.findById(req.params.id);
    //Check if likes include the liking User
    if (!post.likes.includes(req.body.userId)) {
      await post.updateOne({ $push: { likes: req.body.userId } });
      res.status(200).json("post liked!");
    } else {
      await post.updateOne({ $pull: { likes: req.body.userId } });
      res.status(200).json("like removed");
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

//Dislike A Post
//////////////////////////////////////////////////////////

const DislikePost = async (req, res) => {
  try {
    //Find this post
    const post = await Post.findById(req.params.id);
    //Check if dislikes include the disliking User
    if (!post.dislikes.includes(req.body.userId)) {
      await post.updateOne({ $push: { dislikes: req.body.userId } });
      res.status(200).json("post disliked!");
    } else {
      await post.updateOne({ $pull: { dislikes: req.body.userId } });
      res.status(200).json("dislike removed");
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = {
  getAllPosts,
  getSinglePost,
  CreatePost,
  DeletePost,
  UpdatePost,
  LikePost,
  DislikePost,
};
