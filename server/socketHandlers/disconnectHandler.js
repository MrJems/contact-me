const socketStore = require("../utils/socketStore");

const disconnectHandler = (socket) => {
  //   console.log("disconnect hanfler socket ", socket);
  socketStore.removeConnectedUser(socket.id);
};

module.exports = disconnectHandler;
