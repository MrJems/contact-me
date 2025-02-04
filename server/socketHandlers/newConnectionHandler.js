const socketStore = require("../utils/socketStore");

const newConnectionHandler = async (socket, io) => {
  const userDetails = socket.data.user;
  console.log("userdetailfss ", userDetails);
  socketStore.addNewConnectedUser({
    socketId: socket.id,
    userDetails,
  });
};

module.exports = newConnectionHandler;
