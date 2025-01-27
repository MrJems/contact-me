const connectedUsers = new Map();

const addNewConnectedUser = ({ socketId, userDetails }) => {
  connectedUsers.set(socketId, userDetails);
  console.log("connected Users after adding", connectedUsers);
};

const removeConnectedUser = (socketId) => {
  if (connectedUsers.has(socketId)) {
    connectedUsers.delete(socketId);
    console.log("connected Users after delete", connectedUsers);
  }
};

module.exports = {
  addNewConnectedUser,
  removeConnectedUser,
};
