const Post = require("../models/post");
module.exports.home = async (req, res) => {
  // populate the user i.e it will return the whole object
  try {
    const posts = await Post.find({}).populate("user").exec();
    return res.render("home", {
      title: "HomePage",
      posts: posts,
    });
  } catch (err) {
    console.log("Error finding the posts:", err);
  }
};
