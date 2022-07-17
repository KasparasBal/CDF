const express = require("express");

const { getAllPosts, getSinglePost } = require("../Controllers/freeController");
const { getAllAnswers } = require("../Controllers/freeController");

const router = express.Router();

//Get All Posts
router.get("/", getAllPosts);

//Get All Posts
router.get("/answers", getAllAnswers);

//Get single Post
router.get("/:id", getSinglePost);

module.exports = router;
