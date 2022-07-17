const Comment = require("../Models/commentModel");
const router = require("express").Router();

//Get All Comments
//////////////////////////////////////////////////////////
const getAllComments = async (req, res) => {
  const comment = await Comment.find({}).sort({ createdAt: -1 });

  res.status(200).json(comment);
};

//Create A Single Comment
//////////////////////////////////////////////////////////
const getSingleComment = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No Matching Comment Found" });
  }

  const comment = await Comment.findById(id);

  if (!comment) {
    return res.status(404).json({ error: "No Matching Comment Found." });
  }

  res.status(200).json(comment);
};

//Create A Comment
//////////////////////////////////////////////////////////

const CreateComment = async (req, res) => {
  const newComment = new Comment(req.body);
  try {
    const savedComment = await newComment.save();

    res.status(200).json({ savedComment });
  } catch (err) {
    res.status(500).json({ err });
  }
};

//Update A Comment
//////////////////////////////////////////////////////////

const UpdateComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    //Check if comment owner matches
    if (comment.userId === req.body.userId) {
      await comment.updateOne({ $set: req.body });
      req.status(200).json("the comment has been updated");
    } else {
      res.status(403).json("Only the author can update this!");
    }
  } catch (err) {
    res.status(500).json({ err });
  }
};

//Delete A Comment
//////////////////////////////////////////////////////////

const DeleteComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    //Check if comment owner matches
    if (comment.userId === req.body.userId) {
      await comment.deleteOne();
      req.status(200).json("the comment has been deleted");
    } else {
      res.status(403).json("Only the author can delete this!");
    }
  } catch (err) {
    res.status(500).json({ err });
  }
};

//Like A Comment
//////////////////////////////////////////////////////////
const LikeComment = async (req, res) => {
  try {
    //Find this comment
    const comment = await Comment.findById(req.params.id);
    //Check if likes include the liking User
    if (!comment.likes.includes(req.body.userId)) {
      await comment.updateOne({ $push: { likes: req.body.userId } });
      res.status(200).json("comment liked!");
    } else {
      await comment.updateOne({ $pull: { likes: req.body.userId } });
      res.status(200).json("like removed");
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

//Dislike A Comment
//////////////////////////////////////////////////////////

const DislikeComment = async (req, res) => {
  try {
    //Find this comment
    const comment = await Comment.findById(req.params.id);
    //Check if dislikes include the disliking User
    if (!comment.dislikes.includes(req.body.userId)) {
      await comment.updateOne({ $push: { dislikes: req.body.userId } });
      res.status(200).json("comment disliked!");
    } else {
      await comment.updateOne({ $pull: { dislikes: req.body.userId } });
      res.status(200).json("dislike removed");
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = {
  getAllComments,
  getSingleComment,
  CreateComment,
  DeleteComment,
  UpdateComment,
  LikeComment,
  DislikeComment,
};
