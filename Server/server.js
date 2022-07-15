//dependencies
const express = require("express");
const app = express();
const bodyParser = require("body-parser");

//middleware
const dbConnect = require("./db/dbConnect");

// body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//connect to DB
dbConnect();

//Test Get request
app.get("/", (request, response, next) => {
  response.json({ message: "Backend setup properly" });
  next();
});

module.exports = app;
