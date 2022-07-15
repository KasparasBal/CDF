const express = require("express");
const router = express.Router();

const { register, login } = require("../Controllers/UserController");

//login user
router.post("/login", login);

//register a new User
router.post("/register", register);

module.exports = router;
