const express = require("express");
const auth = require("../auth");

const {
  getAllComments,
  getSingleComment,
  CreateComment,
  DeleteComment,
  UpdateComment,
  LikeComment,
  DislikeComment,
} = require("../Controllers/postController");

const router = express.Router();

//COMMENTS////////////////////////////////////////

//No Need to Be Authenticated ---------------------

//Get All Comments
router.get("/:id/comments", getAllComments);

//Get single Comment
router.get("/:id/:id/comments", getSingleComment);

//Needs to Be Authenticated ----------------------

//POST a new Comment
router.post("/comments/create", auth, CreateComment);

//DELETE a Comment
router.delete("/comments/:id", auth, DeleteComment);

//Update a Comment
router.patch("/comments/:id", auth, UpdateComment);

//Like a Comment
router.patch("/comments/:id", auth, LikeComment);

//Dislike a Comment
router.patch("/comments/:id", auth, DislikeComment);

module.exports = router;
