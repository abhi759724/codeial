const Post = require("../../../models/post");
const Comment = require("../../../models/comment");

module.exports.index = async (req, res) => {
  const posts = await Post.find({})
    .sort("-createdAt")
    .populate("user")
    .populate({
      path: "comments",
      populate: {
        path: "user",
      },
    });
  return res.status(200).json({
    message: " controller is working fine on this route",
    post: posts,
  });
};

module.exports.destroy = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    // console.log(post.user);
    // console.log(post.user._id);
    if (post.user == post.user._id) {
      await post.deleteOne();
      //   await Comment.deleteMany({ post: req.params.id });
      return res.json(200, {
        message: "Post and associated comment deleted",
      });
    } else {
      //   console.log(err);
      return res.json(401, {
        message: "You are not authorized to delete the post",
      });
    }
  } catch (err) {
    console.log(err);
    res.json(422, {
      message: "Internal error",
    });
  }
};
