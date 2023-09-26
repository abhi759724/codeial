const User = require("../models/user");

module.exports.userProfile = async (req, res) => {
  return res.render("user_profile", {
    title: "User Profile",
  });
};

// render the sign up page

module.exports.signup = (req, res) => {
  if (req.isAuthenticated()) {
    return res.redirect("/users/profile");
  }
  return res.render("user_signup", {
    title: "Codeial | sign up",
  });
};

// If user is in sign in page and want to register
module.exports.register = (req, res) => {
  return res.render("user_signup", {
    title: "Codeial | sign up",
  });
};

// logout
module.exports.signout = (req, res) => {
  return req.logout(() => {
    return res.redirect("/");
  });
};

// render the sign in page
module.exports.signin = (req, res) => {
  if (req.isAuthenticated()) {
    return res.redirect("/users/profile");
  }
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
module.exports.createSession = async (req, res) => {
  // try {
  //   const user = await User.findOne({ email: req.body.email });
  //   if (user) {
  //     if (user.password != req.body.password) {
  //       return res.redirect("back");
  //     }
  //     res.cookie("user_id", user.id);
  //     return res.redirect("/users/profile");
  //   }
  // } catch (err) {
  //   console.error("Error in creating user while signing up:", err);
  //   res.status(500).json({ error: "An error occurred while signing up" });
  // }
  return res.redirect("/");
};
