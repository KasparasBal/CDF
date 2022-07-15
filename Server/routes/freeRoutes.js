const express = require("express");

const { getAllPosts, getSinglePost } = require("../Controllers/freeController");

const router = express.Router();

//Get All Posts
router.get("/", getAllPosts);

//Get single Post
router.get("/:id", getSinglePost);

module.exports = router;
