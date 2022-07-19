const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Username needed"],
    unique: [true, "This username is taken"],
  },
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

  picture: {
    type: String,
    default:
      "https://cdn-icons.flaticon.com/png/512/1144/premium/1144760.png?token=exp=1658212806~hmac=304370bcbae14260a0fa27b82e30907b",
  },
});

module.exports = mongoose.model("User", UserSchema);
