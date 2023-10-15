const Comment = require("../models/comment");
const commentsMailer = require("../mailers/comments_mailer");
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

      Comment.populate("user", "name")
        .then((comment) => {
          // Your code to work with the populated 'comment' object goes here
        })
        .catch((error) => {
          console.error("Error populating 'user' field:", error);
        });

      commentsMailer.newComment(comment);

      // if (req.xhr) {
      //   return res.status(200).json({
      //     message: "Comment created successfully!",
      //     data: {
      //       comment: comment,
      //     },
      //   });
      // }

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

    await comment.deleteOne();
    return res.redirect("back");
  } catch (err) {
    res.sendStatus(422);
  }
};
