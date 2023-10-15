const Post = require("../models/post");
const User = require("../models/user");
module.exports.home = async (req, res) => {
  // populate the user i.e it will return the whole object
  try {
    const posts = await Post.find({})
      .sort("-createdAt")
      .populate("user")
      .populate({
        path: "comments",
        populate: {
          path: "user",
        },
      });
    const users = await User.find({});
    return res.render("home", {
      title: "HomePage",
      posts: posts,
      All_users: users,
    });
  } catch (err) {
    console.log("Error finding the posts:", err);
  }
};
