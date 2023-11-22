const Like = require("../models/like");
const Post = require("../models/post");
const Comment = require("../models/comment");

module.exports.toggleLike = async (req, res) => {
  try {
    let likeable;
    let deleted = false;

    if (req.query.type == "post") {
      likeable = await Post.findOne({ query: req.query.id }).populate("likes");
    } else {
      likeable = await Comment.findOne({ query: req.query.id }).populate(
        "likes"
      );
    }

    // check if like is already present
    let existingLike = await Like.findOne({
      likeable: req.query.like,
      onModel: req.query.type,
      user: req.user.id,
    });
    console.log("existingLike", existingLike);
    // delete that like
    if (existingLike) {
      existingLike.likes.pull({ _id: existingLike._id });

      existingLike.save();
      existingLike.remove();

      deleted = true;
    } else {
      let newLike = await Like.create({
        likeable: req.query.like,
        onModel: req.query.type,
        user: req.user.id,
      });
      likeable.likes.push(newLike._id);
      likeable.save();
    }
    return res.status().json({
      message: "Request successfull",
      data: {
        deleted: deleted,
      },
    });
  } catch (error) {
    console.log("Error", error);
  }
};
