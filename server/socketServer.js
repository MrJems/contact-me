const authSocket = require("./middleware/authSocket");
const newConnectionHandler = require("./socketHandlers/newConnectionHandler");
const disconnectHandler = require("./socketHandlers/disconnectHandler");
const callHandler = require("./socketHandlers/callHandler");
const callEndHandler = require("./socketHandlers/callEndHandler");
const callRejectHandler = require("./socketHandlers/callRejectHandler");
const callAnswerHandler = require("./socketHandlers/callAnswerHandler");
const sendWebRtcSignalingDataHandler = require("./socketHandlers/sendWebRTCSignalingDataHandler");

const {
  getActiveConnections,
  getOnlineUsers,
  setSocketServerInstance,
} = require("./utils/socketStore");
const sendMessageHandler = require("./socketHandlers/sendMessageHandler");
const chatHistoryHandler = require("./socketHandlers/chatHistoryHandler");

const registerSocketServer = (server) => {
  const io = require("socket.io")(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  setSocketServerInstance(io);

  io.use((socket, next) => {
    authSocket(socket, next);
  });

  const emitOnlineUsers = () => {
    const activeAdminConnections = getActiveConnections("admin");
    const onlineUsers = getOnlineUsers();
    console.log("acitihgabdfndmirehife : ", activeAdminConnections);
    activeAdminConnections.forEach((socketId) => {
      io.to(socketId).emit("online-users", onlineUsers);
    });
  };

  io.on("connection", (socket) => {
    console.log("user connected");
    console.log(socket.id);
    // console.log("Socket ", socket);

    newConnectionHandler(socket, io);
    emitOnlineUsers();

    socket.on("send-message", (data) => {
      sendMessageHandler(socket, data);
    });

    socket.on("chat-history", (data) => {
      chatHistoryHandler(socket, data);
    });

    socket.on("initiate-call", (data) => {
      console.log("callllll data ", data);
      callHandler(socket, io, data);
    });

    socket.on("answer-call", (data) => {
      callAnswerHandler(socket, io, data);
      // Mark the call as answered in your system
      // Possibly notify the other side:
      // io.to(theCallerSocket).emit("call-answered", { ... });
    });

    socket.on("reject-call", (data) => {
      callRejectHandler(socket, io, data);
      // Mark the call as rejected
      // Possibly emit "call-ended" to the caller
      // callEndHandler(socket, io, callData);
    });

    socket.on("end-call", (data) => {
      console.log("callllll data ", data);
      callEndHandler(socket, io, data);
    });

    socket.on("webRTC-signaling", (data) => {
      console.log("webrtc signaling data : ", data);
      sendWebRtcSignalingDataHandler(socket, io, data);
    });
    socket.on("disconnect", () => {
      disconnectHandler(socket);
    });
  });

  setInterval(() => {
    emitOnlineUsers();
    console.log("getOnlineUsers users ", getOnlineUsers());
  }, 5000);
};

module.exports = {
  registerSocketServer,
};
