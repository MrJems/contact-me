const mongoose = require("mongoose");
const config = require("../config/constants");

const messageSchema = new mongoose.Schema(
  {
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    content: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true, collection: config.DB.MESSAGE_COLLECTION }
);

module.exports = mongoose.model("Message", messageSchema);
