//dependencies
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cors = require("cors");

//middleware
const dbConnect = require("./db/dbConnect");
const auth = require("./auth");

//models

const User = require("./models/userModel");

// body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//connect to DB
dbConnect();

//Test Get request
app.get("/", (req, res, next) => {
  response.json({ message: "Backend setup properly" });
  next();
});

// register
app.post("/register", (request, response) => {
  // hashing
  bcrypt
    .hash(request.body.password, 10)
    .then((hashedPassword) => {
      // user
      const user = new User({
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
});

//login

// login
app.post("/login", (request, response) => {
  // check if email exists
  User.findOne({ email: request.body.email })

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
});

// not logged in
app.get("/free-endpoint", (request, response) => {
  response.json({ message: "Everyone is welcome" });
});

// logged in
app.get("/auth-endpoint", auth, (request, response) => {
  response.json({ message: "Hello logged in user" });
});

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
