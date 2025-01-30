const authSocket = require("./middleware/authSocket");
const newConnectionHandler = require("./socketHandlers/newConnectionHandler");
const disconnectHandler = require("./socketHandlers/disconnectHandler");
const { getActiveConnections, getOnlineUsers } = require("./utils/socketStore");

const registerSocketServer = (server) => {
  const io = require("socket.io")(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

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
