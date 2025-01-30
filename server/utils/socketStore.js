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

const getActiveConnections = (username) => {
  const activeConnections = [];
  connectedUsers.forEach((value, key) => {
    if (value.userData.userInfo?.username === username) {
      activeConnections.push(key);
    }
  });
  return activeConnections;
};

const getOnlineUsers = () => {
  const onlineUsers = [];

  connectedUsers.forEach((value, key) => {
    onlineUsers.push({
      socketId: key,
      userId: value.userData.userInfo?.username,
    });
  });
  return onlineUsers;
};

module.exports = {
  addNewConnectedUser,
  removeConnectedUser,
  getActiveConnections,
  getOnlineUsers,
};
