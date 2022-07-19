const Posts = require("../Models/postModel");
const Comments = require("../models/commentModel");

const commentCtrl = {
  createComment: async (req, res) => {
    try {
      const { postId, content, user, author } = req.body;

      const post = await Posts.findById(postId);
      if (!post) {
        return res.status(400).json({ msg: "Post does not exist." });
      }

      const newComment = new Comments({
        author,
        user,
        content,
        postId,
      });

      await Posts.findOneAndUpdate(
        { _id: postId },
        {
          $push: { comments: newComment._id },
        },
        { new: true }
      );

      await Posts.findOneAndUpdate(
        { _id: postId },
        {
          $inc: { commentsArrayLength: 1 },
        },
        { new: true }
      );

      await newComment.save();
      res.json({ newComment });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  getComments: async (req, res) => {
    try {
      const comments = await Comments.find()
        .select("content _id author user postId edited ")
        .populate("user");

      res.json(comments);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  getCommentCount: async (req, res) => {
    try {
      const comments = await Comments.find().count();

      res.json(comments);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  updateComment: async (req, res) => {
    try {
      const comment = await Comments.findById(req.params.id);
      //Check if post owner matches
      if (comment.userId === req.body.userId) {
        await comment.updateOne({ $set: req.body });
        req.status(200).json("the comment has been updated");
      } else {
        res.status(403).json("Only the author can update this!");
      }
    } catch (err) {
      res.status(500).json({ err });
    }
  },

  likeComment: async (req, res) => {
    try {
      const comment = await Comments.find({
        _id: req.params.id,
        likes: req.user._id,
      });
      if (comment.length > 0) {
        return res
          .status(400)
          .json({ msg: "You have already liked this post" });
      }

      await Comments.findOneAndUpdate(
        { _id: req.params.id },
        {
          $push: { likes: req.user._id },
        },
        {
          new: true,
        }
      );

      res.json({ msg: "Comment liked successfully." });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  deleteComment: async (req, res) => {
    try {
      const comment = await Comments.findOneAndDelete({
        _id: req.params.id,
        $or: [{ user: req.user._id }, { postUserId: req.user._id }],
      });

      await Posts.findOneAndUpdate(
        { _id: comment.postId },
        {
          $pull: { comments: req.params.id },
        }
      );
      res.json({ msg: "Comment deleted successfully." });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

module.exports = commentCtrl;
