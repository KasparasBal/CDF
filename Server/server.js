//dependencies
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const usersRoutes = require("./Routes/userRoutes");
const postRoutes = require("./Routes/postRoutes");

//middleware
const dbConnect = require("./db/dbConnect");
const auth = require("./auth");

// body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//connect to DB
dbConnect();

//CORS
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

//TESTING ROUTES

//routes

app.use("/", usersRoutes);
app.use("/", postRoutes);

//LISTENING TO SERVER

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
