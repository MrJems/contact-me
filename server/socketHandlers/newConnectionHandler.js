const socketStore = require("../utils/socketStore");

const newConnectionHandler = async (socket, io) => {
  const userDetails = socket.handshake.auth;
  //   console.log("userdetails ", socket);
  socketStore.addNewConnectedUser({
    socketId: socket.id,
    userDetails,
  });
};

module.exports = newConnectionHandler;
