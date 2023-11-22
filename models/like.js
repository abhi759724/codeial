const mongoose = require("mongoose");
const likeSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.ObjectId,
    },
    likeable: {
      type: mongoose.Schema.ObjectId,
      require: true,
      refPath: "onModel",
    },
    onModel: {
      type: String,
      required: true,
      enum: ["Post", "Comment"],
    },
  },
  { timestamps: true }
);

module.exports = Like = mongoose.model("Like", likeSchema);
