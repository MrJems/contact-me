const connectedUsers = new Map();
let io = null;

const setSocketServerInstance = (ioInstance) => {
  io = ioInstance;
};

const getSocketServerInstance = () => {
  return io;
};
const addNewConnectedUser = ({ socketId, userDetails }) => {
  connectedUsers.set(socketId, userDetails);
};

const removeConnectedUser = (socketId) => {
  if (connectedUsers.has(socketId)) {
    connectedUsers.delete(socketId);
  }
};

const getActiveConnections = (username) => {
  const activeConnections = [];
  connectedUsers.forEach((value, key) => {
    if (value.userName === username) {
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
      userId: value.userName,
    });
  });
  return onlineUsers;
};

module.exports = {
  addNewConnectedUser,
  removeConnectedUser,
  getActiveConnections,
  getOnlineUsers,
  setSocketServerInstance,
  getSocketServerInstance,
};
