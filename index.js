const express = require("express");
const cookieParser = require("cookie-parser");
const PORT = 9000;
const expressLayout = require("express-ejs-layouts");
const app = express();

// require database
const db = require("./config/database");

// require express session and passport instance
const session = require("express-session");
const passport = require("passport");
const passportLocal = require("./config/passport-local-strategy");
const passportGoogle = require("./config/passport-google-strategy");
const JWTStrategy = require("./config/passport-jwt-strategy");
const MongoStore = require("connect-mongo");

// create sass middleware instance
const sassMiddleware = require("node-sass-middleware");

// import flash messages
const flash = require("connect-flash");

// import custom middlware from config
const customMiddleware = require("./config/middleware");

// sass middleware to convert sass into css
app.use(
  sassMiddleware({
    src: "./assets/scss",
    dest: "./assets/css",
    debug: true,
    outputStyle: "extended",
    prefix: "/css",
  })
);

app.use(express.urlencoded());
app.use(cookieParser());
app.use(express.static("./assets"));

// make the uplaod path available for browser

app.use("/uploads", express.static(__dirname + "/uploads"));

// layout instance

app.use(expressLayout);

// extract styles and scripts from sub layouts to layout
app.set("layout extractStyles", true);
app.set("layout extractScripts", true);

// import engine
app.set("view engine", "ejs");
app.set("views", "./views");

// use sessions for tracking logins
app.use(
  session({
    name: "codeial",
    secret: "helloworld",
    saveUninitialized: false,
    resave: false,
    cookies: {
      maxAge: 1000 * 60 * 100,
    },
    store: MongoStore.create(
      {
        mongoUrl: "mongodb://127.0.0.1:27017/codeial_development",
        autoRemove: "disabled",
      },
      function (err) {
        console.log(err);
      }
    ),
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

// use flash
app.use(flash());
app.use(customMiddleware.setFlash);

// import routes

app.use("/", require("./routes"));

// listen the application
app.listen(PORT, (req, res) => {
  console.log(`server is running on port : ${PORT}`);
});
