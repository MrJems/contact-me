const authSocket = require("./middleware/authSocket");
const newConnectionHandler = require("./socketHandlers/newConnectionHandler");
const disconnectHandler = require("./socketHandlers/disconnectHandler");
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
    console.log("getOnlineUsers users ", getOnlineUsers());

    socket.on("send-message", (data) => {
      sendMessageHandler(socket, data);
    });

    socket.on("chat-history", (data) => {
      chatHistoryHandler(socket, data);
    });
    socket.on("disconnect", () => {
      disconnectHandler(socket);
    });
  });

  setInterval(() => {
    emitOnlineUsers();
  }, [5000]);
};

module.exports = {
  registerSocketServer,
};
