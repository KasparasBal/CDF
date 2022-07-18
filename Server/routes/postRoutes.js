const express = require("express");
const auth = require("../auth");

const {
  getAllPosts,
  getSinglePost,
  CreatePost,
  DeletePost,
  UpdatePost,
  LikePost,
  CommentPost,
  comment,
  deleteComment,
} = require("../Controllers/postController");

const router = express.Router();

//POSTS////////////////////////////////////////

//No Need to Be Authenticated ---------------------

//Get All Posts
router.get("/", getAllPosts);

//Get single Post
router.get("/posts/:id", getSinglePost);

//Needs to Be Authenticated ----------------------

//POST a new Post
router.post("/posts/create", auth, CreatePost);

//DELETE a Post
router.delete("/posts/:id", auth, DeletePost);

//Update a Post
router.patch("/posts/:id", auth, UpdatePost);

//Like a Post
router.patch("/posts/:id/like", auth, LikePost);

//Comment a Post
router.post("/posts/:id/comment", auth, CommentPost);

//Comments
router.put("/posts/comment", auth, comment);
router.put("/posts/deleteComment", auth, deleteComment);

module.exports = router;
