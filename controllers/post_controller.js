const Post = require("../models/post");
const Comment = require("../models/comment");

module.exports.create = async (req, res) => {
  Post.create({
    content: req.body.content,
    user: req.user._id,
    comment: req.user.comment,
  })
    .then(() => {
      return res.redirect("back");
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
      res.redirect("back");
    });
};

module.exports.destroy = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.user !== req.user._id) {
      console.log("Unauthorised access found");
    }
    await post.deleteOne();
    await Comment.deleteMany({ post: req.params.id });
    return res.redirect("back");
  } catch (err) {
    res.sendStatus(422);
  }
};
