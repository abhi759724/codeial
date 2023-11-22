const Comment = require("../models/comment");
const commentsMailer = require("../mailers/comments_mailer");
const Post = require("../models/post");

module.exports.create = async function (req, res) {
  try {
    const post = await Post.findById(req.body.post);

    if (post) {
      let comment = await Comment.create({
        content: req.body.content,
        post: req.body.post,
        user: req.user._id,
      });

      post.comments.push(comment);
      await post.save();

      comment = await comment.populate("user", "name");
      commentsMailer.newComment(comment);

      if (req.xhr) {
        return res.status(200).json({
          message: "Comment created successfully!",
          data: {
            comment: comment,
          },
          message: "comment created",
        });
      }

      req.flash("success", "Comment published");

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
    if (comment.post) {
      let postId = comment.post;

      comment.remove();
      let post = post.findByIdAndUpdate(postId, {
        $pull: { comments: req.params.id },
      });
      await Like.deleteMany({ likeable: comment._id, onModel: "Comment" });
      if (req.xhr) {
        return res.status(200).json({
          data: {
            comment_id: req.params.id,
          },
          message: "Post Deleted",
        });
      }
      req.flash("success", "Comment Deleted:");
    }
  } catch (err) {
    res.sendStatus(422);
  }
};
