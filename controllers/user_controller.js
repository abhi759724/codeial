const User = require("../models/user");

module.exports.userProfile = (req, res) => {
  return res.render("user_Profile", {
    title: "Profile",
  });
};

// render the sign up page

module.exports.signup = (req, res) => {
  return res.render("user_signup", {
    title: "Codeial | sign up",
  });
};

// render the sign in page
module.exports.signin = (req, res) => {
  return res.render("user_signin", {
    title: "Codeial | sign in",
  });
};

// get data from user

module.exports.create = async (req, res) => {
  if (req.body.password != req.body.confirm_password) {
    return res.redirect("back");
  }

  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      const newUser = await User.create(req.body);
      console.log("User created successfully while signing up");
      return res.redirect("/users/signin");
    } else {
      alert("User Already Exists");
      return res.redirect("back");
    }
  } catch (err) {
    console.error("Error in creating user while signing up:", err);
    // Handle the error as needed, e.g., return an error response
    res.status(500).json({ error: "An error occurred while signing up" });
  }
};
module.exports.createSession = (req, res) => {
  // later
};
