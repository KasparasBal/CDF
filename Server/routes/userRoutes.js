const express = require("express");
const router = express.Router();

const {
  register,
  login,
  getUser,
  updateUser,
} = require("../Controllers/UserController");

//get user
router.get("/profile/:id", getUser);

//get user
router.patch("/editProfile/:id", updateUser);

//login user
router.post("/login", login);

//register a new User
router.post("/register", register);

module.exports = router;
