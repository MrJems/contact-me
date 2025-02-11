const Conversation = require("../models/conversation");
const {
  getSocketServerInstance,
  getActiveConnections,
} = require("../utils/socketStore");

const message = require("../models/message");

const updateChatHistory = async (
  conversationId,
  toSpecifiedSocketId = null
) => {
  const conversation = await Conversation.findById(conversationId)
    .populate({
      path: "messages",
      model: "Message",
      populate: {
        path: "author",
        model: "User",
        select: "username",
      },
    })
    .populate({
      path: "participants",
      model: "User",
      select: "username",
    });

  if (conversation) {
    const io = getSocketServerInstance();
    if (toSpecifiedSocketId) {
      return io.to(toSpecifiedSocketId).emit("chat-history", {
        messages: conversation.messages,
        participants: conversation.participants,
      });
    }

    conversation.participants.forEach((userId) => {
      const activeConnections = getActiveConnections(userId.username);

      activeConnections.forEach((socketId) => {
        io.to(socketId).emit("chat-history", {
          messages: conversation.messages,
          participants: conversation.participants,
        });
      });
    });
  } else {
    // const io = getSocketServerInstance();
    // if (toSpecifiedSocketId) {
    //   return io.to(toSpecifiedSocketId).emit("chat-history", {
    //     messages: [],
    //     participants: [],
    //   });
    // }
    // conversation.participants.forEach((userId) => {
    //   console.log("------------userid.... ", userId);
    //   const activeConnections = getActiveConnections(userId.username);
    //   activeConnections.forEach((socketId) => {
    //     io.to(socketId).emit("chat-history", {
    //       messages: [],
    //       participants: [],
    //     });
    //   });
    // });
  }
};

module.exports = { updateChatHistory };
