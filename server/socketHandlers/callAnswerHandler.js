const socketStore = require("../utils/socketStore");
const User = require("../models/user");

const callAnswerHandler = async (socket, io, data) => {
  const userDetails = socket.data.user;
  const reciver = data.reciver;
  userDetails.type = data.type;

  const reciverUser = await User.findOne({ username: reciver });
  if (!reciverUser) {
    console.error("reciverUser not found:", reciver);
    return;
  }
  const activeAdminConnections = socketStore.getActiveConnections(reciver);
  activeAdminConnections.forEach((socketId) => {
    io.to(socketId).emit("answer-call", userDetails);
  });
};

module.exports = callAnswerHandler;
