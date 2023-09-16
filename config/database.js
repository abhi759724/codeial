const mongoose = require("mongoose");

const db = () => {
  mongoose
    .connect("mongodb://127.0.0.1:27017/codeialdatabase", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Succesfull connection to database");
    })
    .catch((err) => {
      console.error("Error connecting to db");
      console.log(err);
    });
};
module.exports = db;
