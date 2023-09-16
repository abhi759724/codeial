const express = require("express");
const PORT = 9000;
const app = express();
const db = require("./config/database");
app.use(express.static("./assets"));

// layout instance
const expressLayout = require("express-ejs-layouts");
app.use(expressLayout);

// extract styles and scripts from sub layouts to layout
app.set("layout extractStyles", true);
app.set("layout extractScripts", true);

// import engine
app.set("view engine", "ejs");
app.set("views", "./views");
// import routes

app.use("/user", require("./routes/user"));
app.use("/", require("./routes/index"));

app.listen(PORT, (req, res) => {
  console.log(`server is running on port : ${PORT}`);
});
