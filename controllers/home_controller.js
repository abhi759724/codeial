const home = (req, res) => {
  res.render("home", { title: "Homepage" });
};
module.exports = home;
