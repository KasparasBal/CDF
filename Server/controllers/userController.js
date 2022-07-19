const User = require("../Models/userModel");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//register
const register = (request, response) => {
  // hashing
  bcrypt
    .hash(request.body.password, 10)
    .then((hashedPassword) => {
      // user
      const user = new User({
        username: request.body.username,
        email: request.body.email,
        password: hashedPassword,
      });

      //save the user
      user
        .save()

        .then((result) => {
          response.status(201).send({
            message: "User has been Created Successfully",
            result,
          });
        })

        .catch((error) => {
          response.status(500).send({
            message: "Error while creating new user",
            error,
          });
        });
    })

    .catch((e) => {
      response.status(500).send({
        message: "Password hasn't been hashed",
        e,
      });
    });
};

// login

const login = (request, response) => {
  // check if email exists
  User.findOne({
    email: request.body.email,
  })

    // if email exists
    .then((user) => {
      // compare  password  and  hashed password
      bcrypt
        .compare(request.body.password, user.password)

        .then((passwordCheck) => {
          // passwords match?
          if (!passwordCheck) {
            return response.status(400).send({
              message: "Passwords does not match",
              error,
            });
          }

          //   create JWT token
          const token = jwt.sign(
            {
              userId: user._id,
              userEmail: user.email,
            },
            "RANDOM-TOKEN",
            { expiresIn: "24h" }
          );

          // res success
          response.status(200).send({
            message: "Login Successful",
            email: user.email,
            username: user.username,
            userId: user._id,
            token,
          });
        })
        // err - passwords don't match
        .catch((error) => {
          response.status(400).send({
            message: "Passwords do not match",
            error,
          });
        });
    })
    // err -email not found
    .catch((e) => {
      response.status(404).send({
        message: "Email not found",
        e,
      });
    });
};

//Get User
//////////////////////////////////////////////////////////
const getUser = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No Matching User Found" });
  }

  const user = await User.findById(id);

  if (!user) {
    return res.status(404).json({ error: "No Matching User Found." });
  }

  res.status(200).json(user);
};

//Update User
//////////////////////////////////////////////////////////

const updateUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    //Check if profile owner matches
    if (user.userId === req.params.Id) {
      await user.updateOne({ $set: req.body });
      req.status(200).json("the user information has been updated");
    } else {
      res.status(403).json("Only the owner can update this!");
    }
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

module.exports = {
  register,
  login,
  getUser,
  updateUser,
};
