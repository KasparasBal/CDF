const Post = require("../Models/postModel");
const mongoose = require("mongoose");
const router = require("express").Router();

// const posts = await Post.find()
// .populate({ path: "comments" })

//GetAllPosts;
//////////////////////////////////////////////////////
const getAllPosts = async (req, res) => {
  //pagination
  const page = req.query.p || 1;
  const postsPerPage = 3;
  const skip = (page - 1) * postsPerPage;

  const posts = await Post.find()
    .select("title body author userId")
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(postsPerPage);

  res.status(200).json(posts);
};

//GetAllAnsweredPosts;
//////////////////////////////////////////////////////
const getAllAnsweredPosts = async (req, res) => {
  //pagination
  const page = req.query.p || 1;
  const postsPerPage = 3;
  const skip = (page - 1) * postsPerPage;

  const posts = await Post.find({ commentsArrayLength: { $gt: 0 } })
    .select("title body author userId")
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(postsPerPage);

  res.status(200).json(posts);
};

//GetAllPosts;
//////////////////////////////////////////////////////
const getAllUnAnsweredPosts = async (req, res) => {
  //pagination
  const page = req.query.p || 1;
  const postsPerPage = 3;
  const skip = (page - 1) * postsPerPage;

  const posts = await Post.find({ comments: { $size: 0 } })
    .select("title body author userId")
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(postsPerPage);

  res.status(200).json(posts);
};

//GetAllPostsCount
//////////////////////////////////////////////////////
const getAllPostsCount = async (req, res) => {
  const posts = await Post.find().count();

  res.status(200).json(posts);
};

//Create A Single Post
//////////////////////////////////////////////////////////
const getSinglePost = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No Matching Post Found" });
  }

  const post = await Post.findById(id).select("title body author userId likes");

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
    const post = await Post.findById(req.params.id);
    if (!post.likes.includes(req.body.userId)) {
      await post.updateOne({ $push: { likes: req.body.userId } });
      res.status(200).json("post liked");
    } else {
      await post.updateOne({ $pull: { likes: req.body.userId } });
      res.status(200).json("post disliked");
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
  getAllPostsCount,
  getAllAnsweredPosts,
  getAllUnAnsweredPosts,
};
