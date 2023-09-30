const Comment = require("../models/comment");
const Post = require("../models/post");

module.exports.create = async function (req, res) {
  try {
    const post = await Post.findById(req.body.post);

    if (post) {
      const comment = await Comment.create({
        content: req.body.content,
        post: req.body.post,
        user: req.user._id,
      });

      post.comments.push(comment);
      await post.save();
      res.redirect("/");
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Error");
  }
};

module.exports.destroy = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (comment.user !== req.user._id) {
      console.log("Unauthorised access found");
    }
    await comment.deleteOne();
    return res.redirect("back");
  } catch (err) {
    res.sendStatus(422);
  }
};
