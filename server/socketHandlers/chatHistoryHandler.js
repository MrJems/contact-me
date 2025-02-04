const Conversation = require("../models/conversation");
const Message = require("../models/message");
const { updateChatHistory } = require("./chatHandler");
const User = require("../models/user");

const chatHistoryHandler = async (Socket, data) => {
  try {
    const { reciver, senderId } = data;

    // const senderUser = await User.findOne({ username: sender });
    // if (!senderUser) {
    //   console.error("Sender not found:", sender);
    //   return;
    // }
    const reciverUser = await User.findOne({ username: reciver });
    if (!reciverUser) {
      console.error("reciverUser not found:", reciver);
      return;
    }
    const conversation = await Conversation.findOne({
      participants: { $all: [reciverUser._id, senderId] },
    });

    if (conversation) {
      updateChatHistory(conversation._id.toString(), Socket.id);
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = chatHistoryHandler;
