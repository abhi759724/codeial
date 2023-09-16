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

module.exports.create = (req, res) => {
  // later
};
