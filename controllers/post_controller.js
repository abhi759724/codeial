const Post = require("../models/post");

module.exports.create = async (req, res) => {
  Post.create({
    content: req.body.content,
    user: req.user._id,
  })
    .then(() => {
      return res.redirect("back");
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
      res.redirect("back");
    });
};
