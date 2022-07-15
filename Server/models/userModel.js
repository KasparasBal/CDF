const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Email needed"],
    unique: [true, "This email is taken"],
  },

  password: {
    type: String,
    required: [true, "Password needed"],
    unique: false,
  },
});

module.exports = mongoose.model("Users", UserSchema);
