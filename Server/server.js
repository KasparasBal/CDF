//dependencies
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const cors = require("cors");

//middleware
const dbConnect = require("./db/dbConnect");

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

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
