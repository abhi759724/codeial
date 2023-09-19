const mongoose = require("mongoose");

// const db = async () => {
//   try {
//     await mongoose.connect("mongodb://localhost:27017/codeial_development", {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });
//     console.log("Successful connection to database");
//   } catch (err) {
//     console.error("Error connecting to db:", err.message);
//     process.exit(1);
//   }
// };

mongoose.connect("mongodb://127.0.0.1:27017/codeial_development");

const db = mongoose.connection;

db.on("error", console.error.bind(console, "Error connecting to db"));

db.once("open", () => {
  console.log("Successfull connection to db");
});

module.exports = db;
