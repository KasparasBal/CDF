const express = require("express");
const auth = require("../auth");

const {
  createPost,
  deletePost,
  updatePost,
} = require("../Controllers/authController");

const router = express.Router();

//POST a new Post
router.post("/create", auth, createPost);

//DELETE a Post
router.delete("/:id", auth, deletePost);

//Update a Post
router.patch("/:id", auth, updatePost);

module.exports = router;
