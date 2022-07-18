const Post = require("../Models/postModel");
const mongoose = require("mongoose");
const router = require("express").Router();

// const posts = await Post.find()
// .populate({ path: "comments" })

//GetAllPosts;
//////////////////////////////////////////////////////
const getAllPosts = async (req, res) => {
  const posts = await Post.find()
    .select("title body author userId")

    .sort({ createdAt: -1 });

  res.status(200).json(posts);
};

//Create A Single Post
//////////////////////////////////////////////////////////
const getSinglePost = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No Matching Post Found" });
  }

  const post = await Post.findById(id).select("title body author userId");

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
    const { id } = req.params;
    const post = await Post.findById(id);

    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { likeCount: post.likeCount + 1 },
      { new: true }
    );

    res.json(updatedPost);
  } catch (err) {
    res.status(500).json(err);
  }
};

//Comment A Post
//////////////////////////////////////////////////////////
const CommentPost = async (req, res) => {
  const { id } = req.params;
  const { value } = req.body;

  const post = await Post.findById(id);

  post.comments.push(value);

  const updatedPost = await Post.findByIdAndUpdate(id, post, { new: true });

  res.json(updatedPost);
};

//Comment
const comment = (req, res) => {
  let comment = req.body.comment;
  comment.postedBy = req.body.userId;

  Post.findByIdAndUpdate(
    req.body.postId,
    { $push: { comments: comment } },
    { new: true }
      .populate("comments.userId", "_id name")
      .populate("userId", "_id name")
  ).exec((err, result) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    } else {
      res.json(result);
    }
  });
};

//Delete Comment
const deleteComment = (req, res) => {
  let comment = req.body.comment;

  Post.findByIdAndUpdate(
    req.body.postId,
    { $pull: { comments: { _id: comment._id } } },
    { new: true }
      .populate("comments.userId", "_id name")
      .populate("userId", "_id name")
  ).exec((err, result) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    } else {
      res.json(result);
    }
  });
};

module.exports = {
  getAllPosts,
  getSinglePost,
  CreatePost,
  DeletePost,
  UpdatePost,
  LikePost,
  CommentPost,
  comment,
  deleteComment,
};
