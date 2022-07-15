const express = require("express");

const {
  createPost,
  deletePost,
  updatePost,
} = require("../Controllers/authController");

const router = express.Router();

//POST a new Post
router.post("/create", createPost);

//DELETE a Post
router.delete("/:id", deletePost);

//Update a Post
router.patch("/:id", updatePost);

module.exports = router;
