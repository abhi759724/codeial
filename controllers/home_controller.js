module.exports.home = (req, res) => {
  console.log(req.cookies);
  res.cookie("abhi", 25);
  res.render("home", { title: "Homepage" });
};
