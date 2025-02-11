const socketStore = require("../utils/socketStore");

const disconnectHandler = (socket) => {
  socketStore.removeConnectedUser(socket.id);
};

module.exports = disconnectHandler;
