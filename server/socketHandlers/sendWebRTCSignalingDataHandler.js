const socketStore = require("../utils/socketStore");
const User = require("../models/user");

const sendWebRTCSignalingDataHandler = async (socket, io, data) => {
  const userDetails = socket.data.user;
  data.userDetails = userDetails;
  const reciver = data.callInfo.userName;
  console.log("dddaataa signaling ", data);
  const reciverUser = await User.findOne({ username: reciver });
  if (!reciverUser) {
    console.error("reciverUser not found:", reciver);
    return;
  }
  const activeAdminConnections = socketStore.getActiveConnections(reciver);
  console.log("second active connection : ", activeAdminConnections);
  activeAdminConnections.forEach((socketId) => {
    io.to(socketId).emit("webRTC-signaling", data);
  });

  console.log("userdetadfghjkilfss ", userDetails, data);
};

module.exports = sendWebRTCSignalingDataHandler;
