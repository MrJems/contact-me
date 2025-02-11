const socketStore = require("../utils/socketStore");
const User = require("../models/user");

const sendWebRTCSignalingDataHandler = async (socket, io, data) => {
  const userDetails = socket.data.user;
  data.userDetails = userDetails;
  const reciver = data.callInfo.userName;
  const reciverUser = await User.findOne({ username: reciver });
  if (!reciverUser) {
    console.error("reciverUser not found:", reciver);
    return;
  }
  const activeAdminConnections = socketStore.getActiveConnections(reciver);
  activeAdminConnections.forEach((socketId) => {
    io.to(socketId).emit("webRTC-signaling", data);
  });
};

module.exports = sendWebRTCSignalingDataHandler;
