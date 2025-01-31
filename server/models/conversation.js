const mongoose = require("mongoose");
const config = require("../config/constants");

const conversationSchema = new mongoose.Schema(
  {
    participants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    ],
    messages: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Message",
      },
    ],
  },
  { timestamps: true, collection: config.DB.CONVERSATION_COLLECTION }
);

module.exports = mongoose.model("Conversation", conversationSchema);
