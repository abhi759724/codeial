const express = require("express");
const cookieParser = require("cookie-parser");
const PORT = 9000;
const app = express();
const db = require("./config/database");

// middelwares

app.use(express.static("./assets"));
app.use(express.urlencoded());
app.use(cookieParser());

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

// listen the application
app.listen(PORT, (req, res) => {
  console.log(`server is running on port : ${PORT}`);
});
