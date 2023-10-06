const User = require("../models/user");
const fs = require("file-system");
const path = require("path");

module.exports.userProfile = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    // console.log(user.name, user.email);
    return res.render("user_profile", {
      title: "User Profile",
      profile_user: user,
    });
  } catch (err) {
    console.log(err);
  }
};

module.exports.update = async (req, res) => {
  if (req.user.id == req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      User.uploadAvatar(req, res, (err) => {
        if (err) {
          console.log("Multer Error", err);
        }
        user.name = req.body.name;
        user.email = req.body.email;
        if (req.file) {
          if (user.avatar) {
            fs.unlinkSync(path.join(__dirname, "..", user.avatar));
          }
          // saving the path of the uploaded file into the avatar field in the user
          user.avatar = User.avatarPath + "/" + req.file.filename;
        }
        user.save();
        return res.redirect("back");
      });
    } catch (err) {
      req.flash("error", err);
      res.redirect("back");
    }
  } else {
    req.flash("error", "unauthorised");
    return res.status(401).send("Unauthorised");
  }
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

// logout
module.exports.signout = (req, res) => {
  return req.logout(() => {
    req.flash("success", "Logged out successfully");
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
  req.flash("success", "Logged in Successfully");
  return res.redirect("/");
};
