const user = require("../models/user");
module.exports.user = (req, res) => {
  res.render("user_Profile", {
    title: "Profile",
  });
};

// render the sign up page

module.exports.signup = (req, res) => {
  res.render("user_signup", {
    title: "Codeial | sign up",
  });
};

// render the sign in page
module.exports.signin = (req, res) => {
  res.render("user_signin", {
    title: "Codeial | sign in",
  });
};

// get data from user

module.exports.create = async (req, res) => {
  console.log(req.body);
  user
    .create({
      email: req.body.email,
      password: req.body.password,
      name: req.body.name,
    })
    .then(() => {
      res
        .status(200)
        .json({
          success: true,
          data: response,
          message: "Successfull created data",
        })
        .catch(() => {
          res.status(500).json({
            success: false,
            message: "Internal Error",
          });
        });
    });
};
module.exports.createSession = (req, res) => {
  // later
};
