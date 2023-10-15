const User = require("../../../models/user");
const jwt = require("jsonwebtoken");
module.exports.createSession = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user || user.password != req.body.password) {
      return res.status(422).json({
        message: "Invalid username / password",
      });
    }
    return res.status(200).json({
      message: "sign in successfull",
      data: {
        token: jwt.sign(user.toJSON(), "Codeial", { expiresIn: "1000000" }),
      },
    });
  } catch {
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
