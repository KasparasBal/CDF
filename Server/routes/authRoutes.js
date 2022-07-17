const express = require("express");
const auth = require("../auth");

const {
  createAnswer,
  deleteAnswer,
  updateAnswer,
  createPost,
  deletePost,
  updatePost,
} = require("../Controllers/authController");

const router = express.Router();

//ANSWERS////////////////////////////////////////

//POST a new Answer
router.post("/answers", auth, createAnswer);

//DELETE a Answer
router.delete("/answers/:id", auth, deleteAnswer);

//Update a Answer
router.patch("/answers/:id", auth, updateAnswer);

//Like an Answer
router.patch("/answers/:id", auth, updateAnswer);

//Dislike an Answer
router.patch("/answers/:id", auth, updateAnswer);

//POSTS////////////////////////////////////////

//POST a new Post
router.post("/posts/create", auth, createPost);

//DELETE a Post
router.delete("/posts/:id", auth, deletePost);

//Update a Post
router.patch("/posts/:id", auth, updatePost);

//Like a Post
router.patch("/posts/:id", auth, updatePost);

//Dislike a Post
router.patch("/posts/:id", auth, updatePost);

module.exports = router;
