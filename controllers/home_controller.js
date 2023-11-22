const Friendship = require("../models/friendship");
const Post = require("../models/post");
const User = require("../models/user");
module.exports.home = async (req, res) => {
  // populate the user i.e it will return the whole object
  try {
    const loggedInUserId = req.user;

    const posts = await Post.find({})
      .sort("-createdAt")
      .populate("user")
      .populate({
        path: "comments",
        populate: {
          path: "user",
        },
      })
      // populate comments
      .populate({
        path: "comments",
        populate: {
          path: "likes",
        },
      })
      // populate likes
      .populate("likes");

    const users = await User.find({});

    let friendlist = await Friendship.find({
      from_user: loggedInUserId,
    }).populate({
      path: "to_user",
      populate: {
        path: "name",
      },
    });
    return res.render("home", {
      title: "HomePage",
      posts: posts,
      All_users: users,
      all_friends: friendlist,
    });
  } catch (err) {
    console.log("Error finding the posts:", err);
  }
};
