//imports
const mongoose = require("mongoose");
require("dotenv").config();

//connection
async function dbConnect() {
  mongoose
    .connect(process.env.DB_URI)
    .then(() => {
      console.log("Successfully connected to the database");
    })
    .catch((error) => {
      console.log("connection cannot be established to database");
      console.error(error);
    });
}

module.exports = dbConnect;
