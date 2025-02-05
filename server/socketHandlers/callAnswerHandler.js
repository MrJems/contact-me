const socketStore = require("../utils/socketStore");
const User = require("../models/user");

const callAnswerHandler = async (socket, io, data) => {
  const userDetails = socket.data.user;
  const reciver = data.reciver;
  console.log("dddaataa ", data);
  const reciverUser = await User.findOne({ username: reciver });
  if (!reciverUser) {
    console.error("reciverUser not found:", reciver);
    return;
  }
  const activeAdminConnections = socketStore.getActiveConnections(reciver);
  console.log("second active connection : ", activeAdminConnections);
  activeAdminConnections.forEach((socketId) => {
    io.to(socketId).emit("answer-call", userDetails);
  });

  console.log("userdetadfghjkilfss ", userDetails, data);
};

module.exports = callAnswerHandler;
