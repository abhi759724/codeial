const mongoose = require("mongoose");

// const db = () => {
//   mongoose
//     .connect("mongodb://localhost:27017/codeial_development", {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     })
//     .then(() => {
//       console.log("Succesfull connection to database");
//     })
//     .catch((err) => {
//       console.error("Error connecting to db");
//       console.log(err.message);
//       process.exit(1);
//     });
// };

mongoose.connect("mongodb://127.0.0.1:27017/codeial_development");

const db = mongoose.connection;

db.on("error", console.error.bind(console, "Error connecting to db"));

db.once("open", () => {
  console.log("Successfull connection to db");
});

module.exports = db;
