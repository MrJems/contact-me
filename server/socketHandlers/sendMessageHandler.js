const Message = require("../models/message");
const Conversation = require("../models/conversation");
const User = require("../models/user");
const { updateChatHistory } = require("./chatHandler");

const sendMessageHandler = async (socket, data) => {
  try {
    const { reciver, sender, text } = data;

    const senderUser = await User.findOne({ username: sender });
    if (!senderUser) {
      console.error("Sender not found:", sender);
      return;
    }
    const reciverUser = await User.findOne({ username: reciver });
    if (!reciverUser) {
      console.error("reciverUser not found:", reciver);
      return;
    }

    const message = await Message.create({
      content: text,
      author: senderUser._id,
    });

    const conversation = await Conversation.findOne({
      participants: { $all: [reciverUser._id, senderUser._id] },
    });

    if (conversation) {
      conversation.messages.push(message._id);
      await conversation.save();

      updateChatHistory(conversation._id.toString());
    } else {
      const newConversation = await Conversation.create({
        messages: [message._id],
        participants: [reciverUser._id, senderUser._id],
      });
      updateChatHistory(newConversation._id.toString());
    }
    console.log(data);
  } catch (err) {
    console.log(err);
  }
};

module.exports = sendMessageHandler;
