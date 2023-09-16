const user = (req, res) => {
  res.render("user_Profile", {
    title: "Profile",
  });
};

module.exports = user;
